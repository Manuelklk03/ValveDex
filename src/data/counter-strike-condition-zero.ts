import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function wikipedia(page: string, title: string): Source {
  return {
    title: `${title} - Wikipedia`,
    url: `https://en.wikipedia.org/wiki/${page}`,
    kind: "wiki",
  };
}

// Counter-Strike Wiki de la comunidad (Fandom). Su HTML devuelve 403 a las descargas
// automáticas (curl); los datos se leyeron con su API MediaWiki, que sí responde.
function csWiki(page: string, title: string): Source {
  return {
    title: `${title} - Counter-Strike Wiki`,
    url: `https://counterstrike.fandom.com/wiki/${page}`,
    kind: "wiki",
  };
}

const steamCz: Source = {
  title: "Counter-Strike: Condition Zero - Steam",
  url: "https://store.steampowered.com/app/80",
  kind: "official",
};

const wikipediaCz = wikipedia(
  "Counter-Strike:_Condition_Zero",
  "Counter-Strike: Condition Zero",
);

const czWiki = csWiki(
  "Counter-Strike:_Condition_Zero",
  "Counter-Strike: Condition Zero",
);

const dsWiki = csWiki(
  "Counter-Strike:_Condition_Zero_Deleted_Scenes",
  "Counter-Strike: Condition Zero Deleted Scenes",
);

const cz = [{ gameId: "counter-strike-condition-zero" }];
const ds = [{ gameId: "counter-strike-condition-zero-deleted-scenes" }];
const both = [...cz, ...ds];

// Mapas multijugador exclusivos de Condition Zero. `chapter` es un orden propio.
const multiplayerMaps: Entry[] = [
  {
    id: "cz-map-sienna",
    slug: "mapa-sienna",
    name: "Sienna",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: ["de_sienna_cz"],
      designers: ["David Johnston"],
    },
    summary:
      "Mapa de desactivación de bomba exclusivo de Condition Zero, publicado el 2 de junio de 2004 junto a Vostok. Su descripción oficial cuenta que la ciudad de Sienna está en alerta máxima por nuevos datos de inteligencia y que sus accesos están bloqueados: los Terroristas deben abrir las dos puertas de entrada con explosivos y los Antiterroristas, impedirlo.",
    notes: [
      "Según la wiki de la comunidad, es el único mapa nuevo que salió del periodo en que Turtle Rock Studios llevaba el desarrollo; lo hicieron David Johnston, Valve y Turtle Rock en colaboración.",
      "Johnston publicó en su web un texto sobre cómo hizo el mapa.",
    ],
    appearances: cz,
    sources: [csWiki("Sienna", "Sienna"), czWiki],
  },
  {
    id: "cz-map-vostok",
    slug: "mapa-vostok",
    name: "Vostok",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["de_vostok_cz"],
      designers: ["Marc Schröder"],
    },
    summary:
      "Mapa de desactivación de bomba publicado el 2 de junio de 2004 con Condition Zero y presente también en la versión de Xbox de Counter-Strike. Está en Ventspils, Letonia, igual que la misión de Deleted Scenes en la que se basa, Building Recon. Tiene pasillos cerrados, caminos confusos y un tamaño grande con zonas elevadas.",
    notes: [
      "«Vostok» significa «este» en ruso.",
      "Según la wiki de la comunidad, es uno de los mapas menos populares por su trazado.",
      "Hubo una versión rehecha de Vostok para Global Offensive, conocida como Balkan, que no llegó a publicarse.",
    ],
    appearances: cz,
    sources: [csWiki("Vostok", "Vostok"), czWiki],
  },
  {
    id: "cz-map-corruption",
    slug: "mapa-corruption",
    name: "Corruption",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: ["de_corruption_cz"],
      designers: ["Chris Voss"],
    },
    summary:
      "Mapa de desactivación de bomba ambientado en Europa, publicado el 14 de julio de 2004 junto a Truth in Chaos. Su descripción oficial presenta a unos Terroristas que quieren desestabilizar a la población local para facilitar un golpe político: los Antiterroristas deben eliminarlos y proteger los puntos clave.",
    notes: [
      "Procede de la versión de Xbox de Counter-Strike.",
      "En archivos del prototipo de Xbox hay una textura «cs_corruption_detail» junto a «de_corruption_detail», lo que sugiere que en algún momento el mapa se planteó como mapa de rehenes.",
    ],
    appearances: cz,
    sources: [csWiki("Corruption", "Corruption"), czWiki],
  },
  {
    id: "cz-map-truth",
    slug: "mapa-truth",
    name: "Truth in Chaos (multijugador)",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: ["de_truth"],
      designers: ["Dan Haigh"],
    },
    summary:
      "Mapa de desactivación de bomba en el santuario de Toruko, en Japón: casi todo en interiores, con patios al aire libre y dos puntos de bomba, uno en el torii del santuario y otro dentro. Dan Haigh lo diseñó cuando Gearbox llevaba el juego. Se publicó el 14 de julio de 2004, junto a Corruption.",
    notes: [
      "Al tomar Ritual el desarrollo retomó el mapa, lo renombró «cs_truth» y lo usó como base de la misión de Deleted Scenes Truth in Chaos; más tarde su modo pasó a ser desactivación de bomba.",
      "Su primera salida oficial fue en la versión de Xbox de Counter-Strike, el 18 de noviembre de 2003, con una variante más ligera.",
      "Iba a ser el mapa 18 de la campaña Tour of Duty, pero se retrasó y quedó fuera de ella.",
    ],
    appearances: cz,
    sources: [csWiki("Truth", "Truth in Chaos"), czWiki],
  },
  {
    id: "cz-map-downed",
    slug: "mapa-downed-pilot",
    name: "Downed Pilot (multijugador)",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: ["cs_downed_cz"],
      designers: ["Nick Coombe", "Thearrel McKinney Jr."],
    },
    summary:
      "Mapa de rescate de rehenes ambientado en Puerto Iguazú, Argentina: un avión ha sido derribado en una región montañosa de selva y los pilotos son rehenes de los Terroristas, cuya base está dentro de una mina. Hay cuatro rehenes. Es un mapa exclusivo de Condition Zero.",
    notes: [
      "Nick Coombe lo diseñó en 2001. Al pasar a Gearbox cambió de nombre y de modo (de_enemymine, desactivación de bomba); con Ritual, a cargo de Thearrel McKinney Jr., volvió al rescate de rehenes y se renombró cs_downed.",
      "Ritual retiró de uno de los edificios un biplaza intacto que servía de avión del narcotráfico en la historia original.",
      "Sirvió de base de la misión Downed Pilot de Deleted Scenes.",
    ],
    appearances: cz,
    sources: [csWiki("Downed", "Downed Pilot"), czWiki],
  },
  {
    id: "cz-map-fastline",
    slug: "mapa-fastline",
    name: "Fastline (multijugador)",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: ["de_fastline_cz"],
      designers: ["Luke Whiteside"],
    },
    summary:
      "Mapa de desactivación de bomba basado en la misión Fastline de Deleted Scenes. Antes de una cumbre asiática por la paz, los Terroristas atacan la estación de metro de Shinkane, en Tokio: deben destruir uno de dos puntos y los Antiterroristas, protegerla.",
    notes: [
      "Luke Whiteside escondió su firma en tres lugares del mapa.",
      "Era uno de los tres mapas de Condition Zero que se planeó portar a Counter-Strike: Source, junto con Tides y Stadium; solo se publicó Tides.",
      "Una filtración de 2023 de archivos de desarrollo de Source incluyó un port de Fastline.",
    ],
    appearances: cz,
    sources: [csWiki("Fastline", "Fastline"), czWiki],
  },
  {
    id: "cz-map-stadium",
    slug: "mapa-stadium",
    name: "Stadium",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: ["de_stadium_cz"],
      designers: ["Christopher Auty"],
    },
    summary:
      "Mapa de desactivación de bomba dentro del estadio Hackney Wick de Londres, presente en la versión de Xbox de Counter-Strike y en Condition Zero. Los Terroristas deben destruir el estadio; los Antiterroristas, impedirlo. Sus puntos de bomba no se llaman A y B, sino Cocina y Vestíbulo.",
    notes: [
      "Es uno de los pocos mapas en los que los bots piden refuerzos al plantarse la bomba, porque no usa los nombres A y B.",
      "Es uno de los tres mapas que se planeó portar a Counter-Strike: Source con Tides y Fastline.",
    ],
    appearances: cz,
    sources: [csWiki("Stadium", "Stadium"), czWiki],
  },
  {
    id: "cz-map-tides",
    slug: "mapa-tides",
    name: "Tides",
    category: "maps",
    details: {
      chapter: 8,
      mapFiles: ["de_tides"],
      designers: ["David Johnston"],
    },
    summary:
      "Mapa de desactivación de bomba con dos puntos de bomba, original de Condition Zero. Es el único mapa nuevo de Condition Zero que llegó después a Counter-Strike: Source.",
    notes: [
      "En Condition Zero sus texturas proceden de la misión Building Recon de Deleted Scenes.",
      "Su logro «Tides Map Veteran» (ganar 100 rondas en el mapa) lo consiguió solo el 1 % de los jugadores, según la wiki de la comunidad.",
      "Los carteles apuntan a Italia, aunque algunos letreros están en alemán, de modo que su ubicación real no está clara.",
    ],
    appearances: cz,
    sources: [csWiki("Tides", "Tides"), czWiki],
  },
];

