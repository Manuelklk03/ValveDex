import { entryRelations } from "@/data/entry-relations";
import type { Entry } from "@/domain/entry";
import type { EntryRelationType } from "@/domain/entry-relation";
import { getEntryById } from "./get-entries";

export type RelatedEntry = {
  label: string;
  entry: Entry;
};

const relationLabels: Record<
  EntryRelationType,
  { outgoing: string; incoming: string }
> = {
  "used-by": { outgoing: "Usada por", incoming: "Usa" },
  "found-in": { outgoing: "Aparece en", incoming: "Aparecen aquí" },
};

export function getRelatedEntries(entryId: string): RelatedEntry[] {
  return entryRelations.flatMap((relation) => {
    const labels = relationLabels[relation.type];

    if (relation.fromId === entryId) {
      const entry = getEntryById(relation.toId);
      return entry ? [{ label: labels.outgoing, entry }] : [];
    }

    if (relation.toId === entryId) {
      const entry = getEntryById(relation.fromId);
      return entry ? [{ label: labels.incoming, entry }] : [];
    }

    return [];
  });
}
