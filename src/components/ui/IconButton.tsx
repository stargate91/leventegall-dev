import React, { forwardRef } from "react";
import styles from "./IconButton.module.css";

export interface IconButtonProps extends React.HTMLAttributes<HTMLElement> {
  icon: React.ReactNode;
  ariaLabel: string;
  href?: string | undefined;
  target?: string | undefined;
  rel?: string | undefined;
  onClick?: ((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void) | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  variant?: "default" | "surface" | "ghost" | "accent" | undefined;
  title?: string | undefined;
  disabled?: boolean | undefined;
  ariaExpanded?: boolean | undefined;
  ariaControls?: string | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  id?: string | undefined;
}

/**
 * IconButton UI Primitive
 * Polymorphic clickable icon button/link with tokenized styles and accessible labels.
 */
const IconButton = forwardRef<HTMLButtonElement & HTMLAnchorElement, IconButtonProps>(
  (
    {
      icon,
      ariaLabel,
      href,
      target,
      rel,
      onClick,
      type = "button",
      size = "md",
      variant = "default",
      title,
      disabled = false,
      ariaExpanded,
      ariaControls,
      className = "",
      style,
      id,
      ...rest
    },
    ref,
  ) => {
    const sizeClass = styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`] ?? styles.sizeMd;
    const variantClass = styles[variant] ?? styles.default;
    const combinedClass = `${styles.iconBtn} ${sizeClass} ${variantClass} ${className}`.trim();

    if (href && !disabled) {
      return (
        <a
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          id={id}
          href={href}
          target={target}
          rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
          onClick={onClick}
          aria-label={ariaLabel}
          title={title}
          className={combinedClass}
          style={style}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {icon}
        </a>
      );
    }

    return (
      <button
        ref={ref as unknown as React.Ref<HTMLButtonElement>}
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        title={title}
        className={combinedClass}
        style={style}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
