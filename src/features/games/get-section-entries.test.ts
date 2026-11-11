import { describe, expect, it } from "vitest";
import { getSectionEntries, getTeamLeaders } from "./get-section-entries";

const names = (gameId: string, category: "characters" | "enemies") =>
  getSectionEntries(gameId, category);

function visibleFor(
  gameId: string,
  category: "characters" | "enemies",
  team: string,
) {
  return names(gameId, category)
    .filter((item) => !item.teams || item.teams.includes(team))
    .map((item) => item.entry.id);
}

describe("getSectionEntries", () => {
  it("en Counter-Strike muestra tu bando en personajes y el rival en enemigos", () => {
    const game = "counter-strike-source";

    expect(visibleFor(game, "characters", "t")).toContain(
      "cs-char-phoenix-connexion",
    );
    expect(visibleFor(game, "characters", "t")).not.toContain("cs-char-sas");
    expect(visibleFor(game, "enemies", "t")).toContain("cs-char-sas");
    expect(visibleFor(game, "enemies", "t")).not.toContain(
      "cs-char-phoenix-connexion",
    );
    expect(visibleFor(game, "enemies", "ct")).toContain(
      "cs-char-phoenix-connexion",
    );
  });

  it("deja las fichas sin equipo en su apartado y con todos los equipos", () => {
    const game = "counter-strike-source";

    expect(visibleFor(game, "characters", "t")).toContain("cs-char-hostage");
    expect(visibleFor(game, "characters", "ct")).toContain("cs-char-hostage");
    expect(visibleFor(game, "enemies", "t")).not.toContain("cs-char-hostage");
  });

  it("en Team Fortress 2 los robots son el equipo GRAY y el enemigo de RED y BLU", () => {
    const game = "team-fortress-2";

    expect(visibleFor(game, "characters", "gray")).toContain(
      "tf-enemy-scout-robot",
    );
    expect(visibleFor(game, "characters", "red")).not.toContain(
      "tf-enemy-scout-robot",
    );
    expect(visibleFor(game, "enemies", "red")).toContain(
      "tf-enemy-scout-robot",
    );
    expect(visibleFor(game, "enemies", "gray")).not.toContain(
      "tf-enemy-scout-robot",
    );
  });

  it("los mercenarios son enemigos de cualquier equipo, porque están en RED y en BLU", () => {
    const game = "team-fortress-2";

    for (const team of ["red", "blu", "gray"]) {
      expect(visibleFor(game, "enemies", team)).toContain("tf-heavy");
    }
    expect(visibleFor(game, "characters", "gray")).not.toContain("tf-heavy");
  });

  it("un juego sin equipos devuelve las fichas de la categoría, sin equipos", () => {
    const items = getSectionEntries("half-life", "enemies");

    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => !item.teams && !item.isRival)).toBe(true);
  });
});

describe("getTeamLeaders", () => {
  it("da un hermano Mann a cada equipo de Team Fortress 2", () => {
    const leaders = getTeamLeaders("team-fortress-2");

    expect(leaders.red?.name).toBe("Redmond Mann");
    expect(leaders.blu?.name).toBe("Blutarch Mann");
    expect(leaders.gray?.name).toBe("Gray Mann");
  });

  it("no da líderes a un juego que no los tiene", () => {
    expect(getTeamLeaders("counter-strike-source")).toEqual({});
  });
});
