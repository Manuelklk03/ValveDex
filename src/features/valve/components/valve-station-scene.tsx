"use client";

import { Billboard } from "@react-three/drei";
import {
  Canvas,
  useFrame,
  useThree,
  type ThreeEvent,
} from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { Emblem, Stars, makeGlowTexture } from "@/components/ui/space-parts";
import { ValveCorridor } from "./valve-corridor";
import { ValveWall } from "./valve-wall";

export type StationSaga = { id: string; accent: string; emblem: string };

export type StationCounts = {
  history: number;
  steam: number;
  hardware: number;
  people: number;
};

type SceneProps = {
  sagas: StationSaga[];
  counts: StationCounts;
  // Posición de la cámara como índice fraccionario de parada: la fija el scroll
  target: MutableRefObject<number>;
  entering: MutableRefObject<boolean>;
  reduced: boolean;
  onSelect: (stop: number) => void;
  // Pulsar la válvula de la pared: entrar al mundo
  onStart: () => void;
};

// Paradas del viaje: 0 pared con la válvula, 1 Historia, 2 Personal, 3 Hardware, 4 Steam y 5 las sagas
const STOP_COUNT = 6;
const GAP = 15;
// Las salas están en un pasillo que arranca a la izquierda de la pared de la portada: desplazamiento en x desde la parada 1
const SHIFT = -14;

function stopPosition(index: number, portrait: boolean) {
  return new THREE.Vector3(
    (portrait ? 0 : index === 5 ? 4.3 : 2.4) + (index >= 1 ? SHIFT : 0),
    portrait ? 1 : Math.sin(index * 1.9) * 0.3,
    -index * GAP,
  );
}

// Zona pulsable de una parada: lleva el cursor de puntero y avisa de qué parada se ha elegido
function Hit({
  stop,
  onSelect,
  children,
}: {
  stop: number;
  onSelect: (stop: number) => void;
  children: ReactNode;
}) {
  useEffect(
    () => () => {
      document.body.style.cursor = "";
    },
    [],
  );

  return (
    <group
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        onSelect(stop);
      }}
      onPointerOver={(event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
      }}
    >
      {children}
    </group>
  );
}

function Glow({
  texture,
  color,
  size,
  opacity = 0.5,
}: {
  texture: THREE.Texture;
  color: string;
  size: number;
  opacity?: number;
}) {
  return (
    <Billboard>
      {/* Solo decora: sin raycast, para no tapar los clics de lo que tiene detrás */}
      <mesh raycast={() => null}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={texture}
          color={color}
          transparent
          opacity={opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Billboard>
  );
}

// Sala 01 · Historia: la línea de producción, una tubería con un anillo por hito
function HistoryModule({
  count,
  reduced,
}: {
  count: number;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const rings = Array.from({ length: Math.min(count, 16) }, (_, i) => i);

  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.x += delta * 0.3;
  });

  return (
    <group rotation={[0, -0.5, 0.15]}>
      <group ref={group}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 7, 32]} />
          <meshStandardMaterial
            color="#4b4036"
            metalness={0.85}
            roughness={0.4}
          />
        </mesh>
        {rings.map((i) => (
          <mesh
            key={i}
            position={[(i / Math.max(rings.length - 1, 1) - 0.5) * 6.4, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <torusGeometry args={[0.66, 0.06, 12, 48]} />
            <meshStandardMaterial
              color="#f39a2e"
              emissive="#f39a2e"
              emissiveIntensity={i % 3 === 0 ? 1.4 : 0.55}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Sala 02 · Steam: un núcleo azul noche con anillos y nubes de vapor
function SteamModule({
  glow,
  reduced,
}: {
  glow: THREE.Texture;
  reduced: boolean;
}) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reduced) return;
    if (ringA.current) ringA.current.rotation.z += delta * 0.4;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.25;
    clouds.current?.children.forEach((cloud, i) => {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.6 + i * 2) * 0.12;
      cloud.scale.setScalar(s);
    });
  });

  return (
    <group>
      <Glow texture={glow} color="#2f7be0" size={9} opacity={0.6} />
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#10305c"
          emissive="#2f7be0"
          emissiveIntensity={0.7}
          roughness={0.5}
        />
      </mesh>
      <mesh ref={ringA} rotation={[1.2, 0.2, 0]}>
        <torusGeometry args={[1.7, 0.035, 12, 120]} />
        <meshBasicMaterial color="#7fb8ff" />
      </mesh>
      <mesh ref={ringB} rotation={[0.5, 0.9, 0]}>
        <torusGeometry args={[2.2, 0.025, 12, 140]} />
        <meshBasicMaterial color="#4aa3ff" transparent opacity={0.7} />
      </mesh>
      <group ref={clouds}>
        {[
          [-1.8, -0.7, 0.4],
          [1.7, 0.8, -0.2],
          [0.2, 1.7, 0.3],
        ].map((p, i) => (
          <group key={i} position={p as [number, number, number]}>
            <Glow texture={glow} color="#9cc8ff" size={3} opacity={0.35} />
          </group>
        ))}
      </group>
    </group>
  );
}

