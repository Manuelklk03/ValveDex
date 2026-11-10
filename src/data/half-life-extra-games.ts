import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

// Contenido de Sven Co-op, Half-Life para Dreamcast y curiosidades de la etapa Source.
// Todas las fichas son de curiosidades; los datos salen de las fuentes citadas (comprobadas el 2026-11-10).
// Sin armas, mapas ni enemigos propios: ninguna fuente accesible da archivos de mapa ni cifras de Sven Co-op o del port.

function wikipedia(page: string, title: string): Source {
  return {
    title: `${title} - Wikipedia`,
    url: `https://en.wikipedia.org/wiki/${page}`,
    kind: "wiki",
  };
}

function svenWiki(page: string, title: string): Source {
  return {
    title: `${title} - Sven Co-op Wiki`,
    url: `https://wiki.svencoop.com/${page}`,
    kind: "official",
  };
}

// ---------------------------------------------------------------- Sven Co-op

const sven = [{ gameId: "sven-co-op" }];
const svenWikipedia = wikipedia("Sven_Co-op", "Sven Co-op");
const svenChangeLog = svenWiki("Change_log", "Change log");
const svenChangeLog5 = svenWiki("Change_log/5.0", "Change log 5.0");
const svenSteam: Source = {
  title: "Sven Co-op - Steam",
  url: "https://store.steampowered.com/app/225840/Sven_Coop/",
  kind: "official",
};

