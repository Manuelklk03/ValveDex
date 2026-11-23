"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { STEAM_PATH } from "./valve-props";

// Modelos 3D de los dispositivos de Valve, con las proporciones y los detalles de las fotos oficiales: Steam Machine (cubo
// negro con tira de puertos y franja de luz cian), Steam Deck, el Steam Controller nuevo y las gafas VR con sus mandos.
// Todas las mallas llevan raycast nulo: el cursor lo recibe la zona del contenedor

const plastic = { color: "#262a32", metalness: 0.15, roughness: 0.55 };
const glass = { color: "#040507", metalness: 0.85, roughness: 0.07 };
const rubber = { color: "#0a0b0d", metalness: 0, roughness: 0.85 };

function useGeometry<T extends THREE.BufferGeometry>(make: () => T) {
  const [geometry] = useState(make);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

function extrude(shape: THREE.Shape, depth: number, bevel: number) {
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 24,
  });
}

// Disco plano (sticks, botones) mirando a +z
function Disc({
  x,
  y,
  z,
  r,
  h = 0.03,
  color = "#08090b",
  emissive,
}: {
  x: number;
  y: number;
  z: number;
  r: number;
  h?: number;
  color?: string;
  emissive?: string;
}) {
  return (
    <mesh
      position={[x, y, z]}
      rotation={[Math.PI / 2, 0, 0]}
      raycast={() => null}
    >
      <cylinderGeometry args={[r, r, h, 20]} />
      <meshStandardMaterial
        color={color}
        roughness={0.5}
        emissive={emissive}
        emissiveIntensity={emissive ? 1 : 0}
      />
    </mesh>
  );
}

// Stick analógico: base hundida y capuchón cóncavo
function Stick({
  x,
  y,
  z,
  r = 0.075,
}: {
  x: number;
  y: number;
  z: number;
  r?: number;
}) {
  return (
    <group>
      <Disc x={x} y={y} z={z} r={r * 1.35} h={0.02} color="#050607" />
      <Disc x={x} y={y} z={z + 0.03} r={r} h={0.06} color="#101215" />
      <Disc x={x} y={y} z={z + 0.065} r={r * 0.75} h={0.01} color="#1b1e23" />
    </group>
  );
}

function Pad({
  x,
  y,
  z,
  size,
}: {
  x: number;
  y: number;
  z: number;
  size: number;
}) {
  return (
    <mesh position={[x, y, z]} raycast={() => null}>
      <boxGeometry args={[size, size, 0.02]} />
      <meshStandardMaterial color="#1c1f24" roughness={0.35} metalness={0.3} />
    </mesh>
  );
}

function Dpad({
  x,
  y,
  z,
  size = 0.15,
}: {
  x: number;
  y: number;
  z: number;
  size?: number;
}) {
  return (
    <group position={[x, y, z]}>
      <mesh raycast={() => null}>
        <boxGeometry args={[size, size * 0.36, 0.03]} />
        <meshStandardMaterial color="#050607" roughness={0.5} />
      </mesh>
      <mesh raycast={() => null}>
        <boxGeometry args={[size * 0.36, size, 0.03]} />
        <meshStandardMaterial color="#050607" roughness={0.5} />
      </mesh>
    </group>
  );
}

function FaceButtons({
  x,
  y,
  z,
  d = 0.07,
}: {
  x: number;
  y: number;
  z: number;
  d?: number;
}) {
  return (
    <group>
      {[
        [0, d],
        [d, 0],
        [0, -d],
        [-d, 0],
      ].map(([dx, dy]) => (
        <Disc
          key={`${dx}${dy}`}
          x={x + dx}
          y={y + dy}
          z={z}
          r={0.032}
          h={0.03}
          color="#07080a"
        />
      ))}
    </group>
  );
}

