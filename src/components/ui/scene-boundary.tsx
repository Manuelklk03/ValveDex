"use client";

import { Component, type ReactNode } from "react";

// Si WebGL no está disponible o la escena falla, el fondo 3D desaparece y el resto de la página (textos, enlaces,
// navegación) sigue funcionando
export class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
