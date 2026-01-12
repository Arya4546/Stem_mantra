"use client";

import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import ToasterProvider from "./ToasterProvider";
import { AuthProvider } from "./auth-provider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <ToasterProvider />
      </AuthProvider>
    </QueryProvider>
  );
}
