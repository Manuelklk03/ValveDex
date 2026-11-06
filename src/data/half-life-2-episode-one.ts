import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

const wikipedia: Source = {
  title: "Half-Life 2: Episode One - Wikipedia",
  url: "https://en.wikipedia.org/wiki/Half-Life_2:_Episode_One",
  kind: "wiki",
};

const episodeOneSource = overwiki(
  "Half-Life_2:_Episode_One",
  "Half-Life 2: Episode One",
);
const chaptersSource = overwiki(
  "Undue_Alarm",
  "Capítulos de Half-Life 2: Episode One",
);
const commentarySource = overwiki(
  "Developer_commentary/Half-Life_2:_Episode_One",
  "Developer commentary: Half-Life 2: Episode One",
);

const ep1Appearances = [{ gameId: "half-life-2-episode-one" }];

// Los cinco capítulos de Episode One. El primer mapa de cada capítulo sale de
// los chapterN.cfg del propio juego; el resto se asigna por orden de mapa.
export const episodeOneChapters: Entry[] = [
  {
    id: "ep1-undue-alarm",
    slug: "alarma-injustificada",
    name: "Alarma injustificada",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: [
        "ep1_citadel_00",
        "ep1_citadel_01",
        "ep1_citadel_02",
        "ep1_citadel_02b",
      ],
    },
    summary:
      "Gordon despierta entre las ruinas de la Ciudad 17 y se reúne con Alyx. Kleiner advierte de que el núcleo de la Ciudadela es inestable, y los dos vuelven a entrar para intentar frenarlo.",
    appearances: ep1Appearances,
    sources: [chaptersSource],
  },
  {
    id: "ep1-direct-intervention",
    slug: "intervencion-directa",
    name: "Intervención directa",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["ep1_citadel_03", "ep1_citadel_04"],
    },
    summary:
      "Gordon y Alyx llegan al núcleo de la Ciudadela e intentan contener su inestabilidad. En este tramo los Stalkers dejan de ser un elemento del decorado y pasan a ser un obstáculo en el camino.",
    appearances: ep1Appearances,
    sources: [chaptersSource, episodeOneSource],
  },
  {
    id: "ep1-lowlife",
    slug: "bajos-fondos",
    name: "Bajos fondos",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: ["ep1_c17_00", "ep1_c17_00a"],
    },
    summary:
      "Recorrido por los garajes y túneles oscuros de la ciudad subterránea, infestados de zombis y madrigueras de hormigas león. Es el capítulo donde aparece el zombine.",
    appearances: ep1Appearances,
    sources: [chaptersSource],
  },
  {
    id: "ep1-urban-flight",
    slug: "huida-urbana",
    name: "Huida urbana",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: [
        "ep1_c17_01",
        "ep1_c17_01a",
        "ep1_c17_02",
        "ep1_c17_02a",
        "ep1_c17_02b",
      ],
    },
    summary:
      "El capítulo más largo del juego: Gordon y Alyx avanzan por las calles de la Ciudad 17 y por un hospital, entre soldados Combine, hormigas león y zombis, hacia una estación de tren.",
    appearances: ep1Appearances,
    sources: [chaptersSource],
  },
  {
    id: "ep1-exit-17",
    slug: "salida-17",
    name: "Salida 17",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: ["ep1_c17_05", "ep1_c17_06"],
    },
    summary:
      "Último capítulo, ambientado en la estación técnica de trenes. Gordon ayuda a evacuar a ciudadanos y rebeldes mientras la oposición Combine aumenta, con un combate contra un strider incluido.",
    appearances: ep1Appearances,
    sources: [chaptersSource],
  },
];

// Episode One solo añade un enemigo nuevo; el resto viene de Half-Life 2
export const episodeOneEnemies: Entry[] = [
  {
    id: "ep1-zombine",
    slug: "zombine",
    name: "Zombine",
    category: "enemies",
    details: { origin: "Soldado Combine convertido en zombi" },
    summary:
      "Versión zombi del soldado Combine. Debuta en Episode One y lleva una granada de fragmentación.",
    notes: [
      "No aparece en Half-Life 2: Alyx lo llama «zombine» al encontrarlo por primera vez en el capítulo «Bajos fondos».",
    ],
    appearances: ep1Appearances,
    sources: [episodeOneSource, chaptersSource],
  },
];

// Los personajes y las armas de Episode One ya existen en Half-Life 2; se enlazan con apariciones
export const episodeOneCharacters: Entry[] = [];
export const episodeOneWeapons: Entry[] = [];

