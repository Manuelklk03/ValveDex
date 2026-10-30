import type { DossierLook } from "@/features/games/dossier-looks";

const gameThemes: Record<string, DossierLook> = {
  "half-life": {
    variant: "half-life",
    label: "Ficha de laboratorio Black Mesa",
    stamp: "Archivo BMRF",
    edge: "Black Mesa Research Facility · Nuevo México",
  },
  "half-life-opposing-force": {
    variant: "opposing-force",
    label: "Expediente operativo",
    stamp: "HECU",
    edge: "Hazardous Environment Combat Unit · USMC",
  },
  "half-life-blue-shift": {
    variant: "blue-shift",
    label: "Ficha de seguridad",
    stamp: "Seguridad",
    edge: "Black Mesa · Equipo de seguridad",
  },
  "half-life-decay": {
    variant: "decay",
    label: "Informe de experimento — Materiales Anómalos",
    stamp: "Experimento Δ-32",
    edge: "Black Mesa · Sector C · Materiales Anómalos",
  },
  "half-life-2": {
    variant: "half-life-2",
    label: "Aviso de la Alianza · Ciudad 17",
    stamp: "Protección Civil",
    edge: "Ciudad 17 · Distrito 17 · Alianza",
  },
  "half-life-2-episode-one": {
    variant: "half-life-2-episode-one",
    label: "Archivo de rescate · Interior Ciudadela",
    stamp: "Resistencia",
    edge: "Interior Ciudadela · Distrito 17 · Alianza",
  },
  "half-life-2-episode-two": {
    variant: "half-life-2-episode-two",
    label: "Informe de rescate · White Forest",
    stamp: "Resistencia",
    edge: "White Forest · Montañas del norte · Resistencia",
  },
};

export function getGameTheme(gameId: string): DossierLook | undefined {
  return gameThemes[gameId];
}
