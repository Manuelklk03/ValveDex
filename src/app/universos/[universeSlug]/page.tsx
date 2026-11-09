import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { universeArt } from "@/data/universe-art";
import { getGameYear, type Game } from "@/domain/game";
import { getEntries } from "@/features/catalog/get-entries";
import { DossierMotion } from "@/features/games/components/dossier-motion";
import { GameDossier } from "@/features/games/components/game-dossier";
import { GameHero } from "@/features/games/components/game-hero";
import { getDossierLook } from "@/features/games/dossier-looks";
import { UniverseStage } from "@/features/universes/components/universe-stage";
import {
  getGamesByStage,
  getOfficialGamesByUniverse,
  getStagesByUniverse,
  getUniverseBySlug,
  getUniverses,
} from "@/features/universes/get-universes";
import styles from "./page.module.css";

// Next 16.4 avisa en desarrollo de que `params` se lee fuera de Suspense; la página se genera entera
// en el build, así que se excluye de la validación de navegación instantánea
export const instant = false;

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

  const stages = getStagesByUniverse(universe.id);
  const officialGames = getOfficialGamesByUniverse(universe.id);
  const gameIds = new Set(officialGames.map((game) => game.id));
  const entryCount = getEntries().filter((entry) =>
    entry.appearances.some((appearance) => gameIds.has(appearance.gameId)),
  ).length;
  const art = universeArt[universe.id];

  // «1998–2001» o «2020»: los años de los juegos de una etapa
  const stageYears = (games: Game[]) => {
    const years = games.map(getGameYear).sort((a, b) => a - b);
    if (years.length === 0) return "";
    const [first, last] = [years[0], years[years.length - 1]];
    return first === last ? String(first) : `${first}–${last}`;
  };

  const renderDossiers = (games: Game[]) =>
    games.map((game) => (
      <GameDossier
        key={game.id}
        game={game}
        universeName={universe.name}
        universeSlug={universe.slug}
        look={getDossierLook(game.id)}
      />
    ));

  return (
    <main className={styles["universe-page"]}>
      <GameHero
        name={universe.name}
        summary={`${universe.description}${stages.length > 0 ? " Elige una etapa y abre el dossier de cada juego." : ""}`}
        art={
          art && {
            backdrop: art.backdrop,
            icons: [art.icon],
            model: art.model,
            modelTilt: art.modelTilt,
          }
        }
        specs={[
          { label: "Juegos", value: String(officialGames.length) },
          { label: "Etapas", value: String(stages.length) },
          { label: "Fichas", value: String(entryCount) },
        ]}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Universos", href: "/universos" },
              { label: universe.name },
            ]}
          />
        }
      >
        {stages.length > 0 && (
          <nav
            className={styles["universe-page__nav"]}
            aria-label={`Etapas de ${universe.name}`}
          >
            <ul className={styles["universe-page__stages"]}>
              {stages.map((stage) => {
                const stageGames = getGamesByStage(stage.id);
                return (
                  <li key={stage.id}>
                    <a
                      href={`#${stage.id}`}
                      className={`${styles["universe-page__stage-link"]} ${styles[`universe-page__stage-link--${stage.id}`] ?? ""}`}
                    >
                      <span className={styles["universe-page__stage-name"]}>
                        {stage.name}
                      </span>
                      <span className={styles["universe-page__stage-subtitle"]}>
                        {stage.subtitle}
                      </span>
                      <span className={styles["universe-page__stage-meta"]}>
                        {stageGames.length > 0
                          ? `${stageYears(stageGames)} · ${stageGames.length} ${stageGames.length === 1 ? "juego" : "juegos"}`
                          : "En preparación"}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </GameHero>

      {stages.length > 0 ? (
        stages.map((stage) => {
          const stageGames = getGamesByStage(stage.id);

          return (
            <UniverseStage
              key={stage.id}
              stage={stage}
              gameCount={stageGames.length}
            >
              {renderDossiers(stageGames)}
            </UniverseStage>
          );
        })
      ) : (
        <div className={styles["universe-page__dossiers"]}>
          {renderDossiers(officialGames)}
        </div>
      )}

      <DossierMotion />
      <SmoothScroll />
    </main>
  );
}
