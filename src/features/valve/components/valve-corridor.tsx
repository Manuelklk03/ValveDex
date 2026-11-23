"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  Bolts,
  PipeLeak,
  PipeValve,
  Steam,
  makeWallTexture,
  ringBolts,
  type Bolt,
  type Vent,
} from "./valve-parts";
import { CORNER_X, WALL_Z } from "./valve-wall";

// Pasillo por el que avanza el mundo: empieza en la esquina de la pared, entre el lado del bloque (x = CORNER_X) y una
// pared opuesta, con el suelo, el techo, tuberías atornilladas a lo largo, lámparas y vapor
export const OPPOSITE_X = -22;
const FLOOR_Y = -4.4;
const CEILING_Y = 5.4;
const START_Z = WALL_Z; // donde empieza el lado del bloque
// El pasillo acaba antes de la parada de los universos: esa parada queda «fuera de la estación», en el espacio abierto
const END_Z = -66;
const LENGTH = START_Z - END_Z;
const PIPE_X = CORNER_X - 0.25;
const PIPE_HEIGHTS = [2.6, -2.5];
const FLANGE_STEP = 9;
// Bocas reventadas de la tubería alta a lo largo del pasillo
const LEAK_Z = [-27, -52];

type CorridorProps = {
  reduced: boolean;
};

