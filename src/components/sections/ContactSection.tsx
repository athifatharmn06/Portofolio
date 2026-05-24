import { motion } from 'framer-motion';
import { socialLinks } from '../../data/social';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeInUp, staggerContainer, reducedMotionVariants } from '../../lib/animations';

/**
 * ContactSection — Engaging contact section with social links.
 *
 * Features:
 * - Gradient background distinct from adjacent sections
 * - Social links as animated icon buttons with hover scale and color transition
 * - Visible text labels for each platform
 * - Card-based layout with glassmorphic styling (backdrop-blur, semi-transparent bg)
 * - All links open in new tab with rel="noopener noreferrer"
 * - Motivational tagline encouraging collaboration
 */
export default function ContactSection() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion ? reducedMotionVariants : staggerContainer;
  const itemVariants = prefersReducedMotion ? reducedMotionVariants : fadeInUp;

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full relative overflow-hidden bg-gradient-to-br from-[#0a0320] via-[#0d0a1a] to-[#04081a] py-24 md:py-32"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-900/15 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container mx-auto px-6 max-w-4xl relative z-10"
      >
        {/* Section heading */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Let's build something extraordinary together
          </p>
        </motion.div>

        {/* Glassmorphic card with social links */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label={`Visit ${link.platform}`}
              >
                {/* Animated icon button */}
                <span
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white transition-all duration-250 group-hover:scale-[1.2] group-hover:border-transparent group-hover:shadow-lg"
                  style={{
                    // Apply hover color via CSS custom property for the group-hover state
                    ['--hover-color' as string]: link.hoverColor,
                  }}
                >
                  <span className="text-2xl transition-colors duration-250 group-hover:text-[var(--hover-color)]">
                    {link.icon}
                  </span>
                </span>

                {/* Visible text label */}
                <span className="text-sm font-medium text-gray-400 transition-colors duration-250 group-hover:text-white">
                  {link.platform}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Open to freelance opportunities, collaborations, and exciting projects.
        </motion.p>
      </motion.div>
    </section>
  );
}
