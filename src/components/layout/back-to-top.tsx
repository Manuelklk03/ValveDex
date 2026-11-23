"use client";

import styles from "./back-to-top.module.css";

// Botón del pie para volver arriba con un desplazamiento suave (instantáneo con movimiento reducido)
export function BackToTop() {
  return (
    <button
      type="button"
      className={styles["back-to-top"]}
      onClick={() => {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
    >
      <span className={styles["back-to-top__arrow"]} aria-hidden="true">
        ↑
      </span>
      Volver arriba
    </button>
  );
}
