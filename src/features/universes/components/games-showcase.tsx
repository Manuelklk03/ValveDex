import Link from "next/link";
import { getGameYear } from "@/domain/game";
import {
  getOfficialGamesByUniverse,
  getUniverses,
} from "@/features/universes/get-universes";
import styles from "./games-showcase.module.css";

// Catálogo de la portada: una fila por saga con una placa por juego oficial, de más antiguo a más reciente
export function GamesShowcase() {
  const sagas = getUniverses()
    .map((universe) => ({
      universe,
      games: [...getOfficialGamesByUniverse(universe.id)].sort(
        (a, b) => getGameYear(a) - getGameYear(b),
      ),
    }))
    .filter((saga) => saga.games.length > 0);

  return (
    <div className={styles["games-showcase"]}>
      {sagas.map(({ universe, games }) => (
        <section
          key={universe.id}
          className={`${styles["games-showcase__saga"]} ${styles[`games-showcase__saga--${universe.id}`] ?? ""}`}
          aria-labelledby={`saga-${universe.id}`}
        >
          <header className={styles["games-showcase__saga-head"]}>
            <h3
              id={`saga-${universe.id}`}
              className={styles["games-showcase__saga-name"]}
            >
              {universe.name}
            </h3>
            <Link
              href={`/universos/${universe.slug}`}
              className={styles["games-showcase__saga-link"]}
            >
              Entrar en la saga
            </Link>
          </header>

          <ul className={styles["games-showcase__plates"]}>
            {games.map((game) => (
              <li key={game.id} className={styles["games-showcase__plate"]}>
                <span
                  className={styles["games-showcase__year"]}
                  aria-hidden="true"
                >
                  {getGameYear(game)}
                </span>
                <Link
                  href={`/universos/${universe.slug}/${game.slug}`}
                  className={styles["games-showcase__game-link"]}
                >
                  {game.name}
                </Link>
                <span className={styles["games-showcase__developer"]}>
                  {game.developer}, {getGameYear(game)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