// Misiones de Deleted Scenes. `chapter` es el número de misión; 0 es el entrenamiento.
const deletedScenesMissions: Entry[] = [
  {
    id: "cz-ds-training",
    slug: "mapa-counter-terrorist-training",
    name: "Counter Terrorist Training",
    category: "maps",
    details: {
      chapter: 0,
      mapFiles: ["cz_train01", "cz_train02", "cz_train03"],
      designers: ["Reid Kimball", "Tom Mustaine"],
    },
    summary:
      "Misión de entrenamiento de Deleted Scenes, parecida al Hazard Course de Half-Life o al Boot Camp de Opposing Force. Enseña el equipo propio del juego (cámara de fibra óptica, bomba de control remoto, cámara y soplete), peligros como el fuego o el gas tóxico y los controles básicos de movimiento. Es opcional y no hace falta completarla para desbloquear las misiones.",
    appearances: ds,
    sources: [
      csWiki("Counter_Terrorist_Training", "Counter Terrorist Training"),
      dsWiki,
    ],
  },
  {
    id: "cz-ds-recoil",
    slug: "mapa-mision-recoil",
    name: "Recoil",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: ["cz_recoil-intro", "cz_recoil", "cz_recoil2"],
      designers: ["Luke Whiteside"],
    },
    summary:
      "Primera misión de Deleted Scenes, con el SEAL Team 6. Tras sobrevivir a un accidente de helicóptero, el jugador atraviesa los alrededores hasta el punto de extracción, se enfrenta a la Elite Crew y rescata a un francotirador de la Delta Force capturado. Si el francotirador muere, la misión fracasa.",
    appearances: ds,
    sources: [csWiki("Recoil_(mission)", "Recoil"), dsWiki],
  },
  {
    id: "cz-ds-lost-cause",
    slug: "mapa-mision-lost-cause",
    name: "Lost Cause",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["cz_lostcause", "cz_lostcause2"],
      designers: ["Luke Whiteside"],
    },
    summary:
      "Segunda misión, con la unidad alemana GSG-9. El jugador es el único agente sobre el terreno: debe infiltrarse en un campamento de Guerrilla Warfare, localizar y apoyar a los rehenes alemanes y abrir después un camino hasta los muelles. Según la wiki de la comunidad, es la única misión con minas de cable trampa.",
    appearances: ds,
    sources: [csWiki("Lost_Cause", "Lost Cause"), dsWiki],
  },
  {
    id: "cz-ds-secret-war",
    slug: "mapa-mision-secret-war",
    name: "Secret War",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: [
        "cz_silo01",
        "cz_silo02",
        "cz_silo03",
        "cz_silo04",
        "cz_silo05",
      ],
      designers: ["Russell Meakim"],
    },
    summary:
      "Tercera misión, con el Spetsnaz ruso. El equipo debe desarmar un antiguo silo de misiles soviético que lleva 24 horas sin contacto por radio y descubre que lo han tomado dos grupos terroristas radicales: uno intenta lanzar el arma nuclear y el otro robarla.",
    appearances: ds,
    sources: [csWiki("Secret_War", "Secret War"), dsWiki],
  },
  {
    id: "cz-ds-building-recon",
    slug: "mapa-mision-building-recon",
    name: "Building Recon",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: [
        "cz_brecon01",
        "cz_brecon02",
        "cz_brecon03",
        "cz_brecon04",
        "cz_brecon05",
        "cz_brecon06",
      ],
      designers: ["Russell Meakim"],
    },
    summary:
      "Cuarta misión, con el SAS británico, en un complejo de almacenes de Ventspils, Letonia. Hay rumores sin confirmar de un arma nuclear en un almacén local y el jugador debe infiltrarse en sigilo, verificar su existencia y eliminar cualquier oposición. Es la primera aparición del SAS en Deleted Scenes y la segunda de los Arctic Avengers.",
    notes: [
      "El jugador empieza la misión con el soplete.",
      "Las texturas de esta misión se reutilizaron en los mapas multijugador Tides y Vostok.",
    ],
    appearances: ds,
    sources: [csWiki("Building_Recon", "Building Recon"), dsWiki],
  },
  {
    id: "cz-ds-druglab",
    slug: "mapa-mision-druglab",
    name: "Drug Lab",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: ["cz_druglab1", "cz_druglab2", "cz_druglab3"],
      designers: ["Thearrel McKinney Jr."],
    },
    summary:
      "Quinta misión, con el SEAL Team 6 («Spider team») en la selva colombiana. Un cártel muy organizado ha tomado a dos rehenes políticos. El jugador debe entrar en el laboratorio, plantar bombas de control remoto en el equipo de procesado de droga, destruir la que hay sobre las mesas y rescatar a los rehenes.",
    notes: [
      "Para abrir el paso a sus aliados, el jugador debe localizar otra entrada y eliminar a un guardia con un M72 LAW que vigila la principal.",
    ],
    appearances: ds,
    sources: [csWiki("DrugLab", "Drug Lab"), dsWiki],
  },
  {
    id: "cz-ds-motorcade",
    slug: "mapa-mision-motorcade-assault",
    name: "Motorcade Assault",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: ["cz_motor1", "cz_motor2", "cz_motor3"],
      designers: ["Chris Voss"],
    },
    summary:
      "Sexta misión, con el GSG-9, en las afueras de Venecia. Una organización terrorista europea ha ganado protagonismo: el jugador debe destruir uno de los camiones sospechosos de una caravana, matar al líder terrorista tras un cristal blindado y localizar al equipo terrestre francés del GIGN, desaparecido, para cubrirlo hasta la extracción.",
    appearances: ds,
    sources: [csWiki("Motorcade_Assault", "Motorcade Assault"), dsWiki],
  },
  {
    id: "cz-ds-thin-ice",
    slug: "mapa-mision-thin-ice",
    name: "Thin Ice",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: ["cz_thinice01", "cz_thinice02", "cz_thinice03"],
      designers: ["Russell Meakim"],
    },
    summary:
      "Séptima misión, con el Spetsnaz. Un rompehielos ruso de propulsión nuclear, secuestrado, navega hacia Vardø, en Noruega; si choca, sus reactores explotarán. El jugador, sin apoyo aliado, debe localizar y desactivar los motores, llegar al puente para desviar el buque y evitar que los terroristas escapen. Incluye un combate contra un Harrier.",
    appearances: ds,
    sources: [csWiki("Thin_Ice", "Thin Ice"), dsWiki],
  },
  {
    id: "cz-ds-downed-pilot",
    slug: "mapa-mision-downed-pilot",
    name: "Downed Pilot (misión)",
    category: "maps",
    details: {
      chapter: 8,
      mapFiles: ["cz_downed1", "cz_downed2", "cz_downed3", "cz_downed4"],
      designers: ["Thearrel McKinney Jr."],
    },
    summary:
      "Octava misión, con el GSG-9 y ambientada en la selva. Se basa en el mapa multijugador de rescate de rehenes cs_downed, que Ritual había desarrollado antes para Condition Zero.",
    appearances: ds,
    sources: [
      csWiki("Downed_Pilot", "Downed Pilot"),
      csWiki("Downed", "Downed Pilot (mapa)"),
      dsWiki,
    ],
  },
  {
    id: "cz-ds-hankagai",
    slug: "mapa-mision-hankagai",
    name: "Hankagai",
    category: "maps",
    details: {
      chapter: 9,
      mapFiles: [
        "cz_hankagai1",
        "cz_hankagai2",
        "cz_hankagai3",
        "cz_hankagai4",
        "cz_hankagai5",
      ],
      designers: ["Todd Rose"],
    },
    summary:
      "Novena misión, con los Kidotai japoneses y primer nivel ambientado en Japón («Hankagai» significa «centro de la ciudad»). El jugador escolta a un alto cargo japonés que inspecciona una ciudad conflictiva; la yakuza ataca, el jugador cubre su huida y pasa después a la ofensiva. Su rival son los Akunin.",
    appearances: ds,
    sources: [csWiki("Hankagai", "Hankagai"), dsWiki],
  },
  {
    id: "cz-ds-turn-of-the-crank",
    slug: "mapa-mision-turn-of-the-crank",
    name: "Turn of the Crank",
    category: "maps",
    details: {
      chapter: 10,
      mapFiles: ["cz_turncrank", "cz_turncrank2"],
      designers: ["Richard Gray"],
    },
    summary:
      "Décima misión, con el SWAT, en las afueras de Modesto, California. Es una redada contra un negocio de droga: el jugador lleva un maletín con dinero y un transmisor que avisa al equipo de asalto al abrirse, y debe capturar al narcotraficante Moses Sepulveda. Es la primera aparición del SWAT.",
    notes: [
      "Los SWAT irrumpen con una granada cegadora que deja ciego al jugador.",
      "La música de la misión se reutilizó en el modo Tour of Duty.",
    ],
    appearances: ds,
    sources: [
      csWiki("Turn_of_the_Crank", "Turn of the Crank"),
      csWiki("Tour_of_Duty", "Tour of Duty"),
    ],
  },
  {
    id: "cz-ds-alamo",
    slug: "mapa-mision-alamo",
    name: "Alamo",
    category: "maps",
    details: {
      chapter: 11,
      mapFiles: ["cz_alamo", "cz_alamo2"],
      designers: ["Richard Gray"],
    },
    summary:
      "Undécima misión, con el SEAL Team 6 (y el SAS británico, según la ficha de la wiki). Un grupo terrorista desconocido ha secuestrado al personal de la embajada de Estados Unidos y lo mantiene en el antiguo restaurante King Kabob. El jugador debe localizar y rescatar a los rehenes antes de que empiece la acción; si lo matan, la misión termina en fracaso.",
    appearances: ds,
    sources: [csWiki("Alamo", "Alamo"), dsWiki],
  },
  {
    id: "cz-ds-rise-hard",
    slug: "mapa-mision-rise-hard",
    name: "Rise Hard",
    category: "maps",
    details: {
      chapter: 12,
      mapFiles: [
        "cz_hr01",
        "cz_hr02",
        "cz_hr02b",
        "cz_hr03",
        "cz_hr04",
        "cz_hr05",
        "cz_hr06",
        "cz_hr07",
      ],
      designers: ["Russell Meakim"],
    },
    summary:
      "Duodécima y última misión de la historia, con el SAS. Un grupo numeroso de terroristas ha tomado un rascacielos en Irlanda del Norte y dispone de un artefacto nuclear táctico. El jugador entra en sigilo mientras sus compañeros dan cobertura y, una vez dentro, usa bombas de control remoto contra el control de seguridad y las cápsulas de armas («gun pods») de los terroristas.",
    appearances: ds,
    sources: [csWiki("Rise_Hard", "Rise Hard"), dsWiki],
  },
];

