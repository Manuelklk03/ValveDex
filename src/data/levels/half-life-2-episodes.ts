import type { LevelDetail } from "@/domain/level";
import type { Source } from "@/domain/source";

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

const ep1Storyline = overwiki(
  "Half-Life_2:_Episode_One_storyline",
  "Half-Life 2: Episode One storyline",
);
const ep2Storyline = overwiki(
  "Half-Life_2:_Episode_Two_storyline",
  "Half-Life 2: Episode Two storyline",
);
const locations = overwiki(
  "Locations_in_the_Half-Life_and_Portal_universe",
  "Locations in the Half-Life and Portal universe",
);
const citadelCore = overwiki("Citadel_Core", "Citadel Core");
const underground = overwiki("City_17_Underground", "City 17 Underground");
const hospital = overwiki("Hospital", "Hospital");
const trainstation = overwiki(
  "Technical_Trainstation",
  "Technical Trainstation",
);
const radioTower = overwiki("Radio_Tower_settlement", "Radio Tower settlement");
const whiteForestInn = overwiki("The_White_Forest_Inn", "The White Forest Inn");

// Solo se escribe ficha de los niveles que una fuente permite atribuir a un mapa concreto.
// Los capítulos de Episode One y Episode Two que la wiki describe solo de forma global
// (por ejemplo, los mapas de Victory Mine o los de White Forest salvo el último) se omiten.
export const episodeLevels: LevelDetail[] = [
  // Episode One, «Alarma injustificada» y «Intervención directa»
  {
    chapterId: "ep1-direct-intervention",
    mapFile: "ep1_citadel_03",
    summary:
      "El núcleo de la Ciudadela, con su sala de control y la cámara donde hay que contener el reactor.",
    paragraphs: [
      {
        text: "El núcleo está en la parte baja de la Ciudadela. Una gran sala de control lo domina desde arriba y un ascensor central baja hasta su cámara. Tres salas a los lados de la cámara contienen las máquinas que mantienen el reactor dentro de límites seguros.",
      },
      {
        text: "Al activar cada uno de los tres enlaces de energía, una parte del símbolo rojizo de las pantallas cercanas pasa a azul. Los Stalkers trabajan junto al núcleo: un logro del juego pide contenerlo sin matar a ninguno.",
      },
      {
        text: "Más adelante se sabe que los Combine desestabilizaron el núcleo a propósito para enviar un mensaje a sus fuerzas fuera de la Tierra a través del portal sobre la Ciudadela.",
        spoiler: true,
      },
    ],
    characterIds: ["alyx-vance", "hl2-gordon-freeman"],
    sources: [citadelCore, locations, ep1Storyline],
  },

  // Episode One, «Bajos fondos»
  {
    chapterId: "ep1-lowlife",
    mapFile: "ep1_c17_00",
    summary:
      "Primer nivel del subsuelo de la Ciudad 17: el tren Razor descarrilado y los túneles y garajes en ruinas que siguen.",
    paragraphs: [
      {
        text: "Gordon y Alyx salen del vagón del tren Razor en el que viajaban y avanzan por un subsuelo sin luz de garajes, túneles de mantenimiento y almacenes. Alyx es la única con arma, así que Gordon debe iluminar a los enemigos con la linterna para que ella los vea y pueda defenderse.",
      },
      {
        text: "El subsuelo está infestado de headcrabs y zombis, entre ellos los zombines, soldados Combine zombificados que se presentan en este capítulo. Las hormigas león empiezan a abrirse paso excavando desde la superficie.",
      },
    ],
    characterIds: ["alyx-vance", "hl2-gordon-freeman"],
    enemyIds: [
      "hl2-poison-headcrab",
      "hl2-classic-zombie",
      "ep1-zombine",
      "hl2-antlion",
    ],
    sources: [underground, ep1Storyline],
  },
  {
    chapterId: "ep1-lowlife",
    mapFile: "ep1_c17_00a",
    summary:
      "Aparcamientos derrumbados del subsuelo, con madrigueras de hormigas león y una sala inundada.",
    paragraphs: [
      {
        text: "El nivel transcurre en aparcamientos destruidos por el derrumbe del techo, con madrigueras de hormigas león en el suelo. En este capítulo hay que bloquear las madrigueras con coches mientras Alyx ayuda a combatir a las hormigas león, y el juego no da pistas de cómo hacerlo.",
      },
    ],
    characterIds: ["alyx-vance", "hl2-gordon-freeman"],
    enemyIds: ["hl2-antlion"],
    sources: [underground, ep1Storyline],
  },

  // Episode One, «Huida urbana»
  {
    chapterId: "ep1-urban-flight",
    mapFile: "ep1_c17_01",
    summary:
      "Salida del subsuelo a la superficie de la Ciudad 17, con la ciudad devastada a la vista.",
    paragraphs: [
      {
        text: "Al llegar a la superficie, Gordon y Alyx ven hasta qué punto está destruida la Ciudad 17. Kleiner aparece en las pantallas de la red de propaganda de Breen, en la que ha tomado el control de la emisión.",
      },
      {
        text: "Kleiner anuncia por esas pantallas que el campo de supresión que impedía la reproducción humana ha caído.",
        spoiler: true,
      },
    ],
    characterIds: ["alyx-vance", "hl2-gordon-freeman", "hl2-isaac-kleiner"],
    sources: [underground, ep1Storyline],
  },

  // Episode One, «Salida 17»: los dos últimos capítulos, solo lo verificable y sin desenlace
  {
    chapterId: "ep1-exit-17",
    mapFile: "ep1_c17_05",
    summary:
      "El aparcamiento entre el hospital y la estación técnica de trenes, donde se reúnen con Barney.",
    paragraphs: [
      {
        text: "Gordon y Alyx se reencuentran con Barney Calhoun en el aparcamiento y empiezan a llevar a los refugiados a los trenes que salen de la estación técnica de mercancías, mientras los Combine los atacan. Gordon acompaña a los ciudadanos; Alyx se queda dentro del edificio y los cubre con un cañón de emplazamiento.",
      },
    ],
    characterIds: ["hl2-barney-calhoun", "alyx-vance", "hl2-gordon-freeman"],
    enemyIds: ["hl2-shield-scanner"],
    sources: [trainstation, hospital, ep1Storyline],
  },
  {
    chapterId: "ep1-exit-17",
    mapFile: "ep1_c17_06",
    summary:
      "La estación técnica de trenes, con un strider que bloquea las vías, en el último nivel del episodio.",
    paragraphs: [
      {
        text: "Tras acompañar a los refugiados, Gordon y Alyx van a por el último tren. Un strider y soldados Combine los atacan y los separan un momento. Gordon derrota al strider con el lanzacohetes, se reúne con Alyx y los dos salen por fin de la Ciudad 17.",
      },
      {
        text: "Mientras se alejan, la Ciudadela entra en estado crítico y de ella salen cápsulas de Consejeros.",
        spoiler: true,
      },
    ],
    characterIds: ["hl2-barney-calhoun", "alyx-vance", "hl2-gordon-freeman"],
    enemyIds: ["hl2-strider"],
    sources: [trainstation, ep1Storyline],
  },

  // Episode Two, «De copiloto»
  {
    chapterId: "ep2-riding-shotgun",
    mapFile: "ep2_outland_06a",
    summary:
      "El asentamiento de la torre de radio, una base abandonada de la Resistencia junto a una carretera de montaña.",
    paragraphs: [
      {
        text: "Gordon y Alyx llegan en el Muscle Car a un conjunto de tres almacenes y una torre de radio. Alyx quiere avisar a White Forest de que los Combine se dirigen a la base. Para restablecer la energía hay que conectar cables en los enchufes del sótano del almacén principal, y el ascensor necesita su propia conexión.",
      },
      {
        text: "Cuando hay corriente, una manada de hunters los embosca. Es el primer combate directo de Gordon contra ellos, y el almacén principal se diseñó para enseñar a luchar contra el hunter. Después, Alyx habla por radio con el doctor Magnusson, pero la comunicación se corta durante la conversación.",
      },
    ],
    characterIds: ["alyx-vance", "hl2-gordon-freeman", "ep2-arne-magnusson"],
    enemyIds: ["ep2-hunter"],
    sources: [radioTower, ep2Storyline, locations],
  },

  // Episode Two, «Bajo el radar»
  {
    chapterId: "ep2-under-the-radar",
    mapFile: "ep2_outland_10",
    summary:
      "La posada White Forest Inn, un pueblo abandonado de las Outlands donde los Combine tienden una emboscada.",
    paragraphs: [
      {
        text: "Con el túnel de la carretera cortado por un control Combine, hay que desviarse por el pueblo y entrar en una emboscada. Gordon y Alyx se refugian en la posada, asediada por varios escuadrones de soldados Combine con apoyo de hunters, hasta que desactivan el campo de fuerza que bloquea la salida del pueblo.",
      },
      {
        text: "La emboscada es la única vez en Episode Two en que se lucha contra élites Combine. Los dos que participan dejan caer un vial de salud y una batería, el único caso de la saga en que enemigos no mecánicos sueltan baterías.",
      },
    ],
    characterIds: ["alyx-vance", "hl2-gordon-freeman"],
    enemyIds: ["ep2-hunter", "hl2-combine-elite"],
    sources: [whiteForestInn, ep2Storyline, locations],
  },

  // Episode Two, «T menos uno»: el último capítulo, solo la premisa a la vista
  {
    chapterId: "ep2-t-minus-one",
    mapFile: "ep2_outland_12a",
    summary:
      "El último nivel del episodio, en la base de White Forest, con el cohete listo para lanzarse.",
    paragraphs: [
      {
        text: "Tras rechazar el ataque de los Combine, Gordon vuelve a la base de White Forest, donde el equipo prepara el lanzamiento del cohete. El doctor Magnusson le da las gracias.",
      },
      {
        text: "El cohete se lanza con éxito y cierra el superportal, lo que impide que los Combine llamen a refuerzos de su mundo. Mientras Gordon y Alyx se preparan para ir en helicóptero en busca de la doctora Mossman, unos Consejeros atacan el hangar. El episodio termina con ese ataque.",
        spoiler: true,
      },
    ],
    characterIds: ["alyx-vance", "hl2-gordon-freeman", "ep2-arne-magnusson"],
    sources: [ep2Storyline, locations],
  },
];
