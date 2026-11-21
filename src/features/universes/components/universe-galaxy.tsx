"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";
import styles from "./universe-galaxy.module.css";

export type GalaxyWorld = {
  id: string;
  slug: string;
  name: string;
  description: string;
  accent: string;
  // Emblema de un trazo, teñido con el color de la saga
  emblem: string;
  games: string[];
  available: boolean;
};

type UniverseGalaxyProps = {
  worlds: GalaxyWorld[];
};

// Posición de cada mundo en la galaxia (en %): el primero en el centro y el resto en una elipse a su alrededor
function position(index: number, total: number) {
  if (index === 0) return { x: 50, y: 50 };
  const angle =
    -Math.PI / 2 + ((index - 1) / Math.max(total - 1, 1)) * Math.PI * 2;
  return {
    x: 50 + Math.cos(angle) * 36,
    y: 50 + Math.sin(angle) * 34,
  };
}

// Mapa estelar de las sagas: cada una es un mundo con su emblema y su luz. El cursor mueve el campo con profundidad,
// al acercarse un mundo se enciende (y el fondo toma su color) y al elegirlo, un círculo de su color se abre desde él
// antes de entrar. Sin JavaScript o con «reducir movimiento», son enlaces normales
export function UniverseGalaxy({ worlds }: UniverseGalaxyProps) {
  const router = useRouter();
  const field = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | undefined>();
  const [entering, setEntering] = useState<
    { accent: string; x: number; y: number } | undefined
  >();
  const active = worlds.find((world) => world.id === activeId);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const el = field.current;
    if (!el || event.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    el.style.setProperty(
      "--gx",
      ((event.clientX - box.left) / box.width - 0.5).toFixed(3),
    );
    el.style.setProperty(
      "--gy",
      ((event.clientY - box.top) / box.height - 0.5).toFixed(3),
    );
  }

  function handleEnter(
    event: MouseEvent<HTMLAnchorElement>,
    world: GalaxyWorld,
  ) {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (
      reduce ||
      entering ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;

    event.preventDefault();
    const box = event.currentTarget.getBoundingClientRect();
    setEntering({
      accent: world.accent,
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    });
    // La navegación espera a que el círculo cubra la pantalla
    window.setTimeout(() => router.push(`/universos/${world.slug}`), 650);
  }

  return (
    <section
      className={styles["galaxy"]}
      aria-label="Mapa de universos"
      style={
        active
          ? ({ "--galaxy-accent": active.accent } as CSSProperties)
          : undefined
      }
      data-active={active?.id}
    >
      <div
        ref={field}
        className={styles["galaxy__field"]}
        onPointerMove={handleMove}
      >
        <div className={styles["galaxy__stars"]} aria-hidden="true" />
        <div className={styles["galaxy__glow"]} aria-hidden="true" />

        <ul className={styles["galaxy__worlds"]}>
          {worlds.map((world, index) => {
            const { x, y } = position(index, worlds.length);
            const isActive = world.id === activeId;

            return (
              <li
                key={world.id}
                className={
                  isActive
                    ? `${styles["galaxy__world"]} ${styles["galaxy__world--active"]}`
                    : styles["galaxy__world"]
                }
                data-side={x > 50 ? "left" : "right"}
                style={
                  {
                    "--wx": `${x}%`,
                    "--wy": `${y}%`,
                    "--depth": index === 0 ? 1.6 : 0.8 + (index % 3) * 0.4,
                    "--world-accent": world.accent,
                  } as CSSProperties
                }
                onPointerEnter={() => setActiveId(world.id)}
                onPointerLeave={() => setActiveId(undefined)}
                onFocus={() => setActiveId(world.id)}
                onBlur={() => setActiveId(undefined)}
              >
                <div className={styles["galaxy__drift"]}>
                  {world.available ? (
                    <Link
                      href={`/universos/${world.slug}`}
                      className={styles["galaxy__orb"]}
                      aria-label={`Entrar al universo ${world.name}`}
                      onClick={(event) => handleEnter(event, world)}
                    >
                      <span
                        className={styles["galaxy__emblem"]}
                        style={{
                          maskImage: `url(${world.emblem})`,
                          WebkitMaskImage: `url(${world.emblem})`,
                        }}
                        aria-hidden="true"
                      />
                    </Link>
                  ) : (
                    <span className={styles["galaxy__orb"]} aria-hidden="true">
                      <span
                        className={styles["galaxy__emblem"]}
                        style={{
                          maskImage: `url(${world.emblem})`,
                          WebkitMaskImage: `url(${world.emblem})`,
                        }}
                      />
                    </span>
                  )}
                  <p className={styles["galaxy__name"]}>{world.name}</p>
                  <div className={styles["galaxy__card"]}>
                    <p className={styles["galaxy__description"]}>
                      {world.description}
                    </p>
                    {world.available ? (
                      <ul className={styles["galaxy__games"]}>
                        {world.games.map((game) => (
                          <li key={game}>{game}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles["galaxy__pending"]}>Próximamente</p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {entering && (
        <div
          className={styles["galaxy__portal"]}
          style={
            {
              "--portal-x": `${entering.x}px`,
              "--portal-y": `${entering.y}px`,
              "--portal-color": entering.accent,
            } as CSSProperties
          }
          aria-hidden="true"
        />
      )}
    </section>
  );
}
