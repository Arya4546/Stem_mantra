"use client";

import { useEffect, useState } from "react";

// SVG Icons for floating elements
const DroneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="32" rx="8" ry="4" fill="currentColor" opacity="0.8" />
    <rect x="28" y="28" width="8" height="8" rx="2" fill="currentColor" />
    <rect x="10" y="30" width="12" height="4" rx="2" fill="currentColor" opacity="0.7" />
    <rect x="42" y="30" width="12" height="4" rx="2" fill="currentColor" opacity="0.7" />
    <circle cx="16" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="48" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M13 29 L19 35 M19 29 L13 35" stroke="currentColor" strokeWidth="1.5" />
    <path d="M45 29 L51 35 M51 29 L45 35" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="36" r="2" fill="#22c55e" />
  </svg>
);

const RobotIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="24" height="28" rx="4" fill="currentColor" />
    <rect x="24" y="24" width="6" height="6" rx="1" fill="#22c55e" />
    <rect x="34" y="24" width="6" height="6" rx="1" fill="#22c55e" />
    <rect x="26" y="34" width="12" height="4" rx="1" fill="white" opacity="0.5" />
    <rect x="14" y="26" width="6" height="16" rx="2" fill="currentColor" opacity="0.7" />
    <rect x="44" y="26" width="6" height="16" rx="2" fill="currentColor" opacity="0.7" />
    <rect x="28" y="8" width="8" height="12" rx="2" fill="currentColor" opacity="0.8" />
    <circle cx="32" cy="8" r="4" fill="currentColor" />
  </svg>
);

const GearIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 12L35 8L40 10L38 15L43 18L48 16L50 21L45 23L46 29L51 30L50 36L44 35L42 40L46 44L42 48L38 44L34 47L35 53L29 53L30 47L25 44L21 48L17 44L21 40L19 35L13 36L12 30L18 29L17 23L12 21L14 16L20 18L25 15L23 10L28 8L32 12Z"
      fill="currentColor"
      opacity="0.9"
    />
    <circle cx="32" cy="32" r="8" fill="white" opacity="0.3" />
    <circle cx="32" cy="32" r="4" fill="currentColor" />
  </svg>
);

const CircuitIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="24" width="16" height="16" rx="2" fill="currentColor" />
    <path d="M8 32 H24 M40 32 H56" stroke="currentColor" strokeWidth="2" />
    <path d="M32 8 V24 M32 40 V56" stroke="currentColor" strokeWidth="2" />
    <circle cx="8" cy="32" r="3" fill="currentColor" />
    <circle cx="56" cy="32" r="3" fill="currentColor" />
    <circle cx="32" cy="8" r="3" fill="currentColor" />
    <circle cx="32" cy="56" r="3" fill="currentColor" />
    <path d="M16 20 L24 24 M40 24 L48 20" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 44 L24 40 M40 40 L48 44" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const BulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 8C22 8 14 16 14 26C14 33 18 39 24 42V50H40V42C46 39 50 33 50 26C50 16 42 8 32 8Z"
      fill="currentColor"
      opacity="0.9"
    />
    <rect x="26" y="50" width="12" height="6" rx="1" fill="currentColor" />
    <path d="M28 56 L28 60 L36 60 L36 56" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="26" r="8" fill="#fbbf24" opacity="0.6" />
    <path d="M32 18 V22 M38 20 L35 23 M26 20 L29 23" stroke="#fbbf24" strokeWidth="2" />
  </svg>
);

const AtomIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="6" fill="currentColor" />
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <ellipse
      cx="32"
      cy="32"
      rx="24"
      ry="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      transform="rotate(60 32 32)"
    />
    <ellipse
      cx="32"
      cy="32"
      rx="24"
      ry="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      transform="rotate(120 32 32)"
    />
    <circle cx="56" cy="32" r="3" fill="#22c55e" />
    <circle cx="20" cy="52" r="3" fill="#0891b2" />
    <circle cx="20" cy="12" r="3" fill="#f97316" />
  </svg>
);

