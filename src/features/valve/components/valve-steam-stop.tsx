"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { hash } from "./valve-parts";
import { Sparkles, STEAM_PATH } from "./valve-props";

// Parada 4 · Steam: tres épocas, tres iconos. Se turnan al frente solos (o al pulsarlos) y con cada cambio el panel del fondo,
// las luces y la tipografía del texto toman los colores de esa época. Los colores salen de la tabla de épocas de globals.css
// (--steam-*): aquí se repiten porque la escena no lee variables CSS

export type SteamEraStyle = {
  id: "origins" | "platform" | "unified";
  bg: string;
  accent: string;
};

export const STEAM_ERA_STYLES: SteamEraStyle[] = [
  { id: "origins", bg: "#3e4637", accent: "#d2c24f" },
  { id: "platform", bg: "#1b2838", accent: "#66c0f4" },
  { id: "unified", bg: "#0e141b", accent: "#1a9fff" },
];

function drawLogo(g: CanvasRenderingContext2D, size: number, color: string) {
  g.save();
  const scale = (size * 0.78) / 24;
  g.translate(size * 0.11, size * 0.11);
  g.scale(scale, scale);
  g.fillStyle = color;
  g.fill(new Path2D(STEAM_PATH));
  g.restore();
}

// El icono de cada época: 2003 placa cuadrada verde oliva con el logo dorado, 2010 disco azul noche con el logo claro y 2022
// disco azul vivo plano con el logo blanco
function makeBadge(id: SteamEraStyle["id"]) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const g = canvas.getContext("2d");
  if (g) {
    if (id === "origins") {
      const grad = g.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, "#5a6450");
      grad.addColorStop(1, "#2f3629");
      g.fillStyle = grad;
      g.beginPath();
      g.roundRect(14, 14, size - 28, size - 28, 70);
      g.fill();
      g.strokeStyle = "#8a9578";
      g.lineWidth = 10;
      g.stroke();
      g.strokeStyle = "#252b20";
      g.lineWidth = 4;
      g.beginPath();
      g.roundRect(34, 34, size - 68, size - 68, 56);
      g.stroke();
      drawLogo(g, size, "#d2c24f");
    } else if (id === "platform") {
      const grad = g.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, "#2a475e");
      grad.addColorStop(1, "#101a25");
      g.fillStyle = grad;
      g.beginPath();
      g.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = "#66c0f4";
      g.lineWidth = 8;
      g.stroke();
      drawLogo(g, size, "#c7d5e0");
    } else {
      const grad = g.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, "#2db0ff");
      grad.addColorStop(1, "#0a5cc2");
      g.fillStyle = grad;
      g.beginPath();
      g.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
      g.fill();
      drawLogo(g, size, "#ffffff");
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

// Trama del panel del fondo: líneas finas en diagonal
function makeHatch() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const g = canvas.getContext("2d");
  if (g) {
    g.strokeStyle = "rgba(255,255,255,0.07)";
    g.lineWidth = 2;
    for (let i = -128; i < 256; i += 16) {
      g.beginPath();
      g.moveTo(i, 128);
      g.lineTo(i + 128, 0);
      g.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 6);
  return texture;
}

const YEARS = ["2003", "2010", "2022"];

function bevel(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  light: string,
  dark: string,
) {
  g.fillStyle = fill;
  g.fillRect(x, y, w, h);
  g.fillStyle = light;
  g.fillRect(x, y, w, 3);
  g.fillRect(x, y, 3, h);
  g.fillStyle = dark;
  g.fillRect(x, y + h - 3, w, 3);
  g.fillRect(x + w - 3, y, 3, h);
}

