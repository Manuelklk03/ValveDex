"use client";

import { useEffect } from "react";

// Colores de la página que la cabecera y el pie heredan. Cada tema (universo o juego) los publica como variables CSS en
// su contenedor; aquí se copian a la raíz con el prefijo --chrome-
const KEYS = [
  "background",
  "foreground",
  "surface",
  "border",
  "muted",
  "accent",
] as const;

function apply() {
  const themes = document.querySelectorAll<HTMLElement>("[data-chrome-theme]");
  // El último de la lista es el más anidado (el tema del juego manda sobre el del universo)
  const deepest = themes[themes.length - 1];
  const root = document.documentElement;
  for (const key of KEYS) {
    const value = deepest
      ? getComputedStyle(deepest).getPropertyValue(`--${key}`).trim()
      : "";
    if (value) root.style.setProperty(`--chrome-${key}`, value);
    else root.style.removeProperty(`--chrome-${key}`);
  }
}

// Sin salida visible: al montar un tema, la cabecera y el pie toman su paleta (con transición); al desmontarlo y no quedar
// ninguno, vuelven a la de Valve. Se pone dentro de los contenedores de tema
export function ChromeSync() {
  useEffect(() => {
    apply();
    return () => {
      // Después del montaje de la página siguiente: si ya hay otro tema, se queda el suyo
      requestAnimationFrame(apply);
    };
  }, []);

  return null;
}
