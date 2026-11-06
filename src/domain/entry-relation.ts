// «same-character»: la misma figura con otro diseño en otro juego (por ejemplo, Isaac Kleiner de
// Half-Life 1 y el de Half-Life 2, que son fichas distintas porque tienen modelos distintos)
export type EntryRelationType = "used-by" | "found-in" | "same-character";

export type EntryRelation = {
  fromId: string;
  toId: string;
  type: EntryRelationType;
};
