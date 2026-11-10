import type { Milestone } from "@/domain/milestone";
import type { Source } from "@/domain/source";
import type { SteamEvent } from "@/domain/steam-era";
import type { ValveHardware } from "@/domain/valve-hardware";
import type { ValvePerson } from "@/domain/valve-person";

const wiki = (title: string, path: string): Source => ({
  title: `${title} - Wikipedia (inglés)`,
  url: `https://en.wikipedia.org/wiki/${path}`,
  kind: "wiki",
});

const valveWiki = wiki("Valve Corporation", "Valve_Corporation");
const steamWiki = wiki("Steam", "Steam_(service)");
const steamDeckWiki = wiki("Steam Deck", "Steam_Deck");
const steamMachineWiki = wiki("Steam Machine", "Steam_Machine");
const steamFrameWiki = wiki("Steam Frame", "Steam_Frame");
const steamController2026Wiki = wiki(
  "Steam Controller (2026)",
  "Steam_Controller_(2026)",
);

// Hitos de Valve que faltaban en la línea temporal.
export const valveMoreMilestones: Milestone[] = [
  {
    id: "team-fortress-classic",
    year: 1999,
    date: "Abril de 1999",
    title: "Team Fortress Classic",
    description:
      "Valve había adquirido en 1998 a TF Software, autores del mod Team Fortress de Quake, y lanza su versión para GoldSrc como Team Fortress Classic.",
    sources: [
      valveWiki,
      wiki("Team Fortress Classic", "Team_Fortress_Classic"),
    ],
  },
  {
    id: "counter-strike-beta",
    year: 1999,
    date: "18 de junio de 1999",
    title: "Primera beta de Counter-Strike",
    description:
      "Minh Le y Jess Cliffe publican la primera beta de Counter-Strike, un mod de Half-Life con rescate de rehenes, 9 armas y 4 mapas.",
    sources: [wiki("Counter-Strike", "Counter-Strike_(video_game)")],
  },
  {
    id: "counter-strike-valve",
    year: 2000,
    date: "12 de abril de 2000",
    title: "Valve se asocia con Counter-Strike",
    description:
      "Valve anuncia su colaboración con el equipo de Counter-Strike, cuyos derechos adquiere. La versión comercial se da por terminada el 9 de noviembre de 2000.",
    sources: [wiki("Counter-Strike", "Counter-Strike_(video_game)"), valveWiki],
  },
  {
    id: "sierra-agreement",
    year: 2001,
    title: "Valve recupera Half-Life",
    description:
      "Valve renegocia su acuerdo con Sierra y obtiene la propiedad intelectual de Half-Life y los derechos de distribución en línea de sus juegos.",
    sources: [valveWiki],
  },
  {
    id: "day-of-defeat-retail",
    year: 2003,
    date: "Mayo de 2003",
    title: "Day of Defeat llega a las tiendas",
    description:
      "Valve compra los derechos del mod Day of Defeat, contrata a su equipo y publica una versión comercial a través de Activision.",
    sources: [wiki("Day of Defeat", "Day_of_Defeat")],
  },
  {
    id: "half-life-2-leak",
    year: 2003,
    date: "Octubre de 2003",
    title: "Filtración del código de Half-Life 2",
    description:
      "Tras el retraso de Half-Life 2, su código fuente, obtenido el 19 de septiembre, se difunde a principios de octubre. La filtración daña la moral del estudio y ralentiza el desarrollo.",
    sources: [wiki("Half-Life 2", "Half-Life_2")],
  },
  {
    id: "orange-box-release",
    year: 2007,
    date: "10 de octubre de 2007",
    title: "Team Fortress 2 y The Orange Box",
    description:
      "Team Fortress 2 sale el 10 de octubre de 2007, como producto independiente en Steam y dentro de The Orange Box, que también incluye Half-Life 2, Episode One, Episode Two y Portal.",
    sources: [
      wiki("Team Fortress 2", "Team_Fortress_2"),
      wiki("The Orange Box", "The_Orange_Box"),
    ],
  },
  {
    id: "left-4-dead-release",
    year: 2008,
    date: "Noviembre de 2008",
    title: "Left 4 Dead",
    description:
      "Valve publica Left 4 Dead, desarrollado por Valve South. En enero de 2008 había adquirido Turtle Rock Studios, que se independizó de nuevo en marzo de 2010.",
    sources: [wiki("Left 4 Dead", "Left_4_Dead"), valveWiki],
  },
  {
    id: "portal-2-release",
    year: 2011,
    date: "Abril de 2011",
    title: "Portal 2",
    description:
      "Llega Portal 2. Como en el primer Portal, Valve contó con un equipo de estudiantes de DigiPen, que implementó la mecánica de los geles.",
    sources: [valveWiki, wiki("Portal 2", "Portal_2")],
  },
  {
    id: "the-international-2011",
    year: 2011,
    title: "The International",
    description:
      "Valve inicia The International, un torneo anual de esports de Dota 2 cuyo premio se financia con Valve y con los pases de batalla que compran los jugadores.",
    sources: [valveWiki],
  },
  {
    id: "csgo-release",
    year: 2012,
    date: "21 de agosto de 2012",
    title: "Counter-Strike: Global Offensive",
    description:
      "Se publica Counter-Strike: Global Offensive, desarrollado con Hidden Path Entertainment. Fue la cuarta entrega de la serie y la base del posterior Counter-Strike 2.",
    sources: [
      wiki(
        "Counter-Strike: Global Offensive",
        "Counter-Strike:_Global_Offensive",
      ),
    ],
  },
  {
    id: "dota-2-launch-date",
    year: 2013,
    date: "9 de julio de 2013",
    title: "Dota 2 sale de la beta",
    description:
      "Tras casi dos años de beta, Dota 2 se publica en Steam para Windows el 9 de julio de 2013 y para OS X y Linux el 18 de julio.",
    sources: [wiki("Dota 2", "Dota_2")],
  },
  {
    id: "source-2-announced",
    year: 2015,
    date: "Marzo de 2015",
    title: "Anuncio de Source 2",
    description:
      "Valve anuncia el motor Source 2. En septiembre de ese año traslada Dota 2 a él.",
    sources: [valveWiki],
  },
  {
    id: "htc-vive",
    year: 2016,
    title: "HTC Vive",
    description:
      "Valve colabora con HTC en el casco de realidad virtual HTC Vive, publicado en 2016, y lanza The Lab, una colección de minijuegos de realidad virtual.",
    sources: [valveWiki],
  },
  {
    id: "artifact",
    year: 2018,
    date: "Noviembre de 2018",
    title: "Artifact",
    description:
      "Valve publica Artifact, un juego de cartas coleccionables de Dota 2 diseñado con Richard Garfield. No logró retener a su público y, en abril de 2021, Valve abandonó el intento de relanzarlo.",
    sources: [valveWiki],
  },
  {
    id: "steam-deck-announced",
    year: 2021,
    date: "15 de julio de 2021",
    title: "Presentación de Steam Deck",
    description:
      "Valve presenta Steam Deck en tres modelos según su almacenamiento. Empieza a enviarse en febrero de 2022 en Norteamérica y Europa.",
    sources: [steamDeckWiki],
  },
  {
    id: "steam-deck-oled-announced",
    year: 2023,
    date: "9 de noviembre de 2023",
    title: "Steam Deck OLED",
    description:
      "Valve anuncia dos modelos de Steam Deck con pantalla OLED, más batería y mejor refrigeración. Los modelos LCD de 64 GB y 512 GB se descatalogan.",
    sources: [steamDeckWiki],
  },
  {
    id: "deadlock-beta",
    year: 2024,
    title: "Deadlock",
    description:
      "Valve empieza a probar en beta Deadlock, un juego multijugador que combina un shooter de héroes con elementos de MOBA.",
    sources: [valveWiki],
  },
  {
    id: "hardware-2025-announcement",
    year: 2025,
    date: "12 de noviembre de 2025",
    title: "Steam Machine, Steam Frame y nuevo Steam Controller",
    description:
      "Valve anuncia una segunda Steam Machine, el casco autónomo Steam Frame y un Steam Controller rediseñado. Los tres estaban previstos para principios de 2026, pero la escasez de memoria RAM retrasó los lanzamientos.",
    sources: [
      steamMachineWiki,
      steamFrameWiki,
      steamController2026Wiki,
      valveWiki,
    ],
  },
  {
    id: "steam-controller-2026-release",
    year: 2026,
    date: "4 de mayo de 2026",
    title: "Nuevo Steam Controller",
    description:
      "Sale a la venta el Steam Controller de segunda generación, con un precio base de 99 dólares anunciado el 27 de abril. Se agotó en unos 30 minutos.",
    sources: [steamController2026Wiki],
  },
  {
    id: "steam-machine-2026-release",
    year: 2026,
    date: "29 de junio de 2026",
    title: "Steam Machine",
    description:
      "Tras abrir el registro de reservas el 22 de junio, Valve empieza a vender la Steam Machine con un sorteo aleatorio entre los registrados, por la producción limitada.",
    sources: [steamMachineWiki, valveWiki],
  },
  {
    id: "steam-frame-2026-release",
    year: 2026,
    date: "18 de septiembre de 2026",
    title: "Steam Frame",
    description:
      "Las reservas del Steam Frame se abren el 14 de septiembre con el mismo sorteo, para un lanzamiento el 18 de septiembre. Cada modelo incluye una licencia digital de Half-Life: Alyx.",
    sources: [steamFrameWiki],
  },
];

