// Lector mínimo de VPK v1/v2 (solo lectura) de los juegos Source instalados.
// openMount(<carpeta del juego>, [<mods en orden de prioridad>]) lee de todos sus *_dir.vpk.
import fs from "node:fs";

export function openVpk(dirPath) {
  const buf = fs.readFileSync(dirPath);
  if (buf.readUInt32LE(0) !== 0x55aa1234)
    throw new Error("no es VPK: " + dirPath);
  const version = buf.readUInt32LE(4);
  const treeSize = buf.readUInt32LE(8);
  const headerSize = version === 1 ? 12 : 28;
  let p = headerSize;
  const treeEnd = headerSize + treeSize;
  const readStr = () => {
    const s = p;
    while (buf[p] !== 0) p++;
    const r = buf.toString("latin1", s, p);
    p++;
    return r;
  };
  const files = new Map();
  while (p < treeEnd) {
    const ext = readStr();
    if (!ext) break;
    for (;;) {
      const dir = readStr();
      if (!dir) break;
      for (;;) {
        const name = readStr();
        if (!name) break;
        const crc = buf.readUInt32LE(p);
        const preloadBytes = buf.readUInt16LE(p + 4);
        const archiveIndex = buf.readUInt16LE(p + 6);
        const entryOffset = buf.readUInt32LE(p + 8);
        const entryLength = buf.readUInt32LE(p + 12);
        p += 18;
        const preload = buf.subarray(p, p + preloadBytes);
        p += preloadBytes;
        const full = (dir === " " ? "" : dir + "/") + name + "." + ext;
        files.set(full.toLowerCase(), {
          archiveIndex,
          entryOffset,
          entryLength,
          preload,
          crc,
        });
      }
    }
  }
  const base = dirPath.replace(/_dir\.vpk$/, "");
  const treeBase = headerSize + treeSize;
  return {
    files,
    read(path) {
      const e = files.get(path.toLowerCase());
      if (!e) return null;
      const parts = [e.preload];
      if (e.entryLength > 0) {
        if (e.archiveIndex === 0x7fff) {
          parts.push(
            buf.subarray(
              treeBase + e.entryOffset,
              treeBase + e.entryOffset + e.entryLength,
            ),
          );
        } else {
          const fd = fs.openSync(
            `${base}_${String(e.archiveIndex).padStart(3, "0")}.vpk`,
            "r",
          );
          const out = Buffer.alloc(e.entryLength);
          fs.readSync(fd, out, 0, e.entryLength, e.entryOffset);
          fs.closeSync(fd);
          parts.push(out);
        }
      }
      return Buffer.concat(parts);
    },
  };
}

const normalize = (p) => p.replace(/\\/g, "/").toLowerCase();

// Une varios VPK: gana el primero que contenga el archivo (episodic antes que hl2).
export function openMount(root, folders) {
  const vpks = [];
  for (const folder of folders) {
    const dir = `${root}/${folder}`;
    for (const f of fs.readdirSync(dir))
      if (f.endsWith("_dir.vpk") && !/sound|_vo_/.test(f))
        vpks.push(openVpk(`${dir}/${f}`));
  }
  return {
    has: (path) => vpks.some((v) => v.files.has(normalize(path))),
    read(path) {
      for (const v of vpks) {
        const data = v.read(normalize(path));
        if (data) return data;
      }
      return null;
    },
  };
}
