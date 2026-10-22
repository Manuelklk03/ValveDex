import type { Entry } from "@/domain/entry";

export type EntryFact = {
  label: string;
  value: string;
};

export function getEntryFacts(entry: Entry): EntryFact[] {
  switch (entry.category) {
    case "weapons":
      return [
        { label: "Ranura del inventario", value: String(entry.details.slot) },
        ...(entry.details.ammo
          ? [{ label: "Munición", value: entry.details.ammo }]
          : []),
      ];
    case "maps":
      return [{ label: "Capítulo", value: String(entry.details.chapter) }];
    case "characters":
      return [{ label: "Afiliación", value: entry.details.affiliation }];
    case "enemies":
      return [{ label: "Origen", value: entry.details.origin }];
    case "trivia":
    case "easter-eggs":
      return [];
  }
}
