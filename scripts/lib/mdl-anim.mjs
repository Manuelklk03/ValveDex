import { existsSync, readFileSync } from "node:fs";

// Lee animaciones de modelos de Source (.mdl v44-49): busca una secuencia por nombre (en el propio modelo o en los incluidos,
// como models/survivors/anim_NamVet.mdl) y devuelve la pose de cada hueso en un fotograma.
// Los datos de movimiento pueden estar en el propio .mdl o en bloques del .ani; se decodifican los formatos del SDK
// (rotación y posición crudas o comprimidas con RLE). No lee capas aditivas, IK ni movimiento de raíz.
const ANIM_RAWPOS = 0x01;
const ANIM_RAWROT = 0x02;
const ANIM_ANIMPOS = 0x04;
const ANIM_ANIMROT = 0x08;
const ANIM_DELTA = 0x10;
const ANIM_RAWROT2 = 0x20;
// Animaciones por fotogramas (L4D, Portal 2): una tabla de banderas por hueso, valores constantes y datos por fotograma
const DESC_FRAMEANIM = 0x40;
const FRAME_CONST_POS = 0x01;
const FRAME_CONST_ROT = 0x02;
const FRAME_ANIM_POS = 0x04;
const FRAME_ANIM_ROT = 0x08;

const i32 = (b, o) => b.readInt32LE(o);
const cstr = (b, o) => b.toString("latin1", o, b.indexOf(0, o));
const f32 = (b, o) => b.readFloatLE(o);

function half(bits) {
  const sign = bits & 0x8000 ? -1 : 1;
  const exp = (bits >> 10) & 0x1f;
  const frac = bits & 0x3ff;
  if (exp === 0) return sign * 2 ** -14 * (frac / 1024);
  if (exp === 31) return frac ? NaN : sign * Infinity;
  return sign * 2 ** (exp - 15) * (1 + frac / 1024);
}

// Euler (radianes, como RadianEuler del SDK) a cuaternión [x, y, z, w]
function eulerToQuat(ax, ay, az) {
  const [sr, cr] = [Math.sin(ax * 0.5), Math.cos(ax * 0.5)];
  const [sp, cp] = [Math.sin(ay * 0.5), Math.cos(ay * 0.5)];
  const [sy, cy] = [Math.sin(az * 0.5), Math.cos(az * 0.5)];
  return [
    sr * cp * cy - cr * sp * sy,
    cr * sp * cy + sr * cp * sy,
    cr * cp * sy - sr * sp * cy,
    cr * cp * cy + sr * sp * sy,
  ];
}

function quat48(b, o) {
  const x = ((b.readUInt16LE(o) - 32768) * 1) / 32768;
  const y = ((b.readUInt16LE(o + 2) - 32768) * 1) / 32768;
  const zRaw = b.readUInt16LE(o + 4);
  const z = ((zRaw & 0x7fff) - 16384) / 16384;
  let w = Math.sqrt(Math.max(0, 1 - x * x - y * y - z * z));
  if (zRaw & 0x8000) w = -w;
  return [x, y, z, w];
}

function quat64(b, o) {
  const bits = b.readBigUInt64LE(o);
  const mask = 0x1fffffn;
  const x = (Number(bits & mask) - 1048576) / 1048576.5;
  const y = (Number((bits >> 21n) & mask) - 1048576) / 1048576.5;
  const z = (Number((bits >> 42n) & mask) - 1048576) / 1048576.5;
  let w = Math.sqrt(Math.max(0, 1 - x * x - y * y - z * z));
  if (bits >> 63n) w = -w;
  return [x, y, z, w];
}

// Valor de un canal RLE en un fotograma (ExtractAnimValue del SDK)
function extractValue(b, at, frame) {
  let k = frame;
  let p = at;
  let guard = 0;
  while (b[p + 1] <= k) {
    k -= b[p + 1];
    p += (b[p] + 1) * 2;
    if (b[p + 1] === 0 || ++guard > 4096) return 0;
  }
  const valid = b[p];
  if (valid > k) return b.readInt16LE(p + 2 + k * 2);
  return valid > 1 ? b.readInt16LE(p + valid * 2) : 0;
}

function readBones(mdl) {
  const count = i32(mdl, 156);
  const base = i32(mdl, 160);
  return Array.from({ length: count }, (_, b) => {
    const o = base + b * 216;
    const vec = (at) => [0, 1, 2].map((k) => f32(mdl, o + at + k * 4));
    return {
      name: cstr(mdl, o + i32(mdl, o)),
      parent: i32(mdl, o + 4),
      pos: vec(32),
      quat: [0, 1, 2, 3].map((k) => f32(mdl, o + 44 + k * 4)),
      rot: vec(60),
      posScale: vec(72),
      rotScale: vec(84),
    };
  });
}

