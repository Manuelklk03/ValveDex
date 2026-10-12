import type { Entry } from "@/domain/entry";

export const entries: Entry[] = [
  {
    id: "crowbar",
    slug: "palanca",
    name: "Palanca",
    category: "weapons",
    summary:
      "Arma cuerpo a cuerpo de Gordon Freeman y primera que consigue en el juego.",
    appearances: [{ gameId: "half-life" }],
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
    appearances: [{ gameId: "half-life" }],
    sources: [
      {
        title: "9mm Pistol (Half-Life) - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/9mm_Pistol_(Half-Life)",
      },
    ],
  },
  {
    id: "colt-python",
    slug: "revolver-357",
    name: "Revólver .357",
    category: "weapons",
    summary: "Revólver de gran potencia y cargador de seis balas.",
    appearances: [{ gameId: "half-life" }],
    sources: [
      {
        title: ".357 Magnum - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/.357_Magnum",
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
        images: {
          hd: {
            src: "/images/entries/spas-12-half-life.jpg",
            alt: "Modelo HD de la escopeta de Half-Life",
            width: 731,
            height: 453,
            source: {
              title: "File:W shotgun hd.jpg - Combine OverWiki",
              url: "https://combineoverwiki.net/wiki/File:W_shotgun_hd.jpg",
            },
            credit: "Modelo del Half-Life High Definition Pack",
            license: "Material del juego © Valve",
          },
        },
      },
    ],
    sources: [
      {
        title: "Shotgun (Half-Life) - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Shotgun_(Half-Life)",
      },
    ],
  },
];
