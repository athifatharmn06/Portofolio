import type { Variants } from 'framer-motion';

/**
 * Fade in from below with upward movement.
 * Used for section headings, text blocks, and general entrance animations.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/**
 * Container variant that staggers children animations.
 * Wrap child elements that each use their own variant (e.g., fadeInUp).
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

/**
 * Scale up from slightly smaller size with fade.
 * Used for images, cards, and visual elements.
 */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

/**
 * Slide in from the left with fade.
 * Used for timeline items and sequential content.
 */
export const slideIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

/**
 * Reduced motion variants — opacity only, max 200ms.
 * Used when prefers-reduced-motion: reduce is active.
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};
