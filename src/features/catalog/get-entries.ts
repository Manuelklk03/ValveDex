import type { Entry, EntryCategory, EntryAppearance } from "@/domain/entry";
import { entries } from "@/data/entries";
import type { MediaAsset } from "@/domain/media-asset";

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

export function getEntryAppearance(
  entry: Entry,
  gameId: string,
): EntryAppearance | undefined {
  return entry.appearances.find((appearance) => appearance.gameId === gameId);
}

export function getEntrySummaryForGame(entry: Entry, gameId: string): string {
  return getEntryAppearance(entry, gameId)?.summary ?? entry.summary;
}

export function getEntryThumbnail(
  entry: Entry,
  gameId: string,
): MediaAsset | undefined {
  const images = getEntryAppearance(entry, gameId)?.images;

  return images?.hd ?? images?.original;
}

export function getEntryById(id: string): Entry | undefined {
  return entries.find((entry) => entry.id === id);
}
