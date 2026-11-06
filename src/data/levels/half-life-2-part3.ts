import type { LevelDetail } from "@/domain/level";

const storyline = {
  title: "Half-Life 2 storyline - Combine OverWiki",
  url: "https://combineoverwiki.net/wiki/Half-Life_2_storyline",
  kind: "wiki",
} as const;

// Solo «Energía oscura» (un único mapa) se puede atribuir a su nivel: de los otros tres
// capítulos las fuentes describen el capítulo entero, no cada mapa.
export const halfLife2LevelsPart3: LevelDetail[] = [
  {
    chapterId: "hl2-dark-energy",
    mapFile: "d3_breen_01",
    summary:
      "Último nivel del juego: Gordon llega al despacho del doctor Breen, en lo alto de la Ciudadela.",
    paragraphs: [
      {
        text: "Es el capítulo final y su único mapa. Gordon llega hasta el despacho de Wallace Breen, en lo alto de la Ciudadela, y tiene que abrirse paso entre soldados de la Alianza.",
      },
      {
        text: "En el despacho, Gordon se reencuentra con Eli Vance y Alyx Vance, y lo hace con el arma gravitatoria potenciada. Breen intenta una vez más ganarse la lealtad de Eli y, al ser rechazado, se prepara para enviar a Gordon, Alyx y Eli por un portal al Mundo Superior de la Alianza. Judith Mossman se niega a aceptarlo y los libera; Breen huye hacia el reactor de energía oscura, en lo más alto de la Ciudadela, y Gordon lo persigue.",
        spoiler: true,
      },
      {
        text: "Cuando se abre el portal, Gordon ataca el reactor con el arma gravitatoria cargada de energía oscura y lo lleva a un estado crítico. Al estallar, el G-Man detiene el tiempo, felicita a Gordon, le dice que ha recibido «ofertas interesantes» por sus servicios y lo devuelve a la estasis. Según la fuente, el destino de Breen, Eli, Mossman y Alyx queda sin aclarar al terminar el juego.",
        spoiler: true,
      },
    ],
    characterIds: ["wallace-breen"],
    weaponIds: ["hl2-gravity-gun"],
    enemyIds: ["hl2-overwatch-soldier"],
    sources: [storyline],
  },
];
