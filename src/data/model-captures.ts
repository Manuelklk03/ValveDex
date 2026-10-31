import type { EntryImages } from "@/domain/entry";
import type { MediaAsset } from "@/domain/media-asset";

// Capturas propias de los modelos de Half-Life (fase R): el original de valve/models y el del High Definition Pack
// de valve_hd/models, con la misma secuencia y cámara en Half-Life Asset Manager y fondo transparente

type ModelCapture = {
  entryId: string;
  model: string;
  subject: string;
  width: number;
  height: number;
};

const steamHalfLife = {
  title: "Half-Life en Steam (archivos del juego)",
  url: "https://store.steampowered.com/app/70/HalfLife/",
  kind: "official",
} as const;

function capture(
  { entryId, model, subject, width, height }: ModelCapture,
  variant: "original" | "hd",
): MediaAsset {
  const isHd = variant === "hd";

  return {
    src: `/images/entries/${entryId}-half-life-${variant}.webp`,
    alt: `${subject} con el modelo ${isHd ? "del High Definition Pack" : "original de 1998"}`,
    width,
    height,
    source: steamHalfLife,
    credit: `Captura propia con Half-Life Asset Manager de ${isHd ? "valve_hd" : "valve"}/models/${model}`,
    license: "Material del juego © Valve",
  };
}

export function halfLifeModelImages(model: ModelCapture): EntryImages {
  const images: EntryImages = {
    original: capture(model, "original"),
    hd: capture(model, "hd"),
  };
  // Las armas (modelos w_) también tienen su .glb para girarlas en 3D
  if (model.model.startsWith("w_")) {
    images.models = {
      original: `/models/entries/${model.entryId}-half-life-original.glb`,
      hd: `/models/entries/${model.entryId}-half-life-hd.glb`,
    };
  }
  return images;
}
