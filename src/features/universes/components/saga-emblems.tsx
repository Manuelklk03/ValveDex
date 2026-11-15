import type { CSSProperties } from "react";
import Link from "next/link";
import { lineIcons } from "@/data/universe-art";
import { universePalettes } from "@/data/universe-palettes";
import { getUniverses } from "@/features/universes/get-universes";
import styles from "./saga-emblems.module.css";

// Entrada rápida a cada saga desde la portada: su emblema de un trazo teñido con el color de su marca
export function SagaEmblems() {
  const sagas = getUniverses().filter(
    (universe) => universe.status === "available",
  );

  return (
    <nav className={styles["saga-emblems"]} aria-label="Entrar en una saga">
      <ul className={styles["saga-emblems__list"]}>
        {sagas.map((universe) => {
          const emblem =
            lineIcons[`emblem-${universe.id}` as keyof typeof lineIcons];
          const palette = universePalettes[universe.id];

          if (!emblem || !palette) return null;

          return (
            <li key={universe.id} className={styles["saga-emblems__item"]}>
              <Link
                href={`/universos/${universe.slug}`}
                className={styles["saga-emblems__link"]}
                style={
                  {
                    "--saga-accent": palette.accent,
                    "--saga-emblem": `url(${emblem.src})`,
                  } as CSSProperties
                }
              >
                <span
                  className={styles["saga-emblems__emblem"]}
                  aria-hidden="true"
                />
                <span className={styles["saga-emblems__name"]}>
                  {universe.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
