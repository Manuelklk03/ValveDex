import type { Entry } from "@/domain/entry";
import type { MediaAsset } from "@/domain/media-asset";
import type { Source } from "@/domain/source";

// Capturas de los juegos que no están instalados y no se pueden fotografiar: de Combine OverWiki (solo archivos cuya
// página declara la licencia «Gamescreenshot») o de la página del juego en la tienda de Steam (`store`).
// Cada una se reduce a 1400 px como máximo y se guarda como WebP.

type WikiScreenshot = {
  entryId: string;
  gameId: string;
  // Nombre del archivo en la wiki, sin el prefijo «File:»; sin él, la captura es de la tienda de Steam
  file?: string;
  width: number;
  height: number;
};

const alyxStore: Source = {
  title: "Half-Life: Alyx en Steam (capturas de la tienda)",
  url: "https://store.steampowered.com/app/546560/HalfLife_Alyx/",
  kind: "official",
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
  {
    entryId: "alyx-pistol",
    gameId: "half-life-alyx",
    width: 1400,
    height: 788,
  },
  {
    entryId: "alyx-gravity-gloves",
    gameId: "half-life-alyx",
    width: 1400,
    height: 788,
  },
  {
    entryId: "alyx-combine-grunt",
    gameId: "half-life-alyx",
    width: 1400,
    height: 788,
  },
  {
    entryId: "alyx-russell",
    gameId: "half-life-alyx",
    width: 1400,
    height: 788,
  },
];

function toImage(shot: WikiScreenshot, name: string): MediaAsset {
  return {
    src: `/images/entries/${shot.entryId}-${shot.gameId}.webp`,
    alt: `${name}, captura del juego`,
    width: shot.width,
    height: shot.height,
    source: shot.file
      ? {
          title: `File:${shot.file} - Combine OverWiki`,
          url: `https://combineoverwiki.net/wiki/File:${shot.file}`,
          kind: "wiki",
        }
      : alyxStore,
    credit: shot.file
      ? "Captura del juego, publicada en Combine OverWiki"
      : "Captura promocional de la página del juego en Steam",
    license: shot.file
      ? "Gamescreenshot (material del juego © Valve)"
      : "Material del juego © Valve",
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
