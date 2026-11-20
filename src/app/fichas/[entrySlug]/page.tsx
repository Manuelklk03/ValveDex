import type { ReactNode } from "react";
import { getSectionEntries } from "@/features/games/get-section-entries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { OriginSwitch } from "@/components/ui/origin-switch";
import type { Entry, EntryCategory } from "@/domain/entry";
import { dossierArt } from "@/data/dossier-art";
import { EntryHero } from "@/features/catalog/components/entry-hero";
import { EntryMedia } from "@/features/catalog/components/entry-media";
import {
  EntryStage,
  type EntryLayer,
} from "@/features/catalog/components/entry-stage";
import stageStyles from "@/features/catalog/components/entry-stage.module.css";
import { EntryTile } from "@/features/catalog/components/entry-tile";
import { WorldHero } from "@/features/games/components/world-hero";
import { getDossierLook } from "@/features/games/dossier-looks";
import worldTheme from "@/features/games/world-theme.module.css";
import {
  getEntries,
  getEntryAppearance,
  getEntryBySlug,
  getEntrySiblings,
  getEntrySummaryForGame,
  getEntryThumbnail,
} from "@/features/catalog/get-entries";
import { getChapterLevels } from "@/features/catalog/get-levels";
import { getRelatedEntries } from "@/features/catalog/get-related-entries";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import { getEntryFacts } from "@/features/catalog/get-entry-facts";
import { getGameSectionById } from "@/features/games/get-game-sections";
import {
  getGameById,
  getUniverseById,
} from "@/features/universes/get-universes";
import styles from "./page.module.css";

// Next 16.4 avisa en desarrollo de que `params` se lee fuera de Suspense; la página se genera entera
// en el build, así que se excluye de la validación de navegación instantánea
export const instant = false;

