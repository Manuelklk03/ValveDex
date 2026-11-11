import type { Building } from "@/domain/building";
import styles from "./building-list.module.css";

type BuildingListProps = {
  buildings: Building[];
};

// Desplegable con las construcciones del Engineer y sus niveles, dentro de su tarjeta
export function BuildingList({ buildings }: BuildingListProps) {
  if (buildings.length === 0) {
    return null;
  }

  return (
    <details className={styles["building-list"]}>
      <summary className={styles["building-list__toggle"]}>
        Construcciones y niveles ({buildings.length})
      </summary>
      <ul className={styles["building-list__items"]}>
        {buildings.map((building) => (
          <li key={building.id} className={styles["building-list__item"]}>
            <h3 className={styles["building-list__name"]}>{building.name}</h3>
            <p className={styles["building-list__summary"]}>
              {building.summary}
            </p>
            <ol className={styles["building-list__levels"]}>
              {building.levels.map((level) => (
                <li
                  key={level.level}
                  className={styles["building-list__level"]}
                >
                  <strong>Nivel {level.level}</strong>
                  <ul className={styles["building-list__stats"]}>
                    {level.stats.map((stat) => (
                      <li key={stat.label}>
                        <span>{stat.label}:</span> {stat.value}
                      </li>
                    ))}
                  </ul>
                  {level.note && (
                    <p className={styles["building-list__note"]}>
                      {level.note}
                    </p>
                  )}
                </li>
              ))}
            </ol>
            <p className={styles["building-list__sources"]}>
              Fuente:{" "}
              {building.sources.map((source, index) => (
                <span key={source.url}>
                  {index > 0 && ", "}
                  <a href={source.url}>{source.title}</a>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </details>
  );
}
