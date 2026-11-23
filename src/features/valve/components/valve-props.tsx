"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { hash } from "./valve-parts";

// Objetos flotantes de la parada Historia: lo que construyó Valve. Cada uno es un modelo propio, sin raycast
// (decoración), con las proporciones de su referencia real

// Rectángulo de esquinas redondeadas, para carcasas y marcos
function roundedRect(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

// Libera la geometría al desmontar
function useDisposable<T extends THREE.BufferGeometry>(make: () => T) {
  const [geometry] = useState(make);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

// Logotipo de Steam: el trazado vectorial del icono (viewBox 24) sobre un disco oscuro. Los huecos del trazado dejan ver
// el disco, como en el original
export const STEAM_PATH =
  "M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z";

function makeSteamTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const g = canvas.getContext("2d");
  if (g) {
    const gradient = g.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, "#1b2838");
    gradient.addColorStop(1, "#0b1119");
    g.fillStyle = gradient;
    g.beginPath();
    g.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    g.fill();
    const scale = (size * 0.86) / 24;
    g.translate(size * 0.07, size * 0.07);
    g.scale(scale, scale);
    g.fillStyle = "#c7d5e0";
    g.fill(new Path2D(STEAM_PATH));
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function SteamBadge() {
  const map = useMemo(() => makeSteamTexture(), []);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <group>
      {/* Disco con grosor y borde metálico */}
      <mesh rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
        <cylinderGeometry args={[0.52, 0.52, 0.08, 48]} />
        <meshStandardMaterial color="#66c0f4" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.041]} raycast={() => null}>
        <circleGeometry args={[0.5, 48]} />
        <meshBasicMaterial map={map} transparent />
      </mesh>
    </group>
  );
}

// Disquete de 3,5": 90 × 94 mm y 3,3 mm de grueso, con la esquina cortada, el obturador metálico con su ranura arriba, la
// etiqueta abajo y la pestaña de protección contra escritura
export function Floppy() {
  const body = useDisposable(() => {
    const shape = new THREE.Shape();
    // 0,9 × 0,94 (cada unidad son 10 cm); la esquina de arriba a la derecha va cortada 8 mm
    shape.moveTo(-0.45, -0.47);
    shape.lineTo(0.45, -0.47);
    shape.lineTo(0.45, 0.39);
    shape.lineTo(0.37, 0.47);
    shape.lineTo(-0.45, 0.47);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.033,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.006,
      bevelSegments: 2,
    });
  });
  const z = 0.044;

  return (
    <group position={[0, 0, -0.02]}>
      <mesh geometry={body} raycast={() => null}>
        <meshStandardMaterial
          color="#1d2740"
          roughness={0.38}
          metalness={0.1}
        />
      </mesh>
      {/* Obturador metálico con su ranura */}
      <mesh position={[0.06, 0.31, z]} raycast={() => null}>
        <boxGeometry args={[0.3, 0.32, 0.012]} />
        <meshStandardMaterial
          color="#c4c8ce"
          metalness={0.9}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[0.1, 0.33, z + 0.008]} raycast={() => null}>
        <boxGeometry args={[0.09, 0.22, 0.004]} />
        <meshStandardMaterial color="#10131a" roughness={0.9} />
      </mesh>
      {/* Etiqueta con la franja de color y las líneas de texto */}
      <mesh position={[0, -0.17, z]} raycast={() => null}>
        <boxGeometry args={[0.7, 0.5, 0.006]} />
        <meshStandardMaterial color="#ece6d4" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.01, z + 0.005]} raycast={() => null}>
        <boxGeometry args={[0.7, 0.07, 0.006]} />
        <meshStandardMaterial color="#b3261a" roughness={0.7} />
      </mesh>
      {[-0.1, -0.18, -0.26, -0.34].map((y) => (
        <mesh key={y} position={[-0.05, y, z + 0.005]} raycast={() => null}>
          <boxGeometry args={[0.52, 0.012, 0.004]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.9} />
        </mesh>
      ))}
      {/* Pestaña de protección contra escritura */}
      <mesh position={[0.37, -0.4, z - 0.005]} raycast={() => null}>
        <boxGeometry args={[0.07, 0.07, 0.016]} />
        <meshStandardMaterial color="#0c0f18" roughness={0.6} />
      </mesh>
    </group>
  );
}

