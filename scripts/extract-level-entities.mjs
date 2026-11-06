// Para qué sirve: lee la lista de entidades de los mapas (.bsp) de un juego instalado y cuenta
// los personajes, enemigos y armas que cada nivel coloca. Genera src/data/levels/map-entities.ts,
// que ValveDex usa para enlazar cada nivel con sus fichas. Los datos salen de los archivos del juego.
//
// Uso: node scripts/extract-level-entities.mjs "<carpeta de mapas>" <prefijo> [...más pares]
// Ejemplo (Half-Life 2 y episodios, y Half-Life 1 con sus expansiones; prefijo * = todos los mapas):
//   node scripts/extract-level-entities.mjs "<HL2>/hl2/maps" d "<HL2>/episodic/maps" ep1_ "<HL2>/ep2/maps" ep2_ "<HL>/valve/maps" "*" "<HL>/gearbox/maps" "*" "<HL>/bshift/maps" "*"
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const pairs = process.argv.slice(2);

if (pairs.length < 2 || pairs.length % 2 !== 0) {
  console.error(
    "Uso: node scripts/extract-level-entities.mjs <carpeta de mapas> <prefijo> [<carpeta de mapas> <prefijo>...]",
  );
  process.exit(1);
}

// Solo las clases que ValveDex enlaza con fichas: personajes, enemigos y armas
const interesting = /^(npc_|monster_|weapon_|item_ammo_crate$)/;

// Source (VBSP): ident «VBSP», versión y 64 lumps de 16 bytes; GoldSrc: versión 30 y 15 lumps de 8 bytes
function readEntityLump(buffer) {
  if (buffer.toString("latin1", 0, 4) === "VBSP") {
    const offset = buffer.readInt32LE(8);
    const length = buffer.readInt32LE(12);
    const fourCC = buffer.readInt32LE(20);
    if (fourCC !== 0) throw new Error("lump de entidades comprimido");
    return buffer.toString("latin1", offset, offset + length);
  }
  const offset = buffer.readInt32LE(4);
  const length = buffer.readInt32LE(8);
  return buffer.toString("latin1", offset, offset + length);
}

function countEntities(text) {
  const counts = {};
  const add = (key) => {
    counts[key] = (counts[key] ?? 0) + 1;
  };

  for (const block of text.matchAll(/\{([^}]*)\}/g)) {
    const entity = {};
    for (const pair of block[1].matchAll(/"([^"]*)"\s+"([^"]*)"/g)) {
      entity[pair[1]] = pair[2];
    }

    const classname = entity.classname ?? "";
    if (interesting.test(classname)) {
      // Los soldados élite de Combine son npc_combine_s con otro modelo
      const elite =
        classname === "npc_combine_s" &&
        /super_soldier/i.test(entity.model ?? "");
      add(elite ? "npc_combine_s_elite" : classname);
    }

    // Los generadores de NPC (npc_maker) y las cápsulas indican qué criaturas aparecen
    if (entity.NPCType && interesting.test(entity.NPCType)) add(entity.NPCType);

    // game_player_equip entrega armas al jugador sin colocarlas en el mapa
    if (classname === "game_player_equip") {
      for (const key of Object.keys(entity)) {
        if (key.startsWith("weapon_")) add(key);
      }
    }
  }

  return counts;
}

const result = {};

for (let i = 0; i < pairs.length; i += 2) {
  const dir = pairs[i];
  const prefix = pairs[i + 1];

  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".bsp")) continue;
    if (prefix !== "*" && !file.startsWith(prefix)) continue;
    if (/background|_demo$/i.test(file.replace(".bsp", ""))) continue;

    const mapFile = file.replace(/\.bsp$/, "");

    try {
      result[mapFile] = countEntities(
        readEntityLump(readFileSync(join(dir, file))),
      );
    } catch (error) {
      console.warn(`Se omite ${file}: ${error.message}`);
    }
  }
}

const names = Object.keys(result).sort();
const body = names
  .map((name) => `  ${name}: ${JSON.stringify(result[name])},`)
  .join("\n");

writeFileSync(
  "src/data/levels/map-entities.ts",
  `// Generado por scripts/extract-level-entities.mjs a partir de los archivos .bsp del juego.
// Cuenta, por mapa, las clases de personaje, enemigo y arma que el nivel coloca. No editar a mano.
export const mapEntities: Record<string, Record<string, number>> = {
${body}
};
`,
);

console.log(`${names.length} mapas procesados`);
