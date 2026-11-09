import type { CSSProperties } from "react";
import styles from "./industrial-backdrop.module.css";

// Salidas de vapor sobre las bridas de la tubería horizontal (x de su centro) y su deriva lateral
const steamVents = [
  { x: 271, delay: 0, drift: 36 },
  { x: 771, delay: 1.1, drift: -28 },
  { x: 1231, delay: 2.2, drift: 30 },
];

// Marcas de la esfera del manómetro: una cada 15° en un arco de 270°
const gaugeTicks = Array.from({ length: 19 }, (_, index) => index * 15 - 135);

type IndustrialBackdropProps = {
  className?: string;
};

// Fondo decorativo de la portada: tuberías con bridas y un manómetro, en trazo muy tenue
export function IndustrialBackdrop({ className }: IndustrialBackdropProps) {
  return (
    <div
      className={[styles["industrial-backdrop"], className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
      data-parallax-backdrop
    >
      <svg
        className={styles["industrial-backdrop__svg"]}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className={styles["industrial-backdrop__pipes"]}>
          <line x1="0" y1="640" x2="1440" y2="640" />
          <line x1="0" y1="690" x2="1440" y2="690" />
          <line x1="150" y1="0" x2="150" y2="640" />
          <line x1="196" y1="0" x2="196" y2="640" />
          {[260, 760, 1220].map((x) => (
            <rect key={x} x={x} y="624" width="22" height="82" />
          ))}
          <rect x="136" y="300" width="74" height="20" />
          <rect x="136" y="120" width="74" height="20" />
        </g>

        <g
          className={styles["industrial-backdrop__gauge"]}
          transform="translate(1180 330)"
        >
          <circle r="118" />
          <circle r="100" className={styles["industrial-backdrop__faint"]} />
          {gaugeTicks.map((angle) => (
            <line
              key={angle}
              x1="0"
              y1="-100"
              x2="0"
              y2={angle % 45 === 0 ? -80 : -90}
              transform={`rotate(${angle})`}
            />
          ))}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-84"
            className={styles["industrial-backdrop__needle"]}
            transform="rotate(48)"
          />
          <circle r="9" className={styles["industrial-backdrop__hub"]} />
        </g>

        <defs>
          <radialGradient id="valve-steam-puff">
            <stop offset="0" stopColor="rgb(242 239 233)" stopOpacity="0.55" />
            <stop offset="1" stopColor="rgb(242 239 233)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Vapor que escapa por las bridas: tres bocanadas por salida, desfasadas */}
        <g className={styles["industrial-backdrop__steam"]}>
          {steamVents.flatMap((vent) =>
            [0, 1, 2].map((puff) => (
              <circle
                key={`${vent.x}-${puff}`}
                className={styles["industrial-backdrop__puff"]}
                fill="url(#valve-steam-puff)"
                cx={vent.x}
                cy="618"
                r="22"
                style={
                  {
                    "--delay": `${vent.delay + puff * 1.7}s`,
                    "--drift": `${vent.drift}px`,
                  } as CSSProperties
                }
              />
            )),
          )}
        </g>

        <g className={styles["industrial-backdrop__rivets"]}>
          {[270, 771, 1231].flatMap((x) =>
            [634, 696].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
            )),
          )}
        </g>
      </svg>
    </div>
  );
}
