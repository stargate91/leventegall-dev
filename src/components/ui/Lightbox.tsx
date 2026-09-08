"use client";

import { useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Close, ChevronLeft, ChevronRight } from "@carbon/icons-react";
import Image from "next/image";
import styles from "./Lightbox.module.css";

export interface LightboxItem {
  src: string;
  alt: string;
  title?: string | undefined;
  caption?: string | undefined;
}

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: LightboxItem | null | undefined;
  currentIndex?: number | undefined;
  totalCount?: number | undefined;
  onPrev?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
  closeLabel?: string | undefined;
  prevLabel?: string | undefined;
  nextLabel?: string | undefined;
  children?: ReactNode;
}

export default function Lightbox({
  isOpen,
  onClose,
  activeItem,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  closeLabel = "Close viewer",
  prevLabel = "Previous image",
  nextLabel = "Next image",
  children,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) {return;}

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (!isOpen) {return;}

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!mounted || !isOpen) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  const hasMultiple = totalCount !== undefined && totalCount > 1;

  const content = (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={activeItem?.title || "Image Lightbox"}
      className={styles.backdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            {activeItem?.title && (
              <span className={styles.title}>{activeItem.title}</span>
            )}
            {totalCount !== undefined && currentIndex !== undefined && (
              <span className={styles.counter}>
                [ {currentIndex + 1} / {totalCount} ]
              </span>
            )}
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={closeLabel}
          >
            <Close size={20} />
          </button>
        </div>

        {/* Media Container */}
        <div className={styles.body}>
          {hasMultiple && onPrev && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={onPrev}
              aria-label={prevLabel}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {activeItem && (
            <div className={styles.imageContainer}>
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                width={1920}
                height={1080}
                priority
                className={styles.image}
              />
            </div>
          )}

          {children}

          {hasMultiple && onNext && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={onNext}
              aria-label={nextLabel}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Caption Footer */}
        {activeItem?.caption && (
          <div className={styles.footer}>
            <p className={styles.caption}>{activeItem.caption}</p>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
