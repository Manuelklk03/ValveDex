import type { Model } from "./valve-sagas-action";
import type { Actor, Pose, Scene } from "./valve-scenes";

// Counter-Strike: rondas en Dust con tres CT contra tres T. Un T planta la bomba mientras sus compañeros caen.
// - Desactivada: el último CT mata al que planta, corre a la bomba, la desactiva y gana «CT WINS».
// - Explota: el último CT llega tarde, la bomba estalla, mueren el último CT y el último T y gana «TERRORISTS WIN».
// Cada ronda usa unos modelos distintos de cada bando (urban, GIGN, SAS y GSG-9 contra Phoenix, Leet, Arctic y Guerrilla)

const DIR = "/models/scenes/cs";
const FRONT = -Math.PI / 2; // los modelos de Source miran hacia +x: se giran para que miren hacia +z
const ROUND = 26;

const player = (file: string, weapon: string): Model => ({
  url: `${DIR}/${file}.glb`,
  size: 0.5,
  yaw: FRONT,
  weapon: `${DIR}/${weapon}.glb`,
});

type XZ = [number, number];
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (u: number, a: number, b: number) => clamp((u - a) / (b - a));
const mix = (a: XZ, b: XZ, t: number): XZ => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];
const face = (from: XZ, to: XZ) => Math.atan2(to[0] - from[0], to[1] - from[1]);
const fadeOut = (u: number) => {
  const f = 1 - seg(u, ROUND - 1.6, ROUND - 0.2);
  return f < 1 ? Math.max(0.001, f) : 1;
};

type Aim = XZ | ((u: number) => XZ);
const at = (aim: Aim, u: number): XZ =>
  typeof aim === "function" ? aim(u) : aim;

// Cae como un muñeco: pose flácida de la caída fundida con su postura anterior y el cuerpo volcándose. Si lo empuja una
// explosión, además sale despedido en dirección contraria a ella
function deathPose(
  pos: XZ,
  yaw: number,
  t: number,
  back: boolean,
  scale: number,
  push?: XZ,
): Pose {
  const topple = Math.sin(seg(t, 0, 0.55) * (Math.PI / 2));
  let [x, z] = pos;
  if (push) {
    const dx = x - push[0];
    const dz = z - push[1];
    const len = Math.hypot(dx, dz) || 1;
    const shove = 0.32 * Math.sin(seg(t, 0, 0.5) * (Math.PI / 2));
    x += (dx / len) * shove;
    z += (dz / len) * shove;
  }
  return {
    x,
    z,
    yaw,
    clip: back ? "die_back" : "die",
    phase: seg(t, 0, 0.9),
    blend: { clip: "aim", phase: 0, weight: 1 - seg(t, 0, 0.2) },
    ...(back ? { pitch: -topple * (Math.PI / 2) } : { fall: topple }),
    scale,
  };
}

type Fighter = {
  model: Model;
  from: XZ;
  to: XZ;
  // Cuándo corre de un punto a otro
  move: [number, number];
  // Ventanas de disparo con su blanco (fijo o que se mueve con el tiempo)
  shots: { from: number; to: number; at: Aim }[];
  // Cuándo muere (si muere), si cae de espaldas y de qué explosión sale despedido
  dies?: number;
  back?: boolean;
  push?: XZ;
  rate: number;
  // Se queda en cuclillas con esta animación entre dos instantes (plantar o desactivar la bomba)
  squat?: { from: number; to: number; clip: "plant" | "crouch" };
  // Después de morir o llegar, mantiene esta mirada
  look?: XZ;
  // Después de plantar se aparta de la bomba corriendo hasta este punto
  retreat?: { from: number; to: number; at: XZ };
  // Desde este instante suelta el arma (la C4, una vez plantada)
  dropsAt?: number;
};

