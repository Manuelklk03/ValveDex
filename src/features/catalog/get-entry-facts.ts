import type { Entry } from "@/domain/entry";
import type { DifficultyValues } from "@/domain/difficulty";

export type EntryFact = {
  label: string;
  value: string;
};

function formatDifficulty(values: DifficultyValues): string {
  return `${values.easy} / ${values.medium} / ${values.hard}`;
}

export function getEntryFacts(entry: Entry): EntryFact[] {
  switch (entry.category) {
    case "weapons":
      return [
        { label: "Ranura del inventario", value: String(entry.details.slot) },
        ...(entry.details.ammo
          ? [{ label: "Munición", value: entry.details.ammo }]
          : []),
        ...(entry.details.maxAmmo
          ? [
              {
                label: "Munición máxima",
                value: String(entry.details.maxAmmo),
              },
            ]
          : []),
        ...(entry.details.damage
          ? [
              {
                label: "Daño (fácil / normal / difícil)",
                value: formatDifficulty(entry.details.damage),
              },
            ]
          : []),
      ];
    case "maps":
      return [
        { label: "Capítulo", value: String(entry.details.chapter) },
        { label: "Archivos de mapa", value: entry.details.mapFiles.join(", ") },
      ];

    case "characters":
      return [{ label: "Afiliación", value: entry.details.affiliation }];
    case "enemies":
      return [
        { label: "Origen", value: entry.details.origin },
        ...(entry.details.health
          ? [
              {
                label: "Salud (fácil / normal / difícil)",
                value: formatDifficulty(entry.details.health),
              },
            ]
          : []),
      ];

    case "trivia":
    case "easter-eggs":
      return [];
  }
}
