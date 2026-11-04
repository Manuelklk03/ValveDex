import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";

function tfWiki(page: string, title: string): Source {
  return {
    title: `${title} - Official TF2 Wiki`,
    url: `https://wiki.teamfortress.com/wiki/${page}`,
    kind: "wiki",
  };
}

const tfBoth = [
  { gameId: "team-fortress-classic" },
  { gameId: "team-fortress-2" },
];
const tf2Only = [{ gameId: "team-fortress-2" }];

export const teamFortressCharacters: Entry[] = [
  {
    id: "tf-heavy",
    slug: "heavy",
    name: "Heavy (Heavy Weapons Guy)",
    category: "characters",
    details: {
      affiliation: "RED / BLU",
      voiceActor: "Gary Schwartz",
    },
    summary:
      "El mercenario ruso de complexión titánica y fuerza descomunal. Es el baluarte defensivo y de choque de su equipo, inseparable de su querida ametralladora rotatoria Minigun.",
    notes: [
      "Su verdadero nombre es Mikhail. Protege con devoción a su madre y hermanas en las montañas de Siberia.",
    ],
    appearances: tfBoth,
    sources: [tfWiki("Heavy", "Heavy")],
  },
  {
    id: "tf-scout",
    slug: "scout",
    name: "Scout",
    category: "characters",
    details: {
      affiliation: "RED / BLU",
      voiceActor: "Nathan Vetterlein",
    },
    summary:
      "El miembro más veloz del equipo, natural de Boston (Massachusetts). Capaz de realizar dobles saltos en el aire y capturar objetivos el doble de rápido que cualquier otra clase.",
    appearances: tfBoth,
    sources: [tfWiki("Scout", "Scout")],
  },
  {
    id: "tf-soldier",
    slug: "soldier",
    name: "Soldier",
    category: "characters",
    details: {
      affiliation: "RED / BLU",
      voiceActor: "Rick May",
    },
    summary:
      "Patriota militar estadounidense fanático y desquiciado. Domina el combate explosivo a media distancia y la técnica del «rocket jump» para impulsarse a grandes alturas.",
    appearances: tfBoth,
    sources: [tfWiki("Soldier", "Soldier")],
  },
  {
    id: "tf-spy",
    slug: "spy",
    name: "Spy",
    category: "characters",
    details: {
      affiliation: "RED / BLU",
      voiceActor: "Dennis Bateman",
    },
    summary:
      "Espía francés refinado y letal. Se camufla como miembros del equipo rival, sabotea construcciones enemigas con sus zapadores y elimina instantáneamente por la espalda con su puñal.",
    appearances: tfBoth,
    sources: [tfWiki("Spy", "Spy")],
  },
  {
    id: "tf-medic",
    slug: "medic",
    name: "Medic",
    category: "characters",
    details: {
      affiliation: "RED / BLU",
      voiceActor: "Robin Atkin Downes",
    },
    summary:
      "Médico alemán de dudosa ética profesional pero indiscutible genialidad quirúrgica. Su pistola médica sana a sus compañeros y genera una «Supercarga» (ÜberCharge) de invulnerabilidad temporal.",
    appearances: tfBoth,
    sources: [tfWiki("Medic", "Medic")],
  },
  {
    id: "tf-engineer",
    slug: "engineer",
    name: "Engineer",
    category: "characters",
    details: {
      affiliation: "RED / BLU",
      voiceActor: "Grant Goodeve",
    },
    summary:
      "Ingeniero tejano con once doctorados. Construye y mantiene centinelas automáticas defensivas, dispensadores de salud y munición, y teletransportadores para su escuadrón.",
    appearances: tfBoth,
    sources: [tfWiki("Engineer", "Engineer")],
  },
  {
    id: "tf-pyro",
    slug: "pyro",
    name: "Pyro",
    category: "characters",
    details: {
      affiliation: "RED / BLU",
      voiceActor: "Dennis Bateman",
    },
    summary:
      "Pirómano de identidad, origen y género desconocidos oculto tras un traje ignífugo hermético. Vive en una fantasía infantil idílica mientras calcina el campo de batalla con su lanzallamas.",
    appearances: tfBoth,
    sources: [tfWiki("Pyro", "Pyro")],
  },
  {
    id: "tf-demoman",
    slug: "demoman",
    name: "Demoman",
    category: "characters",
    details: {
      affiliation: "RED / BLU",
      voiceActor: "Gary Schwartz",
    },
    summary:
      "Experto en demoliciones tuerto de Escocia. Emplea lanzagranadas y bombas lapa adhesivas para tender trampas explosivas y negar el paso por puntos de estrangulamiento.",
    appearances: tfBoth,
    sources: [tfWiki("Demoman", "Demoman")],
  },
  {
    id: "tf-sniper",
    slug: "sniper",
    name: "Sniper",
    category: "characters",
    details: {
      affiliation: "RED / BLU",
      voiceActor: "John Patrick Lowrie",
    },
    summary:
      "Tirador de precisión nacido en el continente sumergido de Nueva Zelanda y criado en el interior de Australia. Elimina objetivos cruciales a larga distancia con su fusil con mira telescópica.",
    appearances: tfBoth,
    sources: [tfWiki("Sniper", "Sniper")],
  },
];

