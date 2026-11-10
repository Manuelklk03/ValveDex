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
} from "./half-life-2";
import {
  halfLife2EpisodeAppearances,
  halfLife2MoreCharacters,
  halfLife2MoreEnemies,
  halfLife2MoreExtras,
  halfLife2MoreWeapons,
} from "./half-life-2-more";
import {
  episodeOneChapters,
  episodeOneCharacters,
  episodeOneEnemies,
  episodeOneExtras,
  episodeOneWeapons,
} from "./half-life-2-episode-one";
import {
  episodeTwoChapters,
  episodeTwoCharacters,
  episodeTwoEnemies,
  episodeTwoExtras,
  episodeTwoWeapons,
} from "./half-life-2-episode-two";
import {
  alyxChapters,
  alyxCharacters,
  alyxEnemies,
  alyxExtras,
  alyxWeapons,
} from "./half-life-alyx";
import {
  teamFortressCharacters,
  teamFortressWeapons,
  teamFortressMaps,
  teamFortressExtras,
} from "./team-fortress";
import {
  left4DeadCharacters,
  left4DeadEnemies,
  left4DeadWeapons,
  left4DeadMaps,
  left4DeadExtras,
} from "./left-4-dead";
import {
  halfLifeDreamcastEntries,
  halfLifeSourceExtras,
  svenCoOpEntries,
} from "./half-life-extra-games";
import {
  teamFortressEnemies,
  teamFortressMoreCharacters,
  teamFortressMoreExtras,
  teamFortressMoreMaps,
  teamFortressMoreWeapons,
} from "./team-fortress-expansion";
import {
  left4DeadMoreCharacters,
  left4DeadMoreEnemies,
  left4DeadMoreExtras,
  left4DeadMoreMaps,
  left4DeadMoreWeapons,
} from "./left-4-dead-expansion";
import { expansionAppearances } from "./expansion-appearances";
import { withSourceCaptures } from "./source-captures";
import { withWikiScreenshots } from "./wiki-screenshots";
import { withChapterCaptures } from "./chapter-captures";

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
  ...halfLife2MoreWeapons,
  ...halfLife2MoreEnemies,
  ...halfLife2MoreCharacters,
  ...halfLife2MoreExtras,
  ...episodeOneChapters,
  ...episodeOneCharacters,
  ...episodeOneEnemies,
  ...episodeOneExtras,
  ...episodeOneWeapons,
  ...episodeTwoChapters,
  ...episodeTwoCharacters,
  ...episodeTwoEnemies,
  ...episodeTwoExtras,
  ...episodeTwoWeapons,
  ...alyxChapters,
  ...alyxCharacters,
  ...alyxEnemies,
  ...alyxExtras,
  ...alyxWeapons,
  ...teamFortressCharacters,
  ...teamFortressWeapons,
  ...teamFortressMaps,
  ...teamFortressExtras,
  ...left4DeadCharacters,
  ...left4DeadEnemies,
  ...left4DeadWeapons,
  ...left4DeadMaps,
  ...left4DeadExtras,
  ...left4DeadMoreMaps,
  ...left4DeadMoreWeapons,
  ...left4DeadMoreEnemies,
  ...left4DeadMoreCharacters,
  ...left4DeadMoreExtras,
  ...teamFortressMoreMaps,
  ...teamFortressMoreWeapons,
  ...teamFortressMoreCharacters,
  ...teamFortressEnemies,
  ...teamFortressMoreExtras,
  ...svenCoOpEntries,
  ...halfLifeDreamcastEntries,
  ...halfLifeSourceExtras,
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

// Apariciones añadidas por id: Half-Life 1 en sus expansiones y Half-Life 2 en sus episodios
const extraAppearances = {
  ...expansionAppearances,
  ...halfLife2EpisodeAppearances,
};

export const entries: Entry[] = baseEntries.map((entry) => {
  const extra = extraAppearances[entry.id];

  return withChapterCaptures(
    withWikiScreenshots(
      withSourceCaptures(
        extra
          ? { ...entry, appearances: [...entry.appearances, ...extra] }
          : entry,
      ),
    ),
  );
});