export const svenCoOpEntries: Entry[] = [
  {
    id: "sven-first-release",
    slug: "sven-primera-version",
    name: "La primera versión, en enero de 1999",
    category: "trivia",
    summary:
      "Daniel «Sven Viking» Fearon publicó la primera versión pública el 19 de enero de 1999, unos tres meses después de Half-Life. El nombre del mod sale de su apodo en línea.",
    notes: [
      "Fearon era uno de los responsables de Atomic Half-Life, un sitio de aficionados creado antes del estreno del juego.",
      "Valve le había enviado una copia de Half-Life antes de su lanzamiento; con ella descubrió cómo generar criaturas en mapas multijugador.",
    ],
    appearances: sven,
    sources: [svenWikipedia],
  },
  {
    id: "sven-before-sdk",
    slug: "sven-antes-del-sdk",
    name: "Un mod anterior al SDK",
    category: "trivia",
    summary:
      "El trabajo inicial se hizo antes de que Valve publicara el kit de desarrollo de Half-Life, así que Fearon tuvo que construir el mod sobre la distribución existente del juego y pensar en conexiones lentas, como los módems telefónicos.",
    notes: [
      "Empezó con un único mapa jugable en cooperativo y después sacó una segunda versión con dos mapas.",
    ],
    appearances: sven,
    sources: [svenWikipedia],
  },
  {
    id: "sven-not-a-campaign",
    slug: "sven-no-nacio-para-la-campana",
    name: "No nació para recorrer la campaña",
    category: "trivia",
    summary:
      "Contra lo que se suele creer, Fearon quería ofrecer experiencias cooperativas en general, muchas veces solo generando gran cantidad de enemigos en un mapa para abatirlos entre varios. Eso atrajo a creadores aficionados que hicieron mapas con misiones.",
    notes: [
      "Dave McDermott, primero responsable del sitio web del mod, fue uno de esos diseñadores antes de convertirse en desarrollador.",
      "Fearon ya pensaba incluir la campaña de Half-Life, pero el modo en que el motor cambia de mapa dificultaba mantener juntos a los jugadores; el equipo lo resolvió más tarde.",
    ],
    appearances: sven,
    sources: [svenWikipedia],
  },
  {
    id: "sven-expansion-campaigns",
    slug: "sven-campanas-de-las-expansiones",
    name: "Las campañas de Half-Life y sus expansiones",
    category: "trivia",
    summary:
      "El mod empezó con los niveles de Half-Life y después se amplió a Opposing Force, Blue Shift y mapas creados por usuarios. La página principal de su wiki oficial lista como campañas Half-Life, Opposing Force, Blue Shift y They Hunger.",
    notes: [
      "Varios mapas pueden enlazarse para formar una campaña más larga, decisión que corresponde al diseñador de los niveles.",
    ],
    appearances: sven,
    sources: [svenWikipedia, svenWiki("Main_Page", "Main Page")],
  },
  {
    id: "sven-co-op-2",
    slug: "sven-co-op-2",
    name: "Sven Co-op 2 para Source",
    category: "trivia",
    summary:
      "Hacia 2004 el equipo empezó a trabajar en un «Sven Co-op 2» para el motor Source de Half-Life 2. Sin el SDK, retrasado junto con el juego, y con miembros que se marchaban a otros proyectos, no pudo continuar.",
    notes: [
      "Fearon dejó entonces el proyecto y entregó la dirección a Josh Polito.",
      "Por la misma época había planeado publicar el mod en Steam, pero no lo hizo por una confusión entre el equipo y Valve.",
    ],
    appearances: sven,
    sources: [svenWikipedia],
  },
  {
    id: "sven-valve-deal",
    slug: "sven-acuerdo-con-valve",
    name: "El acuerdo con Valve y el salto a Steam",
    category: "trivia",
    summary:
      "McDermott y Polito negociaron con Valve desde 2010 el acceso al motor GoldSrc y cambios en sus límites numéricos. Valve aprobó el lanzamiento en Steam en 2012; se anunció en julio de 2013 y el juego independiente salió el 22 de enero de 2016.",
    notes: [
      "Valve, que posee los derechos de Half-Life, permitió distribuir con el juego los mapas y recursos de Half-Life.",
      "Para jugar las campañas de Opposing Force y Blue Shift hay que tener esos juegos instalados.",
      "La ficha de Steam lo presenta como juego gratuito.",
    ],
    appearances: sven,
    sources: [svenWikipedia, svenSteam],
  },
  {
    id: "sven-version-history",
    slug: "sven-historial-de-versiones",
    name: "Versiones de 3.0 a 5.26",
    category: "trivia",
    summary:
      "El registro de cambios de la wiki oficial fecha la versión 3.0 el 24 de diciembre de 2003 y la 5.0, ya independiente en Steam, el 22 de enero de 2016. La última entrada, la 5.26, es del 7 de diciembre de 2024.",
    notes: [
      "Entre medias constan la beta 4.0 (2008), la 4.5 (septiembre de 2010) y la 4.8 (30 de junio de 2013).",
      "El número de compilación del código se ve en el juego con el comando cl_showstats 1.",
    ],
    appearances: sven,
    sources: [svenChangeLog],
  },
  {
    id: "sven-svengine",
    slug: "sven-svengine-y-svencraft",
    name: "Svengine y Svencraft",
    category: "trivia",
    summary:
      "Svengine es el motor de Sven Co-op, una versión modificada de GoldSrc, el motor de Half-Life. Svencraft es su editor de mapas y se parece mucho en diseño y uso al Valve Hammer Editor, con funciones añadidas.",
    appearances: sven,
    sources: [
      svenWiki("Svengine", "Svengine"),
      svenWiki("Svencraft", "Svencraft"),
      svenWikipedia,
    ],
  },
  {
    id: "sven-bigger-maps",
    slug: "sven-mapas-mil-veces-mayores",
    name: "Mapas unas mil veces mayores",
    category: "trivia",
    summary:
      "Gracias al motor personalizado de la versión 5.0, los mapas pueden extenderse hasta 131.072 unidades desde el origen en lugar de 4.096, un volumen cercano a mil veces mayor, según el registro de cambios.",
    appearances: sven,
    sources: [svenChangeLog5],
  },
  {
    id: "sven-survival-mode",
    slug: "sven-modo-supervivencia",
    name: "Modo Supervivencia",
    category: "trivia",
    summary:
      "En este modo, quien muere pasa a ser observador y solo vuelve cuando los vivos alcanzan un punto de control o alguien lo revive. Se parece más a jugar Half-Life en solitario, donde se puede perder el nivel y reiniciarlo.",
    notes: [
      "Está disponible en la campaña de Half-Life y en algunos otros mapas.",
      "Unos 30 segundos después de empezar el mapa, el modo desactiva los puntos de reaparición.",
    ],
    appearances: sven,
    sources: [
      svenWiki("Game_Modes/Survival_Mode", "Survival Mode"),
      svenWiki("Mapping/Setting_Up_Survival_Mode", "Setting Up Survival Mode"),
    ],
  },
  {
    id: "sven-classic-mode",
    slug: "sven-modo-clasico",
    name: "Modo Clásico",
    category: "trivia",
    summary:
      "El modo Clásico sustituye los modelos de Sven Co-op por los de baja definición del Half-Life de 1998 y ajusta el comportamiento de algunos monstruos y armas para acercarlo al juego original. Solo existe en la campaña de Half-Life.",
    appearances: sven,
    sources: [svenWiki("Game_Modes/Classic_Mode", "Classic Mode")],
  },
  {
    id: "sven-half-life-reported",
    slug: "sven-campana-de-half-life-recreada",
    name: "La campaña de Half-Life, rehecha para cooperativo",
    category: "trivia",
    summary:
      "La versión 5.0 estrenó una compilación nueva de todos los mapas de Half-Life para jugar en cooperativo, portados desde cero a partir de Half-Life: Source. Muchos mapas se fusionaron en uno por capítulo para reducir los cambios de nivel.",
    notes: [
      "Se eliminaron las compuertas del tipo «mata a los monstruos para avanzar».",
      "Se activó el inventario entre mapas, de modo que las armas y la munición pueden pasar de un mapa al siguiente cuando el mapa lo permite.",
    ],
    appearances: sven,
    sources: [svenChangeLog5],
  },
  {
    id: "sven-new-maps-5",
    slug: "sven-mapas-nuevos-de-la-version-5",
    name: "Mapas nuevos de la versión 5.0",
    category: "trivia",
    summary:
      "El registro de cambios de 5.0 anuncia cinco mapas nuevos: Black Mesa: Special Tactics Sector, Desert Circle, Fortified, Stadium 4 y Turret Fortress: Reverse. También ajusta mapas y paquetes de la comunidad como Another Unit, Black Mesa EPF, Assault on Black Mesa 2 o Escape Series.",
    appearances: sven,
    sources: [svenChangeLog5],
  },
  {
    id: "sven-inventory-items",
    slug: "sven-objetos-de-inventario",
    name: "Objetos de inventario",
    category: "trivia",
    summary:
      "La versión 5.0 añadió la entidad item_inventory, un objeto que un jugador debe llevar consigo para cumplir reglas del mapa. Sirve, por ejemplo, para que una llave deba trasladarse hasta una puerta o para que una máscara de gas proteja del gas durante dos minutos.",
    appearances: sven,
    sources: [svenChangeLog5],
  },
  {
    id: "sven-angelscript",
    slug: "sven-scripts-angelscript",
    name: "Scripts con AngelScript",
    category: "trivia",
    summary:
      "La versión 5.0 incorporó un motor de scripts basado en AngelScript (versión 2.30.2) y la entidad trigger_script. Los mapas pueden cargar un script desde su configuración y guardar datos persistentes con SQLite.",
    notes: [
      "También permite modificaciones enteras del servidor, con almacenamiento en SQLite y MySQL.",
    ],
    appearances: sven,
    sources: [svenChangeLog5, svenWiki("Angelscript", "Angelscript")],
  },
  {
    id: "sven-weapon-pickups",
    slug: "sven-armas-colocables",
    name: "Armas que un mapa puede colocar",
    category: "trivia",
    summary:
      "La wiki oficial lista las armas que un mapa puede repartir como objetos recogibles: la palanca, las pistolas, el subfusil MP5, la escopeta, la ballesta, el cañón tau, el cañón de gluones, el lanzacohetes o el Displacer, y también el M16, la minigun, el Uzi, el maletín médico y las armas de Opposing Force.",
    notes: [
      "La minigun y el rifle de shock obligan a mantenerlas en mano hasta soltarlas («exclusive hold»).",
      "La versión 5.0 añadió el Displacer de Opposing Force.",
    ],
    appearances: sven,
    sources: [svenWiki("Weapons", "Weapons"), svenChangeLog5],
  },
  {
    id: "sven-player-effects",
    slug: "sven-modificadores-de-jugador",
    name: "Modificadores sobre jugadores y monstruos",
    category: "trivia",
    summary:
      "La versión 5.0 permite aplicar o quitar efectos a jugadores y a personajes no jugadores mediante objetos de inventario y scripts: invisibilidad, invulnerabilidad, modo fantasma, gravedad, velocidad y fricción modificadas, resplandor, daño distinto y bloqueo del uso de armas.",
    appearances: sven,
    sources: [svenChangeLog5],
  },
];

