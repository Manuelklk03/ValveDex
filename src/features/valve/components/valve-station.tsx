"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState, type CSSProperties } from "react";
import { SceneBoundary } from "@/components/ui/scene-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollTravel } from "@/components/ui/use-scroll-travel";
import type { DossierTransition } from "@/domain/dossier-transition";
import { ValveIntro } from "./valve-intro";
import type { StationCounts, StationSaga } from "./valve-station-scene";
import type { ValveRoom } from "./valve-rooms";
import styles from "./valve-station.module.css";

// Three.js solo se descarga en el navegador
const StationScene = dynamic(() => import("./valve-station-scene"), {
  ssr: false,
  // Mientras llega Three.js, el escenario es un esqueleto
  loading: () => <Skeleton width="100%" height="100%" />,
});

// La intro solo se ve la primera vez de cada sesión
const INTRO_SEEN_KEY = "valvedex-intro-seen";

export type StationUniverse = StationSaga & {
  slug: string;
  name: string;
  entry?: DossierTransition;
};

type ValveStationProps = {
  rooms: ValveRoom[];
  universes: StationUniverse[];
  counts: StationCounts;
  stats: { label: string; value: number }[];
};

// Entrada animada de cada sala de Valve
const roomEntry: Record<ValveRoom["id"], DossierTransition> = {
  history: "shutter",
  steam: "crt",
  hardware: "scan",
  people: "gate",
};

// Color de cada parada: la pared, las cuatro salas (Historia, Personal, Hardware y Steam) y las sagas
const accents = [
  "#e5513c",
  "#f39a2e",
  "#e9e4d6",
  "#35d0e8",
  "#4aa3ff",
  "#f3efe6",
];

