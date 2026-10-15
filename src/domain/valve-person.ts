import type { Source } from "./source";

export type ValvePerson = {
  id: string;
  slug: string;
  name: string;
  role: string;
  summary: string;
  sources: Source[];
};
