import type { Entry, EntryCategory, EntryAppearance } from "@/domain/entry";
import { entries } from "@/data/entries";
import type { MediaAsset } from "@/domain/media-asset";

// Los capítulos de un mismo juego van en su orden; el resto, por nombre.
// Entre juegos distintos se agrupan por juego para no intercalar sus capítulos
export function compareEntries(a: Entry, b: Entry): number {
  if (a.category === "maps" && b.category === "maps") {
    const gameA = a.appearances[0]?.gameId ?? "";
    const gameB = b.appearances[0]?.gameId ?? "";

    return gameA === gameB
      ? a.details.chapter - b.details.chapter
      : gameA.localeCompare(gameB);
  }
  return a.name.localeCompare(b.name, "es");
}

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
    .sort(compareEntries);
}

export type EntrySiblings = {
  previous?: Entry;
  next?: Entry;
  // Otras fichas del mismo apartado y juego: las siguientes a la actual primero y, si faltan, las anteriores
  others: Entry[];
};

// Las vecinas de una ficha en la lista de su apartado y juego, para la navegación al pie de la ficha.
// `list` es la lista del apartado tal como se pinta; sin ella, vale la de la categoría de la ficha
export function getEntrySiblings(
  entry: Entry,
  gameId: string,
  limit = 4,
  list: Entry[] = getEntriesByGameAndCategory(gameId, entry.category),
): EntrySiblings {
  const index = list.findIndex((item) => item.id === entry.id);
  if (index === -1) return { others: [] };

  const after = list.slice(index + 1);
  const before = list.slice(0, index);

  return {
    previous: list[index - 1],
    next: list[index + 1],
    others: [...after, ...before].slice(0, limit),
  };
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

export function getEntriesByCategory(category: EntryCategory) {
  return entries
    .filter((entry) => entry.category === category)
    .sort(compareEntries);
}
