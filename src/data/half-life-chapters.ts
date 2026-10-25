import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

// Capítulos de Half-Life 1 (Z3-1). Mapas, diseñadores y notas: Combine OverWiki;
// los capítulos sin página propia allí toman la lista de mapas de una guía de la comunidad.

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

function storyline(section: string, title: string): Source {
  return overwiki(
    `Half-Life_storyline#${section}`,
    `Half-Life storyline (${title})`,
  );
}

const communityMapList: Source = {
  title: "Full List of All Half-Life Maps - Kosgames",
  url: "https://kosgames.com/half-life-all-maps-list-50172/",
  kind: "community",
};

const halfLife = [{ gameId: "half-life" }];

export const halfLifeChapters: Entry[] = [
  {
    id: "hazard-course",
    slug: "hazard-course",
    name: "Hazard Course",
    category: "maps",
    details: {
      chapter: 0,
      mapFiles: [
        "t0a0",
        "t0a0a",
        "t0a0b",
        "t0a0b1",
        "t0a0b2",
        "t0a0c",
        "t0a0d",
      ],
    },
    summary:
      "Entrenamiento opcional en el circuito de pruebas de Black Mesa: Gordon aprende a usar el traje HEV, a moverse, a disparar y a saltar con el módulo de salto largo mientras los científicos le observan.",
    notes: [
      "La versión de PlayStation 2 amplía el circuito: añade una escena en la que un científico aclara que Black Mesa no se hace responsable de las lesiones del entrenamiento y una sala que enseña el fijado de blanco del mando.",
    ],
    appearances: halfLife,
    sources: [
      storyline("Hazard_Course_(optional)", "Hazard Course"),
      communityMapList,
    ],
  },
  {
    id: "black-mesa-inbound",
    slug: "black-mesa-inbound",
    name: "Black Mesa Inbound",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: ["c0a0", "c0a0a", "c0a0b", "c0a0c", "c0a0d", "c0a0e"],
    },
    summary:
      "La presentación del juego: Gordon Freeman viaja en el tranvía hacia el laboratorio de Materiales Anómalos del Sector C. Todo parece normal salvo una fuga radiactiva que detiene el tranvía un momento, mientras un hombre de traje oscuro le observa desde otro vagón.",
    appearances: halfLife,
    sources: [
      storyline("Chapter_1:_Black_Mesa_Inbound", "Black Mesa Inbound"),
      {
        title: "Black Mesa Inbound - Valve Developer Community",
        url: "https://developer.valvesoftware.com/wiki/Black_Mesa_Inbound",
        kind: "wiki",
      },
    ],
  },
  {
    id: "anomalous-materials",
    slug: "anomalous-materials",
    name: "Anomalous Materials",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["c1a0", "c1a0d", "c1a0a", "c1a0b", "c1a0e"],
      designers: [
        "Brett Johnson",
        "John Guthrie",
        "Kelly Bailey",
        "Marc Laidlaw",
      ],
    },
    summary:
      "Gordon llega al laboratorio de Materiales Anómalos, se pone el traje HEV y baja a la cámara de pruebas para un experimento con el espectrómetro antimasa. El experimento sale terriblemente mal.",
    notes: [
      "El juego empezaba en origen después del desastre. Marc Laidlaw propuso mostrar antes los laboratorios intactos, con el desastre como transición a los niveles ya construidos, y Brett Johnson hizo esa versión en una sola noche.",
      "En 1997 ya existía una versión del capítulo, con estética blanca y geometría más futurista; sus dos primeros mapas (c1a0 y c1a0d) estaban unidos.",
    ],
    appearances: halfLife,
    sources: [overwiki("Anomalous_Materials_(chapter)", "Anomalous Materials")],
  },
  {
    id: "unforeseen-consequences",
    slug: "unforeseen-consequences",
    name: "Unforeseen Consequences",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: ["c1a0c", "c1a1", "c1a1a", "c1a1f", "c1a1b", "c1a1c", "c1a1d"],
      designers: [
        "Brett Johnson",
        "John Guthrie",
        "Kelly Bailey",
        "Marc Laidlaw",
      ],
    },
    summary:
      "Tras el accidente, Gordon sale de la cámara de pruebas y recorre un Black Mesa destrozado en el que aparecen criaturas por todas partes. Un colega le pide que llegue a la superficie a buscar ayuda, así que cruza la instalación de refrigeración del Sector B.",
    notes: [
      "La estación de tranvía destruida, con un científico en un puente que se derrumba, es la única escena que construyó el propio guionista de la saga, Marc Laidlaw.",
      "El gran ascensor, la entrada al canal y el canal se inspiran en el manga Akira; Brett Johnson confirmó que los hizo como homenaje.",
    ],
    appearances: halfLife,
    sources: [overwiki("Unforeseen_Consequences", "Unforeseen Consequences")],
  },
  {
    id: "office-complex",
    slug: "office-complex",
    name: "Office Complex",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: ["c1a2", "c1a2a", "c1a2b", "c1a2c", "c1a2d"],
    },
    summary:
      "Gordon atraviesa las oficinas de administración, infestadas de criaturas, donde los científicos se han atrincherado y hablan de un rescate militar. Con los ascensores averiados, trepa por un hueco para seguir hacia la superficie.",
    notes: [
      "En la versión alfa el capítulo se llamaba «The Office Warrens» y se describía como un conjunto de oficinas de la Guerra Fría.",
      "Los grupos de vortigaunts se colocaron aquí para que el jugador practicara contra varios enemigos a la vez antes de enfrentarse a los marines.",
    ],
    appearances: halfLife,
    sources: [overwiki("Office_Complex", "Office Complex")],
  },
  {
    id: "weve-got-hostiles",
    slug: "weve-got-hostiles",
    name: "“We've Got Hostiles”",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: ["c1a3", "c1a3a", "c1a3b", "c1a3c", "c1a3d"],
    },
    summary:
      "Gordon cruza almacenes y zonas de carga mientras llegan los primeros soldados a la instalación. Al final se entera de que un equipo al otro lado de Black Mesa podría arreglar la situación.",
    notes: [
      "Su precursor en la alfa era «The Security Complex», un almacén construido alrededor de un silo en el que había que resolver un puzle con ventiladores para abrir la puerta.",
      "El G-Man iba a estar en la cabina del principio del capítulo, ajustándose la corbata e ignorando al científico; su animación sigue activándose aunque él no está en el mapa.",
    ],
    appearances: halfLife,
    sources: [overwiki("%22We%27ve_Got_Hostiles%22", "We've Got Hostiles")],
  },
  {
    id: "blast-pit",
    slug: "blast-pit",
    name: "Blast Pit",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: [
        "c1a4",
        "c1a4b",
        "c1a4d",
        "c1a4e",
        "c1a4f",
        "c1a4g",
        "c1a4i",
        "c1a4j",
        "c1a4k",
      ],
    },
    summary:
      "Gordon entra en un viejo complejo de misiles de la Guerra Fría, casi sellado y usado como vertedero tóxico, donde vive en un silo una criatura nueva y letal. Para librarse de ella tiene que restablecer el combustible, la energía y el oxígeno.",
    notes: [
      "El título original del capítulo era «Screams and Whispers», según el archivo titles.txt de Half-Life: Day One.",
      "La primera versión del silo se reaprovechó como el silo abandonado e inundado del capítulo Apprehension.",
      "Kelly Bailey firmó el arte conceptual del capítulo, según el libro Half-Life 2: Raising the Bar.",
    ],
    appearances: halfLife,
    sources: [overwiki("Blast_Pit", "Blast Pit")],
  },
  {
    id: "power-up",
    slug: "power-up",
    name: "Power Up",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: ["c2a1", "c2a1a", "c2a1b"],
      designers: ["Dario Casali"],
    },
    summary:
      "Un gargantúa que combate contra los soldados en el transporte de materiales del Sector E corta el paso a Gordon. Un guardia moribundo le explica que, si devuelve la corriente, podrá salir en el monorraíl, y Gordon baja a túneles plagados de houndeyes.",
    notes: [
      "El título original del capítulo era «Footfall», según el archivo titles.txt de Half-Life: Day One.",
      "Según su diseñador, Dario Casali, la idea de oír los gritos del gargantúa durante todo el capítulo mientras tiembla el escenario viene de la película Parque Jurásico.",
    ],
    appearances: halfLife,
    sources: [overwiki("Power_Up", "Power Up")],
  },
  {
    id: "on-a-rail",
    slug: "on-a-rail",
    name: "On A Rail",
    category: "maps",
    details: {
      chapter: 8,
      mapFiles: [
        "c2a2",
        "c2a2a",
        "c2a2b1",
        "c2a2b2",
        "c2a2c",
        "c2a2d",
        "c2a2e",
        "c2a2f",
        "c2a2g",
        "c2a2h",
      ],
    },
    summary:
      "A bordo de una vagoneta por la red de transporte de materiales, Gordon se entera de que debe lanzar un satélite desde un centro de lanzamiento para ayudar al equipo Lambda. Por el camino, los soldados ya le buscan activamente.",
    notes: [
      "En el mapa c2a2c, en una pared bajo las escaleras, está escrito «Riller» con bloques del mapa, un guiño a Dave Riller, empleado de Valve. No aparece en las versiones de consola.",
      "Los Flocking Floaters, unos enemigos recortados, iban a luchar contra los marines en los mapas c2a2b1 y c2a2c; en el juego final los sustituyeron vortigaunts.",
    ],
    appearances: halfLife,
    sources: [overwiki("On_A_Rail", "On A Rail")],
  },
  {
    id: "apprehension",
    slug: "apprehension",
    name: "Apprehension",
    category: "maps",
    details: {
      chapter: 9,
      mapFiles: ["c2a3", "c2a3a", "c2a3b", "c2a3c", "c2a3d", "c2a3e"],
    },
    summary:
      "Buscando otro camino a la superficie, Gordon se enfrenta a un depredador acuático, el ictiosaurio, y consigue una ballesta para combatirlo. Después se cruza con las asesinas de operaciones encubiertas, otra fuerza enviada a limpiar la instalación.",
    notes: [
      "El título original del capítulo era «Abandoned Silo», según el archivo titles.txt de Half-Life: Day One.",
      "El Archer, un enemigo alienígena recortado, iba a aparecer en los pasillos inundados del mapa c2a3; en el juego final lo sustituyeron las sanguijuelas.",
    ],
    appearances: halfLife,
    sources: [overwiki("Apprehension", "Apprehension")],
  },
  {
    id: "residue-processing",
    slug: "residue-processing",
    name: "Residue Processing",
    category: "maps",
    details: {
      chapter: 10,
      mapFiles: ["c2a4", "c2a4a", "c2a4b", "c2a4c"],
    },
    summary:
      "Gordon recorre una zona casi abandonada de la instalación dedicada a procesar y eliminar residuos y materiales peligrosos, entre compactadoras, cubas de desechos y hornos.",
    notes: [
      "El nombre original del capítulo era «Chutes and Ladders», en referencia al juego de mesa, según el archivo titles.txt de Half-Life: Day One.",
    ],
    appearances: halfLife,
    sources: [
      storyline("Chapter_10:_Residue_Processing", "Residue Processing"),
      communityMapList,
    ],
  },
  {
    id: "questionable-ethics",
    slug: "questionable-ethics",
    name: "Questionable Ethics",
    category: "maps",
    details: {
      chapter: 11,
      mapFiles: ["c2a4d", "c2a4e", "c2a4f", "c2a4g"],
      designers: ["Dario Casali"],
    },
    summary:
      "Gordon entra en el laboratorio de investigación biológica avanzada, lleno de especímenes y cámaras de contención. Allí se enfrenta por primera vez a los alien grunts y recupera un arma experimental, el cañón tau.",
    notes: [
      "Su precursor en la alfa era «Alien Research Lab», también de Dario Casali; no se reaprovechó su arquitectura, pero sí la idea de los alien grunts en cámaras de contención.",
      "Según Marc Laidlaw, los laboratorios debían reforzar la sensación de conspiración, dar al jugador un arma potente y plantear puzles basados en proteger y colaborar con los científicos, no solo en pulsar interruptores.",
    ],
    appearances: halfLife,
    sources: [overwiki("Questionable_Ethics", "Questionable Ethics")],
  },
  {
    id: "surface-tension",
    slug: "surface-tension",
    name: "Surface Tension",
    category: "maps",
    details: {
      chapter: 12,
      mapFiles: [
        "c2a5",
        "c2a5w",
        "c2a5x",
        "c2a5a",
        "c2a5b",
        "c2a5c",
        "c2a5d",
        "c2a5e",
        "c2a5f",
        "c2a5g",
      ],
    },
    summary:
      "Gordon vuelve a la superficie, convertida en una zona de guerra en la que las criaturas contraatacan con fuerza contra los soldados. Cruza la presa hidroeléctrica en manos militares, trepa un acantilado y atraviesa edificios bombardeados luchando contra los dos bandos.",
    notes: [
      "Su nombre original, «Cliff Hanger», se usó en el E3 de 1998.",
      "Como Half-Life, Blue Shift, Opposing Force y Decay, el título es un juego de palabras científico: la tensión superficial es la propiedad del agua que permite que algunos objetos floten sobre ella.",
    ],
    appearances: halfLife,
    sources: [
      storyline("Chapter_12:_Surface_Tension", "Surface Tension"),
      communityMapList,
    ],
  },
  {
    id: "forget-about-freeman",
    slug: "forget-about-freeman",
    name: "“Forget About Freeman!”",
    category: "maps",
    details: {
      chapter: 13,
      mapFiles: ["c3a1", "c3a1a", "c3a1b"],
      designers: ["Dario Casali"],
    },
    summary:
      "Tras sufrir muchas bajas, el ejército empieza a retirarse de la instalación cubriendo su huida con bombardeos y artillería. Gordon baja por un garaje y canales de agua, luchando contra criaturas y soldados rezagados, rumbo al complejo Lambda.",
    notes: [
      "El título original del capítulo era «“You're On Your Own”», según el archivo titles.txt de Half-Life: Day One; «On Your Own» también aparece dentro de los mapas.",
      "Su precursor en la alfa era «Communications Center»; su planteamiento y sus diálogos sin usar se reciclaron después para la demo Half-Life: Uplink.",
    ],
    appearances: halfLife,
    sources: [overwiki("%22Forget_About_Freeman!%22", "Forget About Freeman!")],
  },
  {
    id: "lambda-core",
    slug: "lambda-core",
    name: "Lambda Core",
    category: "maps",
    details: {
      chapter: 14,
      mapFiles: ["c3a2", "c3a2a", "c3a2b", "c3a2c", "c3a2d", "c3a2e", "c3a2f"],
    },
    summary:
      "Gordon llega al complejo Lambda y lo encuentra casi tomado por las criaturas. Para alcanzar el núcleo tiene que inundar las cámaras del reactor, donde le espera un equipo de científicos.",
    notes: [
      "El título original del capítulo era «Down And Out», según el archivo titles.txt de Half-Life: Day One.",
      "En el mapa c3a2a, los dos vortigaunts que hablan junto a un científico muerto se llaman internamente «abbott» y «costello», por el dúo cómico.",
    ],
    appearances: halfLife,
    sources: [overwiki("Lambda_Core", "Lambda Core")],
  },
  {
    // Sufijo para no chocar con una futura ficha sobre el mundo de Xen
    id: "xen-chapter",
    slug: "capitulo-xen",
    name: "Xen",
    category: "maps",
    details: { chapter: 15, mapFiles: ["c4a1"] },
    summary:
      "Gordon llega al mundo frontera de Xen, donde ve en su hábitat a muchas de las criaturas que conoció en Black Mesa y los restos de investigadores con traje HEV que llegaron antes que él.",
    appearances: halfLife,
    sources: [storyline("Chapter_15:_Xen", "Xen"), communityMapList],
  },
  {
    id: "gonarchs-lair",
    slug: "gonarchs-lair",
    name: "Gonarch's Lair",
    category: "maps",
    details: { chapter: 16, mapFiles: ["c4a2", "c4a2a", "c4a2b"] },
    summary:
      "Mientras cruza Xen, Gordon tiene que enfrentarse en su guarida a una enorme criatura, la gonarca, antes de seguir adelante.",
    notes: [
      "Quizá iba en origen después de Interloper: sus mapas empiezan en c4a2, mientras que los de Interloper empiezan en c4a1a.",
    ],
    appearances: halfLife,
    sources: [
      storyline("Chapter_16:_Gonarch's_Lair", "Gonarch's Lair"),
      communityMapList,
    ],
  },
  {
    id: "interloper",
    slug: "interloper",
    name: "Interloper",
    category: "maps",
    details: {
      chapter: 17,
      mapFiles: ["c4a1a", "c4a1b", "c4a1c", "c4a1d", "c4a1e", "c4a1f"],
    },
    summary:
      "Gordon sigue por Xen y entra en las minas donde se cría y transporta el ejército de alien grunts. Al final asciende por una enorme caverna hacia un portal en lo alto.",
    notes: [
      "El último mapa del capítulo está etiquetado por error como parte del capítulo Xen, y así aparece en los menús de guardar y cargar partida.",
    ],
    appearances: halfLife,
    sources: [
      storyline("Chapter_17:_Interloper", "Interloper"),
      communityMapList,
    ],
  },
  {
    // Sufijo para no chocar con la futura ficha del enemigo Nihilanth
    id: "nihilanth-chapter",
    slug: "capitulo-nihilanth",
    name: "Nihilanth",
    category: "maps",
    details: { chapter: 18, mapFiles: ["c4a3"] },
    summary:
      "Gordon es teletransportado a una inmensa cueva donde por fin se enfrenta al ser que mantiene abierto el portal. El combate depende de cortar la fuente de su poder.",
    appearances: halfLife,
    sources: [
      storyline("Chapter_18:_Nihilanth", "Nihilanth"),
      communityMapList,
    ],
  },
  {
    id: "endgame",
    slug: "endgame",
    name: "Endgame",
    category: "maps",
    // Combine OverWiki cuenta 19 capítulos: los 18 numerados más este epílogo
    details: { chapter: 19, mapFiles: ["c5a1"] },
    summary:
      "El epílogo de la aventura, después de la batalla final. Termina con una decisión que tiene que tomar el jugador.",
    notes: [
      "«Endgame» es el nombre que aparece en titles.txt y en los menús de guardar y cargar, pero dentro del archivo de mapa c5a1.bsp está escrito «End Game».",
    ],
    appearances: halfLife,
    sources: [storyline("Endgame", "Endgame"), communityMapList],
  },
];
