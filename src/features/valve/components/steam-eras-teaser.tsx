import Link from "next/link";
import { getSteamEras } from "@/features/valve/get-steam-eras";
import styles from "./steam-eras-teaser.module.css";

// Avance de la página de Steam: una tarjeta por época, con el aspecto del cliente de entonces
export function SteamErasTeaser() {
  const eras = getSteamEras();

  return (
    <ol className={styles["steam-eras-teaser"]}>
      {eras.map((era) => (
        <li
          key={era.id}
          className={`${styles["steam-eras-teaser__era"]} ${styles[`steam-eras-teaser__era--${era.id}`]}`}
        >
          <p className={styles["steam-eras-teaser__years"]}>
            {era.yearFrom}
            {era.yearTo ? `–${era.yearTo}` : " – hoy"}
          </p>
          <h3 className={styles["steam-eras-teaser__name"]}>
            <Link
              href={`/valve/steam#${era.id}`}
              className={styles["steam-eras-teaser__link"]}
            >
              {era.name}
            </Link>
          </h3>
          <p className={styles["steam-eras-teaser__summary"]}>{era.summary}</p>
          <p className={styles["steam-eras-teaser__count"]}>
            {era.events.length} hitos
            <span aria-hidden="true"> →</span>
          </p>
        </li>
      ))}
    </ol>
  );
}
