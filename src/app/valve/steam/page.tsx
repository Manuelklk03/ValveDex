import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { SteamMotion } from "@/features/valve/components/steam-motion";
import { getSteamEras } from "@/features/valve/get-steam-eras";
import styles from "./steam-page.module.css";

export const metadata: Metadata = {
  title: "Steam",
  description:
    "La historia de Steam por épocas, desde la beta de 2002 hasta el cliente unificado del Steam Deck.",
};

// Cifras de cabecera (fuente: Steam, Wikipedia en inglés, la misma de los hechos de cada época)
const steamFacts = [
  { label: "Beta", value: "22 mar 2002" },
  { label: "Lanzamiento", value: "12 sep 2003" },
  { label: "Usuarios activos al mes, 2021", value: "132 millones" },
];

export default function SteamPage() {
  const eras = getSteamEras();

  return (
    <main className={styles["steam-page"]}>
      <SmoothScroll />
      <SteamMotion />

      <div className={styles["steam-page__intro"]}>
        <Breadcrumb
          items={[{ label: "Inicio", href: "/" }, { label: "Steam" }]}
        />

        <header className={styles["steam-page__header"]}>
          <p className={styles["steam-page__eyebrow"]}>Valve</p>
          <h1 className={styles["steam-page__title"]}>Steam</h1>
          <p className={styles["steam-page__lead"]}>
            La plataforma de distribución digital de Valve, contada por épocas.
            Cada una recupera el aspecto del cliente de entonces.
          </p>

          <dl className={styles["steam-page__facts"]}>
            {steamFacts.map((fact) => (
              <div key={fact.label} className={styles["steam-page__fact"]}>
                <dt className={styles["steam-page__fact-label"]}>
                  {fact.label}
                </dt>
                <dd className={styles["steam-page__fact-value"]}>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <nav aria-label="Épocas de Steam">
          <ol className={styles["steam-page__nav"]}>
            {eras.map((era) => (
              <li key={era.id}>
                <a
                  href={`#${era.id}`}
                  className={`${styles["steam-page__nav-link"]} ${styles[`steam-page__nav-link--${era.id}`]}`}
                >
                  <span className={styles["steam-page__nav-years"]}>
                    {era.yearFrom}
                    {era.yearTo ? `–${era.yearTo}` : " – hoy"}
                  </span>
                  {era.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {eras.map((era) => (
        <section
          key={era.id}
          id={era.id}
          className={`${styles["steam-page__era"]} ${styles[`steam-page__era--${era.id}`]}`}
          aria-labelledby={`era-title-${era.id}`}
          data-steam-era
        >
          <div className={styles["steam-page__era-inner"]}>
            <header className={styles["steam-page__era-header"]}>
              <p className={styles["steam-page__era-years"]}>
                {era.yearFrom}
                {era.yearTo ? `–${era.yearTo}` : " – hoy"}
              </p>
              <h2
                id={`era-title-${era.id}`}
                className={styles["steam-page__era-name"]}
              >
                {era.name}
              </h2>
              <p className={styles["steam-page__era-summary"]}>{era.summary}</p>
            </header>

            <ol className={styles["steam-page__events"]}>
              {era.events.map((event) => (
                <li
                  key={event.id}
                  className={styles["steam-page__event"]}
                  data-steam-event
                >
                  <time
                    className={styles["steam-page__event-year"]}
                    dateTime={String(event.year)}
                  >
                    {event.year}
                  </time>
                  <div className={styles["steam-page__event-body"]}>
                    {event.date ? (
                      <p className={styles["steam-page__event-date"]}>
                        {event.date}
                      </p>
                    ) : null}
                    <h3 className={styles["steam-page__event-title"]}>
                      {event.title}
                    </h3>
                    <p className={styles["steam-page__event-text"]}>
                      {event.description}
                    </p>
                    <p className={styles["steam-page__event-sources"]}>
                      Fuente:{" "}
                      {event.sources.map((source, index) => (
                        <span key={source.url}>
                          {index > 0 && ", "}
                          <a
                            href={source.url}
                            className={styles["steam-page__source-link"]}
                          >
                            {source.title}
                          </a>
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}
    </main>
  );
}