// Figuras clave de Valve con su aportación documentada. Sin foto.
export const valveMorePeople: ValvePerson[] = [
  {
    id: "kelly-bailey",
    slug: "kelly-bailey",
    name: "Kelly Bailey",
    role: "Compositor y diseñador de sonido",
    summary:
      "Creó toda la música y los efectos de sonido de Half-Life y escribió el código de sonido para la voz de los personajes y la reverberación. Compuso también la banda sonora de Half-Life 2. Dejó Valve en 2011 para fundar Sunspark Labs.",
    sources: [wiki("Kelly Bailey", "Kelly_Bailey_(composer)")],
  },
  {
    id: "ken-birdwell",
    slug: "ken-birdwell",
    name: "Ken Birdwell",
    role: "Diseñador de Half-Life",
    summary:
      "Formó parte del grupo de diseño (la «cábala») de Half-Life. Describió el nivel prototipo que sirvió de base al juego como «Die Hard se encuentra con Evil Dead».",
    sources: [wiki("Half-Life", "Half-Life_(video_game)")],
  },
  {
    id: "minh-le",
    slug: "minh-le",
    name: "Minh Le",
    role: "Cocreador de Counter-Strike",
    summary:
      "Programador conocido como «Gooseman». Creó Counter-Strike como mod de Half-Life junto a Jess Cliffe y publicó la primera beta en junio de 1999. En 2000 Valve adquirió los derechos del mod y lo contrató.",
    sources: [
      wiki("Minh Le", "Minh_Le"),
      wiki("Counter-Strike", "Counter-Strike_(video_game)"),
    ],
  },
  {
    id: "erik-wolpaw",
    slug: "erik-wolpaw",
    name: "Erik Wolpaw",
    role: "Guionista",
    summary:
      "Entró en Valve en 2004 y escribió, con Chet Faliszek, juegos como Episode One, Episode Two, Team Fortress 2, Left 4 Dead, Portal y Portal 2. Dejó el estudio en 2017 y volvió en 2019 como colaborador a tiempo parcial en Artifact y Half-Life: Alyx.",
    sources: [wiki("Erik Wolpaw", "Erik_Wolpaw")],
  },
  {
    id: "icefrog",
    slug: "icefrog",
    name: "IceFrog",
    role: "Diseñador principal de Dota 2",
    summary:
      "Seudónimo del diseñador que mantenía Defense of the Ancients, el mod de Warcraft III. Valve lo contrató en 2009 para desarrollar Dota 2, publicado en 2013.",
    sources: [valveWiki, wiki("Dota 2", "Dota_2")],
  },
  {
    id: "mike-morasky",
    slug: "mike-morasky",
    name: "Mike Morasky",
    role: "Compositor",
    summary:
      "Compositor de Valve. Firma la música de Portal 2, que combina piezas compuestas y música generada de forma procedimental.",
    sources: [wiki("Portal 2", "Portal_2")],
  },
  {
    id: "jeep-barnett",
    slug: "jeep-barnett",
    name: "Jeep Barnett",
    role: "Programador y director de Portal 2",
    summary: "Programador de Portal y director de Portal 2.",
    sources: [
      wiki("Portal 2", "Portal_2"),
      wiki("Portal", "Portal_(video_game)"),
    ],
  },
  {
    id: "greg-coomer",
    slug: "greg-coomer",
    name: "Greg Coomer",
    role: "Diseñador de hardware y producto",
    summary:
      "Trabajó en el diseño de Steam Deck. Explicó que Valve fabricaría por sí sola el Steam Controller para lograr la mejor implementación del mando. Su rostro sirvió de modelo, junto a otros tres empleados, para Gordon Freeman en el material promocional de Half-Life 2.",
    sources: [
      wiki("Aperture Desk Job", "Aperture_Desk_Job"),
      wiki("Steam Controller", "Steam_Controller_(1st_generation)"),
      wiki("Kelly Bailey", "Kelly_Bailey_(composer)"),
    ],
  },
  {
    id: "doug-lombardi",
    slug: "doug-lombardi",
    name: "Doug Lombardi",
    role: "Responsable de marketing",
    summary:
      "Directivo de marketing de Valve. Ha explicado su organización plana: nadie escribe un documento de diseño para que otro lo construya, sino que los equipos proponen las ideas y marcan el rumbo del producto.",
    sources: [valveWiki],
  },
  {
    id: "michael-abrash",
    slug: "michael-abrash",
    name: "Michael Abrash",
    role: "Programador gráfico",
    summary:
      "Programador conocido por su trabajo en el renderizado de Quake en id Software. Se incorporó a Valve en 2011 y mantuvo allí el blog «Ramblings in Valve Time» hasta enero de 2014. Desde 2014 es científico jefe de Reality Labs, en Meta.",
    sources: [wiki("Michael Abrash", "Michael_Abrash")],
  },
];

