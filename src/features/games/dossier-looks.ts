// Material y rótulos del dossier de cada juego; un juego sin entrada usa el dossier base
export type DossierLook = {
  variant:
    | "half-life"
    | "opposing-force"
    | "blue-shift"
    | "decay"
    | "half-life-2"
    | "half-life-2-episode-one"
    | "half-life-2-episode-two"
    | "half-life-alyx"
    | "team-fortress-classic"
    | "team-fortress-2"
    | "left-4-dead"
    | "left-4-dead-2";
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
    label: "Registro de laboratorio · Materiales Anómalos",
    stamp: "Cooperativo",
    edge: "Black Mesa · Laboratorio de Materiales Anómalos",
  },
  "half-life-2": {
    variant: "half-life-2",
    label: "Cartel de la Resistencia · Ciudad 17",
    stamp: "Ravenholm: no pasar",
    edge: "Ciudad 17 · Canales · Ravenholm · Nova Prospekt",
  },
  "half-life-2-episode-one": {
    variant: "half-life-2-episode-one",
    label: "Directiva de la Alianza · Ciudadela",
    stamp: "Núcleo inestable",
    edge: "Ciudadela · Núcleo de energía oscura · Stalkers",
  },
  "half-life-2-episode-two": {
    variant: "half-life-2-episode-two",
    label: "Hoja de registro · Base de White Forest",
    stamp: "White Forest",
    edge: "Afueras · Vortigaunts · Hormigas león · Hunters",
  },
  "half-life-alyx": {
    variant: "half-life-alyx",
    label: "Informe de campo · Zona de Cuarentena",
    stamp: "Resistencia · City 17",
    edge: "Ciudad 17 · Alianza · Contenedores · Russell",
  },
  "team-fortress-classic": {
    variant: "team-fortress-classic",
    label: "Hoja de unidad · Equipo de operaciones",
    stamp: "TF Classic",
    edge: "2Fort · Dustbowl · Hydro · Well",
  },
  "team-fortress-2": {
    variant: "team-fortress-2",
    label: "Dossier de mercenari · Mann Co.",
    stamp: "Saxton Hale",
    edge: "Badlands · Granary · 2Fort · Gold Rush",
  },
  "left-4-dead": {
    variant: "left-4-dead",
    label: "Informe de brote · Pensilvania",
    stamp: "CEDA",
    edge: "Fairfield · Riverside · Mercy Hospital · Blood Harvest",
  },
  "left-4-dead-2": {
    variant: "left-4-dead-2",
    label: "Expediente de evacuación · Sur profundo",
    stamp: "CEDA / Militar",
    edge: "Savannah · Nueva Orleans · Bayou · The Parish",
  },
};

export function getDossierLook(gameId: string): DossierLook | undefined {
  return dossierLooks[gameId];
}
