import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, ChevronRight, FileText, Shield } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenQuoteModal,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const t = translations[currentLang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#accueil', label: t.home },
    { href: '#a-propos', label: t.about },
    { href: '#metiers', label: t.services },
    { href: '#produits', label: t.products },
    { href: '#projets', label: t.projects },
    { href: '#normes', label: t.standards },
    { href: '#contact', label: t.contact },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div
        className="border-b text-[11px] py-1.5 px-4 sm:px-8 hidden md:block"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Siège Douala & Ateliers Kribi, Cameroun
            </span>
            <span style={{ color: 'var(--text-subtle)' }}>|</span>
            <span className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              <Shield className="w-3.5 h-3.5 text-[#3B7A2C]" />
              Conformité ASME IX & ISO 9606 certifiée
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+237682368282"
              className="flex items-center gap-1.5 transition-colors hover:text-emerald-400"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.phone}</span>
            </a>
            <span style={{ color: 'var(--text-subtle)' }}>|</span>
            <span style={{ color: 'var(--text-muted)' }}>Lun – Ven : 07h30 – 18h00 (Astreinte 24/7)</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-2xl py-3'
            : 'backdrop-blur-md py-4'
        }`}
        style={{
          borderBottom: `1px solid var(--border)`,
          backgroundColor: isScrolled ? undefined : 'var(--glass-bg)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#accueil" className="flex items-center gap-3 group">
            <div className="bg-white/95 rounded-xl p-1.5 px-2.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/images/logo/coresi_logo.png"
                alt="CORESI International Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight group-hover:text-emerald-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                CORESI <span className="text-[#3B7A2C]">INTERNATIONAL</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold" style={{ color: 'var(--text-muted)' }}>
                Génie Industriel &amp; Métallique
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all hover:text-white hover:bg-[#3B7A2C]/80"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle Button */}
            <div
              className="flex items-center p-1 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <button
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  currentLang === 'fr'
                    ? 'bg-[#3B7A2C] text-white shadow-xs'
                    : 'hover:text-white'
                }`}
                style={currentLang !== 'fr' ? { color: 'var(--text-muted)' } : {}}
              >
                FR
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-[#3B7A2C] text-white shadow-xs'
                    : 'hover:text-white'
                }`}
                style={currentLang !== 'en' ? { color: 'var(--text-muted)' } : {}}
              >
                EN
              </button>
            </div>

            {/* Request Quote Button */}
            <button
              onClick={onOpenQuoteModal}
              className="px-4 py-2 bg-gradient-to-r from-[#3B7A2C] to-emerald-600 hover:from-[#2D6020] hover:to-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer glow-green"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.requestQuote}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <div
              className="flex items-center p-0.5 rounded-lg border sm:hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <button
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-1 text-[10px] font-bold rounded-md ${
                  currentLang === 'fr' ? 'bg-[#3B7A2C] text-white' : ''
                }`}
                style={currentLang !== 'fr' ? { color: 'var(--text-muted)' } : {}}
              >
                FR
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-[10px] font-bold rounded-md ${
                  currentLang === 'en' ? 'bg-[#3B7A2C] text-white' : ''
                }`}
                style={currentLang !== 'en' ? { color: 'var(--text-muted)' } : {}}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border transition-colors"
              style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-b px-6 py-5 space-y-3 animate-in fade-in slide-in-from-top-3"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold hover:text-emerald-400 rounded-xl transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 flex flex-col gap-3" style={{ borderTop: `1px solid var(--border)` }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 bg-[#3B7A2C] hover:bg-[#2D6020] text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{t.requestQuote}</span>
              </button>

              <a
                href="tel:+237682368282"
                className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Appel direct : {t.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
