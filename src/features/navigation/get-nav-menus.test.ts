import { describe, expect, it } from "vitest";
import { games } from "@/data/games";
import { universes } from "@/data/universes";
import { getUniverseMenuGroups, getValveMenuGroups } from "./get-nav-menus";

describe("menú de universos", () => {
  const groups = getUniverseMenuGroups();

  it("tiene una columna por cada saga disponible con juegos oficiales", () => {
    const available = universes.filter((u) => u.status === "available");

    expect(groups.map((group) => group.title).sort()).toEqual(
      available.map((universe) => universe.name).sort(),
    );
  });

  it("cada columna enlaza a su saga, con color y emblema, y a juegos que existen", () => {
    const gameSlugs = new Set(games.map((game) => game.slug));

    for (const group of groups) {
      expect(group.href, group.title).toMatch(/^\/universos\/[a-z0-9-]+$/);
      expect(group.accent, group.title).toMatch(/^#[0-9a-f]{6}$/i);
      expect(group.emblem, group.title).toBeDefined();
      expect(group.links.length, group.title).toBeGreaterThan(0);

      for (const link of group.links) {
        const gameSlug = link.href.split("/").pop() ?? "";
        expect(gameSlugs.has(gameSlug), link.href).toBe(true);
      }
    }
  });

  it("los mods y los proyectos cancelados no entran en el menú", () => {
    const labels = new Set(groups.flatMap((g) => g.links.map((l) => l.label)));

    for (const game of games) {
      if (game.status === "cancelled" || game.baseGameId) {
        expect(labels.has(game.name), game.name).toBe(false);
      }
    }
  });
});

describe("menú de Valve", () => {
  it("no repite enlaces y todos son rutas internas", () => {
    const hrefs = getValveMenuGroups().flatMap((group) =>
      group.links.map((link) => link.href),
    );

    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) expect(href.startsWith("/"), href).toBe(true);
  });
});
