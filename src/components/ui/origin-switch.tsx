"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";

type OriginSwitchProps = {
  // Una variante por apartado de origen (su slug); se enseña la del parámetro `apartado` de la URL
  variants: Record<string, ReactNode>;
  // Variante que se enseña sin parámetro (y en el HTML del servidor)
  fallback: string;
};

function Chosen({ variants, fallback }: OriginSwitchProps) {
  const origin = useSearchParams().get("apartado");

  return origin && origin in variants ? variants[origin] : variants[fallback];
}

// Una ficha que sale en dos apartados (personaje de tu equipo, enemigo del rival) recuerda desde cuál se abrió:
// el enlace lleva `?apartado=…` y aquí se elige la ruta de migas y la navegación de ese apartado
export function OriginSwitch({ variants, fallback }: OriginSwitchProps) {
  return (
    <Suspense fallback={variants[fallback]}>
      <Chosen variants={variants} fallback={fallback} />
    </Suspense>
  );
}
