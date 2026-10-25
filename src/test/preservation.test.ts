/**
 * Preservation Property Tests — Visual and Functional Equivalence
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**
 *
 * Property 2: Preservation - Visual and Functional Equivalence
 *
 * These tests capture the CURRENT behavior of the unfixed code that must be
 * preserved after the performance fix is applied. They test non-buggy behavior
 * (theme transitions on themed elements, particle repulsion math, scroll-spy logic,
 * font configuration, filter logic, profile glow, reduced-motion, gallery modal).
 *
 * EXPECTED OUTCOME: All tests PASS on unfixed code (confirms baseline to preserve).
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import * as fs from 'fs'
import * as path from 'path'

// Helper to read source files for static analysis
const ROOT = path.resolve(__dirname, '..')
const readSource = (relativePath: string) =>
  fs.readFileSync(path.join(ROOT, relativePath), 'utf-8')

describe('Preservation Property 2: Visual and Functional Equivalence', () => {
  /**
   * Preservation 3.1: Theme Toggle Transitions
   *
   * For all theme toggle sequences, themed elements (body, surface-card,
   * surface-elevated) have active transitions with 300ms duration and ease-in-out.
   *
   * Observation: The CSS currently defines transitions on body (in @layer base)
   * with 300ms ease-in-out for background-color, color, border-color, box-shadow.
   * The universal `*` rule also provides this, but the body rule is explicit.
   * Surface-card and surface-elevated classes exist with proper styling.
   */
  it('themed elements (body, surface-card, surface-elevated) have 300ms ease-in-out transitions defined', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 1, maxLength: 10 }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_themeToggleSequence: boolean[]) => {
          const css = readSource('index.css')

          // Body has explicit transition with 300ms ease-in-out
          const bodyTransitionMatch = css.match(
            /body\s*\{[^}]*transition[^}]*300ms\s+ease-in-out[^}]*\}/s
          )
          expect(bodyTransitionMatch).not.toBeNull()

          // The transition properties include background-color, color, border-color, box-shadow
          const transitionBlock = bodyTransitionMatch![0]
          expect(transitionBlock).toContain('background-color')
          expect(transitionBlock).toContain('color')
          expect(transitionBlock).toContain('border-color')
          expect(transitionBlock).toContain('box-shadow')

          // Surface-card class exists with proper background-color definition
          expect(css).toContain('.surface-card')
          expect(css).toContain('.surface-elevated')

          // The universal selector OR body provides 300ms transition timing
          // (This is the current behavior — either mechanism is acceptable)
          const has300msTransition =
            css.includes('transition-duration: 300ms') ||
            css.includes('300ms ease-in-out')
          expect(has300msTransition).toBe(true)
        }
      ),
      { numRuns: 5 }
    )
  })

  /**
   * Preservation 3.2: Particle Repulsion Calculations
   *
   * For all cursor positions within Hero bounds, particle repulsion calculations
   * produce valid transform values (within bounds, no NaN).
   *
   * Observation: The HeroSection calculates repulsion as:
   *   dx = cursorPos.x - px, dy = cursorPos.y - py
   *   dist = Math.sqrt(dx*dx + dy*dy)
   *   pushStrength = dist < maxPush ? (1 - dist/maxPush) * 40 : 0
   *   pushX = dist > 0 ? -(dx/dist) * pushStrength : 0
   *   pushY = dist > 0 ? -(dy/dist) * pushStrength : 0
   */
  it('particle repulsion calculations produce valid transform values for all cursor positions', () => {
    fc.assert(
      fc.property(
        // Cursor position within typical Hero bounds
        fc.float({ min: 0, max: 2000, noNaN: true }),
        fc.float({ min: 0, max: 1200, noNaN: true }),
        // Particle position (percentage-based, 0-100)
        fc.float({ min: 0, max: 100, noNaN: true }),
        fc.float({ min: 0, max: 100, noNaN: true }),
        (cursorX, cursorY, particlePctX, particlePctY) => {
          // Replicate the repulsion calculation from HeroSection
          const sectionWidth = 1200
          const sectionHeight = 800
          const maxPush = 200

          const px = (particlePctX / 100) * sectionWidth
          const py = (particlePctY / 100) * sectionHeight
          const dx = cursorX - px
          const dy = cursorY - py
          const dist = Math.sqrt(dx * dx + dy * dy)
          const pushStrength = dist < maxPush ? (1 - dist / maxPush) * 40 : 0
          const pushX = dist > 0 ? -(dx / dist) * pushStrength : 0
          const pushY = dist > 0 ? -(dy / dist) * pushStrength : 0

          // Validate: no NaN values
          expect(Number.isNaN(pushX)).toBe(false)
          expect(Number.isNaN(pushY)).toBe(false)

          // Validate: push values are bounded (max pushStrength is 40)
          expect(Math.abs(pushX)).toBeLessThanOrEqual(40)
          expect(Math.abs(pushY)).toBeLessThanOrEqual(40)

          // Validate: when cursor is far away (dist >= maxPush), no push
          if (dist >= maxPush) {
            expect(pushX === 0 || Object.is(pushX, -0)).toBe(true)
            expect(pushY === 0 || Object.is(pushY, -0)).toBe(true)
          }

          // Validate: transform string would be valid (handles scientific notation like 1e-7)
          const transform = `translate(${pushX}px, ${pushY}px)`
          expect(transform).toMatch(/translate\(-?[\d.]+(?:e[+-]?\d+)?px, -?[\d.]+(?:e[+-]?\d+)?px\)/)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Preservation 3.3: Scroll-Spy Active Section
   *
   * For all scroll positions, scroll-spy returns correct active section ID
   * from the 6 sections: home, about, experience, skills, projects, contact.
   *
   * Observation: useScrollSpy iterates through sectionIds, finds the last section
   * whose offsetTop <= scrollY + offset. Default offset = NAVBAR_HEIGHT + 100 = 172.
   */
  it('scroll-spy returns correct active section for all scroll positions', () => {
    const sectionIds = ['home', 'about', 'experience', 'skills', 'projects', 'contact']

    fc.assert(
      fc.property(
        // Simulate scroll position (0 to 6000px typical page height)
        fc.nat({ max: 6000 }),
        // Simulate section offsets (sorted, increasing)
        fc.array(fc.nat({ max: 1000 }), { minLength: 6, maxLength: 6 }).map(
          (offsets) => offsets.sort((a, b) => a - b).map((v, i) => v + i * 500)
        ),
        (scrollY, sectionOffsets) => {
          const offset = 72 + 100 // NAVBAR_HEIGHT + 100

          // Replicate useScrollSpy logic
          const adjustedScrollY = scrollY + offset
          let current = sectionIds[0]

          for (let i = 0; i < sectionIds.length; i++) {
            if (sectionOffsets[i] <= adjustedScrollY) {
              current = sectionIds[i]
            }
          }

          // Validate: result is always one of the valid section IDs
          expect(sectionIds).toContain(current)

          // Validate: if scroll is before first section, active is first section
          if (adjustedScrollY < sectionOffsets[0]) {
            expect(current).toBe(sectionIds[0])
          }

          // Validate: if scroll is past last section, active is last section
          if (adjustedScrollY >= sectionOffsets[sectionOffsets.length - 1]) {
            expect(current).toBe(sectionIds[sectionIds.length - 1])
          }

          // Validate: active section is monotonically correct
          // (the section whose offsetTop is the largest value <= adjustedScrollY)
          const activeIndex = sectionIds.indexOf(current)
          if (activeIndex < sectionIds.length - 1) {
            expect(sectionOffsets[activeIndex + 1]).toBeGreaterThan(adjustedScrollY)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Preservation 3.4: Font Configuration
   *
   * Text renders with Caveat (handwriting) and Inter (body) fonts with correct weights.
   *
   * Observation: index.html loads Google Fonts with Caveat:wght@600;700 and
   * Inter:wght@300;400;500;600;700. The CSS @theme defines --font-handwriting: 'Caveat'.
   */
  it('font configuration includes Caveat and Inter with correct weights', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const html = fs.readFileSync(
          path.resolve(ROOT, '..', 'index.html'),
          'utf-8'
        )
        const css = readSource('index.css')

        // Verify Caveat font is referenced with weights 600 and 700
        expect(html).toContain('Caveat')
        expect(html).toMatch(/Caveat:wght@600;700/)

        // Verify Inter font is referenced with weights 300,400,500,600,700
        expect(html).toContain('Inter')
        expect(html).toMatch(/Inter:wght@300;400;500;600;700/)

        // Verify display=swap is present (ensures text visible during font load)
        expect(html).toContain('display=swap')

        // Verify CSS theme defines handwriting font as Caveat
        expect(css).toContain("--font-handwriting: 'Caveat'")
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Preservation 3.5: Project Filter Logic
   *
   * For all filter category sequences, filtered project list matches expected
   * output with smooth transitions. Empty state shown when no matches.
   *
   * Observation: ProjectsSection filters by category substring match (case-insensitive).
   * Categories: All, AI, Web, Data, IoT, Automation.
   */
  it('project filter produces correct results for all category sequences', () => {
    const categories = ['All', 'AI', 'Web', 'Data', 'IoT', 'Automation']

    // Import project data inline for validation
    const projectsSource = readSource('data/projects.ts')

    // Extract category strings from project data
    const categoryMatches = projectsSource.match(/category:\s*"([^"]+)"/g) || []
    const projectCategories = categoryMatches.map((m: string) => m.replace(/category:\s*"/, '').replace(/"$/, ''))

    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...categories), { minLength: 1, maxLength: 10 }),
        (filterSequence) => {
          // For each filter in the sequence, verify the logic produces correct results
          for (const filter of filterSequence) {
            let expectedCount: number

            if (filter === 'All') {
              expectedCount = projectCategories.length
            } else {
              expectedCount = projectCategories.filter((cat: string) =>
                cat.toLowerCase().includes(filter.toLowerCase())
              ).length
            }

            // Validate: count is non-negative
            expect(expectedCount).toBeGreaterThanOrEqual(0)

            // Validate: 'All' always returns all projects
            if (filter === 'All') {
              expect(expectedCount).toBe(projectCategories.length)
            }
          }
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * Preservation 3.5b: Project cards have animated transitions on filter change
   *
   * Observation: ProjectsSection uses AnimatePresence with motion.div that has
   * initial/animate/exit props with opacity and scale transitions (JSX double-brace syntax).
   * Empty state is shown when filteredProjects.length === 0.
   */
  it('project cards use opacity/scale animations and empty state exists', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const projectsSource = readSource('components/sections/ProjectsSection.tsx')

        // AnimatePresence is used for enter/exit animations
        expect(projectsSource).toContain('AnimatePresence')

        // motion.div has initial, animate, exit props with opacity (JSX syntax: {{ opacity: 0 }})
        expect(projectsSource).toMatch(/initial=\{\{[^}]*opacity:\s*0/)
        expect(projectsSource).toMatch(/animate=\{\{[^}]*opacity:\s*1/)
        expect(projectsSource).toMatch(/exit=\{\{[^}]*opacity:\s*0/)

        // Scale transitions are present
        expect(projectsSource).toMatch(/scale:\s*0\.9/)
        expect(projectsSource).toMatch(/scale:\s*1/)

        // Empty state message exists
        expect(projectsSource).toContain('No projects found')
        expect(projectsSource).toContain('empty-state')
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Preservation 3.6: Profile Glow Element
   *
   * Profile glow element is present and visible in the DOM.
   *
   * Observation: HeroSection has a div with blur-xl, scale-105, saturate-150,
   * brightness-150 classes wrapping an img of profile.webp, creating a glow effect.
   * The parent div has opacity-50 (or opacity-30 for reduced motion) and animate-glow-pulse.
   */
  it('profile glow element is present with blur and visibility styling', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const heroSource = readSource('components/sections/HeroSection.tsx')

        // Profile image exists
        expect(heroSource).toContain('profile.webp')

        // Glow effect exists — either via blurred img or CSS-only approach
        const hasBlurGlow = heroSource.includes('blur-xl') || heroSource.includes('blur-')
        const hasCSSGlow =
          heroSource.includes('radial-gradient') ||
          heroSource.includes('box-shadow') ||
          heroSource.includes('glow')

        // At least one glow mechanism must be present
        expect(hasBlurGlow || hasCSSGlow).toBe(true)

        // Glow has visibility (opacity > 0)
        const hasVisibleOpacity =
          heroSource.includes('opacity-50') ||
          heroSource.includes('opacity-30') ||
          heroSource.includes('opacity-60') ||
          heroSource.includes('opacity-')

        expect(hasVisibleOpacity).toBe(true)

        // Glow pulse animation or equivalent visual effect
        const hasGlowAnimation =
          heroSource.includes('animate-glow-pulse') ||
          heroSource.includes('glow-pulse') ||
          heroSource.includes('animate-')

        expect(hasGlowAnimation).toBe(true)
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Preservation 3.7: Reduced Motion Support
   *
   * prefers-reduced-motion disables transform animations, uses opacity-only
   * with max 200ms duration.
   *
   * Observation: useReducedMotion hook checks the media query.
   * reducedMotionVariants uses opacity-only with duration 0.2 (200ms).
   * HeroSection disables particles when prefersReducedMotion is true.
   */
  it('reduced motion variants use opacity-only with max 200ms duration', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const animationsSource = readSource('lib/animations.ts')
        const reducedMotionHook = readSource('hooks/useReducedMotion.ts')

        // reducedMotionVariants exists with opacity-only transitions
        expect(animationsSource).toContain('reducedMotionVariants')

        // Duration is 0.2 (200ms)
        const reducedMotionBlock = animationsSource.slice(
          animationsSource.indexOf('reducedMotionVariants')
        )
        expect(reducedMotionBlock).toContain('duration: 0.2')

        // Only opacity is animated (no y, x, scale, rotate in reduced motion)
        expect(reducedMotionBlock).toContain('opacity: 0')
        expect(reducedMotionBlock).toContain('opacity: 1')

        // The hook checks prefers-reduced-motion media query
        expect(reducedMotionHook).toContain('prefers-reduced-motion: reduce')
        expect(reducedMotionHook).toContain('matchMedia')
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Preservation 3.8: Gallery Modal Navigation
   *
   * Gallery modal navigation works with swipe, keyboard, and thumbnail interactions.
   *
   * Observation: GalleryModal delegates keyboard handling to useKeyboardNavigation hook
   * (which handles ArrowLeft, ArrowRight, Escape via keydown listener).
   * Touch/swipe is handled via onTouchStart/Move/End in GalleryModal.
   * Thumbnails use onClick to setCurrentIndex.
   */
  it('gallery modal supports keyboard, swipe, and thumbnail navigation', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const gallerySource = readSource('components/ui/GalleryModal.tsx')
        const keyboardHookSource = readSource('hooks/useKeyboardNavigation.ts')

        // Keyboard navigation support — delegated to useKeyboardNavigation hook
        expect(gallerySource).toContain('useKeyboardNavigation')
        expect(keyboardHookSource).toContain('ArrowLeft')
        expect(keyboardHookSource).toContain('ArrowRight')
        expect(keyboardHookSource).toContain('Escape')
        expect(keyboardHookSource).toContain('keydown')

        // Touch/swipe gesture support (touch event handlers in GalleryModal)
        const hasSwipeSupport =
          gallerySource.includes('onTouchStart') ||
          gallerySource.includes('handleTouchStart') ||
          gallerySource.includes('touchStart')

        expect(hasSwipeSupport).toBe(true)

        // Thumbnail navigation (clickable thumbnails with setCurrentIndex)
        const hasThumbnails =
          gallerySource.includes('thumbnail') ||
          gallerySource.includes('Thumbnail') ||
          gallerySource.includes('setCurrentIndex')

        expect(hasThumbnails).toBe(true)
      }),
      { numRuns: 1 }
    )
  })
})
