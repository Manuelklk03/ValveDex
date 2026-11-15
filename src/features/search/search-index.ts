import { getEntries } from "@/features/catalog/get-entries";
import { getGameSectionById } from "@/features/games/get-game-sections";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import { getUniverses } from "@/features/universes/get-universes";
import { getValvePeople } from "@/features/valve/get-valve-people";
import { games } from "@/data/games";
import { gameSections } from "@/data/game-sections";

export type SearchItemType = "universe" | "game" | "entry" | "person" | "page";

export type SearchItem = {
  type: SearchItemType;
  name: string;
  // Línea de contexto bajo el nombre: la categoría y el juego, el estudio, el rol…
  detail: string;
  href: string;
};

// Páginas fijas del sitio que también se buscan (incluido «Explorar», que ya no está en la cabecera)
const pages: SearchItem[] = [
  {
    type: "page",
    name: "Universos",
    detail: "Todas las sagas de Valve",
    href: "/universos",
  },
  {
    type: "page",
    name: "Explorar fichas",
    detail: "Armas, mapas, personajes y más de todos los juegos",
    href: "/explorar",
  },
  {
    type: "page",
    name: "Historia de Valve",
    detail: "Cronología de la empresa desde 1996",
    href: "/valve/historia",
  },
  {
    type: "page",
    name: "Steam",
    detail: "La plataforma por épocas",
    href: "/valve/steam",
  },
  {
    type: "page",
    name: "Hardware de Valve",
    detail: "Steam Deck, Index, Controller y más",
    href: "/valve/hardware",
  },
  {
    type: "page",
    name: "Créditos y fuentes",
    detail: "De dónde sale cada dato e imagen",
    href: "/creditos",
  },
];

// Índice de búsqueda: una entrada por universo, juego, ficha, persona y página. Se sirve como JSON estático
// (app/indice-busqueda) y el buscador lo descarga la primera vez que se abre
export function buildSearchIndex(): SearchItem[] {
  const universes = getUniverses().filter(
    (universe) => universe.status === "available",
  );
  const universeById = new Map(universes.map((u) => [u.id, u]));

  const categoryPages: SearchItem[] = gameSections
    .filter((section) => section.id !== "lore")
    .map((section) => ({
      type: "page" as const,
      name: `Explorar ${section.name.toLowerCase()}`,
      detail: "Todas las fichas de la categoría",
      href: `/explorar/${section.slug}`,
    }));

  const universeItems: SearchItem[] = universes.map((universe) => ({
    type: "universe",
    name: universe.name,
    detail: "Saga",
    href: `/universos/${universe.slug}`,
  }));

  const gameItems: SearchItem[] = games.flatMap((game) => {
    const universe = universeById.get(game.universeId);
    if (!universe) return [];

    return [
      {
        type: "game" as const,
        name: game.name,
        detail: `${universe.name} · ${getGameYearLabel(game)}`,
        href: `/universos/${universe.slug}/${game.slug}`,
      },
    ];
  });

  const gameNameById = new Map(games.map((game) => [game.id, game.name]));
  const entryItems: SearchItem[] = getEntries().map((entry) => {
    const section = getGameSectionById(entry.category);
    const firstGame = gameNameById.get(entry.appearances[0]?.gameId ?? "");

    return {
      type: "entry",
      name: entry.name,
      detail: [section?.name, firstGame].filter(Boolean).join(" · "),
      href: `/fichas/${entry.slug}`,
    };
  });

  const personItems: SearchItem[] = getValvePeople().map((person) => ({
    type: "person",
    name: person.name,
    detail: person.role,
    href: `/valve/personas/${person.slug}`,
  }));

  return [
    ...pages,
    ...categoryPages,
    ...universeItems,
    ...gameItems,
    ...personItems,
    ...entryItems,
  ];
}
