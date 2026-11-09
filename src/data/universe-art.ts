// Material gráfico de cada saga para sus tarjetas y dossieres: captura propia de fondo (de public/images/entries),
// icono de línea (public/images/icons, trazo negro con alfa que se tiñe con el color de la saga) y un modelo 3D
// opcional que gira al pasar el ratón. Los iconos los dibuja Manuel; las capturas y los modelos salen de los juegos.

export type LineIcon = { src: string; width: number; height: number };

// Los 19 iconos de línea, recortados al trazo (lado largo de 1000 px)
export const lineIcons = {
  hunter: { src: "/images/icons/hunter.webp", width: 938, height: 1016 },
  "alyx-pistol": {
    src: "/images/icons/alyx-pistol.webp",
    width: 1016,
    height: 612,
  },
  citadel: { src: "/images/icons/citadel.webp", width: 985, height: 1016 },
  "c17-skull": {
    src: "/images/icons/c17-skull.webp",
    width: 678,
    height: 1016,
  },
  "left-4-dead": {
    src: "/images/icons/left-4-dead.webp",
    width: 1016,
    height: 686,
  },
  "left-4-dead-2": {
    src: "/images/icons/left-4-dead-2.webp",
    width: 1016,
    height: 674,
  },
  "tf2-mercenaries": {
    src: "/images/icons/tf2-mercenaries.webp",
    width: 1016,
    height: 542,
  },
  antlion: { src: "/images/icons/antlion.webp", width: 869, height: 1016 },
  "gordon-hl2": {
    src: "/images/icons/gordon-hl2.webp",
    width: 758,
    height: 1016,
  },
  "gordon-hev": {
    src: "/images/icons/gordon-hev.webp",
    width: 471,
    height: 1016,
  },
  "hecu-marine": {
    src: "/images/icons/hecu-marine.webp",
    width: 402,
    height: 1016,
  },
  barney: { src: "/images/icons/barney.webp", width: 378, height: 1016 },
  "gina-colette": {
    src: "/images/icons/gina-colette.webp",
    width: 580,
    height: 1016,
  },
  "counter-strike": {
    src: "/images/icons/counter-strike.webp",
    width: 685,
    height: 1016,
  },
  "portal-gun": {
    src: "/images/icons/portal-gun.webp",
    width: 1016,
    height: 450,
  },
  wheatley: { src: "/images/icons/wheatley.webp", width: 982, height: 1016 },
  glados: { src: "/images/icons/glados.webp", width: 637, height: 1016 },
  "companion-cube": {
    src: "/images/icons/companion-cube.webp",
    width: 990,
    height: 1016,
  },
} satisfies Record<string, LineIcon>;

export type UniverseArt = {
  accent: string;
  backdrop?: string;
  icon: LineIcon;
  model?: string;
  modelTilt?: number;
};

export const universeArt: Record<string, UniverseArt> = {
  "half-life": {
    accent: "#f28c28",
    backdrop: "/images/entries/anomalous-materials-half-life.webp",
    icon: lineIcons["gordon-hev"],
    model: "/models/entries/crowbar-half-life-hd.glb",
    // La palanca es alargada: inclinada 55 grados gira como una pieza de museo, no como una hélice
    modelTilt: 0.95,
  },
  "team-fortress": {
    accent: "#e0664a",
    icon: lineIcons["tf2-mercenaries"],
  },
  "left-4-dead": {
    accent: "#8fae6a",
    icon: lineIcons["left-4-dead"],
  },
  portal: {
    accent: "#4fb4ff",
    // La pistola disparando un portal: el anillo va delante, así el trazo dibuja primero el portal y luego el arma
    icon: lineIcons["portal-gun-fire"],
  },
  "counter-strike": {
    accent: "#d2a64a",
    icon: lineIcons["counter-strike"],
  },
};
