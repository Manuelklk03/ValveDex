import type { Game } from "@/domain/game";

export const games: Game[] = [
  {
    id: "half-life",
    slug: "half-life",
    universeId: "half-life",
    name: "Half-Life",
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
];
