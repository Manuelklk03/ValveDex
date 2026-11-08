"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import styles from "./stat-strip.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type StatStripProps = {
  stats: { label: string; value: number }[];
};

// Franja de cifras reales del juego: cuentan desde cero al entrar en pantalla.
// El HTML trae ya el valor final, así que sin JavaScript o con movimiento reducido se ve igual.
export function StatStrip({ stats }: StatStripProps) {
  const root = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.current
          ?.querySelectorAll<HTMLElement>("[data-stat-value]")
          .forEach((element) => {
            const target = Number(element.dataset.statValue);
            const counter = { value: 0 };
            element.textContent = "0";
            gsap.to(counter, {
              value: target,
              duration: 1.1,
              ease: "power2.out",
              onUpdate: () => {
                element.textContent = String(Math.round(counter.value));
              },
              scrollTrigger: {
                trigger: root.current,
                start: "top 88%",
                once: true,
              },
            });
          });
      });
    },
    { scope: root },
  );

  return (
    <dl ref={root} className={styles["stat-strip"]}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles["stat-strip__item"]}>
          <dt className={styles["stat-strip__label"]}>{stat.label}</dt>
          <dd
            className={styles["stat-strip__value"]}
            data-stat-value={stat.value}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
