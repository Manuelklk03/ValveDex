"use client";

import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { Emblem } from "@/components/ui/space-parts";
import { Sparkles } from "./valve-props";

// Parada 5 · Universos: cada saga es un pequeño mundo sobre fondo negro. Su emblema flota en el centro, sus juegos giran
// alrededor como placas con el nombre y el año, y un elemento propio de su temática reacciona al cursor (anillos de portal,
// equipos RED y BLU, garras de infectado, mira de francotirador o el anillo de seguridad de Black Mesa)

export type SagaGame = { name: string; year: number };
export type SagaWorldData = {
  id: string;
  slug: string;
  name: string;
  accent: string;
  emblem: string;
  games: SagaGame[];
};

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

// En reposo, cada juego es un punto de color en la órbita; con el cursor sobre la saga se abre en una placa legible
function GameLabel({
  game,
  accent,
  position,
  hover,
}: {
  game: SagaGame;
  accent: string;
  position: [number, number, number];
  hover: MutableRefObject<number>;
}) {
  const map = useMemo(() => makeLabel(game, accent), [game, accent]);
  const pill = useRef<THREE.MeshBasicMaterial>(null);
  const dot = useRef<THREE.MeshBasicMaterial>(null);
  useEffect(() => () => map.dispose(), [map]);
  useFrame(() => {
    const h = hover.current;
    if (pill.current) pill.current.opacity = h;
    if (dot.current) dot.current.opacity = 1 - h;
  });
  return (
    <group position={position}>
      <Billboard>
        <mesh raycast={() => null}>
          <circleGeometry args={[0.07, 14]} />
          <meshBasicMaterial
            ref={dot}
            color={accent}
            transparent
            toneMapped={false}
          />
        </mesh>
        <mesh raycast={() => null} renderOrder={10}>
          <planeGeometry args={[1.35, 0.47]} />
          <meshBasicMaterial
            ref={pill}
            map={map}
            transparent
            opacity={0}
            depthTest={false}
            toneMapped={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

// Elemento de la temática de cada saga; `hover` va de 0 a 1 y los acelera o los abre
function Theme({
  id,
  accent,
  hover,
  reduced,
}: {
  id: string;
  accent: string;
  hover: MutableRefObject<number>;
  reduced: boolean;
}) {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Con movimiento reducido los elementos se quedan quietos
    if (reduced) return;
    const t = state.clock.elapsedTime;
    const h = hover.current;
    if (id === "portal") {
      if (a.current)
        a.current.scale.setScalar(1 + h * 0.35 + Math.sin(t * 2) * 0.05);
      if (b.current)
        b.current.scale.setScalar(1 + h * 0.35 + Math.sin(t * 2 + 2) * 0.05);
    } else if (id === "team-fortress") {
      if (a.current) a.current.rotation.set(t * (0.5 + h * 2), 0.4, 0);
      if (b.current) b.current.rotation.set(0.4, t * (0.5 + h * 2), 0);
    } else if (id === "left-4-dead") {
      if (a.current)
        a.current.scale.setScalar(
          1 + Math.max(0, Math.sin(t * 3)) * 0.12 + h * 0.3,
        );
    } else if (id === "counter-strike") {
      if (a.current) a.current.rotation.z = t * (0.3 + h * 1.5);
    } else if (a.current) {
      a.current.rotation.z = t * (0.35 + h * 1.4);
    }
  });

  const ring = (r: number, color: string, tube = 0.03) => (
    <mesh raycast={() => null}>
      <torusGeometry args={[r, tube, 12, 64]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );

  if (id === "portal") {
    return (
      <group>
        <group ref={a} position={[-1.05, 0.65, 0]} rotation={[0, 0.5, 0]}>
          {ring(0.34, "#ff9a1f", 0.05)}
        </group>
        <group ref={b} position={[1.05, -0.65, 0]} rotation={[0, -0.5, 0]}>
          {ring(0.34, "#56c8ff", 0.05)}
        </group>
      </group>
    );
  }
  if (id === "team-fortress") {
    return (
      <group>
        <group ref={a}>{ring(1.0, "#e8665f", 0.04)}</group>
        <group ref={b}>{ring(1.12, "#5b8fcb", 0.04)}</group>
      </group>
    );
  }
  if (id === "left-4-dead") {
    return (
      <group ref={a}>
        {Array.from({ length: 10 }, (_, i) => {
          const ang = (i / 10) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(ang) * 0.95, Math.sin(ang) * 0.95, 0]}
              rotation={[0, 0, ang - Math.PI / 2]}
              raycast={() => null}
            >
              <coneGeometry args={[0.07, 0.34, 6]} />
              <meshBasicMaterial
                color={i % 2 ? "#8db03c" : "#b3261a"}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>
    );
  }
  if (id === "counter-strike") {
    return (
      <group ref={a}>
        {ring(0.95, accent, 0.012)}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI) / 2) * 1.15,
              Math.sin((i * Math.PI) / 2) * 1.15,
              0,
            ]}
            rotation={[0, 0, (i * Math.PI) / 2]}
            raycast={() => null}
          >
            <boxGeometry args={[0.36, 0.02, 0.02]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
        ))}
      </group>
    );
  }
  // Half-Life: anillo de seguridad con marcas de calibración
  return (
    <group ref={a}>
      {ring(1.0, accent, 0.02)}
      {Array.from({ length: 16 }, (_, i) => {
        const ang = (i / 16) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(ang) * 1.12, Math.sin(ang) * 1.12, 0]}
            rotation={[0, 0, ang]}
            raycast={() => null}
          >
            <boxGeometry args={[i % 4 === 0 ? 0.22 : 0.1, 0.03, 0.03]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function SagaWorld({
  saga,
  glow,
  position,
  reduced,
  size,
  onOpen,
}: {
  saga: SagaWorldData;
  glow: THREE.Texture;
  position: [number, number, number];
  reduced: boolean;
  size: number;
  onOpen: (slug: string) => void;
}) {
  const root = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const hover = useRef(0);
  const target = useRef(0);
  const count = saga.games.length;

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useFrame((state, delta) => {
    hover.current +=
      (target.current - hover.current) * (1 - Math.exp(-8 * delta));
    const h = hover.current;
    const t = reduced ? 0 : state.clock.elapsedTime;
    if (root.current) {
      root.current.position.y =
        position[1] + Math.sin(t * 0.8 + position[0]) * 0.1;
      root.current.scale.setScalar(size * (1 + h * 0.6));
      root.current.position.z = position[2] + h * 1.0;
    }
    if (orbit.current && !reduced)
      orbit.current.rotation.y += delta * (0.35 + h * 1.2);
  });

  return (
    <group
      ref={root}
      position={position}
      onPointerOver={() => {
        target.current = 1;
      }}
      onPointerOut={() => {
        target.current = 0;
      }}
      onClick={(event) => {
        event.stopPropagation();
        onOpen(saga.slug);
      }}
    >
      {/* Zona de cursor */}
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[1.5, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <sprite scale={[3.6, 3.6, 1]} raycast={() => null}>
        <spriteMaterial
          map={glow}
          color={saga.accent}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </sprite>
      <Theme
        id={saga.id}
        accent={saga.accent}
        hover={hover}
        reduced={reduced}
      />
      <Emblem src={saga.emblem} color="#ffffff" size={1.35} depthTest />
      {/* Los juegos de la saga, en una órbita inclinada */}
      <group rotation={[0.45, 0, 0.1]}>
        <group ref={orbit}>
          {saga.games.map((game, i) => {
            // Hasta 6 juegos en una órbita; con más, la mitad pasa a una segunda más ancha y más alta
            const outer = count > 6 && i % 2 === 1;
            const ring = count > 6 ? Math.ceil(count / 2) : count;
            const index = count > 6 ? Math.floor(i / 2) : i;
            const ang =
              (index / ring) * Math.PI * 2 + (outer ? Math.PI / ring : 0);
            const radius = outer ? 2.3 : 1.8;
            return (
              <GameLabel
                key={game.name}
                game={game}
                accent={saga.accent}
                hover={hover}
                position={[
                  Math.cos(ang) * radius,
                  outer ? 0.35 : 0,
                  Math.sin(ang) * radius,
                ]}
              />
            );
          })}
        </group>
      </group>
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
  return (
    <group>
      {/* Suelo negro con una cuadrícula tenue: el «mapa» sobre el que está cada mundo */}
      <gridHelper
        args={[26, 52, "#2a2d36", "#14161c"]}
        position={[0, -2.7, 0]}
      />
      {sagas.map((saga, i) => {
        // Cinco mundos al tresbolillo, lo bastante separados para que las órbitas de uno no entren en el vecino; el hueco
        // de la izquierda queda libre para el texto
        const spots: [number, number][] = [
          [-0.1, 1.7],
          [3.1, 1.7],
          [1.5, -0.1],
          [-0.1, -1.9],
          [3.1, -1.9],
        ];
        const [sx, sy] = spots[i % spots.length];
        const k = portrait ? 0.6 : 1;
        return (
          <SagaWorld
            key={saga.id}
            saga={saga}
            glow={glow}
            reduced={reduced}
            size={portrait ? 0.34 : 0.52}
            onOpen={onOpen}
            position={[
              sx * k - (portrait ? 1.4 : 0),
              sy * (portrait ? 1.1 : 1),
              0.6,
            ]}
          />
        );
      })}
      <Sparkles />
    </group>
  );
}
