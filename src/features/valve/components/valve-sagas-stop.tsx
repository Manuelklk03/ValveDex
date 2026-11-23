"use client";

import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import * as THREE from "three";
import { Emblem } from "@/components/ui/space-parts";
import { Action } from "./valve-sagas-action";
import { SCENES, SceneAction } from "./valve-scenes";
import { Sparkles } from "./valve-props";

// Parada 5 · Universos: una mesa-mapa vista desde arriba. Cada saga es un territorio con el suelo y el decorado de su
// temática; sus juegos son hitos con su icono de línea sobre un pedestal. Al acercar el cursor, el territorio se levanta, sus
// juegos se abren con nombre y año, el resto se apaga, el fondo se tiñe con su color y la cámara se acerca a él

export type SagaGame = {
  name: string;
  year: number;
  // Icono de línea del juego (el de su dossier); si falta se usa el emblema de la saga
  icon?: { src: string; width: number; height: number };
};
export type SagaWorldData = {
  id: string;
  slug: string;
  name: string;
  accent: string;
  emblem: string;
  games: SagaGame[];
  // Capturas de mapas del universo, que giran en carrusel sobre su territorio
  maps?: { name: string; src: string }[];
};

// Hacia dónde mira la cámara cuando se acerca a un territorio: lo escribe la parada y lo lee la cámara de la escena. Las
// coordenadas son locales de la parada, igual que las de los territorios
export const mapFocus = { x: 0, z: 0, target: 0, k: 0 };

type Spot = { x: number; z: number; r: number };

// Disposición de la mesa: Half-Life en el centro de atrás (es el hub de la saga), Portal y Team Fortress a sus lados y,
// delante, Counter-Strike y Left 4 Dead. El hueco de la izquierda queda libre para el texto
const DESKTOP_SPOTS: Record<string, Spot> = {
  "half-life": { x: 3.5, z: -2.2, r: 1.8 },
  portal: { x: 0.4, z: -2.3, r: 1.35 },
  "team-fortress": { x: 6.7, z: -2.3, r: 1.35 },
  "counter-strike": { x: 1.9, z: 2.15, r: 1.35 },
  "left-4-dead": { x: 5.2, z: 2.15, r: 1.35 },
};
const PORTRAIT_SPOTS: Record<string, Spot> = {
  "half-life": { x: 0, z: -3.3, r: 1.35 },
  portal: { x: -1.45, z: -0.8, r: 1.0 },
  "team-fortress": { x: 1.45, z: -0.8, r: 1.0 },
  "counter-strike": { x: -1.45, z: 1.3, r: 1.0 },
  "left-4-dead": { x: 1.45, z: 1.3, r: 1.0 },
};

// Dónde se coloca la cámara sobre la mesa: el punto al que mira (locales de la parada), su altura y lo retrasada que va
export function mapLayout(portrait: boolean) {
  return portrait
    ? {
        look: [0, 0, -0.9] as const,
        height: 12.5,
        back: 6,
        spots: PORTRAIT_SPOTS,
      }
    : {
        look: [0.7, 0, -0.3] as const,
        height: 10,
        back: 8.2,
        spots: DESKTOP_SPOTS,
      };
}

const STAR_COUNT = 1100;

