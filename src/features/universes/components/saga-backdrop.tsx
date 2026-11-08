"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import styles from "./saga-backdrop.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type SagaLayer = { id: string; accent: string; image?: string };

type SagaBackdropProps = { layers: SagaLayer[] };

// Fondo fijo de toda la página que cambia con la saga que se tiene delante: cada elemento con data-saga="<id>"
// activa su capa (color de la saga y su captura desenfocada) mientras cruza el centro de la pantalla.
export function SagaBackdrop({ layers }: SagaBackdropProps) {
  const [current, setCurrent] = useState(layers[0]?.id);

  useGSAP(() => {
    const triggers = layers.flatMap((layer) =>
      Array.from(
        document.querySelectorAll<HTMLElement>(`[data-saga="${layer.id}"]`),
      ).map((element) =>
        ScrollTrigger.create({
          trigger: element,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => {
            if (self.isActive) setCurrent(layer.id);
          },
        }),
      ),
    );
    return () => triggers.forEach((trigger) => trigger.kill());
  });

  return (
    <div className={styles["saga-backdrop"]} aria-hidden="true">
      {layers.map((layer) => (
        <div
          key={layer.id}
          className={
            layer.id === current
              ? `${styles["saga-backdrop__layer"]} ${styles["saga-backdrop__layer--active"]}`
              : styles["saga-backdrop__layer"]
          }
          style={{ "--layer-accent": layer.accent } as CSSProperties}
        >
          {layer.image && (
            <Image
              src={layer.image}
              alt=""
              fill
              sizes="100vw"
              className={styles["saga-backdrop__image"]}
            />
          )}
          <div className={styles["saga-backdrop__glow"]} />
        </div>
      ))}
    </div>
  );
}
