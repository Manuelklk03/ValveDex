"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaAsset } from "@/domain/media-asset";
import styles from "./image-compare.module.css";

type ImageCompareProps = {
  before: MediaAsset;
  after: MediaAsset;
  beforeLabel: string;
  afterLabel: string;
};

export function ImageCompare({
  before,
  after,
  beforeLabel,
  afterLabel,
}: ImageCompareProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className={styles["image-compare"]}>
      <div className={styles["image-compare__frame"]}>
        <Image
          src={before.src}
          alt={before.alt}
          width={before.width}
          height={before.height}
          className={styles["image-compare__image"]}
          // Las capturas no tienen fondo: sin este recorte, el original asomaría por las zonas transparentes del HD
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <Image
          src={after.src}
          alt={after.alt}
          width={after.width}
          height={after.height}
          className={`${styles["image-compare__image"]} ${styles["image-compare__image--after"]}`}
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        />
        <span
          className={styles["image-compare__divider"]}
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
      </div>

      <label className={styles["image-compare__control"]}>
        <span>{beforeLabel}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className={styles["image-compare__range"]}
          aria-label={`Comparar ${beforeLabel} y ${afterLabel}`}
        />
        <span>{afterLabel}</span>
      </label>
    </div>
  );
}
