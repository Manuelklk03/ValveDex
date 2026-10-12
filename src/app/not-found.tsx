import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles["not-found-page"]}>
      <p className={styles["not-found-page__code"]}>Error 404</p>
      <h1 className={styles["not-found-page__title"]}>Página no encontrada</h1>
      <p className={styles["not-found-page__text"]}>
        Lo que buscas no existe o todavía no forma parte de ValveDex. Puede que
        el universo, el juego o la ficha lleguen más adelante.
      </p>
      <nav
        aria-label="Volver a la navegación"
        className={styles["not-found-page__actions"]}
      >
        <Link
          href="/"
          className={`${styles["not-found-page__link"]} ${styles["not-found-page__link--primary"]}`}
        >
          Ir al inicio
        </Link>
        <Link href="/universos" className={styles["not-found-page__link"]}>
          Ver universos
        </Link>
      </nav>
    </main>
  );
}
