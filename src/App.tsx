import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import {
  FaPython, FaNodeJs, FaAws, FaGithub, FaUbuntu, FaReact, FaHtml5, FaWordpress,
  FaDatabase, FaTable, FaRobot, FaTags, FaCube, FaIndustry, FaBolt, FaRoute,
  FaBroadcastTower, FaMicrochip, FaCogs, FaMapMarkedAlt, FaTasks, FaChartLine, FaSearch, FaCog,
  FaUsers, FaLanguage, FaServer, FaNetworkWired, FaHdd, FaEthernet, FaEye, FaFont, FaCode,
  FaCloud, FaLaptopCode, FaChartBar, FaBrain, FaRobot as FaBot, FaPaintBrush, FaBriefcase,
  FaCubes, FaMusic, FaTimes, FaChevronLeft, FaChevronRight, FaImages, FaMicrosoft,
  FaLinkedin, FaInstagram, FaEnvelope
} from 'react-icons/fa';
import {
  SiCplusplus, SiGooglecloud, SiTailwindcss, SiJavascript,
  SiOracle, SiPandas, SiNumpy, SiGrafana, SiTensorflow, SiKeras, SiOpencv,
  SiDavinciresolve, SiAdobeaftereffects, SiAudacity, SiCanva
} from 'react-icons/si';

// --- MOTION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Define the Project type for TypeScript
interface PhotoContext {
  url: string;
  caption: string;
  tools: string;
}

