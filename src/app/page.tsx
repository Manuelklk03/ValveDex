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
import { getValveHardware } from "@/features/valve/get-valve-hardware";
import { getValveMilestones } from "@/features/valve/get-valve-milestones";
import { getValvePeople } from "@/features/valve/get-valve-people";
import { getValveRooms } from "@/features/valve/get-valve-rooms";
import styles from "./page.module.css";

// La portada es el propio mundo de Valve (ver docs/world-journey-plan.md): una sola escena que se recorre con el scroll
// y, al llegar al final, la página termina; no hay contenido debajo
export default function HomePage() {
  const universes = getUniverses();
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
        rooms={getValveRooms()}
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
                  entry: getUniverseEntry(universe.slug),
                },
              ]
            : [];
        })}
        counts={{
          history: getValveMilestones().length,
          steam: getSteamEras().length,
          hardware: getValveHardware().length,
          people: getValvePeople().length,
        }}
        stats={stats}
      />
    </main>
  );
}
