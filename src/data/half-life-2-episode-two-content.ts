import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

const ep2Page = overwiki("Half-Life_2:_Episode_Two", "Half-Life 2: Episode Two");
const ep2 = [{ gameId: "half-life-2-episode-two" }];

export const halfLife2EpisodeTwoChapters: Entry[] = [
  {
    id: "ep2-to-the-white-forest",
    slug: "ep2-to-the-white-forest",
    name: "To the White Forest",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: ["ep2_outland_01", "ep2_outland_02"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon y Alyx escapan de la Ciudad 17 tras el colapso del Citadel. Un portal temporal los deraila del tren. De debilitados, enfrentan a una Bestia (Hunter) que ataca a Alyx. Un Vortigaunt solitario los rescate y los separa de Alyx temporalmente mientras Gordon explora las minas de carbón infestadas de Antlions.",
    notes: [
      "Primera aparición del Hunter como enemigo jugable.",
      "Introduce el concepto de 'Vortigaunt solitario' (Lone Vort).",
    ],
    appearances: ep2,
    sources: [overwiki("To_the_White_Forest", "To the White Forest"), ep2Page],
  },
  {
    id: "ep2-this-vortal-coil",
    slug: "ep2-this-vortal-coil",
    name: "This Vortal Coil",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["ep2_outland_03", "ep2_outland_04"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon y el Vortigaunt viajan a una pequeña base de Resistencia en las minas. Los Vortigaunts llegan para curar a Alyx usando un extracto de larva de Antlion. El G-Man aparece brevemente y le dice a Gordon que cuide a Alyx.",
    notes: [
      "El título del capítulo es una referencia al refrán shakespeariano 'shuffle off this mortal coil'.",
    ],
    appearances: ep2,
    sources: [overwiki("This_Vortal_Coil", "This Vortal Coil"), ep2Page],
  },
  {
    id: "ep2-freeman-pontifex",
    slug: "ep2-freeman-pontifex",
    name: "Freeman Pontifex",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: ["ep2_outland_05", "ep2_outland_06", "ep2_outland_07"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Al llegar a la superficie, Gordon combate al Guardián de Antliones y un Guardián de Antliones mayor. Alcanzan el último puesto de Resistencia en las minas de Victory, infestado de zombis. Gordon consigue un coche de resistencia (Muscle Car) para continuar hacia White Forest.",
    notes: [
      "Pontifex es un término latín que significa 'sacerdote' y 'constructor de puentes'.",
    ],
    appearances: ep2,
    sources: [overwiki("Freeman_Pontifex", "Freeman Pontifex"), ep2Page],
  },
  {
    id: "ep2-riding-shotgun",
    slug: "ep2-riding-shotgun",
    name: "Riding Shotgun",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: ["ep2_outland_08", "ep2_outland_09"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Conduciendo el Muscle Car, Gordon y Alyx viajan por el terreno accidentado hacia White Forest. Son atacados por Hunters y un Advisor en una granja. Derrotan al Advisor y continúan, perseguidos por un Hunter-Chopper hasta un puesto de Resistencia donde reparan el coche.",
    notes: [
      "Primer combate directo con Hunters.",
      "Primer encuentro con un Advisor (comportamiento telepático).",
    ],
    appearances: ep2,
    sources: [overwiki("Riding_Shotgun", "Riding Shotgun"), ep2Page],
  },
  {
    id: "ep2-under-the-radar",
    slug: "ep2-under-the-radar",
    name: "Under the Radar",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: ["ep2_outland_10", "ep2_outland_11"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Mientras los mecánicos reparan el coche, Gordon desactiva una Autogun de la Alianza. Luego continúan a través del campo zombie-infestado, recogiendo suministros de cachés ocultos. Llegan al White Forest Inn, donde son atacados por Hunters, soldados y elites de la Alianza.",
    notes: [
      "Se puede encontrar un gnomo de jardín coleccionable.",
    ],
    appearances: ep2,
    sources: [overwiki("Under_the_Radar", "Under the Radar"), ep2Page],
  },
  {
    id: "ep2-our-mutual-friend",
    slug: "ep2-our-mutual-friend",
    name: "Our Mutual Friend",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: ["ep2_outland_12", "ep2_outland_12a"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "En White Forest, Gordon entrega el paquete de datos a los científicos. Se revela que Judith Mossman descubrió la nave de Aperture Science Borealis. Gordon defiende la base de una invasión de la Alianza, usando Magnusson Devices contra Striders y Hunters. El cohete se lanza exitosamente, cerrando el superportal.",
    notes: [
      "El título es una referencia a 'Our Mutual Friend' de Charles Dickens, refiriéndose al G-Man.",
      "La batalla final usa Magnusson Devices contra Striders.",
    ],
    appearances: ep2,
    sources: [overwiki("Our_Mutual_Fiend", "Our Mutual Fiend"), ep2Page],
  },
  {
    id: "ep2-t-minus-one",
    slug: "ep2-t-minus-one",
    name: "T-Minus One",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: ["ep2_outland_12a", "ep2_endgame"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Antes de partir en helicóptero hacia la Borealis, Advisors atacan el hangar. Eli Vance es asesinado por un Advisor mientras le dice a Alyx que destruya la Borealis. Dog llega y lucha contra los Advisors. Alyx se desmaya junto al cuerpo de su padre. La pantalla se pone negra y terminan los créditos.",
    notes: [
      "Muerte de Eli Vance durante los eventos del juego.",
    ],
    appearances: ep2,
    sources: [overwiki("T-Minus_One", "T-Minus One"), ep2Page],
  },
];

export const halfLife2EpisodeTwoWeapons: Entry[] = [
  {
    id: "ep2-gravity-gun",
    slug: "ep2-gravity-gun",
    name: "Gravity Gun",
    category: "weapons",
    details: {
      slot: 5,
      damage: { easy: 5, medium: 5, hard: 5 },
    },
    summary:
      "Arma icónica que permite recoger y lanzar objetos. En Episode Two se usa especialmente para lanzar Hunter flechettes devueltas y objetos contra Hunters.",
    notes: [
      "La Gravity Gun es especialmente efectiva contra Hunters usando objetos del entorno.",
    ],
    appearances: ep2,
    sources: [overwiki("Gravity_Gun", "Gravity Gun"), ep2Page],
  },
  {
    id: "ep2-pistol",
    slug: "ep2-pistol",
    name: "Pistol",
    category: "weapons",
    details: {
      slot: 1,
      ammo: ".357",
      maxAmmo: 120,
      damage: { easy: 3, medium: 5, hard: 7 },
    },
    summary:
      "Pistola de uso estándar. Útil contra enemigos de distancia media.",
    appearances: ep2,
    sources: [overwiki("Pistol", "Pistol"), ep2Page],
  },
  {
    id: "ep2-shotgun",
    slug: "ep2-shotgun",
    name: "Shotgun",
    category: "weapons",
    details: {
      slot: 2,
      ammo: "Buck",
      maxAmmo: 40,
      damage: { easy: 20, medium: 20, hard: 20 },
    },
    summary:
      "Escopeta de doble cañón. Daño masivo a corta distancia.",
    notes: [
      "La escopeta es una de las armas más efectivas en Episode Two.",
    ],
    appearances: ep2,
    sources: [overwiki("Shotgun", "Shotgun"), ep2Page],
  },
  {
    id: "ep2-smg1",
    slug: "ep2-smg1",
    name: "SMG1",
    category: "weapons",
    details: {
      slot: 3,
      ammo: "SMG1",
      maxAmmo: 60,
      damage: { easy: 3, medium: 4, hard: 5 },
    },
    summary:
      "Ametralladora ligera. Útil contra multitud de enemigos.",
    appearances: ep2,
    sources: [overwiki("SMG1", "SMG1"), ep2Page],
  },
  {
    id: "ep2-slam",
    slug: "ep2-slam",
    name: "SLAM",
    category: "weapons",
    details: {
      slot: 4,
      ammo: "Batteries",
      maxAmmo: 20,
      damage: { easy: 10, medium: 10, hard: 10 },
    },
    summary:
      "Minas adherentes y lanzagranadas. Útiles como trampas.",
    appearances: ep2,
    sources: [overwiki("SLAM", "SLAM"), ep2Page],
  },
  {
    id: "ep2-crossbow",
    slug: "ep2-crossbow",
    name: "Crossbow",
    category: "weapons",
    details: {
      slot: 6,
      ammo: "Bolt",
      maxAmmo: 10,
      damage: { easy: 80, medium: 80, hard: 80 },
    },
    summary:
      "Ballesta de alto daño. Puede disparar rajas de energía.",
    appearances: ep2,
    sources: [overwiki("Crossbow", "Crossbow"), ep2Page],
  },
  {
    id: "ep2-rpg",
    slug: "ep2-rpg",
    name: "RPG",
    category: "weapons",
    details: {
      slot: 7,
      ammo: "RPG",
      maxAmmo: 3,
      damage: { easy: 100, medium: 100, hard: 100 },
    },
    summary:
      "Lanzacohetes guiados. Principal arma contra Striders y Hunters.",
    appearances: ep2,
    sources: [overwiki("RPG", "RPG"), ep2Page],
  },
  {
    id: "ep2-ar2",
    slug: "ep2-ar2",
    name: "AR2",
    category: "weapons",
    details: {
      slot: 9,
      ammo: "AR2",
      maxAmmo: 60,
      damage: { easy: 6, medium: 8, hard: 10 },
    },
    summary:
      "Ametralladora de la Alianza. Dispara proyectiles de energía.",
    appearances: ep2,
    sources: [overwiki("AR2", "AR2"), ep2Page],
  },
  {
    id: "ep2-magnusson-device",
    slug: "ep2-magnusson-device",
    name: "Magnusson Device",
    category: "weapons",
    details: {
      slot: 8,
      ammo: "Unlimited (durante la batalla)",
      maxAmmo: 999,
      damage: { easy: 100, medium: 100, hard: 100 },
    },
    summary:
      "Bomba adhesiva diseñada específicamente para destruir Striders. Fue creada por el Dr. Magnusson en White Forest.",
    notes: [
      "También conocida como 'Strider Buster' o 'Sticky Bomb'.",
      "Se activa con la Gravity Gun para ser lanzada contra Striders.",
      "Crítico para la defensa de White Forest contra la invasión de la Alianza.",
    ],
    appearances: ep2,
    sources: [overwiki("Magnusson_Device", "Magnusson Device"), ep2Page],
  },
];

export const halfLife2EpisodeTwoCharacters: Entry[] = [
  {
    id: "ep2-gordon-freeman",
    slug: "ep2-gordon-freeman",
    name: "Gordon Freeman",
    category: "characters",
    details: {
      affiliation: "Black Mesa / Resistencia",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Físico teórico que lidera la resistencia contra la Alianza. Viaja a White Forest con Alyx para detener el superportal.",
    notes: [
      "Gordon no habla en Episode Two, manteniendo el silencio del jugador.",
    ],
    appearances: ep2,
    sources: [overwiki("Gordon_Freeman", "Gordon Freeman"), ep2Page],
  },
  {
    id: "ep2-alyx-vance",
    slug: "ep2-alyx-vance",
    name: "Alyx Vance",
    category: "characters",
    details: {
      affiliation: "Resistencia",
      voiceActor: "Merle Dandridge",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Programadora experta y miembro destacado de la Resistencia. Guía a Gordon en su viaje hacia White Forest.",
    notes: [
      "Alyx muere y resucita brevemente durante los eventos de la historia.",
    ],
    appearances: ep2,
    sources: [overwiki("Alyx_Vance", "Alyx Vance"), ep2Page],
  },
  {
    id: "ep2-eli-vance",
    slug: "ep2-eli-vance",
    name: "Eli Vance",
    category: "characters",
    details: {
      affiliation: "Resistencia / White Forest",
      voiceActor: "Robert Hooks",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Científico y cofundador de la Resistencia. Se establece en White Forest trabajando en la investigación del Borealis.",
    notes: [
      "Eli Vance muere al final de Episode Two, asesinado por un Advisor.",
      "Antes de morir, le dice a Alyx que debe destruir el Borealis.",
    ],
    appearances: ep2,
    sources: [overwiki("Eli_Vance", "Eli Vance"), ep2Page],
  },
  {
    id: "ep2-isaac-kleiner",
    slug: "ep2-isaac-kleiner",
    name: "Dr. Isaac Kleiner",
    category: "characters",
    details: {
      affiliation: "Resistencia / White Forest",
      voiceActor: "Harry Hauser",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Científico amistoso y miembro de la Resistencia. Ayuda a descifrar el mensaje de Judith Mossman sobre la Borealis.",
    notes: [
      "Kleiner ahora trabaja en White Forest en lugar de Black Mesa East.",
    ],
    appearances: ep2,
    sources: [overwiki("Isaac_Kleiner", "Isaac Kleiner"), ep2Page],
  },
  {
    id: "ep2-arne-magnusson",
    slug: "ep2-arne-magnusson",
    name: "Dr. Arne Magnusson",
    category: "characters",
    details: {
      affiliation: "Resistencia / White Forest",
      voiceActor: "James McCaffrey",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Científico exiliado y líder de la base White Forest. Es autoritario y guarda un fuerte rencor contra Gordon por el incidente de Black Mesa.",
    notes: [
      "Magnusson creó el Magnusson Device para destruir Striders.",
      "Su relación con Gordon es tensa debido a la culpa del incidente.",
    ],
    appearances: ep2,
    sources: [overwiki("Arne_Magnusson", "Arne Magnusson"), ep2Page],
  },
  {
    id: "ep2-judith-mossman",
    slug: "ep2-judith-mossman",
    name: "Judith Mossman",
    category: "characters",
    details: {
      affiliation: "Resistencia (disfrazada) / Alianza",
      voiceActor: "Lorraine Newman",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Científica que fingue lealtad a la Resistencia pero en realidad trabaja para la Alianza. Envía un mensaje desde el Borealis.",
    notes: [
      "El contenido del mensaje de Mossman revela la ubicación de la nave Borealis.",
    ],
    appearances: ep2,
    sources: [overwiki("Judith_Mossman", "Judith Mossman"), ep2Page],
  },
  {
    id: "ep2-the-g-man",
    slug: "ep2-the-g-man",
    name: "The G-Man",
    category: "characters",
    details: {
      affiliation: "Entidades desconocidas",
      voiceActor: "Robert Guillermo",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Misteriosa figura que manipula los eventos del universo Half-Life. Aparece brevemente durante los eventos de la curación de Alyx.",
    notes: [
      "El G-Man le dice a Gordon que cuide de Alyx: 'Prepare for unforeseen consequences'.",
      "Revela que salvó a Alyx en Black Mesa pese a las objeciones de otras partes.",
    ],
    appearances: ep2,
    sources: [overwiki("The_G-Man", "The G-Man"), ep2Page],
  },
  {
    id: "ep2-lone-vort",
    slug: "ep2-lone-vort",
    name: "Lone Vort",
    category: "characters",
    details: {
      affiliation: "Vortigaunts",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Un Vortigaunt solitario que rescata a Alyx de los Antlions y guía a Gordon a través de las minas.",
    notes: [
      "Trabaja con Gordon para obtener el extracto de larva de Antlion.",
    ],
    appearances: ep2,
    sources: [overwiki("Lone_Vort", "Lone Vort"), ep2Page],
  },
  {
    id: "ep2-dog",
    slug: "ep2-dog",
    name: "Dog",
    category: "characters",
    details: {
      affiliation: "Resistencia",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Robot protésico creado por el Dr. Kleiner para Alyx. Llega en el momento crucial para salvar a Alyx y Gordon de los Advisors.",
    notes: [
      "Dog lucha contra los Advisors en el hangar de White Forest.",
    ],
    appearances: ep2,
    sources: [overwiki("Dog", "Dog"), ep2Page],
  },
  {
    id: "ep2-uriah",
    slug: "ep2-uriah",
    name: "Uriah",
    category: "characters",
    details: {
      affiliation: "Vortigaunts / White Forest",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Vortigaunt asistente de Magnusson. Ayuda en la investigación de la Borealis y observa la pelea en el valle.",
    appearances: ep2,
    sources: [overwiki("Uriah", "Uriah"), ep2Page],
  },
  {
    id: "ep2-griggs-sheckley",
    slug: "ep2-griggs-sheckley",
    name: "Griggs y Sheckley",
    category: "characters",
    details: {
      affiliation: "Resistencia / Outlands",
      voiceActor: "Nigel C. Jones",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Dos soldados de la Resistencia que operan un puesto de observación en las minas de Outlands. Usan Antlion Detectors y torretas reprogramadas.",
    notes: [
      "Ayudan a defendender la base de Alyx contra oleadas de Antlions.",
    ],
    appearances: ep2,
    sources: [overwiki("Griggs_and_Sheckley", "Griggs and Sheckley"), ep2Page],
  },
  {
    id: "ep2-mirt",
    slug: "ep2-mirt",
    name: "MIRT",
    category: "characters",
    details: {
      affiliation: "Resistencia / White Forest",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Mecánico de la Resistencia en White Forest. Modifica el Muscle Car y monitoriza la batalla del valle.",
    notes: [
      "Conocido por su discurso sobre el AR3: 'I don't have many more of these so... try not to lose this one, okay?'",
    ],
    appearances: ep2,
    sources: [overwiki("MIRT", "MIRT"), ep2Page],
  },
  {
    id: "ep2-sweepy",
    slug: "ep2-sweepy",
    name: "Sweepy",
    category: "characters",
    details: {
      affiliation: "Vortigaunts / White Forest",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Vortigaunt limpiador en las minas de silo de White Forest. Aparece limpiando después de la batalla final.",
    appearances: ep2,
    sources: [overwiki("White_Forest", "White Forest"), ep2Page],
  },
];

export const halfLife2EpisodeTwoEnemies: Entry[] = [
  {
    id: "ep2-hunter",
    slug: "ep2-hunter",
    name: "Hunter",
    category: "enemies",
    details: {
      origin: "Synth de la Alianza",
      health: { easy: 210, medium: 210, hard: 210 },
    },
    summary:
      "Synth de combate rápido con tres patas. Ataca con flechettes explosivas y embistidas. Es inmune a armas convencionales, pero vulnerable a objetos lanzados con la Gravity Gun.",
    notes: [
      "El diseño fue inspirado en camarones mantis y escorpiones de tierra.",
      "Los Hunters usan tácticas de manada: flanqueo, cobertura y ataque en ráfaga.",
      "Son especialmente peligrosos en combate cuerpo a cuerpo: pueden matar de un solo golpe.",
    ],
    appearances: ep2,
    sources: [overwiki("Hunter", "Hunter"), ep2Page],
  },
  {
    id: "ep2-antlion-worker",
    slug: "ep2-antlion-worker",
    name: "Antlion Worker",
    category: "enemies",
    details: {
      origin: "Antlion",
      health: { easy: 20, medium: 20, hard: 20 },
    },
    summary:
      "Variante del Antlion. Es más pequeño, rápido y usa ataque químico con ácido. No ataca directamente en masa sino de forma individual.",
    notes: [
      "Los Workers son más agresivos que los Antlions normales.",
      "Ataques con ácido pueden ser letales si no se esquiva a tiempo.",
    ],
    appearances: [
      { gameId: "half-life-2" },
      ...ep2,
    ],
    sources: [overwiki("Antlion_Worker", "Antlion Worker"), ep2Page],
  },
  {
    id: "ep2-antlion-grub",
    slug: "ep2-antlion-grub",
    name: "Antlion Grub",
    category: "enemies",
    details: {
      origin: "Antlion",
      health: { easy: 5, medium: 5, hard: 5 },
    },
    summary:
      "Pequeñas criaturas de las minas de Antlion. Algunas son comestibles (como parte del logro 'Get Some Grub') y otras emiten luz.",
    notes: [
      "Los grubs brillantes son coleccionables para el logro 'Get Some Grub'.",
    ],
    appearances: ep2,
    sources: [overwiki("Antlion_Grub", "Antlion Grub"), ep2Page],
  },
  {
    id: "ep2-zombine",
    slug: "ep2-zombine",
    name: "Zombine",
    category: "enemies",
    details: {
      origin: "Humano / Headcrab",
      health: { easy: 100, medium: 100, hard: 100 },
    },
    summary:
      "Zombis creados con soldados de la Resistencia poseídos. Son más fuertes y resistentes que los zombis normales.",
    appearances: ep2,
    sources: [overwiki("Zombine", "Zombine"), ep2Page],
  },
  {
    id: "ep2-advisor",
    slug: "ep2-advisor",
    name: "Advisor",
    category: "enemies",
    details: {
      origin: "Alien de la Alianza",
      health: { easy: 1000, medium: 1000, hard: 1000 },
    },
    summary:
      "Criaturas telepáticas de la Alianza. Pueden posesionar cuerpos, mover objetos con la mente y infligir daño psíquico. Atacan el hangar de la base de White Forest.",
    notes: [
      "Los Advisors son extremadamente peligrosos: pueden matar con un toque.",
      "Son casi invencibles contra armas convencionales.",
    ],
    appearances: ep2,
    sources: [overwiki("Combine_Advisor", "Combine Advisor"), ep2Page],
  },
  {
    id: "ep2-antlion-guardian",
    slug: "ep2-antlion-guardian",
    name: "Antlion Guardian",
    category: "enemies",
    details: {
      origin: "Antlion",
      health: { easy: 500, medium: 500, hard: 500 },
    },
    summary:
      "Criatura gigante que protege los nidos de Antlion. Persigue a Gordon a través de las minas, pero no puede ser matado (el extracto se arruinaría).",
    notes: [
      "El Guardian es inmortal durante la secuencia de fuga.",
      "Protege el nectario donde se encuentra el extracto de larva.",
    ],
    appearances: ep2,
    sources: [overwiki("Antlion_Guardian", "Antlion Guardian"), ep2Page],
  },
];

export const halfLife2EpisodeTwoExtras: Entry[] = [
  {
    id: "ep2-lost-easter-egg",
    slug: "ep2-easter-egg-lost",
    name: 'Easter egg "Lost"',
    category: "easter-eggs",
    summary:
      "En las minas de White Forest, se puede encontrar una computadora con la palabra 'LOST' y el logo de Dharma Initiative, una referencia al programa de televisión.",
    notes: [
      "La inserción de este easter egg fue solicitada por Gabe Newell tras referencias en la serie 'Lost'.",
      "La conexión entre los universos no es canónica.",
    ],
    appearances: ep2,
    sources: [overwiki("Easter_eggs", "Easter eggs"), ep2Page],
  },
  {
    id: "ep2-garden-gnome",
    slug: "ep2-garden-gnome",
    name: "Gnomito de Jardín",
    category: "easter-eggs",
    summary:
      "Un gnomo de jardín coleccionable que se puede encontrar durante el capítulo 'This Vortal Coil' en las minas.",
    notes: [
      "El gnomo debe ser recogido con la Gravity Gun y llevado en el coche hasta el final.",
      "Al final, el gnomo es colocado en el cohete antes del lanzamiento.",
    ],
    appearances: ep2,
    sources: [overwiki("Easter_eggs", "Easter eggs"), ep2Page],
  },
  {
    id: "ep2-ar3-dispute",
    slug: "ep2-ar3-dispute",
    name: "Discusión del AR3",
    category: "trivia",
    summary:
      "En White Forest, un rebelde discute sobre el AR3, diciendo 'No, no, no! No! No lo usaré!' y 'En la ciudad solíamos luchar contra los Hunters con las manos'. Un intercambio cómico sobre las armas.",
    notes: [
      "El AR3 fue una arma que no se completó en el juego final.",
      "El sonido del 'AR3 guy' se ha convertido en un meme popular entre los fans.",
    ],
    appearances: ep2,
    sources: [overwiki("AR3", "AR3"), ep2Page],
  },
  {
    id: "ep2-muscle-car",
    slug: "ep2-muscle-car",
    name: "Muscle Car",
    category: "trivia",
    summary:
      "El vehículo principal de Episode Two. El Muscle Car permite viajes por el terreno accidentado y combates contra Hunters.",
    notes: [
      "El Muscle Car puede ser destruido y reparado durante el juego.",
      "La música de fondo cambia al entrar en el coche.",
    ],
    appearances: ep2,
    sources: [overwiki("Muscle_Car", "Muscle Car"), ep2Page],
  },
  {
    id: "ep2-hunter-design",
    slug: "ep2-hunter-diseño",
    name: "Diseño del Hunter",
    category: "trivia",
    summary:
      "El Hunter fue inspirado en camarones mantis, escorpiónes de tierra y patas de animales. Su diseño evolucionó del 'Mini-Strider' original.",
    notes: [
      "Originalmente llamado 'Mini-Strider' antes de ser renombrado.",
      "Fue diseñado por Ted Backman.",
    ],
    appearances: ep2,
    sources: [overwiki("Hunter", "Hunter"), ep2Page],
  },
  {
    id: "ep2-white-forest-real",
    slug: "ep2-white-forest-real",
    name: "White Forest - Base real",
    category: "trivia",
    summary:
      "White Forest está basada en bases militares de la Guerra Fría en Bielorrusia y Ucrania.",
    notes: [
      "La base tiene una estética de instalación militar abandonada.",
    ],
    appearances: ep2,
    sources: [overwiki("White_Forest", "White Forest"), ep2Page],
  },
  {
    id: "ep2-borealis",
    slug: "ep2-borealis",
    name: "La nave Borealis",
    category: "trivia",
    summary:
      "Nave de Aperture Science que desapareció misteriosamente. Su ubicación se revela al final del juego a través del mensaje de Judith Mossman.",
    notes: [
      "La Borealis contiene tecnología avanzada que la Resistencia quiere usar contra la Alianza.",
      "Eli Vance cree que debe ser destruida para evitar otro incidente como el de Black Mesa.",
    ],
    appearances: ep2,
    sources: [overwiki("Borealis_(Aperture_Science_ship)", "Borealis"), ep2Page],
  },
];
