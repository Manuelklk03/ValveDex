"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import Link from "next/link";
import styles from "./nav-menu.module.css";

export type NavMenuLink = { label: string; href: string; detail?: string };

export type NavMenuGroup = {
  title: string;
  href?: string;
  // Color de marca de la saga y emblema de un trazo, si el grupo es una saga
  accent?: string;
  emblem?: string;
  links: NavMenuLink[];
};

type NavMenuProps = {
  label: string;
  groups: NavMenuGroup[];
  // Enlace final del panel, por ejemplo «Ver todos los universos»
  footerLink?: NavMenuLink;
};

// Menú grande de la cabecera: un botón que despliega un panel a todo el ancho con grupos de enlaces.
// Se cierra con Escape (devolviendo el foco al botón), al pulsar fuera y al seguir un enlace.
export function NavMenu({ label, groups, footerLink }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Un clic en cualquier enlace del panel lo cierra: la navegación ya está en marcha
  function handlePanelClick(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  }

  return (
    <div ref={rootRef} className={styles["nav-menu"]}>
      <button
        ref={buttonRef}
        type="button"
        className={styles["nav-menu__button"]}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <span
          className={`${styles["nav-menu__chevron"]} ${open ? styles["nav-menu__chevron--open"] : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        className={styles["nav-menu__panel"]}
        hidden={!open}
        onClick={handlePanelClick}
      >
        <div className={styles["nav-menu__inner"]}>
          {groups.map((group) => (
            <section
              key={group.title}
              className={styles["nav-menu__group"]}
              style={
                group.accent
                  ? ({ "--menu-accent": group.accent } as CSSProperties)
                  : undefined
              }
            >
              <h3 className={styles["nav-menu__group-title"]}>
                {group.emblem && (
                  <span
                    className={styles["nav-menu__emblem"]}
                    style={
                      {
                        "--menu-emblem": `url(${group.emblem})`,
                      } as CSSProperties
                    }
                    aria-hidden="true"
                  />
                )}
                {group.href ? (
                  <Link
                    href={group.href}
                    className={styles["nav-menu__group-link"]}
                  >
                    {group.title}
                  </Link>
                ) : (
                  group.title
                )}
              </h3>
              <ul className={styles["nav-menu__links"]}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles["nav-menu__link"]}>
                      {link.label}
                      {link.detail && (
                        <span className={styles["nav-menu__detail"]}>
                          {link.detail}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        {footerLink && (
          <div className={styles["nav-menu__footer"]}>
            <Link href={footerLink.href} className={styles["nav-menu__more"]}>
              {footerLink.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
