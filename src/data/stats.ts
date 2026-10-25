import type { StatItem } from '../types';
import { projectsData } from './projects';

export const stats: StatItem[] = [
  { label: 'Projects Completed', value: projectsData.length, suffix: '' },
  { label: 'Technologies Mastered', value: 60, suffix: '+' },
];
