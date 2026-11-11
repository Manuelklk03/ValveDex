import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function portalWiki(page: string, title: string): Source {
  return {
    title: `${title} - Portal Wiki`,
    url: `https://theportalwiki.com/wiki/${page}`,
    kind: "wiki",
  };
}

function wikipedia(page: string, title: string): Source {
  return {
    title: `${title} - Wikipedia`,
    url: `https://en.wikipedia.org/wiki/${page}`,
    kind: "wiki",
  };
}

const p1 = [{ gameId: "portal" }];
const p2 = [{ gameId: "portal-2" }];
const both = [{ gameId: "portal" }, { gameId: "portal-2" }];

// Capítulos y cámaras. Portal no tiene capítulos oficiales: las tres primeras fichas agrupan las
// cámaras de prueba según el archivo de mapa que les corresponde en Portal Wiki. Los de Portal 2
// siguen los nueve capítulos de esa wiki y los cursos del modo cooperativo.
export const portalMaps: Entry[] = [
  {
    id: "portal-map-chambers-00-07",
    slug: "mapa-portal-camaras-00-07",
    name: "Portal: cámaras de prueba 00 a 07",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: [
        "testchmb_a_00",
        "testchmb_a_01",
        "testchmb_a_02",
        "testchmb_a_03",
      ],
    },
    summary:
      "Primer tramo del Centro de Enriquecimiento de Aperture Science: las cámaras de la 00 a la 07. Según Portal Wiki, cada archivo de mapa contiene dos cámaras consecutivas.",
    appearances: p1,
    sources: [
      portalWiki("Portal_Test_Chamber_00", "Portal Test Chamber 00"),
      portalWiki("Portal_Test_Chamber_07", "Portal Test Chamber 07"),
    ],
  },
  {
    id: "portal-map-chambers-08-12",
    slug: "mapa-portal-camaras-08-12",
    name: "Portal: cámaras de prueba 08 a 12",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: [
        "testchmb_a_04",
        "testchmb_a_05",
        "testchmb_a_06",
        "testchmb_a_07",
      ],
    },
    summary:
      "Tramo intermedio de Portal: las cámaras de la 08 a la 12, repartidas en cuatro archivos de mapa.",
    appearances: p1,
    sources: [
      portalWiki("Portal_Test_Chamber_08", "Portal Test Chamber 08"),
      portalWiki("Portal_Test_Chamber_12", "Portal Test Chamber 12"),
    ],
  },
  {
    id: "portal-map-chambers-13-19",
    slug: "mapa-portal-camaras-13-19",
    name: "Portal: cámaras de prueba 13 a 19",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: [
        "testchmb_a_08",
        "testchmb_a_09",
        "testchmb_a_10",
        "testchmb_a_11",
        "testchmb_a_13",
        "testchmb_a_14",
        "testchmb_a_15",
        "testchmb_a_08_advanced",
        "testchmb_a_09_advanced",
        "testchmb_a_10_advanced",
        "testchmb_a_11_advanced",
        "testchmb_a_13_advanced",
        "testchmb_a_14_advanced",
      ],
    },
    summary:
      "Últimas cámaras de prueba de Portal, de la 13 a la 19. Incluye además los archivos de las versiones avanzadas de las cámaras 13 a 18.",
    appearances: p1,
    sources: [
      portalWiki("Portal_Test_Chamber_13", "Portal Test Chamber 13"),
      portalWiki("Portal_Test_Chamber_19", "Portal Test Chamber 19"),
    ],
  },
  {
    id: "portal-map-escape",
    slug: "mapa-portal-escape",
    name: "Portal: la fuga",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: ["escape_00", "escape_01", "escape_02"],
    },
    summary:
      "Archivos de la parte final de Portal. El último, escape_02, corresponde a la cámara de GLaDOS.",
    appearances: p1,
    sources: [
      portalWiki("Portal_GLaDOS%27_Chamber", "Portal: GLaDOS' Chamber"),
    ],
  },
  {
    id: "portal-2-map-ch1",
    slug: "mapa-portal-2-the-courtesy-call",
    name: "Capítulo 1: The Courtesy Call",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: [
        "sp_a1_intro1",
        "sp_a1_intro2",
        "sp_a1_intro3",
        "sp_a1_intro4",
        "sp_a1_intro5",
        "sp_a1_intro6",
        "sp_a1_intro7",
        "sp_a1_wakeup",
        "sp_a2_intro",
      ],
    },
    summary:
      "Capítulo inicial de la campaña de un jugador de Portal 2: Chell despierta en una cámara de reposo y recorre las primeras cámaras de prueba. Portal Wiki incluye aquí también el mapa sp_a2_intro (el incinerador).",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Chapter_1_Introduction",
        "Portal 2 Chapter 1: Introduction",
      ),
      portalWiki(
        "Portal_2_Chapter_1_Incinerator",
        "Portal 2 Chapter 1: Incinerator",
      ),
    ],
  },
  {
    id: "portal-2-map-ch2",
    slug: "mapa-portal-2-the-cold-boot",
    name: "Capítulo 2: The Cold Boot",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: [
        "sp_a2_laser_intro",
        "sp_a2_laser_stairs",
        "sp_a2_dual_lasers",
        "sp_a2_laser_over_goo",
        "sp_a2_catapult_intro",
        "sp_a2_trust_fling",
        "sp_a2_pit_flings",
        "sp_a2_fizzler_intro",
      ],
    },
    summary:
      "Ocho cámaras de prueba de Portal 2 en las que se introducen los rayos térmicos, las placas de lanzamiento y los campos de aniquilación de materiales.",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Chapter_2_Test_Chamber_1",
        "Portal 2 Chapter 2: Test Chamber 01",
      ),
      portalWiki(
        "Portal_2_Chapter_2_Test_Chamber_8",
        "Portal 2 Chapter 2: Test Chamber 08",
      ),
    ],
  },
  {
    id: "portal-2-map-ch3",
    slug: "mapa-portal-2-the-return",
    name: "Capítulo 3: The Return",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: [
        "sp_a2_sphere_peek",
        "sp_a2_ricochet",
        "sp_a2_bridge_intro",
        "sp_a2_bridge_the_gap",
        "sp_a2_turret_intro",
        "sp_a2_laser_relays",
        "sp_a2_turret_blocker",
        "sp_a2_laser_vs_turret",
        "sp_a2_pull_the_rug",
      ],
    },
    summary:
      "Nueve cámaras de prueba, de la 09 a la 17 según Portal Wiki. Aparecen los puentes de luz sólida y las torretas centinela dentro de las cámaras.",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Chapter_3_Test_Chamber_9",
        "Portal 2 Chapter 3: Test Chamber 09",
      ),
      portalWiki(
        "Portal_2_Chapter_3_Test_Chamber_17",
        "Portal 2 Chapter 3: Test Chamber 17",
      ),
    ],
  },
  {
    id: "portal-2-map-ch4",
    slug: "mapa-portal-2-the-surprise",
    name: "Capítulo 4: The Surprise",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: [
        "sp_a2_column_blocker",
        "sp_a2_laser_chaining",
        "sp_a2_triple_laser",
        "sp_a2_bts1",
        "sp_a2_bts2",
      ],
    },
    summary:
      "Cámaras 18 a 20 y la cámara 21, que Portal Wiki titula «Escape». Los mapas sp_a2_bts1 y sp_a2_bts2 se citan en la página de esa última cámara.",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Chapter_4_Test_Chamber_18",
        "Portal 2 Chapter 4: Test Chamber 18",
      ),
      portalWiki(
        "Portal_2_Chapter_4_Test_Chamber_21_(Escape)",
        "Portal 2 Chapter 4: Test Chamber 21 (Escape)",
      ),
    ],
  },
  {
    id: "portal-2-map-ch5",
    slug: "mapa-portal-2-the-escape",
    name: "Capítulo 5: The Escape",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: [
        "sp_a2_bts3",
        "sp_a2_bts4",
        "sp_a2_bts5",
        "sp_a2_bts6",
        "sp_a2_core",
      ],
    },
    summary:
      "Recorrido por las zonas de servicio del complejo: fabricación de torretas, centro de control de torretas, generador de neurotoxina, paseo en tubo y guarida de GLaDOS.",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Chapter_5_Turret_Manufacturing",
        "Portal 2 Chapter 5: Turret Manufacturing",
      ),
      portalWiki(
        "Portal_2_Chapter_5_GLaDOS%27_Lair",
        "Portal 2 Chapter 5: GLaDOS' Lair",
      ),
    ],
  },
  {
    id: "portal-2-map-ch6",
    slug: "mapa-portal-2-the-fall",
    name: "Capítulo 6: The Fall",
    category: "maps",
    details: {
      chapter: 6,
      mapFiles: [
        "sp_a3_00",
        "sp_a3_01",
        "sp_a3_03",
        "sp_a3_jump_intro",
        "sp_a3_bomb_flings",
        "sp_a3_crazy_box",
        "sp_a3_transition01",
      ],
    },
    summary:
      "Capítulo con las zonas The Pit, Beyond the Seal, las tres primeras esferas de enriquecimiento (Enrichment Sphere 1 a 3) y Reconciliation, según la división de Portal Wiki.",
    appearances: p2,
    sources: [
      portalWiki("Portal_2_Chapter_6_The_Pit", "Portal 2 Chapter 6: The Pit"),
      portalWiki(
        "Portal_2_Chapter_6_Reconciliation",
        "Portal 2 Chapter 6: Reconciliation",
      ),
    ],
  },
  {
    id: "portal-2-map-ch7",
    slug: "mapa-portal-2-the-reunion",
    name: "Capítulo 7: The Reunion",
    category: "maps",
    details: {
      chapter: 7,
      mapFiles: [
        "sp_a3_speed_ramp",
        "sp_a3_speed_flings",
        "sp_a3_portal_intro",
        "sp_a3_end",
      ],
    },
    summary:
      "Esferas de enriquecimiento 4 a 6 y la ascensión, siguiendo la división de Portal Wiki.",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Chapter_7_Enrichment_Sphere_4",
        "Portal 2 Chapter 7: Enrichment Sphere 4",
      ),
      portalWiki(
        "Portal_2_Chapter_7_Ascension",
        "Portal 2 Chapter 7: Ascension",
      ),
    ],
  },
  {
    id: "portal-2-map-ch8",
    slug: "mapa-portal-2-the-itch",
    name: "Capítulo 8: The Itch",
    category: "maps",
    details: {
      chapter: 8,
      mapFiles: [
        "sp_a4_intro",
        "sp_a4_tb_intro",
        "sp_a4_tb_trust_drop",
        "sp_a4_tb_wall_button",
        "sp_a4_tb_polarity",
        "sp_a4_tb_catch",
        "sp_a4_stop_the_box",
        "sp_a4_laser_catapult",
        "sp_a4_laser_platform",
        "sp_a4_speed_tb_catch",
        "sp_a4_jump_polarity",
      ],
    },
    summary:
      "Capítulo con once mapas, de los cuales sp_a4_intro corresponde a la sección de los Frankenturrets. Los archivos tb se refieren a los embudos de excursión (tractor beam).",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Chapter_8_Frankenturrets",
        "Portal 2 Chapter 8: Frankenturrets",
      ),
      portalWiki(
        "Portal_2_Chapter_8_Test_Chamber_16",
        "Portal 2 Chapter 8: Test Chamber 16",
      ),
    ],
  },
  {
    id: "portal-2-map-ch9",
    slug: "mapa-portal-2-the-part-where-he-kills-you",
    name: "Capítulo 9: The Part Where He Kills You",
    category: "maps",
    details: {
      chapter: 9,
      mapFiles: [
        "sp_a4_finale1",
        "sp_a4_finale2",
        "sp_a4_finale3",
        "sp_a4_finale4",
      ],
    },
    summary:
      "Último capítulo de la campaña de un jugador. Portal Wiki lo divide en cuatro tramos: Mash-up, Holmes vs. Moriarty, Morton's Fork y Finale.",
    appearances: p2,
    sources: [
      portalWiki("Portal_2_Chapter_9_Mash-up", "Portal 2 Chapter 9: Mash-up"),
      portalWiki("Portal_2_Chapter_9_Finale", "Portal 2 Chapter 9: Finale"),
    ],
  },
  {
    id: "portal-2-map-coop-1",
    slug: "mapa-portal-2-cooperativo-team-building",
    name: "Cooperativo, curso 1: Team Building",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: [
        "mp_coop_doors",
        "mp_coop_race_2",
        "mp_coop_laser_2",
        "mp_coop_rat_maze",
        "mp_coop_laser_crusher",
        "mp_coop_teambts",
      ],
    },
    summary:
      "Primer curso del modo cooperativo de Portal 2, con seis cámaras para Atlas y P-body.",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Co-op_Course_1_Chamber_1",
        "Portal 2 Co-op Course 1: Chamber 01",
      ),
      portalWiki(
        "Portal_2_Co-op_Course_1_Chamber_6",
        "Portal 2 Co-op Course 1: Chamber 06",
      ),
    ],
  },
  {
    id: "portal-2-map-coop-2",
    slug: "mapa-portal-2-cooperativo-mass-and-velocity",
    name: "Cooperativo, curso 2: Mass and Velocity",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: [
        "mp_coop_fling_3",
        "mp_coop_infinifling_train",
        "mp_coop_come_along",
        "mp_coop_fling_1",
        "mp_coop_catapult_1",
        "mp_coop_multifling_1",
        "mp_coop_fling_crushers",
        "mp_coop_fan",
      ],
    },
    summary:
      "Segundo curso del modo cooperativo, de ocho cámaras, centrado en la masa y la velocidad.",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Co-op_Course_2_Chamber_1",
        "Portal 2 Co-op Course 2: Chamber 01",
      ),
      portalWiki(
        "Portal_2_Co-op_Course_2_Chamber_8",
        "Portal 2 Co-op Course 2: Chamber 08",
      ),
    ],
  },
  {
    id: "portal-2-map-coop-3",
    slug: "mapa-portal-2-cooperativo-hard-light-surfaces",
    name: "Cooperativo, curso 3: Hard-Light Surfaces",
    category: "maps",
    details: {
      chapter: 3,
      mapFiles: [
        "mp_coop_wall_intro",
        "mp_coop_wall_2",
        "mp_coop_catapult_wall_intro",
        "mp_coop_wall_block",
        "mp_coop_catapult_2",
        "mp_coop_turret_walls",
        "mp_coop_turret_ball",
        "mp_coop_wall_5",
      ],
    },
    summary:
      "Tercer curso del modo cooperativo, de ocho cámaras, con las superficies de luz sólida como elemento central.",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Co-op_Course_3_Chamber_1",
        "Portal 2 Co-op Course 3: Chamber 01",
      ),
      portalWiki(
        "Portal_2_Co-op_Course_3_Chamber_8",
        "Portal 2 Co-op Course 3: Chamber 08",
      ),
    ],
  },
  {
    id: "portal-2-map-coop-4",
    slug: "mapa-portal-2-cooperativo-excursion-funnels",
    name: "Cooperativo, curso 4: Excursion Funnels",
    category: "maps",
    details: {
      chapter: 4,
      mapFiles: [
        "mp_coop_tbeam_redirect",
        "mp_coop_tbeam_drill",
        "mp_coop_tbeam_catch_grind_1",
        "mp_coop_tbeam_laser_1",
        "mp_coop_tbeam_polarity",
        "mp_coop_tbeam_polarity2",
        "mp_coop_tbeam_polarity3",
        "mp_coop_tbeam_maze",
        "mp_coop_tbeam_end",
      ],
    },
    summary:
      "Cuarto curso del modo cooperativo, de nueve cámaras, dedicado a los embudos de excursión (llamados tbeam en los archivos).",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Co-op_Course_4_Chamber_1",
        "Portal 2 Co-op Course 4: Chamber 01",
      ),
      portalWiki(
        "Portal_2_Co-op_Course_4_Chamber_9",
        "Portal 2 Co-op Course 4: Chamber 09",
      ),
    ],
  },
  {
    id: "portal-2-map-coop-5",
    slug: "mapa-portal-2-cooperativo-mobility-gels",
    name: "Cooperativo, curso 5: Mobility Gels",
    category: "maps",
    details: {
      chapter: 5,
      mapFiles: [
        "mp_coop_paint_come_along",
        "mp_coop_paint_redirect",
        "mp_coop_paint_bridge",
        "mp_coop_paint_walljumps",
        "mp_coop_paint_speed_fling",
        "mp_coop_paint_red_racer",
        "mp_coop_paint_speed_catch",
        "mp_coop_paint_longjump_intro",
      ],
    },
    summary:
      "Quinto curso del modo cooperativo, de ocho cámaras, dedicado a los geles de movilidad (paint en los archivos del juego).",
    appearances: p2,
    sources: [
      portalWiki(
        "Portal_2_Co-op_Course_5_Chamber_1",
        "Portal 2 Co-op Course 5: Chamber 01",
      ),
      portalWiki(
        "Portal_2_Co-op_Course_5_Chamber_8",
        "Portal 2 Co-op Course 5: Chamber 08",
      ),
    ],
  },
];

