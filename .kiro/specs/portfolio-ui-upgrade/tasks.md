# Implementation Plan: Portfolio UI Upgrade

## Overview

This plan transforms the monolithic ~900-line `App.tsx` into a modular, component-based architecture with enhanced UI/UX features. The implementation proceeds bottom-up: types and data layer first, then shared utilities (hooks, animations), then individual components, and finally wiring everything together in the root App. All code uses React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, and react-icons — no new runtime dependencies.

## Tasks

- [ ] 1. Set up project structure, types, and data layer
  - [x] 1.1 Create TypeScript type definitions module
    - Create `src/types/index.ts` with all shared interfaces: `PhotoContext`, `ProjectData`, `SkillData`, `SkillCategory`, `SocialLink`, `StatItem`, `Theme`
    - Export all types for use across the application
    - _Requirements: 1.1, 1.2_

  - [x] 1.2 Create data modules for projects, skills, social links, and stats
    - Create `src/data/projects.ts` — extract `projectsData` array from App.tsx, typed as `ProjectData[]`, add optional `githubUrl` and `demoUrl` fields
    - Create `src/data/skills.ts` — restructure inline skill arrays into typed `SkillCategory[]` with 8 categories, each skill having `name`, `icon`, `level`, and optional `yearsOfExperience`
    - Create `src/data/social.ts` — extract social links (LinkedIn, Instagram, Email) as `SocialLink[]`
    - Create `src/data/stats.ts` — create `StatItem[]` with projects completed, technologies mastered, years of experience
    - _Requirements: 1.2, 4.1, 5.6, 8.2_

  - [x] 1.3 Create animation variants library and constants
    - Create `src/lib/animations.ts` — extract and centralize all Framer Motion variants (`fadeInUp`, `staggerContainer`, `scaleUp`, `slideIn`, `reducedMotionVariants`)
    - Create `src/lib/constants.ts` — define app-wide constants (breakpoints: 768, 1024; animation durations; navbar height; section IDs array)
    - _Requirements: 1.2, 9.2_

- [x] 2. Implement custom hooks
  - [x] 2.1 Implement `useTheme` hook
    - Create `src/hooks/useTheme.ts`
    - Read initial theme from `localStorage` key `color-theme` or system preference via `prefers-color-scheme`
    - Apply/remove `dark` class on `document.documentElement`
    - Persist selection to `localStorage`
    - Return `{ theme, toggleTheme, isDark }`
    - _Requirements: 10.4, 10.1_

  - [x] 2.2 Implement `useScrollSpy` hook
    - Create `src/hooks/useScrollSpy.ts`
    - Use IntersectionObserver with `rootMargin` calculated from navbar height
    - Update active section when section crosses 50% viewport threshold
    - Return `{ activeSection }` as the currently visible section ID
    - _Requirements: 3.2, 3.3_

  - [x] 2.3 Implement `useInView` hook
    - Create `src/hooks/useInView.ts`
    - Wrap IntersectionObserver for triggering entrance animations with configurable `once` (default true) and `threshold` (default 0.15)
    - Fall back to `{ isInView: true }` if IntersectionObserver is unavailable
    - Return `{ ref, isInView }`
    - _Requirements: 9.1, 9.7_

  - [x] 2.4 Implement `useKeyboardNavigation` hook
    - Create `src/hooks/useKeyboardNavigation.ts`
    - Listen for ArrowLeft, ArrowRight, Escape when `isActive` is true
    - Handle circular wrap-around navigation (index N-1 → 0, index 0 → N-1)
    - Clean up event listeners on unmount
    - _Requirements: 7.1, 7.2_

  - [x] 2.5 Implement `useReducedMotion` hook
    - Create `src/hooks/useReducedMotion.ts`
    - Detect `prefers-reduced-motion: reduce` media query
    - Return boolean indicating if reduced motion is preferred
    - _Requirements: 9.5_

