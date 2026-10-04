import React from 'react';

export const VedaEmblem: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 56 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vedaBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      {/* VEDA Stylized Emblem */}
      <path
        d="M32 6L40.5 28C40.5 28 50 31 54 39C57.5 46 54 55 46 58C38 61 32 54 32 54C32 54 26 61 18 58C10 55 6.5 46 10 39C14 31 23.5 28 23.5 28L32 6Z"
        fill="url(#vedaBlueGrad)"
      />
      {/* Inner V-wing white glyph */}
      <path
        d="M32 16L37.5 32C37.5 32 44 34.5 47 41C49.5 46.5 46 52 40 53.5C35 55 32 50 32 50C32 50 29 55 24 53.5C18 52 14.5 46.5 17 41C20 34.5 26.5 32 26.5 32L32 16Z"
        fill="#ffffff"
      />
      {/* Center flame/lotus sprout */}
      <path
        d="M32 25C33.5 29 35 34 35 37C35 40 33.7 42 32 42C30.3 42 29 40 29 37C29 34 30.5 29 32 25Z"
        fill="url(#vedaBlueGrad)"
      />
    </svg>
  );
};

export const HostelIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        <defs>
          <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#081026" />
            <stop offset="40%" stopColor="#0f1f45" />
            <stop offset="100%" stopColor="#152c5c" />
          </linearGradient>
          <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="windowWarm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#eab308" />
          </radialGradient>
        </defs>

        {/* Sky Background */}
        <rect width="400" height="240" rx="16" fill="url(#nightSky)" />

        {/* Night Stars */}
        <circle cx="45" cy="30" r="1.5" fill="#ffffff" opacity="0.8" />
        <circle cx="85" cy="55" r="1.2" fill="#ffffff" opacity="0.6" />
        <circle cx="140" cy="25" r="1.5" fill="#ffffff" opacity="0.9" />
        <circle cx="210" cy="40" r="1.2" fill="#ffffff" opacity="0.7" />
        <circle cx="290" cy="20" r="1.6" fill="#ffffff" opacity="0.85" />
        <circle cx="355" cy="45" r="1.4" fill="#ffffff" opacity="0.75" />
        <circle cx="175" cy="65" r="1" fill="#ffffff" opacity="0.5" />
        <circle cx="320" cy="70" r="1.2" fill="#ffffff" opacity="0.6" />

        {/* Crescent Moon */}
        <circle cx="330" cy="50" r="14" fill="url(#moonGlow)" filter="drop-shadow(0 0 12px rgba(253, 224, 71, 0.4))" />
        <circle cx="335" cy="46" r="12" fill="#0e1b3d" />

        {/* Distant trees */}
        <ellipse cx="60" cy="185" rx="30" ry="25" fill="#0d1b38" />
        <ellipse cx="340" cy="185" rx="35" ry="30" fill="#0d1b38" />

        {/* Main Hostel Building - Charak Chatras */}
        <rect x="70" y="70" width="260" height="135" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />

        {/* Architectural Pillars / Wings */}
        <rect x="70" y="70" width="45" height="135" fill="#1a2538" />
        <rect x="285" y="70" width="45" height="135" fill="#1a2538" />

        {/* Roof Border & Header */}
        <rect x="64" y="64" width="272" height="12" rx="3" fill="#2563eb" />
        <rect x="150" y="52" width="100" height="16" rx="2" fill="#1d4ed8" />
        <text x="200" y="63" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          CHARAK CHATRAS
        </text>

        {/* Ground Floor Entrance */}
        <rect x="175" y="150" width="50" height="55" rx="2" fill="#0f172a" />
        <path d="M175 150 Q200 138 225 150 Z" fill="#2563eb" />
        <rect x="188" y="160" width="24" height="45" rx="1" fill="#fef08a" opacity="0.9" />

        {/* Glowing Hostel Windows - Floor 3 */}
        <rect x="80" y="86" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="125" y="86" width="16" height="22" rx="2" fill="#334155" />
        <rect x="155" y="86" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="192" y="86" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="228" y="86" width="16" height="22" rx="2" fill="#334155" />
        <rect x="260" y="86" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="300" y="86" width="16" height="22" rx="2" fill="url(#windowWarm)" />

        {/* Glowing Hostel Windows - Floor 2 (Room 214 level) */}
        <rect x="80" y="118" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="125" y="118" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="155" y="118" width="16" height="22" rx="2" fill="#334155" />
        <rect x="228" y="118" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="260" y="118" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="300" y="118" width="16" height="22" rx="2" fill="#334155" />

        {/* Window 214 Highlight */}
        <rect x="192" y="118" width="16" height="22" rx="2" fill="#fef08a" stroke="#60a5fa" strokeWidth="1" />

        {/* Floor 1 Windows */}
        <rect x="80" y="150" width="16" height="22" rx="2" fill="#334155" />
        <rect x="125" y="150" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="260" y="150" width="16" height="22" rx="2" fill="url(#windowWarm)" />
        <rect x="300" y="150" width="16" height="22" rx="2" fill="url(#windowWarm)" />

        {/* Campus Courtyard & Walkway */}
        <path d="M0 200 Q200 195 400 200 L400 240 L0 240 Z" fill="#0b172e" />
        <path d="M160 240 L185 205 L215 205 L240 240 Z" fill="#1e293b" opacity="0.6" />

        {/* Courtyard Warm Lamp Posts */}
        <line x1="50" y1="180" x2="50" y2="215" stroke="#475569" strokeWidth="2" />
        <circle cx="50" cy="178" r="4" fill="#fef08a" />
        <line x1="350" y1="180" x2="350" y2="215" stroke="#475569" strokeWidth="2" />
        <circle cx="350" cy="178" r="4" fill="#fef08a" />
      </svg>
    </div>
  );
};

