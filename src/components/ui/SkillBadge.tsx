import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { SkillData } from '../../types';

interface SkillBadgeProps {
  skill: SkillData;
  accentColor: string;
  index: number;
}

/**
 * Individual skill pill badge with entrance animation.
 * Shows icon (with its own color) and skill name at full opacity.
 * No level indicators, no tooltips, no opacity differences.
 */
export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  const entranceDelay = index * 0.05;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.2, delay: entranceDelay }
          : { duration: 0.4, delay: entranceDelay, ease: 'easeOut' }
      }
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 cursor-default hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200">
        <span className="text-sm flex-shrink-0" aria-hidden="true">
          {skill.icon}
        </span>
        <span className="text-sm font-medium whitespace-nowrap text-gray-800 dark:text-gray-200">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}
