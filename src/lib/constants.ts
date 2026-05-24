/**
 * App-wide constants for the portfolio application.
 */

// --- Breakpoints (in pixels) ---
export const BREAKPOINTS = {
  /** Mobile/tablet boundary */
  TABLET: 768,
  /** Tablet/desktop boundary */
  DESKTOP: 1024,
} as const;

// --- Animation Durations (in milliseconds) ---
export const ANIMATION_DURATIONS = {
  /** Standard entrance animation */
  ENTRANCE: 600,
  /** Fast interaction feedback */
  INTERACTION: 300,
  /** Stagger delay between children */
  STAGGER_DELAY: 150,
  /** Skill badge stagger delay (per badge) */
  SKILL_BADGE_STAGGER: 50,
  /** Theme transition duration */
  THEME_TRANSITION: 300,
  /** Gallery image transition */
  GALLERY_TRANSITION: 300,
  /** Counter animation duration */
  COUNTER: 2000,
  /** Reduced motion max duration */
  REDUCED_MOTION_MAX: 200,
  /** Mobile menu animation */
  MOBILE_MENU: 300,
  /** Typing animation pause between roles */
  TYPING_PAUSE: 3000,
} as const;

// --- Layout ---
/** Navbar height in pixels (used for scroll offset calculations) */
export const NAVBAR_HEIGHT = 72;

/** Additional padding below navbar for scroll-to offset */
export const SCROLL_OFFSET_PADDING = 12;

// --- Section IDs ---
export const SECTION_IDS = [
  'home',
  'about',
  'experience',
  'skills',
  'projects',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

// --- Navigation Labels ---
export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About me' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'My Work' },
  { id: 'contact', label: 'Contact me' },
];
