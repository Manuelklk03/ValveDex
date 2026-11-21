"use client";

import { useEffect, useRef } from "react";
import styles from "./portal-field.module.css";

// Gesto del dossier de Portal: dos portales enlazados. El naranja se abre donde está el cursor y el azul, en el punto
// opuesto del dossier (el reflejo respecto a su centro); al salir, se cierran. Es decorativo: no recibe clics y no
// se activa con puntero táctil ni con «reducir movimiento»
export function PortalField() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = root.current;
    const dossier = field?.closest("article");
    if (!field || !dossier) return;
    // La preferencia puede cambiar con la página abierta: se consulta en cada movimiento
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    function move(event: PointerEvent) {
      if (!field || !dossier || event.pointerType !== "mouse") return;
      if (reduce.matches) return;
      const box = dossier.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      field.style.setProperty("--ox", `${x}px`);
      field.style.setProperty("--oy", `${y}px`);
      field.style.setProperty("--bx", `${box.width - x}px`);
      field.style.setProperty("--by", `${box.height - y}px`);
      field.dataset.open = "true";
    }
    function leave() {
      if (field) delete field.dataset.open;
    }

    dossier.addEventListener("pointermove", move);
    dossier.addEventListener("pointerleave", leave);
    return () => {
      dossier.removeEventListener("pointermove", move);
      dossier.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={root} className={styles["portal-field"]} aria-hidden="true">
      <span
        className={`${styles["portal-field__ring"]} ${styles["portal-field__ring--orange"]}`}
      />
      <span
        className={`${styles["portal-field__ring"]} ${styles["portal-field__ring--blue"]}`}
      />
    </div>
  );
}
