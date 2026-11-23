"use client";

import { useFrame } from "@react-three/fiber";
import { Billboard, Line } from "@react-three/drei";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
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

const FLOOR_Y = -2.7;
const STAR_COUNT = 900;

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
  { pos: [-5, 2.5, -7], scale: 16, base: "#243a78" },
  { pos: [6, -1, -8], scale: 18, base: "#4a2468" },
  { pos: [1, 4, -9], scale: 14, base: "#1f4f66" },
];

// Fondo vivo de la parada: cielo, estrellas con paralaje y tres nebulosas que toman el color de la saga que se mira
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
      arr[i * 3] = (hashN(i * 3 + 1) - 0.5) * 34;
      arr[i * 3 + 1] = (hashN(i * 3 + 2) - 0.5) * 18;
      arr[i * 3 + 2] = -3 - hashN(i * 3 + 3) * 10;
    }
    return arr;
  }, []);
  const colors = useMemo(
    () => ({
      bases: NEBULAS.map((n) => new THREE.Color(n.base)),
      target: new THREE.Color(),
    }),
    [],
  );
  useEffect(() => () => sky.dispose(), [sky]);

  useFrame((state, delta) => {
    const k = 1 - Math.exp(-(reduced ? 60 : 3) * delta);
    NEBULAS.forEach((_, i) => {
      const m = mats.current[i];
      if (!m) return;
      // Con una saga elegida, las nebulosas se tiñen de su color (mezclado con el suyo para no perder profundidad)
      colors.target.copy(colors.bases[i]);
      if (accent) colors.target.lerp(new THREE.Color(accent), 0.6);
      m.color.lerp(colors.target, k);
      m.opacity += ((accent ? 0.55 : 0.35) - m.opacity) * k;
    });
    const s = stars.current;
    if (s && !reduced) {
      s.position.x += (state.pointer.x * -0.6 - s.position.x) * k;
      s.position.y += (state.pointer.y * -0.35 - s.position.y) * k;
      s.rotation.z = state.clock.elapsedTime * 0.004;
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
            size={0.055}
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

function hashN(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function SagaWorld({
  saga,
  glow,
  position,
  reduced,
  size,
  grow,
  selected,
  dim,
  onTap,
  onHover,
}: {
  saga: SagaWorldData;
  glow: THREE.Texture;
  position: [number, number, number];
  reduced: boolean;
  size: number;
  // Cuánto crece al abrirse (más en pantallas estrechas, para que las placas se lean)
  grow: number;
  // Elegida con un toque: en táctil abre las placas sin entrar todavía
  selected: boolean;
  // Otra saga está elegida: este mundo baja su brillo para que destaque la activa
  dim: boolean;
  onTap: (slug: string) => void;
  onHover: (slug: string | null) => void;
}) {
  const glowMat = useRef<THREE.SpriteMaterial>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const beamMat = useRef<THREE.MeshBasicMaterial>(null);
  const pedestal = useRef<THREE.Group>(null);
  const root = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const planet = useRef<THREE.Group>(null);
  const frame = useRef(0);
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
      ((target.current || (selected ? 1 : 0)) - hover.current) *
      (1 - Math.exp(-8 * delta));
    const h = hover.current;
    const t = reduced ? 0 : state.clock.elapsedTime;
    if (root.current) {
      root.current.position.y = Math.sin(t * 0.8 + position[0]) * 0.1;
      root.current.scale.setScalar(size * (1 + h * grow));
      root.current.position.z = h * 1.0;
      // Lo que se ve crece al abrirse, pero solo la zona fija de abajo recibe el cursor: así un mundo abierto no tapa
      // el toque de su vecino. Se repasa de vez en cuando porque el emblema carga después
      frame.current += 1;
      if (frame.current % 30 === 1) {
        root.current.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
            object.raycast = () => null;
          }
        });
      }
    }
    const fade = 1 - Math.exp(-6 * delta);
    if (glowMat.current)
      glowMat.current.opacity +=
        ((dim ? 0.22 : 0.5) + h * 0.25 - glowMat.current.opacity) * fade;
    if (ringMat.current)
      ringMat.current.opacity +=
        ((dim ? 0.15 : 0.4) + h * 0.5 - ringMat.current.opacity) * fade;
    if (beamMat.current)
      beamMat.current.opacity +=
        ((dim ? 0.05 : 0.12) + h * 0.3 - beamMat.current.opacity) * fade;
    // La onda del pedestal se abre y se apaga en bucle
    if (pedestal.current && !reduced) {
      const p = (t * 0.5 + position[0]) % 1;
      pedestal.current.scale.setScalar(1 + p * 0.9);
    }
    if (orbit.current && !reduced)
      orbit.current.rotation.y += delta * (0.35 + h * 1.2);
    if (planet.current && !reduced) {
      planet.current.rotation.y += delta * (0.15 + h * 0.6);
      planet.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <group
      position={position}
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
      {/* Zona de cursor fija: no crece con el mundo */}
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[size * 1.55, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* Pedestal sobre la mesa-mapa: aro con onda y un haz de luz hasta el mundo, que flota en vertical sobre él */}
      <group position={[0, FLOOR_Y - position[1], 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
          <ringGeometry args={[size * 1.2, size * 1.3, 48]} />
          <meshBasicMaterial
            ref={ringMat}
            color={saga.accent}
            transparent
            opacity={0.4}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <group ref={pedestal} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh raycast={() => null}>
            <ringGeometry args={[size * 1.2, size * 1.23, 48]} />
            <meshBasicMaterial
              color={saga.accent}
              transparent
              opacity={0.25}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
        <mesh
          position={[0, (position[1] - FLOOR_Y) / 2, 0]}
          raycast={() => null}
        >
          <cylinderGeometry
            args={[0.012, size * 0.28, position[1] - FLOOR_Y, 16, 1, true]}
          />
          <meshBasicMaterial
            ref={beamMat}
            color={saga.accent}
            transparent
            opacity={0.12}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>
      <group ref={root}>
        <sprite scale={[3.6, 3.6, 1]} raycast={() => null}>
          <spriteMaterial
            ref={glowMat}
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
        {/* Planeta: esfera de malla del color de la saga, con un núcleo tenue, detrás del emblema */}
        <group ref={planet} position={[0, 0, -0.9]}>
          <mesh raycast={() => null}>
            <icosahedronGeometry args={[0.95, 2]} />
            <meshBasicMaterial
              color={saga.accent}
              wireframe
              transparent
              opacity={0.28}
              toneMapped={false}
            />
          </mesh>
          <mesh raycast={() => null}>
            <sphereGeometry args={[0.9, 24, 16]} />
            <meshBasicMaterial
              color={saga.accent}
              transparent
              opacity={0.1}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
        <Emblem src={saga.emblem} color="#ffffff" size={1.35} depthTest />
        {/* Los juegos de la saga, en una órbita inclinada */}
        <group rotation={[0.45, 0, 0.1]}>
          {/* Trazo de la órbita de cada anillo de juegos */}
          {[1.8, ...(count > 6 ? [2.3] : [])].map((radius) => (
            <mesh
              key={radius}
              rotation={[Math.PI / 2, 0, 0]}
              position={[0, radius > 2 ? 0.35 : 0, 0]}
              raycast={() => null}
            >
              <torusGeometry args={[radius, 0.008, 6, 96]} />
              <meshBasicMaterial
                color={saga.accent}
                transparent
                opacity={0.35}
                toneMapped={false}
              />
            </mesh>
          ))}
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
    </group>
  );
}

// Pares de mundos unidos por un hilo (por posición)
const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 4],
];

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
  // Cinco mundos al tresbolillo, lo bastante separados para que las órbitas de uno no entren en el vecino; el hueco de la
  // izquierda queda libre para el texto
  const spots: [number, number][] = portrait
    ? // En vertical, arriba del texto
      [
        [-0.95, 2.5],
        [0.95, 2.5],
        [0, 1.5],
        [-0.95, 0.5],
        [0.95, 0.5],
      ]
    : [
        [-0.1, 1.7],
        [3.1, 1.7],
        [1.5, -0.1],
        [-0.1, -1.9],
        [3.1, -1.9],
      ];
  // En táctil no hay hover: un primer toque abre las placas de la saga y el segundo entra a su universo
  const [picked, setPicked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const tap = (slug: string) => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (touch && picked !== slug) setPicked(slug);
    else onOpen(slug);
  };
  // Saga activa: la que está bajo el cursor o, en táctil, la elegida con el primer toque
  const activeIndex = sagas.findIndex(
    (s) => s.slug === (hovered ?? picked) || s.id === (hovered ?? picked),
  );
  const active = activeIndex >= 0 ? sagas[activeIndex] : null;

  return (
    <group>
      {/* Cielo, estrellas y nebulosas: el fondo de la mesa-mapa, teñido por la saga activa */}
      <Cosmos
        glow={glow}
        accent={active ? active.accent : null}
        reduced={reduced}
      />
      {/* Suelo negro con una cuadrícula tenue: el «mapa» sobre el que está cada mundo */}
      <gridHelper
        args={[26, 52, "#2a2d36", "#14161c"]}
        position={[0, FLOOR_Y, 0]}
      />
      {/* Constelación: hilos que unen los mundos vecinos y se encienden con el de la saga activa */}
      {LINKS.map(([from, to]) => {
        const lit = active && (from === activeIndex || to === activeIndex);
        return (
          <Line
            key={`${from}-${to}`}
            points={[
              [spots[from][0], spots[from][1], 0.2],
              [spots[to][0], spots[to][1], 0.2],
            ]}
            color={lit && active ? active.accent : "#59606f"}
            lineWidth={lit ? 2 : 1}
            transparent
            opacity={lit ? 0.9 : 0.3}
            raycast={() => null}
          />
        );
      })}
      {sagas.map((saga, i) => {
        const [sx, sy] = spots[i % spots.length];
        return (
          <SagaWorld
            key={saga.id}
            saga={saga}
            glow={glow}
            reduced={reduced}
            size={portrait ? 0.34 : 0.52}
            grow={portrait ? 1.1 : 0.6}
            selected={picked === saga.id || picked === saga.slug}
            dim={active !== null && active.id !== saga.id}
            onTap={tap}
            onHover={setHovered}
            position={[sx, sy, 0.6]}
          />
        );
      })}
      <Sparkles />
    </group>
  );
}
