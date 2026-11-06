import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

const episodeTwoAppearances = [{ gameId: "half-life-2-episode-two" }];

const storylineSource = overwiki(
  "Half-Life_2:_Episode_Two_storyline",
  "Half-Life 2: Episode Two storyline",
);

// Los mapas de cada capítulo coinciden en la wiki de SourceRuns y en la guía «All Maps» de Steam
const mapListSources: Source[] = [
  storylineSource,
  {
    title: "Half-Life 2: Episode Two Maps - SourceRuns Wiki",
    url: "https://wiki.sourceruns.org/wiki/Half-Life_2:_Episode_Two_Maps",
    kind: "community",
  },
];

// Capítulos de Half-Life 2: Episode Two (1 a 7) con sus mapas reales
export const episodeTwoChapters: Entry[] = [
  {
    id: "ep2-to-the-white-forest",
    slug: "ep2-hacia-white-forest",
    name: "Hacia White Forest",
    category: "maps",
    details: { chapter: 1, mapFiles: ["ep2_outland_01", "ep2_outland_01a"] },
    summary:
      "Gordon y Alyx dejan atrás la Ciudad 17 y se adentran en las montañas de las Outlands para llegar a White Forest, una base de la Resistencia. En este y en los dos capítulos siguientes aparecen las hormigas león obreras.",
    appearances: episodeTwoAppearances,
    sources: mapListSources,
  },
  {
    id: "ep2-this-vortal-coil",
    slug: "ep2-esta-espiral-vortigaunt",
    name: "Esta espiral vortigaunt",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["ep2_outland_02", "ep2_outland_03", "ep2_outland_04"],
    },
    summary:
      "Gordon acompaña a un vortigaunt al interior de una colonia de hormigas león para recuperar un extracto larval, con el guardián de la colonia como amenaza.",
    appearances: episodeTwoAppearances,
    sources: mapListSources,
  },
  {
    id: "ep2-freeman-pontifex",
    slug: "ep2-freeman-pontifex",
    name: "Freeman Pontifex",
    category: "maps",
    details: { chapter: 3, mapFiles: ["ep2_outland_05", "ep2_outland_06"] },
    summary:
      "Salida a la superficie entre hormigas león y zombis hasta llegar a un coche de la Resistencia, aparcado al otro lado de un puente.",
    appearances: episodeTwoAppearances,
    sources: mapListSources,
  },
  {
    id: "ep2-riding-shotgun",
    slug: "ep2-de-copiloto",
    name: "De copiloto",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: ["ep2_outland_06a", "ep2_outland_07", "ep2_outland_08"],
    },
    summary:
      "Gordon conduce el Muscle Car hacia White Forest con Alyx de copiloto. Es el capítulo del primer combate directo contra los hunters, el enemigo nuevo del episodio.",
    appearances: episodeTwoAppearances,
    sources: mapListSources,
  },
  {
    id: "ep2-under-the-radar",
    slug: "ep2-bajo-el-radar",
    name: "Bajo el radar",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: ["ep2_outland_09", "ep2_outland_10", "ep2_outland_10a"],
    },
    summary:
      "Continuación del viaje por carretera. El coche se equipa con un radar que detecta los depósitos de suministros de la Resistencia, repartidos por el campo.",
    appearances: episodeTwoAppearances,
    sources: mapListSources,
  },
  {
    id: "ep2-our-mutual-fiend",
    slug: "ep2-nuestro-enemigo-comun",
    name: "Nuestro enemigo común",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: [
        "ep2_outland_11",
        "ep2_outland_11a",
        "ep2_outland_11b",
        "ep2_outland_12",
      ],
    },
    summary:
      "Llegada a White Forest, la base de la Resistencia donde se prepara un cohete. El capítulo presenta el dispositivo Magnusson y una defensa de la base contra los Combine.",
    appearances: episodeTwoAppearances,
    sources: mapListSources,
  },
  {
    id: "ep2-t-minus-one",
    slug: "ep2-t-menos-uno",
    name: "T menos uno",
    category: "maps",
    details: { chapter: 7, mapFiles: ["ep2_outland_12a"] },
    summary:
      "Último capítulo del episodio, ambientado en la base de White Forest.",
    appearances: episodeTwoAppearances,
    sources: mapListSources,
  },
];

