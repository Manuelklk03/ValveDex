"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Movimiento de la página de Steam: al llegar a cada época entra su cabecera y, tras ella, sus hechos.
// Con «reducir movimiento» no se anima nada.
export function SteamMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-steam-era]").forEach((era) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: era, start: "top 75%", once: true },
          })
          .from(era.querySelector("header"), {
            y: 36,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          })
          .from(
            era.querySelectorAll("[data-steam-event]"),
            {
              y: 28,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.09,
            },
            "-=0.4",
          );
      });
    });
  });

  return null;
}
