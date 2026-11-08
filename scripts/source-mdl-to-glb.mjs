// Convierte un modelo del motor Source (.mdl v44-49 + .vvd + .vtx) a .glb, leyéndolo de los VPK del juego.
// Pose: la de referencia (los vértices del .vvd ya vienen en ella). Cuerpo por defecto y primera piel.
// Uso: node scripts/source-mdl-to-glb.mjs <carpeta del juego> <mod> <modelo> <salida.glb> [cuerpos] [piel]
//   node scripts/source-mdl-to-glb.mjs "H:/SteamLibrary/steamapps/common/Half-Life 2" hl2 models/weapons/w_crowbar.mdl w_crowbar.glb
// <mod>: hl2, episodic o ep2 (ep2 lee antes de episodic y de hl2). [cuerpos]: submodelo de cada parte, como 0,1,0.
import { openMount } from "./lib/vpk.mjs";
import { decodeVtf } from "./lib/vtf.mjs";
import { writeGlb } from "./lib/glb.mjs";

const [root, mod, modelPath, output, bodiesArg, skinArg] =
  process.argv.slice(2);
if (!root || !mod || !modelPath || !output)
  throw new Error(
    "Uso: node scripts/source-mdl-to-glb.mjs <carpeta del juego> <mod> <modelo> <salida.glb> [cuerpos] [piel]",
  );
const bodies = bodiesArg ? bodiesArg.split(",").map(Number) : [];
const skin = Number(skinArg ?? 0);
if ([...bodies, skin].some((n) => !Number.isInteger(n) || n < 0))
  throw new Error("Cuerpos y piel deben ser enteros desde 0");

const MOUNTS = {
  hl2: ["hl2"],
  episodic: ["episodic", "hl2"],
  ep2: ["ep2", "episodic", "hl2"],
};
if (!MOUNTS[mod])
  throw new Error(`Mod desconocido: ${mod} (${Object.keys(MOUNTS)})`);
const vpk = openMount(root, MOUNTS[mod]);

const base = modelPath.replace(/\.mdl$/i, "");
const mdl = vpk.read(modelPath);
if (!mdl) throw new Error(`${modelPath}: no está en los VPK de ${mod}`);
if (
  mdl.toString("latin1", 0, 4) !== "IDST" ||
  mdl.readInt32LE(4) < 44 ||
  mdl.readInt32LE(4) > 49
)
  throw new Error(
    `${modelPath}: no es un .mdl de Source v44-49 (versión ${mdl.readInt32LE(4)})`,
  );
const vvd = vpk.read(`${base}.vvd`);
const vtx = vpk.read(`${base}.dx90.vtx`) ?? vpk.read(`${base}.dx80.vtx`);
if (!vvd || !vtx) throw new Error(`${modelPath}: faltan el .vvd o el .vtx`);
const checksum = mdl.readInt32LE(8);
if (vvd.readInt32LE(8) !== checksum || vtx.readInt32LE(16) !== checksum)
  throw new Error(
    `${modelPath}: el .mdl, el .vvd y el .vtx no son del mismo modelo`,
  );

const i32 = (b, o) => b.readInt32LE(o);
const u16 = (b, o) => b.readUInt16LE(o);
const cstr = (b, o) => b.toString("latin1", o, b.indexOf(0, o));

// Vértices del .vvd (nivel de detalle 0). Con "fixups" se recomponen a partir de trozos.
const vertexStart = i32(vvd, 56);
const vertexIndexes = [];
if (i32(vvd, 48) === 0) {
  for (let v = 0; v < i32(vvd, 16); v++) vertexIndexes.push(v);
} else {
  for (let f = 0; f < i32(vvd, 48); f++) {
    const fixup = i32(vvd, 52) + f * 12;
    if (i32(vvd, fixup) < 0) continue;
    for (let v = 0; v < i32(vvd, fixup + 8); v++)
      vertexIndexes.push(i32(vvd, fixup + 4) + v);
  }
}
const vertexAt = (i) => {
  const o = vertexStart + vertexIndexes[i] * 48;
  return {
    pos: [0, 1, 2].map((k) => vvd.readFloatLE(o + 16 + k * 4)),
    nrm: [0, 1, 2].map((k) => vvd.readFloatLE(o + 28 + k * 4)),
    uv: [vvd.readFloatLE(o + 40), vvd.readFloatLE(o + 44)],
  };
};

