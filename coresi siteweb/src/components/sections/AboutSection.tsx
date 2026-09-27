import React from 'react';
import { ShieldAlert, Award, Clock, CheckCircle2, Building2, MapPin } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].about;

  const valueIcons = [
    <ShieldAlert className="w-5 h-5 text-emerald-400" />,
    <Award className="w-5 h-5 text-amber-400" />,
    <Clock className="w-5 h-5 text-cyan-400" />,
    <Building2 className="w-5 h-5 text-[#4FA33B]" />,
  ];

  return (
    <section id="a-propos" className="py-20 lg:py-28 bg-slate-900/60 border-t border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800">
              <img
                src="/images/services/welding_workshop.jpg"
                alt="Ateliers de Chaudronnerie & Soudure CORESI"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3B7A2C]/20 border border-[#3B7A2C]/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Bases Opérationnelles Douala &amp; Kribi</h4>
                    <p className="text-[11px] text-slate-300">Ateliers de chaudronnerie lourde &amp; Pôle maritime offshore</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient Backlight */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#3B7A2C]/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-slate-700">
              <span>{t.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t.title} <span className="text-[#4FA33B]">{t.highlight}</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              <p>{t.text1}</p>
              <p>{t.text2}</p>
              <p className="text-slate-400 text-xs sm:text-sm">{t.text3}</p>
            </div>

            {/* 4 Values Cards Grid */}
            <div className="pt-4">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
                {t.coreValuesTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.values.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-2 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
                        {valueIcons[idx % valueIcons.length]}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {v.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-1">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
