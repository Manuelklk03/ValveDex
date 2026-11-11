"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useTeam } from "./team-scope";
import styles from "./team-picker.module.css";

type TeamPickerProps = {
  // Líder de cada equipo, si el juego los tiene (id de equipo → ficha)
  leaders?: Record<string, { name: string; slug: string }>;
};

// Selector de equipo del juego: botones de radio nativos (las flechas cambian de opción) con el color de cada equipo
// y, al lado, la ficha del equipo elegido: su nombre, qué es y quién lo dirige
export function TeamPicker({ leaders }: TeamPickerProps) {
  const scope = useTeam();

  if (!scope) {
    return null;
  }

  const { team, teams, setTeam } = scope;
  const leader = leaders?.[team.id];

  return (
    <section className={styles["team-picker"]} aria-labelledby="team-title">
      <div className={styles["team-picker__choice"]}>
        <h2 id="team-title" className={styles["team-picker__title"]}>
          Elige equipo
        </h2>
        <div
          className={styles["team-picker__options"]}
          role="radiogroup"
          aria-labelledby="team-title"
        >
          {teams.map((option) => (
            <label
              key={option.id}
              className={styles["team-picker__option"]}
              style={{ "--team-accent": option.accent } as CSSProperties}
            >
              <input
                type="radio"
                name="team"
                value={option.id}
                checked={option.id === team.id}
                onChange={() => setTeam(option.id)}
                className={styles["team-picker__input"]}
              />
              <span className={styles["team-picker__chip"]}>
                <span
                  className={styles["team-picker__swatch"]}
                  aria-hidden="true"
                />
                {option.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles["team-picker__team"]} aria-live="polite">
        <p className={styles["team-picker__team-name"]}>{team.name}</p>
        <p className={styles["team-picker__summary"]}>{team.summary}</p>
        {leader && (
          <p className={styles["team-picker__leader"]}>
            Líder:{" "}
            <Link
              href={`/fichas/${leader.slug}`}
              className={styles["team-picker__leader-link"]}
            >
              {leader.name}
            </Link>
          </p>
        )}
        <p className={styles["team-picker__hint"]}>
          «Personajes» muestra a tu equipo y «Enemigos», a los rivales.
        </p>
      </div>
    </section>
  );
}
