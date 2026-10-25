import type { ProjectData } from '../types';

export interface Achievement {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  thumbnail: string;
  photos: ProjectData['photos'];
}

export const achievementsData: Achievement[] = [
  {
    id: 'a3',
    title: 'Teknofest 2026',
    year: '2026',
    category: 'International UAV Competition',
    description:
      'Competed at Teknofest in the Güneydoğu (Southeast) edition, one of the largest aerospace and technology festivals in the world, in the unmanned aerial vehicle (İnsansız Hava Aracı) competition.',
    thumbnail: '/achievements/teknofest-2026/1.webp',
    photos: [
      { url: '/achievements/teknofest-2026/1.webp', caption: 'Team photo in front of the Teknofest UAV competition backdrop with our fixed-wing aircraft.', tools: 'Teknofest 2026, UAV Competition' },
      { url: '/achievements/teknofest-2026/2.webp', caption: 'Holding the aircraft at the competition venue.', tools: 'Fixed-wing UAV' },
      { url: '/achievements/teknofest-2026/3.webp', caption: 'The team at our pit stand with the Indonesian flag and Telkom University banners.', tools: 'Telkom University' },
    ],
  },
  {
    id: 'a2',
    title: 'KRTI 2025',
    year: '2025',
    category: 'Racing Plane',
    description:
      'Participated in the Indonesian Flying Robot Contest (Kontes Robot Terbang Indonesia) in the Racing Plane category.',
    thumbnail: '/achievements/krti-2025/1.webp',
    photos: [
      { url: '/achievements/krti-2025/1.webp', caption: 'Catapult launch of the racing plane on the runway.', tools: 'KRTI 2025, Racing Plane' },
      { url: '/achievements/krti-2025/2.webp', caption: 'Team photo at the competition venue.', tools: 'KRTI 2025' },
      { url: '/achievements/krti-2025/3.webp', caption: 'Telkom University contingent in front of the team bus.', tools: 'Telkom University' },
    ],
  },
  {
    id: 'a1',
    title: 'KRTI 2024',
    year: '2024',
    category: 'Long Endurance Low Altitude',
    description:
      'Participated in the Indonesian Flying Robot Contest (Kontes Robot Terbang Indonesia) in the Long Endurance Low Altitude category.',
    thumbnail: '/achievements/krti-2024/2.webp',
    photos: [
      { url: '/achievements/krti-2024/2.webp', caption: 'Team photo with the flying-wing aircraft.', tools: 'KRTI 2024, Long Endurance Low Altitude' },
      { url: '/achievements/krti-2024/1.webp', caption: 'Team and aircraft on the airfield before the flight.', tools: 'KRTI 2024' },
      { url: '/achievements/krti-2024/3.webp', caption: 'Full team lined up with the aircraft.', tools: 'KRTI 2024' },
    ],
  },
];
