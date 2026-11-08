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
  // Solo gira (y gasta GPU) mientras está activo: la tarjeta lo activa al pasar el ratón
  active: boolean;
  // Vueltas por segundo
  speed?: number;
};

function Spinning({ src, active, speed = 0.12 }: ModelSpinnerProps) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(src);
  const get = useThree((state) => state.get);
  const invalidate = useThree((state) => state.invalidate);

  // Encuadre por la esfera que envuelve el modelo, para que quepa desde cualquier ángulo
  useEffect(() => {
    if (!group.current) return;
    const camera = get().camera as PerspectiveCamera;
    group.current.updateWorldMatrix(true, true);
    const { radius } = new Box3()
      .setFromObject(group.current)
      .getBoundingSphere(new Sphere());
    const distance =
      (radius / Math.sin(MathUtils.degToRad(camera.fov / 2))) * 1.1;
    camera.position.set(0.6, 0.35, 1).setLength(distance);
    camera.near = distance / 100;
    camera.far = distance * 10;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [get, invalidate, scene]);

  useFrame((_, delta) => {
    if (active && group.current)
      group.current.rotation.y += delta * speed * Math.PI * 2;
  });

  return (
    <Center>
      <group ref={group}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function ModelSpinner(props: ModelSpinnerProps) {
  return (
    <Canvas
      camera={{ fov: 30, position: [2, 1.2, 3] }}
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
