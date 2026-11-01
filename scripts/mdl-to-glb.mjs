// Convierte un modelo GoldSrc (.mdl v10) a .glb: pose del fotograma 0 de la primera secuencia,
// cuerpo por defecto y primera piel. Las texturas salen de <nombre>t.mdl si el modelo no las incluye.
// Uso: node scripts/mdl-to-glb.mjs <modelo.mdl> <salida.glb> [secuencia] [cuerpos] [piel]
// Con [secuencia] (por ejemplo idle1) la pose sale de esa secuencia en vez de la primera ("-" = la primera).
// Con [cuerpos] (por ejemplo 0,3,1,2) se elige el submodelo de cada parte (cabeza, torso, arma…) en orden.
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const [input, output, sequenceArg, bodiesArg, skinArg] = process.argv.slice(2);
const sequenceName = sequenceArg === "-" ? undefined : sequenceArg;
const bodies = bodiesArg ? bodiesArg.split(",").map(Number) : [];
// [piel]: familia de texturas (el científico Luther usa la 1, de manos oscuras, en el SDK de Valve)
const skin = Number(skinArg ?? 0);
if ([...bodies, skin].some((n) => !Number.isInteger(n) || n < 0))
  throw new Error(
    `Cuerpos y piel deben ser enteros desde 0: ${bodiesArg ?? ""} ${skinArg ?? ""}`,
  );
if (!input || !output)
  throw new Error("Uso: node scripts/mdl-to-glb.mjs <modelo.mdl> <salida.glb>");

const mdl = readFileSync(input);
if (mdl.toString("latin1", 0, 4) !== "IDST" || mdl.readInt32LE(4) !== 10)
  throw new Error(`${input}: no es un modelo GoldSrc v10`);
const i32 = (b, o) => b.readInt32LE(o);
const f32 = (b, o) => b.readFloatLE(o);
const cstr = (b, o, n) => b.toString("latin1", o, o + n).split("\0")[0];

// Huesos con la pose del fotograma 0
const bones = [];
for (let b = 0; b < i32(mdl, 140); b++) {
  const o = i32(mdl, 144) + b * 112;
  const value = [],
    scale = [];
  for (let j = 0; j < 6; j++) {
    value.push(f32(mdl, o + 64 + j * 4));
    scale.push(f32(mdl, o + 88 + j * 4));
  }
  bones.push({ parent: i32(mdl, o + 32), value, scale });
}
const seqLabels = Array.from({ length: i32(mdl, 164) }, (_, s) =>
  cstr(mdl, i32(mdl, 168) + s * 176, 32),
);
const seqIndex = sequenceName ? seqLabels.indexOf(sequenceName) : 0;
if (seqIndex < 0)
  throw new Error(
    `${input}: no tiene la secuencia ${sequenceName} (${seqLabels.join(", ")})`,
  );
const seq = i32(mdl, 168) + seqIndex * 176;
// Las secuencias de los grupos 1, 2… viven en <nombre>01.mdl, <nombre>02.mdl…
const group = i32(mdl, seq + 156);
const animFile =
  group === 0
    ? mdl
    : readFileSync(
        input.replace(/\.mdl$/i, `${String(group).padStart(2, "0")}.mdl`),
      );
const animBase = i32(mdl, seq + 124);
const frame0 = bones.map((bone, b) => {
  const anim = animBase + b * 12;
  return bone.value.map((v, j) => {
    const offset = animFile.readUInt16LE(anim + j * 2);
    // Primer valor de la secuencia comprimida: tras la cabecera {valid, total}
    return offset === 0
      ? v
      : v + animFile.readInt16LE(anim + offset + 2) * bone.scale[j];
  });
});

