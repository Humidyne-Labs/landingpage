import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface NavigationProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigateHome: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  theme,
  onToggleTheme,
  onNavigateHome,
}) => {
  const isDark = theme === 'dark';

  return (
    <nav
      id="main-navigation"
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-150 ${
        isDark
          ? 'border-zinc-800 bg-[#09090b]/95 text-zinc-100'
          : 'border-zinc-300 bg-white/95 text-zinc-900'
      } backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 min-h-16 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & Repo */}
        <div className="flex items-center gap-4">
          <button
            id="brand-logo-btn"
            onClick={onNavigateHome}
            className="text-xl sm:text-2xl font-black tracking-tighter uppercase hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2"
          >
            <span>HUMID1_OS</span>
          </button>
          
          <div className="hidden md:flex items-center ml-4">
            <a
              id="nav-github-link"
              href="https://github.com/Humidyne-Labs/HUMID1_OS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase font-mono tracking-wider opacity-70 hover:opacity-100 px-2 py-1 transition-all"
            >
              GITHUB REPO
            </a>
          </div>
        </div>

        {/* Action Controls - Black buttons with 1 White button of importance */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <a
            id="nav-contribute-btn"
            href="https://tools.signupgenius.com/c/support-humid1-project"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center shrink-0 text-xs uppercase font-mono font-bold px-2.5 sm:px-4 py-1.5 border transition-all ${
              isDark
                ? 'bg-black text-zinc-200 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'
                : 'bg-white text-zinc-900 border-zinc-400 hover:border-black hover:bg-zinc-100'
            }`}
          >
            CONTRIBUTE
          </a>

          {/* Primary Button of Importance (White in Dark Mode, Black in Light Mode) */}
          <a
            id="nav-access-btn"
            href="https://dash.humid1.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center shrink-0 text-xs uppercase font-mono font-bold px-2.5 sm:px-4 py-1.5 border transition-all ${
              isDark
                ? 'bg-white text-black border-white hover:bg-zinc-200'
                : 'bg-black text-white border-black hover:bg-zinc-800'
            }`}
          >
            ACCESS
          </a>

          <a
            id="nav-chat-btn"
            href="https://chat.humid1.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center shrink-0 text-xs uppercase font-mono font-bold px-2.5 sm:px-4 py-1.5 border transition-all ${
              isDark
                ? 'bg-black text-zinc-200 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'
                : 'bg-white text-zinc-900 border-zinc-400 hover:border-black hover:bg-zinc-100'
            }`}
          >
            CHAT
          </a>

          <a
            id="nav-register-btn"
            href="https://auth.humid1.com/if/flow/default-enrollment-flow/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center shrink-0 text-xs uppercase font-mono font-bold px-2.5 sm:px-4 py-1.5 border transition-all ${
              isDark
                ? 'bg-black text-zinc-200 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'
                : 'bg-white text-zinc-900 border-zinc-400 hover:border-black hover:bg-zinc-100'
            }`}
          >
            REGISTER
          </a>

          {/* Theme Toggle */}
          <button
            id="nav-theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className={`inline-flex items-center justify-center shrink-0 h-[30px] w-[30px] border transition-all cursor-pointer ml-1 ${
              isDark
                ? 'bg-black text-zinc-200 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'
                : 'bg-white text-zinc-900 border-zinc-400 hover:border-black hover:bg-zinc-100'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </nav>
  );
};
