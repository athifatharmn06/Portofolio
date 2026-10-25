import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

const internshipPhotos = [
  { src: '/internship_pln/20250709_085926.webp', alt: 'PLN internship day one orientation' },
  { src: '/internship_pln/20250722_140752.webp', alt: 'SCADA system monitoring session' },
  { src: '/internship_pln/20250804_094932.webp', alt: 'Factory acceptance testing equipment' },
  { src: '/internship_pln/20250804_132531.webp', alt: 'NAS deployment and configuration' },
  { src: '/internship_pln/IMG-20250808-WA0025.webp', alt: 'Team collaboration at PLN office' },
  { src: '/internship_pln/IMG-20250808-WA0033.webp', alt: 'Internship completion group photo' },
  { src: '/internship_pln/Screenshot 2025-07-07 085334.webp', alt: 'Grafana dashboard visualization' },
  { src: '/internship_pln/Screenshot 2025-07-09 125309.webp', alt: 'Python automation script output' },
  { src: '/internship_pln/Screenshot 2025-08-04 152953.webp', alt: 'ICCP gateway configuration screen' },
];

const HIGHLIGHTS = [
  {
    lead: 'Python automation',
    body: 'for downtime analysis and reliability reporting, parsing large unstructured server and RTU logs.',
  },
  {
    lead: 'ICCP (IEC 60870-6) gateway prototype',
    body: 'built on open-source libiec61850, debugging low-level interoperability errors.',
  },
  {
    lead: 'Grafana + Oracle / MS SQL',
    body: 'for real-time visualization and database work aimed at system reliability.',
  },
  {
    lead: 'NAS deployment',
    body: 'configured with RAID 0 and static addressing for secure local data access.',
  },
  {
    lead: 'Factory Acceptance Tests',
    body: 'on critical 48V DC systems — hands-on wiring and inspection of rectifiers and Ni-Cd batteries.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-sunk py-24 md:py-36">
      <div className="wrap">
        <SectionHeader
          index="02"
          label="Experience"
          title={
            <>
              Hands-on with <em className="text-muted">critical infrastructure.</em>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Jun 2025 — Aug 2025</p>
            <h3 className="display mt-4 text-4xl text-fg md:text-5xl">SCADA &amp; Automation Intern</h3>
            <div className="mt-6 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-lg bg-white p-2">
                <img src="/internship_pln/Logo_PLN.webp" alt="PT PLN logo" className="h-full w-full object-contain" />
              </div>
              <p className="text-sm leading-snug text-muted">
                PT PLN (Persero)
                <br />
                UIP2B JAMALI
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <ol className="border-t border-line">
                {HIGHLIGHTS.map((h, i) => (
                  <li key={h.lead} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-line py-5">
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    <p className="leading-relaxed text-muted">
                      <strong className="font-medium text-fg">{h.lead}</strong> {h.body}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted">
                Note: because this is classified, state-owned critical infrastructure, the points above are only a
                portion of the systems, network configurations and operations handled in the role.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.05} className="mt-16">
          <p className="eyebrow mb-4">Field notes — {internshipPhotos.length} frames</p>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
            {internshipPhotos.map((photo) => (
              <li key={photo.src} className="group aspect-square overflow-hidden border border-line">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
