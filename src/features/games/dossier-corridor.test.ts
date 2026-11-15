import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// El pasillo de Half-Life pone todos sus dossieres sobre una escena oscura y cada juego aporta su «luz» (--corridor-tint).
// Esta prueba lee esos colores del CSS y exige contraste AA, para que un retoque no deje un rótulo ilegible.
const css = readFileSync(
  join(__dirname, "components", "game-dossier.module.css"),
  "utf8",
);

const variants = [
  "opposing-force",
  "blue-shift",
  "decay",
  "half-life-2",
  "half-life-2-episode-one",
  "half-life-2-episode-two",
  "half-life-alyx",
];

// Une todas las reglas con ese selector: el pasillo se define en varios bloques del archivo
function getBlock(selector: string) {
  let blocks = "";
  let start = css.indexOf(`${selector} {`);
  while (start >= 0) {
    blocks += css.slice(start, css.indexOf("}", start));
    start = css.indexOf(`${selector} {`, start + 1);
  }
  return blocks;
}

function readVariable(block: string, name: string) {
  return block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
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

const base = getBlock(".game-dossier--corridor");
const paper = readVariable(base, "dossier-paper")!;
// Texto oscuro de la placa del cartel de techo (game-dossier__label)
const plateInk = "#12100d";

describe("pasillo de Half-Life", () => {
  it("define papel, tinta, atenuado y luz de serie", () => {
    for (const name of [
      "dossier-paper",
      "dossier-ink",
      "dossier-muted",
      "corridor-tint",
    ]) {
      expect(readVariable(base, name), name).toBeDefined();
    }
  });

  it("la tinta y el atenuado se leen sobre el papel oscuro", () => {
    expect(
      contrast(readVariable(base, "dossier-ink")!, paper),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast(readVariable(base, "dossier-muted")!, paper),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it.each(["", ...variants])(
    "la luz de «%s» se lee como texto y como placa",
    (variant) => {
      const block = variant
        ? getBlock(`.game-dossier--corridor.game-dossier--${variant}`)
        : base;
      const tint = readVariable(block, "corridor-tint");

      expect(tint, variant || "serie").toBeDefined();
      // La luz se usa como texto sobre el papel y como fondo de la placa con texto oscuro
      expect(contrast(tint!, paper)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(plateInk, tint!)).toBeGreaterThanOrEqual(4.5);
    },
  );
});