export const teamFortressWeapons: Entry[] = [
  {
    id: "tf-minigun",
    slug: "minigun-sasha",
    name: "Ametralladora rotatoria «Sasha»",
    category: "weapons",
    details: { slot: 1, ammo: "Balas pesadas", maxAmmo: 200 },
    summary:
      "Arma primaria reglamentaria del Heavy. Dispara ráfagas masivas de cartuchos pesados a corta y media distancia, requiriendo un breve tiempo de giro previo antes de abrir fuego.",
    notes: [
      "Según el cortometraje «Meet the Heavy», pesa ciento cincuenta kilogramos y cuesta cuatrocientos mil dólares dispararla durante doce segundos.",
    ],
    appearances: tfBoth,
    sources: [tfWiki("Minigun", "Minigun")],
  },
  {
    id: "tf-rocket-launcher",
    slug: "lanzacohetes-soldier",
    name: "Lanzacohetes de infantería",
    category: "weapons",
    details: { slot: 1, ammo: "Cohetes", maxAmmo: 20 },
    summary:
      "Arma primaria del Soldier con cargador para cuatro proyectiles explosivos. Permite realizar el «rocket jump» detonando el proyectil a los pies del personaje.",
    appearances: tfBoth,
    sources: [tfWiki("Rocket_Launcher", "Rocket Launcher")],
  },
  {
    id: "tf-wrench",
    slug: "llave-inglesa-engineer",
    name: "Llave inglesa de construcción",
    category: "weapons",
    details: { slot: 3 },
    summary:
      "Herramienta multiusos del Engineer para reparar, recargar de munición y acelerar la velocidad de montaje y mejora de las construcciones defensivas.",
    appearances: tfBoth,
    sources: [tfWiki("Wrench", "Wrench")],
  },
  {
    id: "tf-invis-watch",
    slug: "reloj-de-invisibilidad",
    name: "Reloj de invisibilidad",
    category: "weapons",
    details: { slot: 4 },
    summary:
      "Dispositivo tecnológico avanzado del Spy que proyecta un campo de camuflaje cuántico, volviéndolo completamente invisible a los ojos de los enemigos durante un tiempo limitado.",
    appearances: tf2Only,
    sources: [tfWiki("Invis_Watch", "Invis Watch")],
  },
];

export const teamFortressMaps: Entry[] = [
  {
    id: "tf-map-2fort",
    slug: "mapa-2fort",
    name: "2Fort (Two Forts)",
    category: "maps",
    details: {
      chapter: 1,
      mapFiles: ["2fort", "ctf_2fort"],
    },
    summary:
      "El mapa de captura de bandera más emblemático de la saga. Dos fuertes rurales idénticos de madera separados por un canal de agua y un puente techado central.",
    appearances: tfBoth,
    sources: [tfWiki("2Fort", "2Fort")],
  },
  {
    id: "tf-map-dustbowl",
    slug: "mapa-dustbowl",
    name: "Dustbowl",
    category: "maps",
    details: {
      chapter: 2,
      mapFiles: ["dustbowl", "cp_dustbowl"],
    },
    summary:
      "Mapa desértico de control de puntos por etapas. El equipo atacante BLU debe capturar progresivamente seis puntos fuertemente fortificados por los defensores RED.",
    appearances: tfBoth,
    sources: [tfWiki("Dustbowl", "Dustbowl")],
  },
];

export const teamFortressExtras: Entry[] = [
  {
    id: "tf-meet-the-team",
    slug: "cortometrajes-meet-the-team",
    name: "Cortometrajes «Meet the Team»",
    category: "trivia",
    summary:
      "Serie de nueve cortos de animación cinematográfica producidos por Valve con Source Filmmaker entre 2007 y 2012 para presentar la personalidad y trasfondo de cada clase.",
    appearances: tf2Only,
    sources: [tfWiki("Meet_the_Team", "Meet the Team")],
  },
];
