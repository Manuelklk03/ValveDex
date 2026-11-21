"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import styles from "./universe-galaxy.module.css";

// El modelo 3D (Three.js) solo se descarga la primera vez que se acerca el cursor a un mundo
const ModelSpinner = dynamic(() => import("@/components/ui/model-spinner"), {
  ssr: false,
});

export type GalaxyWorld = {
  id: string;
  slug: string;
  name: string;
  // Primera frase de la descripción: lo que se lee al acercarse
  tagline: string;
  description: string;
  accent: string;
  // Emblema de un trazo, teñido con el color de la saga
  emblem: string;
  // Captura del juego que se ve (y se mueve) dentro del mundo
  backdrop?: string;
  model?: string;
  modelTilt?: number;
  games: string[];
  available: boolean;
};

type UniverseGalaxyProps = {
  worlds: GalaxyWorld[];
  // Título de la página, sobre el mapa
  children?: ReactNode;
};

// Posición de cada mundo en el mapa (en %): el primero, en el centro, y los siguientes en una constelación a mano que
// deja libre la esquina del título (hasta cuatro; si hay más, una elipse alrededor del centro)
const constellation = [
  { x: 50, y: 52 },
  { x: 67, y: 22 },
  { x: 88, y: 54 },
  { x: 68, y: 84 },
  { x: 14, y: 68 },
];

