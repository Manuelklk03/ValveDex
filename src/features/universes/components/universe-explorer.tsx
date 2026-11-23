"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, type CSSProperties, type ReactNode } from "react";
import { SceneBoundary } from "@/components/ui/scene-boundary";
import { useScrollTravel } from "@/components/ui/use-scroll-travel";
import { getUniverseEntry } from "../universe-entries";
import type { SceneWorld } from "./universe-scene";
import styles from "./universe-explorer.module.css";

// Three.js solo se descarga en el navegador y cuando se abre el mapa
const UniverseScene = dynamic(() => import("./universe-scene"), {
  ssr: false,
});

export type ExplorerWorld = SceneWorld & {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  games: string[];
  available: boolean;
};

type UniverseExplorerProps = {
  worlds: ExplorerWorld[];
  // Título de la página, sobre el mapa
  children?: ReactNode;
};

// Viaje por los universos: la página es larga y el scroll mueve la cámara de un mundo a otro dentro de un espacio 3D
// que ocupa toda la pantalla. El mundo activo se presenta sobre la escena; al entrar, la cámara se lanza hacia él y
// la entrada animada de la saga cubre la pantalla. Sin «reducir movimiento» la cámara no viaja: salta de mundo en mundo
export function UniverseExplorer({ worlds, children }: UniverseExplorerProps) {
  const { section, target, entering, active, reduced, goTo, startEntering } =
    useScrollTravel(worlds.length);
  const world = worlds[active] ?? worlds[0];

  // Clic en un mundo de la escena: si es el activo, se entra; si no, la cámara viaja hasta él
  const select = useCallback(
    (index: number) => {
      if (index === active && worlds[index]?.available) {
        document.getElementById("explorer-enter")?.click();
      } else {
        goTo(index);
      }
    },
    [active, goTo, worlds],
  );

  return (
    <section
      ref={section}
      className={styles["explorer"]}
      aria-label="Mapa de universos"
      style={
        {
          "--explorer-accent": world.accent,
          "--explorer-count": worlds.length,
        } as CSSProperties
      }
    >
      <div className={styles["explorer__stage"]}>
        <div className={styles["explorer__canvas"]} aria-hidden="true">
          <SceneBoundary>
            <UniverseScene
              worlds={worlds}
              target={target}
              entering={entering}
              reduced={reduced}
              onSelect={select}
            />
          </SceneBoundary>
        </div>
        <div className={styles["explorer__vignette"]} aria-hidden="true" />

        <header className={styles["explorer__heading"]}>{children}</header>

        {/* Presentación del mundo activo */}
        <div className={styles["explorer__info"]}>
          <div className={styles["explorer__text"]} key={world.id}>
            <p className={styles["explorer__index"]}>
              Universo {String(active + 1).padStart(2, "0")} /{" "}
              {String(worlds.length).padStart(2, "0")}
            </p>
            <h2 className={styles["explorer__name"]}>{world.name}</h2>
            <p className={styles["explorer__tagline"]}>{world.tagline}</p>
            {world.available && (
              <ul
                className={styles["explorer__games"]}
                aria-label={`Juegos de ${world.name}`}
              >
                {world.games.map((game) => (
                  <li key={game}>{game}</li>
                ))}
              </ul>
            )}
          </div>
          {world.available ? (
            <Link
              id="explorer-enter"
              href={`/universos/${world.slug}`}
              className={styles["explorer__enter"]}
              data-elevator={getUniverseEntry(world.slug)}
              data-elevator-title={world.name}
              data-elevator-label="Universo"
              onClick={() => {
                startEntering();
              }}
            >
              Entrar al universo
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <p className={styles["explorer__pending"]}>Próximamente</p>
          )}
          <p className={styles["explorer__sr"]}>{world.description}</p>
          <p className={styles["explorer__sr"]} role="status">
            {world.name}, universo {active + 1} de {worlds.length}
          </p>
        </div>

        {/* Navegación: puntos por mundo y pista de scroll */}
        <nav className={styles["explorer__dots"]} aria-label="Ir a un universo">
          <ul>
            {worlds.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={
                    index === active
                      ? `${styles["explorer__dot"]} ${styles["explorer__dot--on"]}`
                      : styles["explorer__dot"]
                  }
                  aria-label={item.name}
                  aria-current={index === active}
                  style={{ "--dot": item.accent } as CSSProperties}
                  onClick={() => goTo(index)}
                />
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles["explorer__hint"]} aria-hidden="true">
          Desplaza para viajar · ← →
        </p>
      </div>
    </section>
  );
}
