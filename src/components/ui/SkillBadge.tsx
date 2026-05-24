import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { SkillData } from '../../types';

interface SkillBadgeProps {
  skill: SkillData;
  accentColor: string;
  index: number;
}

/**
 * Individual skill pill badge with entrance animation and hover tooltip.
 *
 * - Renders a pill-shaped badge with the skill icon and name
 * - Shows a tooltip on hover (viewport ≥ 1024px) with years of experience or proficiency level
 * - Expert skills (level === 'expert' or yearsOfExperience >= 3) get full opacity + highlighted border
 * - Other skills get reduced opacity (0.7) + default border
 * - Accepts stagger index for entrance animation delay (50ms per badge)
 *
 * Validates: Requirements 5.3, 5.4, 5.5
 */
export default function SkillBadge({ skill, accentColor, index }: SkillBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isExpert = skill.level === 'expert';

  const tooltipText = skill.level.charAt(0).toUpperCase() + skill.level.slice(1);

  // Stagger delay: 50ms per badge index
  const entranceDelay = index * 0.05;

  return (
    <motion.div
      className="relative"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.2, delay: entranceDelay }
          : { duration: 0.4, delay: entranceDelay, ease: 'easeOut' }
      }
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Badge pill */}
      <div
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full
          border transition-all duration-200 cursor-default
          ${isExpert
            ? 'opacity-100 border-current shadow-sm'
            : 'opacity-70 border-gray-300 dark:border-gray-600'
          }
        `}
        style={isExpert ? { borderColor: accentColor, color: accentColor } : undefined}
      >
        <span className="text-sm flex-shrink-0" aria-hidden="true">
          {skill.icon}
        </span>
        <span
          className={`text-sm font-medium whitespace-nowrap ${
            isExpert
              ? 'text-gray-900 dark:text-gray-100'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {skill.name}
        </span>
      </div>

      {/* Tooltip — only visible on hover at viewport ≥ 1024px */}
      {showTooltip && (
        <div
          className="
            hidden lg:block absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2
            px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap
            bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
            shadow-lg pointer-events-none
            animate-[fadeIn_150ms_ease-out]
          "
          role="tooltip"
        >
          {tooltipText}
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
        </div>
      )}
    </motion.div>
  );
}
