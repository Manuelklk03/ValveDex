import { describe, expect, it } from "vitest";
import { getEntries } from "@/features/catalog/get-entries";
import { games } from "@/data/games";
import { universes } from "@/data/universes";
import { buildSearchIndex } from "./search-index";
import { normalize, prepareItems, searchItems } from "./search";

const index = buildSearchIndex();
const prepared = prepareItems(index);

describe("índice de búsqueda", () => {
  it("incluye todas las fichas, juegos y universos disponibles", () => {
    expect(index.filter((item) => item.type === "entry")).toHaveLength(
      getEntries().length,
    );
    expect(index.filter((item) => item.type === "game")).toHaveLength(
      games.length,
    );
    expect(index.filter((item) => item.type === "universe")).toHaveLength(
      universes.filter((universe) => universe.status === "available").length,
    );
  });

  it("todos los enlaces son rutas internas y no se repiten", () => {
    const hrefs = index.map((item) => item.href);

    for (const href of hrefs) {
      expect(href.startsWith("/"), href).toBe(true);
    }
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("cada entrada tiene nombre y no queda ninguna sin contexto salvo las páginas", () => {
    for (const item of index) {
      expect(item.name.trim(), item.href).not.toBe("");
      expect(item.detail.trim(), item.href).not.toBe("");
    }
  });
});

describe("búsqueda", () => {
  it("ignora tildes y mayúsculas", () => {
    expect(normalize("Cañón TAU")).toBe("canon tau");
  });

  it("devuelve vacío con un texto vacío", () => {
    expect(searchItems(prepared, "   ")).toEqual([]);
  });

  it("encuentra un juego por su nombre y lo pone el primero", () => {
    const results = searchItems(prepared, "half-life 2");

    expect(results[0].type).toBe("game");
    expect(results[0].name).toBe("Half-Life 2");
  });

  it("una palabra que no existe no da resultados", () => {
    expect(searchItems(prepared, "zzzxqj")).toEqual([]);
  });

  it("todas las palabras deben aparecer, en el nombre o en el contexto", () => {
    const results = searchItems(prepared, "gordon freeman");

    expect(results.length).toBeGreaterThan(0);
    for (const result of results) {
      const text = normalize(`${result.name} ${result.detail}`);
      expect(text).toContain("gordon");
      expect(text).toContain("freeman");
    }
  });

  it("respeta el límite de resultados", () => {
    expect(searchItems(prepared, "a", 5).length).toBeLessThanOrEqual(5);
  });

  it("encuentra páginas que ya no están en la cabecera, como Explorar", () => {
    const results = searchItems(prepared, "explorar");

    expect(results.some((item) => item.href === "/explorar")).toBe(true);
  });
});
