// Hornea los modelos animados de las escenas de la mesa-mapa de Universos (public/models/scenes/<universo>/).
// Cada modelo sale con sus clips como objetivos de morfado (ver scripts/source-mdl-to-glb.mjs, variable ANIM).
// Uso: node scripts/bake-scene-models.mjs <universo> [filtro]    (por ahora: l4d)
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const STEAM = "H:/SteamLibrary/steamapps/common";
const [universe, filter] = process.argv.slice(2);

// Un infiernado común corre y cae; un superviviente apunta con el arma de su pose de reposo
const COMMON = "run=Run_01@auto:8:loop,fall=Fall_01:8";
// Un superviviente: apuntar (pose fija), disparar (aditiva sobre la pose de apuntar) y recargar (capa de brazos)
const survivorClips = (idle, shoot, reload) =>
  `aim=Idle_Standing_${idle}:1,` +
  `shoot=Shoot_Standing_${shoot}+Idle_Standing_${idle}:6:loop,` +
  `reload=Reload_Standing_${reload}+Idle_Standing_${idle}:10`;
const jobs = {
  l4d: [
    ...[
      [
        "bill",
        "survivor_namvet",
        "w_rifle_m16a2",
        "Rifle",
        "Rifle",
        "Rifle_layer",
      ],
      ["zoey", "survivor_teenangst", "w_smg_uzi", "SMG", "SMG", "SMG_layer"],
      [
        "louis",
        "survivor_manager",
        "w_autoshot_m4super",
        "PumpShotgun",
        "XM1014",
        "PumpShotgun_start",
      ],
      [
        "francis",
        "survivor_biker",
        "w_shotgun",
        "PumpShotgun",
        "PumpShotgun",
        "PumpShotgun_start",
      ],
    ].map(([name, model, weapon, idle, shoot, reload]) => ({
      out: `l4d1-${name}`,
      game: "left 4 dead",
      mod: "l4d",
      model: `survivors/${model}`,
      anim: survivorClips(idle, shoot, reload),
      attach: `models/w_models/weapons/${weapon}.mdl`,
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
      [
        "coach",
        "survivor_coach",
        "w_shotgun_spas",
        "PumpShotgun",
        "XM1014",
        "PumpShotgun_start",
      ],
      [
        "ellis",
        "survivor_mechanic",
        "w_rifle_ak47",
        "Rifle",
        "Rifle",
        "Rifle_layer",
      ],
      [
        "nick",
        "survivor_gambler",
        "w_pistol_a",
        "Pistol",
        "PISTOL",
        "Pistol_layer",
      ],
      ["rochelle", "survivor_producer", "w_smg_uzi", "SMG", "SMG", "SMG_layer"],
    ].map(([name, model, weapon, idle, shoot, reload]) => ({
      out: `l4d2-${name}`,
      game: "Left 4 Dead 2",
      mod: "l4d2",
      model: `survivors/${model}`,
      anim: survivorClips(idle, shoot, reload),
      attach: `models/w_models/weapons/${weapon}.mdl`,
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
          ...(job.attach && { ATTACH: `ValveBiped.weapon_bone|${job.attach}` }),
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
