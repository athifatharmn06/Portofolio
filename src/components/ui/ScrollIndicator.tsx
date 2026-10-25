import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

/**
 * Animated scroll indicator with a bouncing downward chevron.
 * Placed at the bottom of the Hero section to hint at scrollable content.
 * Uses Framer Motion for a subtle, repeating bounce animation on a 1.5s cycle.
 */
export default function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 opacity-70"
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    >
      <FaChevronDown className="text-lg text-current" />
      <FaChevronDown className="text-sm text-current opacity-50" />
    </motion.div>
  );
}
