import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function wikipedia(page: string, title: string): Source {
  return {
    title: `${title} - Wikipedia`,
    url: `https://en.wikipedia.org/wiki/${page}`,
    kind: "wiki",
  };
}

// Counter-Strike Wiki de la comunidad (Fandom). Su HTML devuelve 403 a las descargas
// automáticas (curl); los datos se leyeron con su API MediaWiki, que sí responde.
function csWiki(page: string, title: string): Source {
  return {
    title: `${title} - Counter-Strike Wiki`,
    url: `https://counterstrike.fandom.com/wiki/${page}`,
    kind: "wiki",
  };
}

const gameIds = {
  cs: "counter-strike",
  css: "counter-strike-source",
  csgo: "counter-strike-global-offensive",
  cs2: "counter-strike-2",
} as const;

function a(...keys: (keyof typeof gameIds)[]) {
  return keys.map((key) => ({ gameId: gameIds[key] }));
}

const all = a("cs", "css", "csgo", "cs2");

// Mapas. `chapter` es un orden propio; un mismo mapa se comparte entre juegos con `appearances`.
const maps: Entry[] = [
  {
    id: "cs-map-dust2",
    slug: "mapa-dust2",
    name: "Dust II",
    category: "maps",
    details: { chapter: 1, mapFiles: ["de_dust2"] },
    summary:
      "Mapa de desactivación de bomba creado por David Johnston como sucesor conceptual de Dust y publicado el 13 de marzo de 2001 con Counter-Strike 1.1. Está presente en todos los juegos de la serie y se diseñó para ser simple y equilibrado, con una estructura simétrica y dos puntos de bomba.",
    notes: [
      "Chris «MacMan» Ashton aportó las texturas.",
      "Johnston lo tituló «Dust 3» porque no lo consideraba un sucesor digno; antes del lanzamiento pasó a llamarse Dust II.",
      "Su ambientación mezcla influencias norteafricanas, turcas y andaluzas.",
      "Global Offensive le dio una revisión visual importante en octubre de 2017. En CS2, Valve lo clasificó como mapa «touchstone»: recibió mejoras gráficas y de iluminación, pero conserva prácticamente la misma distribución.",
    ],
    appearances: all,
    sources: [wikipedia("Dust_II", "Dust II"), csWiki("Dust_II", "Dust II")],
  },
  {
    id: "cs-map-dust",
    slug: "mapa-dust",
    name: "Dust",
    category: "maps",
    details: { chapter: 2, mapFiles: ["de_dust"] },
    summary:
      "Mapa de desactivación de bomba y predecesor de Dust II, ambientado en una ciudad de Oriente Medio alrededor de un palacio. Tiene dos puntos de bomba: uno en la zona de aparición de los Antiterroristas y otro en un área abierta cercana. Aparece en todos los juegos multijugador de la serie salvo en Counter-Strike 2.",
    notes: [
      "David Johnston encontró capturas tempranas de un mapa de desierto de Team Fortress 2: Brotherhood of Arms y quiso recrearlas; Jess Cliffe le puso en contacto con MacMan para recrear las texturas.",
      "Se llamó originalmente cs_destiny y recibió el nombre de_dust durante las pruebas.",
      "Su descripción oficial pide a los Terroristas destruir uno de los dos depósitos de armas químicas.",
    ],
    appearances: a("cs", "css", "csgo"),
    sources: [csWiki("Dust", "Dust")],
  },
  {
    id: "cs-map-inferno",
    slug: "mapa-inferno",
    name: "Inferno",
    category: "maps",
    details: { chapter: 3, mapFiles: ["de_inferno"] },
    summary:
      "Mapa de desactivación de bomba creado para el CS original en la actualización 1.1 de 2001 junto a Vertigo y Dust II. Se reconstruyó desde cero para Source en 2005, pasando de un pueblo de Oriente Medio a uno europeo, y volvió en Global Offensive y CS2. Destaca por sus rutas estrechas y por la «Banana», la gran escalera central que es la vía más directa de los Terroristas al punto B.",
    notes: [
      "Una actualización de 2016 de Global Offensive ajustó sus gráficos y su visibilidad.",
      "En CS2, Valve lo clasificó como «overhaul»: un mapa reconstruido desde cero.",
      "Tras el último Major de Global Offensive, a principios de 2023, se supo que había sido el mapa más jugado en los Majors: 263 partidas frente a las 243 de Mirage.",
    ],
    appearances: all,
    sources: [
      wikipedia("Inferno_(Counter-Strike)", "Inferno (Counter-Strike)"),
    ],
  },
  {
    id: "cs-map-nuke",
    slug: "mapa-nuke",
    name: "Nuke",
    category: "maps",
    details: { chapter: 4, mapFiles: ["de_nuke"] },
    summary:
      "Mapa de desactivación de bomba ambientado dentro y fuera de una central nuclear, publicado en noviembre de 1999 con el CS original. Recibió un rediseño importante en 2016 para Global Offensive, dentro de la actualización Operation Wildfire.",
    notes: [
      "En el CS original se ambientaba en un entorno de cañón del suroeste parecido al del nivel «Surface Tension» de Half-Life, con cajas de transporte de Black Mesa; el interior era un almacén oxidado con material nuclear.",
      "En Source se modificó para parecer una central nuclear antigua y desmantelada, con torres de refrigeración bajo un cielo sombrío.",
      "Con el rediseño de 2016 pasó a llamarse Cedar Creek Nuclear Power Plant, con un aspecto institucional limpio basado en centrales reales y un cielo azul y soleado, para mejorar la legibilidad.",
      "En CS2, Valve lo clasificó como mapa «upgrade»: recibió una mejora gráfica con las funciones de Source 2.",
    ],
    appearances: all,
    sources: [wikipedia("Nuke_(Counter-Strike)", "Nuke (Counter-Strike)")],
  },
  {
    id: "cs-map-train",
    slug: "mapa-train",
    name: "Train",
    category: "maps",
    details: { chapter: 5, mapFiles: ["de_train"] },
    summary:
      "Mapa de desactivación de bomba ambientado en una estación y un patio de maniobras, con muchas escaleras, plataformas elevadas, ángulos largos y pasillos estrechos. Los Terroristas deben destruir una de las dos cargas nucleares que hay en los trenes. Debutó en la beta 5.0 del CS original (30 de diciembre de 1999) y se rehízo para Global Offensive en la actualización de diciembre de 2014.",
    notes: [
      "Lo creó Christopher Mair para Barking Dog Studios.",
      "En el mapa original el punto de bomba interior es el A y el exterior el B; desde Source el etiquetado se invirtió.",
      "Salió del grupo competitivo de Global Offensive en mayo de 2021 y volvió en enero de 2025, sustituyendo a Vertigo en el grupo Active Duty.",
      "Según Wikipedia, CS2 lo retiró en su lanzamiento; Valve añadió después una versión renovada.",
    ],
    appearances: all,
    sources: [
      wikipedia(
        "List_of_competitive_Counter-Strike_maps",
        "List of competitive Counter-Strike maps",
      ),
      wikipedia("Counter-Strike_2", "Counter-Strike 2"),
      csWiki("Train", "Train"),
    ],
  },
  {
    id: "cs-map-mirage",
    slug: "mapa-mirage",
    name: "Mirage",
    category: "maps",
    details: { chapter: 6, mapFiles: ["de_mirage"] },
    summary:
      "Mapa de desactivación de bomba ambientado en una ciudad de inspiración de Oriente Medio, con edificios de apartamentos, fortalezas, tiendas y patios. Nació como mapa de la comunidad, de_cpl_strike, obra de Michael «BubkeZ» Hüll; Valve lo rehízo como de_mirage y lo añadió oficialmente a Global Offensive el 12 de junio de 2013.",
    notes: [
      "Ha aparecido en todos los Majors de Global Offensive.",
      "Se incluyó en CS2 desde su lanzamiento, en septiembre de 2023; en diciembre de 2023 era el mapa más jugado en el modo Premier y en FACEIT.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [wikipedia("Mirage_(Counter-Strike)", "Mirage (Counter-Strike)")],
  },
  {
    id: "cs-map-cache",
    slug: "mapa-cache",
    name: "Cache",
    category: "maps",
    details: { chapter: 7, mapFiles: ["de_cache"] },
    summary:
      "Mapa de desactivación de bomba de la comunidad, nacido para Counter-Strike: Source en 2004 y llevado a la rotación competitiva de Global Offensive en la operación Breakout (2014). Se ambienta en Prípiat, Ucrania, con la central de Chernóbil visible desde la aparición de los Terroristas.",
    notes: [
      "Se retiró de la rotación competitiva en marzo de 2019, cuando lo sustituyó Vertigo, y volvió más tarde ese año como mapa independiente.",
      "Tras su rehacer para CS2, Valve habría comprado el mapa a su creador, FMPONE, el 24 de mayo de 2025; la nueva versión llegó en una actualización el 28 de abril de 2026.",
      "Junto a Anubis, son los dos únicos mapas de la comunidad que han formado parte del grupo Active Duty.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [
      wikipedia(
        "List_of_competitive_Counter-Strike_maps",
        "List of competitive Counter-Strike maps",
      ),
      csWiki("Cache", "Cache"),
    ],
  },
  {
    id: "cs-map-overpass",
    slug: "mapa-overpass",
    name: "Overpass",
    category: "maps",
    details: { chapter: 8, mapFiles: ["de_overpass"] },
    summary:
      "Mapa de desactivación de bomba publicado en diciembre de 2013 con la actualización Winter Offensive, junto a una versión actualizada de Cobblestone. Los Antiterroristas deben proteger un envío militar detenido sobre un paso elevado de un canal en Berlín, y los Terroristas pueden atacarlo de frente o intentar destruir el paso colocando la bomba en el pilar de debajo.",
    notes: [
      "Fue el primer mapa competitivo diseñado expresamente para Global Offensive.",
      "En abril de 2024, Dust II volvió a la rotación Active Duty en su lugar.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [
      wikipedia(
        "List_of_competitive_Counter-Strike_maps",
        "List of competitive Counter-Strike maps",
      ),
      wikipedia("Dust_II", "Dust II"),
      csWiki("Overpass", "Overpass"),
    ],
  },
  {
    id: "cs-map-vertigo",
    slug: "mapa-vertigo",
    name: "Vertigo",
    category: "maps",
    details: { chapter: 9, mapFiles: ["de_vertigo"] },
    summary:
      "Mapa de desactivación de bomba ambientado en un rascacielos en construcción: los dos puntos de bomba y la aparición de los Antiterroristas están en la planta superior, y la aparición de los Terroristas, en la escalera inferior. Se añadió al CS original en 2001 y a Global Offensive en la actualización del 1 de octubre de 2012.",
    notes: [
      "Entró en el grupo competitivo en mayo de 2019, sustituyendo a Cache, y salió en enero de 2025, cuando lo reemplazó Train.",
    ],
    appearances: a("cs", "csgo", "cs2"),
    sources: [
      wikipedia(
        "List_of_competitive_Counter-Strike_maps",
        "List of competitive Counter-Strike maps",
      ),
      csWiki("Vertigo", "Vertigo"),
    ],
  },
  {
    id: "cs-map-ancient",
    slug: "mapa-ancient",
    name: "Ancient",
    category: "maps",
    details: { chapter: 10, mapFiles: ["de_ancient"] },
    summary:
      "Mapa de desactivación de bomba oficial publicado el 3 de diciembre de 2020 como parte de la operación Broken Fang de Global Offensive. Se ambienta en un yacimiento arqueológico en plena selva, con piezas y monumentos que recuerdan al imperio azteca. Cada punto de bomba se llama «plaza» y tiene su propio color: la A es naranja y la B, azul pálido.",
    notes: [
      "El 14 de agosto de 2025 se añadió una versión nocturna del mapa en CS2.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [
      wikipedia(
        "List_of_competitive_Counter-Strike_maps",
        "List of competitive Counter-Strike maps",
      ),
      csWiki("Ancient", "Ancient"),
    ],
  },
  {
    id: "cs-map-anubis",
    slug: "mapa-anubis",
    name: "Anubis",
    category: "maps",
    details: { chapter: 11, mapFiles: ["de_anubis"] },
    summary:
      "Mapa de desactivación de bomba creado por la comunidad (Roald van der Scheur, «Jakuza» y «jd_40») y añadido a Global Offensive en marzo de 2020, al final de la operación Shattered Web. Se ambienta en Egipto.",
    notes: [
      "En noviembre de 2022, Valve contactó con sus creadores y les ofreció comprar los derechos del mapa, algo poco habitual.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [
      wikipedia(
        "List_of_competitive_Counter-Strike_maps",
        "List of competitive Counter-Strike maps",
      ),
      csWiki("Anubis", "Anubis"),
    ],
  },
  {
    id: "cs-map-aztec",
    slug: "mapa-aztec",
    name: "Aztec",
    category: "maps",
    details: { chapter: 12, mapFiles: ["de_aztec"] },
    summary:
      "Mapa de desactivación de bomba ambientado en un yacimiento arqueológico de América Central, donde los Terroristas deben destruir las valiosas ruinas aztecas. Es uno de los primeros mapas grandes al aire libre del juego. Lo diseñó Christopher «Barney» Auty, con texturas de Chris «MacMan» Ashton, y apareció por primera vez en la beta 6.5 (8 de junio de 2000).",
    notes: [
      "En la beta 7.0 se cambió mucho el mapa; con la versión 1.1 (13 de marzo de 2001) volvió a su distribución original y recibió una renovación visual completa.",
      "La versión 1.6 (16 de enero de 2003) lo renovó de nuevo, con cambios en el puente.",
    ],
    appearances: a("cs", "css", "csgo"),
    sources: [csWiki("Aztec", "Aztec")],
  },
  {
    id: "cs-map-cobblestone",
    slug: "mapa-cobblestone",
    name: "Cobblestone",
    category: "maps",
    details: { chapter: 13, mapFiles: ["de_cbble"] },
    summary:
      "Mapa de desactivación de bomba grande y abierto, favorable a los francotiradores, con bastante combate vertical en sus primeras versiones. En su descripción oficial, los Antiterroristas protegen la casa de campo de Lord William, amenazado de asesinato, y los Terroristas deben colocar la bomba en uno de los dos puntos. Se llamó antes Cobble; apareció en la beta 6.5 (8 de junio de 2000) y volvió a Global Offensive en la actualización Winter Offensive, junto a Overpass.",
    notes: [
      "Lo crearon David Johnston y Chris Ashton.",
      "El punto A está junto a la aparición de los Antiterroristas y el B, alrededor de una gran estatua.",
    ],
    appearances: a("cs", "css", "csgo"),
    sources: [csWiki("Cobblestone", "Cobblestone")],
  },
  {
    id: "cs-map-italy",
    slug: "mapa-italy",
    name: "Italy",
    category: "maps",
    details: { chapter: 14, mapFiles: ["cs_italy"] },
    summary:
      "Mapa de rescate de rehenes con callejones estrechos y un mercado muy reconocible, que mezcla combate cercano y de largo alcance. Se publicó el 8 de junio de 2000 con la beta 6.5, obra de Glen «glenC» Cooper con texturas de Jaison «DigiChaos» Green, y ha aparecido en todos los juegos de la serie. La comunidad lo considera uno de sus favoritos.",
    notes: [
      "La radio y las gallinas se convirtieron en señas de identidad del mapa.",
    ],
    appearances: all,
    sources: [csWiki("Italy", "Italy")],
  },
  {
    id: "cs-map-office",
    slug: "mapa-office",
    name: "Office",
    category: "maps",
    details: { chapter: 15, mapFiles: ["cs_office"] },
    summary:
      "Mapa de rescate de rehenes llamado «The Office Complex» en el CS original, añadido en la beta 7.0 (26 de agosto de 2000). Transcurre en invierno en un edificio de oficinas con aparcamientos y patios: los Antiterroristas aparecen en un garaje y los Terroristas, dentro de las oficinas, donde hay cuatro rehenes en el CS original. Ha estado en todos los juegos multijugador de la serie y se ha rehecho cuatro veces.",
    notes: ["Su creador original fue Alexander Manilov."],
    appearances: all,
    sources: [csWiki("Office", "Office")],
  },
  {
    id: "cs-map-assault",
    slug: "mapa-assault",
    name: "Assault",
    category: "maps",
    details: { chapter: 16, mapFiles: ["cs_assault"] },
    summary:
      "Mapa de rescate de rehenes llamado «Supply Station Assault» en el CS original y «Laundery Assault» en Source: los Terroristas retienen a los rehenes en un almacén. Lo creó Lari Muuriaisniemi y se publicó en la beta 1.1 (27 de junio de 1999). En Source se eliminaron las cámaras de seguridad y la autopista se sustituyó por una estación de tren.",
    appearances: a("cs", "css", "csgo"),
    sources: [csWiki("Assault", "Assault")],
  },
  {
    id: "cs-map-militia",
    slug: "mapa-militia",
    name: "Militia",
    category: "maps",
    details: { chapter: 17, mapFiles: ["cs_militia"] },
    summary:
      "Mapa de rescate de rehenes publicado en la beta 3.0 (14 de septiembre de 1999), obra de Andrew Aumann. En la descripción oficial del CS original, los Antiterroristas entran en «Cliffe's Compound» para rescatar a los rehenes; hay cuatro más un «floater».",
    appearances: a("cs", "css", "csgo"),
    sources: [csWiki("Militia", "Militia")],
  },
  {
    id: "cs-map-havana",
    slug: "mapa-havana",
    name: "Havana",
    category: "maps",
    details: { chapter: 18, mapFiles: ["cs_havana"] },
    summary:
      "Mapa de rescate de rehenes ambientado en La Habana Vieja (Cuba), añadido en la actualización 1.4 del CS original (24 de abril de 2002). Los Terroristas retienen a rehenes políticos mientras esperan un helicóptero de evacuación. En Source, el entorno cambia de forma dinámica entre rondas: por ejemplo, una ventana abierta en una ronda puede estar cerrada en la siguiente.",
    appearances: a("cs", "css"),
    sources: [csWiki("Havana", "Havana")],
  },
  {
    id: "cs-map-compound",
    slug: "mapa-compound",
    name: "Compound",
    category: "maps",
    details: { chapter: 19, mapFiles: ["cs_compound"] },
    summary:
      "Mapa de rescate de rehenes exclusivo de Counter-Strike: Source, publicado en la actualización del 24 de febrero de 2005 y creado por Valve (Dave Riller). Los Antiterroristas deben rescatar a tres científicos del programa secreto de armas de Estados Unidos, retenidos en un complejo industrial remoto.",
    appearances: a("css"),
    sources: [csWiki("Compound", "Compound")],
  },
  {
    id: "cs-map-oilrig",
    slug: "mapa-oilrig",
    name: "Oilrig",
    category: "maps",
    details: { chapter: 20, mapFiles: ["as_oilrig"] },
    summary:
      "Mapa de escolta VIP (modo asesinato) ambientado en una plataforma petrolífera, obra de Chris «MacMan» Ashton y uno de los dos mapas iniciales del modo en la beta 6.0. Un testigo criminal importante se esconde en la plataforma: los Antiterroristas deben llevarlo hasta el helicóptero de la cima y los Terroristas, eliminarlo antes.",
    notes: [
      "Es el único mapa oficial del CS original con armas restringidas.",
      "El mapa usaba al principio el modelo del helicóptero Apache de Half-Life; para la beta 6.5 el usuario «Agent Orange» aportó un modelo propio de un Westland Wessex.",
    ],
    appearances: a("cs"),
    sources: [csWiki("Oilrig", "Oilrig")],
  },
];

// Armas y equipo (ranuras: 1 primaria, 2 secundaria, 3 cuerpo a cuerpo, 4 granadas, 5 C4).
// Precios y cargadores según la Counter-Strike Wiki; solo se anotan los que da la fuente.
const weapons: Entry[] = [
  {
    id: "cs-weapon-ak47",
    slug: "arma-ak-47",
    name: "AK-47",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 30 balas" },
    summary:
      "Fusil de asalto que solo compran los Terroristas. Cuesta 2700 $ en Global Offensive y CS2 (2500 $ en el CS original y en Source). Su cargador es de 30 balas.",
    notes: ["En el CS original y en Source el arma se llamaba CV-47."],
    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("AK-47", "AK-47")],
  },
  {
    id: "cs-weapon-m4a4",
    slug: "arma-m4a4",
    name: "M4A4",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 30 balas" },
    summary:
      "Fusil de asalto que solo compran los Antiterroristas. Cuesta 3100 $ en Global Offensive y 2900 $ en CS2. Su cargador es de 30 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("M4A4", "M4A4")],
  },
  {
    id: "cs-weapon-m4a1s",
    slug: "arma-m4a1-s",
    name: "M4A1-S",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 20 balas" },
    summary:
      "Fusil de asalto que solo compran los Antiterroristas. Cuesta 2900 $. Su cargador es de 20 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("M4A1-S", "M4A1-S")],
  },
  {
    id: "cs-weapon-aug",
    slug: "arma-aug",
    name: "AUG",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 30 balas" },
    summary:
      "Fusil de asalto que solo compran los Antiterroristas. Cuesta 3300 $ en Global Offensive y CS2. Su cargador es de 30 balas.",
    notes: ["En el CS original y en Source se llamaba Bullpup."],
    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("AUG", "AUG")],
  },
  {
    id: "cs-weapon-sg553",
    slug: "arma-sg-553",
    name: "SG 553",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 30 balas" },
    summary:
      "Fusil de asalto que solo compran los Terroristas. Cuesta 3000 $. Su cargador es de 30 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("SG_553", "SG 553")],
  },
  {
    id: "cs-weapon-famas",
    slug: "arma-famas",
    name: "FAMAS",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 25 balas" },
    summary:
      "Fusil de asalto que solo compran los Antiterroristas. Cuesta 2250 $ en el CS original y en Source, 2050 $ en Global Offensive y 1950 $ en CS2. Su cargador es de 25 balas.",
    notes: ["En el CS original y en Source se llamaba Clarion 5.56."],
    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("FAMAS", "FAMAS")],
  },
  {
    id: "cs-weapon-galil",
    slug: "arma-galil-ar",
    name: "Galil AR",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 35 balas" },
    summary:
      "Fusil de asalto que solo compran los Terroristas. Cuesta 1800 $. Su cargador es de 35 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("Galil_AR", "Galil AR")],
  },
  {
    id: "cs-weapon-awp",
    slug: "arma-awp",
    name: "AWP",
    category: "weapons",
    details: {
      slot: 1,
      ammo: "Cargador de 5 balas (10 en el CS original y Source)",
    },
    summary:
      "Fusil de francotirador que compran ambos bandos. Cuesta 4750 $. Su cargador es de 5 balas en Global Offensive y CS2, y de 10 en el CS original y en Source.",
    notes: ["También se conoce como Magnum Sniper Rifle."],
    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("AWP", "AWP")],
  },
  {
    id: "cs-weapon-ssg08",
    slug: "arma-ssg-08",
    name: "SSG 08",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 10 balas" },
    summary:
      "Fusil de francotirador que compran ambos bandos. Cuesta 1700 $. Su cargador es de 10 balas.",
    notes: [
      "Es el sucesor del Scout, el fusil de francotirador económico del CS original y de Source.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [csWiki("SSG_08", "SSG 08")],
  },
  {
    id: "cs-weapon-g3sg1",
    slug: "arma-g3sg1",
    name: "G3SG1",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 20 balas" },
    summary:
      "Fusil de francotirador automático que solo compran los Terroristas. Cuesta 5000 $. Su cargador es de 20 balas.",
    notes: ["En el CS original y en Source se llamaba D3/AU-1."],
    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("G3SG1", "G3SG1")],
  },
  {
    id: "cs-weapon-scar20",
    slug: "arma-scar-20",
    name: "SCAR-20",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 20 balas" },
    summary:
      "Fusil de francotirador automático que solo compran los Antiterroristas. Cuesta 5000 $. Su cargador es de 20 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("SCAR-20", "SCAR-20")],
  },
  {
    id: "cs-weapon-glock18",
    slug: "arma-glock-18",
    name: "Glock-18",
    category: "weapons",
    details: { slot: 2, ammo: "Cargador de 20 balas" },
    summary:
      "Pistola que solo compran los Terroristas. Cuesta 200 $ en Global Offensive (400 $ en el CS original y en Source). Su cargador es de 20 balas.",

    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("Glock-18", "Glock-18")],
  },
  {
    id: "cs-weapon-usps",
    slug: "arma-usp-s",
    name: "USP-S",
    category: "weapons",
    details: { slot: 2, ammo: "Cargador de 12 balas" },
    summary:
      "Pistola que solo compran los Antiterroristas. Cuesta 200 $. Su cargador es de 12 balas.",
    notes: [
      "En el CS original y en Source el arma equivalente era la K&M .45 Tactical (USP).",
    ],
    appearances: a("csgo", "cs2"),
    sources: [csWiki("USP-S", "USP-S")],
  },
  {
    id: "cs-weapon-p250",
    slug: "arma-p250",
    name: "P250",
    category: "weapons",
    details: { slot: 2, ammo: "Cargador de 13 balas" },
    summary:
      "Pistola que compran ambos bandos. Cuesta 300 $. Su cargador es de 13 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("P250", "P250")],
  },
  {
    id: "cs-weapon-deagle",
    slug: "arma-desert-eagle",
    name: "Desert Eagle",
    category: "weapons",
    details: { slot: 2, ammo: "Cargador de 7 balas" },
    summary:
      "Pistola que compran ambos bandos. Cuesta 650 $ en el CS original y en Source, y 700 $ en Global Offensive y CS2. Su cargador es de 7 balas.",
    notes: ["En el CS original y en Source se llamaba Nighthawk .50C."],
    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("Desert_Eagle", "Desert Eagle")],
  },
  {
    id: "cs-weapon-fiveseven",
    slug: "arma-five-seven",
    name: "Five-SeveN",
    category: "weapons",
    details: { slot: 2, ammo: "Cargador de 20 balas" },
    summary:
      "Pistola que solo compran los Antiterroristas. Cuesta 500 $ en Global Offensive y CS2 (750 $ en el CS original y en Source). Su cargador es de 20 balas.",
    notes: ["En el CS original y en Source se llamaba ES Five-seven."],
    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("Five-SeveN", "Five-SeveN")],
  },
  {
    id: "cs-weapon-tec9",
    slug: "arma-tec-9",
    name: "Tec-9",
    category: "weapons",
    details: { slot: 2, ammo: "Cargador de 18 balas" },
    summary:
      "Pistola que solo compran los Terroristas. Cuesta 500 $. Su cargador es de 18 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("Tec-9", "Tec-9")],
  },
  {
    id: "cs-weapon-cz75",
    slug: "arma-cz75-auto",
    name: "CZ75-Auto",
    category: "weapons",
    details: { slot: 2, ammo: "Cargador de 12 balas" },
    summary:
      "Pistola automática que compran ambos bandos. Cuesta 500 $. Su cargador es de 12 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("CZ75-Auto", "CZ75-Auto")],
  },
  {
    id: "cs-weapon-r8",
    slug: "arma-r8-revolver",
    name: "R8 Revolver",
    category: "weapons",
    details: { slot: 2, ammo: "Tambor de 8 balas" },
    summary:
      "Revólver que compran ambos bandos. Cuesta 600 $. Su tambor es de 8 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("R8_Revolver", "R8 Revolver")],
  },
  {
    id: "cs-weapon-dualies",
    slug: "arma-dual-berettas",
    name: "Dual Berettas",
    category: "weapons",
    details: { slot: 2, ammo: "Cargador de 30 balas" },
    summary:
      "Pistolas dobles que compran ambos bandos. Cuesta 300 $ en Global Offensive y CS2 (800 $ en el CS original y en Source, donde solo las compraban los Terroristas). Su cargador es de 30 balas.",
    notes: ["En el CS original y en Source se llamaban .40 Dual Elites."],
    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("Dual_Berettas", "Dual Berettas")],
  },
  {
    id: "cs-weapon-mp5",
    slug: "arma-mp5",
    name: "MP5",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 30 balas" },
    summary:
      "Subfusil que compran ambos bandos. Cuesta 1500 $. Su cargador es de 30 balas.",
    notes: [
      "Se llama oficialmente K&M Sub-Machine Gun y el modelo del juego es el Heckler & Koch MP5 Navy.",
      "En Global Offensive lo sustituyó el MP7; en agosto de 2018 llegó el MP5-SD como sucesor.",
    ],
    appearances: a("cs", "css"),
    sources: [csWiki("MP5", "MP5")],
  },
  {
    id: "cs-weapon-mp7",
    slug: "arma-mp7",
    name: "MP7",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 30 balas" },
    summary:
      "Subfusil que compran ambos bandos. Cuesta 1500 $ en Global Offensive y 1400 $ en CS2. Su cargador es de 30 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("MP7", "MP7")],
  },
  {
    id: "cs-weapon-mp9",
    slug: "arma-mp9",
    name: "MP9",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 30 balas" },
    summary:
      "Subfusil que solo compran los Antiterroristas. Cuesta 1250 $. Su cargador es de 30 balas.",
    notes: ["Es el equivalente de los Antiterroristas al MAC-10."],
    appearances: a("csgo", "cs2"),
    sources: [csWiki("MP9", "MP9")],
  },
  {
    id: "cs-weapon-mac10",
    slug: "arma-mac-10",
    name: "MAC-10",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 30 balas" },
    summary:
      "Subfusil que solo compran los Terroristas. Cuesta 1400 $ en el CS original y en Source, y 1050 $ en Global Offensive y CS2. Su cargador es de 30 balas.",

    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("MAC-10", "MAC-10")],
  },
  {
    id: "cs-weapon-ump45",
    slug: "arma-ump-45",
    name: "UMP-45",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 25 balas" },
    summary:
      "Subfusil que compran ambos bandos. Cuesta 1700 $ en el CS original y en Source, y 1200 $ en Global Offensive y CS2. Su cargador es de 25 balas.",

    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("UMP-45", "UMP-45")],
  },
  {
    id: "cs-weapon-p90",
    slug: "arma-p90",
    name: "P90",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 50 balas" },
    summary:
      "Subfusil que compran ambos bandos. Cuesta 2350 $. Su cargador es de 50 balas.",
    notes: ["En el CS original y en Source se llamaba ES C90."],
    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("P90", "P90")],
  },
  {
    id: "cs-weapon-bizon",
    slug: "arma-pp-bizon",
    name: "PP-Bizon",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 64 balas" },
    summary:
      "Subfusil que compran ambos bandos. Cuesta 1400 $ en Global Offensive y 1300 $ en CS2. Su cargador es de 64 balas.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("PP-Bizon", "PP-Bizon")],
  },
  {
    id: "cs-weapon-nova",
    slug: "arma-nova",
    name: "Nova",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 8 cartuchos" },
    summary:
      "Escopeta que compran ambos bandos. Cuesta 1050 $. Su cargador es de 8 cartuchos.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("Nova", "Nova")],
  },
  {
    id: "cs-weapon-xm1014",
    slug: "arma-xm1014",
    name: "XM1014",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 7 cartuchos" },
    summary:
      "Escopeta automática que compran ambos bandos. Cuesta 3000 $ en el CS original y en Source, y 2000 $ en Global Offensive y CS2. Su cargador es de 7 cartuchos.",

    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("XM1014", "XM1014")],
  },
  {
    id: "cs-weapon-mag7",
    slug: "arma-mag-7",
    name: "MAG-7",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 5 cartuchos" },
    summary:
      "Escopeta que solo compran los Antiterroristas. Cuesta 1300 $. Su cargador es de 5 cartuchos.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("MAG-7", "MAG-7")],
  },
  {
    id: "cs-weapon-sawedoff",
    slug: "arma-sawed-off",
    name: "Sawed-Off",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 7 cartuchos" },
    summary:
      "Escopeta de cañones recortados que solo compran los Terroristas. Cuesta 1100 $. Su cargador es de 7 cartuchos.",

    appearances: a("csgo", "cs2"),
    sources: [csWiki("Sawed-Off", "Sawed-Off")],
  },
  {
    id: "cs-weapon-m249",
    slug: "arma-m249",
    name: "M249",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 100 balas" },
    summary:
      "Ametralladora ligera que compran ambos bandos. Cuesta 5750 $ en el CS original y en Source, y 5200 $ en Global Offensive y CS2. Su cargador es de 100 balas.",

    appearances: a("cs", "css", "csgo", "cs2"),
    sources: [csWiki("M249", "M249")],
  },
  {
    id: "cs-weapon-negev",
    slug: "arma-negev",
    name: "Negev",
    category: "weapons",
    details: { slot: 1, ammo: "Cargador de 150 balas" },
    summary:
      "Ametralladora ligera que compran ambos bandos. Cuesta 1700 $ (su precio original era de 5700 $). Su cargador es de 150 balas, 50 más que el del M249.",
    notes: [
      "Es la variante «commando» de la IMI Negev, con el cañón acortado y una empuñadura delantera en lugar del bípode.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [csWiki("Negev", "Negev")],
  },
  {
    id: "cs-weapon-he-grenade",
    slug: "arma-granada-he",
    name: "Granada HE",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Granada de fragmentación (HE, de «high explosive») que compran ambos bandos por 300 $. Explota tras una mecha corta y causa daño instantáneo en una zona, que baja con la distancia; también puede destruir rejillas, ventanas y puertas destructibles. Solo se puede llevar una a la vez, salvo en Condition Zero: Deleted Scenes, donde caben tres.",
    notes: ["En CS2, su explosión disipa temporalmente las nubes de humo."],
    appearances: all,
    sources: [csWiki("HE_Grenade", "HE Grenade")],
  },
  {
    id: "cs-weapon-flashbang",
    slug: "arma-granada-cegadora",
    name: "Granada cegadora",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Granada que explota tras una mecha y libera un destello brillante que ciega a los jugadores con visión clara de ella. Cuesta 200 $ y la compran ambos bandos. En la mayoría de los juegos se pueden llevar dos; en Global Offensive y CS2 caben dos en Competitive, Wingman y Premier y una en Casual.",
    notes: [
      "El máximo absoluto de granadas que se puede llevar es de cuatro.",
      "En Condition Zero: Deleted Scenes se pueden llevar hasta tres cegadoras.",
    ],
    appearances: all,
    sources: [csWiki("Flashbang", "Flashbang")],
  },
  {
    id: "cs-weapon-smoke-grenade",
    slug: "arma-granada-de-humo",
    name: "Granada de humo",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Granada de humo que compran ambos bandos por 300 $. Al caer libera casi al instante una nube de humo (la mecha solo empieza tras aterrizar, así que no explota en el aire) que sirve de cobertura o para dificultar la visión enemiga, y no hace daño. En CS2, los disparos abren agujeros temporales en la nube.",
    notes: [
      "En CS2, las explosiones de granadas HE y del C4 disipan el humo temporalmente.",
    ],
    appearances: all,
    sources: [csWiki("Smoke_Grenade", "Smoke Grenade")],
  },
  {
    id: "cs-weapon-molotov",
    slug: "arma-molotov",
    name: "Cóctel molotov",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Granada incendiaria exclusiva de los Terroristas, que cuesta 400 $. En Global Offensive se llama simplemente Molotov; su equivalente para los Antiterroristas es la granada incendiaria.",
    appearances: a("csgo", "cs2"),
    sources: [csWiki("Molotov", "Molotov")],
  },
  {
    id: "cs-weapon-decoy-grenade",
    slug: "arma-granada-senuelo",
    name: "Granada señuelo",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "La granada más barata de Global Offensive y CS2: 50 $. Se activa poco después de aterrizar y emite el sonido del arma más potente de quien la lanza, y aparece como un punto gris en el radar de su equipo. Su modelo es un clon de la cegadora, con la franja roja.",
    notes: ["Se autodetona tras unos 18 segundos y no daña a los compañeros."],
    appearances: a("csgo", "cs2"),
    sources: [csWiki("Decoy_Grenade", "Decoy Grenade")],
  },
  {
    id: "cs-weapon-c4",
    slug: "arma-c4",
    name: "Explosivo C4",
    category: "weapons",
    details: { slot: 5 },
    summary:
      "Equipo de objetivo exclusivo de los Terroristas en los mapas de desactivación de bomba. Al inicio de cada ronda se entrega a un Terrorista al azar y solo puede plantarse en un punto de bomba. Explota tras 45 segundos por defecto, o 40 con las reglas competitivas.",
    notes: [
      "Es composición C-4: un explosivo plástico maleable con un 91 % de RDX y una velocidad de detonación de 8092 m/s.",
      "Solo un Terrorista puede recoger una bomba soltada, por equilibrio de juego.",
    ],
    appearances: all,
    sources: [csWiki("C4_Explosive", "C4 Explosive")],
  },
  {
    id: "cs-weapon-zeus-x27",
    slug: "arma-zeus-x27",
    name: "Zeus x27",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma eléctrica basada en la Taser M26, que compran ambos bandos por 200 $ en el menú de equipo y que ocupa la ranura de cuerpo a cuerpo junto al cuchillo. Dispara un único impacto de muy corto alcance y mucho daño, y tarda unos treinta segundos en recargar: a menos de 183 unidades de Hammer mata de un golpe sin importar la zona y atraviesa la armadura.",
    notes: [
      "En Global Offensive, matar con el Zeus no da dinero; en CS2 da 100 $ en competitivo y 50 $ en casual.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [csWiki("Zeus_x27", "Zeus x27")],
  },
  {
    id: "cs-weapon-knife",
    slug: "arma-cuchillo",
    name: "Cuchillo",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Arma cuerpo a cuerpo básica de la serie: todos los jugadores la llevan siempre, no se compra y normalmente no se puede soltar. Su ataque principal es rápido y hace poco daño; el secundario es lento y hace mucho. En Source y Global Offensive, el ataque principal hace menos daño en golpes consecutivos.",
    appearances: all,
    sources: [csWiki("Knife", "Knife")],
  },
];

// Bandos, facciones y personajes jugables o de objetivo.
const characters: Entry[] = [
  {
    id: "cs-char-terrorists",
    slug: "personaje-terroristas",
    name: "Terroristas",
    category: "characters",
    details: { affiliation: "Bando Terrorista" },
    summary:
      "Uno de los dos bandos de todos los juegos de Counter-Strike, frente a los Antiterroristas. En las partidas de bomba deben plantar el C4 en un punto de bomba y evitar que lo desactiven; en las de rehenes, impedir el rescate; y en el modo asesinato, matar al VIP. También ganan si eliminan al equipo rival.",
    notes: [
      "Su color de equipo fue el rojo hasta Global Offensive, donde pasó a amarillo.",
      "Entre sus armas exclusivas están la Glock-18, el AK-47, el MAC-10 y el G3SG1; solo ellos llevan el C4.",
      "Algunas de sus facciones son Phoenix Connexion, Elite Crew, Arctic Avengers, Guerrilla Warfare, Midwest Militia, Balkan, Anarchist, Separatist, Pirate, Professional y Sabre.",
    ],
    appearances: all,
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
      csWiki("Terrorists", "Terrorists"),
    ],
  },
  {
    id: "cs-char-counter-terrorists",
    slug: "personaje-antiterroristas",
    name: "Antiterroristas",
    category: "characters",
    details: { affiliation: "Bando Antiterrorista" },
    summary:
      "El otro bando de todos los juegos de la serie, frente a los Terroristas. Impiden que se plante la bomba o la desactivan si ya está colocada, rescatan a los rehenes y escoltan al VIP. En todos los juegos su color de equipo es el azul.",
    notes: [
      "Entre sus armas exclusivas están la Five-SeveN, el AUG, el FAMAS y el M4A1 o M4A4; solo ellos usan el kit de desactivación.",
      "Algunas de sus facciones son GIGN, GSG-9, SAS, SEAL Team 6, FBI, IDF, SWAT, KSK, Gendarmerie Nationale y Brazilian 1st Battalion.",
    ],
    appearances: all,
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
      csWiki("Counter-Terrorists", "Counter-Terrorists"),
    ],
  },
  {
    id: "cs-char-phoenix-connexion",
    slug: "personaje-phoenix-connexion",
    name: "Phoenix Connexion",
    category: "characters",
    details: {
      affiliation: "Terroristas (Europa del Este)",
      voiceActor: "Stanislav Fedorchuk (Global Offensive)",
    },
    summary:
      "Facción terrorista que, según su descripción oficial, se formó poco después de la ruptura de la URSS y es una de las más temidas de Europa del Este. Es la facción terrorista más antigua de Counter-Strike: aparece desde la beta 1.0. Es una de las facciones terroristas por defecto de CS2.",
    appearances: all,
    sources: [csWiki("Phoenix_Connexion", "Phoenix Connexion")],
  },
  {
    id: "cs-char-elite-crew",
    slug: "personaje-elite-crew",
    name: "Elite Crew",
    category: "characters",
    details: {
      affiliation: "Terroristas (Oriente Medio)",
      voiceActor: "Alain Aouad (Global Offensive)",
    },
    summary:
      "Facción terrorista cuya descripción oficial habla de fundamentalistas de Oriente Medio centrados en dominar el mundo. Se la conoce también como 1337 Krew o Leet Krew, y fue la primera facción terrorista disponible en la beta de Global Offensive.",
    appearances: all,
    sources: [csWiki("Elite_Crew", "Elite Crew")],
  },
  {
    id: "cs-char-seal-team-6",
    slug: "personaje-seal-team-6",
    name: "SEAL Team 6",
    category: "characters",
    details: {
      affiliation: "Antiterroristas (Estados Unidos)",
      voiceActor: "Jon Curry (Global Offensive)",
    },
    summary:
      "Facción antiterrorista basada en la unidad de operaciones especiales de la Armada de Estados Unidos, fundada en octubre de 1980 bajo el mando del teniente comandante Richard Marcinko. Es la facción antiterrorista más antigua de Counter-Strike: aparece desde la beta 1.0. La unidad se disolvió en 1987 y su sucesora es el DEVGRU; en Condition Zero: Deleted Scenes se llama U.S. Navy SEALs.",
    appearances: all,
    sources: [csWiki("SEAL_Team_6", "SEAL Team 6")],
  },
  {
    id: "cs-char-gign",
    slug: "personaje-gign",
    name: "GIGN",
    category: "characters",
    details: {
      affiliation: "Antiterroristas (Francia)",
      voiceActor: "Pierre Tessier (Global Offensive)",
    },
    summary:
      "Facción antiterrorista basada en el Groupe d'Intervention de la Gendarmerie Nationale francés, fundado por el teniente Christian Prouteau tras la masacre de los Juegos Olímpicos de Múnich de 1972. Aparece en el CS original, Source y Global Offensive, y fue el segundo modelo jugable de la beta de Global Offensive.",
    notes: [
      "Su descripción oficial lo presenta como una fuerza de respuesta rápida que no supera los 100 hombres.",
    ],
    appearances: a("cs", "css", "csgo"),
    sources: [csWiki("GIGN", "GIGN")],
  },
  {
    id: "cs-char-gsg9",
    slug: "personaje-gsg-9",
    name: "GSG-9",
    category: "characters",
    details: {
      affiliation: "Antiterroristas (Alemania)",
      voiceActor: "Thomas Balou Martin (Global Offensive)",
    },
    summary:
      "Facción antiterrorista basada en el GSG 9 de la Policía Federal alemana, fundado por Ulrich Wegener tras la masacre de Múnich de 1972. Se añadió en la beta 3.0 del CS original y aparece también en Source y Global Offensive. Es una unidad policial, no militar.",
    notes: [
      "Su descripción oficial en Global Offensive dice que se estableció en 1973 y que, según se informa, solo ha usado sus armas cinco veces en más de 1500 misiones.",
    ],
    appearances: a("cs", "css", "csgo"),
    sources: [csWiki("GSG-9", "GSG-9")],
  },
  {
    id: "cs-char-sas",
    slug: "personaje-sas",
    name: "SAS",
    category: "characters",
    details: {
      affiliation: "Antiterroristas (Reino Unido)",
      voiceActor: "Tony Curran (Global Offensive)",
    },
    summary:
      "Facción antiterrorista basada en el Special Air Service británico, fundado en la Segunda Guerra Mundial por David Stirling como fuerza de comandos tras las líneas enemigas. Tras la masacre de Múnich de 1972 el gobierno británico lo orientó al antiterrorismo; saltó a la fama en 1980 con la liberación de la embajada de Irán en Londres. Es una de las facciones antiterroristas por defecto de CS2.",
    appearances: all,
    sources: [csWiki("SAS", "SAS")],
  },
  {
    id: "cs-char-vip",
    slug: "personaje-vip",
    name: "VIP",
    category: "characters",
    details: { affiliation: "Antiterroristas (afiliado)" },
    summary:
      "Personaje exclusivo del modo asesinato del CS original: un jugador Antiterrorista cuyo objetivo es llegar a una zona de extracción. Los Terroristas ganan si lo matan o se acaba el tiempo. Tiene 200 de armadura, se mueve al 150 % de velocidad y lleva una USP; no puede recoger otras armas ni soltar las suyas.",
    notes: [
      "Tiene una apariencia propia para poder identificarlo.",
      "Counter-Strike: Source salió sin el modo asesinato.",
    ],
    appearances: a("cs"),
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
      wikipedia("Counter-Strike:_Source", "Counter-Strike: Source"),
      csWiki("VIP", "VIP"),
    ],
  },
  {
    id: "cs-char-hostage",
    slug: "personaje-rehen",
    name: "Rehén",
    category: "characters",
    details: { affiliation: "Neutral (objetivo de los mapas de rehenes)" },
    summary:
      "Personaje no jugable que es el objetivo de los mapas de rescate de rehenes: los Antiterroristas deben llevarlo a la zona de rescate y los Terroristas, impedirlo. En Global Offensive y CS2 hay dos rehenes en posiciones aleatorias, atados de rodillas; un Antiterrorista tarda 4 segundos en desatarlo (1 con un kit de rescate) y lo carga a la espalda.",
    notes: [
      "En esos juegos los rehenes son invulnerables, aunque herirlos sigue penalizando con dinero.",
      "Un mismo Antiterrorista solo puede cargar un rehén a la vez y basta un rescate para ganar la ronda.",
    ],
    appearances: all,
    sources: [csWiki("Hostage", "Hostage")],
  },
];

