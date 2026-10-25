import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import styles from "../valve-page.module.css";

export const metadata: Metadata = {
  title: "Steam",
  description: "Historia y funciones de Steam, la plataforma de Valve.",
};

export default function SteamPage() {
  return (
    <main className={styles["valve-page"]}>
      <Breadcrumb
        items={[{ label: "Inicio", href: "/" }, { label: "Steam" }]}
      />

      <header className={styles["valve-page__header"]}>
        <p className={styles["valve-page__eyebrow"]}>Valve</p>
        <h1 className={styles["valve-page__title"]}>Steam</h1>
        <p className={styles["valve-page__intro"]}>
          La plataforma de distribución digital de Valve, lanzada en 2003.
        </p>
      </header>

      <section
        className={styles["valve-page__section"]}
        aria-labelledby="steam-history-title"
      >
        <h2
          id="steam-history-title"
          className={styles["valve-page__section-title"]}
        >
          Historia
        </h2>

        <p className={styles["valve-page__text"]}>
          Valve lanzó Steam en 2003 para distribuir y actualizar sus juegos. En
          2004, Half-Life 2 exigió Steam para jugar, lo que impulsó su adopción.
          Con los años pasó a vender juegos de otras compañías.
        </p>
      </section>

      <section
        className={styles["valve-page__section"]}
        aria-labelledby="steam-sources-title"
      >
        <h2
          id="steam-sources-title"
          className={styles["valve-page__section-title"]}
        >
          Fuentes
        </h2>
        <ul className={styles["valve-page__sources"]}>
          <li>
            <a
              href="https://es.wikipedia.org/wiki/Steam"
              className={styles["valve-page__source-link"]}
            >
              Steam - Wikipedia
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
