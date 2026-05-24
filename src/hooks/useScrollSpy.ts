import { useState, useEffect } from 'react';
import { NAVBAR_HEIGHT } from '../lib/constants';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

interface UseScrollSpyReturn {
  activeSection: string;
}

/**
 * Custom hook that detects which section is currently in view based on scroll position.
 * Uses a scroll event listener with a simple "which section's top is closest to the viewport top" approach.
 * More reliable than IntersectionObserver for varying section heights.
 */
export function useScrollSpy({
  sectionIds,
  offset = NAVBAR_HEIGHT + 100,
}: UseScrollSpyOptions): UseScrollSpyReturn {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollY = window.scrollY + offset;

      // Find the section whose top is closest to (but not below) the current scroll position
      let current = sectionIds[0] ?? '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (el.offsetTop <= scrollY) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    // Run once on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return { activeSection };
}
