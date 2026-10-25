import { FiArrowUpRight } from 'react-icons/fi';
import { stats } from '../../data/stats';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import ImageWithFallback from '../ui/ImageWithFallback';

const FACT_ROWS = [
  { k: 'Education', v: 'B.Eng. Electrical Engineering — Telkom University, 2022–present' },
  { k: 'GPA', v: '3.51 / 4.00' },
  {
    k: 'Languages',
    v: 'Indonesian (native) · English (professional)',
    href: 'https://igracias.telkomuniversity.ac.id/LACValidation/index.php?id=1815368&id2=107&id3=1817580&id4=1102220005',
    hrefLabel: 'ECCT 3.75',
  },
  { k: 'Focus', v: 'Autonomous systems, data architecture, industrial automation' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHeader
          index="01"
          label="About"
          title={
            <>
              Electrical &amp; software engineer, <em className="text-muted">focused on autonomous systems and data architecture.</em>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="aspect-[4/5] max-w-sm overflow-hidden border border-line">
              <ImageWithFallback
                src="/about-portrait.webp"
                alt="Athif Fadheel Atharahman on campus"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal className="space-y-5 text-[1.05rem] leading-[1.75] text-muted">
              <p>
                I'm a multidisciplinary engineer working across AI, cloud computing, robotics and full-stack
                development. A grounding in both logic-driven problem solving and software scalability lets me
                close the gap between hard engineering problems and efficient digital solutions.
              </p>
              <p>
                My work spans scalable web applications, large relational databases, enterprise SCADA automation
                at PT PLN Indonesia, and streamlined AI training pipelines.
              </p>
              <p>
                Whether it's architecting cloud systems, managing technical projects or writing control logic for
                UAVs, the goal is the same: precise, automated, reliable.
              </p>
            </Reveal>

            <Reveal delay={0.05} className="mt-12">
              <dl className="border-t border-line">
                {FACT_ROWS.map((row) => (
                  <div
                    key={row.k}
                    className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4 text-sm sm:grid-cols-[9rem_1fr]"
                  >
                    <dt className="eyebrow pt-0.5">{row.k}</dt>
                    <dd className="text-fg">
                      {row.v}
                      {row.href && (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline ml-2 inline-flex items-center gap-0.5 text-muted"
                        >
                          {row.hrefLabel} <FiArrowUpRight size={12} />
                        </a>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="display text-6xl text-fg md:text-7xl">
                    {s.value}
                    {s.suffix}
                  </p>
                  <p className="eyebrow mt-2">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
