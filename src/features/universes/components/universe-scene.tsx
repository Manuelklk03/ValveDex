"use client";

import { Billboard, useGLTF, useTexture } from "@react-three/drei";
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
} from "react";
import * as THREE from "three";
import { Emblem, Stars, makeGlowTexture } from "@/components/ui/space-parts";

export type SceneWorld = {
  id: string;
  accent: string;
  emblem: string;
  backdrop?: string;
  model?: string;
  modelTilt?: number;
  gameCount: number;
};

type SceneProps = {
  worlds: SceneWorld[];
  // Posición objetivo de la cámara como índice fraccionario (0 = primer mundo): la fija el scroll
  target: MutableRefObject<number>;
  // 0 a 1: la cámara se lanza hacia el mundo activo al entrar
  entering: MutableRefObject<boolean>;
  reduced: boolean;
  onActive?: (index: number) => void;
  onSelect: (index: number) => void;
};

// Separación entre mundos a lo largo del eje de la cámara
const GAP = 16;

function worldPosition(index: number, portrait: boolean) {
  return new THREE.Vector3(
    portrait ? 0 : 2.15,
    portrait ? 0.9 : Math.sin(index * 1.7) * 0.35,
    -index * GAP,
  );
}

// Modelo 3D de la saga (palanca, pistola de portales…), centrado, a escala y girando despacio
function Model({
  src,
  radius,
  tilt,
  reduced,
}: {
  src: string;
  radius: number;
  tilt: number;
  reduced: boolean;
}) {
  const { scene } = useGLTF(src);
  const group = useRef<THREE.Group>(null);
  const { object, scale } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    clone.position.sub(sphere.center);
    return {
      object: clone,
      scale: (radius * 0.85) / Math.max(sphere.radius, 0.001),
    };
  }, [scene, radius]);

  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.y += delta * 0.35;
  });

  return (
    <group
      position={[0, 0, radius * 0.9]}
      rotation={[0, 0, tilt]}
      scale={scale}
    >
      <group ref={group}>
        <primitive object={object} />
      </group>
    </group>
  );
}

// Halo atmosférico: una esfera mayor vista por dentro que solo brilla en el borde, con el color de la saga
function Atmosphere({ radius, color }: { radius: number; color: string }) {
  const uniforms = useMemo(
    () => ({ color: { value: new THREE.Color(color) } }),
    [color],
  );

  return (
    <mesh scale={1.14}>
      <sphereGeometry args={[radius, 48, 48]} />
      <shaderMaterial
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader="varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
        fragmentShader="uniform vec3 color; varying vec3 vN; void main(){ float i = pow(0.78 - dot(vN, vec3(0.0, 0.0, 1.0)), 3.0); gl_FragColor = vec4(color, 1.0) * clamp(i, 0.0, 1.0) * 1.7; }"
      />
    </mesh>
  );
}

type WorldProps = {
  world: SceneWorld;
  index: number;
  position: THREE.Vector3;
  radius: number;
  glow: THREE.Texture;
  reduced: boolean;
  // El modelo 3D solo se carga cuando el mundo está cerca de la cámara
  near: boolean;
  onSelect: (index: number) => void;
};

function World({
  world,
  index,
  position,
  radius,
  glow,
  reduced,
  near,
  onSelect,
}: WorldProps) {
  const map = useTexture(world.backdrop ?? world.emblem);
  const sphere = useRef<THREE.Mesh>(null);
  const moons = useRef<THREE.Group>(null);
  const accent = useMemo(() => new THREE.Color(world.accent), [world.accent]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useFrame((_, delta) => {
    if (reduced) return;
    if (sphere.current) sphere.current.rotation.y += delta * 0.04;
    if (moons.current) moons.current.rotation.y += delta * 0.22;
  });

  function over(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
  }

  return (
    <group position={position}>
      {/* Nebulosa tras el mundo */}
      <Billboard position={[0, 0, -radius * 1.6]}>
        <mesh>
          <planeGeometry args={[radius * 11, radius * 11]} />
          <meshBasicMaterial
            map={glow}
            color={accent}
            transparent
            opacity={0.55}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Billboard>

      <mesh
        ref={sphere}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(index);
        }}
        onPointerOver={over}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      >
        <sphereGeometry args={[radius, 96, 96]} />
        <meshStandardMaterial
          map={map}
          emissiveMap={map}
          emissive={accent}
          emissiveIntensity={0.28}
          roughness={0.95}
          metalness={0}
        />
      </mesh>
      <Atmosphere radius={radius} color={world.accent} />

      {/* Anillo de órbita y lunas: una por juego */}
      <group rotation={[Math.PI / 2.35, 0.35, 0]}>
        <mesh>
          <torusGeometry args={[radius * 1.75, 0.012, 8, 220]} />
          <meshBasicMaterial color={accent} transparent opacity={0.5} />
        </mesh>
        <group ref={moons}>
          {Array.from({ length: world.gameCount }, (_, k) => {
            const angle = (k / Math.max(world.gameCount, 1)) * Math.PI * 2;
            return (
              <mesh
                key={k}
                position={[
                  Math.cos(angle) * radius * 1.75,
                  Math.sin(angle) * radius * 1.75,
                  0,
                ]}
              >
                <sphereGeometry args={[0.075, 16, 16]} />
                <meshBasicMaterial color={accent} />
              </mesh>
            );
          })}
        </group>
      </group>

      <Suspense fallback={null}>
        {world.model && near ? (
          <Model
            src={world.model}
            radius={radius}
            tilt={world.modelTilt ?? 0}
            reduced={reduced}
          />
        ) : world.model ? null : (
          <group position={[0, 0, radius * 1.05]}>
            <Emblem src={world.emblem} color="#ffffff" size={radius * 1.3} />
          </group>
        )}
      </Suspense>
    </group>
  );
}

