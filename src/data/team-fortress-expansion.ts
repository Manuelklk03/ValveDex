import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function tfWiki(page: string, title: string): Source {
  return {
    title: `${title} - Official TF2 Wiki`,
    url: `https://wiki.teamfortress.com/wiki/${page}`,
    kind: "wiki",
  };
}

function wikipedia(page: string, title: string): Source {
  return {
    title: `${title} - Wikipedia`,
    url: `https://en.wikipedia.org/wiki/${page}`,
    kind: "wiki",
  };
}

const tfc = [{ gameId: "team-fortress-classic" }];
const tf2 = [{ gameId: "team-fortress-2" }];
const tfBoth = [
  { gameId: "team-fortress-classic" },
  { gameId: "team-fortress-2" },
];

// Mapas oficiales de TF2 (nombre de archivo y modo según la Official TF2 Wiki) y de TFC.
export const teamFortressMoreMaps: Entry[] = [
  {
    id: "tf-map-gravelpit",
    slug: "mapa-gravel-pit",
    name: "Gravel Pit",
    category: "maps",
    details: { chapter: 3, mapFiles: ["cp_gravelpit"] },
    summary:
      "Mapa de ataque y defensa por puntos de control, uno de los seis incluidos en el lanzamiento de Team Fortress 2. BLU debe capturar los puntos A y B, en cualquier orden, antes de poder atacar el C.",
    appearances: tf2,
    sources: [tfWiki("Gravel_Pit", "Gravel Pit")],
  },
  {
    id: "tf-map-badlands",
    slug: "mapa-badlands",
    name: "Badlands",
    category: "maps",
    details: { chapter: 4, mapFiles: ["cp_badlands"] },
    summary:
      "Remake de control de puntos del Badlands de captura de bandera de Team Fortress Classic, añadido en febrero de 2008. Cada equipo tiene una base y un segundo punto abierto en lo alto de una colina; el punto central está en un puente.",
    appearances: tf2,
    sources: [tfWiki("Badlands_(Control_Point)", "Badlands (Control Point)")],
  },
  {
    id: "tf-map-goldrush",
    slug: "mapa-gold-rush",
    name: "Gold Rush",
    category: "maps",
    details: { chapter: 5, mapFiles: ["pl_goldrush"] },
    summary:
      "Mapa de carga útil de tres etapas que acompañó al estreno del modo Payload en la Gold Rush Update (abril de 2008). Al capturar el último punto de una etapa, el tiempo restante pasa a la siguiente hasta un máximo de nueve minutos.",
    appearances: tf2,
    sources: [tfWiki("Gold_Rush", "Gold Rush")],
  },
  {
    id: "tf-map-well",
    slug: "mapa-well",
    name: "Well",
    category: "maps",
    details: { chapter: 6, mapFiles: ["cp_well", "ctf_well"] },
    summary:
      "Mapa de la versión de lanzamiento de TF2 en su variante de control de puntos, con tres edificios en línea y un punto neutral en el central. Conserva las dos bases, los puestos de francotirador y el edificio neutral del Well de Team Fortress Classic. En enero de 2008 se añadió una variante de captura de bandera, ctf_well.",
    appearances: tf2,
    sources: [
      tfWiki("Well_(Control_Point)", "Well (Control Point)"),
      tfWiki("Well_(Capture_the_Flag)", "Well (Capture the Flag)"),
    ],
  },
  {
    id: "tf-map-granary",
    slug: "mapa-granary",
    name: "Granary",
    category: "maps",
    details: { chapter: 7, mapFiles: ["cp_granary"] },
    summary:
      "Mapa de control de puntos estándar, uno de los seis del lanzamiento de TF2. Transcurre en una gran fábrica de grano y complejo de envíos en una zona rural.",
    appearances: tf2,
    sources: [tfWiki("Granary_(Control_Point)", "Granary (Control Point)")],
  },
  {
    id: "tf-map-hydro",
    slug: "mapa-hydro",
    name: "Hydro",
    category: "maps",
    details: { chapter: 8, mapFiles: ["tc_hydro"] },
    summary:
      "Único mapa oficial de control de territorios, uno de los seis iniciales de TF2. Cada partida elige al azar entre seis disposiciones del mapa y los equipos van conquistando territorios hasta controlar los cuatro.",
    appearances: tf2,
    sources: [tfWiki("Hydro", "Hydro")],
  },
  {
    id: "tf-map-badwater",
    slug: "mapa-badwater-basin",
    name: "Badwater Basin",
    category: "maps",
    details: { chapter: 9, mapFiles: ["pl_badwater"] },
    summary:
      "Mapa de carga útil de una sola etapa con cuatro puntos de control que debe capturar BLU, en una gran cuenca que desemboca en un corredor abierto de edificios. Fue el segundo mapa de carga útil del juego y se reveló en la Heavy Update (agosto de 2008).",
    appearances: tf2,
    sources: [tfWiki("Badwater_Basin", "Badwater Basin")],
  },
  {
    id: "tf-map-hightower",
    slug: "mapa-hightower",
    name: "Hightower",
    category: "maps",
    details: { chapter: 10, mapFiles: ["plr_hightower"] },
    summary:
      "Mapa de carrera de carga útil de la Engineer Update (julio de 2010). Ambos equipos empujan su carro a la vez y, en el tramo final, los carros suben verticalmente por la torre y caen si se les deja solos.",
    appearances: tf2,
    sources: [tfWiki("Hightower", "Hightower")],
  },
  {
    id: "tf-map-upward",
    slug: "mapa-upward",
    name: "Upward",
    category: "maps",
    details: { chapter: 11, mapFiles: ["pl_upward"] },
    summary:
      "Mapa de carga útil de la Engineer Update: una instalación construida en una montaña con una vía en espiral que sube hasta la cima, rodeada en gran parte por un precipicio mortal.",
    appearances: tf2,
    sources: [tfWiki("Upward", "Upward")],
  },
  {
    id: "tf-map-thundermountain",
    slug: "mapa-thunder-mountain",
    name: "Thunder Mountain",
    category: "maps",
    details: { chapter: 12, mapFiles: ["pl_thundermountain"] },
    summary:
      "Mapa de carga útil de varias etapas desarrollado por Valve para la Engineer Update. Introduce un puente que hay que levantar para que el carro cruce y zonas de retroceso en pendiente señaladas con franjas amarillas y negras.",
    appearances: tf2,
    sources: [tfWiki("Thunder_Mountain", "Thunder Mountain")],
  },
  {
    id: "tf-map-process",
    slug: "mapa-process",
    name: "Process",
    category: "maps",
    details: { chapter: 13, mapFiles: ["cp_process_final"] },
    summary:
      "Mapa de control de puntos creado por la comunidad e incorporado oficialmente en el evento de verano de 2013, ambientado en una instalación alpina. Se juega habitualmente en el 6v6 competitivo de las ligas de la comunidad.",
    appearances: tf2,
    sources: [tfWiki("Process", "Process")],
  },
  {
    id: "tf-map-viaduct",
    slug: "mapa-viaduct",
    name: "Viaduct",
    category: "maps",
    details: { chapter: 14, mapFiles: ["koth_viaduct"] },
    summary:
      "Mapa de rey de la colina publicado en la Classless Update (agosto de 2009), junto con Nucleus y Sawmill, como uno de los primeros mapas oficiales de ese modo.",
    appearances: tf2,
    sources: [tfWiki("Viaduct", "Viaduct")],
  },
  {
    id: "tf-map-sawmill",
    slug: "mapa-sawmill",
    name: "Sawmill",
    category: "maps",
    details: { chapter: 15, mapFiles: ["koth_sawmill"] },
    summary:
      "Versión de rey de la colina de un mapa de arena, publicada en la Classless Update. Una cascada cae al centro de una gran poza que se cruza por una pasarela de troncos flotantes.",
    appearances: tf2,
    sources: [
      tfWiki("Sawmill_(King_of_the_Hill)", "Sawmill (King of the Hill)"),
    ],
  },
  {
    id: "tf-map-harvest",
    slug: "mapa-harvest",
    name: "Harvest",
    category: "maps",
    details: { chapter: 16, mapFiles: ["koth_harvest_final"] },
    summary:
      "Mapa de rey de la colina creado por la comunidad y publicado como oficial en el Haunted Hallowe'en Special de 2009 por su calidad. El punto de control está en un cobertizo en ruinas, abierto por ambos extremos, en el centro del mapa.",
    appearances: tf2,
    sources: [tfWiki("Harvest", "Harvest")],
  },
  {
    id: "tf-map-turbine",
    slug: "mapa-turbine",
    name: "Turbine",
    category: "maps",
    details: { chapter: 17, mapFiles: ["ctf_turbine"] },
    summary:
      "Mapa de captura de bandera creado por la comunidad e incluido en la Pyro Update (junio de 2008). Junto con Fastlane fue de los primeros mapas de la comunidad que Valve añadió como oficiales.",
    appearances: tf2,
    sources: [tfWiki("Turbine", "Turbine")],
  },
  {
    id: "tf-map-fastlane",
    slug: "mapa-fastlane",
    name: "Fastlane",
    category: "maps",
    details: { chapter: 18, mapFiles: ["cp_fastlane"] },
    summary:
      "Mapa de control de puntos estándar creado por la comunidad y publicado con la Pyro Update. Las salas de reaparición cambian conforme se capturan los puntos.",
    appearances: tf2,
    sources: [tfWiki("Fastlane", "Fastlane")],
  },
  {
    id: "tf-map-egypt",
    slug: "mapa-egypt",
    name: "Egypt",
    category: "maps",
    details: { chapter: 19, mapFiles: ["cp_egypt_final"] },
    summary:
      "Mapa de ataque y defensa creado por la comunidad e incluido en la Scout Update (febrero de 2009). Ambientado en un desierto egipcio con mucho uso de la verticalidad, RED defiende una tumba de oro hallada en una excavación.",
    appearances: tf2,
    sources: [tfWiki("Egypt", "Egypt")],
  },
  {
    id: "tf-map-steel",
    slug: "mapa-steel",
    name: "Steel",
    category: "maps",
    details: { chapter: 20, mapFiles: ["cp_steel"] },
    summary:
      "Mapa de ataque y defensa de la comunidad añadido en la Heavy Update. A diferencia de otros mapas de puntos de control, capturar un punto modifica la disposición del mapa, abriendo y cerrando rutas para cada equipo.",
    appearances: tf2,
    sources: [tfWiki("Steel", "Steel")],
  },
  {
    id: "tf-map-coldfront",
    slug: "mapa-coldfront",
    name: "Coldfront",
    category: "maps",
    details: { chapter: 21, mapFiles: ["cp_coldfront"] },
    summary:
      "Mapa de control de puntos estándar creado por la comunidad e incluido en la Engineer Update. Transcurre entre dos instalaciones en una región alpina nevada.",
    appearances: tf2,
    sources: [tfWiki("Coldfront", "Coldfront")],
  },
  {
    id: "tf-map-foundry",
    slug: "mapa-foundry",
    name: "Foundry",
    category: "maps",
    details: { chapter: 22, mapFiles: ["cp_foundry"] },
    summary:
      "Mapa de control de puntos estándar publicado con la actualización Australian Christmas 2011 (15 de diciembre de 2011). Se ambienta en un complejo industrial con los puntos finales frente a un gran caldero calentado por fuego.",
    appearances: tf2,
    sources: [tfWiki("Foundry_(Control_Point)", "Foundry (Control Point)")],
  },
  {
    id: "tf-map-doomsday",
    slug: "mapa-doomsday",
    name: "Doomsday",
    category: "maps",
    details: { chapter: 23, mapFiles: ["sd_doomsday"] },
    summary:
      "Mapa del modo Special Delivery revelado en la Pyromania Update. Ambos equipos compiten por llevar un paquete de australium hasta la plataforma de lanzamiento y mantenerse allí hasta insertarlo en la punta de un cohete.",
    appearances: tf2,
    sources: [tfWiki("Doomsday", "Doomsday")],
  },
  {
    id: "tf-map-manor",
    slug: "mapa-mann-manor",
    name: "Mann Manor",
    category: "maps",
    details: { chapter: 24, mapFiles: ["cp_manor_event"] },
    summary:
      "Mapa nocturno de ataque y defensa de la comunidad, publicado en la Scream Fortress Update (octubre de 2010). Se ambienta en la mansión en ruinas de Redmond Mann e introdujo al Jinete sin Cabeza ni Caballo.",
    appearances: tf2,
    sources: [tfWiki("Mann_Manor", "Mann Manor")],
  },
  {
    id: "tf-map-mercenarypark",
    slug: "mapa-mercenary-park",
    name: "Mercenary Park",
    category: "maps",
    details: { chapter: 25, mapFiles: ["cp_mercenarypark"] },
    summary:
      "Mapa de ataque y defensa publicado con la Jungle Inferno Update (octubre de 2017) y protagonista del vídeo de la actualización. Es una instalación de investigación biológica y fábrica de armas reconvertida en «Yeti Park».",
    appearances: tf2,
    sources: [tfWiki("Mercenary_Park", "Mercenary Park")],
  },
  {
    id: "tf-map-snowplow",
    slug: "mapa-snowplow",
    name: "Snowplow",
    category: "maps",
    details: { chapter: 26, mapFiles: ["cp_snowplow"] },
    summary:
      "Mapa de ataque y defensa de la comunidad, de dos etapas, añadido con la Gun Mettle Update. El objetivo gira en torno a un tren con carga: BLU debe escoltarlo capturando tres puntos de control por etapa, mientras trampas de RED lo dañan cada 35 segundos.",
    appearances: tf2,
    sources: [tfWiki("Snowplow", "Snowplow")],
  },
  {
    id: "tf-map-mannhattan",
    slug: "mapa-mannhattan",
    name: "Mannhattan",
    category: "maps",
    details: { chapter: 27, mapFiles: ["mvm_mannhattan"] },
    summary:
      "Mapa de Mann vs. Machine de la Two Cities Update (noviembre de 2013), en una metrópolis que recuerda a Manhattan. Tiene dos puertas, A y B, que los robots «gatebots» intentan abrir como si capturasen puntos de control.",
    appearances: tf2,
    sources: [tfWiki("Mannhattan", "Mannhattan")],
  },
  {
    id: "tf-map-rottenburg",
    slug: "mapa-rottenburg",
    name: "Rottenburg",
    category: "maps",
    details: { chapter: 28, mapFiles: ["mvm_rottenburg"] },
    summary:
      "Mapa de Mann vs. Machine de la Two Cities Update, ambientado en Rottenburg, la ciudad natal del Medic en Alemania. Tiene tres misiones: Village Vanguard (intermedia) y Hamlet Hostility y Bavarian Botbash (avanzadas).",
    appearances: tf2,
    sources: [tfWiki("Rottenburg", "Rottenburg")],
  },
  // Mapas de Team Fortress Classic (lista oficial de la wiki; 2fort y dustbowl ya existen).
  {
    id: "tfc-map-badlands",
    slug: "mapa-tfc-badlands",
    name: "Badlands (Classic)",
    category: "maps",
    details: { chapter: 3, mapFiles: ["badlands"] },
    summary:
      "Mapa de captura de bandera de Team Fortress Classic ambientado en un cañón del desierto. La bandera está en el conducto de ventilación de la base enemiga y se captura llevándola a la sala de reaparición propia.",
    appearances: tfc,
    sources: [
      tfWiki("Badlands_(Classic)", "Badlands (Classic)"),
      tfWiki("List_of_maps_(Classic)", "List of maps (Classic)"),
    ],
  },
  {
    id: "tfc-map-well",
    slug: "mapa-tfc-well",
    name: "Well (Classic)",
    category: "maps",
    details: { chapter: 4, mapFiles: ["well"] },
    summary:
      "Mapa de captura de bandera industrial de Team Fortress Classic. La bandera enemiga está en una torre de su base; hay que llevarla a la base de la torre propia. Parte del nivel se puede volar con un Detpack.",
    appearances: tfc,
    sources: [
      tfWiki("Well_(Classic)", "Well (Classic)"),
      tfWiki("Detpack_(Classic)", "Detpack (Classic)"),
    ],
  },
  {
    id: "tfc-map-casbah",
    slug: "mapa-tfc-casbah",
    name: "Casbah (Classic)",
    category: "maps",
    details: { chapter: 5, mapFiles: ["casbah"] },
    summary:
      "Mapa de captura de bandera de Team Fortress Classic situado en una ciudad vieja y ruinosa de calles empedradas con ladrillo. Hay que robar la bandera de la sala enemiga y devolverla a la propia.",
    appearances: tfc,
    sources: [tfWiki("Casbah_(Classic)", "Casbah (Classic)")],
  },
  {
    id: "tfc-map-rock2",
    slug: "mapa-tfc-rock-2",
    name: "Rock 2 (Classic)",
    category: "maps",
    details: { chapter: 6, mapFiles: ["rock2"] },
    summary:
      "Variante de captura de bandera de Team Fortress Classic en una prisión. En lugar de una bandera hay una tarjeta de acceso que se roba de la oficina del alcaide y se lleva al otro lado de la base enemiga, donde un interruptor libera gas nervioso.",
    appearances: tfc,
    sources: [
      tfWiki("rock_2_(Classic)", "Rock 2 (Classic)"),
      tfWiki("List_of_maps_(Classic)", "List of maps (Classic)"),
    ],
  },
  {
    id: "tfc-map-epicenter",
    slug: "mapa-tfc-epicenter",
    name: "Epicenter (Classic)",
    category: "maps",
    details: { chapter: 7, mapFiles: ["epicenter"] },
    summary:
      "Captura de bandera inversa de Team Fortress Classic en una ciudad de Oriente Próximo. Cada equipo lleva su bandera desde su sala de reaparición hasta su transporte blindado al otro extremo del mapa.",
    appearances: tfc,
    sources: [
      tfWiki("Epicenter_(Classic)", "Epicenter (Classic)"),
      tfWiki("List_of_maps_(Classic)", "List of maps (Classic)"),
    ],
  },
  {
    id: "tfc-map-flagrun",
    slug: "mapa-tfc-flagrun",
    name: "Flagrun (Classic)",
    category: "maps",
    details: { chapter: 8, mapFiles: ["flagrun"] },
    summary:
      "Variante de captura de bandera de Team Fortress Classic en una ciudad del desierto. Para ganar la ronda hay que llevar las cuatro banderas del mapa al punto de captura de la propia base.",
    appearances: tfc,
    sources: [
      tfWiki("flagrun_(Classic)", "Flagrun (Classic)"),
      tfWiki("List_of_maps_(Classic)", "List of maps (Classic)"),
    ],
  },
  {
    id: "tfc-map-ravelin",
    slug: "mapa-tfc-ravelin",
    name: "Ravelin (Classic)",
    category: "maps",
    details: { chapter: 9, mapFiles: ["ravelin"] },
    summary:
      "Captura de bandera inversa de Team Fortress Classic en un entorno industrial, añadida en la actualización de enero de 2003. Hay que llevar la bandera desde la zona de aparición de la propia base hasta el centro de mando enemigo.",
    appearances: tfc,
    sources: [
      tfWiki("ravelin_(Classic)", "Ravelin (Classic)"),
      tfWiki("List_of_maps_(Classic)", "List of maps (Classic)"),
    ],
  },
  {
    id: "tfc-map-push",
    slug: "mapa-tfc-push",
    name: "Push (Classic)",
    category: "maps",
    details: { chapter: 10, mapFiles: ["push"] },
    summary:
      "Mapa de «fútbol» de Team Fortress Classic. Se recoge una pelota del almacén del centro del campo y se lleva a la base enemiga para dejarla sobre la plataforma elevada y marcar un gol.",
    appearances: tfc,
    sources: [
      tfWiki("Push_(Classic)", "Push (Classic)"),
      tfWiki("List_of_maps_(Classic)", "List of maps (Classic)"),
    ],
  },
  {
    id: "tfc-map-warpath",
    slug: "mapa-tfc-warpath",
    name: "Warpath (Classic)",
    category: "maps",
    details: { chapter: 11, mapFiles: ["warpath"] },
    summary:
      "Mapa de puntos de mando estándar de Team Fortress Classic en un desierto. Hay que capturar los cinco puntos de mando en orden, simplemente pisando cada uno.",
    appearances: tfc,
    sources: [
      tfWiki("Warpath_(Classic)", "Warpath (Classic)"),
      tfWiki("List_of_maps_(Classic)", "List of maps (Classic)"),
    ],
  },
  {
    id: "tfc-map-avanti",
    slug: "mapa-tfc-avanti",
    name: "Avanti (Classic)",
    category: "maps",
    details: { chapter: 12, mapFiles: ["avanti"] },
    summary:
      "Mapa de ataque y defensa de Team Fortress Classic ambientado en una ciudad italiana. Los atacantes empiezan al pie de una colina y suben capturando puntos de mando; los defensores tienen un tiempo de preparación para fortificarse.",
    appearances: tfc,
    sources: [tfWiki("Avanti_(Classic)", "Avanti (Classic)")],
  },
  {
    id: "tfc-map-hunted",
    slug: "mapa-tfc-hunted",
    name: "Hunted (Classic)",
    category: "maps",
    details: { chapter: 13, mapFiles: ["hunted"] },
    summary:
      "Único mapa de asesinato y escolta de Team Fortress Classic. Se juega en el mapa c2a5e de Half-Life con la clase Civil, un personaje poco armado que un equipo de guardaespaldas debe escoltar hasta un camión mientras los asesinos (francotiradores) intentan matarlo.",
    appearances: tfc,
    sources: [tfWiki("Hunted_(Classic)", "Hunted (Classic)")],
  },
];

