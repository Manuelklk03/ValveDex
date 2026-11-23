"use client";

import { Billboard, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

// Piezas 3D compartidas por las escenas del espacio de ValveDex (portada y universos)
// Textura de brillo suave (centro luminoso que se desvanece): las nebulosas de cada mundo
export function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.28)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Campo de estrellas: miles de puntos repartidos a lo largo de todo el viaje, con algo de color
export function Stars({ count }: { count: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const tint = new THREE.Color();
    // Generador con semilla: el mismo cielo en cada carga y sin funciones impuras durante el render
    let seed = 20261122;
    const random = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let n = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      n = (n + Math.imul(n ^ (n >>> 7), 61 | n)) ^ n;
      return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (random() - 0.5) * 70;
      positions[i * 3 + 1] = (random() - 0.5) * 40;
      positions[i * 3 + 2] = 14 - random() * 160;
      tint.setHSL(0.55 + random() * 0.12, 0.35, 0.65 + random() * 0.3);
      colors.set([tint.r, tint.g, tint.b], i * 3);
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return buffer;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.075}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

// Emblema de la saga como un dibujo de un trazo teñido con su color, siempre de cara a la cámara
export function Emblem({
  src,
  color,
  size,
  depthTest = false,
}: {
  src: string;
  color: string;
  size: number;
  // Por defecto se dibuja por encima de todo (sobre su esfera); con true queda tapado por lo que tenga delante
  depthTest?: boolean;
}) {
  const map = useTexture(src);
  const uniforms = useMemo(
    () => ({ map: { value: map }, color: { value: new THREE.Color(color) } }),
    [map, color],
  );

  return (
    <Billboard>
      <mesh renderOrder={5}>
        <planeGeometry args={[size, size]} />
        <shaderMaterial
          transparent
          depthTest={depthTest}
          uniforms={uniforms}
          vertexShader="varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
          fragmentShader="uniform sampler2D map; uniform vec3 color; varying vec2 vUv; void main(){ float a = texture2D(map, vUv).a; gl_FragColor = vec4(color, a * 0.92); }"
        />
      </mesh>
    </Billboard>
  );
}
