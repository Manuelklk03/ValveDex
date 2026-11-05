import { describe, expect, it } from "vitest";
import { getDossierLook } from "./dossier-looks";
import { getGameLore } from "./get-game-lore";
import {
  getGameSectionById,
  getGameSectionBySlug,
  getGameSections,
} from "./get-game-sections";
import { getGameYearLabel } from "./get-game-year-label";
import type { Game } from "@/domain/game";

describe("getGameLore", () => {
  it("devuelve el lore existente para un juego", () => {
    const lore = getGameLore("half-life");
    expect(lore).toBeDefined();
    expect(lore?.gameId).toBe("half-life");
    expect(lore?.paragraphs.length).toBeGreaterThan(0);
  });

  it("devuelve undefined para un juego sin lore registrado", () => {
    expect(getGameLore("juego-sin-lore")).toBeUndefined();
  });
});

describe("getGameSections", () => {
  it("devuelve todos los apartados de juego", () => {
    const sections = getGameSections();
    expect(sections.length).toBeGreaterThanOrEqual(7);
    expect(sections.map((s) => s.id)).toContain("weapons");
  });

  it("encuentra una sección por su slug", () => {
    const section = getGameSectionBySlug("armas");
    expect(section).toBeDefined();
    expect(section?.id).toBe("weapons");
  });

  it("devuelve undefined para slug inexistente", () => {
    expect(getGameSectionBySlug("seccion-inventada")).toBeUndefined();
  });

  it("encuentra una sección por su id", () => {
    const section = getGameSectionById("lore");
    expect(section).toBeDefined();
    expect(section?.slug).toBe("lore");
  });

  it("devuelve undefined para id inexistente", () => {
    // @ts-expect-error probando id no tipado
    expect(getGameSectionById("id-invalido")).toBeUndefined();
  });
});

describe("getGameYearLabel", () => {
  it("muestra el año para juegos publicados", () => {
    const releasedGame: Game = {
      id: "test-released",
      slug: "test-released",
      universeId: "half-life",
      name: "Juego de prueba",
      developer: "Valve",
      description: "Prueba",
      status: "released",
      releaseYear: 1998,
      sources: [],
    };
    expect(getGameYearLabel(releasedGame)).toBe("1998");
  });

  it("muestra 'Cancelado en YYYY' para proyectos cancelados", () => {
    const cancelledGame: Game = {
      id: "test-cancelled",
      slug: "test-cancelled",
      universeId: "half-life",
      name: "Juego cancelado",
      developer: "Valve",
      description: "Prueba",
      status: "cancelled",
      cancelledYear: 2007,
      sources: [],
    };
    expect(getGameYearLabel(cancelledGame)).toBe("Cancelado en 2007");
  });
});

describe("getDossierLook", () => {
  it("devuelve el estilo y rótulo de dossier para juegos con diseño propio", () => {
    const lookHl = getDossierLook("half-life");
    expect(lookHl).toBeDefined();
    expect(lookHl?.variant).toBe("half-life");
    expect(lookHl?.stamp).toBe("Archivo BMRF");

    const lookTf2 = getDossierLook("team-fortress-2");
    expect(lookTf2).toBeDefined();
    expect(lookTf2?.variant).toBe("team-fortress-2");
  });

  it("devuelve undefined para juegos sin dossier personalizado", () => {
    expect(getDossierLook("juego-generico")).toBeUndefined();
  });
});
