import type { GameLore } from "@/domain/game-lore";
import type { Source } from "@/domain/source";

function wikipedia(page: string, title: string): Source {
  return {
    title: `${title} - Wikipedia`,
    url: `https://en.wikipedia.org/wiki/${page}`,
    kind: "wiki",
  };
}

// Counter-Strike casi no tiene trama: se describen la premisa, los modos y la evolución de cada juego.
export const counterStrikeLore: GameLore[] = [
  {
    gameId: "counter-strike",
    paragraphs: [
      {
        text: "Counter-Strike enfrenta a dos equipos, los Terroristas y los Antiterroristas, que compiten por completar objetivos: plantar o desactivar una bomba, o rescatar o custodiar rehenes. Empezó como una modificación de Half-Life creada por Minh «Gooseman» Le y Jess Cliffe, y Valve la convirtió en un producto comercial en 2000.",
      },
      {
        text: "El juego no cuenta una historia continuada: el contexto lo dan las descripciones oficiales de cada mapa y de cada facción. Por ejemplo, la Phoenix Connexion es un grupo terrorista de Europa del Este formado tras la ruptura de la URSS, y el SEAL Team 6 es una unidad de operaciones especiales de la Armada de Estados Unidos.",
      },
      {
        text: "Según el mapa, hay tres objetivos además de eliminar al equipo rival: desactivación de bomba (mapas «de_»), rescate de rehenes (mapas «cs_») y asesinato o escolta de un VIP (mapas «as_»). Antiguamente existió un cuarto, el escape. Los jugadores compran su equipo con el dinero que reciben por completar objetivos.",
      },
      {
        text: "La versión 1.6 se distribuyó a través de Steam, con una beta previa anunciada en octubre de 2002. Condition Zero (2004) usó el mismo motor GoldSrc y añadió campañas para un jugador.",
      },
    ],
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
      wikipedia("Counter-Strike", "Counter-Strike"),
      wikipedia(
        "Counter-Strike:_Condition_Zero",
        "Counter-Strike: Condition Zero",
      ),
    ],
  },
  {
    gameId: "counter-strike-source",
    paragraphs: [
      {
        text: "Counter-Strike: Source es un remake del Counter-Strike original y fue el primer juego que Valve lanzó con el motor Source. Llegó a Steam el 7 de octubre de 2004, más de un mes antes que Half-Life 2, y conserva las reglas de siempre: desactivar la bomba, rescatar a los rehenes o eliminar al equipo rival, con el objetivo de ganar más rondas que el otro bando.",
      },
      {
        text: "Como el resto de la serie, no tiene trama. La novedad está en la tecnología: objetos físicos como barriles, neumáticos o botellas que afectan al juego, cuerpos con ragdoll, texturas con mucho más detalle y servidores de hasta 64 jugadores. Muchos mapas del lanzamiento eran adaptaciones de los clásicos con texturas nuevas.",
      },
      {
        text: "Salió sin el escudo antidisturbios y sin el modo asesinato, y varios mapas conocidos del CS original no estaban en el lanzamiento. Turtle Rock Studios dirigió las actualizaciones posteriores y, entre diciembre de 2004 y enero de 2006, rehízo seis de esos mapas clásicos. La primera gran actualización en casi 12 años llegó el 18 de febrero de 2025 y pasó el juego a 64 bits.",
      },
    ],
    sources: [wikipedia("Counter-Strike:_Source", "Counter-Strike: Source")],
  },
  {
    gameId: "counter-strike-global-offensive",
    paragraphs: [
      {
        text: "Counter-Strike: Global Offensive es el cuarto juego de la serie principal y el segundo desarrollado sobre el motor Source. Lo hicieron Valve y Hidden Path Entertainment y salió en agosto de 2012. Mantiene la premisa de dos equipos, Terroristas y Antiterroristas, que compiten por plantar o desactivar una bomba y rescatar o custodiar rehenes.",
      },
      {
        text: "Tampoco cuenta una historia: crece con modos y contenido. Llegó a tener nueve modos oficiales, entre ellos Competitive, Casual, Arms Race, Demolition, Wingman y Danger Zone, y recibió mapas, armas y operaciones durante años. El 6 de diciembre de 2018 pasó a ser gratuito, con ingresos basados en objetos cosméticos.",
      },
      {
        text: "Su desarrollo empezó cuando Hidden Path intentó llevar Counter-Strike: Source a las consolas. Introdujo armas y equipo nuevos, como los tasers y la granada incendiaria, y un sistema de skins de armas que formó una economía virtual a partir de agosto de 2013. En septiembre de 2023 lo sustituyó Counter-Strike 2, aunque se puede seguir jugando en servidores de la comunidad.",
      },
    ],
    sources: [
      wikipedia(
        "Counter-Strike:_Global_Offensive",
        "Counter-Strike: Global Offensive",
      ),
    ],
  },
  {
    gameId: "counter-strike-2",
    paragraphs: [
      {
        text: "Counter-Strike 2 es un juego gratuito de disparos táctico en primera persona desarrollado y publicado por Valve. Es la quinta entrega de la serie principal y una versión actualizada de Global Offensive. Se anunció el 22 de marzo de 2023 y se publicó el 27 de septiembre de 2023, sustituyendo a Global Offensive en Steam.",
      },
      {
        text: "Como siempre, dos equipos, Terroristas y Antiterroristas, compiten por objetivos. Los modos de rondas son la desactivación de bomba, que es la experiencia principal, y el rescate de rehenes. Al comienzo de cada ronda se compran armas y equipo, y una partida estándar termina cuando un equipo gana trece rondas.",
      },
      {
        text: "Pasa del motor Source a Source 2, con mejores gráficos y una arquitectura de servidores «sub-tick». Estrena un humo volumétrico que llena los espacios y cambia con los disparos y las granadas, y renueva muchos mapas de Global Offensive: unos conservan su distribución con mejoras gráficas, otros reciben mejoras mayores y algunos se reconstruyen desde cero.",
      },
    ],
    sources: [wikipedia("Counter-Strike_2", "Counter-Strike 2")],
  },
];
