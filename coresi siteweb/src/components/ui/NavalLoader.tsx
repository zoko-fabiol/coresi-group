import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface NavalLoaderProps {
  onLoaded?: () => void;
  minDuration?: number; // milliseconds
}

export const NavalLoader: React.FC<NavalLoaderProps> = ({ 
  onLoaded, 
  minDuration = 2800 
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: light)').matches;
    }
    return false;
  });

  // Listen to system theme changes in real-time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e: MediaQueryListEvent) => setIsLightMode(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // 5 Real Progressive Construction Stages from A to Z
  const getStageInfo = (prog: number) => {
    if (prog < 22) {
      return {
        step: '1/5',
        title: 'Pose de la quille & tins de calage',
        desc: 'Fondation du navire en cale sèche...',
      };
    }
    if (prog < 45) {
      return {
        step: '2/5',
        title: 'Érection des couples & membrures',
        desc: 'Assemblage de l\'ossature métallique...',
      };
    }
    if (prog < 70) {
      return {
        step: '3/5',
        title: 'Pose du bordé & soudure de coque',
        desc: 'Fermeture et étanchéité de la structure...',
      };
    }
    if (prog < 90) {
      return {
        step: '4/5',
        title: 'Pose du pont & passerelle de commandement',
        desc: 'Installation de la superstructure & des apparaux...',
      };
    }
    return {
      step: '5/5',
      title: 'Mise en eau & navire opérationnel',
      desc: 'Contrôles validés • Lancement immédiat !',
    };
  };

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 30;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProg = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      
      setProgress(currentProg);

      if (elapsed >= minDuration) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsDone(true);
            if (onLoaded) onLoaded();
          }, 600);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [minDuration, onLoaded]);

  if (isDone) return null;

  const currentStage = getStageInfo(progress);

  // Dynamic Theme Colors
  const theme = {
    bg: isLightMode ? '#f8fafc' : '#020617',
    cardBg: isLightMode ? '#ffffff' : '#0f172a',
    cardBorder: isLightMode ? '#e2e8f0' : '#1e293b',
    dockWall: isLightMode ? '#cbd5e1' : '#334155',
    blocks: isLightMode ? '#94a3b8' : '#475569',
    gridLines: isLightMode ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)',
    textPrimary: isLightMode ? '#0f172a' : '#f8fafc',
    textSecondary: isLightMode ? '#334155' : '#cbd5e1',
    textMuted: isLightMode ? '#64748b' : '#94a3b8',
    waterColor: isLightMode ? 'rgba(14, 165, 233, 0.55)' : 'rgba(2, 132, 199, 0.65)',
    waterLine: isLightMode ? '#0284c7' : '#38bdf8',
    hullOutline: isLightMode ? '#1e293b' : '#3B7A2C',
    hullFill: isLightMode ? '#334155' : '#1e293b',
    superstructure: isLightMode ? '#e2e8f0' : '#0f172a',
    craneColor: isLightMode ? '#d97706' : '#f59e0b',
  };

  // Progressive construction variables based on %
  // 1. Keel length (0 to 180)
  const keelLength = Math.min(260, Math.max(0, (progress / 20) * 260));
  // 2. Ribs count (0 to 8 ribs)
  const ribsCount = progress >= 20 ? Math.min(8, Math.floor(((progress - 20) / 25) * 8)) : 0;
  // 3. Hull plating opacity (0 to 1 during 45% - 70%)
  const hullOpacity = progress >= 45 ? Math.min(1, (progress - 45) / 20) : 0;
  // 4. Superstructure lowering translateY (starts at -40, lands at 0 during 70% - 88%)
  const superstructureY = progress < 70 ? -50 : Math.max(0, (1 - (progress - 70) / 18) * 50);
  const superstructureOpacity = progress >= 70 ? Math.min(1, (progress - 70) / 10) : 0;
  // 5. Water level rising (during 88% - 100%)
  const waterProgress = progress >= 85 ? Math.min(1, (progress - 85) / 15) : 0;

  return (
    <div
      style={{ backgroundColor: theme.bg }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none transition-all duration-700 ease-out px-4 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background blueprint tech pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(${isLightMode ? '#cbd5e1' : '#1e293b'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Header Badge */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3B7A2C] animate-pulse" />
          <span className="font-bold tracking-wider" style={{ color: theme.textSecondary }}>
            CHANTIER NAVAL CORESI
          </span>
          <span className="hidden sm:inline" style={{ color: theme.textMuted }}>| DOUALA • KRIBI</span>
        </div>
        <div className="px-2.5 py-1 rounded-full text-[11px] font-bold border"
          style={{ 
            backgroundColor: isLightMode ? '#f1f5f9' : '#0f172a',
            borderColor: theme.cardBorder,
            color: '#3B7A2C'
          }}
        >
          {isLightMode ? 'MODE CLAIR' : 'MODE SOMBRE'}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        {/* 1. LOGO DE L'ENTREPRISE AU-DESSUS */}
        <div className="mb-5 flex flex-col items-center">
          <div 
            className="p-2.5 px-5 rounded-2xl shadow-lg border inline-flex items-center justify-center transition-transform"
            style={{ 
              backgroundColor: isLightMode ? '#ffffff' : '#0f172a',
              borderColor: theme.cardBorder,
              boxShadow: isLightMode ? '0 10px 25px -5px rgba(0,0,0,0.08)' : '0 10px 30px -5px rgba(0,0,0,0.5)'
            }}
          >
            <img
              src="/images/logo/coresi_logo.png"
              alt="CORESI International"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
          <p className="mt-2 text-[11px] font-bold tracking-widest uppercase font-mono" style={{ color: theme.textMuted }}>
            Ingénierie Métallique &amp; Construction Navale
          </p>
        </div>

        {/* 2. ANIMATION PROGRESSIVE DU BATEAU (CONSTRUCTION DE A à Z) */}
        <div 
          className="relative w-full max-w-md h-56 sm:h-64 rounded-3xl border p-4 shadow-xl overflow-hidden mb-5 flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: theme.cardBg,
            borderColor: theme.cardBorder,
            boxShadow: isLightMode ? '0 15px 35px -10px rgba(0,0,0,0.08)' : '0 20px 40px -15px rgba(0,0,0,0.7)'
          }}
        >
          {/* Internal Blueprint Grid */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.gridLines} 1px, transparent 1px), linear-gradient(to bottom, ${theme.gridLines} 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* SVG Canvas for Ship Construction */}
          <svg viewBox="0 0 400 220" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="shipHullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isLightMode ? '#475569' : '#1e293b'} />
                <stop offset="85%" stopColor={isLightMode ? '#1e293b' : '#0f172a'} />
                <stop offset="85%" stopColor="#dc2626" /> {/* Red bottom hull antifouling paint */}
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>

              <linearGradient id="waterFlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={theme.waterColor} />
                <stop offset="100%" stopColor={isLightMode ? 'rgba(2, 132, 199, 0.25)' : 'rgba(2, 6, 23, 0.4)'} />
              </linearGradient>
            </defs>

            {/* Drydock Structure (Cale sèche) */}
            <path
              d="M 25 185 L 55 198 L 345 198 L 375 185"
              fill="none"
              stroke={theme.dockWall}
              strokeWidth="2.5"
            />
            {/* Dock Keel Blocks (Tins de calage) */}
            {[80, 130, 180, 230, 280, 320].map((x, i) => (
              <rect key={i} x={x} y="190" width="14" height="8" rx="1" fill={theme.blocks} />
            ))}

            {/* ÉTAPE 1 : POSE DE LA QUILLE (0% - 22%) */}
            {progress > 2 && (
              <g>
                {/* Horizontal Keel Beam */}
                <line
                  x1="70"
                  y1="188"
                  x2={70 + keelLength}
                  y2="188"
                  stroke="#3B7A2C"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Bulbous Bow Base Circle */}
                {keelLength > 240 && (
                  <ellipse cx="65" cy="180" rx="10" ry="7" fill={theme.blocks} stroke="#3B7A2C" strokeWidth="2" />
                )}
              </g>
            )}

            {/* ÉTAPE 2 : ÉRECTION DES COUPLES & MEMBRURES (20% - 45%) */}
            {/* Ribs rise up one by one */}
            {ribsCount >= 1 && (
              <path d="M 105 188 Q 100 150 110 115" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            )}
            {ribsCount >= 2 && (
              <path d="M 135 188 Q 130 148 140 112" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            )}
            {ribsCount >= 3 && (
              <path d="M 165 188 Q 160 145 170 110" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            )}
            {ribsCount >= 4 && (
              <path d="M 195 188 Q 190 145 200 110" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            )}
            {ribsCount >= 5 && (
              <path d="M 225 188 Q 220 145 230 110" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            )}
            {ribsCount >= 6 && (
              <path d="M 255 188 Q 250 146 260 110" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            )}
            {ribsCount >= 7 && (
              <path d="M 285 188 Q 280 148 290 112" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            )}
            {ribsCount >= 8 && (
              <path d="M 315 188 Q 312 150 320 115" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            )}

            {/* ÉTAPE 3 : POSE DU BORDÉ DE COQUE (45% - 70%) */}
            {hullOpacity > 0 && (
              <g opacity={hullOpacity} className="transition-opacity duration-300">
                {/* Complete Solid Hull */}
                <path
                  d="M 60 120 
                     C 70 150, 90 180, 120 188 
                     L 295 188 
                     C 325 182, 345 155, 350 110 
                     L 345 105 
                     L 55 108 
                     Z"
                  fill="url(#shipHullGrad)"
                  stroke={theme.hullOutline}
                  strokeWidth="2.5"
                />

                {/* White Waterline stripe & CORESI Green Band */}
                <path
                  d="M 62 135 Q 200 135 348 130"
                  stroke="#ffffff"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 64 140 Q 200 140 346 135"
                  stroke="#3B7A2C"
                  strokeWidth="3.5"
                  fill="none"
                />

                {/* Bulbous Bow Plating */}
                <ellipse cx="58" cy="180" rx="12" ry="8" fill="#dc2626" stroke="#b91c1c" strokeWidth="1.5" />

                {/* Hull Inscription: CORESI */}
                <text
                  x="145"
                  y="126"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  letterSpacing="2"
                >
                  CORESI
                </text>
              </g>
            )}

            {/* ÉTAPE 4 : SUPERSTRUCTURE & CHÂTEAU DESCENDU PAR GRUE (70% - 90%) */}
            {superstructureOpacity > 0 && (
              <g 
                transform={`translate(0, ${superstructureY})`} 
                opacity={superstructureOpacity}
                className="transition-transform duration-200"
              >
                {/* Bridge Base Tier */}
                <rect 
                  x="240" 
                  y="72" 
                  width="70" 
                  height="34" 
                  rx="3" 
                  fill={isLightMode ? '#f1f5f9' : '#1e293b'} 
                  stroke={theme.dockWall} 
                  strokeWidth="1.5" 
                />
                {/* Bridge Windows */}
                <rect x="245" y="78" width="8" height="6" rx="1" fill="#38bdf8" />
                <rect x="257" y="78" width="8" height="6" rx="1" fill="#38bdf8" />
                <rect x="269" y="78" width="8" height="6" rx="1" fill="#38bdf8" />
                <rect x="281" y="78" width="8" height="6" rx="1" fill="#38bdf8" />
                <rect x="293" y="78" width="8" height="6" rx="1" fill="#38bdf8" />

                {/* Upper Bridge Tier */}
                <rect 
                  x="252" 
                  y="52" 
                  width="45" 
                  height="20" 
                  rx="2" 
                  fill={isLightMode ? '#ffffff' : '#0f172a'} 
                  stroke={theme.dockWall} 
                  strokeWidth="1.5" 
                />
                <rect x="257" y="56" width="35" height="5" rx="1" fill="#38bdf8" />

                {/* Radar Mast & Antenna */}
                <line x1="274" y1="36" x2="274" y2="52" stroke={theme.textPrimary} strokeWidth="2" />
                <line x1="266" y1="40" x2="282" y2="40" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="274" cy="36" r="3" fill="#22c55e" className="animate-ping" />

                {/* Funnel / Cheminée CORESI */}
                <rect x="300" y="58" width="14" height="24" rx="2" fill="#1e293b" stroke={theme.dockWall} strokeWidth="1" />
                <rect x="300" y="66" width="14" height="7" fill="#3B7A2C" /> {/* Green Band */}

                {/* Cargo Deck Hatches */}
                <rect x="85" y="103" width="36" height="5" rx="1" fill="#475569" />
                <rect x="135" y="103" width="36" height="5" rx="1" fill="#475569" />
                <rect x="185" y="103" width="36" height="5" rx="1" fill="#475569" />
              </g>
            )}

            {/* Shipyard Gantry Crane (Grue qui pose la passerelle pendant étape 4) */}
            {progress >= 65 && progress < 88 && (
              <g className="animate-pulse">
                {/* Crane Boom Cable */}
                <line x1="274" y1="10" x2="274" y2={50 + superstructureY} stroke={theme.craneColor} strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="274" cy={50 + superstructureY} r="3" fill={theme.craneColor} />
              </g>
            )}

            {/* ÉTAPE 5 : MISE EN EAU DU BASSIN (85% - 100%) */}
            {waterProgress > 0 && (
              <g opacity={waterProgress}>
                {/* Flooding Water Volume */}
                <rect
                  x="30"
                  y={195 - waterProgress * 55}
                  width="340"
                  height={waterProgress * 55 + 10}
                  fill="url(#waterFlow)"
                />
                {/* Wavy Water Surface */}
                <path
                  d={`M 30 ${195 - waterProgress * 55} 
                      Q 65 ${191 - waterProgress * 55}, 100 ${195 - waterProgress * 55} 
                      T 170 ${195 - waterProgress * 55} 
                      T 240 ${195 - waterProgress * 55} 
                      T 310 ${195 - waterProgress * 55} 
                      T 370 ${195 - waterProgress * 55}`}
                  fill="none"
                  stroke={theme.waterLine}
                  strokeWidth="2.5"
                />
              </g>
            )}
          </svg>

          {/* Current Step Badge in bottom left */}
          <div 
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border shadow-sm"
            style={{ 
              backgroundColor: isLightMode ? '#f1f5f9' : '#1e293b',
              borderColor: theme.cardBorder,
              color: '#3B7A2C'
            }}
          >
            <span>ÉTAPE {currentStage.step}</span>
          </div>

          {/* Status Label in bottom right */}
          <div className="absolute bottom-3 right-3 text-[10px] font-mono" style={{ color: theme.textMuted }}>
            {progress === 100 ? 'CONSTRUCTION ACHEVÉE' : 'EN COURS D\'ASSEMBLAGE'}
          </div>
        </div>

        {/* 3. BARRE DE PROGRESSION & ÉTAPES CLAIRES */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-left truncate max-w-[280px]" style={{ color: theme.textPrimary }}>
              {currentStage.title}
            </span>
            <span className="font-mono font-black text-sm" style={{ color: '#3B7A2C' }}>
              {progress}%
            </span>
          </div>

          <p className="text-[11px] text-left" style={{ color: theme.textMuted }}>
            {currentStage.desc}
          </p>

          {/* Progress Bar Track */}
          <div 
            className="w-full h-3 rounded-full border p-0.5 overflow-hidden"
            style={{ 
              backgroundColor: isLightMode ? '#e2e8f0' : '#1e293b',
              borderColor: theme.cardBorder
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-100 ease-out shadow-md relative"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(to right, #2D6020, #3B7A2C, #4ade80)'
              }}
            >
              {/* Highlight Head */}
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/80 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Subtitle / Footer Note */}
        <div className="mt-4 flex items-center justify-center gap-3 text-[11px] font-medium" style={{ color: theme.textMuted }}>
          <span>Chaudronnerie Lourde</span>
          <span>•</span>
          <span>Soudage Certifié</span>
          <span>•</span>
          <span>Offshore Maritime</span>
        </div>
      </div>
    </div>
  );
};
