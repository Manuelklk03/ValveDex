export type EntryRelationType = "used-by" | "found-in";

export type EntryRelation = {
  fromId: string;
  toId: string;
  type: EntryRelationType;
};
