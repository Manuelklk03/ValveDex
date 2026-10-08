import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles["home-page"]}>
      <section
        className={styles["home-page__hero"]}
        aria-labelledby="home-title"
      >
        <p className={styles["home-page__eyebrow"]}>Enciclopedia de fans</p>
        <h1 id="home-title" className={styles["home-page__title"]}>
          Todo el universo de Valve en un solo lugar
        </h1>
        <p className={styles["home-page__intro"]}>
          Juegos, personajes, armas, lore y mapas de las sagas de Valve,
          empezando por Half-Life
        </p>
        <div className={styles["home-page__actions"]}>
          <Link
            href="/universos"
            className={`${styles["home-page__button"]} ${styles["home-page__button--primary"]}`}
          >
            Ver Universos
          </Link>

          <Link href="/explorar" className={styles["home-page__button"]}>
            Explorar
          </Link>
        </div>
      </section>

      <section
        className={styles["home-page__section"]}
        aria-labelledby="universos-title"
      ></section>
    </main>
  );
}
