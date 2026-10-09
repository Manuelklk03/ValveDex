import type { Universe } from "@/domain/universe";

export const universes: Universe[] = [
  {
    id: "half-life",
    slug: "half-life",
    name: "Half-Life",
    description: "La saga de Gordon Freeman, Black Mesa y la invasión de Xen.",
    status: "available",
  },
  {
    id: "portal",
    slug: "portal",
    name: "Portal",
    description: "Pruebas de lógica en Aperture Science junto a GLaDOS.",
    status: "coming-soon",
  },
  {
    id: "team-fortress",
    slug: "team-fortress",
    name: "Team Fortress",
    description: "Shooter multijugador por equipos con clases.",
    status: "coming-soon",
  },
  {
    id: "counter-strike",
    slug: "counter-strike",
    name: "Counter-Strike",
    description: "Shooter táctico de terroristas contra antiterroristas.",
    status: "coming-soon",
  },
  {
    id: "left-4-dead",
    slug: "left-4-dead",
    name: "Left 4 Dead",
    description: "Supervivencia cooperativa frente a hordas de infectados.",
    status: "coming-soon",
  },
];
