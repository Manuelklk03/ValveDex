import Image from "next/image";
import Link from "next/link";
import type { LineIcon } from "@/data/universe-art";
import type { SectionPreview } from "../get-game-overview";
import type { SectionStatus } from "../get-section-statuses";
import styles from "./section-portal.module.css";

// Nombres que se ven bajo el título; el resto se resume en «y N más»
const PREVIEW_COUNT = 3;

type SectionPortalProps = {
  index: number;
  status: SectionStatus;
  href: string;
  preview?: SectionPreview;
  // Icono de línea del juego: ocupa la miniatura de los apartados sin imagen propia (Lore)
  gameIcon?: LineIcon;
};

// Apartado de un juego como una puerta: miniatura real de sus fichas, color del sector y los primeros nombres
export function SectionPortal({
  index,
  status,
  href,
  preview,
  gameIcon,
}: SectionPortalProps) {
  const { section, entryNames, isAvailable, label } = status;
  const className = [
    styles["section-portal"],
    styles[`section-portal--${section.id}`],
    !isAvailable && styles["section-portal--empty"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={className}>
      <div className={styles["section-portal__media"]} aria-hidden="true">
        {preview?.thumbnail && (
          <Image
            src={preview.thumbnail.src}
            alt=""
            fill
            sizes="(min-width: 64rem) 25vw, 90vw"
            className={
              preview.isCapture
                ? `${styles["section-portal__image"]} ${styles["section-portal__image--capture"]}`
                : styles["section-portal__image"]
            }
          />
        )}
        {!preview?.thumbnail && gameIcon && (
          <span
            className={styles["section-portal__icon"]}
            style={{
              maskImage: `url(${gameIcon.src})`,
              WebkitMaskImage: `url(${gameIcon.src})`,
            }}
          />
        )}
        <span className={styles["section-portal__index"]}>
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className={styles["section-portal__body"]}>
        <h3 className={styles["section-portal__title"]}>
          {isAvailable ? (
            <Link href={href} className={styles["section-portal__link"]}>
              {section.name}
            </Link>
          ) : (
            section.name
          )}
        </h3>
        <p className={styles["section-portal__label"]}>{label}</p>
        {isAvailable && entryNames.length > 0 ? (
          <p className={styles["section-portal__names"]}>
            {entryNames.slice(0, PREVIEW_COUNT).join(" · ")}
            {entryNames.length > PREVIEW_COUNT &&
              ` · y ${entryNames.length - PREVIEW_COUNT} más`}
          </p>
        ) : (
          <p className={styles["section-portal__names"]}>
            {isAvailable ? section.description : "Todavía sin fichas."}
          </p>
        )}
        {isAvailable && (
          <span className={styles["section-portal__arrow"]} aria-hidden="true">
            →
          </span>
        )}
      </div>
    </li>
  );
}
