import type { EntryRelation } from "./../domain/entry-relation";

export const entryRelations: EntryRelation[] = [
  { fromId: "crowbar", toId: "gordon-freeman", type: "used-by" },
  { fromId: "gordon-freeman", toId: "black-mesa-inbound", type: "found-in" },
];
