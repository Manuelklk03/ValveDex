import type { UniverseStatus } from "./universe";

// Agrupación editorial de un universo (en Half-Life, por motor); no indica la cronología de la ficción
export type UniverseStage = {
  id: string;
  universeId: string;
  name: string;
  subtitle: string;
  summary: string;
  status: UniverseStatus;
  plannedGames?: string[];
};
