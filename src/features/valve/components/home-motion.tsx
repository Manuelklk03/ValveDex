"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Movimiento de las secciones de la portada bajo la estación: aparecen al llegar a ellas y la historia se fija en\n// pantalla mientras la tubería avanza.
// Todo va dentro de matchMedia: con «reducir movimiento» la página se queda tal cual está.
export function HomeMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Secciones: aparecen al llegar a ellas
      gsap.utils.toArray<HTMLElement>("[data-home-reveal]").forEach((body) => {
        gsap.from(body, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: body, start: "top 85%", once: true },
        });
      });
    });

    // Historia fijada: solo en pantallas anchas y altas (las estaciones deben caber en la ventana).
    // En móvil la tubería se desliza con el dedo.
    mm.add(
      "(min-width: 56rem) and (min-height: 42rem) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = document.querySelector<HTMLElement>("[data-home-pin]");
        const scroller = section?.querySelector<HTMLElement>(
          "[data-line-scroller]",
        );
        if (!section || !scroller) return;

        scroller.dataset.pinned = "true";
        const maxScroll = () => scroller.scrollWidth - scroller.clientWidth;

        const tween = gsap.to(scroller, {
          scrollLeft: maxScroll,
          ease: "none",
          onUpdate: () => {
            const flow =
              (scroller.scrollLeft + scroller.clientWidth) /
              scroller.scrollWidth;
            scroller.style.setProperty("--flow", String(flow));
          },
          scrollTrigger: {
            trigger: section,
            start: "top top+=24",
            end: () => `+=${maxScroll()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Con teclado, enfocar la línea o una fuente de otra estación lleva el scroll de la página hasta ella
        const handleFocusIn = (event: FocusEvent) => {
          const trigger = tween.scrollTrigger;
          if (!trigger) return;

          if (event.target === scroller) {
            window.scrollTo({ top: trigger.start });
            return;
          }

          const station = (event.target as HTMLElement).closest("li");
          if (!station) return;

          const progress = Math.min(1, station.offsetLeft / maxScroll());
          window.scrollTo({
            top: trigger.start + (trigger.end - trigger.start) * progress,
          });
        };
        scroller.addEventListener("focusin", handleFocusIn);

        return () => {
          scroller.removeEventListener("focusin", handleFocusIn);
          delete scroller.dataset.pinned;
          scroller.style.removeProperty("--flow");
          scroller.scrollLeft = 0;
        };
      },
    );
  });

  return null;
}
