import { decorImages } from "@/data/decor-images";
import { entries } from "@/data/entries";
import { gameLore } from "@/data/game-lore";
import { games } from "@/data/games";
import { valveMilestones } from "@/data/valve-milestones";
import { valvePeople } from "@/data/valve-people";
import type { MediaAsset } from "@/domain/media-asset";
import type { Source } from "@/domain/source";

export type SourceCredit = {
  source: Source;
  usedIn: string[];
};

export type ImageCredit = {
  image: MediaAsset;
  usedIn: string;
};

const gameNames = new Map(games.map((game) => [game.id, game.name]));

function getGameName(gameId: string): string {
  return gameNames.get(gameId) ?? gameId;
}

function collectSourceUses(): { source: Source; usedIn: string }[] {
  return [
    ...games.flatMap((game) =>
      game.sources.map((source) => ({ source, usedIn: game.name })),
    ),
    ...gameLore.flatMap((lore) =>
      lore.sources.map((source) => ({
        source,
        usedIn: `Lore de ${getGameName(lore.gameId)}`,
      })),
    ),
    ...entries.flatMap((entry) =>
      entry.sources.map((source) => ({ source, usedIn: entry.name })),
    ),
    ...valveMilestones.flatMap((milestone) =>
      milestone.sources.map((source) => ({
        source,
        usedIn: `Historia de Valve (${milestone.year})`,
      })),
    ),
    ...valvePeople.flatMap((person) =>
      person.sources.map((source) => ({ source, usedIn: person.name })),
    ),
  ];
}

export function getSourceCredits(): SourceCredit[] {
  const credits = new Map<string, SourceCredit>();

  for (const { source, usedIn } of collectSourceUses()) {
    const credit = credits.get(source.url);

    if (!credit) {
      credits.set(source.url, { source, usedIn: [usedIn] });
    } else if (!credit.usedIn.includes(usedIn)) {
      credit.usedIn.push(usedIn);
    }
  }

  return [...credits.values()].sort((a, b) =>
    a.source.title.localeCompare(b.source.title, "es"),
  );
}

export function getImageCredits(): ImageCredit[] {
  const entryImages = entries.flatMap((entry) =>
    entry.appearances.flatMap((appearance) =>
      [appearance.images?.original, appearance.images?.hd]
        .filter((image) => image !== undefined)
        .map((image) => ({
          image,
          usedIn: `${entry.name} · ${getGameName(appearance.gameId)}`,
        })),
    ),
  );

  return [...entryImages, ...decorImages];
}
