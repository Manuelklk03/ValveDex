// Paleta de marca de cada saga: única fuente de sus colores. UniverseTheme la pone como variables CSS en
// todas las páginas del universo y universe-art.ts toma de aquí el acento de las tarjetas, así que ya no hay
// dos valores distintos para la misma saga. `secondary` es el segundo color de la marca (solo detalles).

export type UniversePalette = {
  background: string;
  foreground: string;
  surface: string;
  border: string;
  muted: string;
  accent: string;
  secondary: string;
};

export const universePalettes: Record<string, UniversePalette> = {
  // Half-Life: carbón cálido y naranja del HUD HEV
  "half-life": {
    background: "#13110e",
    foreground: "#ece4d6",
    surface: "#1c1915",
    border: "#3a332a",
    muted: "#b3a895",
    accent: "#f39a2e",
    secondary: "#ece4d6",
  },
  // Portal: pizarra fría de Aperture, azul de portal y el naranja del otro portal
  portal: {
    background: "#0e151c",
    foreground: "#e9eef2",
    surface: "#151e27",
    border: "#2a3947",
    muted: "#9fb0bf",
    accent: "#3fa9f5",
    secondary: "#ff9d1f",
  },
  // Team Fortress: marrón tostado de cartel, RED de acento y BLU como segundo color
  "team-fortress": {
    background: "#1a1712",
    foreground: "#f2e8d0",
    surface: "#24201a",
    border: "#4a4034",
    muted: "#b8a890",
    accent: "#e8665f",
    secondary: "#5b8fcb",
  },
  // Left 4 Dead: verde-negro enfermizo y verde infectado, con el rojo sangre en detalles
  "left-4-dead": {
    background: "#0e130d",
    foreground: "#e6edd8",
    surface: "#151c13",
    border: "#2b3a26",
    muted: "#9fb08a",
    accent: "#8db03c",
    secondary: "#c43d2e",
  },
  // Counter-Strike: gris azulado de acero y caqui militar
  "counter-strike": {
    background: "#12161a",
    foreground: "#e3e8ec",
    surface: "#1a2025",
    border: "#2f3a43",
    muted: "#9aa7b2",
    accent: "#8fa1b2",
    secondary: "#c2b280",
  },
};
