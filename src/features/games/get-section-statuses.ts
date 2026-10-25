import { isEntryCategory } from "@/domain/entry";
import type { GameSection } from "@/domain/game-section";
import { getEntriesByGameAndCategory } from "@/features/catalog/get-entries";
import { getGameLore } from "./get-game-lore";
import { getGameSections } from "./get-game-sections";

export type SectionStatus = {
  section: GameSection;
  entryNames: string[];
  isAvailable: boolean;
  label: string;
};

// Estado de cada apartado de un juego: qué fichas tiene y qué texto mostrar
export function getSectionStatuses(gameId: string): SectionStatus[] {
  return getGameSections().map((section) => {
    const entryNames = isEntryCategory(section.id)
      ? getEntriesByGameAndCategory(gameId, section.id).map(
          (entry) => entry.name,
        )
      : [];

    const count = entryNames.length;
    const hasLore = section.id === "lore" && getGameLore(gameId) !== undefined;
    const label = hasLore
      ? "Disponible"
      : count > 0
        ? `${count} ${count === 1 ? "ficha" : "fichas"}`
        : "Próximamente";

    return { section, entryNames, isAvailable: hasLore || count > 0, label };
  });
}
