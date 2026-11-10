import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

// Fuentes: Left 4 Dead Wiki (Fandom) y Wikipedia. Los textos de la wiki de Fandom se leyeron
// con su API (api.php), porque sus páginas bloquean la descarga directa.
function l4dWiki(page: string, title: string): Source {
  return {
    title: `${title} - Left 4 Dead Wiki`,
    url: `https://left4dead.fandom.com/wiki/${page}`,
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

const l4d1 = [{ gameId: "left-4-dead" }];
const l4d2 = [{ gameId: "left-4-dead-2" }];
const both = [{ gameId: "left-4-dead" }, { gameId: "left-4-dead-2" }];

// Orden de las campañas: en Left 4 Dead sigue la cronología de la historia; en Left 4 Dead 2
// coincide con el número de los archivos de mapa (c1 = Dead Center … c14 = The Last Stand)
export const left4DeadMoreMaps: Entry[] = [
  {
    id: "l4d-crash-course",
    slug: "campana-crash-course",
    name: "Crash Course",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["l4d_garage01_alleys", "l4d_garage02_lots"],
    },
    summary:
      "Primera campaña descargable de Left 4 Dead, publicada el 29 de septiembre de 2009. Tiene solo dos capítulos (The Alleys y The Truck Depot Finale) y transcurre en la zona industrial de las afueras de Fairfield, entre No Mercy y Death Toll. Es una de las más cortas del juego.",
    appearances: l4d1,
    sources: [
      l4dWiki("Crash_Course", "Crash Course"),
      wikipedia("Left_4_Dead", "Left 4 Dead"),
    ],
  },
  {
    id: "l4d-death-toll",
    slug: "campana-death-toll",
    name: "Death Toll",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: [
        "l4d_smalltown01_caves",
        "l4d_smalltown02_drainage",
        "l4d_smalltown03_ranchhouse",
        "l4d_smalltown04_mainstreet",
        "l4d_smalltown05_houseboat",
      ],
    },
    summary:
      "Tercera campaña de Left 4 Dead, en cinco capítulos (The Turnpike, The Drains, The Church, The Town y Boathouse Finale). Los supervivientes cruzan una autopista rota, un sistema de drenaje y un pueblo rural llamado Riverside, donde esperan encontrar al ejército, hasta llegar a un embarcadero para una evacuación en barco.",
    appearances: l4d1,
    sources: [l4dWiki("Death_Toll", "Death Toll")],
  },
  {
    id: "l4d-dead-air",
    slug: "campana-dead-air",
    name: "Dead Air",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: [
        "l4d_airport01_greenhouse",
        "l4d_airport02_offices",
        "l4d_airport03_garage",
        "l4d_airport04_terminal",
        "l4d_airport05_runway",
      ],
    },
    summary:
      "Cuarta campaña de Left 4 Dead, en cinco capítulos (The Greenhouse, The Crane, The Construction Site, The Terminal y Runway Finale). Parte de un invernadero en un tejado de Newburg y atraviesa el centro de negocios hasta la pista del aeropuerto internacional Metro, donde hay que repostar el avión de evacuación.",
    appearances: l4d1,
    sources: [l4dWiki("Dead_Air", "Dead Air")],
  },
  {
    id: "l4d-blood-harvest",
    slug: "campana-blood-harvest",
    name: "Blood Harvest",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: [
        "l4d_farm01_hilltop",
        "l4d_farm02_traintunnel",
        "l4d_farm03_bridge",
        "l4d_farm04_barn",
        "l4d_farm05_cornfield",
      ],
    },
    summary:
      "Quinta campaña de Left 4 Dead (en su lanzamiento era la cuarta y última), en cinco capítulos (The Woods, The Tunnel, The Bridge, The Train Station y Farmhouse Finale). Es una travesía nocturna por bosques, vías de tren y maizales cerca del Allegheny National Forest, en busca de un puesto militar rural.",
    appearances: l4d1,
    sources: [l4dWiki("Blood_Harvest", "Blood Harvest")],
  },
  {
    id: "l4d-the-sacrifice",
    slug: "campana-the-sacrifice",
    name: "The Sacrifice",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: ["l4d_river01_docks", "l4d_river02_barge", "l4d_river03_port"],
    },
    summary:
      "Sexta y última campaña de Left 4 Dead, publicada el 5 de octubre de 2010 como contenido descargable (también para Left 4 Dead 2). Tiene tres capítulos (The Docks, The Barge y Port Finale) en una zona portuaria de Georgia, y funciona como prólogo de The Passing. Su título anuncia un desenlace que no se repite en ninguna otra campaña.",
    appearances: l4d1,
    sources: [
      l4dWiki("The_Sacrifice", "The Sacrifice"),
      wikipedia("Left_4_Dead", "Left 4 Dead"),
    ],
  },
  {
    id: "l4d2-dead-center",
    slug: "campana-dead-center",
    name: "Dead Center",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: ["c1m1_hotel", "c1m2_streets", "c1m3_mall", "c1m4_atrium"],
    },
    summary:
      "Primera campaña de Left 4 Dead 2, en cuatro capítulos (The Hotel, The Streets, The Mall y Atrium Finale). Transcurre en Savannah, Georgia: los supervivientes salen de la azotea de un hotel de CEDA, cruzan las calles y llegan al centro comercial Liberty Mall, donde los espera un coche de carreras expuesto.",
    appearances: l4d2,
    sources: [
      l4dWiki("Dead_Center", "Dead Center"),
      wikipedia("Left_4_Dead_2", "Left 4 Dead 2"),
    ],
  },
  {
    id: "l4d2-the-passing",
    slug: "campana-the-passing",
    name: "The Passing",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["c6m1_riverbank", "c6m2_bedlam", "c6m3_port"],
    },
    summary:
      "Primera campaña descargable de Left 4 Dead 2, publicada el 22 de abril de 2010. Tiene tres capítulos (The Riverbank, The Underground y The Port) en la localidad de Rayford, Georgia, entre Dead Center y Dark Carnival. Reúne a los supervivientes de ambos juegos, aunque los originales no son jugables, e introdujo el M60, el palo de golf y el infectado caído.",
    appearances: l4d2,
    sources: [
      l4dWiki("The_Passing", "The Passing"),
      wikipedia("Left_4_Dead_2", "Left 4 Dead 2"),
    ],
  },
  {
    id: "l4d2-dark-carnival",
    slug: "campana-dark-carnival",
    name: "Dark Carnival",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: [
        "c2m1_highway",
        "c2m2_fairgrounds",
        "c2m3_coaster",
        "c2m4_barns",
        "c2m5_concert",
      ],
    },
    summary:
      "Tercera campaña de Left 4 Dead 2, en cinco capítulos (The Highway, The Fairgrounds, The Coaster, The Barns y The Concert). Se desarrolla sobre todo en el parque de atracciones Whispering Oaks, en el condado de Griffin (Georgia), y termina con un concierto de la banda Midnight Riders como señal para el helicóptero de rescate.",
    appearances: l4d2,
    sources: [l4dWiki("Dark_Carnival", "Dark Carnival")],
  },
  {
    id: "l4d2-swamp-fever",
    slug: "campana-swamp-fever",
    name: "Swamp Fever",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: [
        "c3m1_plankcountry",
        "c3m2_swamp",
        "c3m3_shantytown",
        "c3m4_plantation",
      ],
    },
    summary:
      "Cuarta campaña de Left 4 Dead 2 (antes de The Passing era la tercera), en cuatro capítulos largos. Recorre pantanos de tipo Luisiana: una granja de caimanes, un avión comercial estrellado, aldeas del pantano y una plantación abandonada, donde espera el barco de rescate. Es una de las dos campañas con los infectados de barro (Mud Men).",
    appearances: l4d2,
    sources: [l4dWiki("Swamp_Fever", "Swamp Fever")],
  },
  {
    id: "l4d2-hard-rain",
    slug: "campana-hard-rain",
    name: "Hard Rain",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: [
        "c4m1_milltown_a",
        "c4m2_sugarmill_a",
        "c4m3_sugarmill_b",
        "c4m4_milltown_b",
        "c4m5_milltown_escape",
      ],
    },
    summary:
      "Quinta campaña de Left 4 Dead 2, en cinco mapas ambientados en la ciudad ribereña de Ducatel (Misisipi), llamada Milltown en los títulos de capítulo. Hay que conseguir diésel para el barco de Virgil y volver por el mismo camino cuando llega un huracán: lluvia, viento y agua alteran la visibilidad y los recorridos. Introduce a los infectados obreros (Worker Infected).",
    appearances: l4d2,
    sources: [l4dWiki("Hard_Rain", "Hard Rain")],
  },
  {
    id: "l4d2-the-parish",
    slug: "campana-the-parish",
    name: "The Parish",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: [
        "c5m1_waterfront",
        "c5m2_park",
        "c5m3_cemetery",
        "c5m4_quarter",
        "c5m5_bridge",
      ],
    },
    summary:
      "Sexta campaña de Left 4 Dead 2 y la última de la historia principal del juego, ambientada en Nueva Orleans (Luisiana). Los supervivientes cruzan un parque, un centro de evacuación de CEDA, un depósito de coches, una autopista bombardeada y un cementerio hasta llegar al puente. Incluye dos eventos «gauntlet»: la estación de autobuses y el final del puente.",
    appearances: l4d2,
    sources: [l4dWiki("The_Parish", "The Parish")],
  },
  {
    id: "l4d2-the-sacrifice",
    slug: "campana-the-sacrifice-l4d2",
    name: "The Sacrifice en Left 4 Dead 2",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: ["c7m1_docks", "c7m2_barge", "c7m3_port"],
    },
    summary:
      "Versión para Left 4 Dead 2 de la campaña de tres capítulos publicada el 5 de octubre de 2010 (The Docks, The Barge y Port Finale), con los supervivientes originales. Se sitúa antes de los hechos de Left 4 Dead 2 y es el prólogo de The Passing.",
    appearances: l4d2,
    sources: [
      l4dWiki("The_Sacrifice", "The Sacrifice"),
      wikipedia("Left_4_Dead_2", "Left 4 Dead 2"),
    ],
  },
  {
    id: "l4d2-crash-course",
    slug: "campana-crash-course-l4d2",
    name: "Crash Course en Left 4 Dead 2",
    category: "maps",
    details: {
      chapter: 9,
      mapFiles: ["c9m1_alleys", "c9m2_lots"],
    },
    summary:
      "Versión de Left 4 Dead 2 de Crash Course, publicada el 4 de noviembre de 2011 dentro de la actualización de Cold Stream. Mantiene dos mapas y es, según la wiki, la menos modificada de las campañas portadas desde Left 4 Dead.",
    appearances: l4d2,
    sources: [l4dWiki("Crash_Course", "Crash Course")],
  },
  {
    id: "l4d2-death-toll",
    slug: "campana-death-toll-l4d2",
    name: "Death Toll en Left 4 Dead 2",
    category: "maps",
    details: {
      chapter: 10,
      mapFiles: [
        "c10m1_caves",
        "c10m2_drainage",
        "c10m3_ranchhouse",
        "c10m4_mainstreet",
        "c10m5_houseboat",
      ],
    },
    summary:
      "Versión de Left 4 Dead 2 de Death Toll, publicada el 16 de septiembre de 2011. Conserva los cinco capítulos del original e incorpora los infectados, objetos y armas del segundo juego, además de cambios en el desarrollo de la campaña.",
    appearances: l4d2,
    sources: [l4dWiki("Death_Toll", "Death Toll")],
  },
  {
    id: "l4d2-dead-air",
    slug: "campana-dead-air-l4d2",
    name: "Dead Air en Left 4 Dead 2",
    category: "maps",
    details: {
      chapter: 11,
      mapFiles: [
        "c11m1_greenhouse",
        "c11m2_offices",
        "c11m3_garage",
        "c11m4_terminal",
        "c11m5_runway",
      ],
    },
    summary:
      "Versión de Left 4 Dead 2 de Dead Air. Valve la publicó en beta el 22 de julio de 2011, después de que 20.000 jugadores lograran el logro «Stream Crosser» de Cold Stream, en solo cuatro horas. Añade una caída de un solo sentido en The Construction Site y un evento «gauntlet» en The Terminal.",
    appearances: l4d2,
    sources: [l4dWiki("Dead_Air", "Dead Air")],
  },
  {
    id: "l4d2-blood-harvest",
    slug: "campana-blood-harvest-l4d2",
    name: "Blood Harvest en Left 4 Dead 2",
    category: "maps",
    details: {
      chapter: 12,
      mapFiles: [
        "c12m1_hilltop",
        "c12m2_traintunnel",
        "c12m3_bridge",
        "c12m4_barn",
        "c12m5_cornfield",
      ],
    },
    summary:
      "Versión de Left 4 Dead 2 de Blood Harvest, publicada el 5 de agosto de 2011 tras alcanzarse 60.000 jugadores con el logro «Connecting Fight». Como el resto de portados, cambia armas, enemigos, rutas y combates respecto al original.",
    appearances: l4d2,
    sources: [l4dWiki("Blood_Harvest", "Blood Harvest")],
  },
  {
    id: "l4d2-cold-stream",
    slug: "campana-cold-stream",
    name: "Cold Stream",
    category: "maps",
    details: {
      chapter: 13,
      mapFiles: [
        "c13m1_alpinecreek",
        "c13m2_southpinestream",
        "c13m3_memorialbridge",
        "c13m4_cutthroatcreek",
      ],
    },
    summary:
      "Campaña creada por la comunidad (Matthew «donking» Lourdelet) y adoptada por Valve como tercer contenido descargable de Left 4 Dead 2. Sale en beta el 22 de marzo de 2011 y en su versión final el 24 de julio de 2012. Tiene cuatro mapas por bosques, un arroyo, un atasco de coches y un puente, y casi todos acaban en un evento «gauntlet».",
    appearances: l4d2,
    sources: [l4dWiki("Cold_Stream", "Cold Stream")],
  },
  {
    id: "l4d2-the-last-stand",
    slug: "campana-the-last-stand",
    name: "The Last Stand",
    category: "maps",
    details: {
      chapter: 14,
      mapFiles: ["c14m1_junkyard", "c14m2_lighthouse"],
    },
    summary:
      "Campaña de dos mapas (The Junkyard y Lighthouse Finale) incluida en The Last Stand Community Update, publicada el 24 de septiembre de 2020 y creada por miembros de la comunidad. Amplía el antiguo mapa de Supervivencia «The Lighthouse» de Left 4 Dead y, esta vez, sí es posible superarla. La actualización es exclusiva de PC.",
    appearances: l4d2,
    sources: [
      l4dWiki(
        "The_Last_Stand_Community_Update",
        "The Last Stand Community Update",
      ),
      l4dWiki("The_Last_Stand_(Left_4_Dead_2)", "The Last Stand"),
    ],
  },
];

