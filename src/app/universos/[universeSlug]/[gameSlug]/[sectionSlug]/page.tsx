import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isEntryCategory } from "@/domain/entry";
import type { GameSection } from "@/domain/game-section";
import {
  getEntriesByGameAndCategory,
  getEntryThumbnail,
  getEntrySummaryForGame,
} from "@/features/catalog/get-entries";
import { getGameLore } from "@/features/games/get-game-lore";
import {
  getGameSectionBySlug,
  getGameSections,
} from "@/features/games/get-game-sections";
import {
  getGamesByUniverse,
  getUniverseAndGame,
  getUniverses,
} from "@/features/universes/get-universes";
import styles from "./page.module.css";

function hasSectionContent(gameId: string, section: GameSection): boolean {
  return isEntryCategory(section.id)
    ? getEntriesByGameAndCategory(gameId, section.id).length > 0
    : getGameLore(gameId) !== undefined;
}

export function generateStaticParams() {
  return getUniverses()
    .filter((universe) => universe.status === "available")
    .flatMap((universe) =>
      getGamesByUniverse(universe.id).flatMap((game) =>
        getGameSections()
          .filter((section) => hasSectionContent(game.id, section))
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

  if (!result || !section) {
    return undefined;
  }

  if (!isEntryCategory(section.id)) {
    const lore = getGameLore(result.game.id);

    return lore
      ? { ...result, section, kind: "lore" as const, lore }
      : undefined;
  }

  const entries = getEntriesByGameAndCategory(result.game.id, section.id);

  return { ...result, section, kind: "entries" as const, entries };
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

  const { universe, game, section } = data;

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

      {data.kind === "lore" && (
        <article className={styles["section-page__lore"]}>
          {data.lore.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles["section-page__lore-text"]}>
              {paragraph}
            </p>
          ))}
          <p className={styles["section-page__sources"]}>
            Fuente:{" "}
            {data.lore.sources.map((source, index) => (
              <span key={source.url}>
                {index > 0 && ", "}
                <a
                  href={source.url}
                  className={styles["section-page__source-link"]}
                >
                  {source.title}
                </a>
              </span>
            ))}
          </p>
        </article>
      )}

      {data.kind === "entries" &&
        (data.entries.length === 0 ? (
          <p className={styles["section-page__empty"]}>
            Todavía no hay fichas en este apartado.
          </p>
        ) : (
          <ul className={styles["section-page__entries"]}>
            {data.entries.map((entry) => {
              const image = getEntryThumbnail(entry, game.id);

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
                  <h2 className={styles["section-page__entry-title"]}>
                    <Link
                      href={`/fichas/${entry.slug}`}
                      className={styles["section-page__entry-link"]}
                    >
                      {entry.name}
                    </Link>
                  </h2>
                  <p className={styles["section-page__entry-summary"]}>
                    {getEntrySummaryForGame(entry, game.id)}
                  </p>
                </li>
              );
            })}
          </ul>
        ))}
    </main>
  );
}
