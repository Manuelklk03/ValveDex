import Image from "next/image";
import Link from "next/link";
import type { ChapterShot } from "../get-game-overview";
import styles from "./chapter-strip.module.css";

type ChapterStripProps = {
  shots: ChapterShot[];
};

// Tira horizontal con las capturas propias de los capítulos del juego, que enlazan a su ficha
export function ChapterStrip({ shots }: ChapterStripProps) {
  if (shots.length === 0) return null;

  return (
    <section
      aria-labelledby="chapters-title"
      className={styles["chapter-strip"]}
    >
      <h2 id="chapters-title" className={styles["chapter-strip__title"]}>
        Capítulos
      </h2>
      {/* tabIndex: el carrusel se puede desplazar con las flechas del teclado */}
      <ul
        className={styles["chapter-strip__list"]}
        tabIndex={0}
        aria-label="Capítulos con captura, desplazable"
      >
        {shots.map(({ entry, image }) => (
          <li key={entry.id} className={styles["chapter-strip__item"]}>
            <Link
              href={`/fichas/${entry.slug}`}
              className={styles["chapter-strip__link"]}
            >
              <span className={styles["chapter-strip__frame"]}>
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 22rem, 80vw"
                  className={styles["chapter-strip__image"]}
                />
                {entry.category === "maps" && (
                  <span className={styles["chapter-strip__number"]}>
                    {String(entry.details.chapter).padStart(2, "0")}
                  </span>
                )}
              </span>
              <span className={styles["chapter-strip__name"]}>
                {entry.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
