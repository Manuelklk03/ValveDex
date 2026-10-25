import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getSectionStatuses } from "@/features/games/get-section-statuses";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import { UniverseTheme } from "@/features/universes/components/universe-theme";
import {
  getGamesByStage,
  getStagesByUniverse,
  getUniverseById,
} from "@/features/universes/get-universes";
import { SampleMotion } from "../sample-motion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Muestra: universo Half-Life",
  robots: { index: false },
};

// shortcut: muestra de U2; se borra al integrar la página real en U3
const dossierLooks: Record<
  string,
  { variant: string; label: string; stamp: string; edge: string }
> = {
  "half-life": {
    variant: "dossier--half-life",
    label: "Ficha de laboratorio Black Mesa",
    stamp: "Archivo BMRF",
    edge: "Black Mesa Research Facility · Nuevo México",
  },
  "half-life-opposing-force": {
    variant: "dossier--opposing-force",
    label: "Expediente operativo",
    stamp: "HECU",
    edge: "Hazardous Environment Combat Unit · USMC",
  },
  "half-life-blue-shift": {
    variant: "dossier--blue-shift",
    label: "Ficha de seguridad",
    stamp: "Seguridad",
    edge: "Black Mesa · Equipo de seguridad",
  },
};

const PREVIEW_COUNT = 3;

