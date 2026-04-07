import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "gray" | "gradient";
}

export default function Section({
  children,
  className,
  id,
  background = "white",
}: SectionProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gradient-to-br from-gray-50 to-blue-50",
    gradient: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600",
  };

  return (
    <section
      id={id}
      className={cn("py-24 px-4", backgrounds[background], className)}
    >
      {children}
    </section>
  );
}
