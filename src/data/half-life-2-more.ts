import type { Entry, EntryAppearance } from "@/domain/entry";
import type { MediaAsset } from "@/domain/media-asset";
import type { Source } from "@/domain/source";

// Ampliación de Half-Life 2 (juego base), según Combine OverWiki. Sin spoilers de la trama
// y sin cifras de salud o daño: solo se incluyen datos que no vienen de guías de terceros.

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

// Imagen del juego con su página File: de la wiki (licencia «Gamescreenshot»)
function screenshot(
  file: string,
  src: string,
  alt: string,
  width: number,
  height: number,
): { original: MediaAsset } {
  return {
    original: {
      src: `/images/entries/${src}`,
      alt,
      width,
      height,
      source: {
        title: `File:${file} - Combine OverWiki`,
        url: `https://combineoverwiki.net/wiki/File:${file}`,
        kind: "wiki",
      },
      credit: "Captura del modelo del juego, publicada en Combine OverWiki",
      license: "Gamescreenshot (material del juego © Valve)",
    },
  };
}

const hl2 = "half-life-2";

// Armas que faltan en el apartado de Half-Life 2. Son modelos distintos a los de Half-Life 1.
export const halfLife2MoreWeapons: Entry[] = [
  {
    id: "hl2-crowbar",
    slug: "palanca-half-life-2",
    name: "Palanca (Half-Life 2)",
    category: "weapons",
    details: { slot: 1 },
    summary:
      "Herramienta y arma cuerpo a cuerpo de Gordon Freeman. En Half-Life 2 es la única arma de combate cuerpo a cuerpo del jugador y sirve también para romper cajas de suministros y despejar obstáculos.",
    notes: [
      "En Half-Life 2 y sus episodios cualquier variante de headcrab muere de un solo golpe de palanca, sea cual sea su salud; en Half-Life hacían falta hasta tres.",
      "Se blande más despacio que en Half-Life: cada 0,6 segundos aproximadamente, frente a los 0,3 del primer juego.",
      "El arma gravitatoria puede sustituirla como arma de apoyo, pero la palanca sigue siendo más rápida para destruir barricadas y tablones.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Crowbar", "Crowbar")],
  },
  {
    id: "hl2-frag-grenade",
    slug: "granada-de-fragmentacion",
    name: "Granada de fragmentación",
    category: "weapons",
    details: { slot: 5, ammo: "Granadas", maxAmmo: 5 },
    summary:
      "Granada de mano de la Alianza que explota unos segundos después de lanzarse. Se puede lanzar, soltar con suavidad o hacer rodar por el suelo, y la llevan también los soldados enemigos.",
    notes: [
      "La terminología de la Alianza la llama «Bouncer» o «Extractor».",
      "La primera se consigue en el tercer capítulo, «Ruta del canal», detrás de una caja junto al torso de un zombi.",
      "En la anilla se lee «M-83 FRAG», aunque la M-83 real es una granada de humo sin relación con esta.",
      "Las granadas enemigas se pueden recoger y devolver, y el arma gravitatoria permite hacerlo con más seguridad y alcance que con las manos.",
    ],
    appearances: [
      {
        gameId: hl2,
      },
    ],
    sources: [
      overwiki(
        "Fragmentation_Grenade_(Half-Life_2)",
        "Fragmentation Grenade (Half-Life 2)",
      ),
    ],
  },
];

