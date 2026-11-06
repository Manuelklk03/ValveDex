import type { LoreParagraph } from "./game-lore";
import type { MediaAsset } from "./media-asset";
import type { Source } from "./source";

// Ficha de un nivel (un archivo de mapa dentro de un capítulo). Es opcional: un nivel sin ficha
// se muestra igualmente en la lista del capítulo, con su número, su archivo de mapa y los
// personajes, enemigos y armas que el propio mapa coloca (leídos de los archivos del juego).
export type LevelDetail = {
  // Id de la ficha de capítulo (categoría «maps») y archivo de mapa, uno de `details.mapFiles`
  chapterId: string;
  mapFile: string;
  // Nombre propio del nivel solo si una fuente lo da
  name?: string;
  summary: string;
  // Qué se hace en el nivel; lo que destripa la historia va con `spoiler: true`
  paragraphs?: LoreParagraph[];
  // Ids de fichas de personajes, armas y enemigos que aparecen o se encuentran en el nivel
  characterIds?: string[];
  weaponIds?: string[];
  enemyIds?: string[];
  images?: MediaAsset[];
  sources: Source[];
};

export type LevelLinks = {
  characterIds: string[];
  weaponIds: string[];
  enemyIds: string[];
};

export type Level = {
  mapFile: string;
  // Posición dentro del capítulo, desde 1
  order: number;
  total: number;
  title: string;
  detail?: LevelDetail;
  // Las fichas del nivel: las de su ficha manual más las que salen de las entidades del mapa
  links: LevelLinks;
  // true si alguna se ha leído del archivo del mapa (para decirlo en la página)
  fromGameFiles: boolean;
};
