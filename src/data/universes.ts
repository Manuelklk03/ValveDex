import type { Universe } from "@/domain/universe";

export const universes: Universe[] = [
  {
    id: "half-life",
    slug: "half-life",
    name: "Half-Life",
    description:
      "La saga de Black Mesa, la invasión de Xen y la Ciudad 17 bajo la Alianza.",
    status: "available",
  },
  {
    id: "portal",
    slug: "portal",
    name: "Portal",
    description:
      "Puzles en primera persona con un dispositivo de portales, las cámaras de pruebas de Aperture Science y la IA GLaDOS.",
    status: "available",
  },
  {
    id: "team-fortress",
    slug: "team-fortress",
    name: "Team Fortress",
    description:
      "Shooter multijugador por equipos con clases únicas, humor y estilo inconfundible.",
    status: "available",
  },
  {
    id: "counter-strike",
    slug: "counter-strike",
    name: "Counter-Strike",
    description:
      "Shooter táctico por rondas de terroristas contra antiterroristas, desde el mod de 1999 hasta Counter-Strike 2.",
    status: "available",
  },
  {
    id: "left-4-dead",
    slug: "left-4-dead",
    name: "Left 4 Dead",
    description:
      "Supervivencia cooperativa frente a hordas de infectados, con IA dinámica y personajes memorables.",
    status: "available",
  },
];
