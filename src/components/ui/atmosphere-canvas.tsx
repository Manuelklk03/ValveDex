"use client";

import { useEffect, useRef } from "react";
import type { Atmosphere, AtmosphereLayer } from "@/domain/atmosphere";
import styles from "./atmosphere-canvas.module.css";

type Particle = {
  layer: AtmosphereLayer;
  color: string;
  x: number;
  y: number;
  // Profundidad (0,3 lejos – 1 cerca): manda sobre la velocidad, el tamaño y el efecto del scroll
  depth: number;
  size: number;
  speed: number;
  phase: number;
  // Empuje del puntero, que se apaga solo
  pushX: number;
  pushY: number;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);

function createParticles(
  atmosphere: Atmosphere,
  width: number,
  height: number,
): Particle[] {
  const area = (width * height) / (1440 * 900);

  return atmosphere.layers.flatMap((layer) =>
    Array.from(
      { length: Math.max(8, Math.min(120, Math.round(layer.density * area))) },
      (): Particle => ({
        layer,
        color: layer.colors[Math.floor(Math.random() * layer.colors.length)],
        x: random(0, width),
        y: random(0, height),
        depth: random(0.3, 1),
        size: random(...layer.size),
        speed: random(...layer.speed),
        phase: random(0, Math.PI * 2),
        pushX: 0,
        pushY: 0,
      }),
    ),
  );
}

// Ambiente vivo del universo: partículas con profundidad que se apartan del puntero, reaccionan al scroll y un
// halo de luz que sigue al ratón. Con «reducir movimiento» o puntero táctil se dibuja un solo fotograma, quieto.
export function AtmosphereCanvas({ atmosphere }: { atmosphere: Atmosphere }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const pointer = { x: -1000, y: -1000, active: false, glow: 0 };
    let scrollDelta = 0;
    let lastScroll = window.scrollY;
    let frame = 0;
    let last = performance.now();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(atmosphere, width, height);
    };

    const draw = (time: number, dt: number) => {
      context.clearRect(0, 0, width, height);

      // Halo del puntero: aparece al moverlo y se apaga solo
      pointer.glow +=
        ((pointer.active ? 1 : 0) - pointer.glow) * Math.min(1, dt * 4);
      if (pointer.glow > 0.02) {
        const radius = 340;
        const gradient = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          radius,
        );
        gradient.addColorStop(
          0,
          `rgba(${atmosphere.glow},${0.24 * pointer.glow})`,
        );
        gradient.addColorStop(1, `rgba(${atmosphere.glow},0)`);
        context.fillStyle = gradient;
        context.fillRect(
          pointer.x - radius,
          pointer.y - radius,
          radius * 2,
          radius * 2,
        );
      }

      const scroll = scrollDelta;
      scrollDelta = 0;

      for (const p of particles) {
        const { kind, alpha } = p.layer;
        const sway = Math.sin(time * 0.0006 + p.phase);
        const speed = p.speed * p.depth;
        let vx = sway * 6 * p.depth;
        let vy = 0;
        if (kind === "ember") vy = -speed;
        else if (kind === "ash") {
          vy = speed;
          vx = sway * 14 * p.depth;
        } else if (kind === "streak") {
          vx = speed;
          vy = sway * 4;
        } else {
          vx = Math.cos(p.phase + time * 0.0003) * speed * 0.6;
          vy = sway * speed * 0.5;
        }

        // Se aparta del puntero y vuelve a su camino
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (pointer.active && distance < 150 && distance > 0.1) {
          const force = (1 - distance / 150) * 260 * p.depth;
          p.pushX += (dx / distance) * force * dt;
          p.pushY += (dy / distance) * force * dt;
        }
        p.pushX *= 1 - Math.min(1, dt * 2.2);
        p.pushY *= 1 - Math.min(1, dt * 2.2);

        p.x += (vx + p.pushX) * dt;
        p.y += (vy + p.pushY) * dt - scroll * p.depth * 0.35;

        const margin = 12;
        if (p.x < -margin) p.x = width + margin;
        else if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        else if (p.y > height + margin) p.y = -margin;

        const flicker =
          kind === "ember"
            ? 0.6 + 0.4 * Math.sin(time * 0.006 + p.phase * 3)
            : 1;
        context.globalAlpha = alpha * (0.4 + 0.6 * p.depth) * flicker;
        context.fillStyle = `rgb(${p.color})`;
        context.strokeStyle = `rgb(${p.color})`;
        const size = p.size * (0.6 + 0.4 * p.depth);

        if (kind === "streak") {
          context.lineWidth = size;
          context.beginPath();
          context.moveTo(p.x, p.y);
          context.lineTo(p.x - speed * 0.12, p.y);
          context.stroke();
        } else if (kind === "mote") {
          // Cuadrito de panel que gira despacio
          context.save();
          context.translate(p.x, p.y);
          context.rotate(p.phase + time * 0.0002);
          context.fillRect(-size / 2, -size / 2, size, size);
          context.restore();
        } else {
          if (kind === "ember") {
            const alphaNow = context.globalAlpha;
            context.globalAlpha = alphaNow * 0.22;
            context.beginPath();
            context.arc(p.x, p.y, size * 2.2, 0, Math.PI * 2);
            context.fill();
            context.globalAlpha = alphaNow;
          }
          context.beginPath();
          context.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(now, dt);
      frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onScroll = () => {
      scrollDelta += window.scrollY - lastScroll;
      lastScroll = window.scrollY;
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !still) {
        last = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (still) draw(0, 0);
      }, 150);
    };

    resize();
    if (still) {
      draw(0, 0);
    } else {
      frame = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [atmosphere]);

  return (
    <canvas
      ref={canvasRef}
      className={styles["atmosphere"]}
      aria-hidden="true"
    />
  );
}
