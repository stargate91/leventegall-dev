import React, { forwardRef } from "react";
import styles from "./Text.module.css";
import type { ElementType, HTMLAttributes } from "react";

export type TextTone =
  | "primary"
  | "secondary"
  | "muted"
  | "dim"
  | "cyan"
  | "success"
  | "warning"
  | "danger"
  | "gradient";

export type TextSize =
  | "2xs"
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export type TextFont = "body" | "heading" | "mono";
export type TextWeight = "regular" | "medium" | "semibold" | "bold" | "extrabold";
export type TextLeading = "none" | "tight" | "normal" | "relaxed";
export type TextAlign = "left" | "center" | "right";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  tone?: TextTone;
  size?: TextSize;
  font?: TextFont;
  weight?: TextWeight;
  leading?: TextLeading;
  align?: TextAlign;
  glow?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  truncate?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const sizeMap: Record<TextSize, string> = {
  "2xs": styles.size2xs,
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  base: styles.sizeBase,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  "2xl": styles.size2xl,
  "3xl": styles.size3xl,
  "4xl": styles.size4xl,
  "5xl": styles.size5xl,
};

const toneMap: Record<TextTone, string> = {
  primary: styles.tonePrimary,
  secondary: styles.toneSecondary,
  muted: styles.toneMuted,
  dim: styles.toneDim,
  cyan: styles.toneCyan,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
  gradient: styles.toneGradient,
};

const fontMap: Record<TextFont, string> = {
  body: styles.fontBody,
  heading: styles.fontHeading,
  mono: styles.fontMono,
};

const weightMap: Record<TextWeight, string> = {
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
  extrabold: styles.weightExtrabold,
};

const leadingMap: Record<TextLeading, string> = {
  none: styles.leadingNone,
  tight: styles.leadingTight,
  normal: styles.leadingNormal,
  relaxed: styles.leadingRelaxed,
};

const alignMap: Record<TextAlign, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
};

const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = "p",
      tone = "primary",
      size,
      font,
      weight,
      leading,
      align,
      glow = false,
      italic = false,
      uppercase = false,
      truncate = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const classNames = [
      styles.text,
      toneMap[tone],
      size && sizeMap[size],
      font && fontMap[font],
      weight && weightMap[weight],
      leading && leadingMap[leading],
      align && alignMap[align],
      glow && styles.glow,
      italic && styles.italic,
      uppercase && styles.uppercase,
      truncate && styles.truncate,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component ref={ref} className={classNames} {...props}>
        {children}
      </Component>
    );
  },
);

Text.displayName = "Text";

export default Text;
