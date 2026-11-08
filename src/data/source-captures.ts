import type { Entry } from "@/domain/entry";
import type { MediaAsset } from "@/domain/media-asset";
import { steamSources } from "./steam-sources";

// Imágenes propias de los modelos de la etapa Source: cada modelo se lee de los VPK del juego, se convierte a
// .glb con scripts/source-mdl-to-glb.mjs y se fotografía con la misma cámara y luz que el visor 3D, sobre fondo
// transparente. Pose de referencia del modelo. Sin pareja HD: Source no tiene un High Definition Pack.

type SourceCapture = {
  entryId: string;
  gameId: string;
  // Carpeta del juego de la que sale el modelo
  folder: "hl2" | "episodic" | "ep2";
  model: string;
  width: number;
  height: number;
};

const captures: SourceCapture[] = [
  {
    entryId: "hl2-gravity-gun",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_physics",
    width: 623,
    height: 349,
  },
  {
    entryId: "hl2-pistol",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_pistol",
    width: 487,
    height: 634,
  },
  {
    entryId: "hl2-357",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_357",
    width: 413,
    height: 337,
  },
  {
    entryId: "hl2-smg",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_smg1",
    width: 484,
    height: 537,
  },
  {
    entryId: "hl2-pulse-rifle",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_irifle",
    width: 501,
    height: 315,
  },
  {
    entryId: "hl2-shotgun",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_shotgun",
    width: 542,
    height: 388,
  },
  {
    entryId: "hl2-crossbow",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_crossbow",
    width: 559,
    height: 256,
  },
  {
    entryId: "hl2-rpg",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_rocket_launcher",
    width: 597,
    height: 333,
  },
  {
    entryId: "hl2-bugbait",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_bugbait",
    width: 568,
    height: 598,
  },
  {
    entryId: "hl2-crowbar",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_crowbar",
    width: 502,
    height: 404,
  },
  {
    entryId: "hl2-frag-grenade",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_grenade",
    width: 330,
    height: 842,
  },
  {
    entryId: "hl2-stun-baton",
    gameId: "half-life-2",
    folder: "hl2",
    model: "weapons/w_stunbaton",
    width: 589,
    height: 317,
  },
  {
    entryId: "hl2-civil-protection",
    gameId: "half-life-2",
    folder: "hl2",
    model: "police",
    width: 316,
    height: 834,
  },
  {
    entryId: "hl2-overwatch-soldier",
    gameId: "half-life-2",
    folder: "hl2",
    model: "combine_soldier",
    width: 317,
    height: 833,
  },
  {
    entryId: "hl2-combine-elite",
    gameId: "half-life-2",
    folder: "hl2",
    model: "combine_super_soldier",
    width: 316,
    height: 836,
  },
  {
    entryId: "hl2-strider",
    gameId: "half-life-2",
    folder: "hl2",
    model: "combine_strider",
    width: 360,
    height: 833,
  },
  {
    entryId: "hl2-gunship",
    gameId: "half-life-2",
    folder: "hl2",
    model: "gunship",
    width: 502,
    height: 369,
  },
  {
    entryId: "hl2-fast-zombie",
    gameId: "half-life-2",
    folder: "hl2",
    model: "zombie/fast",
    width: 512,
    height: 682,
  },
  {
    entryId: "hl2-classic-zombie",
    gameId: "half-life-2",
    folder: "hl2",
    model: "zombie/classic",
    width: 481,
    height: 726,
  },
  {
    entryId: "hl2-poison-zombie",
    gameId: "half-life-2",
    folder: "hl2",
    model: "zombie/poison",
    width: 443,
    height: 724,
  },
  {
    entryId: "hl2-antlion",
    gameId: "half-life-2",
    folder: "hl2",
    model: "antlion",
    width: 581,
    height: 748,
  },
  {
    entryId: "hl2-antlion-guard",
    gameId: "half-life-2",
    folder: "hl2",
    model: "antlion_guard",
    width: 579,
    height: 680,
  },
  {
    entryId: "hl2-classic-headcrab",
    gameId: "half-life-2",
    folder: "hl2",
    model: "headcrabclassic",
    width: 702,
    height: 565,
  },
  {
    entryId: "hl2-fast-headcrab",
    gameId: "half-life-2",
    folder: "hl2",
    model: "headcrab",
    width: 715,
    height: 463,
  },
  {
    entryId: "hl2-poison-headcrab",
    gameId: "half-life-2",
    folder: "hl2",
    model: "headcrabblack",
    width: 761,
    height: 483,
  },
  {
    entryId: "hl2-manhack",
    gameId: "half-life-2",
    folder: "hl2",
    model: "manhack",
    width: 368,
    height: 699,
  },
  {
    entryId: "hl2-rollermine",
    gameId: "half-life-2",
    folder: "hl2",
    model: "roller",
    width: 514,
    height: 545,
  },
  {
    entryId: "hl2-city-scanner",
    gameId: "half-life-2",
    folder: "hl2",
    model: "combine_scanner",
    width: 508,
    height: 490,
  },
  {
    entryId: "hl2-shield-scanner",
    gameId: "half-life-2",
    folder: "hl2",
    model: "shield_scanner",
    width: 359,
    height: 777,
  },
  {
    entryId: "hl2-hunter-chopper",
    gameId: "half-life-2",
    folder: "hl2",
    model: "combine_helicopter",
    width: 465,
    height: 420,
  },
  {
    entryId: "hl2-combine-dropship",
    gameId: "half-life-2",
    folder: "hl2",
    model: "combine_dropship",
    width: 743,
    height: 388,
  },
  {
    entryId: "alyx-vance",
    gameId: "half-life-2",
    folder: "hl2",
    model: "alyx",
    width: 234,
    height: 875,
  },
  {
    entryId: "wallace-breen",
    gameId: "half-life-2",
    folder: "hl2",
    model: "breen",
    width: 342,
    height: 834,
  },
  {
    entryId: "judith-mossman",
    gameId: "half-life-2",
    folder: "hl2",
    model: "mossman",
    width: 236,
    height: 872,
  },
  {
    entryId: "father-grigori",
    gameId: "half-life-2",
    folder: "hl2",
    model: "monk",
    width: 317,
    height: 837,
  },
  {
    entryId: "d0g",
    gameId: "half-life-2",
    folder: "hl2",
    model: "dog",
    width: 506,
    height: 703,
  },
  {
    entryId: "hl2-g-man",
    gameId: "half-life-2",
    folder: "hl2",
    model: "gman",
    width: 377,
    height: 826,
  },
  {
    entryId: "hl2-barney-calhoun",
    gameId: "half-life-2",
    folder: "hl2",
    model: "barney",
    width: 319,
    height: 836,
  },
  {
    entryId: "hl2-eli-vance",
    gameId: "half-life-2",
    folder: "hl2",
    model: "eli",
    width: 318,
    height: 815,
  },
  {
    entryId: "hl2-isaac-kleiner",
    gameId: "half-life-2",
    folder: "hl2",
    model: "kleiner",
    width: 321,
    height: 835,
  },
  {
    entryId: "hl2-odessa-cubbage",
    gameId: "half-life-2",
    folder: "hl2",
    model: "odessa",
    width: 313,
    height: 837,
  },
  {
    entryId: "hl2-all-knowing-vortigaunt",
    gameId: "half-life-2",
    folder: "hl2",
    model: "vortigaunt",
    width: 623,
    height: 555,
  },
  {
    entryId: "ep1-zombine",
    gameId: "half-life-2-episode-one",
    folder: "episodic",
    model: "zombie/zombie_soldier",
    width: 489,
    height: 715,
  },
  {
    entryId: "ep2-hunter",
    gameId: "half-life-2-episode-two",
    folder: "ep2",
    model: "hunter",
    width: 439,
    height: 750,
  },
  {
    entryId: "ep2-antlion-worker",
    gameId: "half-life-2-episode-two",
    folder: "ep2",
    model: "antlion_worker",
    width: 552,
    height: 638,
  },
  {
    entryId: "ep2-arne-magnusson",
    gameId: "half-life-2-episode-two",
    folder: "ep2",
    model: "magnusson",
    width: 320,
    height: 830,
  },
  {
    entryId: "ep2-magnusson-device",
    gameId: "half-life-2-episode-two",
    folder: "ep2",
    model: "magnusson_device",
    width: 568,
    height: 542,
  },
];

