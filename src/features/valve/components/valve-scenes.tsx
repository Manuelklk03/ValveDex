"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Mini, type Model } from "./valve-sagas-action";
import { l4dScenes } from "./valve-scene-l4d";

// Motor de escenas guionizadas de la mesa-mapa. Una escena es un reparto de modelos 3D y, para cada uno, una función pura que
// dice dónde está y qué hace en el segundo `u` de la escena (correr, apuntar, caer muerto…). El motor coloca cada modelo,
// dispara balas hacia donde apunta quien tiene `aim`, y cuando termina una escena se pasa a la siguiente

export type Pose = {
  x: number;
  z: number;
  // Hacia dónde mira (0 = +z)
  yaw: number;
  y?: number;
  // Inclinación hacia delante (carrera) y vuelco lateral
  pitch?: number;
  roll?: number;
  // 0 de pie, 1 tumbado
  fall?: number;
  scale?: number;
  // Si apunta a algo, dispara hacia allí
  aim?: [number, number] | null;
};
export type Actor = {
  model: Model;
  held?: { model: Model; pos: [number, number, number] };
  fn: (u: number) => Pose;
  fire?: { every: number; color: string; speed: number; height: number };
};
export type Scene = {
  name: string;
  duration: number;
  // Mapa del escenario sobre el que ocurre
  stage: number;
  actors: Actor[];
};

export const SCENES: Record<string, Scene[]> = {
  "left-4-dead": l4dScenes,
};

const BULLETS = 20;
const FLASHES = 28;

function resetSim(sim: {
  next: number[];
  kick: number[];
  b: { t0: number }[];
}) {
  sim.next.length = 0;
  sim.kick.length = 0;
  for (const b of sim.b) b.t0 = -1;
}

export function SceneAction({
  scenes,
  index,
  reduced,
}: {
  scenes: Scene[];
  index: number;
  reduced: boolean;
}) {
  const scene = scenes[index % scenes.length];
  const refs = useRef<(THREE.Group | null)[]>([]);
  const bullets = useRef<(THREE.Mesh | null)[]>([]);
  const flashes = useRef<(THREE.Mesh | null)[]>([]);
  const sim = useMemo(
    () => ({
      next: [] as number[],
      kick: [] as number[],
      b: Array.from({ length: BULLETS }, () => ({
        t0: -1,
        dur: 1,
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
    }),
    [],
  );

  const clock = useRef({ scene: -1, t0: 0, flash: 0 });

  // El siguiente reparto se carga con antelación para que el cambio de escena no parpadee
  useEffect(() => {
    const next = scenes[(index + 1) % scenes.length];
    for (const a of next.actors) {
      useGLTF.preload(a.model.url);
      if (a.held) useGLTF.preload(a.held.model.url);
    }
  }, [scenes, index]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (clock.current.scene !== index) {
      clock.current.scene = index;
      clock.current.t0 = t;
      resetSim(sim);
    }
    // Con movimiento reducido la escena se queda congelada en un instante vistoso
    const u = reduced ? 4 : t - clock.current.t0;
    const flash = (pos: THREE.Vector3, size: number, color: string) => {
      const slot = sim.f[clock.current.flash % FLASHES];
      clock.current.flash += 1;
      slot.t0 = t;
      slot.size = size;
      slot.color = color;
      slot.pos.copy(pos);
    };

    scene.actors.forEach((a, i) => {
      const g = refs.current[i];
      if (!g) return;
      const p = a.fn(u);
      const k = Math.exp(-(t - (sim.kick[i] ?? -9)) * 11) * 0.03;
      g.position.set(
        p.x - Math.sin(p.yaw) * k,
        p.y ?? 0,
        p.z - Math.cos(p.yaw) * k,
      );
      g.rotation.set(
        (p.pitch ?? 0) + (p.fall ?? 0) * (Math.PI / 2),
        p.yaw,
        p.roll ?? 0,
      );
      const s = p.scale ?? 1;
      g.scale.setScalar(Math.max(s, 0.0001));
      g.visible = s > 0.02;

      if (reduced || !a.fire || !p.aim || !g.visible) return;
      if (sim.next[i] === undefined) sim.next[i] = t + (i % 5) * 0.07;
      if (t < sim.next[i]) return;
      sim.next[i] = t + a.fire.every * (0.75 + Math.random() * 0.5);
      const slot = sim.b.find((b) => b.t0 < 0);
      if (!slot) return;
      slot.from.set(
        p.x + Math.sin(p.yaw) * 0.14,
        a.fire.height,
        p.z + Math.cos(p.yaw) * 0.14,
      );
      slot.to.set(p.aim[0], a.fire.height * 0.8, p.aim[1]);
      slot.dur = Math.max(0.06, slot.from.distanceTo(slot.to) / a.fire.speed);
      slot.color = a.fire.color;
      slot.t0 = t;
      sim.kick[i] = t;
      flash(slot.from, 0.025, a.fire.color);
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
        flash(b.to, 0.04, b.color);
        return;
      }
      m.visible = true;
      m.position.lerpVectors(b.from, b.to, p);
      (m.material as THREE.MeshBasicMaterial).color.set(b.color);
    });

    sim.f.forEach((fl, k) => {
      const m = flashes.current[k];
      if (!m) return;
      const p = (t - fl.t0) / 0.18;
      if (p < 0 || p >= 1) {
        m.visible = false;
        return;
      }
      m.visible = true;
      m.position.copy(fl.pos);
      m.scale.setScalar(fl.size * (0.6 + p * 1.4));
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = 1 - p;
      mat.color.set(fl.color);
    });
  });

  return (
    <group>
      <Suspense fallback={null}>
        <group key={index}>
          {scene.actors.map((a, i) => (
            <group
              key={i}
              ref={(g) => {
                refs.current[i] = g;
                if (g) g.rotation.order = "YXZ";
              }}
            >
              <Mini model={a.model} />
              {a.held && (
                <group position={a.held.pos}>
                  <Mini model={a.held.model} />
                </group>
              )}
            </group>
          ))}
        </group>
      </Suspense>
      {Array.from({ length: BULLETS }, (_, k) => (
        <mesh
          key={`b${k}`}
          ref={(m) => {
            bullets.current[k] = m;
          }}
          visible={false}
        >
          <sphereGeometry args={[0.012, 6, 5]} />
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
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial
            color="#ffe9a0"
            transparent
            opacity={1}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
