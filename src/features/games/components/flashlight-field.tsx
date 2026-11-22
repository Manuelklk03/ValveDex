"use client";

import { useEffect, useRef } from "react";
import styles from "./flashlight-field.module.css";

// Gesto del dossier de Left 4 Dead: el cursor es una linterna. Un haz de luz verdosa sigue al puntero por el
// refugio y se apaga al salir. Es aditivo y va por debajo del texto: ilumina la pared sin quitar contraste a las letras.
// Decorativo: no recibe clics y no se activa con puntero táctil ni con «reducir movimiento»
export function FlashlightField() {
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
      field.style.setProperty("--fx", `${event.clientX - box.left}px`);
      field.style.setProperty("--fy", `${event.clientY - box.top}px`);
      field.dataset.on = "true";
    }
    function leave() {
      if (field) delete field.dataset.on;
    }

    dossier.addEventListener("pointermove", move);
    dossier.addEventListener("pointerleave", leave);
    return () => {
      dossier.removeEventListener("pointermove", move);
      dossier.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={root} className={styles["flashlight-field"]} aria-hidden="true" />
  );
}