export const left4DeadMoreEnemies: Entry[] = [
  {
    id: "l4d2-spitter",
    slug: "spitter",
    name: "Spitter (Escupidora)",
    category: "enemies",
    details: { origin: "Infectado especial de Left 4 Dead 2" },
    summary:
      "Infectada especial que debuta en Left 4 Dead 2. Lanza una bola de ácido corrosivo que forma un charco en el suelo y causa un daño creciente a quien permanezca en él; al morir deja otro charco más pequeño. Tiene la voz de Dee Bradley Baker, igual que el Jockey.",
    appearances: l4d2,
    sources: [l4dWiki("Spitter", "Spitter")],
  },
  {
    id: "l4d2-jockey",
    slug: "jockey",
    name: "Jockey",
    category: "enemies",
    details: { origin: "Infectado especial de Left 4 Dead 2" },
    summary:
      "Infectado especial pequeño y rápido que salta sobre la cabeza de un superviviente y lo conduce lejos de sus compañeros mientras le araña la cara. Según Valve, se diseñó para empujar a los supervivientes al ácido de la Spitter. La mejor defensa es un empujón de un compañero.",
    appearances: l4d2,
    sources: [l4dWiki("Jockey", "Jockey")],
  },
  {
    id: "l4d-common-infected",
    slug: "infectado-comun",
    name: "Infectado común (Common Infected)",
    category: "enemies",
    details: { origin: "Humanos infectados por la Gripe Verde" },
    summary:
      "Los enemigos más habituales y fáciles de abatir. Su fuerza está en atacar en grupo: la wiki recuerda que el Director genera hordas de unas 30 unidades, y los militares los llaman «Whiskey Delta» en The Parish y en el cómic The Sacrifice. Resisten miembros perdidos y caídas, pero mueren con un disparo en la cabeza.",
    appearances: both,
    sources: [l4dWiki("Common_Infected", "Common Infected")],
  },
  {
    id: "l4d-infected-horde",
    slug: "horda-de-infectados",
    name: "Horda (Horde)",
    category: "enemies",
    details: {
      origin: "Grupo de infectados comunes gestionado por el Director",
    },
    summary:
      "Oleada de infectados comunes que el Director genera a un lado o detrás de los supervivientes. Según la wiki, una horda reúne de 10 a 30 infectados y aparece cada 1 a 4 minutos según la dificultad. Los eventos de crescendo y los finales las provocan a propósito.",
    appearances: both,
    sources: [
      l4dWiki("The_Director", "The Director"),
      l4dWiki("Crescendo_Event", "Crescendo Event"),
    ],
  },
  {
    id: "l4d2-ceda-worker-infected",
    slug: "infectado-ceda",
    name: "Infectado de CEDA (CEDA Worker)",
    category: "enemies",
    details: { origin: "Infectado especial de la familia «uncommon»" },
    summary:
      "Agente de CEDA con traje de protección, el primer infectado «uncommon» anunciado para Left 4 Dead 2. Aparece en Dead Center y es resistente al fuego, así que los cócteles molotov no le afectan. A veces suelta un bote de bilis. En The Last Stand Update el de No Mercy lleva un traje azul oscuro y blanco.",
    appearances: l4d2,
    sources: [l4dWiki("Uncommon_Infected", "Uncommon Infected")],
  },
  {
    id: "l4d2-clown-infected",
    slug: "infectado-payaso",
    name: "Payaso infectado (Clown)",
    category: "enemies",
    details: { origin: "Infectado especial de la familia «uncommon»" },
    summary:
      "Antiguo animador del parque de Dark Carnival. Al ver a los supervivientes carga y sus zapatos chillones atraen a otros infectados; el evento va acompañado de un tema musical propio, «Not a Laughing Matter». Los infectados que lo siguen lo atacan sin poder herirlo.",
    appearances: l4d2,
    sources: [l4dWiki("Uncommon_Infected", "Uncommon Infected")],
  },
  {
    id: "l4d2-mud-men",
    slug: "hombres-de-barro",
    name: "Hombres de barro (Mud Men)",
    category: "enemies",
    details: { origin: "Infectado especial de la familia «uncommon»" },
    summary:
      "Infectados cubiertos de barro que lo usan como camuflaje y corren a cuatro patas. Un golpe emborrona la pantalla del jugador. Originalmente aparecían solo en Swamp Fever y Cold Stream; The Last Stand Update los llevó también a las alcantarillas de No Mercy y Death Toll.",
    appearances: l4d2,
    sources: [l4dWiki("Uncommon_Infected", "Uncommon Infected")],
  },
  {
    id: "l4d2-worker-infected",
    slug: "infectado-obrero",
    name: "Obrero infectado (Worker / Road Crew)",
    category: "enemies",
    details: { origin: "Infectado especial de la familia «uncommon»" },
    summary:
      "Cuadrilla de demolición que fue infectada cuando debía derribar un viejo ingenio azucarero. Lleva casco, chaleco reflectante y protectores auditivos, que los hacen inmunes al sonido de las bombas de tubo. Es propio de la campaña Hard Rain.",
    appearances: l4d2,
    sources: [l4dWiki("Uncommon_Infected", "Uncommon Infected")],
  },
  {
    id: "l4d2-riot-infected",
    slug: "infectado-antidisturbios",
    name: "Antidisturbios infectado (Riot)",
    category: "enemies",
    details: { origin: "Infectado especial de la familia «uncommon»" },
    summary:
      "Guardia de seguridad privada contratado por CEDA que se infectó con su armadura puesta. Es inmune a balas y armas cuerpo a cuerpo si recibe el golpe de frente, así que hay que dañarlo por la espalda; el fuego y los explosivos sí le afectan. Aparece en The Parish. Estuvo censurado en las versiones alemana y australiana por las normas sobre violencia contra agentes de la ley, y después se restauró con pequeñas diferencias.",
    appearances: l4d2,
    sources: [l4dWiki("Uncommon_Infected", "Uncommon Infected")],
  },
  {
    id: "l4d2-fallen-survivor",
    slug: "superviviente-caido",
    name: "Superviviente caído (Fallen Survivor)",
    category: "enemies",
    details: { origin: "Infectado especial de la familia «uncommon»" },
    summary:
      "Antiguo superviviente bien equipado, con ropa de milicia y bolsas con molotov, bomba de tubo, pastillas y botiquín. Aparece en The Passing al comienzo de The Riverbank y The Underground, y es muy resistente. Fue recortado de la versión inicial de Left 4 Dead 2 y reapareció en esta campaña.",
    appearances: l4d2,
    sources: [l4dWiki("Uncommon_Infected", "Uncommon Infected")],
  },
  {
    id: "l4d2-jimmy-gibbs-jr",
    slug: "jimmy-gibbs-junior",
    name: "Jimmy Gibbs Junior",
    category: "enemies",
    details: { origin: "Infectado especial de la familia «uncommon»" },
    summary:
      "Piloto de carreras del sur de EE. UU. que, ya infectado, aparece en The Atrium de Dead Center vestido con su mono. Es resistente al fuego y puede cegar con aceite de motor. Su coche de carreras está expuesto en el centro comercial.",
    appearances: l4d2,
    sources: [l4dWiki("Uncommon_Infected", "Uncommon Infected")],
  },
];

