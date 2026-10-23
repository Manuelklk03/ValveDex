import { games } from "@/data/games";
import { universes } from "@/data/universes";
import { getGameYear, type Game } from "@/domain/game";
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
    .sort((a, b) => getGameYear(a) - getGameYear(b));
}

export function getGameBySlug(
  universeId: string,
  gameSlug: string,
): Game | undefined {
  return games.find(
    (game) => game.universeId === universeId && game.slug === gameSlug,
  );
}

export function getUniverseAndGame(universeSlug: string, gameSlug: string) {
  const universe = getUniverseBySlug(universeSlug);

  if (!universe || universe.status !== "available") {
    return undefined;
  }

  const game = getGameBySlug(universe.id, gameSlug);

  if (!game) {
    return undefined;
  }

  return { universe, game };
}

export function getUniverseById(id: string): Universe | undefined {
  return universes.find((universe) => universe.id === id);
}

export function getGameById(id: string): Game | undefined {
  return games.find((game) => game.id === id);
}

export function getOfficialGamesByUniverse(universeId: string): Game[] {
  return getGamesByUniverse(universeId).filter(
    (game) => game.status === "released" && game.baseGameId === undefined,
  );
}

export function getModsByGame(gameId: string): Game[] {
  return games
    .filter((game) => game.status === "released" && game.baseGameId === gameId)
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export function getCancelledGamesByGame(gameId: string): Game[] {
  return games
    .filter((game) => game.status === "cancelled" && game.baseGameId === gameId)
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}
