import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import type { Game } from "@/domain/game";
import { DossierMotion } from "@/features/games/components/dossier-motion";
import { GameDossier } from "@/features/games/components/game-dossier";
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
      <header className={styles["universe-page__hero"]}>
        <Breadcrumb
          items={[
            { label: "Universos", href: "/universos" },
            { label: universe.name },
          ]}
        />
        <div className={styles["universe-page__body"]}>
          <h1 className={styles["universe-page__title"]}>{universe.name}</h1>
          <p className={styles["universe-page__intro"]}>
            {universe.description}
            {stages.length > 0 &&
              " Elige una etapa y abre el dossier de cada juego."}
          </p>
        </div>
        {/* shortcut: λ solo de Half-Life; con otro universo disponible, el emblema pasará a sus datos */}
        {universe.id === "half-life" && (
          <span className={styles["universe-page__mark"]} aria-hidden="true">
            λ
          </span>
        )}

        {stages.length > 0 && (
          <nav aria-label={`Etapas de ${universe.name}`}>
            <ul className={styles["universe-page__stages"]}>
              {stages.map((stage) => (
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
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

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
          {renderDossiers(getOfficialGamesByUniverse(universe.id))}
        </div>
      )}

      <DossierMotion />
      <SmoothScroll />
    </main>
  );
}
