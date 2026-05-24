import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, NAVBAR_HEIGHT, SCROLL_OFFSET_PADDING, ANIMATION_DURATIONS } from '../../lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onToggleTheme: () => void;
  isDark: boolean;
}

/**
 * Mobile navigation drawer triggered by the hamburger button.
 * Slides in from the top with a fade, covers ≥80% viewport height,
 * displays all section links and theme toggle.
 * Closes on link tap or tap outside. Locks body scroll while open.
 */
export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  onToggleTheme,
  isDark,
}: MobileMenuProps) {
  // Lock body scroll while open, restore on close/unmount
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Smooth-scroll to section with offset, then close menu
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = NAVBAR_HEIGHT + SCROLL_OFFSET_PADDING;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      onClose();
    },
    [onClose]
  );

  const animationDuration = ANIMATION_DURATIONS.MOBILE_MENU / 1000; // Convert ms to seconds

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — tap outside to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: animationDuration, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-2xl"
            style={{ minHeight: '80vh', paddingTop: NAVBAR_HEIGHT }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Close button */}
            <div className="absolute top-4 right-4" style={{ marginTop: 4 }}>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200/60 dark:hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-label="Close navigation menu"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6 py-8">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className={`w-full max-w-xs text-center px-6 py-3 rounded-xl text-lg font-medium transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'text-teal-600 dark:text-teal-400 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/30 dark:border-teal-400/30'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Theme toggle */}
              <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-white/10 w-full max-w-xs flex justify-center">
                <button
                  onClick={onToggleTheme}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                >
                  {isDark ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                  <span className="text-base font-medium">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
