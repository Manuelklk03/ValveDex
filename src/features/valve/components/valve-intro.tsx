"use client";

import { useEffect, useRef } from "react";
import styles from "./valve-intro.module.css";

type ValveIntroProps = {
  // Se llama al terminar, al saltarla o si el vídeo no se puede reproducir
  onDone: () => void;
};

// Ruta del vídeo: la grabación propia de la intro de Valve (política de vídeo de Valve: uso no comercial y sin
// distribuir los archivos del juego). Si el archivo no existe o no se puede reproducir, la intro se salta sola y se
// entra directamente
export const INTRO_SRC = "/videos/valve-intro.mp4";

// Intro a pantalla completa antes de entrar al mundo de Valve. Suena (se abre por un clic del usuario, así que el
// navegador lo permite), se puede saltar con el botón o con Escape, retiene el foco mientras dura y bloquea el scroll
export function ValveIntro({ onDone }: ValveIntroProps) {
  const skip = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  // La última versión de onDone, sin reiniciar los efectos cada vez que cambia
  const done = useRef(onDone);

  useEffect(() => {
    done.current = onDone;
  }, [onDone]);

  useEffect(() => {
    skip.current?.focus();
    // La página no se desplaza por debajo mientras suena la intro
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") done.current();
      // El único control es «Saltar»: el foco no sale hacia la página de detrás
      if (event.key === "Tab") {
        event.preventDefault();
        skip.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);

    // Si el navegador rechaza reproducir con sonido, se reintenta sin él; si tampoco, se entra directamente
    const element = video.current;
    element?.play().catch(() => {
      if (!element) return done.current();
      element.muted = true;
      element.play().catch(() => done.current());
    });

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      className={styles["valve-intro"]}
      role="dialog"
      aria-modal="true"
      aria-label="Introducción de Valve"
    >
      <video
        ref={video}
        className={styles["valve-intro__video"]}
        src={INTRO_SRC}
        playsInline
        onEnded={onDone}
        onError={onDone}
      />
      <button
        ref={skip}
        type="button"
        className={styles["valve-intro__skip"]}
        onClick={onDone}
      >
        Saltar introducción
      </button>
    </div>
  );
}
