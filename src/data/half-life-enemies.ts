import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";
import { halfLifeModelImages } from "./model-captures";

// Enemigos de Half-Life 1 (Z3-3). Salud: skill.cfg o, si no tiene variable, el código del SDK;
// notas: Combine OverWiki y el SDK de Valve. Sin spoilers de la historia.

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

function sdk(file: string): Source {
  return {
    title: `dlls/${file} - SDK de Half-Life (Valve)`,
    url: `https://github.com/ValveSoftware/halflife/blob/master/dlls/${file}`,
    kind: "official",
  };
}

// Copia del archivo del juego publicada en GitHub (el repositorio de Valve no lo incluye)
const skillCfg: Source = {
  title: "skill.cfg de Half-Life (copia en GitHub)",
  url: "https://raw.githubusercontent.com/TheOverfloater/hl-retail/main/skill.cfg",
  kind: "official",
};

function health(easy: number, medium: number, hard: number) {
  return { easy, medium, hard };
}

const halfLife = [{ gameId: "half-life" }];

export const halfLifeEnemies: Entry[] = [
  {
    id: "headcrab",
    slug: "headcrab",
    name: "Headcrab",
    category: "enemies",
    details: { origin: "Xen", health: health(10, 10, 20) },
    summary:
      "Parásito de Xen del tamaño de una calabaza que camina sobre cuatro patas y salta unos tres metros. Casi toda su parte inferior es una boca con la que se agarra a la cabeza de sus víctimas y las convierte en zombis.",
    notes: [
      "El modelo de Half-Life tiene tres ojos a cada lado del cuerpo, seis en total.",
      "Durante el desarrollo de Half-Life 2, su sucesor directo fue el headcrab rápido; el clásico se añadió después, y por eso su modelo se llama headcrabclassic.mdl.",
    ],
    appearances: [
      { gameId: "half-life" },
      { gameId: "half-life-opposing-force" },
      { gameId: "half-life-blue-shift" },
    ],
    sources: [
      overwiki("Classic_Headcrab", "Classic Headcrab"),
      overwiki("Headcrab", "Headcrab"),
      skillCfg,
    ],
  },
  {
    id: "zombie",
    slug: "zombi",
    name: "Zombi",
    category: "enemies",
    details: {
      origin: "Xen (headcrab sobre un huésped humano)",
      health: health(50, 50, 100),
    },
    summary:
      "Un humano dominado por un headcrab que controla sus movimientos. Ataca cuerpo a cuerpo con los brazos del huésped.",
    notes: [
      "En Half-Life se les ve «alimentándose»: arrancan carne de científicos y soldados muertos y se la meten en la boca que les abre el pecho.",
      "La expansión cancelada Hostile Takeover iba a tener monos zombi, rápidos y muy fuertes, creados a partir de los monos de laboratorio.",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "zombie",
          model: "zombie.mdl",
          subject: "Zombi",
          width: 470,
          height: 807,
        }),
      },
    ],
    sources: [
      overwiki("Classic_Zombie", "Classic Zombie"),
      overwiki("Zombie", "Zombie"),
      skillCfg,
    ],
  },
  {
    id: "houndeye",
    slug: "houndeye",
    name: "Houndeye",
    category: "enemies",
    details: { origin: "Xen", health: health(20, 20, 30) },
    summary:
      "Criatura de Xen de tres patas, con un gran ojo compuesto en lugar de cabeza, que caza en manada. Se comunica con ladridos y ataca con una onda sónica.",
    notes: [
      "Ted Backman basó su anatomía en Tripod, un gato atigrado de tres patas de su barrio de infancia; su primer apodo fue «Roundeye».",
      "Se diseñó como una criatura amistosa, pero los jugadores de las pruebas le disparaban nada más verla.",
      "Su modelo conserva una animación sin usar de jefe de manada, «leaderlook».",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "houndeye",
          model: "houndeye.mdl",
          subject: "Houndeye",
          width: 597,
          height: 877,
        }),
      },
    ],
    sources: [overwiki("Houndeye", "Houndeye"), skillCfg],
  },
  {
    id: "bullsquid",
    slug: "bullsquid",
    name: "Bullsquid",
    category: "enemies",
    details: { origin: "Xen", health: health(40, 40, 120) },
    summary:
      "Criatura agresiva de Xen que camina sobre dos patas y tiene una cola gruesa. Se encuentra a gusto en alcantarillas y residuos tóxicos, y escupe ácido.",
    notes: [
      "Antes de tener su nombre definitivo se llamaba «Bullchicken», y los archivos del juego todavía lo usan.",
      "Ted Backman lo creó después de que Gabe Newell propusiera un juego al estilo de La niebla de Stephen King; la primera geometría que hizo entró en el juego sin cambios.",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "bullsquid",
          model: "bullsquid.mdl",
          subject: "Bullsquid",
          width: 562,
          height: 364,
        }),
      },
    ],
    sources: [overwiki("Bullsquid", "Bullsquid"), skillCfg],
  },
  {
    id: "barnacle",
    slug: "barnacle",
    name: "Barnacle",
    category: "enemies",
    details: { origin: "Xen", health: health(25, 25, 25) },
    summary:
      "Carnívoro inmóvil que cuelga del techo y deja caer una lengua larga y pegajosa para subir a sus presas. Espera en rincones oscuros para sorprenderlas.",
    notes: [
      "Se diseñó para frenar a los jugadores expertos que corrían por los niveles y obligarles a mirar hacia arriba.",
      "Al principio iba a atrapar también objetos, incluidos explosivos, y a recoger la lengua cuando estuviera en reposo.",
      "En Blast Pit, su lengua puede subir al jugador hasta unos cargadores que hay dentro de un silo.",
      "Su salud no tiene variable en skill.cfg: está escrita en su código (25).",
    ],
    appearances: halfLife,
    sources: [overwiki("Barnacle", "Barnacle"), sdk("barnacle.cpp")],
  },
  {
    id: "vortigaunt",
    slug: "vortigaunt",
    name: "Vortigaunt",
    category: "enemies",
    details: { origin: "Xen", health: health(30, 30, 60) },
    summary:
      "Alienígena inteligente con un tercer brazo en el pecho que ataca con descargas eléctricas. Suele aparecer en parejas o en grupo.",
    notes: [
      "Gordon iba a ganarse a los vortigaunts como aliados en Xen y a liderar su rebelión; la idea se descartó y se recuperó para Half-Life 2.",
      "La sección «Monster of the Week» de Online Gaming Review, antes del lanzamiento, le dio el nombre científico «Xenotherium subservilia».",
      "En los archivos del juego se llama «islave» (alien slave).",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "vortigaunt",
          model: "islave.mdl",
          subject: "Vortigaunt",
          width: 504,
          height: 778,
        }),
      },
    ],
    sources: [overwiki("Vortigaunt", "Vortigaunt"), skillCfg],
  },
  {
    id: "alien-grunt",
    slug: "alien-grunt",
    name: "Alien grunt",
    category: "enemies",
    details: { origin: "Ejército de Xen", health: health(60, 90, 120) },
    summary:
      "Soldado alienígena acorazado de unos dos metros. Dispara avispones teledirigidos con un arma viva, la Hivehand, y también lucha cuerpo a cuerpo.",
    notes: [
      "Un modelo temprano tenía la armadura azul y disparaba los avispones directamente desde la mano; sobrevive como sprite en una escena posterior del juego.",
      "El modelo final incluye una variante sin usar que no lleva la Hivehand.",
    ],
    appearances: halfLife,
    sources: [overwiki("Alien_Grunt", "Alien Grunt"), skillCfg],
  },
  {
    id: "alien-controller",
    slug: "controlador-alienigena",
    name: "Controlador alienígena",
    category: "enemies",
    details: { origin: "Ejército de Xen", health: health(60, 60, 100) },
    summary:
      "Alienígena flotante de cabeza enorme que supervisa a vortigaunts y alien grunts, y que también combate como soldado de las fuerzas de Xen.",
    notes: [
      "En origen se llamaba «Flying Vortigaunts Controller».",
      "Su modelo conserva animaciones sin usar de bloquear y lanzar, y tenía restos propios previstos al morir, cuyas texturas aparecen en Half-Life: Source.",
    ],
    appearances: halfLife,
    sources: [overwiki("Alien_Controller", "Alien Controller"), skillCfg],
  },
  {
    id: "ichthyosaur",
    slug: "ictiosaurio",
    name: "Ictiosaurio",
    category: "enemies",
    details: { origin: "Xen", health: health(200, 200, 400) },
    summary:
      "Gran depredador acuático de Xen que ataca a cualquiera que se meta en su agua. Su nombre científico es Xenotherus icthycanthus.",
    notes: [
      "Su nombre de trabajo era «Muddy», y su inteligencia artificial fue muy complicada de hacer por su tamaño.",
    ],
    appearances: halfLife,
    sources: [overwiki("Ichthyosaur", "Ichthyosaur"), skillCfg],
  },
  {
    id: "gargantua",
    slug: "gargantua",
    name: "Gargantúa",
    category: "enemies",
    details: { origin: "Ejército de Xen", health: health(800, 800, 1000) },
    summary:
      "Gigante azul de Xen de unos seis metros, con un solo ojo que brilla en rojo cuando ve a un enemigo. Lanza chorros de calor intenso desde sus manos en forma de pinza.",
    notes: [
      "Solo le hacen daño la energía, los aplastamientos, los morteros y las explosiones; las balas normales no le afectan.",
      "Rasgos que se quedaron fuera: mandíbulas extensibles, ojos ocultos, aletas en la espalda y una lengua de tres puntas. Se probaron pieles rosas, naranjas y moradas.",
    ],
    appearances: halfLife,
    sources: [
      overwiki("Gargantua", "Gargantua"),
      skillCfg,
      sdk("gargantua.cpp"),
    ],
  },
  {
    id: "tentacle",
    slug: "tentaculo",
    name: "Tentáculo",
    category: "enemies",
    details: { origin: "Xen", health: health(75, 75, 75) },
    summary:
      "Enorme tallo segmentado con una cabeza afilada que ataca a todo lo que hace ruido o vibra. Aparece por primera vez en una cámara de pruebas de cohetes.",
    notes: [
      "No se puede matar a tiros: su salud nunca baja de 1, y cuando llega a ese punto se retira y vuelve a 75.",
      "Lo diseñó Chuck Jones. En el SDK queda un ataque sin usar a través de la puerta del primer piso del silo.",
    ],
    appearances: halfLife,
    sources: [overwiki("Tentacle", "Tentacle"), sdk("tentacle.cpp")],
  },
  {
    id: "leech",
    slug: "sanguijuela",
    name: "Sanguijuela",
    category: "enemies",
    details: { origin: "Xen", health: health(2, 2, 2) },
    summary:
      "Pequeña criatura blanca de Xen, parecida a un pez, que nada en grupo y muerde a quien se mete en el agua.",
    notes: [
      "En Half-Life son enemigos menores y fáciles de matar, a diferencia de las sanguijuelas imposibles de eliminar de Half-Life 2.",
    ],
    appearances: halfLife,
    sources: [overwiki("Leech", "Leech"), skillCfg],
  },
  {
    id: "baby-headcrab",
    slug: "cria-de-headcrab",
    name: "Cría de headcrab",
    category: "enemies",
    details: { origin: "Xen", health: health(2.5, 2.5, 5) },
    summary:
      "La cría del headcrab, pequeña, rápida y débil por separado, que ataca en grupo.",
    notes: [
      "En el código es un headcrab translúcido, con una cuarta parte de su salud y una caja de impacto más pequeña.",
    ],
    appearances: halfLife,
    sources: [overwiki("Gonarch", "Gonarch"), sdk("headcrab.cpp"), skillCfg],
  },
  {
    id: "gonarch",
    slug: "gonarca",
    name: "Gonarca",
    category: "enemies",
    details: { origin: "Xen" },
    summary:
      "La última fase de vida del headcrab: una criatura enorme y acorazada de cuatro patas con un saco colgante del que salen crías de headcrab. Se le combate como jefe en Xen.",
    notes: [
      "Solo los impactos en el saco le hacen daño de verdad; en el resto del cuerpo el daño se reduce a una décima parte, y es inmune al ácido.",
      "Su salud no es una cifra fija: el código la recalcula en cada punto del recorrido del mapa y la multiplica según la dificultad.",
      "Nació de una broma en una lluvia de ideas: «un testículo gigante sobre una araña acorazada de seis metros». Gabe Newell lo defendió ante quienes lo veían demasiado explícito.",
      "Su nombre interno es «Big Momma» (la entidad monster_bigmomma y el modelo big_mom.mdl).",
    ],
    appearances: halfLife,
    sources: [overwiki("Gonarch", "Gonarch"), sdk("bigmomma.cpp")],
  },
  {
    // Sufijo de capítulo en la otra ficha: aquí va el enemigo
    id: "nihilanth",
    slug: "nihilanth",
    name: "Nihilanth",
    category: "enemies",
    details: { origin: "Xen", health: health(800, 800, 1000) },
    summary:
      "Un ser inmenso que flota en el aire, con forma de feto descomunal y una cabeza enorme.",
    notes: [
      "Su diseño parte del miedo al embarazo y al parto, inspirado en el nacimiento de Gray, el hijo de Gabe Newell.",
      "Su nombre une «nihil» (nada) y «-anth» (flor), por cómo se abre su cráneo como una flor; Marc Laidlaw lo bautizó en el último momento.",
    ],
    appearances: halfLife,
    sources: [overwiki("Nihilanth", "Nihilanth"), skillCfg],
  },
  {
    id: "hecu-marine",
    slug: "soldado-hecu",
    name: "Soldado de la HECU",
    category: "enemies",
    details: {
      origin: "Militar (Cuerpo de Marines de EE. UU.)",
      health: health(50, 50, 80),
    },
    summary:
      "Soldados de una unidad especial del Cuerpo de Marines enviados a Black Mesa durante el incidente. Combaten en escuadras, con armas de fuego y granadas.",
    notes: [
      "Valve eligió un camuflaje urbano gris en lugar de uno de desierto: un «anticamuflaje» que se distinguiera bien en las pantallas de baja resolución.",
      "En la versión alemana censurada, unos soldados robot sustituyen a los marines.",
      "Ted Backman diseñó los modelos originales.",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "hecu-marine",
          model: "hgrunt.mdl",
          subject: "Marine de la HECU",
          width: 497,
          height: 863,
        }),
      },
    ],
    sources: [
      overwiki(
        "Hazardous_Environment_Combat_Unit",
        "Hazardous Environment Combat Unit",
      ),
      skillCfg,
    ],
  },
  {
    id: "female-assassin",
    slug: "asesina-black-ops",
    name: "Asesina de operaciones encubiertas",
    category: "enemies",
    details: {
      origin: "Militar (operaciones encubiertas del Gobierno de EE. UU.)",
      health: health(30, 50, 50),
    },
    summary:
      "Asesinas ágiles del Gobierno que entran en Black Mesa después de los militares. En Half-Life solo se las ve brevemente.",
    notes: [
      "Iban a llevar ballestas: el carcaj de virotes sigue en el cinturón del modelo.",
      "Su modelo conserva animaciones sin usar de una patada a corta distancia.",
      "Sus ojos son azules en el Half-Life original y marrones en Opposing Force y en la versión de PlayStation 2.",
    ],
    appearances: halfLife,
    sources: [overwiki("Black_Ops", "Black Ops"), skillCfg],
  },
  {
    // La otra ficha «snark» es el arma
    id: "snark-creature",
    slug: "snark-criatura",
    name: "Snark (criatura)",
    category: "enemies",
    details: { origin: "Xen", health: health(2, 2, 2) },
    summary:
      "Pequeña criatura de Xen parecida a un escarabajo, con un único ojo verde brillante, que ataca en enjambre cuando se molesta su nido. Sus nidos se pueden recoger y lanzar como arma.",
    notes: [
      "Iba a parpadear: las texturas de sus párpados siguen sin usar en el SDK, y el nido tiene animaciones de caminar que no se usan.",
    ],
    appearances: halfLife,
    sources: [overwiki("Snark", "Snark"), skillCfg],
  },
  {
    id: "sentry-gun",
    slug: "torreta-centinela",
    name: "Torreta centinela",
    category: "enemies",
    details: {
      origin: "Militar (HECU y operaciones encubiertas)",
      health: health(40, 40, 50),
    },
    summary:
      "Ametralladora automática sobre un trípode que los militares usan para vigilar los pasos estrechos. Gira sobre su base para seguir a sus objetivos.",
    notes: [
      "Por los límites físicos del motor GoldSrc, cuando recibe suficiente daño simplemente se cae; Half-Life: Source lo mejoró.",
    ],
    appearances: halfLife,
    sources: [overwiki("Sentry_Gun", "Sentry Gun"), skillCfg],
  },
  {
    id: "automatic-turret",
    slug: "torreta-automatica",
    name: "Torreta automática",
    category: "enemies",
    details: {
      origin: "Black Mesa (seguridad)",
      health: health(50, 50, 60),
    },
    summary:
      "Las torretas de seguridad de la propia Black Mesa, en versión grande de tres cañones y pequeña de uno. La grande solo aparece en la entrada al complejo Lambda.",
    notes: [
      "La versión pequeña tiene menos salud: 40, 40 y 50 según la dificultad.",
      "La torreta grande se puede activar desde un ordenador o una caja de fusibles del puesto de control de seguridad.",
    ],
    appearances: halfLife,
    sources: [overwiki("Automatic_Turret", "Automatic Turret"), skillCfg],
  },
  {
    id: "apache",
    slug: "apache",
    name: "Apache",
    category: "enemies",
    details: {
      origin: "Militar (HECU y operaciones encubiertas)",
      health: health(150, 250, 400),
    },
    summary:
      "Helicóptero de ataque del ejército de EE. UU., con cohetes y una torreta que gira 360 grados. Enfrentarse a él sin cobertura es inútil.",
    notes: [
      "El modelo lleva una calcomanía de «Army» (Ejército de Tierra), aunque el Cuerpo de Marines usa helicópteros AH-1 Cobra.",
      "Los Apache de la HECU llevan en el morro una cara de tiburón casi invisible.",
    ],
    appearances: halfLife,
    sources: [overwiki("AH-64_Apache", "AH-64 Apache"), skillCfg],
  },
  {
    id: "osprey",
    slug: "osprey",
    name: "Osprey",
    category: "enemies",
    details: {
      origin: "Militar (HECU)",
      health: health(400, 400, 400),
    },
    summary:
      "Avión militar de despegue vertical que deja soldados en las zonas de combate. Aparece por primera vez al final de «We've Got Hostiles».",
    notes: [
      "Su salud no tiene variable en skill.cfg: está escrita en su código: 400 de salud general, y cada motor lleva además un contador de daño de 200 que no se suma a esa salud.",
      "La guía oficial de Prima afirma que dispara armas y cohetes; el artista de Valve Steve Theodore dijo que es un error.",
      "Los archivos de Opposing Force contienen un modelo sin usar de Osprey de operaciones encubiertas.",
    ],
    appearances: halfLife,
    sources: [
      overwiki("Osprey_Heliplane", "Osprey Heliplane"),
      sdk("osprey.cpp"),
    ],
  },
];
