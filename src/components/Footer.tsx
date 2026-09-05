import React from 'react';

interface FooterProps {
  theme: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer
      id="main-footer"
      className={`w-full border-t transition-colors duration-150 py-6 sm:py-8 px-4 sm:px-8 mt-auto ${
        isDark
          ? 'border-zinc-800 bg-[#09090b] text-zinc-300'
          : 'border-zinc-300 bg-white text-zinc-700'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
        
        {/* Brand & Build Tag */}
        <div className="flex flex-col items-center lg:items-start gap-0.5">
          <span className="font-mono text-base font-black tracking-tight uppercase text-zinc-900 dark:text-white">
            HUMID1_OS
          </span>
          <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            v2.5.0 STABLE • ESP32-S3-ePaper-1.54
          </span>
        </div>

        {/* Hyperlinks without weird underscores */}
        <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-7 gap-y-2.5 text-xs font-mono font-medium">
          <a
            id="footer-access-link"
            href="https://dash.humid1.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:underline transition-colors"
          >
            Dashboard
          </a>

          <a
            id="footer-chat-link"
            href="https://chat.humid1.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:underline transition-colors"
          >
            Maker Chat
          </a>

          <a
            id="footer-terms-link"
            href="/legal.html?doc=terms"
            className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:underline transition-colors"
          >
            Terms of Use
          </a>

          <a
            id="footer-privacy-link"
            href="/legal.html?doc=privacy"
            className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:underline transition-colors"
          >
            Privacy Policy
          </a>

          <a
            id="footer-community-link"
            href="/legal.html?doc=community"
            className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:underline transition-colors"
          >
            Community Guidelines
          </a>

          <a
            id="footer-github-link"
            href="https://github.com/Humidyne-Labs/HUMID1_OS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:underline transition-colors"
          >
            GitHub Repository
          </a>
        </div>

        {/* Copyright */}
        <div className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 text-center lg:text-right">
          © 2026 Humidyne-Labs. Open Source Hardware.
        </div>

      </div>
    </footer>
  );
};