// Matrices 3x4 de cada hueso, como R_StudioSetupBones del SDK de Valve
const matrices = [];
frame0.forEach(([px, py, pz, ax, ay, az], b) => {
  const [sr, cr, sp, cp, sy, cy] = [
    Math.sin(ax / 2),
    Math.cos(ax / 2),
    Math.sin(ay / 2),
    Math.cos(ay / 2),
    Math.sin(az / 2),
    Math.cos(az / 2),
  ];
  const [x, y, z, w] = [
    sr * cp * cy - cr * sp * sy,
    cr * sp * cy + sr * cp * sy,
    cr * cp * sy - sr * sp * cy,
    cr * cp * cy + sr * sp * sy,
  ];
  const local = [
    [1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y), px],
    [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x), py],
    [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y), pz],
  ];
  const parent = bones[b].parent;
  if (parent < 0) return (matrices[b] = local);
  const p = matrices[parent];
  matrices[b] = p.map((row) =>
    [0, 1, 2, 3].map(
      (c) =>
        row[0] * local[0][c] +
        row[1] * local[1][c] +
        row[2] * local[2][c] +
        (c === 3 ? row[3] : 0),
    ),
  );
});
const transform = (m, v, isNormal) =>
  m.map(
    (row) =>
      row[0] * v[0] + row[1] * v[1] + row[2] * v[2] + (isNormal ? 0 : row[3]),
  );

// Texturas y pieles (en el propio .mdl o en el ...t.mdl de los originales)
const texPath = input.replace(/\.mdl$/i, "t.mdl");
const tex =
  i32(mdl, 180) === 0 && existsSync(texPath) ? readFileSync(texPath) : mdl;
const textures = [];
for (let t = 0; t < i32(tex, 180); t++) {
  const o = i32(tex, 184) + t * 80;
  textures.push({
    name: cstr(tex, o, 64),
    flags: i32(tex, o + 64),
    width: i32(tex, o + 68),
    height: i32(tex, o + 72),
    index: i32(tex, o + 76),
  });
}
if (skin >= i32(tex, 196))
  throw new Error(
    `${input}: no tiene la piel ${skin} (familias: ${i32(tex, 196)})`,
  );
const skinRefs = [];
for (let s = 0; s < i32(tex, 192); s++)
  skinRefs.push(
    tex.readInt16LE(i32(tex, 200) + (skin * i32(tex, 192) + s) * 2),
  );

// Mallas del cuerpo por defecto, agrupadas por textura
const groups = new Map();
for (let p = 0; p < i32(mdl, 204); p++) {
  const part = i32(mdl, 208) + p * 76;
  const choice = bodies[p] ?? 0;
  if (choice >= i32(mdl, part + 64))
    throw new Error(`${input}: la parte ${p} no tiene el submodelo ${choice}`);
  const model = i32(mdl, part + 72) + choice * 112;
  const verts = [],
    norms = [];
  for (let v = 0; v < i32(mdl, model + 80); v++) {
    const pos = [0, 1, 2].map((k) =>
      f32(mdl, i32(mdl, model + 88) + v * 12 + k * 4),
    );
    verts.push(transform(matrices[mdl[i32(mdl, model + 84) + v]], pos, false));
  }
  for (let n = 0; n < i32(mdl, model + 92); n++) {
    const nrm = [0, 1, 2].map((k) =>
      f32(mdl, i32(mdl, model + 100) + n * 12 + k * 4),
    );
    norms.push(transform(matrices[mdl[i32(mdl, model + 96) + n]], nrm, true));
  }
  for (let m = 0; m < i32(mdl, model + 72); m++) {
    const mesh = i32(mdl, model + 76) + m * 20;
    const texIndex = skinRefs[i32(mdl, mesh + 8)];
    const { width, height } = textures[texIndex];
    if (!groups.has(texIndex))
      groups.set(texIndex, { pos: [], nrm: [], uv: [], idx: [] });
    const g = groups.get(texIndex);
    let cmd = i32(mdl, mesh + 4);
    for (
      let count = mdl.readInt16LE(cmd);
      count !== 0;
      count = mdl.readInt16LE(cmd)
    ) {
      const isFan = count < 0;
      const n = Math.abs(count);
      cmd += 2;
      const strip = [];
      for (let k = 0; k < n; k++, cmd += 8) {
        const [vi, ni, s, t] = [0, 1, 2, 3].map((q) =>
          mdl.readInt16LE(cmd + q * 2),
        );
        // Z hacia arriba (GoldSrc) a Y hacia arriba (glTF)
        const [x, y, z] = verts[vi];
        const [nx, ny, nz] = norms[ni];
        g.pos.push(x, z, -y);
        g.nrm.push(nx, nz, -ny);
        g.uv.push(s / width, t / height);
        strip.push(g.pos.length / 3 - 1);
      }
      for (let k = 2; k < n; k++) {
        if (isFan) g.idx.push(strip[0], strip[k], strip[k - 1]);
        else if (k % 2 === 0) g.idx.push(strip[k - 2], strip[k], strip[k - 1]);
        else g.idx.push(strip[k - 1], strip[k], strip[k - 2]);
      }
    }
  }
}