// folders: carpetas del juego donde buscar archivos sueltos (los .ani no siempre están en los VPK)
export function createAnimator(vpk, modelPath, folders = []) {
  const readLoose = (path) => {
    for (const folder of folders) {
      const file = `${folder}/${path}`;
      if (existsSync(file)) return readFileSync(file);
    }
    return null;
  };
  const cache = new Map();
  function context(path) {
    if (cache.has(path)) return cache.get(path);
    const mdl = vpk.read(path);
    if (!mdl) {
      cache.set(path, null);
      return null;
    }
    const ctx = { path, mdl, bones: readBones(mdl), ani: null };
    cache.set(path, ctx);
    return ctx;
  }
  const target = context(modelPath);
  if (!target) throw new Error(`${modelPath}: no está en los VPK`);
  const targetIndex = new Map(
    target.bones.map((b, i) => [b.name.toLowerCase(), i]),
  );

  // Secuencia por nombre: primero el propio modelo y después los incluidos, en profundidad
  function findIn(ctx, name, depth = 0) {
    const { mdl } = ctx;
    const wanted = name.toLowerCase();
    const count = i32(mdl, 188);
    const base = i32(mdl, 192);
    for (let s = 0; s < count; s++) {
      const o = base + s * 212;
      if (cstr(mdl, o + i32(mdl, o + 4)).toLowerCase() === wanted)
        return { ctx, seq: o };
    }
    if (depth > 3) return null;
    const includes = i32(mdl, 336);
    const includeBase = i32(mdl, 340);
    for (let k = 0; k < includes; k++) {
      const o = includeBase + k * 8;
      const inner = context(cstr(mdl, o + i32(mdl, o + 4)).replace(/\\/g, "/"));
      const found = inner && findIn(inner, name, depth + 1);
      if (found) return found;
    }
    return null;
  }

  function aniOf(ctx) {
    if (ctx.ani === null) {
      const name = cstr(ctx.mdl, i32(ctx.mdl, 348)).replace(/\\/g, "/");
      ctx.ani = name
        ? (vpk.read(name) ??
          readLoose(name) ??
          readLoose(name.toLowerCase()) ??
          false)
        : false;
    }
    return ctx.ani;
  }

  // Descriptor de la animación de una secuencia (blend: el central en las de apuntado de 9 direcciones)
  function describe(ref, blend) {
    const { ctx, seq } = ref;
    const { mdl } = ctx;
    const blends = i32(mdl, seq + 56);
    const chosen = blend ?? (blends > 1 ? Math.floor(blends / 2) : 0);
    const animIndex = mdl.readInt16LE(seq + i32(mdl, seq + 60) + chosen * 2);
    const desc = i32(mdl, 184) + animIndex * 100;
    return {
      ctx,
      desc,
      frames: i32(mdl, desc + 16),
      fps: f32(mdl, desc + 8),
    };
  }

  // Dónde están los datos de un fotograma (en el .mdl, en el .ani o en una sección) y el fotograma dentro de ese trozo
  function locate(anim, frame) {
    const { ctx, desc, frames } = anim;
    const { mdl } = ctx;
    const sectionFrames = i32(mdl, desc + 84);
    let block = i32(mdl, desc + 52);
    let index = i32(mdl, desc + 56);
    let local = frame;
    if (sectionFrames !== 0) {
      let section;
      if (frames > sectionFrames && frame === frames - 1) {
        local = 0;
        section = Math.floor(frames / sectionFrames) + 1;
      } else {
        section = Math.floor(frame / sectionFrames);
        local = frame - section * sectionFrames;
      }
      const entry = desc + i32(mdl, desc + 80) + section * 8;
      block = i32(mdl, entry);
      index = i32(mdl, entry + 4);
    }
    if (block === 0) return { buf: mdl, at: desc + index, local };
    const ani = aniOf(ctx);
    if (!ani) return null;
    const table = i32(mdl, 356) + block * 8;
    return { buf: ani, at: i32(mdl, table) + index, local };
  }

  // Animación por fotogramas: banderas por hueso, constantes y datos de cada fotograma
  function sampleFrames(anim, place, frame) {
    const { buf, at } = place;
    const count = anim.ctx.bones.length;
    const constantOffset = buf.readInt32LE(at);
    const frameOffset = buf.readInt32LE(at + 4);
    const frameLength = buf.readInt32LE(at + 8);
    const flags = (b) => buf[at + 24 + b];
    const out = target.bones.map(() => null);
    let constant = at + constantOffset;
    let perFrame = at + frameOffset + frame * frameLength;
    for (let b = 0; b < count; b++) {
      const f = flags(b);
      const src = anim.ctx.bones[b];
      let quat = src.quat;
      let pos = src.pos;
      if (f & FRAME_CONST_ROT) {
        quat = quat48(buf, constant);
        constant += 6;
      }
      if (f & FRAME_CONST_POS) {
        pos = [0, 1, 2].map((j) => half(buf.readUInt16LE(constant + j * 2)));
        constant += 6;
      }
      if (f & FRAME_ANIM_ROT) {
        quat = quat48(buf, perFrame);
        perFrame += 6;
      }
      if (f & FRAME_ANIM_POS) {
        pos = [0, 1, 2].map((j) => half(buf.readUInt16LE(perFrame + j * 2)));
        perFrame += 6;
      }
      const dst = targetIndex.get(src.name.toLowerCase());
      if (dst !== undefined && f !== 0) out[dst] = { pos, quat };
    }
    return out;
  }

  // Pose local de cada hueso del modelo destino en un fotograma: { pos, quat } o null si el hueso no se anima
  function sample(anim, frame) {
    const place = locate(anim, Math.max(0, Math.min(anim.frames - 1, frame)));
    const out = target.bones.map(() => null);
    if (!place) return out;
    if (i32(anim.ctx.mdl, anim.desc + 12) & DESC_FRAMEANIM)
      return sampleFrames(anim, place, place.local);
    const { buf, at, local } = place;
    const animBones = anim.ctx.bones;
    let p = at;
    for (let guard = 0; guard < 512; guard++) {
      const boneIndex = buf[p];
      const flags = buf[p + 1];
      const next = buf.readInt16LE(p + 2);
      const src = animBones[boneIndex];
      const dst = src ? targetIndex.get(src.name.toLowerCase()) : undefined;
      if (src && dst !== undefined && !(flags & ANIM_DELTA)) {
        let off = p + 4;
        let quat = src.quat;
        if (flags & ANIM_RAWROT2) {
          quat = quat64(buf, off);
        } else if (flags & ANIM_RAWROT) {
          quat = quat48(buf, off);
        } else if (flags & ANIM_ANIMROT) {
          const angle = [0, 1, 2].map((j) => {
            const offset = buf.readInt16LE(off + j * 2);
            return offset === 0
              ? src.rot[j]
              : src.rot[j] +
                  extractValue(buf, off + offset, local) * src.rotScale[j];
          });
          quat = eulerToQuat(angle[0], angle[1], angle[2]);
        }
        const rotBytes =
          (flags & ANIM_RAWROT ? 6 : 0) +
          (flags & ANIM_RAWROT2 ? 8 : 0) +
          (flags & ANIM_ANIMROT ? 6 : 0);
        off = p + 4 + rotBytes;
        let pos = src.pos;
        if (flags & ANIM_RAWPOS) {
          pos = [0, 1, 2].map((j) => half(buf.readUInt16LE(off + j * 2)));
        } else if (flags & ANIM_ANIMPOS) {
          pos = [0, 1, 2].map((j) => {
            const offset = buf.readInt16LE(off + j * 2);
            return offset === 0
              ? src.pos[j]
              : src.pos[j] +
                  extractValue(buf, off + offset, local) * src.posScale[j];
          });
        }
        out[dst] = { pos, quat };
      }
      if (next === 0) break;
      p += next;
    }
    return out;
  }

  // Cuánto se mueve una animación entre el primer fotograma y el tercio de su duración (para elegir la mezcla que corre)
  function motion(anim) {
    const a = sample(anim, 0);
    const b = sample(anim, Math.floor(anim.frames / 3));
    let total = 0;
    let n = 0;
    a.forEach((x, i) => {
      const y = b[i];
      if (!x || !y) return;
      const dot = x.quat.reduce((sum, v, k) => sum + v * y.quat[k], 0);
      total +=
        Math.hypot(
          x.pos[0] - y.pos[0],
          x.pos[1] - y.pos[1],
          x.pos[2] - y.pos[2],
        ) +
        (1 - Math.abs(dot)) * 50;
      n++;
    });
    return n ? total / n : 0;
  }

  // La mezcla de una secuencia que más se mueve: en las de 9 direcciones la central suele ser una pose quieta
  function bestBlend(ref) {
    const blends = ref.ctx.mdl.readInt32LE(ref.seq + 56);
    let best = 0;
    let score = -1;
    for (let b = 0; b < blends; b++) {
      const info = describe(ref, b);
      if (info.frames < 8) continue;
      const m = motion(info);
      if (m > score) {
        score = m;
        best = b;
      }
    }
    return { blend: best, score };
  }

  // ¿Es una animación aditiva (delta)? Se suma a otra en vez de sustituirla
  const isDelta = (ref) => (ref.ctx.mdl.readInt32LE(ref.seq + 12) & 4) !== 0;

  return {
    bones: target.bones,
    isDelta,
    bestBlend,
    find: (name) => findIn(target, name),
    describe,
    sample,
  };
}
