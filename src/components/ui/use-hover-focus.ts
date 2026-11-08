"use client";

import { useState, type FocusEvent, type PointerEvent } from "react";

// Estado «activo» de una tarjeta: ratón y foco de teclado son orígenes distintos. La tarjeta está activa si
// cualquiera de los dos lo está, así que salir con el ratón no apaga el foco ni al revés.
export function useHoverFocus() {
  const [pointerOver, setPointerOver] = useState(false);
  const [focused, setFocused] = useState(false);
  const [everActive, setEverActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  function prepare() {
    setEverActive(true);
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }

  return {
    active: pointerOver || focused,
    // Ha estado activa alguna vez: sirve para descargar el modelo 3D solo cuando hace falta
    everActive,
    reduceMotion,
    handlers: {
      onPointerEnter(event: PointerEvent<HTMLElement>) {
        if (event.pointerType !== "mouse") return;
        setPointerOver(true);
        prepare();
      },
      onPointerLeave() {
        setPointerOver(false);
      },
      onFocus(event: FocusEvent<HTMLElement>) {
        if (!event.target.matches(":focus-visible")) return;
        setFocused(true);
        prepare();
      },
      onBlur(event: FocusEvent<HTMLElement>) {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      },
    },
  };
}
