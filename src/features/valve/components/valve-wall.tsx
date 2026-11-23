"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import {
  Bolts,
  PipeValve,
  PipeLeak,
  Steam,
  makeWallTexture,
  ringBolts,
  type Bolt,
  type Vent,
} from "./valve-parts";

type WallProps = {
  target: MutableRefObject<number>;
  reduced: boolean;
  portrait: boolean;
  onStart: () => void;
};

// Geometría de la zona industrial (se comparte con el pasillo): la pared frontal está en z = WALL_Z desde x = CORNER_X
// hacia la derecha y, en la esquina, gira hacia el fondo; por ese lado se entra
export const WALL_Z = -2.6;
export const CORNER_X = -6;

const PIPE_Y = [2.6, -2.5];
const FLANGE_X = [-4.2, -0.4, 3.4, 8.2, 11.8, 16];
// Rotura de la tubería alta: un hueco por el que sale el vapor a presión
const BREAK_X = 5.6;
// Agujeros reventados: uno en la tubería baja y otro en la vertical
const LEAK_LOW_X = 1.6;
const LEAK_RISER_X = 7.4;
const LEAK_RISER_Y = -0.8;
const PIPE_Z = WALL_Z + 0.25;

// Esfera del reloj medidor: marcas, números y una zona roja de presión
function makeGaugeFace() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const g = canvas.getContext("2d");
  if (g) {
    const c = size / 2;
    g.fillStyle = "#e7dfcd";
    g.beginPath();
    g.arc(c, c, c, 0, Math.PI * 2);
    g.fill();
    const start = Math.PI * 0.75;
    const sweep = Math.PI * 1.5;
    g.strokeStyle = "#b3261a";
    g.lineWidth = 16;
    g.beginPath();
    g.arc(c, c, c - 40, start + sweep * 0.8, start + sweep);
    g.stroke();
    g.fillStyle = "#1c1b19";
    g.strokeStyle = "#1c1b19";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = "bold 34px sans-serif";
    for (let i = 0; i <= 50; i += 1) {
      const a = start + (i / 50) * sweep;
      const major = i % 5 === 0;
      const inner = c - (major ? 78 : 60);
      g.lineWidth = major ? 5 : 2;
      g.beginPath();
      g.moveTo(c + Math.cos(a) * (c - 30), c + Math.sin(a) * (c - 30));
      g.lineTo(c + Math.cos(a) * inner, c + Math.sin(a) * inner);
      g.stroke();
      if (major) {
        g.fillText(
          String(i * 2),
          c + Math.cos(a) * (c - 112),
          c + Math.sin(a) * (c - 112),
        );
      }
    }
    g.font = "bold 30px sans-serif";
    g.fillText("PRESIÓN", c, c + 120);
    g.font = "22px sans-serif";
    g.fillText("STEAM", c, c + 156);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Pared de la zona industrial: tuberías con bridas atornilladas que sueltan vapor y una rotura, un reloj medidor y,
// saliendo de él, la válvula roja de Valve. A la izquierda la pared gira en una esquina y las tuberías la siguen: por ahí
// avanza el mundo
export function ValveWall({ target, reduced, portrait, onStart }: WallProps) {
  const wallMap = useMemo(() => makeWallTexture(3, 2), []);
  const faceMap = useMemo(() => makeGaugeFace(), []);
  const needle = useRef<THREE.Group>(null);
  const wheel = useRef<THREE.Group>(null);
  const gx = portrait ? 0 : 2;
  const gy = portrait ? 1.7 : 0.2;
  // El manómetro va aparte, en un ramal de la tubería de la válvula: abajo a la derecha del volante
  const mx = gx + (portrait ? 1.5 : 2.7);
  const my = gy - (portrait ? 1.6 : 1.35);
  const mScale = portrait ? 0.4 : 0.5;
  const pipeX0 = CORNER_X - 0.25;
  const pipeLen = 40 - pipeX0;

  useEffect(() => {
    return () => {
      wallMap.dispose();
      faceMap.dispose();
      document.body.style.cursor = "";
    };
  }, [wallMap, faceMap]);

  const bolts = useMemo<Bolt[]>(
    () =>
      PIPE_Y.flatMap((y) =>
        FLANGE_X.flatMap((x) => [
          ...ringBolts([x, y, PIPE_Z], 0.33, 8, "x", 0.09),
          ...ringBolts([x, y, PIPE_Z], 0.33, 8, "x", -0.09),
        ]),
      ),
    [],
  );

  const vents = useMemo<Vent[]>(
    () => [
      ...FLANGE_X.slice(0, 5).map<Vent>((x, i) => ({
        p: [x, PIPE_Y[i % 2] + 0.3, PIPE_Z + 0.4],
        d: [0.05, 0.8, 0.4],
        count: 3,
        size: 0.9,
      })),
      // La tubería alta partida: chorro a presión hacia la cámara
      {
        p: [BREAK_X, PIPE_Y[0], PIPE_Z + 0.3],
        d: [0.35, 0.25, 0.9],
        count: 12,
        size: 1.1,
        speed: 1.3,
        jet: true,
      },
      // Agujero reventado en la tubería baja
      {
        p: [LEAK_LOW_X, PIPE_Y[1] + 0.13, PIPE_Z + 0.23],
        d: [0, 0.5, 0.87],
        count: 10,
        size: 0.9,
        speed: 1.2,
        jet: true,
      },
      // Agujero reventado en la tubería vertical
      {
        p: [LEAK_RISER_X - 0.1, LEAK_RISER_Y, WALL_Z + 0.4],
        d: [-0.5, 0.1, 0.85],
        count: 9,
        size: 0.85,
        speed: 1.1,
        jet: true,
      },
      // Una fuga en el codo de la esquina
      {
        p: [CORNER_X - 0.4, PIPE_Y[1] + 0.3, PIPE_Z + 0.5],
        d: [-0.3, 1, 0.1],
        count: 4,
        size: 1,
      },
    ],
    [],
  );
  useFrame((state, delta) => {
    const t = reduced ? 0 : state.clock.elapsedTime;

    // Aguja del reloj: vibra alrededor de una presión alta
    if (needle.current) {
      const v = 0.6 + 0.12 * Math.sin(t * 0.9) + 0.03 * Math.sin(t * 7);
      needle.current.rotation.z = THREE.MathUtils.lerp(2.35, -2.35, v);
    }

    // Válvula: gira despacio, más al avanzar por el viaje, y se inclina hacia el cursor
    if (wheel.current) {
      if (!reduced) {
        wheel.current.rotation.z += delta * 0.18;
        const k = 1 - Math.exp(-4 * delta);
        wheel.current.rotation.y +=
          (state.pointer.x * 0.28 - wheel.current.rotation.y) * k;
        wheel.current.rotation.x +=
          (-state.pointer.y * 0.2 - wheel.current.rotation.x) * k;
        // Al avanzar por el viaje la válvula se abre: gira más deprisa
        wheel.current.rotation.z += target.current * delta * 0.6;
      }
    }
  });

  const spokes = [0, 1, 2, 3, 4];
  const pipeMaterial = (
    <meshStandardMaterial color="#5c4a3d" metalness={0.75} roughness={0.42} />
  );
  const upperLeft = BREAK_X - 0.3 - pipeX0;
  const upperRight = 40 - (BREAK_X + 0.3);

  return (
    <group>
      {/* Pared frontal: de la esquina hacia la derecha */}
      <mesh
        position={[(CORNER_X + 40) / 2, 0, WALL_Z - 0.05]}
        raycast={() => null}
      >
        <planeGeometry args={[40 - CORNER_X, 19]} />
        <meshStandardMaterial map={wallMap} roughness={0.92} metalness={0.15} />
      </mesh>
      {/* Poste de la esquina */}
      <mesh position={[CORNER_X, 0, WALL_Z - 0.04]} raycast={() => null}>
        <boxGeometry args={[0.35, 19, 0.35]} />
        <meshStandardMaterial color="#1d1e20" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Tubería baja y fina, completas */}
      <mesh
        position={[pipeX0 + pipeLen / 2, PIPE_Y[1], PIPE_Z]}
        rotation={[0, 0, Math.PI / 2]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.26, 0.26, pipeLen, 24]} />
        {pipeMaterial}
      </mesh>
      <mesh
        position={[pipeX0 + pipeLen / 2, 1.2, PIPE_Z - 0.05]}
        rotation={[0, 0, Math.PI / 2]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.1, 0.1, pipeLen, 16]} />
        <meshStandardMaterial
          color="#3d4a52"
          metalness={0.7}
          roughness={0.45}
        />
      </mesh>

      {/* Tubería alta, partida por la rotura: dos tramos y un hueco oscuro con bordes irregulares */}
      <mesh
        position={[pipeX0 + upperLeft / 2, PIPE_Y[0], PIPE_Z]}
        rotation={[0, 0, Math.PI / 2]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.26, 0.26, upperLeft, 24]} />
        {pipeMaterial}
      </mesh>
      <mesh
        position={[BREAK_X + 0.3 + upperRight / 2, PIPE_Y[0], PIPE_Z]}
        rotation={[0, 0, Math.PI / 2]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.26, 0.26, upperRight, 24]} />
        {pipeMaterial}
      </mesh>
      <mesh position={[BREAK_X, PIPE_Y[0], PIPE_Z]} raycast={() => null}>
        <boxGeometry args={[0.55, 0.4, 0.4]} />
        <meshStandardMaterial color="#080808" roughness={1} />
      </mesh>
      {[-0.1, 0.12, 0.28].map((dz, i) => (
        <mesh
          key={dz}
          position={[
            BREAK_X + (i % 2 ? 0.28 : -0.28),
            PIPE_Y[0] + 0.2 - i * 0.12,
            PIPE_Z + dz,
          ]}
          rotation={[0, 0, (i - 1) * 0.5]}
          raycast={() => null}
        >
          <boxGeometry args={[0.16, 0.08, 0.06]} />
          <meshStandardMaterial
            color="#3a2c22"
            metalness={0.8}
            roughness={0.5}
          />
        </mesh>
      ))}

      {/* Tuberías verticales */}
      {[7.4, 14.2].map((x) => (
        <mesh key={x} position={[x, 0, WALL_Z + 0.2]} raycast={() => null}>
          <cylinderGeometry args={[0.2, 0.2, 19, 20]} />
          <meshStandardMaterial
            color="#3d4a52"
            metalness={0.7}
            roughness={0.45}
          />
        </mesh>
      ))}

      {/* Bridas con sus tornillos */}
      {PIPE_Y.flatMap((y) =>
        FLANGE_X.map((x) => (
          <mesh
            key={`${x}${y}`}
            position={[x, y, PIPE_Z]}
            rotation={[0, 0, Math.PI / 2]}
            raycast={() => null}
          >
            <cylinderGeometry args={[0.42, 0.42, 0.16, 24]} />
            <meshStandardMaterial
              color="#6e5a4a"
              metalness={0.8}
              roughness={0.4}
            />
          </mesh>
        )),
      )}
      <Bolts bolts={bolts} />

      {/* Codos: las dos tuberías giran con la pared en la esquina */}
      {PIPE_Y.map((y) => (
        <mesh key={y} position={[pipeX0, y, PIPE_Z]} raycast={() => null}>
          <sphereGeometry args={[0.31, 20, 20]} />
          <meshStandardMaterial
            color="#6e5a4a"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Válvulas pequeñas sobre las tuberías */}
      <PipeValve position={[-2.2, PIPE_Y[0] + 0.27, PIPE_Z - 0.1]} axis="z" />
      <PipeValve position={[10, PIPE_Y[1] + 0.27, PIPE_Z - 0.1]} axis="z" />

      <Steam vents={vents} reduced={reduced} />

      {/* Tubería de la válvula: sube detrás del volante, con su cuerpo, y de ella sale un ramal al manómetro */}
      <mesh position={[gx, 0, WALL_Z + 0.2]} raycast={() => null}>
        <cylinderGeometry args={[0.22, 0.22, 19, 20]} />
        <meshStandardMaterial
          color="#3d4a52"
          metalness={0.7}
          roughness={0.45}
        />
      </mesh>
      <mesh
        position={[gx, gy, WALL_Z + 0.35]}
        rotation={[Math.PI / 2, 0, 0]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.55, 0.6, 0.5, 28]} />
        <meshStandardMaterial color="#6e5a4a" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[gx, my, WALL_Z + 0.2]} raycast={() => null}>
        <sphereGeometry args={[0.3, 20, 20]} />
        <meshStandardMaterial color="#6e5a4a" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh
        position={[(gx + mx) / 2, my, WALL_Z + 0.2]}
        rotation={[0, 0, Math.PI / 2]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.1, 0.1, Math.abs(mx - gx), 14]} />
        <meshStandardMaterial
          color="#8d8a82"
          metalness={0.85}
          roughness={0.35}
        />
      </mesh>

      {/* Manómetro: la esfera, con su caja trasera, montada en el ramal */}
      <group position={[mx, my, WALL_Z + 0.45]} scale={mScale}>
        <mesh
          position={[0, 0, -0.5]}
          rotation={[Math.PI / 2, 0, 0]}
          raycast={() => null}
        >
          <cylinderGeometry args={[2.25, 2.25, 0.7, 40]} />
          <meshStandardMaterial
            color="#3b3b40"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>
        <mesh raycast={() => null}>
          <torusGeometry args={[2.05, 0.18, 20, 80]} />
          <meshStandardMaterial
            color="#8d8a82"
            metalness={0.85}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0.02]} raycast={() => null}>
          <circleGeometry args={[2, 64]} />
          <meshStandardMaterial map={faceMap} roughness={0.6} />
        </mesh>
        <group ref={needle} position={[0, 0, 0.1]}>
          <mesh position={[0, 0.7, 0]} raycast={() => null}>
            <boxGeometry args={[0.1, 1.6, 0.04]} />
            <meshStandardMaterial
              color="#b3261a"
              emissive="#b3261a"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
            <cylinderGeometry args={[0.16, 0.16, 0.08, 20]} />
            <meshStandardMaterial color="#1c1b19" />
          </mesh>
        </group>
      </group>

      {/* Bocas reventadas de las tuberías */}
      <PipeLeak
        position={[LEAK_LOW_X, PIPE_Y[1] + 0.13, PIPE_Z + 0.225]}
        normal={[0, 0.5, 0.87]}
      />
      <PipeLeak
        position={[LEAK_RISER_X - 0.1, LEAK_RISER_Y, WALL_Z + 0.37]}
        normal={[-0.5, 0, 0.87]}
        size={0.8}
      />
      {/* Válvula roja: sale de su cuerpo con el vástago */}
      <group position={[gx, gy, WALL_Z + 0.1]}>
        <mesh
          position={[0, 0, 0.7]}
          rotation={[Math.PI / 2, 0, 0]}
          raycast={() => null}
        >
          <cylinderGeometry args={[0.12, 0.12, 1.4, 16]} />
          <meshStandardMaterial
            color="#9a9a96"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        <group
          ref={wheel}
          position={[0, 0, 1.45]}
          scale={0.8}
          onClick={(event) => {
            event.stopPropagation();
            onStart();
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        >
          <mesh>
            <torusGeometry args={[1.45, 0.16, 24, 96]} />
            <meshStandardMaterial
              color="#b3261a"
              metalness={0.78}
              roughness={0.34}
              emissive="#4a0d08"
              emissiveIntensity={0.6}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.3, 32]} />
            <meshStandardMaterial
              color="#3b3b40"
              metalness={0.9}
              roughness={0.3}
            />
          </mesh>
          {spokes.map((i) => (
            <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI]}>
              <boxGeometry args={[0.13, 2.9, 0.13]} />
              <meshStandardMaterial
                color="#8d1f15"
                metalness={0.8}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Luces: lámpara con rejilla, cálida, y el rojo de la válvula sobre la pared */}
      <mesh position={[-3, 4.6, WALL_Z + 0.5]} raycast={() => null}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial
          color="#3a2e1c"
          emissive="#ffd9a0"
          emissiveIntensity={2.2}
        />
      </mesh>
      <pointLight
        position={[-3, 4.2, WALL_Z + 2]}
        intensity={55}
        distance={16}
        color="#ffd9a0"
      />
      <pointLight
        position={[gx, gy, WALL_Z + 3.4]}
        intensity={40}
        distance={12}
        color="#ff5a3c"
      />
      <pointLight
        position={[BREAK_X, PIPE_Y[0], WALL_Z + 1.4]}
        intensity={8}
        distance={6}
        color="#cfe3ff"
      />
    </group>
  );
}
