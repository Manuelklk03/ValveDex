import type { GameSectionId } from "./game-section";
import type { Source } from "./source";

export type EntryCategory = Exclude<GameSectionId, "lore">;

export type EntryAppearance = {
  gameId: string;
  summary?: string;
};

export type Entry = {
  id: string;
  slug: string;
  name: string;
  category: EntryCategory;
  summary: string;
  appearances: EntryAppearance[];
  sources: Source[];
};

export function isEntryCategory(
  sectionId: GameSectionId,
): sectionId is EntryCategory {
  return sectionId !== "lore";
}
