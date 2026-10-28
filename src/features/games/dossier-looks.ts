// Material y rótulos del dossier de cada juego; un juego sin entrada usa el dossier base
export type DossierLook = {
  variant: "half-life" | "opposing-force" | "blue-shift" | "decay";
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
};

export function getDossierLook(gameId: string): DossierLook | undefined {
  return dossierLooks[gameId];
}
