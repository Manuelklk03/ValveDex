"use client";

import { createPortal, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { hash } from "./valve-parts";

// Acción en miniatura de cada territorio de la mesa-mapa, con los modelos 3D reales del proyecto: el Hunter y los Zombine
// contra snarks en Half-Life, la torreta de Portal persiguiendo al cubo con su láser, dos Heavy RED y BLU a tiros en Team
// Fortress, los Jockeys contra la Witch junto a una bomba de tubo en Left 4 Dead y un duelo de AK-47 y AWP con granadas en
// Counter-Strike. Todo se anima en useFrame; con movimiento reducido las piezas se quedan quietas

export type Model = {
  url: string;
  // Tamaño final en unidades del territorio (el modelo se normaliza)
  size: number;
  // Los personajes de Source vienen tumbados (π/2 los pone de pie)
  roll?: number;
  tilt?: number;
  // Giro extra para que el frente del modelo mire a donde toca
  yaw?: number;
  // Cambio de tono de la textura en grados (el Heavy BLU sale del RED)
  hue?: number;
  // No intenta ponerlo de pie solo (criaturas agachadas como el Hunter)
  keep?: boolean;
  // Arma que lleva en la mano (glb en las unidades del juego): se coloca con las matrices que el conversor guardó en cada clip
  weapon?: string;
  // Normaliza por la dimensión mayor (armas) en vez de por la altura (personajes)
  max?: boolean;
};
type Motion = "strafe" | "still" | "rush" | "hop" | "float" | "lob" | "travel";
type Shot = {
  color: string;
  speed: number;
  size: number;
  arc: number;
  blast: number;
  every: number;
};
type Actor = {
  team: 0 | 1;
  model: Model;
  motion: Motion;
  home: [number, number];
  // Altura sobre el suelo de las piezas que flotan
  y?: number;
  phase: number;
  shot?: Shot;
  // Destino de una granada o línea del láser
  to?: [number, number];
  period?: number;
  // Color y tamaño del destello al deshacerse o caer
  glow?: string;
  blast?: number;
  // Esta pieza dibuja un láser hasta la pieza `target`
  laser?: { color: string; target: number };
  // Arma que lleva en la mano, colocada respecto al personaje (su frente es +z)
  held?: {
    model: Model;
    pos: [number, number, number];
    rot?: [number, number, number];
  };
};

const BULLETS = 18;
const FLASHES = 26;

const F = {
  heavy: {
    url: "/models/universes/tf2-heavy.glb",
    size: 0.62,
    roll: Math.PI / 2,
  },
  hunter: { url: "/models/universes/ep2-hunter.glb", size: 0.6 },
  zombine: { url: "/models/universes/ep1-zombine.glb", size: 0.52 },
  snark: {
    url: "/models/entries/snark-half-life-hd.glb",
    size: 0.14,
    max: true,
  },
  gravity: {
    url: "/models/universes/hl2-gravity-gun.glb",
    size: 0.32,
    tilt: 0.5,
    max: true,
  },
  turret: { url: "/models/universes/portal2-turret.glb", size: 0.5 },
  cube: {
    url: "/models/entries/portal-weapon-weighted-companion-cube-portal.glb",
    size: 0.2,
    max: true,
  },
  portalGun: {
    url: "/models/universes/portal-gun.glb",
    size: 0.34,
    tilt: -Math.PI / 2,
    max: true,
  },
  witch: { url: "/models/universes/l4d-witch.glb", size: 0.5 },
  jockey: { url: "/models/universes/l4d2-jockey.glb", size: 0.36 },
  pipe: {
    url: "/models/entries/l4d-pipe-bomb-left-4-dead.glb",
    size: 0.16,
    max: true,
  },
  shotgun: {
    url: "/models/entries/l4d-auto-shotgun-left-4-dead.glb",
    size: 0.36,
    max: true,
  },
  pan: {
    url: "/models/entries/l4d-frying-pan-left-4-dead-2.glb",
    size: 0.26,
    max: true,
  },
  ak: {
    url: "/models/entries/cs-weapon-ak47-counter-strike-source.glb",
    size: 0.5,
    max: true,
  },
  awp: {
    url: "/models/entries/cs-weapon-awp-counter-strike-source.glb",
    size: 0.6,
    max: true,
  },
  he: {
    url: "/models/entries/cs-weapon-he-grenade-counter-strike-source.glb",
    size: 0.12,
    max: true,
  },
  flash: {
    url: "/models/entries/cs-weapon-flashbang-counter-strike-source.glb",
    size: 0.12,
    max: true,
  },
  smoke: {
    url: "/models/entries/cs-weapon-smoke-grenade-counter-strike-source.glb",
    size: 0.12,
    max: true,
  },
  rocket: {
    url: "/models/entries/tf-rocket-launcher-team-fortress-2.glb",
    size: 0.36,
    max: true,
  },
} satisfies Record<string, Model>;

const HELD = {
  minigun: {
    model: {
      url: "/models/entries/tf-minigun-team-fortress-2.glb",
      size: 0.4,
      max: true,
      yaw: Math.PI / 2,
    },
    pos: [0.02, 0.27, 0.16] as [number, number, number],
  },
  frag: {
    model: {
      url: "/models/entries/hl2-frag-grenade-half-life-2.glb",
      size: 0.1,
      max: true,
    },
    pos: [0.1, 0.26, 0.12] as [number, number, number],
  },
};

const TRACER: Shot = {
  color: "#ffe9a0",
  speed: 3,
  size: 0.02,
  arc: 0,
  blast: 0.05,
  every: 0.45,
};

function config(id: string): Actor[] {
  if (id === "team-fortress") {
    return [
      {
        team: 0,
        model: F.heavy,
        held: HELD.minigun,
        motion: "strafe",
        home: [-0.42, 0],
        phase: 0.1,
        shot: { ...TRACER, every: 0.2, speed: 3.5 },
      },
      {
        team: 1,
        model: { ...F.heavy, hue: 215 },
        held: HELD.minigun,
        motion: "strafe",
        home: [0.42, 0],
        phase: 0.6,
        shot: { ...TRACER, every: 0.2, speed: 3.5 },
      },
      {
        team: 0,
        model: F.rocket,
        motion: "float",
        home: [0, 0.05],
        y: 0.42,
        phase: 0.3,
      },
      {
        team: 0,
        model: F.rocket,
        motion: "lob",
        home: [-0.25, 0],
        to: [0.35, 0],
        period: 2.4,
        phase: 0,
        glow: "#ffb14a",
        blast: 0.17,
      },
      {
        team: 1,
        model: F.rocket,
        motion: "lob",
        home: [0.25, 0],
        to: [-0.35, 0],
        period: 2.4,
        phase: 0.5,
        glow: "#ffb14a",
        blast: 0.17,
      },
    ];
  }
  if (id === "counter-strike") {
    return [
      {
        team: 0,
        model: F.ak,
        motion: "strafe",
        home: [-0.42, 0.05],
        y: 0.18,
        phase: 0.1,
        shot: { ...TRACER, every: 0.16 },
      },
      {
        team: 1,
        model: F.awp,
        motion: "strafe",
        home: [0.42, -0.05],
        y: 0.18,
        phase: 0.6,
        shot: {
          color: "#9fe8ff",
          speed: 5,
          size: 0.03,
          arc: 0,
          blast: 0.1,
          every: 1.4,
        },
      },
      {
        team: 0,
        model: F.he,
        motion: "lob",
        home: [-0.3, 0],
        to: [0.4, 0],
        period: 3.3,
        phase: 0,
        glow: "#ffb14a",
        blast: 0.2,
      },
      {
        team: 1,
        model: F.flash,
        motion: "lob",
        home: [0.3, 0],
        to: [-0.4, 0],
        period: 3.3,
        phase: 0.33,
        glow: "#ffffff",
        blast: 0.26,
      },
      {
        team: 0,
        model: F.smoke,
        motion: "lob",
        home: [-0.3, 0.1],
        to: [0.1, 0.1],
        period: 3.3,
        phase: 0.66,
        glow: "#aab4c0",
        blast: 0.3,
      },
    ];
  }
  if (id === "left-4-dead") {
    const jockeys: Actor[] = [0.05, 0.3, 0.55, 0.8].map((phase) => ({
      team: 1 as const,
      model: F.jockey,
      motion: "rush" as const,
      home: [0.4, 0] as [number, number],
      phase,
      glow: "#b3261a",
      blast: 0.1,
    }));
    return [
      { team: 0, model: F.witch, motion: "still", home: [-0.3, 0], phase: 0.2 },
      ...jockeys,
      {
        team: 0,
        model: F.pipe,
        motion: "lob",
        home: [0.05, 0.25],
        to: [0.45, -0.05],
        period: 3.6,
        phase: 0,
        glow: "#ffb14a",
        blast: 0.3,
      },
      {
        team: 0,
        model: F.shotgun,
        motion: "float",
        home: [-0.55, 0.3],
        y: 0.35,
        phase: 0.4,
      },
      {
        team: 0,
        model: F.pan,
        motion: "float",
        home: [0.55, 0.32],
        y: 0.32,
        phase: 0.8,
      },
    ];
  }
  if (id === "portal") {
    return [
      {
        team: 0,
        model: F.turret,
        motion: "still",
        home: [0.38, -0.12],
        phase: 0.2,
        laser: { color: "#ff3a2a", target: 1 },
      },
      {
        team: 1,
        model: F.cube,
        motion: "travel",
        home: [0, 0.12],
        y: 0.12,
        phase: 0,
      },
      {
        team: 0,
        model: F.portalGun,
        motion: "float",
        home: [-0.1, 0.1],
        y: 0.5,
        phase: 0.5,
      },
    ];
  }
  // Half-Life: el Hunter dispara flechettes contra los Zombine y los snarks
  return [
    {
      team: 0,
      model: F.hunter,
      motion: "strafe",
      home: [-0.4, 0],
      phase: 0.1,
      shot: {
        color: "#7fe8ff",
        speed: 2.6,
        size: 0.026,
        arc: 0,
        blast: 0.08,
        every: 0.5,
      },
    },
    ...[0.1, 0.55].map<Actor>((phase) => ({
      team: 1,
      model: F.zombine,
      held: HELD.frag,
      motion: "rush",
      home: [0.4, 0],
      phase,
      glow: "#7fe8ff",
      blast: 0.12,
    })),
    ...[0.2, 0.45, 0.7, 0.9].map<Actor>((phase) => ({
      team: 1,
      model: F.snark,
      motion: "hop",
      home: [0.4, 0],
      phase,
      glow: "#ffcf6a",
      blast: 0.06,
    })),
    {
      team: 0,
      model: F.gravity,
      motion: "float",
      home: [-0.05, 0.28],
      y: 0.45,
      phase: 0.7,
    },
  ];
}

// Un modelo normalizado a su tamaño, con los pies sobre el suelo y centrado
// El arma en la mano: vive dentro del modelo del personaje (en sus unidades) y el motor de escenas le pone cada fotograma la
// matriz de su mano; hasta entonces queda oculta
function HeldWeapon({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const copy = useMemo(() => scene.clone(true), [scene]);
  return (
    <group name="__held" matrixAutoUpdate={false} visible={false}>
      <primitive object={copy} />
    </group>
  );
}

export function Mini({ model }: { model: Model }) {
  const { scene } = useGLTF(model.url);
  const { object, scale, root } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const material = (child.material as THREE.MeshStandardMaterial).clone();
      if (model.hue && material.map) {
        const image = material.map.image as CanvasImageSource | undefined;
        const w = (image as { width?: number } | undefined)?.width ?? 0;
        const h = (image as { height?: number } | undefined)?.height ?? 0;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const g = canvas.getContext("2d");
        if (g && image && w && h && "filter" in g) {
          g.filter = `hue-rotate(${model.hue}deg)`;
          g.drawImage(image, 0, 0);
          const shifted = new THREE.CanvasTexture(canvas);
          shifted.flipY = material.map.flipY;
          shifted.colorSpace = material.map.colorSpace;
          material.map = shifted;
        }
      }
      child.material = material;
    });
    const wrapper = new THREE.Group();
    const inner = new THREE.Group();
    inner.rotation.set(model.roll ?? 0, 0, model.tilt ?? 0);
    inner.add(clone);
    wrapper.add(inner);
    wrapper.updateMatrixWorld(true);
    let box = new THREE.Box3().setFromObject(wrapper);
    let size = box.getSize(new THREE.Vector3());
    // Un personaje que sigue tumbado (su eje largo no es el vertical) se pone de pie solo
    if (!model.max && !model.keep && size.y < Math.max(size.x, size.z) * 0.8) {
      if (size.z >= size.x) inner.rotation.x = (model.roll ?? 0) + Math.PI / 2;
      else inner.rotation.z = (model.tilt ?? 0) + Math.PI / 2;
      wrapper.updateMatrixWorld(true);
      box = new THREE.Box3().setFromObject(wrapper);
      size = box.getSize(new THREE.Vector3());
    }
    const center = box.getCenter(new THREE.Vector3());
    inner.position.set(
      -center.x,
      model.max ? -center.y : -box.min.y,
      -center.z,
    );
    const base = model.max ? Math.max(size.x, size.y, size.z) : size.y;
    return { object: wrapper, scale: model.size / (base || 1), root: clone };
  }, [scene, model]);

  useEffect(
    () => () => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const m = child.material as THREE.MeshStandardMaterial;
          if (model.hue) m.map?.dispose();
          m.dispose();
        }
      });
    },
    [object, model.hue],
  );

  return (
    <group scale={scale} rotation={[0, model.yaw ?? 0, 0]}>
      <primitive object={object} />
      {model.weapon && createPortal(<HeldWeapon url={model.weapon} />, root)}
    </group>
  );
}

