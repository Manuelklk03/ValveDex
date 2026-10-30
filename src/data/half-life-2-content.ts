import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

const hl2Page = overwiki("Half-Life_2", "Half-Life 2");
const hl2 = [{ gameId: "half-life-2" }];

export const halfLife2Chapters: Entry[] = [
  {
    id: "hl2-point-insertion",
    slug: "hl2-point-insertion",
    name: "Point Insertion",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: ["d1_trainstation_01", "d1_trainstation_02", "d1_trainstation_03", "d1_trainstation_04"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon Freeman llega a City 17 en un tren subterráneo. Tras ser interrogado por el Dr. Kleiner, huye con el Dr. Breen que lo espera en la estación de tren. Breen le revela que ha estado trabajando en contra de la resistencia y le entrega un mensaje para Alyx Vance.",
    notes: [
      "El capítulo comienza con una ambiciosa secuencia de apertura que muestra la llegada de Gordon a la Ciudad 17.",
      "La estación de tren está basada en la estación de metro de Viena.",
    ],
    appearances: hl2,
    sources: [overwiki("Point_Insertion", "Point Insertion"), hl2Page],
  },
  {
    id: "hl2-a-red-letter-day",
    slug: "hl2-a-red-letter-day",
    name: "A Red Letter Day",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["d1_canals_01", "d1_canals_02", "d1_canals_03", "d1_canals_04", "d1_canals_05", "d1_canals_06", "d1_canals_07", "d1_canals_08", "d1_canals_09", "d1_canals_10", "d1_canals_11", "d1_canals_12", "d1_canals_13"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon sigue las instrucciones de Breen y viaja a un punto de encuentro con Alyx Vance. El trayecto transcurre por un sistema de canales y túneles subterráneos, enfrentando a los soldados de la Alianza.",
    notes: [
      "Este capítulo introduce el sistema de combate vehicular con el tren de carga.",
    ],
    appearances: hl2,
    sources: [overwiki("A_Red_Letter_Day", "A Red Letter Day"), hl2Page],
  },
  {
    id: "hl2-route-kanal",
    slug: "hl2-route-kanal",
    name: "Route Kanal",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: ["d1_canals_06", "d1_canals_07", "d1_canals_08", "d1_canals_09", "d1_canals_10", "d1_canals_11", "d1_canals_12", "d1_canals_13"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon y Alyx viajan por el canal de abastecimiento de la ciudad, enfrentando a los soldados de la Alianza y descubriendo un escondito de resistencia.",
    appearances: hl2,
    sources: [overwiki("Route_Kanal", "Route Kanal"), hl2Page],
  },
  {
    id: "hl2-water-hazard",
    slug: "hl2-water-hazard",
    name: "Water Hazard",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: ["d1_town_01", "d1_town_02", "d1_town_03", "d1_town_04", "d1_town_05", "d1_town_06"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon y Alyx cruzan el río y el pueblo de Little Odessa, usando un bote a motor y luego un Jet Ski. Descubren un punto de reunión de la resistencia y rescatan a Barney Calhoun.",
    notes: [
      "Este capítulo introduce la mecánica de viaje por agua con el Jet Ski.",
    ],
    appearances: hl2,
    sources: [overwiki("Water_Hazard", "Water Hazard"), hl2Page],
  },
  {
    id: "hl2-black-mesa-east",
    slug: "hl2-black-mesa-east",
    name: "Black Mesa East",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: ["d1_town_01", "d1_town_02", "d1_town_03", "d1_town_04", "d1_town_05", "d1_town_06", "d2_prison_01", "d2_prison_02", "d2_prison_03", "d2_prison_04", "d2_prison_05"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon llega a Black Mesa East, la base de la resistencia dirigida por Eli Vance. Allí conoce a su hija Alyx y a otros miembros de la resistencia. Tras un ataque de los soldados de la Alianza, Gordon y Alyx huyen a través de las minas de carbón.",
    notes: [
      "Black Mesa East es el primer lugar donde Gordon usa armas combinadas de la resistencia y la Alianza.",
    ],
    appearances: hl2,
    sources: [overwiki("Black_Mesa_East", "Black Mesa East"), hl2Page],
  },
  {
    id: "hl2-our-lady-of-freunds",
    slug: "hl2-our-lady-of-freunds",
    name: "Our Lady of Freunds",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: ["d2_prison_01", "d2_prison_02", "d2_prison_03", "d2_prison_04", "d2_prison_05", "d2_prison_06", "d2_prison_07", "d2_coast_01", "d2_coast_02", "d2_coast_03", "d2_coast_04", "d2_coast_05", "d2_coast_06", "d2_coast_07", "d2_coast_08", "d2_coast_09", "d2_coast_10", "d2_coast_11", "d2_coast_12"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon y Alyx escapan de las minas de carbón a través de un túnel hacia el nivel costero, donde se encuentran con el Dr. Kleiner y otros miembros de la resistencia. Descubren que los soldados de la Alianza han estado investigando energía oscura.",
    notes: [
      "Este capítulo transita por las minas de carbón y el litoral de City 17.",
    ],
    appearances: hl2,
    sources: [overwiki("Our_Lady_of_Freunds", "Our Lady of Freunds"), hl2Page],
  },
  {
    id: "hl2-highway-17",
    slug: "hl2-highway-17",
    name: "Highway 17",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: ["d2_coast_01", "d2_coast_02", "d2_coast_03", "d2_coast_04", "d2_coast_05", "d2_coast_06", "d2_coast_07", "d2_coast_08", "d2_coast_09", "d2_coast_10", "d2_coast_11", "d2_coast_12"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon y Alyx viajan por la carretera costera hacia el complejo de investigación de la Alianza. Allí descubren un prototipo de helicóptero y una instalación militar.",
    notes: [
      "Este capítulo introduce el combate con el helicóptero de ataque.",
    ],
    appearances: hl2,
    sources: [overwiki("Highway_17", "Highway 17"), hl2Page],
  },
  {
    id: "hl2-dark-energy",
    slug: "hl2-dark-energy",
    name: "Dark Energy",
    category: "maps",
    details: {
      chapter: 8,
      mapFiles: ["d2_coast_11", "d2_coast_12", "d2_under", "d2_prison_06", "d2_prison_07", "d2_prison_08", "d2_prison_09", "d2_prison_10", "d2_prison_11", "d3_canal_01", "d3_canal_02", "d3_canal_03", "d3_canal_04", "d3_canal_05", "d3_canal_06", "d3_canal_07", "d3_canal_08", "d3_canal_09", "d3_canal_10", "d3_canal_11", "d3_canal_12", "d3_canal_13"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon y Alyx exploran el complejo de investigación de la Alianza y descubren las instalaciones subterráneas. Allí se enfrentan al Guardián de la energía oscura, una bestia creada por los mismos científicos de la Alianza.",
    notes: [
      "Este capítulo concluye la historia principal de Half-Life 2.",
    ],
    appearances: hl2,
    sources: [overwiki("Dark_Energy", "Dark Energy"), hl2Page],
  },
  {
    id: "hl2-unforeseen-consequences",
    slug: "hl2-unforeseen-consequences",
    name: "Unforeseen Consequences",
    category: "maps",
    details: {
      chapter: 9,
      mapFiles: ["d3_canal_01", "d3_canal_02", "d3_canal_03", "d3_canal_04", "d3_canal_05", "d3_canal_06", "d3_canal_07", "d3_canal_08", "d3_canal_09", "d3_canal_10", "d3_canal_11", "d3_canal_12", "d3_canal_13"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon y Alyx exploran las minas de carbón abandonadas bajo City 17, descubriendo un antiguo laboratorio de Black Mesa.",
    notes: [
      "Este capítulo fue añadido posteriormente como contenido descargable.",
    ],
    appearances: hl2,
    sources: [overwiki("Unforeseen_Consequences", "Unforeseen Consequences"), hl2Page],
  },
  {
    id: "hl2-our-lady-of-freunds-extended",
    slug: "hl2-our-lady-of-freunds-extended",
    name: "Our Lady of Freunds (Extended)",
    category: "maps",
    details: {
      chapter: 10,
      mapFiles: ["d3_canal_01", "d3_canal_02", "d3_canal_03", "d3_canal_04", "d3_canal_05", "d3_canal_06", "d3_canal_07", "d3_canal_08", "d3_canal_09", "d3_canal_10", "d3_canal_11", "d3_canal_12", "d3_canal_13"],
      designers: ["Dhab8", "Jessek"],
    },
    summary:
      "Gordon y Alyx exploran las minas de carbón abandonadas bajo City 17, descubriendo un antiguo laboratorio de Black Mesa.",
    notes: [
      "Este capítulo fue añadido posteriormente como contenido descargable.",
    ],
    appearances: hl2,
    sources: [overwiki("Our_Lady_of_Freunds", "Our Lady of Freunds"), hl2Page],
  },
];

export const halfLife2Weapons: Entry[] = [
  {
    id: "hl2-crowbar",
    slug: "hl2-crowbar",
    name: "Crowbar",
    category: "weapons",
    details: {
      slot: 0,
      damage: { easy: 10, medium: 10, hard: 10 },
    },
    summary:
      "El primer arma de Gordon. Es versátil y puede usarse para romper cajas y matar enemigos cuerpo a cuerpo.",
    notes: [
      "La animación del crowbar fue creada por Erik Johnson.",
    ],
    appearances: hl2,
    sources: [overwiki("Crowbar", "Crowbar"), hl2Page],
  },
  {
    id: "hl2-pistol",
    slug: "hl2-pistol",
    name: "Pistol",
    category: "weapons",
    details: {
      slot: 1,
      ammo: ".357",
      maxAmmo: 120,
      damage: { easy: 3, medium: 5, hard: 7 },
    },
    summary:
      "Pistola de uso estándar. Es versátil y puede apuntar a la cabeza para infligir más daño.",
    notes: [
      "La pistola fue diseñada para tener una cadencia de disparo rápida.",
    ],
    appearances: hl2,
    sources: [overwiki("Pistol", "Pistol"), hl2Page],
  },
  {
    id: "hl2-shotgun",
    slug: "hl2-shotgun",
    name: "Shotgun",
    category: "weapons",
    details: {
      slot: 2,
      ammo: "Buck",
      maxAmmo: 40,
      damage: { easy: 20, medium: 20, hard: 20 },
    },
    summary:
      "Escopeta de doble cañón. Inflige un daño masivo a corta distancia.",
    notes: [
      "La animación de recarga fue creada por animadores de Valve.",
    ],
    appearances: hl2,
    sources: [overwiki("Shotgun", "Shotgun"), hl2Page],
  },
  {
    id: "hl2-smg1",
    slug: "hl2-smg1",
    name: "SMG1",
    category: "weapons",
    details: {
      slot: 3,
      ammo: "SMG1",
      maxAmmo: 60,
      damage: { easy: 3, medium: 4, hard: 5 },
    },
    summary:
      "Ametralladora ligera. Es útil contra multitud de enemigos.",
    notes: [
      "La animación del SMG1 fue creada para parecer realista y funcional.",
    ],
    appearances: hl2,
    sources: [overwiki("SMG1", "SMG1"), hl2Page],
  },
  {
    id: "hl2-slam",
    slug: "hl2-slam",
    name: "SLAM",
    category: "weapons",
    details: {
      slot: 4,
      ammo: "Batteries",
      maxAmmo: 20,
      damage: { easy: 10, medium: 10, hard: 10 },
    },
    summary:
      "Minas adheribles y lanzagranadas. Pueden servir como trampas o armas directas.",
    notes: [
      "El SLAM fue introducido en Half-Life 2 para añadir profundidad táctica al combate.",
    ],
    appearances: hl2,
    sources: [overwiki("SLAM", "SLAM"), hl2Page],
  },
  {
    id: "hl2-changelogun",
    slug: "hl2-changelogun",
    name: "Gravity Gun",
    category: "weapons",
    details: {
      slot: 5,
      damage: { easy: 5, medium: 5, hard: 5 },
    },
    summary:
      "Arma icónica que permite recoger y lanzar objetos. Puede manipular enemigos y objetos.",
    notes: [
      "La Gravity Gun se convirtió en un icono de la cultura gamer debido a su versatilidad.",
    ],
    appearances: hl2,
    sources: [overwiki("Gravity_Gun", "Gravity Gun"), hl2Page],
  },
  {
    id: "hl2-crossbow",
    slug: "hl2-crossbow",
    name: "Crossbow",
    category: "weapons",
    details: {
      slot: 6,
      ammo: "Bolt",
      maxAmmo: 10,
      damage: { easy: 80, medium: 80, hard: 80 },
    },
    summary:
      "Ballesta de alto daño. Puede disparar rajas de energía que atraviesan los enemigos.",
    notes: [
      "La ballesta fue rediseñada para tener un combate más táctico que la versión de Half-Life 1.",
    ],
    appearances: hl2,
    sources: [overwiki("Crossbow", "Crossbow"), hl2Page],
  },
  {
    id: "hl2-rpg",
    slug: "hl2-rpg",
    name: "RPG",
    category: "weapons",
    details: {
      slot: 7,
      ammo: "RPG",
      maxAmmo: 3,
      damage: { easy: 100, medium: 100, hard: 100 },
    },
    summary:
      "Lanzacohetes guiados. Es el arma principal contra el Strider y otros enemigos fuertes.",
    notes: [
      "La RPG tiene un sistema de guía de misiles basado en el HUD del jugador.",
    ],
    appearances: hl2,
    sources: [overwiki("RPG", "RPG"), hl2Page],
  },
  {
    id: "hl2-ar3",
    slug: "hl2-ar3",
    name: "AR3",
    category: "weapons",
    details: {
      slot: 8,
      ammo: "AR3",
      maxAmmo: 60,
      damage: { easy: 5, medium: 5, hard: 5 },
    },
    summary:
      "Ametralladora ligeramente mejorada que el SMG1. Fue usada en el episodio 2.",
    notes: [
      "El AR3 es una mejora del AR2 con una cadencia de fuego más rápida.",
    ],
    appearances: hl2,
    sources: [overwiki("AR3", "AR3"), hl2Page],
  },
  {
    id: "hl2-ar2",
    slug: "hl2-ar2",
    name: "AR2",
    category: "weapons",
    details: {
      slot: 9,
      ammo: "AR2",
      maxAmmo: 60,
      damage: { easy: 6, medium: 8, hard: 10 },
    },
    summary:
      "Ametralladora de la Alianza. Dispara proyectiles de energía y puede desmembrar enemigos.",
    notes: [
      "El AR2 fue diseñado para tener una apariencia futurista y distintiva.",
    ],
    appearances: hl2,
    sources: [overwiki("AR2", "AR2"), hl2Page],
  },
];

export const halfLife2Characters: Entry[] = [
  {
    id: "hl2-gordon-freeman",
    slug: "hl2-gordon-freeman",
    name: "Gordon Freeman",
    category: "characters",
    details: {
      affiliation: "Black Mesa / Resistencia de la Ciudad 17",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Físico teórico que se convirtió en héroe de la Resistencia. Llega a la Ciudad 17 con el traje HEV y el Gravity Gun tras el incidente de Black Mesa.",
    notes: [
      "Gordon no habla en Half-Life 2, contrario a la tradición de los juegos de acción.",
      "Su silencio fue un diseño intencional para que el jugador se identifique más con el personaje.",
    ],
    appearances: hl2,
    sources: [overwiki("Gordon_Freeman", "Gordon Freeman"), hl2Page],
  },
  {
    id: "hl2-barney-calhoun",
    slug: "hl2-barney-calhoun",
    name: "Barney Calhoun",
    category: "characters",
    details: {
      affiliation: "Resistencia de la Ciudad 17",
      voiceActor: "Mike Shapiro",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Guardia de seguridad de Black Mesa que se unió a la Resistencia. Es el único personaje que aparece en todos los juegos de Half-Life.",
    notes: [
      "Barney fue originalmente un guardia de seguridad enemigo en Half-Life 1.",
      "En half-life 2, se le da un papel más positivo como miembro de la Resistencia.",
    ],
    appearances: hl2,
    sources: [overwiki("Barney_Calhoun", "Barney Calhoun"), hl2Page],
  },
  {
    id: "hl2-eli-vance",
    slug: "hl2-eli-vance",
    name: "Eli Vance",
    category: "characters",
    details: {
      affiliation: "Resistencia de la Ciudad 17",
      voiceActor: "Robert Hooks",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Científico y cofundador de la Resistencia. Es el mentor de Gordon y padre de Alyx. Murió en la azotea de City 17.",
    notes: [
      "La muerte de Eli fue un choque emocional grave para los fans.",
      "Su laboratorio está en el sótano de su casa en Black Mesa East.",
    ],
    appearances: hl2,
    sources: [overwiki("Eli_Vance", "Eli Vance"), hl2Page],
  },
  {
    id: "hl2-alyx-vance",
    slug: "hl2-alyx-vance",
    name: "Alyx Vance",
    category: "characters",
    details: {
      affiliation: "Resistencia de la Ciudad 17",
      voiceActor: "Merle Dandridge",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Hija de Eli Vance, programadora experta y miembro destacado de la Resistencia. Es una aliada clave de Gordon.",
    notes: [
      "Alyx fue creada para el episodio 2 y añadida en Half-Life 2 como personaje clave.",
    ],
    appearances: hl2,
    sources: [overwiki("Alyx_Vance", "Alyx Vance"), hl2Page],
  },
  {
    id: "hl2-walace-breen",
    slug: "hl2-wallace-breen",
    name: "Wallace Breen",
    category: "characters",
    details: {
      affiliation: "Alianza / Gobierno de la Ciudad 17",
      voiceActor: "Robert Picardo",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Administrador de la Ciudad 17 y líder de la Alianza en la Tierra. Físico que ganó el Premio Nobel antes de colaborar con la Alianza.",
    notes: [
      "Breen representa la corrupción humana bajo la ocupación alienigena.",
    ],
    appearances: hl2,
    sources: [overwiki("Wallace_Breen", "Wallace Breen"), hl2Page],
  },
  {
    id: "hl2-drl Kleiner",
    slug: "hl2-dr-kleiner",
    name: "Dr. Kleiner",
    category: "characters",
    details: {
      affiliation: "Resistencia de la Ciudad 17",
      voiceActor: "Harry Hauser",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Científico amistoso y miembro de la Resistencia. Ayuda a Gordon con la Gravity Gun y otros dispositivos.",
    notes: [
      "El Dr. Kleiner es conocido por su rata mascota que a menudo se cuela en las escenas.",
    ],
    appearances: hl2,
    sources: [overwiki("Isaac_Kleiner", "Isaac Kleiner"), hl2Page],
  },
  {
    id: "hl2-judith-mossman",
    slug: "hl2-judith-mossman",
    name: "Judith Mossman",
    category: "characters",
    details: {
      affiliation: "Resistencia de la Ciudad 17 / Alianza",
      voiceActor: "Lorraine Newman",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Científica y miembro de la Resistencia que finge lealtad pero en realidad trabaja para la Alianza.",
    notes: [
      "Mossman fue una figura ambigua en la historia.",
    ],
    appearances: hl2,
    sources: [overwiki("Judith_Mossman", "Judith Mossman"), hl2Page],
  },
  {
    id: "hl2-dog",
    slug: "hl2-dog",
    name: "Dog",
    category: "characters",
    details: {
      affiliation: "Resistencia de la Ciudad 17",
      designers: ["Gabe Newell", "Marc Laidlaw"],
    },
    summary:
      "Robot protésico creado por el Dr. Kleiner para Alyx. Es un aliado valioso en la lucha contra la Alianza.",
    notes: [
      "Dog es un robot grande y fuerte que ayuda a Gordon en varias ocasiones.",
    ],
    appearances: hl2,
    sources: [overwiki("Dog_(Half-Life_2)", "Dog"), hl2Page],
  },
];

export const halfLife2Enemies: Entry[] = [
  {
    id: "hl2-headcrab",
    slug: "hl2-headcrab",
    name: "Headcrab",
    category: "enemies",
    details: {
      origin: "Xen",
      health: { easy: 10, medium: 10, hard: 10 },
    },
    summary:
      "Criatura pequeña y rápida que salta sobre el jugador y se aferra a su cabeza, convirtiéndolo en un zombie.",
    notes: [
      "El diseño del headcrab fue inspirado en criaturas del cine de terror.",
    ],
    appearances: hl2,
    sources: [overwiki("Headcrab", "Headcrab"), hl2Page],
  },
  {
    id: "hl2-fast-headcrab",
    slug: "hl2-fast-headcrab",
    name: "Fast Headcrab",
    category: "enemies",
    details: {
      origin: "Xen",
      health: { easy: 5, medium: 5, hard: 5 },
    },
    summary:
      "Variante más veloz del headcrab. Salta y ataca con mayor frecuencia que el headcrab normal.",
    notes: [
      "El Fast Headcrab fue introducido para añadir variedad a los combates.",
    ],
    appearances: hl2,
    sources: [overwiki("Fast_Headcrab", "Fast Headcrab"), hl2Page],
  },
  {
    id: "hl2-super-headcrab",
    slug: "hl2-super-headcrab",
    name: "Super Headcrab",
    category: "enemies",
    details: {
      origin: "Xen",
      health: { easy: 20, medium: 20, hard: 20 },
    },
    summary:
      "Variante más fuerte del headcrab. Puede sobrevivir a múltiples disparos.",
    notes: [
      "El Super Headcrab fue diseñado para ser un desafío mayor que el headcrab normal.",
    ],
    appearances: hl2,
    sources: [overwiki("Super_Headcrab", "Super Headcrab"), hl2Page],
  },
  {
    id: "hl2-zombie",
    slug: "hl2-zombie",
    name: "Zombie",
    category: "enemies",
    details: {
      origin: "Humano / Headcrab",
      health: { easy: 30, medium: 30, hard: 30 },
    },
    summary:
      "Humano poseído por un headcrab. Es lento pero resistente. Puede atacar con ambas manos.",
    notes: [
      "El diseño del zombie fue inspirado en criaturas del cine de terror clásico.",
    ],
    appearances: hl2,
    sources: [overwiki("Zombie", "Zombie"), hl2Page],
  },
  {
    id: "hl2-fast-zombie",
    slug: "hl2-fast-zombie",
    name: "Fast Zombie",
    category: "enemies",
    details: {
      origin: "Humano / Fast Headcrab",
      health: { easy: 20, medium: 20, hard: 20 },
    },
    summary:
      "Variante más rápido del zombie. Ataca con mayor frecuencia y se mueve más rápido.",
    notes: [
      "El Fast Zombie fue introducido para añadir una amenaza constante en los combates.",
    ],
    appearances: hl2,
    sources: [overwiki("Fast_Zombie", "Fast Zombie"), hl2Page],
  },
  {
    id: "hl2-poison-zombie",
    slug: "hl2-poison-zombie",
    name: "Poison Zombie",
    category: "enemies",
    details: {
      origin: "Humano / Super Headcrab",
      health: { easy: 50, medium: 50, hard: 50 },
    },
    summary:
      "Variante más fuerte del zombie. Es resistante al daño y puede sobrevivir a múltiples disparos.",
    notes: [
      "El Poison Zombie fue diseñado para ser un enemigo más desafiante en las etapas avanzadas del juego.",
    ],
    appearances: hl2,
    sources: [overwiki("Poison_Zombie", "Poison Zombie"), hl2Page],
  },
  {
    id: "hl2-vortigaunt",
    slug: "hl2-vortigaunt",
    name: "Vortigaunt",
    category: "enemies",
    details: {
      origin: "Xen / Resistencia",
      health: { easy: 50, medium: 50, hard: 50 },
    },
    summary:
      "Criatura telepática que fue esclavizada por la Alianza. Se convierte en aliada de la resistencia.",
    notes: [
      "El Vortigaunt fue rediseñado para tener una apariencia más humanoide que en Half-Life 1.",
    ],
    appearances: hl2,
    sources: [overwiki("Vortigaunt", "Vortigaunt"), hl2Page],
  },
  {
    id: "hl2-combine-soldier",
    slug: "hl2-combine-soldier",
    name: "Soldado de la Alianza",
    category: "enemies",
    details: {
      origin: "Humanos modificados",
      health: { easy: 35, medium: 35, hard: 35 },
    },
    summary:
      "Soldados de élite de la Alianza. Usan armas de alta potencia y armaduras avanzadas.",
    notes: [
      "Los soldados de la Alianza son enemigos principales en Half-Life 2.",
    ],
    appearances: hl2,
    sources: [overwiki("Combine_Soldier", "Combine Soldier"), hl2Page],
  },
  {
    id: "hl2-strider",
    slug: "hl2-strider",
    name: "Strider",
    category: "enemies",
    details: {
      origin: "Máquinas de la Alianza",
      health: { easy: 650, medium: 650, hard: 650 },
    },
    summary:
      "Máquina caminante de la Alianza. Es un enemigo poderoso que ataca a distancia.",
    notes: [
      "El Strider es uno de los enemigos más memorables de Half-Life 2.",
    ],
    appearances: hl2,
    sources: [overwiki("Strider", "Strider"), hl2Page],
  },
  {
    id: "hl2-hunter",
    slug: "hl2-hunter",
    name: "Hunter",
    category: "enemies",
    details: {
      origin: "Máquinas de la Alianza",
      health: { easy: 100, medium: 100, hard: 100 },
    },
    summary:
      "Máquina de combate aéreo de la Alianza. Ataca con misiles y cañones láser.",
    notes: [
      "El Hunter es un enemigo aéreo que requiere una táctica específica para derrotarlo.",
    ],
    appearances: hl2,
    sources: [overwiki("Hunter", "Hunter"), hl2Page],
  },
  {
    id: "hl2-gonarch",
    slug: "hl2-gonarch",
    name: "Gonarch",
    category: "enemies",
    details: {
      origin: "Xen",
      health: { easy: 1500, medium: 1500, hard: 1500 },
    },
    summary:
      "Criatura gigante de Xen. Es una evolución del headcrab y ataca con huevos explosivos.",
    notes: [
      "El Gonarch es un jefe final opcional en la zona de pruebas.",
    ],
    appearances: hl2,
    sources: [overwiki("Gonarch", "Gonarch"), hl2Page],
  },
  {
    id: "hl2-tentacle",
    slug: "hl2-tentacle",
    name: "Tentacle",
    category: "enemies",
    details: {
      origin: "Xen",
      health: { easy: 500, medium: 500, hard: 500 },
    },
    summary:
      "Criatura gigante de Xen. Ataca con un tentáculo gigante y es casi invencible.",
    notes: [
      "El Tentacle es un jefe final opcional en la zona de pruebas.",
    ],
    appearances: hl2,
    sources: [overwiki("Tentacle", "Tentacle"), hl2Page],
  },
];

export const halfLife2Extras: Entry[] = [
  // Easter eggs
  {
    id: "hl2-employee-of-the-month",
    slug: "hl2-gordon-freeman-employee-of-the-month",
    name: '"Empleado del mes" de Gordon Freeman',
    category: "easter-eggs",
    summary:
      'En la estación de tren de City 17, se puede ver un cartel con "Empleado del mes" con el nombre de Gordon Freeman.',
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-crate-names",
    slug: "hl2-nombres-en-las-cajas",
    name: "Nombres de desarrolladores en las cajas",
    category: "easter-eggs",
    summary:
      "Algunas cajas rompibles contienen nombres de desarrolladores de Valve y otros colaboradores.",
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-nv-news",
    slug: "hl2-nv-news",
    name: "NV News en la radio",
    category: "easter-eggs",
    summary:
      "En varias zonas se puede escuchar una noticia de NV News en la radio, una referencia a los medios de comunicación de la era pre-Alianza.",
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-crow-news",
    slug: "hl2-crow-news",
    name: "Noticias de la resistencia en las pantallas",
    category: "easter-eggs",
    summary:
      "Las pantallas en City 17 muestran noticias de la resistencia, incluyendo referencias a personajes como Barney y Alyx.",
    appearances: hl2,
    sources: [hl2Page],
  },
  // Trivia
  {
    id: "hl2-development",
    slug: "hl2-desarrollo-del-juego",
    name: "Desarrollo del juego",
    category: "trivia",
    summary:
      "Half-Life 2 fue anunciado en el E3 2003 y lanzado en 2004. El desarrollo fue largo y fue uno de los juegos más anticipados de la historia.",
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-source-engine",
    slug: "hl2-el-motor-source",
    name: "El motor Source",
    category: "trivia",
    summary:
      "Half-Life 2 fue el primer juego en usar el motor Source de Valve, lo que permitió simulaciones avanzadas de físicas.",
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-hdr",
    slug: "hl2-hdr",
    name: "HDR y efectos de iluminación",
    category: "trivia",
    summary:
      "Half-Life 2 fue uno de los primeros juegos en usar HDR (High Dynamic Range) y efectos avanzados de iluminación.",
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-voice-acting",
    slug: "hl2-doblaje",
    name: "Doblaje y actuación",
    category: "trivia",
    summary:
      "El reparto de voces incluye a actores profesionales como Robert Picardo (Dr. Breen) y Merle Dandridge (Alyx Vance).",
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-gravity-gun",
    slug: "hl2-la-gravity-gun",
    name: "La Gravity Gun",
    category: "trivia",
    summary:
      "La Gravity Gun se convirtió en un icono de la cultura gamer y ha sido referenciada en innumerables memes y videos.",
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-reception",
    slug: "hl2-recepcion-del-juego",
    name: "Recepción del juego",
    category: "trivia",
    summary:
      "Half-Life 2 recibió críticas extremadamente positivas y ganó múltiples premios, incluyendo el premio a la Mejor Narrativa en los Juego del Año 2004.",
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-modding",
    slug: "hl2-modding",
    name: "Modding y comunidad",
    category: "trivia",
    summary:
      "El motor Source facilitó el desarrollo de mods, lo que resultó en una comunidad activa de creadores de contenido.",
    appearances: hl2,
    sources: [hl2Page],
  },
  {
    id: "hl2-source-2",
    slug: "hl2-preparacion-para-source-2",
    name: "Preparación para Source 2",
    category: "trivia",
    summary:
      "Algunos elementos de Half-Life 2 fueron reutilizados y adaptados para futuras iteraciones del motor Source.",
    appearances: hl2,
    sources: [hl2Page],
  },
];
