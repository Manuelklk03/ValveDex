import Link from "next/link";
import type { Entry } from "@/domain/entry";
import { EntryCard } from "./entry-card";
import styles from "./entry-row.module.css";

type EntryRowProps = {
  id: string;
  index: number;
  title: string;
  href: string;
  entries: Entry[];
};

export function EntryRow({ id, index, title, href, entries }: EntryRowProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      className={`${styles["entry-row"]} ${styles[`entry-row--${id}`]}`}
      aria-labelledby={titleId}
    >
      <div className={styles["entry-row__header"]}>
        <span className={styles["entry-row__index"]} aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <h2 id={titleId} className={styles["entry-row__title"]}>
          {title}
        </h2>
        <span className={styles["entry-row__count"]}>
          {entries.length} {entries.length === 1 ? "ficha" : "fichas"}
        </span>
        <Link href={href} className={styles["entry-row__more"]}>
          Ver todo<span className="sr-only"> en {title}</span>
        </Link>
      </div>
      <ul className={styles["entry-row__list"]}>
        {entries.map((entry) => (
          <li key={entry.id} className={styles["entry-row__item"]}>
            <EntryCard entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
}
