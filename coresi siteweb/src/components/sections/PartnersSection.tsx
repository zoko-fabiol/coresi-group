import React from 'react';
import { Handshake } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface PartnersSectionProps {
  currentLang: Language;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].partners;

  const partnerLogos = [
    { name: 'TotalEnergies', src: '/images/partners/totalenergies.png' },
    { name: 'SLB Schlumberger', src: '/images/partners/slb.png' },
    { name: 'DHL Global Forwarding', src: '/images/partners/dhl.jpg' },
    { name: 'PNUD (Nations Unies)', src: '/images/partners/pnud.jpg' },
    { name: 'Perenco Oil & Gas', src: '/images/partners/partner_perenco.jpeg' },
    { name: 'Partenaire Industriel Agréé', src: '/images/partners/partner_tier1.png' },
    { name: 'Partenaire Chantiers & Mines', src: '/images/partners/partner_tier2.jpeg' },
    { name: 'Opérateur Maritime & Énergie', src: '/images/partners/partner_tier3.png' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-900/60 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Logos Grid with Glass Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center">
          {partnerLogos.map((p, idx) => (
            <div
              key={idx}
              className="h-20 sm:h-24 rounded-2xl bg-white/95 p-3 flex items-center justify-center shadow-md hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300 group cursor-pointer border border-slate-200"
              title={p.name}
            >
              <img
                src={p.src}
                alt={p.name}
                className="max-h-12 max-w-[90%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
