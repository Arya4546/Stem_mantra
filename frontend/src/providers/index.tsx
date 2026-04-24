"use client";

import { ReactNode, Suspense } from "react";
import QueryProvider from "./QueryProvider";
import ToasterProvider from "./ToasterProvider";
import { AuthProvider } from "./auth-provider";
import { RouteLoadingProvider } from "./RouteLoadingProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <RouteLoadingProvider>
          {children}
        </RouteLoadingProvider>
        <ToasterProvider />
      </AuthProvider>
    </QueryProvider>
  );
}
