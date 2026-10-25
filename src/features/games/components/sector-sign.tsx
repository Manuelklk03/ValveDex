import Link from "next/link";
import type { SectionStatus } from "@/features/games/get-section-statuses";
import styles from "./sector-sign.module.css";

// Nombres que se ven al desplegar; el resto se resume en «y N más»
const PREVIEW_COUNT = 3;

type SectorSignProps = {
  index: number;
  status: SectionStatus;
  href: string;
};

// Señal de sector de Black Mesa: franja de color, número, estado y un desplegable con las fichas
export function SectorSign({ index, status, href }: SectorSignProps) {
  const { section, entryNames, isAvailable, label } = status;
  const className = [
    styles["sector-sign"],
    styles[`sector-sign--${section.id}`],
    isAvailable ? "" : styles["sector-sign--empty"],
  ].join(" ");

  return (
    <li className={className}>
      <span className={styles["sector-sign__index"]} aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className={styles["sector-sign__title"]}>
        {isAvailable ? (
          <Link href={href} className={styles["sector-sign__link"]}>
            {section.name}
          </Link>
        ) : (
          section.name
        )}
      </h3>
      <p className={styles["sector-sign__status"]}>{label}</p>

      {isAvailable && (
        <div className={styles["sector-sign__details"]}>
          <div className={styles["sector-sign__details-inner"]}>
            <p className={styles["sector-sign__description"]}>
              {section.description}
            </p>

            {entryNames.length > 0 && (
              <ul className={styles["sector-sign__entries"]}>
                {entryNames.slice(0, PREVIEW_COUNT).map((name) => (
                  <li key={name} className={styles["sector-sign__entry"]}>
                    {name}
                  </li>
                ))}
                {entryNames.length > PREVIEW_COUNT && (
                  <li className={styles["sector-sign__entry"]}>
                    y {entryNames.length - PREVIEW_COUNT} más
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
