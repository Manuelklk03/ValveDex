"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import type { MediaAsset } from "@/domain/media-asset";
import styles from "./image-compare.module.css";

// Three.js solo se descarga cuando alguien pulsa «Ver en 3D»
const ModelCompare = dynamic(() => import("./model-compare"), {
  ssr: false,
  loading: () => (
    <div
      className={`${styles["image-compare__frame"]} ${styles["image-compare__frame--3d"]}`}
    >
      <p className={styles["image-compare__loading"]}>Cargando el modelo…</p>
    </div>
  ),
});

// El marco mide como máximo 32rem (image-compare.module.css)
const IMAGE_SIZES = "(max-width: 32rem) 100vw, 32rem";

type ImageCompareProps = {
  before: MediaAsset;
  after: MediaAsset;
  beforeLabel: string;
  afterLabel: string;
  models?: { original: string; hd: string };
};

export function ImageCompare({
  before,
  after,
  beforeLabel,
  afterLabel,
  models,
}: ImageCompareProps) {
  const [position, setPosition] = useState(50);
  const [is3d, setIs3d] = useState(false);

  return (
    <div className={styles["image-compare"]}>
      {models && (
        <button
          type="button"
          className={styles["image-compare__toggle"]}
          aria-pressed={is3d}
          onClick={() => setIs3d(!is3d)}
        >
          {is3d ? "Ver capturas" : "Ver en 3D"}
        </button>
      )}

      {models && is3d ? (
        <ModelCompare
          before={models.original}
          after={models.hd}
          position={position}
          label={`Modelo 3D: ${beforeLabel} y ${afterLabel}. Arrastra o usa las flechas para girarlo`}
        />
      ) : (
        <div className={styles["image-compare__frame"]}>
          <Image
            src={before.src}
            alt={before.alt}
            width={before.width}
            height={before.height}
            // Calidad 100 (permitida en next.config.ts): a 75 las capturas se emborronan; sizes evita bajar el original entero en móvil
            quality={100}
            sizes={IMAGE_SIZES}
            className={styles["image-compare__image"]}
            // Las capturas no tienen fondo: sin este recorte, el original asomaría por las zonas transparentes del HD
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          />
          <Image
            src={after.src}
            alt={after.alt}
            width={after.width}
            height={after.height}
            quality={100}
            sizes={IMAGE_SIZES}
            className={`${styles["image-compare__image"]} ${styles["image-compare__image--after"]}`}
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          />
          <span
            className={styles["image-compare__divider"]}
            style={{ left: `${position}%` }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Cada etiqueta va en el extremo hacia el que hay que llevar el control para ver esa versión entera */}
      <label className={styles["image-compare__control"]}>
        <span>{afterLabel}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className={styles["image-compare__range"]}
          aria-label={`Comparar ${beforeLabel} y ${afterLabel}`}
        />
        <span>{beforeLabel}</span>
      </label>
    </div>
  );
}
