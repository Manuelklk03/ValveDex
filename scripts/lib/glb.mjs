// Escribe un .glb con un primitivo y un material por grupo.
// grupo = { pos, nrm, uv, idx, rgba?, width?, height?, alphaMode?, doubleSided? }
import { writeFileSync } from "node:fs";
import sharp from "sharp";

export async function writeGlb(output, groups, generator) {
  const chunks = [];
  let byteLength = 0;
  const bufferViews = [],
    accessors = [],
    images = [],
    materials = [],
    primitives = [];
  const addView = (buf, target) => {
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
  };
  const addAccessor = (array, type, componentType, target, minMax) => {
    const typed =
      componentType === 5126 ? new Float32Array(array) : new Uint32Array(array);
    const accessor = {
      bufferView: addView(Buffer.from(typed.buffer), target),
      componentType,
      count: array.length / { SCALAR: 1, VEC2: 2, VEC3: 3 }[type],
      type,
    };
    if (minMax) {
      accessor.min = [Infinity, Infinity, Infinity];
      accessor.max = [-Infinity, -Infinity, -Infinity];
      for (let i = 0; i < array.length; i++) {
        accessor.min[i % 3] = Math.min(accessor.min[i % 3], array[i]);
        accessor.max[i % 3] = Math.max(accessor.max[i % 3], array[i]);
      }
    }
    accessors.push(accessor);
    return accessors.length - 1;
  };
  for (const g of groups) {
    const material = {
      pbrMetallicRoughness: { metallicFactor: 0, roughnessFactor: 1 },
      ...(g.alphaMode &&
        g.alphaMode !== "OPAQUE" && { alphaMode: g.alphaMode }),
      ...(g.doubleSided && { doubleSided: true }),
    };
    if (g.rgba) {
      const png = await sharp(g.rgba, {
        raw: { width: g.width, height: g.height, channels: 4 },
      })
        .png()
        .toBuffer();
      images.push({ bufferView: addView(png), mimeType: "image/png" });
      material.pbrMetallicRoughness.baseColorTexture = {
        index: images.length - 1,
      };
    } else {
      material.pbrMetallicRoughness.baseColorFactor = [0.6, 0.6, 0.6, 1];
    }
    materials.push(material);
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
    asset: { version: "2.0", generator },
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
  return {
    triangles: accessors
      .filter((a) => a.type === "SCALAR")
      .reduce((n, a) => n + a.count / 3, 0),
    kilobytes: Math.round(byteLength / 1024),
  };
}
