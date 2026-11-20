import type { NavMenuGroup } from "@/components/ui/nav-menu";
import { lineIcons } from "@/data/universe-art";
import { universePalettes } from "@/data/universe-palettes";
import { getGameYearLabel } from "@/features/games/get-game-year-label";
import {
  getOfficialGamesByUniverse,
  getUniverses,
} from "@/features/universes/get-universes";
import { getValvePeople } from "@/features/valve/get-valve-people";

// Menú «Universos»: una columna por saga disponible con su emblema, su color de marca y sus juegos oficiales
export function getUniverseMenuGroups(): NavMenuGroup[] {
  return getUniverses()
    .filter((universe) => universe.status === "available")
    .map((universe) => {
      const emblem =
        lineIcons[`emblem-${universe.id}` as keyof typeof lineIcons];

      return {
        title: universe.name,
        href: `/universos/${universe.slug}`,
        accent: universePalettes[universe.id]?.accent,
        emblem: emblem?.src,
        links: getOfficialGamesByUniverse(universe.id).map((game) => ({
          label: game.name,
          href: `/universos/${universe.slug}/${game.slug}`,
          detail: getGameYearLabel(game),
        })),
      };
    })
    .filter((group) => group.links.length > 0);
}

// Menú «Valve»: la empresa, Steam y las figuras clave
export function getValveMenuGroups(): NavMenuGroup[] {
  return [
    {
      title: "La empresa",
      href: "/valve",
      links: [
        { label: "Historia", href: "/valve/historia", detail: "desde 1996" },
        { label: "Steam", href: "/valve/steam", detail: "por épocas" },
        { label: "Hardware", href: "/valve/hardware" },
        { label: "Gente", href: "/valve/personas" },
        { label: "Créditos y fuentes", href: "/creditos" },
      ],
    },
    {
      title: "Figuras clave",
      links: getValvePeople()
        .slice(0, 6)
        .map((person) => ({
          label: person.name,
          href: `/valve/personas/${person.slug}`,
        })),
    },
  ];
}
