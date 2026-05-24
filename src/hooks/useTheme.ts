import { useState, useCallback, useEffect } from 'react';
import type { Theme } from '../types';

const STORAGE_KEY = 'color-theme';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

/**
 * Reads the initial theme from localStorage or system preference.
 * Falls back to 'dark' if no preference is found.
 */
function getInitialTheme(): Theme {
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  // Fall back to system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

/**
 * Applies the theme class to the document root element.
 */
function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Custom hook for managing dark/light theme.
 *
 * - Reads initial theme from localStorage key `color-theme` or system preference
 * - Applies/removes `dark` class on `document.documentElement`
 * - Persists selection to localStorage
 * - Returns `{ theme, toggleTheme, isDark }`
 */
export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply theme class on mount and whenever theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}
