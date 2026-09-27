import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  UserCheck,
  Send,
  Trash2,
  ArrowRight,
  ExternalLink,
  Plus,
  RefreshCw,
  Eye,
  Briefcase,
  Layers,
  Check,
  Printer,
  Sparkles,
  Download,
  Flame,
  X,
  FileCheck,
  Copy,
  MessageCircle,
} from 'lucide-react';
import { WebQuoteRequest, QuoteStatus, QuotePriority } from '../../types/quotes';
import { QuoteRequestService } from '../../services/quotes/quoteRequestService';
import { QuoteWhatsAppService } from '../../services/quotes/quoteWhatsAppService';
import { UserProfile } from '../../types';

interface QuotesModuleProps {
  currentUser: UserProfile;
  onNavigateToProjects?: () => void;
  onNavigateToPartners?: () => void;
}

// Logo officiel WhatsApp
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 1.839.883 2.806.883 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.385 8.163c-.143.403-.715.748-1.02.77-.306.022-.693.078-2.227-.557-1.849-.766-3.037-2.657-3.129-2.78-.092-.123-.746-.992-.746-1.892 0-.9.47-1.346.637-1.529.167-.183.366-.23.49-.23.123 0 .246.002.354.007.113.006.264-.043.413.315.153.368.523 1.274.57 1.366.046.092.077.2.015.323-.062.123-.092.2-.184.307-.092.107-.194.24-.277.322-.092.093-.188.194-.081.378.107.184.477.787 1.025 1.275.706.629 1.301.823 1.485.915.184.092.292.077.4-.046.108-.123.461-.537.584-.721.123-.184.246-.153.415-.092.169.061 1.077.507 1.262.599.185.092.308.138.354.215.046.077.046.446-.097.849zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.442 5.176L2 22l4.981-1.309A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.05c-1.637 0-3.161-.462-4.464-1.263l-.32-.197-2.964.777.791-2.888-.21-.334A8.016 8.016 0 014 12c0-4.411 3.589-8.05 8-8.05 4.411 0 8 3.639 8 8.05 0 4.411-3.589 8.05-8 8.05z" />
  </svg>
);

