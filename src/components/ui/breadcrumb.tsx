import Link from "next/link";
import styles from "./breadcrumb.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

// Ruta de navegación: siempre en el mismo sitio; el último elemento es la página actual
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Ruta de navegación" className={styles["breadcrumb"]}>
      <ol className={styles["breadcrumb__list"]}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={index} className={styles["breadcrumb__item"]}>
              {item.href && !isCurrent ? (
                <Link href={item.href} className={styles["breadcrumb__link"]}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={styles["breadcrumb__current"]}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
