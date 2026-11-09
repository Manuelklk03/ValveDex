import type { ReactNode } from "react";
import { IndustrialBackdrop } from "@/components/ui/industrial-backdrop";
import styles from "./valve-hero.module.css";

type ValveHeroProps = {
  breadcrumb: ReactNode;
  eyebrow: string;
  title: string;
  intro: string;
  // Foto, ficha o imagen que acompaña al texto a la derecha
  media?: ReactNode;
};

// Cabecera a sangre de las páginas de Valve: fondo industrial con vapor, título grande y, si hay, su imagen
export function ValveHero({
  breadcrumb,
  eyebrow,
  title,
  intro,
  media,
}: ValveHeroProps) {
  return (
    <header className={styles["valve-hero"]}>
      <IndustrialBackdrop />
      <div
        className={
          media
            ? styles["valve-hero__inner"]
            : `${styles["valve-hero__inner"]} ${styles["valve-hero__inner--single"]}`
        }
      >
        <div className={styles["valve-hero__text"]}>
          <div>{breadcrumb}</div>
          <p className={styles["valve-hero__eyebrow"]}>{eyebrow}</p>
          <h1 className={styles["valve-hero__title"]}>{title}</h1>
          <p className={styles["valve-hero__intro"]}>{intro}</p>
        </div>
        {media && <div className={styles["valve-hero__media"]}>{media}</div>}
      </div>
    </header>
  );
}
