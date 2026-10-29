import React, { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  Sliders,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  Lock,
  Radio,
} from 'lucide-react';
import { playBlip, playPanic, playSuccess } from '../utils/audio';

export const InteractiveSimulator: React.FC = () => {
  const [viewMode, setViewMode] = useState<'operator' | 'observer'>('operator');
  const [opacity, setOpacity] = useState<number>(85);
  const [isPanicked, setIsPanicked] = useState(false);
  const [activeScenario, setActiveScenario] = useState<'coding' | 'exam' | 'research'>('coding');
  const [panicCount, setPanicCount] = useState(0);

  // Keyboard shortcut listener for panic (Ctrl+B or Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'b') || e.key === 'Escape') {
        e.preventDefault();
        triggerPanic();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanicked]);

  const triggerPanic = () => {
    if (!isPanicked) {
      playPanic();
      setIsPanicked(true);
      setPanicCount((c) => c + 1);
    } else {
      playSuccess();
      setIsPanicked(false);
    }
  };

  return (
    <section id="simulator" className="py-20 md:py-28 relative bg-[#07090d] border-t border-b border-white/[0.06]">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTIVE TECHNOLOGY DEMO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            See the Invisibility in Real-Time.
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Toggle between the <strong>Observer</strong> (what proctoring, screen share, or room recording captures)
            and the <strong>Operator</strong> (your private hardware overlay).
          </p>
        </div>

        {/* Simulator Control Dashboard */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-white/[0.1] bg-[#0c1017] shadow-2xl overflow-hidden">
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#090c13] flex flex-wrap items-center justify-between gap-4">
            {/* View Mode Toggle Pill */}
            <div className="flex items-center gap-2 bg-[#06080d] p-1 rounded-xl border border-white/[0.08]">
              <button
                onClick={() => {
                  setViewMode('operator');
                  playBlip(780, 'sine', 0.04);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'operator'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Operator View (You)</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('observer');
                  playBlip(650, 'sine', 0.04);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'observer'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                <span>Observer / Screen Share</span>
              </button>
            </div>

            {/* Scenario Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Scenario:</span>
              {(['coding', 'exam', 'research'] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => {
                    setActiveScenario(sc);
                    playBlip(820, 'sine', 0.03);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                    activeScenario === sc
                      ? 'bg-white/[0.1] text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sc.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Opacity Slider Control */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Sliders className="w-3 h-3 text-cyan-400" /> HUD Alpha: {opacity}%
              </span>
              <input
                type="range"
                min="20"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-24 accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Instant Panic Killswitch Button */}
            <button
              onClick={triggerPanic}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                isPanicked
                  ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
                  : 'bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isPanicked ? 'UNCLOAK (ESC)' : 'PANIC SWITCH [Ctrl+B]'}</span>
            </button>
          </div>

          {/* Active Viewport Screen Display */}
          <div className="relative min-h-[460px] bg-[#05070a] p-6 overflow-hidden">
            {/* The Host Application (The screen everyone else sees) */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0e121a] p-5 shadow-inner">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    {activeScenario === 'coding' && 'Terminal — Technical Assessment Session #4029'}
                    {activeScenario === 'exam' && 'SafeExamBrowser v3.4 — Strict Secure Environment'}
                    {activeScenario === 'research' && 'Enterprise Proctor Window — Live Screen Audit'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>REC: ACTIVE (30 FPS)</span>
                </div>
              </div>

              {/* Host content (What proctors see) */}
              <div className="space-y-4 font-mono text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-[#080b10] border border-white/[0.04]">
                  <p className="text-slate-400">
                    // Question 3: Given an array of integers nums and an integer target,
                    <br />
                    // return indices of the two numbers such that they add up to target.
                  </p>
                  <p className="text-cyan-400 mt-2">
                    function twoSum(nums: number[], target: number): number[] &#123;
                  </p>
                  <p className="text-slate-400 pl-4">// Candidate is currently typing...</p>
                  <p className="text-cyan-400">&#125;</p>
                </div>

                <div className="p-3 rounded-lg bg-[#080b10] border border-white/[0.04] text-[11px] text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Host Process ID: 0x4B2E</span>
                    <span className="text-emerald-400">Integrity: No Third-Party Injections Detected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GHOST OVERLAY (Shown ONLY in Operator view and NOT Panicked) */}
            {viewMode === 'operator' && !isPanicked && (
              <div
                style={{ opacity: opacity / 100 }}
                className="absolute top-12 right-12 w-80 md:w-96 rounded-2xl border-2 border-emerald-400/40 bg-[#070d12]/95 backdrop-blur-xl p-5 shadow-[0_0_50px_rgba(16,185,129,0.35)] transition-all duration-200"
              >
                {/* HUD Header */}
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                      CAPWER GHOST HUD
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    HIDDEN FROM OBS
                  </span>
                </div>

                {/* HUD Dynamic Body */}
                <div className="space-y-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20">
                    <div className="flex items-center justify-between text-emerald-300 text-[11px] mb-1 font-semibold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Instant Solution Generator
                      </span>
                      <span className="text-[10px] text-slate-400">O(N) Time</span>
                    </div>
                    <pre className="text-[11px] text-slate-200 overflow-x-auto whitespace-pre">
                      {`const map = new Map();
for(let i=0; i<nums.length; i++) {
  const diff = target - nums[i];
  if(map.has(diff)) return [map.get(diff), i];
  map.set(nums[i], i);
}`}
                    </pre>
                  </div>

                  {/* Private Telemetry row */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">DWM HOOK:</span>
                      <span className="text-emerald-400 font-bold">100% TRANSPARENT</span>
                    </div>
                    <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">LATENCY:</span>
                      <span className="text-cyan-400 font-bold">0.07 ms</span>
                    </div>
                  </div>
                </div>

                {/* HUD Footer notification */}
                <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
                  <span>Hotkey: [Ctrl+Alt+O] toggle</span>
                  <span className="text-emerald-400">Ring-0 Hook OK</span>
                </div>
              </div>
            )}

            {/* Panic Flash Overlay */}
            {isPanicked && (
              <div className="absolute inset-0 bg-rose-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                <AlertTriangle className="w-12 h-12 text-rose-500 mb-3 animate-bounce" />
                <h3 className="text-xl font-bold font-mono text-rose-400">PANIC CLOAK TRIGGERED</h3>
                <p className="text-xs font-mono text-slate-300 max-w-md mt-2">
                  All overlay graphics and memory regions instantly purged in 0.4ms. Host screen is 100% pristine.
                </p>
                <button
                  onClick={triggerPanic}
                  className="mt-4 px-4 py-2 rounded-xl bg-rose-500 text-white font-mono text-xs font-bold flex items-center gap-2 hover:bg-rose-600 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Normal Operator HUD</span>
                </button>
              </div>
            )}

            {/* In Observer Mode: Explanatory Banner */}
            {viewMode === 'observer' && (
              <div className="absolute bottom-6 left-6 right-6 p-3 rounded-xl bg-slate-900/90 border border-rose-500/30 backdrop-blur-md flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-rose-300 font-mono">
                  <Lock className="w-4 h-4 text-rose-400" />
                  <span>Observer View Active: No Capwer HUD, traces, or artifacts are visible to capture APIs.</span>
                </div>
                <span className="text-emerald-400 font-mono text-[11px] hidden sm:inline">BitBlt: Clean ✓</span>
              </div>
            )}
          </div>

          {/* Bottom Interactive Legend */}
          <div className="p-4 bg-[#080b10] border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Host Render: DirectX 12 / Vulkan
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-cyan-400" />
                Screen Capture API Bypass: ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span>Panic Clears: <strong className="text-white">{panicCount}</strong></span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400">Zero Artifacts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
