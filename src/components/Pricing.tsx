import React, { useState } from 'react';
import {
  Check,
  Crown,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Shield,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBlip, playSuccess } from '../utils/audio';

interface PricingProps {
  onOpenCheckout: (planName: string, billingCycle: 'monthly' | 'yearly', price: number) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenCheckout }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showComparison, setShowComparison] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      badge: 'STARTER',
      tagline: 'Personal sandbox for local self-study and testing compatibility.',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        'Standard Direct3D screen capture evasion',
        '1 Active device authorization',
        'Standard Ghost HUD overlay',
        'Basic panic switch keybind (Esc)',
        'Public proxy relay nodes',
        'Community Discord access',
      ],
      notIncluded: [
        'Ring-0 micro-kernel driver',
        'Dynamic hardware UUID spoofing',
        'Multi-monitor virtual EDID matrix',
        'Priority zero-day patch delivery',
      ],
      highlight: false,
      cta: 'Get Started Free',
      accentColor: 'border-white/10',
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'POPULAR CHOICE',
      tagline: 'High-speed stealth workspace for regular coders and students.',
      priceMonthly: 16,
      priceYearly: 12,
      features: [
        'Full Direct3D & Vulkan screen capture bypass',
        '3 Simultaneous active devices',
        'Process memory encryption & VAD cloaking',
        '0.4ms instant panic shredder',
        'Custom opacity & HUD layout editor',
        'Multi-scenario presets (Coding, Exam, HUD)',
        'Priority update channel (< 2 hrs)',
        'Private Operator role & support',
      ],
      notIncluded: [
        'Ring-0 micro-kernel driver',
        'Hardware UUID & SMBIOS spoofer',
        'Dedicated 1-on-1 engineer hotline',
      ],
      highlight: false,
      cta: 'Deploy Pro Engine',
      accentColor: 'border-cyan-500/30',
    },
    {
      id: 'elite',
      name: 'Elite',
      badge: 'MOST POPULAR',
      tagline: 'The battle-tested powerhouse for high-stakes assessments & strict proctors.',
      priceMonthly: 36,
      priceYearly: 28,
      features: [
        'Ring-0 Micro-Kernel Driver injection',
        'Dynamic Hardware UUID, MAC & SMBIOS spoofer',
        'Unlimited active devices',
        'Multi-Display & Virtual Monitor EDID matrix',
        'Zero-latency dedicated private nodes',
        'EV-signed legitimate driver hash',
        'Immunity to SEB, Respondus, Honorlock, OnVUE',
        '24/7 Dedicated VIP Priority Queue',
      ],
      notIncluded: [
        'Bespoke daily unique driver compiler',
        'Direct 1-on-1 private Signal/Telegram hotline',
      ],
      highlight: true,
      cta: 'Deploy Elite Core',
      accentColor: 'border-emerald-500',
    },
    {
      id: 'ultra',
      name: 'Ultra',
      badge: 'MAXIMUM STEALTH',
      tagline: 'Bespoke daily compiler builds and enterprise zero-trace infrastructure.',
      priceMonthly: 79,
      priceYearly: 62,
      features: [
        'Bespoke daily unique driver hash (Zero common sig)',
        'Dedicated private single-tenant VPS relay',
        'Custom VM Hypervisor pass-through integration',
        'Hardware dongle & physical HDMI box support',
        'Unlimited device licenses & team sharing',
        'Direct 1-on-1 senior engineer Telegram/Signal line',
        'Same-day custom patch SLA',
        'Lifetime priority access to all future modules',
      ],
      notIncluded: [],
      highlight: false,
      cta: 'Deploy Ultra Enterprise',
      accentColor: 'border-purple-500/40',
    },
  ];

  const handleSelectPlan = (plan: typeof plans[0]) => {
    playSuccess();
    // Confetti effect on selecting plan
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#a855f7', '#f59e0b'],
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }

    const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
    onOpenCheckout(plan.name, billingCycle, price);
  };

  const comparisonFeatures = [
    { feature: 'Screen Capture Invisibility (BitBlt / DWM)', free: 'Basic', pro: 'Full', elite: 'Kernel-Assisted', ultra: 'Hardware Scramble' },
    { feature: 'Supported Active Devices', free: '1 Device', pro: '3 Devices', elite: 'Unlimited', ultra: 'Unlimited + Team' },
    { feature: 'Panic Killswitch Response Time', free: 'Standard', pro: '< 0.8 ms', elite: '< 0.4 ms', ultra: '< 0.2 ms' },
    { feature: 'Ring-0 Kernel Micro-Driver', free: '—', pro: '—', elite: '✓ Included', ultra: '✓ Bespoke Build' },
    { feature: 'Hardware & UUID Spoofing (SMBIOS/MAC)', free: '—', pro: '—', elite: '✓ Included', ultra: '✓ Full Virtualization' },
    { feature: 'Multi-Display Virtual EDID Matrix', free: '—', pro: '—', elite: '✓ Included', ultra: '✓ Hardware Dongle' },
    { feature: 'Custom Scenario HUD Presets', free: '1 Preset', pro: '5 Presets', elite: 'Unlimited', ultra: 'Unlimited' },
    { feature: 'Anti-Detection SLA & Updates', free: 'Community', pro: '< 2 Hours', elite: '< 30 Minutes', ultra: 'Instant Hotfix' },
    { feature: 'Support Level', free: 'Community', pro: 'Discord Role', elite: '24/7 VIP Queue', ultra: 'Direct Engineer Line' },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 relative bg-[#06070a]">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
            <Crown className="w-3.5 h-3.5" />
            <span>TRANSPARENT TIER ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Choose Your Level of Stealth.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From solo exploration to military-grade Ring-0 kernel isolation. Zero hidden charges. Cancel anytime.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-[#0d111a] border border-white/[0.08] shadow-inner">
            <button
              onClick={() => {
                setBillingCycle('monthly');
                playBlip(720, 'sine', 0.03);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>

            <button
              onClick={() => {
                setBillingCycle('yearly');
                playBlip(840, 'sine', 0.03);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-900 text-emerald-400 border border-emerald-400/30">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-[#0f171f] to-[#0a0f16] border-2 border-emerald-400/70 shadow-[0_0_40px_rgba(16,185,129,0.25)] scale-[1.02] lg:-translate-y-2'
                    : plan.id === 'ultra'
                    ? 'bg-gradient-to-b from-[#130f1c] to-[#0b0813] border border-purple-500/40 hover:border-purple-500/70 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                    : 'bg-[#0b0e14] border border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                {/* Highlight Badge */}
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-[10px] font-mono tracking-widest uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>RECOMMENDED</span>
                  </div>
                )}

                {plan.id === 'ultra' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-[10px] font-mono tracking-wider uppercase">
                    ENTERPRISE
                  </div>
                )}

                <div>
                  {/* Tier Title & Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/[0.08]">
                      {plan.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 min-h-[36px] mb-5 leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/[0.06]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                        ${price}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {plan.priceMonthly === 0 ? 'forever' : '/month'}
                      </span>
                    </div>

                    {billingCycle === 'yearly' && plan.priceMonthly > 0 && (
                      <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                        Billed annually (${price * 12}/yr)
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8 text-xs">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      INCLUDED IN {plan.name.toUpperCase()}:
                    </span>

                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}

                    {plan.notIncluded.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-slate-400 line-through opacity-60">
                        <span className="w-4 text-center text-slate-400 font-mono">—</span>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 rounded-xl font-semibold text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02]'
                      : plan.id === 'ultra'
                      ? 'bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-slate-200 hover:text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix Collapsible Table */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              setShowComparison(!showComparison);
              playBlip(750, 'sine', 0.03);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-slate-300 transition-all"
          >
            <span>{showComparison ? 'Hide Comprehensive Comparison' : 'Compare All 4 Plans Side-by-Side'}</span>
            {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showComparison && (
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0b0e15] overflow-x-auto text-left shadow-2xl">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#080b10] text-slate-400 uppercase tracking-wider">
                    <th className="p-4 pl-6 text-left">Feature / Capability</th>
                    <th className="p-4 text-center">Free</th>
                    <th className="p-4 text-center text-cyan-400">Pro</th>
                    <th className="p-4 text-center text-emerald-400 font-bold">Elite</th>
                    <th className="p-4 text-center text-purple-400">Ultra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6 text-slate-300 font-sans font-medium">{row.feature}</td>
                      <td className="p-4 text-center text-slate-400">{row.free}</td>
                      <td className="p-4 text-center text-cyan-300">{row.pro}</td>
                      <td className="p-4 text-center text-emerald-400 font-semibold">{row.elite}</td>
                      <td className="p-4 text-center text-purple-300 font-semibold">{row.ultra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Security & Refund Assurance Guarantee */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>
              Crypto payments accepted (BTC, USDT, SOL, Monero) & Credit Cards. Instant automated license provisioning.
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>14-Day Integrity Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};
