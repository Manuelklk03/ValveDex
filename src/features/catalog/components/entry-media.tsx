import Image from "next/image";
import { ImageCompare } from "@/components/ui/image-compare";
import type { EntryAppearance } from "@/domain/entry";
import styles from "./entry-media.module.css";

type EntryMediaProps = {
  appearance: EntryAppearance;
  entryName: string;
  // El visor 3D se abre solo (cabecera de la ficha como mundo)
  start3d?: boolean;
  // Sin pie de crédito: en la cabecera de la ficha, los créditos van en la capa «Fuentes»
  hideCredit?: boolean;
  // Es la imagen de la cabecera de la ficha: con alto máximo para que una figura alta no se salga del marco
  hero?: boolean;
};

// Imagen de una aparición con su crédito: comparador original/HD, visor 3D o imagen sola
export function EntryMedia({
  appearance,
  entryName,
  start3d = false,
  hideCredit = false,
  hero = false,
}: EntryMediaProps) {
  const original = appearance.images?.original;
  const hd = appearance.images?.hd;
  const single = hd ?? original;
  const models = appearance.images?.models;
  const credits = [original, hd].filter((image) => image !== undefined);

  if (!single) return null;

  return (
    <figure
      className={
        hero
          ? `${styles["entry-media"]} ${styles["entry-media--hero"]}`
          : styles["entry-media"]
      }
    >
      {original && hd ? (
        <ImageCompare
          before={original}
          after={hd}
          beforeLabel="Original"
          afterLabel="HD Pack"
          models={models}
          start3d={start3d}
        />
      ) : models ? (
        <ImageCompare
          before={single}
          beforeLabel={entryName}
          models={models}
          start3d={start3d}
        />
      ) : (
        <Image
          src={single.src}
          alt={single.alt}
          width={single.width}
          height={single.height}
          className={styles["entry-media__image"]}
        />
      )}

      {!hideCredit &&
        credits.map((image) => (
          <figcaption key={image.src} className={styles["entry-media__credit"]}>
            Imagen:{" "}
            <a href={image.source.url} className={styles["entry-media__link"]}>
              {image.source.title}
            </a>
            {image.credit && ` · ${image.credit}`}
            {image.license && ` · ${image.license}`}
          </figcaption>
        ))}
    </figure>
  );
}
