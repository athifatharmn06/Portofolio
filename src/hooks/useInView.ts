import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

interface UseInViewReturn {
  ref: React.RefObject<HTMLElement | null>;
  isInView: boolean;
}

/**
 * Custom hook wrapping IntersectionObserver for triggering entrance animations.
 * Falls back to `{ isInView: true }` if IntersectionObserver is unavailable.
 *
 * @param options.once - If true, stops observing after first intersection (default: true)
 * @param options.threshold - Visibility threshold to trigger (default: 0.15)
 * @param options.rootMargin - Root margin for the observer
 */
export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const { once = true, threshold = 0.15, rootMargin } = options;
  const ref = useRef<HTMLElement | null>(null);

  // Fall back to always-visible if IntersectionObserver is unavailable
  const [isInView, setIsInView] = useState<boolean>(
    typeof window === 'undefined' || !('IntersectionObserver' in window)
  );

  useEffect(() => {
    // If IntersectionObserver is not supported, keep isInView as true
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [once, threshold, rootMargin]);

  return { ref, isInView };
}
