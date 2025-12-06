"use client";

import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import ToasterProvider from "./ToasterProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      {children}
      <ToasterProvider />
    </QueryProvider>
  );
}
