import type { Metadata } from "next";
import Link from "next/link";
import {
  Archivo,
  Barlow,
  Barlow_Condensed,
  IBM_Plex_Mono,
} from "next/font/google";
import { isEntryCategory } from "@/domain/entry";
import { getEntriesByGameAndCategory } from "@/features/catalog/get-entries";
import { getGameLore } from "@/features/games/get-game-lore";
import { getGameSections } from "@/features/games/get-game-sections";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import {
  getGameById,
  getUniverseById,
} from "@/features/universes/get-universes";
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
  title: "Muestra de diseños",
  robots: { index: false },
};

// shortcut: página de prueba de la fase D1b; se borra o se integra al terminar D2
const dossiers = [
  {
    gameId: "half-life",
    variant: "dossier--half-life",
    label: "Ficha de laboratorio Black Mesa",
  },
  {
    gameId: "half-life-opposing-force",
    variant: "dossier--opposing-force",
    label: "Expediente operativo",
  },
  {
    gameId: "half-life-blue-shift",
    variant: "dossier--blue-shift",
    label: "Ficha de seguridad",
  },
];

function getSectors(gameId: string) {
  return getGameSections().map((section) => {
    const count = isEntryCategory(section.id)
      ? getEntriesByGameAndCategory(gameId, section.id).length
      : 0;
    const hasLore = section.id === "lore" && getGameLore(gameId) !== undefined;
    const status = hasLore
      ? "Disponible"
      : count > 0
        ? `${count} ${count === 1 ? "ficha" : "fichas"}`
        : "Próximamente";

    return { section, status, isAvailable: hasLore || count > 0 };
  });
}

export default function DesignSamplePage() {
  const games = dossiers.flatMap((dossier) => {
    const game = getGameById(dossier.gameId);
    const universe = game ? getUniverseById(game.universeId) : undefined;

    return game && universe ? [{ ...dossier, game, universe }] : [];
  });

  return (
    <main
      className={`${styles["design-sample"]} ${archivo.variable} ${barlow.variable} ${barlowCondensed.variable} ${plexMono.variable}`}
    >
      <section
        className={styles["valve-hero"]}
        aria-labelledby="valve-hero-title"
      >
        <div className={styles["valve-hero__content"]}>
          <p className={styles["valve-hero__eyebrow"]}>Enciclopedia de fans</p>
          <h1 id="valve-hero-title" className={styles["valve-hero__title"]}>
            Todo el universo de Valve en un solo lugar
          </h1>
          <p className={styles["valve-hero__intro"]}>
            Juegos, personajes, armas, lore y mapas de las sagas de Valve,
            empezando por Half-Life
          </p>
          <Link href="/universos" className={styles["valve-hero__button"]}>
            Ver Universos
          </Link>
        </div>
        <svg
          className={styles["valve-hero__wheel"]}
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
          />
          <circle cx="100" cy="100" r="18" fill="currentColor" />
          {[0, 72, 144, 216, 288].map((angle) => (
            <line
              key={angle}
              x1="100"
              y1="100"
              x2="100"
              y2="24"
              stroke="currentColor"
              strokeWidth="10"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
        </svg>
      </section>
      <div className={styles["design-sample__dossiers"]}>
        {games.map(({ game, universe, variant, label }) => (
          <article
            key={game.id}
            className={`${styles["dossier"]} ${styles[variant]}`}
            aria-labelledby={`${game.id}-title`}
          >
            <header className={styles["dossier__header"]}>
              <p className={styles["dossier__label"]}>{label}</p>
              <p className={styles["dossier__code"]}>{game.id}</p>
              <h2 id={`${game.id}-title`} className={styles["dossier__title"]}>
                {game.name}
              </h2>
              <p className={styles["dossier__meta"]}>
                {getGameYearLabel(game)} · {game.developer}
              </p>
              <p className={styles["dossier__summary"]}>{game.description}</p>
            </header>

            <ul className={styles["dossier__sectors"]}>
              {getSectors(game.id).map(({ section, status, isAvailable }) => (
                <li
                  key={section.id}
                  className={`${styles["dossier__sector"]} ${styles[`dossier__sector--${section.id}`]} ${isAvailable ? "" : styles["dossier__sector--empty"]}`}
                >
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
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
