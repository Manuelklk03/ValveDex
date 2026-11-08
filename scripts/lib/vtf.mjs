// Decodifica la imagen más grande (primer fotograma) de un .vtf a RGBA de 8 bits.
// Formatos: DXT1/3/5 y los sin comprimir habituales. Si aparece otro, falla con su número.
const BLOCK = { 13: 8, 14: 16, 15: 16, 20: 8 };
const PIXEL = { 0: 4, 1: 4, 2: 3, 3: 3, 5: 1, 6: 2, 11: 4, 12: 4, 16: 4 };

function imageSize(format, w, h) {
  if (BLOCK[format]) return Math.ceil(w / 4) * Math.ceil(h / 4) * BLOCK[format];
  if (PIXEL[format]) return w * h * PIXEL[format];
  throw new Error(`formato de VTF no admitido: ${format}`);
}

const rgb565 = (v) => [
  ((v >> 11) & 31) * (255 / 31),
  ((v >> 5) & 63) * (255 / 63),
  (v & 31) * (255 / 31),
];

function decodeDxt(data, w, h, format) {
  const out = Buffer.alloc(w * h * 4);
  const blockSize = BLOCK[format];
  const hasAlphaBlock = blockSize === 16;
  let p = 0;
  for (let by = 0; by < h; by += 4) {
    for (let bx = 0; bx < w; bx += 4) {
      const c = p + (hasAlphaBlock ? 8 : 0);
      const c0 = data.readUInt16LE(c);
      const c1 = data.readUInt16LE(c + 2);
      const [a, b] = [rgb565(c0), rgb565(c1)];
      // DXT3 y DXT5 usan siempre la paleta de 4 colores; DXT1 depende del orden de c0 y c1
      const fourColors = c0 > c1 || hasAlphaBlock;
      const palette = fourColors
        ? [
            a,
            b,
            a.map((v, i) => (2 * v + b[i]) / 3),
            a.map((v, i) => (v + 2 * b[i]) / 3),
          ]
        : [a, b, a.map((v, i) => (v + b[i]) / 2), [0, 0, 0]];
      const bits = data.readUInt32LE(c + 4);
      const alpha = new Array(16).fill(255);
      if (format === 14) {
        for (let i = 0; i < 16; i++)
          alpha[i] = ((data[p + (i >> 1)] >> ((i & 1) * 4)) & 15) * 17;
      } else if (format === 15) {
        const [a0, a1] = [data[p], data[p + 1]];
        const table = [a0, a1];
        for (let i = 1; i < (a0 > a1 ? 7 : 5); i++)
          table.push(
            a0 > a1 ? ((7 - i) * a0 + i * a1) / 7 : ((5 - i) * a0 + i * a1) / 5,
          );
        if (a0 <= a1) table.push(0, 255);
        let abits = 0n;
        for (let i = 0; i < 6; i++)
          abits |= BigInt(data[p + 2 + i]) << BigInt(8 * i);
        for (let i = 0; i < 16; i++)
          alpha[i] = table[Number((abits >> BigInt(3 * i)) & 7n)];
      }
      for (let i = 0; i < 16; i++) {
        const x = bx + (i & 3);
        const y = by + (i >> 2);
        if (x >= w || y >= h) continue;
        const index = (bits >> (2 * i)) & 3;
        const color = palette[index];
        const transparent = !fourColors && index === 3;
        out.set(
          [color[0], color[1], color[2], transparent ? 0 : alpha[i]],
          (y * w + x) * 4,
        );
      }
      p += blockSize;
    }
  }
  return out;
}

// Orden de los canales de cada formato sin comprimir, hacia [R, G, B, A] (-1 = opaco)
const CHANNELS = {
  0: [0, 1, 2, 3],
  1: [3, 2, 1, 0],
  2: [0, 1, 2, -1],
  3: [2, 1, 0, -1],
  5: [0, 0, 0, -1],
  6: [0, 0, 0, 1],
  11: [1, 2, 3, 0],
  12: [2, 1, 0, 3],
  16: [2, 1, 0, -1],
};

export function decodeVtf(buf) {
  if (buf.toString("latin1", 0, 3) !== "VTF") throw new Error("no es un VTF");
  const headerSize = buf.readUInt32LE(12);
  const width = buf.readUInt16LE(16);
  const height = buf.readUInt16LE(18);
  const flags = buf.readUInt32LE(20);
  const frames = buf.readUInt16LE(24);
  const format = buf.readInt32LE(52);
  const mips = buf[56];
  const lowFormat = buf.readInt32LE(57);
  const [lowW, lowH] = [buf[61], buf[62]];
  if (flags & 0x4000) throw new Error("VTF de cubemap: no admitido");
  // Disposición: miniatura, mipmaps del más pequeño al más grande y, al final, el nivel 0
  let offset = headerSize;
  if (lowFormat >= 0 && lowW * lowH > 0)
    offset += imageSize(lowFormat, lowW, lowH);
  for (let m = mips - 1; m >= 1; m--)
    offset +=
      imageSize(format, Math.max(1, width >> m), Math.max(1, height >> m)) *
      frames;
  const data = buf.subarray(offset, offset + imageSize(format, width, height));
  if (BLOCK[format])
    return { width, height, rgba: decodeDxt(data, width, height, format) };
  const rgba = Buffer.alloc(width * height * 4);
  const bpp = PIXEL[format];
  const map = CHANNELS[format];
  for (let i = 0; i < width * height; i++)
    for (let k = 0; k < 4; k++)
      rgba[i * 4 + k] = map[k] < 0 ? 255 : data[i * bpp + map[k]];
  return { width, height, rgba };
}
