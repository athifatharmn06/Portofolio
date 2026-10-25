import { projectsData } from '../../data/projects';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import type { ProjectData } from '../../types';

interface ProjectsSectionProps {
  onOpenGallery: (project: ProjectData) => void;
}

export default function ProjectsSection({ onOpenGallery }: ProjectsSectionProps) {
  const [featured, ...rest] = projectsData;

  return (
    <section id="projects" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHeader
          index="04"
          label="Selected work"
          title={
            <>
              Things I've built, <em className="text-muted">from firmware to the cloud.</em>
            </>
          }
        />

        <Reveal>
          <ProjectCard project={featured} index={0} featured onExploreGallery={() => onOpenGallery(featured)} />
        </Reveal>

        <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} index={i + 1} onExploreGallery={() => onOpenGallery(project)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
