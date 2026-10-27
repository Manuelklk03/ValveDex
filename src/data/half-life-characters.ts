import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";
import { halfLifeModelImages } from "./model-captures";

// Personajes de Half-Life 1 (Z3-4), según Combine OverWiki. Sin spoilers de la historia:
// nada del papel real del G-Man ni del final.

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

const halfLife = [{ gameId: "half-life" }];

export const halfLifeCharacters: Entry[] = [
  {
    id: "gordon-freeman",
    slug: "gordon-freeman",
    name: "Gordon Freeman",
    category: "characters",
    details: {
      affiliation: "Black Mesa (equipo científico)",
      designers: ["Chuck Jones", "Dhabih Eng"],
    },
    summary:
      "Investigador asociado del Centro de Investigación Black Mesa y protagonista mudo de Half-Life, equipado con el traje HEV. Nunca habla: el jugador ve la instalación a través de sus ojos.",
    notes: [
      "Marc Laidlaw propuso llamarle «Dyson Poincaré», por los científicos Freeman Dyson y Henri Poincaré; a Gabe Newell no le gustó y sugirió «Gordon Freeman».",
      "Su primer modelo tenía una barba poblada y despeinada que le valió el apodo de «Ivan the Space Biker»; después se quedó en perilla.",
      "Fuentes antiguas decían que empezó a trabajar en Black Mesa el 15 de mayo, el día antes del incidente; Half-Life 2 lo cambió después.",
    ],
    appearances: [
      { gameId: "half-life" },
      {
        gameId: "half-life-opposing-force",
        summary:
          "Adrian Shephard se lo cruza brevemente durante los acontecimientos de Opposing Force.",
      },
      {
        gameId: "half-life-blue-shift",
        summary:
          "Barney Calhoun se lo cruza varias veces, entre ellas esperando el tranvía.",
      },
    ],
    sources: [overwiki("Gordon_Freeman", "Gordon Freeman")],
  },
  {
    id: "g-man",
    slug: "g-man",
    name: "El G-Man",
    category: "characters",
    details: {
      affiliation: "Desconocida",
      voiceActor: "Michael Shapiro",
      designers: ["Ken Birdwell", "Marc Laidlaw", "Chuck Jones", "Ted Backman"],
    },
    summary:
      "Un hombre misterioso de traje que observa a Gordon desde lejos por toda la instalación de Black Mesa. Nunca se le llama por su nombre en los juegos.",
    notes: [
      "En origen, todo el personal de Black Mesa iba a ser hostil. Cuando los aliados resultaron útiles, el equipo pensó en personajes que no fueran ni amigos ni enemigos, y de ahí salió el G-Man.",
      "Ken Birdwell le propuso la idea a Marc Laidlaw pensando en los administradores y funcionarios que supervisan una institución como Black Mesa.",
      "«G-Man» no se dice nunca en los juegos: viene del nombre de su modelo y de su entidad en Half-Life, que se mantuvo en los juegos siguientes.",
      "Parece inspirado en el Fumador de Expediente X, una serie que se cita entre las influencias de Half-Life.",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "g-man",
          model: "gman.mdl",
          subject: "G-Man",
          width: 194,
          height: 578,
        }),
      },
    ],
    sources: [overwiki("The_G-Man", "The G-Man")],
  },
  {
    id: "black-mesa-security-guards",
    slug: "guardias-de-seguridad",
    name: "Guardias de seguridad («Barney»)",
    category: "characters",
    details: {
      affiliation: "Black Mesa (seguridad)",
      voiceActor: "Michael Shapiro",
      designers: ["Chuck Jones"],
    },
    summary:
      "Los guardias que protegen el Centro de Investigación Black Mesa, que pueden seguir al jugador y ayudarle en combate. En Half-Life son genéricos y todos reciben el apodo de «Barney».",
    notes: [
      "Barney se concibió primero como un villano torpe. Steve Bond lo usó para probar el comportamiento en grupo, y al hacer que siguiera al jugador nació un compañero que funcionaba.",
      "Iban a ser policía militar y a reaccionar a la muerte del jugador; un comentario de Kelly Bailey en el SDK conserva una frase de ejemplo: «Damn, I can't do this without you».",
      "El primer modelo se parecía al actor Don Knotts, y de ahí el apodo, por Barney Fife, su personaje en The Andy Griffith Show.",
      "Una de sus frases al azar es «Hey, catch me later, I'll buy you a beer», a la que Half-Life 2 hace un guiño.",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "black-mesa-security-guards",
          model: "barney.mdl",
          subject: "Guardia de seguridad de Black Mesa",
          width: 236,
          height: 629,
        }),
      },
    ],
    sources: [
      overwiki("Black_Mesa_Security_Force", "Black Mesa Security Force"),
      overwiki("Barney_Calhoun", "Barney Calhoun"),
    ],
  },
  {
    id: "barney-calhoun",
    slug: "barney-calhoun",
    name: "Barney Calhoun",
    category: "characters",
    details: {
      affiliation: "Black Mesa (seguridad)",
      voiceActor: "Michael Shapiro",
      designers: ["Chuck Jones"],
    },
    summary:
      "Guardia de seguridad de Black Mesa que se convirtió en personaje con nombre después de Half-Life. En el juego original es el guardia que llama a una puerta al principio, durante el viaje en tranvía.",
    notes: [
      "Cuando salió Half-Life, el guardia que llama a la puerta de las instalaciones de seguridad del Área 3 no se llamaba Barney Calhoun: Blue Shift le dio ese nombre después.",
      "Marc Laidlaw tomó el apellido de F. W. Colqhoun, un personaje de la película Ravenous (1999).",
      "Al principio de Half-Life ya lleva chaleco y casco, aunque en Blue Shift no los coge de su taquilla hasta después de cruzar esa puerta.",
    ],
    appearances: halfLife,
    sources: [overwiki("Barney_Calhoun", "Barney Calhoun")],
  },
  {
    id: "black-mesa-scientists",
    slug: "cientificos-de-black-mesa",
    name: "Científicos de Black Mesa",
    category: "characters",
    details: {
      affiliation: "Black Mesa (equipo científico)",
      voiceActor: "Harry S. Robins",
      designers: ["Chuck Jones"],
    },
    summary:
      "La mayor parte del personal del Centro de Investigación Black Mesa. Abren puertas con los escáneres de retina y pueden curar al jugador, pero son muy frágiles.",
    notes: [
      "Los cuatro modelos originales se llaman en los archivos Glasses, Einstein, Luther y Slick; el High Definition Pack rebautizó a Glasses como «Walter».",
      "Según Marc Laidlaw, todas las conversaciones al azar de los científicos las escribió Kelly Bailey.",
      "Los científicos pueden curar 25 puntos al jugador cuando este tiene 50 de salud o menos; los que llevan traje aislante no pueden.",
      "La presentación dice que Black Mesa ofrece igualdad de oportunidades, pero la única mujer del juego es el asistente holográfico: las científicas se recortaron.",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "black-mesa-scientists",
          model: "scientist.mdl",
          subject: "Científico de Black Mesa",
          width: 202,
          height: 600,
        }),
      },
    ],
    sources: [overwiki("Black_Mesa_Science_Team", "Black Mesa Science Team")],
  },
  {
    id: "eli-vance",
    slug: "eli-vance",
    name: "Eli Vance",
    category: "characters",
    details: {
      affiliation: "Black Mesa (Materiales Anómalos)",
      designers: ["Dhabih Eng"],
    },
    summary:
      "Científico del sector de Materiales Anómalos de Black Mesa. En Half-Life es uno de los científicos genéricos y nunca se dice su nombre.",
    notes: [
      "Es, en esencia, el modelo de científico afroamericano de Half-Life («scientist03», o «Luther») convertido en personaje.",
      "En Half-Life se le ve dos veces en el Sector C, sin nombre; Half-Life 2 lo identificó después.",
    ],
    appearances: halfLife,
    sources: [overwiki("Eli_Vance", "Eli Vance")],
  },
  {
    id: "isaac-kleiner",
    slug: "isaac-kleiner",
    name: "Isaac Kleiner",
    category: "characters",
    details: {
      affiliation: "Black Mesa (equipo científico)",
      voiceActor: "Harry S. Robins",
      designers: ["Marc Laidlaw"],
    },
    summary:
      "Científico de Black Mesa y antiguo mentor de Gordon Freeman. En Half-Life solo existe en el trasfondo del personaje y en los manuales.",
    notes: [
      "Apareció en el trasfondo de Gordon Freeman escrito para Half-Life con el nombre de «Alex», y después lo citan los manuales de Half-Life (PC y PlayStation 2) y de Blue Shift.",
      "Es, en esencia, el modelo de científico con gafas de Half-Life («scientist01», o «Walter») convertido en personaje.",
      "Harry S. Robins, su voz, puso también la de casi todos los científicos de Half-Life y sus expansiones.",
    ],
    appearances: halfLife,
    sources: [overwiki("Isaac_Kleiner", "Isaac Kleiner")],
  },
];
