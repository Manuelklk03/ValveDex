import type { Model } from "./valve-sagas-action";
import type { Actor, Pose, Scene } from "./valve-scenes";

// Counter-Strike: cuatro rondas en Dust. Tres CT contra tres T; un T planta la bomba mientras sus compañeros caen, el último CT
// lo mata, corre a la bomba y la desactiva. Cada ronda usa unos modelos distintos de cada bando (urban, GIGN, SAS y GSG-9 contra
// Phoenix, Leet, Arctic y Guerrilla)

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

type Fighter = {
  model: Model;
  from: XZ;
  to: XZ;
  // Cuándo corre de un punto a otro
  move: [number, number];
  // Ventanas de disparo con su blanco
  shots: { from: number; to: number; at: XZ }[];
  // Cuándo muere (si muere)
  dies?: number;
  rate: number;
  // Se queda en cuclillas con esta animación entre dos instantes (plantar o desactivar la bomba)
  squat?: { from: number; to: number; clip: "plant" | "crouch" };
  // Después de morir o llegar, mantiene esta mirada
  look?: XZ;
  // Cae de espaldas (con la animación de caída hacia atrás) en vez de caer de bruces
  back?: boolean;
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
      const pos = c.retreat
        ? mix(c.to, c.retreat.at, seg(u, c.retreat.from, c.retreat.to))
        : arrived;
      const here = retreating ? pos : arrived;
      const base = {
        x: here[0],
        z: here[1],
        hideHeld: c.dropsAt !== undefined && u >= c.dropsAt,
      };
      const fade = 1 - seg(u, ROUND - 1.6, ROUND - 0.2);
      const scale = fade < 1 ? Math.max(0.001, fade) : 1;
      const heading = face(c.from, c.to);
      const rest = c.look ? face(here, c.look) : heading;
      if (c.dies !== undefined && u >= c.dies) {
        // Cae como un muñeco: pose flácida de la caída, fundida con su postura anterior, y el cuerpo se vuelca
        const t = u - c.dies;
        const topple = Math.sin(seg(t, 0, 0.55) * (Math.PI / 2));
        return {
          ...base,
          yaw: rest,
          clip: c.back ? "die_back" : "die",
          phase: seg(t, 0, 0.9),
          blend: { clip: "aim", phase: 0, weight: 1 - seg(t, 0, 0.2) },
          ...(c.back ? { pitch: -topple * (Math.PI / 2) } : { fall: topple }),
          scale,
        };
      }
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
      if (shot)
        return {
          ...base,
          yaw: face(here, shot.at),
          clip: "shoot",
          phase: (u - shot.from) / c.rate,
          aim: shot.at,
          scale,
        };
      return { ...base, yaw: rest, clip: "aim", phase: 0, scale };
    },
  };
}

// La bomba: aparece al terminar de plantarla, parpadea cada vez más deprisa y se apaga al desactivarla
function bomb(at: XZ, plantedAt: number, defusedAt: number): Actor {
  return {
    model: {
      url: `${DIR}/cs-c4-planted.glb`,
      size: 0.14,
      max: true,
      yaw: FRONT,
    },
    fn: (u): Pose => {
      const fade = 1 - seg(u, ROUND - 1.6, ROUND - 0.2);
      if (u < plantedAt) return { x: at[0], z: at[1], yaw: 0, scale: 0 };
      const pop = Math.min(1, (u - plantedAt) / 0.25);
      const speed = u < defusedAt ? 2 + seg(u, plantedAt, defusedAt) * 9 : 0;
      const beat =
        u < defusedAt && Math.sin(u * speed * Math.PI) > 0.4 ? 1.18 : 1;
      return {
        x: at[0],
        z: at[1],
        yaw: 0.4,
        y: 0,
        scale: Math.max(0.001, pop * beat * fade),
      };
    },
  };
}

