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

type EntryBase = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  appearances: EntryAppearance[];
  sources: Source[];
};

export type WeaponDetails = {
  slot: number;
  ammo?: string;
};

export type MapDetails = {
  chapter: number;
};

export type CharacterDetails = {
  affiliation: string;
};

export type EnemyDetails = {
  origin: string;
};

export type Entry =
  | (EntryBase & { category: "weapons"; details: WeaponDetails })
  | (EntryBase & { category: "maps"; details: MapDetails })
  | (EntryBase & { category: "characters"; details: CharacterDetails })
  | (EntryBase & { category: "enemies"; details: EnemyDetails })
  | (EntryBase & { category: "trivia" | "easter-eggs" });

export function isEntryCategory(
  sectionId: GameSectionId,
): sectionId is EntryCategory {
  return sectionId !== "lore";
}
