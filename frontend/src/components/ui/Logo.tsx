"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    showText?: boolean;
    variant?: "default" | "light" | "dark";
    className?: string;
    linkTo?: string;
}

const LOGO_URL = "https://stemmantra.com/assets/img/Custom/Newlogo.jpeg";

const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
};

const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
};

export default function Logo({
    size = "md",
    showText = true,
    variant = "default",
    className,
    linkTo = "/",
}: LogoProps) {
    const textColorClass = variant === "light"
        ? "text-white"
        : variant === "dark"
            ? "text-slate-800"
            : "";

    const content = (
        <div className={cn("flex items-center gap-3", className)}>
            <div className={cn(
                "rounded-xl overflow-hidden shadow-lg flex-shrink-0",
                sizeClasses[size]
            )}>
                <Image
                    src={LOGO_URL}
                    alt="STEM Mantra Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    priority
                />
            </div>
            {showText && (
                <div className="flex flex-col">
                    <span className={cn("font-heading font-bold leading-tight", textSizeClasses[size])}>
                        <span className={variant === "light" ? "text-orange-400" : "text-orange-500"}>STEM</span>
                        <span className={textColorClass || "text-gray-800"}>Mantra</span>
                    </span>
                    <span className={cn(
                        "text-[10px] tracking-widest uppercase",
                        variant === "light" ? "text-white/70" : "text-gray-500"
                    )}>
                        Drive Your Future
                    </span>
                </div>
            )}
        </div>
    );

    if (linkTo) {
        return (
            <Link href={linkTo} className="group relative z-50">
                {content}
            </Link>
        );
    }

    return content;
}
