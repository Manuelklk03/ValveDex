"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useHoverFocus } from "@/components/ui/use-hover-focus";
import styles from "./entry-tile.module.css";

// El modelo 3D se descarga la primera vez que se activa una ficha; después, solo gira mientras está activa
const ModelSpinner = dynamic(() => import("@/components/ui/model-spinner"), {
  ssr: false,
});

type EntryTileProps = {
  href: string;
  name: string;
  summary: string;
  image?: { src: string; width: number; height: number };
  // Las capturas (mapas) llenan el marco; los renders con fondo transparente se ajustan enteros
  isCapture?: boolean;
  model?: string;
  facts: { label: string; value: string }[];
};

// Ficha de un apartado: render o captura grande, datos clave y, si hay modelo, el arma o criatura girando al activarla
export function EntryTile({
  href,
  name,
  summary,
  image,
  isCapture = false,
  model,
  facts,
}: EntryTileProps) {
  const { active, everActive, reduceMotion, handlers } = useHoverFocus();
  // Un solo lienzo WebGL activo a la vez: se desmonta al soltar la ficha
  const showModel = Boolean(model) && active && everActive;

  return (
    <li
      className={
        active
          ? `${styles["entry-tile"]} ${styles["entry-tile--active"]}`
          : styles["entry-tile"]
      }
      onPointerEnter={handlers.onPointerEnter}
      onPointerLeave={handlers.onPointerLeave}
      onFocus={handlers.onFocus}
      onBlur={handlers.onBlur}
    >
      <div className={styles["entry-tile__media"]} aria-hidden="true">
        {image && (
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 45vw, 90vw"
            className={
              isCapture
                ? `${styles["entry-tile__image"]} ${styles["entry-tile__image--capture"]}`
                : styles["entry-tile__image"]
            }
          />
        )}
        {showModel && model && (
          <div className={styles["entry-tile__model"]}>
            <ModelSpinner src={model} tilt={0.35} active={!reduceMotion} />
          </div>
        )}
        {model && <span className={styles["entry-tile__badge"]}>3D</span>}
      </div>

      <div className={styles["entry-tile__body"]}>
        <h2 className={styles["entry-tile__title"]}>
          <Link href={href} className={styles["entry-tile__link"]}>
            {name}
          </Link>
        </h2>
        {facts.length > 0 && (
          <ul className={styles["entry-tile__facts"]}>
            {facts.map((fact) => (
              <li key={fact.label} className={styles["entry-tile__fact"]}>
                <span>{fact.label}</span> {fact.value}
              </li>
            ))}
          </ul>
        )}
        <p className={styles["entry-tile__summary"]}>{summary}</p>
      </div>
    </li>
  );
}
