"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Button Variants & Sizes
// ============================================

const buttonVariants = {
  primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200",
  outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/25",
  success: "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/25",
  link: "text-indigo-600 hover:text-indigo-700 underline-offset-4 hover:underline p-0 h-auto",
};

const buttonSizes = {
  sm: "h-9 px-4 text-sm rounded-lg",
  md: "h-11 px-6 text-sm rounded-lg",
  lg: "h-12 px-8 text-base rounded-xl",
  xl: "h-14 px-10 text-lg rounded-xl",
  icon: "h-10 w-10 rounded-lg",
  "icon-sm": "h-8 w-8 rounded-md",
  "icon-lg": "h-12 w-12 rounded-xl",
};

// ============================================
// Button Component
// ============================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-[0.98]",
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="opacity-70">{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// ============================================
// Icon Button Component
// ============================================

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  "aria-label": string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", size = "md", isLoading, children, ...props }, ref) => {
    const sizeMap = {
      sm: "icon-sm",
      md: "icon",
      lg: "icon-lg",
    } as const;

    return (
      <Button
        ref={ref}
        variant={variant}
        size={sizeMap[size]}
        isLoading={isLoading}
        className={className}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

// ============================================
// Button Group Component
// ============================================

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonGroup = ({ children, className }: ButtonGroupProps) => {
  return (
    <div className={cn("inline-flex rounded-lg overflow-hidden shadow-sm", className)}>
      {children}
    </div>
  );
};

export { Button, IconButton, ButtonGroup };
