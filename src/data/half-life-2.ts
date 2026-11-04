import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

const hl2Appearances = [{ gameId: "half-life-2" }];

// Capítulos de Half-Life 2 (1 a 14) con sus mapas reales del motor Source
export const halfLife2Chapters: Entry[] = [
  {
    id: "hl2-point-insertion",
    slug: "punto-de-insercion",
    name: "Punto de inserción",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: [
        "d1_trainstation_01",
        "d1_trainstation_02",
        "d1_trainstation_03",
        "d1_trainstation_04",
      ],
    },
    summary:
      "Gordon Freeman llega en tren a la estación central de la Ciudad 17. Tras eludir los controles de la Protección Civil con ayuda de Barney Calhoun, escapa por las azoteas de los bloques residenciales.",
    appearances: hl2Appearances,
    sources: [overwiki("Point_Insertion", "Point Insertion")],
  },
  {
    id: "hl2-a-red-letter-day",
    slug: "un-dia-memorable",
    name: "Un día memorable",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["d1_trainstation_05", "d1_trainstation_06"],
    },
    summary:
      "Alyx rescata a Gordon y lo conduce al laboratorio clandestino del doctor Kleiner. Tras recibir el traje HEV Mark V, un fallo en la teletransportación alerta a la Ciudadela de su presencia.",
    appearances: hl2Appearances,
    sources: [overwiki("A_Red_Letter_Day", "A Red Letter Day")],
  },
  {
    id: "hl2-route-kanal",
    slug: "ruta-del-canal",
    name: "Ruta del canal",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: [
        "d1_canals_01",
        "d1_canals_02",
        "d1_canals_03",
        "d1_canals_04",
        "d1_canals_05",
      ],
    },
    summary:
      "Gordon huye a través de los canales de drenaje de la ciudad mientras la Protección Civil despliega patrullas, helicópteros y cápsulas de headcrabs para detener su avance.",
    appearances: hl2Appearances,
    sources: [overwiki("Route_Kanal", "Route Kanal")],
  },
  {
    id: "hl2-water-hazard",
    slug: "agua-peligrosa",
    name: "Agua peligrosa",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: [
        "d1_canals_06",
        "d1_canals_07",
        "d1_canals_08",
        "d1_canals_09",
        "d1_canals_10",
        "d1_canals_11",
        "d1_canals_12",
        "d1_canals_13",
      ],
    },
    summary:
      "A bordo de un hidrodeslizador dotado de un cañón de pulso alienígena, Freeman recorre las vías fluviales industriales hasta derribar al helicóptero cazador Combine.",
    appearances: hl2Appearances,
    sources: [overwiki("Water_Hazard", "Water Hazard")],
  },
  {
    id: "hl2-black-mesa-east",
    slug: "black-mesa-este",
    name: "Black Mesa Este",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: ["d1_eli_01", "d1_eli_02"],
    },
    summary:
      "Llegada a la base de la resistencia construida en una central hidroeléctrica. Gordon recibe el manipulador de energía punto cero y practica con D0g antes de que la base sea asaltada por las fuerzas Combine.",
    appearances: hl2Appearances,
    sources: [overwiki("Black_Mesa_East_(chapter)", "Black Mesa East")],
  },
  {
    id: "hl2-we-dont-go-to-ravenholm",
    slug: "no-vamos-a-ravenholm",
    name: "«No vamos a Ravenholm...»",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: [
        "d1_town_01",
        "d1_town_02",
        "d1_town_03",
        "d1_town_04",
        "d1_town_05",
      ],
    },
    summary:
      "Pueblo minero aislado que la Alianza bombardeó con cápsulas de headcrabs. Freeman sobrevive entre trampas improvisadas y hordas de zombis con la ayuda del padre Grigori.",
    appearances: hl2Appearances,
    sources: [
      overwiki("We_Don%27t_Go_To_Ravenholm...", "We Don't Go To Ravenholm..."),
    ],
  },
  {
    id: "hl2-highway-17",
    slug: "autopista-17",
    name: "Autopista 17",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: [
        "d2_coast_01",
        "d2_coast_02",
        "d2_coast_03",
        "d2_coast_04",
        "d2_coast_05",
        "d2_coast_06",
        "d2_coast_07",
        "d2_coast_08",
      ],
    },
    summary:
      "Viaje a lo largo de la costa desecada en un buggy scout, limpiando campamentos rebeldes atacados por cañoneras y cruzando el icónico puente ferroviario suspendido.",
    appearances: hl2Appearances,
    sources: [overwiki("Highway_17_(chapter)", "Highway 17")],
  },
  {
    id: "hl2-sandtraps",
    slug: "trampas-de-arena",
    name: "Trampas de arena",
    category: "maps",
    details: {
      chapter: 8,
      mapFiles: [
        "d2_coast_09",
        "d2_coast_10",
        "d2_coast_11",
        "d2_coast_12",
        "d2_prison_01",
      ],
    },
    summary:
      "Gordon debe atravesar playas infestadas de hormigas león sin tocar la arena. Tras abatir al guardia de las hormigas, un vortigaunt le extrae las feromonas que le permiten controlar al enjambre.",
    appearances: hl2Appearances,
    sources: [overwiki("Sandtraps", "Sandtraps")],
  },
  {
    id: "hl2-nova-prospekt",
    slug: "nova-prospekt",
    name: "Nova Prospekt",
    category: "maps",
    details: {
      chapter: 9,
      mapFiles: [
        "d2_prison_02",
        "d2_prison_03",
        "d2_prison_04",
        "d2_prison_05",
      ],
    },
    summary:
      "Asalto a la antigua prisión de alta seguridad transformada por la Alianza en planta de procesamiento y conversión biológica de prisioneros humanos en Stalkers y soldados transhumanos.",
    appearances: hl2Appearances,
    sources: [overwiki("Nova_Prospekt_(chapter)", "Nova Prospekt")],
  },
  {
    id: "hl2-entanglement",
    slug: "entrelazamiento",
    name: "Entrelazamiento",
    category: "maps",
    details: {
      chapter: 10,
      mapFiles: ["d2_prison_06", "d2_prison_07", "d2_prison_08"],
    },
    summary:
      "Gordon y Alyx localizan a Eli Vance y descubren la traición de Judith Mossman. Utilizan el teletransportador Combine para huir en el último instante mientras la estación se destruye.",
    appearances: hl2Appearances,
    sources: [overwiki("Entanglement", "Entanglement")],
  },
  {
    id: "hl2-anticitizen-one",
    slug: "anticiudadano-uno",
    name: "Anticiudadano uno",
    category: "maps",
    details: {
      chapter: 11,
      mapFiles: [
        "d3_c17_01",
        "d3_c17_02",
        "d3_c17_03",
        "d3_c17_04",
        "d3_c17_05",
        "d3_c17_06",
        "d3_c17_07",
        "d3_c17_08",
      ],
    },
    summary:
      "La destrucción del teletransportador de Nova Prospekt genera un desfase temporal de una semana. Al emerger en el laboratorio de Kleiner, la Ciudad 17 está inmersa en una insurrección armada total contra la Alianza.",
    appearances: hl2Appearances,
    sources: [overwiki("Anticitizen_One", "Anticitizen One")],
  },
  {
    id: "hl2-follow-freeman",
    slug: "seguid-a-freeman",
    name: "«¡Seguid a Freeman!»",
    category: "maps",
    details: {
      chapter: 12,
      mapFiles: [
        "d3_c17_09",
        "d3_c17_10",
        "d3_c17_11",
        "d3_c17_12",
        "d3_c17_13",
      ],
    },
    summary:
      "Gordon lidera a los escuadrones rebeldes a través de barricadas, francotiradores y zancudos blindados (Striders) hasta alcanzar la plaza que rodea la imponente base de la Ciudadela.",
    appearances: hl2Appearances,
    sources: [overwiki("Follow_Freeman!", "Follow Freeman!")],
  },
  {
    id: "hl2-our-benefactors",
    slug: "nuestros-benefactores",
    name: "Nuestros benefactores",
    category: "maps",
    details: {
      chapter: 13,
      mapFiles: [
        "d3_citadel_01",
        "d3_citadel_02",
        "d3_citadel_03",
        "d3_citadel_04",
        "d3_citadel_05",
      ],
    },
    summary:
      "Infiltración en el interior de la Ciudadela a bordo de una vaina de transporte. El campo de confiscación desintegra todas las armas convencionales de Gordon, pero sobrecarga el arma gravitatoria con energía azul de materia oscura.",
    appearances: hl2Appearances,
    sources: [overwiki("Our_Benefactors", "Our Benefactors")],
  },
  {
    id: "hl2-dark-energy",
    slug: "energia-oscura",
    name: "Energía oscura",
    category: "maps",
    details: {
      chapter: 14,
      mapFiles: ["d3_breen_01"],
    },
    summary:
      "Confrontación decisiva en el despacho del doctor Wallace Breen y destrucción del reactor de fusión oscura en la cúspide de la torre, deteniendo el portal hacia el universo Combine.",
    appearances: hl2Appearances,
    sources: [overwiki("Dark_Energy_(chapter)", "Dark Energy")],
  },
];

