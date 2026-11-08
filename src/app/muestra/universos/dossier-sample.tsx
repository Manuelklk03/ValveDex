"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import type { LineIcon } from "@/data/universe-art";
import styles from "./dossier-sample.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type DossierSampleProps = {
  name: string;
  kicker: string;
  stamp: string;
  accent: string;
  backdrop: string;
  icons: LineIcon[];
  facts: { label: string; value: string }[];
};

// Muestra del dossier animado de la etapa Source: captura con parallax, iconos de línea que se dibujan y datos
export function DossierSample({
  name,
  kicker,
  stamp,
  accent,
  backdrop,
  icons,
  facts,
}: DossierSampleProps) {
  const root = useRef<HTMLElement>(null);

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
      className={styles["dossier-sample"]}
      style={{ "--dossier-accent": accent } as CSSProperties}
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

      <p className={styles["dossier-sample__stamp"]} data-dossier-stamp>
        {stamp}
      </p>

      <div className={styles["dossier-sample__body"]}>
        <p className={styles["dossier-sample__kicker"]} data-dossier-reveal>
          {kicker}
        </p>
        <h3 className={styles["dossier-sample__title"]} data-dossier-reveal>
          {name}
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
