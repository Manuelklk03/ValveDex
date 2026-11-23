"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { hash } from "./valve-parts";
import { STEAM_PATH, Sparkles, ValveBadge, VrHeadset } from "./valve-props";

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
  children,
}: {
  position: [number, number, number];
  index: number;
  reduced: boolean;
  size?: number;
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
      onPointerOver={(event) => {
        event.stopPropagation();
        target.current = 1;
      }}
      onPointerOut={() => {
        target.current = 0;
      }}
    >
      {/* Zona de cursor: invisible, pero recibe el puntero (el clic sigue subiendo a la parada) */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[2.2, 1.6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {children}
    </group>
  );
}

const dark = { color: "#2b303b", metalness: 0.5, roughness: 0.3 };

// Steam Machine: caja compacta negra con la rejilla frontal y una franja de luz
function SteamMachine() {
  return (
    <group>
      <RoundedBox
        args={[1.1, 0.95, 1.1]}
        radius={0.1}
        smoothness={4}
        raycast={() => null}
      >
        <meshStandardMaterial {...dark} />
      </RoundedBox>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh
          key={i}
          position={[0, 0.3 - i * 0.07, 0.555]}
          raycast={() => null}
        >
          <boxGeometry args={[0.78, 0.022, 0.01]} />
          <meshStandardMaterial color="#05060a" />
        </mesh>
      ))}
      <mesh position={[0, -0.36, 0.556]} raycast={() => null}>
        <boxGeometry args={[0.5, 0.025, 0.008]} />
        <meshBasicMaterial color="#35d0e8" />
      </mesh>
      <mesh position={[0.38, 0.4, 0.56]} raycast={() => null}>
        <circleGeometry args={[0.025, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function makeDeckScreen() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const g = canvas.getContext("2d");
  if (g) {
    const sky = g.createLinearGradient(0, 0, 0, 320);
    sky.addColorStop(0, "#1b2838");
    sky.addColorStop(1, "#0b1119");
    g.fillStyle = sky;
    g.fillRect(0, 0, 512, 320);
    g.save();
    g.translate(176, 40);
    g.scale(6.5, 6.5);
    g.fillStyle = "#c7d5e0";
    g.fill(new Path2D(STEAM_PATH));
    g.restore();
    g.fillStyle = "#66c0f4";
    g.fillRect(332, 120, 140, 14);
    g.fillRect(332, 150, 100, 10);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Steam Deck: consola portátil con la pantalla en el centro, dos sticks, cruceta y cuatro botones
function SteamDeck() {
  const screen = useMemo(() => makeDeckScreen(), []);
  useEffect(() => () => screen.dispose(), [screen]);
  const face = ["#e5513c", "#5fbf66", "#4aa3ff", "#f3c64a"];
  return (
    <group>
      <RoundedBox
        args={[1.9, 0.72, 0.16]}
        radius={0.12}
        smoothness={4}
        raycast={() => null}
      >
        <meshStandardMaterial {...dark} />
      </RoundedBox>
      <mesh position={[0, 0, 0.082]} raycast={() => null}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            position={[side * 0.72, 0.12, 0.1]}
            rotation={[Math.PI / 2, 0, 0]}
            raycast={() => null}
          >
            <cylinderGeometry args={[0.1, 0.1, 0.06, 20]} />
            <meshStandardMaterial color="#0a0b0e" roughness={0.5} />
          </mesh>
          <mesh position={[side * 0.72, -0.17, 0.09]} raycast={() => null}>
            <circleGeometry args={[0.09, 20]} />
            <meshStandardMaterial color="#2a2d34" />
          </mesh>
        </group>
      ))}
      {face.map((color, i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={color}
            position={[
              0.72 + Math.cos(a) * 0.1,
              0.02 + Math.sin(a) * 0.1 + 0.2,
              0.09,
            ]}
            raycast={() => null}
          >
            <circleGeometry args={[0.032, 12]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

// Steam Controller: cuerpo con dos superficies táctiles circulares, dos sticks y botones
function SteamController() {
  return (
    <group>
      <RoundedBox
        args={[1.3, 0.62, 0.22]}
        radius={0.16}
        smoothness={4}
        raycast={() => null}
      >
        <meshStandardMaterial
          color="#1b1d23"
          metalness={0.4}
          roughness={0.35}
        />
      </RoundedBox>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.4, -0.05, 0.115]} raycast={() => null}>
            <circleGeometry args={[0.17, 28]} />
            <meshStandardMaterial
              color="#3a3d45"
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          <mesh
            position={[side * 0.17, 0.17, 0.13]}
            rotation={[Math.PI / 2, 0, 0]}
            raycast={() => null}
          >
            <cylinderGeometry args={[0.07, 0.07, 0.07, 18]} />
            <meshStandardMaterial color="#0a0b0e" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.06, 0.115]} raycast={() => null}>
        <circleGeometry args={[0.05, 14]} />
        <meshBasicMaterial color="#35d0e8" />
      </mesh>
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
      <Bills reduced={reduced} />
      <Floating
        position={[-1.7, 2.05, 0.6]}
        index={0}
        reduced={reduced}
        size={1.1}
      >
        <VrHeadset />
      </Floating>
      <Floating position={[2.9, 1.7, 0.5]} index={1} reduced={reduced}>
        <SteamMachine />
      </Floating>
      <Floating
        position={[-1.55, -2.15, 0.7]}
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
