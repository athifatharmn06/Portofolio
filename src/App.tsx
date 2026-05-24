import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { SECTION_IDS } from './lib/constants';

// Layout components
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import SectionDivider from './components/layout/SectionDivider';
import Footer from './components/layout/Footer';

// Section components
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ExperienceSection from './components/sections/ExperienceSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';

// UI components
import GalleryModal from './components/ui/GalleryModal';

// Types
import type { ProjectData } from './types';

/**
 * Root application orchestrator.
 *
 * Manages:
 * - Gallery modal state (which project is selected)
 * - Mobile menu open/close state
 * - Theme via useTheme hook
 * - Active section via useScrollSpy hook
 *
 * Renders all section components in order with dividers between them.
 */
export default function App() {
  // Theme state
  const { isDark, toggleTheme } = useTheme();

  // Scroll-spy for active section (passed to MobileMenu)
  const { activeSection } = useScrollSpy({ sectionIds: [...SECTION_IDS] });

  // Gallery modal state
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenGallery = useCallback((project: ProjectData) => {
    setSelectedProject(project);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Navigation */}
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} />

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        activeSection={activeSection}
        onToggleTheme={toggleTheme}
        isDark={isDark}
      />

      {/* Main content */}
      <main>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsSection onOpenGallery={handleOpenGallery} />
        <SectionDivider />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Gallery modal — conditionally rendered with exit animation */}
      <AnimatePresence>
        {selectedProject && (
          <GalleryModal
            project={selectedProject}
            onClose={handleCloseGallery}
          />
        )}
      </AnimatePresence>
    </>
  );
}
