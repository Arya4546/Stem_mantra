import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl p-8 shadow-lg",
        hover && "hover:shadow-2xl hover:-translate-y-2 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
