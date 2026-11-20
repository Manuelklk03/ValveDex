import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// El hub de un juego de Half-Life continúa el mundo del dossier: las salas son oscuras y cada juego pone su luz
// (--world-light en la página) y cada apartado su color (--room-color en la sala). Esta prueba lee esos colores del CSS
// y exige contraste AA del texto de color sobre el fondo de la sala.
const pageCss = readFileSync(join(__dirname, "world-theme.module.css"), "utf8");
const roomsCss = readFileSync(
  join(__dirname, "components", "world-rooms.module.css"),
  "utf8",
);

const variants = [
  "half-life",
  "opposing-force",
  "blue-shift",
  "decay",
  "half-life-2",
  "half-life-2-episode-one",
  "half-life-2-episode-two",
  "half-life-alyx",
] as const;
const sections = [
  "lore",
  "maps",
  "weapons",
  "characters",
  "enemies",
  "trivia",
  "easter-eggs",
] as const;

function hex(css: string, selector: string, name: string) {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) return undefined;
  const block = css.slice(start, css.indexOf("}", start));
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

// Fondo de una sala: el papel oscuro con un 10 % del color de la sala (color-mix del CSS)
function roomBackground(paper: string, color: string) {
  return (
    "#" +
    [1, 3, 5]
      .map((i) =>
        Math.round(
          parseInt(paper.slice(i, i + 2), 16) * 0.9 +
            parseInt(color.slice(i, i + 2), 16) * 0.1,
        )
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

const paper = hex(roomsCss, ".world-rooms", "room-paper")!;
const ink = hex(roomsCss, ".world-rooms", "room-ink")!;
const muted = hex(roomsCss, ".world-rooms", "room-muted")!;

describe("hub de Half-Life: salas", () => {
  it("la tinta y el atenuado se leen sobre el papel de las salas", () => {
    expect(contrast(ink, paper)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(muted, paper)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(sections)("la sala de «%s» se lee con su color", (section) => {
    const color = hex(roomsCss, `.world-room--${section}`, "room-color");

    expect(color, section).toBeDefined();
    expect(
      contrast(color!, roomBackground(paper, color!)),
      section,
    ).toBeGreaterThanOrEqual(4.5);
  });

  it.each(variants)("la luz de «%s» se lee sobre las salas", (variant) => {
    const light =
      hex(pageCss, `.world-theme[data-variant="${variant}"]`, "world-light") ??
      hex(pageCss, ".world-theme", "world-light");

    expect(light, variant).toBeDefined();
    expect(
      contrast(light!, roomBackground(paper, light!)),
    ).toBeGreaterThanOrEqual(4.5);
  });
});
