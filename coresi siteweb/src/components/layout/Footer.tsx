import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 rounded-xl p-1.5 px-2.5 shadow-md inline-flex items-center justify-center">
                <img
                  src="/images/logo/coresi_logo.png"
                  alt="CORESI Logo"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight">
                  CORESI <span className="text-[#3B7A2C]">INTERNATIONAL</span>
                </span>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">
                  Ingénierie &amp; Chaudronnerie Lourde
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Normes ASME IX, CODAP, API 650, ISO 9606</span>
              </p>
              <p>{t.footer.legalOhada}</p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {[
                { href: '#accueil', label: t.nav.home },
                { href: '#a-propos', label: t.nav.about },
                { href: '#metiers', label: t.nav.services },
                { href: '#produits', label: t.nav.products },
                { href: '#projets', label: t.nav.projects },
                { href: '#normes', label: t.nav.standards },
                { href: '#contact', label: t.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.contactInfo}
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Siège &amp; Ateliers Centraux :</strong>
                  <span className="text-slate-400">124, Rue Deido Bonandjo, Douala, Cameroun</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Base Maritime &amp; Chantiers :</strong>
                  <span className="text-slate-400">Zone Portuaire &amp; Offshore, Kribi, Cameroun</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Téléphone : </span>
                  <a href="tel:+237682368282" className="text-slate-200 hover:text-white font-mono font-semibold">
                    +237 682 36 82 82 / +237 677 88 99 00
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Courriel : </span>
                  <a href="mailto:contact@coresi-group.com" className="text-slate-200 hover:text-white font-medium">
                    contact@coresi-group.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{t.footer.rights}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
