import type { Game } from "@/domain/game";

export const games: Game[] = [
  {
    id: "half-life",
    slug: "half-life",
    universeId: "half-life",
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
      },
    ],
  },
  {
    id: "half-life-opposing-force",
    slug: "opposing-force",
    universeId: "half-life",
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
      },
    ],
  },
  {
    id: "half-life-blue-shift",
    slug: "blue-shift",
    universeId: "half-life",
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
      },
    ],
  },
];