// Steam Machine: cubo negro mate. La cara frontal lleva abajo una tira con dos USB, la ranura de tarjeta, la franja cian, el
// botón redondo y el piloto blanco
export function SteamMachine() {
  return (
    <group>
      <mesh raycast={() => null}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0e0f12" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Cara frontal algo más clara y brillante */}
      <mesh position={[0, 0.1, 0.502]} raycast={() => null}>
        <planeGeometry args={[0.96, 0.74]} />
        <meshStandardMaterial color="#17191d" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Tira inferior con los puertos */}
      <mesh position={[0, -0.4, 0.51]} raycast={() => null}>
        <boxGeometry args={[1, 0.2, 0.02]} />
        <meshStandardMaterial color="#0a0b0d" roughness={0.5} metalness={0.3} />
      </mesh>
      {[-0.4, -0.29].map((x) => (
        <mesh key={x} position={[x, -0.42, 0.522]} raycast={() => null}>
          <boxGeometry args={[0.08, 0.03, 0.004]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      ))}
      <mesh position={[-0.12, -0.42, 0.522]} raycast={() => null}>
        <boxGeometry args={[0.05, 0.012, 0.004]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, -0.375, 0.523]} raycast={() => null}>
        <boxGeometry args={[0.52, 0.018, 0.004]} />
        <meshBasicMaterial color="#35d0e8" toneMapped={false} />
      </mesh>
      <mesh position={[0.3, -0.42, 0.522]} raycast={() => null}>
        <circleGeometry args={[0.014, 10]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <Disc x={0.4} y={-0.42} z={0.522} r={0.04} h={0.012} color="#08090b" />
    </group>
  );
}

function deckShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.9, 0.4);
  s.lineTo(0.9, 0.4);
  s.bezierCurveTo(1.04, 0.4, 1.1, 0.28, 1.1, 0.12);
  s.bezierCurveTo(1.1, -0.2, 1.08, -0.42, 0.92, -0.5);
  s.bezierCurveTo(0.78, -0.55, 0.66, -0.45, 0.6, -0.32);
  s.lineTo(-0.6, -0.32);
  s.bezierCurveTo(-0.66, -0.45, -0.78, -0.55, -0.92, -0.5);
  s.bezierCurveTo(-1.08, -0.42, -1.1, -0.2, -1.1, 0.12);
  s.bezierCurveTo(-1.1, 0.28, -1.04, 0.4, -0.9, 0.4);
  return s;
}

function makeDeckScreen() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 300;
  const g = canvas.getContext("2d");
  if (g) {
    const sky = g.createLinearGradient(0, 0, 512, 300);
    sky.addColorStop(0, "#2a5a8a");
    sky.addColorStop(0.55, "#12283d");
    sky.addColorStop(1, "#0b1119");
    g.fillStyle = sky;
    g.fillRect(0, 0, 512, 300);
    g.save();
    g.translate(60, 70);
    g.scale(6, 6);
    g.fillStyle = "#c7d5e0";
    g.fill(new Path2D(STEAM_PATH));
    g.restore();
    g.fillStyle = "#66c0f4";
    g.fillRect(250, 110, 200, 16);
    g.fillRect(250, 145, 150, 10);
    g.fillStyle = "rgba(199,213,224,0.55)";
    for (let i = 0; i < 3; i += 1)
      g.fillRect(250, 185 + i * 22, 190 - i * 30, 8);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Steam Deck: consola con empuñaduras, pantalla central, dos sticks, cruceta, cuatro botones y dos paneles táctiles cuadrados
export function SteamDeck() {
  const body = useGeometry(() => extrude(deckShape(), 0.1, 0.035));
  const screen = useMemo(() => makeDeckScreen(), []);
  useEffect(() => () => screen.dispose(), [screen]);
  const z = 0.175;
  return (
    <group position={[0, 0, -0.09]}>
      <mesh geometry={body} raycast={() => null}>
        <meshStandardMaterial {...plastic} />
      </mesh>
      {/* Marco negro de la pantalla */}
      <mesh position={[0, 0.05, z - 0.005]} raycast={() => null}>
        <planeGeometry args={[1.2, 0.7]} />
        <meshStandardMaterial {...glass} />
      </mesh>
      <mesh position={[0, 0.05, z]} raycast={() => null}>
        <planeGeometry args={[1.12, 0.62]} />
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>
      <Stick x={-0.8} y={0.24} z={z} />
      <Dpad x={-0.93} y={0.04} z={z + 0.01} />
      <Pad x={-0.78} y={-0.2} z={z} size={0.24} />
      <Stick x={0.78} y={0.03} z={z} />
      <FaceButtons x={0.93} y={0.25} z={z} />
      <Pad x={0.78} y={-0.2} z={z} size={0.24} />
      {/* Botones de menú y rejillas de altavoz */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.62, -0.18, z]}
          raycast={() => null}
        >
          <boxGeometry args={[0.08, 0.04, 0.008]} />
          <meshStandardMaterial color="#050607" />
        </mesh>
      ))}
    </group>
  );
}

function padShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.45, 0.3);
  s.lineTo(0.45, 0.3);
  s.bezierCurveTo(0.65, 0.3, 0.78, 0.2, 0.78, 0.0);
  s.bezierCurveTo(0.78, -0.25, 0.72, -0.5, 0.58, -0.58);
  s.bezierCurveTo(0.44, -0.64, 0.36, -0.5, 0.3, -0.36);
  s.quadraticCurveTo(0, -0.3, -0.3, -0.36);
  s.bezierCurveTo(-0.36, -0.5, -0.44, -0.64, -0.58, -0.58);
  s.bezierCurveTo(-0.72, -0.5, -0.78, -0.25, -0.78, 0);
  s.bezierCurveTo(-0.78, 0.2, -0.65, 0.3, -0.45, 0.3);
  return s;
}

// Steam Controller: mando con cruceta, dos sticks, cuatro botones, dos paneles táctiles cuadrados y el botón central
export function SteamController() {
  const body = useGeometry(() => extrude(padShape(), 0.14, 0.04));
  const z = 0.18;
  return (
    <group position={[0, 0.1, -0.1]}>
      <mesh geometry={body} raycast={() => null}>
        <meshStandardMaterial {...plastic} />
      </mesh>
      {/* Gatillos y bumpers arriba */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.5, 0.31, 0.08]}
          raycast={() => null}
        >
          <boxGeometry args={[0.36, 0.06, 0.2]} />
          <meshStandardMaterial {...plastic} />
        </mesh>
      ))}
      <Dpad x={-0.52} y={0.13} z={z} size={0.17} />
      <Stick x={-0.2} y={0.05} z={z} />
      <Stick x={0.2} y={0.05} z={z} />
      <FaceButtons x={0.52} y={0.13} z={z} d={0.075} />
      <Pad x={-0.3} y={-0.2} z={z} size={0.32} />
      <Pad x={0.3} y={-0.2} z={z} size={0.32} />
      <Disc x={0} y={-0.22} z={z} r={0.03} h={0.012} color="#1d2026" />
      <Disc x={0} y={0.22} z={z} r={0.028} h={0.012} color="#2a2e36" />
    </group>
  );
}

function visorShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.85, 0.38);
  s.lineTo(0.85, 0.38);
  s.bezierCurveTo(1.0, 0.38, 1.02, 0.2, 1.0, 0.0);
  s.bezierCurveTo(0.98, -0.3, 0.9, -0.4, 0.7, -0.38);
  s.lineTo(0.34, -0.32);
  s.quadraticCurveTo(0.2, -0.2, 0, -0.2);
  s.quadraticCurveTo(-0.2, -0.2, -0.34, -0.32);
  s.lineTo(-0.7, -0.38);
  s.bezierCurveTo(-0.9, -0.4, -0.98, -0.3, -1.0, 0.0);
  s.bezierCurveTo(-1.02, 0.2, -1.0, 0.38, -0.85, 0.38);
  return s;
}

function makeFabric() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#4a4d53";
    g.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 900; i += 1) {
      const v = 60 + ((i * 53) % 70);
      g.fillStyle = `rgba(${v},${v},${v + 4},0.55)`;
      g.fillRect((i * 37) % 128, (i * 91) % 128, 2, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2);
  return texture;
}

