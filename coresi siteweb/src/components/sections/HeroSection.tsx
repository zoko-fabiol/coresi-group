import React from 'react';
import { ArrowRight, ShieldCheck, Award, HardHat, FileSpreadsheet } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface HeroSectionProps {
  currentLang: Language;
  onOpenQuoteModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, onOpenQuoteModal }) => {
  const t = translations[currentLang].hero;

  return (
    <section id="accueil" className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Vignette & Industrial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/plant_erection_hd.jpg"
          alt="CORESI Érection d'Usine et Charpente Lourde"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/70" />
        <div className="absolute inset-0 bg-[radial-gradient(#3B7A2C_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <HardHat className="w-4 h-4 text-emerald-400" />
            <span>{t.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            {t.title1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#4FA33B] to-amber-400">
              {t.titleHighlight}
            </span>{' '}
            {t.title2}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            {t.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="#projets"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#3B7A2C] to-emerald-600 hover:from-[#2D6020] hover:to-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 flex items-center gap-2.5 transition-all transform active:scale-95 glow-green cursor-pointer"
            >
              <span>{t.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-emerald-500/50 text-slate-100 font-bold text-sm shadow-lg backdrop-blur-md flex items-center gap-2.5 transition-all transform active:scale-95 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>{t.ctaSecondary}</span>
            </button>
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-400 tracking-tight">
              {t.stat1Value}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{t.stat1Label}</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {t.stat2Value}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{t.stat2Label}</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 tracking-tight">
              {t.stat3Value}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{t.stat3Label}</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-cyan-400 tracking-tight">
              {t.stat4Value}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{t.stat4Label}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
