import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DossierHeader } from "@/components/ui/dossier-header";
import { ImageCompare } from "@/components/ui/image-compare";
import { getEntries, getEntryBySlug } from "@/features/catalog/get-entries";
import { getRelatedEntries } from "@/features/catalog/get-related-entries";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import { getEntryFacts } from "@/features/catalog/get-entry-facts";
import { getGameSectionById } from "@/features/games/get-game-sections";
import {
  getGameById,
  getUniverseById,
} from "@/features/universes/get-universes";
import styles from "./page.module.css";

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
  const gameAppearances = entry.appearances.flatMap((appearance) => {
    const game = getGameById(appearance.gameId);
    const universe = game ? getUniverseById(game.universeId) : undefined;

    return game && universe ? [{ appearance, game, universe }] : [];
  });

  // La ruta sigue al primer juego de la ficha, el mismo que pone el tema en layout.tsx
  const first = gameAppearances[0];
  const firstGamePath = first
    ? `/universos/${first.universe.slug}/${first.game.slug}`
    : undefined;

  return (
    <main className={styles["entry-page"]}>
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

      {/* El ID estable se muestra como número de registro y los datos como hoja técnica (docs/design.md) */}
      <DossierHeader
        title={entry.name}
        summary={entry.summary}
        specs={[
          { label: "Registro", value: entry.id },
          ...(section ? [{ label: "Categoría", value: section.name }] : []),
          ...facts,
        ]}
      />

      {entry.notes && entry.notes.length > 0 && (
        <section
          className={styles["entry-page__section"]}
          aria-labelledby="notes-title"
        >
          <h2 id="notes-title" className={styles["entry-page__section-title"]}>
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
          {gameAppearances.map(({ appearance, game, universe }) => {
            const original = appearance.images?.original;
            const hd = appearance.images?.hd;
            const single = hd ?? original;
            const credits = [original, hd].filter(
              (image) => image !== undefined,
            );

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

                {original && hd ? (
                  <ImageCompare
                    before={original}
                    after={hd}
                    beforeLabel="Original"
                    afterLabel="HD Pack"
                    models={appearance.images?.models}
                  />
                ) : (
                  single && (
                    <Image
                      src={single.src}
                      alt={single.alt}
                      width={single.width}
                      height={single.height}
                      className={styles["entry-page__image"]}
                    />
                  )
                )}

                {credits.map((image) => (
                  <p key={image.src} className={styles["entry-page__credit"]}>
                    Imagen:{" "}
                    <a
                      href={image.source.url}
                      className={styles["entry-page__source-link"]}
                    >
                      {image.source.title}
                    </a>
                    {image.credit && ` · ${image.credit}`}
                    {image.license && ` · ${image.license}`}
                  </p>
                ))}
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

      <section
        className={styles["entry-page__section"]}
        aria-labelledby="sources-title"
      >
        <h2 id="sources-title" className={styles["entry-page__section-title"]}>
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
    </main>
  );
}
