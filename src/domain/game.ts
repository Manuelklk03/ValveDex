import type { Source } from "./source";

export type Game = {
  id: string;
  slug: string;
  universeId: string;
  name: string;
  releaseYear: number;
  developer: string;
  description: string;
  baseGameId?: string;
  sources: Source[];
};
