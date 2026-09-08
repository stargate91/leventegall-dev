"use client";

import React, { useState } from "react";
import { User } from "@carbon/icons-react";
import styles from "./Avatar.module.css";

export type AvatarShape = "circle" | "square" | "rounded";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;
export type AvatarVariant = "default" | "glow" | "bordered" | "hud";
export type AvatarStatus = "online" | "busy" | "away" | "offline";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null | undefined;
  alt?: string | undefined;
  fallback?: React.ReactNode | undefined;
  initials?: string | undefined;
  shape?: AvatarShape | undefined;
  size?: AvatarSize | undefined;
  variant?: AvatarVariant | undefined;
  status?: AvatarStatus | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

const sizeClassMap: Record<string, string | undefined> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  "2xl": styles.size2Xl,
};

const shapeClassMap: Record<AvatarShape, string | undefined> = {
  circle: styles.shapeCircle,
  square: styles.shapeSquare,
  rounded: styles.shapeRounded,
};

const variantClassMap: Record<AvatarVariant, string | undefined> = {
  default: styles.variantDefault,
  glow: styles.variantGlow,
  bordered: styles.variantBordered,
  hud: styles.variantHud,
};

const statusClassMap: Record<AvatarStatus, string | undefined> = {
  online: styles.statusOnline,
  busy: styles.statusBusy,
  away: styles.statusAway,
  offline: styles.statusOffline,
};

const defaultIconSizeMap: Record<string, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
};

export default function Avatar({
  src,
  alt = "Avatar",
  fallback,
  initials,
  shape = "circle",
  size = "md",
  variant = "default",
  status,
  className = "",
  style,
  ...restProps
}: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);

  const isNumericSize = typeof size === "number";
  const sizeClass = !isNumericSize ? sizeClassMap[size] || styles.sizeMd : "";
  const shapeClass = shapeClassMap[shape] || styles.shapeCircle;
  const variantClass = variantClassMap[variant] || styles.variantDefault;

  const dynamicStyle: React.CSSProperties = {
    ...(isNumericSize ? { width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.38)}px` } : {}),
    ...style,
  };

  const iconPixelSize = isNumericSize
    ? Math.round(size * 0.5)
    : defaultIconSizeMap[typeof size === "string" ? size : "md"] || 20;

  return (
    <div
      className={`${styles.avatar} ${shapeClass} ${sizeClass} ${variantClass} ${className}`}
      style={dynamicStyle}
      aria-label={alt}
      role="img"
      {...restProps}
    >
      {src && !hasImageError ? (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className={styles.fallback} aria-hidden="true">
          {initials ? (
            <span>{initials.slice(0, 3)}</span>
          ) : fallback ? (
            fallback
          ) : (
            <span className={styles.fallbackIcon}>
              <User size={iconPixelSize} />
            </span>
          )}
        </div>
      )}

      {status && (
        <span
          className={`${styles.statusBadge} ${statusClassMap[status]}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
