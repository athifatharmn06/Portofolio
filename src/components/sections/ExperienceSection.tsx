import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { useInView } from '../../hooks/useInView';

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

export default function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="w-full relative bg-gradient-to-br from-[#0c051a] via-[#080b14] to-[#030612] border-b border-white/5"
    >
      {/* Subtle noise/grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="container mx-auto px-6 max-w-5xl py-32 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center text-teal-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-200">Experience</h2>
        </motion.div>

        {/* Timeline Content */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start"
        >
          {/* Left Column: Date and Logo */}
          <motion.div variants={fadeInUp} className="w-full md:w-1/4 flex flex-col gap-5 shrink-0 mt-2">
            <p className="text-gray-300 font-semibold md:text-lg whitespace-nowrap">
              Jun 2025 - Aug 2025
            </p>

            {/* Logo Box */}
            <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-teal-500/30 rounded-xl bg-gray-900/60 backdrop-blur-md flex flex-col items-center justify-center p-5 hover:border-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.25)] transition-all duration-300">
              <img
                src="/internship_pln/Logo_PLN.webp"
                alt="PT PLN Logo"
                className="w-16 h-16 md:w-20 md:h-20 object-contain mb-3"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div variants={fadeInUp} className="w-full md:w-3/4 space-y-5">
            <h3 className="text-2xl md:text-3xl font-bold leading-snug mb-2 flex flex-col gap-1">
              <span className="text-orange-400">PT PLN (Persero) UIP2B JAMALI</span>
              <span className="text-white">
                <span className="text-gray-500 mr-2">|</span> SCADA & Automation Intern
              </span>
            </h3>

            <ul className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed list-disc list-outside ml-6 marker:text-teal-500">
              <li>
                <strong className="text-gray-200">Engineered Python scripts</strong> to automate
                downtime analysis and reliability reporting by parsing massive, unstructured server
                and RTU logs.
              </li>
              <li>
                <strong className="text-gray-200">
                  Prototyped an open-source ICCP (IEC 60870-6) gateway
                </strong>{' '}
                by compiling complex C-libraries (libiec61850) and debugging low-level system
                interoperability errors.
              </li>
              <li>
                <strong className="text-gray-200">Configured Grafana</strong> for real-time data
                visualization and applied comprehensive database management skills utilizing both
                Oracle Database and Microsoft SQL to optimize system reliability.
              </li>
              <li>
                <strong className="text-gray-200">
                  Deployed a high-performance Network Attached Storage (NAS)
                </strong>{' '}
                system configured with RAID 0 and static IP addressing for secure local data access.
              </li>
              <li>
                <strong className="text-gray-200">
                  Executed Factory Acceptance Tests (FAT)
                </strong>{' '}
                for critical 48V DC systems, performing hands-on wiring and inspection of rectifiers
                and Ni-Cd batteries.
              </li>
            </ul>

            <div className="pt-4 border-t border-gray-800/60 mt-8">
              <p className="text-xs text-gray-500 italic">
                Note: Due to the highly classified nature of this state-owned critical
                infrastructure, the points above represent only a portion of the actual systems,
                network configurations, and operations managed during this role.
              </p>
            </div>

            {/* Internship Photo Gallery Grid */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-8 pt-2">
              {internshipPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  className={`h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 transition-all duration-300 cursor-pointer group ${
                    idx % 2 === 0
                      ? 'hover:border-teal-400/80'
                      : 'hover:border-orange-400/80'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
