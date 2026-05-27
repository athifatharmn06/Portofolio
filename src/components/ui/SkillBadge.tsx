import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { SkillData } from '../../types';

interface SkillBadgeProps {
  skill: SkillData;
  accentColor: string;
  index: number;
}

// Map Tailwind color names to actual hex values for glow
const COLOR_MAP: Record<string, { border: string; glow: string; bg: string }> = {
  teal:         { border: 'rgba(45,212,191,0.45)',  glow: '0 0 10px rgba(45,212,191,0.25)',  bg: 'rgba(45,212,191,0.06)'  },
  blue:         { border: 'rgba(59,130,246,0.45)',  glow: '0 0 10px rgba(59,130,246,0.25)',  bg: 'rgba(59,130,246,0.06)'  },
  cyan:         { border: 'rgba(6,182,212,0.45)',   glow: '0 0 10px rgba(6,182,212,0.25)',   bg: 'rgba(6,182,212,0.06)'   },
  green:        { border: 'rgba(34,197,94,0.45)',   glow: '0 0 10px rgba(34,197,94,0.25)',   bg: 'rgba(34,197,94,0.06)'   },
  pink:         { border: 'rgba(236,72,153,0.45)',  glow: '0 0 10px rgba(236,72,153,0.25)',  bg: 'rgba(236,72,153,0.06)'  },
  orange:       { border: 'rgba(249,115,22,0.45)',  glow: '0 0 10px rgba(249,115,22,0.25)',  bg: 'rgba(249,115,22,0.06)'  },
  purple:       { border: 'rgba(168,85,247,0.45)',  glow: '0 0 10px rgba(168,85,247,0.25)',  bg: 'rgba(168,85,247,0.06)'  },
  yellow:       { border: 'rgba(234,179,8,0.45)',   glow: '0 0 10px rgba(234,179,8,0.25)',   bg: 'rgba(234,179,8,0.06)'   },
  indigo:       { border: 'rgba(99,102,241,0.45)',  glow: '0 0 10px rgba(99,102,241,0.25)',  bg: 'rgba(99,102,241,0.06)'  },
};

const DEFAULT_COLORS = { border: 'rgba(100,116,139,0.4)', glow: 'none', bg: 'rgba(100,116,139,0.05)' };

/**
 * Skill badge with category-colored glow border.
 * Each category gets its own accent color so the skills section
 * looks vibrant and not boring.
 */
export default function SkillBadge({ skill, accentColor, index }: SkillBadgeProps) {
  const prefersReducedMotion = useReducedMotion();
  const colors = COLOR_MAP[accentColor] ?? DEFAULT_COLORS;
  const entranceDelay = Math.min(index * 0.04, 0.6);

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.2, delay: entranceDelay }
          : { duration: 0.35, delay: entranceDelay, ease: 'easeOut' }
      }
      whileHover={prefersReducedMotion ? {} : { scale: 1.05, transition: { duration: 0.15 } }}
    >
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-default transition-all duration-200"
        style={{
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.glow,
        }}
      >
        <span className="text-sm flex-shrink-0" aria-hidden="true">
          {skill.icon}
        </span>
        <span className="text-sm font-medium whitespace-nowrap text-gray-100">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}