export const left4DeadMoreWeapons: Entry[] = [
  {
    id: "l4d-pump-shotgun",
    slug: "escopeta-de-corredera",
    name: "Escopeta de corredera (Pump Shotgun)",
    category: "weapons",
    details: { slot: 1, ammo: "Cartuchos de escopeta" },
    summary:
      "Arma de primer nivel disponible desde el inicio de las campañas. Inflige mucho daño a un solo enemigo o menos daño a varios a la vez, por su dispersión. Su cargador es de ocho cartuchos, con 128 de reserva en Left 4 Dead y 72 en Left 4 Dead 2.",
    appearances: both,
    sources: [l4dWiki("Pump_Shotgun", "Pump Shotgun")],
  },
  {
    id: "l4d2-chrome-shotgun",
    slug: "escopeta-cromada",
    name: "Escopeta cromada (Chrome Shotgun)",
    category: "weapons",
    details: { slot: 1, ammo: "Cartuchos de escopeta" },
    summary:
      "Variante de la escopeta de corredera en Left 4 Dead 2. Tiene la dispersión más cerrada de todas las escopetas, lo que la hace más eficaz a distancia, con menos perdigones por disparo pero más daño por perdigón.",
    appearances: l4d2,
    sources: [l4dWiki("Chrome_Shotgun", "Chrome Shotgun")],
  },
  {
    id: "l4d2-combat-shotgun",
    slug: "escopeta-de-combate",
    name: "Escopeta de combate (Combat Shotgun)",
    category: "weapons",
    details: { slot: 1, ammo: "Cartuchos de escopeta" },
    summary:
      "Escopeta automática de segundo nivel de Left 4 Dead 2, con diez cartuchos en el cargador y 90 de reserva. Es la versión más precisa de la escopeta automática, igual que la cromada lo es de la de corredera, y aparece en los mismos lugares.",
    appearances: l4d2,
    sources: [l4dWiki("Combat_Shotgun", "Combat Shotgun")],
  },
  {
    id: "l4d-hunting-rifle",
    slug: "rifle-de-caza",
    name: "Rifle de caza (Hunting Rifle)",
    category: "weapons",
    details: { slot: 1, ammo: "Munición de rifle" },
    summary:
      "Rifle semiautomático con mira telescópica, de segundo nivel. Tiene un cargador de 15 balas y atraviesa paredes finas, puertas y varios infectados con un mismo disparo. En el primer juego es el arma de fuego más precisa.",
    appearances: both,
    sources: [l4dWiki("Hunting_Rifle", "Hunting Rifle")],
  },
  {
    id: "l4d2-sniper-rifle",
    slug: "rifle-de-francotirador",
    name: "Rifle de francotirador (Sniper Rifle)",
    category: "weapons",
    details: { slot: 1, ammo: "Munición de rifle" },
    summary:
      "Variante del rifle de caza en Left 4 Dead 2, también llamada «Military Sniper». Su cargador es de 30 balas, el doble que el del rifle de caza, y es muy preciso a larga distancia. Inflige mucho daño a los infectados especiales y mata a un infectado común de un tiro.",
    appearances: l4d2,
    sources: [l4dWiki("Sniper_Rifle", "Sniper Rifle")],
  },
  {
    id: "l4d-assault-rifle",
    slug: "rifle-de-asalto-m16",
    name: "Rifle de asalto M16 (Assault Rifle)",
    category: "weapons",
    details: { slot: 1, ammo: "Munición de rifle" },
    summary:
      "Rifle automático de segundo nivel, con un cargador de 50 balas y 360 de reserva. En Left 4 Dead se llama simplemente «Assault Rifle» y en Left 4 Dead 2 «M-16». Es el rifle habitual de Bill, Louis, Nick y Rochelle.",
    appearances: both,
    sources: [l4dWiki("Assault_Rifle", "Assault Rifle")],
  },
  {
    id: "l4d2-ak-47",
    slug: "ak-47",
    name: "AK-47",
    category: "weapons",
    details: { slot: 1, ammo: "Munición de rifle" },
    summary:
      "Rifle automático de Left 4 Dead 2. Frente a otros rifles de asalto pierde cadencia, capacidad de cargador y precisión, pero ofrece el mayor daño por segundo y sirve contra hordas y Tanks.",
    appearances: l4d2,
    sources: [l4dWiki("AK-47", "AK-47")],
  },
  {
    id: "l4d2-sg552",
    slug: "sg-552",
    name: "SG 552",
    category: "weapons",
    details: { slot: 1, ammo: "Munición de rifle" },
    summary:
      "Rifle de asalto de segundo nivel en Left 4 Dead 2, parecido al M16 pero con una cadencia algo mayor. Es el único con una mira de dos aumentos, que reduce su cadencia a cambio de precisión en distancias largas.",
    appearances: l4d2,
    sources: [l4dWiki("SG552", "SG 552")],
  },
  {
    id: "l4d2-desert-rifle",
    slug: "rifle-de-combate",
    name: "Rifle de combate (Desert Rifle)",
    category: "weapons",
    details: { slot: 1, ammo: "Munición de rifle" },
    summary:
      "Rifle de segundo nivel de Left 4 Dead 2 basado en el FN SCAR-L, también llamado «Desert Rifle». Tiene cargador de 60 balas y dispara en ráfagas de tres sin necesidad de pulsar el gatillo para cada ráfaga.",
    appearances: l4d2,
    sources: [l4dWiki("Desert_Rifle", "Desert Rifle")],
  },
  {
    id: "l4d-submachine-gun",
    slug: "subfusil",
    name: "Subfusil (Submachine Gun)",
    category: "weapons",
    details: { slot: 1, ammo: "Munición de subfusil" },
    summary:
      "Arma de primer nivel disponible al comienzo de casi todos los capítulos y la que recibe quien reaparece en un cuarto de rescate. Tiene el menor daño por disparo, pero la cadencia más alta. Su cargador es de 50 balas, con 480 de reserva en Left 4 Dead y 650 en Left 4 Dead 2.",
    appearances: both,
    sources: [l4dWiki("Submachine_Gun", "Submachine Gun")],
  },
  {
    id: "l4d2-silenced-smg",
    slug: "subfusil-silenciado",
    name: "Subfusil silenciado (Silenced Submachine Gun)",
    category: "weapons",
    details: { slot: 1, ammo: "Munición de subfusil" },
    summary:
      "Variante del subfusil en Left 4 Dead 2, con un silenciador y una linterna sujeta con bridas. Su cargador es de 50 balas y tiene 650 de reserva. Es letal en distancias cortas y menos preciso que el subfusil estándar a media distancia.",
    appearances: l4d2,
    sources: [l4dWiki("Silenced_Submachine_Gun", "Silenced Submachine Gun")],
  },
  {
    id: "l4d2-m60",
    slug: "m60",
    name: "M60",
    category: "weapons",
    details: { slot: 1, ammo: "Munición de ametralladora" },
    summary:
      "Arma de nivel especial introducida en The Passing. Lleva solo 150 balas y se descarta al agotarlas, igual que el lanzagranadas. Funciona como un rifle de asalto y puede matar a un infectado común de un solo tiro, desmembrándolo.",
    appearances: l4d2,
    sources: [l4dWiki("M60", "M60")],
  },
  {
    id: "l4d2-grenade-launcher",
    slug: "lanzagranadas",
    name: "Lanzagranadas (Grenade Launcher)",
    category: "weapons",
    details: { slot: 1, ammo: "Granadas" },
    summary:
      "Arma principal de un solo tiro que debuta en Left 4 Dead 2. Dispara una granada lenta con efecto de explosión que mata infectados comunes y especiales débiles cercanos; su recarga es larga y la trayectoria curva exige calcular la distancia.",
    appearances: l4d2,
    sources: [l4dWiki("Grenade_Launcher", "Grenade Launcher")],
  },
  {
    id: "l4d-m1911-pistol",
    slug: "pistola-m1911",
    name: "Pistola M1911",
    category: "weapons",
    details: { slot: 2, ammo: "Munición infinita" },
    summary:
      "Arma secundaria de los supervivientes en Left 4 Dead, que puede usarse con dos manos. Es el único arma que pueden usar al quedar incapacitados. Tiene munición infinita y un cargador de 15 balas.",
    appearances: l4d1,
    sources: [l4dWiki("M1911_Pistol", "M1911 Pistol")],
  },
  {
    id: "l4d2-p220-pistol",
    slug: "pistola-p220",
    name: "Pistola P220",
    category: "weapons",
    details: { slot: 2, ammo: "Munición infinita" },
    summary:
      "Arma secundaria de los supervivientes en Left 4 Dead 2, que sustituye a la M1911. Tiene munición infinita y un cargador de 15 balas, y se puede usar al quedar incapacitado con menos cadencia y precisión.",
    appearances: l4d2,
    sources: [l4dWiki("P220_Pistol", "P220 Pistol")],
  },
  {
    id: "l4d2-magnum",
    slug: "magnum",
    name: "Magnum",
    category: "weapons",
    details: { slot: 2, ammo: "Cargador de ocho balas" },
    summary:
      "El arma secundaria a distancia más potente de Left 4 Dead 2. Tiene solo ocho balas en el cargador y no se puede usar con dos manos, pero mata a un infectado común de un disparo en cualquier modo y dificultad.",
    appearances: l4d2,
    sources: [l4dWiki("Magnum", "Magnum")],
  },
  {
    id: "l4d2-katana",
    slug: "katana",
    name: "Katana",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo de Left 4 Dead 2 (algunos supervivientes la llaman «espada ninja» por error). Aparece en Dead Center, The Passing, Dark Carnival y Hard Rain.",
    appearances: l4d2,
    sources: [l4dWiki("Katana", "Katana")],
  },
  {
    id: "l4d2-machete",
    slug: "machete",
    name: "Machete",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo introducida en Left 4 Dead 2. Aparece en Swamp Fever y The Parish, y en las versiones portadas de Death Toll y Blood Harvest.",
    appearances: l4d2,
    sources: [l4dWiki("Machete", "Machete")],
  },
  {
    id: "l4d2-chainsaw",
    slug: "motosierra",
    name: "Motosierra (Chainsaw)",
    category: "weapons",
    details: { slot: 2, ammo: "Combustible limitado" },
    summary:
      "Arma cuerpo a cuerpo especial de Left 4 Dead 2. Inflige un daño constante de 100 diez veces por segundo, pero su depósito de combustible no se puede rellenar y también hiere a los compañeros que queden en su arco.",
    appearances: l4d2,
    sources: [l4dWiki("Chainsaw", "Chainsaw")],
  },
  {
    id: "l4d2-fire-axe",
    slug: "hacha-de-bombero",
    name: "Hacha de bombero (Fireaxe)",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo de Left 4 Dead 2. Se encuentra en Dead Center, The Passing, Dark Carnival y Swamp Fever.",
    appearances: l4d2,
    sources: [l4dWiki("Fire_Axe", "Fireaxe")],
  },
  {
    id: "l4d2-baseball-bat",
    slug: "bate-de-beisbol",
    name: "Bate de béisbol (Baseball Bat)",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo introducida en Left 4 Dead 2. Quienes reservaron el juego en las tiendas participantes obtuvieron además un bate exclusivo.",
    appearances: l4d2,
    sources: [
      l4dWiki("Baseball_Bat", "Baseball Bat"),
      wikipedia("Left_4_Dead_2", "Left 4 Dead 2"),
    ],
  },
  {
    id: "l4d2-cricket-bat",
    slug: "bate-de-criquet",
    name: "Bate de críquet (Cricket Bat)",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo de Left 4 Dead 2, también conocida como «paddle bat» o simplemente «paddle». Ocupa la ranura secundaria, igual que el resto de armas cuerpo a cuerpo.",
    appearances: l4d2,
    sources: [l4dWiki("Cricket_Bat", "Cricket Bat")],
  },
  {
    id: "l4d2-crowbar",
    slug: "palanca-l4d2",
    name: "Palanca (Crowbar)",
    category: "weapons",
    details: { slot: 2 },
    summary: "Arma cuerpo a cuerpo presente en Left 4 Dead 2.",
    appearances: l4d2,
    sources: [l4dWiki("Crowbar", "Crowbar")],
  },
  {
    id: "l4d2-electric-guitar",
    slug: "guitarra-electrica",
    name: "Guitarra eléctrica",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo rara de Left 4 Dead 2. Solo aparece en pocas campañas: Dark Carnival, The Parish y la versión portada de Dead Air.",
    appearances: l4d2,
    sources: [l4dWiki("Electric_Guitar", "Guitar")],
  },
  {
    id: "l4d2-nightstick",
    slug: "porra-policial",
    name: "Porra policial (Nightstick)",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma contundente de Left 4 Dead 2, también llamada «tonfa». Puede encontrarse suelta en los mapas o recogerse de los antidisturbios infectados y de los policías infectados comunes; no desmiembra a los infectados pero los lanza hacia atrás.",
    appearances: l4d2,
    sources: [l4dWiki("Nightstick", "Nightstick")],
  },
  {
    id: "l4d2-golf-club",
    slug: "palo-de-golf",
    name: "Palo de golf (Golf Club)",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo estrenada en The Passing. Fue exclusiva de esa campaña (y lo sigue siendo en la versión de Xbox 360); en PC puede aparecer, aunque pocas veces, en otras.",
    appearances: l4d2,
    sources: [l4dWiki("Golf_Club", "Golf Club")],
  },
  {
    id: "l4d2-pitchfork",
    slug: "horca",
    name: "Horca (Pitchfork)",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo introducida en The Last Stand Update de 2020, junto con la pala. Se añadió también a las campañas ya existentes.",
    appearances: l4d2,
    sources: [
      l4dWiki("Pitchfork", "Pitchfork"),
      l4dWiki(
        "The_Last_Stand_Community_Update",
        "The Last Stand Community Update",
      ),
    ],
  },
  {
    id: "l4d2-shovel",
    slug: "pala",
    name: "Pala (Shovel)",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Arma cuerpo a cuerpo introducida en The Last Stand Update de 2020, junto con la horca. Se añadió también a las campañas ya existentes.",
    appearances: l4d2,
    sources: [
      l4dWiki("Shovel", "Shovel"),
      l4dWiki(
        "The_Last_Stand_Community_Update",
        "The Last Stand Community Update",
      ),
    ],
  },
  {
    id: "l4d-molotov",
    slug: "coctel-molotov",
    name: "Cóctel molotov (Molotov)",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma arrojadiza que envuelve una zona en llamas durante unos 15 a 17 segundos. El fuego quema a todos los infectados que lo tocan; los infectados comunes arden hasta morir. Comparte ranura con la bomba de tubo y, en Left 4 Dead 2, con el bote de bilis.",
    appearances: both,
    sources: [l4dWiki("Molotov", "Molotov")],
  },
  {
    id: "l4d2-bile-bomb",
    slug: "bote-de-bilis",
    name: "Bote de bilis (Bile Bomb)",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Frasco arrojadizo con bilis de Boomer que aparece en Left 4 Dead 2. Al lanzarlo, atrae a los infectados hacia el punto de impacto durante unos 20 segundos. Se encuentra sobre todo en los dos primeros mapas de Dead Center y lo sueltan a veces los infectados de CEDA.",
    appearances: l4d2,
    sources: [l4dWiki("Bile_Bomb", "Bile Bomb")],
  },
  {
    id: "l4d-first-aid-kit",
    slug: "botiquin",
    name: "Botiquín (First Aid Kit)",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Objeto curativo principal. Tarda cinco segundos en usarse (tres con adrenalina en Left 4 Dead 2) y restaura el 80 % de la salud que falta. Siempre hay botiquines en las salas seguras y en los finales; el Director genera más si el equipo está herido.",
    appearances: both,
    sources: [l4dWiki("Healing_items", "Healing items")],
  },
  {
    id: "l4d2-defibrillator",
    slug: "desfibrilador",
    name: "Desfibrilador (Defibrillator)",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Unidad de un solo uso exclusiva de Left 4 Dead 2 que revive a un superviviente muerto. Tarda tres segundos en usarse y el compañero vuelve con 50 de salud permanente, sin objetos salvo su arma secundaria. No se puede llevar a la vez que un botiquín.",
    appearances: l4d2,
    sources: [l4dWiki("Healing_items", "Healing items")],
  },
  {
    id: "l4d-pain-pills",
    slug: "pastillas-analgesicas",
    name: "Pastillas analgésicas (Pain Pills)",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Dan 50 puntos de salud temporal, que bajan uno cada tres segundos y duran unos 150 segundos como máximo. Se pueden entregar a un compañero con el botón de golpe y eliminan las penalizaciones de velocidad si la salud total supera 40.",
    appearances: both,
    sources: [l4dWiki("Healing_items", "Healing items")],
  },
  {
    id: "l4d2-adrenaline",
    slug: "adrenalina",
    name: "Inyección de adrenalina (Adrenaline Shot)",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Objeto de Left 4 Dead 2 en la ranura de salud temporal. Según su descripción oficial, otorga un impulso de quince segundos que permite correr más rápido, usar objetos en la mitad de tiempo y atravesar infectados sin que los golpes ralenticen.",
    appearances: l4d2,
    sources: [l4dWiki("Healing_items", "Healing items")],
  },
];