// Enemigos y criaturas que faltan en el apartado de Half-Life 2
export const halfLife2MoreEnemies: Entry[] = [
  {
    id: "hl2-classic-headcrab",
    slug: "headcrab-clasico",
    name: "Headcrab clásico",
    category: "enemies",
    details: { origin: "Fauna parásita de Xen" },
    summary:
      "La variante más común de headcrab, con el cuerpo liso de color tostado, dos patas delanteras largas con garras y dos traseras cortas y gruesas. Salta sobre la cabeza de su presa y toma el control de su cuerpo.",
    notes: [
      "Mide unos dos pies de largo, unos 60 cm, y la mitad de ancho.",
      "Al principio del desarrollo de Half-Life 2, el sucesor directo del headcrab de Half-Life era el que acabó siendo el headcrab rápido; la versión «clásica» se añadió más tarde. Por eso su modelo se llama «headcrabclassic.mdl» y el del rápido, simplemente «headcrab.mdl».",
      "Diseñado por Ted Backman.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Classic_Headcrab", "Classic Headcrab")],
  },
  {
    id: "hl2-fast-headcrab",
    slug: "headcrab-rapido",
    name: "Headcrab rápido",
    category: "enemies",
    details: { origin: "Fauna parásita de Xen" },
    summary:
      "Subespecie hiperactiva del headcrab, más esbelta y ágil, con patas finas con garras alargadas y sin partes bucales visibles. Cubre la distancia con rapidez y salta de forma errática, lo que lo hace difícil de golpear.",
    notes: [
      "Se desconoce si es nativo de Xen, una mutación reciente o el resultado de una manipulación genética de la Alianza.",
      "En una primera fase del desarrollo iba a ser un arma arrojadiza, la Brickbat, equivalente al snark de Half-Life.",
      "Diseñado por Ted Backman.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Fast_Headcrab", "Fast Headcrab")],
  },
  {
    id: "hl2-poison-headcrab",
    slug: "headcrab-venenoso",
    name: "Headcrab venenoso",
    category: "enemies",
    details: { origin: "Fauna parásita de Xen (usada por la Alianza)" },
    summary:
      "Variante de piel oscura con patas gruesas y cuatro colmillos en el «pico» que inyectan una neurotoxina. Antes de saltar tiene que «cargar» el ataque, y la Alianza lo suelta mediante cápsulas de headcrabs.",
    notes: [
      "Su mordisco baja la salud del jugador a 1 al instante; después el traje HEV administra un antídoto que la va recuperando. La salud perdida por el golpe físico no se recupera.",
      "Alyx Vance lo llama «venom crab» en Episode One.",
      "El primer encuentro con uno es en una casa abandonada de Ravenholm.",
      "Es especialmente vulnerable a la palanca.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Poison_Headcrab", "Poison Headcrab")],
  },
  {
    id: "hl2-classic-zombie",
    slug: "zombi-clasico",
    name: "Zombi clásico",
    category: "enemies",
    details: { origin: "Humano parasitado por un headcrab clásico" },
    summary:
      "El zombi común, que en la terminología de la Alianza se llama «necrótico». Camina hacia su presa sin evitar peligros y ataca con sus garras; en Half-Life 2 también puede lanzar objetos contra el jugador.",
    notes: [
      "En Half-Life 2 algunos zombis aparecen «dormidos» y se levantan a atacar si el jugador se acerca o los alerta.",
      "Si las heridas dejan inmovilizado al zombi, el headcrab puede desprenderse del cuerpo.",
      "Marc Laidlaw puso la voz del zombi clásico en Half-Life 2 y sus episodios. La apariencia es de Ted Backman y la inteligencia artificial, de Tom Leonard.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Classic_Zombie", "Classic Zombie")],
  },
  {
    id: "hl2-poison-zombie",
    slug: "zombi-venenoso",
    name: "Zombi venenoso",
    category: "enemies",
    details: { origin: "Humano parasitado por un headcrab venenoso" },
    summary:
      "Zombi hinchado, de tono rojizo y púrpura, lento y encorvado, que carga en la espalda dos o tres headcrabs venenosos y los arroja contra su presa antes de recurrir a las garras.",
    notes: [
      "Aguanta aproximadamente el triple de daño que un zombi normal.",
      "Los headcrabs de su espalda no pueden volver a engancharse una vez que saltan.",
      "Se encuentra por primera vez en el capítulo «No vamos a Ravenholm...».",
      "Diseñado por Ted Backman y David Speyrer.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Poison_Zombie", "Poison Zombie")],
  },
  {
    id: "hl2-antlion-guard",
    slug: "guardia-de-hormigas-leon",
    name: "Guardia de hormigas león (Antlion Guard)",
    category: "enemies",
    details: { origin: "Fauna de Xen (hormigas león)" },
    summary:
      "Variedad de alto rango de las hormigas león, mucho mayor que los soldados y sin capacidad de volar. Embiste a su objetivo, lo lanza al aire y golpea objetos cercanos para arrojárselos.",
    notes: [
      "Posee un órgano, el ferópodo, con una feromona que atrae y dirige a las hormigas león soldado. Los vortigaunts lo extraen y reutilizan como «cebo».",
      "Se vuelve a ver en los episodios.",
      "Su piel fue de un marrón oscuro antes del lanzamiento. En una fase temprana iba a arrojar vainas nocivas, como el bullsquid; esa idea se reutilizó en el ferópodo y la hormiga león obrera.",
      "Los sonidos del guardia parecen sonidos de lobo modificados.",
    ],
    appearances: [
      {
        gameId: hl2,
      },
    ],
    sources: [overwiki("Antlion_Guard", "Antlion Guard")],
  },
  {
    id: "hl2-combine-elite",
    slug: "elite-de-la-alianza",
    name: "Soldado de élite de la Alianza (Combine Elite)",
    category: "enemies",
    details: { origin: "Humano transhumano del Overwatch" },
    summary:
      "La clase de mayor rango del Overwatch. Lleva armadura blanca con casco de un único sensor ocular rojo, es más resistente y preciso que el soldado normal y usa a menudo el disparo secundario del rifle de pulso.",
    notes: [
      "Entre sus predecesores en el desarrollo hay el soldado Synth Elite y el Super Soldier, descartados a favor de un modelo más humanoide.",
      "Una versión temprana, filtrada en el código de la beta, iba a llevar un traje de camuflaje que mezclaba las texturas del entorno.",
      "Se les asigna un nombre de unidad y un número del uno al nueve, como «leader» o «hammer».",
      "Aparece por primera vez en un monitor de seguridad en Nova Prospekt, y en persona en el capítulo siguiente.",
      "Diseñado por Ted Backman; la voz con vocoder es de Kelly Bailey.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Combine_Elite", "Combine Elite")],
  },
  {
    id: "hl2-combine-sniper",
    slug: "francotirador-de-la-alianza",
    name: "Francotirador de la Alianza",
    category: "enemies",
    details: { origin: "Humano transhumano del Overwatch" },
    summary:
      "Soldado transhumano del Overwatch especializado en el rifle de francotirador. Se oculta en puestos elevados, con el cuerpo y el arma ocultos, y dispara por delante de los objetivos en movimiento para acertarles.",
    notes: [
      "Suelen montar «nidos» fortificados casi invulnerables al fuego normal; los explosivos sí los desalojan.",
      "Los disparos destruyen objetos, por lo que no conviene cubrirse tras cajas de madera o barriles.",
      "Un primer concepto de Ted Backman lo mostraba como robot con unos prismáticos por ojos.",
      "El rifle de francotirador iba a poder usarlo el jugador en una versión temprana, antes de ser sustituido por la ballesta de la Resistencia.",
    ],
    appearances: [
      {
        gameId: hl2,
        images: screenshot(
          "Sniper_City_17.jpg",
          "hl2-combine-sniper-half-life-2.jpg",
          "Francotirador de la Alianza en la Ciudad 17",
          685,
          579,
        ),
      },
    ],
    sources: [overwiki("Combine_Sniper", "Combine Sniper")],
  },
  {
    id: "hl2-manhack",
    slug: "manhack",
    name: "Manhack",
    category: "enemies",
    details: { origin: "Arma aérea autónoma de la Alianza" },
    summary:
      "Pequeño dron volador autónomo con tres cuchillas giratorias que lo propulsan y hieren. Llamado «Viscerator» por la Alianza y «Hacks» por los ciudadanos, se despliega en grupos y entra en espacios estrechos como callejones y alcantarillas.",
    notes: [
      "Resiste el fuego de armas, pero se destruye con más facilidad si se le golpea con un objeto duro. Un golpe de palanca o un empujón del arma gravitatoria lo desorienta unos instantes.",
      "Antes de la versión final existieron varios modelos: uno más antiguo con texturas manchadas de sangre y otro naranja con solapas grises en la demo «Tunnels» del E3 2003.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Manhack", "Manhack")],
  },
  {
    id: "hl2-rollermine",
    slug: "rollermine",
    name: "Rollermine",
    category: "enemies",
    details: { origin: "Arma esférica autónoma de la Alianza" },
    summary:
      "Mina esférica y cargada de electricidad, algo mayor que un balón de fútbol. Rueda hacia sus enemigos dentro de un radio amplio y los descarga a corta distancia; se lanza desde el aire con dropships, en grupos de dos a cuatro.",
    notes: [
      "Puede adherirse magnéticamente a un vehículo e interferir en su dirección.",
      "El modelo de la versión filtrada era muy distinto, con cierto parecido a una mina marina, y atacaba de forma continua; en la versión final tiene que cargar antes de volver a atacar.",
      "Llegó a prototiparse una variante, el «Rollerdozer», que solo apartaba objetos sueltos.",
    ],
    appearances: [
      {
        gameId: hl2,
      },
    ],
    sources: [overwiki("Rollermine", "Rollermine")],
  },
  {
    id: "hl2-city-scanner",
    slug: "escaner-de-la-ciudad",
    name: "Escáner de la ciudad (Scanner Type I)",
    category: "enemies",
    details: { origin: "Dron de vigilancia de la Alianza" },
    summary:
      "Cámara de seguridad voladora, esférica y ligeramente blindada, con un ojo central y varias hélices. Patrulla las ciudades y los canales de la Ciudad 17 y avisa a otras unidades cuando localiza a un objetivo.",
    notes: [
      "Funciona con una batería de la Alianza que puede recuperarse al destruirlo y usarse en el traje HEV.",
      "Un escáner muy dañado intenta una embestida kamikaze.",
      "Diseñado por Dhabih Eng y Ted Backman. Su predecesor directo fue el Combot, con un diseño inspirado en la forma y el movimiento de una piraña.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("City_Scanner", "City Scanner")],
  },
  {
    id: "hl2-shield-scanner",
    slug: "escaner-de-escudo",
    name: "Escáner de escudo (Scanner Type II)",
    category: "enemies",
    details: { origin: "Contrapartida biomecánica del escáner de la ciudad" },
    summary:
      "Nave flotante de casco marrón redondeado con un foco y un brazo pinza sintético retráctil, oculto tras una tapa blindada con el emblema de la Alianza. Despliega minas y también acompaña a los striders como observador.",
    notes: [
      "En sus archivos de texturas se le llama «mine layer» (minador).",
      "Originalmente iba a proteger a otras unidades con un escudo de energía; esa función se abandonó.",
      "Diseñado por Ted Backman.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Shield_Scanner", "Shield Scanner")],
  },
  {
    id: "hl2-sentry-gun",
    slug: "torreta-centinela-de-la-alianza",
    name: "Torreta centinela de la Alianza (Sentry Gun)",
    category: "enemies",
    details: { origin: "Plataforma de pulso autónoma de la Alianza" },
    summary:
      "Arma de pulso autónoma sobre un trípode que la Alianza emplea para guardar puntos de paso y zonas importantes. El Overwatch la llama «Sterilizer»; la Resistencia, simplemente «torreta».",
    notes: [
      "En lo jugable es la sucesora de la torreta centinela de Half-Life y la predecesora de la torreta de Aperture Science.",
      "En un monitor de vigilancia de Nova Prospekt se ve a soldados llevándolas al hombro y desplegándolas a mano.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Combine_Sentry_Gun", "Combine Sentry Gun")],
  },
  {
    id: "hl2-hunter-chopper",
    slug: "helicoptero-cazador",
    name: "Helicóptero cazador (Hunter-Chopper)",
    category: "enemies",
    details: { origin: "Helicóptero de ataque de la Alianza" },
    summary:
      "Helicóptero de ataque pesado y veloz de la Alianza, con piloto y artillero, equipado con una torreta de pulso y capaz de soltar bombas. Da apoyo de fuego y caza refugios de la Resistencia.",
    notes: [
      "Su ataque de embestida soltando bombas nació de un fallo de desarrollo: el programador Brian Jacobson quería que cargara disparando y, por error, lo configuró para soltar bombas. Le gustó tanto que lo dejó.",
      "El modelo original de la versión filtrada era un helicóptero de fabricación humana basado en el Kamov Ka-27.",
      "Fuera de Half-Life 2: Lost Coast, ningún helicóptero cazador se combate con el lanzacohetes en la serie.",
      "Los números «V952» de sus texturas son una broma del artista Tri Nguyen.",
    ],
    appearances: [
      {
        gameId: hl2,
      },
    ],
    sources: [
      overwiki("Hunter-Chopper", "Hunter-Chopper"),
      overwiki("Easter_eggs", "Easter eggs"),
    ],
  },
  {
    id: "hl2-combine-dropship",
    slug: "nave-de-transporte-de-la-alianza",
    name: "Nave de transporte de la Alianza (Dropship)",
    category: "enemies",
    details: { origin: "Sintético de despliegue de la Alianza" },
    summary:
      "Sintético de la Alianza que transporta unidades por aire a donde se necesitan. Lleva un contenedor blindado para hasta seis soldados o policías, con una torreta de pulso que cubre el despliegue.",
    notes: [
      "Las patas centrales acaban en ventosas de succión que cargan distintos tipos de carga y recuerdan a la boca de una lamprea.",
      "Las rollermines se sueltan desde estas naves en grupos de dos a cuatro.",
      "Un diseño temprano de Dhabih Eng lo mostraba en rojo con circuitos azules brillantes, y el concepto original era que además pudiera caminar como un cangrejo.",
    ],
    appearances: [
      {
        gameId: hl2,
      },
    ],
    sources: [
      overwiki("Combine_Dropship", "Combine Dropship"),
      overwiki("Rollermine", "Rollermine"),
    ],
  },
];