// ---------------------------------------------------- Half-Life para Dreamcast

const dreamcast = [{ gameId: "half-life-dreamcast" }];
const unreleasedWikipedia = wikipedia(
  "Unreleased_Half-Life_games",
  "Unreleased Half-Life games",
);
const halfLifeWikipedia = wikipedia("Half-Life_(video_game)", "Half-Life");
const dreamcastPress: Source = {
  title:
    "Half-Life coming to Sega Dreamcast (nota de prensa de Sierra y Valve)",
  url: "https://www.bluesnews.com/pressreleases/hld.shtml",
  kind: "official",
};
export const halfLifeDreamcastEntries: Entry[] = [
  {
    id: "hl-dc-announcement",
    slug: "dreamcast-anuncio",
    name: "El anuncio de febrero de 2000",
    category: "trivia",
    summary:
      "Sierra Studios y Valve anunciaron la versión para Dreamcast el 14 de febrero de 2000, en la feria Milia de Cannes, con salida prevista para el verano. La desarrollaba Captivation Digital Laboratories junto con Gearbox Software y Valve.",
    notes: [
      "La nota de prensa prometía personajes con más polígonos, iluminación dramática y efectos especiales para aprovechar la consola.",
    ],
    appearances: dreamcast,
    sources: [dreamcastPress, unreleasedWikipedia],
  },
  {
    id: "hl-dc-barney-mission",
    slug: "dreamcast-mision-de-barney",
    name: "Una misión nueva sobre Barney",
    category: "trivia",
    summary:
      "El anuncio incluía una misión de un solo jugador creada por Gearbox, el estudio de Opposing Force, con el guardia de seguridad Barney como protagonista. Esa misión es el origen de Half-Life: Blue Shift.",
    appearances: dreamcast,
    sources: [dreamcastPress, halfLifeWikipedia],
  },
  {
    id: "hl-dc-delays",
    slug: "dreamcast-retrasos",
    name: "Los retrasos de 2000",
    category: "trivia",
    summary:
      "La fecha de verano se pospuso a septiembre de 2000 y después a noviembre, cuando las revistas empezaron a recibir copias de prueba. Sierra volvió a retrasarlo y dijo que esperaba terminarlo ese año.",
    appearances: dreamcast,
    sources: [unreleasedWikipedia],
  },
  {
    id: "hl-dc-reception",
    slug: "dreamcast-primeras-criticas",
    name: "Críticas de las copias de prueba",
    category: "trivia",
    summary:
      "Las revistas que probaron copias tempranas dieron valoraciones mixtas: criticaron la tasa de fotogramas irregular, los largos tiempos de carga y la ausencia de juego en línea.",
    appearances: dreamcast,
    sources: [unreleasedWikipedia],
  },
  {
    id: "hl-dc-multiplayer-plans",
    slug: "dreamcast-planes-multijugador",
    name: "Planes de multijugador en línea",
    category: "trivia",
    summary:
      "Sierra planeaba una versión con multijugador a través de SegaNet. El director de Gearbox, Randy Pitchford, dijo que había sugerido añadir los modos multijugador y mods de la versión de Windows, incluidos Team Fortress Classic y los modos de Opposing Force.",
    appearances: dreamcast,
    sources: [unreleasedWikipedia],
  },
  {
    id: "hl-dc-cancellation",
    slug: "dreamcast-cancelacion",
    name: "La cancelación de junio de 2001",
    category: "trivia",
    summary:
      "Tras la decisión de Sega de abandonar Dreamcast en marzo de 2001 y varias cancelaciones de terceros, Sierra canceló el port semanas antes de su salida prevista, alegando «changing market conditions». El juego estaba prácticamente terminado.",
    notes: [
      "Wikipedia fecha el anuncio el 16 de junio de 2001, cuatro días después de la salida de Blue Shift para Windows; GameSpot lo dató alrededor del 15 de junio.",
    ],
    appearances: dreamcast,
    sources: [unreleasedWikipedia, halfLifeWikipedia],
  },
  {
    id: "hl-dc-blue-shift-pc",
    slug: "dreamcast-blue-shift-en-windows",
    name: "Blue Shift llega a Windows",
    category: "trivia",
    summary:
      "El 29 de marzo de 2001 Sierra anunció que Blue Shift saldría en Windows con los modelos de personajes creados para Dreamcast, dentro del Half-Life High Definition Pack. Salió el 12 de junio de 2001.",
    appearances: dreamcast,
    sources: [unreleasedWikipedia, halfLifeWikipedia],
  },
  {
    id: "hl-dc-leak",
    slug: "dreamcast-filtracion-de-2013",
    name: "La versión filtrada de 2013",
    category: "trivia",
    summary:
      "En 2013 se filtró en internet una versión avanzada del port con Half-Life y Blue Shift completos, ambos con una versión temprana del High Definition Pack. Se puede jugar entera.",
    notes: [
      "Según su análisis, tiene tasa de fotogramas irregular y cargas de unos diez segundos al cambiar de zona.",
      "Hay problemas al guardar: los bloques que ocupa la partida en la VMU crecen deprisa al acercarse al final de un nivel.",
    ],
    appearances: dreamcast,
    sources: [unreleasedWikipedia],
  },
  {
    id: "hl-dc-ps2-basis",
    slug: "dreamcast-base-del-port-de-ps2",
    name: "La base del port de PlayStation 2",
    category: "trivia",
    summary:
      "El port de Dreamcast se convirtió en la base de la versión de Half-Life para PlayStation 2, publicada a finales de 2001, que añadió juego competitivo y la expansión cooperativa Half-Life: Decay.",
    appearances: dreamcast,
    sources: [halfLifeWikipedia],
  },
];

