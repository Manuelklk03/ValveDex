import { describe, expect, it } from "vitest";
import { getEntryBySlug } from "./get-entries";
import { getEntryFacts } from "./get-entry-facts";
import type { Entry } from "@/domain/entry";

function factLabels(slug: string): string[] {
  const entry = getEntryBySlug(slug);

  if (!entry) {
    throw new Error(`No existe la ficha ${slug}`);
  }

  return getEntryFacts(entry).map((fact) => fact.label);
}

describe("getEntryFacts", () => {
  it("muestra la munición solo si el arma la usa", () => {
    expect(factLabels("palanca")).not.toContain("Munición");
    expect(factLabels("escopeta")).toContain("Munición");
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

  it("muestra los datos técnicos de un mapa/capítulo", () => {
    const mapWithDesigners: Entry = {
      id: "mapa-prueba",
      slug: "mapa-prueba",
      name: "Capítulo 1",
      summary: "",
      appearances: [],
      sources: [],
      category: "maps",
      details: {
        chapter: 1,
        mapFiles: ["c1a0", "c1a0a"],
        designers: ["Marc Laidlaw", "John Cook"],
      },
    };

    const facts = getEntryFacts(mapWithDesigners);
    expect(facts).toEqual([
      { label: "Capítulo", value: "1" },
      { label: "Archivos de mapa", value: "c1a0, c1a0a" },
      { label: "Diseño", value: "Marc Laidlaw, John Cook" },
    ]);
  });

  it("muestra 'Entrenamiento opcional' para el capítulo 0 (Hazard Course)", () => {
    const hazardCourse: Entry = {
      id: "hazard-course",
      slug: "hazard-course",
      name: "Curso de entrenamiento",
      summary: "",
      appearances: [],
      sources: [],
      category: "maps",
      details: { chapter: 0, mapFiles: ["t0a0"] },
    };

    const facts = getEntryFacts(hazardCourse);
    expect(facts).toContainEqual({
      label: "Capítulo",
      value: "Entrenamiento opcional",
    });
  });

  it("muestra los datos de personajes (afiliación, voz y diseño)", () => {
    const character: Entry = {
      id: "char-prueba",
      slug: "char-prueba",
      name: "Personaje de prueba",
      summary: "",
      appearances: [],
      sources: [],
      category: "characters",
      details: {
        affiliation: "Resistencia",
        voiceActor: "Actor Famoso",
        designers: ["Diseñador 1"],
      },
    };

    const facts = getEntryFacts(character);
    expect(facts).toEqual([
      { label: "Afiliación", value: "Resistencia" },
      { label: "Voz", value: "Actor Famoso" },
      { label: "Diseño", value: "Diseñador 1" },
    ]);
  });

  it("muestra los datos de enemigos (origen y salud)", () => {
    const enemy: Entry = {
      id: "enemy-prueba",
      slug: "enemy-prueba",
      name: "Enemigo de prueba",
      summary: "",
      appearances: [],
      sources: [],
      category: "enemies",
      details: {
        origin: "Xen",
        health: { easy: 20, medium: 25, hard: 30 },
      },
    };

    const facts = getEntryFacts(enemy);
    expect(facts).toEqual([
      { label: "Origen", value: "Xen" },
      { label: "Salud (fácil / normal / difícil)", value: "20 / 25 / 30" },
    ]);
  });
});
