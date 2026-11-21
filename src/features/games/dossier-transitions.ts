import type { DossierTransition } from "@/domain/dossier-transition";
import type { DossierLook } from "./dossier-looks";

// Cómo se entra al mundo de cada juego de Half-Life:
// - Half-Life: ascensor de Black Mesa (dos hojas que se cierran).
// - Opposing Force: persiana blindada de la HECU que baja.
// - Blue Shift: compuerta de seguridad, una hoja desde arriba y otra desde abajo.
// - Decay: monitor del laboratorio que se enciende como una línea y se abre.
// - Half-Life 2: tajo diagonal de la Resistencia.
// - Episode One: destello del núcleo de la Ciudadela.
// - Episode Two: energía vortigaunt que sube desde el suelo.
// - Alyx: barrido de rejilla de la realidad virtual.
// - Portal y Portal 2: un portal se abre desde el centro.
export const transitionByLook: Partial<
  Record<DossierLook["variant"], DossierTransition>
> = {
  "half-life": "doors",
  "opposing-force": "shutter",
  "blue-shift": "gate",
  decay: "crt",
  "half-life-2": "slash",
  "half-life-2-episode-one": "flash",
  "half-life-2-episode-two": "rise",
  "half-life-alyx": "scan",
  // Portal: un portal se abre y te atraviesa
  portal: "portal",
  "portal-2": "portal",
};
