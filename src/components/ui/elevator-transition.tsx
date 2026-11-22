"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import {
  isDossierTransition,
  type DossierTransition,
} from "@/domain/dossier-transition";
import styles from "./elevator-transition.module.css";

const EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
// Si la página nueva no llega, la entrada se abre sola para no dejar al visitante encerrado
const FAILSAFE_MS = 4000;

type Step = { keyframes: Keyframe[]; ms: number };
type Plan = {
  // «doors»: dos hojas que se deslizan; «curtain»: una cortina a pantalla completa que se recorta
  layer: "doors" | "curtain";
  axis?: "x" | "y";
  close: Step;
  open: Step;
};

const full = { opacity: 1 };

// Una animación de entrada por juego: ver `dossier-transitions.ts` en features/games
const plans: Record<DossierTransition, Plan> = {
  doors: {
    layer: "doors",
    axis: "x",
    close: { keyframes: [], ms: 480 },
    open: { keyframes: [], ms: 620 },
  },
  gate: {
    layer: "doors",
    axis: "y",
    close: { keyframes: [], ms: 420 },
    open: { keyframes: [], ms: 560 },
  },
  shutter: {
    layer: "curtain",
    close: {
      keyframes: [
        { ...full, clipPath: "inset(0 0 100% 0)" },
        { ...full, clipPath: "inset(0)" },
      ],
      ms: 520,
    },
    open: {
      keyframes: [
        { ...full, clipPath: "inset(0)" },
        { ...full, clipPath: "inset(0 0 100% 0)" },
      ],
      ms: 640,
    },
  },
  crt: {
    layer: "curtain",
    close: {
      keyframes: [
        { ...full, clipPath: "inset(50% 0 50% 0)" },
        { ...full, clipPath: "inset(0)" },
      ],
      ms: 460,
    },
    open: {
      keyframes: [
        { ...full, clipPath: "inset(0)" },
        { ...full, clipPath: "inset(50% 0 50% 0)" },
      ],
      ms: 520,
    },
  },
  slash: {
    layer: "curtain",
    close: {
      keyframes: [
        { ...full, clipPath: "polygon(0 0, 0 0, -30% 100%, -30% 100%)" },
        { ...full, clipPath: "polygon(0 0, 130% 0, 100% 100%, -30% 100%)" },
      ],
      ms: 440,
    },
    open: {
      keyframes: [
        { ...full, clipPath: "polygon(0 0, 130% 0, 100% 100%, -30% 100%)" },
        { ...full, clipPath: "polygon(130% 0, 130% 0, 100% 100%, 100% 100%)" },
      ],
      ms: 560,
    },
  },
  flash: {
    layer: "curtain",
    close: {
      keyframes: [
        { opacity: 1, clipPath: "circle(0% at 50% 50%)" },
        { opacity: 1, clipPath: "circle(80% at 50% 50%)" },
      ],
      ms: 520,
    },
    open: {
      keyframes: [
        { opacity: 1, clipPath: "circle(80% at 50% 50%)" },
        { opacity: 0, clipPath: "circle(80% at 50% 50%)" },
      ],
      ms: 760,
    },
  },
  rise: {
    layer: "curtain",
    close: {
      keyframes: [
        { ...full, clipPath: "inset(100% 0 0 0)" },
        { ...full, clipPath: "inset(0)" },
      ],
      ms: 520,
    },
    open: {
      keyframes: [
        { ...full, clipPath: "inset(0)" },
        { ...full, clipPath: "inset(0 0 100% 0)" },
      ],
      ms: 640,
    },
  },
  // Team Fortress: las puertas de la sala de reaparición, RED a un lado y BLU al otro
  respawn: {
    layer: "doors",
    axis: "x",
    close: { keyframes: [], ms: 440 },
    open: { keyframes: [], ms: 600 },
  },
  // Left 4 Dead: la puerta de seguridad del refugio, dos hojas de acero con luz roja que se abren de golpe
  safehouse: {
    layer: "doors",
    axis: "x",
    close: { keyframes: [], ms: 360 },
    open: { keyframes: [], ms: 520 },
  },
  // Portal: se abre un portal desde el centro y te atraviesa; al llegar, se cierra detrás
  portal: {
    layer: "curtain",
    close: {
      keyframes: [
        { opacity: 1, clipPath: "ellipse(0% 0% at 50% 50%)" },
        { opacity: 1, clipPath: "ellipse(90% 130% at 50% 50%)" },
      ],
      ms: 560,
    },
    open: {
      keyframes: [
        { opacity: 1, clipPath: "ellipse(90% 130% at 50% 50%)" },
        { opacity: 1, clipPath: "ellipse(0% 0% at 50% 50%)" },
      ],
      ms: 620,
    },
  },
  scan: {
    layer: "curtain",
    close: {
      keyframes: [
        { ...full, clipPath: "inset(0 100% 0 0)" },
        { ...full, clipPath: "inset(0)" },
      ],
      ms: 480,
    },
    open: {
      keyframes: [
        { ...full, clipPath: "inset(0)" },
        { ...full, clipPath: "inset(0 0 0 100%)" },
      ],
      ms: 560,
    },
  },
};

