import type { EntryImages } from "@/domain/entry";
import type { MediaAsset } from "@/domain/media-asset";

// Imágenes propias de los modelos (fase R): cada modelo del juego se convierte a .glb con scripts/mdl-to-glb.mjs
// y se fotografía con la misma cámara y luz que el visor 3D, con fondo transparente. Las parejas comparten encuadre.

type ModelCapture = {
  entryId: string;
  model: string;
  subject: string;
  width: number;
  height: number;
  // Solo la imagen, sin visor 3D (la shock roach criatura comparte modelo con el arma)
  stillOnly?: boolean;
};

const games = {
  "half-life": {
    folder: "valve",
    original: "original de 1998",
    source: {
      title: "Half-Life en Steam (archivos del juego)",
      url: "https://store.steampowered.com/app/70/HalfLife/",
      kind: "official",
    },
  },
  "opposing-force": {
    folder: "gearbox",
    original: "original de Opposing Force",
    source: {
      title: "Half-Life: Opposing Force en Steam (archivos del juego)",
      url: "https://store.steampowered.com/app/50/HalfLife_Opposing_Force/",
      kind: "official",
    },
  },
  "blue-shift": {
    folder: "bshift",
    original: "original de Blue Shift",
    source: {
      title: "Half-Life: Blue Shift en Steam (archivos del juego)",
      url: "https://store.steampowered.com/app/130/HalfLife_Blue_Shift/",
      kind: "official",
    },
  },
} as const;

type GameKey = keyof typeof games;

function capture(
  game: GameKey,
  capturedModel: ModelCapture,
  variant?: "original" | "hd",
): MediaAsset {
  const { entryId, model, subject, width, height } = capturedModel;
  const { folder, original, source } = games[game];
  const isHd = variant === "hd";

  return {
    src: `/images/entries/${entryId}-${game}${variant ? `-${variant}` : ""}.webp`,
    alt: `${subject} con el modelo ${isHd ? "del High Definition Pack" : original}`,
    width,
    height,
    source,
    credit: `Render propio del modelo ${isHd ? `${folder}_hd` : folder}/models/${model}${hasModel3d(capturedModel) ? " · también como modelo 3D (.glb) convertido del mismo archivo" : ""}`,
    license: "Material del juego © Valve",
  };
}

// Las armas (modelos w_) también tienen su .glb para girarlas en 3D
function hasModel3d(model: ModelCapture) {
  return model.model.startsWith("w_") && !model.stillOnly;
}

function weaponModels(game: GameKey, model: ModelCapture, hasHd: boolean) {
  if (!hasModel3d(model)) return undefined;
  const base = `/models/entries/${model.entryId}-${game}`;
  return hasHd
    ? { original: `${base}-original.glb`, hd: `${base}-hd.glb` }
    : { original: `${base}.glb` };
}

export function halfLifeModelImages(model: ModelCapture): EntryImages {
  return {
    original: capture("half-life", model, "original"),
    hd: capture("half-life", model, "hd"),
    models: weaponModels("half-life", model, true),
  };
}

// Lo nuevo de Opposing Force no tiene versión HD, salvo algunos soldados que el High Definition Pack rehízo
export function opposingForceModelImages(
  model: ModelCapture,
  hasHd = false,
): EntryImages {
  return hasHd
    ? {
        original: capture("opposing-force", model, "original"),
        hd: capture("opposing-force", model, "hd"),
      }
    : {
        original: capture("opposing-force", model),
        models: weaponModels("opposing-force", model, false),
      };
}

// Blue Shift: científicos con versión HD (la cabeza sale del cuerpo que fija cada mapa)
export function blueShiftModelImages(model: ModelCapture): EntryImages {
  return {
    original: capture("blue-shift", model, "original"),
    hd: capture("blue-shift", model, "hd"),
  };
}
