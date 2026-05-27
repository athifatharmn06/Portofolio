import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { projectsData } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import type { ProjectData } from '../../types';

interface ProjectsSectionProps {
  onOpenGallery: (project: ProjectData) => void;
}

/**
 * Projects section with responsive grid.
 * Shows all projects — no filter pills.
 */
export default function ProjectsSection({ onOpenGallery }: ProjectsSectionProps) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

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

      {/* Project grid */}
      <div
        id="projects-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: transitionDuration, ease: 'easeOut' }}
          >
            <ProjectCard
              project={project}
              onExploreGallery={() => onOpenGallery(project)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
