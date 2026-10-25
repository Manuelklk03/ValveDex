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

  it("muestra el daño por dificultad cuando el arma lo tiene", () => {
    const facts = getEntryFacts({
      id: "arma-de-prueba",
      slug: "arma-de-prueba",
      name: "Arma de prueba",
      summary: "",
      appearances: [],
      sources: [],
      category: "weapons",
      details: { slot: 1, damage: { easy: 5, medium: 10, hard: 15 } },
    });

    expect(facts).toContainEqual({
      label: "Daño (fácil / normal / difícil)",
      value: "5 / 10 / 15",
    });
  });
});
