import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageCompare } from "@/components/ui/image-compare";
import { getEntries, getEntryBySlug } from "@/features/catalog/get-entries";
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

  const section = getGameSectionById(entry.category);
  const gameAppearances = entry.appearances.flatMap((appearance) => {
    const game = getGameById(appearance.gameId);
    const universe = game ? getUniverseById(game.universeId) : undefined;

    return game && universe ? [{ appearance, game, universe }] : [];
  });

  return (
    <main className={styles["entry-page"]}>
      <header className={styles["entry-page__header"]}>
        {section && (
          <p className={styles["entry-page__category"]}>{section.name}</p>
        )}
        <h1 className={styles["entry-page__title"]}>{entry.name}</h1>
        <p className={styles["entry-page__summary"]}>{entry.summary}</p>
      </header>

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
                    ({game.releaseYear})
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
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