- [x] 3. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement UI components
  - [x] 4.1 Implement `ImageWithFallback` component
    - Create `src/components/ui/ImageWithFallback.tsx`
    - On `onError`, replace image with styled placeholder preserving container dimensions
    - Display `alt` text in readable form within placeholder
    - Support `className` and `placeholderClassName` props
    - _Requirements: 2.8, 11.6_

  - [x] 4.2 Implement `TypingAnimation` component
    - Create `src/components/ui/TypingAnimation.tsx`
    - Cycle through professional roles with configurable typing speed and pause duration (2000–4000ms)
    - Simulate character-by-character typing and deletion
    - Repeat cycle continuously
    - _Requirements: 2.1_

  - [x] 4.3 Implement `ScrollIndicator` component
    - Create `src/components/ui/ScrollIndicator.tsx`
    - Render animated downward-pointing chevron with repeating bounce animation (1–2 second cycle)
    - Use Framer Motion for the bounce effect
    - _Requirements: 2.6_

  - [x] 4.4 Implement `CounterAnimation` component
    - Create `src/components/ui/CounterAnimation.tsx`
    - Animate from 0 to target value over 2 seconds when `isInView` is true
    - Support optional suffix (e.g., "+")
    - Only animate once (retain final value on subsequent views)
    - _Requirements: 4.1, 4.6_

  - [ ]* 4.5 Write property test for CounterAnimation
    - **Property 3: Counter animation target accuracy**
    - Generate random target values (1–999), verify displayed value equals target after animation completes
    - **Validates: Requirements 4.1**

  - [x] 4.6 Implement `SkillBadge` component
    - Create `src/components/ui/SkillBadge.tsx`
    - Render pill-shaped badge with icon and skill name
    - Show tooltip on hover (viewport ≥ 1024px) with years of experience or proficiency level
    - Apply full opacity + highlighted border for expert skills, reduced opacity (0.6–0.8) + default border for others
    - Accept stagger `index` for entrance animation delay (30–80ms per badge)
    - _Requirements: 5.3, 5.4, 5.5_

  - [ ]* 4.7 Write property tests for SkillBadge visual hierarchy
    - **Property 6: Skill visual hierarchy correctness**
    - Generate random skill data with varying levels/years, verify opacity and border rendering rules
    - **Validates: Requirements 5.4**

  - [x] 4.8 Implement `ProjectCard` component
    - Create `src/components/ui/ProjectCard.tsx`
    - Display thumbnail with gradient overlay revealing category and tagline (≤80 chars) on hover
    - Implement 3D tilt effect (≤10 degrees) on hover with perspective transform
    - Conditionally render GitHub/demo link only if URL exists
    - Include "Explore Gallery" button triggering `onExploreGallery` callback
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 4.9 Write property tests for ProjectCard
    - **Property 7: Project card hover overlay correctness** — verify tagline truncation to ≤80 chars
    - **Property 8: Project card link conditional rendering** — verify link presence/absence based on URL data
    - **Validates: Requirements 6.1, 6.3**

  - [x] 4.10 Implement `GalleryModal` component
    - Create `src/components/ui/GalleryModal.tsx`
    - Full-screen overlay with scale-up + fade-in animation (200–400ms)
    - Display main image with crossfade/slide transitions between photos
    - Horizontal thumbnail strip below main image (hidden on mobile <768px)
    - Position indicator showing "current / total"
    - Close button in top-right corner, close on backdrop click
    - Prevent body scroll while open, restore on close
    - Preload adjacent images (previous and next)
    - Use `useKeyboardNavigation` hook for arrow/escape key support
    - Mobile: support horizontal swipe gestures (≥50px drag) and visible arrow buttons
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9_

  - [ ]* 4.11 Write property tests for GalleryModal
    - **Property 10: Gallery keyboard navigation with circular wrap** — generate random gallery sizes and navigation sequences, verify wrap-around
    - **Property 11: Gallery position indicator accuracy** — generate random sizes/positions, verify indicator string format
    - **Validates: Requirements 7.1, 7.2, 7.9**

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement section components
  - [x] 6.1 Implement `HeroSection` component
    - Create `src/components/sections/HeroSection.tsx`
    - Include `TypingAnimation` cycling through roles
    - Animated floating cursor blob (moves within 50px radius of cursor, updates within 100ms)
    - CTA button group: "View My Work" (smooth-scroll to projects), "Download CV" (PDF download link)
    - Profile image with animated border glow (2–3s pulse cycle) using `ImageWithFallback`
    - `ScrollIndicator` at bottom
    - Responsive: stack vertically on mobile (<768px) with text above image
    - Use `useReducedMotion` to conditionally disable transform animations
    - Render all visible content within 1 second of page becoming interactive
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [x] 6.2 Implement `AboutSection` component
    - Create `src/components/sections/AboutSection.tsx`
    - Animated numeric counters (3+ stats) using `CounterAnimation` triggered by `useInView`
    - Education card with hover-expand revealing GPA and coursework (300ms animation)
    - Staggered fade-in-up transitions (150ms delay between elements, 600ms per element)
    - Two-column layout on desktop (≥1024px): 60% text left, 40% image right
    - Single-column on mobile: heading → text → languages → image → education card
    - Retain final counter values without re-animating on subsequent scroll entries
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 6.3 Implement `ExperienceSection` component
    - Create `src/components/sections/ExperienceSection.tsx`
    - Extract the existing experience/timeline content from App.tsx
    - Apply staggered entrance animations using `useInView`
    - Maintain responsive layout (date/logo left, details right on desktop; stacked on mobile)
    - _Requirements: 1.1, 1.3, 9.1_

  - [x] 6.4 Implement `SkillsSection` component
    - Create `src/components/sections/SkillsSection.tsx`
    - Category filter tabs ("All" + 8 categories) with active tab indicator
    - Filter animation using Framer Motion layout transitions (200–400ms)
    - Render `SkillBadge` components with staggered entrance (30–80ms per badge, max 600ms each)
    - Maintain 8-category organization from data layer
    - Trigger entrance animation only once per page load via `useInView`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 6.5 Write property tests for SkillsSection filtering
    - **Property 4: Skills category filter correctness** — generate random category selections, verify all visible badges belong to selected category
    - **Validates: Requirements 5.1**

  - [x] 6.6 Implement `ProjectsSection` component
    - Create `src/components/sections/ProjectsSection.tsx`
    - Category filter pills ("All", "AI", "Web", "Data", "IoT") above project grid
    - Layout transition animation for grid rearrangement (300–500ms)
    - Render `ProjectCard` components in responsive grid (1 col mobile, 2 tablet, 3 desktop)
    - Display empty-state message when no projects match filter
    - Pass `onOpenGallery` callback to trigger `GalleryModal`
    - _Requirements: 6.4, 6.5, 6.6, 6.7, 12.2_

  - [ ]* 6.7 Write property tests for ProjectsSection filtering
    - **Property 9: Projects category filter correctness** — generate random category selections, verify visible cards match filter; verify empty-state when no matches
    - **Validates: Requirements 6.5, 6.7**

  - [x] 6.8 Implement `ContactSection` component
    - Create `src/components/sections/ContactSection.tsx`
    - Gradient background distinct from adjacent sections
    - Social links as animated icon buttons with hover scale (1.1–1.3x) and color transition (200–300ms)
    - Visible text labels for each platform
    - Card-based layout with glassmorphic styling (backdrop-blur, semi-transparent background)
    - All links open in new tab with `rel="noopener noreferrer"`
    - Motivational tagline encouraging collaboration
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]* 6.9 Write property tests for ContactSection social links
    - **Property 12: Social link rendering completeness** — generate random social link data, verify icon, label, href, target, and rel attributes
    - **Validates: Requirements 8.2, 8.6**