export const portalWeapons: Entry[] = [
  {
    id: "portal-weapon-handheld-portal-device",
    slug: "arma-aperture-science-handheld-portal-device",
    name: "Aperture Science Handheld Portal Device",
    category: "weapons",
    details: { slot: 1 },
    summary:
      "El dispositivo portátil de portales, conocido como pistola de portales: la herramienta experimental que Chell usa para completar las cámaras de prueba. Dispara dos portales enlazados, de manera que como máximo hay dos abiertos a la vez.",
    appearances: both,
    sources: [
      portalWiki(
        "Aperture_Science_Handheld_Portal_Device",
        "Aperture Science Handheld Portal Device",
      ),
      wikipedia("Portal_(video_game)", "Portal (video game)"),
    ],
  },
  {
    id: "portal-weapon-weighted-storage-cube",
    slug: "arma-cubo-de-almacenaje",
    name: "Weighted Storage Cube",
    category: "weapons",
    details: { slot: 2 },
    summary:
      "Cubo de pruebas que aparece en los dos juegos. Se usa sobre todo para pulsar botones, desactivar torretas o redirigir rayos térmicos.",
    appearances: both,
    sources: [portalWiki("Weighted_Storage_Cube", "Cubes")],
  },
  {
    id: "portal-weapon-weighted-companion-cube",
    slug: "arma-cubo-de-companero",
    name: "Weighted Companion Cube",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Cubo casi idéntico al de almacenaje, pero con un corazón rosa en lugar del logotipo de Aperture Science. En Portal se entrega a Chell para completar la cámara 17.",
    appearances: both,
    sources: [portalWiki("Companion_Cube", "Weighted Companion Cube")],
  },
  {
    id: "portal-weapon-repulsion-gel",
    slug: "arma-gel-de-repulsion",
    name: "Gel de repulsión (Repulsion Gel)",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Sustancia azul claro de Portal 2 que hace rebotar a los jugadores y objetos que caen sobre una superficie cubierta con ella. Agacharse anula el efecto.",
    appearances: p2,
    sources: [portalWiki("Repulsion_Gel", "Repulsion Gel")],
  },
  {
    id: "portal-weapon-propulsion-gel",
    slug: "arma-gel-de-propulsion",
    name: "Gel de propulsión (Propulsion Gel)",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Sustancia naranja de Portal 2 que reduce mucho la fricción y aumenta la velocidad de quien se mueve sobre ella. Agacharse reduce la velocidad.",
    appearances: p2,
    sources: [portalWiki("Propulsion_Gel", "Propulsion Gel")],
  },
  {
    id: "portal-weapon-conversion-gel",
    slug: "arma-gel-de-conversion",
    name: "Gel de conversión (Conversion Gel)",
    category: "weapons",
    details: { slot: 6 },
    summary:
      "Gel blanco de Portal 2 que permite colocar portales en superficies donde normalmente no se puede. Según Cave Johnson, está hecho de roca lunar triturada.",
    appearances: p2,
    sources: [portalWiki("Conversion_Gel", "Conversion Gel")],
  },
  {
    id: "portal-weapon-thermal-discouragement-beam",
    slug: "arma-rayo-termico",
    name: "Thermal Discouragement Beam",
    category: "weapons",
    details: { slot: 7 },
    summary:
      "Rayo térmico de Portal 2 que GLaDOS llama «láser mortal». Se emite en línea recta desde un dispositivo fijo; dirigirlo a un receptor activa mecanismos necesarios para salir de la cámara.",
    appearances: p2,
    sources: [
      portalWiki("Thermal_Discouragement_Beam", "Thermal Discouragement Beam"),
    ],
  },
  {
    id: "portal-weapon-excursion-funnel",
    slug: "arma-embudo-de-excursion",
    name: "Excursion Funnel",
    category: "weapons",
    details: { slot: 8 },
    summary:
      "Haz cilíndrico de luz azul de Portal 2, llamado también rayo tractor. Quien entra en él pierde el peso y se desplaza en la dirección del flujo, que puede invertirse con un botón. Puede atravesar portales.",
    appearances: p2,
    sources: [portalWiki("Excursion_Funnel", "Excursion Funnel")],
  },
  {
    id: "portal-weapon-aerial-faith-plate",
    slug: "arma-placa-de-fe-aerea",
    name: "Aerial Faith Plate",
    category: "weapons",
    details: { slot: 9 },
    summary:
      "Plataforma de lanzamiento de Portal 2 que catapulta al jugador o a cualquier objeto hacia un destino con velocidad y altura fijas. Funciona combinada con portales.",
    appearances: p2,
    sources: [portalWiki("Aerial_Faith_Plate", "Aerial Faith Plate")],
  },
  {
    id: "portal-weapon-hard-light-bridge",
    slug: "arma-puente-de-luz-solida",
    name: "Hard Light Bridge",
    category: "weapons",
    details: { slot: 10 },
    summary:
      "Superficie semitranslúcida de luz sólida de Portal 2. Sirve de puente, de escudo frente a las torretas o de pared, y se puede redirigir con portales.",
    appearances: p2,
    sources: [portalWiki("Hard_Light_Bridge", "Hard Light Bridge")],
  },
  {
    id: "portal-weapon-pneumatic-diversity-vent",
    slug: "arma-ventilacion-neumatica",
    name: "Pneumatic Diversity Vent",
    category: "weapons",
    details: { slot: 11 },
    summary:
      "Componente principal de los tubos neumáticos de Aperture Science, que empujan y redirigen objetos por el complejo. La pieza no aparece en el primer Portal, aunque sus tubos sí.",
    appearances: p2,
    sources: [
      portalWiki("Pneumatic_Diversity_Vent", "Pneumatic Diversity Vent"),
    ],
  },
];