// Pieles: cada malla apunta a una textura mediante la tabla de la familia elegida
const skinRefCount = i32(mdl, 220);
if (skin >= i32(mdl, 224))
  throw new Error(
    `${modelPath}: no tiene la piel ${skin} (familias: ${i32(mdl, 224)})`,
  );
const skinRef = (material) =>
  mdl.readInt16LE(i32(mdl, 228) + (skin * skinRefCount + material) * 2);

// Triángulos de un grupo de tiras del .vtx. El tamaño del encabezado cambia entre versiones: se prueba cada uno.
function readStripGroups(mesh, headerSize) {
  const groups = [];
  for (let g = 0; g < i32(vtx, mesh); g++) {
    const sg = mesh + i32(vtx, mesh + 4) + g * headerSize;
    const [numVerts, vertOffset, numIndices, indexOffset] = [0, 4, 8, 12].map(
      (k) => i32(vtx, sg + k),
    );
    const origin = [];
    for (let v = 0; v < numVerts; v++)
      origin.push(u16(vtx, sg + vertOffset + v * 9 + 4));
    const index = [];
    for (let n = 0; n < numIndices; n++) {
      const value = u16(vtx, sg + indexOffset + n * 2);
      if (value >= numVerts) throw new Error("índice fuera de rango");
      index.push(value);
    }
    groups.push({ origin, index, flags: vtx[sg + 24] });
  }
  return groups;
}
function stripGroups(mesh) {
  for (const size of [25, 33]) {
    try {
      return readStripGroups(mesh, size);
    } catch {
      /* se prueba el siguiente tamaño */
    }
  }
  throw new Error("no se pudo leer un grupo de tiras del .vtx");
}

// Recorre partes del cuerpo -> submodelo elegido -> mallas del nivel 0, agrupando por textura
const groups = new Map();
const bodyPartCount = i32(mdl, 232);
if (bodyPartCount !== i32(vtx, 28))
  throw new Error("el .mdl y el .vtx no coinciden en las partes del cuerpo");
for (let p = 0; p < bodyPartCount; p++) {
  const part = i32(mdl, 236) + p * 16;
  const choice = bodies[p] ?? 0;
  if (choice >= i32(mdl, part + 4))
    throw new Error(
      `${modelPath}: la parte ${p} no tiene el submodelo ${choice}`,
    );
  const model = part + i32(mdl, part + 12) + choice * 148;
  const meshCount = i32(mdl, model + 72);
  if (meshCount === 0) continue; // submodelo vacío («blank»)
  const firstVertex = i32(mdl, model + 84) / 48;

  const vtxPart = i32(vtx, 32) + p * 8;
  const vtxModel = vtxPart + i32(vtx, vtxPart + 4) + choice * 8;
  const lod = vtxModel + i32(vtx, vtxModel + 4);
  if (i32(vtx, lod) !== meshCount)
    throw new Error("el .mdl y el .vtx no coinciden en las mallas");

  for (let m = 0; m < meshCount; m++) {
    const mesh = model + i32(mdl, model + 76) + m * 116;
    const texIndex = skinRef(i32(mdl, mesh));
    const vertexOffset = i32(mdl, mesh + 12);
    if (!groups.has(texIndex))
      groups.set(texIndex, {
        pos: [],
        nrm: [],
        uv: [],
        idx: [],
        remap: new Map(),
      });
    const g = groups.get(texIndex);
    const push = (global) => {
      if (!g.remap.has(global)) {
        const v = vertexAt(global);
        // Z hacia arriba (Source) a Y hacia arriba (glTF), como el conversor de GoldSrc
        g.pos.push(v.pos[0], v.pos[2], -v.pos[1]);
        g.nrm.push(v.nrm[0], v.nrm[2], -v.nrm[1]);
        g.uv.push(v.uv[0], v.uv[1]);
        g.remap.set(global, g.pos.length / 3 - 1);
      }
      return g.remap.get(global);
    };
    for (const sg of stripGroups(lod + i32(vtx, lod + 4) + m * 9)) {
      const global = sg.index.map((i) =>
        push(firstVertex + vertexOffset + sg.origin[i]),
      );
      // Las tiras del .vtx son «trilist»: de tres en tres. El sentido de giro se invierte (Direct3D → glTF).
      for (let t = 0; t + 2 < global.length; t += 3)
        g.idx.push(global[t], global[t + 2], global[t + 1]);
    }
  }
}

