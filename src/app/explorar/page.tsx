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

  return (
    <main className={styles["explore-page"]}>
      <header className={styles["explore-page__header"]}>
        <h1 className={styles["explore-page__title"]}>Explorar</h1>
        <p className={styles["explore-page__intro"]}>
          Todas las fichas de ValveDex agrupadas por categoría.
        </p>
      </header>

      {rows.map(({ section, entries }) => (
        <EntryRow
          key={section.id}
          id={section.id}
          title={section.name}
          href={`/explorar/${section.slug}`}
          entries={entries}
        />
      ))}
    </main>
  );
}
