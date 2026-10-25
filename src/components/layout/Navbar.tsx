import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, NAVBAR_HEIGHT, SCROLL_OFFSET_PADDING } from '../../lib/constants';

interface NavbarProps {
  onMobileMenuToggle: () => void;
  activeSection: string;
}

/**
 * Fixed navigation bar with scroll-spy active state, theme toggle,
 * smooth-scroll navigation, and mobile hide-on-scroll-down behavior.
 * Receives activeSection from parent to avoid duplicate scroll listeners.
 */
export default function Navbar({ onMobileMenuToggle, activeSection }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Use refs for scroll tracking to avoid re-registering the listener on every scroll
  const lastScrollYRef = useRef(0);
  const scrollDeltaRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Mobile hide-on-scroll-down, reveal-on-scroll-up logic (rAF-throttled, stable listener)
  useEffect(() => {
    const handleScroll = () => {
      // Throttle with rAF — at most one computation per frame
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;

        const currentScrollY = window.scrollY;
        const isMobile = window.innerWidth < 768;

        if (!isMobile) {
          setIsVisible(true);
          lastScrollYRef.current = currentScrollY;
          scrollDeltaRef.current = 0;
          return;
        }

        const diff = currentScrollY - lastScrollYRef.current;

        // Reset delta when direction changes
        if ((diff > 0 && scrollDeltaRef.current < 0) || (diff < 0 && scrollDeltaRef.current > 0)) {
          scrollDeltaRef.current = diff;
        } else if (diff > 0) {
          // Scrolling down
          scrollDeltaRef.current += diff;
          if (scrollDeltaRef.current > 50) {
            setIsVisible(false);
          }
        } else {
          // Scrolling up
          scrollDeltaRef.current += diff;
          if (scrollDeltaRef.current < -50) {
            setIsVisible(true);
            scrollDeltaRef.current = 0;
          }
        }

        lastScrollYRef.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []); // Empty deps — listener is stable, uses refs for mutable state

  // Smooth-scroll to section with offset
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = NAVBAR_HEIGHT + SCROLL_OFFSET_PADDING;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200/50 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 transition-colors duration-300"
          style={{ height: NAVBAR_HEIGHT - 8 }}
        >
          <nav className="h-full px-6 flex items-center justify-between">
            {/* Logo — handwriting font */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="text-2xl font-handwriting font-bold tracking-tight text-gray-800 dark:text-white flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:rounded-md"
            >
              Athif<span className="text-teal-500">.</span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1 relative">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                    activeSection === link.id
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {/* Animated active indicator using layoutId */}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute inset-0 rounded-full bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/30 dark:border-teal-400/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30, duration: 0.3 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger Button */}              {/* Mobile Hamburger Button */}
              <button
                onClick={onMobileMenuToggle}
                className="md:hidden p-2 rounded-full hover:bg-gray-200/60 dark:hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-label="Open navigation menu"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
