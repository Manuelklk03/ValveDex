import type { ReactNode } from "react";
import { Barlow, Barlow_Condensed } from "next/font/google";
import styles from "./universe-theme.module.css";

// Tipografía de señalética del universo Half-Life (docs/design.md): solo se carga en sus páginas
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-barlow",
});
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-barlow-condensed",
});

type UniverseThemeProps = {
  universeId?: string;
  children: ReactNode;
};

export function UniverseTheme({ universeId, children }: UniverseThemeProps) {
  const themeClass = universeId
    ? styles[`universe-theme--${universeId}`]
    : undefined;

  const className = themeClass
    ? `${styles["universe-theme"]} ${themeClass} ${barlow.variable} ${barlowCondensed.variable}`
    : styles["universe-theme"];

  return <div className={className}>{children}</div>;
}