// Hardware que faltaba. Las especificaciones salen de las páginas oficiales de Valve;
// los años y las fechas de lanzamiento, de la wiki.
export const valveMoreHardware: ValveHardware[] = [
  {
    id: "valve-index-controllers",
    slug: "valve-index-controllers",
    name: "Valve Index Controllers",
    year: 2019,
    category: "vr",
    tagline: "Los mandos de realidad virtual que siguen cada dedo de la mano.",
    summary:
      "Los controladores Knuckles acompañan al casco Valve Index desde su lanzamiento, el 28 de junio de 2019. Se sujetan con una correa a la palma de la mano y se venden aparte del casco y de las estaciones base.",
    specs: [
      { label: "Seguimiento", value: "Seguimiento de dedos" },
      { label: "Agarre", value: "Sensor de fuerza de agarre" },
      { label: "Batería", value: "Más de 7 horas" },
    ],
    sources: [
      {
        title: "Valve Index Controllers - Sitio oficial de Valve",
        url: "https://www.valvesoftware.com/en/index/controllers",
        kind: "official",
      },
      wiki("Valve Index", "Valve_Index"),
    ],
  },
  {
    id: "steam-deck-dock",
    slug: "steam-deck-dock",
    name: "Steam Deck Docking Station",
    year: 2022,
    category: "handheld",
    tagline:
      "La base para conectar Steam Deck a una pantalla o a un escritorio.",
    summary:
      "La base de Steam Deck salió el 6 de octubre de 2022. Permite usar la consola en el televisor con mandos inalámbricos o en el escritorio, con teclado y ratón y hasta dos pantallas externas a la vez. Es compatible con los modelos LCD y OLED.",
    specs: [
      { label: "Pantallas", value: "Hasta dos pantallas externas a la vez" },
      { label: "Compatibilidad", value: "Steam Deck LCD y OLED" },
    ],
    sources: [
      {
        title: "Steam Deck Docking Station - Sitio oficial",
        url: "https://www.steamdeck.com/en/dock",
        kind: "official",
      },
      steamDeckWiki,
    ],
  },
  {
    id: "steam-controller-2026",
    slug: "steam-controller-2026",
    name: "Steam Controller (2026)",
    year: 2026,
    category: "controller",
    tagline:
      "El segundo Steam Controller, con la distribución de controles de Steam Deck.",
    summary:
      "Anunciado el 12 de noviembre de 2025 y lanzado el 4 de mayo de 2026 por 99 dólares, sucede al mando de 2015. Conserva los trackpads hápticos y suma sticks magnéticos. Se conecta mediante el Puck, un adaptador inalámbrico propio, o con el Steam Frame.",
    specs: [
      {
        label: "Sticks",
        value: "Magnéticos con tecnología TMR y sensibilidad táctil capacitiva",
      },
      {
        label: "Conexión",
        value:
          "Inalámbrica de 2,4 GHz con unos 8 ms de latencia total y 4 ms de sondeo; hasta 4 mandos por Puck",
      },
      {
        label: "Batería",
        value: "Li-ion de 8,39 Wh, más de 35 horas de juego",
      },
    ],
    sources: [
      {
        title: "Steam Controller - Sitio oficial de Valve",
        url: "https://store.steampowered.com/hardware/steamcontroller",
        kind: "official",
      },
      steamController2026Wiki,
    ],
  },
  {
    id: "steam-machine-2026",
    slug: "steam-machine-2026",
    name: "Steam Machine (2026)",
    year: 2026,
    category: "pc",
    tagline: "El PC de salón de Valve, esta vez con hardware propio.",
    summary:
      "Anunciada el 12 de noviembre de 2025, sale a la venta el 29 de junio de 2026 tras una reserva con sorteo. A diferencia de las Steam Machines de 2015, Valve la fabrica con sus propias especificaciones y se apoya en Proton. Sus precios, por encima de los 1.000 dólares, se dispararon por la escasez de componentes.",
    specs: [
      {
        label: "Procesador",
        value:
          "AMD Zen 4 semipersonalizado de 6 núcleos y 12 hilos, hasta 4,8 GHz y 30 W",
      },
      {
        label: "Gráficos",
        value: "AMD RDNA 3 semipersonalizada de 28 CU, hasta 2,45 GHz y 110 W",
      },
      { label: "Memoria", value: "16 GB DDR5 y 8 GB GDDR6 de VRAM" },
      {
        label: "Almacenamiento",
        value: "SSD NVMe de 512 GB o 2 TB y ranura microSD",
      },
      {
        label: "Conectividad",
        value:
          "Wi-Fi 6E 2x2, Bluetooth 5.3, Ethernet gigabit, DisplayPort 1.4, HDMI 2.0, un USB-C y cuatro USB-A",
      },
    ],
    sources: [
      {
        title: "Steam Machine - Sitio oficial de Valve",
        url: "https://store.steampowered.com/hardware/steammachine",
        kind: "official",
      },
      steamMachineWiki,
    ],
  },
  {
    id: "steam-frame",
    slug: "steam-frame",
    name: "Steam Frame",
    year: 2026,
    category: "vr",
    tagline:
      "El casco de realidad virtual autónomo de Valve, con SteamOS en su interior.",
    summary:
      "Anunciado el 12 de noviembre de 2025 como sucesor del Valve Index, es un casco autónomo que ejecuta SteamOS y juegos de realidad virtual y convencionales sin un PC, o los recibe por transmisión. Las reservas abrieron el 14 de septiembre de 2026 y el lanzamiento se fijó para el 18 de septiembre.",
    specs: [
      {
        label: "Procesador",
        value: "Procesador Snapdragon serie 8 con 16 GB de RAM",
      },
      {
        label: "Almacenamiento",
        value: "UFS de 256 GB o 1 TB y ranura microSD",
      },
      {
        label: "Pantalla",
        value:
          "Un panel LCD de 2160 x 2160 por ojo, con lentes pancake y de 72 a 144 Hz",
      },
      {
        label: "Seguimiento ocular",
        value: "Sí, para el renderizado foveado",
      },
    ],
    sources: [
      {
        title: "Steam Frame - Sitio oficial de Valve",
        url: "https://store.steampowered.com/hardware/steamframe",
        kind: "official",
      },
      steamFrameWiki,
    ],
  },
];

