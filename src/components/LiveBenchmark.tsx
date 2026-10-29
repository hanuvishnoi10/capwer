import React, { useState } from 'react';
import { Play, CheckCircle2, RefreshCw, Activity, Terminal } from 'lucide-react';
import { playBlip, playSuccess } from '../utils/audio';

export const LiveBenchmark: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ id: string; name: string; status: 'pending' | 'running' | 'passed'; latency: string; details: string }[]>([
    {
      id: 'dwm',
      name: 'DWM Frame Hook & BitBlt Evasion Audit',
      status: 'pending',
      latency: '0.04 ms',
      details: 'Physical display swapchain intercepted. Zero capture leakage detected.',
    },
    {
      id: 'driver',
      name: 'Ring-0 Kernel Integrity & EV Signature Check',
      status: 'pending',
      latency: '0.08 ms',
      details: 'Micro-driver loaded with legitimate WHQL EV certificate bypass.',
    },
    {
      id: 'memory',
      name: 'Memory Scrambler & VAD Allocation Scan',
      status: 'pending',
      latency: '0.12 ms',
      details: 'Process disguised inside trusted host memory space (svchost.exe).',
    },
    {
      id: 'hotkey',
      name: 'Panic Shredder Sub-Millisecond Response',
      status: 'pending',
      latency: '0.02 ms',
      details: 'Zeroization trigger responsive in 380 microseconds.',
    },
  ]);

  const runBenchmark = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    playBlip(600, 'sine', 0.05);

    // Reset statuses
    setResults((prev) =>
      prev.map((item) => ({ ...item, status: 'pending' }))
    );

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      const stepIndex = Math.min(Math.floor(current / 25), 3);
      setProgress(current);

      setResults((prev) =>
        prev.map((item, idx) => {
          if (idx < stepIndex) return { ...item, status: 'passed' };
          if (idx === stepIndex) return { ...item, status: 'running' };
          return { ...item, status: 'pending' };
        })
      );

      if (current % 25 === 0) {
        playBlip(700 + current * 4, 'sine', 0.03);
      }

      if (current >= 100) {
        clearInterval(interval);
        setIsRunning(false);
        setResults((prev) =>
          prev.map((item) => ({ ...item, status: 'passed' }))
        );
        playSuccess();
      }
    }, 30);
  };

  return (
    <section id="benchmark" className="py-20 md:py-28 relative bg-[#080b10] border-t border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE INTEGRITY DIAGNOSTIC</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Instant Diagnostic Verification.
            </h2>
            <p className="mt-3 text-slate-300 text-base max-w-xl">
              Simulate our real-time audit engine. Verify that all 4 bypass subsystems
              pass heuristic anti-cheat and screen capture inspection.
            </p>
          </div>

          <button
            onClick={runBenchmark}
            disabled={isRunning}
            className={`px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2.5 self-start md:self-auto ${
              isRunning
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-wait'
                : 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02]'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Audit ({progress}%)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Diagnostic Suite</span>
              </>
            )}
          </button>
        </div>

        {/* Diagnostic Panel Box */}
        <div className="rounded-2xl border border-white/[0.1] bg-[#0c1017] p-6 sm:p-8 shadow-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Audit Progress: {progress}% Complete
              </span>
              <span className="text-emerald-400 font-semibold">
                {progress === 100 ? 'ALL CHECKS PASSED — 100% STEALTH' : isRunning ? 'AUDITING...' : 'IDLE'}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 transition-all duration-75 rounded-full"
              />
            </div>
          </div>

          {/* Test items list */}
          <div className="space-y-4">
            {results.map((test, index) => (
              <div
                key={test.id}
                className={`p-4 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  test.status === 'passed'
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : test.status === 'running'
                    ? 'bg-cyan-950/20 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    : 'bg-white/[0.02] border-white/[0.05]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5">
                    {test.status === 'passed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : test.status === 'running' ? (
                      <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>{test.name}</span>
                      {test.status === 'passed' && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          VERIFIED
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{test.details}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 font-mono text-xs pl-8 sm:pl-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">EXECUTION</span>
                    <span className="text-cyan-400 font-bold">{test.latency}</span>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <span className="text-[10px] text-slate-400 block">INTEGRITY</span>
                    <span
                      className={`font-bold ${
                        test.status === 'passed'
                          ? 'text-emerald-400'
                          : test.status === 'running'
                          ? 'text-cyan-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {test.status === 'passed' ? 'PASS 100%' : test.status === 'running' ? 'SCANNING' : 'WAITING'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
