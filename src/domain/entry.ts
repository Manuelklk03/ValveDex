import type { GameSectionId } from "./game-section";
import type { Source } from "./source";
import type { MediaAsset } from "./media-asset";

export type EntryCategory = Exclude<GameSectionId, "lore">;

export type EntryImages = {
  original?: MediaAsset;
  hd?: MediaAsset;
};

export type EntryAppearance = {
  gameId: string;
  summary?: string;
  images?: EntryImages;
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
