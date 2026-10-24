import type { Metadata } from "next";
import { UniverseCard } from "@/features/universes/components/universe-card";
import {
  getUniverses,
  getOfficialGamesByUniverse,
} from "@/features/universes/get-universes";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Universos",
  description: "Todas las sagas de Valve y los juegos que las forman.",
};

export default function UniversesPage() {
  const universes = getUniverses();
  const available = universes.filter((u) => u.status === "available");
  const comingSoon = universes.filter((u) => u.status !== "available");

  const getGameNames = (universeId: string) =>
    getOfficialGamesByUniverse(universeId).map((game) => game.name);

  return (
    <main className={styles["universes-page"]}>
      <header className={styles["universes-page__header"]}>
        <p className={styles["universes-page__eyebrow"]}>
          {available.length} de {universes.length} sagas abiertas
        </p>
        <h1 className={styles["universes-page__title"]}>Universos</h1>
        <p className={styles["universes-page__intro"]}>
          Las sagas de Valve y sus juegos. Empezamos por Half-Life; el resto
          llegará más adelante.
        </p>
      </header>

      <ul className={styles["universes-page__featured"]}>
        {available.map((universe) => (
          <li key={universe.id}>
            <UniverseCard
              universe={universe}
              gameNames={getGameNames(universe.id)}
            />
          </li>
        ))}
      </ul>

      {comingSoon.length > 0 && (
        <section
          className={styles["universes-page__pending"]}
          aria-labelledby="pending-title"
        >
          <h2 id="pending-title" className={styles["universes-page__subtitle"]}>
            Por llegar
          </h2>
          <ul className={styles["universes-page__list"]}>
            {comingSoon.map((universe) => (
              <li key={universe.id}>
                <UniverseCard universe={universe} gameNames={[]} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
