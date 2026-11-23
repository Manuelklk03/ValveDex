import { getUniverses } from "@/features/universes/get-universes";
import { getValveHardware } from "./get-valve-hardware";
import { getValvePeople } from "./get-valve-people";

// Un nombre del texto que lleva a su página: una saga, una persona, un dispositivo o Steam
export type Mention = {
  label: string;
  // Qué es, en una palabra («Saga», «Persona», «Hardware», «Plataforma»)
  kind: string;
  href: string;
};

type Term = { match: string; mention: Mention };

// Todos los nombres que se reconocen en los textos de la historia. Los más largos van antes, para que «Steam Deck» sea
// el dispositivo y no «Steam» a secas
export function getMentionTerms(): Term[] {
  const terms: Term[] = [
    ...getUniverses()
      .filter((universe) => universe.status === "available")
      .map((universe) => ({
        match: universe.name,
        mention: {
          label: universe.name,
          kind: "Saga",
          href: `/universos/${universe.slug}`,
        },
      })),
    ...getValvePeople().map((person) => ({
      match: person.name,
      mention: {
        label: person.name,
        kind: "Persona",
        href: `/valve/personas/${person.slug}`,
      },
    })),
    ...getValveHardware().map((device) => ({
      match: device.name,
      mention: {
        label: device.name,
        kind: "Hardware",
        href: "/valve/hardware",
      },
    })),
    {
      match: "Steam",
      mention: { label: "Steam", kind: "Plataforma", href: "/valve/steam" },
    },
  ];
  return terms.sort((a, b) => b.match.length - a.match.length);
}

// Menciones de un texto, en orden de aparición y sin repetir. Un trozo del texto solo cuenta para un nombre (el más largo)
export function findMentions(text: string, terms: Term[]): Mention[] {
  const lower = text.toLowerCase();
  const taken: [number, number][] = [];
  const found: { at: number; mention: Mention }[] = [];

  for (const { match, mention } of terms) {
    const needle = match.toLowerCase();
    let from = 0;
    for (;;) {
      const at = lower.indexOf(needle, from);
      if (at === -1) break;
      const end = at + needle.length;
      from = end;
      // Debe ser una palabra entera: «Steam» no cuenta dentro de «Steamboat»
      const isWordChar = (char: string | undefined) =>
        !!char && /[\p{L}\p{N}]/u.test(char);
      if (isWordChar(text[at - 1]) || isWordChar(text[end])) continue;
      const overlaps = taken.some(([a, b]) => at < b && end > a);
      if (overlaps) continue;
      taken.push([at, end]);
      if (
        !found.some(
          (item) =>
            item.mention.href === mention.href &&
            item.mention.label === mention.label,
        )
      ) {
        found.push({ at, mention });
      }
    }
  }

  return found.sort((a, b) => a.at - b.at).map((item) => item.mention);
}
