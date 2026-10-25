import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

// Contenido propio de Half-Life: Blue Shift (Z4), según Combine OverWiki.
// No tiene armas ni enemigos nuevos: las apariciones de los de Half-Life 1 se añaden en sus fichas.

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

function storyline(section: string, title: string): Source {
  return overwiki(
    `Half-Life:_Blue_Shift_storyline#${section}`,
    `Half-Life: Blue Shift storyline (${title})`,
  );
}

const locations = overwiki(
  "Locations_in_the_Half-Life_and_Portal_universe",
  "Locations in the Half-Life and Portal universe",
);
const easterEggs = overwiki("Easter_eggs", "Easter eggs");
const dreamcast = overwiki(
  "Half-Life_(Dreamcast_port)",
  "Half-Life (Dreamcast port)",
);
const blueShift = [{ gameId: "half-life-blue-shift" }];

export const blueShiftEntries: Entry[] = [
  {
    id: "bs-hazard-course",
    slug: "blue-shift-hazard-course",
    name: "Hazard Course (Blue Shift)",
    category: "maps",
    details: {
      chapter: 0,
      mapFiles: [
        "ba_hazard1",
        "ba_hazard2",
        "ba_hazard3",
        "ba_hazard4",
        "ba_hazard5",
        "ba_hazard6",
      ],
    },
    summary:
      "Entrenamiento opcional para los guardias de seguridad en las instalaciones de formación de Black Mesa, guiado por un instructor holográfico basado en Miller. Enseña a moverse, a interactuar con el entorno y a usar las armas.",
    notes: [
      "Se hizo solo para la versión de PC; no estaba en la de Dreamcast.",
      "Durante el entrenamiento se ve a científicos, como Rosenberg, observando al jugador.",
    ],
    appearances: blueShift,
    sources: [
      storyline("Hazard_Course_(optional)", "Hazard Course"),
      locations,
    ],
  },
  {
    id: "bs-living-quarters-outbound",
    slug: "living-quarters-outbound",
    name: "Living Quarters Outbound",
    category: "maps",
    details: { chapter: 1, mapFiles: ["ba_tram1", "ba_tram2", "ba_tram3"] },
    summary:
      "Barney Calhoun baja en tranvía desde los dormitorios del Área 8 hasta las instalaciones subterráneas. El viaje enseña la vida diaria de Black Mesa: una lavandería y locales de comida rápida.",
    notes: [
      "Un balón de fútbol bajo las vías usa el modelo del mapa Push de Team Fortress Classic.",
    ],
    appearances: blueShift,
    sources: [
      storyline(
        "Chapter_1:_Living_Quarters_Outbound",
        "Living Quarters Outbound",
      ),
      locations,
      easterEggs,
    ],
  },
  {
    id: "bs-insecurity",
    slug: "insecurity",
    name: "Insecurity",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["ba_security1", "ba_security2", "ba_maint", "ba_elevator"],
      designers: ["Rob Heironimus", "David Mertz"],
    },
    summary:
      "Empieza una jornada normal en las instalaciones de seguridad del Área 3, donde Barney recoge su uniforme y su pistola. Le mandan por zonas de mantenimiento a ayudar a unos científicos con el ascensor principal del Sector G.",
    notes: [
      "Mientras Barney espera ante una puerta al principio del capítulo, Gordon Freeman pasa en el tranvía: es el reflejo del guardia que llama a esa puerta en Black Mesa Inbound.",
      "Según Randy Pitchford, Rob Heironimus construyó la secuencia del ascensor y dedicó todo su tiempo en Blue Shift a perfeccionarla.",
      "El G-Man pasa en un tranvía: es su única aparición en el juego.",
      "Iba a haber torretas automáticas que atacaran al jugador si hacía daño a otros personajes; una sigue en el mapa ba_tram3.",
      "En la versión de Dreamcast, su código de nivel era «Barney Goes to Work».",
    ],
    appearances: blueShift,
    sources: [overwiki("Insecurity", "Insecurity"), dreamcast],
  },
  {
    id: "bs-duty-calls",
    slug: "duty-calls",
    name: "Duty Calls",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: ["ba_canal1", "ba_canal1b", "ba_canal2", "ba_canal3"],
    },
    summary:
      "Barney despierta en el fondo del hueco de un ascensor y recorre las zonas de residuos industriales de Black Mesa buscando ayuda, mientras descubre el alcance del desastre.",
    notes: [
      "Un marine se queja de que les toquen los trabajos sucios porque el equipo de Shephard no lo consiguió, un guiño a Opposing Force.",
      "En la versión de Dreamcast, su código de acceso era «Red Is Scary».",
    ],
    appearances: blueShift,
    sources: [
      storyline("Chapter_3:_Duty_Calls", "Duty Calls"),
      locations,
      dreamcast,
    ],
  },
  {
    id: "bs-captive-freight",
    slug: "captive-freight",
    name: "Captive Freight",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: [
        "ba_yard1",
        "ba_yard2",
        "ba_yard3a",
        "ba_yard3b",
        "ba_yard3",
        "ba_yard4",
        "ba_yard4a",
        "ba_yard5",
        "ba_yard5a",
      ],
    },
    summary:
      "Barney cruza el patio de mercancías para llegar a unos científicos retenidos en vagones. Allí conoce al doctor Rosenberg, que tiene un plan para escapar.",
    notes: [
      "En el mapa ba_yard3, una caja de engranajes caída por una escalera es literalmente una «gear box», un guiño a Gearbox Software.",
      "En la versión de Dreamcast, su código de acceso era «Combat And Trains».",
    ],
    appearances: blueShift,
    sources: [
      storyline("Chapter_4:_Captive_Freight", "Captive Freight"),
      locations,
      easterEggs,
      dreamcast,
    ],
  },
  {
    id: "bs-focal-point",
    slug: "focal-point",
    name: "Focal Point",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: [
        "ba_teleport1",
        "ba_teleport2",
        "ba_xen1",
        "ba_xen2",
        "ba_xen3",
        "ba_xen4",
        "ba_xen5",
        "ba_xen6",
      ],
    },
    summary:
      "En los antiguos laboratorios de prototipos de la Sección A-17, los científicos montan de nuevo un teletransportador en desuso. Barney tiene que viajar a Xen para manejar un dispositivo de triangulación.",
    notes: [
      "El sector es más antiguo y se nota: los cargadores de salud y del traje son de otro modelo, y las puertas usan escáneres de mano en lugar de retina.",
      "El dispositivo de Xen es el Focuser, cuyo nombre interno es «Tuner».",
      "En la versión de Dreamcast, su código de acceso era «Barney Visits Xen».",
    ],
    appearances: blueShift,
    sources: [
      storyline("Chapter_5:_Focal_Point", "Focal Point"),
      locations,
      overwiki("Focuser", "Focuser"),
      dreamcast,
    ],
  },
  {
    id: "bs-power-struggle",
    slug: "power-struggle",
    name: "Power Struggle",
    category: "maps",
    details: { chapter: 6, mapFiles: ["ba_power1", "ba_power2"] },
    summary:
      "El teletransportador ha agotado sus baterías, así que Barney baja a una central eléctrica a recargarlas, con marines y criaturas en su camino.",
    notes: [
      "En la versión de Dreamcast de septiembre de 2000, un gargantúa luchaba contra los soldados al final del capítulo; el juego final lo cambió por dos vortigaunts que no se ven.",
      "En la versión de Dreamcast, su código de acceso era «Power Is Progress».",
    ],
    appearances: blueShift,
    sources: [
      storyline("Chapter_6:_Power_Struggle", "Power Struggle"),
      locations,
      overwiki("Gargantua", "Gargantua"),
      dreamcast,
    ],
  },
  {
    id: "bs-a-leap-of-faith",
    slug: "a-leap-of-faith",
    name: "A Leap of Faith",
    category: "maps",
    details: { chapter: 7, mapFiles: ["ba_teleport2"] },
    summary:
      "Barney ayuda a poner en marcha el teletransportador para que los científicos lo crucen, y tiene que contener a los soldados antes de usarlo él.",
    notes: [
      "En la versión de Dreamcast, su código de acceso era «Physics Is Beautiful».",
    ],
    appearances: blueShift,
    sources: [
      storyline("Chapter_7:_A_Leap_of_Faith", "A Leap of Faith"),
      locations,
      dreamcast,
    ],
  },
  {
    id: "bs-deliverance",
    slug: "deliverance",
    name: "Deliverance",
    category: "maps",
    details: { chapter: 8, mapFiles: ["ba_outro"] },
    summary: "El epílogo de la aventura de Barney Calhoun.",
    appearances: blueShift,
    sources: [storyline("Deliverance", "Deliverance"), locations],
  },
  {
    id: "rosenberg",
    slug: "rosenberg",
    name: "Doctor Rosenberg",
    category: "characters",
    details: {
      affiliation: "Black Mesa (equipo científico)",
      voiceActor: "Jon St. John",
    },
    summary:
      "Científico veterano de Black Mesa y uno de los primeros en trabajar en el teletransporte. Lidera el plan de huida al que se une Barney.",
    notes: [
      "El manual de la versión de PlayStation 2 le da el rango de «científico de nivel 5», y Decay lo presenta como el diseñador del espectrómetro antimasa.",
      "Blue Shift le dio un modelo de personaje propio.",
    ],
    appearances: blueShift,
    sources: [
      overwiki("Rosenberg", "Rosenberg"),
      overwiki("Half-Life:_Blue_Shift", "Half-Life: Blue Shift"),
    ],
  },
  {
    id: "simmons",
    slug: "simmons",
    name: "Simmons",
    category: "characters",
    details: { affiliation: "Black Mesa (equipo científico)" },
    summary:
      "Científico que ayuda a preparar el teletransportador prototipo. Blue Shift es su única aparición.",
    appearances: blueShift,
    sources: [overwiki("Simmons", "Simmons")],
  },
  {
    id: "harold",
    slug: "harold",
    name: "Harold",
    category: "characters",
    details: {
      affiliation: "Black Mesa (equipo científico)",
      voiceActor: "Jon St. John",
    },
    summary:
      "Científico y buen amigo de Rosenberg, que forma parte del grupo que intenta escapar. Decay también lo menciona.",
    appearances: blueShift,
    sources: [overwiki("Harold", "Harold")],
  },
  {
    id: "armor-vest-and-helmet",
    slug: "chaleco-y-casco",
    name: "El chaleco y el casco",
    category: "trivia",
    summary:
      "En Blue Shift el traje HEV se sustituye por el chaleco antibalas y el casco de los guardias. No se recargan con baterías ni con cargadores: solo recogiendo chalecos y cascos nuevos.",
    appearances: blueShift,
    sources: [overwiki("Armor_vest_and_helmet", "Armor vest and helmet")],
  },
  {
    id: "guard-duty",
    slug: "guard-duty",
    name: "De «Guard Duty» a Blue Shift",
    category: "trivia",
    summary:
      "Blue Shift se llamaba en origen «Half-Life: Guard Duty» y se diseñó como una expansión exclusiva de la versión de Dreamcast, que se canceló semanas antes de salir.",
    notes: [
      "A diferencia de Opposing Force, no necesita el Half-Life original. Salió el 12 de junio de 2001 y llegó a Steam el 24 de agosto de 2005.",
      "Tuvo un 71 sobre 100 en Metacritic y un 67,40 % en GameRankings, y vendió unas 800 000 copias en tienda.",
    ],
    appearances: blueShift,
    sources: [overwiki("Half-Life:_Blue_Shift", "Half-Life: Blue Shift")],
  },
  {
    id: "high-definition-pack",
    slug: "high-definition-pack",
    name: "El High Definition Pack",
    category: "trivia",
    summary:
      "Blue Shift incluía el High Definition Pack opcional, con modelos más detallados que venían de la versión de Dreamcast y que también se aplican a Half-Life y Opposing Force.",
    notes: [
      "El pack cambió la pistola de 9 mm: de una Glock 17 a una Beretta M9.",
    ],
    appearances: [
      { gameId: "half-life" },
      { gameId: "half-life-opposing-force" },
      { gameId: "half-life-blue-shift" },
    ],
    sources: [
      overwiki(
        "Half-Life_High_Definition_Pack",
        "Half-Life High Definition Pack",
      ),
    ],
  },
  {
    id: "prax-wars",
    slug: "prax-wars",
    name: "Prax Wars 2: Dante's Revenge",
    category: "easter-eggs",
    summary:
      "En la lavandería, un guardia y un científico juegan a «Prax Wars 2: Dante's Revenge», un guiño a Prax War, un juego cancelado de Rebel Boat Rocker en el que trabajó Randy Pitchford.",
    appearances: blueShift,
    sources: [easterEggs],
  },
  {
    id: "barney-locker",
    slug: "taquilla-de-barney",
    name: "La taquilla de Barney",
    category: "easter-eggs",
    summary:
      "La taquilla de Barney guarda los libros «The Truth About Aliens», firmado por RH (Rob Heironimus), y «Government Conspiracies». Si se dispara 68 veces a la caja que hay dentro, toda la munición de 9 mm del mapa, aparece un chumtoad.",
    appearances: blueShift,
    sources: [easterEggs],
  },
  {
    id: "dancing-scientist",
    slug: "cientifico-que-baila",
    name: "El científico que baila",
    category: "easter-eggs",
    summary:
      "Si se usa varias veces la cámara de vigilancia que enfoca a Gordon, un científico se pone a bailar. Las cámaras también muestran a Gina Cross entregando la muestra de cristal.",
    appearances: blueShift,
    sources: [easterEggs],
  },
  {
    id: "heironimus-photo",
    slug: "foto-de-heironimus",
    name: "La foto de Rob Heironimus",
    category: "easter-eggs",
    summary:
      "Las taquillas vuelven a llevar apellidos de los desarrolladores, y una foto de Rob Heironimus con huevos de Pascua de plástico en los ojos aparece en un baño y en un conducto de ventilación.",
    appearances: blueShift,
    sources: [easterEggs],
  },
];
