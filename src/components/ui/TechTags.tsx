import { useLayoutEffect, useRef, useState } from 'react';

interface TechTagsProps {
  tags: string[];
  /** Maximum number of rows the pills may occupy (default 2) */
  rows?: number;
}

const PILL = 'text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';

/**
 * Tech-stack pills clamped to a fixed number of rows so every project card is the same height.
 * Pills that do not fit are replaced by a trailing "+N more" pill.
 */
export default function TechTags({ tags, rows = 2 }: TechTagsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(tags.length);
  const [width, setWidth] = useState(0);

  // Restart the fit when the available width changes
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setWidth((prev) => {
        if (prev !== w) setVisible(tags.length);
        return w;
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [tags.length]);

  // Drop one pill at a time until everything (including the "more" pill) fits in `rows`
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || visible === 0) return;
    const tops = new Set(Array.from(el.children).map((c) => (c as HTMLElement).offsetTop));
    if (tops.size > rows) setVisible((v) => Math.max(0, v - 1));
  }, [visible, width, rows, tags]);

  const hidden = tags.length - visible;

  return (
    <div
      ref={ref}
      className="flex flex-wrap content-start gap-1.5 overflow-hidden"
      // two rows of pills: 2 x 1.25rem pill + gap
      style={{ height: `calc(${rows} * 1.25rem + ${rows - 1} * 0.375rem)` }}
    >
      {tags.slice(0, visible).map((tech) => (
        <span key={tech} className={PILL}>
          {tech}
        </span>
      ))}
      {hidden > 0 && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-medium">
          +{hidden} more
        </span>
      )}
    </div>
  );
}