- [x] 7. Implement layout components and navigation
  - [x] 7.1 Implement `Navbar` component
    - Create `src/components/layout/Navbar.tsx`
    - Fixed positioning at top of viewport with backdrop-blur (≥8px) and semi-transparent background
    - Use `useScrollSpy` to mark active section link with visually distinct indicator
    - Animate active indicator transition (200–400ms)
    - Smooth-scroll on link click with offset = navbar height + 8–16px padding
    - Hide inline links on mobile (<768px), show hamburger button
    - Hide on scroll-down, reveal on scroll-up (after 50px opposite scroll) on mobile
    - Include theme toggle button using `useTheme`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.9, 3.10_

  - [x] 7.2 Implement `MobileMenu` component
    - Create `src/components/layout/MobileMenu.tsx`
    - Slide-in/fade-in animation (≤300ms) covering ≥80% viewport height
    - Display all section links and theme toggle
    - Close on link tap or tap outside (reverse animation ≤300ms)
    - Lock body scroll while open, restore on close/unmount
    - _Requirements: 3.5, 3.6, 3.7, 3.8_

  - [x] 7.3 Implement `SectionDivider` component
    - Create `src/components/layout/SectionDivider.tsx`
    - Render gradient fade or decorative divider between sections (≤64px vertical space)
    - _Requirements: 9.3_

  - [x] 7.4 Implement `Footer` component
    - Create `src/components/layout/Footer.tsx`
    - Copyright text and analytics integration (Vercel Analytics, SpeedInsights)
    - _Requirements: 1.1_

