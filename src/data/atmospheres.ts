import type { Atmosphere } from "@/domain/atmosphere";

// Ambiente de cada universo (id del universo → capas de partículas). Las partículas son pocas y pequeñas, con
// opacidad baja: se dibujan por encima de las páginas y no pueden restar contraste al texto.
export const atmospheres: Record<string, Atmosphere> = {
  // Black Mesa: chispas que suben y polvo de laboratorio
  "half-life": {
    glow: "243,154,46",
    layers: [
      {
        kind: "ember",
        colors: ["255,176,80", "243,154,46"],
        density: 65,
        size: [1.5, 3.9],
        speed: [14, 38],
        alpha: 0.74,
      },
      {
        kind: "dust",
        colors: ["240,230,210"],
        density: 72,
        size: [1.2, 2.7],
        speed: [4, 12],
        alpha: 0.38,
      },
    ],
  },
  // Aperture Science: motas azules y naranjas, y cuadros de panel que flotan
  portal: {
    glow: "82,199,255",
    layers: [
      {
        kind: "mote",
        colors: ["82,199,255", "255,157,31"],
        density: 49,
        size: [3, 7.5],
        speed: [5, 14],
        alpha: 0.54,
      },
      {
        kind: "dust",
        colors: ["233,238,242"],
        density: 57,
        size: [1.2, 2.4],
        speed: [3, 9],
        alpha: 0.34,
      },
    ],
  },
  // Mann Co.: ceniza cálida y confeti rojo y azul
  "team-fortress": {
    glow: "224,102,74",
    layers: [
      {
        kind: "ash",
        colors: ["200,180,150", "150,120,90"],
        density: 65,
        size: [1.8, 4.5],
        speed: [8, 22],
        alpha: 0.46,
      },
      {
        kind: "mote",
        colors: ["240,112,95", "110,168,255"],
        density: 27,
        size: [3, 6],
        speed: [6, 16],
        alpha: 0.68,
      },
    ],
  },
  // Dust: viento con arena
  "counter-strike": {
    glow: "210,166,74",
    layers: [
      {
        kind: "streak",
        colors: ["222,190,120", "200,170,100"],
        density: 42,
        size: [1.2, 2.1],
        speed: [90, 230],
        alpha: 0.41,
      },
      {
        kind: "dust",
        colors: ["226,200,140"],
        density: 76,
        size: [1.2, 3],
        speed: [6, 18],
        alpha: 0.41,
      },
    ],
  },
  // Brote: ceniza que cae, esporas verdes y gotas de sangre
  "left-4-dead": {
    glow: "143,174,106",
    layers: [
      {
        kind: "ash",
        colors: ["160,160,150", "120,125,110"],
        density: 84,
        size: [1.5, 4.2],
        speed: [10, 26],
        alpha: 0.43,
      },
      {
        kind: "dust",
        colors: ["143,174,106", "196,61,46"],
        density: 42,
        size: [1.5, 3.3],
        speed: [4, 14],
        alpha: 0.54,
      },
    ],
  },
};
