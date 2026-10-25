import { useEffect, useRef, useState } from 'react';
import { ANIMATION_DURATIONS } from '../../lib/constants';

interface CounterAnimationProps {
  target: number;
  suffix?: string;
  duration?: number; // default 2000ms
  isInView: boolean;
}

/**
 * Animated number counter that counts from 0 to a target value.
 *
 * - Animates over `duration` ms (default 2000) when `isInView` becomes true
 * - Supports an optional suffix (e.g., "+")
 * - Only animates once — retains final value on subsequent views
 *
 * Validates: Requirements 4.1, 4.6
 */
export default function CounterAnimation({
  target,
  suffix = '',
  duration = ANIMATION_DURATIONS.COUNTER,
  isInView,
}: CounterAnimationProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only animate once, and only when in view
    if (!isInView || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(easedProgress * target);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure we land exactly on the target
        setDisplayValue(target);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, target, duration]);

  return (
    <span aria-label={`${target}${suffix}`}>
      {displayValue}
      {suffix}
    </span>
  );
}
