import type { Entry } from "@/domain/entry";
import { halfLifeChapters } from "./half-life-chapters";
import { halfLifeWeapons } from "./half-life-weapons";
import { halfLifeEnemies } from "./half-life-enemies";
import { halfLifeCharacters } from "./half-life-characters";
import { halfLifeExtras } from "./half-life-extras";
import { blueShiftEntries } from "./blue-shift";
import { opposingForceEntries } from "./opposing-force";
import {
  halfLifeDecayChapters,
  halfLifeDecayCharacters,
  halfLifeDecayExtras,
} from "./half-life-decay";
import {
  halfLife2Chapters,
  halfLife2Weapons,
  halfLife2Characters,
  halfLife2Enemies,
  halfLife2Extras,
} from "./half-life-2-content";
import { expansionAppearances } from "./expansion-appearances";

const baseEntries: Entry[] = [
  ...halfLifeChapters,
  ...halfLifeWeapons,
  ...halfLifeEnemies,
  ...halfLifeCharacters,
  ...halfLifeExtras,
  ...opposingForceEntries,
  ...blueShiftEntries,
  ...halfLifeDecayChapters,
  ...halfLifeDecayCharacters,
  ...halfLifeDecayExtras,
  ...halfLife2Chapters,
  ...halfLife2Weapons,
  ...halfLife2Characters,
  ...halfLife2Enemies,
  ...halfLife2Extras,
  {
    id: "goldsrc-engine",
    slug: "motor-goldsrc",
    name: "El motor GoldSrc",
    category: "trivia",
    summary:
      "Half-Life y sus expansiones funcionan con GoldSrc, una versión muy modificada del motor de Quake con algunos arreglos tomados del de Quake II.",
    notes: [
      "«GoldSrc» no es un nombre oficial: Valve lo usaba internamente. Según Erik Johnson, días antes del lanzamiento de Half-Life separaron el código en dos ramas, $/Goldsrc (lo que se iba a publicar) y $/Src (lo nuevo), y de ahí salieron «GoldSource» y «Source».",
      "Antes del lanzamiento, varias revistas de informática describían el motor como basado en la «Quake Unified Technology».",
      "Sus mapas usan el formato .BSP, tan parecido al de Quake que las primeras versiones de Hammer podían editar mapas de Quake y Quake II. Las texturas van en archivos .WAD (WAD3), en los que cada textura tiene su propia paleta.",
      "En 2001 Valve cambió su código de red por uno con «compensación de latencia», para que los jugadores con mucho ping pudieran jugar bien en línea.",
      "Además de los juegos de Half-Life, lo usaron Counter-Strike, Team Fortress Classic y Gunman Chronicles.",
    ],
    appearances: [
      { gameId: "half-life" },
      { gameId: "half-life-opposing-force" },
      { gameId: "half-life-blue-shift" },
    ],
    sources: [
      {
        title: "GoldSrc - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/GoldSrc",
        kind: "wiki",
      },
    ],
  },
  {
    id: "gordon-employee-of-the-month",
    slug: "gordon-empleado-del-mes",
    name: "Gordon, empleado del mes",
    category: "easter-eggs",
    summary:
      "En una oficina del capítulo Friendly Fire de Opposing Force cuelga una foto de Gordon Freeman como «Empleado del mes».",
    appearances: [{ gameId: "half-life-opposing-force" }],
    sources: [
      {
        title: "Gordon Freeman - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Gordon_Freeman",
        kind: "wiki",
      },
      {
        title:
          "Half-Life: Opposing Force storyline (Friendly Fire) - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Half-Life:_Opposing_Force_storyline#Chapter_5:_Friendly_Fire",
        kind: "wiki",
      },
    ],
  },
];

// Añade a cada ficha de Half-Life 1 sus apariciones en las expansiones
export const entries: Entry[] = baseEntries.map((entry) => {
  const extra = expansionAppearances[entry.id];

  return extra
    ? { ...entry, appearances: [...entry.appearances, ...extra] }
    : entry;
});
