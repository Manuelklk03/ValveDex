import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  getImageCredits,
  getSourceCredits,
} from "@/features/credits/get-credits";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Créditos y fuentes",
  description: "Fuentes de los textos e imagenes de ValveDex.",
};

export default function CreditsPage() {
  const sourceCredits = getSourceCredits();
  const imageCredits = getImageCredits();

  return (
    <main className={styles["credits-page"]}>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Créditos y fuentes" },
        ]}
      />

      <header className={styles["credits-page__header"]}>
        <h1 className={styles["credits-page__title"]}>Créditos y fuentes</h1>
        <p className={styles["credits-page__intro"]}>
          Los textos de ValveDex se basan en estas fuentes. Las imágenes y las
          marcas pertenecen a sus propietarios.
        </p>
      </header>

      <section
        className={styles["credits-page__section"]}
        aria-labelledby="sources-title"
      >
        <h2
          id="sources-title"
          className={styles["credits-page__section-title"]}
        >
          Fuentes ({sourceCredits.length})
        </h2>
        <ul className={styles["credits-page__list"]}>
          {sourceCredits.map(({ source, usedIn }) => (
            <li key={source.url} className={styles["credits-page__item"]}>
              <a href={source.url} className={styles["credits-page__link"]}>
                {source.title}
              </a>
              <p className={styles["credits-page__meta"]}>
                Usada en: {usedIn.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={styles["credits-page__section"]}
        aria-labelledby="images-title"
      >
        <h2 id="images-title" className={styles["credits-page__section-title"]}>
          Imágenes ({imageCredits.length})
        </h2>
        {imageCredits.length > 0 ? (
          <ul className={styles["credits-page__list"]}>
            {imageCredits.map(({ image, usedIn }) => (
              <li key={image.src} className={styles["credits-page__item"]}>
                <a
                  href={image.source.url}
                  className={styles["credits-page__link"]}
                >
                  {image.source.title}
                </a>
                <p className={styles["credits-page__meta"]}>
                  {usedIn}
                  {image.credit && ` · ${image.credit}`}
                  {image.license && ` · ${image.license}`}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles["credits-page__meta"]}>
            Todavía no hay imágenes.
          </p>
        )}
      </section>
    </main>
  );
}