// Materiales: .mdl -> nombre y carpetas -> .vmt -> $basetexture -> .vtf
const textureName = (i) => {
  const o = i32(mdl, 208) + i * 64;
  return cstr(mdl, o + i32(mdl, o));
};
const cdTextures = Array.from({ length: i32(mdl, 212) }, (_, c) =>
  cstr(mdl, i32(mdl, i32(mdl, 216) + c * 4)).replace(/[\\/]+/g, "/"),
);
function parseVmt(text, depth = 0) {
  const clean = text.replace(/\/\/.*$/gm, "");
  const values = {};
  for (const [, key, value] of clean.matchAll(/"([^"]+)"\s+"([^"]*)"/g))
    values[key.toLowerCase()] = value;
  // Los «patch» incluyen otro material y solo cambian unas claves
  if (values.include && depth < 4) {
    const parent = vpk.read(values.include);
    if (parent)
      return { ...parseVmt(parent.toString("latin1"), depth + 1), ...values };
  }
  return values;
}
function findMaterial(name) {
  for (const cd of cdTextures) {
    const vmt = vpk.read(`materials/${cd}${name}.vmt`);
    if (vmt) return parseVmt(vmt.toString("latin1"));
  }
  return null;
}

const missing = [];
const output_groups = [];
for (const [texIndex, g] of groups) {
  const name = textureName(texIndex);
  // El difuminado de las aspas lo anima el juego (proxy HeliBlade) y en reposo no se ve
  if (/blur/i.test(name)) continue;
  const out = { pos: g.pos, nrm: g.nrm, uv: g.uv, idx: g.idx };
  const material = findMaterial(name);
  const vtf =
    material?.["$basetexture"] &&
    vpk.read(`materials/${material["$basetexture"]}.vtf`);
  if (vtf) {
    Object.assign(out, decodeVtf(vtf));
    // El alfa de un material normal es una máscara de brillo, no transparencia
    const alphaTest = material["$alphatest"] === "1";
    const translucent = material["$translucent"] === "1";
    out.alphaMode = alphaTest ? "MASK" : translucent ? "BLEND" : "OPAQUE";
    if (out.alphaMode === "OPAQUE")
      for (let a = 3; a < out.rgba.length; a += 4) out.rgba[a] = 255;
    out.doubleSided = material["$nocull"] === "1" || alphaTest;
  } else {
    missing.push(name);
  }
  output_groups.push(out);
}
if (output_groups.length === 0)
  throw new Error(`${modelPath}: no se encontró ninguna malla`);

const { triangles, kilobytes } = await writeGlb(
  output,
  output_groups,
  "ValveDex source-mdl-to-glb",
);
console.log(
  `${output}: ${output_groups.length} texturas, ${triangles} triángulos, ${kilobytes} KB` +
    (missing.length ? ` — sin textura: ${missing.join(", ")}` : ""),
);
