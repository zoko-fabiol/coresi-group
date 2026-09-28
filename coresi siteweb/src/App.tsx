import React, { useState, useEffect } from 'react';
import { Language } from './data/translations';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { PartnersSection } from './components/sections/PartnersSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { StandardsSection } from './components/sections/StandardsSection';
import { ProjectsGallery } from './components/sections/ProjectsGallery';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { QuoteModal } from './components/modals/QuoteModal';
import { IndustrialLoader } from './components/ui/IndustrialLoader';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('coresi_website_lang');
      if (saved === 'fr' || saved === 'en') return saved;
    } catch {}
    return 'fr';
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('coresi_website_lang', lang);
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#3B7A2C] selection:text-white" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      {/* Intro Metal Factory Erection Preloader */}
      <IndustrialLoader minDuration={2600} />

      {/* Sticky Header */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          currentLang={currentLang}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Partners Showcase / Social Proof */}
        <PartnersSection currentLang={currentLang} />

        {/* About Company */}
        <AboutSection currentLang={currentLang} />

        {/* Industrial Trades & Services */}
        <ServicesSection
          currentLang={currentLang}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Turnkey Equipment & Products */}
        <ProductsSection
          currentLang={currentLang}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Accreditations & Standards (ASME, CODAP, ISO) */}
        <StandardsSection currentLang={currentLang} />

        {/* Flagship Projects Gallery */}
        <ProjectsGallery
          currentLang={currentLang}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Interactive Quote & Contact */}
        <ContactSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Interactive Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
};

export default App;
