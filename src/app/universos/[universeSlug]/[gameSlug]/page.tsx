import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameSections } from "@/features/games/get-game-sections";
import {
  getUniverseAndGame,
  getGamesByUniverse,
  getUniverses,
} from "@/features/universes/get-universes";
import { isEntryCategory } from "@/domain/entry";
import { getEntriesByGameAndCategory } from "@/features/catalog/get-entries";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getUniverses()
    .filter((universe) => universe.status === "available")
    .flatMap((universe) =>
      getGamesByUniverse(universe.id).map((game) => ({
        universeSlug: universe.slug,
        gameSlug: game.slug,
      })),
    );
}

export async function generateMetadata({
  params,
}: PageProps<"/universos/[universeSlug]/[gameSlug]">): Promise<Metadata> {
  const { universeSlug, gameSlug } = await params;

  const result = getUniverseAndGame(universeSlug, gameSlug);

  return {
    title: result?.game.name ?? "Juego no encontrado",
    description: result?.game.description ?? "Descripción no encontrada",
  };
}

export default async function GamePage({
  params,
}: PageProps<"/universos/[universeSlug]/[gameSlug]">) {
  const { universeSlug, gameSlug } = await params;

  const result = getUniverseAndGame(universeSlug, gameSlug);

  if (!result) {
    notFound();
  }

  const { universe, game } = result;
  const sections = getGameSections();

  return (
    <main className={styles["game-page"]}>
      <nav aria-label="Ruta de navegación">
        <Link
          href={`/universos/${universe.slug}`}
          className={styles["game-page__back"]}
        >
          ← {universe.name}
        </Link>
      </nav>

      <header className={styles["game-page__header"]}>
        <p className={styles["game-page__meta"]}>
          {game.releaseYear} · {game.developer}
        </p>
        <h1 className={styles["game-page__title"]}>{game.name}</h1>
        <p className={styles["game-page__intro"]}>{game.description}</p>
        <p className={styles["game-page__sources"]}>
          Fuente:{" "}
          {game.sources.map((source, index) => (
            <span key={source.url}>
              {index > 0 && ", "}
              <a href={source.url} className={styles["game-page__source-link"]}>
                {source.title}
              </a>
            </span>
          ))}
        </p>
      </header>

      <section
        className={styles["game-page__section"]}
        aria-labelledby="sections-title"
      >
        <h2 id="sections-title" className={styles["game-page__section-title"]}>
          Apartados
        </h2>
        <ul className={styles["game-page__sections"]}>
          {sections.map((section) => {
            const entryCount = isEntryCategory(section.id)
              ? getEntriesByGameAndCategory(game.id, section.id).length
              : 0;
            const hasEntries = entryCount > 0;
            const cardClassName = hasEntries
              ? `${styles["game-page__card"]} ${styles["game-page__card--available"]}`
              : styles["game-page__card"];

            return (
              <li key={section.id} className={cardClassName}>
                <h3 className={styles["game-page__card-title"]}>
                  {hasEntries ? (
                    <Link
                      href={`/universos/${universe.slug}/${game.slug}/${section.slug}`}
                      className={styles["game-page__card-link"]}
                    >
                      {section.name}
                    </Link>
                  ) : (
                    section.name
                  )}
                </h3>
                <p className={styles["game-page__card-description"]}>
                  {section.description}
                </p>
                <span className={styles["game-page__badge"]}>
                  {hasEntries
                    ? `${entryCount} ${entryCount === 1 ? "ficha" : "fichas"}`
                    : "Próximamente"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
