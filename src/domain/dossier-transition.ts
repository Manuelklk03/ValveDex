// Entradas animadas a un dossier: cada juego de Half-Life abre su mundo a su manera
export const dossierTransitions = [
  "doors",
  "shutter",
  "gate",
  "crt",
  "slash",
  "flash",
  "rise",
  "scan",
] as const;

export type DossierTransition = (typeof dossierTransitions)[number];

export function isDossierTransition(
  value: string | null | undefined,
): value is DossierTransition {
  return (dossierTransitions as readonly string[]).includes(value ?? "");
}
