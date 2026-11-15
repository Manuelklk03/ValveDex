import { describe, expect, it } from "vitest";
import { universes } from "./universes";
import { atmospheres } from "./atmospheres";

const rgb = /^\d{1,3},\d{1,3},\d{1,3}$/;

describe("ambientes de los universos", () => {
  it("cada universo disponible tiene su ambiente", () => {
    for (const universe of universes.filter((u) => u.status === "available")) {
      expect(atmospheres[universe.id], universe.id).toBeDefined();
    }
  });

  it("solo hay ambiente para universos que existen", () => {
    const ids = new Set(universes.map((universe) => universe.id));

    for (const id of Object.keys(atmospheres)) {
      expect(ids.has(id), id).toBe(true);
    }
  });

  it("los valores son válidos y las partículas no restan contraste al texto", () => {
    for (const [id, atmosphere] of Object.entries(atmospheres)) {
      expect(atmosphere.glow, id).toMatch(rgb);
      expect(atmosphere.layers.length, id).toBeGreaterThan(0);

      for (const layer of atmosphere.layers) {
        expect(layer.colors.length, id).toBeGreaterThan(0);
        for (const color of layer.colors) expect(color, id).toMatch(rgb);
        // Pocas, pequeñas y suaves: van por encima del texto
        expect(layer.density, id).toBeLessThanOrEqual(90);
        expect(layer.size[1], id).toBeLessThanOrEqual(8);
        expect(layer.size[0], id).toBeLessThanOrEqual(layer.size[1]);
        expect(layer.speed[0], id).toBeLessThanOrEqual(layer.speed[1]);
        expect(layer.alpha, id).toBeLessThanOrEqual(0.8);
      }
    }
  });
});
