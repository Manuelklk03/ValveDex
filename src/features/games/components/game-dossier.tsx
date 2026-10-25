import Link from "next/link";
import type { Game } from "@/domain/game";
import type { DossierLook } from "../dossier-looks";
import { getGameYearLabel } from "../get-game-year-label";
import { getSectionStatuses } from "../get-section-statuses";
import styles from "./game-dossier.module.css";

// Nombres que se ven al desplegar un apartado; el resto se resume en «y N más»
const PREVIEW_COUNT = 3;

type GameDossierProps = {
  game: Game;
  universeName: string;
  universeSlug: string;
  look?: DossierLook;
};

// Dossier de un juego: todo él abre el hub y cada apartado lleva a su categoría
// Dossier de un juego: todo él abre el hub y cada apartado lleva a su categoría
export function GameDossier({
  game,
  universeName,
  universeSlug,
  look,
}: GameDossierProps) {
  const statuses = getSectionStatuses(game.id);
  const availableCount = statuses.filter((status) => status.isAvailable).length;
  const hubHref = `/universos/${universeSlug}/${game.slug}`;
  const titleId = `${game.id}-title`;
  const className = look
    ? `${styles["game-dossier"]} ${styles[`game-dossier--${look.variant}`]}`
    : styles["game-dossier"];

  return (
    <article className={className} aria-labelledby={titleId} data-reveal>
      {/* Enlace principal en capa: cubre la carpeta; los apartados quedan por encima */}
      <Link href={hubHref} className={styles["game-dossier__open"]}>
        <span className="sr-only">Abrir el dossier de {game.name}</span>
      </Link>

      <span className={styles["game-dossier__tab"]} aria-hidden="true">
        {universeName}
      </span>
      {look && (
        <>
          <span className={styles["game-dossier__stamp"]} aria-hidden="true">
            {look.stamp}
          </span>
          <span className={styles["game-dossier__edge"]} aria-hidden="true">
            {look.edge}
          </span>
        </>
      )}

      <header className={styles["game-dossier__header"]}>
        <div className={styles["game-dossier__heading"]}>
          {look && (
            <p className={styles["game-dossier__label"]}>{look.label}</p>
          )}
          <h3 id={titleId} className={styles["game-dossier__title"]}>
            {game.name}
          </h3>
          <p className={styles["game-dossier__summary"]}>{game.description}</p>
          <span className={styles["game-dossier__cue"]} aria-hidden="true">
            Abrir dossier
            <span className={styles["game-dossier__cue-arrow"]}>→</span>
          </span>
        </div>

        <dl className={styles["game-dossier__specs"]}>
          <div className={styles["game-dossier__spec"]}>
            <dt className={styles["game-dossier__spec-label"]}>Año</dt>
            <dd className={styles["game-dossier__spec-value"]}>
              {getGameYearLabel(game)}
            </dd>
          </div>
          <div className={styles["game-dossier__spec"]}>
            <dt className={styles["game-dossier__spec-label"]}>Estudio</dt>
            <dd className={styles["game-dossier__spec-value"]}>
              {game.developer}
            </dd>
          </div>
          <div className={styles["game-dossier__spec"]}>
            <dt className={styles["game-dossier__spec-label"]}>Apartados</dt>
            <dd className={styles["game-dossier__spec-value"]}>
              <meter
                className={styles["game-dossier__meter"]}
                min={0}
                max={statuses.length}
                value={availableCount}
                aria-label="Apartados con contenido"
              />
              {availableCount} de {statuses.length}
            </dd>
          </div>
        </dl>
      </header>

      <ul
        className={styles["game-dossier__sectors"]}
        aria-label={`Apartados de ${game.name}`}
      >
        {statuses.map(({ section, entryNames, isAvailable, label }, index) => (
          <li
            key={section.id}
            className={`${styles["game-dossier__sector"]} ${styles[`game-dossier__sector--${section.id}`]} ${isAvailable ? "" : styles["game-dossier__sector--empty"]}`}
            data-expandable={isAvailable || undefined}
          >
            <span
              className={styles["game-dossier__sector-index"]}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {isAvailable ? (
              <Link
                href={`${hubHref}/${section.slug}`}
                className={styles["game-dossier__sector-link"]}
              >
                {section.name}
              </Link>
            ) : (
              <span className={styles["game-dossier__sector-name"]}>
                {section.name}
              </span>
            )}
            <span className={styles["game-dossier__sector-status"]}>
              {label}
            </span>

            {isAvailable && (
              <>
                <span
                  className={styles["game-dossier__sector-arrow"]}
                  aria-hidden="true"
                >
                  →
                </span>
                {/* Solo los apartados con enlace despliegan: así el teclado llega con :focus-within */}
                <div className={styles["game-dossier__sector-panel"]}>
                  <p className={styles["game-dossier__sector-description"]}>
                    {section.description}
                  </p>
                  {entryNames.length > 0 && (
                    <ul className={styles["game-dossier__sector-entries"]}>
                      {entryNames.slice(0, PREVIEW_COUNT).map((name) => (
                        <li
                          key={name}
                          className={styles["game-dossier__sector-entry"]}
                        >
                          {name}
                        </li>
                      ))}
                      {entryNames.length > PREVIEW_COUNT && (
                        <li className={styles["game-dossier__sector-entry"]}>
                          y {entryNames.length - PREVIEW_COUNT} más
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <footer className={styles["game-dossier__footer"]}>
        <span className={styles["game-dossier__barcode"]} aria-hidden="true" />
        <p>Registro {game.id}</p>
        <p className={styles["game-dossier__sources"]}>
          {game.sources.length}{" "}
          {game.sources.length === 1 ? "fuente" : "fuentes"}
        </p>
      </footer>
    </article>
  );
}