function fighter(c: Fighter): Actor {
  return {
    model: c.model,
    fire: { every: c.rate, color: "#ffe2a0", speed: 3.6, height: 0.3 },
    fn: (u): Pose => {
      const arrived = mix(c.from, c.to, seg(u, c.move[0], c.move[1]));
      const retreating = c.retreat && u >= c.retreat.from;
      const here =
        c.retreat && retreating
          ? mix(c.to, c.retreat.at, seg(u, c.retreat.from, c.retreat.to))
          : arrived;
      const base = {
        x: here[0],
        z: here[1],
        hideHeld: c.dropsAt !== undefined && u >= c.dropsAt,
      };
      const scale = fadeOut(u);
      const heading = face(c.from, c.to);
      const rest = c.look ? face(here, c.look) : heading;
      if (c.dies !== undefined && u >= c.dies)
        return {
          ...base,
          ...deathPose(here, rest, u - c.dies, !!c.back, scale, c.push),
        };
      if (retreating && c.retreat && u < c.retreat.to)
        return {
          ...base,
          yaw: face(c.to, c.retreat.at),
          clip: "run",
          phase: u * 1.7,
          scale,
        };
      if (u > c.move[0] && u < c.move[1])
        return { ...base, yaw: heading, clip: "run", phase: u * 1.7, scale };
      if (c.squat && u >= c.squat.from && u < c.squat.to)
        return {
          ...base,
          yaw: rest,
          clip: c.squat.clip,
          phase: (u - c.squat.from) / (c.squat.to - c.squat.from),
          scale,
        };
      const shot = c.shots.find((x) => u >= x.from && u < x.to);
      if (shot) {
        const target = at(shot.at, u);
        return {
          ...base,
          yaw: face(here, target),
          clip: "shoot",
          phase: (u - shot.from) / c.rate,
          aim: target,
          scale,
        };
      }
      return { ...base, yaw: rest, clip: "aim", phase: 0, scale };
    },
  };
}

// La bomba: aparece al terminar de plantarla, parpadea cada vez más deprisa y se apaga al desactivarla (queda quieta) o
// desaparece al estallar
function bomb(
  site: XZ,
  plantedAt: number,
  endsAt: number,
  exploded: boolean,
): Actor {
  return {
    model: {
      url: `${DIR}/cs-c4-planted.glb`,
      size: 0.14,
      max: true,
      yaw: FRONT,
    },
    fn: (u): Pose => {
      const base = { x: site[0], z: site[1], yaw: 0.4 };
      if (u < plantedAt) return { ...base, scale: 0 };
      if (u >= endsAt) return { ...base, scale: exploded ? 0 : fadeOut(u) };
      const pop = Math.min(1, (u - plantedAt) / 0.25);
      const speed = 2 + seg(u, plantedAt, endsAt) * 9;
      const beat = Math.sin(u * speed * Math.PI) > 0.4 ? 1.18 : 1;
      return { ...base, scale: Math.max(0.001, pop * beat * fadeOut(u)) };
    },
  };
}

type Outcome = "defuse" | "explode";

