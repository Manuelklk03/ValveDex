import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { getEntries } from "@/features/catalog/get-entries";
import { getGameSections } from "@/features/games/get-game-sections";
import {
  getOfficialGamesByUniverse,
  getUniverses,
} from "@/features/universes/get-universes";
import { getValveMilestones } from "@/features/valve/get-valve-milestones";
import { getValvePeople } from "@/features/valve/get-valve-people";
import { GamesShowcase } from "@/features/universes/components/games-showcase";
import { ProductionLine } from "@/features/valve/components/production-line";
import { SteamErasTeaser } from "@/features/valve/components/steam-eras-teaser";
import { HomeMotion } from "@/features/valve/components/home-motion";
import { IndustrialBackdrop } from "@/components/ui/industrial-backdrop";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ValveWheel } from "@/components/ui/valve-wheel";

// Datos del texto de la sección «Valve» (fuente: Valve Corporation, Wikipedia, en los hitos)
const valveFacts = [
  { label: "Fundación", value: "1996" },
  { label: "Sede", value: "Bellevue (Washington)" },
  { label: "Primer juego", value: "Half-Life, 1998" },
];

export default function HomePage() {
  const milestones = getValveMilestones();
  const people = getValvePeople();
  const universes = getUniverses();
  const stats = [
    { label: "Sagas", value: universes.length },
    {
      label: "Juegos",
      value: universes.flatMap((u) => getOfficialGamesByUniverse(u.id)).length,
    },
    { label: "Fichas", value: getEntries().length },
    { label: "Apartados por juego", value: getGameSections().length },
  ];

  return (
    <main className={styles["home-page"]}>
      <SmoothScroll />
      <HomeMotion />
      <section
        className={styles["home-page__hero"]}
        aria-labelledby="home-title"
      >
        <IndustrialBackdrop />
        <div className={styles["home-page__hero-inner"]}>
          <div className={styles["home-page__hero-content"]}>
            <p className={styles["home-page__eyebrow"]} data-hero-item>
              Enciclopedia de fans
            </p>
            <h1
              id="home-title"
              className={styles["home-page__title"]}
              data-hero-item
            >
              Valve, de Black Mesa a Steam
            </h1>
            <p className={styles["home-page__intro"]} data-hero-item>
              Juegos, personajes, armas, mapas y lore de las sagas de Valve.
              Empezamos por Half-Life.
            </p>
            <div className={styles["home-page__actions"]} data-hero-item>
              <Link href="/universos" className={styles["home-page__button"]}>
                Ver universos
              </Link>
              <Link href="/explorar" className={styles["home-page__link"]}>
                Explorar fichas
              </Link>
            </div>
          </div>
          <div className={styles["home-page__machine"]}>
            <div className={styles["home-page__wheel"]} data-home-wheel>
              <ValveWheel className={styles["home-page__wheel-svg"]} />
            </div>
          </div>
        </div>

        <dl className={styles["home-page__stats"]}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles["home-page__stat"]}>
              <dt className={styles["home-page__stat-label"]}>{stat.label}</dt>
              <dd
                className={styles["home-page__stat-value"]}
                data-count={stat.value}
              >
                {stat.value}
              </dd>
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

          <div className={styles["home-page__section-body"]} data-home-reveal>
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

            <h3 className={styles["home-page__subtitle"]}>Figuras clave</h3>
            <ul className={styles["home-page__people"]}>
              {people.map((person) => (
                <li key={person.id} className={styles["home-page__person"]}>
                  {person.image ? (
                    <Image
                      src={person.image.src}
                      alt=""
                      width={96}
                      height={96}
                      className={styles["home-page__person-photo"]}
                    />
                  ) : (
                    <span
                      className={styles["home-page__person-photo"]}
                      aria-hidden="true"
                    >
                      {person.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </span>
                  )}
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

            <Link
              href="/valve/hardware"
              className={styles["home-page__more-link"]}
            >
              Ver dispositivos y hardware de Valve
            </Link>
          </div>
        </section>

        <section
          className={styles["home-page__section"]}
          aria-labelledby="games-title"
        >
          <header className={styles["home-page__section-head"]}>
            <p className={styles["home-page__section-index"]}>02</p>
            <h2 id="games-title" className={styles["home-page__section-title"]}>
              Juegos
            </h2>
          </header>

          <div className={styles["home-page__section-body"]} data-home-reveal>
            <GamesShowcase />
            <Link href="/universos" className={styles["home-page__more-link"]}>
              Ver todos los universos
            </Link>
          </div>
        </section>

        <section
          className={`${styles["home-page__section"]} ${styles["home-page__section--wide"]}`}
          aria-labelledby="history-title"
          data-home-pin
        >
          <header
            className={`${styles["home-page__section-head"]} ${styles["home-page__section-head--static"]}`}
          >
            <p className={styles["home-page__section-index"]}>03</p>
            <h2
              id="history-title"
              className={styles["home-page__section-title"]}
            >
              Historia
            </h2>
          </header>

          <div className={styles["home-page__section-body"]}>
            <ProductionLine milestones={milestones} />
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
            <p className={styles["home-page__section-index"]}>04</p>
            <h2 id="steam-title" className={styles["home-page__section-title"]}>
              Steam
            </h2>
          </header>

          <div className={styles["home-page__section-body"]} data-home-reveal>
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
            <SteamErasTeaser />
          </div>
        </section>
      </div>
    </main>
  );
}