export const left4DeadMoreCharacters: Entry[] = [
  {
    id: "l4d2-whitaker",
    slug: "whitaker",
    name: "Whitaker",
    category: "characters",
    details: {
      affiliation: "Civil superviviente (Savannah)",
      voiceActor: "Dayton Callie",
    },
    summary:
      "Superviviente de 60 años dueño de una armería frente al Liberty Mall, en Dead Center. Atrincherado en su tejado con munición y provisiones, ofrece despejar el bloqueo de la carretera si los supervivientes le llevan un paquete de seis cervezas de cola del supermercado cercano.",
    appearances: l4d2,
    sources: [l4dWiki("NPCs", "NPCs")],
  },
  {
    id: "l4d2-virgil",
    slug: "virgil",
    name: "Virgil",
    category: "characters",
    details: { affiliation: "Civil cajún del sur de Luisiana" },
    summary:
      "Pescador cajún, simpático y solidario, capitán del barco que rescata a los supervivientes al final de Swamp Fever. Los acompaña después hacia Nueva Orleans y les pide que consigan combustible para su barco en Hard Rain.",
    appearances: l4d2,
    sources: [
      l4dWiki("Swamp_Fever", "Swamp Fever"),
      l4dWiki("Hard_Rain", "Hard Rain"),
    ],
  },
  {
    id: "l4d-church-guy",
    slug: "hombre-de-la-iglesia",
    name: "El hombre de la iglesia (Church Guy)",
    category: "characters",
    details: {
      affiliation: "Civil de Riverside",
      voiceActor: "Nathan Vetterlein",
    },
    summary:
      "Hombre desequilibrado que se encierra en la sala segura de la iglesia de Riverside, en Death Toll, por miedo a la infección. Repite «Better safe than sorry» y hace sonar la campana para atraer una horda como prueba de que los supervivientes son inmunes. Nunca se le ve antes de que se infecte.",
    appearances: both,
    sources: [l4dWiki("NPCs", "NPCs")],
  },
];

