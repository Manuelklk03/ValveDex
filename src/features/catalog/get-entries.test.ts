import { describe, expect, it } from "vitest";
import type { Entry } from "@/domain/entry";
import {
  compareEntries,
  getEntries,
  getEntriesByCategory,
  getEntriesByGameAndCategory,
  getEntryAppearance,
  getEntryById,
  getEntryBySlug,
  getEntrySiblings,
  getEntrySummaryForGame,
  getEntryThumbnail,
} from "./get-entries";

function chapter(gameId: string, number: number): Entry {
  return {
    id: `${gameId}-${number}`,
    slug: `${gameId}-${number}`,
    name: `Capítulo ${number}`,
    summary: "",
    category: "maps",
    details: { chapter: number, mapFiles: [] },
    appearances: [{ gameId }],
    sources: [],
  };
}

describe("compareEntries", () => {
  it("ordena los capítulos de un juego por su número, no por su nombre", () => {
    const sorted = [chapter("juego-a", 10), chapter("juego-a", 2)].sort(
      compareEntries,
    );

    expect(sorted.map((entry) => entry.id)).toEqual([
      "juego-a-2",
      "juego-a-10",
    ]);
  });

  it("no intercala los capítulos de juegos distintos", () => {
    const sorted = [
      chapter("juego-b", 1),
      chapter("juego-a", 2),
      chapter("juego-a", 1),
    ].sort(compareEntries);

    expect(sorted.map((entry) => entry.id)).toEqual([
      "juego-a-1",
      "juego-a-2",
      "juego-b-1",
    ]);
  });

  it("ordena otras categorías alfabéticamente en español", () => {
    const weaponA: Entry = {
      id: "w-a",
      slug: "w-a",
      name: "Águila del desierto",
      summary: "",
      category: "weapons",
      details: { slot: 1 },
      appearances: [],
      sources: [],
    };
    const weaponB: Entry = {
      id: "w-b",
      slug: "w-b",
      name: "Ballesta",
      summary: "",
      category: "weapons",
      details: { slot: 1 },
      appearances: [],
      sources: [],
    };

    expect(compareEntries(weaponA, weaponB)).toBeLessThan(0);
  });
});

describe("selectores de fichas del catálogo", () => {
  it("getEntries devuelve todas las fichas", () => {
    const entries = getEntries();
    expect(entries.length).toBeGreaterThan(0);
  });

  it("getEntryBySlug y getEntryById encuentran la ficha correspondiente", () => {
    const palancaSlug = getEntryBySlug("palanca");
    expect(palancaSlug).toBeDefined();
    expect(palancaSlug?.name).toBe("Palanca");

    const palancaId = getEntryById("crowbar");
    expect(palancaId).toEqual(palancaSlug);

    expect(getEntryBySlug("slug-inexistente")).toBeUndefined();
    expect(getEntryById("id-inexistente")).toBeUndefined();
  });

  it("getEntriesByCategory devuelve fichas filtradas por categoría", () => {
    const weapons = getEntriesByCategory("weapons");
    expect(weapons.length).toBeGreaterThan(0);
    expect(weapons.every((w) => w.category === "weapons")).toBe(true);
  });

  it("getEntriesByGameAndCategory filtra por juego y categoría", () => {
    const hlWeapons = getEntriesByGameAndCategory("half-life", "weapons");
    expect(hlWeapons.length).toBeGreaterThan(0);
    expect(
      hlWeapons.every(
        (w) =>
          w.category === "weapons" &&
          w.appearances.some((a) => a.gameId === "half-life"),
      ),
    ).toBe(true);
  });

  it("getEntryAppearance, getEntrySummaryForGame y getEntryThumbnail manejan datos específicos de juego", () => {
    const palanca = getEntryBySlug("palanca");
    expect(palanca).toBeDefined();

    if (palanca) {
      const appearance = getEntryAppearance(palanca, "half-life");
      expect(appearance).toBeDefined();
      expect(appearance?.gameId).toBe("half-life");

      const summary = getEntrySummaryForGame(palanca, "half-life");
      expect(summary.length).toBeGreaterThan(0);

      const thumbnail = getEntryThumbnail(palanca, "half-life");
      expect(thumbnail).toBeDefined();
      expect(thumbnail?.src).toMatch(/^\/images\//);

      // Juego sin aparición
      expect(getEntryAppearance(palanca, "juego-ajeno")).toBeUndefined();
      expect(getEntrySummaryForGame(palanca, "juego-ajeno")).toBe(
        palanca.summary,
      );
      expect(getEntryThumbnail(palanca, "juego-ajeno")).toBeUndefined();
    }
  });
});

describe("getEntrySiblings", () => {
  it("devuelve la anterior, la siguiente y otras fichas del mismo apartado sin incluir la actual", () => {
    const list = getEntriesByGameAndCategory("half-life", "weapons");
    const middle = list[2];
    const siblings = getEntrySiblings(middle, "half-life");

    expect(siblings.previous?.id).toBe(list[1].id);
    expect(siblings.next?.id).toBe(list[3].id);
    expect(siblings.others.length).toBeLessThanOrEqual(4);
    expect(siblings.others.map((item) => item.id)).not.toContain(middle.id);
    expect(siblings.others[0].id).toBe(list[3].id);
  });

  it("la primera ficha no tiene anterior y la última no tiene siguiente", () => {
    const list = getEntriesByGameAndCategory("half-life", "weapons");

    expect(getEntrySiblings(list[0], "half-life").previous).toBeUndefined();
    expect(
      getEntrySiblings(list[list.length - 1], "half-life").next,
    ).toBeUndefined();
  });

  it("una ficha que no aparece en el juego no tiene vecinas", () => {
    const [entry] = getEntriesByGameAndCategory("half-life", "weapons");

    expect(getEntrySiblings(entry, "left-4-dead")).toEqual({ others: [] });
  });
});
