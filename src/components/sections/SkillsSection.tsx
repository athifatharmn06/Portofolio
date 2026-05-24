import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { skillCategories } from '../../data/skills';
import { fadeInUp, reducedMotionVariants } from '../../lib/animations';
import SkillBadge from '../ui/SkillBadge';

/**
 * SkillsSection — Filterable skill grid organized by 8 categories.
 *
 * - Category filter tabs ("All" + 8 categories) with active tab indicator
 * - Filter animation using Framer Motion layout transitions (200–400ms)
 * - Renders SkillBadge components with staggered entrance (50ms per badge, max 600ms each)
 * - Maintains 8-category organization from data layer
 * - Triggers entrance animation only once per page load via useInView
 *
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */
export default function SkillsSection() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const variants = prefersReducedMotion ? reducedMotionVariants : fadeInUp;

  // Build filter tabs: "All" + each category with short labels
  const tabs = [
    { id: 'all', name: 'All', icon: null },
    ...skillCategories.map((cat) => ({ id: cat.id, name: cat.name, icon: cat.icon })),
  ];

  // Short labels for tabs (no commas, clean single words)
  const tabLabels: Record<string, string> = {
    'all': 'All',
    'software-backend': 'Software',
    'cloud-devops': 'Cloud',
    'frontend-web': 'Frontend',
    'database-analytics': 'Database',
    'ai-cv-data': 'AI & CV',
    'robotics-automation': 'Robotics',
    'creative-multimedia': 'Creative',
    'professional-methodologies': 'Professional',
  };

  // Filter skills based on active category
  const filteredCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeCategory);

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full relative overflow-hidden bg-gradient-to-br from-[#02050e] via-[#05111c] to-[#010612] border-b border-white/5"
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl py-32 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center text-teal-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-200">Skills & Expertise</h2>
        </motion.div>

        {/* Section Heading */}
        <motion.h3
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="text-4xl md:text-5xl font-bold leading-tight text-white mb-12"
        >
          Technologies & <span className="text-teal-400">Competencies</span>
        </motion.h3>

        {/* Category Filter Tabs */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="flex flex-wrap gap-2 mb-12"
          role="tablist"
          aria-label="Skill category filters"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeCategory === tab.id}
              aria-controls="skills-grid"
              onClick={() => setActiveCategory(tab.id)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium
                transition-colors duration-200 cursor-pointer
                focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                ${activeCategory === tab.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }
              `}
            >
              {/* Active tab indicator (animated background) */}
              {activeCategory === tab.id && (
                <motion.span
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full bg-teal-500/20 border border-teal-500/50"
                  transition={{ type: 'spring', stiffness: 380, damping: 30, duration: 0.3 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">
                {tabLabels[tab.id] || tab.name}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div id="skills-grid" role="tabpanel" aria-label="Filtered skills">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.3, ease: 'easeOut' }}
              className="space-y-10"
            >
              {filteredCategories.map((category) => (
                <div key={category.id}>
                  {/* Category heading (shown when "All" is selected) */}
                  {activeCategory === 'all' && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg" aria-hidden="true">
                        {category.icon}
                      </span>
                      <h4 className="text-lg font-semibold text-gray-200">
                        {category.name}
                      </h4>
                    </div>
                  )}

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, index) => (
                      <SkillBadge
                        key={`${category.id}-${skill.name}`}
                        skill={skill}
                        accentColor={category.accentColor}
                        index={isInView ? index : 0}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
