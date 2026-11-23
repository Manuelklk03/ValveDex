import type { Model } from "./valve-sagas-action";
import { hash } from "./valve-parts";
import type { Actor, Pose, Scene } from "./valve-scenes";

// Left 4 Dead: los cuatro supervivientes espalda con espalda en el centro, disparando a una horda que llega por todos lados con
// infectados especiales entre la multitud. Primero los de la primera parte (con sus especiales) y después los de la segunda
// (con los suyos): los especiales de una no salen cuando están los de la otra

const DIR = "/models/scenes/l4d";
const FRONT = -Math.PI / 2; // los modelos de Source miran hacia +x: se giran para que miren hacia +z
const m = (name: string, size: number, extra: Partial<Model> = {}): Model => ({
  url: `${DIR}/${name}.glb`,
  size,
  yaw: FRONT,
  ...extra,
});
const gun = (name: string, size = 0.27): Model => ({
  url: `${DIR}/${name}.glb`,
  size,
  max: true,
  yaw: FRONT,
});

type Rush = {
  model: Model;
  cycle: number;
  phase: number;
  // Fracción del recorrido en la que muere (varía en cada pasada)
  kill: number;
  r0: number;
  r1: number;
  seed: number;
  lean?: number;
  // Altura del salto (el Hunter y el Jockey saltan sobre la multitud)
  jump?: number;
  scale?: number;
  // false: este modelo no tiene clip de caída
  fall?: boolean;
};

// Un infectado: sale del borde en una dirección al azar, corre hacia el centro y cae muerto antes de llegar; al rato vuelve
function rusher(c: Rush): Actor {
  return {
    model: c.model,
    fn: (u): Pose => {
      const q = u / c.cycle + c.phase;
      const k = Math.floor(q);
      const p = q - k;
      const kill = Math.min(
        0.94,
        c.kill * (0.8 + 0.4 * hash(c.seed + k * 3.1)),
      );
      const alive = p < kill;
      const ang =
        hash(c.seed * 13.7 + k * 7.1) * Math.PI * 2 +
        Math.sin(u * 2 + c.seed) * 0.03;
      const r = c.r0 + (c.r1 - c.r0) * p;
      const x = Math.sin(ang) * r;
      const z = Math.cos(ang) * r;
      const arc = c.jump
        ? Math.sin(Math.min(p / kill, 1) * Math.PI) * c.jump
        : 0;
      // Aparece con un pequeño salto de escala y, una vez caído, se desvanece enseguida para no apilar cuerpos
      const scale =
        Math.min(1, p / 0.05) * (alive ? 1 : Math.max(0, 1 - (p - kill) / 0.2));
      return {
        x,
        z,
        yaw: Math.atan2(-x, -z),
        y: arc,
        // Corre con su ciclo (vueltas enteras) y, al morir, hace su caída de una sola vez
        clip: alive ? "run" : c.fall === false ? "run" : "fall",
        phase: alive
          ? u * 0.95 + c.seed * 0.37
          : Math.min(1, (p - kill) / 0.12),
        scale: scale * (c.scale ?? 1),
        // Sin clip de caída (algunos especiales) se vuelca el cuerpo entero
        fall: !alive && c.fall === false ? Math.min(1, (p - kill) / 0.07) : 0,
      };
    },
  };
}

const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

// Un superviviente: en el centro, mirando hacia fuera según su cuadrante, y dispara al infectado vivo más cercano de ese cuadrante
function survivor(
  model: Model,
  weapon: Model,
  slot: number,
  horde: Actor[],
  rate: number,
): Actor {
  const face = (slot * Math.PI) / 2 + Math.PI / 4;
  const sx = Math.sin(face) * 0.16;
  const sz = Math.cos(face) * 0.16;
  return {
    model,
    held: { model: weapon, pos: [0.04, 0.28, 0.13] },
    fire: { every: rate, color: "#ffe9a0", speed: 3.2, height: 0.3 },
    fn: (u): Pose => {
      let best: Pose | null = null;
      let near = 9;
      for (const h of horde) {
        const p = h.fn(u);
        if ((p.fall ?? 0) > 0 || (p.scale ?? 1) < 0.5) continue;
        const rad = Math.hypot(p.x, p.z);
        if (
          Math.abs(wrap(Math.atan2(p.x, p.z) - face)) < Math.PI / 4 + 0.2 &&
          rad < near
        ) {
          near = rad;
          best = p;
        }
      }
      return {
        x: sx,
        z: sz,
        yaw: best ? Math.atan2(best.x - sx, best.z - sz) : face,
        clip: "aim",
        phase: 0,
        aim: best ? [best.x, best.z] : null,
      };
    },
  };
}