function Skirmish({ id, reduced }: { id: string; reduced: boolean }) {
  const actors = useMemo(() => config(id), [id]);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const bullets = useRef<(THREE.Mesh | null)[]>([]);
  const flashes = useRef<(THREE.Mesh | null)[]>([]);
  const laser = useRef<THREE.Mesh>(null);
  const sim = useMemo(
    () => ({
      b: Array.from({ length: BULLETS }, () => ({
        t0: -1,
        dur: 1,
        arc: 0,
        blast: 0.05,
        color: "#fff",
        from: new THREE.Vector3(),
        to: new THREE.Vector3(),
      })),
      f: Array.from({ length: FLASHES }, () => ({
        t0: -9,
        size: 0.1,
        color: "#fff",
        pos: new THREE.Vector3(),
      })),
      next: [] as number[],
      kick: [] as number[],
      done: [] as boolean[],
      counter: 0,
      flashIndex: 0,
    }),
    [],
  );
  const info = useMemo(() => {
    const targetable = (a: Actor) =>
      a.motion !== "float" && a.motion !== "lob" && a.motion !== "travel";
    const idx = (team: 0 | 1) =>
      actors.flatMap((a, i) => (a.team === team && targetable(a) ? [i] : []));
    const mine = idx(0);
    const cx =
      mine.reduce((s, i) => s + actors[i].home[0], 0) / (mine.length || 1);
    const cz =
      mine.reduce((s, i) => s + actors[i].home[1], 0) / (mine.length || 1);
    return { foes: [idx(1), idx(0)], center: [cx, cz] };
  }, [actors]);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    const flash = (pos: THREE.Vector3, size: number, color: string) => {
      const slot = sim.f[sim.flashIndex % FLASHES];
      sim.flashIndex += 1;
      slot.t0 = t;
      slot.size = size;
      slot.color = color;
      slot.pos.copy(pos);
    };

    actors.forEach((a, i) => {
      const g = refs.current[i];
      if (!g) return;
      const dir = a.team === 0 ? 1 : -1;
      const base = dir * (Math.PI / 2);
      const bob = Math.abs(Math.sin(t * 6 + a.phase * 9)) * 0.01;
      if (a.motion === "rush" || a.motion === "hop") {
        // Sale del borde derecho, corre hacia el otro bando y se deshace a poco de llegar
        const p = (t * 0.2 + a.phase) % 1;
        const ang = (a.phase * 2 - 1) * 1.1;
        const sx = Math.cos(ang) * 0.8;
        const sz = Math.sin(ang) * 0.5;
        const ex = sx + (info.center[0] - sx) * 0.86;
        const ez = sz + (info.center[1] - sz) * 0.86;
        const hop =
          a.motion === "hop"
            ? Math.abs(Math.sin(t * 10 + a.phase * 20)) * 0.07
            : bob * 2;
        g.position.set(sx + (ex - sx) * p, hop, sz + (ez - sz) * p);
        g.rotation.y = Math.atan2(info.center[0] - sx, info.center[1] - sz);
        const die = Math.max(0, (p - 0.9) / 0.1);
        g.scale.setScalar(Math.max(0.001, 1 - die));
        if (die > 0 && !sim.done[i]) {
          sim.done[i] = true;
          flash(g.position, a.blast ?? 0.1, a.glow ?? "#fff");
        }
        if (p < 0.5) sim.done[i] = false;
        return;
      }
      if (a.motion === "float") {
        g.position.set(
          a.home[0],
          (a.y ?? 0.4) + Math.sin(t * 1.6 + a.phase * 6) * 0.04,
          a.home[1],
        );
        g.rotation.y = t * 0.8 + a.phase * 6;
        return;
      }
      if (a.motion === "lob" && a.to) {
        // Una pieza lanzada en arco de un lado al otro; al caer, destello
        const period = a.period ?? 3;
        const p = (t / period + a.phase) % 1;
        const arc = Math.sin(p * Math.PI) * 0.4;
        g.position.set(
          a.home[0] + (a.to[0] - a.home[0]) * p,
          0.12 + arc,
          a.home[1] + (a.to[1] - a.home[1]) * p,
        );
        g.rotation.set(p * 14, p * 9, 0);
        g.visible = p < 0.97;
        if (p > 0.96 && !sim.done[i]) {
          sim.done[i] = true;
          flash(
            new THREE.Vector3(a.to[0], 0.12, a.to[1]),
            a.blast ?? 0.15,
            a.glow ?? "#fff",
          );
        }
        if (p < 0.5) sim.done[i] = false;
        return;
      }
      if (a.motion === "travel") {
        // El cubo cruza de un portal al otro, encogiéndose al entrar y reapareciendo por el otro
        const p = (t * 0.25) % 1;
        const edge = Math.min(p, 1 - p) / 0.08;
        g.position.set(
          -0.55 + p * 1.1,
          (a.y ?? 0.1) + Math.abs(Math.sin(p * 18)) * 0.05,
          a.home[1] + Math.sin(p * Math.PI * 2) * 0.06,
        );
        g.rotation.set(0, p * 10, 0);
        g.scale.setScalar(Math.min(1, edge));
        return;
      }
      if (a.motion === "strafe") {
        g.position.set(
          a.home[0] + dir * Math.sin(t * 0.7 + a.phase * 6) * 0.1,
          (a.y ?? 0) + bob,
          a.home[1] + Math.sin(t * 1.3 + a.phase * 6) * 0.06,
        );
        g.rotation.y = base + Math.sin(t + a.phase) * 0.2;
      } else {
        g.position.set(a.home[0], (a.y ?? 0) + bob * 0.4, a.home[1]);
        g.rotation.y = base + Math.sin(t * 0.8 + a.phase * 5) * 0.3;
        // La torreta gira siguiendo a su blanco
        if (a.laser) {
          const to = refs.current[a.laser.target];
          if (to)
            g.rotation.y = Math.atan2(
              to.position.x - g.position.x,
              to.position.z - g.position.z,
            );
        }
      }
      // Balanceo del cuerpo y retroceso al disparar
      g.rotation.z = Math.sin(t * 3 + a.phase * 8) * 0.05;
      const kick = Math.exp(-(t - (sim.kick[i] ?? -9)) * 11) * 0.05;
      g.position.x -= Math.sin(g.rotation.y) * kick;
      g.position.z -= Math.cos(g.rotation.y) * kick;

      if (!a.shot) return;
      if (sim.next[i] === undefined) sim.next[i] = t + a.phase * a.shot.every;
      if (t > sim.next[i]) {
        const slot = sim.b.find((b) => b.t0 < 0);
        const foes = info.foes[a.team];
        const target =
          refs.current[
            foes[Math.floor(hash(sim.counter * 7 + i) * foes.length)]
          ];
        sim.counter += 1;
        sim.next[i] = t + a.shot.every * (0.7 + hash(sim.counter) * 0.6);
        if (slot && target) {
          slot.from.set(
            g.position.x + Math.sin(g.rotation.y) * 0.16,
            (a.y ?? 0.22) + 0.14,
            g.position.z + Math.cos(g.rotation.y) * 0.16,
          );
          slot.to.set(target.position.x, 0.2, target.position.z);
          slot.dur = Math.max(
            0.1,
            slot.from.distanceTo(slot.to) / a.shot.speed,
          );
          slot.arc = a.shot.arc;
          slot.blast = a.shot.blast;
          slot.color = a.shot.color;
          slot.t0 = t;
          sim.kick[i] = t;
          flash(slot.from, a.shot.blast * 0.5, a.shot.color);
        }
      }
    });

    // Láser de la torreta hasta su blanco
    const l = laser.current;
    actors.forEach((a, i) => {
      if (!a.laser || !l) return;
      const from = refs.current[i];
      const to = refs.current[a.laser.target];
      if (!from || !to) return;
      const fx = from.position.x;
      const fy = 0.3;
      const fz = from.position.z + 0.04;
      const dx = to.position.x - fx;
      const dy = 0.15 - fy;
      const dz = to.position.z - fz;
      const len = Math.hypot(dx, dy, dz);
      l.position.set(fx + dx / 2, fy + dy / 2, fz + dz / 2);
      l.rotation.set(
        -Math.atan2(dy, Math.hypot(dx, dz)),
        Math.atan2(dx, dz),
        0,
      );
      l.scale.set(1, 1, len);
      (l.material as THREE.MeshBasicMaterial).opacity =
        0.55 + Math.sin(t * 22) * 0.25;
      (l.material as THREE.MeshBasicMaterial).color.set(a.laser.color);
    });

    sim.b.forEach((b, k) => {
      const m = bullets.current[k];
      if (!m) return;
      if (b.t0 < 0) {
        m.visible = false;
        return;
      }
      const p = (t - b.t0) / b.dur;
      if (p >= 1) {
        b.t0 = -1;
        m.visible = false;
        flash(b.to, b.blast, b.color);
        return;
      }
      m.visible = true;
      m.position.lerpVectors(b.from, b.to, p);
      m.position.y += Math.sin(p * Math.PI) * b.arc;
      m.scale.setScalar(b.blast * 12);
      (m.material as THREE.MeshBasicMaterial).color.set(b.color);
    });

    sim.f.forEach((fl, k) => {
      const m = flashes.current[k];
      if (!m) return;
      const p = (t - fl.t0) / 0.3;
      if (p < 0 || p >= 1) {
        m.visible = false;
        return;
      }
      m.visible = true;
      m.position.copy(fl.pos);
      m.position.y = Math.max(m.position.y, 0.12);
      m.scale.setScalar(fl.size * (0.5 + p * 1.6));
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = 1 - p;
      mat.color.set(fl.color);
    });
  });

  const hasLaser = actors.some((a) => a.laser);
  return (
    <group>
      {actors.map((a, i) => (
        <group
          key={i}
          ref={(g) => {
            refs.current[i] = g;
          }}
          position={[a.home[0], a.y ?? 0, a.home[1]]}
        >
          <Mini model={a.model} />
          {a.held && (
            <group position={a.held.pos} rotation={a.held.rot ?? [0, 0, 0]}>
              <Mini model={a.held.model} />
            </group>
          )}
        </group>
      ))}
      {Array.from({ length: BULLETS }, (_, k) => (
        <mesh
          key={`b${k}`}
          ref={(m) => {
            bullets.current[k] = m;
          }}
          visible={false}
        >
          <sphereGeometry args={[0.1, 8, 6]} />
          <meshBasicMaterial color="#ffe9a0" toneMapped={false} />
        </mesh>
      ))}
      {Array.from({ length: FLASHES }, (_, k) => (
        <mesh
          key={`f${k}`}
          ref={(m) => {
            flashes.current[k] = m;
          }}
          visible={false}
        >
          <sphereGeometry args={[1, 10, 8]} />
          <meshBasicMaterial
            color="#ffe9a0"
            transparent
            opacity={1}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
      {hasLaser && (
        <mesh ref={laser}>
          <boxGeometry args={[0.008, 0.008, 1]} />
          <meshBasicMaterial
            color="#ff3a2a"
            transparent
            opacity={0.6}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}

export function Action({ id, reduced }: { id: string; reduced: boolean }) {
  return (
    <Suspense fallback={null}>
      <Skirmish id={id} reduced={reduced} />
    </Suspense>
  );
}
