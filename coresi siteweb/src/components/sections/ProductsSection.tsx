import React from 'react';
import { Package, CheckCircle2, ArrowRight, Zap, FileText } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface ProductsSectionProps {
  currentLang: Language;
  onOpenQuoteModal: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ currentLang, onOpenQuoteModal }) => {
  const t = translations[currentLang].products;

  return (
    <section
      id="produits"
      className="py-20 lg:py-28 relative"
      style={{ backgroundColor: 'var(--bg-surface)', borderTop: `1px solid var(--border)`, borderBottom: `1px solid var(--border)` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-light)' }}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.subtitle}
          </p>
        </div>

        {/* 3 Products Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.items.map((prod) => (
            <div
              key={prod.id}
              className="glass-panel rounded-3xl border hover:border-amber-500/40 transition-all duration-300 p-6 flex flex-col justify-between space-y-6 group shadow-xl"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="space-y-4">
                {/* Image Showcase */}
                <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    {prod.badge}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold group-hover:text-amber-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {prod.title}
                  </h3>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {prod.desc}
                  </p>
                </div>

                {/* Specs List */}
                <div
                  className="p-4 rounded-2xl border space-y-2.5"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}
                >
                  <h4 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Spécifications Clés</span>
                  </h4>
                  {prod.specs.map((sp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onOpenQuoteModal}
                className="w-full py-3 rounded-xl hover:bg-amber-600 hover:text-slate-950 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md border"
                style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
              >
                <FileText className="w-4 h-4" />
                <span>Demander une Fiche Technique &amp; Prix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
