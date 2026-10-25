import { describe, expect, it, vi } from "vitest";
import { getSectionStatuses } from "./get-section-statuses";

// Datos controlados: la prueba comprueba la regla, no lo que haya hoy en el catálogo
vi.mock("@/features/catalog/get-entries", () => ({
  getEntriesByGameAndCategory: (_gameId: string, category: string) => {
    if (category === "weapons") {
      return [{ name: "Palanca" }, { name: "Escopeta" }];
    }
    if (category === "maps") {
      return [{ name: "Black Mesa Inbound" }];
    }
    return [];
  },
}));

vi.mock("./get-game-lore", () => ({
  getGameLore: (gameId: string) =>
    gameId === "juego-con-lore" ? { gameId } : undefined,
}));

function findStatus(gameId: string, sectionId: string) {
  return getSectionStatuses(gameId).find(
    (status) => status.section.id === sectionId,
  );
}

describe("getSectionStatuses", () => {
  it("cuenta y nombra varias fichas", () => {
    expect(findStatus("juego-con-lore", "weapons")).toMatchObject({
      isAvailable: true,
      label: "2 fichas",
      entryNames: ["Palanca", "Escopeta"],
    });
  });

  it("usa el singular con una sola ficha", () => {
    expect(findStatus("juego-con-lore", "maps")).toMatchObject({
      isAvailable: true,
      label: "1 ficha",
    });
  });

  it("deja en «Próximamente» un apartado sin fichas", () => {
    expect(findStatus("juego-con-lore", "enemies")).toMatchObject({
      isAvailable: false,
      label: "Próximamente",
      entryNames: [],
    });
  });

  it("marca el lore como disponible solo si el juego tiene lore", () => {
    expect(findStatus("juego-con-lore", "lore")).toMatchObject({
      isAvailable: true,
      label: "Disponible",
    });
    expect(findStatus("juego-sin-lore", "lore")).toMatchObject({
      isAvailable: false,
      label: "Próximamente",
    });
  });
});