function hashN(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Nombre corto para la placa: las sagas se abrevian para que quepa en grande
function shortName(name: string) {
  return name
    .replace("Half-Life", "HL")
    .replace("Counter-Strike", "CS")
    .replace("Team Fortress", "TF")
    .replace("Left 4 Dead", "L4D");
}

// Placa de dos líneas: el nombre en grande y el año debajo
function makeLabel(game: SagaGame, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 112;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "rgba(8,9,12,0.94)";
    g.beginPath();
    g.roundRect(4, 4, 312, 104, 16);
    g.fill();
    g.strokeStyle = accent;
    g.lineWidth = 4;
    g.stroke();
    g.fillStyle = "#f3efe6";
    g.font = "bold 36px system-ui, sans-serif";
    g.textAlign = "center";
    const name = shortName(game.name);
    g.fillText(name.length > 20 ? `${name.slice(0, 19)}…` : name, 160, 54);
    g.fillStyle = accent;
    g.font = "bold 28px system-ui, sans-serif";
    g.fillText(String(game.year), 160, 92);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Rótulo del territorio, siempre visible: el nombre de la saga en mayúsculas con su color
function makeName(name: string, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 96;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = accent;
    g.font = "bold 54px Archivo, system-ui, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.shadowColor = "rgba(0,0,0,0.9)";
    g.shadowBlur = 14;
    g.fillText(name.toUpperCase(), 256, 50);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Los iconos de línea son trazos negros con transparencia: se repintan con el color de la saga
function useTinted(src: string, color: string) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    let dead = false;
    let made: THREE.CanvasTexture | null = null;
    const img = new Image();
    img.onload = () => {
      if (dead) return;
      const scale = 256 / Math.max(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const g = canvas.getContext("2d");
      if (!g) return;
      g.drawImage(img, 0, 0, canvas.width, canvas.height);
      g.globalCompositeOperation = "source-in";
      g.fillStyle = color;
      g.fillRect(0, 0, canvas.width, canvas.height);
      made = new THREE.CanvasTexture(canvas);
      made.colorSpace = THREE.SRGBColorSpace;
      setTexture(made);
    };
    img.src = src;
    return () => {
      dead = true;
      made?.dispose();
    };
  }, [src, color]);
  return texture;
}

// Suelo de cada territorio: lo que lo distingue a primera vista (hormigón de Black Mesa, paneles blancos de Aperture, RED
// contra BLU, el refugio oscuro con cinta, la arena de Dust)
function makeGround(id: string, accent: string) {
  const S = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = S;
  const g = canvas.getContext("2d");
  if (g) {
    const base: Record<string, string> = {
      "half-life": "#1d1b19",
      portal: "#d7dde4",
      "counter-strike": "#b59a68",
      "left-4-dead": "#161a14",
    };
    if (id === "team-fortress") {
      g.fillStyle = "#6e2a27";
      g.fillRect(0, 0, S / 2, S);
      g.fillStyle = "#27405e";
      g.fillRect(S / 2, 0, S / 2, S);
      g.strokeStyle = "rgba(255,255,255,0.7)";
      g.lineWidth = 6;
      g.setLineDash([22, 18]);
      g.beginPath();
      g.moveTo(S / 2, 0);
      g.lineTo(S / 2, S);
      g.stroke();
      g.setLineDash([]);
    } else {
      g.fillStyle = base[id] ?? "#1d1b19";
      g.fillRect(0, 0, S, S);
    }
    // Juntas de paneles
    g.strokeStyle =
      id === "portal" ? "rgba(90,100,115,0.45)" : "rgba(0,0,0,0.35)";
    g.lineWidth = 3;
    for (let i = 0; i <= S; i += 64) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i, S);
      g.moveTo(0, i);
      g.lineTo(S, i);
      g.stroke();
    }
    // Anillo señalizado cerca del borde
    g.lineWidth = id === "half-life" || id === "left-4-dead" ? 16 : 6;
    g.strokeStyle =
      id === "left-4-dead" ? "#d8b52a" : id === "portal" ? "#9aa5b2" : accent;
    if (id === "half-life" || id === "left-4-dead") g.setLineDash([28, 28]);
    g.beginPath();
    g.arc(S / 2, S / 2, 228, 0, Math.PI * 2);
    g.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

// Superficie de la mesa: círculos concéntricos grabados, marcas de graduación y puntos cardinales, como un mapa de mando
function makeTable() {
  const S = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = S;
  const g = canvas.getContext("2d");
  if (g) {
    const c = S / 2;
    const base = g.createRadialGradient(c, c, 40, c, c, c);
    base.addColorStop(0, "#161a24");
    base.addColorStop(1, "#090b11");
    g.fillStyle = base;
    g.fillRect(0, 0, S, S);
    g.strokeStyle = "rgba(160,175,200,0.22)";
    for (const [r, w] of [
      [500, 4],
      [452, 1.5],
      [330, 1.5],
      [210, 1.5],
      [90, 1.5],
    ] as const) {
      g.lineWidth = w;
      g.beginPath();
      g.arc(c, c, r, 0, Math.PI * 2);
      g.stroke();
    }
    for (let i = 0; i < 120; i += 1) {
      const a = (i / 120) * Math.PI * 2;
      const long = i % 10 === 0;
      const r1 = long ? 452 : 470;
      g.lineWidth = long ? 3 : 1.5;
      g.strokeStyle = long ? "rgba(200,210,230,0.55)" : "rgba(160,175,200,0.3)";
      g.beginPath();
      g.moveTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1);
      g.lineTo(c + Math.cos(a) * 498, c + Math.sin(a) * 498);
      g.stroke();
    }
    g.fillStyle = "rgba(200,210,230,0.6)";
    g.font = "bold 34px monospace";
    g.textAlign = "center";
    g.textBaseline = "middle";
    for (const [label, a] of [
      ["N", -Math.PI / 2],
      ["E", 0],
      ["S", Math.PI / 2],
      ["O", Math.PI],
    ] as const) {
      g.fillText(label, c + Math.cos(a) * 418, c + Math.sin(a) * 418);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

// Cielo: degradado oscuro en una esfera que rodea la parada (se ve por dentro) para que no se asome el pasillo
function makeSky() {
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 256;
  const g = canvas.getContext("2d");
  if (g) {
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#04050a");
    grad.addColorStop(0.45, "#0a0c15");
    grad.addColorStop(0.55, "#0e1220");
    grad.addColorStop(1, "#06070c");
    g.fillStyle = grad;
    g.fillRect(0, 0, 8, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const NEBULAS: {
  pos: [number, number, number];
  scale: number;
  base: string;
}[] = [
  { pos: [-5, 2.5, -9], scale: 16, base: "#243a78" },
  { pos: [9, 0, -10], scale: 18, base: "#4a2468" },
  { pos: [2, 5, -12], scale: 14, base: "#1f4f66" },
];

// Fondo vivo: cielo, estrellas con paralaje alrededor de la mesa y tres nebulosas que toman el color del territorio activo
function Cosmos({
  glow,
  accent,
  reduced,
}: {
  glow: THREE.Texture;
  accent: string | null;
  reduced: boolean;
}) {
  const sky = useMemo(() => makeSky(), []);
  const stars = useRef<THREE.Group>(null);
  const mats = useRef<(THREE.SpriteMaterial | null)[]>([]);
  const positions = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i += 1) {
      const u = hashN(i * 3 + 1) * 2 - 1;
      const a = hashN(i * 3 + 2) * Math.PI * 2;
      const r = 10 + hashN(i * 3 + 3) * 6;
      const s = Math.sqrt(1 - u * u);
      arr[i * 3] = Math.cos(a) * s * r;
      arr[i * 3 + 1] = u * r;
      arr[i * 3 + 2] = Math.sin(a) * s * r;
    }
    return arr;
  }, []);
  const colors = useMemo(
    () => ({
      bases: NEBULAS.map((n) => new THREE.Color(n.base)),
      target: new THREE.Color(),
      accent: new THREE.Color(),
    }),
    [],
  );
  useEffect(() => () => sky.dispose(), [sky]);

  useFrame((state, delta) => {
    const k = 1 - Math.exp(-(reduced ? 60 : 3) * delta);
    if (accent) colors.accent.set(accent);
    NEBULAS.forEach((_, i) => {
      const m = mats.current[i];
      if (!m) return;
      colors.target.copy(colors.bases[i]);
      if (accent) colors.target.lerp(colors.accent, 0.6);
      m.color.lerp(colors.target, k);
      m.opacity += ((accent ? 0.55 : 0.35) - m.opacity) * k;
    });
    const s = stars.current;
    if (s && !reduced) {
      s.position.x += (state.pointer.x * -0.5 - s.position.x) * k;
      s.position.z += (state.pointer.y * 0.5 - s.position.z) * k;
      s.rotation.y = state.clock.elapsedTime * 0.006;
    }
  });

  return (
    <group>
      <mesh raycast={() => null} renderOrder={-10}>
        <sphereGeometry args={[17, 32, 16]} />
        <meshBasicMaterial map={sky} side={THREE.BackSide} toneMapped={false} />
      </mesh>
      {NEBULAS.map((n, i) => (
        <sprite
          key={i}
          position={n.pos}
          scale={[n.scale, n.scale, 1]}
          raycast={() => null}
        >
          <spriteMaterial
            ref={(m) => {
              mats.current[i] = m;
            }}
            map={glow}
            color={n.base}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </sprite>
      ))}
      <group ref={stars}>
        <points raycast={() => null}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color="#cfd6ff"
            transparent
            opacity={0.85}
            sizeAttenuation
            depthWrite={false}
            toneMapped={false}
          />
        </points>
      </group>
    </group>
  );
}

// Un juego del territorio: una ficha circular con su icono de línea sobre un poste y una peana; con el territorio activo
// sube y muestra su nombre y año
function GameNode({
  game,
  fallback,
  accent,
  position,
  radius,
  hover,
  vis,
  stagger,
}: {
  game: SagaGame;
  fallback: string;
  accent: string;
  position: [number, number, number];
  radius: number;
  hover: MutableRefObject<number>;
  vis: MutableRefObject<number>;
  stagger: boolean;
}) {
  const src = game.icon?.src ?? fallback;
  const aspect = game.icon ? game.icon.width / game.icon.height : 1;
  const icon = useTinted(src, accent);
  const label = useMemo(() => makeLabel(game, accent), [game, accent]);
  const lift = useRef<THREE.Group>(null);
  const iconMat = useRef<THREE.MeshBasicMaterial>(null);
  const pillMat = useRef<THREE.MeshBasicMaterial>(null);
  const discMat = useRef<THREE.MeshBasicMaterial>(null);
  useEffect(() => () => label.dispose(), [label]);

  const post = stagger ? 0.5 : 0.22;
  useFrame(() => {
    const h = hover.current;
    if (lift.current) lift.current.position.y = post + h * 0.22;
    const v = vis.current;
    if (iconMat.current) iconMat.current.opacity = v;
    if (discMat.current) discMat.current.opacity = 0.92 * v;
    if (pillMat.current) pillMat.current.opacity = h * v;
  });

  // El icono cabe dentro del círculo de la ficha
  const side = radius * 1.5;
  const w = aspect >= 1 ? side : side * aspect;
  const h = aspect >= 1 ? side / aspect : side;
  return (
    <group position={position}>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.15, 0.19, 0.08, 24]} />
        <meshStandardMaterial
          color="#1b1e26"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.085, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.14, 0.012, 8, 32]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.08 + post / 2, 0]}>
        <cylinderGeometry args={[0.012, 0.012, post, 8]} />
        <meshStandardMaterial color="#8b8f99" metalness={0.8} roughness={0.3} />
      </mesh>
      <group ref={lift} position={[0, post, 0]}>
        <Billboard position={[0, radius + 0.08, 0]}>
          <mesh>
            <circleGeometry args={[radius, 40]} />
            <meshBasicMaterial
              ref={discMat}
              color="#0b0d12"
              transparent
              opacity={0.92}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0, 0, 0.002]}>
            <ringGeometry args={[radius * 0.92, radius, 48]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
          {icon && (
            <mesh position={[0, 0, 0.004]}>
              <planeGeometry args={[w, h]} />
              <meshBasicMaterial
                ref={iconMat}
                map={icon}
                transparent
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          )}
          <mesh position={[0, radius + 0.3, 0.01]} renderOrder={10}>
            <planeGeometry args={[1.0, 0.35]} />
            <meshBasicMaterial
              ref={pillMat}
              map={label}
              transparent
              opacity={0}
              depthTest={false}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
      </group>
    </group>
  );
}

