import { describe, expect, it } from "vitest";
import { getGameYear, type Game } from "./game";
import { isEntryCategory } from "./entry";

describe("getGameYear", () => {
  it("devuelve releaseYear para juegos lanzados", () => {
    const released: Game = {
      id: "game-1",
      slug: "game-1",
      universeId: "half-life",
      name: "HL1",
      developer: "Valve",
      description: "",
      status: "released",
      releaseYear: 1998,
      sources: [],
    };
    expect(getGameYear(released)).toBe(1998);
  });

  it("devuelve cancelledYear para juegos cancelados", () => {
    const cancelled: Game = {
      id: "game-2",
      slug: "game-2",
      universeId: "half-life",
      name: "HL Cancelled",
      developer: "Valve",
      description: "",
      status: "cancelled",
      cancelledYear: 2008,
      sources: [],
    };
    expect(getGameYear(cancelled)).toBe(2008);
  });
});

describe("isEntryCategory", () => {
  it("reconoce categorías válidas de fichas", () => {
    expect(isEntryCategory("weapons")).toBe(true);
    expect(isEntryCategory("maps")).toBe(true);
    expect(isEntryCategory("characters")).toBe(true);
    expect(isEntryCategory("enemies")).toBe(true);
    expect(isEntryCategory("trivia")).toBe(true);
    expect(isEntryCategory("easter-eggs")).toBe(true);
  });

  it("excluye lore de las categorías de fichas", () => {
    expect(isEntryCategory("lore")).toBe(false);
  });
});
