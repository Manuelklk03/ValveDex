import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  // Elementos <li> del menú principal y el buscador: los pone el layout, porque dependen de las funcionalidades
  nav: ReactNode;
  search: ReactNode;
};

export function SiteHeader({ nav, search }: SiteHeaderProps) {
  return (
    <header className={styles["site-header"]}>
      <div className={styles["site-header__inner"]}>
        <Link href="/" className={styles["site-header__brand"]}>
          {/* La válvula es el motivo de identidad: el único rojo de la cabecera */}
          <svg
            className={styles["site-header__mark"]}
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="22"
            />
            <circle cx="100" cy="100" r="22" fill="currentColor" />
            {[0, 72, 144, 216, 288].map((angle) => (
              <line
                key={angle}
                x1="100"
                y1="100"
                x2="100"
                y2="24"
                stroke="currentColor"
                strokeWidth="18"
                transform={`rotate(${angle} 100 100)`}
              />
            ))}
          </svg>
          ValveDex
        </Link>
        <nav aria-label="Principal" className={styles["site-header__nav"]}>
          <ul className={styles["site-header__list"]}>
            <li>
              <Link href="/" className={styles["site-header__link"]}>
                Inicio
              </Link>
            </li>
            {nav}
          </ul>
          {search}
        </nav>
      </div>
      <div className={styles["site-header__progress"]} aria-hidden="true" />
    </header>
  );
}
