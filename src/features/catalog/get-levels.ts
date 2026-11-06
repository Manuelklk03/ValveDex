import { entityEntries } from "@/data/levels/entity-entries";
import { mapEntities } from "@/data/levels/map-entities";
import { levelDetails } from "@/data/level-details";
import type { Entry } from "@/domain/entry";
import type { Level, LevelLinks } from "@/domain/level";
import { getEntries, getEntryById, getEntryBySlug } from "./get-entries";

const detailsByKey = new Map(
  levelDetails.map((detail) => [
    `${detail.chapterId}/${detail.mapFile}`,
    detail,
  ]),
);

function unique(ids: string[]): string[] {
  return [...new Set(ids)];
}

// Las fichas que un mapa coloca según su lista de entidades. Solo cuentan las fichas que existen
// y que aparecen en el juego del capítulo (los episodios no tienen todas las de Half-Life 2).
function getGeneratedLinks(chapter: Entry, mapFile: string): LevelLinks {
  const gameId = chapter.appearances[0]?.gameId;
  const table = entityEntries[gameId ?? ""] ?? {};
  const links: LevelLinks = { characterIds: [], weaponIds: [], enemyIds: [] };

  for (const className of Object.keys(mapEntities[mapFile] ?? {})) {
    const link = table[className];
    const entry = link ? getEntryById(link.entryId) : undefined;

    if (
      !link ||
      entry?.category !== link.category ||
      !entry.appearances.some((appearance) => appearance.gameId === gameId)
    ) {
      continue;
    }

    const target =
      link.category === "characters"
        ? links.characterIds
        : link.category === "weapons"
          ? links.weaponIds
          : links.enemyIds;
    target.push(link.entryId);
  }

  return links;
}

// Los niveles de un capítulo, en el orden de sus archivos de mapa
export function getChapterLevels(chapter: Entry): Level[] {
  if (chapter.category !== "maps") return [];

  const { mapFiles } = chapter.details;

  return mapFiles.map((mapFile, index) => {
    const detail = detailsByKey.get(`${chapter.id}/${mapFile}`);
    const generated = getGeneratedLinks(chapter, mapFile);
    const links: LevelLinks = {
      characterIds: unique([
        ...(detail?.characterIds ?? []),
        ...generated.characterIds,
      ]),
      weaponIds: unique([...(detail?.weaponIds ?? []), ...generated.weaponIds]),
      enemyIds: unique([...(detail?.enemyIds ?? []), ...generated.enemyIds]),
    };

    return {
      mapFile,
      order: index + 1,
      total: mapFiles.length,
      title: detail?.name ?? `Nivel ${index + 1}`,
      detail,
      links,
      fromGameFiles:
        generated.characterIds.length +
          generated.weaponIds.length +
          generated.enemyIds.length >
        0,
    };
  });
}

export function getLevelPage(chapterSlug: string, mapFile: string) {
  const chapter = getEntryBySlug(chapterSlug);
  if (!chapter) return undefined;

  const levels = getChapterLevels(chapter);
  const index = levels.findIndex((level) => level.mapFile === mapFile);
  if (index === -1) return undefined;

  return {
    chapter,
    level: levels[index],
    previous: levels[index - 1],
    next: levels[index + 1],
  };
}

// Una ruta estática por cada nivel de cada capítulo
export function getLevelPaths(): { entrySlug: string; levelSlug: string }[] {
  return getEntries().flatMap((entry) =>
    getChapterLevels(entry).map((level) => ({
      entrySlug: entry.slug,
      levelSlug: level.mapFile,
    })),
  );
}

// Las fichas de personajes, armas y enemigos que enlaza un nivel
export function getLevelEntries(level: Level) {
  const resolve = (ids: string[]) =>
    ids.flatMap((id) => {
      const entry = getEntryById(id);
      return entry ? [entry] : [];
    });

  return {
    characters: resolve(level.links.characterIds),
    weapons: resolve(level.links.weaponIds),
    enemies: resolve(level.links.enemyIds),
  };
}
