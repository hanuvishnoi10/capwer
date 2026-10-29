import React, { useState } from 'react';
import { playBlip } from '../utils/audio';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  interactive?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
    hero: 'w-24 h-24 md:w-28 md:h-28',
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
    playBlip(920, 'sine', 0.05);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
  };

  return (
    <div
      className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative ${sizeMap[size]} transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
        {/* Glow halo behind flower */}
        <div
          className={`absolute -inset-1.5 rounded-full bg-emerald-500/20 blur-md transition-opacity duration-500 ${
            isHovered ? 'opacity-100 scale-125' : 'opacity-30'
          }`}
        />

        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative drop-shadow-[0_4px_12px_rgba(16,185,129,0.35)]"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="capCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>

            <linearGradient id="capBrimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* FLOWER PETALS (5 styled organic petals) */}
          <g className={`transition-transform duration-500 origin-center ${isHovered ? 'rotate-12' : 'rotate-0'}`}>
            {/* Top-Right Petal */}
            <circle
              cx="78"
              cy="48"
              r="17"
              fill="url(#petalGrad)"
              stroke="#047857"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            {/* Top-Left Petal */}
            <circle
              cx="42"
              cy="48"
              r="17"
              fill="url(#petalGrad)"
              stroke="#047857"
              strokeWidth="2"
            />
            {/* Bottom-Right Petal */}
            <circle
              cx="73"
              cy="80"
              r="17"
              fill="url(#petalGrad)"
              stroke="#047857"
              strokeWidth="2"
            />
            {/* Bottom-Left Petal */}
            <circle
              cx="47"
              cy="80"
              r="17"
              fill="url(#petalGrad)"
              stroke="#047857"
              strokeWidth="2"
            />
            {/* Bottom-Center Petal */}
            <circle
              cx="60"
              cy="90"
              r="16"
              fill="url(#petalGrad)"
              stroke="#047857"
              strokeWidth="2"
            />

            {/* Inner Petal Vein details */}
            <path d="M78 48 Q70 54 62 62" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M42 48 Q50 54 58 62" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M73 80 Q68 72 62 64" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M47 80 Q52 72 58 64" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M60 90 L60 74" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* FLOWER CENTER / FACE */}
          <g>
            {/* Golden Core */}
            <circle
              cx="60"
              cy="64"
              r="18"
              fill="url(#coreGrad)"
              stroke="#b45309"
              strokeWidth="2.5"
            />
            {/* Core highlight */}
            <ellipse cx="56" cy="58" rx="6" ry="3" fill="#ffffff" opacity="0.4" />

            {/* Friendly cool eyes (Streetwear vibe) */}
            <g className={`transition-all duration-300 ${isHovered ? 'scale-y-75' : ''}`}>
              {/* Left Eye: cool confident squint */}
              <ellipse cx="53" cy="64" rx="2.5" ry="3" fill="#1c1917" />
              <circle cx="54" cy="63" r="0.8" fill="#ffffff" />
              {/* Right Eye: cute wink or confident squint */}
              {isHovered ? (
                <path d="M64 64 Q67 61 70 64" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              ) : (
                <>
                  <ellipse cx="67" cy="64" rx="2.5" ry="3" fill="#1c1917" />
                  <circle cx="68" cy="63" r="0.8" fill="#ffffff" />
                </>
              )}
              {/* Subtle blush */}
              <circle cx="49" cy="69" r="2.2" fill="#f43f5e" opacity="0.4" />
              <circle cx="71" cy="69" r="2.2" fill="#f43f5e" opacity="0.4" />
              {/* Cool smirking smile */}
              <path d="M57 70 Q60 73 64 70" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          </g>

          {/* THE CAP (Streetwear Snapback tilted sideways on the flower) */}
          <g
            className={`transition-all duration-300 origin-[60px_42px] ${
              isHovered ? '-translate-y-2 -rotate-6' : 'translate-y-0 rotate-0'
            }`}
          >
            {/* Cap Crown (Dome) */}
            <path
              d="M34 46 C34 26 82 23 88 44 C72 47 48 48 34 46 Z"
              fill="url(#capCrownGrad)"
              stroke="#38bdf8"
              strokeWidth="2.2"
            />

            {/* Cap Crown Stitch Lines (Panels) */}
            <path d="M60 25 L60 46" stroke="#475569" strokeWidth="1.2" strokeDasharray="1 1" />
            <path d="M46 32 Q54 40 56 46" stroke="#475569" strokeWidth="1" strokeDasharray="1 1" />
            <path d="M74 31 Q67 39 65 46" stroke="#475569" strokeWidth="1" strokeDasharray="1 1" />

            {/* Cap Top Squatchee (Button) */}
            <ellipse cx="60" cy="25" rx="3.5" ry="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />

            {/* Cap Embroidered Emblem on front (a stylish mini lightning bolt or 'C') */}
            <path
              d="M59 34 L56 39 H61 L58 44"
              stroke="#34d399"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Cap Visor / Brim (Tilted forward-right, curved stylishly) */}
            <path
              d="M30 46 C50 49 84 43 96 48 C85 55 52 54 28 47 Z"
              fill="url(#capBrimGrad)"
              stroke="#38bdf8"
              strokeWidth="2.2"
            />
            {/* Brim Underside Shadow */}
            <path
              d="M32 47 C50 51 80 46 92 49 C82 53 52 52 32 47 Z"
              fill="#0369a1"
              opacity="0.7"
            />
            {/* Brim Highlight curve */}
            <path
              d="M36 47 C56 50 82 45 92 48"
              stroke="#7dd3fc"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        </svg>

        {/* Small live pulse dot near cap corner */}
        <span className="absolute bottom-0 right-0 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              capwer
            </span>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold tracking-wider">
              core
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 -mt-1 tracking-wider uppercase">
            Stealth Workspace
          </span>
        </div>
      )}
    </div>
  );
};

