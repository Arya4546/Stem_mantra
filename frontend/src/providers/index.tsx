"use client";

import { ReactNode } from "react";
import ToasterProvider from "./ToasterProvider";
import { RouteLoadingProvider } from "./RouteLoadingProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RouteLoadingProvider>
      {children}
      <ToasterProvider />
    </RouteLoadingProvider>
  );
}
