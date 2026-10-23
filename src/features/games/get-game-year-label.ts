import type { Game } from "@/domain/game";

export function getGameYearLabel(game: Game): string {
  return game.status === "released"
    ? String(game.releaseYear)
    : `Cancelado en ${game.cancelledYear}`;
}
