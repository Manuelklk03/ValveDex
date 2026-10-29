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
const scienceTeam = "Black Mesa (equipo científico)";

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

export const halfLifeDecayCharacters: Entry[] = [
  {
    id: "decay-gina-cross",
    slug: "decay-gina-cross",
    name: "Doctora Gina Cross",
    category: "characters",
    details: {
      affiliation: scienceTeam,
      voiceActor: "Kathy Levin",
    },
    summary:
      "Supervisora de entornos peligrosos de Black Mesa y diseñadora del traje HEV, cuyo aspecto y voz prestó al holograma del Hazard Course. En Decay entrega la muestra a Gordon y es una de las dos protagonistas.",
    notes: [
      "Su modelo original se basó en Mona Lisa Guthrie, entonces directora de oficina de Valve, y el nombre interno de la holograma en el Hazard Course es «mona».",
      "En Decay el HUD de Gina es azul claro y el de Colette, naranja rojizo.",
      "En Opposing Force aparece un cadáver con su modelo en una zona de Xen; el director creativo Randy Pitchford confirmó que la intención era que fuera ella.",
    ],
    appearances: decay,
    sources: [overwiki("Gina_Cross", "Gina Cross")],
  },
  {
    id: "decay-colette-green",
    slug: "decay-colette-green",
    name: "Doctora Colette Green",
    category: "characters",
    details: {
      affiliation: scienceTeam,
      voiceActor: "Lani Minella",
    },
    summary:
      "Investigadora asociada del laboratorio de Materiales Anómalos, especialista en ingeniería eléctrica y robótica. Es la otra protagonista de Decay: activa el espectrómetro y acompaña a Gina durante toda la huida.",
    notes: [
      "Es doctora por Carnegie Mellon y en el manual de PlayStation 2 tiene 31 años.",
      "En los archivos del juego hay datos biográficos sin usar que no coinciden con el manual: le dan 37 años y un doctorado sin robótica.",
      "Sus líneas de combate son mucho más entusiastas que las de Gina, hasta el punto de reírse al derribar enemigos.",
    ],
    appearances: decay,
    sources: [overwiki("Colette_Green", "Colette Green")],
  },
  {
    id: "decay-richard-keller",
    slug: "decay-richard-keller",
    name: "Doctor Richard Keller",
    category: "characters",
    details: {
      affiliation: scienceTeam,
      voiceActor: "Brice Armstrong",
    },
    summary:
      "Científico de nivel 5 que dirige la prueba desde la sala de control y, después del accidente, guía a Gina y Colette por radio en su plan para revertir la cascada de resonancia.",
    notes: [
      "Originalmente iba a ser el doctor Kleiner; las texturas de su modelo conservan el prefijo «Kleiner».",
      "Se desplaza en una silla de ruedas motorizada de la marca Invacare y su nombre de entidad es «Wheels».",
      "En los archivos queda una animación sin usar en la que se levanta de la silla, de cuando el personaje iba a revelarse como un manipulador.",
      "Es el primer personaje con discapacidad visible de la saga.",
    ],
    appearances: decay,
    sources: [overwiki("Richard_Keller", "Richard Keller"), decayPage],
  },
  {
    id: "decay-x-8973-r-4913",
    slug: "decay-x-8973-r-4913",
    name: "X-8973 y R-4913",
    category: "characters",
    details: {
      affiliation: "Xen (Nihilanth)",
    },
    summary:
      "Pareja de vortigaunts que protagonizan la misión extra Xen Attacks: Nihilanth los envía a Black Mesa para recuperar los cristales que los humanos robaron de Xen.",
    notes: [
      "La misión solo se desbloquea con la nota máxima en las nueve misiones de la campaña.",
      "El escenario conecta con el aparcamiento del final de Opposing Force, donde Shephard desactiva la ojiva nuclear.",
      "Como vortigaunts, los jugadores usan descargas eléctricas cargadas y zarpazos en lugar de las armas de Half-Life.",
    ],
    appearances: decay,
    sources: [overwiki("X-8973_and_R-4913", "X-8973 and R-4913"), decayPage],
  },
];

