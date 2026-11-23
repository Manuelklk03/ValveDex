"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { STEAM_PATH } from "./valve-props";
import { Steam, hash, makeWallTexture, type Vent } from "./valve-parts";

// Una persona de Valve para los paneles: nombre, cargo y, si hay foto libre, su ruta
export type StationPerson = { name: string; role: string; photo?: string };

type PeopleStopProps = {
  people: StationPerson[];
  // Imagen real del retablo (ruta pública); sin ella se usa el dibujo de respaldo
  portraitSrc?: string;
  reduced: boolean;
};

const W = 1024;
const H = 1280;

// Cielo del retablo: un sol dorado detrás de la cabeza, rayos que se abren en abanico y nubes oscuras en los bordes
function paintSky(g: CanvasRenderingContext2D) {
  const sky = g.createRadialGradient(W / 2, 330, 40, W / 2, 330, 900);
  sky.addColorStop(0, "#fff5c4");
  sky.addColorStop(0.22, "#f3c657");
  sky.addColorStop(0.55, "#a8691b");
  sky.addColorStop(1, "#1c1209");
  g.fillStyle = sky;
  g.fillRect(0, 0, W, H);
  // Rayos
  for (let i = 0; i < 22; i += 1) {
    const a = (i / 22) * Math.PI * 2;
    const width = 0.05 + hash(i + 3) * 0.05;
    g.fillStyle = `rgba(255,244,200,${0.07 + hash(i + 9) * 0.1})`;
    g.beginPath();
    g.moveTo(W / 2, 330);
    g.lineTo(
      W / 2 + Math.cos(a - width) * 1400,
      330 + Math.sin(a - width) * 1400,
    );
    g.lineTo(
      W / 2 + Math.cos(a + width) * 1400,
      330 + Math.sin(a + width) * 1400,
    );
    g.closePath();
    g.fill();
  }
  // Nubes: manchas oscuras con el borde iluminado
  for (let i = 0; i < 26; i += 1) {
    const side = i % 2 === 0 ? 0 : W;
    const x = side + (side === 0 ? 1 : -1) * hash(i + 21) * 330;
    const y = hash(i + 41) * H;
    const r = 80 + hash(i + 61) * 150;
    const cloud = g.createRadialGradient(x, y, 0, x, y, r);
    cloud.addColorStop(0, "rgba(28,18,8,0.8)");
    cloud.addColorStop(0.7, "rgba(60,38,14,0.45)");
    cloud.addColorStop(1, "rgba(60,38,14,0)");
    g.fillStyle = cloud;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
}

// Mechón de pelo largo y ondulado que cae a un lado de la cara
function hairLock(g: CanvasRenderingContext2D, side: 1 | -1) {
  const cx = W / 2;
  const sx = (x: number) => cx + side * x;
  const gradient = g.createLinearGradient(sx(80), 250, sx(150), 640);
  gradient.addColorStop(0, "#4a3220");
  gradient.addColorStop(1, "#2a1a0e");
  g.fillStyle = gradient;
  g.beginPath();
  g.moveTo(sx(100), 262);
  g.bezierCurveTo(sx(148), 300, sx(150), 420, sx(138), 470);
  g.bezierCurveTo(sx(170), 520, sx(120), 580, sx(160), 650);
  g.bezierCurveTo(sx(100), 640, sx(70), 560, sx(92), 510);
  g.bezierCurveTo(sx(60), 440, sx(88), 340, sx(100), 262);
  g.closePath();
  g.fill();
  // Reflejos de la luz en las ondas
  g.strokeStyle = "rgba(190,140,80,0.5)";
  g.lineWidth = 3;
  for (let i = 0; i < 4; i += 1) {
    g.beginPath();
    g.moveTo(sx(112 + i * 6), 300 + i * 20);
    g.bezierCurveTo(
      sx(140),
      380 + i * 30,
      sx(112),
      470 + i * 24,
      sx(136),
      560 + i * 20,
    );
    g.stroke();
  }
}

// Mano con el gesto de bendecir: palma y dos dedos hacia arriba
function blessingHand(g: CanvasRenderingContext2D) {
  const skin = g.createLinearGradient(230, 400, 320, 560);
  skin.addColorStop(0, "#f0c6a0");
  skin.addColorStop(1, "#c98e66");
  g.fillStyle = skin;
  g.strokeStyle = "#a8714d";
  g.lineWidth = 2;
  const finger = (x: number, y: number, len: number, lean: number) => {
    g.save();
    g.translate(x, y);
    g.rotate(lean);
    g.beginPath();
    g.roundRect(-9, -len, 18, len + 6, 9);
    g.fill();
    g.stroke();
    g.restore();
  };
  finger(262, 500, 92, -0.25);
  finger(288, 498, 98, -0.05);
  finger(310, 508, 58, 0.15);
  finger(326, 524, 48, 0.28);
  g.beginPath();
  g.ellipse(292, 560, 40, 52, -0.15, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  // Pulgar
  g.beginPath();
  g.ellipse(335, 570, 14, 28, 0.9, 0, Math.PI * 2);
  g.fill();
}

// Mano sobre el pecho, señalando el logotipo de Steam
function chestHand(g: CanvasRenderingContext2D) {
  const skin = g.createLinearGradient(520, 830, 680, 900);
  skin.addColorStop(0, "#f0c6a0");
  skin.addColorStop(1, "#c98e66");
  g.fillStyle = skin;
  g.strokeStyle = "#a8714d";
  g.lineWidth = 2;
  g.beginPath();
  g.ellipse(650, 880, 56, 34, -0.35, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  for (let i = 0; i < 4; i += 1) {
    g.beginPath();
    g.roundRect(560 - i * 8, 842 + i * 20, 96, 17, 8);
    g.fill();
    g.stroke();
  }
}

// Retrato de «Gabe Newell, el rey de Steam»: ilustración propia al estilo de un icono de altar, con halo, corona (la corona
// va en 3D encima), gafas redondas, barba canosa, pelo ondulado, túnica marfil, capa naranja, la mano que bendice y el logotipo
// de Steam brillando en el pecho
function makePortrait() {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext("2d");
  if (g) {
    paintSky(g);
    const cx = W / 2;

    // Halo
    const halo = g.createRadialGradient(cx, 330, 90, cx, 330, 190);
    halo.addColorStop(0, "#fff9e0");
    halo.addColorStop(1, "#ecd9a0");
    g.fillStyle = halo;
    g.beginPath();
    g.arc(cx, 330, 190, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "#d8a93a";
    g.lineWidth = 10;
    g.stroke();

    // Capa naranja sobre el hombro del lado del espectador derecho
    const cloak = g.createLinearGradient(600, 580, 800, 1280);
    cloak.addColorStop(0, "#f08a22");
    cloak.addColorStop(0.5, "#cf5a1c");
    cloak.addColorStop(1, "#8a1f14");
    // Túnica marfil
    const robe = g.createLinearGradient(260, 580, 760, 1280);
    robe.addColorStop(0, "#fbf3e0");
    robe.addColorStop(1, "#cfc2a4");
    g.fillStyle = robe;
    g.beginPath();
    g.moveTo(330, 600);
    g.quadraticCurveTo(210, 640, 200, 800);
    g.lineTo(150, 1280);
    g.lineTo(880, 1280);
    g.lineTo(790, 860);
    g.quadraticCurveTo(780, 650, 694, 600);
    g.closePath();
    g.fill();
    g.fillStyle = cloak;
    g.beginPath();
    g.moveTo(610, 596);
    g.quadraticCurveTo(780, 620, 800, 800);
    g.lineTo(880, 1280);
    g.lineTo(690, 1280);
    g.quadraticCurveTo(700, 900, 640, 720);
    g.closePath();
    g.fill();
    // Pliegues
    g.strokeStyle = "rgba(120,100,70,0.35)";
    g.lineWidth = 4;
    for (let i = 0; i < 6; i += 1) {
      g.beginPath();
      g.moveTo(330 + i * 40, 700 + i * 8);
      g.bezierCurveTo(
        320 + i * 34,
        900,
        300 + i * 46,
        1080,
        280 + i * 60,
        1280,
      );
      g.stroke();
    }
    g.strokeStyle = "rgba(255,200,120,0.5)";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(612, 600);
    g.quadraticCurveTo(700, 880, 690, 1280);
    g.stroke();
    // Cinturón
    g.fillStyle = "#c9a75a";
    g.fillRect(300, 1180, 460, 16);

    // Cuello y cuello bordado de oro
    const neck = g.createLinearGradient(0, 480, 0, 600);
    neck.addColorStop(0, "#c98e66");
    neck.addColorStop(1, "#e3b08a");
    g.fillStyle = neck;
    g.fillRect(cx - 54, 470, 108, 130);
    g.strokeStyle = "#d8a93a";
    g.lineWidth = 22;
    g.beginPath();
    g.ellipse(cx, 602, 120, 34, 0, 0, Math.PI);
    g.stroke();
    g.fillStyle = "#b3261a";
    for (let i = 0; i < 13; i += 1) {
      const a = (i / 12) * Math.PI;
      g.beginPath();
      g.arc(cx - Math.cos(a) * 120, 602 + Math.sin(a) * 34, 5, 0, Math.PI * 2);
      g.fill();
    }

    // Pelo largo detrás de la cara y mechones
    hairLock(g, 1);
    hairLock(g, -1);

    // Cara
    const face = g.createRadialGradient(cx - 20, 360, 30, cx, 380, 150);
    face.addColorStop(0, "#f7d3ae");
    face.addColorStop(1, "#d49a72");
    g.fillStyle = face;
    g.beginPath();
    g.moveTo(cx - 108, 330);
    g.bezierCurveTo(cx - 112, 250, cx + 112, 250, cx + 108, 330);
    g.bezierCurveTo(cx + 116, 430, cx + 70, 510, cx, 520);
    g.bezierCurveTo(cx - 70, 510, cx - 116, 430, cx - 108, 330);
    g.closePath();
    g.fill();
    // Frente despejada y entradas: la línea del pelo, echada hacia atrás
    g.fillStyle = "#3a2616";
    g.beginPath();
    g.moveTo(cx - 108, 330);
    g.bezierCurveTo(cx - 118, 240, cx - 60, 232, cx - 20, 244);
    g.bezierCurveTo(cx - 60, 262, cx - 84, 290, cx - 108, 330);
    g.moveTo(cx + 108, 330);
    g.bezierCurveTo(cx + 118, 240, cx + 60, 232, cx + 20, 244);
    g.bezierCurveTo(cx + 60, 262, cx + 84, 290, cx + 108, 330);
    g.fill();
    // Mejillas
    g.fillStyle = "rgba(220,120,100,0.18)";
    g.beginPath();
    g.ellipse(cx - 62, 440, 30, 20, 0, 0, Math.PI * 2);
    g.ellipse(cx + 62, 440, 30, 20, 0, 0, Math.PI * 2);
    g.fill();

    // Barba canosa: sombra de la mandíbula y puntos de barba
    g.fillStyle = "rgba(135,125,120,0.35)";
    g.beginPath();
    g.moveTo(cx - 100, 420);
    g.bezierCurveTo(cx - 90, 500, cx - 40, 524, cx, 526);
    g.bezierCurveTo(cx + 40, 524, cx + 90, 500, cx + 100, 420);
    g.bezierCurveTo(cx + 70, 470, cx - 70, 470, cx - 100, 420);
    g.fill();
    g.fillStyle = "rgba(190,185,182,0.55)";
    for (let i = 0; i < 700; i += 1) {
      const x = cx + (hash(i + 5) - 0.5) * 200;
      const y = 430 + hash(i + 9) * 96;
      const inside =
        Math.abs(x - cx) < 100 - Math.max(0, 470 - y) * 0.4 &&
        y > 420 + Math.abs(x - cx) * 0.1;
      if (inside) g.fillRect(x, y, 1.6, 1.6);
    }
    // Bigote
    g.fillStyle = "rgba(150,140,134,0.65)";
    g.beginPath();
    g.moveTo(cx - 40, 462);
    g.quadraticCurveTo(cx, 448, cx + 40, 462);
    g.quadraticCurveTo(cx, 474, cx - 40, 462);
    g.fill();

    // Cejas, ojos y gafas redondas de alambre
    g.strokeStyle = "#4a3322";
    g.lineWidth = 7;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(cx - 84, 342);
    g.quadraticCurveTo(cx - 56, 330, cx - 26, 342);
    g.moveTo(cx + 26, 342);
    g.quadraticCurveTo(cx + 56, 330, cx + 84, 342);
    g.stroke();
    g.fillStyle = "#fbf3e0";
    g.beginPath();
    g.ellipse(cx - 52, 384, 20, 11, 0, 0, Math.PI * 2);
    g.ellipse(cx + 52, 384, 20, 11, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#3a2616";
    g.beginPath();
    g.arc(cx - 50, 384, 8, 0, Math.PI * 2);
    g.arc(cx + 54, 384, 8, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#fff";
    g.beginPath();
    g.arc(cx - 47, 381, 2.5, 0, Math.PI * 2);
    g.arc(cx + 57, 381, 2.5, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "#b08a5a";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(cx - 72, 376);
    g.quadraticCurveTo(cx - 52, 368, cx - 32, 376);
    g.moveTo(cx + 32, 376);
    g.quadraticCurveTo(cx + 52, 368, cx + 72, 376);
    g.stroke();
    // Aros
    g.strokeStyle = "#2a2a2a";
    g.lineWidth = 4;
    g.beginPath();
    g.arc(cx - 52, 386, 42, 0, Math.PI * 2);
    g.moveTo(cx + 94, 386);
    g.arc(cx + 52, 386, 42, 0, Math.PI * 2);
    g.moveTo(cx - 10, 380);
    g.quadraticCurveTo(cx, 372, cx + 10, 380);
    g.moveTo(cx - 94, 384);
    g.lineTo(cx - 118, 372);
    g.moveTo(cx + 94, 384);
    g.lineTo(cx + 118, 372);
    g.stroke();
    g.fillStyle = "rgba(255,255,255,0.14)";
    g.beginPath();
    g.arc(cx - 52, 386, 40, 0, Math.PI * 2);
    g.arc(cx + 52, 386, 40, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "rgba(255,255,255,0.7)";
    g.lineWidth = 3;
    g.beginPath();
    g.arc(cx - 52, 386, 32, Math.PI * 1.15, Math.PI * 1.45);
    g.arc(cx + 52, 386, 32, Math.PI * 1.15, Math.PI * 1.45);
    g.stroke();

    // Nariz y boca
    g.strokeStyle = "rgba(150,90,60,0.6)";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(cx - 6, 396);
    g.quadraticCurveTo(cx - 14, 440, cx - 20, 446);
    g.quadraticCurveTo(cx, 456, cx + 20, 446);
    g.stroke();
    g.strokeStyle = "#8a4a40";
    g.lineWidth = 5;
    g.beginPath();
    g.moveTo(cx - 34, 488);
    g.quadraticCurveTo(cx, 500, cx + 34, 488);
    g.stroke();

    blessingHand(g);

    // Logotipo de Steam en el pecho, con su resplandor
    const glow = g.createRadialGradient(cx, 800, 10, cx, 800, 170);
    glow.addColorStop(0, "rgba(255,248,220,0.95)");
    glow.addColorStop(1, "rgba(255,248,220,0)");
    g.fillStyle = glow;
    g.fillRect(cx - 180, 620, 360, 360);
    g.fillStyle = "#0b0f14";
    g.beginPath();
    g.roundRect(cx - 52, 748, 104, 104, 12);
    g.fill();
    g.save();
    g.translate(cx - 36, 756);
    g.scale(3, 3);
    g.fillStyle = "#c7d5e0";
    g.fill(new Path2D(STEAM_PATH));
    g.restore();
    g.fillStyle = "#c7d5e0";
    g.font = "bold 13px sans-serif";
    g.textAlign = "center";
    g.fillText("STEAM", cx, 846);
    chestHand(g);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

// Hoja de expediente de una persona: papel con cabecera, número de registro, retrato (silueta si no hay foto), nombre,
// cargo, líneas de texto, código de barras, firma y sello rojo
function makeContract(person: StationPerson, index: number) {
  const w = 512;
  const h = 680;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d");
  if (g) {
    g.fillStyle = "#ece5d2";
    g.fillRect(0, 0, w, h);
    g.fillStyle = "rgba(120,90,40,0.08)";
    for (let i = 0; i < 6; i += 1) {
      g.beginPath();
      g.arc(
        hash(index * 7 + i) * w,
        hash(index * 13 + i + 4) * h,
        40 + hash(i + index) * 60,
        0,
        Math.PI * 2,
      );
      g.fill();
    }
    // Cabecera
    g.fillStyle = "#1c2433";
    g.fillRect(0, 0, w, 62);
    g.fillStyle = "#ece5d2";
    g.font = "bold 24px Georgia, serif";
    g.textAlign = "left";
    g.fillText("VALVE CORPORATION", 28, 38);
    g.font = "16px monospace";
    g.textAlign = "right";
    g.fillText(
      `REG. VLV-${String(1000 + index * 37).padStart(4, "0")}`,
      w - 28,
      38,
    );

    // Retrato: silueta si no hay foto (con foto, se pone encima)
    g.fillStyle = "#c9c1ac";
    g.fillRect(326, 92, 160, 184);
    g.fillStyle = "#6f6a5c";
    g.beginPath();
    g.arc(406, 168, 34, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.moveTo(336, 276);
    g.quadraticCurveTo(338, 214, 406, 210);
    g.quadraticCurveTo(474, 214, 476, 276);
    g.fill();
    g.strokeStyle = "#8a8472";
    g.lineWidth = 3;
    g.strokeRect(326, 92, 160, 184);

    // Nombre y cargo
    g.textAlign = "left";
    g.fillStyle = "#2a2118";
    g.font = "bold 36px Georgia, serif";
    const words = person.name.split(" ");
    const lines =
      words.length > 2
        ? [words.slice(0, -1).join(" "), words[words.length - 1]]
        : words;
    lines.forEach((line, i) => g.fillText(line.slice(0, 16), 28, 128 + i * 42));
    g.font = "italic 20px Georgia, serif";
    g.fillStyle = "#5a4a38";
    const role =
      person.role.length > 34 ? `${person.role.slice(0, 33)}…` : person.role;
    g.fillText(role, 28, 128 + lines.length * 42 + 12);

    g.fillStyle = "#7a1f12";
    g.fillRect(28, 300, w - 56, 3);
    g.fillStyle = "#4a3f30";
    for (let i = 0; i < 9; i += 1) {
      const width = 260 + hash(index * 11 + i) * 190;
      g.fillRect(28, 328 + i * 26, width, 6);
    }
    // Código de barras
    for (let i = 0; i < 48; i += 1) {
      g.fillStyle = "#2a2118";
      g.fillRect(28 + i * 5, 580, 1 + Math.floor(hash(index * 3 + i) * 3), 40);
    }
    // Firma garabateada
    g.strokeStyle = "#16233f";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(290, 610);
    for (let i = 0; i < 7; i += 1) {
      g.quadraticCurveTo(
        290 + i * 24 + 12,
        570 + hash(index + i) * 50,
        290 + (i + 1) * 24,
        610 - hash(index + i + 20) * 20,
      );
    }
    g.stroke();
    // Sello
    g.save();
    g.translate(390, 520);
    g.rotate(-0.25);
    g.strokeStyle = "#b3261a";
    g.fillStyle = "#b3261a";
    g.lineWidth = 5;
    g.strokeRect(-78, -26, 156, 52);
    g.font = "bold 24px sans-serif";
    g.textAlign = "center";
    g.fillText("CONFIDENCIAL", 0, 9);
    g.restore();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

// Foto del personal sobre su expediente, en el hueco del retrato
function PhotoPatch({ src }: { src: string }) {
  const map = useTexture(src);
  return (
    <mesh position={[0.27, 0.3, 0.012]} raycast={() => null}>
      <planeGeometry args={[0.3, 0.345]} />
      <meshStandardMaterial map={map} roughness={0.8} />
    </mesh>
  );
}

function Contract({ person, index }: { person: StationPerson; index: number }) {
  const texture = useMemo(() => makeContract(person, index), [person, index]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <group>
      <mesh raycast={() => null}>
        <planeGeometry args={[0.96, 1.28]} />
        <meshStandardMaterial map={texture} roughness={0.9} />
      </mesh>
      {/* Chincheta roja */}
      <mesh position={[0, 0.6, 0.03]} raycast={() => null}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#b3261a" roughness={0.4} metalness={0.3} />
      </mesh>
      {person.photo && (
        <Suspense fallback={null}>
          <PhotoPatch src={person.photo} />
          <mesh position={[0.27, 0.49, 0.03]} raycast={() => null}>
            <boxGeometry args={[0.1, 0.045, 0.025]} />
            <meshStandardMaterial
              color="#b8bcc2"
              metalness={0.9}
              roughness={0.3}
            />
          </mesh>
        </Suspense>
      )}
    </group>
  );
}

// Corona de rey: aro dorado con perlas, gorro de terciopelo rojo, cuatro arcos que se cruzan y un orbe con cruz arriba
function Crown() {
  const gold = (
    <meshStandardMaterial color="#d8a93a" metalness={0.95} roughness={0.22} />
  );
  const pearls = Array.from({ length: 16 }, (_, i) => i);
  return (
    <group>
      <mesh raycast={() => null}>
        <cylinderGeometry args={[0.5, 0.45, 0.24, 48, 1, true]} />
        <meshStandardMaterial
          color="#d8a93a"
          metalness={0.95}
          roughness={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
      {pearls.map((i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5]}
            raycast={() => null}
          >
            <sphereGeometry args={[0.032, 10, 10]} />
            <meshStandardMaterial
              color="#f7efd8"
              roughness={0.2}
              metalness={0.3}
              emissive="#fff4d6"
              emissiveIntensity={0.35}
            />
          </mesh>
        );
      })}
      {/* Gorro de terciopelo rojo */}
      <mesh position={[0, 0.1, 0]} scale={[1, 0.85, 1]} raycast={() => null}>
        <sphereGeometry args={[0.46, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#a31625"
          roughness={0.75}
          emissive="#3a0509"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Arcos dorados que se cruzan */}
      {[0, Math.PI / 2].map((rotation) => (
        <mesh
          key={rotation}
          position={[0, 0.1, 0]}
          rotation={[0, rotation, 0]}
          scale={[1, 0.85, 1]}
          raycast={() => null}
        >
          <torusGeometry args={[0.47, 0.03, 10, 32, Math.PI]} />
          {gold}
        </mesh>
      ))}
      <mesh position={[0, 0.52, 0]} raycast={() => null}>
        <sphereGeometry args={[0.06, 16, 16]} />
        {gold}
      </mesh>
      <mesh position={[0, 0.63, 0]} raycast={() => null}>
        <boxGeometry args={[0.024, 0.12, 0.024]} />
        {gold}
      </mesh>
      <mesh position={[0, 0.65, 0]} raycast={() => null}>
        <boxGeometry args={[0.08, 0.024, 0.024]} />
        {gold}
      </mesh>
      <mesh position={[0, 0.02, 0.5]} raycast={() => null}>
        <octahedronGeometry args={[0.07, 0]} />
        <meshStandardMaterial
          color="#c01a1a"
          emissive="#ff3b2a"
          emissiveIntensity={1}
        />
      </mesh>
      <pointLight
        position={[0, 0.3, 0.9]}
        intensity={4}
        distance={4}
        color="#ffe2a0"
      />
    </group>
  );
}

// Marco dorado del retablo: cuatro listones con remates en las esquinas
function Frame({ width, height }: { width: number; height: number }) {
  const t = 0.12;
  const material = (
    <meshStandardMaterial color="#c9a04a" metalness={0.9} roughness={0.3} />
  );
  return (
    <group>
      {[
        [0, height / 2 + t / 2, width + t * 2, t],
        [0, -height / 2 - t / 2, width + t * 2, t],
        [-width / 2 - t / 2, 0, t, height],
        [width / 2 + t / 2, 0, t, height],
      ].map(([x, y, w, h]) => (
        <mesh key={`${x}${y}`} position={[x, y, 0.03]} raycast={() => null}>
          <boxGeometry args={[w, h, 0.12]} />
          {material}
        </mesh>
      ))}
      {[
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, -1],
      ].map(([sx, sy]) => (
        <mesh
          key={`${sx}${sy}`}
          position={[sx * (width / 2 + t / 2), sy * (height / 2 + t / 2), 0.1]}
          raycast={() => null}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          {material}
        </mesh>
      ))}
    </group>
  );
}

const DRAWN_W = 3.2;
const DRAWN_H = (DRAWN_W * H) / W;
// Ancho del retablo cuando es la imagen real (apaisada)
const IMAGE_W = 4.4;

// Retablo de respaldo, dibujado por código, mientras no esté la imagen real del «rey de Steam»
function DrawnPortrait({ reduced }: { reduced: boolean }) {
  const portrait = useMemo(() => makePortrait(), []);
  const crown = useRef<THREE.Group>(null);

  useEffect(() => () => portrait.dispose(), [portrait]);

  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    if (crown.current) {
      crown.current.position.y = 1.2 + Math.sin(t * 0.9) * 0.03;
      crown.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group>
      <mesh position={[0, -0.1, -0.5]}>
        <planeGeometry args={[DRAWN_W, DRAWN_H]} />
        <meshBasicMaterial map={portrait} toneMapped={false} />
      </mesh>
      <group position={[0, -0.1, -0.48]}>
        <Frame width={DRAWN_W} height={DRAWN_H} />
      </group>
      <group ref={crown} position={[0, 1.2, -0.2]} scale={0.62}>
        <Crown />
      </group>
    </group>
  );
}

// La imagen real del «rey de Steam», flotando en 3D: se mece, se inclina hacia el cursor y lleva un marco dorado. La imagen
// ya trae su corona, su halo y su cielo, así que no se le añade nada encima
function ImagePortrait({ src, reduced }: { src: string; reduced: boolean }) {
  const map = useTexture(src, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  });
  const group = useRef<THREE.Group>(null);
  const image = map.image as { width: number; height: number };
  const height = (IMAGE_W * image.height) / image.width;

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    const k = 1 - Math.exp(-4 * delta);
    const turn = reduced ? 0 : state.pointer.x * 0.22;
    const tilt = reduced ? 0 : -state.pointer.y * 0.14;
    group.current.rotation.y += (turn - group.current.rotation.y) * k;
    group.current.rotation.x += (tilt - group.current.rotation.x) * k;
    group.current.position.y = -0.05 + Math.sin(t * 0.8) * 0.06;
  });

  return (
    <group ref={group}>
      {/* Pulsable: el clic sube a la zona de la parada */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[IMAGE_W, height]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      <group position={[0, 0, -0.48]}>
        <Frame width={IMAGE_W} height={height} />
      </group>
      <pointLight
        position={[0, 0, 1.4]}
        intensity={6}
        distance={6}
        color="#ffe2a0"
      />
    </group>
  );
}

// Sala 02 · Personal: el «rey de Steam» (Gabe Newell) en un retablo dorado que flota ante una pared industrial con vapor, y a
// su alrededor los expedientes del personal con sus fotos, unidos al retablo con hilo rojo
export function PeopleStop({ people, portraitSrc, reduced }: PeopleStopProps) {
  const wallMap = useMemo(() => makeWallTexture(1.4, 1), []);
  const panels = useRef<THREE.Group>(null);
  const halfWidth = (portraitSrc ? IMAGE_W : DRAWN_W) / 2;

  useEffect(() => () => wallMap.dispose(), [wallMap]);

  // Los que tienen foto, primero
  const shown = useMemo(
    () =>
      [...people]
        .sort((a, b) => Number(!!b.photo) - Number(!!a.photo))
        .slice(0, 10),
    [people],
  );
  const placements = useMemo(
    () =>
      shown.map((_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const row = Math.floor(i / 2);
        return {
          side,
          position: [
            side * (halfWidth + 0.95 + (row % 2) * 0.3),
            1.45 - row * 0.8,
            0.1 + row * 0.04,
          ] as [number, number, number],
        };
      }),
    [shown, halfWidth],
  );
  const strings = useMemo(() => {
    const material = new THREE.LineBasicMaterial({ color: "#b3261a" });
    return placements.map((placement) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(
          placement.position[0],
          placement.position[1] + 0.5,
          placement.position[2] + 0.04,
        ),
        new THREE.Vector3(placement.side * (halfWidth + 0.1), 0.2, 0.06),
      ]);
      return new THREE.Line(geometry, material);
    });
  }, [placements, halfWidth]);

  useEffect(() => {
    return () => {
      strings.forEach((line) => line.geometry.dispose());
      const material = strings[0]?.material;
      if (material instanceof THREE.Material) material.dispose();
    };
  }, [strings]);

  const vents = useMemo<Vent[]>(
    () => [
      { p: [-3.4, -2.3, -0.9], d: [0.1, 1, 0.3], count: 5, size: 1.05 },
      { p: [3.4, -2.3, -0.9], d: [-0.1, 1, 0.3], count: 5, size: 1.05 },
    ],
    [],
  );

  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    panels.current?.children.forEach((panel, i) => {
      panel.userData.baseY ??= panel.position.y;
      panel.position.y =
        panel.userData.baseY + Math.sin(t * 0.7 + i * 1.3) * 0.07;
    });
  });

  return (
    <group>
      {/* Pared industrial al fondo, con vapor */}
      <mesh position={[0, 0, -1.2]} raycast={() => null}>
        <planeGeometry args={[12, 6.5]} />
        <meshStandardMaterial map={wallMap} roughness={0.92} metalness={0.15} />
      </mesh>
      <Steam vents={vents} reduced={reduced} />

      {portraitSrc ? (
        <Suspense fallback={null}>
          <ImagePortrait src={portraitSrc} reduced={reduced} />
        </Suspense>
      ) : (
        <DrawnPortrait reduced={reduced} />
      )}

      {/* Hilos rojos del retablo a cada expediente */}
      {strings.map((line, i) => (
        <primitive key={shown[i].name} object={line} />
      ))}

      {/* Expedientes del personal, a los lados */}
      <group ref={panels}>
        {shown.map((person, i) => (
          <group
            key={person.name}
            position={placements[i].position}
            rotation={[
              0,
              -placements[i].side * 0.3,
              placements[i].side * (0.04 + (i % 3) * 0.03),
            ]}
            scale={0.7}
          >
            <Contract person={person} index={i} />
          </group>
        ))}
      </group>
    </group>
  );
}
