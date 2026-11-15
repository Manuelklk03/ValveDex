import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Los dossieres de Team Fortress, Left 4 Dead, Portal y Counter-Strike definen su paleta con variables en
// game-dossier.module.css. Esta prueba lee esos colores y exige contraste AA, para que un retoque de estilo no
// deje un texto ilegible sin que nadie lo vea.
const css = readFileSync(
  join(__dirname, "components", "game-dossier.module.css"),
  "utf8",
);

const worlds = [
  "team-fortress-classic",
  "team-fortress-2",
  "left-4-dead",
  "left-4-dead-2",
  "portal",
  "portal-2",
  "counter-strike",
  "counter-strike-condition-zero",
  "counter-strike-condition-zero-deleted-scenes",
  "counter-strike-source",
  "counter-strike-global-offensive",
  "counter-strike-2",
];

function readVariable(block: string, name: string) {
  const match = block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  return match?.[1];
}

function getBlock(world: string) {
  const start = css.indexOf(`.game-dossier--${world} {`);
  return start < 0 ? "" : css.slice(start, css.indexOf("}", start));
}

function luminance(color: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(color.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

// Mezcla del papel con la tinta, como la tarjeta de un apartado (94 %) y su ficha desplegable (90 %)
function mix(paper: string, ink: string, share: number) {
  return (
    "#" +
    [1, 3, 5]
      .map((i) =>
        Math.round(
          parseInt(paper.slice(i, i + 2), 16) * share +
            parseInt(ink.slice(i, i + 2), 16) * (1 - share),
        )
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

describe("paleta de los dossieres de cada juego", () => {
  it.each(worlds)("%s define papel, tinta, atenuado y acento", (world) => {
    const block = getBlock(world);

    for (const name of [
      "dossier-paper",
      "dossier-ink",
      "dossier-muted",
      "dossier-accent",
    ]) {
      expect(readVariable(block, name), `${world} ${name}`).toBeDefined();
    }
  });

  it.each(worlds)(
    "%s supera el contraste AA sobre el papel y sobre sus tarjetas",
    (world) => {
      const block = getBlock(world);
      const paper = readVariable(block, "dossier-paper")!;
      const ink = readVariable(block, "dossier-ink")!;
      const muted = readVariable(block, "dossier-muted")!;
      const accent = readVariable(block, "dossier-accent")!;

      for (const base of [paper, mix(paper, ink, 0.94), mix(paper, ink, 0.9)]) {
        for (const [name, color] of [
          ["tinta", ink],
          ["atenuado", muted],
          ["acento", accent],
        ]) {
          expect(
            contrast(color, base),
            `${world}: ${name} sobre ${base}`,
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    },
  );
});
