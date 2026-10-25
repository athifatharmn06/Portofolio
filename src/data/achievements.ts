import type { ProjectData } from '../types';

export interface Achievement {
  id: string;
  title: string;
  year: string;
  category: string;
  /** Role held in the team */
  role: string;
  /** Team, division and location */
  team: string;
  /** Job description: what I was responsible for */
  description: string;
  /** Final result, shown as a highlighted badge at the bottom of the card */
  outcome: string;
  thumbnail: string;
  /** Short looping takeoff clip that plays on hover */
  clip: { src: string; poster: string; portrait?: boolean };
  photos: ProjectData['photos'];
}

export const achievementsData: Achievement[] = [
  {
    id: 'a3',
    title: 'TEKNOFEST 2026',
    year: '2026',
    category: 'International UAV Competition, Fixed Wing Category',
    role: 'Team Responsible & Lead Programmer',
    team: 'Team Avalerion APTRG, Telkom University | Malatya, Türkiye',
    description:
      "Led flight software and autonomous mission planning for Telkom University's fixed-wing UAV at the TÜBİTAK competition, and coordinated technical milestones, hardware integration and deliverables to the international committee.",
    outcome: 'International Finalist',
    thumbnail: '/achievements/teknofest-2026/1.webp',
    clip: {
      src: '/achievements/teknofest-2026/takeoff.mp4',
      poster: '/achievements/teknofest-2026/takeoff_poster.webp',
      portrait: true,
    },
    photos: [
      { url: '/achievements/teknofest-2026/takeoff.mp4', poster: '/achievements/teknofest-2026/takeoff_poster.webp', caption: 'Takeoff on the runway in Malatya.', tools: 'TEKNOFEST 2026, Fixed Wing' },
      { url: '/achievements/teknofest-2026/1.webp', caption: 'The team in front of the TEKNOFEST UAV competition backdrop with our aircraft.', tools: 'TEKNOFEST 2026' },
      { url: '/achievements/teknofest-2026/2.webp', caption: 'Holding the aircraft at the competition venue.', tools: 'Fixed-wing UAV' },
      { url: '/achievements/teknofest-2026/3.webp', caption: 'The team at our stand with the Indonesian flag and Telkom University banners.', tools: 'Team Avalerion APTRG' },
    ],
  },
  {
    id: 'a2',
    title: 'KRTI 2025',
    year: '2025',
    category: 'Racing Plane Division',
    role: 'Technical Supervisor & Lead Programmer',
    team: 'Team Frigate APTRG | KRTI, Padang, Indonesia',
    description:
      'Led technical coordination across the multidisciplinary team, maintained autopilot scripts, ran telemetry integration tests and resolved hardware failures in the field.',
    outcome: 'National Top 8',
    thumbnail: '/achievements/krti-2025/3.webp',
    clip: {
      src: '/achievements/krti-2025/takeoff.mp4',
      poster: '/achievements/krti-2025/takeoff_poster.webp',
    },
    photos: [
      { url: '/achievements/krti-2025/takeoff.mp4', poster: '/achievements/krti-2025/takeoff_poster.webp', caption: 'Catapult launch of the racing plane.', tools: 'KRTI 2025, Racing Plane' },
      { url: '/achievements/krti-2025/3.webp', caption: 'Telkom University contingent in front of the team bus.', tools: 'KRTI 2025' },
      { url: '/achievements/krti-2025/2.webp', caption: 'The team at the competition venue.', tools: 'Team Frigate APTRG' },
      { url: '/achievements/krti-2025/1.webp', caption: 'Catapult launch on the runway.', tools: 'Racing Plane' },
    ],
  },
  {
    id: 'a1',
    title: 'KRTI 2024',
    year: '2024',
    category: 'Long Endurance Low Altitude (LELA)',
    role: 'Data Systems Programmer & Telemetry',
    team: 'Team Strix APTRG | KRTI, DI Yogyakarta, Indonesia',
    description:
      'Built RF and 4G-LTE telemetry pipelines with store-and-forward cloud messaging for long-endurance autonomous flight.',
    outcome: 'Finalist',
    thumbnail: '/achievements/krti-2024/2.webp',
    clip: {
      src: '/achievements/krti-2024/takeoff.mp4',
      poster: '/achievements/krti-2024/takeoff_poster.webp',
      portrait: true,
    },
    photos: [
      { url: '/achievements/krti-2024/takeoff.mp4', poster: '/achievements/krti-2024/takeoff_poster.webp', caption: 'Launch of the long-endurance aircraft.', tools: 'KRTI 2024, LELA' },
      { url: '/achievements/krti-2024/3.webp', caption: 'The full team lined up with the aircraft.', tools: 'Team Strix APTRG' },
      { url: '/achievements/krti-2024/2.webp', caption: 'Team photo with the flying-wing aircraft.', tools: 'KRTI 2024' },
      { url: '/achievements/krti-2024/1.webp', caption: 'Team and aircraft on the airfield before the flight.', tools: 'Long Endurance Low Altitude' },
    ],
  },
];
