import Link from "next/link";
import styles from "./page.module.css";
import { getEntries } from "@/features/catalog/get-entries";
import { getGameSections } from "@/features/games/get-game-sections";
import { getUniverses } from "@/features/universes/get-universes";
import { getLatestValveMilestones } from "@/features/valve/get-valve-milestones";
import { getValvePeople } from "@/features/valve/get-valve-people";
import { Timeline } from "@/components/ui/timeline";
import { ValveWheel } from "@/components/ui/valve-wheel";

// Datos del texto de la sección «Valve» (fuente: Valve Corporation, Wikipedia, en los hitos)
const valveFacts = [
  { label: "Fundación", value: "1996" },
  { label: "Sede", value: "Bellevue (Washington)" },
  { label: "Primer juego", value: "Half-Life, 1998" },
];

export default function HomePage() {
  const milestones = getLatestValveMilestones(3);
  const people = getValvePeople();
  const stats = [
    { label: "Sagas", value: getUniverses().length },
    { label: "Fichas", value: getEntries().length },
    { label: "Apartados por juego", value: getGameSections().length },
  ];

  return (
    <main className={styles["home-page"]}>
      <section
        className={styles["home-page__hero"]}
        aria-labelledby="home-title"
      >
        <div className={styles["home-page__hero-inner"]}>
          <div className={styles["home-page__hero-content"]}>
            <p className={styles["home-page__eyebrow"]}>Enciclopedia de fans</p>
            <h1 id="home-title" className={styles["home-page__title"]}>
              Valve, de Black Mesa a Steam
            </h1>
            <p className={styles["home-page__intro"]}>
              Juegos, personajes, armas, mapas y lore de las sagas de Valve.
              Empezamos por Half-Life.
            </p>
            <div className={styles["home-page__actions"]}>
              <Link href="/universos" className={styles["home-page__button"]}>
                Ver universos
              </Link>
              <Link href="/explorar" className={styles["home-page__link"]}>
                Explorar fichas
              </Link>
            </div>
          </div>
          <ValveWheel className={styles["home-page__wheel"]} />
        </div>

        <dl className={styles["home-page__stats"]}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles["home-page__stat"]}>
              <dt className={styles["home-page__stat-label"]}>{stat.label}</dt>
              <dd className={styles["home-page__stat-value"]}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className={styles["home-page__sections"]}>
        <section
          className={styles["home-page__section"]}
          aria-labelledby="valve-title"
        >
          <header className={styles["home-page__section-head"]}>
            <p className={styles["home-page__section-index"]}>01</p>
            <h2 id="valve-title" className={styles["home-page__section-title"]}>
              Valve
            </h2>
          </header>

          <div className={styles["home-page__section-body"]}>
            <p className={styles["home-page__lead"]}>
              Valve Corporation es una desarrolladora y distribuidora de
              videojuegos fundada en 1996 por Gabe Newell y Mike Harrington, con
              sede en Bellevue (Washington). Su primer juego, Half-Life, se
              publicó en 1998.
            </p>

            <dl className={styles["home-page__facts"]}>
              {valveFacts.map((fact) => (
                <div key={fact.label} className={styles["home-page__fact"]}>
                  <dt className={styles["home-page__fact-label"]}>
                    {fact.label}
                  </dt>
                  <dd className={styles["home-page__fact-value"]}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className={styles["home-page__subtitle"]}>Fundadores</h3>
            <ul className={styles["home-page__people"]}>
              {people.map((person) => (
                <li key={person.id} className={styles["home-page__person"]}>
                  <Link
                    href={`/valve/personas/${person.slug}`}
                    className={styles["home-page__person-link"]}
                  >
                    {person.name}
                  </Link>
                  <span className={styles["home-page__person-role"]}>
                    {person.role}
                  </span>
                  <span
                    className={styles["home-page__person-arrow"]}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className={styles["home-page__section"]}
          aria-labelledby="history-title"
        >
          <header className={styles["home-page__section-head"]}>
            <p className={styles["home-page__section-index"]}>02</p>
            <h2
              id="history-title"
              className={styles["home-page__section-title"]}
            >
              Historia
            </h2>
          </header>

          <div className={styles["home-page__section-body"]}>
            <Timeline milestones={milestones} />
            <Link
              href="/valve/historia"
              className={styles["home-page__more-link"]}
            >
              Ver la historia completa
            </Link>
          </div>
        </section>

        <section
          className={styles["home-page__section"]}
          aria-labelledby="steam-title"
        >
          <header className={styles["home-page__section-head"]}>
            <p className={styles["home-page__section-index"]}>03</p>
            <h2 id="steam-title" className={styles["home-page__section-title"]}>
              Steam
            </h2>
          </header>

          <div className={styles["home-page__section-body"]}>
            <div className={styles["home-page__steam"]}>
              <p className={styles["home-page__steam-year"]}>
                <span className={styles["home-page__steam-year-label"]}>
                  Lanzamiento
                </span>
                2003
              </p>
              <div className={styles["home-page__steam-text"]}>
                <p className={styles["home-page__lead"]}>
                  Steam es la plataforma de distribución digital de Valve. Hoy
                  es la tienda y biblioteca de juegos para PC más utilizada.
                </p>
                <Link
                  href="/valve/steam"
                  className={styles["home-page__more-link"]}
                >
                  Más sobre Steam
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