export const episodeTwoEnemies: Entry[] = [
  {
    id: "ep2-hunter",
    slug: "hunter-sintetico",
    name: "Hunter",
    category: "enemies",
    details: { origin: "Sintético de los Combine" },
    summary:
      "Sintético tripodal rápido y ágil que los Combine emplean como explorador, para asaltos a corta distancia y como escolta. Se deja ver en Episode One y es un enemigo habitual en Episode Two.",
    notes: [
      "Ataca principalmente con ráfagas de dardos explosivos (fléchettes). Si el dardo no alcanza a nadie, se clava en una superficie y explota unos segundos después.",
      "Actúa en manada, cambia de posición y busca flanquear. Con un objeto lanzado con el arma gravitatoria, un explosivo o el disparo de energía del rifle de pulso se le derriba antes que con armas de fuego convencionales.",
      "Si un objeto lanzado con el arma gravitatoria lleva un dardo sin explotar clavado, este detona al chocar con el hunter y aumenta el daño.",
    ],
    appearances: episodeTwoAppearances,
    sources: [overwiki("Hunter", "Hunter")],
  },
  {
    id: "ep2-antlion-worker",
    slug: "hormiga-leon-obrera",
    name: "Hormiga león obrera",
    category: "enemies",
    details: { origin: "Hormigas león" },
    summary:
      "Variante de la hormiga león que solo aparece en las cámaras de larvas o cerca de ellas, donde atiende a las larvas. Escupe ácido y excava túneles con él. Los vortigaunts la llaman «león ácido».",
    notes: [
      "Ataca a distancia con un escupitajo de ácido y prefiere evitar el cuerpo a cuerpo. Al morir, estalla en una lluvia de ácido que daña lo que tenga cerca.",
      "Aparece en los tres primeros capítulos de Episode Two, en la mina Victory.",
      "Valve la ideó para dar variedad a las secuencias subterráneas: el escupitajo parte del comportamiento del bullsquid de Half-Life, pero se simula como un objeto físico con trayectoria realista.",
    ],
    appearances: episodeTwoAppearances,
    sources: [overwiki("Antlion_Worker", "Antlion Worker")],
  },
];

export const episodeTwoCharacters: Entry[] = [
  {
    id: "ep2-arne-magnusson",
    slug: "arne-magnusson",
    name: "Arne Magnusson",
    category: "characters",
    details: {
      affiliation: "Resistencia (antes, Black Mesa)",
      voiceActor: "John Aylward",
      designers: ["Marc Laidlaw"],
    },
    summary:
      "Científico veterano y responsable de White Forest. Antiguo miembro del equipo de Black Mesa, usa su experiencia para dotar a la Resistencia de tecnología, entre ella el dispositivo que lleva su nombre.",
    notes: [
      "Se creó, entre otras razones, para aportar fricción interpersonal: según el equipo, Alyx, Eli y Kleiner se tienen mucho cariño y estaban «encantados de tener al doctor Magnusson para irritarse con tanto abrazo».",
      "Valve quiso recuperar a otro personaje del Half-Life original, al estilo de Kleiner o Barney; la voz de un científico de la puerta del espectrómetro de antimasa del inicio de Half-Life inspiró su carácter.",
      "Su aspecto se basa en el actor Paul Eenhoorn, de la escena cinematográfica de Seattle.",
    ],
    appearances: episodeTwoAppearances,
    sources: [overwiki("Arne_Magnusson", "Arne Magnusson")],
  },
  {
    id: "ep2-lone-vort",
    slug: "vortigaunt-solitario",
    name: "Vortigaunt solitario",
    category: "characters",
    details: {
      affiliation: "Resistencia",
      voiceActor: "Tony Todd",
      designers: ["Marc Laidlaw"],
    },
    summary:
      "Vortigaunt que caza consejeros de los Combine en el bosque, cerca de White Forest. Ayuda a Gordon contra las hormigas león de la mina Victory y en la recogida del extracto larval.",
    notes: [
      "El nombre «Lone Vort» sale del código del SDK de Valve; en los archivos de los mapas se le llama solo «vort».",
      "Repite una variante de una frase de Magnusson («What next in the parade of constant obstacles?»). Según Marc Laidlaw, la afinidad entre los vortigaunts y Magnusson hizo que algunos de sus modos se contagiaran por su telepatía de bajo nivel.",
    ],
    appearances: episodeTwoAppearances,
    sources: [overwiki("Lone_Vort", "Lone Vort")],
  },
];

export const episodeTwoWeapons: Entry[] = [
  {
    id: "ep2-magnusson-device",
    slug: "dispositivo-magnusson",
    name: "Dispositivo Magnusson",
    category: "weapons",
    // La wiki no da ranura: se lanza con el arma gravitatoria, que está en la ranura 1
    details: { slot: 1 },
    summary:
      "Bomba adhesiva diseñada por Arne Magnusson para los zancudos de los Combine. Se toma de unos teletransportadores portátiles de White Forest, se lanza con el arma gravitatoria y detona al dispararle con cualquier otra arma.",
    notes: [
      "Los hunters que escoltan a los zancudos disparan al dispositivo en cuanto lo ven preparado; conviene eliminarlos antes. Solo el jugador puede detonarlo, y el disparo de energía del rifle de pulso no lo hace estallar.",
      "Empezó como un arma de Half-Life 2 llamada «Hopwire». Durante el desarrollo se usó una calabaza como modelo provisional.",
      "Los archivos del juego contienen un modelo sin usar de una versión de mano; el nombre de la entidad en el código es «weapon_magnade».",
    ],
    appearances: episodeTwoAppearances,
    sources: [overwiki("Magnusson_Device", "Magnusson Device")],
  },
];

