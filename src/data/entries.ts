import type { Entry } from "@/domain/entry";
import { halfLifeChapters } from "./half-life-chapters";

export const entries: Entry[] = [
  ...halfLifeChapters,
  {
    id: "crowbar",
    slug: "palanca",
    name: "Palanca",
    category: "weapons",
    details: { slot: 1 },
    summary:
      "Arma cuerpo a cuerpo de Gordon Freeman y primera que consigue en el juego.",
    appearances: [{ gameId: "half-life" }],
    sources: [
      {
        title: "Crowbar - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Crowbar",
        kind: "wiki",
      },
    ],
  },
  {
    id: "glock-17",
    slug: "pistola-9mm",
    name: "Pistola de 9 mm",
    category: "weapons",
    details: { slot: 2, ammo: "9 mm" },
    summary:
      "Pistola semiautomática estándar del personal de seguridad de Black Mesa.",
    appearances: [{ gameId: "half-life" }],
    sources: [
      {
        title: "9mm Pistol (Half-Life) - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/9mm_Pistol_(Half-Life)",
        kind: "wiki",
      },
    ],
  },
  {
    id: "colt-python",
    slug: "revolver-357",
    name: "Revólver .357",
    category: "weapons",
    details: { slot: 2, ammo: ".357 Magnum" },
    summary: "Revólver de gran potencia y cargador de seis balas.",
    appearances: [{ gameId: "half-life" }],
    sources: [
      {
        title: ".357 Magnum - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/.357_Magnum",
        kind: "wiki",
      },
    ],
  },
  {
    id: "spas-12",
    slug: "escopeta",
    name: "Escopeta",
    category: "weapons",
    details: { slot: 3, ammo: "Cartuchos del calibre 12" },
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
              kind: "wiki",
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
        kind: "wiki",
      },
    ],
  },
  {
    id: "gordon-freeman",
    slug: "gordon-freeman",
    name: "Gordon Freeman",
    category: "characters",
    details: { affiliation: "Black Mesa" },
    summary:
      "Físico teórico de Black Mesa y protagonista de Half-Life, equipado con el traje HEV.",
    appearances: [
      { gameId: "half-life" },
      {
        gameId: "half-life-opposing-force",
        summary:
          "Adrian Shephard lo ve teletransportarse a Xen en el complejo Lambda.",
      },
      {
        gameId: "half-life-blue-shift",
        summary:
          "Barney Calhoun lo ve varias veces, entre ellas esperando el tranvía y cuando los marines se lo llevan.",
      },
    ],
    sources: [
      {
        title: "Gordon Freeman - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Gordon_Freeman",
        kind: "wiki",
      },
    ],
  },
  {
    id: "headcrab",
    slug: "headcrab",
    name: "Headcrab",
    category: "enemies",
    details: { origin: "Xen" },
    summary:
      "Criatura de Xen que salta a la cabeza de sus víctimas y las convierte en zombis.",
    appearances: [
      { gameId: "half-life" },
      { gameId: "half-life-opposing-force" },
      { gameId: "half-life-blue-shift" },
    ],
    sources: [
      {
        title: "Headcrab - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Headcrab",
        kind: "wiki",
      },
    ],
  },
  {
    id: "goldsrc-engine",
    slug: "motor-goldsrc",
    name: "El motor GoldSrc",
    category: "trivia",
    summary:
      "Half-Life y sus expansiones funcionan con GoldSrc, una versión muy modificada del motor de Quake.",
    appearances: [
      { gameId: "half-life" },
      { gameId: "half-life-opposing-force" },
      { gameId: "half-life-blue-shift" },
    ],
    sources: [
      {
        title: "GoldSrc - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/GoldSrc",
        kind: "wiki",
      },
    ],
  },
  {
    id: "gordon-employee-of-the-month",
    slug: "gordon-empleado-del-mes",
    name: "Gordon, empleado del mes",
    category: "easter-eggs",
    summary:
      "En una oficina de Opposing Force puede verse una foto de Gordon Freeman como «Empleado del mes».",
    appearances: [{ gameId: "half-life-opposing-force" }],
    sources: [
      {
        title: "Gordon Freeman - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Gordon_Freeman",
        kind: "wiki",
      },
    ],
  },
];
