import type { Entry, EntryCategory } from "@/domain/entry";
import {
  entryTeams,
  getGameTeams,
  leaderIds,
  mercenaryIds,
} from "@/data/game-teams";
import {
  getEntries,
  getEntriesByGameAndCategory,
} from "@/features/catalog/get-entries";

export type SectionGroup =
  "leader" | "mercenaries" | "robots" | "units" | "others";

// Orden en que se pintan los grupos de un apartado
export const groupOrder: SectionGroup[] = [
  "leader",
  "mercenaries",
  "robots",
  "units",
  "others",
];

export type SectionEntry = {
  entry: Entry;
  // Equipos con los que se ve en este apartado; sin él, se ve con todos
  teams?: string[];
  // En «Enemigos», la ficha de un equipo rival (un personaje o un mercenario del otro bando)
  isRival: boolean;
  group: SectionGroup;
};

function getGroup(entry: Entry, isBound: boolean): SectionGroup {
  if (leaderIds.has(entry.id)) return "leader";
  if (mercenaryIds.has(entry.id)) return "mercenaries";
  if (!isBound) return "others";
  // Una ficha de enemigo ligada a un equipo es un robot de GRAY; las demás, unidades de su bando
  return entry.category === "enemies" ? "robots" : "units";
}

// Fichas de un apartado de un juego. En los juegos con equipos, «Personajes» y «Enemigos» dependen del equipo
// elegido: una ficha ligada a un equipo sale en «Personajes» con el suyo y en «Enemigos» con los rivales.
export function getSectionEntries(
  gameId: string,
  category: EntryCategory,
): SectionEntry[] {
  const teamIds = getGameTeams(gameId).map((team) => team.id);
  const plain = (entry: Entry): SectionEntry => ({
    entry,
    isRival: false,
    group: getGroup(entry, false),
  });

  if (
    teamIds.length === 0 ||
    (category !== "characters" && category !== "enemies")
  ) {
    return getEntriesByGameAndCategory(gameId, category).map(plain);
  }

  const byGroup = (a: SectionEntry, b: SectionEntry) =>
    groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);

  const pool = [
    ...getEntriesByGameAndCategory(gameId, "characters"),
    ...getEntriesByGameAndCategory(gameId, "enemies"),
  ];

  return pool
    .flatMap((entry): SectionEntry[] => {
      const bound = (entryTeams[entry.id] ?? []).filter((id) =>
        teamIds.includes(id),
      );

      if (bound.length === 0) {
        return entry.category === category ? [plain(entry)] : [];
      }

      if (category === "characters") {
        return [
          { entry, teams: bound, isRival: false, group: getGroup(entry, true) },
        ];
      }

      // Enemigo de cada equipo que tiene enfrente a otro equipo de la ficha
      const rivals = teamIds.filter((id) => bound.some((team) => team !== id));

      return rivals.length === 0
        ? []
        : [
            {
              entry,
              teams: rivals.length === teamIds.length ? undefined : rivals,
              isRival: true,
              group: getGroup(entry, true),
            },
          ];
    })
    .sort(byGroup);
}

// Equipo rival cuya versión de la ficha se enseña a cada equipo en «Enemigos» (RED ve al mercenario BLU)
export function getRivalTeam(
  entryId: string,
  teamId: string,
): string | undefined {
  return entryTeams[entryId]?.find((team) => team !== teamId);
}

export type TeamLeader = { name: string; slug: string };

// Líder de cada equipo del juego (Redmond Mann en RED, Blutarch en BLU y Gray Mann en GRAY)
export function getTeamLeaders(gameId: string): Record<string, TeamLeader> {
  const leaders: Record<string, TeamLeader> = {};

  for (const entry of getEntries()) {
    if (
      !leaderIds.has(entry.id) ||
      !entry.appearances.some((appearance) => appearance.gameId === gameId)
    ) {
      continue;
    }

    for (const team of entryTeams[entry.id] ?? []) {
      leaders[team] = { name: entry.name, slug: entry.slug };
    }
  }

  return leaders;
}
