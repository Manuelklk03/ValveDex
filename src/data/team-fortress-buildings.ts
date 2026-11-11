import type { Building } from "@/domain/building";
import type { Source } from "@/domain/source";

function wikiSource(title: string, page: string): Source {
  return {
    title: `${title} - Official TF2 Wiki`,
    url: `https://wiki.teamfortress.com/wiki/${page}`,
    kind: "wiki",
  };
}

const gatlingDamage = "16 base (de 8,45 a 19,49 según la distancia)";

// Cifras de la Official TF2 Wiki en su versión actual: pueden cambiar con los parches.
// En TF2 el coste de cada nivel es el acumulado desde la construcción.
export const engineerBuildings: Building[] = [
  {
    id: "tf2-building-sentry-gun",
    name: "Sentry Gun",
    summary:
      "Torreta automática que dispara al enemigo más cercano dentro de su alcance y su línea de visión. Es inmune a los golpes críticos.",
    gameId: "team-fortress-2",
    levels: [
      {
        level: 1,
        stats: [
          { label: "Salud", value: "150 de salud" },
          { label: "Coste acumulado", value: "130 de metal" },
          { label: "Armamento", value: "Ametralladora de un cañón" },
          { label: "Daño por bala", value: gatlingDamage },
          { label: "Cadencia", value: "0,225 s entre disparos" },
          { label: "Munición", value: "150 balas" },
        ],
        note: "Con el escudo del Wrangler, la salud sube a 450 y la cadencia a 0,135 s. Sube de nivel con la llave inglesa: cuesta 200 de metal pasar al nivel 2 y otros 200 al 3. El alcance es el mismo en los tres niveles.",
      },
      {
        level: 2,
        stats: [
          { label: "Salud", value: "180 de salud" },
          { label: "Coste acumulado", value: "330 de metal" },
          { label: "Armamento", value: "Dos ametralladoras Gatling" },
          { label: "Daño por bala", value: gatlingDamage },
          { label: "Cadencia", value: "0,135 s entre disparos" },
          { label: "Munición", value: "200 balas" },
        ],
        note: "Con el escudo del Wrangler, la salud sube a 540 y la cadencia a 0,09 s.",
      },
      {
        level: 3,
        stats: [
          { label: "Salud", value: "216 de salud" },
          { label: "Coste acumulado", value: "530 de metal" },
          {
            label: "Armamento",
            value: "Dos ametralladoras Gatling y salvas de cohetes",
          },
          { label: "Daño por bala", value: gatlingDamage },
          { label: "Cadencia", value: "0,135 s entre disparos" },
          {
            label: "Daño por cohete",
            value: "100 base (de 52,81 a 150 según la distancia)",
          },
          { label: "Cadencia de cohetes", value: "3,06 s entre salvas" },
          { label: "Munición", value: "200 balas y 20 salvas de cohetes" },
        ],
        note: "La distancia del daño de los cohetes se mide desde el Engineer, no desde la torreta. Con el escudo del Wrangler, la salud sube a 648. Recargar cuesta 1 de metal por bala y 2 por cohete.",
      },
    ],
    sources: [wikiSource("Sentry Gun", "Sentry_Gun")],
  },
  {
    id: "tf2-building-mini-sentry",
    name: "Mini-Sentry",
    summary:
      "Versión reducida de la Sentry Gun que construye el Engineer con la Gunslinger. Es siempre de nivel 1 y no se puede mejorar.",
    gameId: "team-fortress-2",
    levels: [
      {
        level: 1,
        stats: [
          { label: "Salud", value: "100 de salud" },
          { label: "Coste", value: "100 de metal" },
          { label: "Armamento", value: "Ametralladora de un cañón" },
          {
            label: "Daño por bala",
            value: "8 base (de 4,22 a 9,74 según la distancia)",
          },
          { label: "Cadencia", value: "0,18 s entre disparos" },
          { label: "Munición", value: "150 balas" },
        ],
        note: "Empieza a construirse con 50 de salud y no suelta metal al destruirse. Con el escudo del Wrangler, la salud sube a 300 y la cadencia a 0,09 s. En Mann vs. Machine existe además una versión desechable.",
      },
    ],
    sources: [wikiSource("Sentry Gun (Mini-Sentry)", "Sentry_Gun")],
  },
  {
    id: "tf2-building-dispenser",
    name: "Dispenser",
    summary:
      "Dispensador que cura y da munición a los aliados cercanos y genera metal para los Engineers.",
    gameId: "team-fortress-2",
    levels: [
      {
        level: 1,
        stats: [
          { label: "Salud", value: "150 de salud" },
          { label: "Coste acumulado", value: "100 de metal" },
          { label: "Curación", value: "10 de salud por segundo" },
          { label: "Munición", value: "20 % por segundo" },
          { label: "Metal", value: "40 de metal cada 5 segundos" },
        ],
        note: "Empieza con 25 de metal y almacena hasta 400. Sube de nivel con la llave inglesa: cuesta 200 de metal pasar al nivel 2 y otros 200 al 3.",
      },
      {
        level: 2,
        stats: [
          { label: "Salud", value: "180 de salud" },
          { label: "Coste acumulado", value: "300 de metal" },
          { label: "Curación", value: "15 de salud por segundo" },
          { label: "Munición", value: "30 % por segundo" },
          { label: "Metal", value: "50 de metal cada 5 segundos" },
        ],
      },
      {
        level: 3,
        stats: [
          { label: "Salud", value: "216 de salud" },
          { label: "Coste acumulado", value: "500 de metal" },
          { label: "Curación", value: "20 de salud por segundo" },
          { label: "Munición", value: "40 % por segundo" },
          { label: "Metal", value: "60 de metal cada 5 segundos" },
        ],
        note: "Al destruirse, cualquier nivel deja 50 de metal que recoge cualquier jugador.",
      },
    ],
    sources: [wikiSource("Dispenser", "Dispenser")],
  },
  {
    id: "tf2-building-teleporter",
    name: "Teletransportador",
    summary:
      "Pareja de edificios, una entrada y una salida, que lleva a los aliados desde el punto de reaparición hasta el frente. Solo funciona si los dos extremos están construidos.",
    gameId: "team-fortress-2",
    levels: [
      {
        level: 1,
        stats: [
          { label: "Salud", value: "150 de salud" },
          { label: "Coste acumulado", value: "50 de metal por extremo" },
          { label: "Recarga", value: "10 segundos" },
        ],
        note: "Con la Eureka Effect cuesta 25 de metal. Mejorar un extremo mejora el otro: 200 de metal por nivel (100 con la Eureka Effect). Si se destruye un extremo, el otro vuelve al nivel 1.",
      },
      {
        level: 2,
        stats: [
          { label: "Salud", value: "180 de salud" },
          { label: "Coste acumulado", value: "250 de metal" },
          { label: "Recarga", value: "5 segundos" },
        ],
      },
      {
        level: 3,
        stats: [
          { label: "Salud", value: "216 de salud" },
          { label: "Coste acumulado", value: "450 de metal" },
          { label: "Recarga", value: "3 segundos" },
        ],
        note: "Al destruirse, la pareja deja 50 de metal (25 por extremo).",
      },
    ],
    sources: [wikiSource("Teleporters", "Teleporters")],
  },
  {
    id: "tfc-building-sentry-gun",
    name: "Sentry Gun",
    summary:
      "Torreta automática del Engineer de Team Fortress Classic. Barre un arco de 90 grados y solo dispara en la dirección en que apunta; el Engineer puede girarla.",
    gameId: "team-fortress-classic",
    levels: [
      {
        level: 1,
        stats: [
          { label: "Coste", value: "130 de metal" },
          { label: "Armamento", value: "Arma de un cañón" },
        ],
        note: "Tarda unos 5 segundos en montarse y el Engineer no puede alejarse mientras tanto. Cada mejora cuesta 130 de metal y se hace con la llave inglesa.",
      },
      {
        level: 2,
        stats: [
          { label: "Coste de la mejora", value: "130 de metal" },
          { label: "Armamento", value: "Minigun en el morro" },
        ],
      },
      {
        level: 3,
        stats: [
          { label: "Coste de la mejora", value: "130 de metal" },
          { label: "Armamento", value: "Dos miniguns y un lanzacohetes" },
        ],
        note: "Es muy vulnerable al fuego de la pistola de clavos y la súper pistola de clavos y a las granadas MIRV.",
      },
    ],
    sources: [wikiSource("Sentry Gun (Classic)", "Sentry_Gun_(Classic)")],
  },
  {
    id: "tfc-building-dispenser",
    name: "Dispenser",
    summary:
      "Dispensador que repone la munición y la armadura de los aliados que se acercan. Un jugador enemigo también puede usarlo, y el Engineer recibe un aviso.",
    gameId: "team-fortress-classic",
    levels: [
      {
        level: 1,
        stats: [
          { label: "Salud", value: "150 de salud" },
          { label: "Coste", value: "100 de metal" },
          { label: "Montaje", value: "2 segundos" },
          {
            label: "Capacidad",
            value:
              "400 cartuchos, 600 clavos, 300 cohetes, 400 celdas y 500 puntos de armadura",
          },
        ],
        note: "No tiene niveles. Al destruirse explota y el daño depende de la munición almacenada.",
      },
    ],
    sources: [wikiSource("Dispenser (Classic)", "Dispenser_(Classic)")],
  },
  {
    id: "tfc-building-teleporter",
    name: "Teletransportador",
    summary:
      "Pareja de edificios, entrada y salida, para llevar a los compañeros al frente o a zonas apartadas. No funciona si falta uno de los dos extremos.",
    gameId: "team-fortress-classic",
    levels: [
      {
        level: 1,
        stats: [
          { label: "Coste", value: "125 de metal" },
          { label: "Recarga", value: "unos 10 segundos" },
        ],
        note: "No se puede mejorar. Se añadió en el parche de Classic del 16 de enero de 2003.",
      },
    ],
    sources: [wikiSource("Teleporter (Classic)", "Teleporter_(Classic)")],
  },
];
