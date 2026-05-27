import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEye, FaDownload } from 'react-icons/fa';
import TypingAnimation from '../ui/TypingAnimation';
import ScrollIndicator from '../ui/ScrollIndicator';
import ImageWithFallback from '../ui/ImageWithFallback';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeInUp, staggerContainer, reducedMotionVariants } from '../../lib/animations';
import { NAVBAR_HEIGHT, SCROLL_OFFSET_PADDING } from '../../lib/constants';

const ROLES = [
  'Software Engineer',
  'Electrical Engineer',
  'AI Specialist',
  'Cloud Architect',
];

/**
 * HeroSection — Full-viewport landing area with typing animation,
 * cursor-reactive floating blob, CTA buttons, profile image with
 * animated border glow, and scroll indicator.
 *
 * Responsive: stacks vertically on mobile (<768px) with text above image.
 * Respects prefers-reduced-motion by disabling transform animations.
 */
export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor position stored in a ref to avoid re-renders on every mousemove
  const cursorRef = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  // State that triggers re-render at most once per animation frame
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  // Section dimensions stored in state (updated via ResizeObserver) to avoid reading refs during render
  const [sectionDims, setSectionDims] = useState({ width: 1200, height: 800 });
  const [particles] = useState(() => {
    const colors = [
      'rgba(99,102,241,0.4)',   // indigo
      'rgba(168,85,247,0.35)',  // purple
      'rgba(59,130,246,0.35)',  // blue
      'rgba(6,182,212,0.3)',    // cyan
      'rgba(236,72,153,0.25)',  // pink
      'rgba(45,212,191,0.3)',   // teal
    ];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      offsetX: (Math.random() - 0.5) * 30,
      offsetY: (Math.random() - 0.5) * 30,
    }));
  });

  // Track section dimensions via ResizeObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSectionDims({ width: width || 1200, height: height || 800 });
      }
    });
    ro.observe(section);
    return () => ro.disconnect();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Store in ref immediately (no re-render)
      cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      // Update CSS custom properties directly — no React re-render needed for particles
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          const { x, y } = cursorRef.current;
          if (section) {
            section.style.setProperty('--cursor-x', `${x}`);
            section.style.setProperty('--cursor-y', `${y}`);
          }
          setCursorPos(cursorRef.current);
          rafId.current = 0;
        });
      }
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, [handleMouseMove, prefersReducedMotion]);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const offset = NAVBAR_HEIGHT + SCROLL_OFFSET_PADDING;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const variants = prefersReducedMotion ? reducedMotionVariants : fadeInUp;
  const containerVariants = prefersReducedMotion
    ? reducedMotionVariants
    : staggerContainer;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-[#030014]"
    >
      {/* === ANIMATED BACKGROUND === */}

      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-left gradient orb */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl animate-blob" />
        {/* Bottom-right gradient orb */}
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-violet-600/5 via-transparent to-teal-500/5 blur-3xl" />
      </div>

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles — antigravity: float randomly + flee from cursor */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {particles.map((p) => {
            // Calculate repulsion from cursor (antigravity effect)
            const sectionWidth = sectionDims.width;
            const sectionHeight = sectionDims.height;
            const px = (p.x / 100) * sectionWidth;
            const py = (p.y / 100) * sectionHeight;
            const dx = cursorPos.x - px;
            const dy = cursorPos.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxPush = 200;
            const pushStrength = dist < maxPush ? (1 - dist / maxPush) * 40 : 0;
            const pushX = dist > 0 ? -(dx / dist) * pushStrength : 0;
            const pushY = dist > 0 ? -(dy / dist) * pushStrength : 0;

            return (
              <div
                key={p.id}
                className="absolute rounded-full will-change-transform"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                  transform: `translate(${pushX}px, ${pushY}px)`,
                  transition: 'transform 0.15s ease-out',
                  animation: `float ${p.duration}s ease-in-out infinite`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            );
          })}

          {/* Geometric shapes — also flee from cursor */}
          {[
            { top: '18%', left: '12%', size: 'w-6 h-6', border: 'border-blue-500/30', dur: 8 },
            { top: '65%', left: '8%', size: 'w-4 h-4', border: 'border-purple-500/30 rounded-sm', dur: 6 },
            { top: '75%', right: '15%', size: 'w-8 h-8', border: 'border-teal-500/25', dur: 10 },
            { top: '30%', right: '20%', size: 'w-5 h-5', border: 'border-cyan-500/25 rounded-full', dur: 7 },
            { top: '50%', left: '35%', size: 'w-3 h-3', border: 'border-pink-500/30', dur: 5 },
            { top: '85%', left: '55%', size: 'w-4 h-4', border: 'border-indigo-500/25 rounded-full', dur: 9 },
            { top: '10%', right: '40%', size: 'w-6 h-6', border: 'border-violet-500/20', dur: 11 },
          ].map((shape, i) => {
            const sectionWidth = sectionDims.width;
            const sectionHeight = sectionDims.height;
            const sx = shape.left ? (parseFloat(shape.left) / 100) * sectionWidth : sectionWidth - (parseFloat(shape.right || '0') / 100) * sectionWidth;
            const sy = (parseFloat(shape.top) / 100) * sectionHeight;
            const sdx = cursorPos.x - sx;
            const sdy = cursorPos.y - sy;
            const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
            const sPush = sdist < 180 ? (1 - sdist / 180) * 30 : 0;
            const sPushX = sdist > 0 ? -(sdx / sdist) * sPush : 0;
            const sPushY = sdist > 0 ? -(sdy / sdist) * sPush : 0;

            return (
              <div
                key={`shape-${i}`}
                className={`absolute border ${shape.size} ${shape.border} will-change-transform`}
                style={{
                  top: shape.top,
                  left: shape.left,
                  right: shape.right,
                  transform: `translate(${sPushX}px, ${sPushY}px) rotate(${45 + i * 15}deg)`,
                  transition: 'transform 0.2s ease-out',
                  animation: `float ${shape.dur}s ease-in-out infinite ${i * 0.7}s`,
                }}
              />
            );
          })}

          {/* Line accents — subtle parallax with cursor */}
          <div
            className="absolute w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent will-change-transform"
            style={{ top: '35%', left: '5%', transform: `translateY(${(cursorPos.y - 400) * 0.02}px)`, animation: 'float 7s ease-in-out infinite' }}
          />
          <div
            className="absolute w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent will-change-transform"
            style={{ bottom: '22%', right: '5%', transform: `translateY(${(cursorPos.y - 400) * -0.015}px)`, animation: 'float 9s ease-in-out infinite 3s' }}
          />
          <div
            className="absolute w-10 h-[1px] bg-gradient-to-r from-transparent via-teal-400/45 to-transparent will-change-transform"
            style={{ top: '55%', right: '35%', transform: `translateX(${(cursorPos.x - 600) * 0.01}px)`, animation: 'float 6s ease-in-out infinite 1.5s' }}
          />
          <div
            className="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent will-change-transform"
            style={{ top: '80%', left: '30%', transform: `translateX(${(cursorPos.x - 600) * -0.012}px)`, animation: 'float 8s ease-in-out infinite 2s' }}
          />
        </div>
      )}

      {/* Cursor-following radial glow light */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute h-[600px] w-[600px] rounded-full opacity-70 will-change-transform"
            style={{
              transform: `translate(${cursorPos.x - 300}px, ${cursorPos.y - 300}px)`,
              background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.18) 40%, transparent 70%)',
            }}
          />
        </div>
      )}

      {/* Vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(3,0,20,0.7) 100%)',
        }}
      />

      {/* Main content — always white text since hero is always dark */}
      <motion.div
        className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Text content */}
        <motion.div
          className="flex flex-col items-center text-center md:items-start md:text-left md:max-w-[55%]"
          variants={variants}
        >
          <motion.p
            className="text-sm font-medium uppercase tracking-widest text-blue-400 mb-2"
            variants={variants}
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-white"
            variants={variants}
          >
            Hi, I&apos;m{' '}
            <span className="font-handwriting text-4xl sm:text-5xl lg:text-6xl text-blue-400">Athif</span>
          </motion.h1>

          <motion.div
            className="mt-3 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-200"
            variants={variants}
          >
            <TypingAnimation roles={ROLES} typingSpeed={50} pauseDuration={1800} />
          </motion.div>

          <motion.p
            className="mt-4 max-w-md text-base text-gray-400"
            variants={variants}
          >
            Passionate about building innovative solutions at the intersection of
            software, hardware, and artificial intelligence.
          </motion.p>

          {/* CTA Button Group */}
          <motion.div className="mt-6 flex flex-col gap-3" variants={variants}>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#030014]"
              >
                <FaEye className="text-base" />
                View My Work
              </button>
              <a
                href="/1_CV ATS - Athif Fadheel Atharahman (Nov 2025).pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg border border-gray-600 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-200 shadow transition-all duration-200 hover:border-blue-400 hover:text-blue-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#030014]"
              >
                <FaDownload className="text-base" />
                Download CV
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-[#0077b5] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#005f8d] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2 focus:ring-offset-[#030014]"
            >
              <FaLinkedin className="text-lg" />
              Let&apos;s Connect
            </a>
          </motion.div>
        </motion.div>

        {/* Profile image with contour-following glow */}
        <motion.div
          className="relative flex-shrink-0"
          variants={prefersReducedMotion ? reducedMotionVariants : { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
        >
          <div className="relative">
            {/* CSS-only glow effect — radial-gradient replaces duplicate profile.webp load */}
            <div
              className={`absolute inset-0 scale-110 rounded-full ${
                prefersReducedMotion ? 'opacity-30' : 'opacity-50 animate-glow-pulse'
              }`}
              aria-hidden="true"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.5) 0%, rgba(168,85,247,0.4) 25%, rgba(59,130,246,0.3) 50%, rgba(6,182,212,0.15) 70%, transparent 85%)',
                filter: 'blur(24px)',
              }}
            />
            <div className="relative h-80 w-80 sm:h-96 sm:w-96 lg:h-[28rem] lg:w-[28rem] flex items-center justify-center">
              {/* profile.webp — main profile image with glow halo via CSS radial-gradient above */}
              <ImageWithFallback
                src="/profile.webp"
                alt="Athif Adheel - Professional profile photo"
                className="h-full w-full object-contain drop-shadow-2xl relative z-10"
                placeholderClassName="rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
