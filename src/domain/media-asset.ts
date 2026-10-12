import type { Source } from "./source";

export type MediaAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  source: Source;
  credit?: string;
  license?: string;
};
