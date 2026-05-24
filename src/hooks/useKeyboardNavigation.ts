import { useEffect, useRef, useCallback } from 'react';

interface UseKeyboardNavigationOptions {
  isActive: boolean;
  totalItems: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

/**
 * Custom hook for keyboard navigation in gallery/modal contexts.
 *
 * - Listens for ArrowLeft, ArrowRight, Escape when `isActive` is true
 * - Handles circular wrap-around navigation (index N-1 → 0, index 0 → N-1)
 * - Cleans up event listeners on unmount or when `isActive` becomes false
 */
export function useKeyboardNavigation({
  isActive,
  totalItems,
  onNavigate,
  onClose,
}: UseKeyboardNavigationOptions): void {
  const currentIndexRef = useRef(0);

  // Reset index when navigation becomes inactive
  useEffect(() => {
    if (!isActive) {
      currentIndexRef.current = 0;
    }
  }, [isActive]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive || totalItems <= 0) return;

      switch (event.key) {
        case 'ArrowRight': {
          event.preventDefault();
          const nextIndex = (currentIndexRef.current + 1) % totalItems;
          currentIndexRef.current = nextIndex;
          onNavigate(nextIndex);
          break;
        }
        case 'ArrowLeft': {
          event.preventDefault();
          const prevIndex =
            (currentIndexRef.current - 1 + totalItems) % totalItems;
          currentIndexRef.current = prevIndex;
          onNavigate(prevIndex);
          break;
        }
        case 'Escape': {
          event.preventDefault();
          onClose();
          break;
        }
      }
    },
    [isActive, totalItems, onNavigate, onClose]
  );

  useEffect(() => {
    if (!isActive) return;

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleKeyDown]);
}
