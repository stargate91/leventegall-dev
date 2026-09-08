"use client";

import { useEffect, type RefObject } from "react";

interface UseFocusTrapOptions {
  isOpen: boolean;
  onClose?: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T | null>,
  { isOpen, onClose, returnFocusRef }: UseFocusTrapOptions,
) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (onClose) {
          onClose();
        }
        returnFocusRef?.current?.focus();
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        const interactiveItems = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (interactiveItems.length === 0) {
          return;
        }

        const first = interactiveItems[0];
        const last = interactiveItems[interactiveItems.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, containerRef, returnFocusRef]);
}
