import type { Entry } from "@/domain/entry";

export const entries: Entry[] = [
  {
    id: "crowbar",
    slug: "palanca",
    name: "Palanca",
    category: "weapons",
    summary:
      "Arma cuerpo a cuerpo de Gordon Freeman y primera que consigue en el juego.",
    appearances: [
      {
        gameId: "half-life",
      },
    ],
    sources: [
      {
        title: "Crowbar - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Crowbar",
      },
    ],
  },
  {
    id: "glock-17",
    slug: "pistola-9mm",
    name: "Pistola de 9 mm",
    category: "weapons",
    summary:
      "Pistola semiautomática estándar del personal de seguridad de Black Mesa.",
    appearances: [
      {
        gameId: "half-life",
      },
    ],
    sources: [
      {
        title: "Glock 17 - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Glock_17",
      },
    ],
  },
  {
    id: "colt-python",
    slug: "revolver-357",
    name: "Revólver .357",
    category: "weapons",
    summary: "Revólver de gran potencia y cargador de seis balas.",
    appearances: [
      {
        gameId: "half-life",
      },
    ],
    sources: [
      {
        title: "Colt Python - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Colt_Python",
      },
    ],
  },
  {
    id: "spas-12",
    slug: "escopeta",
    name: "Escopeta",
    category: "weapons",
    summary: "Escopeta con disparo simple y doble, eficaz a corta distancia.",
    appearances: [
      {
        gameId: "half-life",
      },
    ],
    sources: [
      {
        title: "SPAS-12 - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/SPAS-12",
      },
    ],
  },
];
