import Image from "next/image";
import { ImageCompare } from "@/components/ui/image-compare";
import type { EntryAppearance } from "@/domain/entry";
import styles from "./entry-media.module.css";

type EntryMediaProps = {
  appearance: EntryAppearance;
  entryName: string;
};

// Imagen de una aparición con su crédito: comparador original/HD, visor 3D o imagen sola
export function EntryMedia({ appearance, entryName }: EntryMediaProps) {
  const original = appearance.images?.original;
  const hd = appearance.images?.hd;
  const single = hd ?? original;
  const models = appearance.images?.models;
  const credits = [original, hd].filter((image) => image !== undefined);

  if (!single) return null;

  return (
    <figure className={styles["entry-media"]}>
      {original && hd ? (
        <ImageCompare
          before={original}
          after={hd}
          beforeLabel="Original"
          afterLabel="HD Pack"
          models={models}
        />
      ) : models ? (
        <ImageCompare before={single} beforeLabel={entryName} models={models} />
      ) : (
        <Image
          src={single.src}
          alt={single.alt}
          width={single.width}
          height={single.height}
          className={styles["entry-media__image"]}
        />
      )}

      {credits.map((image) => (
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
