import type { CSSProperties, ReactNode } from "react";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { AtmosphereCanvas } from "@/components/ui/atmosphere-canvas";
import { atmospheres } from "@/data/atmospheres";
import { universePalettes } from "@/data/universe-palettes";
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
  const atmosphere = universeId ? atmospheres[universeId] : undefined;

  const className = themeClass
    ? `${styles["universe-theme"]} ${themeClass} ${barlow.variable} ${barlowCondensed.variable}`
    : styles["universe-theme"];

  const palette = universeId ? universePalettes[universeId] : undefined;
  const style = palette
    ? ({
        "--background": palette.background,
        "--foreground": palette.foreground,
        "--surface": palette.surface,
        "--border": palette.border,
        "--muted": palette.muted,
        "--accent": palette.accent,
      } as CSSProperties)
    : undefined;

  return (
    <div className={className} style={style}>
      {atmosphere && <AtmosphereCanvas atmosphere={atmosphere} />}
      {children}
    </div>
  );
}
