import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { LineIcon } from "@/data/universe-art";
import styles from "./entry-hero.module.css";

type EntryHeroProps = {
  name: string;
  summary: string;
  // Nombre del apartado (Armas, Personajes…) y su id, que da el color del sector
  sectionName?: string;
  sectionId?: string;
  specs: { label: string; value: string }[];
  // Imagen de la primera aparición: tiñe el fondo con su propia paleta
  backdrop?: string;
  // Icono de línea del juego, para las fichas que no tienen imagen propia
  gameIcon?: LineIcon;
  breadcrumb: ReactNode;
  // El visor 3D, el comparador o la imagen de la ficha
  media?: ReactNode;
};

// Cabecera de una ficha: título y hoja técnica a la izquierda y, a la derecha, su visor 3D o su imagen
export function EntryHero({
  name,
  summary,
  sectionName,
  sectionId,
  specs,
  backdrop,
  gameIcon,
  breadcrumb,
  media,
}: EntryHeroProps) {
  return (
    <header
      className={styles["entry-hero"]}
      style={
        sectionId
          ? ({
              "--sector-color": `var(--sector-${sectionId})`,
            } as CSSProperties)
          : undefined
      }
    >
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles["entry-hero__backdrop"]}
        />
      )}
      <div className={styles["entry-hero__veil"]} aria-hidden="true" />
      {!media && gameIcon && (
        <div
          className={styles["entry-hero__icon"]}
          style={{
            maskImage: `url(${gameIcon.src})`,
            WebkitMaskImage: `url(${gameIcon.src})`,
          }}
          aria-hidden="true"
        />
      )}

      <div
        className={
          media
            ? styles["entry-hero__inner"]
            : `${styles["entry-hero__inner"]} ${styles["entry-hero__inner--single"]}`
        }
      >
        <div className={styles["entry-hero__text"]}>
          <div className={styles["entry-hero__crumbs"]}>{breadcrumb}</div>
          {sectionName && (
            <p className={styles["entry-hero__kicker"]}>{sectionName}</p>
          )}
          <h1 className={styles["entry-hero__title"]}>{name}</h1>
          <p className={styles["entry-hero__summary"]}>{summary}</p>
          <dl className={styles["entry-hero__specs"]}>
            {specs.map((spec) => (
              <div key={spec.label} className={styles["entry-hero__spec"]}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {media && <div className={styles["entry-hero__media"]}>{media}</div>}
      </div>
    </header>
  );
}
