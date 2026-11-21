import type { Metadata } from "next";
import { universeArt, lineIcons } from "@/data/universe-art";
import { UniverseGalaxy } from "@/features/universes/components/universe-galaxy";
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

  return (
    <main className={styles["universes-page"]}>
      <UniverseGalaxy
        worlds={universes.flatMap((universe) => {
          const emblem =
            lineIcons[`emblem-${universe.id}` as keyof typeof lineIcons];
          const art = universeArt[universe.id];

          return emblem
            ? [
                {
                  id: universe.id,
                  slug: universe.slug,
                  name: universe.name,
                  tagline: universe.description.split(/(?<=\.)\s/)[0],
                  description: universe.description,
                  accent: art.accent,
                  emblem: emblem.src,
                  backdrop: art.backdrop,
                  model: art.model,
                  modelTilt: art.modelTilt,
                  games: getOfficialGamesByUniverse(universe.id).map(
                    (game) => game.name,
                  ),
                  available: universe.status === "available",
                },
              ]
            : [];
        })}
      >
        <p className={styles["universes-page__eyebrow"]}>
          {available.length} de {universes.length} sagas abiertas
        </p>
        <h1 className={styles["universes-page__title"]}>Universos</h1>
        <p className={styles["universes-page__intro"]}>
          Cada saga de Valve es un mundo. Acércate a uno para ver sus juegos y
          entra.
        </p>
      </UniverseGalaxy>
    </main>
  );
}
