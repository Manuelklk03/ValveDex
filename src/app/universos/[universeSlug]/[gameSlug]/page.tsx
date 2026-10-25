import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isEntryCategory } from "@/domain/entry";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getEntriesByGameAndCategory } from "@/features/catalog/get-entries";
import { getGameLore } from "@/features/games/get-game-lore";
import { getGameSections } from "@/features/games/get-game-sections";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import {
  getGameById,
  getGamesByUniverse,
  getModsByGame,
  getUniverseAndGame,
  getCancelledGamesByGame,
  getUniverses,
} from "@/features/universes/get-universes";

import styles from "./page.module.css";
import { DossierHeader } from "@/components/ui/dossier-header";

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

  const baseGame = game.baseGameId ? getGameById(game.baseGameId) : undefined;
  const mods = getModsByGame(game.id);
  const cancelledGames = getCancelledGamesByGame(game.id);
  const availableCount = sections.filter(
    (section) =>
      (isEntryCategory(section.id) &&
        getEntriesByGameAndCategory(game.id, section.id).length > 0) ||
      (section.id === "lore" && getGameLore(game.id) !== undefined),
  ).length;

  return (
    <main className={styles["game-page"]}>
      <Breadcrumb
        items={[
          { label: "Universos", href: "/universos" },
          { label: universe.name, href: `/universos/${universe.slug}` },
          { label: game.name },
        ]}
      />
      <DossierHeader
        title={game.name}
        summary={game.description}
        specs={[
          { label: "Año", value: getGameYearLabel(game) },
          { label: "Estudio", value: game.developer },
          {
            label: "Apartados",
            value: `${availableCount} de ${sections.length}`,
          },
        ]}
      >
        {baseGame && (
          <p className={styles["game-page__meta"]}>
            {game.status === "cancelled"
              ? "Proyecto cancelado basado en"
              : "Mod de"}{" "}
            <Link
              href={`/universos/${universe.slug}/${baseGame.slug}`}
              className={styles["game-page__mod-link"]}
            >
              {baseGame.name}
            </Link>
          </p>
        )}
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
      </DossierHeader>

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
            const hasLore =
              section.id === "lore" && getGameLore(game.id) !== undefined;
            const isAvailable = entryCount > 0 || hasLore;
            const cardClassName = isAvailable
              ? `${styles["game-page__card"]} ${styles["game-page__card--available"]}`
              : styles["game-page__card"];
            const badge = hasLore
              ? "Disponible"
              : entryCount > 0
                ? `${entryCount} ${entryCount === 1 ? "ficha" : "fichas"}`
                : "Próximamente";

            return (
              <li key={section.id} className={cardClassName}>
                <h3 className={styles["game-page__card-title"]}>
                  {isAvailable ? (
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
                <span className={styles["game-page__badge"]}>{badge}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {mods.length > 0 && (
        <section
          className={styles["game-page__section"]}
          aria-labelledby="mods-title"
        >
          <h2 id="mods-title" className={styles["game-page__section-title"]}>
            Mods
          </h2>
          <ul className={styles["game-page__mods"]}>
            {mods.map((mod) => (
              <li key={mod.id}>
                <Link
                  href={`/universos/${universe.slug}/${mod.slug}`}
                  className={styles["game-page__mod-link"]}
                >
                  {mod.name}
                </Link>{" "}
                <span className={styles["game-page__meta-muted"]}>
                  ({getGameYearLabel(mod)} · {mod.developer})
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {cancelledGames.length > 0 && (
        <section
          className={styles["game-page__section"]}
          aria-labelledby="cancelled-title"
        >
          <h2
            id="cancelled-title"
            className={styles["game-page__section-title"]}
          >
            Proyectos cancelados
          </h2>
          <ul className={styles["game-page__cancelled"]}>
            {cancelledGames.map((cancelled) => (
              <li key={cancelled.id}>
                <Link
                  href={`/universos/${universe.slug}/${cancelled.slug}`}
                  className={styles["game-page__cancelled-link"]}
                >
                  {cancelled.name}
                </Link>{" "}
                <span className={styles["game-page__meta-muted"]}>
                  ({getGameYearLabel(cancelled)} · {cancelled.developer})
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
