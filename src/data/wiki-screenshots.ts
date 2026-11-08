import type { Entry } from "@/domain/entry";
import type { MediaAsset } from "@/domain/media-asset";

// Capturas del juego publicadas en Combine OverWiki, para los juegos que no están instalados y no se pueden
// fotografiar. Solo entran archivos cuya página declara la licencia «Gamescreenshot» (material del juego © Valve).
// Cada una se reduce a 1400 px como máximo y se guarda como WebP.

type WikiScreenshot = {
  entryId: string;
  gameId: string;
  // Nombre del archivo en la wiki, sin el prefijo «File:»
  file: string;
  width: number;
  height: number;
};

const screenshots: WikiScreenshot[] = [
  {
    entryId: "decay-gina-cross",
    gameId: "half-life-decay",
    file: "Gina_Cross.jpg",
    width: 471,
    height: 716,
  },
  {
    entryId: "decay-colette-green",
    gameId: "half-life-decay",
    file: "Colette_Green.jpg",
    width: 467,
    height: 684,
  },
  {
    entryId: "decay-richard-keller",
    gameId: "half-life-decay",
    file: "Keller_bust.jpg",
    width: 739,
    height: 713,
  },
];

function toImage(shot: WikiScreenshot, name: string): MediaAsset {
  return {
    src: `/images/entries/${shot.entryId}-${shot.gameId}.webp`,
    alt: `${name}, captura del juego`,
    width: shot.width,
    height: shot.height,
    source: {
      title: `File:${shot.file} - Combine OverWiki`,
      url: `https://combineoverwiki.net/wiki/File:${shot.file}`,
      kind: "wiki",
    },
    credit: "Captura del juego, publicada en Combine OverWiki",
    license: "Gamescreenshot (material del juego © Valve)",
  };
}

// Pone la captura en la aparición de la ficha que corresponde
export function withWikiScreenshots(entry: Entry): Entry {
  const matching = screenshots.filter((s) => s.entryId === entry.id);
  if (matching.length === 0) return entry;
  return {
    ...entry,
    appearances: entry.appearances.map((appearance) => {
      const shot = matching.find((s) => s.gameId === appearance.gameId);
      return shot
        ? { ...appearance, images: { original: toImage(shot, entry.name) } }
        : appearance;
    }),
  };
}