// Maqueta del cliente de cada época: solo estructura (barras, paneles, cápsulas), sin texto de juegos ni cifras
function makeWindow(id: SteamEraStyle["id"]) {
  const W = 1024;
  const H = 640;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext("2d");
  if (g) {
    if (id === "origins") {
      g.fillStyle = "#3e4637";
      g.fillRect(0, 0, W, H);
      g.fillStyle = "#2b3125";
      g.fillRect(0, 0, W, 52);
      g.fillStyle = "#d2c24f";
      g.font = "bold 26px Verdana, sans-serif";
      g.fillText("STEAM", 24, 36);
      for (let i = 0; i < 3; i += 1) {
        bevel(g, W - 120 + i * 36, 12, 28, 28, "#4a5340", "#8a9578", "#252b20");
      }
      bevel(g, 24, 76, 226, H - 100, "#4a5340", "#8a9578", "#252b20");
      for (let i = 0; i < 9; i += 1) {
        g.fillStyle = i === 2 ? "#d2c24f" : "#7a8568";
        g.fillRect(44, 104 + i * 54, 150 - (i % 3) * 24, 14);
      }
      bevel(g, 270, 76, W - 294, H - 100, "#353c2e", "#252b20", "#6a7559");
      for (let i = 0; i < 10; i += 1) {
        g.fillStyle = i % 2 ? "#3e4637" : "#454d3a";
        g.fillRect(286, 92 + i * 52, W - 326, 44);
        g.fillStyle = "#8a9578";
        g.fillRect(304, 106 + i * 52, 180 + (i % 4) * 40, 12);
        g.fillStyle = "#5a6450";
        g.fillRect(W - 220, 106 + i * 52, 150, 12);
      }
    } else if (id === "platform") {
      const bg = g.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#1b2838");
      bg.addColorStop(1, "#0f1822");
      g.fillStyle = bg;
      g.fillRect(0, 0, W, H);
      g.fillStyle = "#171a21";
      g.fillRect(0, 0, W, 72);
      for (let i = 0; i < 5; i += 1) {
        g.fillStyle = i === 1 ? "#66c0f4" : "rgba(199,213,224,0.45)";
        g.fillRect(40 + i * 150, 30, 110, 12);
      }
      for (let r = 0; r < 2; r += 1) {
        for (let c = 0; c < 4; c += 1) {
          const x = 40 + c * 238;
          const y = 112 + r * 250;
          const cap = g.createLinearGradient(x, y, x, y + 220);
          cap.addColorStop(0, "#2a475e");
          cap.addColorStop(1, "#16222f");
          g.fillStyle = cap;
          g.beginPath();
          g.roundRect(x, y, 210, 220, 8);
          g.fill();
          g.fillStyle = "#66c0f4";
          g.fillRect(x, y, 210, 5);
          g.fillStyle = "rgba(199,213,224,0.5)";
          g.fillRect(x + 16, y + 176, 120, 10);
        }
      }
    } else {
      g.fillStyle = "#0e141b";
      g.fillRect(0, 0, W, H);
      g.fillStyle = "#171d25";
      g.fillRect(0, 0, 92, H);
      for (let i = 0; i < 6; i += 1) {
        g.fillStyle = i === 1 ? "#1a9fff" : "#2b3644";
        g.beginPath();
        g.arc(46, 70 + i * 86, 22, 0, Math.PI * 2);
        g.fill();
      }
      const hero = g.createLinearGradient(124, 36, W - 36, 300);
      hero.addColorStop(0, "#1a9fff");
      hero.addColorStop(1, "#0a3f7a");
      g.fillStyle = hero;
      g.beginPath();
      g.roundRect(124, 36, W - 160, 280, 26);
      g.fill();
      g.fillStyle = "rgba(255,255,255,0.85)";
      g.beginPath();
      g.roundRect(160, 232, 190, 44, 22);
      g.fill();
      for (let c = 0; c < 4; c += 1) {
        g.fillStyle = "#1b2838";
        g.beginPath();
        g.roundRect(124 + c * 218, 350, 198, 250, 22);
        g.fill();
        g.fillStyle = "#2b3d52";
        g.beginPath();
        g.roundRect(136 + c * 218, 362, 174, 150, 16);
        g.fill();
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function makeYear(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = color;
    g.font = "bold 128px Archivo, Verdana, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.shadowColor = color;
    g.shadowBlur = 28;
    g.fillText(text, 256, 84);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Ventana del cliente de cada época y su año: las tres están superpuestas y solo se ve la de la época al frente
function EraScreens({ era, reduced }: { era: number; reduced: boolean }) {
  const windows = useMemo(
    () => STEAM_ERA_STYLES.map((style) => makeWindow(style.id)),
    [],
  );
  const years = useMemo(
    () => STEAM_ERA_STYLES.map((style, i) => makeYear(YEARS[i], style.accent)),
    [],
  );
  const winMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const yearMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  useEffect(
    () => () => {
      windows.forEach((t) => t.dispose());
      years.forEach((t) => t.dispose());
    },
    [windows, years],
  );

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-(reduced ? 60 : 4) * delta);
    for (let i = 0; i < 3; i += 1) {
      const on = i === era ? 1 : 0;
      const w = winMats.current[i];
      if (w) w.opacity += (on * 0.6 - w.opacity) * k;
      const y = yearMats.current[i];
      if (y) y.opacity += (on - y.opacity) * k;
    }
  });

  return (
    <group>
      {windows.map((map, i) => (
        <mesh key={STEAM_ERA_STYLES[i].id} position={[0, 0.15, -1.2]}>
          <planeGeometry args={[5.4, 3.4]} />
          <meshBasicMaterial
            ref={(m) => {
              winMats.current[i] = m;
            }}
            map={map}
            transparent
            opacity={i === 0 ? 0.6 : 0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
      {years.map((map, i) => (
        <mesh
          key={STEAM_ERA_STYLES[i].id}
          position={[0, -1.95, 1]}
          raycast={() => null}
        >
          <planeGeometry args={[1.8, 0.56]} />
          <meshBasicMaterial
            ref={(m) => {
              yearMats.current[i] = m;
            }}
            map={map}
            transparent
            opacity={i === 0 ? 1 : 0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

const TILES = 14;

// Cápsulas de juego que orbitan despacio alrededor de los iconos, con el color de la época
function Drifters({ era, reduced }: { era: number; reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const accents = useMemo(
    () => STEAM_ERA_STYLES.map((style) => new THREE.Color(style.accent)),
    [],
  );

  const place = (t: number) => {
    const target = mesh.current;
    if (!target) return;
    for (let i = 0; i < TILES; i += 1) {
      const a = hash(i + 3) * Math.PI * 2 + t * (0.05 + hash(i + 7) * 0.05);
      dummy.position.set(
        Math.cos(a) * (3.1 + hash(i + 11) * 0.5),
        Math.sin(a) * (1.7 + hash(i + 13) * 0.4),
        -0.9 + Math.sin(a * 2 + i) * 0.45,
      );
      dummy.rotation.set(0, Math.cos(a) * -0.5, Math.sin(t * 0.4 + i) * 0.15);
      dummy.scale.setScalar(0.7 + hash(i + 17) * 0.7);
      dummy.updateMatrix();
      target.setMatrixAt(i, dummy.matrix);
    }
    target.instanceMatrix.needsUpdate = true;
  };

  useEffect(() => {
    if (reduced) place(2);
  });

  useFrame((state, delta) => {
    if (!reduced) place(state.clock.elapsedTime);
    const k = 1 - Math.exp(-(reduced ? 60 : 3) * delta);
    material.current?.color.lerp(accents[era], k);
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, TILES]}
      raycast={() => null}
      frustumCulled={false}
    >
      <planeGeometry args={[0.34, 0.5]} />
      <meshBasicMaterial
        ref={material}
        color={STEAM_ERA_STYLES[0].accent}
        transparent
        opacity={0.32}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

const SLOTS: [number, number, number, number][] = [
  [0, 0, 0.9, 2.4],
  [2.7, -0.3, 0, 1.05],
  [-2.7, -0.3, 0, 1.05],
];

function EraBadge({
  style,
  index,
  era,
  reduced,
  onPick,
}: {
  style: SteamEraStyle;
  index: number;
  era: number;
  reduced: boolean;
  onPick: (index: number) => void;
}) {
  const map = useMemo(() => makeBadge(style.id), [style.id]);
  const group = useRef<THREE.Group>(null);
  const hover = useRef(0);
  const target = useRef(0);
  useEffect(() => () => map.dispose(), [map]);
  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const slot = SLOTS[(index - era + 3) % 3];
    const k = 1 - Math.exp(-(reduced ? 60 : 5) * delta);
    hover.current +=
      (target.current - hover.current) * (1 - Math.exp(-9 * delta));
    const t = reduced ? 0 : state.clock.elapsedTime;
    g.position.x += (slot[0] - g.position.x) * k;
    g.position.y +=
      (slot[1] + Math.sin(t * 0.9 + index * 2) * 0.1 - g.position.y) * k;
    g.position.z += (slot[2] - g.position.z) * k;
    const s = slot[3] * (1 + hover.current * 0.12);
    g.scale.setScalar(g.scale.x + (s - g.scale.x) * k);
    g.rotation.y +=
      ((slot[0] === 0 ? 0 : -Math.sign(slot[0]) * 0.5) +
        Math.sin(t * 0.6 + index) * 0.1 -
        g.rotation.y) *
      k;
  });

  const square = style.id === "origins";
  return (
    <group
      ref={group}
      onPointerOver={() => {
        target.current = 1;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        target.current = 0;
        document.body.style.cursor = "";
      }}
      onClick={(event) => {
        event.stopPropagation();
        onPick(index);
      }}
    >
      {/* Grosor del icono */}
      <mesh
        rotation={square ? [0, 0, 0] : [Math.PI / 2, 0, 0]}
        position={[0, 0, -0.06]}
      >
        {square ? (
          <boxGeometry args={[0.98, 0.98, 0.1]} />
        ) : (
          <cylinderGeometry args={[0.49, 0.49, 0.1, 40]} />
        )}
        <meshStandardMaterial
          color={style.bg}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
      {/* Aro con brillo del color de la época */}
      {square ? (
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[1.07, 1.07, 0.05]} />
          <meshStandardMaterial
            color={style.accent}
            emissive={style.accent}
            emissiveIntensity={0.7}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      ) : (
        <mesh position={[0, 0, -0.06]}>
          <torusGeometry args={[0.5, 0.03, 16, 64]} />
          <meshStandardMaterial
            color={style.accent}
            emissive={style.accent}
            emissiveIntensity={0.8}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      )}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={map} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

export function SteamStop({
  reduced,
  era,
  lastPick,
  onAuto,
  onPick,
}: {
  reduced: boolean;
  // Época al frente: la lleva el texto de la portada, que también tiene botones para elegirla
  era: number;
  // Instante de la última elección manual, para no cambiar sola justo después
  lastPick: MutableRefObject<number>;
  onAuto: (index: number) => void;
  onPick: (index: number) => void;
}) {
  const panel = useRef<THREE.MeshBasicMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const hatch = useMemo(() => makeHatch(), []);
  useEffect(() => () => hatch.dispose(), [hatch]);

  // Cambio automático cada pocos segundos, salvo justo después de elegir una a mano
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (performance.now() - lastPick.current > 7000) onAuto((era + 1) % 3);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced, era, lastPick, onAuto]);

  const colors = useMemo(
    () =>
      STEAM_ERA_STYLES.map((style) => ({
        bg: new THREE.Color(style.bg),
        accent: new THREE.Color(style.accent),
      })),
    [],
  );

  const root = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const k = 1 - Math.exp(-(reduced ? 60 : 3) * delta);
    panel.current?.color.lerp(colors[era].bg, k);
    light.current?.color.lerp(colors[era].accent, k);
    // Todo el conjunto se inclina un poco hacia el cursor
    const g = root.current;
    if (g && !reduced) {
      const m = 1 - Math.exp(-4 * delta);
      g.rotation.y += (state.pointer.x * 0.14 - g.rotation.y) * m;
      g.rotation.x += (-state.pointer.y * 0.08 - g.rotation.x) * m;
    }
  });

  return (
    <group ref={root}>
      {/* Panel del fondo: cambia de color y de trama con la época */}
      <mesh position={[0, 0, -1.8]}>
        <planeGeometry args={[7.6, 5]} />
        <meshBasicMaterial
          ref={panel}
          color={STEAM_ERA_STYLES[0].bg}
          transparent
          opacity={0.82}
        />
      </mesh>
      <mesh position={[0, 0, -1.79]}>
        <planeGeometry args={[7.6, 5]} />
        <meshBasicMaterial map={hatch} transparent depthWrite={false} />
      </mesh>
      <EraScreens era={era} reduced={reduced} />
      <Drifters era={era} reduced={reduced} />
      {STEAM_ERA_STYLES.map((style, i) => (
        <EraBadge
          key={style.id}
          style={style}
          index={i}
          era={era}
          reduced={reduced}
          onPick={onPick}
        />
      ))}
      <Sparkles />
      <pointLight
        ref={light}
        position={[0, 0.5, 3]}
        intensity={16}
        distance={10}
        color={STEAM_ERA_STYLES[0].accent}
      />
      <pointLight
        position={[-3, 2, 3]}
        intensity={6}
        distance={9}
        color="#ffffff"
      />
    </group>
  );
}
