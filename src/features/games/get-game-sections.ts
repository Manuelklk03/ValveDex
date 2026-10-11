import { gameSections } from "@/data/game-sections";

import type { GameSection } from "@/domain/game-section";

export function getGameSections(): GameSection[] {
  return [...gameSections];
}

export function getGameSectionBySlug(slug: string): GameSection | undefined {
  return gameSections.find((section) => section.slug === slug);
}
