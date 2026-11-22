"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
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

// Si WebGL no está disponible, el mapa se queda en el fondo de color y el resto (nombres, enlaces, navegación)
// sigue funcionando
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Viaje por los universos: la página es larga y el scroll mueve la cámara de un mundo a otro dentro de un espacio 3D
// que ocupa toda la pantalla. El mundo activo se presenta sobre la escena; al entrar, la cámara se lanza hacia él y
// la entrada animada de la saga cubre la pantalla. Sin «reducir movimiento» la cámara no viaja: salta de mundo en mundo
export function UniverseExplorer({ worlds, children }: UniverseExplorerProps) {
  const section = useRef<HTMLElement>(null);
  const target = useRef(0);
  const entering = useRef(false);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const world = worlds[active] ?? worlds[0];
  const lastIndex = worlds.length - 1;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // El scroll fija a qué mundo mira la cámara: 0 al empezar, el último al llegar al final de la sección
  useEffect(() => {
    function onScroll() {
      const el = section.current;
      if (!el) return;
      const travel = el.offsetHeight - window.innerHeight;
      const progress =
        travel > 0 ? -el.getBoundingClientRect().top / travel : 0;
      target.current = Math.min(Math.max(progress, 0), 1) * lastIndex;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [lastIndex]);

  const goTo = useCallback(
    (index: number) => {
      const el = section.current;
      if (!el) return;
      const clamped = Math.min(Math.max(index, 0), lastIndex);
      const travel = el.offsetHeight - window.innerHeight;
      const top =
        el.getBoundingClientRect().top +
        window.scrollY +
        (clamped / lastIndex) * travel;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    },
    [lastIndex, reduced],
  );

  // Flechas izquierda y derecha: mundo anterior y siguiente. Solo con el foco en la página o dentro del mapa, para
  // no quitárselas a otros controles; el punto de partida es el destino del scroll, no el mundo ya alcanzado
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const el = event.target as HTMLElement | null;
      const free = !el || el === document.body || section.current?.contains(el);
      const field = el?.closest(
        "input, textarea, select, dialog, [role='combobox']",
      );
      if (!free || field || event.altKey || event.ctrlKey || event.metaKey)
        return;
      const base = Math.round(target.current);
      if (event.key === "ArrowRight") goTo(base + 1);
      if (event.key === "ArrowLeft") goTo(base - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  // La cámara deja de estar lanzada hacia el mundo al volver desde la caché del navegador y también si la
  // navegación no llega a producirse (la entrada animada se abre sola a los 4 s)
  const resetTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const restore = () => {
      entering.current = false;
    };
    window.addEventListener("pageshow", restore);
    return () => {
      window.removeEventListener("pageshow", restore);
      window.clearTimeout(resetTimer.current);
    };
  }, []);

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
              onActive={setActive}
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
                entering.current = true;
                window.clearTimeout(resetTimer.current);
                resetTimer.current = window.setTimeout(() => {
                  entering.current = false;
                }, 5000);
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
