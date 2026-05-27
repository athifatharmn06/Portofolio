# Athif Fadheel — Personal Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer_Motion-12-ff0055?style=for-the-badge&logo=framer&logoColor=white"/>
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</p>

<p align="center">
  A high-performance, fully responsive personal portfolio website built with React 19, TypeScript, and Tailwind CSS 4.
  Features a glassmorphism hero with interactive aurora effects, cursor-reactive contour glow on the profile photo,
  animated skill badges, and a project gallery with full-screen modal viewer.
</p>

---

## ✨ Features

### Hero Section
- **Glassmorphism premium design** — deep dark background with aurora gradient orbs
- **Spring-physics cursor tracking** — 3 parallax aurora orbs follow the mouse via Framer Motion springs
- **Interactive contour glow** — CSS `drop-shadow` filter on the profile photo follows body silhouette, intensity changes with mouse position
- **Cursor spotlight** — radial glow that tracks the cursor in real time
- **Typing animation** — cycles through roles (Software Engineer, Electrical Engineer, AI Specialist, Cloud Architect)
- **Animated stats row** — 15+ Projects, 3+ Years, 10+ Tech Stacks

### Navigation
- **Scroll-spy** — active section highlighted in navbar, single rAF-throttled listener
- **Mobile hide-on-scroll** — navbar hides when scrolling down on mobile, reveals on scroll up
- **Smooth scroll** — all nav links scroll to section with navbar offset compensation

### Projects Section
- **Full gallery grid** — all projects displayed with thumbnail, title, and complete tech stack badges
- **Gallery modal** — full-screen image viewer with swipe, keyboard navigation, and thumbnail strip
- **3D tilt effect** — project cards tilt on hover with perspective transform

### Skills Section
- **8 categories** — Software & Backend, Cloud & DevOps, Frontend & Web, Database & Analytics, AI & CV, Robotics & UAV, Creative & Multimedia, Professional Methodologies
- **Category-colored glow badges** — each category has its own accent color (teal, blue, cyan, green, pink, orange, purple, yellow)
- **Staggered entrance animations** — badges animate in with 40ms stagger per badge

### Experience Section
- **PLN internship timeline** — with photo gallery grid (9 photos)
- **Entrance animation** — triggers once via IntersectionObserver (`once: true`)

### Performance
- **No universal CSS transitions** — scoped to themed elements only (body, .surface-card, .surface-elevated)
- **rAF-throttled scroll handlers** — all scroll listeners use `requestAnimationFrame` guard
- **Deduplicated scroll-spy** — single instance in App, passed via props to Navbar
- **Compositor-only animations** — opacity + transform only, no layout-triggering properties
- **Async font loading** — Google Fonts loaded with `media="print"` pattern, non-render-blocking
- **CSS-only profile glow** — radial-gradient replaces duplicate image load

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19 |
| Language | TypeScript | ~5.9 |
| Build Tool | Vite | 7 |
| Styling | Tailwind CSS | 4 (`@theme` directive) |
| Animations | Framer Motion | 12 |
| Icons | react-icons | 5 |
| Testing | Vitest + fast-check | 4 |
| Testing Utils | @testing-library/react | 16 |
| Linting | ESLint 9 (flat config) | 9 |
| Deployment | Vercel | — |
| Analytics | @vercel/analytics + speed-insights | — |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed nav with scroll-spy, mobile hide-on-scroll
│   │   ├── MobileMenu.tsx      # Full-screen mobile overlay menu
│   │   ├── Footer.tsx          # Footer with social links
│   │   └── SectionDivider.tsx  # Gradient divider between sections
│   ├── sections/
│   │   ├── HeroSection.tsx     # Glassmorphism hero with aurora + contour glow
│   │   ├── AboutSection.tsx    # Bio, stats counters, education card
│   │   ├── ExperienceSection.tsx # PLN internship timeline + photo gallery
│   │   ├── SkillsSection.tsx   # 8-category skill grid with glow badges
│   │   ├── ProjectsSection.tsx # Project grid with gallery modal trigger
│   │   └── ContactSection.tsx  # Contact form / social links
│   └── ui/
│       ├── ProjectCard.tsx     # 3D tilt card with full tech stack display
│       ├── SkillBadge.tsx      # Category-colored glow pill badge
│       ├── GalleryModal.tsx    # Full-screen image viewer with keyboard nav
│       ├── TypingAnimation.tsx # Typewriter effect component
│       ├── ScrollIndicator.tsx # Animated scroll-down chevron
│       └── ImageWithFallback.tsx # Image with error fallback
├── data/
│   ├── projects.ts             # All project data (newest first)
│   ├── skills.ts               # Skill categories with icons and accent colors
│   ├── social.ts               # Social link data
│   └── stats.ts                # About section stat items
├── hooks/
│   ├── useTheme.ts             # Dark/light theme with system preference detection
│   ├── useScrollSpy.ts         # rAF-throttled scroll-spy hook
│   ├── useInView.ts            # IntersectionObserver-based entrance trigger
│   ├── useReducedMotion.ts     # prefers-reduced-motion media query hook
│   └── useKeyboardNavigation.ts # Keyboard navigation for gallery modal
├── lib/
│   ├── animations.ts           # Shared Framer Motion variants
│   └── constants.ts            # NAVBAR_HEIGHT, SECTION_IDS, etc.
├── types/
│   └── index.ts                # TypeScript interfaces (ProjectData, SkillData, etc.)
├── App.tsx                     # Root component — orchestrates sections and modals
├── main.tsx                    # Entry point — renders App in StrictMode
└── index.css                   # Tailwind imports, @theme config, keyframes, base layer

