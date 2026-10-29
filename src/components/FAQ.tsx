import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { playBlip } from '../utils/audio';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does Capwer guarantee screen capture invisibility on Zoom, SEB, and Respondus?',
      answer:
        'Standard screen-sharing utilities (such as OBS, Zoom, Safe Exam Browser, or Microsoft Teams) tap into the OS Compositor APIs (such as Windows Graphics Capture or BitBlt). Capwer does not render windows inside the OS desktop tree. Instead, our Ring-0 display engine hooks into the GPU physical scanout buffer directly. As a result, the capture APIs read a 100% clean frame, while your physical display shows your transparent HUD and assistance feeds.',
    },
    {
      question: 'Will Windows Defender or third-party antivirus flag Capwer?',
      answer:
        'Our binaries are signed with legitimate Extended Validation (EV) certificates. Because Capwer avoids noisy user-space process injection (DLL injection) and uses hypervisor-assisted memory isolation, it does not trigger generic heuristic tripwires. On Elite and Ultra tiers, unique per-user hash polymorphism is applied dynamically.',
    },
    {
      question: 'Can I use multiple monitors even if the exam locks down to single-monitor only?',
      answer:
        'Yes. Our Virtual EDID dongle driver simulates a single hardware monitor to the operating system while internally routing secondary and tertiary virtual display feeds directly into your stealth overlay. The proctor software only detects one display connected to your graphics card.',
    },
    {
      question: 'How fast is the Panic Killswitch if a physical audit or room sweep occurs?',
      answer:
        'The Panic Killswitch is bounded to under 400 microseconds (0.4 milliseconds). When you strike your designated hotkey (e.g. Esc or Ctrl+B), the driver zeroizes RAM buffers, unhooks all overlay pipelines, and restores your system to pristine native state immediately.',
    },
    {
      question: 'Which tier should I choose: Pro, Elite, or Ultra?',
      answer:
        'Choose Free for personal local experiments. Choose Pro for everyday live coding interviews, remote work assistance, and standard proctors. Choose Elite if you are facing strict hardware-monitoring proctors (Respondus LockDown, Safe Exam Browser, Pearson OnVUE) that require Ring-0 kernel stealth and hardware UUID masking. Choose Ultra if you need custom daily builds and direct 1-on-1 engineer assistance.',
    },
    {
      question: 'What is the refund and warranty policy?',
      answer:
        'We offer a 14-day zero-detection guarantee. If an unexpected security signature triggers in your environment, our engineering team provides either a custom private hotfix within 24 hours or an unconditional refund.',
    },
  ];

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      playBlip(750, 'sine', 0.03);
    }
  };

  return (
    <section id="faq" className="py-24 md:py-32 relative bg-[#07090d] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE & FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Frequently Answered Inquiries.
          </h2>

          <p className="mt-3 text-slate-300 text-base">
            Clear, transparent answers about our kernel architecture, stealth guarantees, and compatibility.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0d111a] border-emerald-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
                    : 'bg-[#090c12] border-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-4 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center">
          <p className="text-xs sm:text-sm text-slate-300">
            Have a specialized custom proctoring requirement or questions regarding institutional hardware?
          </p>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:underline font-semibold"
          >
            Join the Capwer Engineering Discord Community →
          </a>
        </div>
      </div>
    </section>
  );
};