export function ValveCorridor({ reduced }: CorridorProps) {
  const sideMap = useMemo(() => makeWallTexture(LENGTH / 13, 2), []);
  const farMap = useMemo(() => makeWallTexture(LENGTH / 13, 2), []);
  const travelingLight = useRef<THREE.PointLight>(null);
  const flangeZ = useMemo(
    () =>
      Array.from(
        { length: Math.floor(LENGTH / FLANGE_STEP) - 1 },
        (_, i) => START_Z - 6 - i * FLANGE_STEP,
      ),
    [],
  );

  useEffect(() => {
    return () => {
      sideMap.dispose();
      farMap.dispose();
    };
  }, [sideMap, farMap]);

  const bolts = useMemo<Bolt[]>(
    () =>
      PIPE_HEIGHTS.flatMap((y) =>
        flangeZ.flatMap((z) => [
          ...ringBolts([PIPE_X, y, z], 0.33, 8, "z", 0.09),
          ...ringBolts([PIPE_X, y, z], 0.33, 8, "z", -0.09),
        ]),
      ),
    [flangeZ],
  );

  const vents = useMemo<Vent[]>(
    () => [
      // Fugas en las bridas de la tubería alta, hacia el pasillo
      ...flangeZ
        .filter((_, i) => i % 2 === 0)
        .map<Vent>((z) => ({
          p: [PIPE_X - 0.4, PIPE_HEIGHTS[0] + 0.25, z],
          d: [-0.35, 1, 0],
          count: 3,
          size: 1,
        })),
      // Bocas reventadas: chorros a presión hacia el pasillo
      ...LEAK_Z.map<Vent>((z) => ({
        p: [PIPE_X - 0.5, PIPE_HEIGHTS[0] + 0.05, z],
        d: [-1, 0.2, 0.05],
        count: 11,
        size: 1.2,
        speed: 1.3,
        jet: true,
      })),
      // Rejillas del suelo: columnas de vapor que suben
      ...flangeZ
        .filter((_, i) => i % 3 === 1)
        .map<Vent>((z) => ({
          p: [-14 + (z % 3), FLOOR_Y + 0.2, z],
          d: [0, 1, 0],
          count: 4,
          size: 1.4,
          speed: 0.9,
        })),
    ],
    [flangeZ],
  );

  // La luz del pasillo acompaña a la cámara: una sola luz de punto en vez de una por parada
  // La luz acompaña a la cámara real (no al destino del scroll): una sola luz de punto en vez de una por parada
  useFrame((state) => {
    if (travelingLight.current) {
      travelingLight.current.position.z = state.camera.position.z - 4;
    }
  });

  const lamps = Array.from({ length: 5 }, (_, i) => START_Z - 10 - i * 12);
  const centerZ = (START_Z + END_Z) / 2;

  return (
    <group>
      {/* Lado del bloque (pared con la que gira la pared frontal), vista desde el pasillo */}
      <mesh
        position={[CORNER_X, 0, centerZ]}
        rotation={[0, -Math.PI / 2, 0]}
        raycast={() => null}
      >
        <planeGeometry args={[LENGTH, 19]} />
        <meshStandardMaterial map={sideMap} roughness={0.92} metalness={0.15} />
      </mesh>
      {/* Pared opuesta, que arranca antes: el pasillo se abre a una sala al principio */}
      <mesh
        position={[OPPOSITE_X, 0, (START_Z + 14 + END_Z) / 2]}
        rotation={[0, Math.PI / 2, 0]}
        raycast={() => null}
      >
        <planeGeometry args={[LENGTH + 14, 19]} />
        <meshStandardMaterial map={farMap} roughness={0.95} metalness={0.1} />
      </mesh>
      {/* Suelo y techo */}
      <mesh
        position={[
          (CORNER_X + OPPOSITE_X) / 2,
          FLOOR_Y,
          (START_Z + 14 + END_Z) / 2,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
        raycast={() => null}
      >
        <planeGeometry args={[CORNER_X - OPPOSITE_X, LENGTH + 14]} />
        <meshStandardMaterial color="#1a1b1c" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh
        position={[
          (CORNER_X + OPPOSITE_X) / 2,
          CEILING_Y,
          (START_Z + 14 + END_Z) / 2,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
        raycast={() => null}
      >
        <planeGeometry args={[CORNER_X - OPPOSITE_X, LENGTH + 14]} />
        <meshStandardMaterial color="#141516" roughness={0.9} />
      </mesh>
      {/* Franjas de peligro a lo largo del suelo, junto a las paredes */}
      {[CORNER_X - 0.8, OPPOSITE_X + 0.8].map((x) => (
        <mesh
          key={x}
          position={[x, FLOOR_Y + 0.01, (START_Z + END_Z) / 2]}
          raycast={() => null}
        >
          <boxGeometry args={[0.35, 0.02, LENGTH]} />
          <meshStandardMaterial
            color="#f39a2e"
            emissive="#f39a2e"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Tuberías a lo largo del lado del bloque, con codos, bridas y tornillos */}
      {PIPE_HEIGHTS.map((y) => (
        <group key={y}>
          <mesh
            position={[PIPE_X, y, (START_Z + END_Z) / 2]}
            rotation={[Math.PI / 2, 0, 0]}
            raycast={() => null}
          >
            <cylinderGeometry args={[0.26, 0.26, LENGTH, 24]} />
            <meshStandardMaterial
              color="#5c4a3d"
              metalness={0.75}
              roughness={0.42}
            />
          </mesh>
          {flangeZ.map((z) => (
            <mesh
              key={z}
              position={[PIPE_X, y, z]}
              rotation={[Math.PI / 2, 0, 0]}
              raycast={() => null}
            >
              <cylinderGeometry args={[0.42, 0.42, 0.16, 24]} />
              <meshStandardMaterial
                color="#6e5a4a"
                metalness={0.8}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
      ))}
      <Bolts bolts={bolts} />
      {flangeZ
        .filter((_, i) => i % 4 === 2)
        .map((z) => (
          <PipeValve
            key={z}
            position={[PIPE_X - 0.1, PIPE_HEIGHTS[1] + 0.27, z + 3]}
            axis="x"
          />
        ))}

      <Steam vents={vents} reduced={reduced} />
      {LEAK_Z.map((z) => (
        <PipeLeak
          key={z}
          position={[PIPE_X - 0.25, PIPE_HEIGHTS[0] + 0.05, z]}
          normal={[-1, 0.1, 0]}
          size={1.1}
        />
      ))}

      {/* Lámparas del techo */}
      {lamps.map((z) => (
        <mesh
          key={z}
          position={[-14, CEILING_Y - 0.15, z]}
          raycast={() => null}
        >
          <boxGeometry args={[2.6, 0.12, 0.5]} />
          <meshStandardMaterial
            color="#3a2e1c"
            emissive="#ffd9a0"
            emissiveIntensity={1.6}
          />
        </mesh>
      ))}
      <pointLight
        ref={travelingLight}
        position={[-14, 3.2, 0]}
        intensity={95}
        distance={26}
        color="#ffd9a0"
      />
    </group>
  );
}
