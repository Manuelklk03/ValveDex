import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

const hlaAppearances = [{ gameId: "half-life-alyx" }];

function wiki(page: string, title: string): Source {
  return {
    title: `${title} - Half-Life Wiki`,
    url: `https://half-life.fandom.com/wiki/${page}`,
    kind: "wiki",
  };
}

const locationsSource: Source = {
  title: "Locations in the Half-Life and Portal universe - Combine OverWiki",
  url: "https://combineoverwiki.net/wiki/Locations_in_the_Half-Life_and_Portal_universe",
  kind: "wiki",
};

const wikipediaSource: Source = {
  title: "Half-Life: Alyx - Wikipedia",
  url: "https://en.wikipedia.org/wiki/Half-Life:_Alyx",
  kind: "wiki",
};

const storylineSource = wiki(
  "Half-Life:_Alyx_storyline",
  "Half-Life: Alyx storyline",
);

// Capítulos de Half-Life: Alyx. Los mapas (Source 2) salen de la lista de localizaciones de Combine OverWiki;
// del último capítulo solo se declara el mapa principal.
export const alyxChapters: Entry[] = [
  {
    id: "alyx-chapter-entanglement",
    slug: "hla-entrelazamiento",
    name: "Entrelazamiento",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: ["a1_intro_world", "a1_intro_world_2"],
    },
    summary:
      "Primer capítulo, ambientado en la Ciudad 17: el apartamento de Alyx y el laboratorio de Russell, donde empieza el juego.",
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
  {
    id: "alyx-chapter-quarantine-zone",
    slug: "hla-la-zona-de-cuarentena",
    name: "La zona de cuarentena",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["a2_quarantine_entrance", "a2_pistol", "a2_hideout"],
    },
    summary:
      "Alyx entra en la zona de cuarentena de la Ciudad 17, un área invadida por fauna de Xen. Aquí consigue sus primeras herramientas.",
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
  {
    id: "alyx-chapter-is-or-will-be",
    slug: "hla-es-o-sera",
    name: "Es o será",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: ["a2_headcrabs_tunnel", "a2_drainage", "a2_train_yard"],
    },
    summary:
      "Recorrido por los túneles de drenaje y la estación de metro de Fairview Junction, dentro de la zona de cuarentena.",
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
  {
    id: "alyx-chapter-superweapon",
    slug: "hla-superarma",
    name: "Superarma",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: ["a3_station_street"],
    },
    summary:
      "Capítulo ambientado en los Jardines de la Terminal (Terminal Gardens), en la zona de cuarentena.",
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
  {
    id: "alyx-chapter-northern-star",
    slug: "hla-la-estrella-del-norte",
    name: "La Estrella del Norte",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: [
        "a3_hotel_lobby_basement",
        "a3_hotel_underground_pit",
        "a3_hotel_interior_rooftop",
        "a3_hotel_street",
      ],
    },
    summary:
      "Exploración del hotel Northern Star, infestado de organismos de Xen, desde el sótano del vestíbulo hasta la azotea.",
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
  {
    id: "alyx-chapter-arms-race",
    slug: "hla-carrera-armamentistica",
    name: "Carrera armamentística",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: ["a3_c17_processing_plant"],
    },
    summary:
      "Capítulo en la planta de procesamiento de la compañía Holden, con puzles de explosivos y combates contra las fuerzas Combine.",
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
  {
    id: "alyx-chapter-jeff",
    slug: "hla-jeff",
    name: "Jeff",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: ["a3_distillery"],
    },
    summary:
      "Capítulo de terror en una destilería, con una criatura ciega que reacciona al sonido. Hay que moverse con sigilo y lanzar objetos para distraerla.",
    notes: [
      "Su título de desarrollo era «Silent Partner».",
      "Según Valve, contiene más objetos con física que todo Half-Life 2.",
    ],
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource, wikipediaSource],
  },
  {
    id: "alyx-chapter-captivity",
    slug: "hla-cautiverio",
    name: "Cautiverio",
    category: "maps",
    details: {
      chapter: 8,
      mapFiles: ["a4_c17_zoo"],
    },
    summary:
      "Capítulo ambientado en el Zoo Central de la Ciudad 17, dentro de la zona de cuarentena.",
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
  {
    id: "alyx-chapter-revelations",
    slug: "hla-revelaciones",
    name: "Revelaciones",
    category: "maps",
    details: {
      chapter: 9,
      mapFiles: ["a4_c17_tanker_yard"],
    },
    summary:
      "Capítulo ambientado en el depósito de cisternas (Tanker Yard) de la Ciudad 17.",
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
  {
    id: "alyx-chapter-breaking-and-entering",
    slug: "hla-allanamiento",
    name: "Allanamiento",
    category: "maps",
    details: {
      chapter: 10,
      mapFiles: ["a4_c17_water_tower", "a4_c17_parking_garage"],
    },
    summary:
      "Penúltimo capítulo, con mapas que incluyen una torre de agua y un aparcamiento.",
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
  {
    id: "alyx-chapter-point-extraction",
    slug: "hla-punto-de-extraccion",
    name: "Punto de extracción",
    category: "maps",
    details: {
      chapter: 11,
      mapFiles: ["a5_vault"],
    },
    summary: "Último capítulo del juego, ambientado en la Bóveda.",
    notes: [
      "Su título es un juego de palabras con «Punto de inserción», el primer capítulo de Half-Life 2.",
    ],
    appearances: hlaAppearances,
    sources: [locationsSource, storylineSource],
  },
];

// Armas y equipo de Alyx. El juego no tiene ranuras de HUD: el número sigue el orden en que se consiguen.
export const alyxWeapons: Entry[] = [
  {
    id: "alyx-gravity-gloves",
    slug: "hla-guantes-de-gravedad",
    name: "Guantes de gravedad",
    category: "weapons",
    details: { slot: 1 },
    summary:
      "Guantes que atraen objetos lejanos hacia la mano de Alyx. Cumplen en realidad virtual un papel parecido al del arma gravitatoria de Half-Life 2, pero solo con la función de atraer.",
    notes: [
      "Durante el desarrollo se llamaban «Grabbity Gloves».",
      "Se crearon por la dificultad de agacharse en realidad virtual.",
      "Atraen recursos como la resina, munición, jeringuillas de salud y larvas de hormiga león.",
    ],
    appearances: hlaAppearances,
    sources: [
      wiki("Gravity_Gloves", "Gravity Gloves"),
      wiki("Half-Life:_Alyx", "Half-Life: Alyx"),
    ],
  },
  {
    id: "alyx-pistol",
    slug: "hla-pistola",
    name: "Pistola",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma inicial de Alyx. Se puede mejorar en los fabricadores Combine con una mira réflex, un láser, un cargador ampliado y un modo ráfaga.",
    notes: [
      "Con todas las mejoras, el cargador pasa a 20+1 balas.",
      "Es el origen del arma de Alyx que aparece en Half-Life 2.",
    ],
    appearances: hlaAppearances,
    sources: [
      wiki("Alyx%27s_Gun", "Alyx's Gun"),
      wiki("Half-Life:_Alyx", "Half-Life: Alyx"),
    ],
  },
  {
    id: "alyx-shotgun",
    slug: "hla-escopeta",
    name: "Escopeta",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Escopeta Combine semiautomática de cargador, que se consigue en el tercer capítulo. Admite mejoras: láser, doble disparo, recarga automática y lanzagranadas.",
    appearances: hlaAppearances,
    sources: [
      wiki("Combine_Shotgun", "Combine Shotgun"),
      wiki("Half-Life:_Alyx", "Half-Life: Alyx"),
    ],
  },
  {
    id: "alyx-pulse-smg",
    slug: "hla-subfusil-de-pulso",
    name: "Subfusil de pulso",
    category: "weapons",
    details: { slot: 4, ammo: "Munición de pulso" },
    summary:
      "Subfusil Combine sin vincular genéticamente, que Alyx puede usar. Se encuentra en el sótano del hotel y solo se recarga cuando el cargador está vacío.",
    appearances: hlaAppearances,
    sources: [
      wiki("Pulse_SMG", "Pulse SMG"),
      wiki("Half-Life:_Alyx", "Half-Life: Alyx"),
    ],
  },
  {
    id: "alyx-combine-grenade",
    slug: "hla-granada-combine",
    name: "Granada Combine",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Granada que se activa con un botón. También puede dispararse desde la escopeta cuando tiene el lanzagranadas.",
    appearances: hlaAppearances,
    sources: [
      wiki("Combine_Grenade", "Combine Grenade"),
      wiki("Half-Life:_Alyx", "Half-Life: Alyx"),
    ],
  },
  {
    id: "alyx-xen-grenade",
    slug: "hla-granada-xen",
    name: "Granada de Xen",
    category: "weapons",
    details: { slot: 6 },
    summary:
      "Pequeña masa de tejido que se obtiene de ciertos dispensadores de las zonas infestadas. Al activarla brilla en verde azulado y hace clic antes de estallar.",
    appearances: hlaAppearances,
    sources: [
      wiki("Xen_Grenade", "Xen Grenade"),
      wiki("Half-Life:_Alyx", "Half-Life: Alyx"),
    ],
  },
];

export const alyxEnemies: Entry[] = [
  {
    id: "alyx-combine-grunt",
    slug: "hla-soldado-combine",
    name: "Soldado Combine",
    category: "enemies",
    details: { origin: "Combine" },
    summary:
      "Infantería básica de las fuerzas Combine que patrullan la Ciudad 17 y la zona de cuarentena.",
    appearances: hlaAppearances,
    sources: [wiki("Combine_Grunt", "Combine Grunt")],
  },
  {
    id: "alyx-combine-ordinal",
    slug: "hla-ordinal-combine",
    name: "Ordinal Combine",
    category: "enemies",
    details: { origin: "Combine (Overwatch)" },
    summary:
      "Oficial de las fuerzas Overwatch encargado de proteger la zona de cuarentena y las operaciones relacionadas con la Bóveda. Es uno de los cuatro tipos de comando Overwatch del juego.",
    appearances: hlaAppearances,
    sources: [wiki("Overwatch_Ordinal", "Overwatch Ordinal")],
  },
  {
    id: "alyx-combine-charger",
    slug: "hla-cargador-combine",
    name: "Cargador Combine",
    category: "enemies",
    details: { origin: "Combine (Overwatch)" },
    summary:
      "Soldado pesado de las fuerzas Overwatch, con armadura voluminosa, una escopeta pesada y un escudo de energía. Tiende a cargar contra el jugador en campo abierto.",
    appearances: hlaAppearances,
    sources: [
      wiki("Combine_Charger", "Combine Charger"),
      wiki("Heavy_Shotgun", "Heavy Shotgun"),
    ],
  },
  {
    id: "alyx-combine-suppressor",
    slug: "hla-supresor-combine",
    name: "Supresor Combine",
    category: "enemies",
    details: { origin: "Combine (Overwatch)" },
    summary:
      "Soldado pesado de Overwatch con una minigun de pulso. Se mantiene a distancia y da fuego de cobertura.",
    appearances: hlaAppearances,
    sources: [wiki("Combine_Suppressor", "Combine Suppressor")],
  },
  {
    id: "alyx-armored-headcrab",
    slug: "hla-headcrab-blindado",
    name: "Headcrab blindado",
    category: "enemies",
    details: { origin: "Xen" },
    summary:
      "Variante de headcrab nueva en Alyx, con el dorso protegido por una coraza de crecimientos de Xen. Su vientre es vulnerable.",
    appearances: hlaAppearances,
    sources: [wiki("Armored_Headcrab", "Armored Headcrab")],
  },
  {
    id: "alyx-reviver",
    slug: "hla-reviver",
    name: "Reviver",
    category: "enemies",
    details: { origin: "Xen" },
    summary:
      "Criatura algo mayor que un headcrab que escupe líquido con carga eléctrica. Alyx lo llama «perro relámpago». Puede reanimar cadáveres.",
    appearances: hlaAppearances,
    sources: [wiki("Reviver", "Reviver")],
  },
  {
    id: "alyx-electric-zombie",
    slug: "hla-zombi-electrico",
    name: "Zombi eléctrico",
    category: "enemies",
    details: { origin: "Xen" },
    summary:
      "Cadáver de zombi controlado por un reviver, que se ha metido en su cavidad torácica. Ataca lanzando una cuerda conductora.",
    appearances: hlaAppearances,
    sources: [wiki("Electric_Zombie", "Electric Zombie")],
  },
  {
    id: "alyx-jeff",
    slug: "hla-jeff-criatura",
    name: "Jeff",
    category: "enemies",
    details: { origin: "Xen" },
    summary:
      "Criatura ciega parecida a un zombi, protagonista del séptimo capítulo. No ve, pero oye con gran precisión: hay que moverse con sigilo.",
    notes: [
      "Valve probó varias versiones, entre ellas un robot Combine, antes de decidirse por una criatura de terror.",
    ],
    appearances: hlaAppearances,
    sources: [wiki("Jeff", "Jeff"), wikipediaSource],
  },
  {
    id: "alyx-antlion",
    slug: "hla-hormiga-leon",
    name: "Hormiga león",
    category: "enemies",
    details: { origin: "Xen" },
    summary: "Criatura de Half-Life 2 que reaparece en Half-Life: Alyx.",
    appearances: hlaAppearances,
    sources: [wikipediaSource],
  },
];

export const alyxCharacters: Entry[] = [
  {
    id: "alyx-russell",
    slug: "hla-russell",
    name: "Russell",
    category: "characters",
    details: { affiliation: "Resistencia", voiceActor: "Rhys Darby" },
    summary:
      "Inventor de la Resistencia que guía a Alyx por radio durante la aventura y le proporciona los guantes de gravedad.",
    appearances: hlaAppearances,
    sources: [wiki("Russell", "Russell"), wikipediaSource],
  },
  {
    id: "alyx-olga",
    slug: "hla-olga",
    name: "Olga",
    category: "characters",
    details: { affiliation: "Resistencia", voiceActor: "Cissy Jones" },
    summary:
      "Miembro de la Resistencia que aparece al comienzo del juego, cerca de su escondite en una lavandería.",
    notes: [
      "Cissy Jones y Rich Sommer (Larry) trabajaron antes en «Firewatch», de Campo Santo, por recomendación del guionista Sean Vanaman.",
    ],
    appearances: hlaAppearances,
    sources: [wiki("Olga", "Olga"), wikipediaSource],
  },
  {
    id: "alyx-larry",
    slug: "hla-larry",
    name: "Larry",
    category: "characters",
    details: {
      affiliation: "Desconocida (rebelde)",
      voiceActor: "Rich Sommer",
    },
    summary:
      "Superviviente que Alyx encuentra en la destilería. Le explica cómo moverse con Jeff.",
    appearances: hlaAppearances,
    sources: [wiki("Larry", "Larry"), wikipediaSource],
  },
  {
    id: "alyx-gary",
    slug: "hla-gary",
    name: "Gary",
    category: "characters",
    details: {
      affiliation: "Vortigaunts (sin bando)",
      voiceActor: "Tony Todd",
    },
    summary:
      "Vortigaunt aislado en la zona de cuarentena que ayuda a Alyx. Se presenta con una lesión cerebral.",
    appearances: hlaAppearances,
    sources: [wiki("Gary", "Gary"), wikipediaSource],
  },
];

export const alyxExtras: Entry[] = [
  {
    id: "alyx-no-crowbar",
    slug: "hla-sin-palanca",
    name: "Sin palanca",
    category: "trivia",
    summary:
      "La palanca, arma habitual de la saga, no está en el juego: Valve no logró que el cuerpo a cuerpo funcionara en realidad virtual y los jugadores la asociaban con Gordon Freeman.",
    notes: [
      "Otros conceptos de arma descartados fueron una mina láser, un tirachinas, un escudo y un lanzacohetes.",
    ],
    appearances: hlaAppearances,
    sources: [wikipediaSource],
  },
  {
    id: "alyx-cut-enemies",
    slug: "hla-enemigos-descartados",
    name: "Enemigos descartados",
    category: "trivia",
    summary:
      "Los zombis rápidos y los headcrabs rápidos de Half-Life 2 se eliminaron porque resultaban demasiado aterradores en realidad virtual, según el diseñador Dario Casali.",
    notes: [
      "Entre los datos del juego hay también una criatura sin uso, la «Jelly Blobber».",
    ],
    appearances: hlaAppearances,
    sources: [wikipediaSource, wiki("Jelly_Blobber", "Jelly Blobber")],
  },
  {
    id: "alyx-development",
    slug: "hla-desarrollo",
    name: "Desarrollo",
    category: "trivia",
    summary:
      "Entró en desarrollo hacia febrero de 2016 con un equipo de unas 80 personas, el mayor de la historia de Valve, que incluía a Campo Santo. Se anunció en noviembre de 2019 y salió el 23 de marzo de 2020.",
    notes: [
      "Valve probó prototipos de realidad virtual con varias de sus sagas y descartó Portal porque desorientaba.",
      "Iba a salir junto a las Valve Index en junio de 2019, pero se retrasó para reescribir la historia.",
    ],
    appearances: hlaAppearances,
    sources: [wikipediaSource, wiki("Half-Life:_Alyx", "Half-Life: Alyx")],
  },
  {
    id: "alyx-movement-options",
    slug: "hla-movimiento",
    name: "Opciones de movimiento",
    category: "trivia",
    summary:
      "El juego ofrece teletransporte, desplazamiento rápido («shift») y movimiento continuo. Valve se inspiró en el teletransporte de «Budget Cuts» y estandarizó la altura virtual al teletransportarse.",
    appearances: hlaAppearances,
    sources: [wikipediaSource, wiki("Half-Life:_Alyx", "Half-Life: Alyx")],
  },
  {
    id: "alyx-prax-wars",
    slug: "hla-prax-wars",
    name: "Prax Wars",
    category: "easter-eggs",
    summary:
      "Entre los disquetes repartidos por el juego hay títulos de la serie «Prax Wars», como «Prax Wars 2: Dante's Revenge», que ya aparecía como recreativa en la introducción de Half-Life: Blue Shift.",
    appearances: hlaAppearances,
    sources: [wiki("Half-Life:_Alyx", "Half-Life: Alyx")],
  },
  {
    id: "alyx-mannequin-headcrab",
    slug: "hla-headcrab-maniqui",
    name: "El headcrab y el maniquí",
    category: "easter-eggs",
    summary:
      "En un momento del juego se ve un headcrab intentando agarrarse a la cabeza de un maniquí, lo que sugiere que estas criaturas cazan por la vista y no por el olfato.",
    appearances: hlaAppearances,
    sources: [wiki("Half-Life:_Alyx", "Half-Life: Alyx")],
  },
  {
    id: "alyx-gnome",
    slug: "hla-gnomo-chompski",
    name: "Gnomo Chompski",
    category: "easter-eggs",
    summary:
      "El gnomo de jardín de Half-Life 2: Episode Two reaparece en Alyx y forma parte de un logro que exige llevarlo consigo hasta el final del juego.",
    appearances: hlaAppearances,
    sources: [wiki("Garden_Gnome", "Garden Gnome")],
  },
  {
    id: "alyx-blast-from-the-past",
    slug: "hla-eco-de-surface-tension",
    name: "Eco de «Surface Tension»",
    category: "easter-eggs",
    summary:
      "La sala llena de minas y barriles explosivos del capítulo «Carrera armamentística» recuerda a «Surface Tension», de Half-Life: suena una música parecida y el logro por desactivarlas todas se llama «Blast From the Past».",
    appearances: hlaAppearances,
    sources: [storylineSource],
  },
];
