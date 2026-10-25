import type { ReactNode } from "react";

import styles from "./dossier-header.module.css";

export type DossierSpec = {
  label: string;
  value: string;
};

type DossierHeadProps = {
  title: string;
  summary: string;
  specs: DossierSpec[];
  children?: ReactNode;
};

// Cabecera de expediente: título y resumen a la izquierda, ficha técnica a la derecha
export function DossierHeader({
  title,
  summary,
  specs,
  children,
}: DossierHeadProps) {
  return (
    <header className={styles["dossier-header"]}>
      <div className={styles["dossier-header__heading"]}>
        <h1 className={styles["dossier-header__title"]}>{title}</h1>
        <p className={styles["dossier-header__summary"]}>{summary}</p>
        {children}
      </div>
      {specs.length > 0 && (
        <dl className={styles["dossier-header__specs"]}>
          {specs.map((spec) => (
            <div key={spec.label} className={styles["dossier-header__spec"]}>
              <dt className={styles["dossier-header__spec-label"]}>
                {spec.label}
              </dt>
              <dd className={styles["dossier-header__spec-value"]}>
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
