/**
 * Bug Condition Exploration Test — UI Performance Under Interaction
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**
 *
 * Property 1: Bug Condition - UI Performance Under Interaction
 *
 * These tests assert the EXPECTED (fixed) behavior. They are designed to FAIL
 * on unfixed code, proving the performance bugs exist. When the bugs are fixed,
 * these tests will pass.
 *
 * Bug conditions tested:
 * 1. Universal selector transition applies to ALL elements (should be scoped)
 * 2. Unthrottled mousemove fires setCursorPos on every event (should use rAF)
 * 3. Duplicate scroll listeners from multiple useScrollSpy instances
 * 4. Render-blocking font link in <head> (should be async)
 * 5. Layout prop on project card motion.div elements (should use opacity/transform only)
 * 6. Duplicate profile.webp image load without lazy-loading on decorative copy
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import * as fs from 'fs'
import * as path from 'path'

// Helper to read source files for static analysis
const ROOT = path.resolve(__dirname, '..')
const readSource = (relativePath: string) =>
  fs.readFileSync(path.join(ROOT, relativePath), 'utf-8')

describe('Bug Condition Exploration: UI Performance Under Interaction', () => {
  /**
   * Bug Condition 1: Universal selector transition
   * The `*` rule applies transitions to ALL elements (500+ nodes) during scroll.
   * Expected behavior: transitions should only apply to themed elements
   * (body, .surface-card, .surface-elevated, .theme-transition), NOT `*`.
   */
  it('should NOT have universal selector (*) transition rule in index.css', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const css = readSource('index.css')

        // The universal selector rule should NOT exist in fixed code
        // Match patterns like: *, *::before, *::after { ... transition ... }
        const hasUniversalTransition =
          /\*[\s,]*\*::before[\s,]*\*::after\s*\{[^}]*transition/s.test(css) ||
          /^\s*\*\s*,/m.test(css.split('transition-property')[0]?.slice(-200) || '')

        // In fixed code, transitions should be scoped to specific selectors
        const hasScopedTransition =
          /body[\s,][\s\S]*\.surface-card[\s\S]*\.surface-elevated[\s\S]*\{[^}]*transition/s.test(css) ||
          /\.surface-card[\s\S]*\{[^}]*transition/s.test(css)

        // Assert: no universal selector transition AND scoped transitions exist
        expect(hasUniversalTransition).toBe(false)
        expect(hasScopedTransition).toBe(true)
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Bug Condition 2: Unthrottled mousemove
   * setCursorPos fires on every mousemove event without rAF gating.
   * Expected behavior: cursor position stored in useRef, updates throttled via rAF.
   */
  it('should throttle mousemove handler with requestAnimationFrame in HeroSection', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const heroSource = readSource('components/sections/HeroSection.tsx')

        // In fixed code: cursor position should use useRef (not useState for position)
        // and handleMouseMove should use requestAnimationFrame
        const usesSetCursorPosDirectly =
          /setCursorPos\s*\(\s*\{/.test(heroSource) &&
          !heroSource.includes('requestAnimationFrame')

        const hasRAFThrottling =
          heroSource.includes('requestAnimationFrame') &&
          (heroSource.includes('useRef') || heroSource.includes('cursorRef'))

        // Assert: mousemove should be throttled with rAF
        expect(usesSetCursorPosDirectly).toBe(false)
        expect(hasRAFThrottling).toBe(true)
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Bug Condition 3: Duplicate scroll listeners
   * Multiple useScrollSpy instances create redundant scroll handlers.
   * Expected behavior: only ONE useScrollSpy call across App.tsx and Navbar.tsx.
   */
  it('should have only one useScrollSpy instance (not duplicated in App and Navbar)', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const appSource = readSource('App.tsx')
        const navbarSource = readSource('components/layout/Navbar.tsx')

        // Count useScrollSpy calls in both files
        const appCalls = (appSource.match(/useScrollSpy\s*\(/g) || []).length
        const navbarCalls = (navbarSource.match(/useScrollSpy\s*\(/g) || []).length

        const totalCalls = appCalls + navbarCalls

        // In fixed code: only ONE instance should exist (either in App or Navbar, not both)
        expect(totalCalls).toBe(1)
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Bug Condition 3b: Scroll handler should be rAF-throttled
   * Expected behavior: useScrollSpy wraps scroll handler in requestAnimationFrame.
   */
  it('should throttle scroll handler with requestAnimationFrame in useScrollSpy', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const scrollSpySource = readSource('hooks/useScrollSpy.ts')

        // In fixed code: scroll handler should use requestAnimationFrame
        const hasRAFThrottling = scrollSpySource.includes('requestAnimationFrame')

        expect(hasRAFThrottling).toBe(true)
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Bug Condition 4: Render-blocking font
   * Font <link> in <head> has no async loading pattern.
   * Expected behavior: font link uses media="print" onload="this.media='all'" pattern
   * or equivalent async loading, plus preconnect hints.
   */
  it('should load fonts asynchronously (not render-blocking) in index.html', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const html = fs.readFileSync(
          path.resolve(ROOT, '..', 'index.html'),
          'utf-8'
        )

        // Check for async font loading pattern
        const hasAsyncFontLoading =
          html.includes('media="print"') && html.includes('onload')

        // Check for preconnect hints
        const hasPreconnect =
          html.includes('rel="preconnect"') &&
          html.includes('fonts.googleapis.com')

        // Check that there's no plain render-blocking stylesheet link for fonts
        // A render-blocking link is: <link href="...fonts.googleapis.com..." rel="stylesheet">
        // without media="print" or other async pattern
        const fontLinkRegex =
          /<link[^>]*href="[^"]*fonts\.googleapis\.com[^"]*"[^>]*rel="stylesheet"[^>]*>/gi
        const fontLinks = html.match(fontLinkRegex) || []
        const hasRenderBlockingFont = fontLinks.some(
          (link: string) => !link.includes('media="print"') && !link.includes('onload')
        )

        // Assert: async loading present, preconnect present, no render-blocking font
        expect(hasAsyncFontLoading).toBe(true)
        expect(hasPreconnect).toBe(true)
        expect(hasRenderBlockingFont).toBe(false)
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Bug Condition 5: Layout animations
   * `layout` prop is present on project card motion.div elements.
   * Expected behavior: no `layout` prop, use only opacity/transform animations.
   */
  it('should NOT use layout prop on project card motion.div in ProjectsSection', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const projectsSource = readSource('components/sections/ProjectsSection.tsx')

        // In fixed code: motion.div for project cards should NOT have `layout` prop
        // Look for motion.div with layout prop in the filtered projects map
        const hasLayoutProp =
          /motion\.div[\s\S]*?layout[\s\S]*?>/m.test(projectsSource) &&
          projectsSource.includes('filteredProjects.map')

        // Also check AnimatePresence mode is not "popLayout"
        const hasPopLayout = projectsSource.includes('"popLayout"') || projectsSource.includes("'popLayout'")

        // Assert: no layout prop and no popLayout mode
        expect(hasLayoutProp).toBe(false)
        expect(hasPopLayout).toBe(false)
      }),
      { numRuns: 1 }
    )
  })

  /**
   * Bug Condition 6: Duplicate image load
   * /profile.webp is referenced twice without lazy-loading on the decorative copy.
   * Expected behavior: decorative glow uses CSS-only effect OR has loading="lazy".
   */
  it('should not load profile.webp twice without lazy-loading on decorative copy', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const heroSource = readSource('components/sections/HeroSection.tsx')

        // Count references to profile.webp as img src
        const profileImgMatches = heroSource.match(/src=["'][^"']*profile\.webp["']/g) || []
        const profileImgCount = profileImgMatches.length

        if (profileImgCount <= 1) {
          // Only one image reference — no duplicate load issue (fixed via CSS-only glow)
          expect(profileImgCount).toBeLessThanOrEqual(1)
        } else {
          // If there are multiple references, the decorative one must have loading="lazy"
          // Find the decorative img (the one with blur/glow classes)
          const hasLazyDecorativeImg =
            /img[^>]*profile\.webp[^>]*loading=["']lazy["']/s.test(heroSource) ||
            /img[^>]*loading=["']lazy["'][^>]*profile\.webp/s.test(heroSource)

          expect(hasLazyDecorativeImg).toBe(true)
        }
      }),
      { numRuns: 1 }
    )
  })
})
