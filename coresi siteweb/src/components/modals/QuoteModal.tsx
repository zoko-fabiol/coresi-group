import React, { useState } from 'react';
import { X, Send, CheckCircle2, Calculator, AlertCircle, Copy, Check } from 'lucide-react';
import { Language } from '../../data/translations';
import { submitQuoteToFirebase } from '../../services/quotesService';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, currentLang }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'erection',
    location: 'Douala',
    timeline: '1-3 mois',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedRef, setGeneratedRef] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getServiceLabel = (srv: string) => {
    switch (srv) {
      case 'erection': return 'Montage & Érection d\'Usines';
      case 'welding': return 'Chaudronnerie & Soudage Haute Pression';
      case 'piping': return 'Tuyauterie Industrielle & Skids';
      case 'warehouses': return 'Hangars & Bâtiments Métalliques';
      case 'tanks': return 'Bacs de Stockage & Cuves Hydrocarbures';
      case 'stations': return 'Stations-Services Mobiles Conteneurisées';
      default: return srv;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitQuoteToFirebase({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      serviceLabel: getServiceLabel(formData.service),
      location: formData.location,
      timeline: formData.timeline,
      message: formData.details || `Demande d'étude chiffrée pour ${getServiceLabel(formData.service)} - Localisation: ${formData.location} - Délai: ${formData.timeline}`,
      source: 'modal_devis',
      language: currentLang,
    });

    setIsSubmitting(false);

    if (res.success && res.reference) {
      setGeneratedRef(res.reference);
      setIsSubmitted(true);
    } else {
      setErrorMessage(res.error || (currentLang === 'fr' ? 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.' : 'An error occurred while sending. Please try again.'));
    }
  };

  const handleCopyRef = () => {
    if (generatedRef) {
      navigator.clipboard.writeText(generatedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setGeneratedRef('');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: 'erection',
      location: 'Douala',
      timeline: '1-3 mois',
      details: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-emerald-950 text-emerald-400 border border-emerald-500/50 flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                {currentLang === 'fr' ? 'Transmis au Pôle Chiffrage' : 'Forwarded to Estimating Team'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white pt-2">
                {currentLang === 'fr' ? 'Demande de Devis Enregistrée !' : 'Quote Request Submitted!'}
              </h3>
            </div>

            {/* Reference Badge */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto space-y-2">
              <p className="text-[11px] text-slate-400 font-medium">
                {currentLang === 'fr' ? 'Numéro de référence de votre dossier :' : 'Your file tracking reference:'}
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg sm:text-xl font-mono font-black text-emerald-400 tracking-wider">
                  {generatedRef}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copier la référence"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {currentLang === 'fr'
                ? 'Merci pour votre confiance. Nos ingénieurs d\'études de chiffrage (Douala / Kribi) analysent vos paramètres et vous contacteront avec une proposition technique et financière sous 24 à 48 heures.'
                : 'Thank you for reaching out. Our engineering estimators (Douala / Kribi) are reviewing your parameters and will get back to you with a detailed technical proposal within 24 to 48 hours.'}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                {currentLang === 'fr' ? 'Fermer cette fenêtre' : 'Close window'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#3B7A2C]/20 border border-[#3B7A2C]/40 text-emerald-400 flex items-center justify-center shrink-0">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {currentLang === 'fr' ? 'Demande de Cotation & Devis Express' : 'Fast Quotation & Engineering Estimate'}
                </h3>
                <p className="text-xs text-slate-400">
                  {currentLang === 'fr'
                    ? 'Recevez une estimation technique préliminaire adaptée à vos contraintes de chantier.'
                    : 'Get a preliminary technical cost estimate tailored to your site constraints.'}
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nom &amp; Prénom *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="M. Jean Dupont"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Entreprise / Mandataire</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ex: Société Pétrolière ou BTP"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">E-mail Professionnel *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="direction@client.com"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+237 6XX XX XX XX"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Corps d'État</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="erection">Montage d'Usines</option>
                    <option value="chaudronnerie">Chaudronnerie</option>
                    <option value="tuyauterie">Tuyauterie ASME</option>
                    <option value="cuves">Bacs de Stockage</option>
                    <option value="charpente">Hangars Métalliques</option>
                    <option value="stations">Stations Mobiles</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Localisation Site</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Douala">Douala &amp; Environs</option>
                    <option value="Kribi">Kribi (Port / Offshore)</option>
                    <option value="Limbe">Limbé / Sud-Ouest</option>
                    <option value="Autre_Cameroun">Autre Région Cameroun</option>
                    <option value="Sous_Region">Zone CEMAC / Export</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Échéance Souhaitée</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Urgent">Urgent (&lt; 1 mois)</option>
                    <option value="1-3 mois">1 à 3 mois</option>
                    <option value="3-6 mois">3 à 6 mois</option>
                    <option value="Etude_preliminaire">Étude Préliminaire</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Spécifications ou Remarques Particulières</label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Volumes, diamètres, nuances d'acier (Carbone / Inox), contraintes d'accès ou documents disponibles..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#3B7A2C] to-emerald-600 hover:from-[#2D6020] hover:to-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Traitement en cours...' : 'Envoyer la Demande d\'Étude'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
