import { lineIcons, type LineIcon } from "./universe-art";

// Arte de cada dossier de juego: captura propia de fondo, iconos de línea de Manuel (se pintan con el color del
// dossier) y un modelo 3D opcional que aparece al activarlo con el ratón o el teclado.

export type DossierArt = {
  backdrop?: string;
  icons: LineIcon[];
  model?: string;
  modelTilt?: number;
  // Color del icono si no debe ser el del dossier (valor de `background`, admite degradados)
  tint?: string;
};

export const dossierArt: Record<string, DossierArt> = {
  "half-life": {
    backdrop: "/images/entries/anomalous-materials-half-life.webp",
    icons: [lineIcons["gordon-hev"]],
  },
  "half-life-opposing-force": {
    backdrop: "/images/entries/of-boot-camp-half-life-opposing-force.webp",
    icons: [lineIcons["hecu-marine"]],
  },
  "half-life-blue-shift": {
    backdrop:
      "/images/entries/bs-living-quarters-outbound-half-life-blue-shift.webp",
    icons: [lineIcons.barney],
    // Blanco sobre la banda azul de la cabecera y azul sobre la parte clara, donde el blanco no se vería
    tint: "linear-gradient(to bottom, #ffffff 0 10rem, #1f4fa8 10rem)",
  },
  "half-life-decay": {
    icons: [lineIcons["gina-colette"]],
  },
  "half-life-2": {
    backdrop: "/images/entries/hl2-highway-17-half-life-2.webp",
    icons: [lineIcons["c17-skull"], lineIcons.antlion],
    model: "/models/universes/hl2-gravity-gun.glb",
    modelTilt: 0.5,
  },
  "half-life-2-episode-one": {
    backdrop:
      "/images/entries/ep1-direct-intervention-half-life-2-episode-one.webp",
    icons: [lineIcons.citadel],
    model: "/models/universes/ep1-zombine.glb",
  },
  "half-life-2-episode-two": {
    backdrop: "/images/entries/ep2-riding-shotgun-half-life-2-episode-two.webp",
    icons: [lineIcons.hunter, lineIcons.antlion],
    model: "/models/universes/ep2-hunter.glb",
  },
  "half-life-alyx": {
    backdrop: "/images/entries/alyx-gravity-gloves-half-life-alyx.webp",
    icons: [lineIcons["alyx-pistol"]],
  },
  "team-fortress-classic": { icons: [lineIcons["tf2-mercenaries"]] },
  "team-fortress-2": { icons: [lineIcons["tf2-mercenaries"]] },
  "left-4-dead": { icons: [lineIcons["left-4-dead"]] },
  "left-4-dead-2": { icons: [lineIcons["left-4-dead-2"]] },
};
