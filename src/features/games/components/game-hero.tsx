"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import type { DossierArt } from "@/data/dossier-art";
import styles from "./game-hero.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Un solo lienzo WebGL por página, y solo cuando el visitante lo pide
const ModelSpinner = dynamic(() => import("@/components/ui/model-spinner"), {
  ssr: false,
});

type GameHeroProps = {
  name: string;
  summary: string;
  specs: { label: string; value: string }[];
  art?: DossierArt;
  // Migas de pan, que van arriba de la cabecera
  breadcrumb: ReactNode;
  // Datos extra bajo el resumen: juego base, fuentes…
  children?: ReactNode;
};

// Cabecera cinematográfica del hub de un juego: captura a sangre con parallax, iconos de línea que se dibujan
// y, si el juego tiene un modelo, un botón que lo muestra girando en 3D
export function GameHero({
  name,
  summary,
  specs,
  art,
  breadcrumb,
  children,
}: GameHeroProps) {
  const root = useRef<HTMLElement>(null);
  const [showModel, setShowModel] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .fromTo(
            "[data-hero-icon]",
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.3,
              stagger: 0.2,
              ease: "power2.inOut",
            },
            0,
          )
          .from(
            "[data-hero-reveal]",
            { opacity: 0, y: 22, duration: 0.7, stagger: 0.06 },
            0.1,
          );
        // Parallax: la captura se desplaza más despacio que la página
        gsap.fromTo(
          "[data-hero-backdrop]",
          { yPercent: -4 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  function toggleModel() {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    setShowModel((current) => !current);
  }

  const className = showModel
    ? `${styles["game-hero"]} ${styles["game-hero--model"]}`
    : styles["game-hero"];

  return (
    <header ref={root} className={className}>
      {art?.backdrop && (
        <div className={styles["game-hero__backdrop"]} data-hero-backdrop>
          <Image
            src={art.backdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles["game-hero__image"]}
          />
        </div>
      )}
      <div className={styles["game-hero__veil"]} aria-hidden="true" />

      {art && (
        <div className={styles["game-hero__icons"]} aria-hidden="true">
          {art.icons.map((icon) => (
            <div
              key={icon.src}
              className={styles["game-hero__icon"]}
              style={{
                maskImage: `url(${icon.src})`,
                WebkitMaskImage: `url(${icon.src})`,
              }}
              data-hero-icon
            />
          ))}
        </div>
      )}

      {showModel && art?.model && (
        <div className={styles["game-hero__model"]} aria-hidden="true">
          <ModelSpinner
            src={art.model}
            tilt={art.modelTilt}
            active={!reduceMotion}
          />
        </div>
      )}

      <div className={styles["game-hero__inner"]}>
        <div className={styles["game-hero__crumbs"]}>{breadcrumb}</div>

        <h1 className={styles["game-hero__title"]} data-hero-reveal>
          {name}
        </h1>
        <p className={styles["game-hero__summary"]} data-hero-reveal>
          {summary}
        </p>

        <dl className={styles["game-hero__specs"]} data-hero-reveal>
          {specs.map((spec) => (
            <div key={spec.label} className={styles["game-hero__spec"]}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles["game-hero__extra"]} data-hero-reveal>
          {art?.model && (
            <button
              type="button"
              className={styles["game-hero__model-button"]}
              aria-pressed={showModel}
              onClick={toggleModel}
            >
              {showModel ? "Ocultar el modelo 3D" : "Ver un modelo 3D"}
            </button>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}
