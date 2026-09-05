import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { Footer } from './components/Footer';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('humid1_theme') as 'dark' | 'light') || 'light';
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
    localStorage.setItem('humid1_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
