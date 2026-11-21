import type { MediaAsset } from "@/domain/media-asset";
import {
  getEntryAppearance,
  getEntryById,
  getEntryThumbnail,
} from "@/features/catalog/get-entries";

const GAME_ID = "team-fortress-2";

// Los nueve mercenarios de Team Fortress 2, en el orden de la pantalla de selección de clase
const classIds = [
  "tf-scout",
  "tf-soldier",
  "tf-pyro",
  "tf-demoman",
  "tf-heavy",
  "tf-engineer",
  "tf-medic",
  "tf-sniper",
  "tf-spy",
] as const;

export type Tf2Class = {
  id: string;
  // Nombre completo de la ficha y nombre corto de la clase, el que se ve bajo la figura
  name: string;
  label: string;
  href: string;
  // Render en equipo RED y, si existe, en equipo BLU
  red: MediaAsset;
  blu?: MediaAsset;
};

// Clases con imagen para el selector del dossier; una clase sin render propio se omite
export function getTf2Classes(): Tf2Class[] {
  return classIds.flatMap((id) => {
    const entry = getEntryById(id);
    if (!entry) return [];
    const red = getEntryThumbnail(entry, GAME_ID);
    if (!red) return [];
    const blu = getEntryAppearance(entry, GAME_ID)?.images?.teams?.blu;

    return [
      {
        id,
        name: entry.name,
        label: id.replace("tf-", "").toUpperCase(),
        href: `/fichas/${entry.slug}?juego=${GAME_ID}`,
        red,
        blu,
      },
    ];
  });
}
