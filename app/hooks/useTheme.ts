// hooks/useTheme.ts
import { useState, useEffect } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState<string>(() => {
    // Get theme from localStorage or default to 'light'
    if (typeof window !== "undefined") {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply the dark mode class based on the theme state
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
