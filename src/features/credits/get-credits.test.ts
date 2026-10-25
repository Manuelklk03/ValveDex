import { describe, expect, it } from "vitest";
import { decorImages } from "@/data/decor-images";
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
  it("incluye todas las imágenes de las fichas y las decorativas", () => {
    const imageCount = entries
      .flatMap((entry) => entry.appearances)
      .flatMap((appearance) => [
        appearance.images?.original,
        appearance.images?.hd,
      ])
      .filter((image) => image !== undefined).length;

    expect(getImageCredits()).toHaveLength(imageCount + decorImages.length);
  });

  it("acredita cada imagen decorativa con su uso, sin repetir imágenes", () => {
    const credits = getImageCredits();
    const srcs = credits.map((credit) => credit.image.src);

    for (const { image, usedIn } of decorImages) {
      expect(credits).toContainEqual({ image, usedIn });
    }
    expect(credits.every((credit) => credit.usedIn.trim() !== "")).toBe(true);
    expect(new Set(srcs).size).toBe(srcs.length);
  });
});
