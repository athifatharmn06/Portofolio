import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Segment {
  text: string;
  className?: string;
}

interface ScrollWordsProps {
  segments: Segment[];
  className?: string;
}

function Word({
  children,
  className,
  progress,
  range,
}: {
  children: string;
  className?: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y, display: 'inline-block' }} className={className}>
      {children}
    </motion.span>
  );
}

/** Heading whose words light up one by one as the user scrolls through it. */
export default function ScrollWords({ segments, className }: ScrollWordsProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });

  const words = segments.flatMap((seg) =>
    seg.text
      .split(' ')
      .filter(Boolean)
      .map((w) => ({ w, className: seg.className }))
  );

  return (
    <h3 ref={ref} className={className} aria-label={segments.map((s) => s.text).join('')}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.6 / words.length);
        return reduced ? (
          <span key={i} className={word.className}>
            {word.w}{' '}
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            <Word className={word.className} progress={scrollYProgress} range={[start, end]}>
              {word.w}
            </Word>{' '}
          </span>
        );
      })}
    </h3>
  );
}
