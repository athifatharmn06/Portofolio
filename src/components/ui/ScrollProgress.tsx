import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient bar at the top of the viewport showing page scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #8b5cf6, #38bdf8, #2dd4bf)' }}
    />
  );
}