const equipment: Entry[] = [
  {
    id: "cz-ds-blowtorch",
    slug: "arma-soplete",
    name: "Soplete",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Equipo de misión de Deleted Scenes que sirve para romper objetos como cerraduras. Solo se puede usar en zonas de soplete marcadas: al llegar aparece su icono, se apunta al objeto y se mantiene pulsado el disparo principal hasta destruirlo.",
    notes: [
      "En Building Recon y Thin Ice el jugador lo lleva desde el principio; en Counter Terrorist Training, Lost Cause y Pipe Dream hay que encontrarlo.",
      "No tiene bombona de gas y no parece quedarse nunca sin combustible.",
    ],
    appearances: ds,
    sources: [csWiki("Blowtorch", "Blowtorch"), dsWiki],
  },
  {
    id: "cz-ds-fiber-optic-camera",
    slug: "arma-camara-de-fibra-optica",
    name: "Cámara de fibra óptica",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Equipo de Deleted Scenes para ver una zona al otro lado de una barrera sin que el enemigo lo note. Solo funciona en zonas marcadas, que casi siempre coinciden con las de sigilo. Con el disparo secundario se amplía la imagen.",
    notes: ["En Lost Cause se usa para localizar a los rehenes alemanes."],
    appearances: ds,
    sources: [csWiki("Fiber_optic_camera", "Fiber optic camera"), dsWiki],
  },
  {
    id: "cz-ds-rc-bomb",
    slug: "arma-bomba-de-control-remoto",
    name: "Bomba de control remoto",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Equipo de misión que sirve para destruir objetivos concretos, como barricadas que cortan el avance u objetos que son el blanco de la misión. Solo se puede usar en zonas de bomba de control remoto específicas.",
    notes: [
      "Se plantan en Drug Lab sobre el equipo de procesado de droga y en Rise Hard contra el control de seguridad.",
    ],
    appearances: ds,
    sources: [csWiki("Radio_Controlled_Bomb", "Radio Controlled Bomb"), dsWiki],
  },
  {
    id: "cz-ds-radio",
    slug: "arma-radio-de-deleted-scenes",
    name: "Radio de Deleted Scenes",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Equipo para contactar con los miembros del escuadrón y darles información valiosa. Solo se puede usar en zonas de radio específicas. La misión Truth in Chaos pide usarla para iniciar el asalto y para avisar al equipo de materiales peligrosos de dónde hay contenedores de gas VX.",
    appearances: ds,
    sources: [
      csWiki("Radio_(Deleted_Scenes)", "Radio (Deleted Scenes)"),
      dsWiki,
    ],
  },
  {
    id: "cz-ds-m60",
    slug: "arma-general-mg-60",
    name: "General MG 60 (M60)",
    category: "weapons",
    details: { slot: 1 },
    summary:
      "Ametralladora de Deleted Scenes que hace más daño que la M249 pero tiene más retroceso. Parece heredada del diseño de Condition Zero de Gearbox. Moses Sepulveda la lleva en Turn of the Crank.",
    notes: [
      "Casi todos los enemigos armados de Deleted Scenes atacan también cuerpo a cuerpo, salvo los que usan el M60.",
    ],
    appearances: ds,
    sources: [csWiki("M60", "M60"), dsWiki],
  },
  {
    id: "cz-ds-law",
    slug: "arma-lanzacohetes-law",
    name: "Lanzacohetes LAW (M72)",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Arma de un solo disparo de Deleted Scenes: se descarta sola después de disparar y su despliegue previo es largo. Parece heredada del diseño de Gearbox. En Drug Lab, un guardia con un LAW vigila la entrada principal.",
    appearances: ds,
    sources: [csWiki("M72_LAW", "M72 LAW"), dsWiki],
  },
];

