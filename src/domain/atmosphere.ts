// Tipos de partícula que se dibujan sobre las páginas de un universo
export type AtmosphereKind = "dust" | "ember" | "ash" | "mote" | "streak";

// Una capa de partículas: cómo se mueven (kind), de qué color y cuántas
export type AtmosphereLayer = {
  kind: AtmosphereKind;
  // Colores en «r,g,b»; cada partícula toma uno
  colors: string[];
  // Partículas a 1440×900; se escala con el área de la ventana
  density: number;
  // Rango de tamaño en píxeles
  size: [number, number];
  // Rango de velocidad en píxeles por segundo
  speed: [number, number];
  // Opacidad máxima (0–1)
  alpha: number;
};

// Ambiente de un universo: capas de partículas y la luz que sigue al ratón
export type Atmosphere = {
  layers: AtmosphereLayer[];
  // Color «r,g,b» del halo que acompaña al puntero
  glow: string;
};