// Armamento icónico de Half-Life 2
export const halfLife2Weapons: Entry[] = [
  {
    id: "hl2-gravity-gun",
    slug: "arma-gravitatoria",
    name: "Manipulador de energía punto cero",
    category: "weapons",
    details: { slot: 1 },
    summary:
      "Conocida comúnmente como el arma gravitatoria, permite atraer, sostener y arrojar objetos físicos pesados del entorno con gran fuerza cinética. Diseñada por Eli Vance para manipular materiales peligrosos.",
    notes: [
      "No consume munición convencional y es fundamental para la resolución de rompecabezas físicos en Half-Life 2.",
      "En el capítulo «Nuestros benefactores», el campo de confiscación de la Ciudadela sobrecarga el dispositivo con energía oscura (adquiriendo un resplandor azul), lo que le permite manipular y desintegrar a soldados orgánicos.",
    ],
    appearances: hl2Appearances,
    sources: [
      overwiki(
        "Zero_Point_Energy_Field_Manipulator",
        "Zero Point Energy Field Manipulator",
      ),
    ],
  },
  {
    id: "hl2-pistol",
    slug: "pistola-9mm-usp",
    name: "Pistola de 9 mm",
    category: "weapons",
    details: { slot: 2, ammo: "Munición de 9 mm", maxAmmo: 150 },
    summary:
      "Arma secundaria estándar fabricada a partir del modelo Heckler & Koch USP Match, de dotación común entre los oficiales de la Protección Civil de la Ciudad 17.",
    appearances: hl2Appearances,
    sources: [overwiki("9mm_Pistol_(HL2)", "9mm Pistol")],
  },
  {
    id: "hl2-357",
    slug: "revolver-magnum-357",
    name: "Revólver .357 Magnum",
    category: "weapons",
    details: { slot: 2, ammo: "Munición .357", maxAmmo: 12 },
    summary:
      "Revólver de seis disparos de alta potencia y precisión quirúrgica. Causa un daño letal a la mayoría de infantería enemiga a media y larga distancia.",
    appearances: hl2Appearances,
    sources: [overwiki(".357_Magnum", ".357 Magnum")],
  },
  {
    id: "hl2-smg",
    slug: "subfusil-smg",
    name: "Subfusil SMG",
    category: "weapons",
    details: { slot: 3, ammo: "Munición de 4.6 mm", maxAmmo: 225 },
    summary:
      "Subfusil automático compacto basado en el HK MP7, equipado con lanzagranadas secundario integrado que dispara proyectiles explosivos de 40 mm.",
    appearances: hl2Appearances,
    sources: [
      overwiki("Submachine_Gun_(Half-Life_2)", "Submachine Gun (Half-Life 2)"),
    ],
  },
  {
    id: "hl2-pulse-rifle",
    slug: "rifle-de-pulso-ar2",
    name: "Rifle de pulso de la Alianza (AR2)",
    category: "weapons",
    details: { slot: 3, ammo: "Cápsulas de pulso", maxAmmo: 60 },
    summary:
      "Fusil de asalto militar reglamentario de la infantería Overwatch. Su disparo secundario libera una esfera de energía oscura que rebota y desintegra instantáneamente a los objetivos orgánicos.",
    appearances: hl2Appearances,
    sources: [
      overwiki(
        "Overwatch_Standard_Issue_Pulse_Rifle",
        "Overwatch Standard Issue Pulse Rifle",
      ),
    ],
  },
  {
    id: "hl2-shotgun",
    slug: "escopeta-spas-12",
    name: "Escopeta de combate",
    category: "weapons",
    details: { slot: 3, ammo: "Cartuchos de escopeta", maxAmmo: 30 },
    summary:
      "Escopeta táctica SPAS-12 capaz de disparar un cartucho simple o ambos cañones simultáneamente con su gatillo secundario para un devastador impacto a quemarropa.",
    appearances: hl2Appearances,
    sources: [overwiki("Shotgun_(Half-Life_2)", "Shotgun (Half-Life 2)")],
  },
  {
    id: "hl2-crossbow",
    slug: "ballesta-de-resistencia",
    name: "Ballesta de francotirador",
    category: "weapons",
    details: { slot: 4, ammo: "Barras incandescentes", maxAmmo: 10 },
    summary:
      "Arma artesanal construida con barras metálicas de ferralla electrificadas al rojo vivo, que ensartan y fijan a los enemigos contra las paredes a gran distancia.",
    appearances: hl2Appearances,
    sources: [overwiki("Crossbow_(Half-Life_2)", "Crossbow (Half-Life 2)")],
  },
  {
    id: "hl2-rpg",
    slug: "lanzacohetes-rpg",
    name: "Lanzacohetes guiado (RPG)",
    category: "weapons",
    details: { slot: 4, ammo: "Cohetes RPG", maxAmmo: 3 },
    summary:
      "Lanzador de misiles provisto de una mira láser que permite dirigir manualmente la trayectoria de los cohetes en vuelo, indispensable para abatir cañoneras y zancudos Combine.",
    appearances: hl2Appearances,
    sources: [
      overwiki(
        "Rocket_Propelled_Grenade_(Half-Life_2)",
        "Rocket Propelled Grenade",
      ),
    ],
  },
  {
    id: "hl2-bugbait",
    slug: "cebo-de-feromonas",
    name: "Cebo de feromonas (Ferópodo)",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Vesícula orgánica extraída de un guardián de hormigas león. Al apretarla o lanzarla, pacifica a las hormigas león obreras y las dirige para que ataquen a los objetivos señalados.",
    appearances: hl2Appearances,
    sources: [overwiki("Pheropod", "Pheropod")],
  },
];