const factions: Entry[] = [
  {
    id: "cz-char-midwest-militia",
    slug: "personaje-midwest-militia",
    name: "Midwest Militia",
    category: "characters",
    details: { affiliation: "Bando Terrorista (Estados Unidos)" },
    summary:
      "Facción terrorista estadounidense: según su descripción oficial, un movimiento extremista de grupos paramilitares armados, formal e informal, nacido en 1993 tras el enfrentamiento de Waco, Texas. Apareció en la versión de Xbox de Counter-Strike (como «NTO Militia»), en Condition Zero y en Deleted Scenes.",
    notes: [
      "Llegó a Condition Zero con la versión 1.2, del 2 de junio de 2004.",
    ],
    appearances: both,
    sources: [csWiki("Midwest_Militia", "Midwest Militia"), czWiki],
  },
  {
    id: "cz-char-spetsnaz",
    slug: "personaje-spetsnaz",
    name: "Spetsnaz",
    category: "characters",
    details: { affiliation: "Bando Antiterrorista (Rusia)" },
    summary:
      "Fuerzas especiales rusas: según su descripción, se dedican a obtener información sobre instalaciones económicas o militares, destruirlas o inutilizarlas, organizar sabotajes y operaciones punitivas contra rebeldes y formar destacamentos insurgentes. Es una facción de Condition Zero y de Deleted Scenes, y protagoniza las misiones Secret War, Thin Ice y Pipe Dream.",
    notes: [
      "Llegó a Condition Zero con la versión 1.2, del 2 de junio de 2004.",
    ],
    appearances: both,
    sources: [csWiki("Spetsnaz", "Spetsnaz"), czWiki, dsWiki],
  },
  {
    id: "cz-char-kidotai",
    slug: "personaje-kidotai",
    name: "Kidotai",
    category: "characters",
    details: { affiliation: "Bando Antiterrorista (Japón)" },
    summary:
      "Unidades especiales antidisturbios de Japón, creadas tras los disturbios del Palacio Imperial en 1952. En Deleted Scenes aparecen en todas las misiones ambientadas en Japón y siempre se enfrentan a los Akunin. Son una de las dos facciones antiterroristas nuevas de Deleted Scenes, junto con el SWAT.",
    appearances: ds,
    sources: [csWiki("Kidotai", "Kidotai"), dsWiki],
  },
  {
    id: "cz-char-swat",
    slug: "personaje-swat",
    name: "SWAT",
    category: "characters",
    details: { affiliation: "Bando Antiterrorista (Estados Unidos)" },
    summary:
      "Equipos de armas y tácticas especiales de la policía estadounidense. En Deleted Scenes debutan en la misión Turn of the Crank y aparecen como policía de Miami en Miami Heat. Es una de las dos facciones antiterroristas nuevas de Deleted Scenes.",
    notes: [
      "En Deleted Scenes sus miembros son modelos reciclados de SEAL; el SWAT de Miami lleva uniformes azul marino con una placa en cada manga.",
      "Volvió en la beta de Global Offensive con la actualización del 10 de agosto de 2012.",
    ],
    appearances: ds,
    sources: [csWiki("SWAT", "SWAT"), dsWiki],
  },
  {
    id: "cz-char-akunin",
    slug: "personaje-akunin",
    name: "Akunin",
    category: "characters",
    details: { affiliation: "Bando Terrorista (Japón)" },
    summary:
      "Facción terrorista conocida como yakuza: miembros de sindicatos tradicionales de crimen organizado de Japón, con una larga historia de enfrentamiento con los Kidotai. En Deleted Scenes aparecen en Hankagai, Fastline, Truth in Chaos y Run!.",
    notes: ["Sus modelos se basan en los de Guerrilla Warfare."],
    appearances: ds,
    sources: [csWiki("Akunin", "Akunin"), dsWiki],
  },
  {
    id: "cz-char-moses-sepulveda",
    slug: "personaje-moses-sepulveda",
    name: "Moses Sepulveda",
    category: "characters",
    details: { affiliation: "Guerrilla Warfare (distribución de droga)" },
    summary:
      "Narcotraficante colombiano que opera en California y objetivo de la misión Turn of the Crank de Deleted Scenes. Su banda la forman miembros de Guerrilla Warfare. Va con traje blanco sobre camisa roja, dos anillos de oro y un ojo muerto, y usa una ametralladora M60.",
    appearances: ds,
    sources: [csWiki("Moses_Sepulveda", "Moses Sepulveda"), dsWiki],
  },
];

