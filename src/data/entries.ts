import type { Entry } from "@/domain/entry";
import { halfLifeChapters } from "./half-life-chapters";
import { halfLifeWeapons } from "./half-life-weapons";
import { halfLifeEnemies } from "./half-life-enemies";
import { halfLifeCharacters } from "./half-life-characters";

export const entries: Entry[] = [
  ...halfLifeChapters,
  ...halfLifeWeapons,
  ...halfLifeEnemies,
  ...halfLifeCharacters,
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
