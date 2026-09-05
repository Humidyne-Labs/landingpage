import React, { useState, useEffect } from 'react';
import {
  Droplets,
  MessageSquare,
  Github,
  ArrowUpRight,
  Copy,
  Check,
  Zap,
  Radio,
  ExternalLink,
  Lock,
  FileCode,
  Code2,
  RefreshCw
} from 'lucide-react';
import { INO_FIRMWARE, HARDWARE_SPECS } from '../data/firmwareCode';

const GITHUB_RAW_CANDIDATE_URLS = [
  'https://raw.githubusercontent.com/Humidyne-Labs/HUMID1_OS/main/Source_Code/arduino/HUMID1_OS/HUMID1_OS.ino',
  'https://raw.githubusercontent.com/Humidyne-Labs/HUMID1_OS/main/HUMID1_OS.ino',
  'https://raw.githubusercontent.com/Humidyne-Labs/HUMID1_OS/master/Source_Code/arduino/HUMID1_OS/HUMID1_OS.ino'
];

interface HomeViewProps {
  theme: 'dark' | 'light';
}

export const HomeView: React.FC<HomeViewProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState<boolean>(false);
  const [firmwareCode, setFirmwareCode] = useState<string>(INO_FIRMWARE.content);
  const [syncStatus, setSyncStatus] = useState<'loading' | 'live' | 'fallback'>('loading');
  const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);

  const fetchLiveIno = async () => {
    setSyncStatus('loading');
    const timestamp = Date.now();
    
    for (const url of GITHUB_RAW_CANDIDATE_URLS) {
      try {
        const response = await fetch(`${url}?t=${timestamp}`);
        if (response.ok) {
          const text = await response.text();
          if (text && text.trim().length > 0) {
            setFirmwareCode(text);
            setSyncStatus('live');
            setLastFetchedAt(new Date().toLocaleTimeString());
            return;
          }
        }
      } catch {
        // Try next candidate URL
      }
    }

    // Fallback to static snapshot if all remote fetches fail
    setFirmwareCode(INO_FIRMWARE.content);
    setSyncStatus('fallback');
  };

  useEffect(() => {
    fetchLiveIno();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(firmwareCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-16 w-full max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16 font-mono">
      
      {/* HERO SECTION */}
      <section id="hero-section" className="flex flex-col items-start gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-12 sm:pb-16">
        
        {/* Release Pill & System Tag */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="px-2.5 py-1 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            HUMID1-OS v2.5.0 STABLE
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 text-xs">
            // ULTRA-LOW-POWER IOT HYDROMETER FOR CIGAR HUMIDORS
          </span>
        </div>

        {/* Main Title */}
        <div className="flex flex-col gap-3 max-w-4xl">
          <h1
            id="hero-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[1.08] text-zinc-950 dark:text-white"
          >
            PRECISION CLIMATE TELEMETRY &amp; E-PAPER HYDROMETER
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            An ultra-low-power, cloud-integrated operating stack engineered for the off-the-shelf <span className="font-bold text-zinc-900 dark:text-zinc-200">ESP32-S3-ePaper-1.54</span> development kit. Built for precision cigar and tobacco humidor monitoring with zero-touch lifecycle, Sensirion SHTC3 acquisition, Bluetooth provisioning, and ThingsBoard IoT telemetry.
          </p>
        </div>

        {/* Primary Action Buttons - Black buttons with 1 White button of importance */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Main button of importance (White in dark mode, Black in light mode) */}
          <a
            id="hero-launch-app-btn"
            href="https://dash.humid1.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-xs uppercase font-bold px-5 py-2.5 border transition-all ${
              isDark
                ? 'bg-white text-black border-white hover:bg-zinc-200'
                : 'bg-black text-white border-black hover:bg-zinc-800'
            }`}
          >
            <span>DASHBOARD</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            id="hero-maker-chat-btn"
            href="https://chat.humid1.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-xs uppercase font-bold px-5 py-2.5 border transition-all ${
              isDark
                ? 'bg-black text-zinc-200 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'
                : 'bg-white text-zinc-900 border-zinc-400 hover:border-black hover:bg-zinc-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>COMMUNITY CHAT</span>
          </a>

          <a
            id="hero-github-btn"
            href="https://github.com/Humidyne-Labs/HUMID1_OS"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-xs uppercase font-bold px-5 py-2.5 border transition-all ${
              isDark
                ? 'bg-black text-zinc-200 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'
                : 'bg-white text-zinc-900 border-zinc-400 hover:border-black hover:bg-zinc-100'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>GITHUB REPOSITORY</span>
          </a>
        </div>
      </section>

      {/* HARDWARE ARCHITECTURE & BLUEPRINT */}
      <section id="hardware-architecture" className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <span className="text-xs uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
            OFF-THE-SHELF HARDWARE SPECIFICATION
          </span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            [ESP32-S3-ePaper-1.54]
          </span>
        </div>

        {/* Specification Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {HARDWARE_SPECS.map((spec, idx) => (
            <div
              key={idx}
              className={`p-4 border transition-colors flex flex-col justify-between ${
                isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-white'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
                  {spec.category}
                </span>
                <h4 className="text-sm font-bold uppercase text-zinc-900 dark:text-zinc-100 mb-1.5">
                  {spec.name}
                </h4>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2 border-t border-zinc-200 dark:border-zinc-800/80 pt-2">
                {spec.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE OPERATIONAL WORKFLOW */}
      <section id="system-workflow" className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <span className="text-xs uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
            ZERO-TOUCH OPERATIONAL LIFECYCLE
          </span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            [AUTONOMOUS LOOP]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Phase 1: First Boot & BLE */}
          <div className={`p-5 border transition-colors ${
            isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-white'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900">
                PHASE 01
              </span>
              <Radio className="w-4 h-4 text-zinc-500" />
            </div>
            <h3 className="text-sm font-bold uppercase mb-2 text-zinc-900 dark:text-zinc-100">
              BLE Provisioning &amp; Auto-Discovery
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              3-second button hold enters BLE pairing mode. The hydrometer advertises to the ThingsBoard tenant and is claimed securely via hardware serial or a random on-screen PIN.
            </p>
          </div>

          {/* Phase 2: Steady-State Deep Sleep Loop */}
          <div className={`p-5 border transition-colors ${
            isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-white'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900">
                PHASE 02
              </span>
              <Droplets className="w-4 h-4 text-zinc-500" />
            </div>
            <h3 className="text-sm font-bold uppercase mb-2 text-zinc-900 dark:text-zinc-100">
              SHTC3 Sensor &amp; 1.54&quot; E-Paper Update
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Wakes on configured duty cycle (5m, 15m, 30m, 1h), powers Sensirion SHTC3 rail, measures %RH &amp; Temperature, and renders a static full-screen refresh to the e-Paper panel.
            </p>
          </div>

          {/* Phase 3: Telemetry Stream & Sleep */}
          <div className={`p-5 border transition-colors ${
            isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-white'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900">
                PHASE 03
              </span>
              <Zap className="w-4 h-4 text-zinc-500" />
            </div>
            <h3 className="text-sm font-bold uppercase mb-2 text-zinc-900 dark:text-zinc-100">
              ThingsBoard Ingestion &amp; Power Gating
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Transmits JSON telemetry via MQTT, checks for remote attribute updates (C/F toggle, duty cycle, chimes), isolates sensor power rails, and re-enters ultra-low-power deep sleep.
            </p>
          </div>

        </div>
      </section>

      {/* REPOSITORY CODE VIEWER & .INO INTEGRATION */}
      <section id="firmware-repository-viewer" className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-zinc-500" />
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
              FIRMWARE SOURCE (.INO)
            </span>
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            [HUMIDITRON / HUMID1_OS]
          </span>
        </div>

        <div className={`border transition-colors ${
          isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-white'
        }`}>
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-zinc-200 dark:border-zinc-800 p-2.5 gap-2 bg-zinc-100 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase font-bold px-3 py-1.5 bg-zinc-900 text-white dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-700 dark:border-zinc-800 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5" />
                <span>{INO_FIRMWARE.name}</span>
              </span>
              
              {/* Live GitHub Sync Status Indicator */}
              {syncStatus === 'live' && (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold px-2 py-1 border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>LIVE GITHUB SYNC</span>
                  {lastFetchedAt && <span className="opacity-70 font-normal">({lastFetchedAt})</span>}
                </span>
              )}
              {syncStatus === 'loading' && (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold px-2 py-1 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>SYNCING FROM GITHUB...</span>
                </span>
              )}
              {syncStatus === 'fallback' && (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold px-2 py-1 border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400">
                  <span>OFFLINE SNAPSHOT</span>
                </span>
              )}
            </div>

            {/* Actions: Refresh, Direct GitHub Link & Copy */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                id="refresh-firmware-btn"
                onClick={fetchLiveIno}
                title="Fetch latest commit from GitHub main branch"
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-black text-zinc-200 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'
                    : 'bg-white text-zinc-900 border-zinc-400 hover:border-black hover:bg-zinc-100'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'loading' ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">REFRESH</span>
              </button>

              <a
                id="view-on-github-link"
                href={INO_FIRMWARE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 border transition-all ${
                  isDark
                    ? 'bg-black text-zinc-200 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'
                    : 'bg-white text-zinc-900 border-zinc-400 hover:border-black hover:bg-zinc-100'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>OPEN IN GITHUB</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <button
                id="copy-firmware-code-btn"
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-black text-zinc-200 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'
                    : 'bg-white text-zinc-900 border-zinc-400 hover:border-black hover:bg-zinc-100'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY CODE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* File Metadata Header */}
          <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/30 flex flex-col sm:flex-row justify-between sm:items-center gap-1 text-[11px] text-zinc-600 dark:text-zinc-400">
            <div>
              <span className="font-bold text-zinc-900 dark:text-zinc-200">PATH:</span> {INO_FIRMWARE.path}
            </div>
            <div className="opacity-80">
              {INO_FIRMWARE.description}
            </div>
          </div>

          {/* Code Body */}
          <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] leading-relaxed font-mono select-text bg-[#f8f9fa] dark:bg-[#0c0c0e] max-h-[500px] overflow-y-auto">
            <pre className="text-zinc-900 dark:text-zinc-200 font-mono">
              <code>{firmwareCode}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* SERVICE DIRECTORY GRID */}
      <section id="services-directory" className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <span className="text-xs uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
            NETWORK SERVICES &amp; ACCESS
          </span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            [PRODUCTION DOMAINS]
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* App Dashboard */}
          <a
            id="service-card-app"
            href="https://dash.humid1.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 border transition-all flex flex-col justify-between group ${
              isDark
                ? 'border-zinc-800 bg-zinc-950 hover:border-zinc-600'
                : 'border-zinc-300 bg-white hover:border-black'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-zinc-500">DASHBOARD</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-sm font-bold uppercase mb-1">dash.humid1.com</div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                ThingsBoard time-series analytics and humidor telemetry.
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase mt-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>LIVE SYSTEM</span>
            </div>
          </a>

          {/* Community Chat */}
          <a
            id="service-card-chat"
            href="https://chat.humid1.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 border transition-all flex flex-col justify-between group ${
              isDark
                ? 'border-zinc-800 bg-zinc-950 hover:border-zinc-600'
                : 'border-zinc-300 bg-white hover:border-black'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-zinc-500">CHAT</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-sm font-bold uppercase mb-1">chat.humid1.com</div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Maker community discussion and firmware build support.
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase mt-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>ACTIVE CHAT</span>
            </div>
          </a>

          {/* Device Enrollment */}
          <a
            id="service-card-auth"
            href="https://auth.humid1.com/if/flow/default-enrollment-flow/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 border transition-all flex flex-col justify-between group ${
              isDark
                ? 'border-zinc-800 bg-zinc-950 hover:border-zinc-600'
                : 'border-zinc-300 bg-white hover:border-black'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-zinc-500">SSO &amp; ENROLL</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-sm font-bold uppercase mb-1">auth.humid1.com</div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Single sign-on profile and device token management.
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase mt-4 text-zinc-500 flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              <span>SECURE ACCESS</span>
            </div>
          </a>

          {/* GitHub Repository */}
          <a
            id="service-card-github"
            href="https://github.com/Humidyne-Labs/HUMID1_OS"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 border transition-all flex flex-col justify-between group ${
              isDark
                ? 'border-zinc-800 bg-zinc-950 hover:border-zinc-600'
                : 'border-zinc-300 bg-white hover:border-black'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-zinc-500">OPEN SOURCE</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-sm font-bold uppercase mb-1">GitHub Repo</div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Firmware source code, build flags, and release notes.
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase mt-4 text-zinc-500 flex items-center gap-1.5">
              <Github className="w-3 h-3" />
              <span>MIT LICENSE</span>
            </div>
          </a>

        </div>
      </section>

      {/* COMMUNITY FUNDING BANNER */}
      <section id="funding-status-section" className="w-full">
        <div
          className={`p-5 sm:p-6 border flex flex-col md:flex-row items-center justify-between gap-5 transition-colors ${
            isDark
              ? 'border-zinc-800 bg-zinc-950'
              : 'border-zinc-300 bg-white'
          }`}
        >
          <div className="flex flex-col items-start gap-1 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                INFRASTRUCTURE SUSTAINABILITY
              </span>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                ~$12.00 / MONTH
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl mt-1">
              HUMID1_OS operates as an open community project. Monthly server hosting, ThingsBoard brokers, and database costs are kept transparent. Any contribution helps keep the servers online.
            </p>
          </div>

          <a
            id="funding-contribute-cta"
            href="https://tools.signupgenius.com/c/support-humid1-project"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-mono font-bold px-5 py-2.5 uppercase transition-all flex-shrink-0 flex items-center gap-2 border ${
              isDark
                ? 'bg-white text-black border-white hover:bg-zinc-200'
                : 'bg-black text-white border-black hover:bg-zinc-800'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>SUPPORT SERVER UPTIME</span>
          </a>
        </div>
      </section>

    </div>
  );
};
