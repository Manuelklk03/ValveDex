import type { Source } from "./source";

export type GameLore = {
  gameId: string;
  paragraphs: string[];
  sources: Source[];
};
