import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import {
  getOfficialGamesByUniverse,
  getUniverseBySlug,
  getUniverses,
} from "@/features/universes/get-universes";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getUniverses()
    .filter((universe) => universe.status === "available")
    .map((universe) => ({
      universeSlug: universe.slug,
    }));
}

export async function generateMetadata({
  params,
}: PageProps<"/universos/[universeSlug]">): Promise<Metadata> {
  const { universeSlug } = await params;

  const universe = getUniverseBySlug(universeSlug);

  return {
    title: universe?.name ?? "Universo no encontrado",
    description: universe?.description ?? "Descripción no encontrada",
  };
}

export default async function UniversePage({
  params,
}: PageProps<"/universos/[universeSlug]">) {
  const { universeSlug } = await params;

  const universe = getUniverseBySlug(universeSlug);

  if (!universe || universe.status !== "available") {
    notFound();
  }

  const games = getOfficialGamesByUniverse(universe.id);
  return (
    <main className={styles["universe-page"]}>
      <header className={styles["universe-page__header"]}>
        <h1 className={styles["universe-page__title"]}>{universe.name}</h1>
        <p className={styles["universe-page__intro"]}>{universe.description}</p>
      </header>

      <section
        className={styles["universe-page__section"]}
        aria-labelledby="games-title"
      >
        <h2 id="games-title" className={styles["universe-page__section-title"]}>
          Juegos
        </h2>

        {games.length === 0 ? (
          <p className={styles["universe-page__empty"]}>
            Todavía no hay juegos registrados en este universo.
          </p>
        ) : (
          <ul className={styles["universe-page__games"]}>
            {games.map((game) => (
              <li key={game.id} className={styles["universe-page__game"]}>
                <h3 className={styles["universe-page__game-title"]}>
                  <Link
                    href={`/universos/${universe.slug}/${game.slug}`}
                    className={styles["universe-page__game-link"]}
                  >
                    {game.name}
                  </Link>
                </h3>
                <p className={styles["universe-page__game-meta"]}>
                  {getGameYearLabel(game)} · {game.developer}
                </p>
                <p className={styles["universe-page__game-description"]}>
                  {game.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
