/**
 * SectionDivider — Subtle gradient divider between sections.
 *
 * Renders a decorative gradient fade that visually connects adjacent sections.
 * Occupies no more than 64px of vertical space.
 * Supports both light and dark themes.
 *
 * Requirements: 9.3
 */
export default function SectionDivider() {
  return (
    <div
      className="relative w-full h-[1px] max-h-16"
      aria-hidden="true"
    >
      {/* Gradient line — subtle horizontal fade from transparent through accent to transparent */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent dark:via-teal-400/20" />
      </div>
    </div>
  );
}
