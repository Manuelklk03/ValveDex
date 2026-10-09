import { games } from "@/data/games";
import { universes } from "@/data/universes";
import type { Game } from "@/domain/game";
import type { Universe } from "@/domain/universe";

export function getUniverses(): Universe[] {
  return [...universes];
}

export function getUniverseBySlug(slug: string): Universe | undefined {
  return universes.find((universe) => universe.slug === slug);
}

export function getGamesByUniverse(universeId: string): Game[] {
  return games
    .filter((game) => game.universeId === universeId)
    .sort((a, b) => a.releaseYear - b.releaseYear);
}
