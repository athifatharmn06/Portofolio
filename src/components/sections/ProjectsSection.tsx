import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { projectsData } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import type { ProjectData } from '../../types';

interface ProjectsSectionProps {
  onOpenGallery: (project: ProjectData) => void;
}

/** Filter categories mapping broad labels to project category substrings */
const FILTER_CATEGORIES = [
  { label: 'All', match: null },
  { label: 'AI', match: 'AI' },
  { label: 'Web', match: 'Web' },
  { label: 'Data', match: 'Data' },
  { label: 'IoT', match: 'IoT' },
  { label: 'Automation', match: 'Automation' },
] as const;

/**
 * Projects section with category filter pills and responsive grid.
 *
 * - Category filter pills above project grid with "All" selected by default
 * - Layout transition animation for grid rearrangement (300–500ms)
 * - Responsive grid: 1 col mobile, 2 tablet, 3 desktop
 * - Empty-state message when no projects match filter
 * - Passes onOpenGallery callback to ProjectCard components
 *
 * Validates: Requirements 6.4, 6.5, 6.6, 6.7, 12.2
 */
export default function ProjectsSection({ onOpenGallery }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    const category = FILTER_CATEGORIES.find((c) => c.label === activeFilter);
    if (!category || !category.match) return projectsData;
    return projectsData.filter((project) =>
      project.category.toLowerCase().includes(category.match!.toLowerCase())
    );
  }, [activeFilter]);

  const transitionDuration = prefersReducedMotion ? 0.2 : 0.4;

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section heading */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-center mb-12"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Featured Projects
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A curated selection of projects showcasing expertise across AI, web development, data engineering, and automation.
        </motion.p>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        role="tablist"
        aria-label="Project category filters"
      >
        {FILTER_CATEGORIES.map(({ label }) => (
          <button
            key={label}
            onClick={() => setActiveFilter(label)}
            role="tab"
            aria-selected={activeFilter === label}
            aria-controls="projects-grid"
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2
              ${
                activeFilter === label
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Project grid */}
      <div
        id="projects-grid"
        role="tabpanel"
        aria-label={`Projects filtered by ${activeFilter}`}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: transitionDuration,
                  ease: 'easeOut',
                  layout: { duration: transitionDuration },
                }}
              >
                <ProjectCard
                  project={project}
                  onExploreGallery={() => onOpenGallery(project)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="col-span-full text-center py-16"
            >
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No projects found in the "{activeFilter}" category.
              </p>
              <button
                onClick={() => setActiveFilter('All')}
                className="mt-4 text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors duration-200"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
