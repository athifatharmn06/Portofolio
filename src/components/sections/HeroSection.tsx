import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { FaLinkedin, FaDownload } from 'react-icons/fa';
import TypingAnimation from '../ui/TypingAnimation';
import ScrollIndicator from '../ui/ScrollIndicator';
import HeroField from '../ui/HeroField';
import OrbitRings from '../ui/OrbitRings';
import Magnetic from '../ui/Magnetic';
import CounterAnimation from '../ui/CounterAnimation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ROLES = [
  'Software Engineer',
  'Electrical Engineer',
  'AI Specialist',
  'Cloud Architect',
];

const STAT_ITEMS = [
  { value: 15, label: 'Projects Built' },
  { value: 3, label: 'Years Coding' },
  { value: 10, label: 'Tech Stacks' },
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
  const photoRotY = useTransform(springX, [-1, 1], [-9, 9]);
  const photoRotX = useTransform(springY, [-1, 1], [6, -6]);

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

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #020010 0%, #050118 30%, #020820 60%, #010010 100%)' }}
    >
      {/* ── AURORA BACKGROUND ORBS ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary aurora - violet/indigo */}
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
        {/* Secondary aurora - cyan/teal */}
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
        {/* Tertiary aurora - pink/rose */}
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

      {/* INTERACTIVE PARTICLE NETWORK */}
      <HeroField />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 py-24">

        {/* LEFT - Text content */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-[52%]"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Name - all on one line */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="mb-1"
          >
            <h1 className="font-black tracking-tight" style={{ lineHeight: 1 }}>
              <span className="text-4xl sm:text-5xl lg:text-6xl text-white">
                Hi, I'm{' '}
              </span>
              <span
                aria-label="Athif"
                style={{
                  display: 'inline-block',
                  fontFamily: 'Caveat, cursive',
                  fontWeight: 700,
                  fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
                  lineHeight: 1,
                  paddingRight: '0.35em',
                }}
              >
                {'Athif'.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    aria-hidden="true"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 40, rotate: -8 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.5 + i * 0.09 }}
                    whileHover={prefersReducedMotion ? undefined : { y: -10, scale: 1.12 }}
                    style={{
                      display: 'inline-block',
                      backgroundImage: 'linear-gradient(120deg, #a78bfa, #818cf8, #38bdf8, #2dd4bf, #a78bfa)',
                      backgroundSize: '300% 100%',
                      // Padding keeps Caveat's overhanging glyphs (the f's hook and tail) inside the clip box (the f overhangs its advance width by ~0.22em)
                      lineHeight: 1.25,
                      padding: '0.1em 0.3em 0.2em 0.04em',
                      margin: '-0.1em -0.3em -0.2em -0.04em',
                      animation: prefersReducedMotion ? undefined : 'gradient-shift 6s ease-in-out infinite',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
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
            From embedded systems to cloud-scale applications. I engineer things that work.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {/* Secondary CTA */}
            <Magnetic>
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
            </Magnetic>

            {/* LinkedIn */}
            <Magnetic>
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
            </Magnetic>
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
                  <CounterAnimation target={stat.value} suffix="+" isInView duration={2200} />
                </span>
                <span className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.6)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT - Full-body photo with interactive contour glow */}
        <motion.div
          className="relative flex-shrink-0 flex items-center justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ width: 'min(45vw, 520px)', minWidth: 320, minHeight: 500 }}
        >
          <OrbitRings />

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

          {/* Aurora behind the figure - follows mouse */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 70% 80% at ${50 + (mouseNorm.x - 0.5) * 20}% ${50 + (mouseNorm.y - 0.5) * 20}%, rgba(139,92,246,0.25) 0%, rgba(6,182,212,0.15) 50%, transparent 75%)`,
              filter: 'blur(40px)',
              transition: 'background 0.1s ease-out',
            }}
          />

          {/* Profile image - full body, contour glow via drop-shadow */}
          <motion.img
            src="/profile.webp"
            alt="Athif Fadheel, professional profile photo"
            className="relative z-10 w-full h-auto object-contain select-none"
            style={{
              rotateY: prefersReducedMotion ? 0 : photoRotY,
              rotateX: prefersReducedMotion ? 0 : photoRotX,
              transformPerspective: 1000,
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
