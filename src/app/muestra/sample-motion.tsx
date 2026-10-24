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
      lenis.destroy();
    };
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
