import type { Source } from "@/domain/source";

// Página de Steam de cada juego instalado: fuente de las imágenes propias hechas con sus archivos
export const steamSources: Record<string, Source> = {
  "half-life": {
    title: "Half-Life en Steam (archivos del juego)",
    url: "https://store.steampowered.com/app/70/HalfLife/",
    kind: "official",
  },
  "half-life-opposing-force": {
    title: "Half-Life: Opposing Force en Steam (archivos del juego)",
    url: "https://store.steampowered.com/app/50/HalfLife_Opposing_Force/",
    kind: "official",
  },
  "half-life-blue-shift": {
    title: "Half-Life: Blue Shift en Steam (archivos del juego)",
    url: "https://store.steampowered.com/app/130/HalfLife_Blue_Shift/",
    kind: "official",
  },
  "half-life-2": {
    title: "Half-Life 2 en Steam (archivos del juego)",
    url: "https://store.steampowered.com/app/220/HalfLife_2/",
    kind: "official",
  },
  "half-life-2-episode-one": {
    title: "Half-Life 2: Episode One en Steam (archivos del juego)",
    url: "https://store.steampowered.com/app/380/HalfLife_2_Episode_One/",
    kind: "official",
  },
  "half-life-2-episode-two": {
    title: "Half-Life 2: Episode Two en Steam (archivos del juego)",
    url: "https://store.steampowered.com/app/420/HalfLife_2_Episode_Two/",
    kind: "official",
  },
};
