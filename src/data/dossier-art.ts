import { lineIcons, type LineIcon } from "./universe-art";

// Arte de cada dossier de juego: captura propia de fondo, iconos de línea de Manuel (se pintan con el color del
// dossier) y un modelo 3D opcional que aparece al activarlo con el ratón o el teclado.

export type DossierArt = {
  backdrop?: string;
  icons: LineIcon[];
  model?: string;
  modelTilt?: number;
  // Giro sobre X para los modelos que vienen tumbados (π/2 los pone de pie)
  modelRoll?: number;
  // Color del icono si no debe ser el del dossier (valor de `background`, admite degradados)
  tint?: string;
  // Alto de la caja de iconos en pantallas anchas, si debe ser menor que el de serie (valor CSS)
  iconsHeight?: string;
  // Opacidad de los iconos en pantallas anchas, si deben verse más que de serie (0,26)
  iconsOpacity?: number;
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
    // Blanco y a menos altura que el resto: Barney cabe entero dentro de la banda azul de la cabecera
    tint: "#ffffff",
    iconsHeight: "14.5rem",
  },
  "half-life-decay": {
    icons: [lineIcons["gina-colette"]],
  },
  "half-life-2": {
    backdrop: "/images/entries/hl2-highway-17-half-life-2.webp",
    icons: [lineIcons["gordon-hl2"], lineIcons["c17-skull"]],
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
  // Team Fortress: los mercenarios pintados mitad RED, mitad BLU
  "team-fortress-classic": {
    icons: [lineIcons["tf2-mercenaries"]],
    tint: "linear-gradient(90deg, #c83838 50%, #2b58a6 50%)",
    iconsOpacity: 0.42,
  },
  "team-fortress-2": {
    icons: [lineIcons["tf2-mercenaries"]],
    tint: "linear-gradient(115deg, #d14841 50%, #2d6bd2 50%)",
    iconsOpacity: 0.42,
    model: "/models/universes/tf2-heavy.glb",
    modelRoll: Math.PI / 2,
  },
  // Left 4 Dead: la Witch al activar el dossier; el Jockey en la segunda parte. Texturas a 512 px
  "left-4-dead": {
    icons: [lineIcons["left-4-dead"]],
    tint: "#9c2a1d",
    iconsOpacity: 0.36,
    model: "/models/universes/l4d-witch.glb",
  },
  "left-4-dead-2": {
    icons: [lineIcons["left-4-dead-2"]],
    tint: "#7a4a16",
    iconsOpacity: 0.36,
    model: "/models/universes/l4d2-jockey.glb",
  },
  // Portal: el dispositivo de portales en naranja y azul; en Portal 2, GLaDOS y Wheatley en azul
  portal: {
    icons: [lineIcons["portal-gun"], lineIcons["companion-cube"]],
    tint: "linear-gradient(90deg, #ff9d1f 50%, #3aa8ff 50%)",
    iconsOpacity: 0.4,
    // El dispositivo viene de pie: tumbado gira como una pieza de museo
    model: "/models/universes/portal-gun.glb",
    modelTilt: Math.PI / 2,
  },
  "portal-2": {
    icons: [lineIcons.glados, lineIcons.wheatley],
    tint: "#52c7ff",
    iconsOpacity: 0.36,
    model: "/models/universes/portal2-turret.glb",
  },
  // Counter-Strike: un solo icono, teñido según la época del juego
  "counter-strike": {
    icons: [lineIcons["counter-strike"]],
    tint: "#d2a64a",
    iconsOpacity: 0.36,
  },
  "counter-strike-source": {
    icons: [lineIcons["counter-strike"]],
    tint: "#e0a73a",
    iconsOpacity: 0.36,
    model: "/models/universes/css-ak47.glb",
    modelTilt: 0.3,
  },
  "counter-strike-global-offensive": {
    icons: [lineIcons["counter-strike"]],
    tint: "#f0a23a",
    iconsOpacity: 0.36,
  },
  "counter-strike-2": {
    icons: [lineIcons["counter-strike"]],
    tint: "#5ab0ff",
    iconsOpacity: 0.36,
  },
  "counter-strike-condition-zero": {
    icons: [lineIcons["counter-strike"]],
    tint: "#c8b15a",
    iconsOpacity: 0.36,
  },
  "counter-strike-condition-zero-deleted-scenes": {
    icons: [lineIcons["counter-strike"]],
    tint: "#b8c07a",
    iconsOpacity: 0.36,
  },
};
