import type { Milestone } from "@/domain/milestone";
import styles from "./history-line.module.css";

type HistoryLineProps = {
  milestones: Milestone[];
};

// Agrupa los hitos por década, en orden cronológico
function groupByDecade(milestones: Milestone[]) {
  const eras = new Map<number, Milestone[]>();

  for (const milestone of [...milestones].sort((a, b) => a.year - b.year)) {
    const decade = Math.floor(milestone.year / 10) * 10;
    eras.set(decade, [...(eras.get(decade) ?? []), milestone]);
  }

  return [...eras.entries()].map(([decade, items]) => ({ decade, items }));
}

// La historia de Valve como una línea de producción vertical: una tubería que se llena al bajar, una estación por
// hito y una cabecera de década que se queda a la vista mientras se recorre
export function HistoryLine({ milestones }: HistoryLineProps) {
  return (
    <div className={styles["history-line"]}>
      <div className={styles["history-line__pipe"]} aria-hidden="true" />
      <ol className={styles["history-line__eras"]}>
        {groupByDecade(milestones).map(({ decade, items }) => (
          <li key={decade}>
            <h2 className={styles["history-line__decade"]}>{decade}s</h2>
            <ol className={styles["history-line__stations"]}>
              {items.map((milestone) => (
                <li
                  key={milestone.id}
                  className={styles["history-line__station"]}
                >
                  <span
                    className={styles["history-line__valve"]}
                    aria-hidden="true"
                  />
                  <article className={styles["history-line__plate"]}>
                    <p className={styles["history-line__when"]}>
                      <time dateTime={String(milestone.year)}>
                        {/* Las fechas completas ya llevan el año: no se repite */}
                        {milestone.date?.includes(String(milestone.year))
                          ? milestone.date
                          : [milestone.year, milestone.date]
                              .filter(Boolean)
                              .join(" · ")}
                      </time>
                    </p>
                    <h3 className={styles["history-line__title"]}>
                      {milestone.title}
                    </h3>
                    <p className={styles["history-line__text"]}>
                      {milestone.description}
                    </p>
                    <p className={styles["history-line__sources"]}>
                      Fuente:{" "}
                      {milestone.sources.map((source, index) => (
                        <span key={source.url}>
                          {index > 0 && ", "}
                          <a
                            href={source.url}
                            className={styles["history-line__source-link"]}
                          >
                            {source.title}
                          </a>
                        </span>
                      ))}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
