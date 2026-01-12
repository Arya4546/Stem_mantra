"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ============================================
// Card Component
// ============================================

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", hover = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-white border border-slate-200",
      bordered: "bg-white border-2 border-slate-200",
      elevated: "bg-white shadow-lg shadow-slate-200/50",
      glass: "bg-white/80 backdrop-blur-sm border border-white/20",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl transition-all duration-200",
          variants[variant],
          paddings[padding],
          hover && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// ============================================
// Card Header
// ============================================

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-start justify-between gap-4 mb-4", className)}
        {...props}
      >
        <div className="space-y-1">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {description && <p className="text-sm text-slate-500">{description}</p>}
          {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// ============================================
// Card Content
// ============================================

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("", className)} {...props} />;
  }
);

CardContent.displayName = "CardContent";

// ============================================
// Card Footer
// ============================================

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, bordered = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 mt-4 pt-4",
          bordered && "border-t border-slate-100",
          className
        )}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

// ============================================
// Stat Card Component
// ============================================

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconBg = "bg-indigo-100",
  className,
}: StatCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-start justify-between">
        {icon && (
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBg)}>
            {icon}
          </div>
        )}
        {change !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              isPositive && "bg-green-100 text-green-700",
              isNegative && "bg-red-100 text-red-700",
              !isPositive && !isNegative && "bg-slate-100 text-slate-700"
            )}
          >
            {isPositive && "↑"}
            {isNegative && "↓"}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {changeLabel && <p className="text-xs text-slate-400 mt-1">{changeLabel}</p>}
      </div>
    </Card>
  );
};

export { Card, CardHeader, CardContent, CardFooter, StatCard };
export default Card;
