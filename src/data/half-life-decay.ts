import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

// Contenido propio de Half-Life: Decay: las nueve misiones de la campaña cooperativa
// y la misión extra «Xen Attacks», según Combine OverWiki y la lista de mapas de SourceRuns.

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

function storyline(section: string, title: string): Source {
  return overwiki(
    `Half-Life:_Decay_storyline#${section}`,
    `Half-Life: Decay storyline (${title})`,
  );
}

const mapList: Source = {
  title: "Decay Maps - SourceRuns Wiki",
  url: "https://wiki.sourceruns.org/wiki/Decay_Maps",
  kind: "community",
};

const decayPage = overwiki("Half-Life:_Decay", "Half-Life: Decay");
const decay = [{ gameId: "half-life-decay" }];

export const halfLifeDecayChapters: Entry[] = [
  {
    id: "decay-dual-access",
    slug: "decay-dual-access",
    name: "Dual Access",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: ["dy_accident1", "dy_accident2"],
    },
    summary:
      "Gina Cross y Colette Green llegan puntuales a Materiales Anómalos, entregan la muestra a Gordon Freeman y ponen el espectrómetro antimasa al 105 %. La cascada de resonancia las deja inconscientes y, al despertar, tienen que abrirse paso hasta la sala de control.",
    notes: [
      "El contraste con Half-Life es intencionado: Gordon llega tarde a la prueba y las dos doctoras, justo a tiempo.",
      "Antes de la prueba, Keller y Rosenberg discuten por la potencia a la que se va a someter el espectrómetro.",
    ],
    appearances: decay,
    sources: [storyline("Mission_1:_Dual_Access", "Dual Access"), mapList],
  },
  {
    id: "decay-hazardous-course",
    slug: "decay-hazardous-course",
    name: "Hazardous Course",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["dy_hazard"],
    },
    summary:
      "El ascensor a la superficie ya no funciona, así que Gina y Colette recorren el circuito de entrenamiento en ruinas, suben el montacargas a mano y escoltan a Rosenberg hasta el tren que lleva a la superficie.",
    notes: [
      "El circuito aparece destrozado por la cascada de resonancia y dos torretas de seguridad fuera de control disparan a todo lo que se mueve.",
    ],
    appearances: decay,
    sources: [
      storyline("Mission_2:_Hazardous_Course", "Hazardous Course"),
      mapList,
    ],
  },
  {
    id: "decay-surface-call",
    slug: "decay-surface-call",
    name: "Surface Call",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: ["dy_uplink"],
    },
    summary:
      "En la superficie, las dos científicas rodean por los almacenes el Centro de Comunicaciones por Satélite, entran por la puerta trasera y orientan la antena para que Rosenberg pida ayuda al ejército.",
    notes: [
      "La puerta principal del centro está cerrada y obliga a dar un rodeo por los almacenes.",
    ],
    appearances: decay,
    sources: [storyline("Mission_3:_Surface_Call", "Surface Call"), mapList],
  },
  {
    id: "decay-resonance",
    slug: "decay-resonance",
    name: "Resonance",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: ["dy_dampen"],
    },
    summary:
      "De vuelta en Materiales Anómalos, Keller les pide reactivar los campos de amortiguación para frenar la grieta. Gina y Colette restablecen los dos bloqueos, pero los campos vuelven a fallar al poco tiempo.",
    notes: [
      "Keller descubre que el fallo no es accidental: alguien interfiere desde el otro lado de la grieta.",
      "La sospecha de que no todas las criaturas han llegado por accidente abre la recta final de la campaña.",
    ],
    appearances: decay,
    sources: [storyline("Mission_4:_Resonance", "Resonance"), mapList],
  },
  {
    id: "decay-domestic-violence",
    slug: "decay-domestic-violence",
    name: "Domestic Violence",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: ["dy_dorms"],
    },
    summary:
      "Para lanzar un satélite hace falta un código de desbloqueo aéreo, y solo un guardia de seguridad lo conoce. El equipo viaja a los dormitorios de nivel 3 mientras los marines de la HECU ya están eliminando al personal.",
    notes: [
      "Los dormitorios son el primer escenario donde las dos doctoras se cruzan de lleno con la HECU.",
    ],
    appearances: decay,
    sources: [
      storyline("Mission_5:_Domestic_Violence", "Domestic Violence"),
      mapList,
    ],
  },
  {
    id: "decay-code-green",
    slug: "decay-code-green",
    name: "Code Green",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: ["dy_signal"],
    },
    summary:
      "Gina y Colette toman el Control Aéreo de Black Mesa, se enfrentan a los marines y a un Osprey, introducen el código de desbloqueo y levantan el bloqueo aéreo militar para que el cohete pueda poner el satélite en órbita.",
    notes: ["El título de la misión juega con el apellido de Colette Green."],
    appearances: decay,
    sources: [storyline("Mission_6:_Code_Green", "Code Green"), mapList],
  },
  {
    id: "decay-crossfire",
    slug: "decay-crossfire",
    name: "Crossfire",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: ["dy_focus"],
    },
    summary:
      "Keller no puede subir el balizador de desplazamiento desde su posición. Gina y Colette entran en los Laboratorios Gamma por los canales de drenaje, despejan el obstáculo y suben el prototipo a la superficie a mano.",
    notes: [
      "El título de la misión juega con el apellido de Gina Cross.",
      "En los niveles bajos de los laboratorios se cruzan marines y criaturas xen que se están enfrentando entre sí.",
    ],
    appearances: decay,
    sources: [storyline("Mission_7:_Crossfire", "Crossfire"), mapList],
  },
  {
    id: "decay-intensity",
    slug: "decay-intensity",
    name: "Intensity",
    category: "maps",
    details: {
      chapter: 8,
      mapFiles: ["dy_lasers"],
    },
    summary:
      "El balizador necesita una cantidad enorme de energía. Las dos científicas suben a los Laboratorios de Cuarentena Alienígena, ya invadidos, y activan la matriz de haces mientras la defienden de vortigaunts y grunts que se teletransportan sin parar.",
    appearances: decay,
    sources: [storyline("Mission_8:_Intensity", "Intensity"), mapList],
  },
  {
    id: "decay-rift",
    slug: "decay-rift",
    name: "Rift",
    category: "maps",
    details: {
      chapter: 9,
      mapFiles: ["dy_fubar", "dy_outro"],
    },
    summary:
      "Gina y Colette defienden el balizador de una oleada de criaturas xen, incluida una nave alienígena, para que Keller inicie la reversión de resonancia. La operación las atrapa en un «reflujo armónico» del que salen ilesas.",
    notes: [
      "Durante el reflujo se oye a Rosenberg avisar de que no puede mantener el portal abierto mucho más: es el mismo momento en que Barney Calhoun cruza Xen en Blue Shift.",
    ],
    appearances: decay,
    sources: [storyline("Mission_9:_Rift", "Rift"), mapList],
  },
  {
    id: "decay-xen-attacks",
    slug: "decay-xen-attacks",
    name: "Xen Attacks",
    category: "maps",
    details: {
      chapter: 10,
      mapFiles: ["dy_alien"],
    },
    summary:
      "Misión extra que se desbloquea con una «A» en las nueve misiones. Los sujetos X-8973 y R-4913, dos vortigaunts enviados por Nihilanth, recorren Black Mesa para recuperar los cristales robados por los humanos.",
    notes: [
      "El escenario conecta con el aparcamiento del final de Opposing Force, donde Shephard desactiva la ojiva nuclear.",
      "Como vortigaunts, los jugadores usan descargas eléctricas cargadas y zarpazos en lugar de las armas de Half-Life.",
    ],
    appearances: decay,
    sources: [
      storyline("Mission_10:_Xen_Attacks", "Xen Attacks"),
      mapList,
      decayPage,
    ],
  },
];
