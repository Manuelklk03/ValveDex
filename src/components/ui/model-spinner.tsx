"use client";

import { Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import {
  Box3,
  MathUtils,
  Sphere,
  type Group,
  type PerspectiveCamera,
} from "three";

type ModelSpinnerProps = {
  src: string;
  // Solo se mueve (y gasta GPU) mientras está activo: la tarjeta lo activa con el ratón o el teclado
  active: boolean;
  // Inclinación del eje, en radianes: una pieza alargada (palanca, arma) gira mejor en diagonal que plana
  tilt?: number;
  // Giro sobre X, en radianes: los personajes de Source vienen tumbados en su pose de referencia (π/2 los pone de pie)
  roll?: number;
  // Vueltas por segundo
  speed?: number;
};

function Spinning({
  src,
  active,
  tilt = 0,
  roll = 0,
  speed = 0.14,
}: ModelSpinnerProps) {
  const spin = useRef<Group>(null);
  const { scene } = useGLTF(src);
  const get = useThree((state) => state.get);
  const invalidate = useThree((state) => state.invalidate);

  // Encuadre por la esfera que envuelve el modelo, para que quepa desde cualquier ángulo
  useEffect(() => {
    if (!spin.current) return;
    const camera = get().camera as PerspectiveCamera;
    spin.current.updateWorldMatrix(true, true);
    const { radius } = new Box3()
      .setFromObject(spin.current)
      .getBoundingSphere(new Sphere());
    const distance =
      (radius / Math.sin(MathUtils.degToRad(camera.fov / 2))) * 1.05;
    camera.position.set(0, 0.25, 1).setLength(distance);
    camera.near = distance / 100;
    camera.far = distance * 10;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [get, invalidate, scene, tilt, roll]);

  useFrame((state, delta) => {
    if (!active || !spin.current) return;
    spin.current.rotation.y += delta * speed * Math.PI * 2;
    // Respira un poco arriba y abajo, para que no parezca un plato giratorio
    spin.current.position.y = Math.sin(state.clock.elapsedTime * 1.6) * 0.03;
  });

  // El grupo exterior gira sobre el eje vertical; el interior inclina la pieza y la centra
  return (
    <group ref={spin}>
      <group rotation={[roll, 0, tilt]}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </group>
  );
}

export default function ModelSpinner(props: ModelSpinnerProps) {
  return (
    <Canvas
      camera={{ fov: 30, position: [0, 0.4, 3] }}
      dpr={[1, 1.5]}
      frameloop={props.active ? "always" : "demand"}
    >
      {/* Misma luz de estudio que el visor 3D de las fichas */}
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#ffffff", "#4a4236", 1.1]} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <directionalLight position={[-5, 2, -3]} intensity={1} />
      <directionalLight position={[0, 4, -6]} intensity={1.4} />
      <Suspense fallback={null}>
        <Spinning {...props} />
      </Suspense>
    </Canvas>
  );
}