// Personajes de Half-Life 2 y versiones de Half-Life 2 de personajes que en Half-Life 1
// tienen otro modelo. Cada ficha describe solo al personaje tal como aparece en Half-Life 2.
export const halfLife2MoreCharacters: Entry[] = [
  {
    id: "hl2-gordon-freeman",
    slug: "gordon-freeman-half-life-2",
    name: "Gordon Freeman (Half-Life 2)",
    category: "characters",
    details: {
      affiliation: "Resistencia humana",
      designers: ["Dhabih Eng"],
    },
    summary:
      "Protagonista mudo de Half-Life 2 y de sus episodios. Su aspecto en Source es un diseño nuevo respecto a Half-Life, con otra cara y un modelo distinto.",
    notes: [
      "El diseño de Gordon en Half-Life 2 es solo de Dhabih Eng. Su cara se creó mezclando los rostros de varios empleados de Valve: David Speyrer, Eric Kirchmer, Greg Coomer y Kelly Bailey.",
      "El modelo de Source de Gordon solo se ha usado en la recreativa Half-Life 2: Survivor, y como base de ilustraciones y retratos.",
      "Marc Laidlaw ha dicho que Gordon es «solo un nombre»: una mirilla hacia el universo de Half-Life.",
      "Half-Life 2 y sus episodios sugieren que Gordon llevaba ya un tiempo en Black Mesa antes del incidente, algo que contradice fuentes antiguas, que lo situaban empezando el 15 de mayo.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Gordon_Freeman", "Gordon Freeman")],
  },
  {
    id: "hl2-g-man",
    slug: "g-man-half-life-2",
    name: "El G-Man (Half-Life 2)",
    category: "characters",
    details: {
      affiliation: "Desconocida",
      voiceActor: "Michael Shapiro",
      designers: ["Bill Van Buren", "Dhabih Eng", "Doug Wood"],
    },
    summary:
      "El hombre de traje misterioso de Half-Life vuelve en Half-Life 2 con un modelo, una cara y unos ojos nuevos. Su nombre «G-Man» no se pronuncia nunca en los juegos.",
    notes: [
      "El modelo de Half-Life 2 está basado en Frank Sheldon, un profesor de la técnica Alexander que originalmente iba a ser el modelo del doctor Breen. Se eligió para el G-Man tras un retoque rápido en Photoshop de Bill Van Buren.",
      "Doug Wood diseñó sus expresiones faciales para que el jugador nunca supiera con certeza de qué lado está.",
      "Los ojos son azules en Half-Life y sus expansiones, y verdes en Half-Life 2 y sus episodios.",
      "El modelo tenía los ojos más oscuros y una corbata azul en lugar de morada en una versión previa.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("The_G-Man", "The G-Man")],
  },
  {
    id: "hl2-barney-calhoun",
    slug: "barney-calhoun-half-life-2",
    name: "Barney Calhoun (Half-Life 2)",
    category: "characters",
    details: {
      affiliation: "Resistencia humana (infiltrado en la Protección Civil)",
      voiceActor: "Michael Shapiro",
      designers: ["Chuck Jones", "Marc Laidlaw", "Bill Van Buren"],
    },
    summary:
      "Antiguo guardia de seguridad de Black Mesa que Half-Life 2 convierte en personaje con nombre propio y rostro nuevo. Aparece como un agente infiltrado en la Protección Civil de la Ciudad 17.",
    notes: [
      "Su aspecto en Half-Life 2 se basa en Scott Lynch, director de operaciones de Valve. En los archivos de la versión filtrada la textura de la cara se llama «scottface».",
      "Su frase «Ahora... ¡sobre esa cerveza que te debía!» es un guiño a una frase aleatoria de los guardias de Half-Life: «Hey, catch me later, I'll buy you a beer».",
      "En la filtración hay un casco de guardia dañado llamado «BarneyHelmet», lo que sugiere que iba a conservar su casco antiguo.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Barney_Calhoun", "Barney Calhoun")],
  },
  {
    id: "hl2-eli-vance",
    slug: "eli-vance-half-life-2",
    name: "Eli Vance (Half-Life 2)",
    category: "characters",
    details: {
      affiliation: "Resistencia humana",
      voiceActor: "Robert Guillaume",
      designers: ["Dhabih Eng", "Marc Laidlaw"],
    },
    summary:
      "Científico veterano de Black Mesa y líder de la Resistencia. En Half-Life 2 diseñó el arma gravitatoria y es el padre de Alyx. Su nuevo modelo y su voz son distintos del científico «scientist03» de Half-Life.",
    notes: [
      "Es en esencia el modelo de científico afroamericano de Half-Life («scientist03» o «Luther») convertido en un personaje real.",
      "Su cara se basó en la de un hombre de Seattle que sostenía un cartel pidiendo trabajo; los empleados de Valve lo encontraron en la calle.",
      "Nace de la fusión de dos personajes: Eli, un científico sin relación con Alyx, y el capitán Vance, su padre y líder de los conscriptos.",
      "Los archivos de la filtración indican que iba a llevar un jersey de Yale en lugar del de Harvard.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Eli_Vance", "Eli Vance")],
  },
  {
    id: "hl2-isaac-kleiner",
    slug: "isaac-kleiner-half-life-2",
    name: "Isaac Kleiner (Half-Life 2)",
    category: "characters",
    details: {
      affiliation: "Resistencia humana",
      voiceActor: "Harry S. Robins",
      designers: ["Marc Laidlaw"],
    },
    summary:
      "Antiguo profesor del MIT y científico de Black Mesa, ahora científico de la Resistencia. Gordon llega a su laboratorio clandestino en la Ciudad 17. Half-Life 2 le da un modelo y una cara nuevos.",
    notes: [
      "Su aspecto en Half-Life 2 se basa en Ted Cohrt, un contable de la empresa del piso de arriba de la oficina de Valve. Su cara original era la de un hombre mucho mayor.",
      "Su «Oh, fie!» viene del profesor de química de Marc Laidlaw, que lo repetía constantemente.",
      "Es el personaje favorito de Marc Laidlaw de la serie.",
      "En Half-Life se le presentó en el trasfondo con el nombre «Alex»; después se citó en los manuales de Half-Life y Blue Shift.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Isaac_Kleiner", "Isaac Kleiner")],
  },
  {
    id: "hl2-odessa-cubbage",
    slug: "odessa-cubbage",
    name: "Odessa Cubbage",
    category: "characters",
    details: {
      affiliation: "Resistencia humana (Nueva Pequeña Odessa)",
      voiceActor: "John Patrick Lowrie",
      designers: ["Marc Laidlaw"],
    },
    summary:
      "«Coronel» de la Resistencia en el puesto costero de Nueva Pequeña Odessa. Explica a Gordon el uso del lanzacohetes guiado desde el sótano del edificio principal.",
    notes: [
      "Durante casi todo el desarrollo fue un rebelde genérico con la cabeza del ciudadano «Male 2» y una entidad llamada «RPGGuy».",
      "Existe en esencia para entregar el lanzacohetes. El equipo decidió que no funcionaba que muriera y lo dejó en el sótano dando órdenes sin salir nunca: de ahí su carácter de «cobarde real».",
      "El modelo del personaje se basa en Travis Dunlap.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Odessa_Cubbage", "Odessa Cubbage")],
  },
  {
    id: "hl2-vortigaunt-resistance",
    slug: "vortigaunts-de-la-resistencia",
    name: "Vortigaunts de la Resistencia",
    category: "characters",
    details: {
      affiliation: "Resistencia humana (aliados)",
      voiceActor:
        "Louis Gossett Jr. (Half-Life 2 y Episode One), Tony Todd (Episode Two)",
      designers: ["Chuck Jones", "Marc Laidlaw"],
    },
    summary:
      "En Half-Life 2 los vortigaunts son aliados de la Resistencia en lugar de enemigos. Llaman «el Freeman» a Gordon y usan su energía tanto para combatir como para alimentar dispositivos.",
    notes: [
      "Su ataque eléctrico es mucho más devastador que en Half-Life y mata casi al instante a lo que alcanza. También lo usan sin intención de combate: cargan un transformador en Black Mesa Este.",
      "Extraer el cebo de feromonas de un guardia de hormigas león es, según ellos, una práctica ancestral.",
      "Eli Vance fue el primer humano en hacer contacto pacífico con ellos y ganarse su confianza.",
      "En el capítulo «Punto de inserción» se puede ver un vortigaunt, Sweepy, aún al servicio de la Alianza, con collar y grilletes mientras barre.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Vortigaunt", "Vortigaunt")],
  },
];

