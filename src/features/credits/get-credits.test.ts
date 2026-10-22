import { describe, expect, it } from "vitest";
import { entries } from "@/data/entries";
import { getImageCredits, getSourceCredits } from "./get-credits";

describe("getSourceCredits", () => {
  it("no repite ninguna URL", () => {
    const urls = getSourceCredits().map((credit) => credit.source.url);

    expect(new Set(urls).size).toBe(urls.length);
  });

  it("guarda todos los usos de una fuente compartida", () => {
    const gordon = getSourceCredits().find(
      (credit) =>
        credit.source.url === "https://combineoverwiki.net/wiki/Gordon_Freeman",
    );

    expect(gordon?.usedIn).toEqual([
      "Gordon Freeman",
      "Gordon, empleado del mes",
    ]);
  });
});

describe("getImageCredits", () => {
  it("incluye todas las imágenes de las fichas", () => {
    const imageCount = entries
      .flatMap((entry) => entry.appearances)
      .flatMap((appearance) => [
        appearance.images?.original,
        appearance.images?.hd,
      ])
      .filter((image) => image !== undefined).length;

    expect(getImageCredits()).toHaveLength(imageCount);
  });
});
