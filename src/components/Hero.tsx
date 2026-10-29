import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  Terminal,
  Check,
  Copy,
  Shield,
  Zap,
  EyeOff,
  Cpu,
  Monitor,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { playBlip, playSuccess } from '../utils/audio';

interface HeroProps {
  onOpenCheckout: (planName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout }) => {
  const [activeTab, setActiveTab] = useState<'windows' | 'macos' | 'linux' | 'python'>('windows');
  const [copied, setCopied] = useState(false);

  const commands = {
    windows: 'irm https://get.capwer.sh/win | iex',
    macos: 'curl -fsSL https://get.capwer.sh/mac | bash',
    linux: 'curl -fsSL https://get.capwer.sh/linux | bash',
    python: 'pip install capwer-engine --upgrade',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2200);
  };

  const platforms = [
    { id: 'windows', label: 'Windows (PowerShell)' },
    { id: 'macos', label: 'macOS (Terminal)' },
    { id: 'linux', label: 'Linux (Bash)' },
    { id: 'python', label: 'Python SDK' },
  ] as const;

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-radial-vignette">
      {/* Background Grid Pattern & Subtle Ambient Beams */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono select-none">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold tracking-wide">CAPWER CORE v2.8.4</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">Ring-0 Stealth Architecture</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              The Undetected <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Stealth Workspace
              </span>{' '}
              & Utility Engine.
            </h1>

            {/* Refined Subhead - inspired by ofradr & evadus directness */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Engineered for high-stakes assessments, live coding, and technical workflows.
              Capwer delivers hardware-level screen capture invisibility, direct memory shielding,
              and an instant sub-millisecond panic cloak.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  playBlip(1000, 'sine', 0.05);
                  onOpenCheckout('Pro');
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <span>Launch Free Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#pricing"
                onClick={() => playBlip(750, 'sine', 0.03)}
                className="px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] hover:border-white/[0.2] text-slate-200 font-medium text-sm transition-all duration-200 flex items-center gap-2"
              >
                <span>Explore 4 Tiers</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Free → Ultra
                </span>
              </a>
            </div>

            {/* Quick CLI Install Terminal Box */}
            <div id="quick-install" className="pt-4 max-w-xl">
              <div className="rounded-xl border border-white/[0.1] bg-[#0b0e14]/90 backdrop-blur-md overflow-hidden shadow-2xl">
                {/* Terminal Tab Bar */}
                <div className="flex items-center justify-between border-b border-white/[0.08] px-3 py-2 bg-[#080a0f]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-cyan-400" /> Quick Setup
                    </span>
                  </div>

                  {/* Platform Switcher */}
                  <div className="flex items-center gap-1">
                    {platforms.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveTab(p.id);
                          playBlip(700, 'sine', 0.02);
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          activeTab === p.id
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {p.id.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Command Snippet Row */}
                <div className="p-3.5 flex items-center justify-between gap-3 font-mono text-xs text-slate-200">
                  <div className="flex items-center gap-2.5 overflow-x-auto select-all">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-slate-200 whitespace-nowrap">{commands[activeTab]}</span>
                  </div>

                  <button
                    onClick={handleCopy}
                    title="Copy command"
                    className="flex-shrink-0 px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs transition-all flex items-center gap-1.5 text-slate-300 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400 font-sans font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-sans">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 px-1">
                <span>⚡ Auto-detects architecture (x64 / ARM64)</span>
                <span className="text-slate-400">Zero rootkit trace</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hardware Telemetry & Mascot Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#0f141f]/90 to-[#090c12]/95 backdrop-blur-xl p-6 shadow-2xl overflow-hidden group">
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />

              {/* Header inside HUD */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">CAPWER ENGINE HUD</h2>
                    <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE CLOAK ENFORCED
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">SESSION ID</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">#CPWR-8849</span>
                </div>
              </div>

              {/* Mascot Spotlight Center: The Flower Wearing a Cap */}
              <div className="py-6 px-4 rounded-xl bg-[#07090e]/80 border border-white/[0.05] flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-400/15 rounded-full blur-xl" />

                <Logo size="hero" showText={false} interactive={true} />

                {/* Mascot Dialog Speech Bubble */}
                <div className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 max-w-xs shadow-lg">
                  "Cap tilted. Petals blooming. 100% invisible."
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-2">
                  Hover mascot to tip cap & test micro-interaction
                </span>
              </div>

              {/* Real-time Hardware Telemetry Gauges */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <EyeOff className="w-3 h-3 text-cyan-400" /> BitBlt Cloak
                    </span>
                    <span className="text-emerald-400 font-bold">PASS</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-full rounded-full" />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-emerald-400" /> Ring-0 Driver
                    </span>
                    <span className="text-emerald-400 font-bold">LOCKED</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full w-full rounded-full" />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" /> Hook Latency
                    </span>
                    <span className="text-cyan-400 font-mono font-bold">0.08 ms</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[25%] rounded-full" />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Monitor className="w-3 h-3 text-purple-400" /> Virtual Matrix
                    </span>
                    <span className="text-purple-300 font-mono font-bold">Isolated</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full w-full rounded-full" />
                  </div>
                </div>
              </div>

              {/* Bottom Test Simulator Button */}
              <a
                href="#simulator"
                onClick={() => playBlip(800, 'sine', 0.03)}
                className="mt-4 w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
              >
                <span>Launch Interactive Ghost Simulator</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Compatible With / Verified Platforms Banner */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-400 mb-6">
            Tested & Verified Inaudible / Invisible Against Target Environments
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-slate-300">
            {[
              'Safe Exam Browser',
              'Respondus LockDown',
              'Proctorio / Honorlock',
              'Pearson OnVUE',
              'Zoom & MS Teams',
              'Discord Screen Share',
              'OBS Studio (BitBlt / DWM)',
            ].map((platform) => (
              <div
                key={platform}
                className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

