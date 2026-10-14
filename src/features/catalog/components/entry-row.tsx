import type { Entry } from "@/domain/entry";
import { EntryCard } from "./entry-card";
import styles from "./entry-row.module.css";

type EntryRowProps = {
  id: string;
  title: string;
  entries: Entry[];
};

export function EntryRow({ id, title, entries }: EntryRowProps) {
  const titleId = `${id}-title`;

  return (
    <section className={styles["entry-row"]} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles["entry-row__title"]}>
        {title}
      </h2>
      <ul className={styles["entry-row__list"]}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <EntryCard entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
}
