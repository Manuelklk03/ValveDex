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
];
