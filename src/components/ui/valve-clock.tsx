"use client";

import { useEffect, useRef } from "react";
import styles from "./valve-clock.module.css";

// Marcas de la esfera: una por hora, más largas a las 12, 3, 6 y 9
const hourTicks = Array.from({ length: 12 }, (_, index) => index * 30);

type ValveClockProps = {
  className?: string;
};

// Reloj de pared industrial junto a la válvula. El HTML sale con las 10:10 (siempre igual, sin
// desajuste de hidratación) y el efecto lo pone en hora; la manecilla roja avanza a saltos, como un reloj de fábrica
export function ValveClock({ className }: ValveClockProps) {
  const hourRef = useRef<SVGLineElement>(null);
  const minuteRef = useRef<SVGLineElement>(null);
  const secondRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const rotate = (element: SVGElement | null, degrees: number) => {
      if (element) element.style.transform = `rotate(${degrees}deg)`;
    };

    const tick = () => {
      const now = new Date();
      const minutes = now.getMinutes() + now.getSeconds() / 60;
      rotate(hourRef.current, ((now.getHours() % 12) + minutes / 60) * 30);
      rotate(minuteRef.current, minutes * 6);
      // Los grados no se reinician en cada vuelta para que la manecilla no retroceda
      rotate(secondRef.current, Math.floor(now.getTime() / 1000) * 6);
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <svg
      className={[styles["valve-clock"], className].filter(Boolean).join(" ")}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="94"
        className={styles["valve-clock__face"]}
      />
      <circle cx="100" cy="100" r="82" className={styles["valve-clock__rim"]} />
      {hourTicks.map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="22"
          x2="100"
          y2={angle % 90 === 0 ? 38 : 30}
          className={styles["valve-clock__tick"]}
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      <line
        ref={hourRef}
        x1="100"
        y1="100"
        x2="100"
        y2="58"
        className={`${styles["valve-clock__hand"]} ${styles["valve-clock__hand--hour"]}`}
        style={{ transform: "rotate(305deg)" }}
      />
      <line
        ref={minuteRef}
        x1="100"
        y1="100"
        x2="100"
        y2="36"
        className={`${styles["valve-clock__hand"]} ${styles["valve-clock__hand--minute"]}`}
        style={{ transform: "rotate(60deg)" }}
      />
      <g ref={secondRef} className={styles["valve-clock__second"]}>
        <line x1="100" y1="116" x2="100" y2="30" />
      </g>
      <circle cx="100" cy="100" r="6" className={styles["valve-clock__hub"]} />
    </svg>
  );
}
