# Athif Fadheel - Personal Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer_Motion-12-ff0055?style=for-the-badge&logo=framer&logoColor=white"/>
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</p>

<p align="center">
  A fully responsive personal portfolio built with React 19, TypeScript, and Tailwind CSS 4.
  Interactive hero, a final project case study, competition awards, certificates, skills,
  and a project gallery with a full-screen viewer.
</p>

---

## ✨ Features

### Hero
- Dark aurora background with spring-physics cursor parallax and a reactive dot-matrix field. Dots light up and link around the cursor, clicks release a shockwave, and a ghost cursor keeps the field moving on touch devices
- Per-letter animated name, magnetic buttons, 3D tilt on the portrait and orbiting technology chips
- Typing animation for roles and animated counters
- Buttons for the CV download and LinkedIn
- Scrolling technology marquee below the hero

### Navigation and global motion
- Scroll-spy navbar (single rAF-throttled listener), mobile full-screen menu and smooth scrolling with offset compensation
- Scroll progress bar and a soft cursor glow across the page

### About
- First-person bio, languages (ECCT and EPrT with CEFR B2 equivalence, each linked to its verification page) and the education card (Cum Laude, GPA, final project)

### Education
- Final project case study: summary, key numbers, funding and outcomes (conference paper, copyright, journal, patent), an interactive 8-step pipeline, result charts with tabs, a swipeable carousel (prototype, runtime HUD with blurred faces, 3D design, schematic, thesis defense) and a hardware photo grid
- Source: https://github.com/athifatharmn06/ta-deteksi-kelelahan

### Experience and Leadership
- PLN internship timeline drawn on scroll, with a photo strip
- Leadership shown as a framed Instagram post that links to the original APTRG announcement

### Awards
- Competition cards (TEKNOFEST 2026, KRTI 2025, KRTI 2024) with role, team, job description and outcome, plus a looping takeoff clip on hover and a photo gallery

### Certificates
- 14 certificates as redacted images (never the PDFs), ordered for recruiters: English tests first, then professional certifications, conference presentations, competition and intellectual property
- Category filter, lightbox, and Verify links where the issuer offers a public page

### Skills
- 10 categories including Networking & Security and Enterprise Systems (SAP), with a filter and colored badges

### Projects
- Equal-height cards with tech stack clamped to two rows ("+N more"), full overview on hover and in the gallery, GitHub and paper links
- Gallery modal with swipe, keyboard navigation, thumbnails and video support

### Performance and accessibility
- Compositor-friendly animations, lazy images, async fonts
- `prefers-reduced-motion` disables the animated backgrounds, marquee, tilt and counters
- Keyboard-operable carousels, tabs and lightbox

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
| Deployment | Vercel | - |
| Analytics | @vercel/analytics + speed-insights | - |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/        Navbar, MobileMenu, Footer, SectionDivider
│   ├── sections/      Hero, About, Education, Experience, Leadership, Achievements,
│   │                  Certificates, Skills, Projects, Contact
│   └── ui/            ProjectCard, TechTags, GalleryModal, SlideCarousel, HeroField,
│                      OrbitRings, TechMarquee, Magnetic, ScrollProgress, CursorGlow,
│                      ScrollWords, CounterAnimation, TypingAnimation, ImageWithFallback
├── data/              projects, skills, achievements, certificates, finalProject, social, stats
├── hooks/             useTheme, useScrollSpy, useInView, useReducedMotion, useKeyboardNavigation
├── lib/               animations, constants
├── types/             shared TypeScript interfaces
├── App.tsx            Root component, wires sections and the shared gallery modal
├── main.tsx           Entry point
└── index.css          Tailwind imports, theme, keyframes

public/
├── CV_Athif_Fadheel_Atharahman.pdf   Latest CV
├── achievements/      Competition photos and looping takeoff clips
├── certificates/      Redacted certificate images
├── final-project/     Prototype, design, results and HUD images
├── leadership/        Leadership post image
└── projects/          Per-project image folders
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

- **Performance properties** - scroll handler throttling, rAF guard behavior
- **Preservation properties** - theme transitions, scroll-spy correctness
- **Component rendering** - key UI components render without errors

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
- **No `* { transition }` rule** - theme transitions scoped to `body`, `.surface-card`, `.surface-elevated`, `.theme-transition` only
- **Single scroll-spy instance** - `useScrollSpy` called once in `App.tsx`, `activeSection` passed via props to `Navbar` and `MobileMenu`
- **Navbar scroll handler uses refs** - `lastScrollY` and `scrollDelta` stored in `useRef` (not `useState`) to prevent listener re-registration on every scroll event
- **rAF guards on all scroll/mousemove handlers** - prevents frame stacking

### Accessibility
- WCAG AA contrast (≥4.5:1) on all text
- 44px minimum touch targets on mobile
- `prefers-reduced-motion` respected - disables transform animations, uses opacity-only with max 200ms
- `aria-label`, `aria-current`, `role` attributes on interactive elements
- Keyboard navigation in gallery modal (arrow keys, Escape)

### Theme System
- Dark mode via `.dark` class on `<html>`
- CSS custom properties in `@theme` block (Tailwind CSS 4 syntax)
- No runtime CSS-in-JS - all theming via CSS variables
- Hero section always uses dark background regardless of theme toggle

---

## 🌐 Deployment

The site is deployed on **Vercel** with automatic deployments from the `main` branch.

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 18+

Branch protection is enabled on `main` - all changes go through pull requests.

---

## 📸 Projects Featured

| Project | Category | Tech |
|---------|----------|------|
| NFCC Digital Twin | Web & Simulation | React, Three.js, Web Workers, Zustand |
| URLSiap - Web Audit Platform | Web & AI Integration | Next.js, Supabase, Zod, Cheerio |
| Agentic Workflow - AIGents | Agentic AI | LangGraph, FastAPI, SQLite, Python |
| Conference Paper (UAV 4G) | Aerospace & IoT | MAVLink, ArduPilot, 4G LTE |
| Enterprise Price Intelligence Scraper | Data Engineering | Scrapy, Playwright, FastAPI, PostgreSQL |
| Mobile App - Otentikasi | Mobile & AI | React Native, Firebase, GCP, TensorFlow |
| PLC Warehouse Traffic Control | Industrial Automation | CX-Programmer, Factory I/O, OPC |
| Website - Pure Vision | Web & AI Integration | Web Frontend, Image Processing API |
| Excel Dashboards (×2) | Data Analytics | Microsoft Excel, VBA, Pivot Tables |
| Personal Portfolio Website | Web & UI/UX Design | React, TypeScript, Tailwind CSS, Vite |

---

## 👤 Author

**Athif Fadheel Atharahman**
Electrical Engineering Student - Telkom University

- LinkedIn: [athif-fadheel-atharahman](https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/)
- GitHub: [athifatharmn06](https://github.com/athifatharmn06)

---

*Built with React 19 · Deployed on Vercel · © 2026 Athif Fadheel Atharahman*
