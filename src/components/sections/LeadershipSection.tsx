import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiSend, FiBookmark, FiMoreHorizontal, FiInstagram, FiArrowUpRight } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeInUp, reducedMotionVariants } from '../../lib/animations';
import ImageWithFallback from '../ui/ImageWithFallback';

const POST_URL = 'https://www.instagram.com/p/DPi0XMDk1FG/?img_index=3';

const RESPONSIBILITIES = [
  'Led external affairs and operational coordination for the research laboratory, bridging communication between faculty leadership, university authorities, alumni, and external corporate sponsors.',
  'Managed controlled technical documentation, flight test permits, and laboratory scheduling to ensure safety and compliance across all aeronautical research projects.',
  'Oversaw cross-functional workflows across mechanical, avionics, and software teams, facilitating resource allocation for national and international UAV competition divisions.',
];

/**
 * Leadership experience, framed as the Instagram post that announced the role.
 * The whole frame links out to the original post on the APTRG account.
 */
export default function LeadershipSection() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.12 });
  const reduced = useReducedMotion();
  const variants = reduced ? reducedMotionVariants : fadeInUp;

  return (
    <section
      id="leadership"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#06040f] via-[#0a0a18] to-[#04070f]"
    >
      <div className="pointer-events-none absolute -right-24 top-20 h-[460px] w-[460px] rounded-full bg-fuchsia-600/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-[420px] w-[420px] rounded-full bg-orange-500/[0.06] blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-5xl px-6 py-24">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-500 text-teal-400">
            <FiInstagram className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-200">Leadership Experience</h2>
        </motion.div>

        <motion.h3
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-10 max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl"
        >
          Vice Captain of a <span className="text-teal-400">UAV research laboratory</span>
        </motion.h3>

        <motion.a
          href={POST_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the APTRG Laboratory leadership announcement on Instagram"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          whileHover={reduced ? undefined : { y: -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="group relative block rounded-[22px] p-[1.5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.14))',
          }}
        >
          {/* Instagram-gradient border that fades in on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
              backgroundSize: '200% 200%',
              animation: reduced ? undefined : 'gradient-shift 6s ease infinite',
            }}
          />

          <div className="relative grid overflow-hidden rounded-[20px] bg-[#101114] md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
            {/* Post image */}
            <div className="relative aspect-[4/5] max-h-[420px] w-full overflow-hidden bg-black md:aspect-auto md:max-h-none">
              <ImageWithFallback
                src="/leadership/aptrg-leader-2025.webp"
                alt="APTRG 2025 Leader poster showing the laboratory captain and vice captains"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] md:absolute md:inset-0"
                loading="lazy"
              />
            </div>

            {/* Post sidebar */}
            <div className="flex min-w-0 flex-col">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <span className="rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[2px]">
                  <ImageWithFallback
                    src="/leadership/aptrg-avatar.webp"
                    alt="APTRG avatar"
                    className="h-9 w-9 rounded-full border-2 border-[#101114] bg-white object-cover"
                  />
                </span>
                <span className="text-sm font-semibold text-white">aptrg</span>
                <FiMoreHorizontal className="ml-auto h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>

              <div className="flex-1 space-y-4 px-5 py-4 text-sm leading-relaxed text-gray-200">
                <p>
                  <span className="font-semibold text-white">aptrg</span> We are proud to introduce our team behind
                  APTRG Laboratory for the 2024 - 2025 period.
                </p>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">My role</p>
                  <p className="mt-1 text-[0.95rem] font-semibold leading-snug text-white">Vice Captain &amp; Deputy Coordinator of External Affairs</p>
                  <p className="text-xs text-gray-400">
                    Aeromodelling &amp; Payload Telemetry Research Group (APTRG) | Telkom University | Oct 2024 - Oct 2025
                  </p>
                </div>

                <ul className="space-y-2 text-[0.78rem] leading-relaxed text-gray-300">
                  {RESPONSIBILITIES.map((r) => (
                    <li key={r} className="flex gap-2.5">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-[#7b8df5]">#APTRGLaboratory #APTRGTELU</p>
              </div>

              <div className="border-t border-white/10 px-5 py-4">
                <div className="mb-3 flex items-center gap-4 text-white">
                  <FiHeart className="h-6 w-6 transition-colors duration-300 group-hover:fill-[#ff3040] group-hover:text-[#ff3040]" aria-hidden="true" />
                  <FiMessageCircle className="h-6 w-6" aria-hidden="true" />
                  <FiSend className="h-6 w-6" aria-hidden="true" />
                  <FiBookmark className="ml-auto h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.7rem] uppercase tracking-wide text-gray-400">October 8, 2025</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#d62976] group-hover:to-[#962fbf]">
                    View on Instagram <FiArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
