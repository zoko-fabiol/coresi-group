import React, { useState, useEffect } from 'react';

interface IndustrialLoaderProps {
  onLoaded?: () => void;
  minDuration?: number; // milliseconds
}

export const IndustrialLoader: React.FC<IndustrialLoaderProps> = ({ 
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

  // 5 Real Progressive Construction Stages of an Industrial Metallic Factory
  const getStageInfo = (prog: number) => {
    if (prog < 22) {
      return {
        step: '1/5',
        title: 'Fondations & Érection des poteaux IPE',
        desc: 'Ancrage des platines au sol et levage des premiers piliers...',
      };
    }
    if (prog < 48) {
      return {
        step: '2/5',
        title: 'Levage à la grue & Poutres maîtresses',
        desc: 'La grue assemble les poutres transversales et les contreventements...',
      };
    }
    if (prog < 72) {
      return {
        step: '3/5',
        title: 'Pose de la charpente de toiture (Fermes en treillis)',
        desc: 'Mise en place de la charpente industrielle triangulée...',
      };
    }
    if (prog < 90) {
      return {
        step: '4/5',
        title: 'Bardage métallique, cuve de stockage & tuyauterie',
        desc: 'Fermeture de l\'usine, intégration des cuves & équipements...',
      };
    }
    return {
      step: '5/5',
      title: 'Usine industrielle érigée • Prête aux opérations',
      desc: 'Bâtiment métallique achevé • Lancement immédiat...',
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

  // Dynamic Theme Colors (Mode Clair vs Mode Sombre)
  const theme = {
    bg: isLightMode ? '#f8fafc' : '#020617',
    cardBg: isLightMode ? '#ffffff' : '#0f172a',
    cardBorder: isLightMode ? '#e2e8f0' : '#1e293b',
    ground: isLightMode ? '#94a3b8' : '#334155',
    foundation: isLightMode ? '#64748b' : '#475569',
    steelPillar: isLightMode ? '#1e293b' : '#38bdf8',
    steelBeam: isLightMode ? '#334155' : '#0284c7',
    bracing: isLightMode ? '#475569' : '#0ea5e9',
    roofTruss: isLightMode ? '#1e293b' : '#22c55e',
    claddingWall: isLightMode ? '#334155' : '#1e293b',
    claddingRoof: isLightMode ? '#2D6020' : '#1b4313',
    craneBody: isLightMode ? '#d97706' : '#f59e0b',
    craneArm: isLightMode ? '#b45309' : '#d97706',
    craneCable: isLightMode ? '#475569' : '#94a3b8',
    gridLines: isLightMode ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)',
    textPrimary: isLightMode ? '#0f172a' : '#f8fafc',
    textSecondary: isLightMode ? '#334155' : '#cbd5e1',
    textMuted: isLightMode ? '#64748b' : '#94a3b8',
    siloBody: isLightMode ? '#cbd5e1' : '#334155',
  };

  // Calculations for progressive erection:
  // 1. Pillars rising height (0% to 22%)
  const pillarsHeight = Math.min(80, Math.max(0, (progress / 22) * 80));

  // 2. Beams appearing (22% to 48%)
  const beamsVisible = progress >= 22;
  const bracingVisible = progress >= 35;

  // 3. Roof Truss lowering/appearing (48% to 72%)
  const roofVisible = progress >= 48;
  const roofProgress = progress >= 48 ? Math.min(1, (progress - 48) / 22) : 0;
  const roofY = (1 - roofProgress) * -35; // Drops down from crane

  // 4. Cladding panels & Tank forming (72% to 90%)
  const claddingVisible = progress >= 70;
  const claddingOpacity = progress >= 70 ? Math.min(1, (progress - 70) / 18) : 0;
  const tankVisible = progress >= 75;

  // 5. Crane Trolley X position: moves dynamically to simulate lifting and placing!
  let trolleyX = 140;
  let cableLength = 40;
  let carriedPiece: 'beam' | 'truss' | 'none' = 'none';

  if (progress < 25) {
    trolleyX = 110 + (progress / 25) * 60; // 110 -> 170
    cableLength = 55;
  } else if (progress < 50) {
    // Crane carrying a horizontal steel I-beam to place on the structure
    trolleyX = 130 + ((progress - 25) / 25) * 80; // 130 -> 210
    cableLength = 35 + ((progress - 25) / 25) * 20;
    carriedPiece = progress < 45 ? 'beam' : 'none';
  } else if (progress < 75) {
    // Crane carrying the roof truss
    trolleyX = 160 + ((progress - 50) / 25) * 70; // 160 -> 230
    cableLength = 25 + ((progress - 50) / 25) * 15;
    carriedPiece = progress < 68 ? 'truss' : 'none';
  } else {
    // Crane moving back into finished resting position
    trolleyX = 260 - Math.min(60, ((progress - 75) / 25) * 60);
    cableLength = 30;
    carriedPiece = 'none';
  }

  return (
    <div
      style={{ backgroundColor: theme.bg }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none transition-all duration-700 ease-out px-4 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background blueprint grid */}
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
            ÉRECTION D'USINE &amp; CHARPENTE MÉTALLIQUE
          </span>
          <span className="hidden sm:inline" style={{ color: theme.textMuted }}>| CORESI</span>
        </div>
        <div 
          className="px-2.5 py-1 rounded-full text-[11px] font-bold border"
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
        {/* 1. LOGO DE L'ENTREPRISE (Au-dessus) */}
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
              alt="CORESI International Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
          <p className="mt-2 text-[11px] font-bold tracking-widest uppercase font-mono" style={{ color: theme.textMuted }}>
            Montage d'Usines • Hangars &amp; Charpente Lourde
          </p>
        </div>

        {/* 2. ANIMATION DE CONSTRUCTION DE L'USINE MÉTALLIQUE AVEC LA GRUE (De A à Z) */}
        <div 
          className="relative w-full max-w-md h-56 sm:h-64 rounded-3xl border p-4 shadow-xl overflow-hidden mb-5 flex flex-col items-center justify-center"
          style={{ 
            backgroundColor: theme.cardBg,
            borderColor: theme.cardBorder,
            boxShadow: isLightMode ? '0 15px 35px -10px rgba(0,0,0,0.08)' : '0 20px 40px -15px rgba(0,0,0,0.7)'
          }}
        >
          {/* Blueprint Grid pattern */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.gridLines} 1px, transparent 1px), linear-gradient(to bottom, ${theme.gridLines} 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* SVG Construction Scene */}
          <svg viewBox="0 0 420 220" className="w-full h-full relative z-10">
            {/* Ground Line & Foundation Slab */}
            <line x1="10" y1="195" x2="410" y2="195" stroke={theme.ground} strokeWidth="3" />
            {/* Concrete Pad Foundation Footings */}
            <rect x="130" y="195" width="24" height="6" fill={theme.foundation} rx="1" />
            <rect x="180" y="195" width="24" height="6" fill={theme.foundation} rx="1" />
            <rect x="230" y="195" width="24" height="6" fill={theme.foundation} rx="1" />
            <rect x="280" y="195" width="24" height="6" fill={theme.foundation} rx="1" />

            {/* ======================================================== */}
            {/* 1. GRUE DE CHANTIER (LE GROS TRUC LONG QUI POSE LES BLOCS) */}
            {/* ======================================================== */}
            <g id="tower-crane">
              {/* Crane Base & Outriggers (Stabilisateurs au sol) */}
              <rect x="35" y="190" width="30" height="6" fill="#475569" rx="1" />
              <line x1="30" y1="195" x2="70" y2="195" stroke={theme.craneBody} strokeWidth="3" />

              {/* Vertical Lattice Tower Mast (Mât treillis de la grue) */}
              <rect x="46" y="35" width="8" height="155" fill="none" stroke={theme.craneBody} strokeWidth="2" />
              {/* Lattice X Bracing inside crane mast */}
              {[45, 65, 85, 105, 125, 145, 165].map((y, i) => (
                <g key={i}>
                  <line x1="46" y1={y} x2="54" y2={y + 15} stroke={theme.craneBody} strokeWidth="1" opacity="0.7" />
                  <line x1="54" y1={y} x2="46" y2={y + 15} stroke={theme.craneBody} strokeWidth="1" opacity="0.7" />
                </g>
              ))}

              {/* Crane Operator Cabin (Cabine du grutier) */}
              <rect x="38" y="32" width="16" height="12" rx="2" fill="#1e293b" stroke={theme.craneBody} strokeWidth="1.5" />
              <rect x="40" y="34" width="6" height="6" fill="#38bdf8" /> {/* Window */}

              {/* Crane Counterweight Arm & Jib (Le grand bras horizontal / flèche) */}
              {/* Left Counter-jib with heavy counterweight blocks */}
              <line x1="15" y1="28" x2="48" y2="28" stroke={theme.craneArm} strokeWidth="3" />
              <rect x="18" y="25" width="14" height="10" rx="1" fill="#475569" stroke={theme.craneArm} strokeWidth="1" />

              {/* Crane Top Apex / Tower Peak */}
              <polygon points="48,12 38,28 58,28" fill="none" stroke={theme.craneArm} strokeWidth="2" />
              <line x1="48" y1="12" x2="20" y2="28" stroke={theme.craneCable} strokeWidth="1.2" />
              <line x1="48" y1="12" x2="160" y2="28" stroke={theme.craneCable} strokeWidth="1.2" />
              <line x1="48" y1="12" x2="330" y2="28" stroke={theme.craneCable} strokeWidth="1.2" />

              {/* Main Working Jib (La longue flèche télescopique s'étendant au-dessus du bâtiment) */}
              <line x1="48" y1="28" x2="350" y2="28" stroke={theme.craneArm} strokeWidth="3.5" />
              <line x1="54" y1="34" x2="340" y2="28" stroke={theme.craneArm} strokeWidth="1.5" opacity="0.6" />

              {/* Mobile Trolley along the Jib (Chariot qui se déplace pour poser les blocs) */}
              <rect x={trolleyX - 6} y="26" width="12" height="6" rx="1" fill={theme.craneBody} />
              
              {/* Hoist Steel Cable hanging from the trolley */}
              <line 
                x1={trolleyX} 
                y1="32" 
                x2={trolleyX} 
                y2={32 + cableLength} 
                stroke={theme.craneCable} 
                strokeWidth="1.5" 
                strokeDasharray="3 2" 
              />
              {/* Crane Hook */}
              <circle cx={trolleyX} cy={32 + cableLength} r="2.5" fill={theme.craneBody} />

              {/* Carried Element suspended on the Hook */}
              {carriedPiece === 'beam' && (
                <g transform={`translate(${trolleyX - 25}, ${32 + cableLength})`}>
                  <rect x="0" y="0" width="50" height="5" fill="#3B7A2C" stroke="#4ade80" strokeWidth="1" rx="1" />
                  <line x1="0" y1="2.5" x2="50" y2="2.5" stroke="#166534" strokeWidth="1" />
                </g>
              )}
              {carriedPiece === 'truss' && (
                <g transform={`translate(${trolleyX - 35}, ${32 + cableLength})`}>
                  <polygon points="0,15 35,0 70,15" fill="none" stroke="#3B7A2C" strokeWidth="2.5" />
                  <line x1="0" y1="15" x2="70" y2="15" stroke="#3B7A2C" strokeWidth="2" />
                </g>
              )}
            </g>

            {/* ======================================================== */}
            {/* 2. L'USINE MÉTALLIQUE EN CONSTRUCTION (STEP BY STEP)       */}
            {/* ======================================================== */}
            {/* ÉTAPE 1 : POTEAUX EN ACIER IPE (Rising Up) */}
            {progress > 3 && (
              <g id="steel-columns">
                {/* 4 Main Steel I-Columns (Poteaux métalliques) */}
                <rect x="139" y={195 - pillarsHeight} width="6" height={pillarsHeight} fill={theme.steelPillar} rx="1" />
                <rect x="189" y={195 - pillarsHeight} width="6" height={pillarsHeight} fill={theme.steelPillar} rx="1" />
                <rect x="239" y={195 - pillarsHeight} width="6" height={pillarsHeight} fill={theme.steelPillar} rx="1" />
                <rect x="289" y={195 - pillarsHeight} width="6" height={pillarsHeight} fill={theme.steelPillar} rx="1" />
              </g>
            )}

            {/* ÉTAPE 2 : POUTRES HORIZONTALES & CONTREVENTEMENTS (Beams & Bracing) */}
            {beamsVisible && (
              <g id="horizontal-beams">
                {/* Main Roof Header Beam (Poutre maîtresse en tête de poteaux) */}
                <rect x="136" y="115" width="162" height="6" fill={theme.steelBeam} rx="1" />
                {/* Mid-height girt beam */}
                <rect x="136" y="155" width="162" height="3" fill={theme.steelBeam} opacity="0.8" />

                {/* Diagonal Cross-bracing (Croix de Saint-André anti-sismique / anti-vent) */}
                {bracingVisible && (
                  <g stroke={theme.bracing} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7">
                    <line x1="142" y1="120" x2="192" y2="195" />
                    <line x1="192" y1="120" x2="142" y2="195" />
                    <line x1="242" y1="120" x2="292" y2="195" />
                    <line x1="292" y1="120" x2="242" y2="195" />
                  </g>
                )}
              </g>
            )}

            {/* ÉTAPE 3 : CHARPENTE DE TOITURE TRIANGULÉE (Fermes de toit industrielles) */}
            {roofVisible && (
              <g id="roof-structure" transform={`translate(0, ${roofY})`}>
                {/* Triangular roof trusses (2 fermes industrielles à double pente) */}
                {/* Bay 1: Truss Left */}
                <polygon 
                  points="136,115 217,75 298,115" 
                  fill="none" 
                  stroke={theme.roofTruss} 
                  strokeWidth="3" 
                />
                {/* Internal Triangular Struts & Ties */}
                <line x1="217" y1="75" x2="217" y2="115" stroke={theme.roofTruss} strokeWidth="2" />
                <line x1="176" y1="95" x2="176" y2="115" stroke={theme.roofTruss} strokeWidth="1.5" />
                <line x1="176" y1="95" x2="217" y2="115" stroke={theme.roofTruss} strokeWidth="1.5" />
                <line x1="258" y1="95" x2="258" y2="115" stroke={theme.roofTruss} strokeWidth="1.5" />
                <line x1="258" y1="95" x2="217" y2="115" stroke={theme.roofTruss} strokeWidth="1.5" />

                {/* Industrial Roof Ridge Vent (Lanterneau d'aération industrielle) */}
                <rect x="205" y="70" width="24" height="6" fill="#1e293b" stroke={theme.roofTruss} strokeWidth="1" rx="1" />
              </g>
            )}

            {/* ÉTAPE 4 & 5 : BARDAGE MÉTALLIQUE, CUVE CHAUDRONNÉE & FINITION */}
            {claddingVisible && (
              <g id="cladding-and-finish" opacity={claddingOpacity}>
                {/* Wall Cladding Panels (Bardage métallique profilé) */}
                <rect 
                  x="138" 
                  y="118" 
                  width="158" 
                  height="76" 
                  fill={theme.claddingWall} 
                  stroke={isLightMode ? '#0f172a' : '#3B7A2C'} 
                  strokeWidth="2" 
                  rx="2" 
                />
                {/* Corrugated Vertical Lines (Profil de tôle nervurée) */}
                {[150, 165, 180, 195, 210, 225, 240, 255, 270, 285].map((x, i) => (
                  <line key={i} x1={x} y1="120" x2={x} y2="192" stroke={isLightMode ? '#1e293b' : '#334155'} strokeWidth="1" opacity="0.6" />
                ))}

                {/* Upper Green CORESI Accent Band */}
                <rect x="138" y="118" width="158" height="18" fill="#3B7A2C" />

                {/* Roof Cladding (Couverture de toiture métallique) */}
                <polygon 
                  points="134,115 217,73 300,115" 
                  fill={theme.claddingRoof} 
                  stroke="#3B7A2C" 
                  strokeWidth="2" 
                />

                {/* Factory Front Sign: CORESI */}
                <rect x="180" y="122" width="74" height="11" rx="2" fill="#0f172a" stroke="#ffffff" strokeWidth="0.5" />
                <text 
                  x="217" 
                  y="130.5" 
                  fill="#ffffff" 
                  fontSize="7.5" 
                  fontWeight="900" 
                  textAnchor="middle" 
                  fontFamily="sans-serif"
                  letterSpacing="1.5"
                >
                  CORESI
                </text>

                {/* Sectional Industrial Loading Doors (Porte sectionnelle d'atelier) */}
                <rect x="150" y="152" width="36" height="42" fill="#0f172a" stroke="#64748b" strokeWidth="1" rx="1" />
                {[160, 168, 176, 184].map((y, i) => (
                  <line key={i} x1="150" y1={y} x2="186" y2={y} stroke="#334155" strokeWidth="1" />
                ))}

                {/* Factory Windows (Baies vitrées d'atelier industriel) */}
                <rect x="205" y="150" width="30" height="15" fill="#38bdf8" opacity="0.75" rx="1" />
                <line x1="220" y1="150" x2="220" y2="165" stroke="#0f172a" strokeWidth="1" />
                <line x1="205" y1="157" x2="235" y2="157" stroke="#0f172a" strokeWidth="1" />

                <rect x="245" y="150" width="30" height="15" fill="#38bdf8" opacity="0.75" rx="1" />
                <line x1="260" y1="150" x2="260" y2="165" stroke="#0f172a" strokeWidth="1" />
                <line x1="245" y1="157" x2="275" y2="157" stroke="#0f172a" strokeWidth="1" />
              </g>
            )}

            {/* ADJACENT INDUSTRIAL STORAGE TANK & PIPING (Chaudronnerie / Cuve métallique) */}
            {tankVisible && (
              <g id="storage-tank" opacity={Math.min(1, (progress - 75) / 15)}>
                {/* Cylindrical Storage Tank Body */}
                <rect x="312" y="140" width="38" height="54" rx="3" fill={theme.siloBody} stroke={isLightMode ? '#475569' : '#3B7A2C'} strokeWidth="1.5" />
                {/* Dome Roof */}
                <ellipse cx="331" cy="140" rx="19" ry="6" fill={theme.siloBody} stroke={isLightMode ? '#475569' : '#3B7A2C'} strokeWidth="1.5" />
                {/* Welded Girth Seams */}
                <line x1="312" y1="158" x2="350" y2="158" stroke="#64748b" strokeWidth="1" />
                <line x1="312" y1="176" x2="350" y2="176" stroke="#64748b" strokeWidth="1" />
                {/* Industrial Piping connecting Tank to Factory */}
                <path d="M 296 160 L 312 160" stroke="#22c55e" strokeWidth="3" fill="none" />
                <path d="M 331 134 L 331 120 L 298 120" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                {/* Vertical Access Ladder */}
                <line x1="346" y1="140" x2="346" y2="194" stroke="#475569" strokeWidth="1.5" />
              </g>
            )}

            {/* Operational Light Indicators */}
            {progress >= 95 && (
              <g>
                <circle cx="217" cy="68" r="3" fill="#22c55e" className="animate-ping" />
                <circle cx="217" cy="68" r="2" fill="#4ade80" />
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
          <div className="absolute bottom-3 right-3 text-[10px] font-mono font-semibold" style={{ color: theme.textMuted }}>
            {progress === 100 ? 'USINE PRÊTE' : 'MONTAGE EN COURS'}
          </div>
        </div>

        {/* 3. BARRE DE PROGRESSION & POURCENTAGE */}
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

        {/* Footer Subtitle */}
        <div className="mt-4 flex items-center justify-center gap-3 text-[11px] font-medium" style={{ color: theme.textMuted }}>
          <span>Érection d'Usines</span>
          <span>•</span>
          <span>Hangars &amp; Charpente Métallique</span>
          <span>•</span>
          <span>Chaudronnerie Lourde</span>
        </div>
      </div>
    </div>
  );
};
