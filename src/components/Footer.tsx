import React from 'react';
import { Logo } from './Logo';
import { ArrowUp } from 'lucide-react';
import { playBlip } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playBlip(900, 'sine', 0.04);
  };

  return (
    <footer className="bg-[#050608] border-t border-white/[0.08] pt-16 pb-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" onClick={scrollToTop} className="inline-block">
              <Logo size="md" showText={true} />
            </a>

            <p className="text-slate-400 font-sans text-xs max-w-sm leading-relaxed">
              Capwer delivers hardware-level screen capture invisibility, Ring-0 kernel memory isolation,
              and sub-millisecond panic killswitches for high-stakes technical environments.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Global Nodes Operational</span>
              </div>
              <span className="text-[11px] text-slate-400">Ping: 8ms</span>
            </div>
          </div>

          {/* Architecture Links */}
          <div className="space-y-3">
            <h4 className="text-white uppercase tracking-wider text-[11px] font-bold">Architecture</h4>
            <ul className="space-y-2 text-slate-400 font-sans text-xs">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Direct3D & Vulkan Hook</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Ring-0 Micro-Kernel</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Memory VAD Scrambler</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Virtual EDID Display Matrix</a></li>
              <li><a href="#simulator" className="hover:text-emerald-400 transition-colors">Ghost Overlay Simulator</a></li>
            </ul>
          </div>

          {/* Pricing & Tiers */}
          <div className="space-y-3">
            <h4 className="text-white uppercase tracking-wider text-[11px] font-bold">Pricing Tiers</h4>
            <ul className="space-y-2 text-slate-400 font-sans text-xs">
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Free — Community Sandbox</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pro — Stealth Operator</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Elite — Undetected Core</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Ultra — Enterprise Custom</a></li>
              <li><a href="#benchmark" className="hover:text-emerald-400 transition-colors">Diagnostic Suite</a></li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="space-y-3">
            <h4 className="text-white uppercase tracking-wider text-[11px] font-bold">Resources</h4>
            <ul className="space-y-2 text-slate-400 font-sans text-xs">
              <li><a href="#quick-install" className="hover:text-emerald-400 transition-colors">CLI Quick Start</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</a></li>
              <li><a href="https://discord.gg" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Discord Community</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">EV Certificate Validation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy & Security Whitepaper</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Capwer Systems. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400 font-sans">
              Notice: Capwer is an advanced desktop isolation and privacy utility.
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Keyboard shortcut hint */}
            <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] text-slate-400">
              Panic Key: <kbd className="text-rose-400 font-bold">Ctrl+B</kbd>
            </span>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
