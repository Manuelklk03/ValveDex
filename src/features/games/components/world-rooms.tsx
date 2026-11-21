import Image from "next/image";
import Link from "next/link";
import type { DossierTransition } from "@/domain/dossier-transition";
import type { SectionPreview } from "../get-game-overview";
import type { SectionStatus } from "../get-section-statuses";
import styles from "./world-rooms.module.css";

// Nombres de fichas que se ven en cada sala; el resto se resume en «y N más»
const PREVIEW_COUNT = 4;

type WorldRoomsProps = {
  gameName: string;
  // Ruta del hub; cada sala enlaza a `${hubHref}/${slug del apartado}`
  hubHref: string;
  statuses: SectionStatus[];
  previews: Record<string, SectionPreview>;
  // Escena del juego para las salas sin foto propia (el lore)
  fallbackScene?: string;
  // Salas claras (paneles blancos de Aperture) en lugar de las salas oscuras de Half-Life
  light?: boolean;
  // Entrada animada del juego: la misma del dossier, ahora al cruzar a cada sala
  transition?: {
    name: DossierTransition;
    title: string;
    label?: string;
  };
};

// Los apartados de un juego de Half-Life como salas: cada una es una franja a todo el ancho con la foto real de sus
// fichas, su número, sus nombres y una entrada que lleva al apartado con la animación del juego
export function WorldRooms({
  gameName,
  hubHref,
  statuses,
  previews,
  fallbackScene,
  light = false,
  transition,
}: WorldRoomsProps) {
  const transitionProps = transition
    ? {
        "data-elevator": transition.name,
        "data-elevator-title": transition.title,
        "data-elevator-label": transition.label,
      }
    : {};

  return (
    <ol
      className={
        light
          ? `${styles["world-rooms"]} ${styles["world-rooms--light"]}`
          : styles["world-rooms"]
      }
      aria-label={`Apartados de ${gameName}`}
    >
      {statuses.map(({ section, entryNames, isAvailable, label }, index) => {
        const preview = previews[section.id];
        const thumbnail = preview?.thumbnail;
        const className = [
          styles["world-room"],
          styles[`world-room--${section.id}`],
          !isAvailable && styles["world-room--empty"],
          index % 2 === 1 && styles["world-room--flip"],
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={section.id} className={className}>
            <div className={styles["world-room__scene"]} aria-hidden="true">
              {thumbnail ? (
                <Image
                  src={thumbnail.src}
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 55vw, 100vw"
                  className={
                    preview.isCapture
                      ? styles["world-room__capture"]
                      : styles["world-room__render"]
                  }
                />
              ) : (
                fallbackScene && (
                  <Image
                    src={fallbackScene}
                    alt=""
                    fill
                    sizes="(min-width: 64rem) 55vw, 100vw"
                    className={`${styles["world-room__capture"]} ${styles["world-room__capture--dim"]}`}
                  />
                )
              )}
            </div>

            <div className={styles["world-room__body"]}>
              <span className={styles["world-room__index"]} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {isAvailable ? (
                <Link
                  href={`${hubHref}/${section.slug}`}
                  className={styles["world-room__link"]}
                  {...transitionProps}
                >
                  {section.name}
                </Link>
              ) : (
                <span className={styles["world-room__name"]}>
                  {section.name}
                </span>
              )}
              <p className={styles["world-room__description"]}>
                {section.description}
              </p>
              <p className={styles["world-room__count"]}>{label}</p>

              {entryNames.length > 0 && (
                <ul className={styles["world-room__entries"]}>
                  {entryNames.slice(0, PREVIEW_COUNT).map((name) => (
                    <li key={name} className={styles["world-room__entry"]}>
                      {name}
                    </li>
                  ))}
                  {entryNames.length > PREVIEW_COUNT && (
                    <li className={styles["world-room__entry"]}>
                      y {entryNames.length - PREVIEW_COUNT} más
                    </li>
                  )}
                </ul>
              )}

              {isAvailable && (
                <span
                  className={styles["world-room__enter"]}
                  aria-hidden="true"
                >
                  Entrar <span className={styles["world-room__arrow"]}>→</span>
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