function toImages(capture: SourceCapture, name: string) {
  const { entryId, gameId, folder, model, width, height } = capture;
  const base = `${entryId}-${gameId}`;
  // Las armas (modelos w_) también tienen su .glb para girarlas en 3D
  const hasModel3d = model.startsWith("weapons/w_");
  const original: MediaAsset = {
    src: `/images/entries/${base}.webp`,
    alt: `${name}, modelo del juego`,
    width,
    height,
    source: steamSources[gameId],
    credit: `Render propio del modelo ${folder}/models/${model}.mdl${hasModel3d ? " · también como modelo 3D (.glb) convertido del mismo archivo" : ""}`,
    license: "Material del juego © Valve",
  };
  return {
    original,
    ...(hasModel3d && { models: { original: `/models/entries/${base}.glb` } }),
  };
}

// Pone el render propio en la aparición de la ficha que corresponde (sustituye a una captura de wiki si la hubiera)
export function withSourceCaptures(entry: Entry): Entry {
  const matching = captures.filter((c) => c.entryId === entry.id);
  if (matching.length === 0) return entry;
  return {
    ...entry,
    appearances: entry.appearances.map((appearance) => {
      const capture = matching.find((c) => c.gameId === appearance.gameId);
      return capture
        ? { ...appearance, images: toImages(capture, entry.name) }
        : appearance;
    }),
  };
}