// Personajes principales de Half-Life 2
export const halfLife2Characters: Entry[] = [
  {
    id: "alyx-vance",
    slug: "alyx-vance",
    name: "Alyx Vance",
    category: "characters",
    details: {
      affiliation: "Resistencia humana",
      voiceActor: "Merle Dandridge",
    },
    summary:
      "Figura destacada de la resistencia contra la Alianza e hija del doctor Eli Vance. Experta en pirateo informático, combate y compañera inseparable de Gordon Freeman.",
    notes: [
      "Fue salvada de la destrucción de Black Mesa cuando era una niña por el G-Man, quien la vigiló como una valiosa inversión de futuro.",
    ],
    appearances: hl2Appearances,
    sources: [overwiki("Alyx_Vance", "Alyx Vance")],
  },
  {
    id: "wallace-breen",
    slug: "wallace-breen",
    name: "Dr. Wallace Breen",
    category: "characters",
    details: {
      affiliation: "Imperio Combine / Administrador de la Tierra",
      voiceActor: "Robert Culp",
    },
    summary:
      "Antiguo Administrador del Centro de Investigación Black Mesa. Negoció la rendición de la humanidad tras la Guerra de las Siete Horas y fue nombrado gobernador títere de la Tierra por la Alianza.",
    appearances: hl2Appearances,
    sources: [overwiki("Wallace_Breen", "Wallace Breen")],
  },
  {
    id: "judith-mossman",
    slug: "judith-mossman",
    name: "Dra. Judith Mossman",
    category: "characters",
    details: {
      affiliation: "Resistencia humana / Colaboradora encubierta",
      voiceActor: "Michelle Forbes",
    },
    summary:
      "Física colaboradora en Black Mesa Este. Mantiene una relación tensa con Alyx y actúa como agente doble entregando a Eli Vance al doctor Breen en Nova Prospekt, antes de arrepentirse y liberar a los cautivos.",
    appearances: hl2Appearances,
    sources: [overwiki("Judith_Mossman", "Judith Mossman")],
  },
  {
    id: "father-grigori",
    slug: "padre-grigori",
    name: "Padre Grigori",
    category: "characters",
    details: {
      affiliation: "Independiente / Ravenholm",
      voiceActor: "Jim French",
    },
    summary:
      "Sacerdote ortodoxo que permanece como el único habitante humano cuerdo en Ravenholm tras el bombardeo Combine, dedicando su vida a otorgar la «salvación» a sus antiguos feligreses zombificados.",
    appearances: hl2Appearances,
    sources: [overwiki("Father_Grigori", "Father Grigori")],
  },
  {
    id: "d0g",
    slug: "d0g",
    name: "D0g",
    category: "characters",
    details: {
      affiliation: "Resistencia humana / Alyx Vance",
    },
    summary:
      "Robot cuadrúpedo cuadrangular construido originalmente por Eli Vance para proteger a Alyx en su infancia. Posee una fuerza física descomunal capaz de volcar transportes blindados y levantar compuertas.",
    appearances: hl2Appearances,
    sources: [overwiki("D0g", "D0g")],
  },
];

