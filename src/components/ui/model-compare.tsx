"use client";

import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  type ComponentRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  Box3,
  MathUtils,
  Sphere,
  type Group,
  type PerspectiveCamera,
} from "three";
import styles from "./image-compare.module.css";

type ModelCompareProps = {
  before: string;
  // Sin versión HD (armas nuevas de las expansiones): un solo modelo, sin cortina
  after?: string;
  // Porcentaje del ancho que ocupa el modelo «before», el mismo que el deslizador de las capturas
  position: number;
  label: string;
};

// Un solo lienzo y una sola cámara: cada fotograma pinta el original a la izquierda de la cortina y el HD a la derecha
function Models({ before, after, position }: Omit<ModelCompareProps, "label">) {
  const beforeRef = useRef<Group>(null);
  const afterRef = useRef<Group>(null);
  const { scene: beforeScene } = useGLTF(before);
  // useGLTF no puede ir dentro de un if: sin HD vuelve a pedir el original (está en caché) y no se pinta
  const { scene: afterScene } = useGLTF(after ?? before);
  const invalidate = useThree((state) => state.invalidate);
  const get = useThree((state) => state.get);
  // OrbitControls se registra después del primer render: el encuadre espera a que exista
  const hasControls = useThree((state) => state.controls !== null);

  // Encuadre por la esfera que envuelve los modelos, no por su caja: así caben desde cualquier ángulo al girarlos
  useEffect(() => {
    const camera = get().camera as PerspectiveCamera;
    const controls = get().controls as ComponentRef<
      typeof OrbitControls
    > | null;
    if (!beforeRef.current || !controls) return;
    beforeRef.current.updateWorldMatrix(true, true);
    const box = new Box3().setFromObject(beforeRef.current);
    if (afterRef.current) box.union(new Box3().setFromObject(afterRef.current));
    const { radius } = box.getBoundingSphere(new Sphere());
    const distance =
      (radius / Math.sin(MathUtils.degToRad(camera.fov / 2))) * 1.05;
    camera.position.setLength(distance);
    camera.near = distance / 100;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.minDistance = radius * 1.2;
    controls.maxDistance = distance * 2.5;
    controls.update();
    invalidate();
  }, [get, hasControls, invalidate, after]);

  // El lienzo solo se repinta al girar (OrbitControls) o al mover la cortina
  useEffect(() => invalidate(), [position, invalidate]);

  useFrame(({ gl, scene, camera, size }) => {
    if (!beforeRef.current) return;
    gl.autoClear = false;
    if (!afterRef.current) {
      gl.clear();
      gl.render(scene, camera);
      return;
    }
    const split = Math.round((size.width * position) / 100);
    gl.autoClear = false;
    gl.setScissorTest(false);
    gl.clear();
    gl.setScissorTest(true);
    for (const [visible, x, width] of [
      [beforeRef.current, 0, split],
      [afterRef.current, split, size.width - split],
    ] as const) {
      beforeRef.current.visible = visible === beforeRef.current;
      afterRef.current.visible = visible === afterRef.current;
      gl.setScissor(x, 0, width, size.height);
      gl.render(scene, camera);
    }
    gl.setScissorTest(false);
  }, 1);

  return (
    <>
      {/* El HD Pack cambió el origen de las armas: cada modelo se centra por separado y gira sobre su centro */}
      <Center>
        <group ref={beforeRef}>
          <primitive object={beforeScene} />
        </group>
      </Center>
      {after && (
        <Center>
          <group ref={afterRef}>
            <primitive object={afterScene} />
          </group>
        </Center>
      )}
    </>
  );
}

// Si un modelo no se descarga o no se puede leer, el visor lo dice en vez de quedarse vacío
class ModelError extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <p className={styles["image-compare__loading"]}>
        No se pudo cargar el modelo 3D. Vuelve a las capturas.
      </p>
    ) : (
      this.props.children
    );
  }
}

export default function ModelCompare({
  before,
  after,
  position,
  label,
}: ModelCompareProps) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);

  // Teclado: las flechas giran la cámara alrededor del arma
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const orbit = controls.current;
    const step = Math.PI / 12;
    const turn = {
      ArrowLeft: [step, 0],
      ArrowRight: [-step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    }[event.key];
    if (!orbit || !turn) return;
    event.preventDefault();
    orbit.setAzimuthalAngle(orbit.getAzimuthalAngle() + turn[0]);
    orbit.setPolarAngle(orbit.getPolarAngle() + turn[1]);
  }

  return (
    <div
      className={`${styles["image-compare__frame"]} ${styles["image-compare__frame--3d"]}`}
      role="application"
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <ModelError>
        <Canvas
          camera={{ fov: 30, position: [2, 1.2, 3] }}
          dpr={[1, 2]}
          frameloop="demand"
        >
          {/* Luz de estudio: principal, relleno y contorno; los modelos de 1998 tienen la sombra pintada en la textura */}
          <ambientLight intensity={0.9} />
          <hemisphereLight args={["#ffffff", "#4a4236", 1.1]} />
          <directionalLight position={[4, 6, 5]} intensity={2.4} />
          <directionalLight position={[-5, 2, -3]} intensity={1} />
          <directionalLight position={[0, 4, -6]} intensity={1.4} />
          <Suspense fallback={null}>
            <Models before={before} after={after} position={position} />
          </Suspense>
          <OrbitControls ref={controls} makeDefault enablePan={false} />
        </Canvas>
      </ModelError>
      {after && (
        <span
          className={styles["image-compare__divider"]}
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
