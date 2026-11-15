import { describe, expect, it } from "vitest";
import { universes } from "./universes";
import { universePalettes } from "./universe-palettes";
import { universeArt } from "./universe-art";

const hex = /^#[0-9a-f]{6}$/i;

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

describe("paleta de cada saga", () => {
  it("cada universo disponible tiene paleta y solo existen las de universos reales", () => {
    const ids = new Set(universes.map((universe) => universe.id));

    for (const universe of universes.filter((u) => u.status === "available")) {
      expect(universePalettes[universe.id], universe.id).toBeDefined();
    }
    for (const id of Object.keys(universePalettes)) {
      expect(ids.has(id), id).toBe(true);
    }
  });

  it("todos los colores son hexadecimales de seis cifras", () => {
    for (const [id, palette] of Object.entries(universePalettes)) {
      for (const [name, color] of Object.entries(palette)) {
        expect(hex.test(color), `${id}.${name}`).toBe(true);
      }
    }
  });

  it("el texto, el atenuado y el acento superan el contraste AA sobre el fondo y la superficie", () => {
    for (const [id, p] of Object.entries(universePalettes)) {
      for (const base of [p.background, p.surface]) {
        for (const key of ["foreground", "muted", "accent"] as const) {
          expect(
            contrast(p[key], base),
            `${id}.${key} sobre ${base}`,
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
  });

  it("el acento de las tarjetas es el de la paleta: una sola fuente", () => {
    for (const [id, art] of Object.entries(universeArt)) {
      expect(art.accent, id).toBe(universePalettes[id].accent);
    }
  });
});
