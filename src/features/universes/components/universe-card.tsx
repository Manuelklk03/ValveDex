import Link from "next/link";
import type { Universe } from "@/domain/universe";
import styles from "./universe-card.module.css";

type UniverseCardProps = {
  universe: Universe;
  gameNames: string[];
};

// Cada universo es una acreditación de acceso (docs/design.md): abierta o pendiente
export function UniverseCard({ universe, gameNames }: UniverseCardProps) {
  const isAvailable = universe.status === "available";
  const gameCount = gameNames.length;

  const className = isAvailable
    ? `${styles["universe-card"]} ${styles[`universe-card--${universe.id}`] ?? ""}`
    : `${styles["universe-card"]} ${styles["universe-card--coming-soon"]}`;

  return (
    <article className={className}>
      <p className={styles["universe-card__band"]}>
        <span>{isAvailable ? "Acceso concedido" : "Acceso pendiente"}</span>
        <span className={styles["universe-card__code"]}>{universe.id}</span>
      </p>

      <h2 className={styles["universe-card__title"]}>
        {isAvailable ? (
          <Link
            href={`/universos/${universe.slug}`}
            className={styles["universe-card__link"]}
          >
            {universe.name}
          </Link>
        ) : (
          universe.name
        )}
      </h2>
      <p className={styles["universe-card__description"]}>
        {universe.description}
      </p>

      {isAvailable ? (
        <div className={styles["universe-card__footer"]}>
          <p className={styles["universe-card__meta"]}>
            {gameCount} {gameCount === 1 ? "juego" : "juegos"}
          </p>
          <ul className={styles["universe-card__games"]}>
            {gameNames.map((name) => (
              <li key={name} className={styles["universe-card__game"]}>
                {name}
              </li>
            ))}
          </ul>
          <span className={styles["universe-card__arrow"]} aria-hidden="true">
            →
          </span>
        </div>
      ) : (
        <p className={styles["universe-card__badge"]}>Próximamente</p>
      )}
    </article>
  );
}
