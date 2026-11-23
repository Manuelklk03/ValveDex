"use client";

import { useEffect } from "react";

// Comportamiento de la cabecera con el scroll, publicado como atributos y variables en la raíz para que el CSS los use:
// data-chrome-scrolled (se vuelve cristal al bajar), data-chrome-hidden (se esconde al bajar y vuelve al subir) y
// --chrome-progress (0 a 1, lo recorrido de la página)
export function ChromeScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let last = window.scrollY;
    let frame = 0;

    function update() {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--chrome-progress",
        max > 0 ? String(Math.min(Math.max(y / max, 0), 1)) : "0",
      );
      root.toggleAttribute("data-chrome-scrolled", y > 8);

      // No se esconde con un menú abierto, con el foco dentro de la cabecera, cerca del inicio ni con movimiento reducido
      const header = document.querySelector("header");
      const busy =
        !!header?.querySelector('button[aria-expanded="true"]') ||
        !!header?.contains(document.activeElement);
      if (reduced.matches || busy || y < 120 || y < last - 4) {
        root.removeAttribute("data-chrome-hidden");
      } else if (y > last + 4) {
        root.setAttribute("data-chrome-hidden", "");
      }
      last = y;
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Al enfocar la cabecera con el teclado vuelve a verse
    function onFocusIn(event: FocusEvent) {
      if ((event.target as HTMLElement).closest("header")) {
        root.removeAttribute("data-chrome-hidden");
      }
    }
    document.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("focusin", onFocusIn);
      if (frame) cancelAnimationFrame(frame);
      root.removeAttribute("data-chrome-scrolled");
      root.removeAttribute("data-chrome-hidden");
      root.style.removeProperty("--chrome-progress");
    };
  }, []);

  return null;
}
