import { useCallback, useEffect, useState } from 'react';
import { FiMoon, FiSun, FiMenu } from 'react-icons/fi';
import { NAV_LINKS, NAVBAR_HEIGHT, SCROLL_OFFSET_PADDING } from '../../lib/constants';

interface NavbarProps {
  onMobileMenuToggle: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  activeSection: string;
}

export default function Navbar({ onMobileMenuToggle, onToggleTheme, isDark, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT - SCROLL_OFFSET_PADDING;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const links = NAV_LINKS.filter((l) => l.id !== 'home');

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
      style={{ height: NAVBAR_HEIGHT }}
    >
      <nav className="wrap flex h-full items-center justify-between" aria-label="Primary">
        <a
          href="#home"
          onClick={(e) => goTo(e, 'home')}
          className="flex items-baseline gap-2 text-[0.95rem] font-medium tracking-tight text-fg"
        >
          Athif Fadheel
          <span className="hidden font-mono text-[0.7rem] font-normal text-muted sm:inline">/ Engineer</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link, i) => {
            const active = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => goTo(e, link.id)}
                  aria-current={active ? 'true' : undefined}
                  className={`flex items-baseline gap-1.5 text-sm transition-colors ${
                    active ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  <span className={`font-mono text-[0.65rem] ${active ? 'text-accent' : 'text-muted'}`}>
                    0{i + 1}
                  </span>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:text-fg"
          >
            {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
          <button
            onClick={onMobileMenuToggle}
            aria-label="Open navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full text-fg md:hidden"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