type StageMap = {
  color: THREE.CanvasTexture;
  depth: THREE.CanvasTexture;
  name: string;
};
type Ctx = CanvasRenderingContext2D;
// Un mapa del escenario: una captura real o un esquema dibujado (color y relieve a la vez)
type StageSource = {
  name: string;
  src?: string;
  draw?: (g: Ctx, d: Ctx, S: number) => void;
};

const level = (v: number) => {
  const c = Math.round(Math.max(0, Math.min(1, v)) * 255);
  return `rgb(${c},${c},${c})`;
};

// Rectángulo con su color y su altura (0 hondo, 1 alto)
function block(
  g: Ctx,
  d: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  lift: number,
) {
  g.fillStyle = color;
  g.fillRect(x, y, w, h);
  d.fillStyle = level(lift);
  d.fillRect(x, y, w, h);
}
function disc(
  g: Ctx,
  d: Ctx,
  x: number,
  y: number,
  r: number,
  color: string,
  lift: number,
) {
  for (const [ctx, fill] of [
    [g, color],
    [d, level(lift)],
  ] as const) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}
function ground(g: Ctx, d: Ctx, S: number, color: string, lift: number) {
  block(g, d, 0, 0, S, S, color, lift);
}
function letter(g: Ctx, text: string, x: number, y: number, color: string) {
  g.fillStyle = color;
  g.font = "bold 44px system-ui, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, x, y);
}

