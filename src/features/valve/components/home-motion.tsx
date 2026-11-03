"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Movimiento de la portada: entrada, cifras que cuentan, la válvula que gira con el scroll,
// secciones que aparecen y la historia fijada en pantalla mientras la tubería avanza.
// Todo va dentro de matchMedia: con «reducir movimiento» la página se queda tal cual está.
export function HomeMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Entrada de la cabecera
      gsap.from("[data-hero-item]", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });

      // Las cifras suben desde cero
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
      counters.forEach((element) => {
        const target = Number(element.dataset.count);
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = String(Math.round(counter.value));
          },
          onComplete: () => {
            element.textContent = String(target);
          },
        });
      });

      // La válvula gira con el scroll de toda la página: es el hilo conductor
      gsap.to("[data-home-wheel]", {
        rotation: 300,
        ease: "none",
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // El fondo industrial se mueve más despacio que el contenido
      gsap.to("[data-parallax-backdrop]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "+=900",
          scrub: true,
        },
      });

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

      // Si se activa «reducir movimiento» a mitad de la cuenta, las cifras vuelven a su valor real
      return () => {
        counters.forEach((element) => {
          element.textContent = element.dataset.count ?? "";
        });
      };
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

        // Con teclado, enfocar una fuente de otra estación lleva el scroll de la página hasta ella
        const handleFocusIn = (event: FocusEvent) => {
          const station = (event.target as HTMLElement).closest("li");
          const trigger = tween.scrollTrigger;
          if (!station || !trigger) return;

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
