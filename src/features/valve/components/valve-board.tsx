"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

// Piezas del tablero de la parada Personal: lo que está clavado al corcho. Cada una entra cayendo con su retraso, se
// mece con su chincheta y, al acercar el cursor, se levanta hacia la cámara y se endereza. Si tiene destino, pulsarla lo abre

function easeOutBack(x: number) {
  const c1 = 1.9;
  return 1 + (c1 + 1) * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

type PinnedProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  index: number;
  reduced: boolean;
  // Tamaño de la zona que reacciona al cursor
  hit: [number, number];
  onOpen?: () => void;
  children: ReactNode;
};

export function Pinned({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  index,
  reduced,
  hit,
  onOpen,
  children,
}: PinnedProps) {
  const ref = useRef<THREE.Group>(null);
  const hover = useRef(0);
  const target = useRef(0);
  const born = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    born.current ??= t;
    const age = reduced ? 9 : t - born.current - index * 0.11;
    g.visible = age > 0;
    const enter = THREE.MathUtils.clamp(age / 0.75, 0, 1);
    const e = easeOutBack(enter);
    hover.current +=
      (target.current - hover.current) * (1 - Math.exp(-10 * delta));
    const h = hover.current;
    const sway = reduced ? 0 : Math.sin(t * 1.1 + index * 1.9) * 0.03 * (1 - h);
    g.position.set(
      position[0],
      position[1] + (1 - e) * 2.4,
      position[2] + h * 0.55,
    );
    g.scale.setScalar(scale * (0.55 + 0.45 * e) * (1 + h * 0.32));
    g.rotation.set(
      rotation[0] * (1 - h),
      rotation[1] * (1 - h),
      rotation[2] * (1 - h) + sway + (1 - e) * 0.5,
    );
  });

  return (
    <group
      ref={ref}
      onPointerOver={(event) => {
        event.stopPropagation();
        target.current = 1;
        document.body.style.cursor = onOpen ? "pointer" : "";
      }}
      onPointerOut={() => {
        target.current = 0;
        document.body.style.cursor = "";
      }}
      onClick={
        onOpen
          ? (event) => {
              event.stopPropagation();
              onOpen();
            }
          : undefined
      }
    >
      {/* Zona de cursor: invisible, pero recibe el puntero */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={hit} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {children}
    </group>
  );
}

// Cinta adhesiva semitransparente en una esquina
function Tape({
  x = 0,
  y = 0.5,
  tilt = 0.1,
}: {
  x?: number;
  y?: number;
  tilt?: number;
}) {
  return (
    <mesh position={[x, y, 0.035]} rotation={[0, 0, tilt]} raycast={() => null}>
      <planeGeometry args={[0.26, 0.09]} />
      <meshStandardMaterial
        color="#e8dcb0"
        transparent
        opacity={0.75}
        roughness={0.6}
      />
    </mesh>
  );
}