export const episodeTwoExtras: Entry[] = [
  {
    id: "ep2-development-and-engine",
    slug: "ep2-desarrollo-y-motor",
    name: "Desarrollo en paralelo y motor Source 2007",
    category: "trivia",
    summary:
      "Episode Two se desarrolló a la vez que Episode One con un equipo distinto, dirigido por David Speyrer. Usa la versión «Source 2007» del motor, con desenfoque de movimiento, sombras dinámicas mejoradas, partículas suaves y optimizaciones para procesadores de dos y cuatro núcleos.",
    notes: [
      "La versión de PlayStation 3 la produjo Electronic Arts en Chertsey (Reino Unido).",
    ],
    appearances: episodeTwoAppearances,
    sources: [
      overwiki("Half-Life_2%3A_Episode_Two", "Half-Life 2: Episode Two"),
    ],
  },
  {
    id: "ep2-achievements",
    slug: "ep2-logros",
    name: "Logros de la Caja Naranja",
    category: "trivia",
    summary:
      "Episode Two tiene 19 logros que suman 210 puntos de Gamerscore. Algunos son obligatorios, como sobrevivir a la emboscada de los hunters, y otros son proezas opcionales, como matar a un hunter con sus propios dardos o a una hormiga león obrera ácida.",
    appearances: episodeTwoAppearances,
    sources: [
      overwiki("Half-Life_2%3A_Episode_Two", "Half-Life 2: Episode Two"),
      overwiki("Hunter", "Hunter"),
      overwiki("Antlion_Worker", "Antlion Worker"),
    ],
  },
  {
    id: "ep2-developer-commentary",
    slug: "ep2-comentario-del-desarrollador",
    name: "Comentario del desarrollador",
    category: "trivia",
    summary:
      "El juego incluye comentarios de los desarrolladores. En ellos, entre otras cosas, se cuenta que el dispositivo Magnusson empezó como un arma de Half-Life 2 llamada «Hopwire» y que la arena de los hunters antes del segundo silo de White Forest fue el banco de pruebas de su comportamiento en combate cercano.",
    appearances: episodeTwoAppearances,
    sources: [
      overwiki(
        "Developer_commentary/Half-Life_2:_Episode_Two",
        "Developer commentary: Half-Life 2: Episode Two",
      ),
    ],
  },
  {
    id: "ep2-hunter-origins",
    slug: "ep2-del-mini-strider-al-hunter",
    name: "Del mini-strider al hunter",
    category: "trivia",
    summary:
      "El hunter se llamó «mini-strider» en su origen. El escritor Marc Laidlaw quería llamarlos «Blue Eyes» (ojos azules).",
    notes: [
      "El mini-strider, aún accesible con una orden de consola en Episode One hasta que se eliminó su entidad, no disparaba dardos y era vulnerable a las armas normales.",
      "En un adelanto de Episode Two, los hunters llevaban un cañón de partículas.",
    ],
    appearances: episodeTwoAppearances,
    sources: [overwiki("Hunter", "Hunter")],
  },
  {
    id: "ep2-sawblade-hunter",
    slug: "ep2-sierra-contra-el-hunter",
    name: "La sierra y el hunter de la mina",
    category: "easter-eggs",
    summary:
      "Una sierra circular lanzada con el arma gravitatoria hace tanto daño que mata a un hunter de uno o dos golpes. Si se lleva la sierra del primer túnel hasta la mina Victory, se puede abatir al hunter que se ve en un tejado.",
    appearances: episodeTwoAppearances,
    sources: [overwiki("Hunter", "Hunter")],
  },
  {
    id: "ep2-vort-parade",
    slug: "ep2-desfile-de-obstaculos",
    name: "«El desfile de obstáculos»",
    category: "easter-eggs",
    summary:
      "En la mina Victory, el vortigaunt solitario dice «What next in the parade of constant obstacles?», una variante de la muletilla de Magnusson «What next in the parade of constant interruptions?».",
    appearances: episodeTwoAppearances,
    sources: [overwiki("Lone_Vort", "Lone Vort")],
  },
  {
    id: "ep2-bare-hands",
    slug: "ep2-luchando-con-las-manos",
    name: "«Matando hunters a puñetazos»",
    category: "easter-eggs",
    summary:
      "En el capítulo «Nuestro enemigo común», un operador de radio de la Resistencia exagera su valor al decir que en la ciudad luchaban contra los hunters a mano limpia: «Solíamos derribarlos con las manos desnudas. Yo mataba diez o veinte al día».",
    appearances: episodeTwoAppearances,
    sources: [overwiki("Hunter", "Hunter")],
  },
];
