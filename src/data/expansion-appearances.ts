import type { EntryAppearance } from "@/domain/entry";

// Fichas de Half-Life 1 que también salen en las expansiones (Z4). Cada una cita en sus
// fuentes su página de Combine OverWiki, cuya lista de apariciones respalda estos datos.
// Solo la campaña: lo que únicamente está en multijugador irá al futuro apartado «Multijugador».

const opposingForce: string[] = [
  "glock-17",
  "mp5",
  "spas-12",
  "rpg",
  "hand-grenade",
  "satchel-charge",
  "tripmine",
  "snark",
  "zombie",
  "houndeye",
  "bullsquid",
  "barnacle",
  "vortigaunt",
  "alien-grunt",
  "alien-controller",
  "ichthyosaur",
  "gargantua",
  "tentacle",
  "leech",
  "hecu-marine",
  "female-assassin",
  "sentry-gun",
  "apache",
  "osprey",
  "g-man",
  "black-mesa-security-guards",
  "black-mesa-scientists",
];

const blueShift: string[] = [
  "crowbar",
  "glock-17",
  "colt-python",
  "mp5",
  "spas-12",
  "rpg",
  "hand-grenade",
  "satchel-charge",
  "snark",
  "zombie",
  "houndeye",
  "bullsquid",
  "barnacle",
  "vortigaunt",
  "alien-grunt",
  "alien-controller",
  "hecu-marine",
  "sentry-gun",
  "apache",
  "g-man",
  "black-mesa-security-guards",
  "black-mesa-scientists",
];

// Apariciones con resumen propio
const withSummary: Record<string, EntryAppearance[]> = {
  "barney-calhoun": [
    {
      gameId: "half-life-blue-shift",
      summary:
        "Protagonista de Blue Shift: un guardia de seguridad de nivel 3 de la unidad Blue Shift, que vive en los dormitorios del Área 8. En el juego solo le llaman «Calhoun»; su nombre aparece en el manual.",
    },
  ],
};

// Fichas de Half-Life 1 que también salen en Half-Life: Decay. Comprobadas una a una en la
// lista de apariciones de su página de Combine OverWiki. Quedan fuera el cañón tau, el cañón
// de gluones, la ballesta, el revólver .357 y las criaturas que la wiki no lista en Decay
// (barnacle, ictiosaurio, gonarca, gargantúa, tentáculo y sanguijuela).
const decay: string[] = [
  "crowbar",
  "glock-17",
  "mp5",
  "spas-12",
  "rpg",
  "hivehand",
  "hand-grenade",
  "satchel-charge",
  "tripmine",
  "snark",
  "headcrab",
  "zombie",
  "houndeye",
  "bullsquid",
  "vortigaunt",
  "alien-grunt",
  "alien-controller",
  "hecu-marine",
  "female-assassin",
  "sentry-gun",
  "automatic-turret",
  "apache",
  "osprey",
  "g-man",
  "barney-calhoun",
  "black-mesa-security-guards",
  "black-mesa-scientists",
  "holographic-assistant",
  "rosenberg",
];

export const expansionAppearances: Record<string, EntryAppearance[]> = {};

for (const id of opposingForce) {
  (expansionAppearances[id] ??= []).push({
    gameId: "half-life-opposing-force",
  });
}
for (const id of blueShift) {
  (expansionAppearances[id] ??= []).push({ gameId: "half-life-blue-shift" });
}
for (const id of decay) {
  (expansionAppearances[id] ??= []).push({ gameId: "half-life-decay" });
}
for (const [id, appearances] of Object.entries(withSummary)) {
  (expansionAppearances[id] ??= []).push(...appearances);
}