- [x] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Wire components together and implement cross-cutting concerns
  - [x] 9.1 Refactor `App.tsx` as root orchestrator
    - Replace monolithic content with component imports
    - Minimal orchestration: manage gallery modal state, pass `onOpenGallery` to `ProjectsSection`
    - Render: `Navbar` → `HeroSection` → `SectionDivider` → `AboutSection` → `SectionDivider` → `ExperienceSection` → `SectionDivider` → `SkillsSection` → `SectionDivider` → `ProjectsSection` → `SectionDivider` → `ContactSection` → `Footer`
    - Conditionally render `GalleryModal` when a project is selected
    - Ensure no single file exceeds 200 lines (excluding imports)
    - _Requirements: 1.1, 1.3, 1.4, 1.5_

  - [x] 9.2 Implement theme system enhancements
    - Update `index.css` with Tailwind CSS 4 theme configuration for both light and dark modes
    - Define distinct gradient backgrounds, card borders, shadows for each mode
    - Light theme: warm-toned backgrounds (not pure white, hue 20°–60°), optional grain texture (opacity ≤0.05)
    - Dark theme: not pure black (lightness 5%–15%), visual depth between surface layers
    - CSS transitions on `background-color`, `color`, `border-color`, `box-shadow` (300ms ease-in-out)
    - Ensure minimum 4.5:1 contrast ratio for all text (WCAG AA)
    - Verify synchronous inline script in `index.html` `<head>` prevents theme flash
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [ ]* 9.3 Write property test for theme persistence
    - **Property 13: Theme persistence round-trip** — generate random theme toggle sequences, verify localStorage matches applied class
    - **Validates: Requirements 10.4**

  - [x] 9.4 Implement accessibility and performance optimizations
    - Add `loading="lazy"` to all below-fold images
    - Ensure all content images have descriptive `alt` text (≥5 chars); decorative images use `alt=""`
    - Ensure all interactive elements are keyboard-focusable with visible focus indicators (≥3:1 contrast)
    - Use semantic HTML elements (`nav`, `main`, `section`, `article`, `footer`)
    - Ensure touch targets ≥44×44px on mobile (<768px)
    - Apply responsive typography using `clamp()` (body: 14–18px, headings: 24–48px)
    - Ensure no horizontal overflow at any viewport width (320–2560px)
    - Scale images to fit parent container without distortion
    - Use only GPU-accelerated properties (transform, opacity) for scroll animations
    - _Requirements: 11.1, 11.3, 11.4, 11.5, 11.7, 12.3, 12.4, 12.5, 12.6, 9.6_

  - [x] 9.5 Implement smooth scroll and reduced motion support
    - Ensure all internal anchor links smooth-scroll with offset = navbar height + padding
    - When `prefers-reduced-motion: reduce` is active, disable transform animations, retain only opacity transitions (≤200ms)
    - Ensure entrance animations trigger only once (IntersectionObserver with `once: true`, threshold 10–25%)
    - _Requirements: 9.1, 9.4, 9.5_

