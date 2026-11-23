"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

// Viaje por scroll de las escenas 3D (portada y universos): una sección alta con un escenario fijo cuya cámara pasa de
// una parada a otra. El hook calcula la parada activa a partir del scroll (no de la escena, para que el HUD funcione
// aunque falle WebGL), da la posición fraccionaria que sigue la cámara, la navegación por flechas y el estado de
// «entrando» que lanza la cámara hacia el destino
export function useScrollTravel(count: number) {
  const section = useRef<HTMLElement>(null);
  const target = useRef(0);
  const entering = useRef(false);
  const resetTimer = useRef<number | undefined>(undefined);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const lastIndex = Math.max(count - 1, 1);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // El scroll fija a qué parada mira la cámara: la primera al empezar y la última al llegar al final de la sección
  useEffect(() => {
    function onScroll() {
      const el = section.current;
      if (!el) return;
      const travel = el.offsetHeight - window.innerHeight;
      const progress =
        travel > 0 ? -el.getBoundingClientRect().top / travel : 0;
      target.current = Math.min(Math.max(progress, 0), 1) * (count - 1);
      setActive(Math.round(target.current));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  const goTo = useCallback(
    (index: number) => {
      const el = section.current;
      if (!el) return;
      const clamped = Math.min(Math.max(index, 0), count - 1);
      const travel = el.offsetHeight - window.innerHeight;
      const top =
        el.getBoundingClientRect().top +
        window.scrollY +
        (clamped / lastIndex) * travel;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    },
    [count, lastIndex, reduced],
  );

  // Flechas izquierda y derecha: parada anterior y siguiente. Solo con el foco en la página o dentro de la sección y
  // con el escenario a la vista, para no quitárselas a otros controles; se parte del destino del scroll, no de la parada
  // ya alcanzada
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const el = event.target as HTMLElement | null;
      const stage = section.current;
      if (!stage) return;
      const free = !el || el === document.body || stage.contains(el);
      const field = el?.closest(
        "input, textarea, select, dialog, [role='combobox']",
      );
      // Solo mientras el escenario está fijo en pantalla: leyendo el resto de la página las flechas son del navegador
      const rect = stage.getBoundingClientRect();
      const visible = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (
        !free ||
        field ||
        !visible ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      )
        return;
      const base = Math.round(target.current);
      if (event.key === "ArrowRight") goTo(base + 1);
      if (event.key === "ArrowLeft") goTo(base - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  // La cámara deja de estar lanzada al volver desde la caché del navegador y también si la navegación no llega a
  // producirse (la entrada animada se abre sola a los 4 s)
  useEffect(() => {
    const restore = () => {
      entering.current = false;
    };
    window.addEventListener("pageshow", restore);
    return () => {
      window.removeEventListener("pageshow", restore);
      window.clearTimeout(resetTimer.current);
    };
  }, []);

  // Se usa como onClick del enlace: solo lanza la cámara si la entrada animada ha tomado el clic (lo marca con
  // preventDefault); un clic con modificador o un segundo clic no la activan
  const startEntering = useCallback((event?: { defaultPrevented: boolean }) => {
    if (event && !event.defaultPrevented) return;
    entering.current = true;
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      entering.current = false;
    }, 5000);
  }, []);

  return {
    section: section as RefObject<HTMLElement | null>,
    target,
    entering,
    active,
    reduced,
    goTo,
    startEntering,
  };
}
