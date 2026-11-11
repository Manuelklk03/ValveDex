import type { GameLore } from "@/domain/game-lore";

export const portalLore: GameLore[] = [
  {
    gameId: "portal",
    paragraphs: [
      {
        text: "Portal es un juego de puzles en primera persona de Valve lanzado en 2007 dentro de The Orange Box. La jugadora controla a Chell, una sujeto de pruebas del Centro de Enriquecimiento de Aperture Science, que debe superar una serie de cámaras con el dispositivo portátil de portales bajo la supervisión de la inteligencia artificial GLaDOS.",
      },
      {
        text: "GLaDOS la guía y se burla de ella durante las pruebas y le promete tarta cuando las termine. La historia transcurre en el universo de Half-Life, entre el primer y el segundo juego de esa serie.",
      },
      {
        text: "Según la web promocional de Aperture Science que cita Wikipedia, Cave Johnson fundó la empresa en 1943 para fabricar cortinas de ducha para el ejército de Estados Unidos. El desarrollo de GLaDOS empezó en 1986 para acelerar la investigación de portales en competencia con Black Mesa. GLaDOS inundó el centro de neurotoxina durante el primer día de «trae a tu hija al trabajo» de 1998.",
        spoiler: true,
      },
      {
        text: "Doug Rattmann, un antiguo empleado, sobrevivió a aquel ataque y dejó grafitis de advertencia detrás de los paneles de las cámaras. Según el cómic Lab Rat, fue él quien colocó a Chell al principio de la lista de sujetos de prueba.",
        spoiler: true,
      },
      {
        text: "En la cámara 17 se entrega a Chell un Weighted Companion Cube que debe llevar hasta la salida. Después, en la cámara de GLaDOS, Chell destruye a GLaDOS y logra escapar un instante del complejo, pero una figura que no se ve la arrastra de nuevo al interior. Erik Wolpaw la identificó después como el «Party Escort Bot».",
        spoiler: true,
      },
    ],
    sources: [
      {
        title: "Portal (video game) - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Portal_(video_game)",
        kind: "wiki",
      },
      {
        title: "Portal 2 - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Portal_2",
        kind: "wiki",
      },
      {
        title: "GLaDOS - Portal Wiki",
        url: "https://theportalwiki.com/wiki/GLaDOS",
        kind: "wiki",
      },
      {
        title: "Portal - Steam",
        url: "https://store.steampowered.com/app/400",
        kind: "official",
      },
    ],
  },
  {
    gameId: "portal-2",
    paragraphs: [
      {
        text: "Portal 2 es la secuela de Portal, desarrollada por Valve y publicada en 2011. En la campaña de un jugador, Chell despierta en una cámara de reposo y descubre que el Centro de Enriquecimiento de Aperture Science se ha deteriorado durante lo que parecen milenios. Wheatley, una esfera de personalidad, la guía por las cámaras del primer juego para intentar escapar.",
      },
      {
        text: "El juego añade embudos de excursión, rayos térmicos, puentes de luz sólida y geles que alteran el movimiento o permiten colocar portales en cualquier superficie. También incorpora un modo cooperativo para dos jugadores, que controlan a los robots Atlas y P-body, y un editor de cámaras.",
      },
      {
        text: "Wheatley y Chell reactivan sin querer a GLaDOS, que las separa y empieza a reconstruir el complejo. Chell escapa con ayuda de Wheatley, sabotean la producción de torretas y neurotoxina y, juntos, sustituyen a GLaDOS por Wheatley como controlador del laboratorio.",
        spoiler: true,
      },
      {
        text: "Wheatley, enloquecido de poder, coloca a GLaDOS en una batería de patata. Ella revela que fue diseñado como Intelligence Dampening Sphere para hacer más lenta su inteligencia. El ascensor se destruye y Chell y GLaDOS caen hasta los niveles más antiguos, donde encuentran grabaciones de Cave Johnson, fundador de Aperture Science. En ellas se revela que, ante su enfermedad mortal, Johnson pidió transferir a la fuerza la mente de su asistente Caroline a un ordenador avanzado, que acabó siendo GLaDOS.",
        spoiler: true,
      },
      {
        text: "Al final, Chell abre un portal en la Luna, que arrastra a Wheatley al espacio. GLaDOS recupera el control, elimina la personalidad de Caroline y decide liberar a Chell. Los créditos suenan con «Want You Gone», de Jonathan Coulton. La campaña cooperativa es cronológicamente posterior a la de un jugador, aunque no hace falta jugarlas en ese orden.",
        spoiler: true,
      },
    ],
    sources: [
      {
        title: "Portal 2 - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Portal_2",
        kind: "wiki",
      },
      {
        title: "Wheatley - Portal Wiki",
        url: "https://theportalwiki.com/wiki/Wheatley",
        kind: "wiki",
      },
      {
        title: "Cave Johnson - Portal Wiki",
        url: "https://theportalwiki.com/wiki/Cave_Johnson",
        kind: "wiki",
      },
      {
        title: "Portal 2 - Steam",
        url: "https://store.steampowered.com/app/620",
        kind: "official",
      },
    ],
  },
];
