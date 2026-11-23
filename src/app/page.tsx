import { existsSync } from "node:fs";
import path from "node:path";
import { getGameYear } from "@/domain/game";
import { lineIcons, universeArt } from "@/data/universe-art";
import { getEntries } from "@/features/catalog/get-entries";
import { getGameSections } from "@/features/games/get-game-sections";
import { getUniverseEntry } from "@/features/universes/universe-entries";
import {
  getOfficialGamesByUniverse,
  getUniverses,
} from "@/features/universes/get-universes";
import { ValveStation } from "@/features/valve/components/valve-station";
import { getSteamEras } from "@/features/valve/get-steam-eras";
import { getValveMilestones } from "@/features/valve/get-valve-milestones";
import { getValvePeople } from "@/features/valve/get-valve-people";
import { getValveRooms } from "@/features/valve/get-valve-rooms";
import { findMentions, getMentionTerms } from "@/features/valve/valve-mentions";
import styles from "./page.module.css";

// Imagen del retablo de la parada Personal: si el archivo está en public/images/people, se usa tal cual; si no, la escena
// dibuja su propia versión
const PORTRAIT_FILES = [
  "lord-gaben-body.webp",
  "lord-gaben.webp",
  "lord-gaben.jpg",
  "lord-gaben.jpeg",
  "lord-gaben.png",
];

// La portada es el propio mundo de Valve (ver docs/world-journey-plan.md): una sola escena que se recorre con el scroll
// y, al llegar al final, la página termina; no hay contenido debajo
export default function HomePage() {
  const universes = getUniverses();
  const portraitFile = PORTRAIT_FILES.find((name) =>
    existsSync(path.join(process.cwd(), "public", "images", "people", name)),
  );
  // El pergamino de la parada Historia: cada hito, con los nombres que menciona (saga, persona, hardware o Steam)
  const terms = getMentionTerms();
  const history = getValveMilestones().map((milestone) => {
    // Solo se buscan nombres en lo que el pergamino escribe (el título), para que cada tarjeta tenga su texto
    return {
      year: String(milestone.year),
      text: milestone.title,
      mentions: findMentions(milestone.title, terms),
    };
  });
  const stats = [
    { label: "Sagas", value: universes.length },
    {
      label: "Juegos",
      value: universes.flatMap((u) => getOfficialGamesByUniverse(u.id)).length,
    },
    { label: "Fichas", value: getEntries().length },
    { label: "Apartados por juego", value: getGameSections().length },
  ];

  return (
    <main className={styles["home-page"]}>
      <ValveStation
        eras={getSteamEras().map((era) => ({
          id: era.id,
          name: era.name,
          years: era.yearTo
            ? `${era.yearFrom}–${era.yearTo}`
            : `${era.yearFrom}–hoy`,
          summary: era.summary,
        }))}
        rooms={getValveRooms()}
        history={history}
        portraitSrc={portraitFile && `/images/people/${portraitFile}`}
        people={getValvePeople().map((person) => ({
          name: person.name,
          slug: person.slug,
          role: person.role,
          photo: person.image?.src,
        }))}
        universes={universes.flatMap((universe) => {
          const emblem =
            lineIcons[`emblem-${universe.id}` as keyof typeof lineIcons];
          return emblem && universe.status === "available"
            ? [
                {
                  id: universe.id,
                  slug: universe.slug,
                  name: universe.name,
                  accent: universeArt[universe.id].accent,
                  emblem: emblem.src,
                  games: getOfficialGamesByUniverse(universe.id).map(
                    (game) => ({
                      name: game.name,
                      year: getGameYear(game),
                    }),
                  ),
                  entry: getUniverseEntry(universe.slug),
                },
              ]
            : [];
        })}
        stats={stats}
      />
    </main>
  );
}
