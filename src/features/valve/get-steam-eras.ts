import { steamEras } from "@/data/steam-eras";
import type { SteamEra } from "@/domain/steam-era";

// Las épocas en orden cronológico, con sus hechos también ordenados por año
export function getSteamEras(): SteamEra[] {
  return [...steamEras]
    .sort((a, b) => a.yearFrom - b.yearFrom)
    .map((era) => ({
      ...era,
      events: [...era.events].sort((a, b) => a.year - b.year),
    }));
}