// Esquemas de mapa de cada universo sin capturas propias: planos con muros en relieve, no reproducciones fieles
function schematics(id: string): StageSource[] {
  if (id === "portal") {
    return [
      {
        name: "Cámara de pruebas (esquema)",
        draw: (g, d, S) => {
          ground(g, d, S, "#d9dee6", 0.25);
          g.strokeStyle = "rgba(120,130,145,0.5)";
          for (let i = 0; i <= S; i += S / 8) {
            g.beginPath();
            g.moveTo(i, 0);
            g.lineTo(i, S);
            g.moveTo(0, i);
            g.lineTo(S, i);
            g.stroke();
          }
          const t = S * 0.04;
          block(g, d, 0, 0, S, t, "#aab3bf", 0.95);
          block(g, d, 0, S - t, S, t, "#aab3bf", 0.95);
          block(g, d, 0, 0, t, S, "#aab3bf", 0.95);
          block(g, d, S - t, 0, t, S, "#aab3bf", 0.95);
          block(g, d, S * 0.5 - t / 2, 0, t, S * 0.52, "#aab3bf", 0.95);
          block(g, d, S * 0.5 - t / 2, S * 0.72, t, S * 0.28, "#aab3bf", 0.95);
          disc(g, d, S * 0.1, S * 0.3, S * 0.07, "#ff9a1f", 0.25);
          disc(g, d, S * 0.9, S * 0.7, S * 0.07, "#56c8ff", 0.25);
          disc(g, d, S * 0.3, S * 0.8, S * 0.05, "#c0392b", 0.4);
          block(g, d, S * 0.68, S * 0.18, S * 0.08, S * 0.08, "#b8c0ca", 0.65);
        },
      },
      {
        name: "Pasarelas y pozo de gel (esquema)",
        draw: (g, d, S) => {
          ground(g, d, S, "#cfd6df", 0.2);
          disc(g, d, S * 0.5, S * 0.5, S * 0.22, "#2e8f95", 0.0);
          block(g, d, S * 0.05, S * 0.1, S * 0.3, S * 0.12, "#e8ecf0", 0.55);
          block(g, d, S * 0.65, S * 0.78, S * 0.3, S * 0.12, "#e8ecf0", 0.55);
          block(g, d, S * 0.44, S * 0.04, S * 0.12, S * 0.3, "#e8ecf0", 0.7);
          block(g, d, S * 0.44, S * 0.66, S * 0.12, S * 0.3, "#e8ecf0", 0.7);
          disc(g, d, S * 0.15, S * 0.82, S * 0.06, "#ff9a1f", 0.2);
          disc(g, d, S * 0.85, S * 0.18, S * 0.06, "#56c8ff", 0.2);
        },
      },
    ];
  }
  if (id === "team-fortress") {
    return [
      {
        name: "2Fort (esquema)",
        draw: (g, d, S) => {
          ground(g, d, S, "#8a7a58", 0.3);
          block(g, d, S * 0.4, 0, S * 0.2, S, "#3b6fb5", 0.02);
          block(g, d, S * 0.04, S * 0.26, S * 0.28, S * 0.48, "#b8312b", 0.85);
          block(g, d, S * 0.09, S * 0.33, S * 0.18, S * 0.34, "#7a2420", 0.5);
          block(g, d, S * 0.68, S * 0.26, S * 0.28, S * 0.48, "#3b6fb5", 0.85);
          block(g, d, S * 0.73, S * 0.33, S * 0.18, S * 0.34, "#244c80", 0.5);
          block(g, d, S * 0.36, S * 0.46, S * 0.28, S * 0.08, "#6a5a48", 0.4);
          disc(g, d, S * 0.18, S * 0.5, S * 0.03, "#ffd9a0", 0.9);
          disc(g, d, S * 0.82, S * 0.5, S * 0.03, "#ffd9a0", 0.9);
        },
      },
      {
        name: "Dustbowl (esquema)",
        draw: (g, d, S) => {
          const bands = ["#a88f5e", "#9c8458", "#8f7a52", "#806c48", "#6e5e3e"];
          bands.forEach((color, i) => {
            block(g, d, (S * i) / 5, 0, S / 5 + 1, S, color, 0.15 + i * 0.18);
          });
          [0.1, 0.5, 0.88].forEach((x, i) => {
            disc(
              g,
              d,
              S * x,
              S * (0.35 + (i % 2) * 0.3),
              S * 0.045,
              i === 2 ? "#3b6fb5" : "#b8312b",
              0.2 + x * 0.7,
            );
          });
        },
      },
    ];
  }
  if (id === "left-4-dead") {
    return [
      {
        name: "Calles y refugio (esquema)",
        draw: (g, d, S) => {
          ground(g, d, S, "#2a2e27", 0.2);
          const cell = S / 5;
          for (let r = 0; r < 4; r += 1) {
            for (let c = 0; c < 4; c += 1) {
              const h = 0.55 + (((r * 7 + c * 3) % 5) / 5) * 0.4;
              block(
                g,
                d,
                cell * (c + 0.5) + 8,
                cell * (r + 0.5) + 8,
                cell - 16,
                cell - 16,
                "#4a4f48",
                h,
              );
            }
          }
          block(
            g,
            d,
            cell * 1.5 + 8,
            cell * 2.5 + 8,
            cell - 16,
            cell - 16,
            "#5b7a3a",
            0.95,
          );
          block(g, d, cell * 2 - 10, cell * 3.5 - 4, 20, 14, "#b3261a", 0.95);
          disc(g, d, S * 0.9, S * 0.1, S * 0.03, "#8db03c", 0.3);
          disc(g, d, S * 0.08, S * 0.92, S * 0.03, "#8db03c", 0.3);
        },
      },
      {
        name: "Puente y río (esquema)",
        draw: (g, d, S) => {
          ground(g, d, S, "#1d2b2b", 0.0);
          block(g, d, S * 0.44, 0, S * 0.12, S, "#555a55", 0.45);
          block(g, d, 0, S * 0.45, S * 0.2, S * 0.1, "#3a3d38", 0.3);
          block(g, d, S * 0.8, S * 0.45, S * 0.2, S * 0.1, "#3a3d38", 0.3);
          for (let i = 0; i < 6; i += 1) {
            block(
              g,
              d,
              S * (0.455 + (i % 2) * 0.05),
              S * (0.08 + i * 0.15),
              S * 0.04,
              S * 0.07,
              "#8a8f89",
              0.6,
            );
          }
          disc(g, d, S * 0.5, S * 0.92, S * 0.05, "#d8b52a", 0.5);
        },
      },
    ];
  }
  if (id === "counter-strike") {
    return [
      {
        name: "Dust (esquema)",
        draw: (g, d, S) => {
          ground(g, d, S, "#c4a36d", 0.25);
          const wallColor = "#8e7547";
          block(g, d, S * 0.3, S * 0.1, S * 0.04, S * 0.5, wallColor, 0.9);
          block(g, d, S * 0.62, S * 0.3, S * 0.04, S * 0.6, wallColor, 0.9);
          block(g, d, S * 0.1, S * 0.45, S * 0.3, S * 0.05, wallColor, 0.9);
          block(g, d, S * 0.48, S * 0.62, S * 0.3, S * 0.05, wallColor, 0.9);
          block(g, d, S * 0.76, S * 0.06, S * 0.2, S * 0.05, wallColor, 0.9);
          disc(g, d, S * 0.78, S * 0.26, S * 0.09, "#cf8a3c", 0.12);
          letter(g, "A", S * 0.78, S * 0.26, "#fff4dd");
          disc(g, d, S * 0.18, S * 0.22, S * 0.09, "#cf8a3c", 0.12);
          letter(g, "B", S * 0.18, S * 0.22, "#fff4dd");
          block(g, d, S * 0.35, S * 0.88, S * 0.3, S * 0.08, "#b88e4a", 0.35);
        },
      },
      {
        name: "Oficinas (esquema)",
        draw: (g, d, S) => {
          ground(g, d, S, "#b9ad92", 0.25);
          const t = S * 0.03;
          block(g, d, 0, 0, S, t, "#7b715c", 0.95);
          block(g, d, 0, S - t, S, t, "#7b715c", 0.95);
          block(g, d, 0, 0, t, S, "#7b715c", 0.95);
          block(g, d, S - t, 0, t, S, "#7b715c", 0.95);
          for (const x of [0.33, 0.66]) {
            block(g, d, S * x, 0, t, S * 0.35, "#7b715c", 0.95);
            block(g, d, S * x, S * 0.5, t, S * 0.2, "#7b715c", 0.95);
            block(g, d, S * x, S * 0.85, t, S * 0.15, "#7b715c", 0.95);
          }
          block(g, d, 0, S * 0.5, S * 0.3, t, "#7b715c", 0.95);
          block(g, d, S * 0.7, S * 0.4, S * 0.3, t, "#7b715c", 0.95);
          disc(g, d, S * 0.15, S * 0.25, S * 0.07, "#cf8a3c", 0.12);
          letter(g, "A", S * 0.15, S * 0.25, "#fff4dd");
          disc(g, d, S * 0.85, S * 0.75, S * 0.07, "#cf8a3c", 0.12);
          letter(g, "B", S * 0.85, S * 0.75, "#fff4dd");
        },
      },
    ];
  }
  return [];
}