// Gafas VR de Valve: visor ancho con el hueco de la nariz, cristal negro brillante con cámaras, cuerpos laterales con
// rejillas, almohadilla trasera de tela, diadema por encima y un cable que cuelga
export function VrHeadset() {
  const body = useGeometry(() => extrude(visorShape(), 0.5, 0.08));
  const front = useGeometry(() => {
    const g = new THREE.ShapeGeometry(visorShape(), 24);
    g.scale(0.93, 0.9, 1);
    return g;
  });
  const strap = useGeometry(
    () => new THREE.TorusGeometry(0.8, 0.075, 12, 40, Math.PI),
  );
  const cable = useGeometry(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-1.0, 0.1, -0.9),
          new THREE.Vector3(-1.35, 0.0, -0.8),
          new THREE.Vector3(-1.5, -0.4, -0.5),
          new THREE.Vector3(-1.3, -0.8, -0.3),
        ]),
        24,
        0.022,
        6,
      ),
  );
  const fabric = useMemo(() => makeFabric(), []);
  useEffect(() => () => fabric.dispose(), [fabric]);
  return (
    <group>
      <mesh geometry={body} position={[0, 0, -0.25]} raycast={() => null}>
        <meshPhysicalMaterial
          {...plastic}
          metalness={0.4}
          roughness={0.25}
          clearcoat={0.8}
        />
      </mesh>
      {/* Cristal frontal */}
      <mesh geometry={front} position={[0, 0.02, 0.335]} raycast={() => null}>
        <meshPhysicalMaterial {...glass} clearcoat={1} />
      </mesh>
      {/* Cámaras de seguimiento */}
      {[
        [-0.62, 0.02],
        [0.62, 0.02],
        [-0.3, -0.22],
        [0.3, -0.22],
      ].map(([x, y]) => (
        <mesh key={`${x}${y}`} position={[x, y, 0.337]} raycast={() => null}>
          <circleGeometry args={[0.025, 14]} />
          <meshStandardMaterial
            color="#14202a"
            emissive="#35d0e8"
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
      {/* Cresta superior y cuerpos laterales con su rejilla */}
      <mesh position={[0, 0.4, 0.0]} raycast={() => null}>
        <boxGeometry args={[1.3, 0.05, 0.5]} />
        <meshStandardMaterial {...rubber} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.02, 0.0, -0.35]}>
          <mesh raycast={() => null}>
            <boxGeometry args={[0.14, 0.5, 0.75]} />
            <meshStandardMaterial {...plastic} metalness={0.3} />
          </mesh>
          {Array.from({ length: 5 }, (_, i) => (
            <mesh
              key={i}
              position={[side * 0.072, -0.05, 0.28 - i * 0.07]}
              raycast={() => null}
            >
              <boxGeometry args={[0.004, 0.2, 0.02]} />
              <meshStandardMaterial color="#050607" />
            </mesh>
          ))}
        </group>
      ))}
      {/* Brazos de la diadema y arco por encima */}
      {[-1, 1].map((side) => (
        <mesh
          key={`a${side}`}
          position={[side * 0.98, 0.02, -1.0]}
          raycast={() => null}
        >
          <boxGeometry args={[0.1, 0.22, 0.7]} />
          <meshStandardMaterial {...rubber} />
        </mesh>
      ))}
      <mesh
        geometry={strap}
        position={[0, 0.0, -0.8]}
        rotation={[0, Math.PI / 2, 0]}
        raycast={() => null}
      >
        <meshStandardMaterial {...rubber} />
      </mesh>
      {/* Almohadilla trasera de tela gris */}
      <mesh position={[0, -0.02, -1.35]} raycast={() => null}>
        <boxGeometry args={[1.5, 0.55, 0.28]} />
        <meshStandardMaterial map={fabric} roughness={1} />
      </mesh>
      <mesh geometry={cable} raycast={() => null}>
        <meshStandardMaterial color="#08090b" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Mando VR: empuñadura alargada que sale de la cabeza redonda, con stick, cuatro botones y gatillo
export function VrController({ side = 1 }: { side?: 1 | -1 }) {
  return (
    <group scale={[side, 1, 1]}>
      <mesh
        position={[0.18, -0.3, 0]}
        rotation={[0, 0, -0.5]}
        raycast={() => null}
      >
        <capsuleGeometry args={[0.075, 0.5, 6, 14]} />
        <meshStandardMaterial {...plastic} />
      </mesh>
      <mesh
        position={[0, 0.05, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.28, 0.3, 0.14, 28]} />
        <meshStandardMaterial {...plastic} roughness={0.4} />
      </mesh>
      <Stick x={-0.02} y={0.12} z={0.075} r={0.065} />
      <FaceButtons x={0.05} y={-0.04} z={0.075} d={0.07} />
    </group>
  );
}
