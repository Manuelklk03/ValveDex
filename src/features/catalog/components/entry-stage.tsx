"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./entry-stage.module.css";

export type EntryLayer = {
  id: string;
  label: string;
  // Cantidad que se muestra junto al nombre (notas, apariciones…)
  count?: number;
  content: ReactNode;
};

type EntryStageProps = {
  // El visor 3D (o la imagen) de la ficha
  children: ReactNode;
  layers: EntryLayer[];
};

// Escenario de una ficha: el visor es el protagonista y, bajo él, una fila de capas (Datos, Desarrollo…). Cada capa
// se abre sobre el visor sin salir de la cabecera; Escape la cierra y devuelve el foco a su botón
export function EntryStage({ children, layers }: EntryStageProps) {
  const [openId, setOpenId] = useState<string | undefined>();
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  const panel = useRef<HTMLElement>(null);
  const baseId = useId();
  const open = layers.find((layer) => layer.id === openId);

  // Al abrir una capa el foco entra en su panel (va antes de los botones en el DOM, así que Tab sigue por su contenido)
  useEffect(() => {
    if (openId) panel.current?.focus();
  }, [openId]);

  function close() {
    if (!openId) return;
    buttons.current[openId]?.focus();
    setOpenId(undefined);
  }

  return (
    <div
      className={styles["entry-stage"]}
      onKeyDown={(event) => {
        if (event.key === "Escape" && openId) {
          event.stopPropagation();
          close();
        }
      }}
    >
      {/* Con una capa abierta el visor queda tapado: sin foco ni lectores de pantalla */}
      <div className={styles["entry-stage__viewer"]} inert={Boolean(open)}>
        {children}
      </div>

      {open && (
        <section
          ref={panel}
          tabIndex={-1}
          id={`${baseId}-${open.id}`}
          className={styles["entry-stage__panel"]}
          aria-label={open.label}
        >
          <div className={styles["entry-stage__panel-head"]}>
            <h2 className={styles["entry-stage__panel-title"]}>{open.label}</h2>
            <button
              type="button"
              className={styles["entry-stage__close"]}
              onClick={close}
            >
              Cerrar
            </button>
          </div>
          <div className={styles["entry-stage__panel-body"]}>
            {open.content}
          </div>
        </section>
      )}

      <ul className={styles["entry-stage__layers"]}>
        {layers.map((layer) => (
          <li key={layer.id}>
            <button
              type="button"
              ref={(node) => {
                buttons.current[layer.id] = node;
              }}
              className={
                layer.id === openId
                  ? `${styles["entry-stage__layer"]} ${styles["entry-stage__layer--open"]}`
                  : styles["entry-stage__layer"]
              }
              aria-expanded={layer.id === openId}
              aria-controls={
                layer.id === openId ? `${baseId}-${layer.id}` : undefined
              }
              onClick={() =>
                setOpenId(layer.id === openId ? undefined : layer.id)
              }
            >
              {layer.label}
              {layer.count !== undefined && (
                <span className={styles["entry-stage__count"]}>
                  {layer.count}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
