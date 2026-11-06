import type { LevelDetail } from "@/domain/level";

// Las fuentes de estos capítulos (Combine OverWiki) describen cada capítulo entero y no
// reparten lo que ocurre por archivo de mapa. Solo se escribe el nivel que una fuente
// asigna con nombre de mapa; el resto se muestra sin ficha.
export const halfLife2LevelsPart2: LevelDetail[] = [
  {
    chapterId: "hl2-sandtraps",
    mapFile: "d2_coast_12",
    summary:
      "Último tramo de la costa, catalogado como mapa de Nova Prospekt, antes de entrar en la prisión.",
    paragraphs: [
      {
        text: "Es el único mapa de la costa que Combine OverWiki incluye entre los mapas de Nova Prospekt (junto con d2_prison_01 a d2_prison_08). El capítulo describe este tramo final de la costa con búnkeres de la Alianza custodiados por guardias de la prisión, que Gordon asalta con la ayuda de grupos de hormigas león.",
      },
    ],
    sources: [
      {
        title: "Nova Prospekt (Combine OverWiki)",
        url: "https://combineoverwiki.net/wiki/Nova_Prospekt",
        kind: "wiki",
      },
      {
        title: "Half-Life 2 storyline, capítulo 8 (Combine OverWiki)",
        url: "https://combineoverwiki.net/wiki/Half-Life_2_storyline",
        kind: "wiki",
      },
    ],
  },
];
