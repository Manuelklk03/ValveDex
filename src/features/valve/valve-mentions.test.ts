import { describe, expect, it } from "vitest";
import { findMentions, getMentionTerms } from "./valve-mentions";

describe("findMentions", () => {
  const terms = getMentionTerms();
  const labels = (text: string) =>
    findMentions(text, terms).map((mention) => mention.label);

  it("reconoce personas, sagas y Steam en orden de aparición", () => {
    expect(
      labels(
        "Gabe Newell fundó Valve; Half-Life salió en 1998 y Steam en 2003",
      ),
    ).toEqual(["Gabe Newell", "Half-Life", "Steam"]);
  });

  it("un dispositivo no cuenta además como Steam", () => {
    expect(labels("Valve presentó la Steam Deck")).toEqual(["Steam Deck"]);
  });

  it("no repite un nombre y no distingue mayúsculas", () => {
    expect(labels("half-life, HALF-LIFE y Half-Life")).toEqual(["Half-Life"]);
  });

  it("solo cuentan palabras enteras", () => {
    expect(labels("Steamboat y los Portalitos")).toEqual([]);
  });

  it("sin nombres conocidos no hay menciones", () => {
    expect(labels("Una empresa de Bellevue")).toEqual([]);
  });

  it("cada mención enlaza a una ruta de la web", () => {
    for (const mention of findMentions("Gabe Newell, Portal y Steam", terms)) {
      expect(mention.href.startsWith("/")).toBe(true);
    }
  });
});