const enemies: Entry[] = [
  {
    id: "cz-enemy-bots",
    slug: "enemigo-bots-condition-zero",
    name: "Bots de Condition Zero",
    category: "enemies",
    details: { origin: "Turtle Rock Studios (Michael Booth)" },
    summary:
      "Los bots oficiales de Condition Zero los desarrolló Michael Booth, de Turtle Rock Studios, y se empezaron a programar cuando Ritual aún llevaba el juego. Descartaron el bot que había hecho Gearbox y Booth empezó de cero: es capaz de aprender mapas nuevos por sí solo, así que funciona en casi cualquier mapa personalizado. Se presentaron en cuatro dificultades (Easy, Normal, Hard y Expert).",
    notes: [
      "Se probaron en abierto en el Counter-Strike original entre el 5 de junio y el 9 de septiembre de 2003; Booth los llamó «versión uno», y los de Condition Zero, «versión uno y medio».",
      "Responden al sonido, cambian de táctica y de ruta, y se comunican por radio. Las críticas elogiaron su inteligencia, aunque a veces no cumplían objetivos o se atascaban en el escenario.",
      "El bot de Easy tiene habilidad 0, agresividad 20, tiempo de reacción de 0,50 s y retardo de ataque de 1,50 s.",
      "Marcus «Count Floyd» Klinge, creador de PODbot, fue contratado por Gearbox para hacer el bot oficial en su fase del desarrollo.",
    ],
    appearances: cz,
    sources: [csWiki("Bot", "Bot"), czWiki, wikipediaCz],
  },
  {
    id: "cz-enemy-tour-terrorists",
    slug: "enemigo-terroristas-de-tour-of-duty",
    name: "Terroristas de Tour of Duty",
    category: "enemies",
    details: { origin: "Equipos de bots de la campaña Tour of Duty" },
    summary:
      "En Tour of Duty los Terroristas son ocho equipos de bots de dificultad creciente. Al ganar puntos de reputación, el número de enemigos de los mapas del mismo tour aumenta para compensar el mayor número y poder de los compañeros del jugador.",
    notes: [
      "Los nombres de los bots cambian según la dificultad: los fáciles llevan nombres de roedores, objetos pequeños o trastornos mentales; los difíciles, armas afiladas y bandos; los de Expert y Elite, animales y bestias. Los bots con nombres de ave tienden a usar rifles de francotirador.",
      "Con la dificultad, también sube la de los retos y, en Hard y Expert, se activa el fuego amigo.",
    ],
    appearances: cz,
    sources: [csWiki("Tour_of_Duty", "Tour of Duty")],
  },
  {
    id: "cz-enemy-harrier",
    slug: "enemigo-harrier",
    name: "Harrier",
    category: "enemies",
    details: {
      origin: "Caza de despegue vertical, capturado por los Arctic Avengers",
    },
    summary:
      "Caza de despegue y aterrizaje vertical que aparece en varias misiones de Deleted Scenes. En Thin Ice, un Harrier del Spetsnaz es secuestrado por los Arctic Avengers y se convierte en el jefe final de la misión; hacen falta varios disparos de AWP o Scout para derribarlo.",
    notes: [
      "En Building Recon lo usa el SAS y en Recoil, la fuerza aérea de Estados Unidos.",
      "El modelo del juego se basa en la variante naval británica Sea Harrier FA-2.",
    ],
    appearances: ds,
    sources: [csWiki("Harrier", "Harrier"), dsWiki],
  },
];

