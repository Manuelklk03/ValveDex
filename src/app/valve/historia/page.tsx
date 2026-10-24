import type { Metadata } from "next";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import { getValveMilestones } from "@/features/valve/get-valve-milestones";
import styles from "../valve-page.module.css";

export const metadata: Metadata = {
  title: "Historia de Valve",
  description: "Cronología de Valve, desde su fundación en 1996",
};

export default function ValveHistoryPage() {
  const milestones = getValveMilestones();

  return (
    <main className={styles["valve-page"]}>
      <nav aria-label="Ruta de navegación">
        <Link href="/" className={styles["valve-page__back"]}>
          ← Inicio
        </Link>
      </nav>

      <header className={styles["valve-page__header"]}>
        <p className={styles["valve-page__eyebrow"]}>Valve</p>
        <h1 className={styles["valve-page__title"]}>Historia de Valve</h1>
        <p className={styles["valve-page__intro"]}>
          Los momentos clave de Valve, desde su fundación en 1996
        </p>
      </header>

      <Timeline milestones={milestones} />
    </main>
  );
}
