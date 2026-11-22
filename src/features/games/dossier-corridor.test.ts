import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { dossierTransitions } from "@/domain/dossier-transition";
import { transitionByLook } from "./dossier-transitions";

// En el pasillo de Half-Life cada juego conserva su material (papel, tinta, atenuado y acento) y aporta su luz
// (el acento) y el texto de la placa del cartel. Esta prueba lee esos colores del CSS y exige contraste AA, para que
// un retoque no deje un rótulo ilegible, y comprueba que cada juego tiene su propia entrada animada.
const css = readFileSync(
  join(__dirname, "components", "game-dossier.module.css"),
  "utf8",
);

// Juego → clase del dossier. Half-Life 1 usa el papel de serie de `.game-dossier`
const games = [
  "half-life",
  "opposing-force",
  "blue-shift",
  "decay",
  "half-life-2",
  "half-life-2-episode-one",
  "half-life-2-episode-two",
  "half-life-alyx",
] as const;

// Los juegos de papel claro, que el CSS del pasillo declara con una placa de texto blanco
const lightGames = [
  "half-life",
  "blue-shift",
  "decay",
  "half-life-2-episode-two",
];

function getBlock(selector: string) {
  const start = css.indexOf(`${selector} {`);
  return start < 0 ? "" : css.slice(start, css.indexOf("}", start));
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

// Material de un juego: lo suyo y, si no lo define, el de serie del dossier
function material(game: string, name: string) {
  const own = readVariable(getBlock(`.game-dossier--${game}`), name);
  return own ?? readVariable(getBlock(".game-dossier"), name)!;
}

describe("pasillo de Half-Life", () => {
  it.each(games)(
    "%s se lee: tinta, atenuado y acento sobre su papel",
    (game) => {
      const paper = material(game, "dossier-paper");
      for (const name of ["dossier-ink", "dossier-muted", "dossier-accent"]) {
        expect(
          contrast(material(game, name), paper),
          `${game} ${name}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    },
  );

  it.each(games)("%s tiene una placa legible con su luz", (game) => {
    const tint = material(game, "dossier-accent");
    const plateInk = lightGames.includes(game) ? "#ffffff" : "#12100d";

    expect(contrast(plateInk, tint), game).toBeGreaterThanOrEqual(4.5);
  });

  it("el CSS declara como papel claro justo los juegos que lo son", () => {
    const declared = css.slice(
      css.indexOf(".game-dossier--corridor:is("),
      css.indexOf("--plate-ink: #ffffff"),
    );

    for (const game of lightGames) {
      expect(declared, game).toContain(`.game-dossier--${game}`);
    }
    for (const game of games.filter((game) => !lightGames.includes(game))) {
      expect(declared, game).not.toContain(`.game-dossier--${game},`);
    }
  });
});

describe("entradas animadas de los dossieres", () => {
  it("cada juego del pasillo tiene su propia entrada, distinta de las demás", () => {
    const used = games.map((game) => transitionByLook[game]);

    for (const transition of used) expect(transition).toBeDefined();
    expect(new Set(used).size).toBe(games.length);
  });

  it("todas las entradas existen en el catálogo de animaciones", () => {
    for (const transition of Object.values(transitionByLook)) {
      expect(dossierTransitions).toContain(transition);
    }
  });
});

// Las demás sagas con mundo tienen su propia entrada, la misma para todos sus juegos
describe("entradas de las demás sagas", () => {
  it.each([
    ["portal", "portal"],
    ["portal-2", "portal"],
    ["team-fortress-classic", "respawn"],
    ["team-fortress-2", "respawn"],
    ["left-4-dead", "safehouse"],
    ["left-4-dead-2", "safehouse"],
  ] as const)("«%s» entra con «%s»", (variant, transition) => {
    expect(transitionByLook[variant]).toBe(transition);
    expect(dossierTransitions).toContain(transition);
  });
});
