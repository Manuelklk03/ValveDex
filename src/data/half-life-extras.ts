import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

// Easter eggs y curiosidades de Half-Life 1 (Z3-6), según Combine OverWiki y otras fuentes citadas.
// Fuera a propósito: el chiste de la caja de munición (sensible) y los récords de speedrun (cambian a menudo).

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

const easterEggsPage = overwiki("Easter_eggs", "Easter eggs");
const halfLife = [{ gameId: "half-life" }];

export const halfLifeExtras: Entry[] = [
  {
    id: "developer-lockers",
    slug: "taquillas-de-los-desarrolladores",
    name: "Las taquillas de los desarrolladores",
    category: "easter-eggs",
    summary:
      "En el vestuario de Anomalous Materials, las placas de las taquillas llevan los apellidos de varios desarrolladores de Half-Life, y la megafonía también menciona nombres del equipo durante el capítulo.",
    notes: ["Se hicieron más placas con nombres que nunca llegaron a usarse."],
    appearances: halfLife,
    sources: [easterEggsPage],
  },
  {
    id: "gordon-locker",
    slug: "taquilla-de-gordon",
    name: "La taquilla de Gordon",
    category: "easter-eggs",
    summary:
      "La taquilla de Gordon guarda la foto de un bebé y dos libros. El bebé es Isabel Teasley, hija de los desarrolladores Harry Teasley y Yatsze Mark, y los libros son novelas reales de Marc Laidlaw.",
    notes: [
      "Según Harry Teasley, John Guthrie trasladó la foto desde una oficina en ruinas hasta la taquilla.",
      "Los libros son The Orchid Eater y The 37th Mandala, ambos de Marc Laidlaw.",
    ],
    appearances: halfLife,
    sources: [
      easterEggsPage,
      {
        title: "The 37th Mandala - Marc Laidlaw",
        url: "https://www.marclaidlaw.com/writing/the-37th-mandala/",
        kind: "official",
      },
    ],
  },
  {
    id: "security-poster-text",
    slug: "texto-oculto-del-cartel-de-seguridad",
    name: "El texto oculto del cartel de seguridad",
    category: "easter-eggs",
    summary:
      "La letra pequeña del cartel de reclutamiento de la seguridad de Black Mesa es un texto humorístico de relleno que se burla de quien se acerca lo bastante para leerlo.",
    notes: [
      "Viene a decir que, si puedes leerlo, eres muy raro y tienes buena vista, pide «text of interest» para ese hueco e incluye alguna palabrota.",
    ],
    appearances: halfLife,
    sources: [easterEggsPage],
  },
  {
    id: "vortigaunt-georgeclinton",
    slug: "vortigaunt-georgeclinton",
    name: "El vortigaunt «georgeclinton»",
    category: "easter-eggs",
    summary:
      "El único vortigaunt de Unforeseen Consequences, el que intenta echar abajo la puerta de un armario, se llama internamente «georgeclinton», un guiño al músico de funk George Clinton.",
    appearances: halfLife,
    sources: [easterEggsPage],
  },
  {
    id: "newell-van-buren-offices",
    slug: "despachos-de-newell-y-van-buren",
    name: "Los despachos de Newell y Van Buren",
    category: "easter-eggs",
    summary:
      "En Office Complex hay despachos con placas de los doctores Newell y Van Buren, por Gabe Newell y Bill Van Buren, de Valve.",
    notes: [
      "También se hizo una placa de «Sgt. Harrington», por Mike Harrington, el otro fundador de Valve, que no se llegó a usar.",
    ],
    appearances: halfLife,
    sources: [easterEggsPage],
  },
  {
    id: "valve-logos",
    slug: "logotipos-de-valve",
    name: "Los logotipos de Valve en Black Mesa",
    category: "easter-eggs",
    summary:
      "El logotipo de Valve aparece en una cafetera junto a la cámara frigorífica de Office Complex y en la espalda del traje HEV.",
    notes: [
      "Hay otro en una textura de un aseo portátil que no se usa en el juego.",
    ],
    appearances: halfLife,
    sources: [easterEggsPage],
  },
  {
    id: "the-onion",
    slug: "the-onion-en-la-basura",
    name: "The Onion en la basura",
    category: "easter-eggs",
    summary:
      "Entre los restos de las papeleras destrozadas aparece un ejemplar del periódico satírico The Onion.",
    notes: ["El guiño se repite en Opposing Force, Blue Shift y Decay."],
    appearances: halfLife,
    sources: [easterEggsPage],
  },
  {
    id: "casali-signatures",
    slug: "firma-de-dario-casali",
    name: "La firma de Dario Casali",
    category: "easter-eggs",
    summary:
      "El diseñador de niveles Dario Casali escondió su firma, construida con bloques del mapa, en todos los mapas multijugador que hizo: boot_camp, crossfire, doublecross, frenzy, snark_pit, subtransit, thehill y undertow.",
    appearances: halfLife,
    sources: [easterEggsPage],
  },
  {
    id: "ps2-toilet-scientists",
    slug: "cientificos-del-bano",
    name: "Los científicos del baño (PS2)",
    category: "easter-eggs",
    summary:
      "Solo en la versión de PlayStation 2: dos científicos encerrados en los baños del vestuario de Anomalous Materials mantienen conversaciones cómicas montadas con frases ya existentes.",
    notes: [
      "Hay tres conversaciones que se repiten a intervalos y una cuarta, secreta, que solo suena cada cinco minutos.",
    ],
    appearances: halfLife,
    sources: [
      easterEggsPage,
      {
        title:
          "Half-Life (PS2) - Toilet Scientists Conversation Easter Egg - YouTube",
        url: "https://www.youtube.com/watch?v=wQ-3GRBtDxg",
        kind: "community",
      },
    ],
  },
  {
    id: "announcement-system",
    slug: "megafonia-de-black-mesa",
    name: "La megafonía de Black Mesa (Vox)",
    category: "trivia",
    summary:
      "El sistema de avisos de la instalación se llama «Vox» y «Base Computer» en los archivos del juego. Construye cada aviso uniendo palabras grabadas por separado.",
    notes: [
      "Su voz robótica se hizo con un vocoder, no con un actor, según un correo de Marc Laidlaw.",
      "Un archivo sin usar, vox_login.wav, lo llama «Automatic Diagnostic and Announcement System», y la mayoría de los avisos de sentences.txt nunca suenan en el juego.",
      "Las versiones traducidas, como la francesa o la alemana, usan frases grabadas enteras, con una voz humana filtrada.",
    ],
    appearances: halfLife,
    sources: [
      overwiki(
        "Black_Mesa_Announcement_System",
        "Black Mesa Announcement System",
      ),
    ],
  },
  {
    id: "holographic-assistant",
    slug: "asistente-holografico",
    name: "El asistente holográfico",
    category: "trivia",
    summary:
      "Black Mesa forma a su personal en el Hazard Course con un holograma en lugar de un instructor de carne y hueso. Los hologramas copian el aspecto y la voz grabada de instructores reales.",
    notes: [
      "En Blue Shift se le llama «Holographic Guide».",
      "Gearbox añadió después, en Decay, a Gina Cross como la persona que prestó su imagen al holograma de los científicos.",
    ],
    appearances: halfLife,
    sources: [overwiki("Holographic_Assistant", "Holographic Assistant")],
  },
  {
    id: "german-version",
    slug: "version-alemana",
    name: "La versión alemana censurada",
    category: "trivia",
    summary:
      "Para cumplir la ley alemana, la versión de ese país quitó la sangre y los restos, y convirtió a los soldados en robots. Los científicos y guardias abatidos se sientan y niegan con la cabeza en lugar de caer.",
    notes: [
      "Los cambios se hicieron con el equipo de Sierra para el mercado alemán, con la participación de Gabe Newell.",
      "La versión alemana de PlayStation 2 aplica la misma censura.",
    ],
    appearances: halfLife,
    sources: [
      overwiki(
        "Censored_versions_of_Half-Life",
        "Censored versions of Half-Life",
      ),
    ],
  },
  {
    id: "half-life-day-one",
    slug: "half-life-day-one",
    name: "Half-Life: Day One",
    category: "trivia",
    summary:
      "Una versión previa con los primeros capítulos que se regalaba con tarjetas de sonido y gráficas y se enviaba a la prensa. Se filtró casi dos meses antes del lanzamiento, pedida por gente que se hacía pasar por periodistas.",
    notes: [
      "Termina antes de acabar «We've Got Hostiles» y ocupa unos 250 MB, demasiado para distribuirla por internet en la época.",
      "Half-Life ganó los premios a Mejor juego de PC y Mejor juego de acción en el E3 de 1998.",
    ],
    appearances: halfLife,
    sources: [overwiki("Half-Life:_Day_One", "Half-Life: Day One")],
  },
  {
    id: "half-life-uplink",
    slug: "half-life-uplink",
    name: "Half-Life: Uplink",
    category: "trivia",
    summary:
      "Demo publicada el 12 de febrero de 1999 con niveles que no están en el juego completo. No es un capítulo recortado, como se suele creer: John Guthrie y Kelly Bailey la hicieron en un par de semanas a partir de la idea del capítulo descartado «Communications Center».",
    appearances: halfLife,
    sources: [overwiki("Half-Life:_Uplink", "Half-Life: Uplink")],
  },
  {
    id: "half-life-alpha",
    slug: "alfa-de-1997",
    name: "La alfa de 1997",
    category: "trivia",
    summary:
      "Una versión alfa del 8 de septiembre de 1997, preparada para la prensa, que se filtró en enero de 2013. Incluye seis capítulos tempranos, una demo técnica, Worldcraft 1.3 y una primera banda sonora de 11 pistas.",
    notes: [
      "Un usuario de Reddit enseñó el CD el 31 de diciembre de 2012, y su contenido se publicó el 8 de enero de 2013.",
    ],
    appearances: halfLife,
    sources: [overwiki("Half-Life_Alpha", "Half-Life Alpha")],
  },
  {
    id: "code-names",
    slug: "nombres-en-clave",
    name: "Nombres en clave y el retraso de 1997",
    category: "trivia",
    summary:
      "El nombre en clave del juego era «Quiver», por la base militar de La niebla de Stephen King, y en un documento de diseño de enero de 1997 aparece «Belly of the Beast». Iba a salir en noviembre de 1997, pero se retrasó para rehacerlo a fondo.",
    notes: [
      "Otros nombres que se barajaron: Triphammer y Belly of the Beast. Según el comentario del 25.º aniversario, el equipo lo apodaba también Dirt, Lead y Screwed.",
    ],
    appearances: halfLife,
    sources: [overwiki("Half-Life", "Half-Life")],
  },
  {
    id: "awards-and-sales",
    slug: "premios-y-ventas",
    name: "Premios y ventas",
    category: "trivia",
    summary:
      "Half-Life ganó más de 50 premios a juego del año para PC, según Valve, y en diciembre de 2008 había vendido 9,3 millones de copias en tienda física, sin contar las ventas digitales de Steam.",
    appearances: halfLife,
    sources: [overwiki("Half-Life", "Half-Life")],
  },
  {
    id: "ps2-port-and-decay",
    slug: "version-de-ps2-y-decay",
    name: "La versión de PlayStation 2 y Decay",
    category: "trivia",
    summary:
      "Gearbox llevó Half-Life a PlayStation 2 en 2001 con modelos más detallados y niveles ampliados. Esa versión añadió deathmatch a pantalla partida y Half-Life: Decay, una expansión cooperativa protagonizada por Gina Cross y Colette Green.",
    notes: [
      "Se anunció el 17 de noviembre de 2000, y sus modelos tienen ojos que siguen el movimiento y dedos articulados.",
      "Decay no está en Steam; unos aficionados ucranianos hicieron una versión no oficial para PC el 23 de septiembre de 2008.",
    ],
    appearances: halfLife,
    sources: [
      overwiki(
        "Half-Life_(PlayStation_2_port)",
        "Half-Life (PlayStation 2 port)",
      ),
      overwiki("Half-Life:_Decay", "Half-Life: Decay"),
    ],
  },
  {
    id: "25th-anniversary",
    slug: "25-aniversario",
    name: "La actualización del 25.º aniversario",
    category: "trivia",
    summary:
      "El 17 de noviembre de 2023, Valve publicó un documental de una hora y una gran actualización que corrigió muchos fallos históricos del juego.",
    appearances: halfLife,
    sources: [
      {
        title: "Half-Life 25th Anniversary - half-life.com",
        url: "https://half-life.com/halflife25",
        kind: "official",
      },
    ],
  },
];
