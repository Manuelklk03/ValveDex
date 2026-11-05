import type {
  ValveHardware,
  ValveHardwareCategory,
} from "@/domain/valve-hardware";
import styles from "./hardware-card.module.css";

const categoryLabels: Record<ValveHardwareCategory, string> = {
  controller: "Controlador",
  streaming: "Transmisión",
  pc: "Ordenador y SO",
  vr: "Realidad Virtual",
  handheld: "Portátil",
};

export function HardwareCard({ hardware }: { hardware: ValveHardware }) {
  return (
    <article
      id={hardware.slug}
      className={styles["hardware-card"]}
      aria-labelledby={`hw-title-${hardware.id}`}
    >
      <header className={styles["hardware-card__header"]}>
        <div className={styles["hardware-card__meta"]}>
          <span className={styles["hardware-card__year"]}>{hardware.year}</span>
          <span className={styles["hardware-card__category"]}>
            {categoryLabels[hardware.category]}
          </span>
        </div>
        <h2
          id={`hw-title-${hardware.id}`}
          className={styles["hardware-card__title"]}
        >
          {hardware.name}
        </h2>
        <p className={styles["hardware-card__tagline"]}>{hardware.tagline}</p>
      </header>

      <p className={styles["hardware-card__summary"]}>{hardware.summary}</p>

      {hardware.specs.length > 0 && (
        <dl className={styles["hardware-card__specs"]}>
          {hardware.specs.map((spec) => (
            <div key={spec.label} className={styles["hardware-card__spec"]}>
              <dt className={styles["hardware-card__spec-label"]}>
                {spec.label}
              </dt>
              <dd className={styles["hardware-card__spec-value"]}>
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {hardware.sources.length > 0 && (
        <footer className={styles["hardware-card__sources"]}>
          <span className={styles["hardware-card__spec-label"]}>Fuentes:</span>
          {hardware.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["hardware-card__source-link"]}
            >
              {source.title}
            </a>
          ))}
        </footer>
      )}
    </article>
  );
}
