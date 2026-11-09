"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { DossierArt as DossierArtData } from "@/data/dossier-art";
import styles from "./dossier-art.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ModelSpinner = dynamic(() => import("@/components/ui/model-spinner"), {
  ssr: false,
});

// Capa de arte de un dossier: captura de fondo, iconos de línea que se dibujan y modelo 3D al activarlo.
// Va dentro del <article> del dossier (que es de servidor), así que escucha ratón y foco en él.
export function DossierArt({ art }: { art: DossierArtData }) {
  const root = useRef<HTMLDivElement>(null);
  const [pointerOver, setPointerOver] = useState(false);
  const [focused, setFocused] = useState(false);
  const [everActive, setEverActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const active = pointerOver || focused;

  // Ratón y foco son orígenes distintos: salir de uno no apaga el otro
  useEffect(() => {
    const card = root.current?.closest("article");
    if (!card) return;
    const prepare = () => {
      setEverActive(true);
      setReduceMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
    };
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      setPointerOver(true);
      prepare();
    };
    const onLeave = () => {
      setPointerOver(false);
      root.current?.style.setProperty("--px", "0");
      root.current?.style.setProperty("--py", "0");
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !root.current) return;
      const box = card.getBoundingClientRect();
      root.current.style.setProperty(
        "--px",
        (((event.clientX - box.left) / box.width - 0.5) * 2).toFixed(3),
      );
      root.current.style.setProperty(
        "--py",
        (((event.clientY - box.top) / box.height - 0.5) * 2).toFixed(3),
      );
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!(event.target as HTMLElement).matches(":focus-visible")) return;
      setFocused(true);
      prepare();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!card.contains(event.relatedTarget as Node | null)) setFocused(false);
    };
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("focusin", onFocusIn);
    card.addEventListener("focusout", onFocusOut);
    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("focusin", onFocusIn);
      card.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const card = root.current?.closest("article");
        // Los iconos se dibujan de izquierda a derecha al entrar el dossier en pantalla
        gsap.fromTo(
          "[data-art-icon]",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.5,
            stagger: 0.25,
            ease: "power2.inOut",
            scrollTrigger: { trigger: card, start: "top 80%", once: true },
          },
        );
        // Parallax: la captura se mueve más despacio que la página
        gsap.fromTo(
          "[data-art-backdrop]",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
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

  const className = active
    ? `${styles["dossier-art"]} ${styles["dossier-art--active"]}`
    : styles["dossier-art"];

  return (
    <div
      ref={root}
      className={className}
      style={
        {
          "--art-tint": art.tint,
          "--art-icons-height": art.iconsHeight,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {art.backdrop && (
        <div className={styles["dossier-art__backdrop"]} data-art-backdrop>
          <Image
            src={art.backdrop}
            alt=""
            fill
            sizes="(min-width: 64rem) 70vw, 100vw"
            className={styles["dossier-art__image"]}
          />
        </div>
      )}

      <div className={styles["dossier-art__icons"]}>
        {art.icons.map((icon) => (
          <div
            key={icon.src}
            className={styles["dossier-art__icon"]}
            style={{
              maskImage: `url(${icon.src})`,
              WebkitMaskImage: `url(${icon.src})`,
            }}
            data-art-icon
          />
        ))}
      </div>

      {everActive && art.model && (
        <div className={styles["dossier-art__model"]}>
          <ModelSpinner
            src={art.model}
            tilt={art.modelTilt}
            active={active && !reduceMotion}
          />
        </div>
      )}
    </div>
  );
}
