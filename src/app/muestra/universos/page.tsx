import type { Metadata } from "next";
import { lineIcons, universeArt } from "@/data/universe-art";
import { getEntries } from "@/features/catalog/get-entries";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import { UniverseGate } from "@/features/universes/components/universe-gate";
import {
  getGameById,
  getOfficialGamesByUniverse,
  getUniverses,
} from "@/features/universes/get-universes";
import { DossierSample } from "./dossier-sample";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Muestra: universos y dossieres",
  robots: { index: false },
};

// shortcut: página de prueba del rediseño de universos; se borra al integrar la versión real en /universos
const dossiers = [
  {
    gameId: "half-life-2",
    kicker: "Etapa Source · Ciudad 17",
    stamp: "Alianza · Vigilancia",
    accent: "#ff9b21",
    backdrop: "/images/entries/hl2-highway-17-half-life-2.webp",
    icons: [lineIcons["c17-skull"], lineIcons.antlion],
  },
  {
    gameId: "half-life-2-episode-one",
    kicker: "Etapa Source · La Ciudadela",
    stamp: "Directiva urgente",
    accent: "#7fb7c9",
    backdrop:
      "/images/entries/ep1-direct-intervention-half-life-2-episode-one.webp",
    icons: [lineIcons.citadel],
  },
  {
    gameId: "half-life-2-episode-two",
    kicker: "Etapa Source · White Forest",
    stamp: "Base de la Resistencia",
    accent: "#9ad04f",
    backdrop: "/images/entries/ep2-riding-shotgun-half-life-2-episode-two.webp",
    icons: [lineIcons.hunter, lineIcons.antlion],
  },
  {
    gameId: "half-life-alyx",
    kicker: "Etapa Source 2 · Realidad virtual",
    stamp: "Entre HL1 y HL2",
    accent: "#62d0e0",
    backdrop: "/images/entries/alyx-gravity-gloves-half-life-alyx.webp",
    icons: [lineIcons["alyx-pistol"]],
  },
];

export default function UniversesSamplePage() {
  const universes = getUniverses();
  const entries = getEntries();

  return (
    <main className={styles["sample"]}>
      <header className={styles["sample__header"]}>
        <p className={styles["sample__eyebrow"]}>
          Muestra de rediseño · no indexada
        </p>
        <h1 className={styles["sample__title"]}>Universos</h1>
        <p className={styles["sample__intro"]}>
          Pasa el ratón por las tarjetas: se inclinan, aparece el modelo 3D del
          juego y se enciende la entrada. Los iconos de línea son de Manuel y se
          pintan con el color de cada saga.
        </p>
      </header>

      <ul className={styles["sample__gates"]}>
        {universes.map((universe, index) => (
          <li
            key={universe.id}
            className={
              index === 0
                ? `${styles["sample__gate"]} ${styles["sample__gate--wide"]}`
                : styles["sample__gate"]
            }
          >
            <UniverseGate
              universe={universe}
              art={universeArt[universe.id]}
              gameNames={getOfficialGamesByUniverse(universe.id).map(
                (game) => game.name,
              )}
              featured={index === 0}
            />
          </li>
        ))}
      </ul>

      <section
        aria-labelledby="dossiers-title"
        className={styles["sample__section"]}
      >
        <h2 id="dossiers-title" className={styles["sample__subtitle"]}>
          Dossieres de la etapa Source
        </h2>
        <ul className={styles["sample__dossiers"]}>
          {dossiers.map((dossier) => {
            const game = getGameById(dossier.gameId);
            if (!game) return null;
            const count = entries.filter((entry) =>
              entry.appearances.some((a) => a.gameId === dossier.gameId),
            ).length;
            return (
              <li key={dossier.gameId}>
                <DossierSample
                  name={game.name}
                  kicker={dossier.kicker}
                  stamp={dossier.stamp}
                  accent={dossier.accent}
                  backdrop={dossier.backdrop}
                  icons={dossier.icons}
                  facts={[
                    { label: "Año", value: getGameYearLabel(game) },
                    { label: "Fichas", value: String(count) },
                  ]}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