function round(
  name: string,
  stage: number,
  ct: string,
  t: string,
  planter: string,
  outcome: Outcome,
): Scene {
  const site: XZ = [-0.05, 0.5];
  const plantSpot: XZ = [site[0] - 0.22, site[1]];
  const hideout: XZ = [-0.5, 0.62];
  const defuse: XZ = [0.12, 0.42];
  const CT = (n: string) => player(n, "cs-w-m4a1");
  const T = (n: string) => player(n, "cs-w-ak47");
  const planterModel = player(planter, "cs-w-c4");
  // Posiciones donde acaban los que se disparan (para apuntarse unos a otros)
  const t2: XZ = [-0.18, 0.12];
  const t3: XZ = [-0.32, -0.42];
  const ct3Post: XZ = [0.55, -0.72];
  const blastTime = 18;
  const explodes = outcome === "explode";
  // Dónde está el que planta en cada instante (el último CT le dispara a él y no a la bomba)
  const planterAt = (u: number): XZ =>
    u < 9.3 ? plantSpot : mix(plantSpot, hideout, seg(u, 9.3, 10.2));

  // El que planta: corre junto al punto de bomba, planta agachado, suelta la C4 y se aparta. Si la bomba se desactiva, cae de
  // espaldas a los disparos del último CT; si estalla, lo mata la explosión
  const planterActor = fighter({
    model: planterModel,
    from: [-0.85, 0.72],
    to: plantSpot,
    move: [0, 2.2],
    shots: [],
    squat: { from: 2.2, to: 9, clip: "plant" },
    dropsAt: 9,
    retreat: { from: 9.3, to: 10.2, at: hideout },
    dies: explodes ? blastTime : 10.5,
    back: true,
    push: explodes ? site : undefined,
    rate: 1,
    look: explodes ? defuse : [0.4, 0.2],
  });

  // El último CT: mata a los T y, ya solo, corre a la bomba. Si no llega a tiempo (la bomba estalla) muere con ella
  const combat = fighter({
    model: CT(ct),
    from: [0.82, -0.9],
    to: ct3Post,
    move: [0.4, 2.8],
    shots: [
      { from: 3.0, to: 5.2, at: t2 },
      { from: 6.0, to: 7.95, at: t3 },
      ...(explodes ? [] : [{ from: 8.8, to: 10.5, at: planterAt }]),
    ],
    rate: 0.5,
    look: t3,
  });
  const lastCt: Actor = {
    ...combat,
    fn: (u): Pose => {
      if (u < 11) return combat.fn(u);
      const pos = mix(ct3Post, defuse, seg(u, 11, 14.2));
      const base = { x: pos[0], z: pos[1] };
      const scale = fadeOut(u);
      const yaw = face(pos, site);
      if (explodes && u >= blastTime)
        return deathPose(defuse, yaw, u - blastTime, true, scale, site);
      if (u < 14.2)
        return {
          ...base,
          yaw: face(ct3Post, defuse),
          clip: "run",
          phase: u * 1.7,
          scale,
        };
      if (u < (explodes ? blastTime : 20))
        return { ...base, yaw, clip: "crouch", phase: 0, scale };
      return { ...base, yaw, clip: "aim", phase: 0, scale };
    },
  };

  const actors: Actor[] = [
    planterActor,
    fighter({
      model: T(t),
      from: [-0.85, 0.3],
      to: t2,
      move: [0.1, 2.4],
      shots: [{ from: 2.6, to: 5.2, at: [0.4, -0.65] }],
      dies: 5.3,
      rate: 0.55,
    }),
    fighter({
      model: T(t),
      from: [-0.88, -0.15],
      to: t3,
      move: [0.4, 2.9],
      shots: [{ from: 3.1, to: 7.9, at: [0.5, -0.2] }],
      dies: 8.0,
      rate: 0.5,
    }),
    fighter({
      model: CT(ct),
      from: [0.88, -0.6],
      to: [0.38, -0.62],
      move: [0.2, 2.3],
      shots: [{ from: 2.5, to: 4.6, at: t2 }],
      dies: 4.7,
      back: true,
      rate: 0.5,
    }),
    fighter({
      model: CT(ct),
      from: [0.92, -0.12],
      to: [0.5, -0.2],
      move: [0.3, 2.5],
      shots: [{ from: 2.9, to: 7.2, at: t3 }],
      dies: 7.4,
      back: true,
      rate: 0.55,
    }),
    lastCt,
    bomb(site, 9, explodes ? blastTime : 20, explodes),
  ];

  return {
    name,
    duration: ROUND,
    stage,
    actors,
    banner: explodes
      ? {
          text: "TERRORISTS WIN",
          color: "#ff9a3c",
          from: blastTime + 0.9,
          to: ROUND - 0.4,
        }
      : { text: "CT WINS", color: "#6db4ff", from: 20.4, to: ROUND - 0.4 },
    ...(explodes ? { blast: { at: site, time: blastTime } } : {}),
  };
}

// Cuatro parejas de modelos y dos desenlaces cada una: ocho escenas que el mapa mezcla al azar
const SETS: [string, string, string, string][] = [
  [
    "urban contra Phoenix",
    "cs-ct_urban-rifle",
    "cs-t_phoenix-rifle",
    "cs-t_phoenix-c4",
  ],
  ["GIGN contra Leet", "cs-ct_gign-rifle", "cs-t_leet-rifle", "cs-t_leet-c4"],
  [
    "SAS contra Arctic",
    "cs-ct_sas-rifle",
    "cs-t_arctic-rifle",
    "cs-t_arctic-c4",
  ],
  [
    "GSG-9 contra Guerrilla",
    "cs-ct_gsg9-rifle",
    "cs-t_guerilla-rifle",
    "cs-t_guerilla-c4",
  ],
];

export const csScenes: Scene[] = SETS.flatMap(([label, ct, t, planter], i) =>
  (["defuse", "explode"] as const).map((outcome) =>
    round(
      `Counter-Strike: ${label}, ${outcome === "defuse" ? "bomba desactivada" : "bomba explotada"}`,
      i % 2,
      ct,
      t,
      planter,
      outcome,
    ),
  ),
);