export function generateStaticParams() {
  return getEntries().map((entry) => ({
    entrySlug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/fichas/[entrySlug]">): Promise<Metadata> {
  const { entrySlug } = await params;

  const entry = getEntryBySlug(entrySlug);

  return {
    title: entry?.name ?? "Ficha no encontrada",
    description: entry?.summary,
  };
}

export default async function EntryPage({
  params,
}: PageProps<"/fichas/[entrySlug]">) {
  const { entrySlug } = await params;

  const entry = getEntryBySlug(entrySlug);

  if (!entry) {
    notFound();
  }
  const facts = getEntryFacts(entry);

  const section = getGameSectionById(entry.category);
  const relatedEntries = getRelatedEntries(entry.id);
  const levels = getChapterLevels(entry);
  const gameAppearances = entry.appearances.flatMap((appearance) => {
    const game = getGameById(appearance.gameId);
    const universe = game ? getUniverseById(game.universeId) : undefined;

    return game && universe ? [{ appearance, game, universe }] : [];
  });

  // La ruta sigue al primer juego de la ficha, el mismo que pone el tema en layout.tsx
  const first = gameAppearances[0];
  // Apartados del juego en los que sale la ficha: el suyo y, en los juegos con equipos, el del rival
  const twin: Partial<Record<EntryCategory, EntryCategory>> = {
    characters: "enemies",
    enemies: "characters",
  };
  const twinCategory = twin[entry.category];
  const contextsOf = (gameId: string): EntryCategory[] =>
    twinCategory &&
    getSectionEntries(gameId, twinCategory).some(
      (item) => item.entry.id === entry.id,
    )
      ? [entry.category, twinCategory]
      : [entry.category];
  type Origin = (typeof gameAppearances)[number];
  // Orígenes posibles de la ficha: cada juego en el que sale, con cada apartado suyo
  const origins = gameAppearances.flatMap((at) =>
    contextsOf(at.game.id).map((category) => ({ at, category })),
  );
  const heroImage =
    first?.appearance.images?.hd ?? first?.appearance.images?.original;

  // Solo los juegos de Half-Life con dossier tienen mundo; la ficha usa el del juego desde el que se llega
  const worldLookOf = (at?: Origin) =>
    at?.universe.slug === "half-life" ? getDossierLook(at.game.id) : undefined;

  const renderBreadcrumb = (category: EntryCategory, at?: Origin) => {
    const first = at;
    const firstGamePath = first
      ? `/universos/${first.universe.slug}/${first.game.slug}`
      : undefined;
    const origin = getGameSectionById(category);

    return (
      <Breadcrumb
        items={[
          { label: "Universos", href: "/universos" },
          ...(first && firstGamePath
            ? [
                {
                  label: first.universe.name,
                  href: `/universos/${first.universe.slug}`,
                },
                { label: first.game.name, href: firstGamePath },
              ]
            : []),
          ...(origin && firstGamePath
            ? [
                {
                  label: origin.name,
                  href: `${firstGamePath}/${origin.slug}`,
                },
              ]
            : []),
          { label: entry.name },
        ]}
      />
    );
  };

  // «Más de…» y anterior/siguiente del apartado dado, con la misma lista y orden que su página
  const renderMore = (category: EntryCategory, at?: Origin) => {
    const first = at;
    if (!first) return null;

    const origin = getGameSectionById(category);
    const siblings = getEntrySiblings(
      entry,
      first.game.id,
      4,
      getSectionEntries(first.game.id, category).map((item) => item.entry),
    );
    if (siblings.others.length === 0) return null;

    // El enlace de una vecina lleva el juego y el apartado cuando no son los suyos por defecto, para no perderlos
    const hrefOf = (other: Entry) => {
      const query = new URLSearchParams();
      if (other.appearances[0]?.gameId !== first.game.id)
        query.set("juego", first.game.slug);
      if (other.category !== category && origin)
        query.set("apartado", origin.slug);
      const suffix = query.toString();

      return suffix
        ? `/fichas/${other.slug}?${suffix}`
        : `/fichas/${other.slug}`;
    };

    const moreLook = worldLookOf(first);

    const more = (
      <section
        className={styles["entry-page__section"]}
        aria-labelledby="more-title"
      >
        <h2 id="more-title" className={styles["entry-page__section-title"]}>
          Más de {origin?.name ?? "este apartado"} en {first.game.name}
        </h2>
        <ul className={styles["entry-page__more"]}>
          {siblings.others.map((other) => (
            <EntryTile
              key={other.id}
              href={hrefOf(other)}
              name={other.name}
              summary={getEntrySummaryForGame(other, first.game.id)}
              image={getEntryThumbnail(other, first.game.id)}
              isCapture={other.category === "maps"}
              model={
                getEntryAppearance(other, first.game.id)?.images?.models
                  ?.original
              }
              facts={getEntryFacts(other).slice(0, 2)}
              world={Boolean(moreLook)}
            />
          ))}
        </ul>
        <nav
          className={styles["entry-page__pager"]}
          aria-label="Fichas anterior y siguiente"
        >
          {siblings.previous ? (
            <Link
              href={hrefOf(siblings.previous)}
              className={styles["entry-page__pager-link"]}
              rel="prev"
            >
              <span aria-hidden="true">←</span> {siblings.previous.name}
            </Link>
          ) : (
            <span />
          )}
          {siblings.next && (
            <Link
              href={hrefOf(siblings.next)}
              className={styles["entry-page__pager-link"]}
              rel="next"
            >
              {siblings.next.name} <span aria-hidden="true">→</span>
            </Link>
          )}
        </nav>
      </section>
    );

    // Las piezas de un juego de Half-Life llevan la luz y el suelo de ese juego (sin el ambiente fijo del hub)
    return moreLook ? (
      <div
        className={`${worldTheme["world-theme"]} ${worldTheme["world-theme--still"]}`}
        data-variant={moreLook.variant}
      >
        {more}
      </div>
    ) : (
      more
    );
  };

  // Con varios orígenes, la URL (`?juego=…&apartado=…`) decide cuál se enseña; sin parámetros, el primer juego
  // de la ficha y el apartado de su categoría
  const byOrigin = (
    render: (category: EntryCategory, at?: Origin) => ReactNode,
  ) => {
    if (!first || origins.length <= 1) return render(entry.category, first);

    const ownSection = getGameSectionById(entry.category)?.slug ?? "";

    return (
      <OriginSwitch
        fallback={`${first.game.slug}/${ownSection}`}
        variants={Object.fromEntries(
          origins.map(({ at, category }) => [
            `${at.game.slug}/${getGameSectionById(category)?.slug ?? category}`,
            render(category, at),
          ]),
        )}
      />
    );
  };

  // Contenido de la ficha, una sola vez: en los juegos con mundo va en las capas del visor y, en el resto, en secciones
  const factsBody = (
    <dl className={stageStyles["entry-stage__facts"]}>
      {facts.map((fact) => (
        <div key={fact.label} className={stageStyles["entry-stage__fact"]}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );

  const notesBody = entry.notes && entry.notes.length > 0 && (
    <ul className={styles["entry-page__notes"]}>
      {entry.notes.map((note) => (
        <li key={note} className={styles["entry-page__note"]}>
          {note}
        </li>
      ))}
    </ul>
  );

  // Con mundo, el visor ya enseña la imagen del juego de origen: la lista no repite imágenes
  const renderAppearances = (withMedia: boolean) => (
    <ul className={styles["entry-page__games"]}>
      {gameAppearances.map(({ appearance, game, universe }, index) => (
        <li key={game.id} className={styles["entry-page__game"]}>
          <div>
            <Link
              href={`/universos/${universe.slug}/${game.slug}`}
              className={styles["entry-page__game-link"]}
            >
              {game.name}
            </Link>{" "}
            <span className={styles["entry-page__game-year"]}>
              ({getGameYearLabel(game)})
            </span>
          </div>

          {appearance.summary && (
            <p className={styles["entry-page__game-summary"]}>
              {appearance.summary}
            </p>
          )}

          {/* La imagen de la primera aparición ya está en la cabecera */}
          {withMedia && index > 0 && (
            <EntryMedia appearance={appearance} entryName={entry.name} />
          )}
        </li>
      ))}
    </ul>
  );
  const appearancesBody = renderAppearances(true);

  const relatedBody = relatedEntries.length > 0 && (
    <ul className={styles["entry-page__related"]}>
      {relatedEntries.map(({ label, entry: related }) => (
        <li key={`${label}-${related.id}`}>
          <span className={styles["entry-page__related-label"]}>{label}:</span>{" "}
          <Link
            href={`/fichas/${related.slug}`}
            className={styles["entry-page__related-link"]}
          >
            {related.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  const sourcesBody = (
    <ul className={styles["entry-page__sources"]}>
      {entry.sources.map((source) => (
        <li key={source.url}>
          <a href={source.url} className={styles["entry-page__source-link"]}>
            {source.title}
          </a>
          {/* Decisión de Manuel: lo que viene de foros y comunidades se distingue a simple vista */}
          {source.kind === "community" && (
            <span className={styles["entry-page__source-kind"]}>
              {" "}
              (comunidad)
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  // Créditos de las imágenes de la ficha (en la cabecera con mundo no hay pie de foto)
  const imageCredits = [
    ...new Map(
      gameAppearances
        .flatMap(({ appearance }) => [
          appearance.images?.original,
          appearance.images?.hd,
        ])
        .filter((image) => image !== undefined)
        .map((image) => [image.src, image] as const),
    ).values(),
  ];
  const worldSourcesBody = (
    <>
      {sourcesBody}
      {imageCredits.length > 0 && (
        <>
          <p className={stageStyles["entry-stage__subtitle"]}>Imágenes</p>
          <ul className={styles["entry-page__sources"]}>
            {imageCredits.map((image) => (
              <li key={image.src}>
                <a
                  href={image.source.url}
                  className={styles["entry-page__source-link"]}
                >
                  {image.source.title}
                </a>
                {image.credit && ` · ${image.credit}`}
                {image.license && ` · ${image.license}`}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );

  const layers: EntryLayer[] = [
    ...(facts.length > 0
      ? [{ id: "datos", label: "Datos", content: factsBody }]
      : []),
    ...(notesBody
      ? [
          {
            id: "desarrollo",
            label: "Desarrollo",
            count: entry.notes?.length,
            content: notesBody,
          },
        ]
      : []),
    {
      id: "apariciones",
      label: "Apariciones",
      count: gameAppearances.length,
      content: renderAppearances(false),
    },
    ...(relatedBody
      ? [
          {
            id: "relacionado",
            label: "Relacionado",
            count: relatedEntries.length,
            content: relatedBody,
          },
        ]
      : []),
    {
      id: "fuentes",
      label: "Fuentes",
      count: entry.sources.length,
      content: worldSourcesBody,
    },
  ];

  // Cabecera: en un juego de Half-Life, el mundo del juego con el visor 3D protagonista y las capas alrededor;
  // en el resto, la cabecera de siempre
  const renderHero = (category: EntryCategory, at?: Origin) => {
    const look = worldLookOf(at);
    const breadcrumb = renderBreadcrumb(category, at);

    if (!look || !at) {
      return (
        <EntryHero
          name={entry.name}
          summary={entry.summary}
          sectionName={section?.name}
          sectionId={section?.id}
          backdrop={heroImage?.src}
          gameIcon={first ? dossierArt[first.game.id]?.icons[0] : undefined}
          specs={[{ label: "Registro", value: entry.id }, ...facts]}
          breadcrumb={breadcrumb}
          media={
            first?.appearance.images ? (
              <EntryMedia
                appearance={first.appearance}
                entryName={entry.name}
              />
            ) : undefined
          }
        />
      );
    }

    const gameIcon = dossierArt[at.game.id]?.icons[0];

    return (
      <WorldHero
        game={at.game}
        look={look}
        compact
        title={entry.name}
        summary={entry.summary}
        label={getGameSectionById(category)?.name ?? look.label}
        specs={[{ label: "Registro", value: entry.id }]}
        breadcrumb={breadcrumb}
        aside={
          <EntryStage layers={layers}>
            {at.appearance.images ? (
              <EntryMedia
                appearance={at.appearance}
                entryName={entry.name}
                start3d
                hideCredit
              />
            ) : (
              gameIcon && (
                <div
                  className={stageStyles["entry-stage__icon"]}
                  style={{
                    maskImage: `url(${gameIcon.src})`,
                    WebkitMaskImage: `url(${gameIcon.src})`,
                  }}
                  aria-hidden="true"
                />
              )
            )}
          </EntryStage>
        }
      />
    );
  };

  // Secciones de siempre, solo para las fichas sin mundo (en las demás, esos datos están en las capas)
  const renderClassicSections = (_category: EntryCategory, at?: Origin) => {
    if (worldLookOf(at)) return null;

    return (
      <>
        {notesBody && (
          <section
            className={styles["entry-page__section"]}
            aria-labelledby="notes-title"
          >
            <h2
              id="notes-title"
              className={styles["entry-page__section-title"]}
            >
              Desarrollo y curiosidades
            </h2>
            {notesBody}
          </section>
        )}

        <section
          className={styles["entry-page__section"]}
          aria-labelledby="appearances-title"
        >
          <h2
            id="appearances-title"
            className={styles["entry-page__section-title"]}
          >
            Aparece en
          </h2>
          {appearancesBody}
        </section>

        {relatedBody && (
          <section
            className={styles["entry-page__section"]}
            aria-labelledby="related-title"
          >
            <h2
              id="related-title"
              className={styles["entry-page__section-title"]}
            >
              Relacionado
            </h2>
            {relatedBody}
          </section>
        )}
      </>
    );
  };

  const renderClassicSources = (_category: EntryCategory, at?: Origin) =>
    worldLookOf(at) ? null : (
      <section
        className={styles["entry-page__section"]}
        aria-labelledby="sources-title"
      >
        <h2 id="sources-title" className={styles["entry-page__section-title"]}>
          Fuentes
        </h2>
        {sourcesBody}
      </section>
    );

  return (
    <main className={styles["entry-page"]}>
      {byOrigin(renderHero)}

      <div className={styles["entry-page__content"]}>
        {levels.length > 0 && (
          <section
            className={styles["entry-page__section"]}
            aria-labelledby="levels-title"
          >
            <h2
              id="levels-title"
              className={styles["entry-page__section-title"]}
            >
              Niveles del capítulo
            </h2>
            <ol className={styles["entry-page__levels"]}>
              {levels.map((level) => (
                <li key={level.mapFile} className={styles["entry-page__level"]}>
                  <span
                    className={styles["entry-page__level-number"]}
                    aria-hidden="true"
                  >
                    {String(level.order).padStart(2, "0")}
                  </span>
                  <div className={styles["entry-page__level-body"]}>
                    <Link
                      href={`/fichas/${entry.slug}/${level.mapFile}`}
                      className={styles["entry-page__level-link"]}
                    >
                      {level.title}
                    </Link>
                    <span className={styles["entry-page__level-file"]}>
                      {level.mapFile}
                    </span>
                    {level.detail && (
                      <p className={styles["entry-page__level-summary"]}>
                        {level.detail.summary}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {byOrigin(renderClassicSections)}

        {byOrigin(renderMore)}

        {byOrigin(renderClassicSources)}
      </div>
    </main>
  );
}
