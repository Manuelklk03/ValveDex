import { describe, expect, it } from "vitest";
import { getRelatedEntries } from "./get-related-entries";

describe("getRelatedEntries", () => {
  it("devuelve relaciones de una ficha conocida", () => {
    // La palanca (id: crowbar) se relaciona saliente con Gordon Freeman
    const related = getRelatedEntries("crowbar");
    expect(related.length).toBeGreaterThan(0);
    expect(related.some((r) => r.entry.id === "gordon-freeman")).toBe(true);

    // Gordon Freeman tiene relaciones entrantes (usado por la palanca) y salientes (encontrado en Black Mesa Inbound)
    const gordonRelations = getRelatedEntries("gordon-freeman");
    expect(gordonRelations.length).toBeGreaterThan(0);
    expect(gordonRelations.some((r) => r.entry.id === "crowbar")).toBe(true);
  });

  it("devuelve un array vacío si la ficha no tiene relaciones registradas", () => {
    expect(getRelatedEntries("ficha-sin-relaciones")).toEqual([]);
  });
});
