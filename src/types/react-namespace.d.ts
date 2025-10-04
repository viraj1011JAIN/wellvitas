// src/types/react-namespace.d.ts
// Shim to satisfy Next's generated types that reference React.ReactNode
import type { ReactNode as _ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace React {
    type ReactNode = _ReactNode;
  }
}

export {};