// Enemigos de Half-Life 2
export const halfLife2Enemies: Entry[] = [
  {
    id: "hl2-civil-protection",
    slug: "proteccion-civil",
    name: "Protección Civil (Metropolice)",
    category: "enemies",
    details: { origin: "Humanos colaboracionistas" },
    summary:
      "Policía militar de choque desplegada por la Alianza en la Ciudad 17. Formada por humanos voluntarios que aceptan colaborar a cambio de mejores raciones de alimento y privilegios sociales.",
    appearances: hl2Appearances,
    sources: [overwiki("Civil_Protection", "Civil Protection")],
  },
  {
    id: "hl2-overwatch-soldier",
    slug: "soldado-de-la-alianza",
    name: "Soldado transhumano de la Alianza",
    category: "enemies",
    details: { origin: "Organismo cibernético transhumano" },
    summary:
      "Efectivos de élite del brazo militar Overwatch. Son humanos sometidos a cirugías radicales de amputación, alteración neuronal e implantes cibernéticos para eliminar su libre albedrío y emociones.",
    appearances: hl2Appearances,
    sources: [overwiki("Overwatch_Soldier", "Overwatch Soldier")],
  },
  {
    id: "hl2-strider",
    slug: "strider",
    name: "Strider (Zancudo)",
    category: "enemies",
    details: { origin: "Biosíntesis biomecánica Combine" },
    summary:
      "Colosal plataforma artillera tripode biomecánica. Equipado con un cañón de pulso de disparo rápido bajo su cabeza y un cañón de partículas pesadas capaz de derribar edificios enteros.",
    appearances: hl2Appearances,
    sources: [overwiki("Strider", "Strider")],
  },
  {
    id: "hl2-gunship",
    slug: "canonera-combine",
    name: "Cañonera de la Alianza (Gunship)",
    category: "enemies",
    details: { origin: "Biosíntesis aerodinámica Combine" },
    summary:
      "Aeronave de ataque aéreo biomecánica provista de un rotor de propulsión biológico en su cola. Es capaz de interceptar cohetes guiados en pleno vuelo utilizando su cañón ventral.",
    appearances: hl2Appearances,
    sources: [overwiki("Combine_Gunship", "Combine Gunship")],
  },
  {
    id: "hl2-fast-zombie",
    slug: "zombi-rapido",
    name: "Zombi rápido",
    category: "enemies",
    details: { origin: "Cadáver humano mutado por Fast Headcrab" },
    summary:
      "Mutación esquelética desprovista de piel y grasa corporal, dotada de una musculatura hipertrofiada que le permite saltar grandes alturas y trepar tuberías a gran velocidad mientras emite aullidos.",
    appearances: hl2Appearances,
    sources: [overwiki("Fast_Zombie", "Fast Zombie")],
  },
  {
    id: "hl2-antlion",
    slug: "hormiga-leon",
    name: "Hormiga león (Antlion)",
    category: "enemies",
    details: { origin: "Fauna invasora de Xen" },
    summary:
      "Insectoide carnívoro de tamaño mediano que anida bajo la arena costera de la Tierra. Emergen violentamente al detectar vibraciones en el suelo para despedazar a sus presas en enjambre.",
    appearances: hl2Appearances,
    sources: [overwiki("Antlion", "Antlion")],
  },
];

