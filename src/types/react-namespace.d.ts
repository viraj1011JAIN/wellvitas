// src/types/react-namespace.d.ts
// Shim for React 19: provide React.ReactNode and React.ComponentType namespace
// so Next.js's generated types (in .next/types) compile cleanly.

import type {
  ReactNode as _ReactNode,
  ComponentType as _ComponentType,
} from "react";

declare global {
  namespace React {
    // Map to the real React types via distinct aliases
    type ReactNode = _ReactNode;
    // Avoid `any` to satisfy @typescript-eslint/no-explicit-any:
    type ComponentType<P = Record<string, unknown>> = _ComponentType<P>;
  }
}

export {};
