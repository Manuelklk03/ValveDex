import type { Milestone } from "@/domain/milestone";
import styles from "./timeline.module.css";

type TimelineProps = {
  milestones: Milestone[];
};

export function Timeline({ milestones }: TimelineProps) {
  if (milestones.length === 0) {
    return (
      <p className={styles["timeline__empty"]}>
        Todavía no hay hitos registrados.
      </p>
    );
  }

  return (
    <ol className={styles["timeline"]}>
      {milestones.map((milestone) => (
        <li key={milestone.id} className={styles["timeline__item"]}>
          <time
            className={styles["timeline__year"]}
            dateTime={String(milestone.year)}
          >
            {milestone.year}
          </time>
          <h3 className={styles["timeline__title"]}>{milestone.title}</h3>
          <p className={styles["timeline__description"]}>
            {milestone.description}
          </p>
          <p className={styles["timeline__sources"]}>
            Fuente:{" "}
            {milestone.sources.map((source, index) => (
              <span key={source.url}>
                {index > 0 && ", "}
                <a
                  href={source.url}
                  className={styles["timeline__source-link"]}
                >
                  {source.title}
                </a>
              </span>
            ))}
          </p>
        </li>
      ))}
    </ol>
  );
}
