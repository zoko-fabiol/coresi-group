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
    <section id="produits" className="py-20 lg:py-28 bg-slate-900/40 border-t border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Products Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.items.map((prod) => (
            <div
              key={prod.id}
              className="rounded-3xl glass-panel border border-slate-800 hover:border-amber-500/40 transition-all duration-300 p-6 flex flex-col justify-between space-y-6 group shadow-xl"
            >
              <div className="space-y-4">
                {/* Image Showcase */}
                <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-slate-800">
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
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>

                {/* Specs List */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
                  <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Spécifications Clés</span>
                  </h4>
                  {prod.specs.map((sp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onOpenQuoteModal}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-amber-600 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