function build(
  name: string,
  stage: number,
  crew: [string, string][],
  commons: string[],
  specials: Rush[],
): Scene {
  const horde: Actor[] = [
    ...Array.from({ length: 16 }, (_, i) =>
      rusher({
        model: m(commons[i % commons.length], 0.42),
        cycle: 3.8 + hash(i) * 1.8,
        phase: hash(i + 40),
        kill: 0.5 + 0.3 * hash(i + 80),
        r0: 0.98,
        r1: 0.3,
        seed: i + 1,
      }),
    ),
    ...specials.map(rusher),
  ];
  const team = crew.map(([who, weapon], i) =>
    survivor(m(who, 0.48), gun(weapon), i, horde, i % 2 ? 0.22 : 0.3),
  );
  return { name, duration: 22, stage, actors: [...horde, ...team] };
}

export const l4dScenes: Scene[] = [
  build(
    "Left 4 Dead",
    0,
    [
      ["l4d1-bill", "l4d1-w-rifle_m16a2"],
      ["l4d1-zoey", "l4d1-w-smg_uzi"],
      ["l4d1-louis", "l4d1-w-autoshot_m4super"],
      ["l4d1-francis", "l4d1-w-shotgun"],
    ],
    [
      "l4d1-common_male01",
      "l4d1-common_female01",
      "l4d1-common_police_male01",
      "l4d1-common_worker_male01",
    ],
    [
      {
        model: m("l4d1-hunter", 0.35),
        cycle: 7,
        phase: 0.1,
        kill: 0.7,
        r0: 0.98,
        r1: 0.2,
        seed: 101,
        lean: 0.5,
        jump: 0.14,
      },
      {
        model: m("l4d1-smoker", 0.58),
        cycle: 9,
        phase: 0.5,
        kill: 0.75,
        r0: 0.98,
        r1: 0.45,
        seed: 102,
        lean: 0.05,
      },
      {
        model: m("l4d1-boomer", 0.58),
        cycle: 10,
        phase: 0.8,
        kill: 0.7,
        r0: 0.98,
        r1: 0.4,
        seed: 103,
        lean: 0.05,
      },
      {
        model: m("l4d1-hulk", 0.83),
        cycle: 14,
        phase: 0.3,
        kill: 0.9,
        r0: 1.0,
        r1: 0.12,
        seed: 104,
        lean: 0.12,
      },
    ],
  ),
  build(
    "Left 4 Dead 2",
    1,
    [
      ["l4d2-coach", "l4d2-w-shotgun_spas"],
      ["l4d2-ellis", "l4d2-w-rifle_ak47"],
      ["l4d2-nick", "l4d2-w-pistol_a"],
      ["l4d2-rochelle", "l4d2-w-smg_uzi"],
    ],
    [
      // Los infectados comunes de la segunda parte pintan su color con una paleta de degradados que no se puede reproducir:
      // se usan los de la primera, que se leen igual de bien
      "l4d1-common_male01",
      "l4d1-common_female01",
      "l4d1-common_police_male01",
      "l4d1-common_worker_male01",
    ],
    [
      {
        model: m("l4d2-charger", 0.64),
        cycle: 8,
        phase: 0.1,
        kill: 0.8,
        r0: 0.98,
        r1: 0.15,
        seed: 201,
        fall: false,
        lean: 0.35,
      },
      {
        model: m("l4d2-jockey", 0.32),
        cycle: 6.5,
        phase: 0.55,
        kill: 0.7,
        r0: 0.98,
        r1: 0.2,
        seed: 202,
        fall: false,
        lean: 0.3,
        jump: 0.1,
      },
      {
        model: m("l4d2-spitter", 0.51),
        cycle: 9,
        phase: 0.8,
        kill: 0.7,
        r0: 0.98,
        r1: 0.45,
        seed: 203,
        fall: false,
        lean: 0.1,
      },
      {
        model: m("l4d2-hunter", 0.35),
        cycle: 7.5,
        phase: 0.3,
        kill: 0.7,
        r0: 0.98,
        r1: 0.2,
        seed: 204,
        fall: false,
        lean: 0.5,
        jump: 0.14,
      },
      {
        model: m("l4d2-hulk", 0.83),
        cycle: 15,
        phase: 0.6,
        kill: 0.9,
        r0: 1.0,
        r1: 0.12,
        seed: 205,
        lean: 0.12,
      },
    ],
  ),
];