// Pantalla de un monitor de tubo: verde fósforo con líneas de barrido y un símbolo del sistema
function makeCrtScreen() {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 240;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#03150a";
    g.fillRect(0, 0, 320, 240);
    g.fillStyle = "#4dff88";
    g.font = "bold 26px monospace";
    g.fillText("C:\\VALVE>_", 24, 54);
    g.font = "20px monospace";
    g.fillText("HALF-LIFE.EXE", 24, 96);
    g.fillText("SIERRA ON-LINE", 24, 128);
    g.fillText("1998", 24, 160);
    g.fillStyle = "rgba(0,0,0,0.28)";
    for (let y = 0; y < 240; y += 4) g.fillRect(0, y, 320, 2);
    const vignette = g.createRadialGradient(160, 120, 60, 160, 120, 200);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.65)");
    g.fillStyle = vignette;
    g.fillRect(0, 0, 320, 240);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Monitor de tubo de los noventa: marco beige biselado, cristal abombado, cuerpo trasero que se estrecha, peana y botones
export function Crt() {
  const screen = useMemo(() => makeCrtScreen(), []);
  const bezel = useDisposable(() => {
    const shape = roundedRect(1.04, 0.88, 0.07);
    shape.holes.push(
      (() => {
        const hole = roundedRect(0.8, 0.62, 0.05);
        return hole;
      })(),
    );
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 3,
    });
  });
  useEffect(() => () => screen.dispose(), [screen]);

  return (
    <group>
      <mesh geometry={bezel} position={[0, 0.02, 0.28]} raycast={() => null}>
        <meshStandardMaterial color="#cbc3a8" roughness={0.62} />
      </mesh>
      {/* Imagen plana de la pantalla y, delante, el cristal abombado que la refleja */}
      <mesh position={[0, 0.02, 0.3]} raycast={() => null}>
        <planeGeometry args={[0.8, 0.62]} />
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>
      <mesh
        position={[0, 0.02, 0.3]}
        scale={[0.41, 0.31, 0.07]}
        rotation={[Math.PI / 2, 0, 0]}
        raycast={() => null}
      >
        <sphereGeometry args={[1, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          roughness={0.05}
          clearcoat={1}
          depthWrite={false}
        />
      </mesh>{" "}
      {/* Cuerpo trasero: un tronco que se estrecha */}
      <mesh
        position={[0, 0.02, -0.1]}
        rotation={[Math.PI / 2, Math.PI / 4, 0]}
        scale={[1, 1, 0.82]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.46, 0.7, 0.68, 4]} />
        <meshStandardMaterial color="#bdb59a" roughness={0.75} />
      </mesh>
      {/* Peana y botones del frente */}
      <mesh position={[0, -0.5, 0.0]} raycast={() => null}>
        <boxGeometry args={[0.56, 0.06, 0.5]} />
        <meshStandardMaterial color="#aaa38a" roughness={0.7} />
      </mesh>
      {[0.1, 0.19, 0.28].map((x) => (
        <mesh key={x} position={[x, -0.4, 0.43]} raycast={() => null}>
          <boxGeometry args={[0.06, 0.03, 0.03]} />
          <meshStandardMaterial color="#8d866f" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0.4, -0.4, 0.43]} raycast={() => null}>
        <boxGeometry args={[0.03, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#1c8a45"
          emissive="#35d66a"
          emissiveIntensity={1.4}
        />
      </mesh>
    </group>
  );
}

// Contorno de un engranaje: dientes trapezoidales y un agujero central
function gearShape(teeth: number, outer: number, root: number, hole: number) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i += 1) {
    const a = i * step;
    const pts: [number, number][] = [
      [root, a],
      [outer, a + step * 0.14],
      [outer, a + step * 0.36],
      [root, a + step * 0.5],
    ];
    pts.forEach(([r, angle], k) => {
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0 && k === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();
  const inner = new THREE.Path();
  inner.absarc(0, 0, hole, 0, Math.PI * 2, true);
  shape.holes.push(inner);
  return shape;
}

function GearMesh({ teeth, outer }: { teeth: number; outer: number }) {
  const geometry = useDisposable(
    () =>
      new THREE.ExtrudeGeometry(
        gearShape(teeth, outer, outer * 0.82, outer * 0.28),
        {
          depth: 0.16,
          bevelEnabled: true,
          bevelThickness: 0.015,
          bevelSize: 0.015,
          bevelSegments: 2,
        },
      ),
  );
  return (
    <mesh geometry={geometry} raycast={() => null}>
      <meshStandardMaterial color="#9c9a93" metalness={0.9} roughness={0.32} />
    </mesh>
  );
}

// Dos engranajes engranados que giran en sentidos opuestos: lo que mueve la maquinaria de la empresa
export function Gears({ reduced }: { reduced: boolean }) {
  const big = useRef<THREE.Group>(null);
  const small = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reduced) return;
    if (big.current) big.current.rotation.z += delta * 0.4;
    // Los dientes engranan: el pequeño gira al revés y más deprisa en proporción a sus dientes
    if (small.current) small.current.rotation.z -= delta * 0.4 * (14 / 9);
  });

  return (
    <group>
      <group ref={big}>
        <GearMesh teeth={14} outer={0.5} />
      </group>
      <group ref={small} position={[0.76, -0.38, 0]} rotation={[0, 0, 0.2]}>
        <GearMesh teeth={9} outer={0.34} />
      </group>
    </group>
  );
}

// Válvula de Valve: volante rojo con cinco radios y empuñaduras, cubo central y base del vástago
export function ValveBadge() {
  return (
    <group>
      <mesh raycast={() => null}>
        <torusGeometry args={[0.45, 0.065, 18, 56]} />
        <meshStandardMaterial
          color="#b3261a"
          metalness={0.75}
          roughness={0.35}
          emissive="#4a0d08"
          emissiveIntensity={0.5}
        />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 + Math.PI / 2;
        return (
          <group key={i} rotation={[0, 0, a]}>
            <mesh position={[0.23, 0, 0]} raycast={() => null}>
              <boxGeometry args={[0.44, 0.05, 0.05]} />
              <meshStandardMaterial
                color="#8d1f15"
                metalness={0.8}
                roughness={0.4}
              />
            </mesh>
            <mesh position={[0.46, 0, 0]} raycast={() => null}>
              <sphereGeometry args={[0.07, 14, 14]} />
              <meshStandardMaterial
                color="#d8d2c4"
                metalness={0.6}
                roughness={0.35}
              />
            </mesh>
          </group>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
        <cylinderGeometry args={[0.11, 0.11, 0.12, 20]} />
        <meshStandardMaterial color="#3b3b40" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh
        position={[0, 0, -0.18]}
        rotation={[Math.PI / 2, 0, 0]}
        raycast={() => null}
      >
        <cylinderGeometry args={[0.05, 0.05, 0.3, 12]} />
        <meshStandardMaterial color="#9a9a96" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

const CROWBAR_SRC = "/models/entries/crowbar-half-life-hd.glb";

function CrowbarModel({ length }: { length: number }) {
  const { scene } = useGLTF(CROWBAR_SRC);
  const { object, scale } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    clone.position.sub(sphere.center);
    return { object: clone, scale: length / (sphere.radius * 2) };
  }, [scene, length]);
  return (
    <group scale={scale}>
      <primitive object={object} />
    </group>
  );
}

// La palanca de Half-Life: el modelo real del juego, de la ficha de la palanca
export function Crowbar({ length = 2.4 }: { length?: number }) {
  return (
    <Suspense fallback={null}>
      <CrowbarModel length={length} />
    </Suspense>
  );
}

// Gafas de realidad virtual (estilo Valve Index): visor con frontal negro y dos cámaras, juntas de goma, lentes y la
// diadema con su arco superior
export function VrHeadset() {
  const strap = useDisposable(
    () => new THREE.TorusGeometry(0.62, 0.05, 12, 40, Math.PI),
  );
  const visor = useDisposable(
    () =>
      new THREE.ExtrudeGeometry(roundedRect(1.5, 0.78, 0.22), {
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 3,
      }),
  );
  return (
    <group>
      <mesh geometry={visor} position={[0, 0, -0.2]} raycast={() => null}>
        <meshStandardMaterial
          color="#17191f"
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>
      {/* Frontal: franja clara y las dos cámaras */}
      <mesh position={[0, 0, 0.27]} raycast={() => null}>
        <boxGeometry args={[1.3, 0.3, 0.02]} />
        <meshStandardMaterial color="#2c3038" roughness={0.3} metalness={0.6} />
      </mesh>
      {[-0.42, 0.42].map((x) => (
        <mesh
          key={x}
          position={[x, 0, 0.29]}
          rotation={[Math.PI / 2, 0, 0]}
          raycast={() => null}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.03, 24]} />
          <meshStandardMaterial
            color="#35d0e8"
            emissive="#35d0e8"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      {/* Arco de la diadema por encima y por detrás */}
      <mesh
        geometry={strap}
        position={[0, 0.3, -0.2]}
        rotation={[0, 0, 0]}
        raycast={() => null}
      >
        <meshStandardMaterial color="#17191f" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, -0.75]} raycast={() => null}>
        <boxGeometry args={[1.0, 0.3, 0.12]} />
        <meshStandardMaterial color="#222" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Pequeños destellos de polvo alrededor de los objetos (puntos fijos que se mecen con el grupo)
export function Sparkles() {
  const points = useMemo(() => {
    const positions = new Float32Array(40 * 3);
    for (let i = 0; i < 40; i += 1) {
      positions[i * 3] = (hash(i + 1) - 0.5) * 7;
      positions[i * 3 + 1] = (hash(i + 70) - 0.5) * 5;
      positions[i * 3 + 2] = (hash(i + 140) - 0.5) * 2;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);
  useEffect(() => () => points.dispose(), [points]);
  return (
    <points geometry={points} raycast={() => null}>
      <pointsMaterial
        color="#ffd9a0"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}
