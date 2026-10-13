import { gameLore } from "@/data/game-lore";
import type { GameLore } from "@/domain/game-lore";

export function getGameLore(gameId: string): GameLore | undefined {
  return gameLore.find((lore) => lore.gameId === gameId);
}
