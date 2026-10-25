import { motion } from 'framer-motion';
import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { NAVBAR_HEIGHT, SCROLL_OFFSET_PADDING } from '../../lib/constants';

const FACTS = [
  { value: '15+', label: 'Projects shipped' },
  { value: '3+', label: 'Years building' },
  { value: '10+', label: 'Tech stacks' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  const scrollToWork = () => {
    const el = document.getElementById('projects');
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT - SCROLL_OFFSET_PADDING;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col pt-[64px]">
      <div className="wrap grid flex-1 items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-8">
        {/* Text */}
        <div className="lg:col-span-7">
          <motion.p {...rise(0.05)} className="eyebrow mb-8 flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 rounded-full bg-accent"
              style={{ animation: reduced ? undefined : 'pulse-dot 2.4s ease-out infinite' }}
              aria-hidden="true"
            />
            Open to freelance &amp; collaboration
          </motion.p>

          <motion.h1 {...rise(0.12)} className="display text-[clamp(3rem,8.4vw,7.25rem)] text-fg">
            I engineer systems where{' '}
            <em className="text-accent">software meets hardware.</em>
          </motion.h1>

          <motion.p {...rise(0.24)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            Athif Fadheel Atharahman — electrical &amp; software engineer. From SCADA and embedded control to
            cloud-scale applications, data pipelines and AI.
          </motion.p>

          <motion.div {...rise(0.34)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button onClick={scrollToWork} className="btn btn-solid">
              Selected work
              <FiArrowDownRight size={17} />
            </button>
            <a
              href="/1_CV ATS - Athif Fadheel Atharahman (Nov 2025).pdf"
              download
              className="link-underline pb-0.5 text-sm font-medium"
            >
              Download CV
            </a>
            <a
              href="https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1 pb-0.5 text-sm font-medium"
            >
              LinkedIn <FiArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.figure
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, scale: 0.985 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 1, delay: 0.2, ease },
              })}
          className="mx-auto w-full max-w-[380px] lg:col-span-5 lg:max-w-none lg:justify-self-end"
        >
          <div className="relative aspect-[4/5] overflow-hidden border border-line bg-sunk lg:max-w-[440px]">
            <img
              src="/profile-portrait.webp"
              alt="Athif Fadheel Atharahman"
              width={900}
              height={1125}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
          <figcaption className="eyebrow mt-3 flex justify-between lg:max-w-[440px]">
            <span>Fig. 01</span>
            <span>Athif F. Atharahman</span>
          </figcaption>
        </motion.figure>
      </div>

      {/* Facts strip */}
      <div className="border-t border-line">
        <dl className="wrap grid grid-cols-3">
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className={`py-5 md:py-6 ${i > 0 ? 'border-l border-line pl-4 md:pl-8' : ''}`}
            >
              <dt className="eyebrow order-2">{f.label}</dt>
              <dd className="display mt-1 text-3xl text-fg md:text-5xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
