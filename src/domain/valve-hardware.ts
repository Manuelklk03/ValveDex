import type { Source } from "./source";

export type ValveHardwareCategory =
  "controller" | "streaming" | "pc" | "vr" | "handheld";

export type HardwareSpec = {
  label: string;
  value: string;
};

export type ValveHardware = {
  id: string;
  slug: string;
  name: string;
  year: number;
  category: ValveHardwareCategory;
  tagline: string;
  summary: string;
  specs: HardwareSpec[];
  sources: Source[];
};