// -------------------------------- Curiosidades de Half-Life 2, Episodes y Alyx

const hl2 = [{ gameId: "half-life-2" }];
const ep1 = [{ gameId: "half-life-2-episode-one" }];
const ep2 = [{ gameId: "half-life-2-episode-two" }];
const alyx = [{ gameId: "half-life-alyx" }];
const hl2Wikipedia = wikipedia("Half-Life_2", "Half-Life 2");
const ep1Wikipedia = wikipedia(
  "Half-Life_2:_Episode_One",
  "Half-Life 2: Episode One",
);
const ep2Wikipedia = wikipedia(
  "Half-Life_2:_Episode_Two",
  "Half-Life 2: Episode Two",
);
const alyxWikipedia = wikipedia("Half-Life:_Alyx", "Half-Life: Alyx");

export const halfLifeSourceExtras: Entry[] = [
  // Half-Life 2
  {
    id: "hl2x-announcement-delay",
    slug: "hl2-anuncio-y-retraso",
    name: "El anuncio y el retraso de 2003",
    category: "trivia",
    summary:
      "Valve presentó Half-Life 2 en el E3 de 2003, donde ganó el premio al mejor juego de la feria, y anunció su salida para el 30 de septiembre. No cumplió la fecha: el 23 de septiembre comunicó que apuntaba a la temporada navideña y los fans reaccionaron con enfado.",
    notes: [
      "ATI había organizado un evento en la isla de Alcatraz coincidiendo con el lanzamiento previsto; Gabe Newell no pudo cancelarlo, dio un discurso preparado, mostró el motor Source y se marchó sin responder preguntas.",
    ],
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-source-leak",
    slug: "hl2-filtracion-de-2003",
    name: "La filtración del código en 2003",
    category: "trivia",
    summary:
      "El 19 de septiembre de 2003 un pirata informático alemán, Axel Gembe, obtuvo el código fuente de Half-Life 2 tras infiltrarse meses antes en la red interna de Valve. A principios de octubre otra persona lo difundió y los fans compilaron una versión jugable, que mostraba lo inacabado que estaba el juego.",
    notes: [
      "Según Wikipedia, la filtración hundió la moral del equipo y frenó el desarrollo; Gembe fue condenado en noviembre de 2006 a dos años de libertad condicional.",
      "Valve adoptó medidas nuevas, como exigir que los periodistas jugaran en sus oficinas antes del lanzamiento.",
    ],
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-development-cost",
    slug: "hl2-cinco-anos-y-40-millones",
    name: "Cinco años y 40 millones de dólares",
    category: "trivia",
    summary:
      "Valve desarrolló Half-Life 2 durante cinco años a la vez que su motor Source, con un coste de 40 millones de dólares. En 2004 costaba un millón al mes y el equipo producía unas tres horas de juego mensuales.",
    notes: [
      "En marzo de 2004 consiguieron la primera versión jugable de principio a fin y pararon una semana para jugarla.",
      "El juego se dio por terminado el 13 de octubre de 2004.",
    ],
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-eastern-europe",
    slug: "hl2-ciudad-de-europa-del-este",
    name: "Una ciudad de Europa del Este",
    category: "trivia",
    summary:
      "Valve quería un tono «mucho más épico y global» que el de Black Mesa. Por sugerencia del director de arte Viktor Antonov, de origen búlgaro, el equipo eligió una ciudad de estilo europeo oriental para ambientar la acción.",
    notes: [
      "Un concepto descartado hacía que el jugador viajara entre planetas, lo que complicaba la continuidad entre niveles.",
      "Nova Prospekt se concibió como un pequeño apeadero ferroviario sobre una antigua prisión y fue creciendo hasta ser un destino.",
    ],
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-facial-expression",
    slug: "hl2-expresiones-de-paul-ekman",
    name: "Expresiones basadas en Paul Ekman",
    category: "trivia",
    summary:
      "El animador Ken Birdwell estudió el trabajo del psicólogo Paul Ekman, que investigó cómo los músculos faciales expresan emociones, para dar más realismo a los personajes de Half-Life 2.",
    notes: [
      "El guionista Marc Laidlaw dio relaciones familiares a los personajes, «una unidad dramática básica que todo el mundo entiende» pero poco usada en los juegos.",
      "El reparto de voces incluyó a Louis Gossett Jr., Robert Guillaume y Robert Culp.",
    ],
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-zombie-basketball",
    slug: "hl2-baloncesto-con-zombis",
    name: "Baloncesto con zombis",
    category: "trivia",
    summary:
      "Para experimentar con la física Havok, Valve creó un minijuego, «Zombie Basketball», en el que se lanzaban zombis a canastas con un arma que manipulaba la física. A mediados de 2000 también montó una batalla entre ciudadanos amotinados y policías para probar física y personajes.",
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-showreels",
    slug: "hl2-las-demos-de-2001-y-2002",
    name: "Las demos internas de 2001 y 2002",
    category: "trivia",
    summary:
      "A finales de 2001 el equipo hizo una demostración para el E3 de 2002 con física, entornos y una escena de diálogo con el doctor Kleiner. Newell la encontró demasiado larga y poco clara sobre cómo afectaría la física al juego; Laidlaw concluyó que el drama debía apoyar la jugabilidad.",
    notes: [
      "En septiembre de 2002 hicieron una segunda demostración con una carrera de buggies por la costa de la Ciudad 17, un encuentro con headcrabs en un muelle y un strider atacando la ciudad.",
    ],
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-airboat",
    slug: "hl2-lancha-en-lugar-de-moto-acuatica",
    name: "La moto acuática que pasó a ser lancha",
    category: "trivia",
    summary:
      "En los últimos meses de desarrollo el equipo reemplazó una moto acuática por la lancha con hélice aérea y adelantó la aparición del arma gravitatoria dentro de la partida, según el relato de Wikipedia sobre el cierre del juego.",
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-steam-required",
    slug: "hl2-steam-obligatorio",
    name: "Steam obligatorio",
    category: "trivia",
    summary:
      "La versión en disco y la de Steam exigen tener Steam instalado y activo para jugar. Antes del lanzamiento, el 26 de agosto de 2004, Valve ofreció un gigabyte del juego cifrado para que los compradores lo desbloquearan y jugaran de inmediato el día de salida.",
    notes: [
      "Wikipedia recoge quejas de críticos por tener que crear una cuenta, registrar el producto y vincularlo a ella antes de jugar.",
    ],
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-editions",
    slug: "hl2-ediciones-bronce-plata-y-oro",
    name: "Ediciones bronce, plata y oro",
    category: "trivia",
    summary:
      "El juego salió en tres ediciones: la de bronce incluía Half-Life 2 y Counter-Strike: Source; la de plata y la de oro añadían Half-Life: Source y Day of Defeat: Source. La de oro traía además artículos como una gorra de béisbol.",
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-lost-coast",
    slug: "hl2-lost-coast-demo-tecnica",
    name: "Lost Coast, demostración técnica",
    category: "trivia",
    summary:
      "En 2005 Valve publicó gratis Half-Life 2: Lost Coast, un nivel extra para quienes tenían el juego que servía de demostración tecnológica de nuevas técnicas de iluminación y de renderizado de alto rango dinámico (HDR) en Source.",
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-ports",
    slug: "hl2-versiones-para-otras-plataformas",
    name: "Versiones para otras plataformas",
    category: "trivia",
    summary:
      "Half-Life 2 llegó a Xbox en noviembre de 2005 (por Electronic Arts), a Xbox 360 y PlayStation 3 con The Orange Box en 2007, a Linux en 2013 y a Android, solo para la tablet Nvidia Shield, en 2014. En 2006 existió además una versión recreativa para Japón, Half-Life 2: Survivor, con Taito.",
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-64-bit",
    slug: "hl2-motor-de-64-bits",
    name: "Source de 64 bits",
    category: "trivia",
    summary:
      "El 22 de diciembre de 2005 Valve lanzó una versión de 64 bits del motor Source para Windows XP Professional x64 Edition. Newell la calificó de «paso importante en la evolución» de sus contenidos y herramientas, aunque un análisis de Techgage encontró problemas de estabilidad y ninguna mejora apreciable.",
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  {
    id: "hl2x-twentieth-anniversary",
    slug: "hl2-actualizacion-del-20-aniversario",
    name: "La actualización del 20.º aniversario",
    category: "trivia",
    summary:
      "En noviembre de 2024 Valve regaló Half-Life 2 durante un tiempo en Steam y lo actualizó para incorporar Episode One, Episode Two y Lost Coast, mejorar gráficos y controles, restaurar contenido perdido y añadir comentarios de los desarrolladores. También publicó un documental de unas dos horas sobre su creación.",
    notes: [
      "Esa actualización introdujo un taller de la comunidad y Valve retiró Episode One y Episode Two de la tienda de Steam.",
      "El juego alcanzó un máximo de 64.085 jugadores simultáneos en Steam, frente a los 16.101 de agosto de 2021.",
    ],
    appearances: [...hl2, ...ep1, ...ep2],
    sources: [hl2Wikipedia, ep1Wikipedia],
  },
  {
    id: "hl2x-rtx",
    slug: "hl2-rtx",
    name: "Half-Life 2 RTX",
    category: "trivia",
    summary:
      "En 2023 Nvidia anunció Half-Life 2 RTX, una colaboración con desarrolladores aficionados para añadir trazado de rayos y otras mejoras gráficas con sus herramientas Remix.",
    appearances: hl2,
    sources: [hl2Wikipedia],
  },
  // Episode One
  {
    id: "ep1x-why-episodes",
    slug: "ep1-por-que-episodios",
    name: "Por qué se hicieron episodios",
    category: "trivia",
    summary:
      "Valve prefirió entregar un nuevo Half-Life en menos tiempo que esperar años a otro «producto monolítico», según Gabe Newell. El diseñador Robin Walker explicó que el equipo ya dominaba sus herramientas y quería aprovechar esa experiencia en vez de desarrollar tecnología nueva.",
    notes: [
      "Newell consideró la trilogía de episodios equivalente a un «Half-Life 3».",
    ],
    appearances: ep1,
    sources: [ep1Wikipedia],
  },
  {
    id: "ep1x-hero-moments",
    slug: "ep1-momentos-de-heroe",
    name: "Alyx sin estorbar",
    category: "trivia",
    summary:
      "Valve modificó la inteligencia de Alyx para que comentara lo que el jugador manipula y orientara su avance, y a veces redujo sus intervenciones para que no resultara agobiante. En los «momentos de héroe» el jugador supera solo un obstáculo mientras ella observa y lo elogia.",
    appearances: ep1,
    sources: [ep1Wikipedia],
  },
  {
    id: "ep1x-citadel-redesign",
    slug: "ep1-ciudadela-y-ciudad-17-transformadas",
    name: "Una Ciudadela y una Ciudad 17 distintas",
    category: "trivia",
    summary:
      "Episode One cambió mucho el aspecto de la Ciudad 17 y de la Ciudadela respecto al final de Half-Life 2 para mostrar las consecuencias de las acciones del jugador: grandes zonas de edificios destruidos y criaturas que antes no salían de la ciudad.",
    appearances: ep1,
    sources: [ep1Wikipedia],
  },
  {
    id: "ep1x-music-sparingly",
    slug: "ep1-musica-con-moderacion",
    name: "Música con mucha moderación",
    category: "trivia",
    summary:
      "La banda sonora de Kelly Bailey suena poco: se reserva para escenas de grandes desarrollos argumentales o de acción importante, como grandes batallas o el encuentro con un enemigo nuevo.",
    appearances: ep1,
    sources: [ep1Wikipedia],
  },
  {
    id: "ep1x-preorder-and-sales",
    slug: "ep1-reserva-y-ventas",
    name: "Reserva en Steam y ventas",
    category: "trivia",
    summary:
      "Episode One se pudo reservar y precargar en Steam el 1 de mayo de 2006, con Half-Life Deathmatch: Source y Half-Life 2: Deathmatch disponibles al instante dentro del paquete. En 2008 se habían vendido unos 1,4 millones de copias en tiendas.",
    appearances: ep1,
    sources: [ep1Wikipedia],
  },
  // Episode Two
  {
    id: "ep2x-platform-announcement",
    slug: "ep2-plataformas-y-retraso-de-ps3",
    name: "Consolas y retraso en PlayStation 3",
    category: "trivia",
    summary:
      "El 13 de julio de 2006 Valve anunció Episode Two también para Xbox 360 y PlayStation 3. El 7 de septiembre de 2007 se supo que la versión de PS3 se retrasaría porque el estudio de EA que la preparaba estaba en el Reino Unido, lejos del equipo de Valve.",
    notes: [
      "Valve encargó las versiones de PC y Xbox 360; EA se ocupó de la de PlayStation 3.",
      "Valve aseguró que las tres versiones serían idénticas en funciones y rendimiento.",
    ],
    appearances: ep2,
    sources: [ep2Wikipedia],
  },
  {
    id: "ep2x-same-tech",
    slug: "ep2-misma-tecnologia-que-episode-one",
    name: "La misma tecnología que Episode One",
    category: "trivia",
    summary:
      "Episode Two se hizo a la vez que Episode One con el mismo motor, lo que permitía corregir con rapidez los problemas técnicos de cualquiera de los dos, algo frecuente por el lanzamiento en varias plataformas.",
    appearances: ep2,
    sources: [ep2Wikipedia],
  },
  // Half-Life: Alyx
  {
    id: "alyxx-jeff-design",
    slug: "hla-diseno-de-jeff",
    name: "El diseño del capítulo de Jeff",
    category: "trivia",
    summary:
      "Jeff, un monstruo ciego del capítulo siete, nació de la idea de obligar al jugador a compartir espacio con una entidad aterradora en realidad virtual. El equipo probó varias versiones, incluso un robot Combine, hasta elegir una criatura de terror.",
    notes: [
      "El capítulo se ambientó en una destilería para justificar las botellas que se lanzan para distraerlo y tiene más objetos con física que todo Half-Life 2.",
      "Unas esporas hacen toser a Alyx y llaman la atención de Jeff; al ver que los probadores se tapaban la boca por instinto, el equipo lo incorporó al diseño.",
      "Se eliminaron combates con otros enemigos, pensados para mostrar su fuerza, porque restaban tensión.",
    ],
    appearances: alyx,
    sources: [alyxWikipedia],
  },
  {
    id: "alyxx-casting",
    slug: "hla-reparto-de-voces",
    name: "Un reparto de voces cambiado",
    category: "trivia",
    summary:
      "Merle Dandridge grabó como Alyx en marzo de 2019, pero las pruebas indicaron que Alyx necesitaba una voz más joven y en septiembre de 2019 se contrató a Ozioma Akagha. Rhys Darby puso la voz de Russell, con toques cómicos.",
    notes: [
      "Mike Shapiro grabó las frases del G-Man en una sola toma de 20 minutos, con retoques en 2019.",
      "Tony Todd volvió como los vortigaunts y Ellen McLain como la voz de los avisos Combine.",
    ],
    appearances: alyx,
    sources: [alyxWikipedia],
  },
  {
    id: "alyxx-script-length",
    slug: "hla-guion-de-280-paginas",
    name: "Un guion de 280 páginas",
    category: "trivia",
    summary:
      "El guion final de Alyx tiene 280 páginas, frente a 128 de Half-Life 2 y 18 de Half-Life. El equipo vio que hacer hablar a la protagonista mejoraba la narración y añadió diálogos por radio con Russell para «subir la energía» cuando hacía falta.",
    appearances: alyx,
    sources: [alyxWikipedia],
  },
  {
    id: "alyxx-playtest-rewrite",
    slug: "hla-prueba-interna-y-reescritura",
    name: "La prueba interna y la reescritura de la historia",
    category: "trivia",
    summary:
      "Tras una prueba interna de todo el juego a finales de 2018, los empleados valoraron la historia peor que la de cualquier otro juego de Valve. Por eso se retrasó el plan de lanzarlo con las Valve Index en junio de 2019 y se encargó una reescritura de la trama y los diálogos que respetara la jugabilidad.",
    appearances: alyx,
    sources: [alyxWikipedia],
  },
  {
    id: "alyxx-no-flat-version",
    slug: "hla-sin-version-sin-vr",
    name: "Sin versión para pantalla plana",
    category: "trivia",
    summary:
      "Valve no hizo una versión sin realidad virtual de Alyx porque estaba convencida de que el juego solo era posible en VR; los últimos meses de desarrollo se hicieron a distancia por la pandemia de COVID-19.",
    notes: [
      "Esperaban que los aficionados lo adaptaran: en marzo de 2023 apareció el mod «NoVR», que permite jugarlo sin visor, aunque los críticos lo juzgaron menos inmediato que la experiencia con mandos de VR.",
    ],
    appearances: alyx,
    sources: [alyxWikipedia],
  },
  {
    id: "alyxx-release",
    slug: "hla-lanzamiento",
    name: "Anuncio, lanzamiento y juegos gratis",
    category: "trivia",
    summary:
      "Valve anunció Alyx en noviembre de 2019, cuando estaba casi terminado, para evitar los retrasos de juegos anteriores. Para promocionarlo regaló los demás Half-Life en Steam desde enero de 2020 hasta su salida, el 23 de marzo de 2020. Fue gratis para quienes tuvieran unas Valve Index o sus mandos.",
    notes: [
      "La versión de Linux llegó el 15 de mayo de 2020, junto con soporte de Vulkan.",
      "Ese mismo día salieron las herramientas de mods de Source 2 y el soporte de Steam Workshop.",
    ],
    appearances: alyx,
    sources: [alyxWikipedia],
  },
  {
    id: "alyxx-prerelease-build",
    slug: "hla-compilacion-previa-en-steam",
    name: "Una compilación previa publicada por error",
    category: "trivia",
    summary:
      "Valve publicó por error en Steam una compilación previa al lanzamiento con herramientas de desarrollo sin VR, que permitían coger objetos y disparar. La mayoría de las interacciones básicas, como pulsar botones o llenar la mochila, no funcionaban con ratón y teclado.",
    appearances: alyx,
    sources: [alyxWikipedia],
  },
  {
    id: "alyxx-score",
    slug: "hla-banda-sonora-industrial",
    name: "Una banda sonora de inspiración industrial",
    category: "trivia",
    summary:
      "Mike Morasky, compositor de Portal 2 y Team Fortress 2, escribió la banda sonora de Alyx en consulta con Kelly Bailey, autor de la música de los Half-Life anteriores. Citó como influencia música industrial de grupos como Nine Inch Nails, The Prodigy y Skinny Puppy.",
    appearances: alyx,
    sources: [alyxWikipedia],
  },
];
