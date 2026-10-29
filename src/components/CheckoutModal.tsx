import React, { useState, useEffect } from 'react';
import {
  X,
  Key,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { playBlip, playSuccess } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  billingCycle: 'monthly' | 'yearly';
  price: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  billingCycle,
  price,
}) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate a mock authentic cryptographic license key
      const randomHex = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const planCode = selectedPlan.substring(0, 3).toUpperCase();
      const key = `CPWR-${planCode}-${randomHex()}-${randomHex()}-${randomHex()}`;
      setLicenseKey(key);
    }
  }, [isOpen, selectedPlan]);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedKey(true);
    playSuccess();
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(`irm https://get.capwer.sh/win | iex; capwer activate ${licenseKey}`);
    setCopiedCmd(true);
    playSuccess();
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/[0.1] bg-[#0c1017] p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            playBlip(600, 'sine', 0.03);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Deploy Capwer {selectedPlan} Engine</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                {price === 0 ? 'FREE ACCESS' : `$${price}/${billingCycle === 'yearly' ? 'mo (billed annual)' : 'mo'}`}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant cryptographic provisioning. Your session key and binaries are ready.
            </p>
          </div>
        </div>

        {/* License Key Display Card */}
        <div className="p-4 rounded-xl bg-[#07090f] border border-white/[0.08] mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Key className="w-3.5 h-3.5" />
              Generated Device License Token:
            </span>
            <span className="text-emerald-400">STATUS: PROVISIONED</span>
          </div>

          <div className="flex items-center justify-between gap-3 bg-black/60 p-3 rounded-lg border border-white/[0.05]">
            <span className="font-mono text-xs sm:text-sm text-emerald-300 font-bold tracking-wider select-all">
              {licenseKey}
            </span>

            <button
              onClick={handleCopyKey}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono text-slate-200 transition-all flex-shrink-0"
            >
              {copiedKey ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Key</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1-Step CLI Activation command */}
        <div className="mb-6">
          <label className="text-[11px] font-mono text-slate-400 mb-1.5 block">
            1-Click PowerShell Install & Auto-Activate:
          </label>
          <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-black/50 border border-white/[0.06] font-mono text-xs text-slate-300">
            <span className="truncate select-all text-slate-300">
              irm https://get.capwer.sh/win | iex; capwer activate {licenseKey}
            </span>
            <button
              onClick={handleCopyCmd}
              className="p-1.5 rounded hover:bg-white/[0.08] text-slate-400 hover:text-white"
            >
              {copiedCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Download Standalone Installers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => {
              playSuccess();
              alert(`Simulated download: Capwer-Windows-Setup-v2.8.4.exe initiated with license ${licenseKey}!`);
            }}
            className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-between text-left transition-all group"
          >
            <div>
              <span className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors block">
                Windows 10/11 Installer (.exe)
              </span>
              <span className="text-[10px] font-mono text-slate-400">x64 / ARM64 • WHQL EV Signed • 18 MB</span>
            </div>
            <Download className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={() => {
              playSuccess();
              alert(`Simulated download: Capwer-macOS-v2.8.4.dmg initiated with license ${licenseKey}!`);
            }}
            className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-between text-left transition-all group"
          >
            <div>
              <span className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors block">
                macOS Sonoma & Sequoia (.dmg)
              </span>
              <span className="text-[10px] font-mono text-slate-400">Apple Silicon M1/M2/M3/M4 & Intel • 22 MB</span>
            </div>
            <Download className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Quick Activation Notice */}
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-400 font-mono">100% Unrestricted Trial Included:</strong>
            <p className="text-[11px] text-slate-400 mt-0.5">
              You will not be charged until your 14-day zero-detection evaluation period concludes.
              You can cancel or purge license tokens at any time via the CLI or web dashboard.
            </p>
          </div>
        </div>

        {/* Close / Proceed button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              playBlip(700, 'sine', 0.03);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white transition-colors"
          >
            Done & Return to Workspace
          </button>
        </div>
      </div>
    </div>
  );
};