export default function UniverseSamplePage() {
  const universe = getUniverseById("half-life");
  if (!universe) return null;

  const stages = getStagesByUniverse(universe.id);

  return (
    <UniverseTheme universeId={universe.id}>
      <main className={styles["universe-sample"]}>
        <header className={styles["universe-hero"]}>
          <Breadcrumb
            items={[
              { label: "Universos", href: "/universos" },
              { label: universe.name },
            ]}
          />
          <div className={styles["universe-hero__body"]}>
            <h1 className={styles["universe-hero__title"]}>{universe.name}</h1>
            <p className={styles["universe-hero__intro"]}>
              {universe.description} Tres etapas de una misma historia: elige
              una y abre el dossier de cada juego.
            </p>
          </div>
          <span className={styles["universe-hero__mark"]} aria-hidden="true">
            λ
          </span>

          <nav aria-label="Etapas de Half-Life">
            <ul className={styles["universe-hero__stages"]}>
              {stages.map((stage) => (
                <li key={stage.id}>
                  <a
                    href={`#${stage.id}`}
                    className={`${styles["universe-hero__stage-link"]} ${styles[`universe-hero__stage-link--${stage.id}`]}`}
                  >
                    <span className={styles["universe-hero__stage-name"]}>
                      {stage.name}
                    </span>
                    <span className={styles["universe-hero__stage-subtitle"]}>
                      {stage.subtitle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {stages.map((stage) => {
          const stageGames = getGamesByStage(stage.id);

          return (
            <section
              key={stage.id}
              id={stage.id}
              className={`${styles["stage"]} ${styles[`stage--${stage.id}`]}`}
              aria-labelledby={`${stage.id}-title`}
            >
              <header className={styles["stage__plate"]}>
                <h2 id={`${stage.id}-title`} className={styles["stage__name"]}>
                  {stage.name}
                </h2>
                <p className={styles["stage__subtitle"]}>{stage.subtitle}</p>
                <p className={styles["stage__summary"]}>{stage.summary}</p>
                <p className={styles["stage__meta"]}>
                  {stage.status === "available"
                    ? `${stageGames.length} juegos`
                    : "En preparación"}
                </p>
              </header>

              {stage.status === "available" ? (
                <div className={styles["stage__dossiers"]}>
                  {stageGames.map((game) => {
                    const look = dossierLooks[game.id];
                    const statuses = getSectionStatuses(game.id);
                    const availableCount = statuses.filter(
                      (status) => status.isAvailable,
                    ).length;
                    const hubHref = `/universos/${universe.slug}/${game.slug}`;

                    return (
                      <article
                        key={game.id}
                        className={`${styles["dossier"]} ${look ? styles[look.variant] : ""}`}
                        aria-labelledby={`${game.id}-title`}
                        data-reveal
                      >
                        {/* Enlace principal: cubre todo el dossier; los apartados quedan por encima */}
                        <Link
                          href={hubHref}
                          className={styles["dossier__open"]}
                        >
                          <span className="sr-only">
                            Abrir el dossier de {game.name}
                          </span>
                        </Link>
                        <span
                          className={styles["dossier__tab"]}
                          aria-hidden="true"
                        >
                          {universe.name}
                        </span>
                        {look && (
                          <>
                            <span
                              className={styles["dossier__stamp"]}
                              aria-hidden="true"
                            >
                              {look.stamp}
                            </span>
                            <span
                              className={styles["dossier__edge"]}
                              aria-hidden="true"
                            >
                              {look.edge}
                            </span>
                          </>
                        )}

                        <header className={styles["dossier__header"]}>
                          <div className={styles["dossier__heading"]}>
                            {look && (
                              <p className={styles["dossier__label"]}>
                                {look.label}
                              </p>
                            )}
                            <h3
                              id={`${game.id}-title`}
                              className={styles["dossier__title"]}
                            >
                              {game.name}
                            </h3>
                            <p className={styles["dossier__summary"]}>
                              {game.description}
                            </p>
                            <span
                              className={styles["dossier__cue"]}
                              aria-hidden="true"
                            >
                              Abrir dossier
                              <span className={styles["dossier__cue-arrow"]}>
                                →
                              </span>
                            </span>
                          </div>
                          <dl className={styles["dossier__specs"]}>
                            <div className={styles["dossier__spec"]}>
                              <dt className={styles["dossier__spec-label"]}>
                                Año
                              </dt>
                              <dd className={styles["dossier__spec-value"]}>
                                {getGameYearLabel(game)}
                              </dd>
                            </div>
                            <div className={styles["dossier__spec"]}>
                              <dt className={styles["dossier__spec-label"]}>
                                Estudio
                              </dt>
                              <dd className={styles["dossier__spec-value"]}>
                                {game.developer}
                              </dd>
                            </div>
                            <div className={styles["dossier__spec"]}>
                              <dt className={styles["dossier__spec-label"]}>
                                Apartados
                              </dt>
                              <dd className={styles["dossier__spec-value"]}>
                                <meter
                                  className={styles["dossier__meter"]}
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
                          className={styles["dossier__sectors"]}
                          aria-label={`Apartados de ${game.name}`}
                        >
                          {statuses.map(
                            (
                              { section, entryNames, isAvailable, label },
                              index,
                            ) => (
                              <li
                                key={section.id}
                                className={`${styles["dossier__sector"]} ${styles[`dossier__sector--${section.id}`]} ${isAvailable ? "" : styles["dossier__sector--empty"]}`}
                                data-expandable={isAvailable || undefined}
                              >
                                <span
                                  className={styles["dossier__sector-index"]}
                                  aria-hidden="true"
                                >
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                {isAvailable ? (
                                  <Link
                                    href={`${hubHref}/${section.slug}`}
                                    className={styles["dossier__sector-link"]}
                                  >
                                    {section.name}
                                  </Link>
                                ) : (
                                  <span
                                    className={styles["dossier__sector-name"]}
                                  >
                                    {section.name}
                                  </span>
                                )}
                                <span
                                  className={styles["dossier__sector-status"]}
                                >
                                  {label}
                                </span>
                                {isAvailable && (
                                  <span
                                    className={styles["dossier__sector-arrow"]}
                                    aria-hidden="true"
                                  >
                                    →
                                  </span>
                                )}
                                {isAvailable && (
                                  <div
                                    className={styles["dossier__sector-panel"]}
                                  >
                                    <p
                                      className={
                                        styles["dossier__sector-description"]
                                      }
                                    >
                                      {section.description}
                                    </p>
                                    {entryNames.length > 0 && (
                                      <ul
                                        className={
                                          styles["dossier__sector-entries"]
                                        }
                                      >
                                        {entryNames
                                          .slice(0, PREVIEW_COUNT)
                                          .map((name) => (
                                            <li
                                              key={name}
                                              className={
                                                styles["dossier__sector-entry"]
                                              }
                                            >
                                              {name}
                                            </li>
                                          ))}
                                        {entryNames.length > PREVIEW_COUNT && (
                                          <li
                                            className={
                                              styles["dossier__sector-entry"]
                                            }
                                          >
                                            y{" "}
                                            {entryNames.length - PREVIEW_COUNT}{" "}
                                            más
                                          </li>
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                )}
                              </li>
                            ),
                          )}
                        </ul>

                        <footer className={styles["dossier__footer"]}>
                          <span
                            className={styles["dossier__barcode"]}
                            aria-hidden="true"
                          />
                          <p>Registro {game.id}</p>
                          <p className={styles["dossier__sources"]}>
                            {game.sources.length}{" "}
                            {game.sources.length === 1 ? "fuente" : "fuentes"}
                          </p>
                        </footer>
                      </article>
                    );
                  })}

                  {stage.id === "goldsrc" && (
                    <p className={styles["stage__pending-row"]}>
                      <span className={styles["stage__pending-name"]}>
                        Multijugador de Half-Life 1
                      </span>
                      <span className={styles["stage__pending-status"]}>
                        En preparación
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <div className={styles["stage__sealed"]}>
                  {stage.id === "source-2" && (
                    <span
                      className={styles["stage__sealed-mark"]}
                      aria-hidden="true"
                    >
                      Zona de cuarentena
                    </span>
                  )}
                  <p className={styles["stage__sealed-status"]}>
                    Expediente en preparación
                  </p>
                  <ul className={styles["stage__planned"]}>
                    {stage.plannedGames?.map((name) => (
                      <li key={name} className={styles["stage__planned-game"]}>
                        {name}
                      </li>
                    ))}
                  </ul>
                  <p className={styles["stage__sealed-note"]}>
                    Sus dossiers se abrirán cuando tengan fichas con fuentes.
                  </p>
                </div>
              )}
            </section>
          );
        })}
        <SampleMotion />
      </main>
    </UniverseTheme>
  );
}