export const CampusWalkIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 360 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md"
      >
        <defs>
          <linearGradient id="warmCampusBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="60%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Clean Warm Campus Background */}
        <rect width="360" height="220" rx="16" fill="url(#warmCampusBg)" />

        {/* Distant Trees & Hostel Architecture */}
        <circle cx="60" cy="110" r="40" fill="#93c5fd" opacity="0.4" />
        <circle cx="300" cy="105" r="45" fill="#93c5fd" opacity="0.35" />

        {/* Distant Modern University Building */}
        <rect x="70" y="70" width="220" height="85" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="150" y="55" width="60" height="15" rx="2" fill="#3b82f6" />
        <rect x="85" y="85" width="25" height="30" rx="2" fill="#bfdbfe" />
        <rect x="125" y="85" width="25" height="30" rx="2" fill="#bfdbfe" />
        <rect x="165" y="85" width="25" height="30" rx="2" fill="#bfdbfe" />
        <rect x="210" y="85" width="25" height="30" rx="2" fill="#bfdbfe" />
        <rect x="250" y="85" width="25" height="30" rx="2" fill="#bfdbfe" />

        {/* Green Campus Lawns */}
        <path d="M0 155 Q180 145 360 155 L360 220 L0 220 Z" fill="#dcfce7" />
        <path d="M120 220 L160 155 L200 155 L240 220 Z" fill="#e2e8f0" />

        {/* Student walking with backpack (Back view, modern vector) */}
        {/* Head */}
        <circle cx="180" cy="120" r="9" fill="#1e293b" />
        {/* Neck */}
        <rect x="178" y="129" width="4" height="4" fill="#f87171" opacity="0.8" />
        {/* Torso with T-shirt */}
        <path d="M168 133 C168 133 172 131 180 131 C188 131 192 133 192 133 L194 158 C194 158 188 160 180 160 C172 160 166 158 166 158 Z" fill="#2563eb" />
        {/* Backpack */}
        <rect x="172" y="134" width="16" height="20" rx="4" fill="#0f172a" />
        <line x1="171" y1="135" x2="171" y2="152" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <line x1="189" y1="135" x2="189" y2="152" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        {/* Legs / Trousers */}
        <line x1="174" y1="158" x2="173" y2="195" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        <line x1="186" y1="158" x2="188" y2="192" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        {/* Shoes */}
        <rect x="169" y="194" width="8" height="4" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
        <rect x="185" y="191" width="8" height="4" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
      </svg>
    </div>
  );
};

export const StudentAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full overflow-hidden border-2 border-blue-500/80 shadow-md bg-gradient-to-tr from-slate-800 to-blue-900 flex items-center justify-center shrink-0 ${className}`}
    >
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Gradient backdrop */}
        <rect width="80" height="80" fill="#1e293b" />
        {/* Student portrait vector */}
        <circle cx="40" cy="32" r="16" fill="#fcd34d" />
        {/* Hair */}
        <path d="M26 30 C26 19 32 14 40 14 C48 14 54 19 54 30 C50 25 45 25 40 25 C35 25 30 25 26 30 Z" fill="#0f172a" />
        {/* Glasses */}
        <rect x="30" y="29" width="8" height="6" rx="2" stroke="#0f172a" strokeWidth="1.5" fill="none" />
        <rect x="42" y="29" width="8" height="6" rx="2" stroke="#0f172a" strokeWidth="1.5" fill="none" />
        <line x1="38" y1="32" x2="42" y2="32" stroke="#0f172a" strokeWidth="1.5" />
        {/* Smile */}
        <path d="M37 40 Q40 42 43 40" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
        {/* Collar / Navy Jacket */}
        <path d="M16 80 C16 58 28 54 40 54 C52 54 64 58 64 80 Z" fill="#2563eb" />
        {/* Inner Shirt */}
        <path d="M34 54 L40 64 L46 54 Z" fill="#ffffff" />
      </svg>
    </div>
  );
};