const trivia: Entry[] = [
  {
    id: "cz-trivia-tour-of-duty",
    slug: "curiosidad-tour-of-duty",
    name: "Tour of Duty",
    category: "trivia",
    summary:
      "Tour of Duty es la campaña principal para un jugador de Condition Zero: partidas de mapas multijugador contra bots, con una estructura de arcade. Hay seis tours de tres mapas cada uno, y completar uno desbloquea el siguiente. El jugador siempre es Antiterrorista y puede reclutar hasta cinco compañeros bot.",
    notes: [
      "Cada mapa tiene de uno a tres retos según la dificultad, por ejemplo matar a un número de enemigos con un arma concreta o ganar una ronda en cierto tiempo. Para ganar hay que ganar tres rondas y sacar dos de ventaja.",
      "Se empieza cada partida con 10.000 $, y abrir el menú de compra o pausa detiene el juego. Las dificultades son Easy, Normal, Hard y Expert, cada una con su propio progreso.",
      "Tour 1: Dust, Office, Prodigy. Tour 2: Tides, Italy, Inferno. Tour 3: Dust II, Militia, Stadium. Tour 4: Chateau, Havana, Cobble. Tour 5: Aztec, Downed, Airstrip. Tour 6: Piranesi, Fastline, Torn.",
      "Truth, Corruption y Vostok no están en Tour of Duty por haberse añadido tarde.",
      "Al terminar una dificultad se da una medalla: Good Conduct (Easy), Bronze Star (Normal), Silver Star (Hard) y la Distinguished Service Medal del Departamento de Defensa (Expert).",
      "Desde la versión 1.1, del 28 de abril de 2004, se pueden crear campañas personalizadas.",
      "Su base se heredó en las misiones de operación de Global Offensive.",
    ],
    appearances: cz,
    sources: [csWiki("Tour_of_Duty", "Tour of Duty"), wikipediaCz, steamCz],
  },
  {
    id: "cz-trivia-reputation-points",
    slug: "curiosidad-puntos-de-reputacion",
    name: "Puntos de reputación",
    category: "trivia",
    summary:
      "En Tour of Duty, ganar un reto da un punto de reputación, que sirve para mejorar y reclutar bots compañeros. No se pierden al gastarse: se recuperan al retirar a un miembro del equipo.",
    notes: [
      "Al empezar un tour en Easy o Normal se tienen dos puntos; en Hard, seis; en Expert, ocho.",
      "Cada mapa completado por primera vez da un punto; repetirlo no da más.",
      "Al final se llega a 20 puntos en Easy y Normal, 24 en Hard y 26 en Expert.",
    ],
    appearances: cz,
    sources: [csWiki("Reputation_Points", "Reputation Points"), wikipediaCz],
  },
  {
    id: "cz-trivia-development",
    slug: "curiosidad-desarrollo-condition-zero",
    name: "Un desarrollo de cuatro estudios",
    category: "trivia",
    summary:
      "Condition Zero pasó por cuatro estudios antes de salir el 23 de marzo de 2004. Rogue Entertainment empezó en 2001; Valve retiró el proyecto por dudas sobre su estabilidad financiera. Lo asumió Gearbox Software, que dejó el proyecto en julio de 2002. A mediados de agosto de 2002 lo tomó Ritual Entertainment, y hacia mediados de 2003 Valve se lo dio a Turtle Rock Studios, que rehízo el juego desde cero.",
    notes: [
      "Gearbox llegó a tener 25 mapas en seis campañas hacia diciembre de 2001; en marzo de 2002 Valve cambió el diseño para un solo jugador a uno más lineal.",
      "El diseño de Ritual era un shooter lineal con escenas y secuencias, al estilo de Half-Life; Valve pidió una mezcla de Half-Life y Counter-Strike. En el E3 de 2003 mostraba 19 misiones y 10 mapas multijugador nuevos, pero no salió por problemas de calidad.",
      "Turtle Rock se inspiró en los juegos de deportes. Su versión se presentó el 8 de octubre de 2003 con la idea de salir el 18 de noviembre; se retrasó y se filtró en octubre de 2003 y de nuevo en enero de 2004.",
      "Valve acusó a Vivendi Universal Games, su editora, de retrasar a propósito el juego y hacerle perder la campaña navideña de 2003.",
      "Valve celebró un evento de lanzamiento el 16 de diciembre de 2003 en el House of Shields, en San Francisco. Vivendi fijó finalmente el 23 de marzo de 2004.",
      "Las versiones para Linux y macOS llegaron con la versión oficial del 6 de marzo de 2013.",
    ],
    appearances: cz,
    sources: [
      wikipediaCz,
      czWiki,
      csWiki(
        "Counter-Strike:_Condition_Zero_(Ritual_Entertainment_design)",
        "Counter-Strike: Condition Zero (Ritual Entertainment design)",
      ),
    ],
  },
  {
    id: "cz-trivia-patches",
    slug: "curiosidad-parches-condition-zero",
    name: "Parches que cambiaron el juego",
    category: "trivia",
    summary:
      "Condition Zero salió con las facciones del Counter-Strike original y recibió después cambios importantes: modelos y sonidos de Ritual, nuevos mapas y reglas de rehenes.",
    notes: [
      "28 de abril de 2004 (1.1): se añadieron los modelos de jugador y de arma que había hecho Ritual, sonidos mejorados, paquetes de compra configurables (cuatro) y soporte de campañas personalizadas.",
      "2 de junio de 2004 (1.2): llegaron Midwest Militia y Spetsnaz, los mapas Sienna y Vostok, el sistema de nombres de zona en el radar y un cambio grande en el rescate de rehenes (los rehenes pueden hallar solos la zona de rescate, reaccionan y suben escaleras).",
      "14 de julio de 2004: se añadieron Truth in Chaos y Corruption.",
      "En total, cuatro mapas llegaron después del lanzamiento mediante parches.",
      "Al principio los modelos de Ritual se consideraron demasiado distintos de los originales, así que se modificaron algo antes de incluirlos.",
    ],
    appearances: cz,
    sources: [
      czWiki,
      csWiki(
        "Counter-Strike:_Condition_Zero_patches",
        "Counter-Strike: Condition Zero patches",
      ),
    ],
  },
  {
    id: "cz-trivia-multiplayer",
    slug: "curiosidad-multijugador-condition-zero",
    name: "El multijugador de Condition Zero",
    category: "trivia",
    summary:
      "El modo multijugador es casi idéntico al del Counter-Strike original, con el mismo arsenal, las mismas reglas de desactivación de bomba, rescate de rehenes y asesinato y la misma economía de rondas. La principal novedad es poder añadir bots a los servidores. Los jugadores de Condition Zero y del Counter-Strike original quedaron en comunidades separadas.",
    notes: [
      "Estrena un sistema de ayuda en tiempo real que explica los objetivos y el equipo a los nuevos jugadores; con él activado, se desactiva el aviso de bajas.",
      "Introduce las texturas de detalle para mejorar el aspecto del motor GoldSrc.",
      "Pagos de la economía: 300 $ por eliminar a un enemigo, 2.750 $ para los Terroristas si plantan y hacen estallar la bomba, y 2.000 $ por jugador a los Antiterroristas por rescatar a todos los rehenes o eliminar al rival; el máximo es 16.000 $.",
      "Los mapas de rehenes nuevos tienen cuatro rehenes.",
    ],
    appearances: cz,
    sources: [czWiki, wikipediaCz],
  },
  {
    id: "cz-trivia-ds-publication",
    slug: "curiosidad-deleted-scenes-publicacion",
    name: "Cómo se publicó Deleted Scenes",
    category: "trivia",
    summary:
      "Cuando Turtle Rock rehizo Condition Zero, se pensó que el trabajo de Ritual se descartaría. Valve anunció poco después que no sería así: las doce mejores de las dieciocho misiones terminadas saldrían aparte como Deleted Scenes, para ofrecer otra forma de entender el juego para un jugador. Se publicó el 23 de marzo de 2004 dentro de Condition Zero.",
    notes: [
      "Ritual tenía las misiones casi terminadas pero no llegó a pulirlas; Valve se encargó del acabado, sobre todo de evitar fallos en las secuencias de las misiones, y cambió el fondo del menú a un tono azulado y rehízo el mapa del mundo.",
      "El 17 de junio de 2004, Jess Cliffe anunció que las seis misiones retiradas se añadirían: tres el 28 de junio (Miami Heat, Run! y Truth in Chaos) y tres el 14 de julio (Fastline, Pipe Dream y Sandstorm). No forman parte de la secuencia y están desbloqueadas desde el mapa del mundo.",
      "Al editar Pipe Dream, Valve recortó la parte final de la misión en lugar de arreglarla.",
      "Ritual planeó publicar su editor, que nunca salió; no hay herramientas oficiales, pero algunos aficionados lograron usar el juego con Valve Hammer Editor.",
      "Compatibilidad con Linux y macOS: 2 de septiembre de 2013.",
    ],
    appearances: ds,
    sources: [
      dsWiki,
      wikipediaCz,
      csWiki(
        "Counter-Strike:_Condition_Zero_Deleted_Scenes",
        "Counter-Strike: Condition Zero Deleted Scenes",
      ),
    ],
  },
  {
    id: "cz-trivia-ds-equipment",
    slug: "curiosidad-equipo-de-deleted-scenes",
    name: "Equipo y mecánicas de Deleted Scenes",
    category: "trivia",
    summary:
      "Deleted Scenes se parece más a Half-Life que a una partida de Counter-Strike: no hay dinero, cada misión da un equipo concreto y se puede encontrar más en los mapas. Los enemigos abatidos no sueltan munición ni armas, y existen opciones de recuperar salud y chaleco. Los chalecos son más resistentes.",
    notes: [
      "Se pueden llevar hasta tres granadas HE en vez de una y varias armas primarias y secundarias.",
      "Algunas armas, como el machete o el cinturón suicida de Rogue Entertainment, las usa solo la IA terrorista.",
      "Se reanimaron algunas armas, como el Maverick M4A1 Carbine, el Clarion 5.56 y el IDF Defender. El rifle Magnum es marrón en vez de verde.",
      "Se ajustaron el daño y el retroceso de algunas armas para equilibrar la campaña.",
      "Hay siete facciones antiterroristas (con Kidotai y SWAT nuevas).",
    ],
    appearances: ds,
    sources: [
      dsWiki,
      csWiki(
        "Counter-Strike:_Condition_Zero_Deleted_Scenes",
        "Counter-Strike: Condition Zero Deleted Scenes",
      ),
    ],
  },
  {
    id: "cz-trivia-reception",
    slug: "curiosidad-recepcion-condition-zero",
    name: "Recepción de Condition Zero",
    category: "trivia",
    summary:
      "Condition Zero recibió críticas «mixtas o medias»: 65 sobre 100 en Metacritic con 33 reseñas. Se elogiaron la IA de los bots y los mapas nuevos, y se criticó que el desarrollo largo lo dejó anticuado y que el multijugador apenas cambiaba respecto al original gratuito.",
    notes: [
      "La campaña lineal de Deleted Scenes se comparó con shooters de finales de los noventa.",
      "IGN criticó que el precio de 40 $ era difícil de justificar.",
    ],
    appearances: cz,
    sources: [wikipediaCz],
  },
];