// Curiosidades y easter eggs de Half-Life 2 (sin spoilers)
export const halfLife2MoreExtras: Entry[] = [
  {
    id: "hl2-brickbat",
    slug: "brickbat-arma-cortada",
    name: "Brickbat, el arma cortada",
    category: "trivia",
    summary:
      "La Brickbat era un arma de Half-Life 2 que se descartó. Servía para lanzar objetos recogidos del escenario y la iba a usar la Resistencia, Gordon incluido.",
    notes: [
      "Podía llevar hasta 8 «piezas de chatarra»: piedras, cabezas de cremator, botellas de cerveza y headcrabs rápidos.",
      "Con el headcrab rápido se pretendía un equivalente del snark de Half-Life.",
      "En la versión filtrada de Half-Life 2, generar el cóctel molotov muestra a Gordon sosteniendo un headcrab rápido.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [
      overwiki("Brickbat", "Brickbat"),
      overwiki("Fast_Headcrab", "Fast Headcrab"),
    ],
  },
  {
    id: "hl2-slam-cut",
    slug: "slam-arma-cortada",
    name: "El S.L.A.M., una mina cortada",
    category: "trivia",
    summary:
      "El S.L.A.M. (Selectable Lightweight Attack Munition) iba a ser un arma de Half-Life 2 y se eliminó de la versión final. Sí aparece en Half-Life 2: Deathmatch y Half-Life 2: Survivor.",
    notes: [
      "Tiene dos modos: mina láser, que explota si algo corta su haz, y carga lanzada que se detona a distancia.",
      "La wiki supone que se descartó porque en un solo jugador exige saber de dónde vendrán los enemigos; los equivalentes de Half-Life, la carga de mochila y la mina láser, tuvieron el mismo problema.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("S.L.A.M", "S.L.A.M")],
  },
  {
    id: "hl2-stun-baton",
    slug: "porra-aturdidora",
    name: "La porra aturdidora de la Protección Civil",
    category: "trivia",
    summary:
      "La porra aturdidora (stunstick) es la porra eléctrica de la Protección Civil. Se ve usándola en «Punto de inserción» y «Ruta del canal», pero Gordon no puede usarla como arma.",
    notes: [
      "Se puede recoger y usar como batería: recarga un 7 % de energía del traje HEV.",
      "Según la versión filtrada del juego, iba a poder usarla el jugador en modo de un jugador; ese uso se mantuvo solo en Half-Life 2: Deathmatch.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Stun_Baton", "Stun Baton")],
  },
  {
    id: "hl2-hunter-chopper-bug",
    slug: "origen-del-ataque-del-helicoptero",
    name: "El error que creó el ataque del helicóptero",
    category: "trivia",
    summary:
      "La embestida del helicóptero cazador soltando bombas nació de un error del programador Brian Jacobson, que lo dejó en el juego porque le gustó el resultado.",
    notes: [
      "Quería que el helicóptero cargara contra el jugador disparando, pero por error lo configuró para soltar bombas, lo que causó inestabilidad en el sistema.",
      "La pelea de Episode Two empezó como un combate clásico con el lanzacohetes; una nueva forma de enfrentarse, prototipada para Episode Three, acabó aplicándose a Episode Two.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Hunter-Chopper", "Hunter-Chopper")],
  },
  {
    id: "hl2-egg-42ff",
    slug: "consola-42ff",
    name: "«42FF» en el laboratorio de Kleiner",
    category: "easter-eggs",
    summary:
      "Una consola del laboratorio de Kleiner muestra el texto «42FF». Lo colocó Gary McTaggart, antiguo programador de Valve, y hace referencia a un grupo de amigos llamado «42 Freedom Fighters».",
    notes: [
      "En la misma estación de trabajo hay un reproductor de CD con el nombre de Blue Scholars, un grupo de hip hop alternativo cuyo miembro Sabzi es primo de Dhabih Eng, uno de los diseñadores del lugar.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Easter_eggs", "Easter eggs")],
  },
  {
    id: "hl2-egg-plutonium",
    slug: "caja-de-plutonio",
    name: "La caja de plutonio de Kleiner",
    category: "easter-eggs",
    summary:
      "Junto a un escritorio del laboratorio de Kleiner hay dos cajas radiactivas. Una es amarilla y dice «PLUTONIUM HANDLE WITH CARE»: referencia al maletín de plutonio de la película Regreso al futuro.",
    notes: [
      "El mismo modelo de escritorio se usa también en Black Mesa Este.",
      "Sobre otro escritorio del laboratorio se ve una foto de Mark Twain.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Easter_eggs", "Easter eggs")],
  },
  {
    id: "hl2-egg-v952",
    slug: "numero-v952",
    name: "El número «V952» de la Alianza",
    category: "easter-eggs",
    summary:
      "Los caracteres «V952» aparecen en varios dispositivos de la Alianza: la torreta centinela, el arma de emplazamiento, el helicóptero cazador, su bomba y el rifle de pulso.",
    notes: [
      "Las texturas de estos modelos las creó Tri Nguyen. «V952» es el número de placa de su hermano, que es policía en Ottawa, Canadá.",
    ],
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Easter_eggs", "Easter eggs")],
  },
  {
    id: "hl2-egg-dum-dee",
    slug: "dum-y-dee",
    name: "Dum y Dee, los vortigaunts del campamento",
    category: "easter-eggs",
    summary:
      "Los nombres de los vortigaunts que conversan en vortigés en el campamento de «Trampas de arena» son Dum y Dee, una referencia a Tweedledum y Tweedledee, personajes de una canción infantil inglesa y de A través del espejo, de Lewis Carroll.",
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Easter_eggs", "Easter eggs")],
  },
  {
    id: "hl2-egg-mario-headcrab",
    slug: "headcrab-estilo-mario",
    name: "El headcrab de estilo Super Mario",
    category: "easter-eggs",
    summary:
      "En un mapa de «Anticiudadano uno» hay un pasillo estrecho con tres tuberías metálicas y un headcrab que se mueve de un lado a otro entre dos de ellas, y muere si el jugador lo toca. Parece una referencia a la serie Super Mario.",
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Easter_eggs", "Easter eggs")],
  },
  {
    id: "hl2-egg-backwards-zombies",
    slug: "zombis-al-reves",
    name: "Los zombis, al revés",
    category: "easter-eggs",
    summary:
      "Al reproducir al revés los sonidos del zombi clásico se oyen frases como «Help, God, help! Help me!».",
    appearances: [{ gameId: hl2 }],
    sources: [overwiki("Easter_eggs", "Easter eggs")],
  },
];