interface FloatingElement {
  id: number;
  icon: "drone" | "robot" | "gear" | "circuit" | "bulb" | "atom";
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
  opacity: number;
}

const iconComponents = {
  drone: DroneIcon,
  robot: RobotIcon,
  gear: GearIcon,
  circuit: CircuitIcon,
  bulb: BulbIcon,
  atom: AtomIcon,
};

const colorClasses = [
  "text-orange-500",
  "text-teal-500",
  "text-cyan-500",
  "text-purple-500",
  "text-orange-400",
  "text-teal-400",
];

interface FloatingAnimationsProps {
  variant?: "hero" | "section" | "full";
  density?: "low" | "medium" | "high";
  className?: string;
}

export default function FloatingAnimations({
  variant = "section",
  density = "medium",
  className = "",
}: FloatingAnimationsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const elementCount = density === "low" ? 6 : density === "medium" ? 10 : 15;
    const icons: FloatingElement["icon"][] = ["drone", "robot", "gear", "circuit", "bulb", "atom"];

    const newElements: FloatingElement[] = [];

    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: i,
        icon: icons[i % icons.length],
        size: 20 + Math.random() * 40,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 8,
        color: colorClasses[Math.floor(Math.random() * colorClasses.length)],
        opacity: 0.15 + Math.random() * 0.25,
      });
    }

    setElements(newElements);
  }, [density]);

  if (!isClient) return null;

  const getAnimationStyle = (element: FloatingElement) => {
    const animations = [
      "animate-float",
      "animate-float-slow",
      "animate-spin-slow",
      "animate-bounce-subtle",
      "animate-fly",
    ];

    // Gears always spin, drones always fly
    if (element.icon === "gear") return "animate-spin-slow";
    if (element.icon === "drone") return "animate-fly";
    if (element.icon === "robot") return "animate-bounce-subtle";
    if (element.icon === "atom") return "animate-spin-reverse";

    return animations[Math.floor(Math.random() * animations.length)];
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {elements.map((element) => {
        const IconComponent = iconComponents[element.icon];
        const animationClass = getAnimationStyle(element);

        return (
          <div
            key={element.id}
            className={`floating-element ${element.color} ${animationClass}`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              opacity: element.opacity,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          >
            <IconComponent className="w-full h-full" />
          </div>
        );
      })}

      {/* Additional decorative elements based on variant */}
      {variant === "hero" && (
        <>
          {/* Large blurred gradient orbs */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20 animate-float-slow"
            style={{
              background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)",
              left: "-10%",
              top: "20%",
              animationDelay: "0s",
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-15 animate-float"
            style={{
              background: "radial-gradient(circle, rgba(8,145,178,0.3) 0%, transparent 70%)",
              right: "-15%",
              top: "10%",
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-10 animate-float-slow"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
              left: "30%",
              bottom: "0%",
              animationDelay: "4s",
            }}
          />
        </>
      )}

      {variant === "full" && (
        <>
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(249,115,22,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(249,115,22,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </>
      )}
    </div>
  );
}

// Export individual animated elements for custom use
export function AnimatedDrone({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`animate-fly text-orange-500 ${className}`} style={style}>
      <DroneIcon className="w-full h-full" />
    </div>
  );
}

export function AnimatedRobot({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`animate-bounce-subtle text-teal-500 ${className}`} style={style}>
      <RobotIcon className="w-full h-full" />
    </div>
  );
}

export function AnimatedGear({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`animate-spin-slow text-gray-400 ${className}`} style={style}>
      <GearIcon className="w-full h-full" />
    </div>
  );
}

export function AnimatedAtom({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`animate-spin-reverse text-purple-500 ${className}`} style={style}>
      <AtomIcon className="w-full h-full" />
    </div>
  );
}
