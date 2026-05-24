import { useState, useEffect } from 'react';

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Custom hook for detecting the user's reduced motion preference.
 *
 * - Checks the `prefers-reduced-motion: reduce` media query
 * - Listens for changes and updates state accordingly
 * - Returns `true` if reduced motion is preferred
 *
 * Used to conditionally disable transform-based animations,
 * retaining only opacity transitions with a maximum duration of 200ms.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(MEDIA_QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
