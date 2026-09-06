import React, { forwardRef } from "react";
import styles from "./Divider.module.css";
import Text from "./Text";
import type { HTMLAttributes } from "react";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "subtle" | "gradient" | "laser";
export type DividerSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface DividerProps extends HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  spacing?: DividerSpacing;
  label?: React.ReactNode;
  className?: string;
}

const spacingMap: Record<DividerSpacing, string> = {
  none: styles.spacingNone,
  xs: styles.spacingXs,
  sm: styles.spacingSm,
  md: styles.spacingMd,
  lg: styles.spacingLg,
  xl: styles.spacingXl,
  "2xl": styles.spacing2xl,
};

const verticalSpacingMap: Record<DividerSpacing, string> = {
  none: styles.verticalSpacingNone,
  xs: styles.verticalSpacingXs,
  sm: styles.verticalSpacingSm,
  md: styles.verticalSpacingMd,
  lg: styles.verticalSpacingLg,
  xl: styles.verticalSpacingLg,
  "2xl": styles.verticalSpacingLg,
};

const variantMap: Record<DividerVariant, string> = {
  subtle: styles.variantSubtle,
  gradient: styles.variantGradient,
  laser: styles.variantLaser,
};

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "gradient",
      spacing = "md",
      label,
      className = "",
      ...props
    },
    ref,
  ) => {
    // If a label is provided for horizontal divider, render labeled flex structure
    if (label && orientation === "horizontal") {
      return (
        <div
          role="separator"
          aria-orientation="horizontal"
          className={[
            styles.labeledContainer,
            spacingMap[spacing],
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          <div className={[styles.labelLine, variantMap[variant]].join(" ")} />
          <div className={styles.labelContent}>
            {typeof label === "string" ? (
              <Text font="mono" size="2xs" tone="cyan" weight="semibold" uppercase>
                {label}
              </Text>
            ) : (
              label
            )}
          </div>
          <div className={[styles.labelLine, variantMap[variant]].join(" ")} />
        </div>
      );
    }

    const classNames = [
      styles.divider,
      styles[orientation],
      variantMap[variant],
      orientation === "horizontal"
        ? spacingMap[spacing]
        : verticalSpacingMap[spacing],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <hr
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={classNames}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";

export default Divider;
