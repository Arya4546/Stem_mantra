"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Input Component
// ============================================

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, success, hint, leftIcon, rightIcon, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              "flex h-11 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-all duration-200",
              "placeholder:text-slate-400",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
              leftIcon && "pl-10",
              (rightIcon || isPassword) && "pr-10",
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : success
                ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200",
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || success || hint) && (
          <div className={cn(
            "flex items-center gap-1.5 text-xs",
            error ? "text-red-600" : success ? "text-green-600" : "text-slate-500"
          )}>
            {error && <AlertCircle className="h-3.5 w-3.5" />}
            {success && <CheckCircle2 className="h-3.5 w-3.5" />}
            <span>{error || success || hint}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ============================================
// Textarea Component
// ============================================

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[100px] w-full rounded-lg border bg-white px-3 py-2 text-sm transition-all duration-200",
            "placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            "resize-y",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200",
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {(error || hint) && (
          <div className={cn(
            "flex items-center gap-1.5 text-xs",
            error ? "text-red-600" : "text-slate-500"
          )}>
            {error && <AlertCircle className="h-3.5 w-3.5" />}
            <span>{error || hint}</span>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// ============================================
// Select Component
// ============================================

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <select
          className={cn(
            "flex h-11 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200",
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(error || hint) && (
          <div className={cn(
            "flex items-center gap-1.5 text-xs",
            error ? "text-red-600" : "text-slate-500"
          )}>
            {error && <AlertCircle className="h-3.5 w-3.5" />}
            <span>{error || hint}</span>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// ============================================
// Checkbox Component
// ============================================

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, disabled, ...props }, ref) => {
    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-slate-300 text-indigo-600 transition-colors",
            "focus:ring-2 focus:ring-indigo-200 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-300",
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <div className="flex flex-col">
          <label className={cn(
            "text-sm font-medium",
            disabled ? "text-slate-400" : "text-slate-700"
          )}>
            {label}
          </label>
          {description && (
            <span className="text-xs text-slate-500">{description}</span>
          )}
          {error && (
            <span className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
              <AlertCircle className="h-3 w-3" />
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Input, Textarea, Select, Checkbox };
