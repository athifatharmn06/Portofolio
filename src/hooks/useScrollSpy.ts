import { useState, useEffect, useRef } from 'react';
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
 * Throttled with requestAnimationFrame to prevent stacking frames and limit DOM queries to once per frame.
 */
export function useScrollSpy({
  sectionIds,
  offset = NAVBAR_HEIGHT + 100,
}: UseScrollSpyOptions): UseScrollSpyReturn {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const computeActiveSection = () => {
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
      rafId.current = null;
    };

    const handleScroll = () => {
      // Use rAF guard to prevent stacking frames — at most one computation per frame
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(computeActiveSection);
    };

    // Run once on mount
    computeActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [sectionIds, offset]);

  return { activeSection };
}
