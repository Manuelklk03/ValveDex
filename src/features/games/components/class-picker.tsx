"use client";

import Image from "next/image";
import Link from "next/link";
import { TeamScope, useTeam } from "@/components/ui/team-scope";
import type { Team } from "@/domain/team";
import type { Tf2Class } from "../get-tf2-classes";
import styles from "./class-picker.module.css";

type ClassPickerProps = {
  gameId: string;
  classes: Tf2Class[];
  // Solo RED y BLU: GRAY (los robots) no tiene mercenarios
  teams: Team[];
  // Atributos de la entrada animada del juego (data-elevator…), para que elegir una clase también use las puertas
  elevator?: Record<string, string | undefined>;
};

function Picker({
  classes,
  elevator,
}: Pick<ClassPickerProps, "classes" | "elevator">) {
  const scope = useTeam();
  if (!scope) return null;
  const { team, teams, setTeam } = scope;

  return (
    <div className={styles["class-picker"]}>
      <div className={styles["class-picker__bar"]}>
        <p className={styles["class-picker__title"]}>Elige tu clase</p>
        <div
          className={styles["class-picker__teams"]}
          role="group"
          aria-label="Equipo"
        >
          {teams.map((option) => (
            <button
              key={option.id}
              type="button"
              className={
                option.id === team.id
                  ? `${styles["class-picker__team"]} ${styles["class-picker__team--on"]}`
                  : styles["class-picker__team"]
              }
              aria-pressed={option.id === team.id}
              onClick={() => setTeam(option.id)}
              data-team={option.id}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <ul className={styles["class-picker__row"]}>
        {classes.map((item) => {
          const image = (team.id === "blu" && item.blu) || item.red;

          return (
            <li key={item.id} className={styles["class-picker__item"]}>
              <Link
                href={item.href}
                className={styles["class-picker__link"]}
                aria-label={item.name}
                {...elevator}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  sizes="10vw"
                  className={styles["class-picker__figure"]}
                />
                <span
                  className={styles["class-picker__name"]}
                  aria-hidden="true"
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Gesto del dossier de Team Fortress 2: la pantalla de selección de clase. Las nueve clases en fila, con el equipo
// que se elige aquí (se recuerda y lo usan el hub y los apartados); al acercarse, la clase se adelanta
export function ClassPicker({
  gameId,
  classes,
  teams,
  elevator,
}: ClassPickerProps) {
  return (
    <TeamScope storageKey={gameId} teams={teams}>
      <Picker classes={classes} elevator={elevator} />
    </TeamScope>
  );
}
