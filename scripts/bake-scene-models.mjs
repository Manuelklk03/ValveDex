// Hornea los modelos animados de las escenas de la mesa-mapa de Universos (public/models/scenes/<universo>/).
// Cada modelo sale con sus clips como objetivos de morfado (ver scripts/source-mdl-to-glb.mjs, variable ANIM).
// Uso: node scripts/bake-scene-models.mjs <universo> [filtro]    (por ahora: l4d)
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const STEAM = "H:/SteamLibrary/steamapps/common";
const [universe, filter] = process.argv.slice(2);

// Un infiernado común corre y cae; un superviviente apunta con el arma de su pose de reposo
const COMMON = "run=Run_01@auto:8:loop,fall=Fall_01:8";
const jobs = {
  l4d: [
    ...[
      ["bill", "survivor_namvet", "Idle_Standing_Rifle"],
      ["zoey", "survivor_teenangst", "Idle_Standing_SMG"],
      ["louis", "survivor_manager", "Idle_Standing_PumpShotgun"],
      ["francis", "survivor_biker", "Idle_Standing_PumpShotgun"],
    ].map(([name, model, pose]) => ({
      out: `l4d1-${name}`,
      game: "left 4 dead",
      mod: "l4d",
      model: `survivors/${model}`,
      anim: `aim=${pose}:1`,
    })),
    ...[
      "common_male01",
      "common_female01",
      "common_police_male01",
      "common_worker_male01",
    ].map((name) => ({
      out: `l4d1-${name}`,
      game: "left 4 dead",
      mod: "l4d",
      model: `infected/${name}`,
      anim: COMMON,
      texture: 256,
    })),
    ...[
      ["hunter", "run=Run_Upper_KNIFE@auto:8:loop,fall=deathpose_front:4"],
      ["smoker", "run=Run_Upper_KNIFE@auto:8:loop,fall=deathpose_front:4"],
      ["boomer", "run=Run_Upper_KNIFE@auto:8:loop,fall=deathpose_front:4"],
      ["hulk", "run=Run_1@auto:8:loop,fall=deathpose_front:4"],
    ].map(([name, anim]) => ({
      out: `l4d1-${name}`,
      game: "left 4 dead",
      mod: "l4d",
      model: `infected/${name}`,
      anim,
    })),
    ...[
      ["coach", "survivor_coach", "Idle_Standing_PumpShotgun"],
      ["ellis", "survivor_mechanic", "Idle_Standing_Rifle"],
      ["nick", "survivor_gambler", "Idle_Standing_Pistol"],
      ["rochelle", "survivor_producer", "Idle_Standing_SMG"],
    ].map(([name, model, pose]) => ({
      out: `l4d2-${name}`,
      game: "Left 4 Dead 2",
      mod: "l4d2",
      model: `survivors/${model}`,
      anim: `aim=${pose}:1`,
    })),
    ...[
      ["hunter", "run=Run_Upper_KNIFE@auto:8:loop"],
      ["smoker", "run=Run_Upper_KNIFE@auto:8:loop,fall=deathpose_front:4"],
      ["boomer", "run=Run_Upper_KNIFE@auto:8:loop,fall=deathpose_front:4"],
      ["hulk", "run=Run_1@auto:8:loop,fall=deathpose_front:4"],
      ["charger", "run=Charger_Run@auto:8:loop"],
      ["jockey", "run=Run@auto:8:loop"],
      ["spitter", "run=Run@auto:8:loop"],
    ].map(([name, anim]) => ({
      out: `l4d2-${name}`,
      game: "Left 4 Dead 2",
      mod: "l4d2",
      model: `infected/${name}`,
      anim,
    })),
  ],
};

if (!jobs[universe])
  throw new Error(`Universo sin trabajos: ${universe} (${Object.keys(jobs)})`);
const dir = `public/models/scenes/${universe}`;
mkdirSync(dir, { recursive: true });
for (const job of jobs[universe]) {
  if (filter && !job.out.includes(filter)) continue;
  try {
    const out = execFileSync(
      "node",
      [
        "scripts/source-mdl-to-glb.mjs",
        `${STEAM}/${job.game}`,
        job.mod,
        `models/${job.model}.mdl`,
        `${dir}/${job.out}.glb`,
        "",
        "0",
      ],
      {
        env: {
          ...process.env,
          ANIM: job.anim,
          GLB_TEXTURE_MAX: String(job.texture ?? 512),
        },
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    console.log(out.trim().split("\n").pop());
  } catch (error) {
    console.log(
      `${job.out}: ERROR ${String(error.stderr ?? error.message)
        .trim()
        .split("\n")
        .slice(-2)
        .join(" | ")}`,
    );
  }
}
