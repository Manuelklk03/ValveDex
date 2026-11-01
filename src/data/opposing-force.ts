import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";
import {
  blueShiftModelImages,
  opposingForceModelImages,
} from "./model-captures";

// Contenido propio de Half-Life: Opposing Force (Z4), según Combine OverWiki.
// Valve no ha publicado el skill.cfg ni el SDK de OF: las cifras salen de un volcado de cvars
// y de una copia de skill.cfg publicados por la comunidad, que coinciden entre sí.

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

function storyline(section: string, title: string): Source {
  return overwiki(
    `Half-Life:_Opposing_Force_storyline#${section}`,
    `Half-Life: Opposing Force storyline (${title})`,
  );
}

const mapList: Source = {
  title: "Opposing Force Maps - SourceRuns Wiki",
  url: "https://wiki.sourceruns.org/wiki/Opposing_Force_Maps",
  kind: "community",
};

const cvarList: Source = {
  title: "Lista de cvars de un servidor de Opposing Force (GitHub)",
  url: "https://raw.githubusercontent.com/dgibbs64/Valve-Server-cvarlist/HEAD/opfor-cvarlist.txt",
  kind: "community",
};

const sdkOf: Source = {
  title: "SDK de Opposing Force reconstruido por TWHL (GitHub)",
  url: "https://github.com/twhl-community/halflife-op4-updated",
  kind: "community",
};

const easterEggs = overwiki("Easter_eggs", "Easter eggs");
const ofPage = overwiki(
  "Half-Life:_Opposing_Force",
  "Half-Life: Opposing Force",
);
const opposingForce = [{ gameId: "half-life-opposing-force" }];

function same(value: number) {
  return { easy: value, medium: value, hard: value };
}

function health(easy: number, medium: number, hard: number) {
  return { easy, medium, hard };
}

