"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
  subtext?: string;
  disabled?: boolean;
}

export interface SelectProps {
  id?: string;
  name?: string;
  label?: string;
  telemetryTag?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  error?: string;
  hint?: string;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Select({
  id,
  name,
  label,
  telemetryTag,
  placeholder = "Select an option...",
  options,
  value,
  defaultValue,
  error,
  hint,
  iconLeft,
  disabled = false,
  required = false,
  onChange,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value || defaultValue || "");
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync controlled value
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) {return;}

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currIndex = options.findIndex((opt) => opt.value === internalValue);
        const nextIndex = currIndex < options.length - 1 ? currIndex + 1 : 0;
        const nextOpt = options[nextIndex];
        if (nextOpt && !nextOpt.disabled) {
          setInternalValue(nextOpt.value);
          onChange?.(nextOpt.value);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currIndex = options.findIndex((opt) => opt.value === internalValue);
        const prevIndex = currIndex > 0 ? currIndex - 1 : options.length - 1;
        const prevOpt = options[prevIndex];
        if (prevOpt && !prevOpt.disabled) {
          setInternalValue(prevOpt.value);
          onChange?.(prevOpt.value);
        }
      }
    }
  };

  const handleSelectOption = (opt: SelectOption) => {
    if (opt.disabled) {return;}
    setInternalValue(opt.value);
    onChange?.(opt.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === internalValue);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {/* Hidden native input for form submissions */}
      <input
        type="hidden"
        name={name || id}
        value={internalValue}
        required={required}
      />

      {/* Label & Tag Row */}
      {(label || telemetryTag) && (
        <div className={styles.labelRow}>
          {label && (
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
          )}
          {telemetryTag && (
            <span className={styles.telemetryTag}>{telemetryTag}</span>
          )}
        </div>
      )}

      {/* Select Trigger Container */}
      <div className={styles.selectContainer}>
        {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}

        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          className={`
            ${styles.trigger}
            ${iconLeft ? styles.withIconLeft : ""}
            ${isOpen ? styles.triggerOpen : ""}
            ${error ? styles.selectError : ""}
            ${className}
          `.trim()}
        >
          <span
            className={
              selectedOption
                ? styles.triggerTextActive
                : styles.triggerTextPlaceholder
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className={styles.chevron}>
            <ChevronDown size={16} />
          </div>
        </button>

        {/* Floating Custom Popover Menu */}
        {isOpen && (
          <div id={`${id}-listbox`} className={styles.dropdownMenu} role="listbox" tabIndex={-1}>
            {options.map((opt) => {
              const isSelected = opt.value === internalValue;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => handleSelectOption(opt)}
                  className={`${styles.optionItem} ${isSelected ? styles.optionSelected : ""}`}
                >
                  <div className={styles.optionContent}>
                    <span>{opt.label}</span>
                    {opt.subtext && (
                      <span className={styles.optionSubtext}>{opt.subtext}</span>
                    )}
                  </div>
                  {isSelected && (
                    <Check size={15} className={styles.checkIcon} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <div className={styles.errorText}>{error}</div>}
      {hint && !error && <div className={styles.hintText}>{hint}</div>}
    </div>
  );
}
