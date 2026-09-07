import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { Footer } from './components/Footer';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('humid1_theme') as 'dark' | 'light' | null;
    if (saved === 'dark' || saved === 'light') return saved;

    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (prefersDark) return 'dark';
      if (prefersLight) return 'light';
    }
    return 'dark'; // Default to dark mode
  });

  // Sync theme with document element and storage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Dynamically follow host system changes if no explicit user preference is saved
  useEffect(() => {
    const saved = localStorage.getItem('humid1_theme');
    if (saved) return;

    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('humid1_theme', nextTheme);
      return nextTheme;
    });
  };

  const handleNavigateHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen w-full flex flex-col font-mono relative transition-colors duration-150 ${
        isDark
          ? 'bg-[#09090b] text-[#f4f4f5] selection:bg-zinc-100 selection:text-black'
          : 'bg-[#fafafa] text-[#18181b] selection:bg-black selection:text-white'
      }`}
    >
      {/* Background Dot Array Layer */}
      <div
        id="bg-dot-matrix"
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-0 ${
          isDark ? 'bg-dot-grid-dark opacity-75' : 'bg-dot-grid-light opacity-80'
        }`}
      />

      {/* Top Navigation */}
      <div className="relative z-10">
        <Navigation
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigateHome={handleNavigateHome}
        />
      </div>

      {/* Main View */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center w-full">
        <HomeView theme={theme} />
      </main>

      {/* Global Footer */}
      <div className="relative z-10 mt-auto">
        <Footer theme={theme} />
      </div>
    </div>
  );
}