export const opposingForceEntries: Entry[] = [
  // Capítulos
  {
    id: "of-boot-camp",
    slug: "boot-camp",
    name: "Boot Camp",
    category: "maps",
    details: {
      chapter: 0,
      mapFiles: ["ofboot0", "ofboot1", "ofboot2", "ofboot3", "ofboot4"],
    },
    summary:
      "Entrenamiento opcional en la base militar de Santego, en Arizona, a las órdenes de los instructores Barnes y Sharp, hasta que Adrian Shephard está listo para el combate.",
    notes: [
      "El texto dice que Shephard ha subido «misteriosamente» al primer puesto de la lista de entrenamiento avanzado.",
      "Las taquillas del dormitorio llevan iniciales y apellidos de desarrolladores de Gearbox, y con noclip se llega a una sala firmada «D M M 1999», por David Michael Mertz.",
    ],
    appearances: opposingForce,
    sources: [
      storyline("Boot_Camp_(optional)", "Boot Camp"),
      easterEggs,
      mapList,
    ],
  },
  {
    id: "of-incoming",
    slug: "incoming",
    name: "Incoming",
    category: "maps",
    details: { chapter: 1, mapFiles: ["of0a0"] },
    summary:
      "Las naves alienígenas derriban el Osprey de Shephard cuando se acerca a la zona de aterrizaje 117 de Black Mesa. Entre desmayos ve combates entre criaturas de Xen y los marines supervivientes.",
    notes: [
      "Se ve la pared del cañón del capítulo Surface Tension de Half-Life.",
    ],
    appearances: opposingForce,
    sources: [storyline("Chapter_1:_Incoming", "Incoming"), mapList],
  },
  {
    id: "of-welcome-to-black-mesa",
    slug: "welcome-to-black-mesa",
    name: "Welcome to Black Mesa",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["of1a1", "of1a2", "of1a3", "of1a4", "of1a4b"],
      designers: ["Mike Wardwell", "Rob Heironimus", "Randy Pitchford"],
    },
    summary:
      "Shephard despierta en una enfermería cerca del lugar del accidente y se entera de que el resto de supervivientes ha muerto. Se dirige al punto de extracción mientras la radio anuncia la retirada.",
    notes: [
      "La demo del juego incluye los tres primeros mapas de este capítulo.",
      "En un ordenador de la sala de escáneres del mapa of1a1 hay una ecografía del hijo de Randy y Kristy Pitchford.",
      "Un ordenador del control de seguridad del mapa of1a1 muestra un pantallazo azul después de usarlo tres veces.",
    ],
    appearances: opposingForce,
    sources: [
      overwiki("Welcome_to_Black_Mesa", "Welcome to Black Mesa"),
      easterEggs,
    ],
  },
  {
    id: "of-we-are-pulling-out",
    slug: "we-are-pulling-out",
    name: "“We Are Pulling Out”",
    category: "maps",
    details: { chapter: 3, mapFiles: ["of1a5", "of1a5b", "of1a6"] },
    summary:
      "Con la batalla girando a favor de los alienígenas, Shephard corre hacia el punto de extracción de la HECU. Por el camino ve por primera vez a una nueva y misteriosa raza alienígena.",
    notes: [
      "Ocurre cerca del final de Surface Tension, de Half-Life: el operador de radio que se oye allí aparece justo antes del final del nivel.",
    ],
    appearances: opposingForce,
    sources: [
      storyline('Chapter_3:_"We_Are_Pulling_Out"', "We Are Pulling Out"),
      mapList,
    ],
  },
  {
    id: "of-missing-in-action",
    slug: "missing-in-action",
    name: "Missing in Action",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: ["of2a1", "of2a1b", "of2a2", "of2a3"],
    },
    summary:
      "Shephard cruza un alto horno lleno de zombis buscando a sus compañeros y otra salida, y se une a otros marines que también se han quedado atrás.",
    notes: ["Es el primer encuentro con el pit drone."],
    appearances: opposingForce,
    sources: [
      storyline("Chapter_4:_Missing_in_Action", "Missing in Action"),
      overwiki("Pit_Drone", "Pit Drone"),
      mapList,
    ],
  },
  {
    id: "of-friendly-fire",
    slug: "friendly-fire",
    name: "Friendly Fire",
    category: "maps",
    details: { chapter: 5, mapFiles: ["of2a4", "of2a5", "of2a5b"] },
    summary:
      "Shephard y otros supervivientes de la HECU atraviesan unas oficinas llenas de criaturas hacia un viejo sistema de transporte, donde aparece una nueva facción humana hostil.",
    notes: [
      "Las mesas de dos científicos muertos llevan las placas «S. Reardon» y «S. Jones», por Sean Reardon y Steven Jones, de Gearbox.",
      "La ametralladora M249 se consigue aquí por primera vez, de un marine aliado.",
      "Con noclip, en el mapa of2a4 se llega a una sala con el mensaje «What are you doing in my entity room?».",
    ],
    appearances: opposingForce,
    sources: [
      storyline("Chapter_5:_Friendly_Fire", "Friendly Fire"),
      overwiki("M249_Squad_Automatic_Weapon", "M249 Squad Automatic Weapon"),
      easterEggs,
      mapList,
    ],
  },
  {
    id: "of-we-are-not-alone",
    slug: "we-are-not-alone",
    name: "We Are Not Alone",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: ["of3a1", "of3a1b", "of3a2", "of3a3"],
    },
    summary:
      "Un interludio breve en el complejo Lambda, lleno de recuerdos del Half-Life original, que obliga a Shephard a pasar por Xen para seguir adelante.",
    notes: [
      "Aquí se consigue el cañón desplazador, en el mapa of3a2.",
      "Si se dispara 25 veces a un conducto de ventilación del mapa of3a1, cae un chumtoad.",
    ],
    appearances: opposingForce,
    sources: [
      storyline("Chapter_6:_We_Are_Not_Alone", "We Are Not Alone"),
      overwiki("Displacer_Cannon", "Displacer Cannon"),
      easterEggs,
      mapList,
    ],
  },
  {
    id: "of-crush-depth",
    slug: "crush-depth",
    name: "Crush Depth",
    category: "maps",
    details: { chapter: 7, mapFiles: ["of3a4", "of3a5", "of3a6"] },
    summary:
      "Shephard cruza unos laboratorios submarinos donde hay varios ictiosaurios, y un científico liberado le da información sobre la zona.",
    notes: [
      "El título, «profundidad de aplastamiento», juega con la cantidad de agua del nivel.",
    ],
    appearances: opposingForce,
    sources: [storyline("Chapter_7:_Crush_Depth", "Crush Depth"), mapList],
  },
  {
    id: "of-vicarious-reality",
    slug: "vicarious-reality",
    name: "Vicarious Reality",
    category: "maps",
    details: { chapter: 8, mapFiles: ["of4a1", "of4a2", "of4a3"] },
    summary:
      "Shephard recorre las biosferas y terrarios de fauna de Xen en lo más profundo del Sector E, hasta llegar a una zona industrial más antigua donde capta una llamada de socorro de los marines.",
    notes: [
      "En el complejo del biodomo se consiguen el gancho barnacle (el «espécimen 1176») y el lanzaesporas, y aparece por primera vez el voltigore.",
      "En el mapa of4a3 hay una vitrina rota y vacía con la etiqueta «007», un guiño a James Bond.",
    ],
    appearances: opposingForce,
    sources: [
      storyline("Chapter_8:_Vicarious_Reality", "Vicarious Reality"),
      overwiki("Barnacle_Grapple", "Barnacle Grapple"),
      overwiki("Voltigore", "Voltigore"),
      easterEggs,
      mapList,
    ],
  },
  {
    id: "of-pit-worms-nest",
    slug: "pit-worms-nest",
    name: "Pit Worm's Nest",
    category: "maps",
    details: { chapter: 9, mapFiles: ["of4a4", "of4a5"] },
    summary:
      "Una criatura monstruosa bloquea el paso por el área de procesamiento de residuos 3, y Shephard tiene que usar las propias instalaciones para superarla.",
    notes: [
      "Es un reflejo, a menor escala, del capítulo Blast Pit de Half-Life.",
      "El puzle obliga a activar una «valve» (válvula) y una «gearbox» (caja de cambios), un guiño a Valve y Gearbox.",
      "Las compactadoras de basura se inspiran en la de la Estrella de la Muerte de La guerra de las galaxias.",
    ],
    appearances: opposingForce,
    sources: [
      storyline("Chapter_9:_Pit_Worm's_Nest", "Pit Worm's Nest"),
      easterEggs,
      mapList,
    ],
  },
  {
    id: "of-foxtrot-uniform",
    slug: "foxtrot-uniform",
    name: "Foxtrot Uniform",
    category: "maps",
    details: {
      chapter: 10,
      mapFiles: ["of5a1", "of5a2", "of5a3", "of5a4"],
    },
    summary:
      "La raza X, los Black Ops y los restos de la HECU chocan en los canales y alcantarillas de Black Mesa. Shephard atraviesa un nido de voltigores hasta llegar a la presa hidroeléctrica del primer juego.",
    notes: [
      "El título es «F. U.» en el alfabeto fonético de la OTAN, un eufemismo militar.",
    ],
    appearances: opposingForce,
    sources: [
      storyline("Chapter_10:_Foxtrot_Uniform", "Foxtrot Uniform"),
      mapList,
    ],
  },
  {
    id: "of-the-package",
    slug: "the-package",
    name: "“The Package”",
    category: "maps",
    details: {
      chapter: 11,
      mapFiles: ["of6a1", "of6a2", "of6a3", "of6a4"],
    },
    summary:
      "Shephard descubre en un aparcamiento subterráneo lo que traman los Black Ops para la instalación, mientras se enfrenta a artillería pesada, un Apache negro y soldados de choque.",
    appearances: opposingForce,
    sources: [storyline('Chapter_11:_"The_Package"', "The Package"), mapList],
  },
  {
    id: "of-worlds-collide",
    slug: "worlds-collide",
    name: "Worlds Collide",
    category: "maps",
    details: { chapter: 12, mapFiles: ["of6a4b", "of6a5"] },
    summary:
      "Shephard cruza almacenes donde luchan la raza X y los Black Ops y llega a una vieja zona industrial, donde una criatura enorme intenta atravesar un portal.",
    notes: [
      "Hace falta el gancho barnacle para salvar el hueco hasta el segundo cañón.",
    ],
    appearances: opposingForce,
    sources: [
      storyline("Chapter_12:_Worlds_Collide", "Worlds Collide"),
      overwiki("Barnacle_Grapple", "Barnacle Grapple"),
      mapList,
    ],
  },
  {
    id: "of-conclusion",
    slug: "conclusion",
    name: "Conclusion",
    category: "maps",
    details: { chapter: 13, mapFiles: ["of7a0"] },
    summary: "El epílogo de la aventura de Adrian Shephard.",
    appearances: opposingForce,
    sources: [storyline("Conclusion", "Conclusion"), mapList],
  },

  // Armas nuevas
  {
    id: "pipe-wrench",
    slug: "llave-inglesa",
    name: "Llave inglesa",
    category: "weapons",
    details: { slot: 1, damage: same(20) },
    summary:
      "La primera arma de Shephard, que encuentra al principio de Welcome to Black Mesa. Su ataque secundario es un golpe por encima de la cabeza que se carga.",
    notes: [
      "En la campaña, los golpes seguidos hacen la mitad (10). El golpe cargado hace de 45 a 150 según el tiempo de carga.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "pipe-wrench",
          model: "w_pipe_wrench.mdl",
          subject: "Llave inglesa",
          width: 736,
          height: 280,
        }),
      },
    ],
    sources: [overwiki("Pipe_Wrench", "Pipe Wrench"), cvarList],
  },
  {
    id: "combat-knife",
    slug: "cuchillo-de-combate",
    name: "Cuchillo de combate",
    category: "weapons",
    details: { slot: 1, damage: same(10) },
    summary:
      "Un cuchillo de combate del estilo del KA-BAR que ataca muy rápido. El primero aparece clavado en la espalda de un vortigaunt muerto.",
    notes: [
      "Solo en multijugador, una puñalada por la espalda hace 1000 de daño. Tiene una animación de ataque cargado sin usar.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "combat-knife",
          model: "w_knife.mdl",
          subject: "Cuchillo de combate",
          width: 281,
          height: 834,
        }),
      },
    ],
    sources: [overwiki("Combat_Knife", "Combat Knife"), cvarList],
  },
  {
    id: "barnacle-grapple",
    slug: "gancho-barnacle",
    name: "Gancho barnacle",
    category: "weapons",
    details: { slot: 1, damage: same(25) },
    summary:
      "Un barnacle arrancado, el «espécimen 1176», que sirve a la vez de arma y de gancho para subir a superficies orgánicas.",
    notes: [
      "Lo diseñó Patrick Deupree, inspirado en el gancho de Quake. En multijugador muerde con 50 de daño.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "barnacle-grapple",
          model: "w_bgrap.mdl",
          subject: "Gancho barnacle",
          width: 842,
          height: 504,
        }),
      },
    ],
    sources: [overwiki("Barnacle_Grapple", "Barnacle Grapple"), cvarList],
  },
  {
    id: "desert-eagle",
    slug: "desert-eagle",
    name: "Desert Eagle",
    category: "weapons",
    details: {
      slot: 2,
      ammo: ".357 (compartida con el revólver)",
      maxAmmo: 36,
      damage: same(34),
    },
    summary:
      "La pistola reglamentaria de la HECU y la primera arma de fuego de Shephard. Su mira láser cambia cadencia por precisión.",
    notes: ["Cargador de 7 balas. En la campaña sustituye al revólver .357."],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "desert-eagle",
          model: "w_desert_eagle.mdl",
          subject: "Desert Eagle",
          width: 940,
          height: 347,
        }),
      },
    ],
    sources: [
      overwiki("Desert_Eagle", "Desert Eagle"),
      ofPage,
      cvarList,
      sdkOf,
    ],
  },
  {
    id: "m249",
    slug: "m249",
    name: "Ametralladora M249",
    category: "weapons",
    details: {
      slot: 6,
      ammo: "5,56 × 45 mm OTAN",
      maxAmmo: 200,
      damage: same(15),
    },
    summary:
      "Ametralladora ligera con un retroceso tan fuerte que empuja al jugador hacia atrás cuanto más tiempo dispara.",
    notes: [
      "Cintas de 50 balas. Con un truco se puede conseguir ya en «We Are Pulling Out».",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "m249",
          model: "w_saw.mdl",
          subject: "Ametralladora M249",
          width: 721,
          height: 300,
        }),
      },
    ],
    sources: [
      overwiki("M249_Squad_Automatic_Weapon", "M249 Squad Automatic Weapon"),
      cvarList,
      sdkOf,
    ],
  },
  {
    id: "m40a1",
    slug: "rifle-m40a1",
    name: "Rifle de francotirador M-40A1",
    category: "weapons",
    details: {
      slot: 6,
      ammo: "7,62 × 51 mm OTAN",
      maxAmmo: 15,
      damage: same(100),
    },
    summary:
      "Rifle de cerrojo con mira telescópica que se presenta en el campo de tiro de Boot Camp.",
    notes: [
      "Cargador de 5 balas. En manos del francotirador de los Black Ops solo hace 15 de daño, para equilibrar el juego.",
      "El anuncio de televisión usaba como provisional el MSG90 del mod Action Half-Life.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "m40a1",
          model: "w_m40a1.mdl",
          subject: "Rifle de francotirador M-40A1",
          width: 785,
          height: 192,
        }),
      },
    ],
    sources: [
      overwiki("M-40A1_Sniper_Rifle", "M-40A1 Sniper Rifle"),
      cvarList,
      sdkOf,
    ],
  },
  {
    id: "displacer-cannon",
    slug: "canon-desplazador",
    name: "Cañón desplazador",
    category: "weapons",
    details: {
      slot: 6,
      ammo: "Uranio (compartido con el cañón tau y el de gluones)",
      maxAmmo: 100,
      damage: same(250),
    },
    summary:
      "Un arma prototipo de teletransporte de Black Mesa. El disparo principal envía el objetivo a Xen y el secundario teletransporta al propio jugador.",
    notes: [
      "El disparo principal gasta 20 de uranio y el teletransporte propio, 60. El daño de 250 se reparte en un radio de 300 unidades.",
      "El cable dice «BLACK MESA XV11382», quizá un guiño a la película THX 1138.",
      "Las primeras versiones se cargaban como el cañón tau.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "displacer-cannon",
          model: "w_displacer.mdl",
          subject: "Cañón desplazador",
          width: 703,
          height: 492,
        }),
      },
    ],
    sources: [
      overwiki("Displacer_Cannon", "Displacer Cannon"),
      cvarList,
      sdkOf,
    ],
  },
  {
    id: "spore-launcher",
    slug: "lanzaesporas",
    name: "Lanzaesporas",
    category: "weapons",
    details: { slot: 7, ammo: "Esporas", maxAmmo: 20, damage: same(50) },
    summary:
      "Un soldado de choque joven usado como lanzagranadas vivo. Dispara esporas en línea recta o que rebotan.",
    notes: [
      "Carga 5 esporas. En la animación de reposo, Shephard lo acaricia.",
      "Solo aparece una vez, en Vicarious Reality, así que se puede perder.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "spore-launcher",
          model: "w_spore_launcher.mdl",
          subject: "Lanzaesporas",
          width: 681,
          height: 297,
        }),
      },
    ],
    sources: [overwiki("Spore_Launcher", "Spore Launcher"), cvarList, sdkOf],
  },
  {
    id: "shock-roach",
    slug: "shock-roach",
    name: "Shock roach",
    category: "weapons",
    details: {
      slot: 7,
      ammo: "Plasma (se regenera)",
      maxAmmo: 10,
      damage: same(10),
    },
    summary:
      "Un arma viva de la raza X que llevan los soldados de choque. Su carga se regenera sola.",
    notes: [
      "Dispararla bajo el agua electrocuta al jugador. En la campaña sustituye a la Hivehand; en multijugador hace 15 de daño.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "shock-roach",
          model: "w_shock_rifle.mdl",
          subject: "Shock roach",
          width: 743,
          height: 353,
        }),
      },
    ],
    sources: [overwiki("Shock_Roach", "Shock Roach"), ofPage, cvarList, sdkOf],
  },

  // Enemigos nuevos
  {
    id: "pit-drone",
    slug: "pit-drone",
    name: "Pit drone",
    category: "enemies",
    details: { origin: "Raza X", health: health(40, 40, 110) },
    summary:
      "Un alienígena pequeño y rápido de la raza X que caza en manada y dispara las púas de su cabeza.",
    notes: [
      "Usa la inteligencia artificial del bullsquid. Lo diseñó Brian Martel y lo animó Stephen Bahl.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "pit-drone",
          model: "pit_drone.mdl",
          subject: "Pit drone",
          width: 651,
          height: 902,
        }),
      },
    ],
    sources: [overwiki("Pit_Drone", "Pit Drone"), cvarList],
  },
  {
    id: "shock-trooper",
    slug: "soldado-de-choque",
    name: "Soldado de choque",
    category: "enemies",
    details: { origin: "Raza X", health: health(125, 125, 200) },
    summary:
      "La casta guerrera de cuatro brazos de la raza X, armada con shock roaches.",
    notes: [
      "Su salud es 2,5 veces el valor de su variable (50, 50 y 80), según el código.",
      "Usa la inteligencia artificial de los soldados de la HECU, y su idioma tiene 17 sonidos. Como voz provisional se usó la de Greedo.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "shock-trooper",
          model: "strooper.mdl",
          subject: "Soldado de choque",
          width: 436,
          height: 901,
        }),
      },
    ],
    sources: [overwiki("Shock_Trooper", "Shock Trooper"), cvarList, sdkOf],
  },
  {
    id: "voltigore",
    slug: "voltigore",
    name: "Voltigore",
    category: "enemies",
    details: { origin: "Raza X", health: health(320, 320, 450) },
    summary:
      "Una gran bestia de la raza X que ataca con un rayo eléctrico y estalla al morir.",
    notes: [
      "Las crías tienen 60, 60 y 120 de salud. Intentan lanzar el rayo, pero solo sueltan una chispa inofensiva.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "voltigore",
          model: "voltigore.mdl",
          subject: "Voltigore",
          width: 697,
          height: 576,
        }),
      },
    ],
    sources: [overwiki("Voltigore", "Voltigore"), cvarList],
  },
  {
    id: "gonome",
    slug: "gonome",
    name: "Gonome",
    category: "enemies",
    details: {
      origin: "Xen (mutación del zombi de headcrab)",
      health: health(85, 85, 160),
    },
    summary:
      "La siguiente fase de mutación de un zombi de headcrab. Lanza vísceras venenosas a distancia.",
    notes: ["Tiene animaciones de baile sin usar, «veryhappy» y «sohappy»."],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "gonome",
          model: "gonome.mdl",
          subject: "Gonome",
          width: 742,
          height: 811,
        }),
      },
    ],
    sources: [overwiki("Gonome", "Gonome"), cvarList],
  },
  {
    id: "male-assassin",
    slug: "asesino-black-ops",
    name: "Asesino de operaciones encubiertas",
    category: "enemies",
    details: {
      origin: "Militar (operaciones encubiertas del Gobierno de EE. UU.)",
      health: health(50, 50, 80),
    },
    summary:
      "Agentes enmascarados de los Black Ops que aparecen en Opposing Force, armados con subfusiles, granadas o el rifle M-40A1.",
    notes: [
      "Combaten en completo silencio y, de cerca, usan patadas y puñetazos.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages(
          {
            entryId: "male-assassin",
            model: "massn.mdl",
            subject: "Asesino de operaciones encubiertas",
            width: 415,
            height: 790,
          },
          true,
        ),
      },
    ],
    sources: [overwiki("Black_Ops", "Black Ops"), cvarList, sdkOf],
  },
  {
    id: "pit-worm",
    slug: "pit-worm",
    name: "Pit worm",
    category: "enemies",
    details: { origin: "Raza X", health: health(70, 90, 100) },
    summary:
      "El primer jefe del juego, escondido en el área de procesamiento de residuos 3.",
    notes: [
      "Los disparos al ojo solo le hacen retroceder: su salud se restablece, así que hay que vencerlo usando las instalaciones.",
      "Su nombre interno de entidad es «josht», y existe un monster_pitworm sin usar.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "pit-worm",
          model: "pit_worm_up.mdl",
          subject: "Pit worm",
          width: 525,
          height: 832,
        }),
      },
    ],
    sources: [overwiki("Pit_Worm", "Pit Worm"), cvarList, sdkOf],
  },
  {
    id: "gene-worm",
    slug: "gusano-gen",
    name: "Gusano gen",
    category: "enemies",
    details: { origin: "Raza X" },
    summary:
      "El jefe final de Opposing Force, una «fábrica biológica de gestión de recursos» que intenta atravesar un portal.",
    notes: [
      "Su salud no está clara: las variables del juego dan 70, 90 y 100, mientras que Combine OverWiki da 840, 1080 y 1200.",
      "Reproducido al revés, el sonido dsbossit.wav dice «To win the game you must kill me, Randall Pitchford».",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "gene-worm",
          model: "geneworm.mdl",
          subject: "Gusano gen",
          width: 672,
          height: 480,
        }),
      },
    ],
    sources: [overwiki("Gene_Worm", "Gene Worm"), cvarList],
  },
  {
    id: "shock-roach-creature",
    slug: "shock-roach-criatura",
    name: "Shock roach (criatura)",
    category: "enemies",
    details: { origin: "Raza X", health: health(10, 10, 20) },
    summary:
      "Sin un huésped que la lleve, la shock roach ataca por su cuenta y muere poco después.",
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "shock-roach-creature",
          model: "w_shock_rifle.mdl",
          subject: "Shock roach (criatura)",
          width: 603,
          height: 318,
          stillOnly: true,
        }),
      },
    ],
    sources: [overwiki("Shock_Roach", "Shock Roach"), cvarList],
  },

  // Personajes
  {
    id: "adrian-shephard",
    slug: "adrian-shephard",
    name: "Adrian Shephard",
    category: "characters",
    details: { affiliation: "Cuerpo de Marines de EE. UU. (HECU), cabo" },
    summary:
      "El protagonista de Opposing Force: un cabo de los marines entrenado en la base de Santego y enviado a Black Mesa con la HECU. Separado de su unidad, lucha por sobrevivir.",
    notes: [
      "Su aspecto se basa en el modelo genérico de soldado con máscara de gas de Opposing Force.",
    ],
    appearances: opposingForce,
    sources: [overwiki("Adrian_Shephard", "Adrian Shephard")],
  },
  {
    id: "drill-sergeant-barnes",
    slug: "instructor-barnes",
    name: "Instructor Barnes",
    category: "characters",
    details: {
      affiliation: "Cuerpo de Marines de EE. UU. (instructor jefe)",
      voiceActor: "Jon St. John",
    },
    summary:
      "Dwight T. Barnes, el instructor de Boot Camp que entrena a Shephard en la base de Santego.",
    notes: [
      "Los soldados dicen a veces «If only Drill Instructor Barnes could see me now...».",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "drill-sergeant-barnes",
          model: "drill.mdl",
          subject: "Instructor Barnes",
          width: 329,
          height: 881,
        }),
      },
    ],
    sources: [overwiki("Dwight_T._Barnes", "Dwight T. Barnes")],
  },
  {
    id: "drill-instructor-sharp",
    slug: "instructor-sharp",
    name: "Instructor Sharp",
    category: "characters",
    details: {
      affiliation: "Cuerpo de Marines de EE. UU. (instructor)",
      voiceActor: "Jon St. John",
    },
    summary: "Instructor de la base militar de Santego.",
    notes: [
      "La guía de estrategia de Prima está narrada desde su punto de vista, y se puede elegir como personaje en multijugador.",
    ],
    appearances: opposingForce,
    sources: [overwiki("Sharp", "Sharp")],
  },
  {
    id: "otis",
    slug: "otis",
    name: "Otis",
    category: "characters",
    details: { affiliation: "Black Mesa (seguridad)" },
    summary:
      "Un tipo de guardia de seguridad con sobrepeso que aparece desde Opposing Force; en Blue Shift sale en el campo de tiro de Insecurity. Es un modelo genérico, no un personaje concreto.",
    notes: [
      "Quizá se llama así por Otis Campbell, de The Andy Griffith Show, la misma serie de la que sale el apodo «Barney».",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages({
          entryId: "otis",
          model: "otis.mdl",
          subject: "Otis",
          width: 336,
          height: 882,
        }),
      },
      { gameId: "half-life-blue-shift" },
    ],
    sources: [
      overwiki("Black_Mesa_Security_Force", "Black Mesa Security Force"),
      overwiki("Insecurity", "Insecurity"),
    ],
  },
  {
    id: "hecu-ally-grunt",
    slug: "soldados-hecu-aliados",
    name: "Soldados de la HECU (aliados)",
    category: "characters",
    details: {
      affiliation: "HECU (compañeros de Shephard)",
      designers: ["Stephen Bahl"],
    },
    summary:
      "Los marines que acompañan a Shephard en Opposing Force. Llevan un subfusil MP5, a veces con lanzagranadas, o una escopeta, y siguen al jugador si se lo pide.",
    notes: [
      "Según el código del SDK reconstruido por TWHL, la cabeza depende del arma: máscara de gas con el MP5, pasamontañas con la escopeta, boina blanca para el líder del escuadrón y la cabeza de policía militar si va desarmado.",
      "Tienen 50 puntos de salud en las tres dificultades (variable sk_hgrunt_ally_health).",
      "Stephen Bahl diseñó las clases y variantes nuevas de los marines para Opposing Force.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages(
          {
            entryId: "hecu-ally-grunt",
            model: "hgrunt_opfor.mdl",
            subject: "Soldado aliado de la HECU",
            width: 395,
            height: 837,
          },
          true,
        ),
      },
    ],
    sources: [
      overwiki(
        "Hazardous_Environment_Combat_Unit",
        "Hazardous Environment Combat Unit",
      ),
      sdkOf,
      cvarList,
    ],
  },
  {
    id: "hecu-ally-saw",
    slug: "ametralladores-hecu",
    name: "Ametralladores de la HECU",
    category: "characters",
    details: {
      affiliation: "HECU (compañeros de Shephard)",
      designers: ["Stephen Bahl"],
    },
    summary:
      "Los «pesados» del escuadrón de Shephard: cargan la ametralladora M249 y un torso propio con la cinta de munición.",
    notes: [
      "Llevan un pañuelo en la cabeza, blanco o negro, elegido al azar (SDK reconstruido por TWHL).",
      "Al morir sueltan la M249, que el jugador puede recoger.",
      "Comparten con el resto de soldados aliados los 50 puntos de salud (sk_hgrunt_ally_health).",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages(
          {
            entryId: "hecu-ally-saw",
            model: "hgrunt_opfor.mdl",
            subject: "Ametrallador de la HECU",
            width: 357,
            height: 848,
          },
          true,
        ),
      },
    ],
    sources: [
      overwiki(
        "Hazardous_Environment_Combat_Unit",
        "Hazardous Environment Combat Unit",
      ),
      sdkOf,
      cvarList,
    ],
  },
  {
    id: "hecu-medic",
    slug: "medicos-hecu",
    name: "Médicos de la HECU",
    category: "characters",
    details: {
      affiliation: "HECU (compañeros de Shephard)",
      voiceActor: "Jon St. John",
      designers: ["Stephen Bahl"],
    },
    summary:
      "Marines entrenados en primeros auxilios que curan a Shephard y a sus compañeros heridos. Van armados con una pistola.",
    notes: [
      "Curan 200, 120 o 75 puntos según la dificultad (variable sk_medic_ally_heal).",
      "Si no siguen al jugador, acuden a curar a los soldados que los llaman; esa función se añadió después de escribir el manual y se explica en el léame del juego.",
      "En Half-Life los marines ya pedían un médico al ser heridos, aunque en ese juego nunca llegaba a aparecer.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages(
          {
            entryId: "hecu-medic",
            model: "hgrunt_medic.mdl",
            subject: "Médico de la HECU",
            width: 427,
            height: 859,
          },
          true,
        ),
      },
    ],
    sources: [overwiki("HECU_Medic", "HECU Medic"), cvarList],
  },
  {
    id: "hecu-engineer",
    slug: "ingenieros-hecu",
    name: "Ingenieros de la HECU",
    category: "characters",
    details: {
      affiliation: "HECU (compañeros de Shephard)",
      voiceActor: "Jon St. John",
      designers: ["Stephen Bahl"],
    },
    summary:
      "Marines que abren puertas y rejas selladas con su soplete. Para defenderse llevan una Desert Eagle.",
    notes: [
      "En Blue Shift aparece una versión mayor del soplete, con las bombonas en un carro, que usan los soldados normales cuando no hay un ingeniero.",
    ],
    appearances: [
      {
        gameId: "half-life-opposing-force",
        images: opposingForceModelImages(
          {
            entryId: "hecu-engineer",
            model: "hgrunt_torch.mdl",
            subject: "Ingeniero de la HECU",
            width: 432,
            height: 853,
          },
          true,
        ),
      },
    ],
    sources: [overwiki("HECU_Engineer", "HECU Engineer")],
  },
  {
    id: "walter-bennet",
    slug: "walter-bennet",
    name: "Walter Bennet",
    category: "characters",
    details: {
      affiliation: "Black Mesa (equipo científico)",
      voiceActor: "Harry S. Robins",
    },
    summary:
      "Científico de Black Mesa que se menciona por primera vez en Opposing Force y que trabaja con Rosenberg en el teletransportador de Blue Shift.",
    notes: [
      "Su nombre homenajea a Walter Bennett, de «Walter's World», una sección de cartas de los lectores de Planet Half-Life escrita por Kevin «Fragmaster» Bowen.",
      "El manual de PlayStation 2 escribe su apellido «Bennet», mientras que el personaje de los fans es «Bennett».",
    ],
    appearances: [
      { gameId: "half-life-opposing-force" },
      {
        gameId: "half-life-blue-shift",
        images: blueShiftModelImages({
          entryId: "walter-bennet",
          model: "scientist.mdl",
          subject: "Walter Bennet",
          width: 277,
          height: 857,
        }),
      },
    ],
    sources: [overwiki("Walter_Bennet", "Walter Bennet")],
  },

  // Curiosidades
  {
    id: "of-night-vision",
    slug: "vision-nocturna",
    name: "Visión nocturna y cuerdas",
    category: "trivia",
    summary:
      "Opposing Force es el único juego de Half-Life con visión nocturna en lugar de linterna, y el único en el que se puede trepar por cuerdas.",
    appearances: opposingForce,
    sources: [ofPage],
  },
];