// Curiosidades y Easter eggs de Half-Life 2
export const halfLife2Extras: Entry[] = [
  {
    id: "hl2-havok-physics",
    slug: "fisica-havok-hl2",
    name: "El motor de física Havok",
    category: "trivia",
    summary:
      "Half-Life 2 revolucionó los videojuegos de disparos al integrar profundamente el motor de física Havok en el diseño de niveles, las mecánicas de puzles y el combate.",
    notes: [
      "El arma gravitatoria se concibió inicialmente como una herramienta de depuración para que los diseñadores movieran objetos por el escenario, antes de convertirse en el arma central del juego.",
    ],
    appearances: hl2Appearances,
    sources: [overwiki("Physics", "Physics in Source")],
  },
  {
    id: "hl2-all-knowing-vortigaunt",
    slug: "vortigaunt-omnipresente",
    name: "El Vortigaunt que todo lo sabe",
    category: "easter-eggs",
    summary:
      "En los canales de la Ciudad 17 (capítulo «Agua peligrosa»), una tubería oculta conduce a una cueva donde un solitario Vortigaunt cocina un headcrab y recita crípticas profecías sobre el G-Man, Black Mesa y el destino de Freeman.",
    appearances: hl2Appearances,
    sources: [overwiki("All-Knowing_Vortigaunt", "All-Knowing Vortigaunt")],
  },
];