// Cámara: viaja de un mundo al siguiente con el scroll, con suavizado, se inclina con el cursor y, al entrar, se
// lanza hacia el mundo activo con el campo de visión abierto
function Rig({
  worlds,
  target,
  entering,
  reduced,
  onActive,
}: Pick<
  SceneProps,
  "worlds" | "target" | "entering" | "reduced" | "onActive"
>) {
  const size = useThree((state) => state.size);
  const portrait = size.width / size.height < 1;
  const current = useRef(0);
  const dolly = useRef(0);
  const last = useRef(-1);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const goal = target.current;
    current.current = reduced
      ? goal
      : current.current +
        (goal - current.current) * (1 - Math.exp(-3.4 * delta));
    dolly.current =
      entering.current && !reduced
        ? Math.min(dolly.current + delta * 1.8, 1)
        : Math.max(dolly.current - delta * 2.5, 0);

    const i = Math.min(Math.floor(current.current), worlds.length - 1);
    const next = Math.min(i + 1, worlds.length - 1);
    const f = current.current - i;
    const eased = f * f * (3 - 2 * f);
    const a = worldPosition(i, portrait);
    const b = worldPosition(next, portrait);
    const focus = a.clone().lerp(b, eased);

    const px = reduced ? 0 : state.pointer.x;
    const py = reduced ? 0 : state.pointer.y;
    const lift = dolly.current * dolly.current * (3 - 2 * dolly.current);
    camera.position.set(
      portrait ? px * 0.4 : px * 0.55 - 0.1,
      focus.y * 0.5 + (portrait ? 1.4 : 0.35) + py * 0.3,
      focus.z + 6.6 - lift * 5.4,
    );
    look.set(portrait ? focus.x : focus.x * 0.55, focus.y, focus.z);
    camera.lookAt(look);
    camera.fov = 48 + lift * 34;
    camera.updateProjectionMatrix();

    const index = Math.round(current.current);
    if (index !== last.current) {
      last.current = index;
      onActive?.(index);
    }
  });

  return null;
}

function Scene({
  worlds,
  target,
  entering,
  reduced,
  onActive,
  onSelect,
}: SceneProps) {
  const size = useThree((state) => state.size);
  const portrait = size.width / size.height < 1;
  const glow = useMemo(() => makeGlowTexture(), []);
  const [focus, setFocus] = useState(0);
  const handleActive = (index: number) => {
    setFocus(index);
    onActive?.(index);
  };

  useEffect(() => () => glow.dispose(), [glow]);

  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 26, 90]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[-5, 4, 6]} intensity={2.4} />
      <directionalLight position={[6, -2, 3]} intensity={0.8} color="#8fa8ff" />
      <Stars count={5200} />
      <Rig
        worlds={worlds}
        target={target}
        entering={entering}
        reduced={reduced}
        onActive={handleActive}
      />
      {worlds.map((world, index) => (
        <World
          key={world.id}
          world={world}
          index={index}
          position={worldPosition(index, portrait)}
          radius={index === 0 ? 1.9 : 1.55}
          glow={glow}
          reduced={reduced}
          near={Math.abs(index - focus) <= 1}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

// Escena 3D del mapa de universos: un campo de estrellas profundo y un mundo por saga a lo largo de un viaje
export default function UniverseScene(props: SceneProps) {
  return (
    <Canvas
      camera={{ fov: 48, near: 0.1, far: 220, position: [0, 0.4, 6] }}
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}