// Polaroid de una persona: marco blanco, la foto y su nombre a mano
function makeCaption(name: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#f4f1ea";
    g.fillRect(0, 0, 256, 64);
    g.fillStyle = "#23304f";
    g.font = "italic 30px 'Comic Sans MS', 'Segoe Script', cursive";
    g.textAlign = "center";
    g.fillText(name.length > 18 ? name.split(" ")[0] : name, 128, 42);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function PolaroidPhoto({ src }: { src: string }) {
  const map = useTexture(src);
  return (
    <mesh position={[0, 0.08, 0.02]} raycast={() => null}>
      <planeGeometry args={[0.6, 0.6]} />
      <meshStandardMaterial map={map} roughness={0.7} />
    </mesh>
  );
}

export function Polaroid({ name, photo }: { name: string; photo: string }) {
  const caption = useMemo(() => makeCaption(name), [name]);
  useEffect(() => () => caption.dispose(), [caption]);
  return (
    <group>
      <mesh raycast={() => null}>
        <boxGeometry args={[0.72, 0.88, 0.02]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.8} />
      </mesh>
      <Suspense fallback={null}>
        <PolaroidPhoto src={photo} />
      </Suspense>
      <mesh position={[0, -0.34, 0.012]} raycast={() => null}>
        <planeGeometry args={[0.68, 0.17]} />
        <meshBasicMaterial map={caption} />
      </mesh>
      <Tape y={0.43} tilt={-0.15} />
    </group>
  );
}

// Nota adhesiva con texto a mano
function makeNote(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = color;
    g.fillRect(0, 0, 256, 256);
    const shade = g.createLinearGradient(0, 200, 0, 256);
    shade.addColorStop(0, "rgba(0,0,0,0)");
    shade.addColorStop(1, "rgba(0,0,0,0.12)");
    g.fillStyle = shade;
    g.fillRect(0, 200, 256, 56);
    g.fillStyle = "#2b2418";
    g.font = "bold 30px 'Comic Sans MS', 'Segoe Script', cursive";
    g.textAlign = "center";
    text.split("\n").forEach((line, i) => g.fillText(line, 128, 80 + i * 44));
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function StickyNote({
  text,
  color = "#f3dc6b",
}: {
  text: string;
  color?: string;
}) {
  const map = useMemo(() => makeNote(text, color), [text, color]);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <group>
      <mesh raycast={() => null}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshStandardMaterial map={map} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.3, 0.02]} raycast={() => null}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color="#2a6fd6" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

// Recorte de prensa: titular y columnas
function makeClipping() {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 256;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#d9d2bc";
    g.fillRect(0, 0, 384, 256);
    g.fillStyle = "#26231c";
    g.font = "bold 22px Georgia, serif";
    g.textAlign = "left";
    g.fillText("VALVE NACE EN 1996", 18, 40);
    g.font = "13px Georgia, serif";
    g.fillText("Dos antiguos de Microsoft fundan", 18, 62);
    g.fillText("una empresa de videojuegos.", 18, 80);
    for (let col = 0; col < 2; col += 1) {
      for (let i = 0; i < 9; i += 1) {
        const w = 120 + ((i * 37 + col * 19) % 50);
        g.fillStyle = "#4a4638";
        g.fillRect(18 + col * 176, 104 + i * 15, w, 5);
      }
    }
    g.fillStyle = "#8a826c";
    g.fillRect(18, 94, 348, 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function Clipping() {
  const map = useMemo(() => makeClipping(), []);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <group>
      <mesh raycast={() => null}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial map={map} roughness={0.95} />
      </mesh>
      <Tape x={-0.45} y={0.38} tilt={0.4} />
      <Tape x={0.45} y={0.38} tilt={-0.4} />
    </group>
  );
}

// Tarjeta de mapa con la sede de Valve
function makeMap() {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 240;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#cfd8cf";
    g.fillRect(0, 0, 320, 240);
    g.strokeStyle = "#a9b8ac";
    g.lineWidth = 1;
    for (let x = 0; x <= 320; x += 32) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, 240);
      g.stroke();
    }
    for (let y = 0; y <= 240; y += 32) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(320, y);
      g.stroke();
    }
    g.strokeStyle = "#e8e4d4";
    g.lineWidth = 9;
    g.beginPath();
    g.moveTo(0, 150);
    g.quadraticCurveTo(140, 90, 320, 130);
    g.stroke();
    g.fillStyle = "#b3261a";
    g.beginPath();
    g.arc(170, 112, 11, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#1c2433";
    g.fillRect(0, 196, 320, 44);
    g.fillStyle = "#ece5d2";
    g.font = "bold 20px Georgia, serif";
    g.textAlign = "center";
    g.fillText("BELLEVUE, WASHINGTON", 160, 224);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function MapCard() {
  const map = useMemo(() => makeMap(), []);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <group>
      <mesh raycast={() => null}>
        <planeGeometry args={[1.0, 0.75]} />
        <meshStandardMaterial map={map} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.34, 0.03]} raycast={() => null}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color="#b3261a" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}
