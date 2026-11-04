import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function l4dWiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

const l4d2Only = [{ gameId: "left-4-dead-2" }];
const l4dBoth = [{ gameId: "left-4-dead" }, { gameId: "left-4-dead-2" }];

export const left4DeadCharacters: Entry[] = [
  {
    id: "l4d-bill",
    slug: "bill-overbeck",
    name: "William «Bill» Overbeck",
    category: "characters",
    details: {
      affiliation: "Supervivientes de Pensilvania (L4D1)",
      voiceActor: "Jim French",
    },
    summary:
      "Veterano condecorado de la guerra de Vietnam y líder natural del grupo original de supervivientes. Rudo, pragmático y siempre dispuesto a sacrificarse por sus compañeros.",
    notes: [
      "En el contenido descargable oficial «The Passing» / «The Sacrifice», Bill da su vida reactivando el generador del puente para salvar al resto del grupo.",
    ],
    appearances: l4dBoth,
    sources: [l4dWiki("William_%22Bill%22_Overbeck", "William Bill Overbeck")],
  },
  {
    id: "l4d-zoey",
    slug: "zoey",
    name: "Zoey",
    category: "characters",
    details: {
      affiliation: "Supervivientes de Pensilvania (L4D1)",
      voiceActor: "Jen Taylor",
    },
    summary:
      "Joven estudiante universitaria aficionada al cine de terror que vio a sus padres morir en el inicio del brote de la Gripe Verde. Destaca como tiradora precisa del equipo.",
    appearances: l4dBoth,
    sources: [l4dWiki("Zoey", "Zoey")],
  },
  {
    id: "l4d-louis",
    slug: "louis",
    name: "Louis",
    category: "characters",
    details: {
      affiliation: "Supervivientes de Pensilvania (L4D1)",
      voiceActor: "Earl Alexander",
    },
    summary:
      "Analista de sistemas informáticos de buen carácter. A pesar de los horrores del apocalipsis zombi, mantiene el optimismo y la moral del grupo con su lema de salir adelante.",
    appearances: l4dBoth,
    sources: [l4dWiki("Louis", "Louis")],
  },
  {
    id: "l4d-francis",
    slug: "francis",
    name: "Francis",
    category: "characters",
    details: {
      affiliation: "Supervivientes de Pensilvania (L4D1)",
      voiceActor: "Vince Valenzuela",
    },
    summary:
      "Motero rebelde cubierto de tatuajes. Se muestra arrogante y proclama abiertamente que odia prácticamente todo, excepto a sus compañeros supervivientes y sus armas.",
    appearances: l4dBoth,
    sources: [l4dWiki("Francis", "Francis")],
  },
  {
    id: "l4d2-coach",
    slug: "coach",
    name: "Coach",
    category: "characters",
    details: {
      affiliation: "Supervivientes del Sur (L4D2)",
      voiceActor: "Chad L. Coleman",
    },
    summary:
      "Entrenador de fútbol americano y profesor de salud de un instituto de Savannah. Hombre religioso y bondadoso que asume el liderazgo del cuarteto en el sur de EE. UU.",
    appearances: l4d2Only,
    sources: [l4dWiki("Coach", "Coach")],
  },
  {
    id: "l4d2-ellis",
    slug: "ellis",
    name: "Ellis",
    category: "characters",
    details: {
      affiliation: "Supervivientes del Sur (L4D2)",
      voiceActor: "Eric Ladin",
    },
    summary:
      "Joven mecánico apasionado por los coches de carreras, la cerveza y la música rock. Famoso por contar anécdotas interminables y absurdas sobre su amigo Keith en los momentos más inoportunos.",
    appearances: l4d2Only,
    sources: [l4dWiki("Ellis", "Ellis")],
  },
  {
    id: "l4d2-nick",
    slug: "nick",
    name: "Nick",
    category: "characters",
    details: {
      affiliation: "Supervivientes del Sur (L4D2)",
      voiceActor: "Hugh Dillon",
    },
    summary:
      "Jugador profesional y estafador cínico vestido con un traje blanco impoluto. Inicialmente distante y egoísta, termina desarrollando un genuino afecto y lealtad por sus compañeros.",
    appearances: l4d2Only,
    sources: [l4dWiki("Nick", "Nick")],
  },
  {
    id: "l4d2-rochelle",
    slug: "rochelle",
    name: "Rochelle",
    category: "characters",
    details: {
      affiliation: "Supervivientes del Sur (L4D2)",
      voiceActor: "Rochelle Aytes",
    },
    summary:
      "Productora asociada de una cadena de noticias local enviada a Savannah para cubrir la evacuación de CEDA. Comunicativa, decidida y equilibrada ante las situaciones críticas.",
    appearances: l4d2Only,
    sources: [l4dWiki("Rochelle", "Rochelle")],
  },
];