export const left4DeadMoreExtras: Entry[] = [
  {
    id: "l4d-turtle-rock-and-valve",
    slug: "turtle-rock-y-valve",
    name: "Turtle Rock Studios y el origen de Left 4 Dead",
    category: "trivia",
    summary:
      "El concepto salió de «Terror Strike», un mod que Turtle Rock Studios creó para Counter-Strike: Condition Zero, donde cuatro jugadores defendían una bomba de oleadas de enemigos. Con la aprobación de Valve, el desarrollo de Left 4 Dead empezó a mediados de 2005. Valve adquirió Turtle Rock el 10 de enero de 2008 y el estudio se conoció como Valve South entre 2008 y 2010.",
    appearances: l4d1,
    sources: [
      wikipedia("Left_4_Dead", "Left 4 Dead"),
      wikipedia("Turtle_Rock_Studios", "Turtle Rock Studios"),
    ],
  },
  {
    id: "l4d-screamer-cut-infected",
    slug: "screamer-infectado-descartado",
    name: "El «Screamer», infectado descartado",
    category: "trivia",
    summary:
      "En las primeras fases del desarrollo existió otro infectado especial, el «Screamer». No atacaba: al ver a un superviviente corría a un lugar seguro y lanzaba un grito que atraía a una horda. Se eliminó tras las pruebas de juego y su capacidad de atraer hordas se incorporó al vómito del Boomer.",
    appearances: l4d1,
    sources: [wikipedia("Left_4_Dead", "Left 4 Dead")],
  },
  {
    id: "l4d2-boycott",
    slug: "boicot-a-left-4-dead-2",
    name: "El boicot a Left 4 Dead 2 (2009)",
    category: "trivia",
    summary:
      "Tras el anuncio de Left 4 Dead 2 en el E3 de 2009, algunos jugadores del primer juego crearon un grupo de Steam, «L4D2 Boycott», que superó los 10.000 miembros en un fin de semana y más de 37.000 al mes. Valve invitó a dos de sus miembros a probar el juego en septiembre de 2009, y los organizadores dieron por terminada la protesta el 14 de octubre de 2009, tras recibir contenido nuevo como Crash Course.",
    appearances: l4d2,
    sources: [wikipedia("Left_4_Dead_2", "Left 4 Dead 2")],
  },
  {
    id: "l4d-sacrifice-comic",
    slug: "comic-the-sacrifice",
    name: "El cómic digital The Sacrifice",
    category: "trivia",
    summary:
      "Valve publicó un cómic digital de 190 páginas, dibujado por Mike Oeming, en cuatro partes. La primera salió el 14 de septiembre de 2010 y servía de preámbulo de la campaña The Sacrifice. Cuenta la historia de los supervivientes originales antes y después de los hechos de Left 4 Dead.",
    appearances: both,
    sources: [
      wikipedia("Left_4_Dead", "Left 4 Dead"),
      l4dWiki("The_Sacrifice", "The Sacrifice"),
    ],
  },
  {
    id: "l4d-green-flu",
    slug: "gripe-verde",
    name: "La Gripe Verde y los portadores",
    category: "trivia",
    summary:
      "La Gripe Verde (la «Infección») es el virus que provoca la epidemia: convierte a los afectados en seres agresivos y homicidas con una patología similar a la rabia. La wiki señala que la etiqueta de «gripe» parece una tapadera de CEDA para evitar el pánico. En raros casos la persona no cambia y se convierte en «portador» asintomático, con capacidad de contagiar a otros.",
    appearances: both,
    sources: [
      l4dWiki("Green_Flu", "Green Flu"),
      l4dWiki("Carriers", "Carriers"),
    ],
  },
  {
    id: "l4d-ceda",
    slug: "ceda",
    name: "CEDA (Civil Emergency and Defense Agency)",
    category: "trivia",
    summary:
      "Agencia ficticia del gobierno de EE. UU. basada en la FEMA y los CDC. Gestiona los centros de evacuación que los supervivientes encuentran en Left 4 Dead 2 (el hotel Vannah, el Liberty Mall, Whispering Oaks o Nueva Orleans). En la historia, protege a los estadounidenses desde 1988.",
    appearances: both,
    sources: [l4dWiki("CEDA", "CEDA")],
  },
  {
    id: "l4d-crescendo-events",
    slug: "eventos-de-crescendo",
    name: "Eventos de crescendo",
    category: "trivia",
    summary:
      "Acciones que provocan una gran oleada de infectados comunes, normalmente un ruido fuerte o una luz que los atrae. Funcionan como mini-finales y siempre llevan infectados especiales entre la multitud. Left 4 Dead 2 añadió los eventos «gauntlet», en los que la horda aparece sin parar mientras se avanza.",
    appearances: both,
    sources: [l4dWiki("Crescendo_Event", "Crescendo Event")],
  },
  {
    id: "l4d-versus-mode",
    slug: "modo-versus",
    name: "Modo Versus",
    category: "trivia",
    summary:
      "Modo competitivo en el que dos equipos de cuatro jugadores alternan los papeles de supervivientes e infectados especiales. Cada ronda tiene dos turnos y solo puntúa el equipo que juega como supervivientes. Se juega en dificultad Normal.",
    appearances: both,
    sources: [l4dWiki("Versus", "Versus")],
  },
  {
    id: "l4d-survival-mode",
    slug: "modo-supervivencia",
    name: "Modo Supervivencia (Survival)",
    category: "trivia",
    summary:
      "Modo estrenado con el Survival Pack, publicado el 21 de abril de 2009. Una oleada tras otra de infectados ataca a los supervivientes hasta que caen todos o quedan incapacitados; no se gana, se mide el tiempo resistido y se otorgan medallas. Incluyó el mapa «The Lighthouse», de la campaña The Last Stand.",
    appearances: both,
    sources: [
      l4dWiki("Survival_Mode", "Survival Mode"),
      l4dWiki("Gameplay_Modes", "Gameplay Modes"),
    ],
  },
  {
    id: "l4d2-scavenge-mode",
    slug: "modo-scavenge",
    name: "Modo Scavenge",
    category: "trivia",
    summary:
      "Modo competitivo por rondas de Left 4 Dead 2. Los supervivientes buscan bidones de gasolina para repostar un generador o un coche, mientras los infectados especiales son controlados por jugadores. El equipo que gane más rondas gana la partida, no el que recoja más bidones en total.",
    appearances: l4d2,
    sources: [l4dWiki("Scavenge_Mode", "Scavenge Mode")],
  },
  {
    id: "l4d2-realism-mode",
    slug: "modo-realismo",
    name: "Modo Realismo (Realism)",
    category: "trivia",
    summary:
      "Versión más difícil del modo campaña de Left 4 Dead 2, que puede jugarse en cualquier dificultad. Quita los contornos que muestran a los compañeros a través de las paredes, hace que los infectados comunes reciban menos daño en el cuerpo y elimina los cuartos de rescate, de modo que solo el desfibrilador puede revivir a un muerto hasta la sala segura. Las Witch matan al instante salvo en Fácil.",
    appearances: l4d2,
    sources: [
      l4dWiki("Difficulty", "Difficulty"),
      l4dWiki("Gameplay_Modes", "Gameplay Modes"),
    ],
  },
  {
    id: "l4d2-mutations",
    slug: "mutaciones",
    name: "Mutaciones (Mutations)",
    category: "trivia",
    summary:
      "Variantes del modo de juego que cambian reglas: qué infectados aparecen, qué armas llevan los supervivientes o qué objetos curativos se pueden usar. La primera se publicó con The Passing y se renovaban cada semana con un anuncio en el blog del juego. Todas quedaron disponibles de forma permanente el 24 de julio de 2012. Realism Versus fue la primera y se hizo modo oficial el 21 de mayo de 2010.",
    appearances: l4d2,
    sources: [
      l4dWiki("Mutations", "Mutations"),
      l4dWiki("Gameplay_Modes", "Gameplay Modes"),
    ],
  },
  {
    id: "l4d2-fixed-weapons-and-explosives",
    slug: "armas-fijas-y-explosivos",
    name: "Armas fijas y objetos explosivos",
    category: "trivia",
    summary:
      "En los finales hay ametralladoras pesadas fijas, con munición ilimitada pero con riesgo de sobrecalentarse; en Left 4 Dead 2 sustituyen a la minigun del primer juego. Los supervivientes también pueden usar bidones de gasolina, bombonas de propano y tanques de oxígeno, que explotan al ser alcanzados. El barril explosivo se añadió con The Sacrifice.",
    appearances: both,
    sources: [
      l4dWiki("Heavy_Machine_Gun", "Heavy Machine Gun"),
      l4dWiki("Gas_can", "Gas can"),
      l4dWiki("Propane_tank", "Propane tank"),
      l4dWiki("Oxygen_tank", "Oxygen tank"),
      l4dWiki("Explosive_barrel", "Explosive barrel"),
    ],
  },
  {
    id: "l4d2-midnight-riders",
    slug: "midnight-riders",
    name: "Midnight Riders",
    category: "trivia",
    summary:
      "Banda de hard rock ficticia de Left 4 Dead. Era famosa por sus espectáculos pirotécnicos y debía actuar en el Peach Pit de Whispering Oaks, pero el concierto se canceló por la infección. Sus canciones «One Bad Man» y «Midnight Ride» suenan en una máquina de discos de una cafetería.",
    appearances: l4d2,
    sources: [l4dWiki("Midnight_Riders", "Midnight Riders")],
  },
  {
    id: "l4d2-unreleased-maps",
    slug: "mapas-sin-publicar",
    name: "Mapas sin publicar en los archivos",
    category: "trivia",
    summary:
      "Los archivos de ambos juegos conservan restos de contenido no usado. En Left 4 Dead hay un mapa llamado «Tutorial Standards», pensado como tercer capítulo de Dead Air con el título «The Garage». En Left 4 Dead 2, la primera versión de The Parish combinaba The Waterfront y The Park y su mapa se puede jugar escribiendo «map c5m1_waterfront_sndscape» en la consola.",
    appearances: both,
    sources: [
      l4dWiki("Dead_Air", "Dead Air"),
      l4dWiki("The_Parish", "The Parish"),
    ],
  },
  {
    id: "l4d2-cold-stream-community",
    slug: "cold-stream-campana-de-la-comunidad",
    name: "Cold Stream: una campaña de la comunidad",
    category: "trivia",
    summary:
      "Cold Stream nació como campaña de la comunidad, creada por Matthew «donking» Lourdelet, con música de Stephan «CosmicD» Vandenborn. Valve la publicó en beta el 22 de marzo de 2011 y la lanzó en versión final el 24 de julio de 2012 (en Xbox el 3 de agosto de 2012). Incluyó también los portados de Death Toll, Dead Air, Blood Harvest y Crash Course.",
    appearances: l4d2,
    sources: [l4dWiki("Cold_Stream", "Cold Stream")],
  },
  {
    id: "l4d2-last-stand-update",
    slug: "last-stand-community-update",
    name: "The Last Stand Community Update",
    category: "trivia",
    summary:
      "Cuarto contenido descargable de Left 4 Dead 2, publicado el 24 de septiembre de 2020 y creado por miembros de la comunidad. Incluye la campaña The Last Stand, el modo Versus Survival en el menú principal, nuevos mapas de Supervivencia y Scavenge, 30 logros nuevos, las mutaciones RocketDude y Tank Run, y la pala y la horca. Es exclusiva de PC.",
    appearances: l4d2,
    sources: [
      l4dWiki(
        "The_Last_Stand_Community_Update",
        "The Last Stand Community Update",
      ),
    ],
  },
  {
    id: "l4d2-gnome-chompski",
    slug: "gnomo-chompski",
    name: "Gnomo Chompski en Dark Carnival",
    category: "easter-eggs",
    summary:
      "El gnomo de jardín que debutó en Half-Life 2: Episode Two aparece como arma improvisada en Dark Carnival. Se consigue con más de 750 puntos en el minijuego de tiro de The Fairgrounds y hay que llevarlo hasta el helicóptero de The Concert para el logro «Guardin' Gnome». También cuenta con su propia mutación, «Last Gnome on Earth».",
    appearances: l4d2,
    sources: [l4dWiki("Gnome_Chompski", "Gnome Chompski")],
  },
  {
    id: "l4d2-tank-concert-songs",
    slug: "one-bad-tank",
    name: "«One Bad Tank» y «Midnight Tank»",
    category: "easter-eggs",
    summary:
      "Cuando aparece un Tank durante el concierto de Midnight Riders en el Peach Pit, suenan versiones alternativas de las canciones de la banda: «One Bad Tank» y «Midnight Tank», en lugar de «One Bad Man» y «Midnight Ride».",
    appearances: l4d2,
    sources: [l4dWiki("Midnight_Riders", "Midnight Riders")],
  },
  {
    id: "l4d2-golden-crowbar-junkyard",
    slug: "palanca-dorada-the-junkyard",
    name: "La palanca dorada de The Junkyard",
    category: "easter-eggs",
    summary:
      "En The Junkyard hay una casa en ruinas junto al molino de agua con una habitación cerrada al fondo. Si se golpea la puerta con un arma cuerpo a cuerpo hasta romperla, aparece un cadáver ante un ordenador y los nombres del equipo de la Community Update escritos en las paredes. Pulsar el teclado da una palanca dorada y desbloquea el logro «Household Names».",
    appearances: l4d2,
    sources: [l4dWiki("The_Junkyard", "The Junkyard")],
  },
];
