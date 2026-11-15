"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import styles from "./elevator-transition.module.css";

const CLOSE_MS = 480;
const OPEN_MS = 620;
const EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
// Si la página nueva no llega, las puertas se abren solas para no dejar al visitante encerrado
const FAILSAFE_MS = 4000;

// Puertas de ascensor de Black Mesa: se cierran sobre la pantalla al pulsar un enlace marcado con
// `data-elevator` y se abren cuando llega la página nueva. Con «reducir movimiento» no hace nada
// y la navegación es la normal.
export function ElevatorTransition() {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const closed = useRef(false);

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
    return Promise.all(finished).then(() => {
      if (!closing) delete element.dataset.active;
    });
  }, []);

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
      const href = link?.getAttribute("href");
      if (!link || !href || link.target === "_blank") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      closed.current = true;
      void slide(true).then(() => router.push(href));
      window.setTimeout(() => {
        if (!closed.current) return;
        closed.current = false;
        void slide(false);
      }, FAILSAFE_MS);
    };
    // En captura: el enlace de Next.js navega en la fase de burbuja y, si ya hay preventDefault, no lo hace
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, slide]);

  // La página nueva ya está: las puertas se abren dentro del hub
  useEffect(() => {
    if (!closed.current) return;
    closed.current = false;
    void slide(false);
  }, [pathname, slide]);

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
