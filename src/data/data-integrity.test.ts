import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { entries } from "./entries";
import { expansionAppearances } from "./expansion-appearances";
import { entryRelations } from "./entry-relations";
import { gameSections } from "./game-sections";
import { games } from "./games";
import { gameLore } from "./game-lore";
import { valveMilestones } from "./valve-milestones";
import { valvePeople } from "./valve-people";
import { universes } from "./universes";
import { universeStages } from "./universe-stages";

function findDuplicates(values: string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

const entryImages = entries.flatMap((entry) =>
  entry.appearances.flatMap((appearance) =>
    [appearance.images?.original, appearance.images?.hd]
      .filter((image) => image !== undefined)
      .map((image) => ({
        label: `${entry.id} / ${appearance.gameId}`,
        image,
      })),
  ),
);

describe("universos", () => {
  it("tienen id y slug únicos", () => {
    expect(findDuplicates(universes.map((universe) => universe.id))).toEqual(
      [],
    );
    expect(findDuplicates(universes.map((universe) => universe.slug))).toEqual(
      [],
    );
  });
});

describe("etapas de los universos", () => {
  it("tienen id único y pertenecen a un universo existente", () => {
    const universeIds = new Set(universes.map((universe) => universe.id));

    expect(findDuplicates(universeStages.map((stage) => stage.id))).toEqual([]);
    expect(
      universeStages
        .filter((stage) => !universeIds.has(stage.universeId))
        .map((stage) => stage.id),
    ).toEqual([]);
  });

  it("las disponibles tienen juegos y las que están en preparación nombran los previstos", () => {
    for (const stage of universeStages) {
      const stageGames = games.filter((game) => game.stageId === stage.id);

      if (stage.status === "available") {
        expect(stageGames.length, stage.id).toBeGreaterThan(0);
      } else {
        const plannedNames = (stage.plannedGames ?? []).filter(
          (name) => name.trim() !== "",
        );
        expect(plannedNames.length, stage.id).toBeGreaterThan(0);
        expect(plannedNames, stage.id).toEqual(stage.plannedGames);
      }
    }
  });

  it("cada juego oficial está en una etapa de su universo; los mods y los cancelados, en ninguna", () => {
    const wrongGames = games
      .filter((game) => {
        const isOfficial =
          game.status === "released" && game.baseGameId === undefined;
        const universeHasStages = universeStages.some(
          (stage) => stage.universeId === game.universeId,
        );

        if (!isOfficial || !universeHasStages) {
          return game.stageId !== undefined;
        }

        const stage = universeStages.find((s) => s.id === game.stageId);
        return stage?.universeId !== game.universeId;
      })
      .map((game) => `${game.id} → ${game.stageId ?? "sin etapa"}`);

    expect(wrongGames).toEqual([]);
  });
});

describe("juegos", () => {
  it("tienen id único", () => {
    expect(findDuplicates(games.map((game) => game.id))).toEqual([]);
  });

  it("tienen slug único dentro de su universo", () => {
    expect(
      findDuplicates(games.map((game) => `${game.universeId}/${game.slug}`)),
    ).toEqual([]);
  });

  it("pertenecen a un universo existente", () => {
    const universeIds = new Set(universes.map((universe) => universe.id));
    const missing = games
      .filter((game) => !universeIds.has(game.universeId))
      .map((game) => `${game.id} → ${game.universeId}`);

    expect(missing).toEqual([]);
  });

  it("los mods y los cancelados dependen de un juego oficial del mismo universo", () => {
    const officialGames = new Map(
      games
        .filter(
          (game) => game.status === "released" && game.baseGameId === undefined,
        )
        .map((game) => [game.id, game]),
    );
    const invalid = games
      .filter(
        (game) => game.baseGameId !== undefined || game.status === "cancelled",
      )
      .filter((mod) => {
        const base = officialGames.get(mod.baseGameId ?? "");
        return !base || base.universeId !== mod.universeId;
      })
      .map((mod) => `${mod.id} → ${mod.baseGameId}`);

    expect(invalid).toEqual([]);
  });
});

describe("apartados", () => {
  it("tienen id y slug únicos", () => {
    expect(findDuplicates(gameSections.map((section) => section.id))).toEqual(
      [],
    );
    expect(findDuplicates(gameSections.map((section) => section.slug))).toEqual(
      [],
    );
  });
});

describe("fichas", () => {
  it("tienen id y slug únicos", () => {
    expect(findDuplicates(entries.map((entry) => entry.id))).toEqual([]);
    expect(findDuplicates(entries.map((entry) => entry.slug))).toEqual([]);
  });

  it("aparecen en al menos un juego y en cada juego una sola vez", () => {
    for (const entry of entries) {
      expect(entry.appearances.length, entry.id).toBeGreaterThan(0);
      expect(
        findDuplicates(
          entry.appearances.map((appearance) => appearance.gameId),
        ),
        entry.id,
      ).toEqual([]);
    }
  });

  it("solo aparecen en juegos existentes", () => {
    const gameIds = new Set(games.map((game) => game.id));
    const missing = entries.flatMap((entry) =>
      entry.appearances
        .filter((appearance) => !gameIds.has(appearance.gameId))
        .map((appearance) => `${entry.id} → ${appearance.gameId}`),
    );

    expect(missing).toEqual([]);
  });

  it("tienen al menos una fuente con URL https", () => {
    for (const entry of entries) {
      expect(entry.sources.length, entry.id).toBeGreaterThan(0);

      for (const source of entry.sources) {
        expect(source.url, entry.id).toMatch(/^https:\/\//);
      }
    }
  });
});

describe("apariciones en las expansiones", () => {
  it("solo añaden apariciones a fichas que existen", () => {
    const entryIds = new Set(entries.map((entry) => entry.id));

    expect(
      Object.keys(expansionAppearances).filter((id) => !entryIds.has(id)),
    ).toEqual([]);
  });
});

describe("imágenes de las fichas", () => {
  it("existen en public/", () => {
    const missing = entryImages
      .filter(({ image }) => !existsSync(join("public", image.src)))
      .map(({ label, image }) => `${label}: ${image.src}`);

    expect(missing).toEqual([]);
  });

  it("tienen tamaño, texto alternativo y fuente", () => {
    for (const { label, image } of entryImages) {
      expect(image.width, label).toBeGreaterThan(0);
      expect(image.height, label).toBeGreaterThan(0);
      expect(image.alt.trim(), label).not.toBe("");
      expect(image.source.url, label).toMatch(/^https:\/\//);
    }
  });

  it("no se repiten entre fichas", () => {
    expect(findDuplicates(entryImages.map(({ image }) => image.src))).toEqual(
      [],
    );
  });

  it("la original y la HD miden lo mismo (para el comparador)", () => {
    const mismatched = entries.flatMap((entry) =>
      entry.appearances.flatMap((appearance) => {
        const original = appearance.images?.original;
        const hd = appearance.images?.hd;

        return original &&
          hd &&
          (original.width !== hd.width || original.height !== hd.height)
          ? [`${entry.id} / ${appearance.gameId}`]
          : [];
      }),
    );

    expect(mismatched).toEqual([]);
  });
});

describe("lore", () => {
  it("pertenece a juegos existentes y hay uno por juego como máximo", () => {
    const gameIds = new Set(games.map((game) => game.id));

    expect(
      gameLore
        .filter((lore) => !gameIds.has(lore.gameId))
        .map((lore) => lore.gameId),
    ).toEqual([]);
    expect(findDuplicates(gameLore.map((lore) => lore.gameId))).toEqual([]);
  });

  it("tiene texto y fuentes con URL https", () => {
    for (const lore of gameLore) {
      expect(lore.paragraphs.length, lore.gameId).toBeGreaterThan(0);
      expect(lore.sources.length, lore.gameId).toBeGreaterThan(0);

      for (const source of lore.sources) {
        expect(source.url, lore.gameId).toMatch(/^https:\/\//);
      }
    }
  });
});

describe("relaciones entre fichas", () => {
  it("apuntan a fichas existentes", () => {
    const entryIds = new Set(entries.map((entry) => entry.id));
    const missing = entryRelations.flatMap((relation) =>
      [relation.fromId, relation.toId]
        .filter((id) => !entryIds.has(id))
        .map((id) => `${relation.fromId} → ${relation.toId}: ${id}`),
    );

    expect(missing).toEqual([]);
  });

  it("no relacionan una ficha consigo misma", () => {
    const selfRelations = entryRelations
      .filter((relation) => relation.fromId === relation.toId)
      .map((relation) => relation.fromId);

    expect(selfRelations).toEqual([]);
  });

  it("no se repiten", () => {
    expect(
      findDuplicates(
        entryRelations.map(
          (relation) => `${relation.fromId}|${relation.type}|${relation.toId}`,
        ),
      ),
    ).toEqual([]);
  });
});

describe("Valve", () => {
  it("los hitos tienen id único y fuentes https", () => {
    expect(findDuplicates(valveMilestones.map((m) => m.id))).toEqual([]);

    for (const milestone of valveMilestones) {
      expect(milestone.sources.length, milestone.id).toBeGreaterThan(0);

      for (const source of milestone.sources) {
        expect(source.url, milestone.id).toMatch(/^https:\/\//);
      }
    }
  });

  it("las personas tienen id y slug únicos y fuentes https", () => {
    expect(findDuplicates(valvePeople.map((person) => person.id))).toEqual([]);
    expect(findDuplicates(valvePeople.map((person) => person.slug))).toEqual(
      [],
    );

    for (const person of valvePeople) {
      expect(person.sources.length, person.id).toBeGreaterThan(0);

      for (const source of person.sources) {
        expect(source.url, person.id).toMatch(/^https:\/\//);
      }
    }
  });
});
