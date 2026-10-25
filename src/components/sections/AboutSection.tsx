import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { stats } from '../../data/stats';
import { fadeInUp, staggerContainer, scaleUp, reducedMotionVariants } from '../../lib/animations';
import CounterAnimation from '../ui/CounterAnimation';
import ImageWithFallback from '../ui/ImageWithFallback';

/**
 * AboutSection — Bio, stats counters, languages, education card.
 *
 * - Animated numeric counters (3+ stats) triggered by useInView
 * - Education card with hover-expand revealing GPA and coursework (300ms)
 * - Staggered fade-in-up transitions (150ms delay, 600ms per element)
 * - Two-column on desktop (≥1024px): 60% text left, 40% image right
 * - Single-column on mobile: heading → text → languages → image → education card
 * - Retains final counter values without re-animating on subsequent scroll entries
 *
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */
export default function AboutSection() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);

  const variants = prefersReducedMotion ? reducedMotionVariants : fadeInUp;
  const containerVariants = prefersReducedMotion ? reducedMotionVariants : staggerContainer;
  const imageVariants = prefersReducedMotion ? reducedMotionVariants : scaleUp;

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full relative overflow-hidden bg-gradient-to-br from-[#02050e] via-[#05111c] to-[#010612] border-b border-white/5"
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl py-32 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center text-teal-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-200">About Me</h2>
        </motion.div>

        {/* Section Heading */}
        <motion.h3
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="text-4xl md:text-5xl font-bold leading-tight text-white mb-16"
        >
          I'm an innovative <span className="text-teal-400">Electrical & Software Engineer</span> specializing in{' '}
          <br className="hidden md:block" />
          <span className="text-teal-400">Autonomous Systems & Data Architecture</span>
        </motion.h3>

        {/* Stats Counters */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-2 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={variants}
              className="text-center p-4 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-teal-500/50 transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">
                <CounterAnimation
                  target={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content: Two-column on desktop */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="flex flex-col lg:flex-row gap-16 justify-between items-start"
        >
          {/* Left Column: Text & Languages (60% on desktop) */}
          <motion.div variants={variants} className="w-full lg:w-3/5 space-y-8 order-1">
            <div>
              <h4 className="text-xl font-bold text-white">Athif Fadheel Atharahman</h4>
              <p className="text-teal-400 font-medium">Electrical & Software Engineer</p>
            </div>

            <div className="space-y-4 text-gray-400 font-light leading-relaxed text-justify">
              <p>
                Athif is a multidisciplinary engineer with expertise in AI, cloud computing, robotics, and full-stack development.
                With a strong foundation in both logic-based problem solving and software scalability, he bridges the gap between
                complex engineering challenges and efficient digital solutions.
              </p>
              <p>
                His expertise spans developing scalable web applications, managing large-scale relational databases,
                enterprise-level SCADA automation (with proven success at PT PLN Indonesia, the state-owned and largest
                electricity supplier in Indonesia), and streamlining AI training pipelines.
              </p>
              <p>
                Whether architecting cloud-based computing systems, managing technical projects, or engineering advanced
                control logic for UAVs, he builds solutions that are precise, automated, and highly reliable.
              </p>
            </div>

            {/* Languages */}
            <div className="pt-6 order-3 lg:order-none">
              <h5 className="text-sm font-semibold text-teal-500 mb-2">| Languages</h5>
              <hr className="border-gray-800 w-1/2 mb-4" />
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-gray-300">
                <p>
                  <span className="font-bold text-white">Indonesian</span> - Native
                </p>
                <p>
                  <span className="font-bold text-white">English</span> - Advanced / Professional
                  <a
                    href="https://igracias.telkomuniversity.ac.id/LACValidation/index.php?id=1815368&id2=107&id3=1817580&id4=1102220005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-teal-400 hover:text-teal-300 underline underline-offset-2 inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:rounded-sm"
                  >
                    (ECCT 3.75)
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image & Education Card (40% on desktop) */}
          <motion.div
            variants={imageVariants}
            className="w-full lg:w-2/5 flex flex-col items-center lg:items-end space-y-12 order-4 lg:order-2"
          >
            {/* Circular Portrait */}
            <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-gray-800 shadow-xl opacity-80 hover:opacity-100 transition-opacity duration-300">
              <ImageWithFallback
                src="/about_me.webp"
                alt="Athif Fadheel Atharahman portrait"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>

            {/* Education Card with hover-expand */}
            <motion.div
              onMouseEnter={() => setIsEducationExpanded(true)}
              onMouseLeave={() => setIsEducationExpanded(false)}
              className="w-full max-w-sm bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-teal-500/50 transition-colors duration-300 cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center shrink-0">
                  <ImageWithFallback
                    src="/Logo_Telkom_University_potrait.webp"
                    alt="Telkom University logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-snug mb-1">
                    Bachelor of Electrical Engineering
                  </h4>
                  <p className="text-teal-400 text-xs font-semibold mb-1">Telkom University</p>
                  <p className="text-gray-400 text-xs">2022 - Present</p>
                </div>
              </div>

              {/* Expandable details */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: isEducationExpanded ? '200px' : '0px',
                  opacity: isEducationExpanded ? 1 : 0,
                }}
              >
                <div className="pt-4 mt-4 border-t border-gray-800 space-y-2">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-white">GPA:</span> 3.51 / 4.00
                  </p>
                  <div>
                    <p className="text-xs font-semibold text-teal-400 mb-1">Relevant Coursework:</p>
                    <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                      <li>Digital Signal Processing</li>
                      <li>Control Systems Engineering</li>
                      <li>Embedded Systems & IoT</li>
                      <li>Power Electronics</li>
                      <li>Machine Learning & AI</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
