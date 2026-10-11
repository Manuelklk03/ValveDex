import type { GameSectionId } from "./game-section";
import type { Source } from "./source";

export type EntryCategory = Exclude<GameSectionId, "lore">;

export type Entry = {
  id: string;
  slug: string;
  name: string;
  category: EntryCategory;
  summary: string;
  gameIds: string[];
  sources: Source[];
};
