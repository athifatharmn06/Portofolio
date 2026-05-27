import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { FaLinkedin, FaEye, FaDownload, FaArrowRight } from 'react-icons/fa';
import TypingAnimation from '../ui/TypingAnimation';
import ScrollIndicator from '../ui/ScrollIndicator';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { NAVBAR_HEIGHT, SCROLL_OFFSET_PADDING } from '../../lib/constants';

const ROLES = [
  'Software Engineer',
  'Electrical Engineer',
  'AI Specialist',
  'Cloud Architect',
];

const STAT_ITEMS = [
  { value: '15+', label: 'Projects Built' },
  { value: '3+', label: 'Years Coding' },
  { value: '10+', label: 'Tech Stacks' },
];

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [mouseNorm, setMouseNorm] = useState({ x: 0.5, y: 0.5 });

  // Spring-based smooth cursor following
  const springX = useSpring(0, { stiffness: 80, damping: 20 });
  const springY = useSpring(0, { stiffness: 80, damping: 20 });

  // Parallax transforms for aurora orbs
  const orb1X = useTransform(springX, [-1, 1], [-60, 60]);
  const orb1Y = useTransform(springY, [-1, 1], [-40, 40]);
  const orb2X = useTransform(springX, [-1, 1], [40, -40]);
  const orb2Y = useTransform(springY, [-1, 1], [30, -30]);
  const orb3X = useTransform(springX, [-1, 1], [-30, 30]);
  const orb3Y = useTransform(springY, [-1, 1], [-50, 50]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          const { x, y } = cursorRef.current;
          const nx = (x / rect.width) * 2 - 1;
          const ny = (y / rect.height) * 2 - 1;
          springX.set(nx);
          springY.set(ny);
          setMouseNorm({ x: x / rect.width, y: y / rect.height });
          setCursorPos({ x, y });
          rafId.current = 0;
        });
      }
    },
    [prefersReducedMotion, springX, springY]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;
    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = 0; }
    };
  }, [handleMouseMove, prefersReducedMotion]);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT - SCROLL_OFFSET_PADDING;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #020010 0%, #050118 30%, #020820 60%, #010010 100%)' }}
    >
      {/* ── AURORA BACKGROUND ORBS ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary aurora — violet/indigo */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 900, height: 900,
            top: '-20%', left: '-15%',
            x: orb1X, y: orb1Y,
            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(99,102,241,0.12) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Secondary aurora — cyan/teal */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            bottom: '-10%', right: '-10%',
            x: orb2X, y: orb2Y,
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(45,212,191,0.10) 40%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Tertiary aurora — pink/rose */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            top: '30%', right: '20%',
            x: orb3X, y: orb3Y,
            background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Static deep blue center glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ── NOISE TEXTURE OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── SUBTLE GRID ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* ── CURSOR SPOTLIGHT ── */}
      {!prefersReducedMotion && cursorPos.x > 0 && (
        <div
          className="absolute pointer-events-none will-change-transform"
          aria-hidden="true"
          style={{
            width: 500, height: 500,
            borderRadius: '50%',
            left: cursorPos.x - 250,
            top: cursorPos.y - 250,
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)',
            filter: 'blur(20px)',
            transition: 'left 0.08s ease-out, top 0.08s ease-out',
          }}
        />
      )}

      {/* ── FLOATING GLASS CHIPS (background decoration) ── */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[
            { x: '8%', y: '20%', delay: 0, dur: 7 },
            { x: '85%', y: '15%', delay: 1.5, dur: 9 },
            { x: '12%', y: '70%', delay: 3, dur: 6 },
            { x: '78%', y: '65%', delay: 0.8, dur: 8 },
            { x: '45%', y: '85%', delay: 2, dur: 10 },
            { x: '92%', y: '45%', delay: 4, dur: 7 },
            { x: '3%', y: '45%', delay: 1, dur: 11 },
          ].map((chip, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: chip.x, top: chip.y,
                background: i % 3 === 0
                  ? 'rgba(139,92,246,0.5)'
                  : i % 3 === 1
                  ? 'rgba(6,182,212,0.5)'
                  : 'rgba(236,72,153,0.4)',
                boxShadow: i % 3 === 0
                  ? '0 0 12px rgba(139,92,246,0.6)'
                  : i % 3 === 1
                  ? '0 0 12px rgba(6,182,212,0.6)'
                  : '0 0 12px rgba(236,72,153,0.5)',
                animation: `float ${chip.dur}s ease-in-out infinite`,
                animationDelay: `${chip.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 py-24">

        {/* LEFT — Text content */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-[52%]"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Name — all on one line */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="mb-2"
          >
            <h1 className="font-black tracking-tight" style={{ lineHeight: 1.2 }}>
              <span className="text-4xl sm:text-5xl lg:text-6xl text-white">
                Hi, I'm{' '}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'Caveat, cursive',
                  fontWeight: 700,
                  fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
                  lineHeight: 1.3,
                  paddingRight: '0.35em',
                  paddingBottom: '0.1em',
                  verticalAlign: 'middle',
                  background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Athif
              </span>
            </h1>
          </motion.div>

          {/* Typing role */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4"
            style={{ color: 'rgba(148,163,184,0.9)' }}
          >
            <TypingAnimation roles={ROLES} typingSpeed={50} pauseDuration={1800} />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="max-w-lg text-base leading-relaxed mb-8"
            style={{ color: 'rgba(148,163,184,0.75)' }}
          >
            Building innovative solutions at the intersection of software, hardware, and AI.
            From embedded systems to cloud-scale applications — I engineer things that work.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {/* Primary CTA */}
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#020010]"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                boxShadow: '0 0 30px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 50px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.1)')}
            >
              <FaEye />
              View My Work
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
            <a
              href="/1_CV ATS - Athif Fadheel Atharahman (Nov 2025).pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#020010]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(226,232,240,0.9)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >
              <FaDownload />
              Download CV
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2 focus:ring-offset-[#020010]"
              style={{
                background: 'rgba(0,119,181,0.2)',
                border: '1px solid rgba(0,119,181,0.4)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,119,181,0.35)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,119,181,0.2)'; }}
            >
              <FaLinkedin className="text-[#38bdf8]" />
              LinkedIn
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="flex items-center gap-8"
          >
            {STAT_ITEMS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center lg:items-start">
                <span
                  className="text-2xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.6)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Full-body photo with interactive contour glow */}
        <motion.div
          className="relative flex-shrink-0 flex items-center justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ width: 'min(45vw, 520px)', minWidth: 320, minHeight: 500 }}
        >
          {/* Ambient glow pool at feet */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '80%', height: 100,
              background: 'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, rgba(99,102,241,0.2) 40%, transparent 70%)',
              filter: 'blur(25px)',
              animation: 'glow-pulse 3s ease-in-out infinite',
            }}
          />

          {/* Aurora behind the figure — follows mouse */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 70% 80% at ${50 + (mouseNorm.x - 0.5) * 20}% ${50 + (mouseNorm.y - 0.5) * 20}%, rgba(139,92,246,0.25) 0%, rgba(6,182,212,0.15) 50%, transparent 75%)`,
              filter: 'blur(40px)',
              transition: 'background 0.1s ease-out',
            }}
          />

          {/* Profile image — full body, contour glow via drop-shadow */}
          <img
            src="/profile.webp"
            alt="Athif Fadheel — Professional profile photo"
            className="relative z-10 w-full h-auto object-contain select-none"
            style={{
              maxHeight: '80vh',
              filter: prefersReducedMotion
                ? 'drop-shadow(0 0 40px rgba(139,92,246,0.6))'
                : `drop-shadow(0 0 ${25 + Math.abs(mouseNorm.x - 0.5) * 50}px rgba(139,92,246,${0.5 + Math.abs(mouseNorm.x - 0.5) * 0.4})) drop-shadow(0 0 ${20 + Math.abs(mouseNorm.y - 0.5) * 35}px rgba(6,182,212,${0.35 + Math.abs(mouseNorm.y - 0.5) * 0.35}))`,
              transition: 'filter 0.12s ease-out',
            }}
          />
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ScrollIndicator />
      </div>
    </section>
  );
}
