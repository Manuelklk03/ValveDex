import type { Source } from "./source";

export type Milestone = {
  id: string;
  year: number;
  title: string;
  description: string;
  sources: Source[];
};
