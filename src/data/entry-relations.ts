import type { EntryRelation } from "@/domain/entry-relation";

export const entryRelations: EntryRelation[] = [
  { fromId: "crowbar", toId: "gordon-freeman", type: "used-by" },
  { fromId: "gordon-freeman", toId: "black-mesa-inbound", type: "found-in" },
  // Mismo personaje con otro modelo y otra cara en Half-Life 2: cada versión es su propia ficha
  {
    fromId: "gordon-freeman",
    toId: "hl2-gordon-freeman",
    type: "same-character",
  },
  { fromId: "g-man", toId: "hl2-g-man", type: "same-character" },
  {
    fromId: "barney-calhoun",
    toId: "hl2-barney-calhoun",
    type: "same-character",
  },
  { fromId: "eli-vance", toId: "hl2-eli-vance", type: "same-character" },
  {
    fromId: "isaac-kleiner",
    toId: "hl2-isaac-kleiner",
    type: "same-character",
  },
];