// Armas por clase. TF2: ranura 1 primaria, 2 secundaria, 3 cuerpo a cuerpo y 4 PDA/zapador.
// TFC: ranuras de la wiki de Team Fortress Classic. maxAmmo solo cuando la ficha de la wiki da la cifra.
export const teamFortressMoreWeapons: Entry[] = [
  {
    id: "tf-weapon-scattergun",
    slug: "arma-scattergun",
    name: "Scattergun",
    category: "weapons",
    details: { slot: 1, ammo: "Cartuchos", maxAmmo: 32 },
    summary:
      "Arma primaria de serie del Scout: una escopeta corta de doble cañón y palanca. Dispara los mismos perdigones que la escopeta de otras clases, pero con más daño a corta distancia.",
    notes: ["Carga seis cartuchos y reserva 32."],
    appearances: tf2,
    sources: [tfWiki("Scattergun", "Scattergun")],
  },
  {
    id: "tf-weapon-pistol",
    slug: "arma-pistola-tf2",
    name: "Pistola",
    category: "weapons",
    details: { slot: 2, ammo: "Balas", maxAmmo: 36 },
    summary:
      "Arma secundaria de serie del Scout y del Engineer: una pistola semiautomática estilizada. Hace poco daño por impacto, pero su cadencia y su precisión la hacen útil para acabar con enemigos heridos.",
    notes: ["Carga 12 balas; el Scout reserva 36 y el Engineer, 200."],
    appearances: tf2,
    sources: [tfWiki("Pistol", "Pistol")],
  },
  {
    id: "tf-weapon-bat",
    slug: "arma-bate",
    name: "Bate",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma cuerpo a cuerpo de serie del Scout: un bate de béisbol de aluminio con la cinta del mango desgastada y una gran abolladura. Hace 35 de daño por golpe, menos que el resto de armas cuerpo a cuerpo de serie, pero golpea un 37,5 % más rápido.",
    appearances: tf2,
    sources: [tfWiki("Bat", "Bat")],
  },
  {
    id: "tf-weapon-sandman",
    slug: "arma-sandman",
    name: "Sandman",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Bate de madera desbloqueable del Scout, añadido en la Scout Update (febrero de 2009). Con el fuego alternativo lanza una pelota de béisbol que ralentiza al enemigo que alcanza.",
    appearances: tf2,
    sources: [tfWiki("Sandman", "Sandman")],
  },
  {
    id: "tf-weapon-shotgun",
    slug: "arma-escopeta-tf2",
    name: "Escopeta",
    category: "weapons",
    details: { slot: 2, ammo: "Cartuchos", maxAmmo: 32 },
    summary:
      "Escopeta de corredera de cañón recortado: arma secundaria de serie del Soldier, el Pyro y el Heavy y primaria del Engineer. Hace mucho daño de cerca, pero pierde eficacia con la distancia.",
    notes: ["Carga seis cartuchos y reserva 32."],
    appearances: tf2,
    sources: [tfWiki("Shotgun", "Shotgun")],
  },
  {
    id: "tf-weapon-shovel",
    slug: "arma-pala",
    name: "Pala",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma cuerpo a cuerpo de serie del Soldier: una pala de trinchera con el mango astillado.",
    appearances: tf2,
    sources: [tfWiki("Shovel", "Shovel")],
  },
  {
    id: "tf-weapon-direct-hit",
    slug: "arma-direct-hit",
    name: "Direct Hit",
    category: "weapons",
    details: { slot: 1, ammo: "Cohetes", maxAmmo: 20 },
    summary:
      "Lanzacohetes desbloqueable del Soldier. Sus cohetes viajan un 80 % más rápido (1980 unidades Hammer por segundo) y hacen un 25 % más de daño que los del lanzacohetes de serie, con minicríticos contra enemigos que están en el aire.",
    notes: ["Carga cuatro cohetes y reserva 20."],
    appearances: tf2,
    sources: [tfWiki("Direct_Hit", "Direct Hit")],
  },
  {
    id: "tf-weapon-equalizer",
    slug: "arma-equalizer",
    name: "Equalizer",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Pico desbloqueable del Soldier cuyo daño aumenta cuanta menos salud tiene su portador. A salud completa hace menos daño que las demás armas cuerpo a cuerpo del Soldier, y mientras se empuña la curación recibida de un Medic baja un 90 %.",
    appearances: tf2,
    sources: [tfWiki("Equalizer", "Equalizer")],
  },
  {
    id: "tf-weapon-pain-train",
    slug: "arma-pain-train",
    name: "Pain Train",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma cuerpo a cuerpo creada por la comunidad para el Soldier y el Demoman. Aumenta en uno la velocidad de captura de su portador, que cuenta como dos jugadores en puntos de control y cargas útiles, a costa de recibir un 10 % más de daño de las balas.",
    appearances: tf2,
    sources: [tfWiki("Pain_Train", "Pain Train")],
  },
  {
    id: "tf-weapon-flamethrower",
    slug: "arma-lanzallamas-tf2",
    name: "Lanzallamas",
    category: "weapons",
    details: { slot: 1, ammo: "Combustible", maxAmmo: 200 },
    summary:
      "Arma primaria de serie del Pyro: un largo tubo conectado por una manguera a un tanque de propano. Lanza una corriente de unas 33 partículas de fuego por segundo en un cono estrecho, de alcance corto, que atraviesa a enemigos y construcciones.",
    appearances: tf2,
    sources: [tfWiki("Flame_Thrower", "Flame Thrower")],
  },
  {
    id: "tf-weapon-backburner",
    slug: "arma-backburner",
    name: "Backburner",
    category: "weapons",
    details: { slot: 1, ammo: "Combustible", maxAmmo: 200 },
    summary:
      "Lanzallamas desbloqueable del Pyro, casi idéntico al de serie salvo una pieza en forma de cabeza de dragón en la boquilla. No lanza críticos aleatorios, pero garantiza críticos al alcanzar al enemigo por la espalda.",
    appearances: tf2,
    sources: [tfWiki("Backburner", "Backburner")],
  },
  {
    id: "tf-weapon-flare-gun",
    slug: "arma-pistola-de-bengalas",
    name: "Pistola de bengalas",
    category: "weapons",
    details: { slot: 2, ammo: "Bengalas", maxAmmo: 16 },
    summary:
      "Arma secundaria desbloqueable del Pyro, de un solo disparo. Sus bengalas hacen poco daño, pero prenden fuego al enemigo y viajan a unas 2000 unidades Hammer por segundo.",
    appearances: tf2,
    sources: [tfWiki("Flare_Gun", "Flare Gun")],
  },
  {
    id: "tf-weapon-fire-axe",
    slug: "arma-hacha-de-bombero",
    name: "Hacha de bombero",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma cuerpo a cuerpo de serie del Pyro: un hacha de bombero tipo Pulaski con la cabeza roja y el mango de madera.",
    appearances: tf2,
    sources: [tfWiki("Fire_Axe", "Fire Axe")],
  },
  {
    id: "tf-weapon-grenade-launcher",
    slug: "arma-lanzagranadas-tf2",
    name: "Lanzagranadas",
    category: "weapons",
    details: { slot: 1, ammo: "Granadas", maxAmmo: 16 },
    summary:
      "Arma primaria de serie del Demoman: un lanzagranadas de revólver con mira ajustable y culata de madera. Sus granadas rebotan y caen por gravedad, por lo que pueden hacerse rodar o rebotar tras una esquina para golpear sin línea de visión.",
    notes: ["Carga cuatro granadas y reserva 16."],
    appearances: tf2,
    sources: [tfWiki("Grenade_Launcher", "Grenade Launcher")],
  },
  {
    id: "tf-weapon-stickybomb-launcher",
    slug: "arma-lanzabombas-lapa",
    name: "Lanzabombas lapa",
    category: "weapons",
    details: { slot: 2, ammo: "Bombas lapa", maxAmmo: 24 },
    summary:
      "Arma secundaria de serie del Demoman: un lanzagranadas modificado con un gran cargador de tambor. Dispara bombas con púas que se adhieren a casi todas las superficies y se detonan a voluntad con el fuego alternativo.",
    notes: ["Carga ocho bombas y reserva 24."],
    appearances: tf2,
    sources: [tfWiki("Stickybomb_Launcher", "Stickybomb Launcher")],
  },
  {
    id: "tf-weapon-bottle",
    slug: "arma-botella",
    name: "Botella",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma cuerpo a cuerpo de serie del Demoman: una botella de cristal marrón de sidra «scrumpy» con la etiqueta «XXX» y el año 1808. Si un golpe crítico impacta, la mitad inferior se rompe hasta que su portador muere; es un efecto solo visual.",
    appearances: tf2,
    sources: [tfWiki("Bottle", "Bottle")],
  },
  {
    id: "tf-weapon-eyelander",
    slug: "arma-eyelander",
    name: "Eyelander",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Claymore desbloqueable del Demoman, añadida en la WAR! Update (diciembre de 2009) y de reputación embrujada. Tiene un 50 % más de alcance, pero reduce en 25 la salud de su portador (150 en total) y no lanza críticos aleatorios.",
    appearances: tf2,
    sources: [tfWiki("Eyelander", "Eyelander")],
  },
  {
    id: "tf-weapon-natascha",
    slug: "arma-natascha",
    name: "Natascha",
    category: "weapons",
    details: { slot: 1, ammo: "Balas pesadas", maxAmmo: 200 },
    summary:
      "Ametralladora desbloqueable del Heavy, publicada en la Heavy Update (agosto de 2008). Sus balas ralentizan al enemigo que alcanzan, salvo que reciba curación continua; el efecto disminuye con la distancia.",
    appearances: tf2,
    sources: [tfWiki("Natascha", "Natascha")],
  },
  {
    id: "tf-weapon-syringe-gun",
    slug: "arma-pistola-de-jeringuillas",
    name: "Pistola de jeringuillas",
    category: "weapons",
    details: { slot: 1, ammo: "Jeringuillas", maxAmmo: 150 },
    summary:
      "Arma primaria de serie del Medic: un arma a medida que dispara jeringuillas con aire a presión desde un cilindro transparente. Lanza diez por segundo, afectadas por la gravedad, así que hay que apuntar por encima del objetivo a larga distancia.",
    notes: ["Carga 40 jeringuillas y reserva 150."],
    appearances: tf2,
    sources: [tfWiki("Syringe_Gun", "Syringe Gun")],
  },
  {
    id: "tf-weapon-medigun",
    slug: "arma-pistola-medica",
    name: "Pistola médica",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma secundaria de serie del Medic. En lugar de dañar, cura a los aliados con un haz del color de su equipo y puede elevar su salud hasta el 150 % de la base (sobrecuración). Al llenar su medidor permite activar una ÜberCharge.",
    notes: [
      "Su ritmo de curación va de 24 PS por segundo, si el paciente recibió daño en los últimos 10 segundos, a un máximo de 72 PS por segundo.",
    ],
    appearances: tf2,
    sources: [tfWiki("Medi_Gun", "Medi Gun")],
  },
  {
    id: "tf-weapon-kritzkrieg",
    slug: "arma-kritzkrieg",
    name: "Kritzkrieg",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma secundaria desbloqueable del Medic, publicada en la Gold Rush Update. Cura como la pistola médica, pero su carga concede al paciente un 100 % de probabilidad de golpe crítico en lugar de invulnerabilidad.",
    appearances: tf2,
    sources: [tfWiki("Kritzkrieg", "Kritzkrieg")],
  },
  {
    id: "tf-weapon-bonesaw",
    slug: "arma-sierra-de-huesos",
    name: "Sierra de huesos",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma cuerpo a cuerpo de serie del Medic: una gran sierra médica de dientes anchos con un grueso mango gris, similar a las que se usaban antiguamente en amputaciones.",
    appearances: tf2,
    sources: [tfWiki("Bonesaw", "Bonesaw")],
  },
  {
    id: "tf-weapon-sniper-rifle",
    slug: "arma-rifle-de-francotirador-tf2",
    name: "Rifle de francotirador",
    category: "weapons",
    details: { slot: 1, ammo: "Balas", maxAmmo: 25 },
    summary:
      "Arma primaria de serie del Sniper: un rifle de cerrojo monotiro con culata de madera, una gran mira telescópica y un puntero láser. No tiene dispersión ni modificadores de daño por distancia y su zoom muestra un medidor de carga.",
    appearances: tf2,
    sources: [tfWiki("Sniper_Rifle", "Sniper Rifle")],
  },
  {
    id: "tf-weapon-huntsman",
    slug: "arma-huntsman",
    name: "Huntsman",
    category: "weapons",
    details: { slot: 1, ammo: "Flechas", maxAmmo: 12 },
    summary:
      "Arco recurvo desbloqueable del Sniper, publicado en la Sniper vs. Spy Update (mayo de 2009). A diferencia de sus otras armas primarias, que disparan balas, lanza flechas cuyo daño y velocidad crecen con la carga; cargarla del todo lleva un segundo.",
    appearances: tf2,
    sources: [tfWiki("Huntsman", "Huntsman")],
  },
  {
    id: "tf-weapon-smg",
    slug: "arma-subfusil-tf2",
    name: "Subfusil",
    category: "weapons",
    details: { slot: 2, ammo: "Balas", maxAmmo: 75 },
    summary:
      "Arma secundaria de serie del Sniper: un pequeño subfusil con una mira de hierro sobredimensionada y un cargador largo. Hace poco daño por disparo, pero tiene alta cadencia (10 balas por segundo) y precisión.",
    notes: ["Carga 25 balas y reserva 75."],
    appearances: tf2,
    sources: [tfWiki("SMG", "SMG")],
  },
  {
    id: "tf-weapon-kukri",
    slug: "arma-kukri",
    name: "Kukri",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma cuerpo a cuerpo de serie del Sniper: un gran kukri de mango marrón al que le falta un trozo de hoja.",
    appearances: tf2,
    sources: [tfWiki("Kukri", "Kukri")],
  },
  {
    id: "tf-weapon-revolver",
    slug: "arma-revolver-tf2",
    name: "Revólver",
    category: "weapons",
    details: { slot: 2, ammo: "Balas", maxAmmo: 24 },
    summary:
      "Arma secundaria de serie del Spy y su único arma a distancia: un revólver estilizado de doble acción y seis tiros con empuñadura de marfil. Sirve para mantener a raya a los enemigos o rematar tras un apuñalamiento fallido.",
    notes: ["Carga seis balas y reserva 24."],
    appearances: tf2,
    sources: [tfWiki("Revolver", "Revolver")],
  },
  {
    id: "tf-weapon-knife",
    slug: "arma-cuchillo-tf2",
    name: "Cuchillo mariposa",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma cuerpo a cuerpo de serie del Spy, también llamada Butterfly Knife o balisong. Al situarse tras un enemigo dentro de su alcance cuerpo a cuerpo se activa la animación de apuñalamiento, que lo mata de un golpe, con excepciones como el Sniper con el Razorback.",
    appearances: tf2,
    sources: [tfWiki("Knife", "Knife")],
  },
  {
    id: "tf-weapon-sapper",
    slug: "arma-zapador",
    name: "Zapador",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Arma de construcción de serie del Spy, también llamada AM/FM Ultra-Sapper en el manual de la torreta. Es un pequeño generador eléctrico con dos pinzas cuya única función es sabotear y destruir las construcciones de un Engineer.",
    appearances: tf2,
    sources: [tfWiki("Sapper", "Sapper")],
  },
  {
    id: "tf-weapon-wrangler",
    slug: "arma-wrangler",
    name: "Wrangler",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma secundaria desbloqueable del Engineer, de la Engineer Update (julio de 2010). Un mando con joystick y antena que permite controlar a mano la torreta centinela: el fuego principal dispara balas y el alternativo, cohetes.",
    appearances: tf2,
    sources: [tfWiki("Wrangler", "Wrangler")],
  },
  {
    id: "tf-weapon-gunslinger",
    slug: "arma-gunslinger",
    name: "Gunslinger",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Prótesis robótica desbloqueable del Engineer que sustituye su mano derecha. Le da 25 puntos de salud máxima más (150 en total), desactiva los críticos aleatorios del arma y permite un combo de tres golpes, cuyo tercero es un golpe crítico.",
    appearances: tf2,
    sources: [tfWiki("Gunslinger", "Gunslinger")],
  },
  // Armas de Team Fortress Classic.
  {
    id: "tfc-weapon-rocket-launcher",
    slug: "arma-tfc-lanzacohetes",
    name: "Lanzacohetes (Classic)",
    category: "weapons",
    details: { slot: 5, ammo: "Cohetes", maxAmmo: 50 },
    summary:
      "Arma exclusiva del Soldier de Team Fortress Classic. Dispara un único cohete que avanza en línea recta hasta chocar y cuyo daño de explosión baja con la distancia.",
    notes: ["Carga cuatro cohetes y reserva 50."],
    appearances: tfc,
    sources: [tfWiki("Rocket_Launcher_(Classic)", "Rocket Launcher (Classic)")],
  },
  {
    id: "tfc-weapon-assault-cannon",
    slug: "arma-tfc-canon-de-asalto",
    name: "Cañón de asalto",
    category: "weapons",
    details: { slot: 5, ammo: "Cartuchos", maxAmmo: 200 },
    summary:
      "Arma automática del Heavy de Team Fortress Classic. Dispara una ráfaga de balas con dispersión, parecida a los perdigones de la escopeta de un cañón.",
    appearances: tfc,
    sources: [tfWiki("Assault_Cannon_(Classic)", "Assault Cannon (Classic)")],
  },
  {
    id: "tfc-weapon-railgun",
    slug: "arma-tfc-canon-electromagnetico",
    name: "Cañón electromagnético (Railgun)",
    category: "weapons",
    details: { slot: 2, ammo: "Clavos", maxAmmo: 50 },
    summary: "Arma de ranura 2 del Engineer en la serie Team Fortress Classic.",
    appearances: tfc,
    sources: [tfWiki("Railgun_(Classic)", "Railgun (Classic)")],
  },
  {
    id: "tfc-weapon-tranq-gun",
    slug: "arma-tfc-pistola-tranquilizante",
    name: "Pistola tranquilizante",
    category: "weapons",
    details: { slot: 2, ammo: "Cartuchos", maxAmmo: 40 },
    summary:
      "Arma del Spy en Team Fortress Classic, con el aspecto de una pistola silenciada. En el mod original de Quake tenía la apariencia de la escopeta de un cañón.",
    appearances: tfc,
    sources: [
      tfWiki("Tranquilizer_Gun_(Classic)", "Tranquilizer Gun (Classic)"),
    ],
  },
  {
    id: "tfc-weapon-sniper-rifle",
    slug: "arma-tfc-rifle-de-francotirador",
    name: "Rifle de francotirador (Classic)",
    category: "weapons",
    details: { slot: 2, ammo: "Cartuchos", maxAmmo: 75 },
    summary: "Arma exclusiva del Sniper en la serie Team Fortress Classic.",
    appearances: tfc,
    sources: [tfWiki("Sniper_Rifle_(Classic)", "Sniper Rifle (Classic)")],
  },
  {
    id: "tfc-weapon-flamethrower",
    slug: "arma-tfc-lanzallamas",
    name: "Lanzallamas (Classic)",
    category: "weapons",
    details: { slot: 4, ammo: "Celdas", maxAmmo: 200 },
    summary:
      "Arma exclusiva del Pyro de Team Fortress Classic. Lanza una corriente de fuego que prende fácilmente a los jugadores; hace poco daño directo, pero compensa con daño continuo por quemaduras. Bajo el agua dispara burbujas inofensivas.",
    appearances: tfc,
    sources: [tfWiki("Flamethrower_(Classic)", "Flamethrower (Classic)")],
  },
  {
    id: "tfc-weapon-incendiary-cannon",
    slug: "arma-tfc-canon-incendiario",
    name: "Cañón incendiario",
    category: "weapons",
    details: { slot: 5, ammo: "Cohetes", maxAmmo: 20 },
    summary:
      "Arma exclusiva del Pyro de Team Fortress Classic. Lanza cohetes tan rápidos como los del lanzacohetes que prenden fuego a los objetivos dentro de su radio de explosión, incluso a través de paredes.",
    appearances: tfc,
    sources: [
      tfWiki("Incendiary_Cannon_(Classic)", "Incendiary Cannon (Classic)"),
    ],
  },
  {
    id: "tfc-weapon-grenade-launcher",
    slug: "arma-tfc-lanzagranadas",
    name: "Lanzagranadas (Classic)",
    category: "weapons",
    details: { slot: 4, ammo: "Cohetes", maxAmmo: 50 },
    summary:
      "Arma exclusiva del Demoman de Team Fortress Classic. Dispara granadas que explotan al impactar o, si no, unos tres segundos después del disparo.",
    notes: ["Carga seis granadas y reserva 50."],
    appearances: tfc,
    sources: [
      tfWiki("Grenade_Launcher_(Classic)", "Grenade Launcher (Classic)"),
    ],
  },
  {
    id: "tfc-weapon-pipebomb-launcher",
    slug: "arma-tfc-lanzabombas-de-tubo",
    name: "Lanzabombas de tubo",
    category: "weapons",
    details: { slot: 5, ammo: "Cohetes", maxAmmo: 50 },
    summary:
      "Arma del Demoman en Team Fortress Classic que dispara bombas de tubo rebotantes, marcadas con una banda amarilla, que solo explotan cuando el jugador lo ordena. Comparte cargador con el lanzagranadas.",
    appearances: tfc,
    sources: [
      tfWiki("Pipebomb_Launcher_(Classic)", "Pipebomb Launcher (Classic)"),
    ],
  },
  {
    id: "tfc-weapon-super-nailgun",
    slug: "arma-tfc-super-clavadora",
    name: "Super clavadora",
    category: "weapons",
    details: { slot: 4, ammo: "Clavos", maxAmmo: 150 },
    summary:
      "Arma automática del Medic en Team Fortress Classic que dispara clavos potentes a una cadencia moderada.",
    appearances: tfc,
    sources: [tfWiki("Super_Nailgun_(Classic)", "Super Nailgun (Classic)")],
  },
  {
    id: "tfc-weapon-knife",
    slug: "arma-tfc-cuchillo",
    name: "Cuchillo (Classic)",
    category: "weapons",
    details: { slot: 1 },
    summary:
      "Arma cuerpo a cuerpo del Spy en los juegos Classic de Team Fortress. Su habilidad especial es el apuñalamiento por la espalda, que mata al instante al objetivo.",
    appearances: tfc,
    sources: [tfWiki("Knife_(Classic)", "Knife (Classic)")],
  },
  {
    id: "tfc-weapon-wrench",
    slug: "arma-tfc-llave-inglesa",
    name: "Llave inglesa (Classic)",
    category: "weapons",
    details: { slot: 1 },
    summary:
      "Arma de ranura 1 del Engineer en los juegos Classic de Team Fortress, llamada «Spanner» en el mod original de Quake. Sirve para reparar y mejorar sus construcciones y para reparar la armadura de sus compañeros.",
    appearances: tfc,
    sources: [
      tfWiki("Wrench_(Classic)", "Wrench (Classic)"),
      tfWiki("Engineer_(Classic)", "Engineer (Classic)"),
    ],
  },
];