// Cada fuente se convierte en color y relieve: una captura se recorta a cuadrado y su luminosidad, suavizada, hace de altura
function useStageMaps(id: string, maps: { name: string; src: string }[]) {
  const [loaded, setLoaded] = useState<StageMap[]>([]);
  useEffect(() => {
    let dead = false;
    let made: StageMap[] = [];
    const S = 384;
    const sources: StageSource[] =
      maps.length > 0
        ? maps.map((m) => ({ name: m.name, src: m.src }))
        : schematics(id);
    const finish = (
      name: string,
      color: HTMLCanvasElement,
      depth: HTMLCanvasElement,
    ) => {
      const c = new THREE.CanvasTexture(color);
      c.colorSpace = THREE.SRGBColorSpace;
      c.anisotropy = 8;
      return { color: c, depth: new THREE.CanvasTexture(depth), name };
    };
    Promise.all(
      sources.map(
        (source) =>
          new Promise<StageMap | null>((resolve) => {
            const color = document.createElement("canvas");
            color.width = color.height = S;
            const g = color.getContext("2d");
            const depth = document.createElement("canvas");
            depth.width = depth.height = S;
            const dg = depth.getContext("2d");
            if (!g || !dg) {
              resolve(null);
              return;
            }
            if (source.draw) {
              source.draw(g, dg, S);
              resolve(finish(source.name, color, depth));
              return;
            }
            const img = new Image();
            img.onload = () => {
              const side = Math.min(img.width, img.height);
              g.drawImage(
                img,
                (img.width - side) / 2,
                (img.height - side) / 2,
                side,
                side,
                0,
                0,
                S,
                S,
              );
              dg.filter = "grayscale(1) blur(3px) contrast(1.5)";
              dg.drawImage(color, 0, 0);
              resolve(finish(source.name, color, depth));
            };
            img.onerror = () => resolve(null);
            img.src = `/_next/image?url=${encodeURIComponent(source.src ?? "")}&w=384&q=75`;
          }),
      ),
    ).then((list) => {
      const ok = list.filter((item): item is StageMap => item !== null);
      if (dead) {
        ok.forEach((item) => {
          item.color.dispose();
          item.depth.dispose();
        });
        return;
      }
      made = ok;
      setLoaded(ok);
    });
    return () => {
      dead = true;
      made.forEach((item) => {
        item.color.dispose();
        item.depth.dispose();
      });
    };
  }, [id, maps]);
  return loaded;
}

