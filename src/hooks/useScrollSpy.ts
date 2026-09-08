"use client";

import { useState, useEffect } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  offsetRatio?: number;
  scrollThreshold?: number;
}

export function useScrollSpy({
  sectionIds,
  offsetRatio = 0.35,
  scrollThreshold = 20,
}: UseScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > scrollThreshold);

      const scrollPosition = window.scrollY + window.innerHeight * offsetRatio;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        if (id) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offsetRatio, scrollThreshold]);

  return { activeSection, scrolled, setActiveSection };
}
