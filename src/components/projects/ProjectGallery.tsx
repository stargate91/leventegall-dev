"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Maximize } from "@carbon/icons-react";
import styles from "./ProjectGallery.module.css";
import type { ProjectScreenshot } from "@/data/projects";
import { Lightbox } from "@/components/ui";
import { useLocale } from "@/locales";

interface ProjectGalleryProps {
  items: ProjectScreenshot[];
  previewCaption?: string | undefined;
  layout?: "vertical" | "grid";
}

export default function ProjectGallery({
  items,
  previewCaption,
  layout = "vertical",
}: ProjectGalleryProps) {
  const { dict } = useLocale();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleOpen = (idx: number) => {
    setActiveIdx(idx);
  };

  const handleClose = useCallback(() => {
    setActiveIdx(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev !== null ? (prev === 0 ? items.length - 1 : prev - 1) : null));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev !== null ? (prev === items.length - 1 ? 0 : prev + 1) : null));
  }, [items.length]);

  if (!items || items.length === 0) {
    return null;
  }

  const activeShot = activeIdx !== null ? items[activeIdx] : null;
  const isGrid = layout === "grid";

  return (
    <div className={isGrid ? styles.galleryContainerGrid : styles.galleryContainer}>
      <div className={isGrid ? styles.gridColumns : styles.grid}>
        {items.map((shot, idx) => (
          <button
            key={shot.id}
            type="button"
            className={isGrid ? styles.thumbnailCardGrid : styles.thumbnailCard}
            onClick={() => handleOpen(idx)}
            aria-label={`${dict.projects.labels.expandScreenshot}: ${shot.title}`}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={shot.src}
                alt={shot.title}
                fill
                sizes="(max-width: 992px) 100vw, 450px"
                className={styles.thumbnailImg}
                loading="lazy"
              />
              <div className={styles.overlay} aria-hidden="true">
                <span className={styles.zoomBadge}>
                  <Maximize size={14} />
                  {dict.projects.labels.expandScreenshot}
                </span>
              </div>
            </div>

            <div className={styles.caption}>
              <div className={styles.captionLeft}>
                <span className={styles.badgeIndex}>[ 0{idx + 1} ]</span>
                <span className={styles.captionText}>{shot.title}</span>
              </div>
              <Maximize size={14} className={styles.captionIcon} aria-hidden="true" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox UI Primitive mounted via Portal to document.body */}
      <Lightbox
        isOpen={activeIdx !== null}
        onClose={handleClose}
        activeItem={
          activeShot
            ? {
              src: activeShot.src,
              alt: activeShot.title,
              title: activeShot.title,
              caption: previewCaption || activeShot.title,
            }
            : null
        }
        currentIndex={activeIdx ?? 0}
        totalCount={items.length}
        onPrev={handlePrev}
        onNext={handleNext}
        closeLabel={dict.projects.labels.closeLightbox}
      />
    </div>
  );
}
