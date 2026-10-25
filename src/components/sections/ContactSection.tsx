import { FiArrowUpRight } from 'react-icons/fi';
import Reveal from '../ui/Reveal';

const EMAIL = 'athifadheel@gmail.com';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/' },
  { label: 'Instagram', href: 'https://www.instagram.com/athifatharmn/' },
  { label: 'GitHub', href: 'https://github.com/athifatharmn06' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-fg py-24 text-bg md:py-36">
      <div className="wrap">
        <Reveal className="mb-14 md:mb-20">
          <div className="flex items-center gap-4 border-t border-bg/20 pt-4">
            <span className="eyebrow !text-accent">05</span>
            <span className="eyebrow !text-bg/60">Contact</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="display max-w-5xl text-[clamp(2.75rem,8vw,7rem)]">
            Have something in mind? <em className="text-accent">Let's talk.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-14">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-3 border-b border-bg/30 pb-2 text-xl transition-colors hover:border-accent hover:text-accent sm:text-3xl"
          >
            {EMAIL}
            <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1 text-sm"
                >
                  {l.label} <FiArrowUpRight size={13} />
                </a>
              </li>
            ))}
          </ul>
          <p className="max-w-xs text-sm text-bg/60">
            Open to freelance work, collaborations and interesting engineering problems.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
