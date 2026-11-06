import { levelDetails } from "@/data/level-details";
import type { Entry } from "@/domain/entry";
import type { Level, LevelDetail } from "@/domain/level";
import { getEntries, getEntryById, getEntryBySlug } from "./get-entries";

const detailsByKey = new Map(
  levelDetails.map((detail) => [
    `${detail.chapterId}/${detail.mapFile}`,
    detail,
  ]),
);

// Los niveles de un capítulo, en el orden de sus archivos de mapa
export function getChapterLevels(chapter: Entry): Level[] {
  if (chapter.category !== "maps") return [];

  const { mapFiles } = chapter.details;

  return mapFiles.map((mapFile, index) => {
    const detail = detailsByKey.get(`${chapter.id}/${mapFile}`);

    return {
      mapFile,
      order: index + 1,
      total: mapFiles.length,
      title: detail?.name ?? `Nivel ${index + 1}`,
      detail,
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

// Las fichas de personajes, armas y enemigos que enlaza un nivel (los ids ya los valida una prueba)
export function getLevelEntries(detail: LevelDetail | undefined) {
  const resolve = (ids: string[] | undefined) =>
    (ids ?? []).flatMap((id) => {
      const entry = getEntryById(id);
      return entry ? [entry] : [];
    });

  return {
    characters: resolve(detail?.characterIds),
    weapons: resolve(detail?.weaponIds),
    enemies: resolve(detail?.enemyIds),
  };
}
