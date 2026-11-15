"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
  prepareItems,
  searchItems,
  type PreparedItem,
} from "@/features/search/search";
import type {
  SearchItem,
  SearchItemType,
} from "@/features/search/search-index";
import styles from "./search-palette.module.css";

const typeLabels: Record<SearchItemType, string> = {
  universe: "Saga",
  game: "Juego",
  entry: "Ficha",
  person: "Persona",
  page: "Página",
};

type LoadState = "idle" | "loading" | "ready" | "error";

// Buscador global: se abre con Ctrl+K (⌘K en Mac) o con el botón de la cabecera. Descarga el índice la primera
// vez que se abre, filtra al teclear y se maneja con flechas, Intro y Escape.
export function SearchPalette() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [load, setLoad] = useState<LoadState>("idle");
  const [prepared, setPrepared] = useState<PreparedItem[]>([]);

  // Sin texto se enseñan accesos rápidos: las páginas y las sagas
  const quickLinks = useMemo(
    () =>
      prepared
        .map((entry) => entry.item)
        .filter((item) => item.type === "page" || item.type === "universe")
        .slice(0, 8),
    [prepared],
  );

  const results: SearchItem[] = useMemo(
    () => (query.trim() === "" ? quickLinks : searchItems(prepared, query)),
    [prepared, query, quickLinks],
  );

  // El índice se pide una sola vez; si falla, se permite reintentar al volver a abrir
  const loadStarted = useRef(false);

  const loadIndex = useCallback(async () => {
    if (loadStarted.current) return;
    loadStarted.current = true;
    setLoad("loading");

    try {
      const response = await fetch("/indice-busqueda");
      if (!response.ok) throw new Error(String(response.status));
      setPrepared(prepareItems((await response.json()) as SearchItem[]));
      setLoad("ready");
    } catch {
      loadStarted.current = false;
      setLoad("error");
    }
  }, []);

  const openPalette = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
    inputRef.current?.focus();
    void loadIndex();
  }, [loadIndex]);

  function closePalette() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key.toLowerCase() !== "k" || !(event.ctrlKey || event.metaKey))
        return;

      event.preventDefault();
      const dialog = dialogRef.current;
      if (dialog?.open) dialog.close();
      else openPalette();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openPalette]);

  function go(item: SearchItem) {
    closePalette();
    router.push(item.href);
  }

  function moveActive(next: number) {
    if (results.length === 0) return;
    const index = (next + results.length) % results.length;
    setActiveIndex(index);
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(activeIndex - 1);
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      go(results[activeIndex]);
    }
  }

  // Un clic en el fondo (fuera de la caja) cierra
  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) closePalette();
  }

  const showEmpty =
    load === "ready" && query.trim() !== "" && results.length === 0;

  return (
    <>
      <button
        type="button"
        className={styles["search-palette__trigger"]}
        onClick={openPalette}
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <svg
          className={styles["search-palette__icon"]}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <circle
            cx="8.5"
            cy="8.5"
            r="5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="m13 13 4.5 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Buscar
        <kbd className={styles["search-palette__kbd"]}>Ctrl K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        className={styles["search-palette"]}
        aria-label="Buscar en ValveDex"
        onClick={handleDialogClick}
        onClose={() => {
          setQuery("");
          setActiveIndex(0);
        }}
      >
        <div className={styles["search-palette__box"]}>
          <input
            ref={inputRef}
            type="text"
            enterKeyHint="search"
            role="combobox"
            className={styles["search-palette__input"]}
            placeholder="Busca un juego, un arma, un personaje…"
            autoComplete="off"
            spellCheck={false}
            value={query}
            aria-label="Buscar"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={
              results[activeIndex] ? `${listId}-${activeIndex}` : undefined
            }
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
          />

          <p className={styles["search-palette__hint"]} aria-live="polite">
            {load === "loading" && "Cargando el índice…"}
            {load === "error" &&
              "No se pudo cargar el índice. Cierra y vuelve a abrir el buscador."}
            {load === "ready" &&
              (query.trim() === ""
                ? "Accesos rápidos"
                : `${results.length} ${results.length === 1 ? "resultado" : "resultados"}`)}
          </p>

          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            className={styles["search-palette__list"]}
            aria-label="Resultados"
          >
            {results.map((item, index) => (
              <li
                key={item.href}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                data-index={index}
                className={`${styles["search-palette__item"]} ${index === activeIndex ? styles["search-palette__item--active"] : ""}`}
                onMouseMove={() => setActiveIndex(index)}
                onClick={() => go(item)}
              >
                <span className={styles["search-palette__type"]}>
                  {typeLabels[item.type]}
                </span>
                <span className={styles["search-palette__name"]}>
                  {item.name}
                </span>
                <span className={styles["search-palette__detail"]}>
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>

          {showEmpty && (
            <p className={styles["search-palette__empty"]}>
              Nada con «{query.trim()}». Prueba con otra palabra o explora las{" "}
              fichas por categoría.
            </p>
          )}

          <p className={styles["search-palette__footer"]} aria-hidden="true">
            <kbd>↑</kbd> <kbd>↓</kbd> moverse · <kbd>Intro</kbd> abrir ·{" "}
            <kbd>Esc</kbd> cerrar
          </p>
        </div>
      </dialog>
    </>
  );
}
