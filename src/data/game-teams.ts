import type { Team } from "@/domain/team";

// Equipos elegibles de cada juego. Un juego sin entrada no tiene selector.
const redBlu: Team[] = [
  {
    id: "red",
    name: "RED",
    accent: "#f0705f",
    summary: "Reliable Excavation & Demolition",
  },
  {
    id: "blu",
    name: "BLU",
    accent: "#6ea8ff",
    summary: "Builders League United",
  },
];

const gray: Team = {
  id: "gray",
  name: "GRAY",
  accent: "#b4bdc7",
  summary: "El ejército de robots de Gray Mann (Mann vs. Machine)",
};

const sides: Team[] = [
  {
    id: "t",
    name: "Terroristas",
    accent: "#e8a43a",
    summary: "El bando que coloca la bomba",
  },
  {
    id: "ct",
    name: "Antiterroristas",
    accent: "#6fa3e8",
    summary: "El bando que la desactiva y rescata rehenes",
  },
];

export const gameTeams: Record<string, Team[]> = {
  "team-fortress-classic": redBlu,
  "team-fortress-2": [...redBlu, gray],
  "counter-strike": sides,
  "counter-strike-condition-zero": sides,
  "counter-strike-condition-zero-deleted-scenes": sides,
  "counter-strike-source": sides,
  "counter-strike-global-offensive": sides,
  "counter-strike-2": sides,
};

export function getGameTeams(gameId: string): Team[] {
  return gameTeams[gameId] ?? [];
}

// Equipos en los que se muestra cada ficha; una ficha que no figura aquí se ve en todos
export const entryTeams: Record<string, string[]> = {
  // Los nueve mercenarios y los de Classic juegan en RED y BLU
  ...Object.fromEntries(
    [
      "tf-scout",
      "tf-soldier",
      "tf-pyro",
      "tf-demoman",
      "tf-heavy",
      "tf-engineer",
      "tf-medic",
      "tf-sniper",
      "tf-spy",
      "tfc-class-scout",
      "tfc-class-soldier",
      "tfc-class-sniper",
      "tfc-class-demoman",
      "tfc-class-medic",
      "tfc-class-heavy",
      "tfc-class-pyro",
      "tfc-class-spy",
      "tfc-class-engineer",
    ].map((id) => [id, ["red", "blu"]]),
  ),
  // Los hermanos Mann y Gray Mann
  "tf-char-redmond-mann": ["red"],
  "tf-char-blutarch-mann": ["blu"],
  "tf-char-gray-mann": ["gray"],
  // Los robots de Mann vs. Machine
  "tf-enemy-scout-robot": ["gray"],
  "tf-enemy-giant-robots": ["gray"],
  "tf-enemy-tank-robot": ["gray"],
  "tf-enemy-sentry-buster": ["gray"],
  // Counter-Strike: cada unidad con su bando
  "cs-char-terrorists": ["t"],
  "cs-char-phoenix-connexion": ["t"],
  "cs-char-elite-crew": ["t"],
  "cs-char-counter-terrorists": ["ct"],
  "cs-char-seal-team-6": ["ct"],
  "cs-char-gign": ["ct"],
  "cs-char-gsg9": ["ct"],
  "cs-char-sas": ["ct"],
};

// Líder de cada equipo: los hermanos Mann (Redmond en RED, Blutarch en BLU y Gray, el tercero, con los robots)
export const leaderIds = new Set<string>([
  "tf-char-redmond-mann",
  "tf-char-blutarch-mann",
  "tf-char-gray-mann",
]);

// Fichas de personaje que son mercenarios (los demás personajes salen en un grupo aparte)
export const mercenaryIds = new Set<string>([
  "tf-scout",
  "tf-soldier",
  "tf-pyro",
  "tf-demoman",
  "tf-heavy",
  "tf-engineer",
  "tf-medic",
  "tf-sniper",
  "tf-spy",
  "tfc-class-scout",
  "tfc-class-soldier",
  "tfc-class-sniper",
  "tfc-class-demoman",
  "tfc-class-medic",
  "tfc-class-heavy",
  "tfc-class-pyro",
  "tfc-class-spy",
  "tfc-class-engineer",
  "tfc-class-civilian",
]);
