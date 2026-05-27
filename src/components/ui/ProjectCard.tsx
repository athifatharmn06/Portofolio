import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaImages } from 'react-icons/fa';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ImageWithFallback from './ImageWithFallback';
import type { ProjectData } from '../../types';

interface ProjectCardProps {
  project: ProjectData;
  onExploreGallery: () => void;
}

/**
 * Project card with 3D tilt effect, gradient hover overlay, and conditional links.
 *
 * - Displays thumbnail using ImageWithFallback
 * - Gradient overlay reveals category and tagline (≤80 chars) on hover
 * - 3D tilt effect (≤10 degrees) on hover with perspective transform
 * - Conditionally renders GitHub/demo links only if URL exists
 * - Includes "Explore Gallery" button triggering onExploreGallery callback
 *
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4
 */
export default function ProjectCard({ project, onExploreGallery }: ProjectCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const truncatedDesc =
    project.shortDesc.length > 80
      ? project.shortDesc.slice(0, 77) + '...'
      : project.shortDesc;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max 10 degrees rotation
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = ((centerY - y) / centerY) * 10;

      setTilt({ rotateX, rotateY });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const hasGithub = !!project.githubUrl;
  const hasDemo = !!project.demoUrl;
  const hasLinks = hasGithub || hasDemo;

  return (
    <motion.div
      className="relative group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50"
      style={{
        perspective: '1000px',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail with gradient overlay */}
        <div className="relative aspect-video overflow-hidden">
          <ImageWithFallback
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            placeholderClassName="w-full h-full"
            loading="lazy"
          />

          {/* Gradient overlay — visible on hover */}
          <div
            className={`
              absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
              flex flex-col justify-end p-4
              transition-opacity duration-300
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-300 mb-1">
              {project.category}
            </span>
            <p className="text-sm text-gray-100 leading-snug">
              {truncatedDesc}
            </p>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
            {project.title}
          </h3>

          {/* Tech stack pills — show all */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between gap-2">
            {/* Conditional links */}
            {hasLinks && (
              <div className="flex items-center gap-2">
                {hasGithub && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:rounded-sm"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub className="text-sm" />
                    <span>GitHub</span>
                  </a>
                )}
                {hasDemo && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:rounded-sm"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            )}

            {/* Explore Gallery button */}
            <button
              onClick={onExploreGallery}
              className={`
                inline-flex items-center gap-1.5 text-xs font-semibold
                px-3 py-1.5 rounded-lg
                bg-teal-500/10 text-teal-600 dark:text-teal-400
                hover:bg-teal-500/20 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-1
                ${!hasLinks ? 'ml-auto' : ''}
              `}
              aria-label={`Explore gallery for ${project.title}`}
            >
              <FaImages className="text-sm" />
              <span>Explore Gallery</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
