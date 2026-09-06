"use client";

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";
import type { ReactNode } from "react";

export type TooltipSide = "top" | "bottom" | "left" | "right";
export type TooltipAlign = "start" | "center" | "end";
export type TooltipVariant = "default" | "cyan" | "muted";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  variant?: TooltipVariant;
  arrow?: boolean;
  delayDuration?: number;
  className?: string;
  asChild?: boolean;
}

const variantMap: Record<TooltipVariant, string> = {
  default: "",
  cyan: styles.variantCyan ?? "",
  muted: styles.variantMuted ?? "",
};

export function TooltipProvider({
  children,
  delayDuration = 150,
  skipDelayDuration = 300,
}: {
  children: ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}

function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
  variant = "default",
  arrow = true,
  delayDuration = 150,
  className = "",
  asChild = true,
}: TooltipProps) {
  if (!content) {
    return <>{children}</>;
  }

  const contentClasses = [
    styles.content,
    variantMap[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild={asChild}>
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={contentClasses}
          >
            {content}
            {arrow && (
              <TooltipPrimitive.Arrow
                className={styles.arrow}
                width={8}
                height={4}
              />
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export default Tooltip;
