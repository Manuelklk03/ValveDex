import type { DossierTransition } from "@/domain/dossier-transition";

// Entrada animada de cada saga desde el mapa de universos: la misma que usan sus dossieres. Counter-Strike aún no
// tiene la suya (llegará con su mundo) y usa un destello neutro
const entryBySlug: Record<string, DossierTransition> = {
  "half-life": "doors",
  portal: "portal",
  "team-fortress": "respawn",
  "left-4-dead": "safehouse",
  "counter-strike": "flash",
};

export function getUniverseEntry(slug: string): DossierTransition | undefined {
  return entryBySlug[slug];
}