interface ProjectData {
  id: string;
  title: string;
  shortDesc: string;
  category: string;
  techStack: string[];
  thumbnail: string;
  photos: PhotoContext[];
}

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeGalleryProject, setActiveGalleryProject] = useState<ProjectData | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    // Sync React state with localStorage/document class that was set by index.html script
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <>
      {/* Header / Navbar (Eliana Style) */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-5xl rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/10 shadow-lg px-6 py-3 flex items-center justify-between transition-colors duration-300">
        {/* Logo */}
        <a href="#" className="text-xl font-bold tracking-tight text-gray-800 dark:text-white flex items-center gap-1">
          athif<span className="text-accent">.</span>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium border-l border-r border-gray-300 dark:border-white/10 px-8 transition-colors duration-300">
          <a href="#home" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-400 hover:to-indigo-500 transition-all">Home</a>
          <a href="#about" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-400 hover:to-indigo-500 transition-all">About me</a>
          <a href="#experience" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-400 hover:to-indigo-500 transition-all">Experience</a>
          <a href="#skills" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-400 hover:to-indigo-500 transition-all">Skills</a>
          <a href="#projects" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-400 hover:to-indigo-500 transition-all">My Work</a>
          <a href="#contact" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-400 hover:to-indigo-500 transition-all">Contact me</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              // Sun Icon
              <svg className="w-5 h-5 text-gray-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              // Moon Icon
              <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          {/* Contact Button */}
          <a href="#contact" className="flex items-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 border border-transparent dark:border-white/20 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform">
            Contact
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path></svg>
          </a>
        </div>
      </header>

      {/* Main Hero Section */}
      <section id="home" ref={heroRef} onMouseMove={handleMouseMove} className="relative pt-32 pb-32 md:pt-48 md:pb-64 overflow-hidden bg-gradient-to-b from-[#0d131f] via-[#090e17] to-[#040812] text-white">
        {/* Interactive Fluid Cursor Blob */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div
            className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/40 via-purple-500/30 to-pink-500/40 rounded-full mix-blend-screen filter blur-[120px] transition-transform duration-500 ease-out"
            style={{ transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` }}
          ></div>
        </div>

        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] z-0 pointer-events-none fade-out-bottom"></div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 mt-12"
        >
          {/* Left Text Content */}
          <motion.div variants={fadeInUp} className="w-full md:w-1/2 flex flex-col items-start text-left z-10">
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500">
              Welcome!
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl font-medium mt-4 block text-white drop-shadow-md">
                to <span className="font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold ml-1 pr-3 tracking-wider text-5xl md:text-7xl lg:text-8xl align-middle">Athif</span> Portfolio
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-300 mt-8 max-w-2xl leading-relaxed text-lg md:text-xl font-light drop-shadow-sm text-left">
              I'm a software and electrical engineer with experience in programming, developing websites and apps, managing big relational databases, and AI data training. Beyond digital solutions, my background includes technical project management and engineering advanced control systems for UAVs and drones.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-start gap-4">
              <a href="https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0077b5] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#005582] hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,119,181,0.4)]">
                <FaLinkedin className="w-6 h-6" /> Let's connect
              </a>
            </motion.div>
          </motion.div>

          {/* Right Image Content */}
          <motion.div variants={scaleUp} className="w-full md:w-1/2 relative flex justify-center lg:justify-end mt-12 md:mt-0 pointer-events-none z-10">
            {/* Direct Image with Contoured Drop Shadow and increased size */}
            <img
              src="/profile.webp"
              alt="Athif Fadheel Atharahman"
              className="w-[20rem] md:w-[28rem] lg:w-[46rem] xl:w-[50rem] object-contain drop-shadow-[0_0_40px_rgba(45,212,191,0.6)] hover:drop-shadow-[0_0_80px_rgba(45,212,191,0.9)] transition-all duration-700"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Additional Sections with Distinct Themed Backgrounds */}
      <div className="w-full flex flex-col z-10 relative">
        {/* About Section */}
        <section id="about" className="w-full relative overflow-hidden bg-gradient-to-br from-[#02050e] via-[#05111c] to-[#010612] border-b border-white/5">
          {/* Large dynamic background blob */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="container mx-auto px-6 max-w-5xl py-32 relative z-10">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center text-teal-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-200">About Me</h2>
            </motion.div>

            <motion.h3
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold leading-tight text-white mb-16"
            >
              I'm an innovative <span className="text-teal-400">Electrical & Software Engineer</span> specializing in <br className="hidden md:block" />
              <span className="text-teal-400">Autonomous Systems & Data Architecture</span>
            </motion.h3>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="flex flex-col lg:flex-row gap-16 justify-between items-start"
            >

              {/* Left Column: Text & Languages */}
              <motion.div variants={fadeInUp} className="w-full lg:w-3/5 space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-white">Athif Fadheel Atharahman</h4>
                  <p className="text-teal-400 font-medium">Electrical & Software Engineer</p>
                </div>

                <div className="space-y-4 text-gray-400 font-light leading-relaxed text-justify">
                  <p>
                    With a strong foundation in both logic-based problem solving and software scalability, I bridge the gap between complex engineering challenges and efficient digital solutions.
                  </p>
                  <p>
                    My expertise spans developing scalable web applications, managing large-scale relational databases, enterprise-level SCADA automation (with proven success at PT PLN Indonesia, the state-owned and largest electricity supplier in Indonesia), and streamlining AI training pipelines.
                  </p>
                  <p>
                    Whether I am architecting cloud-based computing systems, managing technical projects, or engineering advanced control logic for UAVs, I build solutions that are precise, automated, and highly reliable. I combine industry-standard software skills with the rigorous discipline of an engineering researcher to deliver cutting-edge tech.
                  </p>
                </div>

                {/* Languages */}
                <div className="pt-6">
                  <h5 className="text-sm font-semibold text-teal-500 mb-2">| Languages</h5>
                  <hr className="border-gray-800 w-1/2 mb-4" />
                  <div className="flex gap-6 text-sm text-gray-300">
                    <p><span className="font-bold text-white">Indonesian</span> - Native</p>
                    <p>
                      <span className="font-bold text-white">English</span> - Advanced / Professional
                      <a href="https://igracias.telkomuniversity.ac.id/LACValidation/index.php?id=1815368&id2=107&id3=1817580&id4=1102220005" target="_blank" rel="noopener noreferrer" className="ml-2 text-teal-400 hover:text-teal-300 underline underline-offset-2 inline-flex items-center gap-1">
                        (ECCT Certificate)
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    </p>
                  </div>
                </div>

              </motion.div>

              {/* Right Column: Image & Education Card */}
              <motion.div variants={scaleUp} className="w-full lg:w-2/5 flex flex-col items-center lg:items-end space-y-12">

                {/* Circular Secondary Portrait */}
                <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-gray-800 shadow-xl opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <img src="/about_me.webp" alt="Athif Fadheel Atharahman" className="w-full h-full object-cover object-top" />
                </div>

                {/* Education Card */}
                <motion.div whileHover={{ scale: 1.05 }} className="w-full max-w-sm bg-gray-900/50 border border-gray-800 rounded-xl p-5 flex items-center gap-5 hover:border-teal-500/50 transition-colors cursor-pointer shadow-lg">
                  <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center shrink-0">
                    {/* Telkom University Logo (Fallback text if image fails) */}
                    <img src="/Logo_Telkom_University_potrait.webp" alt="Telkom University" className="w-full h-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                    <span className="hidden text-xs text-center font-bold text-red-600">Telkom Univ</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug mb-1">Bachelor of Electrical Engineering</h4>
                    <p className="text-teal-400 text-xs font-semibold mb-1">Telkom University</p>
                    <p className="text-gray-400 text-xs">GPA: 3.52 / 4.00</p>
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="w-full relative bg-gradient-to-br from-[#0c051a] via-[#080b14] to-[#030612] border-b border-white/5">
          {/* Subtle noise/grid overlay specifically for Experience */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="container mx-auto px-6 max-w-5xl py-32 relative z-10">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="flex items-center gap-3 mb-12"
            >
              <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center text-teal-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-200">Experience</h2>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start"
            >
              {/* Left Column: Date and Logo */}
              <motion.div variants={fadeInUp} className="w-full md:w-1/4 flex flex-col gap-5 shrink-0 mt-2">
                <p className="text-gray-300 font-semibold md:text-lg whitespace-nowrap">Jun 2025 - Aug 2025</p>

                {/* Logo Box matching WestonDev style */}
                <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-teal-500/30 rounded-xl bg-gray-900/60 backdrop-blur-md flex flex-col items-center justify-center p-5 hover:border-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.25)] transition-all duration-300">
                  <img src="/internship_pln/Logo_PLN.webp" alt="PT PLN Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain mb-3" />
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
                  <li><strong className="text-gray-200">Engineered Python scripts</strong> to automate downtime analysis and reliability reporting by parsing massive, unstructured server and RTU logs.</li>
                  <li><strong className="text-gray-200">Prototyped an open-source ICCP (IEC 60870-6) gateway</strong> by compiling complex C-libraries (libiec61850) and debugging low-level system interoperability errors.</li>
                  <li><strong className="text-gray-200">Configured Grafana</strong> for real-time data visualization and applied comprehensive database management skills utilizing both Oracle Database and Microsoft SQL to optimize system reliability.</li>
                  <li><strong className="text-gray-200">Deployed a high-performance Network Attached Storage (NAS)</strong> system configured with RAID 0 and static IP addressing for secure local data access.</li>
                  <li><strong className="text-gray-200">Executed Factory Acceptance Tests (FAT)</strong> for critical 48V DC systems, performing hands-on wiring and inspection of rectifiers and Ni-Cd batteries.</li>
                </ul>

                <div className="pt-4 border-t border-gray-800/60 mt-8">
                  <p className="text-xs text-gray-500 italic">
                    Note: Due to the highly classified nature of this state-owned critical infrastructure, the points above represent only a portion of the actual systems, network configurations, and operations managed during this role.
                  </p>
                </div>

                {/* Visually Interesting Gallery Grid */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-8 pt-2">
                  <div className="h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/80 transition-all duration-300 cursor-pointer group">
                    <img src="/internship_pln/20250709_085926.webp" alt="Snapshot 1" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-orange-400/80 transition-all duration-300 cursor-pointer group">
                    <img src="/internship_pln/20250722_140752.webp" alt="Snapshot 2" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/80 transition-all duration-300 cursor-pointer group">
                    <img src="/internship_pln/20250804_094932.webp" alt="Snapshot 3" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-orange-400/80 transition-all duration-300 cursor-pointer group">
                    <img src="/internship_pln/20250804_132531.webp" alt="Snapshot 4" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/80 transition-all duration-300 cursor-pointer group">
                    <img src="/internship_pln/IMG-20250808-WA0025.webp" alt="Snapshot 5" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-orange-400/80 transition-all duration-300 cursor-pointer group">
                    <img src="/internship_pln/IMG-20250808-WA0033.webp" alt="Snapshot 6" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/80 transition-all duration-300 cursor-pointer group">
                    <img src="/internship_pln/Screenshot 2025-07-07 085334.webp" alt="Snapshot 7" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-orange-400/80 transition-all duration-300 cursor-pointer group">
                    <img src="/internship_pln/Screenshot 2025-07-09 125309.webp" alt="Snapshot 8" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="h-20 md:h-24 rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/80 transition-all duration-300 cursor-pointer group">
                    <img src="/internship_pln/Screenshot 2025-08-04 152953.webp" alt="Snapshot 9" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full relative bg-gradient-to-b from-[#02060d] to-[#0a0515] border-b border-white/5 overflow-hidden">
          {/* Subtle Grid overlay for technical feel */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="container mx-auto px-6 max-w-5xl py-32 relative z-10">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                <FaCode className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-gray-200">TECHNICAL SKILLS & CORE COMPETENCIES</h2>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
            >
              {/* Category 1 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2 border-b border-gray-800 pb-2">
                  <FaLaptopCode className="text-teal-400" /> Software & Backend Development
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Python', icon: <FaPython className="text-[#3776AB]" /> },
                    { name: 'C/C++ (Embedded & HPC)', icon: <SiCplusplus className="text-[#00599C]" /> },
                    { name: 'Node.js', icon: <FaNodeJs className="text-[#339933]" /> },
                    { name: 'Cloud Msg Queuing', icon: <FaServer className="text-gray-400" /> }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-teal-500 hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300 cursor-default group">
                      <span className="group-hover:scale-110 transition-transform">{skill.icon}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2 border-b border-gray-800 pb-2">
                  <FaCloud className="text-blue-400" /> Cloud Computing & DevOps
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'GCP (Vertex AI, Run)', icon: <SiGooglecloud className="text-[#4285F4]" /> },
                    { name: 'AWS EC2', icon: <FaAws className="text-[#FF9900]" /> },
                    { name: 'Microsoft Azure', icon: <FaMicrosoft className="text-[#0089D6]" /> },
                    { name: 'Git/GitHub', icon: <FaGithub className="text-white" /> },
                    { name: 'Linux/Ubuntu Admin', icon: <FaUbuntu className="text-[#E95420]" /> },
                    { name: 'VPS (ZeroTier, TailScale)', icon: <FaNetworkWired className="text-purple-400" /> },
                    { name: 'NAS (RAID 0/1)', icon: <FaHdd className="text-gray-400" /> },
                    { name: 'Network Config', icon: <FaEthernet className="text-teal-500" /> }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.2)] transition-all duration-300 cursor-default group">
                      <span className="group-hover:scale-110 transition-transform">{skill.icon}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 3 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2 border-b border-gray-800 pb-2">
                  <FaReact className="text-cyan-400" /> Frontend & Web Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'ReactJS', icon: <FaReact className="text-[#61DAFB]" /> },
                    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
                    { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" /> },
                    { name: 'HTML/CSS', icon: <FaHtml5 className="text-[#E34F26]" /> },
                    { name: 'WordPress', icon: <FaWordpress className="text-[#21759B]" /> }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 cursor-default group">
                      <span className="group-hover:scale-110 transition-transform">{skill.icon}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 4 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2 border-b border-gray-800 pb-2">
                  <FaChartBar className="text-green-400" /> Database Management & Analytics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Oracle Database', icon: <SiOracle className="text-[#F00000]" /> },
                    { name: 'SQL (MySQL, MS SQL)', icon: <FaDatabase className="text-[#4479A1]" /> },
                    { name: 'Pandas', icon: <SiPandas className="text-[#150458]" /> },
                    { name: 'NumPy', icon: <SiNumpy className="text-[#013243]" /> },
                    { name: 'Grafana', icon: <SiGrafana className="text-[#F46800]" /> },
                    { name: 'Advanced Spreadsheets', icon: <FaTable className="text-green-500" /> }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.2)] transition-all duration-300 cursor-default group">
                      <span className="group-hover:scale-110 transition-transform">{skill.icon}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 5 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2 border-b border-gray-800 pb-2">
                  <FaBrain className="text-pink-400" /> AI, Computer Vision & Data
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Deep Learning (TF/Keras)', icon: <SiTensorflow className="text-[#FF6F00]" /> },
                    { name: 'Keras Models', icon: <SiKeras className="text-[#D00000]" /> },
                    { name: 'Object Detection (YOLO)', icon: <FaEye className="text-indigo-400" /> },
                    { name: 'OpenCV', icon: <SiOpencv className="text-[#5C3EE8]" /> },
                    { name: 'OCR', icon: <FaFont className="text-gray-300" /> },
                    { name: 'Prompt Engineering', icon: <FaRobot className="text-orange-400" /> },
                    { name: 'High-Fidelity Face Swap', icon: <FaUsers className="text-blue-300" /> },
                    { name: 'AI Data Annotation', icon: <FaTags className="text-yellow-400" /> }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-pink-400 hover:shadow-[0_0_15px_rgba(244,114,182,0.2)] transition-all duration-300 cursor-default group">
                      <span className="group-hover:scale-110 transition-transform">{skill.icon}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 6 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2 border-b border-gray-800 pb-2">
                  <FaBot className="text-orange-400" /> Robotics, Auto & Simulation
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'ROS', icon: <FaRobot className="text-[#22314E]" /> },
                    { name: 'Gazebo Simulation', icon: <FaCube className="text-gray-300" /> },
                    { name: 'SolidWorks (3D CAD)', icon: <FaCubes className="text-[#D3222A]" /> },
                    { name: 'Ansys', icon: <FaCog className="text-[#FDB813]" /> },
                    { name: 'SCADA & Automation', icon: <FaIndustry className="text-gray-400" /> },
                    { name: 'ICCP (IEC 60870-6)', icon: <FaBolt className="text-yellow-400" /> },
                    { name: 'ArduPilot & MAVLink', icon: <FaRoute className="text-blue-400" /> },
                    { name: 'RF LoRa & LTE Telemetry', icon: <FaBroadcastTower className="text-teal-400" /> },
                    { name: 'MATLAB', icon: <FaMicrochip className="text-[#0076A8]" /> },
                    { name: 'CX-Programmer & Factory I/O', icon: <FaCogs className="text-orange-500" /> }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-orange-400 hover:shadow-[0_0_15px_rgba(251,146,60,0.2)] transition-all duration-300 cursor-default group">
                      <span className="group-hover:scale-110 transition-transform">{skill.icon}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 7 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2 border-b border-gray-800 pb-2">
                  <FaPaintBrush className="text-purple-400" /> Creative & Multimedia Production
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'DaVinci Resolve', icon: <SiDavinciresolve className="text-[#E74646]" /> },
                    { name: 'Adobe After Effects', icon: <SiAdobeaftereffects className="text-[#9999FF]" /> },
                    { name: 'Ableton Live', icon: <FaMusic className="text-[#000000]" /> },
                    { name: 'GEOlayers', icon: <FaMapMarkedAlt className="text-blue-300" /> },
                    { name: 'Audacity', icon: <SiAudacity className="text-[#0000CC]" /> },
                    { name: 'Canva', icon: <SiCanva className="text-[#00C4CC]" /> }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-purple-400 hover:shadow-[0_0_15px_rgba(192,132,252,0.2)] transition-all duration-300 cursor-default group">
                      <span className="group-hover:scale-110 transition-transform">{skill.icon}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 8 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2 border-b border-gray-800 pb-2">
                  <FaBriefcase className="text-yellow-400" /> Professional Methodologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Technical Project Mgmt', icon: <FaTasks className="text-teal-400" /> },
                    { name: 'Zero-Error Data Validation', icon: <FaChartLine className="text-green-400" /> },
                    { name: 'Deep-Dive Tech Research', icon: <FaSearch className="text-gray-300" /> },
                    { name: 'Cross-Functional Leadership', icon: <FaUsers className="text-indigo-400" /> },
                    { name: 'Advanced English (ECCT 3.75)', icon: <FaLanguage className="text-blue-400" /> }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all duration-300 cursor-default group">
                      <span className="group-hover:scale-110 transition-transform">{skill.icon}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="w-full relative bg-gradient-to-b from-[#0a0515] via-[#080210] to-[#000000] overflow-hidden">
          {/* Subtle blurred spotlight in the center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="container mx-auto px-6 max-w-6xl py-32 relative z-10">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="text-center mb-20 px-4"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-4 py-2 px-2 leading-tight">
                Featured Projects & Digital Solutions
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Innovating Across Web, Mobile, Desktop, AI, and Data Science. Explore impactful projects where technology, design, and problem solving converge.
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projectsData.map((project) => (
                <motion.div variants={fadeInUp} key={project.id} className="bg-[#1c212a] border border-white/5 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] hover:border-teal-500/30 transition-all duration-500 flex flex-col group">
                  {/* Thumbnail */}
                  <div className="relative h-56 overflow-hidden bg-gray-900 border-b border-white/5">
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c212a] via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-gray-300">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed">
                      {project.shortDesc}
                    </p>

                    {/* Glassy Tech Stack Table */}
                    <div className="mb-6 bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                      <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Technical Engine</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded-md border border-white/5">{tech}</span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setActiveGalleryProject(project);
                          setCurrentPhotoIndex(0);
                        }}
                        className="w-full py-3 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-white font-semibold rounded-xl border border-teal-500/20 hover:border-teal-500 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaImages /> Explore Gallery ({project.photos.length})
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-gray-400 py-12 border-t border-white/10 text-center transition-colors duration-300">
        <h2 className="text-2xl font-bold text-white mb-6">Let's work together!</h2>

        <div className="flex items-center justify-center gap-6 mb-8 mt-4">
          <a href="https://www.instagram.com/athifatharmn/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 text-white hover:scale-110 transition-all shadow-lg hover:shadow-pink-500/30">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#0077b5] text-white hover:scale-110 transition-all shadow-lg hover:shadow-blue-500/30">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href="mailto:athifadheel@gmail.com" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500 text-white hover:scale-110 transition-all shadow-lg hover:shadow-red-500/30">
            <FaEnvelope className="w-6 h-6" />
          </a>
        </div>

        <p className="mt-8 text-sm text-gray-500">© {new Date().getFullYear()} Athif Fadheel. Built with React & Tailwind CSS.</p>
        {/* Full-Screen Image Gallery Modal */}
        {
          activeGalleryProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300">
              <button
                onClick={() => setActiveGalleryProject(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full backdrop-blur-md transition-all z-50"
              >
                <FaTimes className="w-6 h-6" />
              </button>

              <div className="w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center relative">

                {/* Image Container */}
                <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center group overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#0f1218]">

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setCurrentPhotoIndex((prev: number) => prev > 0 ? prev - 1 : activeGalleryProject.photos.length - 1)}
                    className="absolute left-4 z-10 p-3 bg-black/40 hover:bg-teal-500 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                  >
                    <FaChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Swipeable Draggable Image */}
                  <motion.img
                    key={currentPhotoIndex}
                    src={activeGalleryProject.photos[currentPhotoIndex].url}
                    alt="Gallery View"
                    className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={(_, { offset }) => {
                      const swipeThreshold = 50;
                      if (offset.x < -swipeThreshold) {
                        // Swipe left -> Next
                        setCurrentPhotoIndex((prev: number) => prev < activeGalleryProject.photos.length - 1 ? prev + 1 : 0);
                      } else if (offset.x > swipeThreshold) {
                        // Swipe right -> Prev
                        setCurrentPhotoIndex((prev: number) => prev > 0 ? prev - 1 : activeGalleryProject.photos.length - 1);
                      }
                    }}
                  />

                  <button
                    onClick={() => setCurrentPhotoIndex((prev: number) => prev < activeGalleryProject.photos.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 z-10 p-3 bg-black/40 hover:bg-teal-500 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </button>

                  {/* Pagination Indicator */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    {currentPhotoIndex + 1} / {activeGalleryProject.photos.length}
                  </div>
                </div>

                {/* Dynamic Context Panel */}
                <div className="w-full bg-[#1c212a] border border-white/10 rounded-2xl p-6 mt-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg mb-2">Project Insight</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {activeGalleryProject.photos[currentPhotoIndex].caption}
                      </p>
                    </div>
                    <div className="md:w-1/3 bg-black/40 rounded-xl p-4 border border-white/5">
                      <h4 className="text-teal-400 font-bold text-sm mb-2 uppercase tracking-widest flex items-center gap-2">
                        Active Technologies
                      </h4>
                      <p className="text-gray-300 text-sm font-medium">
                        {activeGalleryProject.photos[currentPhotoIndex].tools}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )
        }
      </footer>
      <Analytics />
    </>
  );
}

// ==========================================
// DATA: FEATURED PROJECTS (Move outside component to prevent recreation)
// ==========================================
export const projectsData = [
  {
    id: "p0",
    title: "Agentic Workflow - AIGents",
    category: "Agentic AI",
    thumbnail: "/projects/Agentic Workflow - AIGents/AIGents.png",
    shortDesc: "The ultimate modular AI agent build powered by LangGraph, FastAPI, and SQLite. A state machine architecture that loops through problems until a high-confidence solution is found.",
    techStack: ["LangGraph", "FastAPI", "SQLite", "Python", "Docker", "Mermaid.js"],
    photos: [
      { url: "/projects/Agentic Workflow - AIGents/workflow_demo_recording.webp", caption: "Live walkthrough of the agentic reasoning loop from incident detection to resolution.", tools: "FastAPI, LangGraph" },
      { url: "/projects/Agentic Workflow - AIGents/AIGents.png", caption: "High-level overview of the AIGents platform and user interface.", tools: "UI/UX Design" },
      { url: "/projects/Agentic Workflow - AIGents/agent_invocation_demo.png", caption: "Demonstration of the agent being invoked via natural language trigger.", tools: "Natural Language Processing" },
      { url: "/projects/Agentic Workflow - AIGents/api_endpoint_details.png", caption: "Detailed API documentation for the agentic workflow endpoints.", tools: "FastAPI, Swagger" },
      { url: "/projects/Agentic Workflow - AIGents/data_schemas.png", caption: "Underlying data schemas managing the agent's memory and environment state.", tools: "SQLite, Pydantic" },
      { url: "/projects/Agentic Workflow - AIGents/swagger_ui.png", caption: "Interactive Swagger UI for testing agent tools and reasoning nodes.", tools: "FastAPI, OpenAPI" },
      { url: "/projects/Agentic Workflow - AIGents/redoc_interface.png", caption: "Clean, production-ready developer documentation for the AIGents ecosystem.", tools: "ReDoc" }
    ]
  },
  {
    id: "p0a",
    title: "Performance & Reliability Analysis of 4G-Based Flight Controllers in UAV Control",
    category: "Aerospace & IoT",
    thumbnail: "/projects/Conference Paper/1_main_photo.png",
    shortDesc: "Comprehensive study on the performance of UAV control systems via 4G LTE networks. Published in the 2025 International Conference on Converging Technology in Electrical and Information Engineering (ICCTEIE).",
    techStack: ["Cube Orange", "4G LTE", "MAVLink", "Mission Planner", "ArduPlot", "UAV Systems"],
    photos: [
      { url: "/projects/Conference Paper/1_main_photo.png", caption: "Official publication header for the IEEE Xplore conference paper.", tools: "IEEE Xplore, 2025 ICCTEIE" },
      { url: "/projects/Conference Paper/2_author.png", caption: "Published author list contributing to the research and development of the system.", tools: "Academic Publication" },
      { url: "/projects/Conference Paper/3_system.png", caption: "Architectural overview of the 4G-based flight controller and communication network.", tools: "Systems Engineering" },
      { url: "/projects/Conference Paper/4_celltowertracker.png", caption: "Mapping cell tower tracking and RSRP signal strength across urban and rural environments.", tools: "RF Engineering, GIS" },
      { url: "/projects/Conference Paper/5_missionplanner_videotransmission.png", caption: "Real-time video transmission and flight telemetry monitoring via Mission Planner.", tools: "Mission Planner, MAVLink" }
    ]
  },
  {
    id: "p0b",
    title: "Enterprise Price Intelligence Scraper",
    category: "Data Engineering",
    thumbnail: "/projects/Enterprise Price Intelligence Scraper/1_swagger_ui.png",
    shortDesc: "A production-grade, distributed web scraping pipeline for real-time e-commerce price tracking. Built with Scrapy, Playwright, Celery, FastAPI, PostgreSQL, and Redis.",
    techStack: ["Scrapy", "Playwright", "FastAPI", "PostgreSQL", "Redis", "Celery", "Docker"],
    photos: [
      { url: "/projects/Enterprise Price Intelligence Scraper/1_swagger_ui.png", caption: "Interactive API documentation (Swagger) for triggering and monitoring scraping tasks.", tools: "FastAPI, OpenAPI" },
      { url: "/projects/Enterprise Price Intelligence Scraper/2_categories_api.png", caption: "Categories summary endpoint providing real-time catalog metrics and distribution.", tools: "Python, REST API" },
      { url: "/projects/Enterprise Price Intelligence Scraper/3_products_api.png", caption: "Detailed product listing endpoint managing massive e-commerce datasets.", tools: "FastAPI, Pydantic" },
      { url: "/projects/Enterprise Price Intelligence Scraper/4_enriched_products.png", caption: "Demonstration of enriched JSON product data ready for analytical downstream consumption.", tools: "Data Engineering, JSON" },
      { url: "/projects/Enterprise Price Intelligence Scraper/5_pgadmin.png", caption: "Visual database view on pgAdmin monitoring thousands of indexed products and price histories.", tools: "PostgreSQL, pgAdmin" }
    ]
  },
  {
    id: "p1",
    title: "Mobile App - Otentikasi",
    category: "Mobile & AI",
    thumbnail: "/projects/Mobile App - Otentikasi/1_main_photo.webp",
    shortDesc: "An advanced mobile authentication application integrating cutting-edge computer vision for secure, frictionless user verification via facial recognition infrastructure.",
    techStack: ["React Native", "Firebase", "GCP Cloud Run", "Vertex AI", "TensorFlow"],
    photos: [
      { url: "/projects/Mobile App - Otentikasi/1_main_photo.webp", caption: "The main splash screen and secure login portal designed with a sleek, accessible mobile UI.", tools: "React Native, Tailwind CSS" },
      { url: "/projects/Mobile App - Otentikasi/2_ui.webp", caption: "User dashboard showing active authentication status and historical login records.", tools: "React Native, Firebase Auth" },
      { url: "/projects/Mobile App - Otentikasi/3_ui.webp", caption: "Secure facial mapping enrollment interface guiding the user through capturing precise biometric data.", tools: "React Native Camera, OpenCV" },
      { url: "/projects/Mobile App - Otentikasi/4_gcloud_workbench.webp", caption: "Backend infrastructure deployed on Google Cloud Vertex AI Workbench, handling the model training.", tools: "GCP Vertex AI, Python, Jupyter" },
      { url: "/projects/Mobile App - Otentikasi/5_gcloud_cloudrun.webp", caption: "Monitoring the serverless deployment architecture on GCP Cloud Run for instantaneous scaling.", tools: "GCP Cloud Run, Docker" },
      { url: "/projects/Mobile App - Otentikasi/6_gcloud_cloudbuild.webp", caption: "CI/CD pipelines configured via Cloud Build to instantly propagate biometric model updates.", tools: "GCP Cloud Build, Git" },
      { url: "/projects/Mobile App - Otentikasi/7_frbase_storage.webp", caption: "Securely partitioned Firebase Storage buckets managing encrypted facial dataset objects.", tools: "Firebase Storage, IAM Permissions" },
      { url: "/projects/Mobile App - Otentikasi/8_frbase_rtdb.webp", caption: "Real-time database handling instant verification state syncs across devices.", tools: "Firebase RTDB, NoSQL" },
      { url: "/projects/Mobile App - Otentikasi/9_detection.webp", caption: "Live facial bounding box rendering detecting user presence in the frame.", tools: "Computer Vision, TensorFlow Lite" },
      { url: "/projects/Mobile App - Otentikasi/10_detection.webp", caption: "Successful geometric facial validation matching real-time feed against registered vectors.", tools: "FaceNet, Euclidean Distance Logic" },
      { url: "/projects/Mobile App - Otentikasi/11_acc.webp", caption: "Training metrics showing the machine learning model achieving over 98% validation accuracy.", tools: "Matplotlib, TensorBoard" },
      { url: "/projects/Mobile App - Otentikasi/12_loss.webp", caption: "Systematic reduction in training loss demonstrating a highly refined, convergent neural network.", tools: "Keras, Python" },
      { url: "/projects/Mobile App - Otentikasi/13_conf_matrix.webp", caption: "Confusion matrix proving exceptional precision and negligible false-positive authentication rates.", tools: "Scikit-Learn, Seaborn" },
      { url: "/projects/Mobile App - Otentikasi/14_Result.webp", caption: "The final production verification screen confirming a secure, successful login attempt.", tools: "React Native UI" },
    ]
  },
  {
    id: "p2",
    title: "PLC Warehouse Traffic Control",
    category: "Automation System",
    thumbnail: "/projects/PLC Programming - Warehouse Traffic Control for Multiple Height Sorting/1_photo_main.webp",
    shortDesc: "A complete PLC-driven automation system simulating complex warehouse traffic control, specifically engineered for routing and sorting variable-height cargo.",
    techStack: ["CX-Programmer", "Factory I/O", "OPC Server", "Ladder Logic", "SCADA Principles"],
    photos: [
      { url: "/projects/PLC Programming - Warehouse Traffic Control for Multiple Height Sorting/1_photo_main.webp", caption: "Overview of the Factory I/O 3D environment simulating the physical warehouse conveyor layout.", tools: "Factory I/O" },
      { url: "/projects/PLC Programming - Warehouse Traffic Control for Multiple Height Sorting/2_factoriio.webp", caption: "Detailed view of the junction sorting mechanism handling varied box elevations.", tools: "Factory I/O Proximity Sensors" },
      { url: "/projects/PLC Programming - Warehouse Traffic Control for Multiple Height Sorting/3_factoriio.webp", caption: "Observation of the pneumatic pusher arrays diverting cargo based on system logic.", tools: "Factory I/O Pushers, Conveyor Logic" },
      { url: "/projects/PLC Programming - Warehouse Traffic Control for Multiple Height Sorting/4_cxdesigner.webp", caption: "HMI (Human Machine Interface) screen designed for operators to monitor and override traffic nodes.", tools: "OMRON CX-Designer" },
      { url: "/projects/PLC Programming - Warehouse Traffic Control for Multiple Height Sorting/6_opcserver.webp", caption: "Configuring the OPC server network architecture to bridge the simulation and logic layers.", tools: "OPC Client/Server Protocol" },
      { url: "/projects/PLC Programming - Warehouse Traffic Control for Multiple Height Sorting/7_opcserver.png.webp", caption: "Live tag monitoring within the OPC gateway verifying flawless data transmission.", tools: "Kepware / OPC Core Components" },
      { url: "/projects/PLC Programming - Warehouse Traffic Control for Multiple Height Sorting/8_cxprogrammer.webp", caption: "Core ladder logic structuring the rigid state machine that prevents traffic collisions.", tools: "OMRON CX-Programmer, Ladder Logic" },
      { url: "/projects/PLC Programming - Warehouse Traffic Control for Multiple Height Sorting/9_cxprogrammer.webp", caption: "Live online debugging of the PLC rungs actively tracking sensor inputs and coil outputs.", tools: "CX-Programmer Online Mode" }
    ]
  },
  {
    id: "p3",
    title: "Website - Pure Vision",
    category: "Web & AI Integration",
    thumbnail: "/projects/Website - Pure Vision/1_main_photo.webp",
    shortDesc: "A sleek, responsive web application serving as a front-end portal for an advanced image processing algorithm. Users upload media to see immediate analytical results.",
    techStack: ["Web Frontend", "Cloud Deployment", "Image Processing API", "Responsive CSS"],
    photos: [
      { url: "/projects/Website - Pure Vision/1_main_photo.webp", caption: "The ultra-modern landing page grabbing user attention with dynamic hero graphics.", tools: "HTML/CSS, JavaScript" },
      { url: "/projects/Website - Pure Vision/2_upload_landingpage.webp", caption: "The intuitive drag-and-drop upload portal designed for seamless user interaction.", tools: "Frontend File API, Axios" },
      { url: "/projects/Website - Pure Vision/3_result.webp", caption: "AI processing output demonstrating extreme clarity enhancement on a blurry reference image.", tools: "Python Backend, OpenCV, UI Integration" },
      { url: "/projects/Website - Pure Vision/4_result.webp", caption: "Before and After sliding comparison tool showcasing the algorithm's noise reduction capabilities.", tools: "Custom JS Sliders, Image Processing" },
      { url: "/projects/Website - Pure Vision/5_result.webp", caption: "Final high-resolution output generated by the backend and perfectly rendered in the browser UI.", tools: "Web Servers, REST APIs" }
    ]
  },
  {
    id: "p4",
    title: "Excel Dashboard Structure: Stunting Target Data",
    category: "Data Analytics",
    thumbnail: "/projects/Excel Management - Dashboard Stunting Data/1_main_photo.webp",
    shortDesc: "Comprehensive data visualization dashboards built in Excel to track, project, and analyze critical stunting health metrics across various demographics.",
    techStack: ["Microsoft Excel", "Pivot Tables", "VLOOKUP/INDEX-MATCH", "Conditional Formatting", "Data Validation"],
    photos: [
      { url: "/projects/Excel Management - Dashboard Stunting Data/1_main_photo.webp", caption: "A massive, macro-enabled dashboard correlating complex regional health datasets into actionable, readable charts and graphs.", tools: "Excel Pivot Charts, Slicers, Data Models" }
    ]
  },
  {
    id: "p5",
    title: "Excel Corporate Performance Tracker",
    category: "Data Analytics",
    thumbnail: "/projects/Excel Management - Company Monthly Performance Tracker/1_main_photo.webp",
    shortDesc: "Automated, enterprise-grade monthly performance tracking system. Replaced manual reporting with dynamic lookup functions and live macro execution.",
    techStack: ["Microsoft Excel", "VBA Macros", "Financial Modeling", "Data Normalization"],
    photos: [
      { url: "/projects/Excel Management - Company Monthly Performance Tracker/1_main_photo.webp", caption: "The primary executive summary sheet pulling performance metrics autonomously from raw internal dumps.", tools: "Advanced Excel Formulas" },
      { url: "/projects/Excel Management - Company Monthly Performance Tracker/2.webp", caption: "Detailed monthly breakdown sheet enforcing strict data validation to prevent data entry errors.", tools: "Data Validation, Conditional Logic" }
    ]
  },
  {
    id: "p6",
    title: "Personal Portfolio Website",
    category: "Web & UI/UX Design",
    thumbnail: "/projects/Personal Portfolio/1_hero_section.webp",
    shortDesc: "The very application you are viewing right now! A highly optimized, responsive React portfolio built from the ground up featuring futuristic animations and dynamic filtering.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "react-icons"],
    photos: [
      { url: "/projects/Personal Portfolio/1_hero_section.webp", caption: "The dynamic Hero section featuring a glassmorphic aesthetic, glowing hover states, and smooth gradients.", tools: "Tailwind CSS, React" },
      { url: "/projects/Personal Portfolio/2_about_section.webp", caption: "The 'About Me' section detailing professional history and educational background with refined typography.", tools: "Semantic HTML, Responsive Design" },
      { url: "/projects/Personal Portfolio/3_experience_section.webp", caption: "An interactive timeline and media gallery showcasing high-level internships and professional experience.", tools: "CSS Grid, React State" },
      { url: "/projects/Personal Portfolio/4_skills_section.webp", caption: "The massive 'Skills Engine' displaying over 40 distinct technologies logically categorized with custom vector icons.", tools: "react-icons, Array Mapping" },
      { url: "/projects/Personal Portfolio/5_projects_section.webp", caption: "This exact 'Featured Projects' layout. A complex master-detail view managing dynamic data rendering and global modal states.", tools: "React Context/State, Z-Index Modals" }
    ]
  }
];

export default App;