// La portada es la entrada del espacio de ValveDex: una estación de Valve con sus cuatro salas en línea y, al fondo, las
// sagas. El scroll mueve la cámara de parada en parada; cada sala se puede pulsar o abrir con su botón, y entrar a una
// sala o a una saga lanza la cámara hacia ella mientras se cierra la entrada animada
export function ValveStation({
  rooms,
  universes,
  counts,
  stats,
}: ValveStationProps) {
  const stopCount = rooms.length + 2;
  const { section, target, entering, active, reduced, goTo, startEntering } =
    useScrollTravel(stopCount);
  const room = active >= 1 && active <= rooms.length ? rooms[active - 1] : null;
  const names = ["Valve", ...rooms.map((item) => item.title), "Universos"];
  const [intro, setIntro] = useState(false);

  // Entrar al mundo: la primera vez de la sesión suena la intro; después (o con movimiento reducido) se entra directo
  const begin = useCallback(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      // sin almacenamiento: se muestra
    }
    if (seen || reduced) goTo(1);
    else setIntro(true);
  }, [goTo, reduced]);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // sin almacenamiento: se volverá a mostrar
    }
    setIntro(false);
    goTo(1);
    // El botón que abrió la intro desaparece al avanzar: el foco pasa a la sección
    section.current?.focus({ preventScroll: true });
  }, [goTo, section]);

  // Clic en un objeto de la escena: si es la parada activa se entra, si no la cámara viaja hasta ella
  const select = useCallback(
    (stop: number) => {
      if (stop === 0 && active === 0) {
        begin();
      } else if (stop === active && stop >= 1 && stop <= rooms.length) {
        document.getElementById("station-enter")?.click();
      } else if (stop === active && stop === stopCount - 1) {
        document.getElementById("station-universes")?.click();
      } else {
        goTo(stop);
      }
    },
    [active, begin, goTo, rooms.length, stopCount],
  );

  return (
    <section
      ref={section}
      className={styles["station"]}
      aria-label="Entrada a ValveDex"
      tabIndex={-1}
      data-world-home
      style={
        {
          "--station-accent": accents[active] ?? accents[0],
          "--station-count": stopCount,
        } as CSSProperties
      }
    >
      <h1 className={styles["station__sr"]}>Valve, de Black Mesa a Steam</h1>
      <div className={styles["station__stage"]}>
        <div className={styles["station__canvas"]} aria-hidden="true">
          <SceneBoundary>
            <StationScene
              sagas={universes}
              counts={counts}
              target={target}
              entering={entering}
              reduced={reduced}
              onSelect={select}
              onStart={begin}
            />
          </SceneBoundary>
        </div>
        <div className={styles["station__vignette"]} aria-hidden="true" />

        <div className={styles["station__info"]}>
          <div className={styles["station__text"]} key={active}>
            {active === 0 && (
              <>
                <p className={styles["station__kicker"]}>
                  Enciclopedia de fans
                </p>
                <p
                  className={`${styles["station__title"]} ${styles["station__title--hero"]}`}
                  aria-hidden="true"
                >
                  Valve, de Black Mesa a Steam
                </p>
                <p className={styles["station__summary"]}>
                  Juegos, personajes, armas, mapas y lore de las sagas de Valve.
                  Entra al mundo de Valve: su historia, su gente, su hardware,
                  Steam y cinco universos.
                </p>
                <dl className={styles["station__stats"]}>
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt>{stat.label}</dt>
                      <dd>{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            {room && (
              <>
                <p className={styles["station__kicker"]}>{room.kicker}</p>
                <h2 className={styles["station__title"]}>{room.title}</h2>
                <p className={styles["station__summary"]}>{room.summary}</p>
                <p className={styles["station__meta"]}>{room.meta}</p>
              </>
            )}
            {active === stopCount - 1 && (
              <>
                <p className={styles["station__kicker"]}>
                  Fuera de la estación
                </p>
                <h2 className={styles["station__title"]}>Los universos</h2>
                <p className={styles["station__summary"]}>
                  Half-Life, Portal, Team Fortress, Left 4 Dead y
                  Counter-Strike: cada saga es un mundo con sus juegos,
                  personajes y mapas.
                </p>
                <ul className={styles["station__sagas"]}>
                  {universes.map((universe) => (
                    <li key={universe.id}>
                      <Link
                        href={`/universos/${universe.slug}`}
                        data-elevator={universe.entry}
                        data-elevator-title={universe.name}
                        data-elevator-label="Universo"
                        onClick={startEntering}
                        style={{ "--dot": universe.accent } as CSSProperties}
                      >
                        {universe.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {active === 0 && (
            <div className={styles["station__actions"]}>
              <button
                type="button"
                className={styles["station__button"]}
                id="station-start"
                onClick={begin}
              >
                Entrar al mundo
                <span aria-hidden="true">↓</span>
              </button>
              <Link href="/explorar" className={styles["station__link"]}>
                Explorar fichas
              </Link>
            </div>
          )}
          {room && (
            <Link
              id="station-enter"
              href={room.href}
              className={styles["station__button"]}
              data-elevator={roomEntry[room.id]}
              data-elevator-title={room.title}
              data-elevator-label="Sala de Valve"
              onClick={startEntering}
            >
              Entrar a la sala
              <span aria-hidden="true">→</span>
            </Link>
          )}
          {active === stopCount - 1 && (
            <Link
              id="station-universes"
              href="/universos"
              className={styles["station__button"]}
              onClick={startEntering}
            >
              Ver el mapa de universos
              <span aria-hidden="true">→</span>
            </Link>
          )}
          <p className={styles["station__sr"]} role="status">
            {names[active]}, parada {active + 1} de {stopCount}
          </p>
        </div>

        <nav className={styles["station__dots"]} aria-label="Ir a una parada">
          <ul>
            {names.map((name, index) => (
              <li key={name}>
                <button
                  type="button"
                  className={
                    index === active
                      ? `${styles["station__dot"]} ${styles["station__dot--on"]}`
                      : styles["station__dot"]
                  }
                  aria-label={name}
                  aria-current={index === active}
                  style={{ "--dot": accents[index] } as CSSProperties}
                  onClick={() => goTo(index)}
                />
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles["station__hint"]} aria-hidden="true">
          Desplaza para avanzar · ← →
        </p>
      </div>
      {intro && <ValveIntro onDone={finishIntro} />}
    </section>
  );
}
