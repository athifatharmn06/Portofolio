import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
}

/** Numbered section opener: mono label over a hairline, then a serif headline. */
export default function SectionHeader({ index, label, title }: SectionHeaderProps) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-center gap-4 border-t border-line pt-4">
        <span className="eyebrow text-accent">{index}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <h2 className="display mt-8 max-w-4xl text-[clamp(2.25rem,5.2vw,4.25rem)] text-fg">{title}</h2>
    </Reveal>
  );
}
