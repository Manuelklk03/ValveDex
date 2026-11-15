"use client";

import { useEffect } from "react";

// Cierre de los desplegables de los dossiers con Escape. Los dossiers se ven siempre: antes se
// ocultaban con GSAP hasta acercarse con el scroll y, en pantallas altas o cargas lentas, no aparecían
export function DossierMotion() {
  // Escape cierra la ficha desplegada (WCAG 1.4.13) hasta que el ratón o el foco salen del apartado
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      document
        .querySelectorAll<HTMLElement>("[data-expandable]")
        .forEach((sector) => {
          if (!sector.matches(":hover, :focus-within")) return;

          sector.dataset.dismissed = "";
          const reset = () => delete sector.dataset.dismissed;
          sector.addEventListener("pointerleave", reset, { once: true });
          sector.addEventListener("focusout", reset, { once: true });
        });
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
