import type { Source } from "./source";

export type LoreParagraph = {
  text: string;
  // true: destripa la historia y la web lo oculta tras un botón
  spoiler?: boolean;
};

export type GameLore = {
  gameId: string;
  paragraphs: LoreParagraph[];
  sources: Source[];
};
