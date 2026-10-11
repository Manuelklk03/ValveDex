import { gameSections } from "@/data/game-sections";

import type { GameSection } from "@/domain/game-section";

export function getGameSections(): GameSection[] {
  return [...gameSections];
}
