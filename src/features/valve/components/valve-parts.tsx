"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Número pseudoaleatorio estable entre 0 y 1 (sin Math.random: la zona industrial es la misma en cada carga)
export function hash(n: number) {
  const x = Math.sin(n * 91.7) * 43758.5453;
  return x - Math.floor(x);
}

type Vec3 = [number, number, number];

export type Vent = {
  // Punto de salida y dirección hacia la que sube el vapor
  p: Vec3;
  d: Vec3;
  // Bocanadas, tamaño y velocidad (una rotura suelta más, más grande y más deprisa que una brida)
  count?: number;
  size?: number;
  speed?: number;
};

// Vapor: bocanadas que salen de cada punto, suben en su dirección, se ensanchan y se disipan
export function Steam({
  vents,
  glow,
  reduced,
}: {
  vents: Vent[];
  glow: THREE.Texture;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const puffs = useMemo(
    () =>
      vents.flatMap((vent, vi) => {
        const count = vent.count ?? 4;
        return Array.from({ length: count }, (_, k) => ({
          vent,
          phase: k / count,
          seed: vi * 13 + k,
        }));
      }),
    [vents],
  );

  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    group.current?.children.forEach((child, i) => {
      const puff = child as THREE.Sprite;
      const { vent, phase, seed } = puffs[i];
      const speed = vent.speed ?? 1;
      const size = vent.size ?? 1;
      const life = reduced
        ? 0.3 + phase * 0.4
        : (t * 0.3 * speed + phase + hash(seed) * 0.4) % 1;
      const fade = Math.min(life / 0.1, 1) * (1 - life);
      const reach = 2.4 * speed * life;
      puff.position.set(
        vent.p[0] + vent.d[0] * reach + Math.sin(life * 5 + seed) * 0.3 * life,
        vent.p[1] + vent.d[1] * reach,
        vent.p[2] + vent.d[2] * reach + Math.cos(life * 4 + seed) * 0.3 * life,
      );
      puff.scale.setScalar((1 + life * 3.2) * size);
      (puff.material as THREE.SpriteMaterial).opacity = fade * 0.7;
    });
  });

  return (
    <group ref={group}>
      {puffs.map((_, i) => (
        <sprite key={i} raycast={() => null}>
          <spriteMaterial
            map={glow}
            color="#eef3f8"
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}

export type Bolt = { p: Vec3; axis: "x" | "z" };

// Tornillos de una brida: n cabezas hexagonales en círculo sobre el disco, a una distancia `offset` de su centro
export function ringBolts(
  c: Vec3,
  radius: number,
  n: number,
  axis: "x" | "z",
  offset: number,
): Bolt[] {
  return Array.from({ length: n }, (_, k) => {
    const a = (k / n) * Math.PI * 2;
    const u = Math.cos(a) * radius;
    const v = Math.sin(a) * radius;
    return {
      axis,
      p:
        axis === "x"
          ? [c[0] + offset, c[1] + u, c[2] + v]
          : [c[0] + u, c[1] + v, c[2] + offset],
    };
  });
}

// Todos los tornillos en una sola malla instanciada: cientos de cabezas por el precio de un dibujo
export function Bolts({ bolts }: { bolts: Bolt[] }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const euler = new THREE.Euler();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);
    bolts.forEach((bolt, i) => {
      // El cilindro nace con su eje en Y: se tumba hacia el eje del disco
      euler.set(
        bolt.axis === "x" ? 0 : Math.PI / 2,
        0,
        bolt.axis === "x" ? Math.PI / 2 : 0,
      );
      quaternion.setFromEuler(euler);
      position.set(...bolt.p);
      matrix.compose(position, quaternion, scale);
      instanced.setMatrixAt(i, matrix);
    });
    instanced.instanceMatrix.needsUpdate = true;
  }, [bolts]);

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, bolts.length]}
      raycast={() => null}
    >
      <cylinderGeometry args={[0.055, 0.055, 0.09, 6]} />
      <meshStandardMaterial color="#9a8b78" metalness={0.85} roughness={0.35} />
    </instancedMesh>
  );
}

// Chapa de pared: paneles con costuras, remaches y manchas de óxido y humedad
export function makeWallTexture(repeatX: number, repeatY: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#2b2c2e";
    g.fillRect(0, 0, 1024, 512);
    for (let x = 0; x < 4; x += 1) {
      for (let y = 0; y < 2; y += 1) {
        const px = x * 256;
        const py = y * 256;
        g.fillStyle = (x + y) % 2 ? "#313234" : "#2a2b2d";
        g.fillRect(px + 3, py + 3, 250, 250);
        g.strokeStyle = "#141516";
        g.lineWidth = 5;
        g.strokeRect(px + 3, py + 3, 250, 250);
        g.fillStyle = "#4d4e50";
        for (const [dx, dy] of [
          [18, 18],
          [238, 18],
          [18, 238],
          [238, 238],
        ]) {
          g.beginPath();
          g.arc(px + dx, py + dy, 5, 0, Math.PI * 2);
          g.fill();
        }
      }
    }
    for (let i = 0; i < 70; i += 1) {
      const x = hash(i) * 1024;
      const y = hash(i + 100) * 512;
      const r = 24 + hash(i + 200) * 70;
      const rust = i % 3 === 0;
      const gradient = g.createRadialGradient(x, y, 0, x, y, r);
      gradient.addColorStop(
        0,
        rust ? "rgba(110,52,24,0.22)" : "rgba(0,0,0,0.2)",
      );
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = gradient;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  return texture;
}

// Válvula pequeña de una tubería: volante rojo sobre un vástago, de cara a la cámara
export function PipeValve({
  position,
  axis = "z",
}: {
  position: Vec3;
  axis?: "x" | "z";
}) {
  // Con eje z el volante mira a +z (pared frontal); con eje x, a -x (pared del pasillo)
  const rotation: Vec3 = axis === "z" ? [0, 0, 0] : [0, -Math.PI / 2, 0];
  return (
    <group position={position} rotation={rotation}>
      <mesh
        position={[0, 0, 0.18]}
        rotation={[Math.PI / 2, 0, 0]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.06, 0.06, 0.4, 10]} />
        <meshStandardMaterial color="#9a9a96" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.4]} raycast={() => null}>
        <torusGeometry args={[0.3, 0.045, 10, 32]} />
        <meshStandardMaterial color="#b3261a" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.4]} raycast={() => null}>
        <boxGeometry args={[0.6, 0.045, 0.045]} />
        <meshStandardMaterial color="#b3261a" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.4]} raycast={() => null}>
        <boxGeometry args={[0.045, 0.6, 0.045]} />
        <meshStandardMaterial color="#b3261a" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}
