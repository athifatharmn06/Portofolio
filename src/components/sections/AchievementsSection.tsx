import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiImage, FiPlay, FiArrowUpRight } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { achievementsData } from '../../data/achievements';
import type { Achievement } from '../../data/achievements';
import { fadeInUp, staggerContainer, reducedMotionVariants } from '../../lib/animations';
import ImageWithFallback from '../ui/ImageWithFallback';
import type { ProjectData } from '../../types';

interface AchievementsSectionProps {
  onOpenGallery: (project: ProjectData) => void;
}

/** Adapt an achievement to the shape the shared GalleryModal expects. */
function toGalleryItem(a: Achievement): ProjectData {
  return {
    id: a.id,
    title: a.title,
    shortDesc: a.outcome,
    category: a.category,
    techStack: [],
    thumbnail: a.thumbnail,
    photos: a.photos,
  };
}

/** Card thumbnail: the team photo, with the takeoff clip fading in and looping on hover. */
function CardMedia({ a, reduced }: { a: Achievement; reduced: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    if (reduced) return;
    videoRef.current?.play().catch(() => undefined);
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <ImageWithFallback
        src={a.thumbnail}
        alt={`${a.title} team photo`}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {!reduced && (
        <video
          ref={videoRef}
          src={a.clip.src}
          poster={a.clip.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            a.clip.portrait ? 'object-contain' : 'object-cover'
          }`}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05050f] via-transparent to-transparent" />
      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur-md">
        {a.year}
      </span>
      <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs text-gray-200 backdrop-blur-md">
        <FiPlay className="h-3 w-3" /> Takeoff clip
      </span>
      <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs text-gray-200 backdrop-blur-md">
        <FiImage className="h-3.5 w-3.5" /> {a.photos.length}
      </span>
    </div>
  );
}

export default function AchievementsSection({ onOpenGallery }: AchievementsSectionProps) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const reduced = useReducedMotion();

  const item = reduced ? reducedMotionVariants : fadeInUp;
  const container = reduced ? reducedMotionVariants : staggerContainer;

  return (
    <section
      id="achievements"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#030a14] via-[#07101e] to-[#05050f]"
    >
      <div className="pointer-events-none absolute -left-32 top-10 h-[480px] w-[480px] rounded-full bg-amber-500/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-violet-600/[0.09] blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-32">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={item}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-500 text-teal-400">
            <FiAward className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-200">Achievements, Honors &amp; Awards</h2>
        </motion.div>

        <motion.h3
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={item}
          className="mb-14 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl"
        >
          Competing where <span className="text-teal-400">aircraft are put to the test</span>
        </motion.h3>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={container}
          className="grid gap-6 md:grid-cols-3"
        >
          {achievementsData.map((a) => (
            <motion.button
              key={a.id}
              variants={item}
              onClick={() => onOpenGallery(toGalleryItem(a))}
              whileHover={reduced ? undefined : { y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              aria-label={`Open photos and clips for ${a.title}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-colors duration-300 hover:border-teal-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <CardMedia a={a} reduced={reduced} />

              <div className="flex flex-1 flex-col p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-400">{a.category}</p>
                <h4 className="mb-4 flex items-center justify-between gap-2 text-xl font-bold text-white">
                  {a.title}
                  <FiArrowUpRight className="h-5 w-5 shrink-0 text-gray-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-400" />
                </h4>

                <p className="text-sm font-semibold text-gray-100">{a.role}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{a.team}</p>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="mb-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-gray-500">Outcome</p>
                  <p className="text-sm leading-relaxed text-gray-300">{a.outcome}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