// Clases de Team Fortress Classic (salud, armadura y velocidad de la wiki) y personajes del universo de TF2.
export const teamFortressMoreCharacters: Entry[] = [
  {
    id: "tfc-class-scout",
    slug: "tfc-scout",
    name: "Scout (Classic)",
    category: "characters",
    details: { affiliation: "RED / BLU (Team Fortress Classic)" },
    summary:
      "Clase más rápida y móvil de Team Fortress Classic, con 75 de salud y 50 de armadura ligera. Su papel es de apoyo: está diseñado casi en exclusiva para capturar banderas y cumplir objetivos, y es la única clase con dos granadas especiales.",
    appearances: tfc,
    sources: [tfWiki("Scout_(Classic)", "Scout (Classic)")],
  },
  {
    id: "tfc-class-soldier",
    slug: "tfc-soldier",
    name: "Soldier (Classic)",
    category: "characters",
    details: { affiliation: "RED / BLU (Team Fortress Classic)" },
    summary:
      "Clase con más salud y la armadura más potente de Team Fortress Classic (100 de salud y 200 de armadura pesada). Su lanzacohetes es poderoso y versátil; sus puntos débiles son su lentitud y el tiempo de recarga.",
    appearances: tfc,
    sources: [tfWiki("Soldier_(Classic)", "Soldier (Classic)")],
  },
  {
    id: "tfc-class-sniper",
    slug: "tfc-sniper",
    name: "Sniper (Classic)",
    category: "characters",
    details: { affiliation: "RED / BLU (Team Fortress Classic)" },
    summary:
      "Clase de salud media (90) y la armadura más débil (50) de Team Fortress Classic. Se mueve a velocidad media y sus armas están pensadas para eliminar enemigos a larga distancia.",
    appearances: tfc,
    sources: [tfWiki("Sniper_(Classic)", "Sniper (Classic)")],
  },
  {
    id: "tfc-class-demoman",
    slug: "tfc-demoman",
    name: "Demoman (Classic)",
    category: "characters",
    details: { affiliation: "RED / BLU (Team Fortress Classic)" },
    summary:
      "Especialista en demoliciones de Team Fortress Classic, con 90 de salud y 120 de armadura media. Sus armas no son siempre las más precisas, pero son eficaces y muy destructivas.",
    appearances: tfc,
    sources: [tfWiki("Demoman_(Classic)", "Demoman (Classic)")],
  },
  {
    id: "tfc-class-medic",
    slug: "tfc-medic",
    name: "Medic (Classic)",
    category: "characters",
    details: { affiliation: "RED / BLU (Team Fortress Classic)" },
    summary:
      "Fuerza principal de curación de Team Fortress Classic, con 90 de salud y 100 de armadura media. Es rápido y capaz de matar, y recupera salud de forma pasiva con el tiempo.",
    appearances: tfc,
    sources: [tfWiki("Medic_(Classic)", "Medic (Classic)")],
  },
  {
    id: "tfc-class-heavy",
    slug: "tfc-heavy",
    name: "Heavy Weapons Guy (Classic)",
    category: "characters",
    details: { affiliation: "RED / BLU (Team Fortress Classic)" },
    summary:
      "Clase de gran tamaño de Team Fortress Classic, con 100 de salud y 300 de armadura pesada. Va equipado con escopeta de un cañón, escopeta de dos cañones y cañón de asalto, y es la clase más lenta.",
    appearances: tfc,
    sources: [
      tfWiki("Heavy_Weapons_Guy_(Classic)", "Heavy Weapons Guy (Classic)"),
    ],
  },
  {
    id: "tfc-class-pyro",
    slug: "tfc-pyro",
    name: "Pyro (Classic)",
    category: "characters",
    details: { affiliation: "RED / BLU (Team Fortress Classic)" },
    summary:
      "Clase de salud bastante alta (100) y armadura media (150) de Team Fortress Classic, de velocidad media. Sus armas están pensadas para sembrar confusión e infligir daño continuo.",
    appearances: tfc,
    sources: [tfWiki("Pyro_(Classic)", "Pyro (Classic)")],
  },
  {
    id: "tfc-class-spy",
    slug: "tfc-spy",
    name: "Spy (Classic)",
    category: "characters",
    details: { affiliation: "RED / BLU (Team Fortress Classic)" },
    summary:
      "Clase de infiltración de Team Fortress Classic: se disfraza de miembro de cualquier equipo y puede fingir su muerte para atravesar defensas, matar objetivos clave o robar la bandera. Con 90 de salud y 100 de armadura media, mata de un golpe a quien apuñala por la espalda.",
    appearances: tfc,
    sources: [tfWiki("Spy_(Classic)", "Spy (Classic)")],
  },
  {
    id: "tfc-class-engineer",
    slug: "tfc-engineer",
    name: "Engineer (Classic)",
    category: "characters",
    details: { affiliation: "RED / BLU (Team Fortress Classic)" },
    summary:
      "Clase de Team Fortress Classic cuya habilidad principal es levantar construcciones de apoyo y de negación de área, que mejora y repara con la llave inglesa. Tiene 80 de salud y 50 de armadura media.",
    appearances: tfc,
    sources: [tfWiki("Engineer_(Classic)", "Engineer (Classic)")],
  },
  {
    id: "tfc-class-civilian",
    slug: "tfc-civil",
    name: "Civil (Classic)",
    category: "characters",
    details: { affiliation: "Mapa Hunted (Team Fortress Classic)" },
    summary:
      "Clase única del mapa Hunted, también llamada «The Hunted» o VIP, con 50 de salud y sin armadura. Un equipo de guardaespaldas debe escoltarlo hasta un camión mientras los asesinos intentan matarlo.",
    appearances: tfc,
    sources: [
      tfWiki("Civilian_(Classic)", "Civilian (Classic)"),
      tfWiki("Hunted_(Classic)", "Hunted (Classic)"),
    ],
  },
  {
    id: "tf-char-administrator",
    slug: "la-administradora",
    name: "La Administradora",
    category: "characters",
    details: {
      affiliation: "TF Industries (RED y BLU)",
      voiceActor: "Ellen McLain",
    },
    summary:
      "Locutora habitual de Team Fortress 2 y, según la historia del juego, la Administradora de TF Industries, de RED y de BLU y la verdadera jefa de los mercenarios de ambos equipos. Aparece o se menciona en varios cómics.",
    notes: [
      "Ellen McLain, su actriz de voz, es también la voz de GLaDOS en Portal y está casada con John Patrick Lowrie, la voz del Sniper.",
    ],
    appearances: tf2,
    sources: [
      tfWiki("Administrator", "Administrator"),
      tfWiki("Non-player_characters", "Non-player characters"),
    ],
  },
  {
    id: "tf-char-miss-pauling",
    slug: "miss-pauling",
    name: "Miss Pauling",
    category: "characters",
    details: {
      affiliation: "TF Industries",
      voiceActor: "Ashly Burch",
    },
    summary:
      "Flo Pauling, conocida por todos como Miss Pauling, es la leal asistente de la Administradora. Se ocupa de informes de antecedentes, pedidos y entregas, canales de comunicación y asesinatos.",
    appearances: tf2,
    sources: [tfWiki("Miss_Pauling", "Miss Pauling")],
  },
  {
    id: "tf-char-saxton-hale",
    slug: "saxton-hale",
    name: "Saxton Hale",
    category: "characters",
    details: {
      affiliation: "Mann Co.",
      voiceActor: "JB Blanc (vídeo de la Jungle Inferno Update)",
    },
    summary:
      "Australiano temerario, antiguo presidente y director ejecutivo de Mann Co., protagonista de varias series de cómics y jefe jugable del modo Versus Saxton Hale. Entre sus aficiones figuran pelear, beber y enfrentarse a animales feroces.",
    appearances: tf2,
    sources: [tfWiki("Saxton_Hale", "Saxton Hale")],
  },
  {
    id: "tf-char-redmond-mann",
    slug: "redmond-mann",
    name: "Redmond Mann",
    category: "characters",
    details: { affiliation: "Propietario de RED" },
    summary:
      "Uno de los tres hijos trillizos de Zepheniah Mann y dueño de RED. Mantuvo toda su vida una disputa con su hermano Blutarch por las tierras que les dejó su padre y contrató un equipo de nueve mercenarios para derrotarlo.",
    appearances: tf2,
    sources: [tfWiki("Non-player_characters", "Non-player characters")],
  },
  {
    id: "tf-char-blutarch-mann",
    slug: "blutarch-mann",
    name: "Blutarch Mann",
    category: "characters",
    details: { affiliation: "Propietario de BLU" },
    summary:
      "Uno de los tres hijos trillizos de Zepheniah Mann y dueño de BLU. Mantuvo toda su vida una disputa con su hermano Redmond por las tierras que les dejó su padre y contrató un equipo de nueve mercenarios para derrotarlo.",
    appearances: tf2,
    sources: [tfWiki("Non-player_characters", "Non-player characters")],
  },
  {
    id: "tf-char-gray-mann",
    slug: "gray-mann",
    name: "Gray Mann",
    category: "characters",
    details: { affiliation: "Gray Gravel Company" },
    summary:
      "Tercer hijo de Zepheniah Mann y el más pequeño y más inteligente de los tres hermanos. Un águila salvaje se lo llevó de bebé y lo crio; más tarde regresó a la civilización y fundó la Gray Gravel Company.",
    appearances: tf2,
    sources: [tfWiki("Non-player_characters", "Non-player characters")],
  },
];

