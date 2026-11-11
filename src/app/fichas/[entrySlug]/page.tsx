import { getSectionEntries } from "@/features/games/get-section-entries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { dossierArt } from "@/data/dossier-art";
import { EntryHero } from "@/features/catalog/components/entry-hero";
import { EntryMedia } from "@/features/catalog/components/entry-media";
import { EntryTile } from "@/features/catalog/components/entry-tile";
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
  const siblings = first
    ? getEntrySiblings(
        entry,
        first.game.id,
        4,
        getSectionEntries(first.game.id, entry.category).map(
          (item) => item.entry,
        ),
      )
    : { previous: undefined, next: undefined, others: [] };
  const heroImage =
    first?.appearance.images?.hd ?? first?.appearance.images?.original;
  const firstGamePath = first
    ? `/universos/${first.universe.slug}/${first.game.slug}`
    : undefined;

  return (
    <main className={styles["entry-page"]}>
      <EntryHero
        name={entry.name}
        summary={entry.summary}
        sectionName={section?.name}
        sectionId={section?.id}
        backdrop={heroImage?.src}
        gameIcon={first ? dossierArt[first.game.id]?.icons[0] : undefined}
        specs={[{ label: "Registro", value: entry.id }, ...facts]}
        breadcrumb={
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
              ...(section && firstGamePath
                ? [
                    {
                      label: section.name,
                      href: `${firstGamePath}/${section.slug}`,
                    },
                  ]
                : []),
              { label: entry.name },
            ]}
          />
        }
        media={
          first?.appearance.images ? (
            <EntryMedia appearance={first.appearance} entryName={entry.name} />
          ) : undefined
        }
      />

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

        {entry.notes && entry.notes.length > 0 && (
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
            <ul className={styles["entry-page__notes"]}>
              {entry.notes.map((note) => (
                <li key={note} className={styles["entry-page__note"]}>
                  {note}
                </li>
              ))}
            </ul>
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
          <ul className={styles["entry-page__games"]}>
            {gameAppearances.map(({ appearance, game, universe }, index) => {
              return (
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
                  {index > 0 && (
                    <EntryMedia
                      appearance={appearance}
                      entryName={entry.name}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {relatedEntries.length > 0 && (
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
            <ul className={styles["entry-page__related"]}>
              {relatedEntries.map(({ label, entry: related }) => (
                <li key={`${label}-${related.id}`}>
                  <span className={styles["entry-page__related-label"]}>
                    {label}:
                  </span>{" "}
                  <Link
                    href={`/fichas/${related.slug}`}
                    className={styles["entry-page__related-link"]}
                  >
                    {related.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {first && siblings.others.length > 0 && (
          <section
            className={styles["entry-page__section"]}
            aria-labelledby="more-title"
          >
            <h2 id="more-title" className={styles["entry-page__section-title"]}>
              Más de {section?.name ?? "este apartado"} en {first.game.name}
            </h2>
            <ul className={styles["entry-page__more"]}>
              {siblings.others.map((other) => (
                <EntryTile
                  key={other.id}
                  href={`/fichas/${other.slug}`}
                  name={other.name}
                  summary={getEntrySummaryForGame(other, first.game.id)}
                  image={getEntryThumbnail(other, first.game.id)}
                  isCapture={other.category === "maps"}
                  model={
                    getEntryAppearance(other, first.game.id)?.images?.models
                      ?.original
                  }
                  facts={getEntryFacts(other).slice(0, 2)}
                />
              ))}
            </ul>
            <nav
              className={styles["entry-page__pager"]}
              aria-label="Fichas anterior y siguiente"
            >
              {siblings.previous ? (
                <Link
                  href={`/fichas/${siblings.previous.slug}`}
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
                  href={`/fichas/${siblings.next.slug}`}
                  className={styles["entry-page__pager-link"]}
                  rel="next"
                >
                  {siblings.next.name} <span aria-hidden="true">→</span>
                </Link>
              )}
            </nav>
          </section>
        )}

        <section
          className={styles["entry-page__section"]}
          aria-labelledby="sources-title"
        >
          <h2
            id="sources-title"
            className={styles["entry-page__section-title"]}
          >
            Fuentes
          </h2>
          <ul className={styles["entry-page__sources"]}>
            {entry.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  className={styles["entry-page__source-link"]}
                >
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
        </section>
      </div>
    </main>
  );
}
