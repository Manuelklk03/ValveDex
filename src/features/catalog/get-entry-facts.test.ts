import { describe, expect, it } from "vitest";
import { getEntryBySlug } from "./get-entries";
import { getEntryFacts } from "./get-entry-facts";

function factLabels(slug: string): string[] {
  const entry = getEntryBySlug(slug);

  if (!entry) {
    throw new Error(`No existe la ficha ${slug}`);
  }

  return getEntryFacts(entry).map((fact) => fact.label);
}

describe("getEntryFacts", () => {
  it("muestra la munición solo si el arma la usa", () => {
    expect(factLabels("palanca")).toEqual(["Ranura del inventario"]);
    expect(factLabels("escopeta")).toEqual([
      "Ranura del inventario",
      "Munición",
    ]);
  });

  it("no muestra datos en curiosidades ni easter eggs", () => {
    expect(factLabels("motor-goldsrc")).toEqual([]);
    expect(factLabels("gordon-empleado-del-mes")).toEqual([]);
  });
});