// Curiosidades: historia del mod, modos, economía y evolución de cada juego.
const trivia: Entry[] = [
  {
    id: "cs-trivia-mod-origin",
    slug: "curiosidad-origen-del-mod",
    name: "Origen del mod",
    category: "trivia",
    summary:
      "Counter-Strike nació como modificación de Half-Life creada por Minh «Gooseman» Le y Jess Cliffe. Le, que ya había hecho mods como Navy SEALs para Quake y Action Quake 2, empezó a trabajar en él mientras estudiaba en la universidad y publicó la primera beta en junio de 1999. El mod recibió su nombre el 15 de marzo de 1999 tras una conversación por ICQ entre Le y Cliffe.",
    notes: [
      "Le se centró en los modelos de los jugadores, con unas 40 horas por cada uno; Cliffe aportó diseño, sonido, arte y relaciones públicas.",
      "Antes de la primera beta se filtró una versión previa en internet.",
      "A finales de 1999, Le empezó a trabajar en Barking Dog Studios; cuando Valve lo supo, pidió a ese estudio ayuda con la beta 5 y ofreció financiar el proyecto y adquirir la propiedad intelectual del juego.",
      "El apodo «Gooseman» viene de Shane Gooseman, personaje de la serie de dibujos de los años ochenta The Adventures of the Galaxy Rangers.",
    ],
    appearances: a("cs"),
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
      wikipedia("Minh_Le", "Minh Le"),
    ],
  },
  {
    id: "cs-trivia-valve-acquisition",
    slug: "curiosidad-valve-y-el-mod",
    name: "De mod a producto de Valve",
    category: "trivia",
    summary:
      "El 12 de abril de 2000, Valve anunció una colaboración con el equipo de Counter-Strike y confirmó que la versión 1.0 llegaría en un parche de Half-Life. Valve planeó publicarlo como mod y como producto de venta independiente el 31 de agosto de 2000; la serie sitúa su primer lanzamiento el 9 de noviembre de 2000. Fue el primer videojuego creado por aficionados que se vendió comercialmente.",
    notes: [
      "Antes del lanzamiento comercial hubo problemas legales con los nombres de las armas, que se cambiaron por otros ficticios.",
      "Valve también tuvo que asegurarse los derechos de mapas y texturas, así que algunos se modificaron o se retiraron; Minh Le compensó a los creadores cuyos mapas Valve no compró.",
      "La versión comercial añadió tres armas diseñadas por Minh Le y modelos de jugador actualizados por Valve.",
      "En octubre de 2002 se anunció que Counter-Strike 1.6 se distribuiría primero por Steam, con una beta previa.",
    ],
    appearances: a("cs"),
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
      wikipedia("Counter-Strike", "Counter-Strike"),
    ],
  },
  {
    id: "cs-trivia-sales",
    slug: "curiosidad-cifras-comerciales",
    name: "Cifras del juego original",
    category: "trivia",
    summary:
      "En agosto de 2004, Counter-Strike había recaudado 75 millones de dólares y contaba con unos dos millones de jugadores estimados en todo el mundo. En diciembre de 2008 había vendido unos 4,2 millones de copias, más que cualquier otro juego de Valve salvo Half-Life y Half-Life 2. Durante las betas superó los 245.000 jugadores.",
    notes: [
      "Parte de las ventas de Half-Life se atribuye a Counter-Strike, porque el juego era originalmente un mod de Half-Life.",
    ],
    appearances: a("cs"),
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
    ],
  },
  {
    id: "cs-trivia-movie-weapons",
    slug: "curiosidad-armas-del-cine",
    name: "Armas inspiradas en el cine",
    category: "trivia",
    summary:
      "Varias películas sirvieron de fuente de inspiración para elegir las armas del juego. El Krieg 552 y el M249 se incluyeron por inspiración de la película Ronin (1998), y Air Force One y León: el profesional influyeron también en la selección.",
    appearances: a("cs"),
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
    ],
  },
  {
    id: "cs-trivia-original-modes",
    slug: "curiosidad-modos-del-cs-original",
    name: "Modos y objetivos del CS original",
    category: "trivia",
    summary:
      "Además de eliminar al equipo rival, el CS original tenía tres objetivos según el mapa: desactivación de bomba (mapas «de_»), rescate de rehenes (mapas «cs_») y asesinato o escolta del VIP (mapas «as_»). Antiguamente existió un cuarto, el escape, en el que los Terroristas debían llegar a un punto de huida.",
    notes: [
      "En desactivación de bomba, los Terroristas llevan el C4 desde el inicio de la ronda y los mapas suelen tener dos puntos de bomba, A y B. Los Antiterroristas ganan si la desactivan a tiempo o si se acaba el tiempo sin plantar; los Terroristas, si explota.",
      "En rehenes, los rehenes suelen estar cerca de la aparición de los Terroristas y los Antiterroristas deben llevarlos a una zona de rescate.",
      "Counter-Strike: Source salió sin el modo asesinato y sin el escudo antidisturbios.",
    ],
    appearances: a("cs", "css"),
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
      wikipedia("Counter-Strike:_Source", "Counter-Strike: Source"),
    ],
  },
  {
    id: "cs-trivia-economy",
    slug: "curiosidad-la-economia-del-juego",
    name: "La economía del juego",
    category: "trivia",
    summary:
      "En Counter-Strike los jugadores no empiezan cada ronda con las armas puestas: las compran con el dinero que reciben por completar objetivos, y la interfaz muestra ese dinero junto a la salud, la armadura y la munición. En CS2, una partida estándar termina cuando un equipo gana trece rondas.",
    notes: [
      "En Counter-Strike: Condition Zero, matar a un enemigo da 300 $, los Terroristas ganan 2750 $ si la bomba explota y los Antiterroristas, 2000 $ por jugador si rescatan a los rehenes o eliminan al equipo rival; el máximo que se puede acumular es de 16 000 $.",
      "Según la Counter-Strike Wiki, las armas de los Terroristas son más potentes y de equipo más barato, y las de los Antiterroristas, más caras y con menos daño.",
    ],
    appearances: all,
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
      wikipedia(
        "Counter-Strike:_Condition_Zero",
        "Counter-Strike: Condition Zero",
      ),
      wikipedia("Counter-Strike_2", "Counter-Strike 2"),
      csWiki("Terrorists", "Terrorists"),
    ],
  },
  {
    id: "cs-trivia-dust2-design",
    slug: "curiosidad-dust2-el-mapa-mas-emblematico",
    name: "Dust II, el mapa más emblemático",
    category: "trivia",
    summary:
      "Dust II ha estado en todos los juegos de la serie desde 2001. David Johnston explicó que quiso que el nuevo mapa tuviera todo lo de Dust «sin ser Dust»: conservó las estructuras simples, las rampas, las cajas y las «puertas de Dust», y añadió una zona de combate cercano (los túneles B) y otra de largo alcance (Long A).",
    notes: [
      "En febrero de 2017 salió del grupo competitivo de Global Offensive porque era el único que no se había rehecho; volvió a la rotación Active Duty en abril de 2024.",
      "En Source se añadieron puertas nuevas, una caja del centro más fácil de escalar y un techo más alto que facilita disparar desde la aparición de los Terroristas hacia las puertas del medio; en Global Offensive las puertas de madera pasaron a ser de metal, mucho más difíciles de atravesar.",
      "Dustnet, otro juego, transcurre dentro de «la última copia de de_dust2 del mundo» y esconde un homenaje a David Johnston.",
    ],
    appearances: all,
    sources: [wikipedia("Dust_II", "Dust II")],
  },
  {
    id: "cs-trivia-condition-zero",
    slug: "curiosidad-condition-zero",
    name: "Counter-Strike: Condition Zero",
    category: "trivia",
    summary:
      "Condition Zero salió en marzo de 2004 para Windows, desarrollado por Turtle Rock Studios, Ritual Entertainment y Valve y publicado por Sierra Entertainment y Valve. Usa el motor GoldSrc, como el CS original, e incluye un modo multijugador con modelos, texturas y mapas actualizados y dos campañas para un jugador: Tour of Duty y Deleted Scenes. Ocho meses después llegó Counter-Strike: Source.",
    notes: [
      "Deleted Scenes es una campaña lineal de 12 misiones con equipo nuevo, como una cámara digital, un walkie-talkie, un soplete, explosivos por control remoto o una cámara de fibra óptica.",
      "En Tour of Duty, cada objetivo ganado da un punto de reputación para mejorar los atributos de un bot.",
      "Existió una versión previa del juego, desarrollada por Ritual Entertainment, que se publicó junto a Condition Zero como Deleted Scenes.",
    ],
    appearances: a("cs"),
    sources: [
      wikipedia(
        "Counter-Strike:_Condition_Zero",
        "Counter-Strike: Condition Zero",
      ),
      wikipedia("Counter-Strike", "Counter-Strike"),
    ],
  },
  {
    id: "cs-trivia-source-launch",
    slug: "curiosidad-counter-strike-source",
    name: "Counter-Strike: Source y el motor Source",
    category: "trivia",
    summary:
      "Counter-Strike: Source es un remake del CS original y fue el primer juego que Valve lanzó con el motor Source. Se anunció el 12 de mayo de 2004 como parte multijugador de Half-Life 2, su beta salió el 11 de agosto de 2004 para miembros del Valve Cyber Café Program y llegó a Steam el 7 de octubre de 2004, más de un mes antes que Half-Life 2.",
    notes: [
      "El desarrollo empezó en enero de 2004 con la versión 1.1 del CS original, que se desmontó y se reconstruyó pieza a pieza en Source; después se incorporaron las novedades de la 1.6 y de Condition Zero.",
      "Source introdujo objetos físicos (barriles, neumáticos, botellas) que afectan al juego y cuerpos con ragdoll en lugar de animaciones de muerte predefinidas.",
      "El máximo de jugadores por servidor se duplicó, hasta 64.",
      "Entre diciembre de 2004 y enero de 2006, Turtle Rock Studios rehízo seis mapas clásicos que faltaban en el lanzamiento.",
      "El 18 de febrero de 2025 llegó la primera gran actualización en casi 12 años, que pasó el juego de 32 a 64 bits.",
    ],
    appearances: a("css"),
    sources: [wikipedia("Counter-Strike:_Source", "Counter-Strike: Source")],
  },
  {
    id: "cs-trivia-global-offensive",
    slug: "curiosidad-global-offensive",
    name: "Counter-Strike: Global Offensive",
    category: "trivia",
    summary:
      "Global Offensive lo desarrollaron Valve y Hidden Path Entertainment durante más de dos años; empezó cuando Hidden Path intentó llevar Counter-Strike: Source a consolas. Salió en agosto de 2012 para OS X, PlayStation 3, Windows y Xbox 360, y en 2014 para Linux. El 6 de diciembre de 2018 pasó a ser gratuito, con ingresos basados en objetos cosméticos.",
    notes: [
      "Se planeó el juego cruzado entre Windows, OS X, Linux, Xbox 360 y PlayStation 3, pero se descartó para poder actualizar activamente las versiones de PC y Mac.",
      "La actualización de diciembre de 2018 añadió Danger Zone y la interfaz Panorama, que sustituyó a Scaleform; quienes lo habían comprado antes recibieron el estado Prime.",
      "Tuvo nueve modos oficiales: Competitive, Casual, Deathmatch, Arms Race, Demolition, Wingman, Flying Scoutsman, Retakes y Danger Zone.",
      "Introdujo armas y equipo nuevos, como los tasers y la granada incendiaria.",
    ],
    appearances: a("csgo"),
    sources: [
      wikipedia(
        "Counter-Strike:_Global_Offensive",
        "Counter-Strike: Global Offensive",
      ),
    ],
  },
  {
    id: "cs-trivia-operations",
    slug: "curiosidad-operaciones",
    name: "Las operaciones de Global Offensive",
    category: "trivia",
    summary:
      "Valve celebraba de vez en cuando «operaciones», a las que se accedía con paquetes de pago llamados «operation passes»: daban acceso a objetivos repartidos por distintos modos, como Arms Race y Deathmatch. Operation Shattered Web (noviembre de 2019) añadió modelos de personaje nuevos y un sistema de pase de batalla.",
    notes: [
      "Wildfire (2016) acompañó la nueva versión de Nuke.",
      "Broken Fang (diciembre de 2020) incluyó el primer tráiler cinemático oficial de Global Offensive en ocho años y el mapa Ancient.",
      "Riptide (septiembre de 2021) añadió cambios de juego y matchmaking, mapas nuevos y objetos cosméticos.",
      "Breakout (2014) llevó Cache a la rotación competitiva.",
    ],
    appearances: a("csgo"),
    sources: [
      wikipedia(
        "Counter-Strike:_Global_Offensive",
        "Counter-Strike: Global Offensive",
      ),
      wikipedia(
        "List_of_competitive_Counter-Strike_maps",
        "List of competitive Counter-Strike maps",
      ),
      csWiki("Ancient", "Ancient"),
    ],
  },
  {
    id: "cs-trivia-danger-zone",
    slug: "curiosidad-danger-zone",
    name: "Danger Zone",
    category: "trivia",
    summary:
      "Danger Zone fue el modo «battle royale» que llegó a Global Offensive con la actualización del 6 de diciembre de 2018. Reunía hasta 18 jugadores, en solitario o en dúos, en un gran mapa dividido en hexágonos: se empezaba con los puños, un Medi-Shot y una tablet para ver el mapa y comprar, y se saqueaba equipo mientras la zona segura se encogía, hasta que quedaba un solo jugador (o equipo).",
    notes: ["CS2 lo eliminó en su lanzamiento, en septiembre de 2023."],
    appearances: a("csgo"),
    sources: [
      csWiki("Danger_Zone", "Danger Zone"),
      wikipedia("Counter-Strike_2", "Counter-Strike 2"),
    ],
  },
  {
    id: "cs-trivia-arms-race-demolition",
    slug: "curiosidad-arms-race-y-demolition",
    name: "Arms Race y Demolition",
    category: "trivia",
    summary:
      "Arms Race y Demolition eran modos de «War Games» de Global Offensive basados en el mod Gun Game. En Arms Race, 6 Antiterroristas se enfrentan a 6 Terroristas en una sola ronda con reapariciones continuas: no hay menú de compra y cada dos bajas se sube de nivel de arma; gana quien consigue una baja con el cuchillo dorado. Demolition mezclaba ese sistema con el modo bomba, en rondas de 1 minuto y 30 segundos.",
    notes: [
      "CS2 retiró Arms Race en su lanzamiento y lo reincorporó con la actualización del 6 de febrero de 2024; Demolition solo existió en Global Offensive.",
      "El 13 de noviembre de 2017, Arms Race y Demolition pasaron de la categoría Arsenal a War Games.",
      "En Demolition, la partida dura 10 rondas y la gana quien llegue primero a 6; los mapas de Arms Race llevan el prefijo «ar_».",
    ],
    appearances: a("csgo", "cs2"),
    sources: [
      csWiki("Arms_Race", "Arms Race"),
      csWiki("Demolition", "Demolition"),
      wikipedia("Counter-Strike_2", "Counter-Strike 2"),
    ],
  },
  {
    id: "cs-trivia-skins-economy",
    slug: "curiosidad-skins-y-economia-de-objetos",
    name: "Skins y economía de objetos",
    category: "trivia",
    summary:
      "Con la actualización Arms Deal, de agosto de 2013, las skins de armas formaron una economía virtual gracias a su rareza. En 2019, Valve dejó de permitir intercambiar y vender las llaves de cajas recién compradas, al considerar que casi todo su comercio se debía ya a redes de fraude.",
    notes: [
      "En CS2, el acceso a Premier requiere comprar el estatus Prime, que da un «paquete de cuidados» semanal con recompensas como skins, cajas y grafitis.",
      "Eurogamer y Dot Esports estimaron que CS2 generó unos 1000 millones de dólares en 2023 con la venta de cajas, con más de 400 millones abiertas ese año.",
      "Todos los objetos cosméticos de Global Offensive, incluidas las skins y los cuchillos, se transfirieron a CS2.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [
      wikipedia(
        "Counter-Strike:_Global_Offensive",
        "Counter-Strike: Global Offensive",
      ),
      wikipedia("Counter-Strike_2", "Counter-Strike 2"),
    ],
  },
  {
    id: "cs-trivia-counter-strike-2",
    slug: "curiosidad-counter-strike-2",
    name: "Counter-Strike 2 y Source 2",
    category: "trivia",
    summary:
      "Counter-Strike 2 se anunció el 22 de marzo de 2023 y llegó el 27 de septiembre de 2023 para Windows y Linux, sustituyendo a Global Offensive en Steam. Pasa del motor Source a Source 2 y estrena una arquitectura de servidores «sub-tick» para sincronizar mejor la acción con los controles del jugador.",
    notes: [
      "Valve clasificó los mapas en tres grupos: «touchstone» (misma distribución, como Dust II), «upgrades» (mejoras gráficas, como Nuke) y «overhauls» (reconstruidos desde cero, como Inferno).",
      "Entre las novedades: el humo volumétrico, que llena los espacios y cambia con los disparos y las granadas, y recargas que descartan la munición que quedaba en el cargador.",
      "En el lanzamiento se retiraron Arms Race y Danger Zone, varios mapas como Train y Cache, los 167 logros del juego y la compatibilidad con macOS.",
      "La música es de Mike Morasky; su álbum salió el 1 de noviembre de 2023 en Ipecac Recordings.",
      "Global Offensive sigue accesible en servidores de la comunidad mediante la rama «legacy» del juego.",
    ],
    appearances: a("cs2"),
    sources: [wikipedia("Counter-Strike_2", "Counter-Strike 2")],
  },
  {
    id: "cs-trivia-cs2-modes",
    slug: "curiosidad-modos-de-counter-strike-2",
    name: "Modos de Counter-Strike 2",
    category: "trivia",
    summary:
      "CS2 tiene dos modos de emparejamiento principales. En Competitive se puede elegir cualquier mapa y el rango se calcula por mapa; Premier usa un grupo de siete mapas con votaciones y vetos, y asigna una puntuación numérica en lugar de los dieciocho rangos de Global Offensive. Además hay seis modos más: Wingman, Casual, Deathmatch, Arms Race, Retakes y Rush.",
    notes: [
      "Wingman es una partida de bomba con dos jugadores por equipo, un solo punto de bomba y victoria a las nueve rondas.",
      "Retakes enfrenta a tres Terroristas que defienden un punto con la bomba activa contra cuatro Antiterroristas; gana quien llegue primero a ocho rondas.",
      "Rush enfrenta a equipos de tres en un mapa elegido al azar, con el objetivo de controlar una pequeña torre.",
      "El sistema de equipo solo permite llevar cinco pistolas, cinco armas intermedias y cinco fusiles en una partida: quince en total.",
    ],
    appearances: a("cs2"),
    sources: [wikipedia("Counter-Strike_2", "Counter-Strike 2")],
  },
  {
    id: "cs-trivia-active-duty",
    slug: "curiosidad-el-grupo-active-duty",
    name: "El grupo Active Duty",
    category: "trivia",
    summary:
      "Valve designa siete mapas como «Active Duty», los más equilibrados y competitivos, que se usan en casi todos los torneos de esports y en el modo Premier. Se eligen de un conjunto más amplio de mapas, algunos de la comunidad y otros de Valve, y la lista cambia de vez en cuando, normalmente sustituyendo un mapa cada vez.",
    notes: [
      "Según Wikipedia, en julio de 2026 los siete mapas de CS2 eran Ancient, Anubis, Cache, Dust II, Inferno, Mirage y Nuke.",
      "Mapas como Dust II se han añadido, quitado y vuelto a añadir.",
    ],
    appearances: a("csgo", "cs2"),
    sources: [
      wikipedia(
        "List_of_competitive_Counter-Strike_maps",
        "List of competitive Counter-Strike maps",
      ),
    ],
  },
  {
    id: "cs-trivia-competitive",
    slug: "curiosidad-escena-competitiva",
    name: "La escena competitiva",
    category: "trivia",
    summary:
      "El primer gran torneo de Counter-Strike fue el Winter Championship de la Cyberathlete Professional League, que empezó el 12 de abril de 2001 en Dallas con 48 equipos y más de 800 asistentes. Desde 2013, los Majors de Global Offensive patrocinados por Valve son los torneos más prestigiosos de la franquicia, con premios de en torno a un millón de dólares.",
    notes: [
      "Los Majors de Global Offensive empezaron con 16 equipos (2013-2017) y pasaron a 24 (2018-2023); Astralis, el equipo más exitoso, ganó cuatro con el mismo núcleo de jugadores.",
      "Los esports profesionales se juegan ahora en CS2.",
    ],
    appearances: a("cs", "csgo"),
    sources: [
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
      wikipedia("Counter-Strike", "Counter-Strike"),
      wikipedia(
        "Counter-Strike:_Global_Offensive",
        "Counter-Strike: Global Offensive",
      ),
    ],
  },
  {
    id: "cs-trivia-asia-spinoffs",
    slug: "curiosidad-derivados-para-asia",
    name: "Derivados para el mercado asiático",
    category: "trivia",
    summary:
      "La serie tiene varios derivados creados por terceros para Asia. Counter-Strike Neo fue una versión arcade de Namco publicada en Japón en 2003 para máquinas con Linux. Counter-Strike Online, desarrollado por Nexon con supervisión de Valve, apareció en 2008 como juego gratuito con micropagos; le siguió Counter-Strike Online 2 en 2013, y Counter-Strike Nexon: Zombies se lanzó en todo el mundo por Steam en 2014.",
    appearances: a("cs"),
    sources: [
      wikipedia("Counter-Strike", "Counter-Strike"),
      wikipedia("Counter-Strike_(video_game)", "Counter-Strike (video game)"),
    ],
  },
];

