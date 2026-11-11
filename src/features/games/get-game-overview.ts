import type { Entry } from "@/domain/entry";
import type { MediaAsset } from "@/domain/media-asset";
import {
  getEntriesByGameAndCategory,
  getEntryThumbnail,
} from "@/features/catalog/get-entries";
import { getSectionEntries } from "./get-section-entries";
import type { SectionStatus } from "./get-section-statuses";

export type SectionPreview = {
  // Imagen real de la primera ficha del apartado que la tiene
  thumbnail?: MediaAsset;
  // Los renders de modelos van sobre fondo transparente y se ajustan; las capturas llenan la tarjeta
  isCapture: boolean;
};

// Miniatura de cada apartado, sacada de sus fichas: nada de imágenes inventadas
export function getSectionPreviews(
  gameId: string,
  statuses: SectionStatus[],
): Record<string, SectionPreview> {
  const previews: Record<string, SectionPreview> = {};
  for (const { section } of statuses) {
    if (section.id === "lore") continue;
    const entries = getSectionEntries(gameId, section.id).map(
      (item) => item.entry,
    );
    const withImage = entries
      .map((entry) => ({ entry, image: getEntryThumbnail(entry, gameId) }))
      .find((candidate) => candidate.image);
    if (withImage)
      previews[section.id] = {
        thumbnail: withImage.image,
        isCapture: section.id === "maps",
      };
  }
  return previews;
}

// Cifras reales del juego, calculadas a partir de sus fichas
export function getGameStats(
  gameId: string,
  statuses: SectionStatus[],
): { label: string; value: number }[] {
  const count = (id: string) =>
    statuses.find((status) => status.section.id === id)?.entryNames.length ?? 0;
  // Sin repetir: en los juegos con equipos una misma ficha sale en «Personajes» y en «Enemigos»
  const total = new Set(statuses.flatMap((status) => status.entryNames)).size;
  return [
    { label: "Fichas", value: total },
    { label: "Capítulos", value: count("maps") },
    { label: "Armas", value: count("weapons") },
    { label: "Personajes", value: count("characters") },
    { label: "Enemigos", value: count("enemies") },
  ].filter((stat) => stat.value > 0 || stat.label === "Fichas");
}

export type ChapterShot = { entry: Entry; image: MediaAsset };

// Capítulos del juego que tienen captura propia, en orden
export function getChapterShots(gameId: string): ChapterShot[] {
  return getEntriesByGameAndCategory(gameId, "maps").flatMap((entry) => {
    const image = getEntryThumbnail(entry, gameId);
    return image ? [{ entry, image }] : [];
  });
}
