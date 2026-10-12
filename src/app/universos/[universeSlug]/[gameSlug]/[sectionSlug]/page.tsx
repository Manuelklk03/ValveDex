import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isEntryCategory } from "@/domain/entry";
import {
  getEntriesByGameAndCategory,
  getEntryAppearance,
  getEntrySummaryForGame,
} from "@/features/catalog/get-entries";
import {
  getGameSectionBySlug,
  getGameSections,
} from "@/features/games/get-game-sections";
import {
  getGamesByUniverse,
  getUniverseAndGame,
  getUniverses,
} from "@/features/universes/get-universes";
import Image from "next/image";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getUniverses()
    .filter((universe) => universe.status === "available")
    .flatMap((universe) =>
      getGamesByUniverse(universe.id).flatMap((game) =>
        getGameSections()
          .filter(
            (section) =>
              isEntryCategory(section.id) &&
              getEntriesByGameAndCategory(game.id, section.id).length > 0,
          )
          .map((section) => ({
            universeSlug: universe.slug,
            gameSlug: game.slug,
            sectionSlug: section.slug,
          })),
      ),
    );
}

function getSectionPageData(
  universeSlug: string,
  gameSlug: string,
  sectionSlug: string,
) {
  const result = getUniverseAndGame(universeSlug, gameSlug);
  const section = getGameSectionBySlug(sectionSlug);

  if (!result || !section || !isEntryCategory(section.id)) {
    return undefined;
  }

  const entries = getEntriesByGameAndCategory(result.game.id, section.id);

  return { ...result, section, entries };
}

export async function generateMetadata({
  params,
}: PageProps<"/universos/[universeSlug]/[gameSlug]/[sectionSlug]">): Promise<Metadata> {
  const { universeSlug, gameSlug, sectionSlug } = await params;
  const data = getSectionPageData(universeSlug, gameSlug, sectionSlug);

  return {
    title: data
      ? `${data.section.name} · ${data.game.name}`
      : "Apartado no encontrado",
    description: data?.section.description,
  };
}

export default async function SectionPage({
  params,
}: PageProps<"/universos/[universeSlug]/[gameSlug]/[sectionSlug]">) {
  const { universeSlug, gameSlug, sectionSlug } = await params;

  const data = getSectionPageData(universeSlug, gameSlug, sectionSlug);

  if (!data) {
    notFound();
  }

  const { universe, game, section, entries } = data;

  return (
    <main className={styles["section-page"]}>
      <nav aria-label="Ruta de navegación">
        <Link
          href={`/universos/${universe.slug}/${game.slug}`}
          className={styles["section-page__back"]}
        >
          ← {game.name}
        </Link>
      </nav>

      <header className={styles["section-page__header"]}>
        <h1 className={styles["section-page__title"]}>{section.name}</h1>
        <p className={styles["section-page__intro"]}>{section.description}</p>
      </header>

      {entries.length === 0 ? (
        <p className={styles["section-page__empty"]}>
          Todavía no hay fichas en este apartado.
        </p>
      ) : (
        <ul className={styles["section-page__entries"]}>
          {entries.map((entry) => {
            const image = getEntryAppearance(entry, game.id)?.image;

            return (
              <li key={entry.id} className={styles["section-page__entry"]}>
                {image && (
                  <Image
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    className={styles["section-page__entry-image"]}
                  />
                )}
                {/* …el <h2> con el Link y el <p> del resumen, sin cambios… */}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
