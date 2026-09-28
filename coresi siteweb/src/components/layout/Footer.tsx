import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <footer
      className="text-xs"
      style={{ backgroundColor: 'var(--bg-surface)', borderTop: `1px solid var(--border)`, color: 'var(--text-muted)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 rounded-xl p-1.5 px-2.5 shadow-md inline-flex items-center justify-center">
                <img
                  src="/images/logo/coresi_logo.png"
                  alt="CORESI Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-base font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  CORESI <span className="text-[#3B7A2C]">INTERNATIONAL</span>
                </span>
                <p className="text-[10px] uppercase font-semibold" style={{ color: 'var(--text-subtle)' }}>
                  Ingénierie &amp; Chaudronnerie Lourde
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
              {t.footer.tagline}
            </p>

            <div className="pt-2 text-[11px] space-y-1">
              <p className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Normes ASME IX, CODAP, API 650, ISO 9606</span>
              </p>
              <p style={{ color: 'var(--text-subtle)' }}>{t.footer.legalOhada}</p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
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
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <ChevronRight className="w-3 h-3" style={{ color: 'var(--text-subtle)' }} />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              {t.footer.contactInfo}
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block" style={{ color: 'var(--text-secondary)' }}>Siège &amp; Ateliers Centraux :</strong>
                  <span style={{ color: 'var(--text-muted)' }}>124, Rue Deido Bonandjo, Douala, Cameroun</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block" style={{ color: 'var(--text-secondary)' }}>Base Maritime &amp; Chantiers :</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Zone Portuaire &amp; Offshore, Kribi, Cameroun</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Téléphone : </span>
                  <a href="tel:+237682368282" className="font-mono font-semibold hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    +237 682 36 82 82 / +237 677 88 99 00
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Courriel : </span>
                  <a href="mailto:contact@coresi-group.com" className="font-medium hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    contact@coresi-group.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]"
          style={{ borderTop: `1px solid var(--border)`, color: 'var(--text-subtle)' }}
        >
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