const easterEggs: Entry[] = [
  {
    id: "cz-egg-stadium-banners",
    slug: "easter-egg-all-your-base-en-stadium",
    name: "«All your base» en Stadium",
    category: "easter-eggs",
    summary:
      "En Condition Zero, desde la vista libre de espectador de Stadium, unos aficionados sostienen pancartas que, leídas juntas, dicen «all your base belong to us».",
    appearances: cz,
    sources: [csWiki("Stadium", "Stadium")],
  },
  {
    id: "cz-egg-ds-skill-0",
    slug: "easter-egg-dificultad-skill-0",
    name: "Dificultad oculta «skill 0»",
    category: "easter-eggs",
    summary:
      "Deleted Scenes incluye un nivel de dificultad oculto que solo se activa escribiendo «skill 0» en la consola. Es el más difícil y su fórmula de daño debía parecerse a la de los juegos multijugador.",
    appearances: ds,
    sources: [dsWiki],
  },
  {
    id: "cz-egg-ds-scud",
    slug: "easter-egg-scud-en-los-creditos",
    name: "El misil Scud de los créditos",
    category: "easter-eggs",
    summary:
      "En los créditos finales de Deleted Scenes, un soldado francotirador de la Delta Force va montado en un misil Scud, una alusión clara a la película Dr. Strangelove.",
    appearances: ds,
    sources: [dsWiki],
  },
  {
    id: "cz-egg-fastline-signature",
    slug: "easter-egg-firmas-en-fastline",
    name: "Las firmas de Fastline",
    category: "easter-eggs",
    summary:
      "El diseñador de Fastline, Luke Whiteside, escondió su firma en tres puntos del mapa multijugador: la esquina del vestíbulo, la máquina de hamburguesas y una baldosa oscura de la escalera mecánica del punto A. En el banco junto al conducto de ventilación del punto A hay una caja de chocolatinas Porky's, la misma que se encuentra en la librería de la misión de Deleted Scenes.",
    appearances: cz,
    sources: [csWiki("Fastline", "Fastline")],
  },
];

export const counterStrikeConditionZeroEntries: Entry[] = [
  ...multiplayerMaps,
  ...deletedScenesMissions,
  ...equipment,
  ...factions,
  ...enemies,
  ...trivia,
  ...easterEggs,
];
