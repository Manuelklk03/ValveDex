import type { Game } from "@/domain/game";

export const games: Game[] = [
  {
    id: "half-life",
    slug: "half-life",
    universeId: "half-life",
    stageId: "goldsrc",
    status: "released",
    // «1» para distinguirlo del universo Half-Life y de Half-Life 2 (decisión de Manuel)
    name: "Half-Life 1",
    releaseYear: 1998,
    developer: "Valve",
    description:
      "Gordon Freeman, científico de Black Mesa, sobrevive a un experimento fallido que abre un portal a Xen.",
    sources: [
      {
        title: "Half-Life - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Half-Life",
        kind: "wiki",
      },
    ],
  },
  {
    id: "half-life-opposing-force",
    slug: "opposing-force",
    universeId: "half-life",
    stageId: "goldsrc",
    name: "Half-Life: Opposing Force",
    status: "released",
    releaseYear: 1999,
    developer: "Gearbox Software",
    description:
      "Expansión protagonizada por Adrian Shephard, un marine enviado a Black Mesa.",
    sources: [
      {
        title: "Half-Life: Opposing Force - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Half-Life:_Opposing_Force",
        kind: "wiki",
      },
    ],
  },
  {
    id: "half-life-blue-shift",
    slug: "blue-shift",
    universeId: "half-life",
    stageId: "goldsrc",
    name: "Half-Life: Blue Shift",
    status: "released",
    releaseYear: 2001,
    developer: "Gearbox Software",
    description:
      "Expansión protagonizada por Barney Calhoun, guardia de seguridad de Black Mesa.",
    sources: [
      {
        title: "Half-Life: Blue Shift - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Half-Life:_Blue_Shift",
        kind: "wiki",
      },
    ],
  },
  {
    id: "sven-co-op",
    slug: "sven-co-op",
    universeId: "half-life",
    name: "Sven Co-op",
    status: "released",
    releaseYear: 1999,
    developer: "Sven Co-op Team",
    description:
      "Mod cooperativo de Half-Life: varios jugadores recorren juntos mapas y campañas contra los enemigos del juego.",
    baseGameId: "half-life",
    sources: [
      {
        title: "Sven Co-op - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Sven_Co-op",
        kind: "wiki",
      },
    ],
  },
  {
    id: "half-life-dreamcast",
    slug: "half-life-dreamcast",
    universeId: "half-life",
    name: "Half-Life para Dreamcast",
    status: "cancelled",
    cancelledYear: 2001,
    developer: "Gearbox Software y Captivation Digital Laboratories",
    description:
      "Versión de Half-Life para Dreamcast con contenido nuevo, cancelada el 15 de junio de 2001, pocas semanas antes de su lanzamiento previsto.",
    baseGameId: "half-life",
    sources: [
      {
        title: "Half-Life Dreamcast - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life_Dreamcast",
        kind: "wiki",
      },
    ],
  },
  {
    id: "half-life-decay",
    slug: "decay",
    universeId: "half-life",
    stageId: "goldsrc",
    name: "Half-Life: Decay",
    status: "released",
    releaseYear: 2001,
    developer: "Gearbox Software",
    description:
      "Expansión cooperativa exclusiva de PlayStation 2 protagonizada por las doctoras Gina Cross y Colette Green, científicas del laboratorio de Materiales Anómalos de Black Mesa.",
    sources: [
      {
        title: "Half-Life: Decay - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life:_Decay",
        kind: "wiki",
      },
    ],
  },
  {
    id: "half-life-2",
    slug: "half-life-2",
    universeId: "half-life",
    stageId: "source",
    status: "released",
    releaseYear: 2004,
    developer: "Valve",
    name: "Half-Life 2",
    description:
      "Gordon Freeman despierta años después en la Ciudad 17, bajo la ocupación de la Alianza, y se une a la Resistencia para liberar la Tierra.",
    sources: [
      {
        title: "Half-Life 2 - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life_2",
        kind: "wiki",
      },
    ],
  },
  {
    id: "half-life-2-episode-one",
    slug: "episode-one",
    universeId: "half-life",
    stageId: "source",
    status: "released",
    releaseYear: 2006,
    developer: "Valve",
    name: "Half-Life 2: Episode One",
    description:
      "Continuación directa de Half-Life 2: Gordon Freeman y Alyx Vance vuelven a entrar en la Ciudadela, cuyo núcleo está a punto de estallar, para huir después de la Ciudad 17.",
    sources: [
      {
        title: "Half-Life 2: Episode One - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life_2:_Episode_One",
        kind: "wiki",
      },
    ],
  },
  {
    id: "half-life-2-episode-two",
    slug: "episode-two",
    universeId: "half-life",
    stageId: "source",
    status: "released",
    releaseYear: 2007,
    developer: "Valve",
    name: "Half-Life 2: Episode Two",
    description:
      "Gordon Freeman y Alyx Vance cruzan las afueras de la Ciudad 17 hacia White Forest, una base de la Resistencia, con los datos robados de la Ciudadela para cerrar el superportal de la Alianza.",
    sources: [
      {
        title: "Half-Life 2: Episode Two - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life_2:_Episode_Two",
        kind: "wiki",
      },
    ],
  },
  {
    id: "half-life-alyx",
    slug: "alyx",
    universeId: "half-life",
    stageId: "source-2",
    status: "released",
    releaseYear: 2020,
    developer: "Valve",
    name: "Half-Life: Alyx",
    description:
      "Alyx Vance y su padre Eli investigan la Zona de Cuarentena de la Ciudad 17 para robar un arma de la Alianza antes de los eventos de Half-Life 2.",
    sources: [
      {
        title: "Half-Life: Alyx - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life:_Alyx",
        kind: "wiki",
      },
    ],
  },
  {
    id: "team-fortress-classic",
    slug: "team-fortress-classic",
    universeId: "team-fortress",
    stageId: "goldsrc-tf",
    status: "released",
    releaseYear: 1999,
    developer: "Valve",
    name: "Team Fortress Classic",
    description:
      "Adaptación oficial del mod QuakeTeam Fortress a Half-Life: nueve clases, dos equipos y mapas de captura de bandera y control de puntos.",
    sources: [
      {
        title: "Team Fortress Classic - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Team_Fortress_Classic",
        kind: "wiki",
      },
    ],
  },
  {
    id: "team-fortress-2",
    slug: "team-fortress-2",
    universeId: "team-fortress",
    stageId: "source-tf",
    status: "released",
    releaseYear: 2007,
    developer: "Valve",
    name: "Team Fortress 2",
    description:
      "Shooter por equipos gratuito con nueve clases, estilo artístico único, humor característico y miles de objetos cosméticos.",
    sources: [
      {
        title: "Team Fortress 2 - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Team_Fortress_2",
        kind: "wiki",
      },
    ],
  },
  {
    id: "left-4-dead",
    slug: "left-4-dead",
    universeId: "left-4-dead",
    stageId: "source-l4d",
    status: "released",
    releaseYear: 2008,
    developer: "Valve",
    name: "Left 4 Dead",
    description:
      "Cuatro supervivientes cruzan Pensilvania mientras la IA Director gestiona hordas, objetos y eventos para una experiencia única cada partida.",
    sources: [
      {
        title: "Left 4 Dead - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Left_4_Dead",
        kind: "wiki",
      },
    ],
  },
  {
    id: "left-4-dead-2",
    slug: "left-4-dead-2",
    universeId: "left-4-dead",
    stageId: "source-l4d",
    status: "released",
    releaseYear: 2009,
    developer: "Valve",
    name: "Left 4 Dead 2",
    description:
      "Cuatro nuevos supervivientes en el sur de EE. UU., con armas cuerpo a cuerpo, granadas, nuevos infectados especiales y campañas más largas.",
    sources: [
      {
        title: "Left 4 Dead 2 - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Left_4_Dead_2",
        kind: "wiki",
      },
    ],
  },
  {
    id: "portal",
    slug: "portal",
    universeId: "portal",
    stageId: "source-portal",
    status: "released",
    releaseYear: 2007,
    developer: "Valve",
    name: "Portal",
    description:
      "Chell recorre las cámaras de pruebas de Aperture Science con un dispositivo capaz de abrir dos portales enlazados, bajo la vigilancia de la inteligencia artificial GLaDOS.",
    sources: [
      {
        title: "Portal - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Portal_(video_game)",
        kind: "wiki",
      },
    ],
  },
  {
    id: "portal-2",
    slug: "portal-2",
    universeId: "portal",
    stageId: "source-portal",
    status: "released",
    releaseYear: 2011,
    developer: "Valve",
    name: "Portal 2",
    description:
      "Secuela con modo cooperativo para dos jugadores, geles que cambian las propiedades de las superficies y un complejo de Aperture Science mucho más grande que el del primer juego.",
    sources: [
      {
        title: "Portal 2 - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Portal_2",
        kind: "wiki",
      },
    ],
  },
  {
    id: "counter-strike",
    slug: "counter-strike",
    universeId: "counter-strike",
    stageId: "goldsrc-cs",
    status: "released",
    releaseYear: 2000,
    developer: "Minh Le, Jess Cliffe y Valve",
    name: "Counter-Strike 1.6",
    description:
      "Shooter táctico por rondas nacido como mod de Half-Life: terroristas y antiterroristas compran su equipo cada ronda y se enfrentan para colocar o desactivar una bomba o rescatar rehenes.",
    sources: [
      {
        title: "Counter-Strike - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Counter-Strike",
        kind: "wiki",
      },
    ],
  },
  {
    id: "counter-strike-condition-zero",
    slug: "counter-strike-condition-zero",
    universeId: "counter-strike",
    stageId: "goldsrc-cs",
    status: "released",
    releaseYear: 2004,
    developer: "Ritual Entertainment, Turtle Rock Studios y Valve",
    name: "Counter-Strike: Condition Zero",
    description:
      "Continuación de Counter-Strike en GoldSrc, con multijugador renovado y la campaña para un jugador Tour of Duty contra bots.",
    sources: [
      {
        title: "Counter-Strike: Condition Zero - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Counter-Strike:_Condition_Zero",
        kind: "wiki",
      },
    ],
  },
  {
    id: "counter-strike-condition-zero-deleted-scenes",
    slug: "counter-strike-condition-zero-deleted-scenes",
    universeId: "counter-strike",
    stageId: "goldsrc-cs",
    status: "released",
    releaseYear: 2004,
    developer: "Ritual Entertainment y Valve",
    name: "Counter-Strike: Condition Zero – Deleted Scenes",
    description:
      "Campaña para un jugador de Condition Zero desarrollada por Ritual Entertainment, con misiones propias y distinta de Tour of Duty.",
    sources: [
      {
        title: "Condition Zero: Deleted Scenes - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Counter-Strike:_Condition_Zero_Deleted_Scenes",
        kind: "wiki",
      },
      {
        title: "Counter-Strike: Condition Zero Deleted Scenes en Steam",
        url: "https://store.steampowered.com/app/100/CounterStrike_Condition_Zero_Deleted_Scenes/",
        kind: "official",
      },
    ],
  },
  {
    id: "counter-strike-source",
    slug: "counter-strike-source",
    universeId: "counter-strike",
    stageId: "source-cs",
    status: "released",
    releaseYear: 2004,
    developer: "Valve",
    name: "Counter-Strike: Source",
    description:
      "Reedición de Counter-Strike para el motor Source, con física, gráficos nuevos y los mapas clásicos rehechos.",
    sources: [
      {
        title: "Counter-Strike: Source - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Counter-Strike:_Source",
        kind: "wiki",
      },
    ],
  },
  {
    id: "counter-strike-global-offensive",
    slug: "counter-strike-global-offensive",
    universeId: "counter-strike",
    stageId: "source-cs",
    status: "released",
    releaseYear: 2012,
    developer: "Valve y Hidden Path Entertainment",
    name: "Counter-Strike: Global Offensive",
    description:
      "Cuarta entrega de la serie, con nuevos modos de juego, objetos cosméticos y una escena competitiva profesional.",
    sources: [
      {
        title: "Counter-Strike: Global Offensive - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Counter-Strike:_Global_Offensive",
        kind: "wiki",
      },
    ],
  },
  {
    id: "counter-strike-2",
    slug: "counter-strike-2",
    universeId: "counter-strike",
    stageId: "source-2-cs",
    status: "released",
    releaseYear: 2023,
    developer: "Valve",
    name: "Counter-Strike 2",
    description:
      "Evolución de Global Offensive para Source 2, con humo y granadas que reaccionan al mapa y servidores con actualización constante.",
    sources: [
      {
        title: "Counter-Strike 2 - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Counter-Strike_2",
        kind: "wiki",
      },
    ],
  },
];
