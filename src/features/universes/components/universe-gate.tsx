"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { useHoverFocus } from "@/components/ui/use-hover-focus";
import type { Universe } from "@/domain/universe";
import type { UniverseArt } from "@/data/universe-art";
import styles from "./universe-gate.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// El modelo 3D (Three.js) solo se descarga la primera vez que la tarjeta se activa
const ModelSpinner = dynamic(() => import("@/components/ui/model-spinner"), {
  ssr: false,
});

type UniverseGateProps = {
  universe: Universe;
  art: UniverseArt;
  gameNames: string[];
  // La tarjeta grande ocupa todo el ancho
  featured?: boolean;
};

// Cada saga es una puerta de acceso: captura del juego, icono de línea, profundidad con el ratón y modelo 3D
export function UniverseGate({
  universe,
  art,
  gameNames,
  featured = false,
}: UniverseGateProps) {
  const root = useRef<HTMLElement>(null);
  const { active, everActive, reduceMotion, handlers } = useHoverFocus();
  const isAvailable = universe.status === "available";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = {
          trigger: root.current,
          start: "top 82%",
          once: true,
        };
        const reveal = root.current?.querySelectorAll("[data-gate-reveal]");
        gsap.from(reveal ?? [], {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger,
        });
        // El icono se «dibuja» de izquierda a derecha, como un trazo
        gsap.fromTo(
          "[data-gate-icon]",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger,
          },
        );
      });
    },
    { scope: root },
  );

  // Profundidad: la captura, el icono y el modelo se desplazan distinto según dónde esté el ratón
  function handleMove(event: PointerEvent<HTMLElement>) {
    const el = root.current;
    if (!el || event.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty("--px", (x * 2).toFixed(3));
    el.style.setProperty("--py", (y * 2).toFixed(3));
    el.style.setProperty("--shine-x", `${((x + 0.5) * 100).toFixed(0)}%`);
    el.style.setProperty("--shine-y", `${((y + 0.5) * 100).toFixed(0)}%`);
  }

  function handleLeave() {
    handlers.onPointerLeave();
    const el = root.current;
    if (!el) return;
    for (const name of ["--tilt-x", "--tilt-y"])
      el.style.setProperty(name, "0deg");
    for (const name of ["--px", "--py"]) el.style.setProperty(name, "0");
  }

  const className = [
    styles["universe-gate"],
    featured && styles["universe-gate--featured"],
    !isAvailable && styles["universe-gate--pending"],
    art.icon.width > art.icon.height && styles["universe-gate--wide-icon"],
    active && styles["universe-gate--active"],
  ]
    .filter(Boolean)
    .join(" ");

  const iconStyle = {
    maskImage: `url(${art.icon.src})`,
    WebkitMaskImage: `url(${art.icon.src})`,
  } satisfies CSSProperties;

  return (
    <article
      ref={root}
      className={className}
      style={{ "--gate-accent": art.accent } as CSSProperties}
      data-saga={universe.id}
      onPointerEnter={handlers.onPointerEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onFocus={handlers.onFocus}
      onBlur={handlers.onBlur}
    >
      <div className={styles["universe-gate__frame"]}>
        {art.backdrop && (
          <Image
            src={art.backdrop}
            alt=""
            fill
            sizes="(min-width: 64rem) 50vw, 100vw"
            className={styles["universe-gate__backdrop"]}
          />
        )}
        <div className={styles["universe-gate__veil"]} aria-hidden="true" />
        <div className={styles["universe-gate__shine"]} aria-hidden="true" />

        <div
          className={styles["universe-gate__icon"]}
          style={iconStyle}
          data-gate-icon
          aria-hidden="true"
        />

        {everActive && art.model && (
          <div className={styles["universe-gate__model"]} aria-hidden="true">
            <ModelSpinner
              src={art.model}
              tilt={art.modelTilt}
              active={active && !reduceMotion}
            />
          </div>
        )}

        <div className={styles["universe-gate__body"]}>
          <p className={styles["universe-gate__band"]} data-gate-reveal>
            <span>{isAvailable ? "Acceso concedido" : "Acceso pendiente"}</span>
            <span>{universe.id}</span>
          </p>
          <h2 className={styles["universe-gate__title"]} data-gate-reveal>
            {isAvailable ? (
              <Link
                href={`/universos/${universe.slug}`}
                className={styles["universe-gate__link"]}
              >
                {universe.name}
              </Link>
            ) : (
              universe.name
            )}
          </h2>
          <p className={styles["universe-gate__description"]} data-gate-reveal>
            {universe.description}
          </p>

          {isAvailable ? (
            <>
              <ul
                className={styles["universe-gate__games"]}
                aria-label={`Juegos de ${universe.name}`}
                data-gate-reveal
              >
                {gameNames.map((name) => (
                  <li key={name} className={styles["universe-gate__game"]}>
                    {name}
                  </li>
                ))}
              </ul>
              <p className={styles["universe-gate__cta"]} data-gate-reveal>
                <span>Entrar al universo</span>
                <span aria-hidden="true">→</span>
              </p>
            </>
          ) : (
            <p className={styles["universe-gate__badge"]} data-gate-reveal>
              Próximamente
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
