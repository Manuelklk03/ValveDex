"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";

type OriginSwitchProps = {
  // Una variante por origen, con la clave «juego/apartado» (sus slugs)
  variants: Record<string, ReactNode>;
  // Clave que se enseña sin parámetros (y en el HTML del servidor)
  fallback: string;
};

function Chosen({ variants, fallback }: OriginSwitchProps) {
  const params = useSearchParams();
  const [fallbackGame, fallbackSection] = fallback.split("/");
  const game = params.get("juego") ?? fallbackGame;
  const section = params.get("apartado") ?? fallbackSection;

  // Si el apartado pedido no existe en ese juego, vale el apartado propio de la ficha
  return (
    variants[`${game}/${section}`] ??
    variants[`${game}/${fallbackSection}`] ??
    variants[fallback]
  );
}

// Una ficha que sale en varios juegos o en dos apartados (personaje de tu equipo, enemigo del rival) recuerda desde
// dónde se abrió: el enlace lleva `?juego=…&apartado=…` y aquí se eligen las migas y la navegación de ese origen
export function OriginSwitch({ variants, fallback }: OriginSwitchProps) {
  return (
    <Suspense fallback={variants[fallback]}>
      <Chosen variants={variants} fallback={fallback} />
    </Suspense>
  );
}
