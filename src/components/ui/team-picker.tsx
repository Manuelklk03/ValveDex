"use client";

import type { CSSProperties } from "react";
import { useTeam } from "./team-scope";
import styles from "./team-picker.module.css";

// Selector de equipo del juego: botones de radio nativos (las flechas cambian de opción) con el color de cada equipo
export function TeamPicker() {
  const scope = useTeam();

  if (!scope) {
    return null;
  }

  const { team, teams, setTeam } = scope;

  return (
    <section className={styles["team-picker"]} aria-labelledby="team-title">
      <div className={styles["team-picker__heading"]}>
        <h2 id="team-title" className={styles["team-picker__title"]}>
          Elige equipo
        </h2>
        <p className={styles["team-picker__summary"]} aria-live="polite">
          {team.name}: {team.summary}
        </p>
      </div>
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
    </section>
  );
}