// Navegación en curso: su identificador evita que una respuesta tardía actúe sobre otra navegación
type Pending = { id: number; transition: DossierTransition };

// Entrada animada a un mundo: al pulsar un enlace interno marcado con `data-elevator="<animación>"` la
// pantalla se cierra a la manera del juego y se abre cuando llega la página nueva. Con «reducir movimiento»
// no hace nada y la navegación es la normal.
export function ElevatorTransition() {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<Pending | null>(null);
  const failsafe = useRef<number | undefined>(undefined);
  const counter = useRef(0);

  const slide = useCallback(
    (transition: DossierTransition, closing: boolean) => {
      const element = root.current;
      if (!element) return Promise.resolve();
      const plan = plans[transition];
      const step = closing ? plan.close : plan.open;

      // Al empezar un cierre se descartan los restos («forwards») de la entrada anterior
      if (closing) {
        for (const animation of element.getAnimations({ subtree: true }))
          animation.cancel();
      }
      element.dataset.variant = transition;
      element.dataset.active = "true";

      // La placa con el nombre del juego aparece cuando la pantalla casi se ha cerrado y se va al abrirse
      const plate = element.querySelector<HTMLElement>("[data-plate]");
      if (plate) {
        plate.animate(
          { opacity: closing ? [0, 1] : [1, 0] },
          {
            duration: closing ? 220 : 280,
            delay: closing ? step.ms * 0.6 : 0,
            fill: "forwards",
          },
        );
      }

      const options: KeyframeAnimationOptions = {
        duration: step.ms,
        easing: EASE,
        fill: "forwards",
      };
      let finished: Promise<Animation>[];
      if (plan.layer === "doors") {
        const doors = [...element.querySelectorAll<HTMLElement>("[data-door]")];
        const property = plan.axis === "y" ? "translateY" : "translateX";
        finished = doors.map((door, index) => {
          const offscreen = index === 0 ? "-100%" : "100%";
          return door.animate(
            {
              transform: closing
                ? [`${property}(${offscreen})`, `${property}(0)`]
                : [`${property}(0)`, `${property}(${offscreen})`],
            },
            options,
          ).finished;
        });
      } else {
        const curtain = element.querySelector<HTMLElement>("[data-curtain]");
        finished = curtain
          ? [curtain.animate(step.keyframes, options).finished]
          : [];
      }

      // Una animación cancelada rechaza `finished`: no debe dejar la entrada a medias ni romper la cadena
      return Promise.all(finished)
        .catch(() => undefined)
        .then(() => {
          if (!closing) delete element.dataset.active;
        });
    },
    [],
  );

  const release = useCallback(() => {
    window.clearTimeout(failsafe.current);
    const current = pending.current;
    pending.current = null;
    if (current) void slide(current.transition, false);
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
      const transition = link.getAttribute("data-elevator");
      if (!isDossierTransition(transition)) return;
      // Solo enlaces internos que Next.js navegaría en esta misma pestaña
      if (
        link.origin !== window.location.origin ||
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download")
      )
        return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Un segundo clic mientras la pantalla se cierra no lanza otra navegación
      event.preventDefault();
      if (pending.current) return;

      const id = ++counter.current;
      pending.current = { id, transition };
      const label =
        root.current?.querySelector<HTMLElement>("[data-plate-label]");
      const title =
        root.current?.querySelector<HTMLElement>("[data-plate-title]");
      if (label) label.textContent = link.dataset.elevatorLabel ?? "";
      if (title) title.textContent = link.dataset.elevatorTitle ?? "";
      const href = `${link.pathname}${link.search}${link.hash}`;
      void slide(transition, true).then(() => {
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

  // «Atrás» o «Adelante» durante el cierre mandan: se anula la navegación pendiente aunque el camino no cambie
  useEffect(() => {
    const onPopState = () => {
      if (pending.current) release();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [release]);

  // Llegó una página: si es la del enlace pulsado, la entrada se abre dentro; si es otra (el visitante
  // pulsó «Atrás» durante el cierre), se abre igualmente y la navegación pendiente queda anulada
  useEffect(() => {
    if (pending.current) release();
  }, [pathname, release]);

  return (
    <div
      ref={root}
      className={styles["elevator"]}
      data-variant="doors"
      aria-hidden="true"
    >
      <div className={styles["elevator__door"]} data-door />
      <div
        className={`${styles["elevator__door"]} ${styles["elevator__door--right"]}`}
        data-door
      />
      <div className={styles["elevator__curtain"]} data-curtain />
      <div className={styles["elevator__plate"]} data-plate>
        <span className={styles["elevator__plate-label"]} data-plate-label />
        <strong className={styles["elevator__plate-title"]} data-plate-title />
      </div>
    </div>
  );
}