// Máscara circular para recortar el terreno cuadrado
function makeCircleMask() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#000";
    g.fillRect(0, 0, 128, 128);
    g.fillStyle = "#fff";
    g.beginPath();
    g.arc(64, 64, 62, 0, Math.PI * 2);
    g.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

// Rótulo con el nombre del mapa que se está viendo
function makeMapName(name: string, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#e6e9f0";
    g.font = "600 30px system-ui, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.shadowColor = "rgba(0,0,0,0.9)";
    g.shadowBlur = 10;
    g.fillText(name.length > 34 ? `${name.slice(0, 33)}…` : name, 256, 34);
    g.fillStyle = accent;
    g.fillRect(206, 56, 100, 3);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// El suelo del territorio es una maqueta en relieve de los mapas del universo: gira como un plato y, cada pocos segundos,
// se aplana, cambia de mapa y vuelve a subir
function MapStage({
  id,
  maps,
  R,
  accent,
  hover,
  reduced,
  stage,
}: {
  id: string;
  maps: { name: string; src: string }[];
  R: number;
  accent: string;
  hover: MutableRefObject<number>;
  reduced: boolean;
  // Mapa que fija la escena en curso; sin él, el escenario cambia solo
  stage?: number;
}) {
  const loaded = useStageMaps(id, maps);
  const [index, setIndex] = useState(0);
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const nameMat = useRef<THREE.MeshBasicMaterial>(null);
  const phase = useRef({
    t0: 0,
    factor: 1,
    step: "idle" as "idle" | "down" | "up",
  });
  const mask = useMemo(() => makeCircleMask(), []);
  const cur = loaded[index % Math.max(loaded.length, 1)];
  const nameTexture = useMemo(
    () => (cur ? makeMapName(cur.name, accent) : null),
    [cur, accent],
  );
  useEffect(() => () => mask.dispose(), [mask]);
  useEffect(() => () => nameTexture?.dispose(), [nameTexture]);

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m || !mesh.current) return;
    const t = state.clock.elapsedTime;
    const s = phase.current;
    const goal =
      stage === undefined ? null : stage % Math.max(loaded.length, 1);
    if (reduced && goal !== null && goal !== index) setIndex(goal);
    if (!reduced && loaded.length > 1) {
      if (s.step === "idle" && goal === null && t - s.t0 > 6.5) s.step = "down";
      if (s.step === "idle" && goal !== null && goal !== index) s.step = "down";
      if (s.step === "down") {
        s.factor = Math.max(0, s.factor - delta * 2.2);
        if (s.factor === 0) {
          setIndex((value) => goal ?? (value + 1) % loaded.length);
          s.step = "up";
        }
      } else if (s.step === "up") {
        s.factor = Math.min(1, s.factor + delta * 1.6);
        if (s.factor === 1) {
          s.step = "idle";
          s.t0 = t;
        }
      }
    }
    m.displacementScale = (0.02 + 0.11 * s.factor) * (1 + hover.current * 0.7);
    if (!reduced)
      mesh.current.rotation.z += delta * (0.12 + hover.current * 0.4);
  });

  if (!cur) return null;
  return (
    <>
      <mesh
        ref={mesh}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.064, 0]}
        raycast={() => null}
      >
        <planeGeometry args={[R * 1.97, R * 1.97, 96, 96]} />
        <meshStandardMaterial
          ref={mat}
          map={cur.color}
          displacementMap={cur.depth}
          displacementScale={0.13}
          displacementBias={-0.01}
          alphaMap={mask}
          alphaTest={0.5}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>
      {nameTexture && (
        <Billboard position={[0, 0.16, R + 0.72]}>
          <mesh raycast={() => null}>
            <planeGeometry args={[R * 1.6, R * 0.2]} />
            <meshBasicMaterial
              ref={nameMat}
              map={nameTexture}
              transparent
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
      )}
    </>
  );
}

