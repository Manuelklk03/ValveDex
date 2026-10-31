"use client";

import { Bounds, Center, OrbitControls, useGLTF } from "@react-three/drei";
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
import type { Group } from "three";
import styles from "./image-compare.module.css";

type ModelCompareProps = {
  before: string;
  after: string;
  // Porcentaje del ancho que ocupa el modelo «before», el mismo que el deslizador de las capturas
  position: number;
  label: string;
};

// Un solo lienzo y una sola cámara: cada fotograma pinta el original a la izquierda de la cortina y el HD a la derecha
function Models({ before, after, position }: Omit<ModelCompareProps, "label">) {
  const beforeRef = useRef<Group>(null);
  const afterRef = useRef<Group>(null);
  const { scene: beforeScene } = useGLTF(before);
  const { scene: afterScene } = useGLTF(after);
  const invalidate = useThree((state) => state.invalidate);

  // El lienzo solo se repinta al girar (OrbitControls) o al mover la cortina
  useEffect(() => invalidate(), [position, invalidate]);

  useFrame(({ gl, scene, camera, size }) => {
    if (!beforeRef.current || !afterRef.current) return;
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
    <Bounds fit clip observe margin={1.15}>
      {/* El HD Pack cambió el origen de las armas: cada modelo se centra por separado */}
      <Center>
        <group ref={beforeRef}>
          <primitive object={beforeScene} />
        </group>
      </Center>
      <Center>
        <group ref={afterRef}>
          <primitive object={afterScene} />
        </group>
      </Center>
    </Bounds>
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
          <hemisphereLight args={["#ffffff", "#3a3328", 2.2]} />
          <directionalLight position={[3, 5, 4]} intensity={1.6} />
          <Suspense fallback={null}>
            <Models before={before} after={after} position={position} />
          </Suspense>
          <OrbitControls ref={controls} makeDefault enablePan={false} />
        </Canvas>
      </ModelError>
      <span
        className={styles["image-compare__divider"]}
        style={{ left: `${position}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