- [x] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Property-based and integration tests
  - [ ]* 11.1 Write property tests for filter correctness
    - **Property 4: Skills category filter correctness** (if not covered in 6.5)
    - **Property 9: Projects category filter correctness** (if not covered in 6.7)
    - **Validates: Requirements 5.1, 6.5, 6.7**

  - [ ]* 11.2 Write property tests for accessibility compliance
    - **Property 15: Below-fold image lazy loading** — verify all below-fold images have `loading="lazy"` or observer-based loading
    - **Property 16: Content image alt text completeness** — verify non-decorative images have alt ≥5 chars
    - **Property 17: Interactive element keyboard accessibility** — verify tab-reachable elements have visible focus indicators
    - **Validates: Requirements 11.1, 11.3, 11.4**

  - [ ]* 11.3 Write property tests for responsive layout
    - **Property 18: Responsive typography bounds** — generate random viewport widths (320–2560), verify font-size bounds
    - **Property 19: No horizontal overflow invariant** — generate random viewport widths, verify no horizontal scrollbar
    - **Property 20: Mobile touch target minimum size** — verify interactive elements ≥44×44px at mobile viewport
    - **Property 21: Image containment within parent** — verify images don't exceed parent width and preserve aspect ratio
    - **Validates: Requirements 12.3, 12.4, 12.5, 12.6**

  - [ ]* 11.4 Write property test for theme contrast compliance
    - **Property 14: Text contrast WCAG AA compliance** — verify ≥4.5:1 for normal text, ≥3:1 for large text in both themes
    - **Validates: Requirements 10.2, 11.7**

  - [ ]* 11.5 Write property tests for navigation
    - **Property 1: Scroll-spy active state correctness** — verify exactly one active link matching visible section
    - **Property 2: Anchor link navigation correctness** — verify scroll offset positions section heading below navbar
    - **Validates: Requirements 3.2, 3.4, 9.4**

  - [ ]* 11.6 Write property test for social link rendering
    - **Property 12: Social link rendering completeness** (if not covered in 6.9)
    - **Validates: Requirements 8.2, 8.6**

  - [ ]* 11.7 Write property test for gallery indicator
    - **Property 5: Skill badge tooltip data correctness** — verify tooltip shows years or proficiency level
    - **Property 11: Gallery position indicator accuracy** (if not covered in 4.11)
    - **Validates: Requirements 5.3, 7.9**

- [x] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The design uses TypeScript throughout — all implementation uses `.ts` and `.tsx` files
- No new runtime dependencies are introduced; all features use React 19, Framer Motion, react-icons, and Tailwind CSS 4
- The existing `index.html` inline theme script is preserved to prevent flash of incorrect theme
- fast-check is used as the PBT library (TypeScript-native)
- Vitest + React Testing Library for unit tests

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5"] },
    { "id": 3, "tasks": ["4.1", "4.2", "4.3", "4.4", "4.6"] },
    { "id": 4, "tasks": ["4.5", "4.7", "4.8", "4.10"] },
    { "id": 5, "tasks": ["4.9", "4.11"] },
    { "id": 6, "tasks": ["6.1", "6.2", "6.3", "6.4", "6.8"] },
    { "id": 7, "tasks": ["6.5", "6.6", "6.9"] },
    { "id": 8, "tasks": ["6.7", "7.1", "7.2", "7.3", "7.4"] },
    { "id": 9, "tasks": ["9.1"] },
    { "id": 10, "tasks": ["9.2", "9.4", "9.5"] },
    { "id": 11, "tasks": ["9.3", "11.1", "11.2", "11.3", "11.4", "11.5", "11.6", "11.7"] }
  ]
}
```
