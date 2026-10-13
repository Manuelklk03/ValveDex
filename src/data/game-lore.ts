import type { GameLore } from "@/domain/game-lore";

export const gameLore: GameLore[] = [
  {
    gameId: "half-life",
    paragraphs: [
      "Gordon Freeman, físico teórico, llega a su puesto en el Centro de Investigación Black Mesa, en Nuevo México.",
      "Un experimento con una muestra anómala provoca una cascada de resonancia que abre portales a Xen. Las criaturas invaden las instalaciones y el ejército llega para silenciar el incidente.",
    ],
    sources: [
      {
        title: "Half-Life storyline - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life_storyline",
      },
    ],
  },
  {
    gameId: "half-life-opposing-force",
    paragraphs: [
      "Adrian Shephard es uno de los marines enviados a Black Mesa. Su historia transcurre en paralelo a la de Half-Life, y en ella se cruza con lugares y sucesos del juego original, entre ellos el propio Gordon Freeman.",
    ],
    sources: [
      {
        title: "Half-Life: Opposing Force storyline - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life:_Opposing_Force_storyline",
      },
    ],
  },
  {
    gameId: "half-life-blue-shift",
    paragraphs: [
      "Barney Calhoun, guardia de seguridad de Black Mesa, vive el mismo desastre desde su puesto en el sector subterráneo e intenta escapar junto a un grupo de científicos.",
    ],
    sources: [
      {
        title: "Half-Life: Blue Shift storyline - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life:_Blue_Shift_storyline",
      },
    ],
  },
];
