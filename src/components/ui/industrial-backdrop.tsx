import type { CSSProperties } from "react";
import { BackdropClock } from "./backdrop-clock";
import styles from "./industrial-backdrop.module.css";

// Salidas de vapor. «up» sube desde la brida de la tubería horizontal (x de su centro); «side» escapa de la
// vertical hacia la derecha. dx y dy son lo que recorre cada bocanada hasta disiparse.
const steamVents = [
  { x: 271, y: 600, dx: 46, dy: -250, delay: 0 },
  { x: 771, y: 600, dx: -38, dy: -270, delay: 1.4 },
  { x: 1231, y: 600, dx: 42, dy: -240, delay: 2.6 },
  { x: 210, y: 310, dx: 190, dy: -60, delay: 0.8 },
];

// Cada bocanada crece distinto: así la columna no parece una repetición
const puffs = [
  { offset: 0, grow: 3.2, rise: 1, sprite: 1, turn: 24 },
  { offset: 1.3, grow: 2.5, rise: 0.82, sprite: 2, turn: -30 },
  { offset: 2.6, grow: 3.5, rise: 1.08, sprite: 3, turn: 18 },
  { offset: 3.9, grow: 2.8, rise: 0.9, sprite: 1, turn: -22 },
  { offset: 5.2, grow: 3.1, rise: 0.96, sprite: 2, turn: 34 },
];

type IndustrialBackdropProps = {
  className?: string;
};

// Fondo decorativo de la portada: tuberías con bridas que sueltan vapor y un manómetro que es un reloj, en trazo muy tenue
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
          {/* Boquillas por las que sale el vapor */}
          {steamVents
            .filter((vent) => vent.y === 600)
            .map((vent) => (
              <rect
                key={vent.x}
                x={vent.x - 8}
                y="598"
                width="16"
                height="28"
              />
            ))}
        </g>

        <BackdropClock />

        {/* Humo: texturas de nube que salen de cada boquilla, suben, se ensanchan girando y se disipan */}
        <g className={styles["industrial-backdrop__steam"]}>
          {steamVents.flatMap((vent) =>
            puffs.map((puff) => (
              <image
                key={`${vent.x}-${vent.y}-${puff.offset}`}
                className={styles["industrial-backdrop__puff"]}
                href={`/images/decor/steam-${puff.sprite}.webp`}
                x={vent.x - 60}
                y={vent.y - 66}
                width="120"
                height="120"
                style={
                  {
                    "--delay": `${vent.delay + puff.offset}s`,
                    "--dx": `${vent.dx * puff.rise}px`,
                    "--dy": `${vent.dy * puff.rise}px`,
                    "--grow": puff.grow,
                    "--turn": `${puff.turn}deg`,
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