function position(index: number, total: number) {
  const fixed = constellation[index];
  if (fixed) return fixed;
  const angle =
    -Math.PI / 2 + ((index - 1) / Math.max(total - 1, 1)) * Math.PI * 2;
  return {
    x: 50 + Math.cos(angle) * 40,
    y: 52 + Math.sin(angle) * 36,
  };
}
// Mapa de mundos: cada saga es un universo con su captura en movimiento, su luz y sus juegos como lunas. El cursor
// mueve el campo con profundidad, el mundo cercano se enciende (su modelo 3D gira y el fondo toma su captura) y al
// elegirlo se abre un círculo de su color antes de entrar. Sin JavaScript o con «reducir movimiento», son enlaces
export function UniverseGalaxy({ worlds, children }: UniverseGalaxyProps) {
  const router = useRouter();
  const field = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [activeId, setActiveId] = useState<string | undefined>();
  // Mundos ya visitados (sus capturas de fondo se montan entonces) y el último con modelo 3D activado: solo ese tiene
  // lienzo WebGL, así que nunca hay más de uno a la vez
  const [visited, setVisited] = useState<string[]>([]);
  const [modelId, setModelId] = useState<string | undefined>();
  const baseId = useId();
  const [entering, setEntering] = useState<
    { accent: string; x: number; y: number } | undefined
  >();
  const active = worlds.find((world) => world.id === activeId);

  function activate(id: string | undefined) {
    setActiveId(id);
    if (!id) return;
    setVisited((ids) => (ids.includes(id) ? ids : [...ids, id]));
    setModelId(id);
  }

  // La navegación diferida se cancela si otra la adelanta (Atrás, buscador, otro enlace) y la página se desmonta, y el
  // círculo se retira al volver a esta página desde la caché del navegador
  useEffect(() => {
    function cancel() {
      window.clearTimeout(timer.current);
      timer.current = undefined;
    }
    function restore() {
      cancel();
      setEntering(undefined);
    }
    window.addEventListener("popstate", cancel);
    window.addEventListener("pagehide", cancel);
    window.addEventListener("pageshow", restore);
    return () => {
      cancel();
      window.removeEventListener("popstate", cancel);
      window.removeEventListener("pagehide", cancel);
      window.removeEventListener("pageshow", restore);
    };
  }, []);

  // Mientras se abre el círculo, ningún clic (ratón o Intro sobre un enlace) llega a la página: el clip-path del círculo
  // también recorta la zona que recibe clics, así que no basta con el elemento
  useEffect(() => {
    if (!entering) return;
    function block(event: Event) {
      event.preventDefault();
      event.stopPropagation();
    }
    document.addEventListener("click", block, true);
    return () => document.removeEventListener("click", block, true);
  }, [entering]);

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
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;

    // Un segundo clic durante la transición no cambia el destino
    event.preventDefault();
    if (entering) return;
    const box = event.currentTarget.getBoundingClientRect();
    setEntering({
      accent: world.accent,
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    });
    // La navegación espera a que el círculo cubra la pantalla
    timer.current = window.setTimeout(
      () => router.push(`/universos/${world.slug}`),
      650,
    );
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
      {/* Fondo: la captura del mundo activo, desenfocada, y una nebulosa de su color */}
      <div className={styles["galaxy__scenery"]} aria-hidden="true">
        {worlds.map(
          (world) =>
            world.backdrop &&
            visited.includes(world.id) && (
              <Image
                key={world.id}
                src={world.backdrop}
                alt=""
                fill
                sizes="100vw"
                className={
                  world.id === activeId
                    ? `${styles["galaxy__scene"]} ${styles["galaxy__scene--active"]}`
                    : styles["galaxy__scene"]
                }
              />
            ),
        )}
        <div className={styles["galaxy__nebula"]} />
        <div className={styles["galaxy__stars"]} />
      </div>

      <div
        ref={field}
        className={styles["galaxy__field"]}
        onPointerMove={handleMove}
      >
        {/* Órbitas del mapa y coordenadas, decorativas */}
        <div
          className={`${styles["galaxy__ring"]} ${styles["galaxy__ring--near"]}`}
          aria-hidden="true"
        />
        <div
          className={`${styles["galaxy__ring"]} ${styles["galaxy__ring--far"]}`}
          aria-hidden="true"
        />
        <p className={styles["galaxy__coords"]} aria-hidden="true">
          Sistema Valve · {worlds.length} mundos
        </p>

        <div className={styles["galaxy__heading"]}>{children}</div>

        <ul className={styles["galaxy__worlds"]}>
          {worlds.map((world, index) => {
            const { x, y } = position(index, worlds.length);
            const isActive = world.id === activeId;

            const emblemStyle = {
              maskImage: `url(${world.emblem})`,
              WebkitMaskImage: `url(${world.emblem})`,
            } satisfies CSSProperties;

            const orb = (
              <>
                {world.backdrop && (
                  <Image
                    src={world.backdrop}
                    alt=""
                    fill
                    sizes="(min-width: 64rem) 16rem, 40vw"
                    className={styles["galaxy__preview"]}
                  />
                )}
                <span className={styles["galaxy__tint"]} aria-hidden="true" />
                {world.model && modelId === world.id && (
                  <span className={styles["galaxy__model"]} aria-hidden="true">
                    <ModelSpinner
                      src={world.model}
                      tilt={world.modelTilt}
                      active={isActive}
                    />
                  </span>
                )}
                <span
                  className={styles["galaxy__emblem"]}
                  style={emblemStyle}
                  aria-hidden="true"
                />
              </>
            );

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
                    "--depth": index === 0 ? 1.7 : 0.8 + (index % 3) * 0.45,
                    "--world-accent": world.accent,
                    "--float-delay": `${index * -2.3}s`,
                  } as CSSProperties
                }
                onPointerEnter={() => activate(world.id)}
                onPointerLeave={() => activate(undefined)}
                onFocus={() => activate(world.id)}
                onBlur={() => activate(undefined)}
              >
                <div className={styles["galaxy__drift"]}>
                  <div className={styles["galaxy__body"]}>
                    {/* Anillo de órbita y lunas: los juegos de la saga, que aparecen al acercarse */}
                    <span
                      className={styles["galaxy__halo"]}
                      aria-hidden="true"
                    />
                    {world.available && (
                      <ul
                        className={styles["galaxy__moons"]}
                        aria-hidden="true"
                      >
                        {world.games.map((game, gameIndex) => (
                          <li
                            key={game}
                            className={styles["galaxy__moon"]}
                            data-flip={
                              Math.cos(
                                (((360 / world.games.length) * gameIndex - 90) *
                                  Math.PI) /
                                  180,
                              ) < -0.01
                            }
                            style={
                              {
                                "--a": `${(360 / world.games.length) * gameIndex - 90}deg`,
                                "--i": gameIndex,
                              } as CSSProperties
                            }
                          >
                            <span className={styles["galaxy__moon-label"]}>
                              {game}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {world.available ? (
                      <Link
                        href={`/universos/${world.slug}`}
                        className={styles["galaxy__orb"]}
                        aria-label={`Entrar al universo ${world.name}`}
                        aria-describedby={`${baseId}-${world.id}`}
                        onClick={(event) => handleEnter(event, world)}
                      >
                        {orb}
                      </Link>
                    ) : (
                      <span
                        className={`${styles["galaxy__orb"]} ${styles["galaxy__orb--pending"]}`}
                        aria-hidden="true"
                      >
                        {orb}
                      </span>
                    )}
                  </div>

                  <span id={`${baseId}-${world.id}`} className="sr-only">
                    {world.description} Juegos: {world.games.join(", ")}.
                  </span>
                  <p className={styles["galaxy__name"]}>{world.name}</p>
                  <p className={styles["galaxy__tagline"]} aria-hidden="true">
                    {world.available ? world.tagline : "Próximamente"}
                  </p>
                  {world.available && (
                    <ul className={styles["galaxy__chips"]}>
                      {world.games.map((game) => (
                        <li key={game}>{game}</li>
                      ))}
                    </ul>
                  )}
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
