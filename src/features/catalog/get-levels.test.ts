import { describe, expect, it } from "vitest";
import { getChapterLevels, getLevelPage, getLevelPaths } from "./get-levels";
import { getEntries, getEntryBySlug } from "./get-entries";

describe("getChapterLevels", () => {
  it("genera un nivel por cada archivo de mapa, en su orden", () => {
    const chapter = getEntryBySlug("punto-de-insercion");
    expect(chapter).toBeDefined();

    const levels = getChapterLevels(chapter!);

    expect(levels.map((level) => level.mapFile)).toEqual([
      "d1_trainstation_01",
      "d1_trainstation_02",
      "d1_trainstation_03",
      "d1_trainstation_04",
    ]);
    expect(levels.map((level) => level.order)).toEqual([1, 2, 3, 4]);
    expect(levels.every((level) => level.total === 4)).toBe(true);
  });

  it("devuelve una lista vacía para fichas que no son capítulos", () => {
    const weapon = getEntries().find((entry) => entry.category === "weapons");

    expect(getChapterLevels(weapon!)).toEqual([]);
  });
});

describe("getLevelPage", () => {
  it("enlaza el nivel anterior y el siguiente dentro del capítulo", () => {
    const page = getLevelPage("punto-de-insercion", "d1_trainstation_02");

    expect(page?.previous?.mapFile).toBe("d1_trainstation_01");
    expect(page?.next?.mapFile).toBe("d1_trainstation_03");
  });

  it("no tiene anterior en el primer nivel ni siguiente en el último", () => {
    expect(
      getLevelPage("punto-de-insercion", "d1_trainstation_01")?.previous,
    ).toBeUndefined();
    expect(
      getLevelPage("punto-de-insercion", "d1_trainstation_04")?.next,
    ).toBeUndefined();
  });

  it("devuelve undefined para un capítulo o un mapa inexistentes", () => {
    expect(getLevelPage("no-existe", "d1_trainstation_01")).toBeUndefined();
    expect(getLevelPage("punto-de-insercion", "no_existe")).toBeUndefined();
  });
});

describe("getLevelPaths", () => {
  it("genera una ruta única por cada nivel de cada capítulo", () => {
    const paths = getLevelPaths().map((p) => `${p.entrySlug}/${p.levelSlug}`);

    expect(paths.length).toBeGreaterThan(0);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("punto-de-insercion/d1_trainstation_03");
  });
});
