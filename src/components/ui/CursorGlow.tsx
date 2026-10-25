import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/** Soft glow that trails the cursor across the whole page (fine pointers only). */
export default function CursorGlow() {
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(-400), { stiffness: 140, damping: 22, mass: 0.5 });
  const y = useSpring(useMotionValue(-400), { stiffness: 140, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[500px] w-[500px] rounded-full md:block"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(56,189,248,0.05) 40%, transparent 70%)',
      }}
    />
  );
}
