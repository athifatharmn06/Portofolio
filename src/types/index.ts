import type { ReactNode } from 'react';

export interface PhotoContext {
  url: string;
  caption: string;
  tools: string;
}

export interface ProjectData {
  id: string;
  title: string;
  shortDesc: string;
  category: string;
  techStack: string[];
  thumbnail: string;
  photos: PhotoContext[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillData {
  name: string;
  icon: ReactNode;
  level: 'expert' | 'intermediate' | 'familiar';
  yearsOfExperience?: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: ReactNode;
  accentColor: string;
  skills: SkillData[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: ReactNode;
  hoverColor: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export type Theme = 'light' | 'dark';
