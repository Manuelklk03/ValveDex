import Link from "next/link";
import styles from "./site-header.module.css";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/universos", label: "Universos" },
  { href: "/explorar", label: "Explorar" },
];

export function SiteHeader() {
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
        <nav aria-label="Principal">
          <ul className={styles["site-header__list"]}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles["site-header__link"]}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