function Territory({
  saga,
  glow,
  spot,
  reduced,
  selected,
  dim,
  onTap,
  onHover,
}: {
  saga: SagaWorldData;
  glow: THREE.Texture;
  spot: Spot;
  reduced: boolean;
  // Elegido con un toque: en táctil abre el territorio sin entrar todavía
  selected: boolean;
  // Otro territorio está activo: este baja su brillo
  dim: boolean;
  onTap: (slug: string) => void;
  onHover: (slug: string | null) => void;
}) {
  const R = spot.r;
  const inner = useRef<THREE.Group>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  const hover = useRef(0);
  const target = useRef(0);
  const vis = useRef(1);
  // Escenas guionizadas del universo (si las tiene): cada una dura lo suyo y se pasa a la siguiente en bucle
  const scenes = SCENES[saga.id];
  const [sceneIndex, setSceneIndex] = useState(0);
  useEffect(() => {
    if (!scenes || reduced) return;
    const id = window.setTimeout(
      () => setSceneIndex((value) => (value + 1) % scenes.length),
      scenes[sceneIndex % scenes.length].duration * 1000,
    );
    return () => window.clearTimeout(id);
  }, [scenes, sceneIndex, reduced]);
  const frame = useRef(0);
  const ground = useMemo(
    () => makeGround(saga.id, saga.accent),
    [saga.id, saga.accent],
  );
  const nameMap = useMemo(
    () => makeName(saga.name, saga.accent),
    [saga.name, saga.accent],
  );
  const count = saga.games.length;
  const tokenRadius = Math.min(R * 0.17, 0.27);

  useEffect(
    () => () => {
      ground.dispose();
      nameMap.dispose();
      document.body.style.cursor = "";
    },
    [ground, nameMap],
  );

  useFrame((state, delta) => {
    hover.current +=
      ((target.current || (selected ? 1 : 0)) - hover.current) *
      (1 - Math.exp(-8 * delta));
    const h = hover.current;
    const fade = 1 - Math.exp(-6 * delta);
    vis.current += ((dim ? 0.4 : 1) - vis.current) * fade;
    const t = reduced ? 0 : state.clock.elapsedTime;
    if (inner.current) {
      inner.current.position.y = h * 0.2 + Math.sin(t * 0.8 + spot.x) * 0.02;
      // Lo visible se levanta, pero solo la zona fija de abajo recibe el cursor; se repasa de vez en cuando porque el
      // emblema y los iconos cargan después
      frame.current += 1;
      if (frame.current % 30 === 1) {
        inner.current.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
            object.raycast = () => null;
          }
        });
      }
    }
    if (ringMat.current)
      ringMat.current.opacity +=
        ((dim ? 0.3 : 0.7) + h * 0.3 - ringMat.current.opacity) * fade;
    if (glowMat.current)
      glowMat.current.opacity +=
        ((dim ? 0.12 : 0.3) + h * 0.35 - glowMat.current.opacity) * fade;
  });

  // Los juegos, repartidos por un anillo alrededor del centro; con muchos, las placas se escalonan en altura
  const ringRadius = R * 0.87;

  return (
    <group
      position={[spot.x, 0, spot.z]}
      onPointerOver={() => {
        target.current = 1;
        onHover(saga.slug);
      }}
      onPointerOut={() => {
        target.current = 0;
        onHover(null);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onTap(saga.slug);
      }}
    >
      {/* Zona de cursor fija: no se mueve con el territorio */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <circleGeometry args={[R * 1.12, 40]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* Resplandor del color de la saga sobre la mesa */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        raycast={() => null}
      >
        <planeGeometry args={[R * 3.6, R * 3.6]} />
        <meshBasicMaterial
          ref={glowMat}
          map={glow}
          color={saga.accent}
          transparent
          opacity={0.3}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <group ref={inner}>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[R, R * 1.04, 0.06, 56]} />
          <meshStandardMaterial
            color="#14161c"
            metalness={0.6}
            roughness={0.5}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.062, 0]}>
          <circleGeometry args={[R * 0.985, 56]} />
          <meshStandardMaterial map={ground} roughness={0.85} />
        </mesh>
        <MapStage
          id={saga.id}
          maps={saga.maps ?? []}
          R={R}
          accent={saga.accent}
          hover={hover}
          reduced={reduced}
          stage={scenes?.[sceneIndex % scenes.length].stage}
        />
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.065, 0]}>
          <torusGeometry args={[R, 0.03, 8, 80]} />
          <meshBasicMaterial
            ref={ringMat}
            color={saga.accent}
            transparent
            opacity={0.7}
            toneMapped={false}
          />
        </mesh>
        {/* Escaramuza en miniatura en la parte delantera del territorio */}
        <group
          position={[0, 0.062, scenes ? 0 : 0.3 * (R / 1.45)]}
          scale={scenes ? R * 0.92 : (R / 1.45) * 1.45}
        >
          {scenes ? (
            <SceneAction scenes={scenes} index={sceneIndex} reduced={reduced} />
          ) : (
            <Action id={saga.id} reduced={reduced} />
          )}
        </group>
        {/* Haz holográfico del emblema y luz de color sobre el territorio */}
        <mesh position={[0, 0.062 + R * 0.45, 0]} raycast={() => null}>
          <cylinderGeometry args={[0.02, R * 0.3, R * 0.9, 24, 1, true]} />
          <meshBasicMaterial
            color={saga.accent}
            transparent
            opacity={0.07}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <pointLight
          position={[0, 1.3, 0.3]}
          intensity={1.6}
          distance={4}
          color={saga.accent}
        />
        {/* Emblema de la saga flotando sobre el centro */}
        <Billboard position={[0, R * 0.55, -R * 1.05]}>
          <Emblem src={saga.emblem} color="#ffffff" size={R * 0.7} depthTest />
        </Billboard>
        {saga.games.map((game, i) => {
          const ang = (i / count) * Math.PI * 2 - Math.PI / 2;
          return (
            <GameNode
              key={game.name}
              game={game}
              fallback={saga.emblem}
              accent={saga.accent}
              position={[
                Math.cos(ang) * ringRadius,
                0.06,
                Math.sin(ang) * ringRadius,
              ]}
              radius={tokenRadius}
              hover={hover}
              vis={vis}
              stagger={count > 5 && i % 2 === 1}
            />
          );
        })}
      </group>
      {/* Rótulo fijo del territorio, en el borde delantero de la mesa */}
      <Billboard position={[0, 0.16, R + 0.42]}>
        <mesh raycast={() => null}>
          <planeGeometry args={[R * 1.9, R * 0.36]} />
          <meshBasicMaterial
            map={nameMap}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

