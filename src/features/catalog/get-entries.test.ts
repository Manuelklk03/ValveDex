import { describe, expect, it } from "vitest";
import type { Entry } from "@/domain/entry";
import { compareEntries } from "./get-entries";

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
});
