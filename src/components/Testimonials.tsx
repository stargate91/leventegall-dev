"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Certificate, ChevronLeft, ChevronRight } from "@carbon/icons-react";
import styles from "./Testimonials.module.css";
import { SectionHeader, Testimonial, IconButton } from "@/components/ui";
import { getFiverrFeedback } from "@/data/testimonials";
import { useLocale } from "@/locales";

export default function Testimonials() {
  const { dict } = useLocale();
  const feedback = getFiverrFeedback(dict);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = viewportRef.current;
    if (!el) {
      return;
    }

    if (el.scrollWidth > 0 && el.clientWidth > 0 && el.scrollWidth > el.clientWidth) {
      const atStart = el.scrollLeft <= 4;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setCanPrev(!atStart);
      setCanNext(!atEnd);
    } else {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(feedback.length > 2);
    }
  }, [feedback.length]);

  useEffect(() => {
    updateScrollState();
    const el = viewportRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState, { passive: true });
    }
    window.addEventListener("resize", updateScrollState);

    return () => {
      if (el) {
        el.removeEventListener("scroll", updateScrollState);
      }
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const getScrollAmount = () => {
    const el = viewportRef.current;
    if (!el) {
      return 300;
    }
    const firstSlide = el.querySelector<HTMLElement>(`.${styles.slide}`);
    if (firstSlide && firstSlide.offsetWidth > 0) {
      return firstSlide.offsetWidth + 16;
    }
    return el.clientWidth > 0 ? el.clientWidth / 2 : 300;
  };

  const handlePrev = () => {
    const el = viewportRef.current;
    if (!el) {
      return;
    }
    const amount = getScrollAmount();
    if (typeof el.scrollBy === "function") {
      el.scrollBy({ left: -amount, behavior: "smooth" });
    } else {
      el.scrollLeft = Math.max(0, el.scrollLeft - amount);
      updateScrollState();
    }
  };

  const handleNext = () => {
    const el = viewportRef.current;
    if (!el) {
      return;
    }
    const amount = getScrollAmount();
    if (typeof el.scrollBy === "function") {
      el.scrollBy({ left: amount, behavior: "smooth" });
    } else {
      el.scrollLeft = el.scrollLeft + amount;
      updateScrollState();
    }
  };

  return (
    <div className="section-container">
      {/* Section Header */}
      <SectionHeader
        subtitle={dict.testimonials.subtitle}
        subtitleIcon={<Certificate size={14} />}
        title={dict.testimonials.title}
      />

      {/* Testimonials Smooth Scroll Carousel with Side Chevrons */}
      <div className={styles.carouselContainer}>
        <IconButton
          icon={<ChevronLeft size={20} />}
          ariaLabel="Previous reviews"
          size="md"
          variant="surface"
          onClick={handlePrev}
          disabled={!canPrev}
          className={`${styles.navButton} ${styles.prevButton}`}
        />

        <div
          ref={viewportRef}
          className={styles.viewport}
          tabIndex={0}
          role="region"
          aria-label="Client reviews carousel"
        >
          <div className={styles.track}>
            {feedback.map((fb) => (
              <div key={fb.id} className={styles.slide}>
                <Testimonial
                  stars={fb.stars}
                  quote={fb.quote}
                  author={fb.author}
                  role={fb.role}
                  location={fb.location}
                  initials={fb.initials}
                  avatarSrc={fb.avatar}
                />
              </div>
            ))}
          </div>
        </div>

        <IconButton
          icon={<ChevronRight size={20} />}
          ariaLabel="Next reviews"
          size="md"
          variant="surface"
          onClick={handleNext}
          disabled={!canNext}
          className={`${styles.navButton} ${styles.nextButton}`}
        />
      </div>
    </div>
  );
}