// Enemigos y jefes de TF2: Mann vs. Machine y eventos de Halloween.
export const teamFortressEnemies: Entry[] = [
  {
    id: "tf-enemy-scout-robot",
    slug: "robot-scout",
    name: "Robot Scout",
    category: "enemies",
    details: { origin: "Mann vs. Machine" },
    summary:
      "Versión robótica del Scout que aparece como enemigo en Mann vs. Machine. Los Bonk Scout beben un Bonk! Atomic Punch al aparecer y son invulnerables los primeros segundos, aunque después no tienen ninguna característica especial.",
    appearances: tf2,
    sources: [tfWiki("Scout_Robot", "Scout Robot")],
  },
  {
    id: "tf-enemy-giant-robots",
    slug: "robots-gigantes",
    name: "Robots gigantes",
    category: "enemies",
    details: { origin: "Mann vs. Machine" },
    summary:
      "Variantes mucho más grandes y con bastante más salud de los robots de Mann vs. Machine, pero a la mitad de velocidad. No se ralentizan al llevar la bomba, aunque tampoco reciben sus mejoras, y resisten el retroceso. Existen versiones gigantes de Scout, Soldier, Pyro, Demoman, Heavy y Medic.",
    appearances: tf2,
    sources: [tfWiki("Robots", "Robots")],
  },
  {
    id: "tf-enemy-tank-robot",
    slug: "robot-tanque",
    name: "Tanque",
    category: "enemies",
    details: { origin: "Mann vs. Machine" },
    summary:
      "Máquina enorme y extremadamente resistente que transporta una bomba, presentada en la Mann vs. Machine Update (agosto de 2012). No tiene capacidad ofensiva y solo se detiene destruyéndolo: es inmune a todos los efectos salvo el daño y los críticos. La Administradora anuncia su entrada, avance y destrucción.",
    appearances: tf2,
    sources: [tfWiki("Tank_Robot", "Tank Robot")],
  },
  {
    id: "tf-enemy-sentry-buster",
    slug: "sentry-buster",
    name: "Sentry Buster",
    category: "enemies",
    details: { origin: "Mann vs. Machine" },
    summary:
      "Robot especializado que aparece cuando una torreta centinela ha causado mucho daño a la horda. Se ve como unas piernas grandes parecidas a las de un Demoman robot con una mina naval por torso.",
    appearances: tf2,
    sources: [tfWiki("Sentry_Buster", "Sentry Buster")],
  },
  {
    id: "tf-enemy-monoculus",
    slug: "monoculus",
    name: "MONOCULUS",
    category: "enemies",
    details: { origin: "Halloween (jefe)" },
    summary:
      "Jefe y personaje no jugable de Halloween que debutó en el mapa Eyeaduct en el Very Scary Halloween Special (octubre de 2011). Es el ojo perdido del Demoman de RED, embrujado y agrandado por el Bombinomicon.",
    appearances: tf2,
    sources: [tfWiki("MONOCULUS", "MONOCULUS")],
  },
  {
    id: "tf-enemy-horsemann",
    slug: "jinete-sin-cabeza-ni-caballo",
    name: "Jinete sin Cabeza ni Caballo",
    category: "enemies",
    details: { origin: "Halloween (jefe)" },
    summary:
      "Forma no muerta de Silas Mann y enemigo neutral que debutó en Mann Manor con la Scream Fortress Update (octubre de 2010). En Mann Manor aparece aproximadamente cada ocho minutos en el punto en disputa si hay al menos diez jugadores, y ataca a ambos equipos hasta que lo derrotan.",
    appearances: tf2,
    sources: [
      tfWiki("Horseless_Headless_Horsemann", "Horseless Headless Horsemann"),
    ],
  },
  {
    id: "tf-enemy-skeletons",
    slug: "esqueletos-de-halloween",
    name: "Esqueletos",
    category: "enemies",
    details: { origin: "Halloween" },
    summary:
      "Entidades controladas por IA de los mapas de Halloween, introducidas en Helltower con Scream Fortress 2013 (octubre de 2013). Suelen aparecer al capturar un punto en mapas de carga útil o de puntos de control.",
    appearances: tf2,
    sources: [tfWiki("Skeletons", "Skeletons")],
  },
  {
    id: "tf-enemy-merasmus",
    slug: "merasmus",
    name: "Merasmus",
    category: "enemies",
    details: { origin: "Halloween (jefe)" },
    summary:
      "Merasmus el Mago, llamado también «el Nigromante sin Reembolsos», es un personaje importante de la historia de TF2 y, según la wiki, el no jugable con más papeles en el juego. Debutó en el Spectral Halloween Special (octubre de 2012). Lo dobla Nolan North.",
    appearances: tf2,
    sources: [tfWiki("Merasmus", "Merasmus")],
  },
];