export const episodeOneExtras: Entry[] = [
  {
    id: "ep1-aftermath",
    slug: "de-aftermath-a-episode-one",
    name: "De «Aftermath» a «Episode One»",
    category: "trivia",
    summary:
      "El juego se anunció en abril de 2005 con el título provisional «Half-Life 2: Aftermath». El nombre definitivo, «Episode One», se anunció en febrero de 2006.",
    notes: [
      "En mayo de 2006 Valve confirmó que sería el primero de tres episodios.",
      "Los guiones de los episodios los escribieron Marc Laidlaw, Chet Faliszek y Erik Wolpaw; Laidlaw conservó la dirección del grupo.",
    ],
    appearances: ep1Appearances,
    sources: [wikipedia, episodeOneSource],
  },
  {
    id: "ep1-developer-commentary",
    slug: "comentario-del-desarrollador-episode-one",
    name: "Comentario del desarrollador",
    category: "trivia",
    summary:
      "Episode One incluye el modo de comentario del desarrollador, estrenado en Half-Life 2: Lost Coast. Unos nodos flotantes repartidos por los mapas reproducen explicaciones del equipo.",
    notes: [
      "El comentario abre con un mensaje de Gabe Newell, que explica el funcionamiento de los nodos y la intención de publicar juegos con más frecuencia gracias al formato episódico.",
      "Entre otros, hablan Robin Walker, Marc Laidlaw, Ken Birdwell, Jason Mitchell, Gary McTaggart y Bill Van Buren.",
    ],
    appearances: ep1Appearances,
    sources: [commentarySource, episodeOneSource],
  },
  {
    id: "ep1-alyx-companion",
    slug: "alyx-companera-de-juego",
    name: "Alyx como compañera de juego",
    category: "trivia",
    summary:
      "Valve centró Episode One en el desarrollo de Alyx, que acompaña al jugador durante casi todo el juego. Se reprogramó su IA para que reaccione a lo que hace el jugador.",
    notes: [
      "Según el comentario del desarrollador, Alyx se diseñó al principio para meter prisa al jugador con frases como «Hurry up!». Tras las pruebas con jugadores, Valve cambió su comportamiento para que casi siempre siga al jugador en lugar de guiarlo.",
      "Valve añadió un término de iluminación especular a los shaders de Alyx para que su piel, su chaqueta y sus dientes se vieran bien en todas las condiciones de luz.",
    ],
    appearances: ep1Appearances,
    sources: [wikipedia, commentarySource],
  },
  {
    id: "ep1-crouching-soldiers",
    slug: "soldados-combine-que-se-agachan",
    name: "Soldados Combine que se agachan",
    category: "trivia",
    summary:
      "Episode One mejora la IA de los soldados Combine: ahora pueden agacharse mientras reciben disparos para esquivar la línea de fuego del jugador.",
    notes: [
      "Según Combine OverWiki, el cambio se aprecia sobre todo en la gran batalla callejera que precede al refugio rebelde del cuarto capítulo.",
    ],
    appearances: ep1Appearances,
    sources: [wikipedia, episodeOneSource],
  },
  {
    id: "ep1-facial-animation",
    slug: "animacion-facial-episode-one",
    name: "Animación facial ampliada",
    category: "trivia",
    summary:
      "Episode One usa una versión nueva del sistema de animación facial de Source, junto con renderizado de alto rango dinámico (HDR).",
    notes: [
      "Ken Birdwell explica en el comentario que el equipo aumentó el detalle de ojos y boca, subió en torno a un 50 % el número de formas faciales y reescribió las reglas que las combinan.",
      "También añadieron un control de la amplitud del movimiento de los labios según el volumen de la voz.",
    ],
    appearances: ep1Appearances,
    sources: [commentarySource, wikipedia],
  },
  {
    id: "ep1-one-free-bullet",
    slug: "una-sola-bala",
    name: "Logro «La bala libre»",
    category: "trivia",
    summary:
      "En The Orange Box existe el logro «The One Free Bullet»: terminar Episode One habiendo disparado exactamente una bala.",
    notes: [
      "Según Combine OverWiki, quien lo intenta se queda con el arma gravitatoria, la palanca, el lanzacohetes y las granadas.",
    ],
    appearances: ep1Appearances,
    sources: [episodeOneSource],
  },
  {
    id: "ep1-vortex-hopwire",
    slug: "arma-sin-nombre-hopwire",
    name: "El arma sin nombre «Vortex Hopwire»",
    category: "easter-eggs",
    summary:
      "El juego contiene un arma sin nombre, apodada Vortex Hopwire, que solo se puede usar mediante códigos de consola.",
    appearances: ep1Appearances,
    sources: [episodeOneSource],
  },
];
