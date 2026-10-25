import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Small fade-and-rise on first scroll into view. Static under reduced motion. */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
