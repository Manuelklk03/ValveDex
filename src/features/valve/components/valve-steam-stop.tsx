"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
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

const SLOTS: [number, number, number, number][] = [
  [0, 0, 0.9, 2.4],
  [3.1, -0.3, -0.5, 1.15],
  [-3.1, -0.3, -0.5, 1.15],
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

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-(reduced ? 60 : 3) * delta);
    panel.current?.color.lerp(colors[era].bg, k);
    light.current?.color.lerp(colors[era].accent, k);
  });

  return (
    <group>
      {/* Panel del fondo: cambia de color y de trama con la época */}
      <mesh position={[0, 0, -2.2]}>
        <planeGeometry args={[11, 6.2]} />
        <meshBasicMaterial
          ref={panel}
          color={STEAM_ERA_STYLES[0].bg}
          transparent
          opacity={0.82}
        />
      </mesh>
      <mesh position={[0, 0, -2.19]}>
        <planeGeometry args={[11, 6.2]} />
        <meshBasicMaterial map={hatch} transparent depthWrite={false} />
      </mesh>
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
