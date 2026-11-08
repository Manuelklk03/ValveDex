"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { useHoverFocus } from "@/components/ui/use-hover-focus";
import type { LineIcon } from "@/data/universe-art";
import styles from "./dossier-sample.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ModelSpinner = dynamic(() => import("@/components/ui/model-spinner"), {
  ssr: false,
});

type DossierSampleProps = {
  sagaId: string;
  name: string;
  href: string;
  kicker: string;
  stamp: string;
  accent: string;
  backdrop: string;
  icons: LineIcon[];
  // Modelo 3D opcional que aparece al activar el dossier
  model?: string;
  modelTilt?: number;
  facts: { label: string; value: string }[];
};

// Muestra del dossier animado de la etapa Source: captura con parallax, iconos de línea que se dibujan y datos
export function DossierSample({
  sagaId,
  name,
  href,
  kicker,
  stamp,
  accent,
  backdrop,
  icons,
  model,
  modelTilt,
  facts,
}: DossierSampleProps) {
  const root = useRef<HTMLElement>(null);
  const { active, everActive, reduceMotion, handlers } = useHoverFocus();

  // Profundidad: iconos y modelo se desplazan más que la captura según el puntero
  function handleMove(event: PointerEvent<HTMLElement>) {
    const el = root.current;
    if (!el || event.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    el.style.setProperty(
      "--px",
      (((event.clientX - box.left) / box.width - 0.5) * 2).toFixed(3),
    );
    el.style.setProperty(
      "--py",
      (((event.clientY - box.top) / box.height - 0.5) * 2).toFixed(3),
    );
  }

  function handleLeave() {
    handlers.onPointerLeave();
    root.current?.style.setProperty("--px", "0");
    root.current?.style.setProperty("--py", "0");
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: root.current, start: "top 80%", once: true };
        gsap.from("[data-dossier-reveal]", {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: trigger,
        });
        gsap.fromTo(
          "[data-dossier-icon]",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.5,
            stagger: 0.25,
            ease: "power2.inOut",
            scrollTrigger: trigger,
          },
        );
        gsap.fromTo(
          "[data-dossier-stamp]",
          { opacity: 0, scale: 1.6, rotate: -14 },
          {
            opacity: 1,
            scale: 1,
            rotate: -6,
            duration: 0.5,
            delay: 0.9,
            ease: "back.out(2)",
            scrollTrigger: trigger,
          },
        );
        // Parallax: la captura se mueve más despacio que la página
        gsap.fromTo(
          "[data-dossier-backdrop]",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <article
      ref={root}
      className={
        active
          ? `${styles["dossier-sample"]} ${styles["dossier-sample--active"]}`
          : styles["dossier-sample"]
      }
      style={{ "--dossier-accent": accent } as CSSProperties}
      data-saga={sagaId}
      onPointerEnter={handlers.onPointerEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onFocus={handlers.onFocus}
      onBlur={handlers.onBlur}
    >
      <div className={styles["dossier-sample__backdrop"]} data-dossier-backdrop>
        <Image
          src={backdrop}
          alt=""
          fill
          sizes="(min-width: 64rem) 50vw, 100vw"
          className={styles["dossier-sample__image"]}
        />
      </div>
      <div className={styles["dossier-sample__veil"]} aria-hidden="true" />

      <div className={styles["dossier-sample__icons"]} aria-hidden="true">
        {icons.map((icon) => (
          <div
            key={icon.src}
            className={styles["dossier-sample__icon"]}
            style={{
              maskImage: `url(${icon.src})`,
              WebkitMaskImage: `url(${icon.src})`,
            }}
            data-dossier-icon
          />
        ))}
      </div>

      {everActive && model && (
        <div className={styles["dossier-sample__model"]} aria-hidden="true">
          <ModelSpinner
            src={model}
            tilt={modelTilt}
            active={active && !reduceMotion}
          />
        </div>
      )}

      <p className={styles["dossier-sample__stamp"]} data-dossier-stamp>
        {stamp}
      </p>

      <div className={styles["dossier-sample__body"]}>
        <p className={styles["dossier-sample__kicker"]} data-dossier-reveal>
          {kicker}
        </p>
        <h3 className={styles["dossier-sample__title"]} data-dossier-reveal>
          <Link href={href} className={styles["dossier-sample__link"]}>
            {name}
          </Link>
        </h3>
        <dl className={styles["dossier-sample__facts"]} data-dossier-reveal>
          {facts.map((fact) => (
            <div key={fact.label} className={styles["dossier-sample__fact"]}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles["dossier-sample__cta"]} data-dossier-reveal>
          <span>Abrir el dossier</span>
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </article>
  );
}