export const left4DeadEnemies: Entry[] = [
  {
    id: "l4d-hunter",
    slug: "hunter",
    name: "Hunter (Cazador)",
    category: "enemies",
    details: { origin: "Mutación por Gripe Verde" },
    summary:
      "Infectado especial ágil con sudadera con capucha. Salta sigilosamente desde tejados y paredes a gran distancia para abalanzarse sobre los supervivientes y desgarrarlos contra el suelo.",
    appearances: l4dBoth,
    sources: [l4dWiki("Hunter", "Hunter")],
  },
  {
    id: "l4d-smoker",
    slug: "smoker",
    name: "Smoker (Fumador)",
    category: "enemies",
    details: { origin: "Mutación por Gripe Verde" },
    summary:
      "Infectado cubierto de tumores que emite una tos ronca continua. Atrapa a los supervivientes desprevenidos con su lengua retráctil de decenas de metros de longitud y libera una nube de humo denso al morir.",
    appearances: l4dBoth,
    sources: [l4dWiki("Smoker", "Smoker")],
  },
  {
    id: "l4d-boomer",
    slug: "boomer",
    name: "Boomer",
    category: "enemies",
    details: { origin: "Mutación por Gripe Verde" },
    summary:
      "Infectado grotescamente obeso cargado de bilis fétida. Vomita sobre los supervivientes para cegarlos y atraer instantáneamente a una horda masiva de infectados comunes; explota violentamente al recibir disparos.",
    appearances: l4dBoth,
    sources: [l4dWiki("Boomer", "Boomer")],
  },
  {
    id: "l4d-tank",
    slug: "tank",
    name: "Tank",
    category: "enemies",
    details: { origin: "Hipertrofia muscular extrema por Gripe Verde" },
    summary:
      "El infectado especial más peligroso y resistente. Posee una fuerza colosal capaz de arrancar y lanzar bloques de hormigón, golpear automóviles y noquear a los supervivientes de un solo zarpazo.",
    appearances: l4dBoth,
    sources: [l4dWiki("Tank", "Tank")],
  },
  {
    id: "l4d-witch",
    slug: "witch",
    name: "Witch (Bruja)",
    category: "enemies",
    details: { origin: "Mutación por Gripe Verde" },
    summary:
      "Infectada cadavérica sentada en el suelo llorando desconsoladamente. Es pasiva hasta que un superviviente se acerca demasiado, la alumbra con la linterna o le dispara, momento en el que entra en cólera e incapacita a su agresor de un golpe.",
    appearances: l4dBoth,
    sources: [l4dWiki("Witch", "Witch")],
  },
  {
    id: "l4d-charger",
    slug: "charger",
    name: "Charger",
    category: "enemies",
    details: { origin: "Mutación asimétrica por Gripe Verde" },
    summary:
      "Infectado con un brazo derecho hiperdesarrollado. Carga en línea recta a gran velocidad arrollando a todos los supervivientes a su paso y estampando repetidamente a su víctima contra el suelo.",
    appearances: l4d2Only,
    sources: [l4dWiki("Charger", "Charger")],
  },
];

export const left4DeadWeapons: Entry[] = [
  {
    id: "l4d-auto-shotgun",
    slug: "escopeta-automatica",
    name: "Escopeta automática de asalto",
    category: "weapons",
    details: { slot: 1, ammo: "Cartuchos de escopeta", maxAmmo: 128 },
    summary:
      "Escopeta semiautomática de calibre 12 con cargador de 10 cartuchos (basada en la Benelli M4). Es el arma defensiva más potente para dispersar hordas de zombis a corta distancia.",
    appearances: l4dBoth,
    sources: [l4dWiki("Auto_Shotgun", "Auto Shotgun")],
  },
  {
    id: "l4d-pipe-bomb",
    slug: "bomba-casera",
    name: "Bomba de tubo (Pipe Bomb)",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Artefacto explosivo casero provisto de una luz parpadeante y un pitido agudo que atrae magnéticamente la atención de los infectados comunes antes de estallar en pedazos.",
    appearances: l4dBoth,
    sources: [l4dWiki("Pipe_Bomb", "Pipe Bomb")],
  },
  {
    id: "l4d-frying-pan",
    slug: "sarten",
    name: "Sartén de hierro fundido",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo contundente añadida en Left 4 Dead 2. Capaz de decapitar y derribar zombis de un golpe produciendo un resonante sonido metálico.",
    appearances: l4d2Only,
    sources: [l4dWiki("Frying_Pan", "Frying Pan")],
  },
];

export const left4DeadMaps: Entry[] = [
  {
    id: "l4d-no-mercy",
    slug: "campana-alta-medica",
    name: "Alta médica (No Mercy)",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: [
        "c8m1_apartment",
        "c8m2_subway",
        "c8m3_sewers",
        "c8m4_interior",
        "c8m5_rooftop",
      ],
    },
    summary:
      "La primera y más célebre campaña de Left 4 Dead. Los cuatro supervivientes recorren los callejones, el metro y las alcantarillas de Fairfield hasta alcanzar la azotea del hospital Mercy para un rescate en helicóptero.",
    appearances: l4dBoth,
    sources: [l4dWiki("No_Mercy", "No Mercy")],
  },
];

export const left4DeadExtras: Entry[] = [
  {
    id: "l4d-ai-director",
    slug: "inteligencia-artificial-director",
    name: "El Director de IA (AI Director)",
    category: "trivia",
    summary:
      "El sistema patentado por Valve que controla dinámicamente el ritmo de cada partida en Left 4 Dead, ajustando en tiempo real la aparición de infectados, música ambiental, objetos curativos y condiciones climáticas según el estrés y salud de los jugadores.",
    appearances: l4dBoth,
    sources: [l4dWiki("AI_Director", "AI Director")],
  },
];