export const portalCharacters: Entry[] = [
  {
    id: "portal-character-chell",
    slug: "personaje-chell",
    name: "Chell",
    category: "characters",
    details: { affiliation: "Aperture Science (sujeto de pruebas)" },
    summary:
      "Protagonista muda de Portal y de la campaña de un jugador de Portal 2. Es una sujeto de pruebas del Centro de Enriquecimiento de Aperture Science. Casi todo lo que se sabe de su pasado lo dice GLaDOS, cuya fiabilidad es dudosa.",
    appearances: both,
    sources: [
      portalWiki("Chell", "Chell"),
      wikipedia("Portal_(video_game)", "Portal (video game)"),
    ],
  },
  {
    id: "portal-character-glados",
    slug: "personaje-glados",
    name: "GLaDOS",
    category: "characters",
    details: {
      affiliation: "Aperture Science",
      voiceActor: "Ellen McLain",
    },
    summary:
      "GLaDOS (Genetic Lifeform and Disk Operating System) es la inteligencia artificial que gobierna el Centro de Enriquecimiento de Aperture Science. Dirige y se burla de Chell durante las pruebas de Portal y supervisa a Atlas y P-body en el modo cooperativo de Portal 2.",
    appearances: both,
    sources: [
      portalWiki("GLaDOS", "GLaDOS"),
      wikipedia("Portal_(video_game)", "Portal (video game)"),
    ],
  },
  {
    id: "portal-character-wheatley",
    slug: "personaje-wheatley",
    name: "Wheatley",
    category: "characters",
    details: {
      affiliation: "Aperture Science (esfera de personalidad)",
      voiceActor: "Stephen Merchant",
    },
    summary:
      "Esfera de personalidad de acento inglés del oeste del país (West Country) que guía a Chell en la campaña de un jugador de Portal 2. Su nombre oficial es Intelligence Dampening Sphere.",
    appearances: p2,
    sources: [
      portalWiki("Wheatley", "Wheatley"),
      wikipedia("Portal_2", "Portal 2"),
    ],
  },
  {
    id: "portal-character-cave-johnson",
    slug: "personaje-cave-johnson",
    name: "Cave Johnson",
    category: "characters",
    details: {
      affiliation: "Aperture Science (fundador)",
      voiceActor: "J. K. Simmons",
    },
    summary:
      "Fundador de Aperture Science, que nació en 1943 como Aperture Fixtures, una fabricante de cortinas de ducha. En Portal 2 aparece solo a través de grabaciones automáticas de entre 1952 y los años ochenta. Su nombre de usuario figuraba ya en una de las guaridas de Rattmann de Portal.",
    appearances: p2,
    sources: [
      portalWiki("Cave_Johnson", "Cave Johnson"),
      wikipedia("Portal_2", "Portal 2"),
    ],
  },
  {
    id: "portal-character-caroline",
    slug: "personaje-caroline",
    name: "Caroline",
    category: "characters",
    details: { affiliation: "Aperture Science (asistente de Cave Johnson)" },
    summary:
      "Asistente personal de Cave Johnson en Aperture Science. No aparece en pantalla en la campaña de un jugador de Portal 2: se oye en una breve parte de las grabaciones de Johnson y se la menciona en el capítulo 5.",
    appearances: p2,
    sources: [portalWiki("Caroline", "Caroline")],
  },
  {
    id: "portal-character-atlas",
    slug: "personaje-atlas",
    name: "Atlas",
    category: "characters",
    details: {
      affiliation: "Aperture Science (robot de pruebas cooperativas)",
    },
    summary:
      "Uno de los dos robots jugables del modo cooperativo de Portal 2, construidos por GLaDOS para su Cooperative Testing Initiative. Es el bajo y redondeado, de ojo azul; lo controla el anfitrión de la partida. GLaDOS lo llama «Blue».",
    appearances: p2,
    sources: [portalWiki("Atlas", "Atlas"), wikipedia("Portal_2", "Portal 2")],
  },
  {
    id: "portal-character-p-body",
    slug: "personaje-p-body",
    name: "P-body",
    category: "characters",
    details: {
      affiliation: "Aperture Science (robot de pruebas cooperativas)",
    },
    summary:
      "Compañero alto y delgado de Atlas en el modo cooperativo de Portal 2, de ojo naranja y diseño parecido al de una torreta. Lo controla el invitado de la partida; GLaDOS lo llama «Orange».",
    appearances: p2,
    sources: [
      portalWiki("P-body", "P-body"),
      wikipedia("Portal_2", "Portal 2"),
    ],
  },
  {
    id: "portal-character-doug-rattmann",
    slug: "personaje-doug-rattmann",
    name: "Doug Rattmann",
    category: "characters",
    details: { affiliation: "Aperture Science (antiguo empleado)" },
    summary:
      "Científico de Aperture Science que no aparece en el juego, pero cuyos grafitis y murales se encuentran detrás de los paneles de las cámaras de Portal y de la campaña de Portal 2. Es el protagonista del cómic Portal 2: Lab Rat.",
    appearances: both,
    sources: [
      portalWiki("Doug_Rattmann", "Doug Rattmann"),
      portalWiki("Lab_Rat", "Portal 2: Lab Rat"),
    ],
  },
  {
    id: "portal-character-fact-core",
    slug: "personaje-esfera-de-datos",
    name: "Esfera de datos (Fact Core)",
    category: "characters",
    details: {
      affiliation: "Aperture Science (esfera de personalidad)",
      voiceActor: "Nolan North",
    },
    summary:
      "Esfera de personalidad corrupta de Portal 2 que habla como un sabelotodo y recita datos a gran velocidad. La mayoría de sus datos son falsos o absurdos.",
    appearances: p2,
    sources: [portalWiki("Fact_Core", "Fact Sphere")],
  },
  {
    id: "portal-character-space-core",
    slug: "personaje-esfera-espacial",
    name: "Esfera espacial (Space Core)",
    category: "characters",
    details: {
      affiliation: "Aperture Science (esfera de personalidad)",
      voiceActor: "Nolan North",
    },
    summary:
      "Esfera de personalidad corrupta de Portal 2 que habla de forma hiperactiva y no deja de hablar de su fascinación por el espacio exterior.",
    appearances: p2,
    sources: [portalWiki("Space_Core", "Space Sphere")],
  },
  {
    id: "portal-character-adventure-core",
    slug: "personaje-esfera-de-aventura",
    name: "Esfera de aventura (Rick)",
    category: "characters",
    details: {
      affiliation: "Aperture Science (esfera de personalidad)",
      voiceActor: "Nolan North",
    },
    summary:
      "Esfera de personalidad corrupta de Portal 2 que se hace llamar «Rick». Habla como un duro de película, presume de valentía y flirtea con Chell.",
    appearances: p2,
    sources: [portalWiki("Adventure_Core", "Adventure Sphere")],
  },
  {
    id: "portal-character-morality-core",
    slug: "personaje-esfera-de-moralidad",
    name: "Esfera de moralidad (Morality Core)",
    category: "characters",
    details: { affiliation: "Aperture Science (esfera de personalidad)" },
    summary:
      "Esfera de personalidad acoplada a GLaDOS para regular su comportamiento. Estaba programada para impedirle actos poco éticos, a modo de conciencia artificial. Aparece en Portal y en el cómic Lab Rat.",
    appearances: p1,
    sources: [portalWiki("Morality_Core", "Morality Core")],
  },
];

