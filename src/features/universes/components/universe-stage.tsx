import type { ReactNode } from "react";
import type { UniverseStage as UniverseStageData } from "@/domain/universe-stage";
import styles from "./universe-stage.module.css";

type UniverseStageProps = {
  stage: UniverseStageData;
  gameCount: number;
  children?: ReactNode;
};

// Etapa de un universo: su placa y sus dossiers, o un expediente cerrado si aún no tiene juegos
export function UniverseStage({
  stage,
  gameCount,
  children,
}: UniverseStageProps) {
  const titleId = `${stage.id}-title`;
  const isAvailable = stage.status === "available";
  const plannedGames = stage.plannedGames ?? [];
  const className = [
    styles["universe-stage"],
    styles[`universe-stage--${stage.id}`],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={stage.id} className={className} aria-labelledby={titleId}>
      <header className={styles["universe-stage__plate"]}>
        <h2 id={titleId} className={styles["universe-stage__name"]}>
          {stage.name}
        </h2>
        <p className={styles["universe-stage__subtitle"]}>{stage.subtitle}</p>
        <p className={styles["universe-stage__summary"]}>{stage.summary}</p>
        <p className={styles["universe-stage__meta"]}>
          {isAvailable
            ? `${gameCount} ${gameCount === 1 ? "juego" : "juegos"}`
            : "En preparación"}
        </p>
      </header>

      {isAvailable ? (
        <div className={styles["universe-stage__dossiers"]}>
          {children}
          {plannedGames.map((name) => (
            <p key={name} className={styles["universe-stage__pending-row"]}>
              <span className={styles["universe-stage__pending-name"]}>
                {name}
              </span>
              <span className={styles["universe-stage__pending-status"]}>
                En preparación
              </span>
            </p>
          ))}
        </div>
      ) : (
        <div className={styles["universe-stage__sealed"]}>
          <p className={styles["universe-stage__sealed-status"]}>
            Expediente en preparación
          </p>
          <ul className={styles["universe-stage__planned"]}>
            {plannedGames.map((name) => (
              <li key={name} className={styles["universe-stage__planned-game"]}>
                {name}
              </li>
            ))}
          </ul>
          <p className={styles["universe-stage__sealed-note"]}>
            Sus dossiers se abrirán cuando tengan fichas con fuentes.
          </p>
        </div>
      )}
    </section>
  );
}
