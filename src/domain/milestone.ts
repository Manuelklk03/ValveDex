import type { Source } from "./source";

export type Milestone = {
  id: string;
  year: number;
  // Fecha completa o mes, solo cuando la fuente la da (por ejemplo, «12 de septiembre de 2003»)
  date?: string;
  title: string;
  description: string;
  sources: Source[];
};
