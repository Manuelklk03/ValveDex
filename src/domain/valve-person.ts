import type { MediaAsset } from "./media-asset";
import type { Source } from "./source";

export type ValvePerson = {
  id: string;
  slug: string;
  name: string;
  role: string;
  summary: string;
  // Foto con licencia libre; sin ella, la página no muestra imagen
  image?: MediaAsset;
  sources: Source[];
};