public/
├── profile.webp                # Profile photo with transparent background
├── about_me.webp               # About section photo
├── internship_pln/             # PLN internship photos (10 .webp files)
├── projects/                   # Per-project image folders
│   ├── NFCC - Digital Twin/    # 12 screenshots
│   ├── URLSiap/                # 10 screenshots
│   ├── Agentic Workflow - AIGents/
│   └── ...                     # Other project folders
└── *.pdf                       # CV download
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/athifatharmn06/Portofolio.git
cd "Main Code for Portofolio"

# Install dependencies
npm install
```

### Development

```bash
npm run dev
# → http://localhost:5173
```

### Build

```bash
npm run build
# Type-checks with tsc -b, then bundles with Vite
# Output: dist/
```

### Preview Production Build

```bash
npm run preview
# → http://localhost:4173
```

### Lint

```bash
npm run lint
```

### Tests

```bash
# Run all tests once
npm test

# Watch mode
npm run test:watch
```

---

## 🧪 Testing

The project uses **Vitest** with **fast-check** for property-based testing and **@testing-library/react** for component tests.

Tests are located in `src/test/` and cover:

- **Performance properties** — scroll handler throttling, rAF guard behavior
- **Preservation properties** — theme transitions, scroll-spy correctness
- **Component rendering** — key UI components render without errors

```bash
npm test              # Single run
npm run test:watch    # Watch mode for development
```

---

## 🎨 Design System

### Colors (defined in `src/index.css` `@theme` block)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#2dd4bf` | Teal accent, active indicators |
| `--color-surface-light` | `hsl(40, 33%, 98%)` | Light theme background |
| `--color-surface-dark` | `hsl(222, 47%, 8%)` | Dark theme background |
| `--color-surface-dark-card` | `hsl(222, 35%, 15%)` | Dark card surfaces |

### Typography

| Font | Usage | Weight |
|------|-------|--------|
| **Caveat** | Handwriting accent (name in hero) | 600, 700 |
| **Inter** | All body text, UI labels | 300–700 |

### Animations

| Keyframe | Duration | Usage |
|----------|----------|-------|
| `float` | 3–11s | Floating particles, ambient chips |
| `blob` | 10s | Background gradient orbs |
| `glow-pulse` | 2.5s | Profile glow, ambient pools |
| `spin` | 6s | (Available for spinning elements) |
| `blink` | 1s | Typing cursor |

---

## 📦 Key Architectural Decisions

### Performance
- **No `* { transition }` rule** — theme transitions scoped to `body`, `.surface-card`, `.surface-elevated`, `.theme-transition` only
- **Single scroll-spy instance** — `useScrollSpy` called once in `App.tsx`, `activeSection` passed via props to `Navbar` and `MobileMenu`
- **Navbar scroll handler uses refs** — `lastScrollY` and `scrollDelta` stored in `useRef` (not `useState`) to prevent listener re-registration on every scroll event
- **rAF guards on all scroll/mousemove handlers** — prevents frame stacking

### Accessibility
- WCAG AA contrast (≥4.5:1) on all text
- 44px minimum touch targets on mobile
- `prefers-reduced-motion` respected — disables transform animations, uses opacity-only with max 200ms
- `aria-label`, `aria-current`, `role` attributes on interactive elements
- Keyboard navigation in gallery modal (arrow keys, Escape)

### Theme System
- Dark mode via `.dark` class on `<html>`
- CSS custom properties in `@theme` block (Tailwind CSS 4 syntax)
- No runtime CSS-in-JS — all theming via CSS variables
- Hero section always uses dark background regardless of theme toggle

---

## 🌐 Deployment

The site is deployed on **Vercel** with automatic deployments from the `main` branch.

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 18+

Branch protection is enabled on `main` — all changes go through pull requests.

---

## 📸 Projects Featured

| Project | Category | Tech |
|---------|----------|------|
| NFCC Digital Twin | Web & Simulation | React, Three.js, Web Workers, Zustand |
| URLSiap — Web Audit Platform | Web & AI Integration | Next.js, Supabase, Zod, Cheerio |
| Agentic Workflow — AIGents | Agentic AI | LangGraph, FastAPI, SQLite, Python |
| Conference Paper (UAV 4G) | Aerospace & IoT | MAVLink, ArduPilot, 4G LTE |
| Enterprise Price Intelligence Scraper | Data Engineering | Scrapy, Playwright, FastAPI, PostgreSQL |
| Mobile App — Otentikasi | Mobile & AI | React Native, Firebase, GCP, TensorFlow |
| PLC Warehouse Traffic Control | Industrial Automation | CX-Programmer, Factory I/O, OPC |
| Website — Pure Vision | Web & AI Integration | Web Frontend, Image Processing API |
| Excel Dashboards (×2) | Data Analytics | Microsoft Excel, VBA, Pivot Tables |
| Personal Portfolio Website | Web & UI/UX Design | React, TypeScript, Tailwind CSS, Vite |

---

## 👤 Author

**Athif Fadheel Atharahman**
Electrical Engineering Student — Telkom University

- LinkedIn: [athif-fadheel-atharahman](https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/)
- GitHub: [athifatharmn06](https://github.com/athifatharmn06)

---

*Built with React 19 · Deployed on Vercel · © 2026 Athif Fadheel Atharahman*
