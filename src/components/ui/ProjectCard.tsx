import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import ImageWithFallback from './ImageWithFallback';
import type { ProjectData } from '../../types';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  featured?: boolean;
  onExploreGallery: () => void;
}

const MAX_TAGS = 5;

/**
 * Flat project card. The whole card opens the gallery; external links sit
 * outside the primary button so they stay independently focusable.
 */
export default function ProjectCard({ project, index, featured = false, onExploreGallery }: ProjectCardProps) {
  const tags = project.techStack.slice(0, MAX_TAGS);
  const extra = project.techStack.length - tags.length;

  return (
    <article
      className={`group relative flex flex-col ${featured ? 'lg:grid lg:grid-cols-12 lg:gap-10' : ''}`}
    >
      <button
        onClick={onExploreGallery}
        aria-label={`Open gallery for ${project.title}`}
        className={`relative block overflow-hidden border border-line bg-sunk text-left ${
          featured ? 'lg:col-span-7' : ''
        }`}
      >
        <div className={featured ? 'aspect-[16/10]' : 'aspect-[16/10]'}>
          <ImageWithFallback
            src={project.thumbnail}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-bg px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-fg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          {project.photos.length} images <FiArrowUpRight size={13} />
        </span>
      </button>

      <div className={`flex flex-1 flex-col pt-5 ${featured ? 'lg:col-span-5 lg:pt-1' : ''}`}>
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-line">/</span>
            {project.category}
          </span>
          <span className="flex items-center gap-3 text-muted">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="transition-colors hover:text-fg"
              >
                <FiGithub size={16} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="transition-colors hover:text-fg"
              >
                <FiArrowUpRight size={17} />
              </a>
            )}
          </span>
        </div>

        <h3
          className={`display mt-3 text-fg ${
            featured ? 'text-4xl md:text-5xl' : 'text-3xl'
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`mt-4 leading-relaxed text-muted ${
            featured ? 'line-clamp-6 text-base' : 'line-clamp-3 text-[0.95rem]'
          }`}
        >
          {project.shortDesc}
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[0.72rem] text-muted">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
          {extra > 0 && <li className="text-accent">+{extra}</li>}
        </ul>
      </div>
    </article>
  );
}
