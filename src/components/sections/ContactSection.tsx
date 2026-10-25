import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiCheck, FiCopy, FiMail } from 'react-icons/fi';
import Magnetic from '../ui/Magnetic';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeInUp, staggerContainer, reducedMotionVariants } from '../../lib/animations';

const EMAIL = 'athifadheel@gmail.com';
const CV_URL = '/CV_Athif_Fadheel_Atharahman.pdf';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/', icon: FaLinkedin },
  { label: 'GitHub', href: 'https://github.com/athifatharmn06', icon: FaGithub },
  { label: 'Instagram', href: 'https://www.instagram.com/athifatharmn/', icon: FaInstagram },
];

/**
 * Contact: the email address in plain text (with copy), the CV, and the professional profiles.
 * Written for a recruiter who wants to reach out in one click.
 */
export default function ContactSection() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const containerVariants = prefersReducedMotion ? reducedMotionVariants : staggerContainer;
  const itemVariants = prefersReducedMotion ? reducedMotionVariants : fadeInUp;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto link still works
    }
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full relative overflow-hidden bg-gradient-to-br from-[#0a0320] via-[#0d0a1a] to-[#04081a] py-24 md:py-32"
    >
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-900/15 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container mx-auto px-6 max-w-3xl relative z-10 text-center"
      >
        <motion.p variants={itemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/35 bg-teal-400/10 px-3 py-1.5 text-xs font-medium text-teal-300">
          <span className="h-2 w-2 rounded-full bg-teal-300" aria-hidden="true" />
          Open to full-time roles, freelance work and collaborations
        </motion.p>

        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-white mb-4">
          Let's work together
        </motion.h2>
        <motion.p variants={itemVariants} className="mx-auto mb-10 max-w-xl text-base md:text-lg text-gray-300 font-light">
          Based in Jakarta, Indonesia. The fastest way to reach me is email.
        </motion.p>

        {/* Email */}
        <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 rounded-xl px-6 py-3.5 text-base font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              <FiMail className="h-5 w-5" aria-hidden="true" />
              {EMAIL}
            </a>
          </Magnetic>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3.5 text-sm font-medium text-gray-200 transition-colors hover:border-teal-400/60 hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-live="polite"
          >
            {copied ? <FiCheck className="h-4 w-4" aria-hidden="true" /> : <FiCopy className="h-4 w-4" aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </motion.div>

        {/* CV and profiles */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a
              href={CV_URL}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-gray-100 transition-colors hover:border-violet-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <FaDownload aria-hidden="true" /> Download CV
            </a>
          </Magnetic>
          {LINKS.map((l) => (
            <Magnetic key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-gray-100 transition-colors hover:border-teal-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <l.icon aria-hidden="true" /> {l.label}
              </a>
            </Magnetic>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
