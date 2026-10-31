import { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import {
  Send,
  Copy,
  Check,
  ExternalLink,
  Volume2,
  VolumeX,
  Shield,
  Terminal,
} from 'lucide-react';
import { toggleSound, isSoundEnabled, playBlip, playSuccess } from './utils/audio';

export function App() {
  const [copied, setCopied] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const telegramUrl = 'https://t.me/capwerofficial';
  const telegramHandle = '@capwerofficial';

  const handleCopy = () => {
    navigator.clipboard.writeText(telegramUrl);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playBlip(880, 'sine', 0.05);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-emerald-500 selection:text-black">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Subtle dynamic mouse cursor spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.04), transparent 75%)`,
        }}
      />

      {/* GIANT "CAPWER" TYPOGRAPHY IN THE BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span
          className="text-[17vw] sm:text-[19vw] md:text-[21vw] font-black tracking-tighter uppercase leading-none text-transparent text-stroke-giant transition-all duration-700"
          style={{
            letterSpacing: '-0.06em',
          }}
        >
          CAPWER
        </span>
      </div>

      {/* Minimal Top Header Bar */}
      <header className="relative z-20 w-full px-6 py-6 sm:px-10 flex items-center justify-between border-b border-white/[0.04]">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={false} interactive={true} />
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-white text-sm">capwer</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest font-semibold">
              overlay
            </span>
          </div>
        </div>

        {/* Right status & micro-controls */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>DIRECT TELEGRAM DISPATCH</span>
          </div>

          <button
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute audio' : 'Enable audio feedback'}
            className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1.5 font-mono"
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="text-[10px] hidden md:inline">{soundOn ? 'SFX' : 'MUTED'}</span>
          </button>
        </div>
      </header>

      {/* Center Minimal Hero & Telegram Instruction */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center max-w-3xl mx-auto w-full">
        {/* The Flower Wearing Cap Logo - Mascot Spotlight */}
        <div className="mb-6 relative">
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <Logo size="hero" showText={false} interactive={true} />
        </div>

        {/* Minimal Monospace Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-slate-300 mb-6">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>TOOL OVERLAY • PRIVATE ACQUISITION</span>
        </div>

        {/* Clean, Non-AI-Slop Headline & Direct Telegram Instruction */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug max-w-2xl">
          If you want to buy this tool overlay, <br className="hidden sm:inline" />
          message on Telegram
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-400 font-normal max-w-lg">
          Direct inquiries, pricing, and instantaneous setup tokens are dispatched privately via our official handle.
        </p>

        {/* The Telegram Action Card */}
        <div className="mt-8 w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#090b10]/80 backdrop-blur-xl p-5 shadow-2xl relative overflow-hidden group">
          {/* Subtle accent hover glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none" />

          {/* Telegram Handle row */}
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-xs mb-3.5">
            <div className="flex items-center gap-2.5 overflow-hidden text-left">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center flex-shrink-0">
                <Send className="w-4 h-4 text-sky-400 -translate-x-0.5 translate-y-0.5" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">OFFICIAL TELEGRAM</span>
                <span className="text-white font-bold text-sm tracking-wide select-all">{telegramHandle}</span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              title="Copy Telegram link"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono text-slate-200 hover:text-white transition-all flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Link Button */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playBlip(950, 'sine', 0.05)}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.35)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Open Telegram ({telegramHandle})</span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
          </a>

          {/* URL text display */}
          <div className="mt-3 text-center">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-slate-400 hover:text-sky-400 transition-colors underline underline-offset-4"
            >
              {telegramUrl}
            </a>
          </div>
        </div>

        {/* Micro Telemetry note */}
        <div className="mt-8 flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>Kernel Ring-0 Overlay Architecture • Instant Private Delivery</span>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full px-6 py-6 sm:px-10 border-t border-white/[0.04] text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span>CAPWER SYSTEMS</span>
          <span>•</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-sky-400 transition-colors"
          >
            t.me/capwerofficial
          </a>
          <span className="text-slate-700">•</span>
          <span className="text-slate-400">ENCRYPTED DISPATCH</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