const easterEggs: Entry[] = [
  {
    id: "cs-egg-inferno-tictactoe",
    slug: "easter-egg-inferno-tres-en-raya-y-gallinas",
    name: "Tres en raya y gallinas en Inferno",
    category: "easter-eggs",
    summary:
      "Inferno incluye gallinas que se pueden disparar, como homenaje al mapa original cs_italy, y un tres en raya jugable que funciona como easter egg.",
    appearances: a("csgo"),
    sources: [
      wikipedia("Inferno_(Counter-Strike)", "Inferno (Counter-Strike)"),
    ],
  },
  {
    id: "cs-egg-nuke-black-mesa",
    slug: "easter-egg-cajas-de-black-mesa-en-nuke",
    name: "Cajas de Black Mesa en Nuke",
    category: "easter-eggs",
    summary:
      "En el Nuke original, el exterior imitaba el entorno del nivel «Surface Tension» de Half-Life y contenía cajas de transporte que pertenecían al Black Mesa Research Facility.",
    appearances: a("cs"),
    sources: [wikipedia("Nuke_(Counter-Strike)", "Nuke (Counter-Strike)")],
  },
  {
    id: "cs-egg-italy-chickens-radio",
    slug: "easter-egg-la-radio-y-las-gallinas-de-italy",
    name: "La radio y las gallinas de Italy",
    category: "easter-eggs",
    summary:
      "La radio y las gallinas que se pueden ver en cs_italy acabaron siendo señas de identidad de su ambiente y de su forma de jugarse. Inferno recuperó las gallinas como homenaje a este mapa.",
    appearances: all,
    sources: [
      csWiki("Italy", "Italy"),
      wikipedia("Inferno_(Counter-Strike)", "Inferno (Counter-Strike)"),
    ],
  },
  {
    id: "cs-egg-oilrig-apache",
    slug: "easter-egg-el-apache-de-half-life-en-oilrig",
    name: "El Apache de Half-Life en Oilrig",
    category: "easter-eggs",
    summary:
      "En as_oilrig, el helicóptero de transporte del VIP usó al principio el modelo del Apache de Half-Life. Para la beta 6.5 lo sustituyó un modelo propio de un Westland Wessex, obra del usuario «Agent Orange».",
    appearances: a("cs"),
    sources: [csWiki("Oilrig", "Oilrig")],
  },
  {
    id: "cs-egg-dust-destiny",
    slug: "easter-egg-dust-nacio-como-cs-destiny",
    name: "Dust nació como cs_destiny",
    category: "easter-eggs",
    summary:
      "Dust empezó cuando David Johnston quiso recrear unas capturas tempranas de un mapa de desierto de Team Fortress 2: Brotherhood of Arms. Se llamó cs_destiny, se le añadieron los puntos de bomba más tarde y durante las pruebas pasó a llamarse de_dust.",
    appearances: a("cs", "css", "csgo"),
    sources: [csWiki("Dust", "Dust")],
  },
];

export const counterStrikeEntries: Entry[] = [
  ...maps,
  ...weapons,
  ...characters,
  ...trivia,
  ...easterEggs,
];
