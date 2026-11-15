"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import styles from "./elevator-transition.module.css";

const CLOSE_MS = 480;
const OPEN_MS = 620;
const EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
// Si la página nueva no llega, las puertas se abren solas para no dejar al visitante encerrado
const FAILSAFE_MS = 4000;

// Navegación en curso: su identificador evita que una respuesta tardía actúe sobre otra navegación
type Pending = { id: number };

// Puertas de ascensor de Black Mesa: se cierran sobre la pantalla al pulsar un enlace interno marcado con
// `data-elevator` y se abren cuando llega la página nueva. Con «reducir movimiento» no hace nada y la
// navegación es la normal.
export function ElevatorTransition() {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<Pending | null>(null);
  const failsafe = useRef<number | undefined>(undefined);
  const counter = useRef(0);

  const slide = useCallback((closing: boolean) => {
    const element = root.current;
    if (!element) return Promise.resolve();
    element.dataset.active = "true";
    const doors = [...element.querySelectorAll<HTMLElement>("[data-door]")];
    const finished = doors.map((door, index) => {
      const offscreen = index === 0 ? "-100%" : "100%";
      return door.animate(
        {
          transform: closing
            ? [`translateX(${offscreen})`, "translateX(0)"]
            : ["translateX(0)", `translateX(${offscreen})`],
        },
        {
          duration: closing ? CLOSE_MS : OPEN_MS,
          easing: EASE,
          fill: "forwards",
        },
      ).finished;
    });
    // Una animación cancelada rechaza `finished`: no debe dejar las puertas a medias ni romper la cadena
    return Promise.all(finished)
      .catch(() => undefined)
      .then(() => {
        if (!closing) delete element.dataset.active;
      });
  }, []);

  const release = useCallback(() => {
    window.clearTimeout(failsafe.current);
    pending.current = null;
    void slide(false);
  }, [slide]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[data-elevator]",
      );
      if (!link) return;
      // Solo enlaces internos que Next.js navegaría en esta misma pestaña
      if (
        link.origin !== window.location.origin ||
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download")
      )
        return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Un segundo clic mientras las puertas se cierran no lanza otra navegación
      event.preventDefault();
      if (pending.current) return;

      const id = ++counter.current;
      pending.current = { id };
      const href = `${link.pathname}${link.search}${link.hash}`;
      void slide(true).then(() => {
        if (pending.current?.id === id) router.push(href);
      });
      failsafe.current = window.setTimeout(() => {
        if (pending.current?.id === id) release();
      }, FAILSAFE_MS);
    };
    // En captura: el enlace de Next.js navega en la fase de burbuja y, si ya hay preventDefault, no lo hace
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(failsafe.current);
    };
  }, [release, router, slide]);

  // Llegó una página: si es la del enlace pulsado, las puertas se abren dentro; si es otra (el visitante
  // pulsó «Atrás» durante el cierre), se abren igualmente y la navegación pendiente queda anulada
  useEffect(() => {
    if (pending.current) release();
  }, [pathname, release]);

  return (
    <div ref={root} className={styles["elevator"]} aria-hidden="true">
      <div className={styles["elevator__door"]} data-door />
      <div
        className={`${styles["elevator__door"]} ${styles["elevator__door--right"]}`}
        data-door
      />
    </div>
  );
}
