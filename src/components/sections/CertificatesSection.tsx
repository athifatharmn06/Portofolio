import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiArrowUpRight, FiMaximize2, FiCheckCircle } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { certificateCategories, certificatesData } from '../../data/certificates';
import type { Certificate, CertificateCategory } from '../../data/certificates';
import { fadeInUp, reducedMotionVariants } from '../../lib/animations';
import ImageWithFallback from '../ui/ImageWithFallback';
import type { ProjectData } from '../../types';

interface CertificatesSectionProps {
  onOpenGallery: (project: ProjectData) => void;
}

/** Open the lightbox on the clicked certificate, with the rest of the current filter after it. */
function toGalleryItem(list: Certificate[], index: number): ProjectData {
  const ordered = [...list.slice(index), ...list.slice(0, index)];
  return {
    id: 'certificates',
    title: 'Certificates',
    shortDesc: '',
    category: 'Certificates',
    techStack: [],
    thumbnail: ordered[0].image,
    photos: ordered.map((c) => ({
      url: c.image,
      caption: `${c.title} | ${c.issuer} | ${c.date}${c.result ? ` | ${c.result}` : ''}`,
      tools: c.note ?? '',
    })),
  };
}

export default function CertificatesSection({ onOpenGallery }: CertificatesSectionProps) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.08 });
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<'All' | CertificateCategory>('All');
  const [showAll, setShowAll] = useState(false);

  const variants = reduced ? reducedMotionVariants : fadeInUp;

  // The collapsed "All" view shows the featured certificates; any category filter shows everything in it
  const collapsed = filter === 'All' && !showAll;
  const visible = useMemo(() => {
    const inCategory = filter === 'All' ? certificatesData : certificatesData.filter((c) => c.category === filter);
    return collapsed ? inCategory.filter((c) => c.featured) : inCategory;
  }, [filter, collapsed]);

  return (
    <section
      id="certificates"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#02050e] via-[#05111c] to-[#010612]"
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-[480px] w-[480px] rounded-full bg-teal-900/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-[520px] w-[520px] rounded-full bg-indigo-900/15 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-6 py-32">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-500 text-teal-400">
            <FiAward className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-200">Certificates</h2>
        </motion.div>

        <motion.h3
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-10 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl"
        >
          Credentials, <span className="text-teal-400">verified</span>
        </motion.h3>

        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-10 max-w-2xl text-sm leading-relaxed text-gray-400"
        >
          Course completions, conference presentations, language tests and an intellectual property registration. Personal
          details such as addresses and student IDs are redacted in the images, and where the issuer offers a public
          verification page you can follow the Verify link.
        </motion.p>

        {/* Category filter */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Certificate categories"
        >
          {certificateCategories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat)}
                className="relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                {active && (
                  <motion.span
                    layoutId="certTab"
                    className="absolute inset-0 rounded-full border border-teal-500/50 bg-teal-500/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 whitespace-nowrap ${active ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
                  {cat}
                </span>
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.article
                layout={!reduced}
                key={c.id}
                initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: reduced ? 0 : Math.min(i * 0.04, 0.3) }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-teal-400/50"
              >
                <button
                  onClick={() => onOpenGallery(toGalleryItem(visible, i))}
                  aria-label={`View certificate: ${c.title}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-[#0a1020] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-400"
                >
                  <ImageWithFallback
                    src={c.image}
                    alt={`${c.title} certificate`}
                    className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-105 ${
                      c.portrait ? 'object-contain p-3' : 'object-cover'
                    }`}
                    loading="lazy"
                  />
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <FiMaximize2 className="h-4 w-4" />
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-wider text-teal-400">{c.category}</p>
                  <h4 className="text-base font-bold leading-snug text-white">{c.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{c.issuer}</p>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">{c.date}</p>
                      {c.result && (
                        <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300">
                          <FiCheckCircle className="h-3.5 w-3.5 shrink-0" /> {c.result}
                        </p>
                      )}
                    </div>
                    {c.verifyUrl && (
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:border-teal-400/60 hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                      >
                        Verify <FiArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filter === 'All' && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-gray-100 transition-colors hover:border-teal-400/60 hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              {showAll ? 'Show fewer' : `Show all ${certificatesData.length} certificates`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
