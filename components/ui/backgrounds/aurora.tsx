"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              // Keep the main blue/teal radial glow as a base
              background:
                "radial-gradient(ellipse at 60% 40%, #3fdad8 0%, #1b2a5c 60%, transparent 100%)",
              // Restore the animated aurora and dark/white gradients for after pseudo-element
              "--aurora":
                "repeating-linear-gradient(100deg,#3fdad8_10%,#4fd1ff_18%,#1e40af_28%,#a78bfa_40%,#f472b6_55%,#faffd1_70%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
              "--teal": "#3fdad8",
              "--cyan": "#4fd1ff",
              "--blue": "#1e40af",
              "--purple": "#a78bfa",
              "--magenta": "#f472b6",
              "--yellowgreen": "#faffd1",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          {/* Main blue/teal glow is now in the background style above */}
          {/* Magenta spot */}
          <div className="pointer-events-none absolute left-[-10%] top-[10vh] h-[60vh] w-[40%] rounded-full bg-[#a78bfa] opacity-40 blur-3xl" />
          {/* Cyan spot */}
          <div className="pointer-events-none absolute right-[-10%] top-[90vh] h-[50vh] w-[35%] rounded-full bg-[#4fd1ff] opacity-30 blur-3xl" />
          {/* Magenta/Red spot */}
          <div className="pointer-events-none absolute right-[10%] top-[20vh] h-[40vh] w-[25%] rounded-full bg-[#f472b6] opacity-20 blur-3xl" />
          {/* Optional: Soft yellow/green spot for realism */}
          <div className="pointer-events-none absolute left-[30%] top-[90vh] h-[30vh] w-[20%] rounded-full bg-[#faffd1] opacity-10 blur-3xl" />
          {/* Dark overlay for depth */}
          <div className="pointer-events-none absolute inset-0 bg-black opacity-40" />
          <div
            className={cn(
              // Restore the animated aurora and gradients for movement
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-60 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--teal)_10%,var(--cyan)_18%,var(--blue)_28%,var(--purple)_40%,var(--magenta)_55%,var(--yellowgreen)_70%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[\"\"] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        <div
          className="pointer-events-none absolute left-0 top-[90vh] w-full bg-[#0f1118]"
          style={{
            height: "10vh", // Adjust as needed for a longer/shorter fade
            background: "linear-gradient(to bottom, transparent, #0f1118 100%)",
            zIndex: 100,
          }}
        />

        {children}
      </div>
    </main>
  );
};
