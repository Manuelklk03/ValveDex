import type { GameSection } from "@/domain/game-section";

export const gameSections: GameSection[] = [
  {
    id: "lore",
    slug: "lore",
    name: "Lore",
    description: "Historia, contexto y cronología del juego.",
  },
  {
    id: "maps",
    slug: "mapas",
    name: "Mapas",
    description: "Capítulos y localizaciones.",
  },
  {
    id: "weapons",
    slug: "armas",
    name: "Armas",
    description: "Armamento disponible y sus características.",
  },
  {
    id: "characters",
    slug: "personajes",
    name: "Personajes",
    description: "Protagonistas, aliados y otros personajes.",
  },
  {
    id: "enemies",
    slug: "enemigos",
    name: "Enemigos",
    description: "Criaturas y soldados a los que te enfrentas.",
  },
  {
    id: "trivia",
    slug: "curiosidades",
    name: "Curiosidades",
    description: "Datos de desarrollo y detalles poco conocidos.",
  },
  {
    id: "easter-eggs",
    slug: "easter-eggs",
    name: "Easter eggs",
    description: "Secretos y guiños escondidos.",
  },
];
