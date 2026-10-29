import React from 'react';
import {
  ShieldAlert,
  Cpu,
  Fingerprint,
  MonitorCheck,
  EyeOff,
} from 'lucide-react';
import { playBlip } from '../utils/audio';

export const FeaturesBento: React.FC = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative bg-[#06070a]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>LOW-LEVEL ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Built from the Kernel Up. <br />
            <span className="text-slate-400 font-normal">Zero Userland Injection. Zero Artifacts.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Unlike surface-level browser extensions or generic electron wrappers, Capwer operates directly
            at the hardware compositing layer to guarantee complete isolation and zero detection flags.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Direct3D Compositor Evasion (Large 8 cols) */}
          <div
            onMouseEnter={() => playBlip(700, 'sine', 0.02)}
            className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0c1017] to-[#07090e] p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <EyeOff className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                  Graphics Pipeline Hook
                </span>
                <h3 className="text-xl font-bold text-white">Direct3D & Vulkan Invisible HUD</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl mb-6">
              Bypasses Windows Desktop Duplication API (WDA), BitBlt, DirectX frame grabs, and macOS ScreenCaptureKit.
              Your custom HUD, AI prompts, and notes render solely on the physical monitor scanout, leaving video feeds,
              Zoom, and proctor recordings completely untouched.
            </p>

            {/* Micro Graphic Simulation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#05070b] border border-white/[0.06]">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span>Host Video Stream</span>
                  <span className="text-emerald-400 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10">CLEAN</span>
                </div>
                <div className="h-16 rounded-lg bg-slate-900 flex items-center justify-center text-slate-500 border border-slate-800">
                  [Standard IDE / Assessment View]
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05070b] border border-emerald-500/20 shadow-inner">
                <div className="flex items-center justify-between text-emerald-400 mb-2">
                  <span>Physical Display (Your Eyes)</span>
                  <span className="text-cyan-400 text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10">HUD ACTIVE</span>
                </div>
                <div className="h-16 rounded-lg bg-emerald-950/30 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                  [Overlay + AI Notes + Radar Active]
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Ring-0 Kernel Driver (4 cols) */}
          <div
            onMouseEnter={() => playBlip(750, 'sine', 0.02)}
            className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-[#0c1017] p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit mb-6">
              <Cpu className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
              Driver Isolation
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Ring-0 Micro-Kernel</h3>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Functions beneath the operating system userland. Zero DLL injection, zero registry clutter,
              and completely immune to user-space heuristic anti-cheat hooks.
            </p>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">Driver Signature:</span>
              <span className="text-emerald-400 font-semibold">Valid EV Signed</span>
            </div>
          </div>

          {/* Card 3: Hardware Identity Mask (4 cols) */}
          <div
            onMouseEnter={() => playBlip(800, 'sine', 0.02)}
            className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-[#0c1017] p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit mb-6">
              <Fingerprint className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block">
              Anti-Fingerprinting
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Hardware & UUID Spoof</h3>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Dynamically randomizes SMBIOS UUID, Network MAC addresses, GPU PCIe identifiers, and disk volume serials
              at session launch to eliminate device bans and persistent tracing.
            </p>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">UUID Mutation:</span>
              <span className="text-purple-300">Dynamic Per Boot</span>
            </div>
          </div>

          {/* Card 4: Sub-Millisecond Panic Shredder (4 cols) */}
          <div
            onMouseEnter={() => playBlip(850, 'sine', 0.02)}
            className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-[#0c1017] p-8 relative overflow-hidden group hover:border-rose-500/30 transition-all duration-300"
          >
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 w-fit mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider block">
              Emergency Zeroize
            </span>
            <h3 className="text-xl font-bold text-white mt-1">0.4ms Panic Killswitch</h3>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              When an unexpected proctor audit or physical room inspection occurs, tap your custom hotkey.
              All memory buffers are instantly cryptographically wiped, leaving zero residual evidence in RAM.
            </p>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">Purge Speed:</span>
              <span className="text-rose-400 font-bold">&lt; 400 microseconds</span>
            </div>
          </div>

          {/* Card 5: Multi-Display & Virtual Monitor Matrix (4 cols) */}
          <div
            onMouseEnter={() => playBlip(900, 'sine', 0.02)}
            className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-[#0c1017] p-8 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit mb-6">
              <MonitorCheck className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
              Display Virtualization
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Multi-Monitor Shield</h3>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Even on software that strictly enforces a "Single Monitor Policy," Capwer creates virtualized hardware
              EDID dongles, allowing secondary display feeds to stream into your primary overlay undetected.
            </p>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">EDID Simulation:</span>
              <span className="text-amber-400">Hardware Level</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
