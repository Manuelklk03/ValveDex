import Link from "next/link";
import type { Entry } from "@/domain/entry";
import styles from "./entry-card.module.css";

type EntryCardProps = {
  entry: Entry;
};

export function EntryCard({ entry }: EntryCardProps) {
  return (
    <article className={styles["entry-card"]}>
      <h3 className={styles["entry-card__title"]}>
        <Link
          href={`/fichas/${entry.slug}`}
          className={styles["entry-card__link"]}
        >
          {entry.name}
        </Link>
      </h3>
      <p className={styles["entry-card__summary"]}>{entry.summary}</p>
    </article>
  );
}
