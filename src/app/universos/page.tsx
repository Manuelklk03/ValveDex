import type { Metadata } from "next";
import { UniverseCard } from "@/features/universes/components/universe-card";
import {
  getUniverses,
  getGamesByUniverse,
} from "@/features/universes/get-universes";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Universos",
  description: "Todas las sagas de Valve y los juegos que las forman.",
};

export default function UniversesPage() {
  const universes = getUniverses();

  return (
    <main className={styles["universes-page"]}>
      <header className={styles["universes-page__header"]}>
        <h1 className={styles["universes-page__title"]}>Universos</h1>
        <p className={styles["universes-page__intro"]}>
          Las sagas de Valve y sus juegos. Empezamos por Half-Life; el resto
          llegará más adelante.
        </p>
      </header>

      <ul className={styles["universes-page__list"]}>
        {universes.map((universe) => (
          <li key={universe.id}>
            <UniverseCard
              universe={universe}
              gameCount={getGamesByUniverse(universe.id).length}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