export function SagasStop({
  sagas,
  glow,
  portrait,
  reduced,
  onOpen,
}: {
  sagas: SagaWorldData[];
  glow: THREE.Texture;
  portrait: boolean;
  reduced: boolean;
  onOpen: (slug: string) => void;
}) {
  const layout = mapLayout(portrait);
  const tableMap = useMemo(() => makeTable(), []);
  useEffect(() => () => tableMap.dispose(), [tableMap]);
  // Centro de la mesa: en vertical los territorios se reparten alrededor de x = 0
  const tx = portrait ? 0 : 3.4;
  const tz = portrait ? -0.9 : -0.3;
  const fallbackSpots = Object.values(layout.spots);
  // En táctil no hay hover: un primer toque abre el territorio y el segundo entra a su universo
  const [picked, setPicked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const tap = (slug: string) => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (touch && picked !== slug) setPicked(slug);
    else onOpen(slug);
  };
  // Territorio activo: el que está bajo el cursor o, en táctil, el elegido con el primer toque
  const key = hovered ?? picked;
  const active = sagas.find((s) => s.slug === key || s.id === key) ?? null;
  const activeSpot = active
    ? (layout.spots[active.id] ?? fallbackSpots[sagas.indexOf(active)])
    : null;

  // La cámara de la escena se acerca al territorio activo
  const focusX = activeSpot?.x ?? 0;
  const focusZ = activeSpot?.z ?? 0;
  const hasActive = activeSpot !== null;
  useEffect(() => {
    if (hasActive) {
      mapFocus.x = focusX;
      mapFocus.z = focusZ;
    }
    mapFocus.target = hasActive ? 1 : 0;
  }, [hasActive, focusX, focusZ]);
  useEffect(
    () => () => {
      mapFocus.target = 0;
    },
    [],
  );

  return (
    <group>
      {/* Cielo, estrellas y nebulosas alrededor de la mesa, teñidos por el territorio activo */}
      <Cosmos
        glow={glow}
        accent={active ? active.accent : null}
        reduced={reduced}
      />
      {/* La mesa-mapa: tablero grabado con borde y grosor de metal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[tx, -0.04, tz]}>
        <circleGeometry args={[portrait ? 5.4 : 8.6, 96]} />
        <meshStandardMaterial map={tableMap} roughness={0.55} metalness={0.5} />
      </mesh>
      <mesh position={[tx, -0.34, tz]}>
        <cylinderGeometry
          args={[
            (portrait ? 5.4 : 8.6) + 0.12,
            (portrait ? 5.4 : 8.6) + 0.3,
            0.6,
            96,
          ]}
        />
        <meshStandardMaterial color="#12141b" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[tx, -0.02, tz]}>
        <torusGeometry args={[(portrait ? 5.4 : 8.6) + 0.1, 0.06, 10, 128]} />
        <meshStandardMaterial color="#59606f" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Luz cenital sobre la mesa */}
      <pointLight
        position={[tx, 7, tz + 1.3]}
        intensity={80}
        distance={24}
        color="#dfe8ff"
      />
      {sagas.map((saga, i) => (
        <Territory
          key={saga.id}
          saga={saga}
          glow={glow}
          spot={
            layout.spots[saga.id] ?? fallbackSpots[i % fallbackSpots.length]
          }
          reduced={reduced}
          selected={picked === saga.id || picked === saga.slug}
          dim={active !== null && active.id !== saga.id}
          onTap={tap}
          onHover={setHovered}
        />
      ))}
      <Sparkles />
    </group>
  );
}
