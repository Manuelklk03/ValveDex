import Link from "next/link";
import type { Entry } from "@/domain/entry";
import styles from "./entry-card.module.css";

type EntryCardProps = {
  entry: Entry;
};

export function EntryCard({ entry }: EntryCardProps) {
  const gameCount = entry.appearances.length;

  return (
    <article
      className={`${styles["entry-card"]} ${styles[`entry-card--${entry.category}`]}`}
    >
      <h3 className={styles["entry-card__title"]}>
        <Link
          href={`/fichas/${entry.slug}`}
          className={styles["entry-card__link"]}
        >
          {entry.name}
        </Link>
      </h3>
      <p className={styles["entry-card__summary"]}>{entry.summary}</p>
      <p className={styles["entry-card__meta"]}>
        {gameCount} {gameCount === 1 ? "juego" : "juegos"}
        <span className={styles["entry-card__arrow"]} aria-hidden="true">
          →
        </span>
      </p>
    </article>
  );
}
