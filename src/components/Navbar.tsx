import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Volume2, VolumeX, Terminal, ShieldCheck, Menu, X, ArrowUpRight, Download } from 'lucide-react';
import { toggleSound, playBlip } from '../utils/audio';

interface NavbarProps {
  onOpenCheckout: (planName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckout }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playBlip(880, 'sine', 0.05);
  };

  const navLinks = [
    { label: 'Capabilities', href: '#features' },
    { label: 'Ghost Simulator', href: '#simulator' },
    { label: 'Diagnostics', href: '#benchmark' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top Telemetry Ticker Strip */}
      <div className="w-full bg-[#080b10] border-b border-white/[0.06] text-xs font-mono text-slate-400 py-1.5 px-4 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM OPERATIONAL
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              Kernel Driver v2.4.9: <strong className="text-slate-200">RING-0 VERIFIED</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400 hidden md:inline">
              Latency: <span className="text-cyan-400">0.08ms</span>
            </span>
            <span className="text-slate-400 hidden md:inline">
              Detection Risk: <span className="text-emerald-400 font-semibold">0.00%</span>
            </span>
            <span className="text-slate-500 font-sans text-[11px]">Build: Oct 2026</span>
          </div>
        </div>
      </div>

      {/* Main Floating Glass Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#060709]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#"
            className="flex items-center focus:outline-none"
            onClick={() => playBlip(600, 'sine', 0.04)}
          >
            <Logo size="md" showText={true} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0d1117]/80 border border-white/[0.08] p-1.5 rounded-full backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => playBlip(750, 'sine', 0.03)}
                className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Feedback Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? 'Sound feedback ON' : 'Sound feedback MUTED'}
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1.5"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              <span className="font-mono text-[11px] hidden lg:inline">{soundOn ? 'SFX ON' : 'MUTED'}</span>
            </button>

            {/* Quick Terminal / Console button */}
            <a
              href="#quick-install"
              onClick={() => playBlip(820, 'sine', 0.04)}
              className="px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden lg:inline">CLI Install</span>
            </a>

            {/* Download Engine Primary CTA */}
            <button
              onClick={() => {
                playBlip(980, 'sine', 0.06);
                onOpenCheckout('Pro');
              }}
              className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-semibold text-xs transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Capwer</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-300"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/[0.08] bg-[#090c12]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    playBlip(750, 'sine', 0.03);
                  }}
                  className="text-sm font-medium text-slate-200 hover:text-emerald-400 py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCheckout('Pro');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-center text-sm"
              >
                Download Capwer Engine
              </button>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span>Kernel v2.4.9</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Undetected
                </span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