export const halfLifeDecayExtras: Entry[] = [
  // Easter eggs
  {
    id: "decay-konami-code",
    slug: "decay-codigo-konami",
    name: "El código Konami del port",
    category: "easter-eggs",
    summary:
      "El port no oficial de PC esconde un código de trucos sin documentar que desbloquea todas las misiones, incluida la extra Xen Attacks. La combinación es una referencia al código Konami.",
    appearances: decay,
    sources: [decayPage],
  },
  {
    id: "decay-strangelove-line",
    slug: "decay-mein-fuhrer-i-can-walk",
    name: "«Mein Führer, I can walk!»",
    category: "easter-eggs",
    summary:
      "Entre los sonidos sin usar de Keller hay una línea en la que grita «Mein Führer, I can walk!» con acento alemán. Es una cita de la película Dr. Strangelove, en la que el doctor que va en silla de ruedas se levanta de repente.",
    notes: [
      "El archivo se llama «dk_furher.wav» y encaja con la idea descartada de que Keller caminara al final del juego.",
    ],
    appearances: decay,
    sources: [overwiki("Richard_Keller", "Richard Keller")],
  },
  {
    id: "decay-orange-hev-suits",
    slug: "decay-trajes-naranjas-del-trailer",
    name: "Los trajes naranjas del tráiler",
    category: "easter-eggs",
    summary:
      "En el primer tráiler de la versión de PlayStation 2, Gina y Colette llevaban el mismo traje HEV naranja que Gordon. En el juego final cambiaron de color, pero los guardias de seguridad todavía mencionan los trajes naranjas en sus diálogos.",
    appearances: decay,
    sources: [
      overwiki("Gina_Cross", "Gina Cross"),
      overwiki("Colette_Green", "Colette Green"),
    ],
  },
  {
    id: "decay-dr-cross-call",
    slug: "decay-llamada-a-la-doctora-cross",
    name: "«Dr. Cross, call 729»",
    category: "easter-eggs",
    summary:
      "Al principio de Half-Life, la megafonía de Black Mesa llama por los altavoces a una «doctora Cross» que debe llamar al 729. Decay convirtió ese nombre suelto en la protagonista Gina Cross, aunque el juego nunca confirma que sea la misma persona.",
    appearances: decay,
    sources: [overwiki("Gina_Cross", "Gina Cross")],
  },
  {
    id: "decay-nuclear-mission-jam",
    slug: "decay-nuclear-mission-jam",
    name: "«Nuclear Mission Jam» en los créditos",
    category: "easter-eggs",
    summary:
      "Los créditos de Decay suenan con «Nuclear Mission Jam», uno de los temas de la banda sonora de Half-Life.",
    appearances: decay,
    sources: [decayPage],
  },
  // Curiosidades
  {
    id: "decay-hazard-team",
    slug: "decay-hazard-team",
    name: "Hazard Team, el nombre antes de Decay",
    category: "trivia",
    summary:
      "El proyecto cooperativo se llamó primero «Hazard Team» y, en algún momento, «Operation Decay». Los nombres de los archivos de mapa todavía conservan el prefijo «ht» de aquella primera versión.",
    appearances: decay,
    sources: [decayPage],
  },
  {
    id: "decay-name",
    slug: "decay-por-que-se-llama-decay",
    name: "Por qué se llama Decay",
    category: "trivia",
    summary:
      "El título final se adoptó antes del E3 de 2001 y sigue la costumbre de la saga de usar términos científicos: «decay» es la desintegración exponencial de una sustancia radiactiva.",
    appearances: decay,
    sources: [decayPage],
  },
  {
    id: "decay-cut-missions",
    slug: "decay-misiones-recortadas",
    name: "Las tres misiones recortadas",
    category: "trivia",
    summary:
      "Decay iba a tener doce misiones de campaña y se publicó con nueve. Las tres que faltan están documentadas por la comunidad a partir de los archivos y de material previo al lanzamiento.",
    appearances: decay,
    sources: [
      overwiki(
        "Cut_missions_from_Half-Life:_Decay",
        "Cut missions from Half-Life: Decay",
      ),
      decayPage,
    ],
  },
  {
    id: "decay-ranking",
    slug: "decay-notas-de-la-f-a-la-a",
    name: "Notas de la F a la A",
    category: "trivia",
    summary:
      "Cada misión se puntúa de la F a la A según la puntería, el número de enemigos eliminados y el daño recibido. Conseguir una «A» en las nueve misiones desbloquea la extra Xen Attacks.",
    appearances: decay,
    sources: [decayPage],
  },
  {
    id: "decay-chapter-select",
    slug: "decay-primera-seleccion-de-capitulos",
    name: "La primera selección de capítulos",
    category: "trivia",
    summary:
      "Decay es el primer juego de Half-Life con un menú para elegir capítulo, consecuencia directa de estar dividido en misiones independientes en lugar de una sola campaña continua.",
    appearances: decay,
    sources: [decayPage],
  },
  {
    id: "decay-models",
    slug: "decay-modelos-del-doble-de-detalle",
    name: "Modelos del doble de detalle",
    category: "trivia",
    summary:
      "La versión de PlayStation 2 usa modelos nuevos, con el doble de detalle que los del High Definition Pack y animaciones faciales que aquel pack no tenía.",
    appearances: decay,
    sources: [decayPage],
  },
  {
    id: "decay-pc-port",
    slug: "decay-port-no-oficial-de-pc",
    name: "El port no oficial de 2008",
    category: "trivia",
    summary:
      "Gearbox terminó un port de Decay para PC que nunca llegó a publicarse. En 2008, un grupo de aficionados ucranianos descifró los archivos de la versión de PlayStation 2 y lo publicó como mod de Half-Life, con juego en línea que la versión original no tenía. Decay no está en Steam.",
    appearances: decay,
    sources: [decayPage],
  },
  {
    id: "decay-hev-containers",
    slug: "decay-los-dos-trajes-hev-vacios",
    name: "Los dos trajes HEV vacíos",
    category: "trivia",
    summary:
      "Cuando Gordon se pone el traje en Half-Life ve otros dos contenedores vacíos. Según Gearbox, son los de Gina y Colette, que ya se habían llevado los suyos antes de que él llegara.",
    appearances: decay,
    sources: [decayPage],
  },
  {
    id: "decay-coop",
    slug: "decay-cooperativo-a-pantalla-partida",
    name: "Cooperativo a pantalla partida",
    category: "trivia",
    summary:
      "Decay se diseñó para dos jugadores a pantalla partida y sus puzles obligan a cooperar. Se puede jugar solo alternando entre Gina y Colette, pero la crítica coincidió en que pierde mucho así.",
    appearances: decay,
    sources: [decayPage],
  },
  {
    id: "decay-gina-freeman",
    slug: "decay-gina-freeman",
    name: "Gina Freeman, la protagonista descartada",
    category: "trivia",
    summary:
      "En una versión muy temprana de Half-Life se pensó en elegir entre Gordon y un personaje femenino, y Gina llegó a ser la protagonista alternativa. En la compilación Net Test 1 su modelo se llamaba «Gina Freeman».",
    appearances: decay,
    sources: [overwiki("Gina_Cross", "Gina Cross")],
  },
];