// Curiosidades y easter eggs con fecha y fuente.
export const teamFortressMoreExtras: Entry[] = [
  {
    id: "tf-trivia-quake-mod",
    slug: "mod-team-fortress-para-quake",
    name: "El mod Team Fortress para Quake",
    category: "trivia",
    summary:
      "El Team Fortress original fue un mod gratuito para Quake (1996) creado por el equipo australiano TF Software, formado por Robin Walker y John Cook. En 1998 ambos se incorporaron a Valve, que acababa de lanzar Half-Life.",
    appearances: tfBoth,
    sources: [wikipedia("Team_Fortress_2", "Team Fortress 2")],
  },
  {
    id: "tf-trivia-tfc-release",
    slug: "lanzamiento-de-team-fortress-classic",
    name: "Lanzamiento de Team Fortress Classic",
    category: "trivia",
    summary:
      "Team Fortress Classic apareció en abril de 1999 como mod de Half-Life, desarrollado por Valve y publicado por Sierra Studios. Los servidores admiten hasta 32 jugadores y hay nueve clases. En 2000 salió una versión independiente, Team Fortress 1.5, con nuevos modelos y mapas; las versiones para OS X y Linux llegaron en agosto de 2013.",
    appearances: tfc,
    sources: [wikipedia("Team_Fortress_Classic", "Team Fortress Classic")],
  },
  {
    id: "tf-trivia-tf2-development",
    slug: "desarrollo-de-team-fortress-2",
    name: "Del «Brotherhood of Arms» a The Orange Box",
    category: "trivia",
    summary:
      "Valve presentó Team Fortress 2 en 1998 como «Team Fortress 2: Brotherhood of Arms», con estética de guerra moderna y una clase Comandante con vista aérea. Se mostró en el E3 de 1999 y en 2000 se retrasó por el cambio al motor Source. Se publicó el 10 de octubre de 2007 en The Orange Box para Windows y Xbox 360, el 22 de noviembre de 2007 en PlayStation 3 y como título independiente el 9 de abril de 2008.",
    appearances: tf2,
    sources: [
      wikipedia("Team_Fortress_2", "Team Fortress 2"),
      tfWiki("Team_Fortress_2", "Team Fortress 2"),
    ],
  },
  {
    id: "tf-trivia-free-to-play",
    slug: "team-fortress-2-gratuito",
    name: "Team Fortress 2 pasa a ser gratuito",
    category: "trivia",
    summary:
      "El 23 de junio de 2011 Valve anunció que Team Fortress 2 sería gratuito. El equipo único, como armas y atuendos, quedó disponible mediante microtransacciones en la tienda del juego, asociada a Steam.",
    appearances: tf2,
    sources: [wikipedia("Team_Fortress_2", "Team Fortress 2")],
  },
  {
    id: "tf-trivia-gold-rush-update",
    slug: "gold-rush-update",
    name: "Gold Rush Update (2008)",
    category: "trivia",
    summary:
      "Primera gran actualización de contenido de TF2, publicada el 29 de abril de 2008. Se centró en el Medic, con tres armas nuevas, introdujo el sistema de equipamiento (Character Info y Loadout), el modo Payload con el mapa Gold Rush y el vídeo «Meet the Scout».",
    appearances: tf2,
    sources: [tfWiki("Gold_Rush_Update", "Gold Rush Update")],
  },
  {
    id: "tf-trivia-heavy-update",
    slug: "heavy-update",
    name: "Heavy Update (2008)",
    category: "trivia",
    summary:
      "Tercera gran actualización de contenido de TF2, publicada el 19 de agosto de 2008. Se centró en el Heavy y introdujo el mecanismo de ralentización y el sándwich. Se reveló día a día, como ya era costumbre.",
    appearances: tf2,
    sources: [tfWiki("Heavy_Update", "Heavy Update")],
  },
  {
    id: "tf-trivia-scout-update",
    slug: "scout-update",
    name: "Scout Update (2009)",
    category: "trivia",
    summary:
      "Cuarta gran actualización de TF2, publicada el 24 de febrero de 2009. Además de nuevas armas del Scout, estableció como oficiales tres mapas de la comunidad por su calidad: Egypt, Watchtower y Junction.",
    appearances: tf2,
    sources: [tfWiki("Scout_Update", "Scout Update")],
  },
  {
    id: "tf-trivia-classless-update",
    slug: "classless-update",
    name: "Classless Update (2009)",
    category: "trivia",
    summary:
      "Primera gran actualización sin foco en una clase, publicada el 13 de agosto de 2009. En lugar de nuevas armas o logros, añadió objetos cosméticos, modos de juego y mapas, entre ellos los primeros de rey de la colina.",
    appearances: tf2,
    sources: [tfWiki("Classless_Update", "Classless Update")],
  },
  {
    id: "tf-trivia-engineer-update",
    slug: "engineer-update",
    name: "Engineer Update (2010)",
    category: "trivia",
    summary:
      "Gran actualización centrada en el Engineer, anunciada el 5 de julio de 2010 y publicada el 8 de julio. Se desbloqueaba por etapas: cada vez que los jugadores encontraban 25 llaves inglesas doradas se revelaba contenido nuevo (100 en total).",
    appearances: tf2,
    sources: [tfWiki("Engineer_Update", "Engineer Update")],
  },
  {
    id: "tf-trivia-scream-fortress",
    slug: "scream-fortress",
    name: "Scream Fortress, el evento de Halloween",
    category: "trivia",
    summary:
      "La Scream Fortress Update (27 de octubre de 2010) estableció el evento anual de Halloween de TF2. Incluyó dos mapas ganadores del Art Pass Contest, objetos cosméticos y logros espectrales, y los regalos de Halloween que repartían disfraces gratis.",
    appearances: tf2,
    sources: [tfWiki("Scream_Fortress_Update", "Scream Fortress Update")],
  },
  {
    id: "tf-trivia-steam-workshop",
    slug: "steam-workshop-en-tf2",
    name: "Steam Workshop en TF2",
    category: "trivia",
    summary:
      "El Steam Workshop de TF2 se abrió con la Manniversary Update & Sale el 13 de octubre de 2011. Permite a los usuarios enviar objetos modelados para su publicación en el juego y mapas personalizados para que la comunidad los pruebe y valore.",
    appearances: tf2,
    sources: [tfWiki("Steam_Workshop", "Steam Workshop")],
  },
  {
    id: "tf-trivia-mvm-update",
    slug: "mann-vs-machine-update",
    name: "Mann vs. Machine Update (2012)",
    category: "trivia",
    summary:
      "El 15 de agosto de 2012 TF2 incorporó Mann vs. Machine, un modo cooperativo en el que los jugadores defienden contra oleadas de robots, con el Tanque como una de sus novedades.",
    appearances: tf2,
    sources: [tfWiki("Tank_Robot", "Tank Robot")],
  },
  {
    id: "tf-trivia-gun-mettle",
    slug: "gun-mettle-update",
    name: "Gun Mettle Update (2015)",
    category: "trivia",
    summary:
      "Actualización de temporada publicada el 2 de julio de 2015 que introdujo aspectos de arma, cuatro mapas nuevos y tres burlas. Permitió recoger armas del suelo a los jugadores caídos y creó la Gun Mettle Campaign, un evento de tres meses.",
    appearances: tf2,
    sources: [tfWiki("Gun_Mettle_Update", "Gun Mettle Update")],
  },
  {
    id: "tf-trivia-meet-your-match",
    slug: "meet-your-match-update",
    name: "Meet Your Match Update (2016)",
    category: "trivia",
    summary:
      "Actualización del 7 de julio de 2016 que estrenó oficialmente el emparejamiento del modo competitivo y el modo casual, PASS Time, cuatro mapas nuevos y un arma para todas las clases. El Pyro ganó la votación de la comunidad frente al Heavy con el 56 % de los votos.",
    appearances: tf2,
    sources: [tfWiki("Meet_Your_Match_Update", "Meet Your Match Update")],
  },
  {
    id: "tf-trivia-jungle-inferno",
    slug: "jungle-inferno-update",
    name: "Jungle Inferno Update (2017)",
    category: "trivia",
    summary:
      "Gran actualización publicada el 20 de octubre de 2017 tras cuatro días de adelantos. Añadió cinco armas, cinco mapas de la comunidad, uno de Valve (Mercenary Park), siete burlas y 49 cosméticos.",
    appearances: tf2,
    sources: [tfWiki("Jungle_Inferno_Update", "Jungle Inferno Update")],
  },
  {
    id: "tf-trivia-doomsday",
    slug: "poopy-joe-y-doomsday",
    name: "Poopy Joe, el monkeynauta",
    category: "trivia",
    summary:
      "En el mapa Doomsday, la división Mann Co. Monkeynautics organiza el lanzamiento de un cohete tripulado por el monkeynauta Poopy Joe. El logotipo de la división aparece por todo el mapa y, según la historia, el cohete se avería, choca con una torre de antenas y explota.",
    appearances: tf2,
    sources: [
      tfWiki("Doomsday", "Doomsday"),
      tfWiki("Non-player_characters", "Non-player characters"),
    ],
  },
  {
    id: "tf-egg-foundry-whistles",
    slug: "silbatos-de-vapor-de-foundry",
    name: "Silbatos de vapor de Foundry",
    category: "easter-eggs",
    summary:
      "En el punto central de Foundry hay dos silbatos de vapor, uno RED y otro BLU. Cuando un equipo captura un punto, su silbato suelta vapor y reproduce un tono parecido al de un tren. Además, el mapa tiene 12 logros propios.",
    appearances: tf2,
    sources: [tfWiki("Foundry_(Control_Point)", "Foundry (Control Point)")],
  },
  {
    id: "tf-egg-frying-pan",
    slug: "sarten-de-left-4-dead-2",
    name: "La sartén de Left 4 Dead 2",
    category: "easter-eggs",
    summary:
      "La Frying Pan es un arma promocional para todas las clases excepto el Engineer y el Spy, basada en la sartén de Left 4 Dead 2. Funciona igual que el arma cuerpo a cuerpo de serie, pero al golpear reproduce los sonidos de la sartén de ese juego.",
    appearances: tf2,
    sources: [tfWiki("Frying_Pan", "Frying Pan")],
  },
];
