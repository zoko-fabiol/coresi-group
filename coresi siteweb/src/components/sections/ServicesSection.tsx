import React from 'react';
import { Check, ArrowRight, Wrench } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface ServicesSectionProps {
  currentLang: Language;
  onOpenQuoteModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ currentLang, onOpenQuoteModal }) => {
  const t = translations[currentLang].services;

  return (
    <section id="metiers" className="py-20 lg:py-28 relative" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-light)' }}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.subtitle}
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.items.map((srv) => (
            <div
              key={srv.id}
              className="rounded-3xl border hover:border-emerald-500/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-xl"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              {/* Photo Header */}
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                  {srv.category}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {srv.title}
                  </h3>
                  <p className="text-xs mt-2 leading-relaxed font-normal" style={{ color: 'var(--text-muted)' }}>
                    {srv.desc}
                  </p>
                </div>

                {/* Feature List */}
                <div className="pt-2 space-y-2" style={{ borderTop: `1px solid var(--border)` }}>
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <div className="w-4 h-4 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-800">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Link */}
                <div className="pt-4 flex items-center justify-between" style={{ borderTop: `1px solid var(--border)` }}>
                  <button
                    onClick={onOpenQuoteModal}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Demander un chiffrage</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
