import type { Entry, EntryCategory } from "@/domain/entry";
import { entries } from "@/data/entries";

export function getEntriesByGameAndCategory(
  gameId: string,
  category: EntryCategory,
): Entry[] {
  return entries
    .filter(
      (entry) =>
        entry.category === category &&
        entry.appearances.some((appearance) => appearance.gameId === gameId),
    )
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export function getEntries(): Entry[] {
  return [...entries];
}

export function getEntryBySlug(slug: string): Entry | undefined {
  return entries.find((entry) => entry.slug === slug);
}

export function getEntrySummaryForGame(entry: Entry, gameId: string): string {
  const appearance = entry.appearances.find(
    (appearance) => appearance.gameId === gameId,
  );

  return appearance?.summary ?? entry.summary;
}
