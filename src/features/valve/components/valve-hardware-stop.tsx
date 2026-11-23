"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { hash } from "./valve-parts";
import {
  SteamController,
  SteamDeck,
  SteamMachine,
  VrController,
  VrHeadset,
} from "./valve-devices";
import { Sparkles, ValveBadge } from "./valve-props";

// Parada 3 · Hardware: el logo de Valve en el centro, con billetes que le caen encima, y a su alrededor los dispositivos que
// ha fabricado la empresa flotando en 3D. Cada uno se mece, gira despacio y, con el cursor encima, se acerca y se enciende

// Billete: verde con marco, retrato ovalado y un 1 grande
function makeBill() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 120;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#6fa57a";
    g.fillRect(0, 0, 256, 120);
    g.strokeStyle = "#2f5a3a";
    g.lineWidth = 6;
    g.strokeRect(8, 8, 240, 104);
    g.lineWidth = 2;
    g.strokeRect(16, 16, 224, 88);
    g.fillStyle = "#8cc09a";
    g.beginPath();
    g.ellipse(128, 60, 34, 38, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();
    g.fillStyle = "#2f5a3a";
    g.font = "bold 34px Georgia, serif";
    g.textAlign = "center";
    g.fillText("$", 128, 72);
    g.font = "bold 24px Georgia, serif";
    g.fillText("1", 42, 46);
    g.fillText("1", 214, 96);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const BILLS = 46;

// Lluvia de billetes: una malla instanciada; cada billete cae, gira y se mece, y vuelve a salir por arriba
function Bills({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const map = useMemo(() => makeBill(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => () => map.dispose(), [map]);

  const place = (t: number) => {
    const target = mesh.current;
    if (!target) return;
    for (let i = 0; i < BILLS; i += 1) {
      const speed = 0.5 + hash(i + 5) * 0.5;
      const fall = (hash(i + 9) + t * speed * 0.18) % 1;
      const x = (hash(i + 21) - 0.5) * 3.6 + Math.sin(t * 0.8 + i) * 0.25;
      const y = 3.6 - fall * 7.4;
      const z = (hash(i + 33) - 0.5) * 1.8;
      dummy.position.set(x, y, z);
      dummy.rotation.set(
        t * (0.6 + hash(i) * 0.9) + i,
        t * (0.5 + hash(i + 2) * 0.8) + i * 2,
        Math.sin(t + i) * 0.5,
      );
      dummy.scale.setScalar(0.85);
      dummy.updateMatrix();
      target.setMatrixAt(i, dummy.matrix);
    }
    target.instanceMatrix.needsUpdate = true;
  };

  useEffect(() => {
    // Con movimiento reducido se dejan los billetes quietos, repartidos
    if (reduced) place(3);
  });

  useFrame((state) => {
    if (!reduced) place(state.clock.elapsedTime);
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, BILLS]}
      raycast={() => null}
      frustumCulled={false}
    >
      <planeGeometry args={[0.62, 0.29]} />
      <meshStandardMaterial map={map} side={THREE.DoubleSide} roughness={0.8} />
    </instancedMesh>
  );
}

// Envoltorio flotante de un dispositivo: se mece, gira despacio y reacciona al cursor
function Floating({
  position,
  index,
  reduced,
  size = 1,
  hit = [2.2, 1.6],
  children,
}: {
  position: [number, number, number];
  index: number;
  reduced: boolean;
  size?: number;
  // Tamaño de la zona que recibe el cursor: debe cubrir todo lo que lleva dentro
  hit?: [number, number];
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const hover = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    hover.current +=
      (target.current - hover.current) * (1 - Math.exp(-9 * delta));
    const h = hover.current;
    g.position.set(
      position[0],
      position[1] + Math.sin(t * 0.9 + index * 1.6) * 0.16,
      position[2] + h * 0.7,
    );
    g.rotation.y = Math.sin(t * 0.45 + index) * 0.55 * (1 - h) + h * 0.25;
    g.rotation.x = Math.sin(t * 0.6 + index * 2) * 0.12 * (1 - h);
    g.scale.setScalar(size * (1 + h * 0.22));
  });

  return (
    <group
      ref={ref}
      onPointerOver={() => {
        target.current = 1;
      }}
      onPointerOut={() => {
        target.current = 0;
      }}
    >
      {/* Zona de cursor: invisible, pero recibe el puntero (el clic sigue subiendo a la parada) */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={hit} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {children}
    </group>
  );
}

export function HardwareStop({ reduced }: { reduced: boolean }) {
  const logo = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    if (logo.current) {
      logo.current.rotation.z = t * 0.35;
      logo.current.rotation.y = Math.sin(t * 0.5) * 0.35;
    }
    // La luz verde de los billetes late
    if (light.current) light.current.intensity = 6 + Math.sin(t * 2) * 1.5;
  });

  return (
    <group>
      <group ref={logo} scale={2.4}>
        <ValveBadge />
      </group>
      {/* Zona pulsable del logo: sus mallas no reciben clics, así que el clic entra a la sala desde aquí */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Bills reduced={reduced} />
      <Floating
        position={[-1.7, 2.05, 0.6]}
        index={0}
        hit={[4.6, 2.2]}
        reduced={reduced}
        size={1.1}
      >
        <group scale={0.8}>
          <VrHeadset />
          <group position={[-1.5, -0.6, 0.3]} rotation={[0.3, 0.4, 0.2]}>
            <VrController side={-1} />
          </group>
          <group position={[1.5, -0.6, 0.3]} rotation={[0.3, -0.4, -0.2]}>
            <VrController />
          </group>
        </group>
      </Floating>
      <Floating position={[2.9, 1.7, 0.5]} index={1} reduced={reduced}>
        <SteamMachine />
      </Floating>
      <Floating
        position={[-0.9, -2.25, 0.8]}
        index={2}
        reduced={reduced}
        size={1.05}
      >
        <SteamDeck />
      </Floating>
      <Floating position={[2.8, -1.9, 0.6]} index={3} reduced={reduced}>
        <SteamController />
      </Floating>
      <Sparkles />
      <pointLight
        ref={light}
        position={[0, 0.2, 2.6]}
        intensity={6}
        distance={8}
        color="#9fe8b0"
      />
      <pointLight
        position={[-2, 2, 2.2]}
        intensity={4}
        distance={7}
        color="#ffe2b0"
      />
    </group>
  );
}
