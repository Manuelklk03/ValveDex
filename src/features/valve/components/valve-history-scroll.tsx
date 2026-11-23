"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Emblem } from "@/components/ui/space-parts";
import { hash } from "./valve-parts";
import {
  Crowbar,
  Crt,
  Floppy,
  Gears,
  Sparkles,
  SteamBadge,
  VrHeadset,
  ValveBadge,
} from "./valve-props";

// Un párrafo de la historia: el año y su texto
export type HistoryLine = { year: string; text: string };

type HistoryScrollProps = {
  lines: HistoryLine[];
  // El pergamino solo se escribe mientras es la parada activa
  active: boolean;
  reduced: boolean;
  // Aviso de qué párrafo se está escribiendo (-1 al reiniciarse), para sacar las tarjetas de sus menciones
  onLine: (index: number) => void;
  // Emblema de Half-Life para el objeto flotante; sin él, no hay lambda
  lambdaSrc?: string;
};

const W = 1024;
const H = 1536;
const MARGIN = 96;
const LINE_HEIGHT = 68;
const FIRST_LINE_Y = 250;
const MAX_LINES = Math.floor((H - FIRST_LINE_Y - 150) / LINE_HEIGHT);
// Letras por segundo al escribir
const SPEED = 45;

// Parte un párrafo en líneas que caben en el ancho del pergamino
function wrap(g: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(" ")) {
    const next = current ? `${current} ${word}` : word;
    if (g.measureText(next).width > width && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Papel envejecido con manchas fijas y los bordes oscurecidos
function paintPaper(g: CanvasRenderingContext2D) {
  const base = g.createLinearGradient(0, 0, 0, H);
  base.addColorStop(0, "#e6d6b0");
  base.addColorStop(1, "#cdb98a");
  g.fillStyle = base;
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 40; i += 1) {
    const x = hash(i + 5) * W;
    const y = hash(i + 55) * H;
    const r = 40 + hash(i + 95) * 120;
    const stain = g.createRadialGradient(x, y, 0, x, y, r);
    stain.addColorStop(0, "rgba(120,80,30,0.12)");
    stain.addColorStop(1, "rgba(120,80,30,0)");
    g.fillStyle = stain;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const edge = g.createRadialGradient(
    W / 2,
    H / 2,
    H * 0.3,
    W / 2,
    H / 2,
    H * 0.75,
  );
  edge.addColorStop(0, "rgba(60,35,10,0)");
  edge.addColorStop(1, "rgba(60,35,10,0.45)");
  g.fillStyle = edge;
  g.fillRect(0, 0, W, H);
}

// Dibuja el pergamino con las primeras `chars` letras escritas. Devuelve el párrafo que se está escribiendo
function draw(
  g: CanvasRenderingContext2D,
  lines: HistoryLine[],
  chars: number,
  paper: HTMLCanvasElement,
  cursor: boolean,
): number {
  // El papel se pinta una sola vez (en paper) y aquí solo se copia: lo caro no se repite con cada letra
  g.drawImage(paper, 0, 0);
  g.textBaseline = "alphabetic";
  g.fillStyle = "#3a2410";
  g.textAlign = "center";
  g.font = "bold 46px Georgia, 'Times New Roman', serif";
  g.fillText("HISTORIA DE VALVE", W / 2, 130);
  g.fillStyle = "#7a1f12";
  g.fillRect(MARGIN, 160, W - MARGIN * 2, 4);
  g.textAlign = "left";

  type Row = { year?: string; text: string };
  const rows: Row[] = [];
  let left = chars;
  let current = 0;
  g.font = "42px Georgia, 'Times New Roman', serif";
  for (let i = 0; i < lines.length && left > 0; i += 1) {
    current = i;
    const { year, text } = lines[i];
    const full = `${year}  ${text}`;
    const shown = full.slice(0, left);
    left -= full.length + 1;
    const wrapped = wrap(g, shown, W - MARGIN * 2);
    wrapped.forEach((line, k) => {
      rows.push({ year: k === 0 ? year : undefined, text: line });
    });
  }

  const visible = rows.slice(-MAX_LINES);
  visible.forEach((row, k) => {
    const y = FIRST_LINE_Y + k * LINE_HEIGHT;
    let x = MARGIN;
    let text = row.text;
    if (row.year && text.startsWith(row.year)) {
      g.font = "bold 42px Georgia, 'Times New Roman', serif";
      g.fillStyle = "#7a1f12";
      g.fillText(row.year, x, y);
      x += g.measureText(`${row.year}  `).width;
      text = text.slice(row.year.length).trimStart();
    }
    g.font = "42px Georgia, 'Times New Roman', serif";
    g.fillStyle = "#3a2410";
    g.fillText(text, x, y);
    if (cursor && k === visible.length - 1) {
      g.fillStyle = "#7a1f12";
      g.fillRect(x + g.measureText(text).width + 6, y - 28, 4, 34);
    }
  });
  return current;
}

// Marca la textura para que la tarjeta gráfica la vuelva a subir (función aparte: la textura es un valor del componente)
function refresh(texture: THREE.Texture) {
  texture.needsUpdate = true;
}

// Sala 01 · Historia: un pergamino que se escribe solo con la historia de Valve y, flotando a su alrededor, lo que la
// construyó: el logotipo de Steam, la lambda de Half-Life, la válvula de Valve, un disquete, un monitor y un engranaje
export function HistoryScroll({
  lines,
  active,
  reduced,
  onLine,
  lambdaSrc,
}: HistoryScrollProps) {
  const floaters = useRef<THREE.Group>(null);
  const typed = useRef(0);
  const drawn = useRef(-1);
  const line = useRef(-2);
  const total = useMemo(
    () =>
      lines.reduce(
        (sum, item) => sum + item.year.length + item.text.length + 3,
        0,
      ),
    [lines],
  );

  const sheet = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const paper = document.createElement("canvas");
    paper.width = W;
    paper.height = H;
    const paperContext = paper.getContext("2d");
    if (paperContext) paintPaper(paperContext);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return { canvas, texture, paper };
  }, []);

  useEffect(() => {
    return () => {
      sheet.texture.dispose();
    };
  }, [sheet]);

  useFrame((state, delta) => {
    const g = sheet.canvas.getContext("2d");
    if (!g) return;

    if (reduced) {
      // Sin movimiento: el pergamino ya está escrito
      typed.current = total;
    } else if (active) {
      typed.current = Math.min(typed.current + delta * SPEED, total);
    } else if (typed.current > 0) {
      // Al irse de la parada se vacía, para escribirse de nuevo al volver
      typed.current = 0;
    }

    const shown = Math.floor(typed.current);
    // Se repinta cada tres letras (y al empezar, al acabar y al reiniciar), no con cada una
    const repaint =
      shown !== drawn.current &&
      (shown === 0 ||
        shown >= total ||
        shown < drawn.current ||
        shown - drawn.current >= 3);
    if (repaint) {
      drawn.current = shown;
      const index = draw(
        g,
        lines,
        shown,
        sheet.paper,
        !reduced && active && shown < total,
      );
      refresh(sheet.texture);
      const next = shown === 0 ? -1 : index;
      if (next !== line.current) {
        line.current = next;
        onLine(next);
      }
    }

    // Los objetos flotan y giran despacio alrededor del pergamino
    const t = reduced ? 0 : state.clock.elapsedTime;
    floaters.current?.children.forEach((child, i) => {
      // La altura de partida se guarda la primera vez; después solo se mece alrededor de ella
      child.userData.baseY ??= child.position.y;
      child.position.y =
        child.userData.baseY + Math.sin(t * 0.8 + i * 1.7) * 0.12;
      child.rotation.y = Math.sin(t * 0.5 + i) * 0.5;
    });
  });

  return (
    <group rotation={[0, 0.12, 0]}>
      {/* Pergamino con sus dos varas: lo único pulsable de la parada (el clic sube a la zona de la parada) */}
      <mesh>
        <planeGeometry args={[2.4, 3.6]} />
        <meshStandardMaterial map={sheet.texture} roughness={0.95} />
      </mesh>
      {[1.85, -1.85].map((y) => (
        <group key={y} position={[0, y, 0.02]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 2.7, 20]} />
            <meshStandardMaterial color="#5a3b22" roughness={0.7} />
          </mesh>
          {[-1.38, 1.38].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color="#c9a75a"
                metalness={0.7}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
      ))}

      <group ref={floaters}>
        <group position={[-2.5, 1.6, 0.5]}>
          <SteamBadge />
        </group>
        {lambdaSrc && (
          <group position={[-2.8, 0.3, 0.4]}>
            <Emblem src={lambdaSrc} color="#f39a2e" size={1.1} depthTest />
          </group>
        )}
        <group position={[-2.6, -1.0, 0.4]} rotation={[0.1, 0, -0.2]}>
          <Floppy />
        </group>
        <group position={[-2.2, -2.3, 0.5]} scale={0.8}>
          <Crt />
        </group>
        <group position={[3.0, -0.2, 0.5]} rotation={[0, 0, 0.95]}>
          <Crowbar length={1.8} />
        </group>
        <group
          position={[2.3, 2.45, 0.8]}
          rotation={[0.12, 0, 0.08]}
          scale={0.95}
        >
          <group rotation={[0, -0.75, 0]}>
            <VrHeadset />
          </group>
          <pointLight
            position={[-0.5, 0.8, 1.5]}
            intensity={5}
            distance={4}
            color="#bfe8ff"
          />
        </group>
        <group position={[1.9, -1.95, 0.6]}>
          <ValveBadge />
        </group>
        <group position={[3.1, -2.7, 0.4]}>
          <Gears reduced={reduced} />
        </group>
      </group>
      <Sparkles />
      <pointLight
        position={[0, 0.5, 2.4]}
        intensity={8}
        distance={7}
        color="#ffe2b0"
      />
    </group>
  );
}
