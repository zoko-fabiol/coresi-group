import React, { useState, useEffect } from 'react';
import { Anchor, Sparkles } from 'lucide-react';

interface NavalLoaderProps {
  onLoaded?: () => void;
  minDuration?: number; // milliseconds
}

export const NavalLoader: React.FC<NavalLoaderProps> = ({ 
  onLoaded, 
  minDuration = 2400 
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Stepped technical status message in French / Naval Engineering jargon
  const getStatusText = (prog: number) => {
    if (prog < 22) return 'Initialisation du chantier naval & modélisation 3D...';
    if (prog < 50) return 'Érection de la coque & soudage des membrures...';
    if (prog < 78) return 'Assemblage des blocs & chaudronnerie certifiée ASME...';
    if (prog < 96) return 'Contrôle non-destructif (CND) & vérification d\'étanchéité...';
    return 'Chantier naval prêt • Lancement du site...';
  };

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 25; // Update every 25ms for silky-smooth progress
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      
      setProgress(calculatedProgress);

      if (elapsed >= minDuration) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsDone(true);
            if (onLoaded) onLoaded();
          }, 650); // wait for CSS fade-out transition
        }, 250);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [minDuration, onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] text-white select-none transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background blueprint grid with subtle animated radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#3B7A2C_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Coordinate Header (High-tech shipyard vibe) */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-slate-500 tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-bold">CORESI NAVAL DOCK</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">DOUALA &amp; KRIBI</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-600">NORMES : ASME IX • ISO 9606</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
            SYS: ACTIVE
          </span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center text-center">
        {/* 1. LOGO DE L'ENTREPRISE (Au-dessus) */}
        <div className="mb-6 transform transition-transform hover:scale-105">
          <div className="bg-white/95 rounded-2xl p-2.5 px-4 shadow-2xl shadow-emerald-950/60 border border-white/20 inline-flex items-center justify-center">
            <img
              src="/images/logo/coresi_logo.png"
              alt="CORESI International Logo"
              className="h-12 sm:h-14 w-auto object-contain filter drop-shadow-sm"
            />
          </div>
          <div className="mt-2.5 flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-slate-300 uppercase">
            <span>CORESI</span>
            <span className="text-[#3B7A2C]">•</span>
            <span className="text-emerald-400">PÔLE NAVAL &amp; OFFSHORE</span>
          </div>
        </div>

        {/* 2. ANIMATION DE CONSTRUCTION NAVALE (Juste en bas du logo) */}
        <div className="relative w-full max-w-md h-52 sm:h-60 rounded-3xl bg-slate-950/70 border border-emerald-500/30 p-4 shadow-2xl backdrop-blur-xl overflow-hidden mb-6 flex items-center justify-center">
          {/* Blueprint Crosshairs & Grid inside animation box */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />
          
          {/* Top Drydock Gantry Rail */}
          <div className="absolute top-3 left-4 right-4 h-1.5 bg-slate-800 rounded flex items-center justify-between px-1">
            <div className="w-1.5 h-3 bg-amber-400 rounded-sm" />
            <div className="w-1.5 h-3 bg-amber-400 rounded-sm" />
          </div>

          {/* SVG DOCK & SHIP CONSTRUCTION ANIMATION */}
          <svg
            viewBox="0 0 400 220"
            className="w-full h-full relative z-10 filter drop-shadow-[0_0_15px_rgba(59,122,44,0.3)]"
          >
            <defs>
              {/* Ship Hull Gradient */}
              <linearGradient id="hullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              {/* Laser Scan Gradient */}
              <linearGradient id="laserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Water Gradient */}
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Drydock Wall Foundations (Cale sèche) */}
            <path
              d="M 20 180 L 50 195 L 350 195 L 380 180"
              fill="none"
              stroke="#334155"
              strokeWidth="3"
              strokeDasharray="4 4"
            />
            {/* Dock Keel Blocks (Tins de calage) */}
            <rect x="90" y="185" width="16" height="10" fill="#475569" rx="1" />
            <rect x="150" y="185" width="16" height="10" fill="#475569" rx="1" />
            <rect x="210" y="185" width="16" height="10" fill="#475569" rx="1" />
            <rect x="270" y="185" width="16" height="10" fill="#475569" rx="1" />

            {/* SHIP HULL (COQUE DU NAVIRE EN CONSTRUCTION) */}
            {/* Keel & Base Plate */}
            <path
              d="M 70 180 Q 200 185 330 180"
              stroke="#3B7A2C"
              strokeWidth="4"
              fill="none"
            />

            {/* Main Hull Body Silhouette */}
            <path
              d="M 60 115 
                 C 70 145, 90 175, 120 180 
                 L 280 180 
                 C 320 175, 345 150, 355 105 
                 L 350 95 
                 L 55 100 
                 Z"
              fill="url(#hullGrad)"
              stroke="#4FA33B"
              strokeWidth="2.5"
            />

            {/* Bulbous Bow (Bulbe d'étrave sous-marin) */}
            <ellipse cx="55" cy="170" rx="14" ry="9" fill="#1e293b" stroke="#3B7A2C" strokeWidth="2" />

            {/* Naval Structural Ribs / Membrures de Chaudronnerie Navale */}
            <g stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 3" opacity="0.6">
              <line x1="110" y1="110" x2="110" y2="180" />
              <line x1="140" y1="108" x2="140" y2="180" />
              <line x1="170" y1="105" x2="170" y2="180" />
              <line x1="200" y1="105" x2="200" y2="180" />
              <line x1="230" y1="105" x2="230" y2="180" />
              <line x1="260" y1="107" x2="260" y2="180" />
              <line x1="290" y1="110" x2="290" y2="180" />
              <line x1="320" y1="115" x2="320" y2="170" />
            </g>

            {/* Deck & Superstructure (Château / Passerelle de commandement) */}
            <rect x="235" y="70" width="70" height="30" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" rx="3" />
            <rect x="250" y="52" width="40" height="18" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" rx="2" />
            {/* Navigation Radar Mast */}
            <line x1="270" y1="36" x2="270" y2="52" stroke="#e2e8f0" strokeWidth="2" />
            <line x1="262" y1="40" x2="278" y2="40" stroke="#38bdf8" strokeWidth="2" />
            {/* Animated Rotating Radar Scan */}
            <circle cx="270" cy="38" r="3" fill="#22c55e" className="animate-ping" />

            {/* Cargo Holds / Écoutilles de pont */}
            <rect x="85" y="96" width="35" height="6" fill="#334155" stroke="#3B7A2C" strokeWidth="1" rx="1" />
            <rect x="135" y="96" width="35" height="6" fill="#334155" stroke="#3B7A2C" strokeWidth="1" rx="1" />
            <rect x="185" y="96" width="35" height="6" fill="#334155" stroke="#3B7A2C" strokeWidth="1" rx="1" />

            {/* SHIPYARD PORTAL CRANE (GRUE PORTIQUE DU CHANTIER NAVAL) */}
            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
              {/* Vertical Crane Pylon */}
              <path d="M 40 180 L 50 30 L 65 30 L 70 180" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.8" />
              {/* Crane Boom / Flèche */}
              <line x1="35" y1="35" x2="220" y2="35" stroke="#f59e0b" strokeWidth="3" />
              <line x1="45" y1="45" x2="210" y2="35" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
              {/* Crane Counterweight */}
              <rect x="25" y="28" width="18" height="14" fill="#d97706" rx="2" />

              {/* Crane Trolley with Steel Cable */}
              <rect x="150" y="32" width="12" height="7" fill="#fbbf24" rx="1" />
              <line x1="156" y1="39" x2="156" y2="85" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />

              {/* Lifted Steel Block (Bloc de coque suspendu en pose) */}
              <g transform="translate(142, 85)">
                <rect x="0" y="0" width="28" height="15" fill="#3B7A2C" stroke="#4ade80" strokeWidth="1.5" rx="2" />
                <line x1="0" y1="7" x2="28" y2="7" stroke="#15803d" strokeWidth="1" />
              </g>
            </g>

            {/* WELDING ARC & SPARKS EFFECT (ÉTINCELLES DE SOUDURE NAVALE) */}
            {/* Welding Arc 1: Joint de coque avant */}
            <g transform="translate(170, 102)">
              {/* Bright Flash */}
              <circle cx="0" cy="0" r="7" fill="#38bdf8" className="animate-ping" opacity="0.75" />
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
              {/* Sparks popping */}
              <line x1="0" y1="0" x2="-8" y2="-10" stroke="#fef08a" strokeWidth="1.5" className="animate-pulse" />
              <line x1="0" y1="0" x2="7" y2="-8" stroke="#fde047" strokeWidth="1.5" className="animate-pulse" />
              <line x1="0" y1="0" x2="9" y2="6" stroke="#67e8f9" strokeWidth="1" className="animate-pulse" />
              <line x1="0" y1="0" x2="-6" y2="7" stroke="#facc15" strokeWidth="1.2" className="animate-pulse" />
            </g>

            {/* Welding Arc 2: Membrure arrière */}
            <g transform="translate(290, 115)">
              <circle cx="0" cy="0" r="5" fill="#38bdf8" className="animate-ping" style={{ animationDelay: '0.4s' }} opacity="0.7" />
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
              <line x1="0" y1="0" x2="6" y2="-7" stroke="#fde047" strokeWidth="1.2" className="animate-pulse" />
              <line x1="0" y1="0" x2="-6" y2="-6" stroke="#67e8f9" strokeWidth="1.2" className="animate-pulse" />
            </g>

            {/* Waterline & Wave Effects (Ligne de flottaison / Eau de cale) */}
            <path
              d="M 40 182 Q 70 178, 100 182 T 160 182 T 220 182 T 280 182 T 340 182 T 380 182 L 380 200 L 40 200 Z"
              fill="url(#waterGrad)"
              className="animate-pulse"
              style={{ animationDuration: '2s' }}
            />
            <path
              d="M 50 184 Q 85 180, 120 184 T 190 184 T 260 184 T 330 184 T 370 184"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              opacity="0.7"
            />

            {/* High-Tech Sweep Scanline traversing the vessel */}
            <line
              x1={`${(progress / 100) * 320 + 40}`}
              y1="40"
              x2={`${(progress / 100) * 320 + 40}`}
              y2="190"
              stroke="url(#laserGrad)"
              strokeWidth="3"
            />
            <circle
              cx={`${(progress / 100) * 320 + 40}`}
              cy="115"
              r="4"
              fill="#10b981"
              className="animate-ping"
            />
          </svg>

          {/* Real-time Status Badge floating in bottom-left */}
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-emerald-400">
            <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
            <span>CHANTIER ACTIF</span>
          </div>

          {/* Coordinate Watermark in bottom-right */}
          <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-slate-500">
            CALE-01 • SECTEUR NAVAL
          </div>
        </div>

        {/* 3. BARRE DE PROGRESSION & POURCENTAGE */}
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-medium truncate max-w-[280px] sm:max-w-xs text-left">
              {getStatusText(progress)}
            </span>
            <span className="text-emerald-400 font-bold ml-2 text-sm">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2.5 bg-slate-900 rounded-full border border-slate-800 p-0.5 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2D6020] via-[#3B7A2C] to-emerald-400 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(59,122,44,0.8)] relative"
              style={{ width: `${progress}%` }}
            >
              {/* Light glow head */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Sub-note */}
        <p className="mt-4 text-[11px] text-slate-500 tracking-wide">
          Chaudronnerie Lourde • Charpente Métallique • Offshore &amp; Maritime
        </p>
      </div>
    </div>
  );
};