export const QuotesModule: React.FC<QuotesModuleProps> = ({
  currentUser,
  onNavigateToProjects,
  onNavigateToPartners,
}) => {
  const [quotes, setQuotes] = useState<WebQuoteRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuote, setSelectedQuote] = useState<WebQuoteRequest | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [newManualModalOpen, setNewManualModalOpen] = useState<boolean>(false);

  // WhatsApp Sender Modal State
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState<boolean>(false);
  const [targetPhone, setTargetPhone] = useState<string>('');
  const [whatsAppMessage, setWhatsAppMessage] = useState<string>('');
  const [autoMarkQuoted, setAutoMarkQuoted] = useState<boolean>(true);
  const [copiedMsg, setCopiedMsg] = useState<boolean>(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Edit / Workflow state inside modal
  const [editStatus, setEditStatus] = useState<QuoteStatus>('pending');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editAssignedTo, setEditAssignedTo] = useState<string>('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Manual Quote creation state
  const [manualForm, setManualForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'tuyauterie',
    serviceLabel: 'Tuyauterie Industrielle & Skids Process',
    location: 'Douala',
    timeline: '1-3 mois',
    estimatedBudget: '',
    message: '',
    priority: 'normal' as QuotePriority,
  });

  // Subscribe to real-time quote requests
  useEffect(() => {
    setLoading(true);
    const unsubscribe = QuoteRequestService.subscribeToQuoteRequests((data) => {
      setQuotes(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Update edit form when a quote is opened in modal
  useEffect(() => {
    if (selectedQuote) {
      setEditStatus(selectedQuote.status);
      setEditNotes(selectedQuote.internalNotes || '');
      setEditAmount(selectedQuote.quotedAmountFcfa || 0);
      setEditAssignedTo(selectedQuote.assignedTo || '');
      setActionSuccessMsg(null);
      // Mark as read automatically when opened
      if (!selectedQuote.isRead) {
        QuoteRequestService.markAsRead(selectedQuote.id);
      }
    }
  }, [selectedQuote]);

  // KPIs
  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter((q) => q.status === 'pending').length;
  const inReviewQuotes = quotes.filter((q) => q.status === 'in_review').length;
  const quotedQuotes = quotes.filter((q) => q.status === 'quoted').length;
  const convertedQuotes = quotes.filter((q) => q.status === 'converted').length;

  // Filtered quotes
  const filteredQuotes = quotes.filter((q) => {
    // Status filter
    if (statusFilter !== 'all' && q.status !== statusFilter) return false;
    // Service filter
    if (serviceFilter !== 'all' && !q.service.toLowerCase().includes(serviceFilter.toLowerCase())) return false;
    // Search term
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      const matchName = q.name.toLowerCase().includes(s);
      const matchCompany = q.company?.toLowerCase().includes(s);
      const matchRef = q.reference.toLowerCase().includes(s);
      const matchEmail = q.email.toLowerCase().includes(s);
      const matchPhone = q.phone?.toLowerCase().includes(s);
      const matchLocation = q.location?.toLowerCase().includes(s);
      const matchService = q.serviceLabel?.toLowerCase().includes(s);
      if (!matchName && !matchCompany && !matchRef && !matchEmail && !matchPhone && !matchLocation && !matchService) {
        return false;
      }
    }
    return true;
  });

  const handleSaveModalChanges = async () => {
    if (!selectedQuote) return;
    await QuoteRequestService.updateQuoteStatus(selectedQuote.id, editStatus, {
      internalNotes: editNotes,
      quotedAmountFcfa: Number(editAmount) || 0,
      assignedTo: editAssignedTo,
      assignedToName: editAssignedTo === 'chef_projet' ? 'Ing. Paul Kimbembe' : editAssignedTo === 'dg' ? 'Dr. Joseph Ndoundo' : editAssignedTo,
    });
    setActionSuccessMsg('Modifications et chiffrage enregistrés avec succès !');
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const handleConvertToProject = async () => {
    if (!selectedQuote) return;
    const prjId = await QuoteRequestService.convertToProject(
      selectedQuote,
      '',
      Number(editAmount) || 0,
      currentUser
    );
    setActionSuccessMsg(`Devis converti en Projet Chantier avec succès ! Réf: ${prjId}`);
    if (onNavigateToProjects) {
      setTimeout(() => {
        setDetailModalOpen(false);
        onNavigateToProjects();
      }, 1500);
    }
  };

  const handleConvertToClient = async () => {
    if (!selectedQuote) return;
    const cliId = await QuoteRequestService.convertToClient(selectedQuote);
    setActionSuccessMsg(`Fiche Client créée dans l'annuaire Entreprises !`);
  };

  const handleDeleteQuote = async (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette demande de devis ?')) {
      await QuoteRequestService.deleteQuote(id);
      if (selectedQuote?.id === id) {
        setDetailModalOpen(false);
      }
    }
  };

  // Open WhatsApp Modal
  const handleOpenWhatsAppModal = (quote: WebQuoteRequest, amountOverride?: number) => {
    setSelectedQuote(quote);
    const amount = amountOverride !== undefined ? amountOverride : (quote.quotedAmountFcfa || editAmount || 0);
    const msg = QuoteWhatsAppService.generateQuoteMessage(
      quote,
      amount,
      editNotes || quote.internalNotes
    );
    setTargetPhone(quote.phone || '');
    setWhatsAppMessage(msg);
    setWhatsAppModalOpen(true);
  };

  // Trigger WhatsApp send
  const handleSendViaWhatsApp = async () => {
    if (!targetPhone) return;
    const ok = QuoteWhatsAppService.openWhatsApp(targetPhone, whatsAppMessage);
    if (ok && selectedQuote) {
      if (autoMarkQuoted && selectedQuote.status !== 'converted') {
        await QuoteRequestService.updateQuoteStatus(selectedQuote.id, 'quoted', {
          quotedAmountFcfa: editAmount || selectedQuote.quotedAmountFcfa,
          internalNotes: editNotes || selectedQuote.internalNotes,
        });
        setEditStatus('quoted');
      }
      setActionSuccessMsg('Discussion WhatsApp ouverte ! Devis transmis au client.');
      setWhatsAppModalOpen(false);
    }
  };

  // Download PDF
  const handleDownloadPdf = () => {
    if (!selectedQuote) return;
    QuoteWhatsAppService.generateQuotePdf(
      selectedQuote,
      editAmount || selectedQuote.quotedAmountFcfa || 0,
      editNotes || selectedQuote.internalNotes
    );
  };

  // Copy WhatsApp message to clipboard
  const handleCopyWhatsAppMessage = () => {
    navigator.clipboard.writeText(whatsAppMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  const handleCreateManualQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.email) return;

    const year = new Date().getFullYear();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newQuote: WebQuoteRequest = {
      id: `manual-${Date.now()}`,
      reference: `DEV-${year}-${randomCode}`,
      name: manualForm.name,
      company: manualForm.company || 'Client Direct',
      email: manualForm.email,
      phone: manualForm.phone,
      service: manualForm.service,
      serviceLabel: manualForm.serviceLabel,
      location: manualForm.location,
      timeline: manualForm.timeline,
      estimatedBudget: manualForm.estimatedBudget,
      message: manualForm.message,
      source: 'modal_devis',
      language: 'fr',
      status: 'pending',
      isRead: true,
      priority: manualForm.priority,
      internalNotes: `Saisi manuellement par ${currentUser.displayName}`,
      quotedAmountFcfa: 0,
      createdDateIso: new Date().toISOString(),
    };

    const currentList = [newQuote, ...quotes];
    setQuotes(currentList);
    try {
      localStorage.setItem('coresi_quote_requests', JSON.stringify(currentList));
    } catch {}

    setNewManualModalOpen(false);
    setManualForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: 'tuyauterie',
      serviceLabel: 'Tuyauterie Industrielle & Skids Process',
      location: 'Douala',
      timeline: '1-3 mois',
      estimatedBudget: '',
      message: '',
      priority: 'normal',
    });
  };

  const renderStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Nouveau / À Traiter
          </span>
        );
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" />
            En Étude Technique
          </span>
        );
      case 'quoted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <DollarSign className="w-3 h-3" />
            Devis Chiffré & Transmis
          </span>
        );
      case 'converted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Converti en Chantier
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-500/10 text-slate-400 border border-slate-500/30">
            Archivé / Sans Suite
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B7A2C] to-emerald-700 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-950/60 ring-4 ring-emerald-500/10">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Demandes de Devis & Contacts Web
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                Live Firebase Sync
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-950 text-[#25D366] border border-[#25D366]/40 flex items-center gap-1">
                <WhatsAppIcon className="w-3 h-3" />
                WhatsApp Direct Link
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Réception, chiffrage d'ingénierie et transmission directe des offres par <strong className="text-emerald-400">WhatsApp</strong> et <strong className="text-cyan-400">PDF officiel</strong> pour les prospects de <span className="text-slate-300 font-medium">www.coresi-group.com</span>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setNewManualModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3B7A2C] to-emerald-600 hover:from-[#2D6020] hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Saisie Manuelle Devis</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Demandes</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white">{totalQuotes}</span>
            <span className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <p className="text-[10px] text-slate-500">Depuis l'inauguration web</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-900/50 space-y-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            À Traiter (Nouveaux)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">{pendingQuotes}</span>
            <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400">
              <Flame className="w-4 h-4" />
            </span>
          </div>
          <p className="text-[10px] text-emerald-500/80 font-medium">Réponse sous 24h recommandée</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-blue-900/50 space-y-1">
          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">En Étude Technique</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-blue-400">{inReviewQuotes}</span>
            <span className="p-1.5 rounded-lg bg-blue-950 text-blue-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <p className="text-[10px] text-slate-500">Chiffrage BE en cours</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-purple-900/50 space-y-1">
          <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Devis Transmis</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-purple-400">{quotedQuotes}</span>
            <span className="p-1.5 rounded-lg bg-purple-950 text-[#25D366]">
              <WhatsAppIcon className="w-4 h-4" />
            </span>
          </div>
          <p className="text-[10px] text-slate-500">Envoyés via WhatsApp / Mail</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-900/50 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Chantiers Convertis</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{convertedQuotes}</span>
            <span className="p-1.5 rounded-lg bg-amber-950 text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <p className="text-[10px] text-slate-500">Transformés en projets actifs</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4">
        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'Toutes les Demandes', count: totalQuotes },
            { id: 'pending', label: 'À Traiter', count: pendingQuotes, badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800' },
            { id: 'in_review', label: 'En Étude', count: inReviewQuotes, badgeColor: 'bg-blue-950 text-blue-400 border-blue-800' },
            { id: 'quoted', label: 'Devis Envoyés', count: quotedQuotes, badgeColor: 'bg-purple-950 text-purple-400 border-purple-800' },
            { id: 'converted', label: 'Convertis', count: convertedQuotes, badgeColor: 'bg-amber-950 text-amber-400 border-amber-800' },
            { id: 'archived', label: 'Archivés', count: quotes.filter(q => q.status === 'archived').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${tab.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Service Select Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par référence (DEV-...), entreprise, nom, ville..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Tous les Pôles Métiers</option>
              <option value="erection">Montage &amp; Érection d'Usines</option>
              <option value="welding">Chaudronnerie &amp; Mécano-Soudure</option>
              <option value="tuyauterie">Tuyauterie Industrielle &amp; Skids</option>
              <option value="tanks">Bacs &amp; Cuves de Stockage</option>
              <option value="warehouses">Charpente &amp; Hangars</option>
              <option value="stations">Stations-Services Mobiles</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg text-xs cursor-pointer ${viewMode === 'cards' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-500 hover:text-white'}`}
              title="Vue Cartes"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs cursor-pointer ${viewMode === 'table' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-500 hover:text-white'}`}
              title="Vue Tableau"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Cards or Table */}
      {filteredQuotes.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Aucune demande de devis correspondante</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Aucun enregistrement ne correspond à vos filtres actuels. Modifiez votre recherche ou utilisez le bouton "Saisie Manuelle Devis".
          </p>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className={`bg-slate-900 border rounded-3xl p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between shadow-xl relative ${
                !quote.isRead ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-slate-800'
              }`}
            >
              {/* Unread indicator ribbon */}
              {!quote.isRead && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Nouveau
                </div>
              )}

              <div className="space-y-3">
                {/* Header: Ref & Date */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-black text-sm text-emerald-400 tracking-wider">
                    {quote.reference}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {quote.createdDateIso ? new Date(quote.createdDateIso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                  </span>
                </div>

                {/* Client & Company */}
                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{quote.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{quote.company || 'Client Particulier'}</span>
                  </p>
                </div>

                {/* Service Badge & Location */}
                <div className="space-y-1.5 pt-1">
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-[11px] font-semibold border border-slate-800">
                    {quote.serviceLabel || quote.service}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {quote.location || 'Douala'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {quote.timeline || '1-3 mois'}
                    </span>
                  </div>
                </div>

                {/* Message snippet */}
                <p className="text-xs text-slate-400 line-clamp-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 italic">
                  "{quote.message}"
                </p>

                {/* Chiffrage badge if present */}
                {quote.quotedAmountFcfa && quote.quotedAmountFcfa > 0 ? (
                  <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-800/60 flex items-center justify-between">
                    <span className="text-[10px] text-purple-300 font-bold uppercase">Offre Chiffrée :</span>
                    <span className="text-xs font-mono font-black text-purple-200">
                      {quote.quotedAmountFcfa.toLocaleString('fr-FR')} FCFA HT
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Footer: Status & Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div>{renderStatusBadge(quote.status)}</div>

                <div className="flex items-center gap-1.5">
                  {/* Quick WhatsApp Send Button */}
                  {quote.phone && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenWhatsAppModal(quote);
                      }}
                      className="p-2 rounded-xl bg-emerald-950/90 hover:bg-[#25D366] text-emerald-400 hover:text-white border border-emerald-800/80 transition-all cursor-pointer shadow-md"
                      title="Envoyer le devis sur WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedQuote(quote);
                      setDetailModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Consulter</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Réf. Devis</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Contact / Entreprise</th>
                  <th className="py-3 px-4">Prestation Demandée</th>
                  <th className="py-3 px-4">Localisation</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {quote.reference}
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {quote.createdDateIso ? new Date(quote.createdDateIso).toLocaleDateString('fr-FR') : ''}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{quote.name}</div>
                      <div className="text-[11px] text-slate-400">{quote.company || '—'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-200">{quote.serviceLabel || quote.service}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {quote.location || 'Douala'}
                    </td>
                    <td className="py-3 px-4">
                      {renderStatusBadge(quote.status)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {quote.phone && (
                          <button
                            type="button"
                            onClick={() => handleOpenWhatsAppModal(quote)}
                            className="p-1.5 rounded-lg bg-emerald-950 hover:bg-[#25D366] text-emerald-400 hover:text-white border border-emerald-800 transition-colors cursor-pointer"
                            title="Envoyer sur WhatsApp"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedQuote(quote);
                            setDetailModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Détails</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAIL MODAL: Comprehensive Quote Study & Actions */}
      {detailModalOpen && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-mono font-black text-emerald-400 text-sm">
                    {selectedQuote.reference}
                  </span>
                  {renderStatusBadge(editStatus)}
                </div>
                <h3 className="text-xl font-black text-white tracking-tight mt-2">
                  Dossier Technique d'Étude & Chiffrage
                </h3>
                <p className="text-xs text-slate-400">
                  Transmis le {selectedQuote.createdDateIso ? new Date(selectedQuote.createdDateIso).toLocaleString('fr-FR') : ''} via{' '}
                  <strong className="text-slate-300">{selectedQuote.source === 'modal_devis' ? 'Calculateur Devis Web' : 'Formulaire de Contact Web'}</strong>
                </p>
              </div>

              <button
                onClick={() => setDetailModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {actionSuccessMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            {/* Client Coordinates & Service Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Donneur d'Ordre / Demandeur
                </span>
                <div className="text-sm font-bold text-white">{selectedQuote.name}</div>
                <div className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{selectedQuote.company || 'Particulier / Non spécifié'}</span>
                </div>
                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  {selectedQuote.phone && (
                    <>
                      <a
                        href={`tel:${selectedQuote.phone}`}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{selectedQuote.phone}</span>
                      </a>

                      {/* WhatsApp Direct Action Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenWhatsAppModal(selectedQuote, editAmount)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Ouvrir la discussion WhatsApp"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </>
                  )}
                  {selectedQuote.email && (
                    <a
                      href={`mailto:${selectedQuote.email}?subject=CORESI%20International%20-%20Votre%20Demande%20de%20Devis%20${selectedQuote.reference}`}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>E-mail</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Paramètres du Chantier
                </span>
                <div className="text-sm font-bold text-white">{selectedQuote.serviceLabel || selectedQuote.service}</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Lieu des travaux</span>
                    <strong className="text-white">{selectedQuote.location || 'Douala'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Délai souhaité</span>
                    <strong className="text-white">{selectedQuote.timeline || '1-3 mois'}</strong>
                  </div>
                  {selectedQuote.estimatedBudget && (
                    <div className="col-span-2 pt-1">
                      <span className="text-[10px] text-slate-500 block">Budget indicatif client</span>
                      <strong className="text-amber-400 font-mono">{selectedQuote.estimatedBudget}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description & Technical Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Cahier des charges &amp; Spécifications transmises :
              </label>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                {selectedQuote.message}
              </div>
            </div>

            {/* Internal Workflow: Status, Amount, Estimator */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>Instruction &amp; Chiffrage Interne CORESI</span>
                </h4>
                {selectedQuote.phone && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono font-medium">
                    <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
                    <span>Liaison WhatsApp active ({selectedQuote.phone})</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Statut d'instruction</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as QuoteStatus)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="pending">Nouveau / À Traiter</option>
                    <option value="in_review">En Étude Technique</option>
                    <option value="quoted">Devis Chiffré &amp; Transmis</option>
                    <option value="converted">Converti en Chantier</option>
                    <option value="archived">Archivé / Sans Suite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Ingénieur Assigné</label>
                  <select
                    value={editAssignedTo}
                    onChange={(e) => setEditAssignedTo(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">Non assigné</option>
                    <option value="chef_projet">Ing. Paul Kimbembe (BE &amp; Projets)</option>
                    <option value="dg">Dr. Joseph Ndoundo (DG)</option>
                    <option value="comptable">Clarisse Bantsimba (RAF &amp; Finance)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Montant Devis Chiffré (FCFA)</label>
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(Number(e.target.value))}
                    placeholder="Ex: 52000000"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Notes Internes d'Étude &amp; Conditions Commerciales</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Nuances d'acier retenues, coût des approvisionnements, marges prévisionnelles, sous-traitance CND..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs resize-none focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Action Buttons inside Chiffrage */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveModalChanges}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Enregistrer les Modifications</span>
                </button>

                {/* Primary WhatsApp Action Button */}
                <button
                  type="button"
                  onClick={() => handleOpenWhatsAppModal(selectedQuote, editAmount)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] via-emerald-600 to-[#1ebc57] hover:from-[#1ebc57] hover:to-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-950/80 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Envoyer la Proposition sur WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Direct Workflow Conversions */}
            <div className="border-t border-slate-800 pt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleConvertToProject}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs font-bold shadow-lg shadow-amber-950 flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Convertir en Chantier / Projet</span>
                </button>

                <button
                  type="button"
                  onClick={handleConvertToClient}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Ajouter aux Clients</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Télécharger la proposition technique officielle en PDF"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Devis PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs cursor-pointer transition-colors"
                  title="Imprimer la fiche"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteQuote(selectedQuote.id)}
                  className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs cursor-pointer transition-colors"
                  title="Supprimer la demande"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WHATSAPP SENDER MODAL: Preview & Customization */}
      {whatsAppModalOpen && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                    Envoi de l'Offre Commerciale sur WhatsApp
                  </h3>
                  <p className="text-xs text-slate-400">
                    Dossier Réf. <strong className="text-emerald-400 font-mono">{selectedQuote.reference}</strong> • Client : <strong className="text-white">{selectedQuote.name}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setWhatsAppModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recipient Phone Field with formatting detection */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Numéro WhatsApp du Destinataire *
                </label>
                {(() => {
                  const check = QuoteWhatsAppService.formatPhoneNumber(targetPhone);
                  return check.isValid ? (
                    <span className="text-[10px] font-bold text-[#25D366] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                      ✓ Format valide ({check.displayFormatted})
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">
                      ⚠ Vérifiez l'indicatif
                    </span>
                  );
                })()}
              </div>

              <div className="relative">
                <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={targetPhone}
                  onChange={(e) => setTargetPhone(e.target.value)}
                  placeholder="Ex: +237 699 12 34 56 ou 699123456"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-[#25D366] focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                L'indicatif international <span className="text-emerald-400 font-mono">+237</span> (Cameroun) est automatiquement ajouté si absent.
              </p>
            </div>

            {/* Message Preview & Customization Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Texte du Message Formaté WhatsApp (Personnalisable) :
                </label>
                <button
                  type="button"
                  onClick={handleCopyWhatsAppMessage}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedMsg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMsg ? 'Copié !' : 'Copier'}</span>
                </button>
              </div>

              <textarea
                rows={9}
                value={whatsAppMessage}
                onChange={(e) => setWhatsAppMessage(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-sans leading-relaxed focus:border-[#25D366] focus:outline-none resize-y"
              />
            </div>

            {/* Auto status update checkbox */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={autoMarkQuoted}
                onChange={(e) => setAutoMarkQuoted(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded border-slate-700 bg-slate-900 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-300">
                Passer automatiquement le statut du dossier à <strong className="text-purple-400">"Devis Chiffré &amp; Transmis"</strong> après l'envoi.
              </span>
            </label>

            {/* Footer Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                title="Générer le PDF officiel à joindre dans WhatsApp"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Télécharger le Devis PDF à joindre</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWhatsAppModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs transition-colors"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-emerald-600 hover:from-[#1ebc57] hover:to-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-950 flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Ouvrir WhatsApp &amp; Envoyer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Saisie Manuelle de Devis (Comptoir / Téléphone) */}
      {newManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Saisie Manuelle d'une Demande de Devis</h3>
                  <p className="text-xs text-slate-400">Pour les prospects reçus par téléphone, WhatsApp ou au comptoir.</p>
                </div>
              </div>
              <button
                onClick={() => setNewManualModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualQuote} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nom du Contact *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                    placeholder="M. Pierre NDOUMBE"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Entreprise</label>
                  <input
                    type="text"
                    value={manualForm.company}
                    onChange={(e) => setManualForm({ ...manualForm, company: e.target.value })}
                    placeholder="Ex: Cimenteries du Cameroun"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    placeholder="contact@entreprise.cm"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Téléphone / WhatsApp</label>
                  <input
                    type="tel"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    placeholder="+237 6XX XX XX XX"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Prestation Demandée</label>
                  <select
                    value={manualForm.service}
                    onChange={(e) => {
                      const s = e.target.value;
                      let label = s;
                      if (s === 'erection') label = "Montage & Érection d'Usines";
                      if (s === 'welding') label = "Chaudronnerie & Soudage Qualifié";
                      if (s === 'tuyauterie') label = "Tuyauterie Industrielle & Skids";
                      if (s === 'tanks') label = "Bacs de Stockage & Cuves";
                      if (s === 'warehouses') label = "Charpente Métallique & Hangars";
                      if (s === 'stations') label = "Stations-Services Mobiles";
                      setManualForm({ ...manualForm, service: s, serviceLabel: label });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="erection">Montage &amp; Érection d'Usines</option>
                    <option value="welding">Chaudronnerie &amp; Soudage Qualifié</option>
                    <option value="tuyauterie">Tuyauterie Industrielle &amp; Skids</option>
                    <option value="tanks">Bacs de Stockage &amp; Cuves</option>
                    <option value="warehouses">Charpente Métallique &amp; Hangars</option>
                    <option value="stations">Stations-Services Mobiles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Localisation Chantier</label>
                  <select
                    value={manualForm.location}
                    onChange={(e) => setManualForm({ ...manualForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Douala">Douala &amp; Environs</option>
                    <option value="Kribi">Kribi (Port / Offshore)</option>
                    <option value="Limbe">Limbé / Sud-Ouest</option>
                    <option value="Edea">Edéa / Sanaga</option>
                    <option value="Sous_Region">Export CEMAC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Détails &amp; Exigences Techniques</label>
                <textarea
                  rows={3}
                  required
                  value={manualForm.message}
                  onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
                  placeholder="Dimensions, pression de service, normes requises, délai d'exécution..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewManualModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer"
                >
                  Créer le Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