export const portalEnemies: Entry[] = [
  {
    id: "portal-enemy-sentry-turret",
    slug: "enemigo-torreta-centinela",
    name: "Torreta centinela (Sentry Turret)",
    category: "enemies",
    details: { origin: "Aperture Science" },
    summary:
      "Robot trípode que aparece en todos los juegos de Portal. No puede moverse por sí solo, pero abre los lados de su carcasa para mostrar dos ametralladoras. Su ojo rojo emite un láser de puntería. Dispara hasta que el objetivo muere o sale de su vista.",
    appearances: both,
    sources: [
      portalWiki("Sentry_Turret", "Sentry Turret"),
      portalWiki("Turret", "Turrets"),
    ],
  },
  {
    id: "portal-enemy-defective-turret",
    slug: "enemigo-torreta-defectuosa",
    name: "Torreta defectuosa (Defective Turret)",
    category: "enemies",
    details: { origin: "Aperture Science (fabricación defectuosa)" },
    summary:
      "Torretas dañadas, sin munición o mal ensambladas, a las que Wheatley llama «torretas basura». Son inofensivas para Chell y hablan con humor y sarcasmo. Aparecen por primera vez en el capítulo 5 de Portal 2.",
    appearances: p2,
    sources: [portalWiki("Defective_Turret", "Defective Turret")],
  },
  {
    id: "portal-enemy-frankenturret",
    slug: "enemigo-frankenturret",
    name: "Frankenturret",
    category: "enemies",
    details: { origin: "Wheatley (híbrido de cubo y torretas)" },
    summary:
      "Híbrido de cubo de almacenaje y dos torretas centinela que Wheatley construye durante Portal 2. Los concibió para que pulsaran botones por su cuenta, pero solo deambulan y se caen. No existe un nombre oficial: la wiki toma el de los comentarios de los desarrolladores.",
    appearances: p2,
    sources: [portalWiki("Frankenturret", "Frankenturret")],
  },
];

