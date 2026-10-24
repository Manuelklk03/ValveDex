import type { Metadata } from "next";
import { isEntryCategory } from "@/domain/entry";
import { EntryRow } from "@/features/catalog/components/entry-row";
import { getEntriesByCategory } from "@/features/catalog/get-entries";
import { getGameSections } from "@/features/games/get-game-sections";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Explorar",
  description: "Todas las fichas de ValveDex agrupadas por categoría.",
};

export default function ExplorePage() {
  const rows = getGameSections().flatMap((section) => {
    if (!isEntryCategory(section.id)) {
      return [];
    }

    const entries = getEntriesByCategory(section.id);

    return entries.length > 0 ? [{ section, entries }] : [];
  });
  const entryCount = rows.reduce((total, row) => total + row.entries.length, 0);

  return (
    <main className={styles["explore-page"]}>
      <header className={styles["explore-page__header"]}>
        <p className={styles["explore-page__eyebrow"]}>
          {entryCount} fichas · {rows.length} categorías
        </p>
        <h1 className={styles["explore-page__title"]}>Explorar</h1>
        <p className={styles["explore-page__intro"]}>
          Todas las fichas de ValveDex, de todos los juegos, agrupadas por
          categoría.
        </p>
      </header>

      {/* Índice del archivo: salta a cada fila, con el color de su sector */}
      <nav aria-label="Categorías" className={styles["explore-page__index"]}>
        <ul className={styles["explore-page__index-list"]}>
          {rows.map(({ section, entries }) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`${styles["explore-page__index-link"]} ${styles[`explore-page__index-link--${section.id}`]}`}
              >
                {section.name}
                <span className={styles["explore-page__index-count"]}>
                  {entries.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles["explore-page__rows"]}>
        {rows.map(({ section, entries }, index) => (
          <EntryRow
            key={section.id}
            id={section.id}
            index={index + 1}
            title={section.name}
            href={`/explorar/${section.slug}`}
            entries={entries}
          />
        ))}
      </div>
    </main>
  );
}
