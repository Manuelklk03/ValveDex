import type { Milestone } from "@/domain/milestone";
import styles from "./production-line.module.css";

type ProductionLineProps = {
  milestones: Milestone[];
};

// La historia de Valve como una línea de producción: una tubería horizontal con una estación por hito
export function ProductionLine({ milestones }: ProductionLineProps) {
  return (
    <div
      className={styles["production-line"]}
      role="region"
      aria-label="Historia de Valve, desplazable en horizontal"
      tabIndex={0}
      data-line-scroller
    >
      <ol className={styles["production-line__track"]}>
        {milestones.map((milestone) => (
          <li key={milestone.id} className={styles["production-line__station"]}>
            <time
              className={styles["production-line__year"]}
              dateTime={String(milestone.year)}
            >
              {milestone.year}
            </time>
            <span
              className={styles["production-line__valve"]}
              aria-hidden="true"
            />
            {milestone.date ? (
              <p className={styles["production-line__date"]}>
                {milestone.date}
              </p>
            ) : null}
            <h3 className={styles["production-line__title"]}>
              {milestone.title}
            </h3>
            <p className={styles["production-line__description"]}>
              {milestone.description}
            </p>
            <p className={styles["production-line__sources"]}>
              {milestone.sources.map((source, index) => (
                <span key={source.url}>
                  {index > 0 && ", "}
                  <a
                    href={source.url}
                    className={styles["production-line__source-link"]}
                  >
                    {source.title}
                  </a>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
