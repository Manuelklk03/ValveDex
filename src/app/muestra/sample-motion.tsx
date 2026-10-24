"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Scroll suave (Lenis) y entrada de los expedientes al hacer scroll (GSAP + ScrollTrigger)
export function SampleMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false });
    // Lenis avanza con el mismo reloj que GSAP para que ScrollTrigger no vaya desfasado
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      // lagSmoothing es global: se devuelven los valores por defecto de GSAP al salir
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

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

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((dossier) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: dossier, start: "top 85%", once: true },
          })
          .from(dossier, {
            y: 48,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          })
          .from(
            dossier.querySelectorAll("li"),
            {
              y: 12,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.05,
            },
            "-=0.5",
          );
      });
    });
  });

  return null;
}
