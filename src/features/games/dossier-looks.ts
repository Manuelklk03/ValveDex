// Material y rótulos del dossier de cada juego; un juego sin entrada usa el dossier base
export type DossierLook = {
  variant:
    "half-life" | "opposing-force" | "blue-shift" | "decay" | "half-life-2" | "half-life-2-episode-one";
  label: string;
  stamp: string;
  edge: string;
};

const dossierLooks: Record<string, DossierLook> = {
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
};

export function getDossierLook(gameId: string): DossierLook | undefined {
  return dossierLooks[gameId];
}
