import Link from "next/link";
import type { Universe } from "@/domain/universe";
import styles from "./universe-card.module.css";

type UniverseCardProps = {
  universe: Universe;
  gameCount: number;
};

export function UniverseCard({ universe, gameCount }: UniverseCardProps) {
  const isAvailable = universe.status === "available";

  const className = isAvailable
    ? styles["universe-card"]
    : `${styles["universe-card"]} ${styles["universe-card--coming-soon"]}`;

  return (
    <article className={className}>
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
      <p className={styles["universe-card__meta"]}>
        {isAvailable ? (
          `${gameCount} ${gameCount === 1 ? "juego" : "juegos"}`
        ) : (
          <span className={styles["universe-card__badge"]}>Próximamente</span>
        )}
      </p>
    </article>
  );
}
