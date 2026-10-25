import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiAward, FiBookOpen, FiClock, FiCheckCircle, FiGithub, FiMaximize2 } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeInUp, reducedMotionVariants } from '../../lib/animations';
import {
  eventScores,
  featuredGallery,
  finalProject,
  funding,
  outcomes,
  finalProjectStats,
  hardwareGallery,
  methodGallery,
  pipelineSteps,
  resultTabs,
} from '../../data/finalProject';
import CounterAnimation from '../ui/CounterAnimation';
import ImageWithFallback from '../ui/ImageWithFallback';
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

const bento = [
  'md:col-span-2 md:row-span-2', // camera
  'md:col-span-1', // internals
  'md:col-span-1', // side
  'md:col-span-1', // top
  'md:col-span-1', // internals top
];

export default function EducationSection({ onOpenGallery }: EducationSectionProps) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.06 });
  const reduced = useReducedMotion();
  const variants = reduced ? reducedMotionVariants : fadeInUp;

  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tab, setTab] = useState(resultTabs[0].id);

  // Walk through the pipeline automatically until the visitor takes over
  useEffect(() => {
    if (reduced || paused || !isInView) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % pipelineSteps.length), 2600);
    return () => window.clearInterval(id);
  }, [reduced, paused, isInView]);

  const activeTab = resultTabs.find((t) => t.id === tab) ?? resultTabs[0];
  const resultPhotos: PhotoContext[] = [
    ...resultTabs.map((t) => ({ url: t.image, caption: `${t.caption}. ${t.insight}`, tools: 'Raspberry Pi 5, 6 subjects, 12 sessions' })),
    ...methodGallery,
  ];

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

        {/* Stats */}
        <dl className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {finalProjectStats.map((s) => (
            <motion.div
              key={s.label}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={variants}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <dd className="order-1 text-3xl font-bold text-teal-400 md:text-4xl [&_span]:text-teal-400">
                <CounterAnimation target={s.value} suffix={s.suffix} isInView={isInView} />
              </dd>
              <dt className="order-2 mt-2 text-sm font-semibold text-gray-100">{s.label}</dt>
              <dd className="order-3 mt-1 text-xs text-gray-400">{s.note}</dd>
            </motion.div>
          ))}
        </dl>

        {/* Funding and outcomes */}
        <div className="mb-20">
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

        {/* Pipeline */}
        <div className="mb-20">
          <h4 className="mb-2 text-xl font-bold text-white">How it works</h4>
          <p className="mb-8 text-sm text-gray-400">From camera frame to spoken warning, all on the device.</p>

          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-8"
          >
            <ol className="relative flex gap-2 overflow-x-auto pb-2 md:grid md:grid-cols-8 md:overflow-visible">
              {pipelineSteps.map((s, i) => {
                const active = i === step;
                const done = i < step;
                return (
                  <li key={s.title} className="min-w-[5.5rem] flex-1 md:min-w-0">
                    <button
                      onClick={() => setStep(i)}
                      aria-pressed={active}
                      className="group relative flex w-full flex-col items-center gap-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                    >
                      <span
                        className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                          active
                            ? 'scale-110 border-teal-300 bg-teal-400 text-[#04101a] shadow-[0_0_24px_rgba(45,212,191,0.55)]'
                            : done
                              ? 'border-teal-400/60 bg-teal-400/15 text-teal-300'
                              : 'border-white/15 bg-white/5 text-gray-400 group-hover:border-white/40'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`text-xs font-semibold transition-colors ${active ? 'text-white' : 'text-gray-400'}`}>{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Progress rail */}
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 via-cyan-300 to-teal-300"
                animate={{ width: `${((step + 1) / pipelineSteps.length) * 100}%` }}
                transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}
              />
            </div>

            <div className="mt-6 min-h-[3.5rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base"
                >
                  <span className="font-semibold text-teal-300">
                    {String(step + 1).padStart(2, '0')} {pipelineSteps[step].title}.{' '}
                  </span>
                  {pipelineSteps[step].detail}
                </motion.p>
              </AnimatePresence>
            </div>

            <button
              onClick={() => onOpenGallery(galleryFor('Method and analysis', methodGallery, 0))}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal-300 hover:text-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <FiMaximize2 className="h-4 w-4" /> See the full flowchart and analysis figures
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-20">
          <h4 className="mb-2 text-xl font-bold text-white">Results</h4>
          <p className="mb-8 text-sm text-gray-400">
            Measured on the Raspberry Pi 5 prototype with 6 subjects (two wearing glasses), each recorded in normal light and at 0 lux.
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Result charts">
                {resultTabs.map((t) => {
                  const on = t.id === tab;
                  return (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={on}
                      onClick={() => setTab(t.id)}
                      className="relative rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                    >
                      {on && (
                        <motion.span
                          layoutId="resultTab"
                          className="absolute inset-0 rounded-full border border-teal-500/50 bg-teal-500/20"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 ${on ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => onOpenGallery(galleryFor('Results', resultPhotos, resultTabs.findIndex((t) => t.id === tab)))}
                aria-label={`Enlarge chart: ${activeTab.caption}`}
                className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ImageWithFallback
                      src={activeTab.image}
                      alt={activeTab.caption}
                      className="aspect-[16/10] w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
              </button>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{activeTab.insight}</p>
            </div>

            {/* Event scores */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="mb-1 text-sm font-semibold text-white">F1 score per fatigue event</p>
              <p className="mb-6 text-xs text-gray-400">Event-level, all subjects and lighting conditions</p>
              <ul className="space-y-5">
                {eventScores.map((e, i) => (
                  <li key={e.event}>
                    <div className="mb-1.5 flex items-baseline justify-between text-sm">
                      <span className="text-gray-200">{e.event}</span>
                      <span className="font-semibold text-teal-300">{e.f1.toFixed(3)}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-violet-400 to-teal-300"
                        initial={{ width: 0 }}
                        animate={{ width: isInView ? `${e.f1 * 100}%` : 0 }}
                        transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 0.2 + i * 0.12, ease: 'easeOut' }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs leading-relaxed text-gray-300">
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />Zero microsleep false alarms across every session</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />Landmarks tracked through prescription glasses (2 of 6 subjects)</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />Yawn F1 of 0.964 at 0 lux</li>
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-gray-400">
                Ground truth: 621 blinks, 33 microsleeps, 62 yawns and 39 head drops.
              </p>
            </div>
          </div>
        </div>

        {/* Hardware bento */}
        <div>
          <h4 className="mb-2 text-xl font-bold text-white">The hardware</h4>
          <p className="mb-8 text-sm text-gray-400">
            The prototype: a 3D-printed ventilated enclosure with an adjustable camera mount, a battery-powered supply chain and a physical calibration button.
          </p>

          <div className="grid grid-cols-2 gap-3 md:auto-rows-[11rem] md:grid-cols-4">
            {hardwareGallery.map((p, i) => (
              <motion.button
                key={p.url}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={variants}
                onClick={() => onOpenGallery(galleryFor('Prototype and hardware', hardwareGallery, i))}
                aria-label={`Open photo: ${p.caption}`}
                className={`group relative overflow-hidden rounded-xl border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${bento[i]} ${i === 0 ? 'col-span-2 aspect-[4/3] md:aspect-auto' : 'aspect-square md:aspect-auto'}`}
              >
                <ImageWithFallback
                  src={p.url}
                  alt={p.caption}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 right-3 text-left text-xs text-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {p.tools}
                </span>
              </motion.button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