// Eventos para sumar a cada época de Steam (el integrador los une a su `events`).
export const steamMoreEvents: { eraId: string; events: SteamEvent[] }[] = [
  {
    eraId: "origins",
    events: [
      {
        id: "steam-ea-distribution",
        year: 2005,
        date: "Julio de 2005",
        title: "Acuerdo de distribución con Electronic Arts",
        description:
          "Electronic Arts anuncia un acuerdo plurianual para distribuir los juegos de Valve, tras la promesa de Vivendi Universal de dejar de hacerlo el 31 de agosto.",
        sources: [valveWiki],
      },
    ],
  },
  {
    eraId: "platform",
    events: [
      {
        id: "steam-free-to-play",
        year: 2011,
        date: "Junio de 2011",
        title: "Juegos gratuitos y microtransacciones",
        description:
          "Steam admite juegos gratuitos y microtransacciones dentro del juego mediante Steamworks. En septiembre se añade el intercambio de objetos entre usuarios.",
        sources: [steamWiki],
      },
      {
        id: "steam-workshop",
        year: 2012,
        title: "Steam Workshop",
        description:
          "El Workshop nace para distribuir objetos nuevos de Team Fortress 2 y se rediseña a principios de 2012 para cualquier juego, con modificaciones como las de Skyrim.",
        sources: [steamWiki],
      },
      {
        id: "steam-mobile",
        year: 2012,
        date: "Finales de enero de 2012",
        title: "Steam para iOS y Android",
        description:
          "Valve publica el cliente oficial de Steam para móviles, con tienda, biblioteca y chat, y un sistema de autenticación en dos pasos con Steam Guard.",
        sources: [steamWiki],
      },
      {
        id: "steam-early-access",
        year: 2013,
        date: "Marzo de 2013",
        title: "Acceso anticipado",
        description:
          "Los desarrolladores pueden vender juegos funcionales, pero sin terminar, en una sección propia de la tienda para financiarse y recibir comentarios.",
        sources: [steamWiki],
      },
      {
        id: "steam-family-sharing",
        year: 2013,
        date: "Septiembre de 2013",
        title: "Compartir en familia",
        description:
          "Los usuarios pueden compartir la mayoría de sus juegos con familiares y amigos autorizando sus equipos.",
        sources: [steamWiki],
      },
      {
        id: "steam-in-home-streaming",
        year: 2014,
        date: "Mayo de 2014",
        title: "Transmisión en casa",
        description:
          "Steam permite jugar en un equipo un juego instalado en otro de la misma red doméstica con poca latencia. En 2019 recibe el nombre de Remote Play.",
        sources: [steamWiki],
      },
      {
        id: "steam-link-app",
        year: 2018,
        date: "14 de mayo de 2018",
        title: "Aplicación Steam Link",
        description:
          "Sale en beta para Android la aplicación Steam Link, que transmite juegos a móviles. Apple rechazó la versión para iOS por conflictos con sus normas.",
        sources: [steamWiki],
      },
      {
        id: "steam-proton",
        year: 2018,
        date: "Agosto de 2018",
        title: "Proton (Steam Play)",
        description:
          "Valve publica la beta de Proton, una capa de compatibilidad de código abierto que ejecuta juegos de Windows en Linux desde Steam.",
        sources: [steamWiki],
      },
      {
        id: "steam-remote-play",
        year: 2019,
        date: "Junio de 2019",
        title: "Remote Play",
        description:
          "La transmisión en casa se renombra Remote Play y permite jugar fuera de la red doméstica. En noviembre se añade Remote Play Together para partidas locales en línea.",
        sources: [steamWiki],
      },
      {
        id: "steam-game-festival",
        year: 2019,
        title: "Steam Game Festival",
        description:
          "Valve organiza con Geoff Keighley un festival de demos de una semana. Se repite dos o tres veces al año y es el origen de Steam Next Fest.",
        sources: [steamWiki],
      },
      {
        id: "steam-points",
        year: 2020,
        date: "Junio de 2020",
        title: "Puntos de Steam",
        description:
          "Llegan los puntos de Steam y su tienda, donde se canjean por cosméticos del perfil y del chat.",
        sources: [steamWiki],
      },
    ],
  },
  {
    eraId: "unified",
    events: [
      {
        id: "steam-dynamic-cloud-sync",
        year: 2022,
        date: "Enero de 2022",
        title: "Sincronización dinámica en la nube",
        description:
          "Steam Cloud amplía su función: los juegos preparados guardan su estado en la nube mientras se juega.",
        sources: [steamWiki],
      },
      {
        id: "steam-charts",
        year: 2022,
        date: "Septiembre de 2022",
        title: "Steam Charts",
        description:
          "Steam publica listas de los juegos más vendidos y más jugados, con histórico semanal y mensual, que sustituyen a la página de estadísticas anterior.",
        sources: [steamWiki],
      },
      {
        id: "steam-os-compatible",
        year: 2025,
        title: "SteamOS Compatible",
        description:
          "Valve publica en diciembre de 2024 sus normas de marca para SteamOS y, desde 2025, lo extiende a dispositivos de terceros «SteamOS Compatible», como portátiles de Asus y Lenovo.",
        sources: [wiki("SteamOS", "SteamOS")],
      },
      {
        id: "steam-hardware-2025",
        year: 2025,
        date: "12 de noviembre de 2025",
        title: "Nueva familia de hardware",
        description:
          "Valve anuncia el Steam Controller, la Steam Machine y el Steam Frame, que salen a la venta en 2026.",
        sources: [steamWiki, valveWiki],
      },
      {
        id: "steam-verified-expansion",
        year: 2026,
        date: "Junio de 2026",
        title: "Steam Deck Verified se amplía",
        description:
          "Con el lanzamiento de la Steam Machine, Valve extiende el programa de verificación de Steam Deck para cubrir también la Steam Machine y el Steam Frame.",
        sources: [steamWiki],
      },
    ],
  },
];