// GLB: un primitivo y un material por textura; paleta de 8 bits a PNG (índice 255 transparente si es «masked»)
const chunks = [];
let byteLength = 0;
const bufferViews = [],
  accessors = [],
  images = [],
  materials = [],
  primitives = [];
function addView(buf, target) {
  const pad = (4 - (buf.length % 4)) % 4;
  chunks.push(buf, Buffer.alloc(pad));
  bufferViews.push({
    buffer: 0,
    byteOffset: byteLength,
    byteLength: buf.length,
    ...(target && { target }),
  });
  byteLength += buf.length + pad;
  return bufferViews.length - 1;
}
function addAccessor(array, type, componentType, target, minMax) {
  const typed =
    componentType === 5126 ? new Float32Array(array) : new Uint32Array(array);
  const size = { SCALAR: 1, VEC2: 2, VEC3: 3 }[type];
  const accessor = {
    bufferView: addView(Buffer.from(typed.buffer), target),
    componentType,
    count: array.length / size,
    type,
  };
  if (minMax) {
    accessor.min = [0, 1, 2].map((k) =>
      Math.min(...array.filter((_, i) => i % 3 === k)),
    );
    accessor.max = [0, 1, 2].map((k) =>
      Math.max(...array.filter((_, i) => i % 3 === k)),
    );
  }
  accessors.push(accessor);
  return accessors.length - 1;
}
for (const [texIndex, g] of groups) {
  const { width, height, index, flags } = textures[texIndex];
  const masked = (flags & 0x40) !== 0;
  const palette = index + width * height;
  const rgba = Buffer.alloc(width * height * 4);
  for (let px = 0; px < width * height; px++) {
    const c = tex[index + px];
    rgba.set(
      [
        tex[palette + c * 3],
        tex[palette + c * 3 + 1],
        tex[palette + c * 3 + 2],
        masked && c === 255 ? 0 : 255,
      ],
      px * 4,
    );
  }
  const png = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer();
  images.push({ bufferView: addView(png), mimeType: "image/png" });
  materials.push({
    pbrMetallicRoughness: {
      baseColorTexture: { index: images.length - 1 },
      metallicFactor: 0,
      roughnessFactor: 1,
    },
    ...(masked && { alphaMode: "MASK" }),
  });
  primitives.push({
    attributes: {
      POSITION: addAccessor(g.pos, "VEC3", 5126, 34962, true),
      NORMAL: addAccessor(g.nrm, "VEC3", 5126, 34962),
      TEXCOORD_0: addAccessor(g.uv, "VEC2", 5126, 34962),
    },
    indices: addAccessor(g.idx, "SCALAR", 5125, 34963),
    material: materials.length - 1,
  });
}
const gltf = {
  asset: { version: "2.0", generator: "ValveDex mdl-to-glb" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0 }],
  meshes: [{ primitives }],
  materials,
  textures: images.map((_, source) => ({ source, sampler: 0 })),
  samplers: [{ magFilter: 9729, minFilter: 9987 }],
  images,
  accessors,
  bufferViews,
  buffers: [{ byteLength }],
};
const json = Buffer.from(JSON.stringify(gltf));
const jsonChunk = Buffer.concat([
  json,
  Buffer.alloc((4 - (json.length % 4)) % 4, 0x20),
]);
const bin = Buffer.concat(chunks);
const header = Buffer.alloc(12);
header.write("glTF", 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + bin.length, 8);
const chunkHeader = (length, type) => {
  const b = Buffer.alloc(8);
  b.writeUInt32LE(length, 0);
  b.write(type, 4);
  return b;
};
writeFileSync(
  output,
  Buffer.concat([
    header,
    chunkHeader(jsonChunk.length, "JSON"),
    jsonChunk,
    chunkHeader(bin.length, "BIN\0"),
    bin,
  ]),
);
console.log(
  `${output}: ${primitives.length} texturas, ${accessors.filter((a) => a.type === "SCALAR").reduce((n, a) => n + a.count / 3, 0)} triángulos, ${(byteLength / 1024).toFixed(0)} KB`,
);
