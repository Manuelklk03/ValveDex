import type { Source } from "./source";

// Una cifra de un nivel de construcción (salud, coste, daño…), con su unidad ya escrita en el valor
export type BuildingStat = { label: string; value: string };

export type BuildingLevel = {
  level: number;
  stats: BuildingStat[];
  note?: string;
};

// Construcción del Engineer; sus niveles se muestran en un desplegable junto a la ficha del Engineer
export type Building = {
  id: string;
  name: string;
  summary: string;
  // Juegos en los que existe (con sus propias cifras si difieren, en los niveles)
  gameId: string;
  levels: BuildingLevel[];
  sources: Source[];
};