export const portalExtras: Entry[] = [
  {
    id: "portal-trivia-narbacular-drop",
    slug: "curiosidad-narbacular-drop",
    name: "Narbacular Drop, el origen de Portal",
    category: "trivia",
    summary:
      "Narbacular Drop (2005) fue el proyecto final de unos estudiantes de DigiPen Institute of Technology, desarrollado por Nuclear Monkey Software. Ya tenía dos portales enlazados que se colocaban en cualquier superficie no metálica. Gabe Newell se interesó y Valve contrató a todo el equipo.",
    appearances: p1,
    sources: [wikipedia("Narbacular_Drop", "Narbacular Drop")],
  },
  {
    id: "portal-trivia-orange-box",
    slug: "curiosidad-portal-en-the-orange-box",
    name: "Portal se lanzó dentro de The Orange Box",
    category: "trivia",
    summary:
      "Portal salió el 10 de octubre de 2007 en The Orange Box para Windows y Xbox 360 (en PlayStation 3, el 11 de diciembre de 2007), junto con Half-Life 2, sus dos episodios y Team Fortress 2. Wikipedia señala que incluirlo en el paquete fue un experimento de Valve.",
    appearances: p1,
    sources: [
      wikipedia("Portal_(video_game)", "Portal (video game)"),
      {
        title: "Portal - Steam",
        url: "https://store.steampowered.com/app/400",
        kind: "official",
      },
    ],
  },
  {
    id: "portal-trivia-cake",
    slug: "curiosidad-la-tarta",
    name: "La tarta",
    category: "trivia",
    summary:
      "GLaDOS promete tarta a Chell como incentivo para completar todas las cámaras de Portal. Las guaridas de Rattmann repiten que «la tarta es una mentira», lo que dio origen a un meme de internet. Según Wikipedia, el elemento de la tarta y los mensajes de las zonas de servicio los escribió y dibujó Kim Swift.",
    appearances: p1,
    sources: [
      portalWiki("Cake", "Cake"),
      wikipedia("Portal_(video_game)", "Portal (video game)"),
    ],
  },
  {
    id: "portal-trivia-still-alive",
    slug: "curiosidad-still-alive",
    name: "«Still Alive», la canción de los créditos de Portal",
    category: "trivia",
    summary:
      "Canción de los créditos finales de Portal, escrita por Jonathan Coulton e interpretada por GLaDOS (voz de Ellen McLain). Se elogió por su composición original y su humor.",
    appearances: p1,
    sources: [
      wikipedia("Portal_(video_game)", "Portal (video game)"),
      wikipedia("Still_Alive_(song)", "Still Alive (song)"),
    ],
  },
  {
    id: "portal-trivia-want-you-gone",
    slug: "curiosidad-want-you-gone",
    name: "«Want You Gone», la canción de los créditos de Portal 2",
    category: "trivia",
    summary:
      "Tema de los créditos finales de la campaña de un jugador de Portal 2, grabado por Jonathan Coulton. Valve quiso incluir más música tras el éxito de «Still Alive», y Coulton y el guionista Erik Wolpaw hablaron de crear un momento emocional comparable antes de escribir el final del juego.",
    appearances: p2,
    sources: [
      wikipedia("Want_You_Gone", "Want You Gone"),
      portalWiki("Want_You_Gone", "Want You Gone"),
    ],
  },
  {
    id: "portal-trivia-lab-rat",
    slug: "curiosidad-portal-2-lab-rat",
    name: "Portal 2: Lab Rat",
    category: "trivia",
    summary:
      "Novela gráfica publicada en abril de 2011 que cuenta lo ocurrido entre el final de Portal y el principio de Portal 2. Es un trabajo conjunto de Valve y dibujantes como Michael Avon Oeming y Jay Pinkerton. Se puede leer en línea y en los extras de Portal 2.",
    appearances: p2,
    sources: [portalWiki("Lab_Rat", "Portal 2: Lab Rat")],
  },
  {
    id: "portal-trivia-half-life-link",
    slug: "curiosidad-portal-y-half-life",
    name: "Portal comparte universo con Half-Life",
    category: "trivia",
    summary:
      "La serie Portal se sitúa en el universo de Half-Life. Wikipedia indica que los sucesos de Portal transcurren entre el primer y el segundo Half-Life, y que Black Mesa es la gran rival de Aperture Science en el campo de la investigación de portales.",
    appearances: both,
    sources: [
      wikipedia("Portal_2", "Portal 2"),
      portalWiki("Black_Mesa", "Black Mesa"),
    ],
  },
  {
    id: "portal-trivia-potato-sack",
    slug: "curiosidad-potato-sack",
    name: "Potato Sack, el juego de realidad alternativa de Portal 2",
    category: "trivia",
    summary:
      "Valve anunció Portal 2 en marzo de 2010 y lo promocionó con juegos de realidad alternativa, entre ellos Potato Sack, una colaboración con varios desarrolladores independientes. Después apareció «GLaDOS@Home», una parodia de computación distribuida que desbloqueó el juego con antelación.",
    appearances: p2,
    sources: [wikipedia("Portal_2", "Portal 2")],
  },
  {
    id: "portal-easter-egg-rattmann-dens",
    slug: "easter-egg-guaridas-de-rattmann",
    name: "Las guaridas de Rattmann",
    category: "easter-eggs",
    summary:
      "Detrás de paneles de varias cámaras de Portal hay zonas ocultas con grafitis, dibujos y mensajes escritos por un empleado de Aperture Science. En una de ellas aparecen un nombre de usuario y una contraseña de Cave Johnson. En Portal 2 vuelven a encontrarse.",
    appearances: both,
    sources: [
      portalWiki("Doug_Rattmann", "Doug Rattmann"),
      portalWiki("Cave_Johnson", "Cave Johnson"),
    ],
  },
  {
    id: "portal-easter-egg-radios",
    slug: "easter-egg-radios-de-portal",
    name: "Las radios y el juego de realidad alternativa de Portal",
    category: "easter-eggs",
    summary:
      "El parche del 1 de marzo de Portal añadió un logro oculto, «Transmission Received». Para obtenerlo hay que llevar una radio de cada cámara hasta un lugar concreto, donde la música pasa a una serie de pitidos parecidos al código morse. Es el juego de realidad alternativa (ARG) de Portal.",
    appearances: p1,
    sources: [portalWiki("Portal_ARG", "Portal ARG")],
  },
  {
    id: "portal-easter-egg-turret-opera",
    slug: "easter-egg-opera-de-torretas",
    name: "La ópera de las torretas",
    category: "easter-eggs",
    summary:
      "En la cámara 16 de las pruebas de GLaDOS, capítulo 3 de Portal 2, un hueco junto a una pared deja ver una sala donde varias torretas cantan a una torreta prima donna con el sonido de sus carcasas. Reaparece al final de la campaña.",
    appearances: p2,
    sources: [portalWiki("Cara_Mia_Addio", "Turret Opera")],
  },
  {
    id: "portal-easter-egg-cake-recipe",
    slug: "easter-egg-receta-de-la-tarta",
    name: "La receta de la tarta",
    category: "easter-eggs",
    summary:
      "Durante la fuga de Portal, entre el texto ininteligible de varias pantallas de ordenador se mezclan recetas de tarta. Antes de los créditos, la tarta real se ve en una sala rodeada de esferas de personalidad y del Companion Cube.",
    appearances: p1,
    sources: [portalWiki("Cake", "Cake")],
  },
];

export const portalEntries: Entry[] = [
  ...portalMaps,
  ...portalWeapons,
  ...portalCharacters,
  ...portalEnemies,
  ...portalExtras,
];
