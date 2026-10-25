"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Entrada de los dossiers al hacer scroll y cierre de sus desplegables con Escape
export function DossierMotion() {
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
