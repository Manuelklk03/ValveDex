"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";

gsap.registerPlugin(useGSAP);

export function ValveWheel() {
  const wheelRef = useRef<SVGSVGElement>(null);

  // useGSAP deshace la animación al desmontar; matchMedia respeta «reducir movimiento»
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(wheelRef.current, {
        rotation: -144,
        scale: 0.85,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        transformOrigin: "50% 50%",
      });
    });
  });

  return (
    <svg
      ref={wheelRef}
      className={styles["valve-hero__wheel"]}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
      />
      <circle
        cx="100"
        cy="100"
        r="66"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <circle cx="100" cy="100" r="16" fill="currentColor" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </svg>
  );
}
