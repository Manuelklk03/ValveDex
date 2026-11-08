import type { Metadata } from "next";
import { universeArt } from "@/data/universe-art";
import { SagaBackdrop } from "@/features/universes/components/saga-backdrop";
import { UniverseGate } from "@/features/universes/components/universe-gate";
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

  const gate = (universe: (typeof universes)[number], featured = false) => (
    <li
      key={universe.id}
      className={
        featured
          ? `${styles["universes-page__item"]} ${styles["universes-page__item--wide"]}`
          : styles["universes-page__item"]
      }
    >
      <UniverseGate
        universe={universe}
        art={universeArt[universe.id]}
        gameNames={getOfficialGamesByUniverse(universe.id).map(
          (game) => game.name,
        )}
        featured={featured}
      />
    </li>
  );

  return (
    <main className={styles["universes-page"]}>
      {/* El fondo de la página cambia con la saga que se tiene delante */}
      <SagaBackdrop
        layers={universes.map((universe) => ({
          id: universe.id,
          accent: universeArt[universe.id].accent,
          image: universeArt[universe.id].backdrop,
        }))}
      />

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

      <ul className={styles["universes-page__gates"]}>
        {available.map((universe, index) => gate(universe, index === 0))}
      </ul>

      {comingSoon.length > 0 && (
        <section aria-labelledby="pending-title">
          <h2 id="pending-title" className={styles["universes-page__subtitle"]}>
            Por llegar
          </h2>
          <ul className={styles["universes-page__gates"]}>
            {comingSoon.map((universe) => gate(universe))}
          </ul>
        </section>
      )}
    </main>
  );
}
