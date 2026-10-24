import type { Metadata } from "next";
import Link from "next/link";
import {
  Archivo,
  Barlow,
  Barlow_Condensed,
  IBM_Plex_Mono,
} from "next/font/google";
import { isEntryCategory } from "@/domain/entry";
import {
  getEntries,
  getEntriesByGameAndCategory,
} from "@/features/catalog/get-entries";
import { getGameLore } from "@/features/games/get-game-lore";
import { getGameSections } from "@/features/games/get-game-sections";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import {
  getGameById,
  getUniverseById,
  getUniverses,
} from "@/features/universes/get-universes";
import { SampleMotion } from "./sample-motion";
import { ValveWheel } from "./valve-wheel";
import styles from "./page.module.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-barlow",
});
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-barlow-condensed",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Muestra de diseños",
  robots: { index: false },
};

// shortcut: página de prueba de la fase D1b; se borra o se integra al terminar D2
const dossiers = [
  {
    gameId: "half-life",
    variant: "dossier--half-life",
    label: "Ficha de laboratorio Black Mesa",
    stamp: "Archivo BMRF",
    edge: "Black Mesa Research Facility · Nuevo México",
  },
  {
    gameId: "half-life-opposing-force",
    variant: "dossier--opposing-force",
    label: "Expediente operativo",
    stamp: "HECU",
    edge: "Hazardous Environment Combat Unit · USMC",
  },
  {
    gameId: "half-life-blue-shift",
    variant: "dossier--blue-shift",
    label: "Ficha de seguridad",
    stamp: "Seguridad",
    edge: "Black Mesa · Equipo de seguridad",
  },
];

// Nombres que se ven al desplegar un apartado; el resto se resume en «y N más»
const PREVIEW_COUNT = 3;

function getSectors(gameId: string) {
  return getGameSections().map((section) => {
    const entryNames = isEntryCategory(section.id)
      ? getEntriesByGameAndCategory(gameId, section.id).map(
          (entry) => entry.name,
        )
      : [];
    const count = entryNames.length;
    const hasLore = section.id === "lore" && getGameLore(gameId) !== undefined;
    const status = hasLore
      ? "Disponible"
      : count > 0
        ? `${count} ${count === 1 ? "ficha" : "fichas"}`
        : "Próximamente";

    return { section, status, entryNames, isAvailable: hasLore || count > 0 };
  });
}

