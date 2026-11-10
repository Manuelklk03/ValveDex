"use client";

import { useEffect, useRef } from "react";
import styles from "./industrial-backdrop.module.css";

// Una marca por minuto; las de cada hora, más largas, y las de 12, 3, 6 y 9, las más largas
const minuteTicks = Array.from({ length: 60 }, (_, index) => index * 6);

// El manómetro del fondo industrial convertido en reloj: la misma esfera, con la hora real.
// El HTML sale con las 10:10:30 (siempre igual, sin desajuste de hidratación) y el efecto lo pone en hora.
// La manecilla roja da un paso por segundo; las otras dos se mueven con ella.
export function BackdropClock() {
  const hourRef = useRef<SVGLineElement>(null);
  const minuteRef = useRef<SVGLineElement>(null);
  const secondRef = useRef<SVGGElement>(null);
  const secondAngle = useRef(0);

  useEffect(() => {
    const rotate = (element: SVGElement | null, degrees: number) => {
      if (element) element.style.transform = `rotate(${degrees}deg)`;
    };

    const tick = () => {
      const now = new Date();
      const minutes = now.getMinutes() + now.getSeconds() / 60;
      rotate(hourRef.current, ((now.getHours() % 12) + minutes / 60) * 30);
      rotate(minuteRef.current, minutes * 6);
      // Los grados solo suben (sin volver a 0 en cada vuelta) para que la manecilla no retroceda
      const target = now.getSeconds() * 6;
      secondAngle.current += (target - (secondAngle.current % 360) + 360) % 360;
      rotate(secondRef.current, secondAngle.current);
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <g
      className={styles["industrial-backdrop__clock"]}
      transform="translate(1180 330)"
    >
      <circle r="118" className={styles["industrial-backdrop__clock-face"]} />
      <circle r="100" className={styles["industrial-backdrop__faint"]} />
      {minuteTicks.map((angle) => {
        const hour = angle % 30 === 0;
        const quarter = angle % 90 === 0;
        return (
          <line
            key={angle}
            x1="0"
            y1="-100"
            x2="0"
            y2={quarter ? -76 : hour ? -84 : -93}
            className={
              hour
                ? styles["industrial-backdrop__clock-tick--hour"]
                : styles["industrial-backdrop__clock-tick"]
            }
            transform={`rotate(${angle})`}
          />
        );
      })}
      <line
        ref={hourRef}
        x1="0"
        y1="10"
        x2="0"
        y2="-52"
        className={`${styles["industrial-backdrop__clock-hand"]} ${styles["industrial-backdrop__clock-hand--hour"]}`}
        style={{ transform: "rotate(305deg)" }}
      />
      <line
        ref={minuteRef}
        x1="0"
        y1="14"
        x2="0"
        y2="-82"
        className={`${styles["industrial-backdrop__clock-hand"]} ${styles["industrial-backdrop__clock-hand--minute"]}`}
        style={{ transform: "rotate(60deg)" }}
      />
      <g
        ref={secondRef}
        className={styles["industrial-backdrop__clock-second"]}
      >
        <line x1="0" y1="26" x2="0" y2="-90" />
        <circle cy="-70" r="4" />
      </g>
      <circle r="9" className={styles["industrial-backdrop__hub"]} />
    </g>
  );
}