// Apariciones adicionales en los episodios (Episode One y Episode Two) de fichas de Half-Life 2,
// ya existentes o nuevas, según la lista de apariciones de cada página de Combine OverWiki.
const ep1 = "half-life-2-episode-one";
const ep2 = "half-life-2-episode-two";

const inBoth: EntryAppearance[] = [{ gameId: ep1 }, { gameId: ep2 }];
const onlyEp1: EntryAppearance[] = [{ gameId: ep1 }];
const onlyEp2: EntryAppearance[] = [{ gameId: ep2 }];

export const halfLife2EpisodeAppearances: Record<string, EntryAppearance[]> = {
  // Fichas que ya existían
  "alyx-vance": inBoth,
  "wallace-breen": inBoth,
  "judith-mossman": inBoth,
  "hl2-civil-protection": onlyEp1,
  "hl2-strider": inBoth,
  "hl2-gunship": inBoth,
  "hl2-fast-zombie": inBoth,
  "hl2-antlion": inBoth,
  "hl2-gravity-gun": inBoth,
  "hl2-357": inBoth,
  "hl2-smg": inBoth,
  "hl2-pulse-rifle": inBoth,
  "hl2-shotgun": inBoth,
  "hl2-crossbow": inBoth,
  // Fichas nuevas
  "hl2-crowbar": inBoth,
  "hl2-frag-grenade": inBoth,
  "hl2-classic-headcrab": inBoth,
  "hl2-fast-headcrab": inBoth,
  "hl2-poison-headcrab": inBoth,
  "hl2-classic-zombie": inBoth,
  "hl2-poison-zombie": inBoth,
  "hl2-antlion-guard": inBoth,
  "hl2-combine-elite": inBoth,
  "hl2-combine-sniper": inBoth,
  "hl2-manhack": inBoth,
  "hl2-rollermine": onlyEp1,
  "hl2-city-scanner": inBoth,
  "hl2-shield-scanner": onlyEp1,
  "hl2-sentry-gun": inBoth,
  "hl2-hunter-chopper": onlyEp2,
  "hl2-combine-dropship": inBoth,
  "hl2-gordon-freeman": inBoth,
  "hl2-g-man": inBoth,
  "hl2-barney-calhoun": inBoth,
  "hl2-eli-vance": [
    { gameId: ep1, summary: "Solo se oye su voz." },
    { gameId: ep2 },
  ],
  "hl2-isaac-kleiner": [
    { gameId: ep1, summary: "Solo se oye su voz." },
    { gameId: ep2 },
  ],
  "hl2-odessa-cubbage": [{ gameId: ep1, summary: "Solo se le menciona." }],
  "hl2-vortigaunt-resistance": inBoth,
};