// Sala 03 · Hardware: un plano de laboratorio, con un sólido de alambre cian sobre la cuadrícula
function HardwareModule({ reduced }: { reduced: boolean }) {
  const solid = useRef<THREE.Mesh>(null);
  const { box, frame } = useMemo(() => {
    const source = new THREE.BoxGeometry(3.2, 2, 1.6);
    return { box: source, frame: new THREE.EdgesGeometry(source) };
  }, []);

  useEffect(() => {
    return () => {
      box.dispose();
      frame.dispose();
    };
  }, [box, frame]);

  useFrame((_, delta) => {
    if (solid.current && !reduced) {
      solid.current.rotation.y += delta * 0.35;
      solid.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group>
      <gridHelper
        args={[10, 20, "#35d0e8", "#16505e"]}
        position={[0, -1.7, 0]}
      />
      <lineSegments geometry={frame}>
        <lineBasicMaterial color="#35d0e8" transparent opacity={0.7} />
      </lineSegments>
      <mesh ref={solid}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color="#35d0e8" wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color="#0d2a33"
          emissive="#35d0e8"
          emissiveIntensity={0.9}
        />
      </mesh>
    </group>
  );
}

// Sala 04 · Gente: una pared de credenciales que flotan
function PeopleModule({ count, reduced }: { count: number; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const plates = Array.from(
    { length: Math.min(Math.max(count, 6), 12) },
    (_, i) => i,
  );

  useFrame((state) => {
    if (!group.current || reduced) return;
    group.current.children.forEach((plate, i) => {
      plate.position.y =
        (Math.floor(i / 4) - 1) * 1.15 +
        Math.sin(state.clock.elapsedTime * 0.8 + i * 1.3) * 0.08;
    });
  });

  return (
    <group rotation={[0, -0.35, 0]}>
      <group ref={group}>
        {plates.map((i) => (
          <group
            key={i}
            position={[
              ((i % 4) - 1.5) * 0.95,
              (Math.floor(i / 4) - 1) * 1.15,
              0,
            ]}
            rotation={[0, 0, ((i % 3) - 1) * 0.04]}
          >
            <mesh>
              <boxGeometry args={[0.72, 0.96, 0.04]} />
              <meshStandardMaterial color="#e9e4d6" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.38, 0.03]}>
              <boxGeometry args={[0.72, 0.16, 0.03]} />
              <meshStandardMaterial color="#e5513c" />
            </mesh>
            <mesh position={[0, 0.02, 0.03]}>
              <circleGeometry args={[0.2, 24]} />
              <meshStandardMaterial color="#3b3b40" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// Parada 5: las sagas, en arco, cada una con su emblema y su luz
function SagasModule({
  sagas,
  glow,
  portrait,
}: {
  sagas: StationSaga[];
  glow: THREE.Texture;
  portrait: boolean;
}) {
  return (
    <group>
      {sagas.map((saga, i) => {
        const t = sagas.length > 1 ? i / (sagas.length - 1) - 0.5 : 0;
        const angle = t * (portrait ? 1.7 : 1.5);
        return (
          <group
            key={saga.id}
            position={[
              Math.sin(angle) * (portrait ? 2.2 : 3.1),
              (portrait ? 0.4 : 0) + Math.cos(angle * 2) * 0.5 - 0.3,
              -Math.cos(angle) * 1.4 + 1.4,
            ]}
          >
            <Glow texture={glow} color={saga.accent} size={3.2} opacity={0.7} />
            <Emblem src={saga.emblem} color="#ffffff" size={1.3} depthTest />
          </group>
        );
      })}
    </group>
  );
}

// Cámara: avanza de una parada a otra con suavizado, se inclina con el cursor y, al entrar en una sala, se lanza hacia ella
function Rig({
  target,
  entering,
  reduced,
  onNear,
}: Pick<SceneProps, "target" | "entering" | "reduced"> & {
  onNear: (stop: number) => void;
}) {
  const size = useThree((state) => state.size);
  const portrait = size.width / size.height < 1;
  const current = useRef(0);
  const dolly = useRef(0);
  const look = useMemo(() => new THREE.Vector3(), []);
  const near = useRef(-1);

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const goal = target.current;
    current.current = reduced
      ? goal
      : current.current +
        (goal - current.current) * (1 - Math.exp(-3.2 * delta));
    dolly.current =
      entering.current && !reduced
        ? Math.min(dolly.current + delta * 1.8, 1)
        : Math.max(dolly.current - delta * 2.5, 0);

    const i = Math.min(Math.floor(current.current), STOP_COUNT - 1);
    const next = Math.min(i + 1, STOP_COUNT - 1);
    const f = current.current - i;
    const eased = f * f * (3 - 2 * f);
    const focus = stopPosition(i, portrait).lerp(
      stopPosition(next, portrait),
      eased,
    );

    const px = reduced ? 0 : state.pointer.x;
    const py = reduced ? 0 : state.pointer.y;
    const lift = dolly.current * dolly.current * (3 - 2 * dolly.current);

    // De la pared al pasillo la cámara dobla la esquina: primero se desplaza a la izquierda y después avanza de frente
    const c = current.current;
    const startX = portrait ? 0 : -0.2;
    const hallX = SHIFT + startX;
    let camX = hallX;
    let camZ = focus.z + 7.4;
    if (c < 1) {
      const u = c * c * (3 - 2 * c);
      const v = 1 - u;
      camX = startX * v * v + hallX * (1 - v * v);
      camZ =
        stopPosition(0, portrait).z * (1 - u * u) +
        stopPosition(1, portrait).z * u * u +
        7.4;
    }
    // La mirada se queda algo por delante del objeto para dejar sitio al texto
    const lookX = (stop: number) => {
      const x = stopPosition(stop, portrait).x;
      const base = stop >= 1 ? SHIFT : 0;
      return portrait ? x : base + (x - base) * 0.6;
    };

    camera.position.set(
      camX + (portrait ? px * 0.4 : px * 0.7),
      focus.y * 0.4 + (portrait ? 1.3 : 0.3) + py * 0.35,
      camZ - lift * 5.6,
    );
    look.set(lookX(i) + (lookX(next) - lookX(i)) * eased, focus.y, focus.z);
    camera.lookAt(look);
    camera.fov = 48 + lift * 34;
    camera.updateProjectionMatrix();

    // Qué paradas se dibujan lo decide la posición real de la cámara, no el destino del scroll
    const here = Math.round(current.current);
    if (here !== near.current) {
      near.current = here;
      onNear(here);
    }
  });

  return null;
}

function Scene({
  sagas,
  counts,
  target,
  entering,
  reduced,
  onSelect,
  onStart,
}: SceneProps) {
  const size = useThree((state) => state.size);
  const portrait = size.width / size.height < 1;
  const glow = useMemo(() => makeGlowTexture(), []);
  const [near, setNear] = useState(0);

  useEffect(() => () => glow.dispose(), [glow]);

  const at = (stop: number) => stopPosition(stop, portrait);
  const show = (stop: number) => Math.abs(stop - near) <= 1;

  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 24, 80]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[-5, 4, 6]} intensity={2.2} />
      <directionalLight position={[6, -2, 3]} intensity={0.7} color="#8fa8ff" />
      <Stars count={4200} />
      <Rig
        target={target}
        entering={entering}
        reduced={reduced}
        onNear={setNear}
      />
      <ValveCorridor glow={glow} reduced={reduced} />

      {near <= 1 && (
        <ValveWall
          glow={glow}
          target={target}
          reduced={reduced}
          portrait={portrait}
          onStart={onStart}
        />
      )}
      {show(1) && (
        <group position={at(1)}>
          <Hit stop={1} onSelect={onSelect}>
            <HistoryModule count={counts.history} reduced={reduced} />
          </Hit>
        </group>
      )}
      {show(2) && (
        <group position={at(2)}>
          <Hit stop={2} onSelect={onSelect}>
            <PeopleModule count={counts.people} reduced={reduced} />
          </Hit>
        </group>
      )}
      {show(3) && (
        <group position={at(3)}>
          <Hit stop={3} onSelect={onSelect}>
            <HardwareModule reduced={reduced} />
          </Hit>
        </group>
      )}
      {show(4) && (
        <group position={at(4)}>
          <Hit stop={4} onSelect={onSelect}>
            <SteamModule glow={glow} reduced={reduced} />
          </Hit>
        </group>
      )}
      {show(5) && (
        <group position={at(5)}>
          <Hit stop={5} onSelect={onSelect}>
            <SagasModule sagas={sagas} glow={glow} portrait={portrait} />
          </Hit>
        </group>
      )}
    </>
  );
}

// Escena 3D de la portada: la estación de Valve, con sus salas en línea y las sagas al fondo
export default function ValveStationScene(props: SceneProps) {
  return (
    <Canvas
      camera={{ fov: 48, near: 0.1, far: 200, position: [0, 0.3, 7] }}
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}
