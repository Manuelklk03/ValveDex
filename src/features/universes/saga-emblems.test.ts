import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { universePalettes } from "@/data/universe-palettes";
import { lineIcons } from "@/data/universe-art";
import { universes } from "@/data/universes";

// La entrada por saga de la portada necesita el emblema y el color de cada universo disponible: si se abre
// una saga nueva sin ellos, la portada la omitiría sin avisar
describe("entrada por saga de la portada", () => {
  const available = universes.filter(
    (universe) => universe.status === "available",
  );

  it.each(available.map((universe) => universe.id))(
    "%s tiene emblema, archivo de imagen y paleta",
    (id) => {
      const emblem = lineIcons[`emblem-${id}` as keyof typeof lineIcons];

      expect(emblem, `emblema de ${id}`).toBeDefined();
      expect(
        existsSync(join(process.cwd(), "public", emblem.src)),
        `archivo ${emblem.src}`,
      ).toBe(true);
      expect(universePalettes[id], `paleta de ${id}`).toBeDefined();
    },
  );
});
