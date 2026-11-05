import { valveHardware } from "@/data/valve-hardware";
import type { ValveHardware } from "@/domain/valve-hardware";

export function getValveHardware(): ValveHardware[] {
  return [...valveHardware].sort((a, b) => a.year - b.year);
}

export function getValveHardwareBySlug(
  slug: string,
): ValveHardware | undefined {
  return valveHardware.find((device) => device.slug === slug);
}