function round(
  name: string,
  stage: number,
  ct: string,
  t: string,
  planter: string,
): Scene {
  const site: XZ = [-0.05, 0.5];
  const defuse: XZ = [0.12, 0.42];
  const CT = (n: string) => player(n, "cs-w-m4a1");
  const T = (n: string) => player(n, "cs-w-ak47");
  const planterModel = player(planter, "cs-w-c4");
  // Posiciones donde acaban los que se disparan (para apuntarse unos a otros)
  const t2: XZ = [-0.18, 0.12];
  const t3: XZ = [-0.32, -0.42];
  const ct3Post: XZ = [0.55, -0.72];

  // El último CT: mata a los T (y al que planta) y, solo ya, corre a la bomba y la desactiva
  const lastCt = (): Actor => {
    const combat = fighter({
      model: CT(ct),
      from: [0.82, -0.9],
      to: ct3Post,
      move: [0.4, 2.8],
      shots: [
        { from: 3.0, to: 5.2, at: t2 },
        { from: 6.0, to: 7.95, at: t3 },
        { from: 8.8, to: 10.5, at: site },
      ],
      rate: 0.5,
      look: t3,
    });
    return {
      ...combat,
      fn: (u): Pose => {
        if (u < 11) return combat.fn(u);
        const pos = mix(ct3Post, defuse, seg(u, 11, 14.2));
        const base = { x: pos[0], z: pos[1] };
        const fade = 1 - seg(u, ROUND - 1.6, ROUND - 0.2);
        const scale = fade < 1 ? Math.max(0.001, fade) : 1;
        if (u < 14.2)
          return {
            ...base,
            yaw: face(ct3Post, defuse),
            clip: "run",
            phase: u * 1.7,
            scale,
          };
        const yaw = face(pos, site);
        if (u < 20) return { ...base, yaw, clip: "crouch", phase: 0, scale };
        return { ...base, yaw, clip: "aim", phase: 0, scale };
      },
    };
  };

  const actors: Actor[] = [
    // El T que planta: corre junto al punto de bomba, planta agachado, suelta la C4, se aparta y cae de espaldas lejos de ella
    fighter({
      model: planterModel,
      from: [-0.85, 0.72],
      to: [site[0] - 0.22, site[1]],
      move: [0, 2.2],
      shots: [],
      squat: { from: 2.2, to: 9, clip: "plant" },
      dropsAt: 9,
      retreat: { from: 9.3, to: 10.2, at: [-0.5, 0.62] },
      dies: 10.5,
      back: true,
      rate: 1,
      look: [0.4, 0.2],
    }),
    fighter({
      model: T(t),
      from: [-0.85, 0.3],
      to: t2,
      move: [0.1, 2.4],
      shots: [{ from: 2.6, to: 5.2, at: [0.4, -0.65] }],
      dies: 5.3,
      back: true,
      rate: 0.55,
    }),
    fighter({
      model: T(t),
      from: [-0.88, -0.15],
      to: t3,
      move: [0.4, 2.9],
      shots: [{ from: 3.1, to: 7.9, at: [0.5, -0.2] }],
      dies: 8.0,
      back: true,
      rate: 0.5,
    }),
    fighter({
      model: CT(ct),
      from: [0.88, -0.6],
      to: [0.38, -0.62],
      move: [0.2, 2.3],
      shots: [{ from: 2.5, to: 4.6, at: t2 }],
      dies: 4.7,
      rate: 0.5,
    }),
    fighter({
      model: CT(ct),
      from: [0.92, -0.12],
      to: [0.5, -0.2],
      move: [0.3, 2.5],
      shots: [{ from: 2.9, to: 7.2, at: t3 }],
      dies: 7.4,
      rate: 0.55,
    }),
    lastCt(),
    bomb(site, 9, 20),
  ];

  return { name, duration: ROUND, stage, actors };
}

export const csScenes: Scene[] = [
  round(
    "Counter-Strike: Dust",
    0,
    "cs-ct_urban-rifle",
    "cs-t_phoenix-rifle",
    "cs-t_phoenix-c4",
  ),
  round(
    "Counter-Strike: Dust, segunda ronda",
    1,
    "cs-ct_gign-rifle",
    "cs-t_leet-rifle",
    "cs-t_leet-c4",
  ),
  round(
    "Counter-Strike: Dust, tercera ronda",
    0,
    "cs-ct_sas-rifle",
    "cs-t_arctic-rifle",
    "cs-t_arctic-c4",
  ),
  round(
    "Counter-Strike: Dust, cuarta ronda",
    1,
    "cs-ct_gsg9-rifle",
    "cs-t_guerilla-rifle",
    "cs-t_guerilla-c4",
  ),
];
