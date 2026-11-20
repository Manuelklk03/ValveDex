import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TeamPicker } from "@/components/ui/team-picker";
import { dossierArt } from "@/data/dossier-art";
import { ChapterStrip } from "@/features/games/components/chapter-strip";
import { GameHero } from "@/features/games/components/game-hero";
import { SectionPortal } from "@/features/games/components/section-portal";
import { StatStrip } from "@/features/games/components/stat-strip";
import { WorldHero } from "@/features/games/components/world-hero";
import { WorldRooms } from "@/features/games/components/world-rooms";
import { getDossierLook } from "@/features/games/dossier-looks";
import { transitionByLook } from "@/features/games/dossier-transitions";
import {
  getChapterShots,
  getGameStats,
  getSectionPreviews,
} from "@/features/games/get-game-overview";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import { getTeamLeaders } from "@/features/games/get-section-entries";
import { getSectionStatuses } from "@/features/games/get-section-statuses";
import {
  getGameById,
  getGamesByUniverse,
  getModsByGame,
  getUniverseAndGame,
  getCancelledGamesByGame,
  getUniverses,
} from "@/features/universes/get-universes";

import styles from "./page.module.css";

// Next 16.4 avisa en desarrollo de que `params` se lee fuera de Suspense; la página se genera entera
// en el build, así que se excluye de la validación de navegación instantánea
export const instant = false;

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
  const previews = getSectionPreviews(game.id, statuses);
  const stats = getGameStats(game.id, statuses);
  const chapterShots = getChapterShots(game.id);

  const baseGame = game.baseGameId ? getGameById(game.baseGameId) : undefined;
  const mods = getModsByGame(game.id);
  const cancelledGames = getCancelledGamesByGame(game.id);
  const availableCount = statuses.filter((status) => status.isAvailable).length;

  // Los juegos de Half-Life con dossier continúan su mundo dentro: cabecera con su material y apartados como salas
  const look =
    universe.slug === "half-life" ? getDossierLook(game.id) : undefined;
  const hubHref = `/universos/${universe.slug}/${game.slug}`;
  const transitionName = look ? transitionByLook[look.variant] : undefined;

  const specs = [
    { label: "Año", value: getGameYearLabel(game) },
    { label: "Estudio", value: game.developer },
    { label: "Apartados", value: `${availableCount} de ${statuses.length}` },
  ];
  const breadcrumb = (
    <Breadcrumb
      items={[
        { label: "Universos", href: "/universos" },
        { label: universe.name, href: `/universos/${universe.slug}` },
        { label: game.name },
      ]}
    />
  );
  const heroExtras = (
    <>
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
    </>
  );

  return (
    <main
      className={
        look
          ? `${styles["game-page"]} ${styles["game-page--world"]}`
          : styles["game-page"]
      }
      data-variant={look?.variant}
    >
      {look ? (
        <WorldHero
          game={game}
          look={look}
          specs={specs}
          breadcrumb={breadcrumb}
        >
          {heroExtras}
        </WorldHero>
      ) : (
        <GameHero
          name={game.name}
          summary={game.description}
          art={dossierArt[game.id]}
          specs={specs}
          breadcrumb={breadcrumb}
        >
          {heroExtras}
        </GameHero>
      )}

      {look && (
        <WorldRooms
          gameName={game.name}
          hubHref={hubHref}
          statuses={statuses}
          previews={previews}
          fallbackScene={dossierArt[game.id]?.backdrop}
          transition={
            transitionName
              ? { name: transitionName, title: game.name, label: look.label }
              : undefined
          }
        />
      )}

      <div className={styles["game-page__content"]}>
        <TeamPicker leaders={getTeamLeaders(game.id)} />

        <StatStrip stats={stats} />

        {!look && (
          <section
            className={styles["game-page__section"]}
            aria-labelledby="sections-title"
          >
            <h2
              id="sections-title"
              className={styles["game-page__section-title"]}
            >
              Apartados
            </h2>
            <ul className={styles["game-page__sections"]}>
              {statuses.map((status, index) => (
                <SectionPortal
                  key={status.section.id}
                  index={index + 1}
                  status={status}
                  preview={previews[status.section.id]}
                  gameIcon={dossierArt[game.id]?.icons[0]}
                  href={`${hubHref}/${status.section.slug}`}
                />
              ))}
            </ul>
          </section>
        )}

        <ChapterStrip shots={chapterShots} />

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
      </div>
    </main>
  );
}
