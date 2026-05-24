import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { createElement } from 'react';
import type { SocialLink } from '../types';

// Helper to create icon elements without JSX (allows .ts file)
const icon = (component: React.ComponentType<{ className?: string }>, className?: string) =>
  createElement(component, { className });

export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/athif-fadheel-atharahman-1a3353245/',
    icon: icon(FaLinkedin, 'w-6 h-6'),
    hoverColor: '#0077b5',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/athifatharmn/',
    icon: icon(FaInstagram, 'w-6 h-6'),
    hoverColor: '#E4405F',
  },
  {
    platform: 'Email',
    url: 'mailto:athifadheel@gmail.com',
    icon: icon(FaEnvelope, 'w-6 h-6'),
    hoverColor: '#EA4335',
  },
];
