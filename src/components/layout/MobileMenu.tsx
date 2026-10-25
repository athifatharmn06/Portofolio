import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMoon, FiSun, FiX } from 'react-icons/fi';
import { NAV_LINKS, NAVBAR_HEIGHT, SCROLL_OFFSET_PADDING } from '../../lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onToggleTheme: () => void;
  isDark: boolean;
}

export default function MobileMenu({ isOpen, onClose, activeSection, onToggleTheme, isDark }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  const goTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      onClose();
      const el = document.getElementById(id);
      if (!el) return;
      const top =
        id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT - SCROLL_OFFSET_PADDING;
      window.scrollTo({ top, behavior: 'smooth' });
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="wrap flex items-center justify-between" style={{ height: NAVBAR_HEIGHT }}>
            <span className="text-[0.95rem] font-medium tracking-tight">Athif Fadheel</span>
            <button onClick={onClose} aria-label="Close navigation menu" className="grid h-10 w-10 place-items-center">
              <FiX size={22} />
            </button>
          </div>

          <ul className="wrap mt-8 flex flex-1 flex-col">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id} className="border-t border-line last:border-b">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => goTo(e, link.id)}
                  className={`flex items-baseline justify-between py-5 font-display text-4xl ${
                    activeSection === link.id ? 'text-accent' : 'text-fg'
                  }`}
                >
                  {link.label}
                  <span className="font-mono text-xs text-muted">0{i}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="wrap flex items-center justify-between pb-8 pt-6">
            <span className="eyebrow">Theme</span>
            <button onClick={onToggleTheme} className="btn btn-ghost">
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
