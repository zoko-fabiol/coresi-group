import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Building2, AlertCircle, Copy, Check } from 'lucide-react';
import { Language, translations } from '../../data/translations';
import { submitQuoteToFirebase } from '../../services/quotesService';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [sentReference, setSentReference] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const getServiceLabel = (srv: string) => {
    switch (srv) {
      case 'erection': return 'Montage d\'Usines & Unités Industrielles';
      case 'chaudronnerie': return 'Chaudronnerie Lourde & Mécano-Soudure';
      case 'tuyauterie': return 'Tuyauterie Industrielle & Skids Process';
      case 'cuves': return 'Bacs de Stockage Pétrolier & Réservoirs';
      case 'charpente': return 'Charpente Métallique & Hangars Grande Portée';
      case 'station': return 'Stations-Services Mobiles Conteneurisées';
      case 'autre': return 'Autre Projet Industriel Spécialisé';
      default: return srv || 'Demande Générale';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitQuoteToFirebase({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service || 'general',
      serviceLabel: getServiceLabel(formData.service),
      message: formData.message,
      source: 'contact_form',
      language: currentLang,
    });

    setIsSubmitting(false);

    if (res.success && res.reference) {
      setSentReference(res.reference);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } else {
      setErrorMessage(res.error || (currentLang === 'fr' ? 'Échec de l\'envoi. Veuillez réessayer.' : 'Failed to send message. Please try again.'));
    }
  };

  const handleCopyRef = () => {
    if (sentReference) {
      navigator.clipboard.writeText(sentReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    borderColor: 'var(--border)',
    color: 'var(--text-primary)',
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 relative"
      style={{ backgroundColor: 'var(--bg-surface)', borderTop: `1px solid var(--border)` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-light)' }}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Douala HQ Card */}
            <div className="p-6 rounded-3xl border space-y-3" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t.addressTitle}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.addressText}</p>
                </div>
              </div>
            </div>

            {/* Kribi Base Card */}
            <div className="p-6 rounded-3xl border space-y-3" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t.kribiTitle}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.kribiText}</p>
                </div>
              </div>
            </div>

            {/* Direct Phone & Email Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{t.phoneTitle}</span>
                </div>
                <a href="tel:+237682368282" className="text-xs block font-mono font-semibold hover:text-emerald-400 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  +237 682 36 82 82
                </a>
                <a href="tel:+237677889900" className="text-xs block font-mono font-semibold hover:text-emerald-400 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  +237 677 88 99 00
                </a>
              </div>

              <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{t.emailTitle}</span>
                </div>
                <a href="mailto:contact@coresi-group.com" className="text-xs block font-medium truncate hover:text-amber-400 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  contact@coresi-group.com
                </a>
                <a href="mailto:gic.coresi@gmail.com" className="text-xs block font-medium truncate hover:text-amber-400 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  gic.coresi@gmail.com
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
              <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{t.hoursTitle}</h4>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{t.hoursText}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border shadow-2xl relative" style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-lg sm:text-xl font-black tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
                {t.formTitle}
              </h3>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                {t.formSubtitle}
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 space-y-4 text-center animate-in fade-in zoom-in-95">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-900/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {currentLang === 'fr' ? 'Demande Transmise avec Succès !' : 'Request Successfully Submitted!'}
                    </h4>
                    <p className="text-xs text-emerald-300/90 max-w-md mx-auto">{t.successMessage}</p>
                  </div>

                  {sentReference && (
                    <div className="p-3 rounded-xl border max-w-sm mx-auto flex items-center justify-between gap-3" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
                      <div className="text-left">
                        <span className="block text-[10px] uppercase font-mono" style={{ color: 'var(--text-muted)' }}>
                          {currentLang === 'fr' ? 'Réf. Dossier' : 'Ref. Code'}
                        </span>
                        <span className="text-sm font-mono font-bold text-emerald-400 tracking-wider">
                          {sentReference}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyRef}
                        className="px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer border"
                        style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)', borderColor: 'var(--border)' }}
                        title="Copier la référence"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{copied ? (currentLang === 'fr' ? 'Copié' : 'Copied') : (currentLang === 'fr' ? 'Copier' : 'Copy')}</span>
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs hover:text-white underline cursor-pointer pt-1 block mx-auto"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {currentLang === 'fr' ? 'Envoyer une autre demande' : 'Send another inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        {t.fullName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: M. Jean MBALLA (Ingénieur)"
                        className="w-full px-3.5 py-2.5 rounded-xl border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs placeholder-slate-500 transition-all outline-none"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        {t.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@entreprise.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs placeholder-slate-500 transition-all outline-none"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        {t.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+237 6XX XX XX XX"
                        className="w-full px-3.5 py-2.5 rounded-xl border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs placeholder-slate-500 transition-all font-mono outline-none"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        {t.serviceSelect} *
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs transition-all cursor-pointer outline-none"
                        style={inputStyle}
                      >
                        <option value="">{t.servicePlaceholder}</option>
                        <option value="erection">Montage d'Usines &amp; Unités Industrielles</option>
                        <option value="chaudronnerie">Chaudronnerie Lourde &amp; Mécano-Soudure</option>
                        <option value="tuyauterie">Tuyauterie Industrielle &amp; Skids Process</option>
                        <option value="cuves">Bacs de Stockage Pétrolier &amp; Réservoirs</option>
                        <option value="charpente">Charpente Métallique &amp; Hangars Grande Portée</option>
                        <option value="station">Stations-Services Mobiles Conteneurisées</option>
                        <option value="autre">Autre Projet Industriel Spécialisé</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      {t.message} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.messagePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs placeholder-slate-500 transition-all resize-y outline-none"
                      style={inputStyle}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#3B7A2C] via-emerald-600 to-[#2D6020] hover:from-[#2D6020] hover:to-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.submitting : t.submit}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
