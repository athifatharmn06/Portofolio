import { motion } from 'framer-motion';
import { FiArrowUpRight, FiAward, FiBookOpen, FiClock, FiCheckCircle, FiGithub } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeInUp, reducedMotionVariants } from '../../lib/animations';
import {
  featuredGallery,
  finalProject,
  funding,
  outcomes,
} from '../../data/finalProject';
import SlideCarousel from '../ui/SlideCarousel';
import type { PhotoContext, ProjectData } from '../../types';

interface EducationSectionProps {
  onOpenGallery: (project: ProjectData) => void;
}

/** Open the shared lightbox on a given item, with the rest of the set following it. */
function galleryFor(title: string, photos: PhotoContext[], start: number): ProjectData {
  const ordered = [...photos.slice(start), ...photos.slice(0, start)];
  return {
    id: `final-project-${title}`,
    title,
    shortDesc: finalProject.summary,
    category: 'Final project',
    techStack: [],
    thumbnail: ordered[0].url,
    photos: ordered,
  };
}

export default function EducationSection({ onOpenGallery }: EducationSectionProps) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.06 });
  const reduced = useReducedMotion();
  const variants = reduced ? reducedMotionVariants : fadeInUp;

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#04040f] via-[#070b1c] to-[#02050e]"
    >
      <div className="pointer-events-none absolute -left-32 top-16 h-[520px] w-[520px] rounded-full bg-violet-700/[0.10] blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 top-[40%] h-[480px] w-[480px] rounded-full bg-cyan-600/[0.08] blur-[130px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-32">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-500 text-teal-400">
            <FiBookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-200">Education</h2>
        </motion.div>

        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={variants}>
          <p className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            Final project
            <span className="rounded-full border border-teal-400/40 bg-teal-400/10 px-2.5 py-0.5 normal-case tracking-normal text-teal-300">
              Grade A
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 normal-case tracking-normal text-gray-300">
              {finalProject.degree}
            </span>
          </p>
          <h3 className="mb-12 max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
            Driver fatigue detection that <span className="text-teal-400">keeps working in the dark</span>
          </h3>
        </motion.div>

        {/* Intro: summary + hero photo */}
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={variants}>
            <p className="mb-5 text-sm font-semibold leading-relaxed text-gray-100 md:text-base">{finalProject.title}</p>
            <p className="mb-6 text-[0.95rem] leading-relaxed text-gray-400">{finalProject.summary}</p>
            <ul className="mb-7 flex flex-wrap gap-2">
              {finalProject.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href={finalProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0a14] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <FiGithub className="h-4 w-4" /> Source code
              </a>
              <a
                href="#certificates"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-gray-100 transition-colors hover:border-teal-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <FiAward className="h-4 w-4" /> Presented at EECSI 2026
              </a>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={variants}>
            <SlideCarousel
              slides={featuredGallery.map((p) => ({
                url: p.url,
                caption: p.caption,
                contain: p.url.includes('/design/'),
              }))}
              onOpen={(i) => onOpenGallery(galleryFor('Final project gallery', featuredGallery, i))}
            />
          </motion.div>
        </div>

        {/* Funding and outcomes */}
        <div>
          <h4 className="mb-6 text-xl font-bold text-white">Funding and outcomes</h4>

          <div className="mb-5 flex items-start gap-4 rounded-2xl border border-teal-400/30 bg-gradient-to-r from-teal-400/10 via-teal-400/[0.04] to-transparent p-5">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-teal-300">
              <FiAward className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-teal-300">Research funding</p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-white md:text-base">{funding}</p>
            </div>
          </div>

          <ul className="grid gap-4 md:grid-cols-2">
            {outcomes.map((o, i) => (
              <motion.li
                key={o.title}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={variants}
                transition={{ delay: reduced ? 0 : i * 0.08 }}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-gray-400">{o.kind}</p>
                <p className="mt-2 text-sm font-semibold leading-snug text-white">{o.title}</p>
                <p className="mt-1.5 text-xs text-gray-400">{o.venue}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                      o.state === 'done'
                        ? 'border-teal-400/40 bg-teal-400/10 text-teal-300'
                        : 'border-amber-400/40 bg-amber-400/10 text-amber-300'
                    }`}
                  >
                    {o.state === 'done' ? <FiCheckCircle className="h-3.5 w-3.5" /> : <FiClock className="h-3.5 w-3.5" />}
                    {o.status}
                  </span>
                  {o.href && (
                    <a
                      href={o.href}
                      {...(o.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                    >
                      {o.linkLabel} <FiArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
