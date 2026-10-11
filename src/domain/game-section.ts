export type GameSectionId =
  | "lore"
  | "maps"
  | "weapons"
  | "characters"
  | "enemies"
  | "trivia"
  | "easter-eggs";

export type GameSection = {
  id: GameSectionId;
  slug: string;
  name: string;
  description: string;
};
