import type { ReactNode } from "react";
import { dossierArt } from "@/data/dossier-art";
import type { Game } from "@/domain/game";
import type { DossierLook } from "../dossier-looks";
import { DossierArt } from "./dossier-art";
import styles from "./game-dossier.module.css";

type WorldHeroProps = {
  game: Game;
  look: DossierLook;
  specs: { label: string; value: ReactNode }[];
  // Migas de pan, arriba de la cabecera
  breadcrumb: ReactNode;
  // Datos extra bajo el resumen: juego base, fuentes…
  children?: ReactNode;
};

// Cabecera del hub de un juego de Half-Life: es el mismo mundo del dossier (material, escena, cartel de techo,
// suelo, detalles y protagonista) a todo el ancho y sin las puertas, que pasan a ser las salas de la página
export function WorldHero({
  game,
  look,
  specs,
  breadcrumb,
  children,
}: WorldHeroProps) {
  const art = dossierArt[game.id];
  const titleId = `${game.id}-world-title`;
  const className = [
    styles["game-dossier"],
    styles["game-dossier--corridor"],
    styles[`game-dossier--${look.variant}`],
    styles["game-dossier--hero"],
  ].join(" ");

  return (
    <article className={className} aria-labelledby={titleId}>
      {art && <DossierArt art={art} corridor priority />}

      <span className={styles["game-dossier__stamp"]} aria-hidden="true">
        {look.stamp}
      </span>
      <span className={styles["game-dossier__edge"]} aria-hidden="true">
        {look.edge}
      </span>

      <header className={styles["game-dossier__header"]}>
        <div className={styles["game-dossier__heading"]}>
          <div className={styles["game-dossier__crumbs"]}>{breadcrumb}</div>
          <p className={styles["game-dossier__label"]}>{look.label}</p>
          <h1 id={titleId} className={styles["game-dossier__title"]}>
            {game.name}
          </h1>
          <p className={styles["game-dossier__summary"]}>{game.description}</p>
          {children}
        </div>

        <dl className={styles["game-dossier__specs"]}>
          {specs.map((spec) => (
            <div key={spec.label} className={styles["game-dossier__spec"]}>
              <dt className={styles["game-dossier__spec-label"]}>
                {spec.label}
              </dt>
              <dd className={styles["game-dossier__spec-value"]}>
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>
    </article>
  );
}
