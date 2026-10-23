import type { Source } from "./source";

type GameBase = {
  id: string;
  slug: string;
  universeId: string;
  name: string;
  developer: string;
  description: string;
  baseGameId?: string;
  sources: Source[];
};

export type Game =
  | (GameBase & { status: "released"; releaseYear: number })
  | (GameBase & { status: "cancelled"; cancelledYear: number });

export function getGameYear(game: Game): number {
  return game.status === "released" ? game.releaseYear : game.cancelledYear;
}
