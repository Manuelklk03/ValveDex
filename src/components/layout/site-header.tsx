import Link from "next/link";
import styles from "./site.header.module.css";

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