export default function DesignSamplePage() {
  const games = dossiers.flatMap((dossier) => {
    const game = getGameById(dossier.gameId);
    const universe = game ? getUniverseById(game.universeId) : undefined;

    return game && universe ? [{ ...dossier, game, universe }] : [];
  });

  const stats = [
    { label: "Sagas", value: getUniverses().length },
    { label: "Fichas", value: getEntries().length },
    { label: "Apartados por juego", value: getGameSections().length },
  ];

  return (
    <main
      className={`${styles["design-sample"]} ${archivo.variable} ${barlow.variable} ${barlowCondensed.variable} ${plexMono.variable}`}
    >
      <section
        className={styles["valve-hero"]}
        aria-labelledby="valve-hero-title"
      >
        <div className={styles["valve-hero__inner"]}>
          <div className={styles["valve-hero__content"]}>
            <p className={styles["valve-hero__eyebrow"]}>
              Enciclopedia de fans
            </p>
            <h1 id="valve-hero-title" className={styles["valve-hero__title"]}>
              Valve, de Black Mesa a Steam
            </h1>
            <p className={styles["valve-hero__intro"]}>
              Juegos, personajes, armas, mapas y lore de las sagas de Valve.
              Empezamos por Half-Life.
            </p>
            <div className={styles["valve-hero__actions"]}>
              <Link href="/universos" className={styles["valve-hero__button"]}>
                Ver universos
              </Link>
              <Link href="/explorar" className={styles["valve-hero__link"]}>
                Explorar fichas
              </Link>
            </div>
          </div>
          <ValveWheel />
        </div>

        <dl className={styles["valve-hero__stats"]}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles["valve-hero__stat"]}>
              <dt className={styles["valve-hero__stat-label"]}>{stat.label}</dt>
              <dd className={styles["valve-hero__stat-value"]}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className={styles["design-sample__dossiers"]}>
        {games.map(({ game, universe, variant, label, stamp, edge }) => {
          const sectors = getSectors(game.id);
          const availableCount = sectors.filter(
            (sector) => sector.isAvailable,
          ).length;

          return (
            <article
              key={game.id}
              className={`${styles["dossier"]} ${styles[variant]}`}
              aria-labelledby={`${game.id}-title`}
              data-reveal
            >
              <span className={styles["dossier__tab"]} aria-hidden="true">
                {universe.name}
              </span>
              <span className={styles["dossier__stamp"]} aria-hidden="true">
                {stamp}
              </span>
              <span className={styles["dossier__edge"]} aria-hidden="true">
                {edge}
              </span>

              <header className={styles["dossier__header"]}>
                <div className={styles["dossier__heading"]}>
                  <p className={styles["dossier__label"]}>{label}</p>
                  <h2
                    id={`${game.id}-title`}
                    className={styles["dossier__title"]}
                  >
                    {game.name}
                  </h2>
                  <p className={styles["dossier__summary"]}>
                    {game.description}
                  </p>
                </div>
                <dl className={styles["dossier__specs"]}>
                  <div className={styles["dossier__spec"]}>
                    <dt className={styles["dossier__spec-label"]}>Año</dt>
                    <dd className={styles["dossier__spec-value"]}>
                      {getGameYearLabel(game)}
                    </dd>
                  </div>
                  <div className={styles["dossier__spec"]}>
                    <dt className={styles["dossier__spec-label"]}>Estudio</dt>
                    <dd className={styles["dossier__spec-value"]}>
                      {game.developer}
                    </dd>
                  </div>
                  <div className={styles["dossier__spec"]}>
                    <dt className={styles["dossier__spec-label"]}>Apartados</dt>
                    <dd className={styles["dossier__spec-value"]}>
                      <meter
                        className={styles["dossier__meter"]}
                        min={0}
                        max={sectors.length}
                        value={availableCount}
                        aria-label="Apartados con contenido"
                      />
                      {availableCount} de {sectors.length}
                    </dd>
                  </div>
                </dl>
              </header>

              <ul className={styles["dossier__sectors"]}>
                {sectors.map(
                  ({ section, status, entryNames, isAvailable }, index) => (
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
                          href={`/universos/${universe.slug}/${game.slug}/${section.slug}`}
                          className={styles["dossier__sector-link"]}
                        >
                          {section.name}
                        </Link>
                      ) : (
                        <span className={styles["dossier__sector-name"]}>
                          {section.name}
                        </span>
                      )}
                      <span className={styles["dossier__sector-status"]}>
                        {status}
                      </span>
                      {isAvailable && (
                        <span
                          className={styles["dossier__sector-arrow"]}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      )}
                      {/* Solo los apartados con enlace despliegan: así el teclado también llega con :focus-within */}
                      {isAvailable && (
                        <div className={styles["dossier__sector-panel"]}>
                          <p className={styles["dossier__sector-description"]}>
                            {section.description}
                          </p>
                          {entryNames.length > 0 && (
                            <ul className={styles["dossier__sector-entries"]}>
                              {entryNames
                                .slice(0, PREVIEW_COUNT)
                                .map((name) => (
                                  <li
                                    key={name}
                                    className={styles["dossier__sector-entry"]}
                                  >
                                    {name}
                                  </li>
                                ))}
                              {entryNames.length > PREVIEW_COUNT && (
                                <li className={styles["dossier__sector-entry"]}>
                                  y {entryNames.length - PREVIEW_COUNT} más
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
      </div>
      <SampleMotion />
    </main>
  );
}
