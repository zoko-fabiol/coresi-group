import React from 'react';
import { ShieldCheck, FileCheck2, Award, HeartHandshake } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface StandardsSectionProps {
  currentLang: Language;
}

export const StandardsSection: React.FC<StandardsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].standards;

  const icons = [
    <Award className="w-6 h-6 text-amber-400" />,
    <FileCheck2 className="w-6 h-6 text-cyan-400" />,
    <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    <HeartHandshake className="w-6 h-6 text-[#4FA33B]" />,
  ];

  return (
    <section id="normes" className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Standards Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {t.items.map((std, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row gap-5 items-start group shadow-xl"
            >
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 shrink-0 group-hover:border-emerald-500/30 transition-colors shadow-md">
                {icons[i % icons.length]}
              </div>
              <div className="space-y-2">
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-[11px] font-bold">
                  {std.code}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {std.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {std.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
