import { describe, expect, it } from "vitest";
import { getGameYear } from "@/domain/game";
import {
  getCancelledGamesByGame,
  getGameById,
  getGameBySlug,
  getGamesByStage,
  getGamesByUniverse,
  getModsByGame,
  getOfficialGamesByUniverse,
  getStagesByUniverse,
  getUniverseAndGame,
  getUniverseById,
  getUniverseBySlug,
  getUniverses,
} from "./get-universes";

describe("getUniverses", () => {
  it("devuelve todos los universos registrados", () => {
    const all = getUniverses();
    expect(all.length).toBeGreaterThan(0);
    expect(all.some((u) => u.id === "half-life")).toBe(true);
  });

  it("encuentra un universo por su slug", () => {
    const hl = getUniverseBySlug("half-life");
    expect(hl).toBeDefined();
    expect(hl?.id).toBe("half-life");
    expect(hl?.name).toBe("Half-Life");
  });

  it("devuelve undefined para un slug de universo inexistente", () => {
    expect(getUniverseBySlug("universo-desconocido")).toBeUndefined();
  });

  it("encuentra un universo por su id", () => {
    const tf = getUniverseById("team-fortress");
    expect(tf).toBeDefined();
    expect(tf?.slug).toBe("team-fortress");
  });

  it("devuelve undefined para un id de universo inexistente", () => {
    expect(getUniverseById("id-inexistente")).toBeUndefined();
  });
});

describe("getGamesByUniverse y getOfficialGamesByUniverse", () => {
  it("devuelve los juegos ordenados por año", () => {
    const hlGames = getGamesByUniverse("half-life");
    expect(hlGames.length).toBeGreaterThan(0);

    for (let i = 0; i < hlGames.length - 1; i++) {
      expect(getGameYear(hlGames[i])).toBeLessThanOrEqual(
        getGameYear(hlGames[i + 1]),
      );
    }
  });

  it("getOfficialGamesByUniverse filtra únicamente juegos lanzados y oficiales", () => {
    const officials = getOfficialGamesByUniverse("half-life");
    expect(officials.length).toBeGreaterThan(0);

    for (const game of officials) {
      expect(game.status).toBe("released");
      expect(game.baseGameId).toBeUndefined();
    }
  });

  it("encuentra un juego por universo y slug", () => {
    const game = getGameBySlug("half-life", "half-life");
    expect(game).toBeDefined();
    expect(game?.id).toBe("half-life");
  });

  it("devuelve undefined para slug de juego incorrecto en un universo", () => {
    expect(getGameBySlug("half-life", "slug-invalido")).toBeUndefined();
  });

  it("encuentra un juego por su id", () => {
    const game = getGameById("half-life-2");
    expect(game).toBeDefined();
    expect(game?.name).toBe("Half-Life 2");
  });

  it("devuelve undefined para id de juego inexistente", () => {
    expect(getGameById("juego-inexistente")).toBeUndefined();
  });
});

describe("getUniverseAndGame", () => {
  it("devuelve universe y game para slugs válidos de un universo disponible", () => {
    const result = getUniverseAndGame("half-life", "half-life");
    expect(result).toBeDefined();
    expect(result?.universe.id).toBe("half-life");
    expect(result?.game.id).toBe("half-life");
  });

  it("devuelve undefined si el universo no existe", () => {
    expect(
      getUniverseAndGame("universo-inexistente", "half-life-1"),
    ).toBeUndefined();
  });

  it("devuelve undefined si el universo existe pero no está disponible", () => {
    // Si algún universo estuviese en coming-soon
    const all = getUniverses();
    const comingSoon = all.find((u) => u.status !== "available");
    if (comingSoon) {
      expect(
        getUniverseAndGame(comingSoon.slug, "cualquier-juego"),
      ).toBeUndefined();
    }
  });

  it("devuelve undefined si el juego no existe en el universo", () => {
    expect(
      getUniverseAndGame("half-life", "juego-inexistente"),
    ).toBeUndefined();
  });
});

describe("getModsByGame y getCancelledGamesByGame", () => {
  it("getModsByGame devuelve mods ordenados alfabéticamente", () => {
    const mods = getModsByGame("half-life");
    expect(mods.length).toBeGreaterThan(0);
    const names = mods.map((m) => m.name);
    const sorted = [...names].sort((a, b) => a.localeCompare(b, "es"));
    expect(names).toEqual(sorted);
  });

  it("getCancelledGamesByGame devuelve proyectos cancelados", () => {
    const cancelled = getCancelledGamesByGame("half-life");
    expect(cancelled.length).toBeGreaterThan(0);
    for (const game of cancelled) {
      expect(game.status).toBe("cancelled");
      expect(game.baseGameId).toBe("half-life");
    }
  });
});

describe("etapas del universo", () => {
  it("getStagesByUniverse devuelve las etapas de un universo", () => {
    const stages = getStagesByUniverse("half-life");
    expect(stages.length).toBeGreaterThanOrEqual(3);
    expect(stages.map((s) => s.id)).toContain("goldsrc");
  });

  it("getGamesByStage devuelve los juegos asociados a una etapa ordenados por año", () => {
    const goldsrcGames = getGamesByStage("goldsrc");
    expect(goldsrcGames.length).toBeGreaterThan(0);
    for (const game of goldsrcGames) {
      expect(game.stageId).toBe("goldsrc");
    }
  });
});
