import type { GameLore } from "@/domain/game-lore";
import type { Source } from "@/domain/source";

const wikipediaCz: Source = {
  title: "Counter-Strike: Condition Zero - Wikipedia",
  url: "https://en.wikipedia.org/wiki/Counter-Strike:_Condition_Zero",
  kind: "wiki",
};

const steamCz: Source = {
  title: "Counter-Strike: Condition Zero - Steam",
  url: "https://store.steampowered.com/app/80",
  kind: "official",
};

const steamDs: Source = {
  title: "Counter-Strike: Condition Zero Deleted Scenes - Steam",
  url: "https://store.steampowered.com/app/100",
  kind: "official",
};

// Fandom no responde a curl; los datos se leyeron con su API MediaWiki.
const csWikiCz: Source = {
  title: "Counter-Strike: Condition Zero - Counter-Strike Wiki",
  url: "https://counterstrike.fandom.com/wiki/Counter-Strike:_Condition_Zero",
  kind: "wiki",
};

const csWikiDs: Source = {
  title: "Counter-Strike: Condition Zero Deleted Scenes - Counter-Strike Wiki",
  url: "https://counterstrike.fandom.com/wiki/Counter-Strike:_Condition_Zero_Deleted_Scenes",
  kind: "wiki",
};

const csWikiTour: Source = {
  title: "Tour of Duty - Counter-Strike Wiki",
  url: "https://counterstrike.fandom.com/wiki/Tour_of_Duty",
  kind: "wiki",
};

export const counterStrikeConditionZeroLore: GameLore[] = [
  {
    gameId: "counter-strike-condition-zero",
    paragraphs: [
      {
        text: "Counter-Strike: Condition Zero es la continuación del Counter-Strike original. Salió en Windows el 23 de marzo de 2004, con el motor GoldSrc, y lo desarrollaron Ritual Entertainment, Turtle Rock Studios y Valve, con Sierra Entertainment y Valve como editoras. Mantiene el enfrentamiento de Terroristas contra Antiterroristas y añade, por primera vez en la serie, modos para un jugador.",
      },
      {
        text: "No tiene una historia continuada. Su campaña principal, Tour of Duty, es una sucesión de partidas contra bots en mapas multijugador: hay seis tours de tres mapas, cada mapa plantea de uno a tres retos y cada reto cumplido da un punto de reputación con el que se reclutan compañeros bot. El multijugador es casi igual al del Counter-Strike original, con modelos, texturas y mapas actualizados y la posibilidad de añadir bots a los servidores.",
      },
      {
        text: "Su desarrollo duró cerca de tres años. Empezó en 2001 con Rogue Entertainment, pasó a Gearbox Software, después a Ritual Entertainment y, hacia mediados de 2003, a Turtle Rock Studios, que había creado los bots y rehízo el juego desde cero. El trabajo previo de Ritual no se descartó: se publicó como un juego aparte, Condition Zero: Deleted Scenes, con una campaña lineal de misiones.",
      },
      {
        text: "Posteriormente recibió parches importantes: modelos de jugador y de arma de Ritual y paquetes de compra (28 de abril de 2004), nuevas facciones, los mapas Sienna y Vostok y un cambio grande en el rescate de rehenes (2 de junio) y los mapas Truth in Chaos y Corruption (14 de julio). Las versiones de macOS y Linux llegaron en 2013. La crítica fue mixta: elogió la IA de los bots y criticó que el juego llegó anticuado.",
      },
    ],
    sources: [wikipediaCz, csWikiCz, csWikiTour, steamCz],
  },
  {
    gameId: "counter-strike-condition-zero-deleted-scenes",
    paragraphs: [
      {
        text: "Condition Zero: Deleted Scenes es una campaña para un jugador que Ritual Entertainment desarrolló para Condition Zero y que Valve publicó como juego adicional el 23 de marzo de 2004. Sigue el diseño que Valve pidió a Ritual: una mezcla de Half-Life y Counter-Strike, es decir, un shooter lineal con escenas y secuencias con guion, en lugar de rondas y compras.",
      },
      {
        text: "Se juega por misiones, cada una con una introducción, varios mapas, un equipo concreto y objetivos como rescatar rehenes, desactivar una bomba o escoltar a alguien. Se desbloquean en orden y no hay dinero: el equipo viene dado y se encuentra más en los mapas. Añade herramientas propias, como una cámara digital, una radio, un soplete, bombas de control remoto y una cámara de fibra óptica.",
      },
      {
        text: "Ritual terminó 18 misiones; Valve publicó las 12 mejores y, tras el anuncio de Jess Cliffe el 17 de junio de 2004, añadió las otras seis con parches (tres el 28 de junio y tres el 14 de julio). Las misiones están ambientadas en distintos lugares del mundo, con facciones nuevas como los Kidotai y el SWAT y sin conexión argumental entre ellas, según la wiki de la comunidad.",
      },
      {
        text: "Recorrido de las doce misiones de la historia: Recoil (SEAL Team 6), Lost Cause (GSG-9), Secret War (Spetsnaz), Building Recon (SAS), Drug Lab (SEAL Team 6), Motorcade Assault (GSG-9), Thin Ice (Spetsnaz), Downed Pilot (GSG-9), Hankagai (Kidotai), Turn of the Crank (SWAT), Alamo (SEAL Team 6) y Rise Hard (SAS). Hay también una misión de entrenamiento, Counter Terrorist Training.",
      },
    ],
    sources: [csWikiDs, csWikiCz, wikipediaCz, steamDs],
  },
];
