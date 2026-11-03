import type { Source } from "./source";

export type SteamEvent = {
  id: string;
  year: number;
  // Fecha completa o mes, solo cuando la fuente la da
  date?: string;
  title: string;
  description: string;
  sources: Source[];
};

// Una época de Steam: su periodo y los hechos que la definen.
// La presentación visual de cada época (la «skin») vive en la página, no en los datos.
export type SteamEra = {
  id: "origins" | "platform" | "unified";
  name: string;
  yearFrom: number;
  yearTo?: number;
  summary: string;
  events: SteamEvent[];
};
