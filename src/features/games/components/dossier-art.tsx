"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { DossierArt as DossierArtData } from "@/data/dossier-art";
import styles from "./dossier-art.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ModelSpinner = dynamic(() => import("@/components/ui/model-spinner"), {
  ssr: false,
});

// Capa de arte de un dossier: captura de fondo, iconos de línea que se dibujan y modelo 3D al activarlo.
// Va dentro del <article> del dossier (que es de servidor), así que escucha ratón y foco en él.
export function DossierArt({
  art,
  corridor = false,
  priority = false,
}: {
  art: DossierArtData;
  // Pasillo de Half-Life: el arte es la escena, a gran escala y siempre visible
  corridor?: boolean;
  // La escena de fondo es la imagen más grande de la página (LCP): se carga con prioridad en las cabeceras
  priority?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [pointerOver, setPointerOver] = useState(false);
  const [focused, setFocused] = useState(false);
  const [everActive, setEverActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const handleReady = useCallback(() => setModelReady(true), []);
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
    // El modelo se pide al acercarse el dossier a la pantalla (solo con ratón: en táctil nunca se muestra) y se
    // descarta al alejarse, para no tener montados los lienzos de todos los dossieres a la vez
    const canHover = window.matchMedia("(hover: hover)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (canHover) prepare();
          return;
        }
        setEverActive(false);
        setModelReady(false);
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(card);
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("focusin", onFocusIn);
    card.addEventListener("focusout", onFocusOut);
    return () => {
      observer.disconnect();
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
        const scrub = {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        };
        gsap.fromTo(
          "[data-art-backdrop]",
          corridor ? { yPercent: -6, scale: 1 } : { yPercent: -6 },
          {
            yPercent: 6,
            // En el pasillo la cámara avanza: la escena se acerca mientras se cruza el dossier
            ...(corridor ? { scale: 1.16 } : {}),
            ease: "none",
            scrollTrigger: scrub,
          },
        );
        // El protagonista está en primer plano: sube más deprisa que la escena y da profundidad
        if (corridor) {
          gsap.fromTo(
            "[data-art-front]",
            { yPercent: 4 },
            { yPercent: -4, ease: "none", scrollTrigger: scrub },
          );
        }
      });
    },
    { scope: root, dependencies: [corridor] },
  );

  const className = [
    styles["dossier-art"],
    active && styles["dossier-art--active"],
    modelReady && styles["dossier-art--model-ready"],
    corridor && styles["dossier-art--corridor"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={root}
      className={className}
      style={
        {
          "--art-tint": art.tint,
          "--art-icons-height": art.iconsHeight,
          "--art-icons-opacity": art.iconsOpacity,
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
            priority={priority}
            sizes="(min-width: 64rem) 70vw, 100vw"
            className={styles["dossier-art__image"]}
          />
        </div>
      )}

      {/* Primer plano: iconos y modelo se mueven juntos con el scroll, aunque el modelo se monte más tarde */}
      <div className={styles["dossier-art__front"]} data-art-front>
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
              roll={art.modelRoll}
              active={active && !reduceMotion}
              onReady={handleReady}
            />
          </div>
        )}
      </div>
    </div>
  );
}
