export type UniverseStatus = "available" | "coming-soon";

export type Universe = {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: UniverseStatus;
};
