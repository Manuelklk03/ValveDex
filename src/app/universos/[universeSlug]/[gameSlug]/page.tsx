import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectorSign } from "@/features/games/components/sector-sign";
import { getSectionStatuses } from "@/features/games/get-section-statuses";
import { Breadcrumb } from "@/components/ui/breadcrumb";
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
  const statuses = getSectionStatuses(game.id);

  const baseGame = game.baseGameId ? getGameById(game.baseGameId) : undefined;
  const mods = getModsByGame(game.id);
  const cancelledGames = getCancelledGamesByGame(game.id);
  const availableCount = statuses.filter((status) => status.isAvailable).length;

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
            value: `${availableCount} de ${statuses.length}`,
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
          {statuses.map((status, index) => (
            <SectorSign
              key={status.section.id}
              index={index + 1}
              status={status}
              href={`/universos/${universe.slug}/${game.slug}/${status.section.slug}`}
            />
          ))}
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
