import styles from "./skeleton.module.css";

type SkeletonProps = {
  // Medidas en cualquier unidad CSS; sin alto, ocupa una línea de texto
  width?: string;
  height?: string;
  className?: string;
};

// Bloque gris con un brillo que lo recorre: ocupa el sitio del contenido mientras carga. Es decorativo (aria-hidden);
// quien lo usa avisa de la carga con aria-busy en su contenedor
export function Skeleton({ width, height, className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={`${styles["skeleton"]} ${className ?? ""}`}
      style={{ width, height }}
    />
  );
}
