import type { Entry, EntryCategory } from "@/domain/entry";
import { entries } from "@/data/entries";

export function getEntriesByGameAndCategory(
  gameId: string,
  category: EntryCategory,
): Entry[] {
  return entries
    .filter(
      (entry) => entry.category === category && entry.gameIds.includes(gameId),
    )
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}
