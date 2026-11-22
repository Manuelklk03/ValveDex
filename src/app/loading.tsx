import { Skeleton } from "@/components/ui/skeleton";
import styles from "./loading.module.css";

// Esqueleto de cualquier página mientras llega su contenido: cabecera, título y tres bloques
export default function Loading() {
  return (
    <main className={styles["loading-page"]} aria-busy="true">
      <p className={styles["loading-page__sr"]} role="status">
        Cargando…
      </p>
      <Skeleton width="12rem" height="0.9rem" />
      <Skeleton width="min(32rem, 80%)" height="3.5rem" />
      <Skeleton width="min(40rem, 90%)" height="1.1rem" />
      <div className={styles["loading-page__grid"]}>
        <Skeleton height="11rem" />
        <Skeleton height="11rem" />
        <Skeleton height="11rem" />
      </div>
    </main>
  );
}
