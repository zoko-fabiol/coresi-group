import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { WebQuoteRequest, QuoteStatus } from '../../types/quotes';
import { DataService } from '../dataService';
import { Project, Client, UserProfile } from '../../types';

const LOCAL_STORAGE_KEY = 'coresi_quote_requests';

// Sample demonstration quote requests if Firestore collection is initially empty
const INITIAL_DEMO_QUOTES: WebQuoteRequest[] = [
  {
    id: 'demo-dev-1',
    reference: 'DEV-2026-4821',
    name: 'Paul NGUELE',
    company: 'Société Nationale de Raffinage (SONARA)',
    email: 'p.nguele@sonara-cm.com',
    phone: '+237 699 12 34 56',
    service: 'tanks',
    serviceLabel: 'Bacs de Stockage Pétrolier & Réservoirs',
    location: 'Limbé / Sud-Ouest',
    timeline: '1-3 mois',
    estimatedBudget: '85 000 000 FCFA',
    message: 'Étude et chiffrage pour la réhabilitation de 2 bacs de stockage de brut de 5000 m³ avec remplacement des fonds de bacs et contrôle radio des soudures selon CODAP.',
    source: 'modal_devis',
    language: 'fr',
    status: 'in_review',
    isRead: true,
    priority: 'high',
    internalNotes: 'Dossier transmis à l\'ingénieur d\'études tuyauterie/chaudronnerie pour prédimensionnement des tôles.',
    quotedAmountFcfa: 82500000,
    assignedTo: 'chef_projet',
    assignedToName: 'Ing. Paul Kimbembe',
    createdDateIso: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: 'demo-dev-2',
    reference: 'DEV-2026-7914',
    name: 'Marc EBOUMBOU',
    company: 'Logistique Portuaire Kribi (LPK)',
    email: 'm.eboumbou@lpk-logistics.cm',
    phone: '+237 677 45 88 12',
    service: 'warehouses',
    serviceLabel: 'Charpente Métallique & Hangars Grande Portée',
    location: 'Kribi (Port / Offshore)',
    timeline: 'Urgent',
    estimatedBudget: '140 000 000 FCFA',
    message: 'Construction clé en main d\'un entrepôt métallique de 3600 m² (portée libre 30m sans poteau intermédiaire) avec pont roulant 10 tonnes sur la zone logistique du PAK.',
    source: 'contact_form',
    language: 'fr',
    status: 'pending',
    isRead: false,
    priority: 'urgent',
    internalNotes: '',
    quotedAmountFcfa: 0,
    assignedTo: '',
    createdDateIso: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'demo-dev-3',
    reference: 'DEV-2026-1033',
    name: 'Sarah JENKINS',
    company: 'Offshore Energy Services CEMAC',
    email: 's.jenkins@offshore-cemac.com',
    phone: '+237 680 91 22 33',
    service: 'piping',
    serviceLabel: 'Tuyauterie Industrielle & Skids Process',
    location: 'Douala & Environs',
    timeline: '3-6 mois',
    estimatedBudget: '45 000 000 FCFA',
    message: 'Fabrication en atelier et montage sur site de skids de filtration haute pression inox 316L avec épreuves hydrostatiques à 150 bars.',
    source: 'modal_devis',
    language: 'en',
    status: 'quoted',
    isRead: true,
    priority: 'normal',
    internalNotes: 'Offre technique et financière transmise au client par e-mail le 26/09/2026.',
    quotedAmountFcfa: 46200000,
    assignedTo: 'admin',
    assignedToName: 'Directeur Général',
    createdDateIso: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  }
];

export class QuoteRequestService {
  private static listeners: ((quotes: WebQuoteRequest[]) => void)[] = [];
  private static cachedQuotes: WebQuoteRequest[] = [];

  private static getStoredQuotes(): WebQuoteRequest[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}
    return INITIAL_DEMO_QUOTES;
  }

  private static setStoredQuotes(quotes: WebQuoteRequest[]) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
    } catch {}
    this.cachedQuotes = quotes;
  }

  /**
   * Real-time listener for incoming quote requests from Firestore
   */
  public static subscribeToQuoteRequests(onData: (quotes: WebQuoteRequest[]) => void): () => void {
    this.listeners.push(onData);

    // Initial emit from local cache
    const initial = this.getStoredQuotes();
    onData(initial);

    // Subscribe to Firestore collection
    let unsubscribe = () => {};
    try {
      const q = collection(db, 'quoteRequests');
      unsubscribe = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            const list: WebQuoteRequest[] = snap.docs.map((d) => {
              const data = d.data();
              return {
                id: d.id,
                reference: data.reference || `DEV-${d.id.substring(0, 6).toUpperCase()}`,
                name: data.name || 'Anonyme',
                company: data.company || '',
                email: data.email || '',
                phone: data.phone || '',
                service: data.service || 'autre',
                serviceLabel: data.serviceLabel || data.service || 'Projet Industriel',
                location: data.location || 'Douala',
                timeline: data.timeline || 'Non spécifié',
                estimatedBudget: data.estimatedBudget || '',
                message: data.message || '',
                source: data.source || 'modal_devis',
                language: data.language || 'fr',
                status: (data.status as QuoteStatus) || 'pending',
                isRead: data.isRead ?? false,
                priority: data.priority || 'normal',
                internalNotes: data.internalNotes || '',
                quotedAmountFcfa: data.quotedAmountFcfa || 0,
                assignedTo: data.assignedTo || '',
                assignedToName: data.assignedToName || '',
                projectId: data.projectId,
                clientId: data.clientId,
                createdAt: data.createdAt,
                createdDateIso: data.createdDateIso || (data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()),
              };
            });

            // Sort by creation date descending
            list.sort((a, b) => new Date(b.createdDateIso || 0).getTime() - new Date(a.createdDateIso || 0).getTime());

            this.setStoredQuotes(list);
            this.notify(list);
          } else {
            // If collection is completely empty, provide initial demo quotes and sync them
            this.setStoredQuotes(INITIAL_DEMO_QUOTES);
            this.notify(INITIAL_DEMO_QUOTES);
          }
        },
        (err) => {
          console.warn('QuoteRequests firestore listener notice:', err);
        }
      );
    } catch (err) {
      console.warn('Could not initialize quote requests Firestore sync:', err);
    }

    return () => {
      this.listeners = this.listeners.filter((l) => l !== onData);
      unsubscribe();
    };
  }

  private static notify(quotes: WebQuoteRequest[]) {
    this.listeners.forEach((fn) => {
      try {
        fn(quotes);
      } catch (e) {
        console.error('Error in quote request listener:', e);
      }
    });
  }

  /**
   * Update quote status and details in Firestore & Local storage
   */
  public static async updateQuoteStatus(
    id: string,
    status: QuoteStatus,
    extraData: Partial<WebQuoteRequest> = {}
  ): Promise<void> {
    const list = this.getStoredQuotes();
    const idx = list.findIndex((q) => q.id === id);

    const updatePayload: any = {
      status,
      ...extraData,
      updatedAt: serverTimestamp(),
    };

    if (idx >= 0) {
      list[idx] = {
        ...list[idx],
        ...extraData,
        status,
      };
      this.setStoredQuotes(list);
      this.notify(list);
    }

    try {
      await updateDoc(doc(db, 'quoteRequests', id), updatePayload);
      DataService.logAudit('quote_status_updated', 'quote', id, `Statut devis ${list[idx]?.reference || id} mis à jour : ${status.toUpperCase()}`);
    } catch (e) {
      console.warn('Could not update quote on firestore (might be local demo):', e);
    }
  }

  /**
   * Mark a quote request as read
   */
  public static async markAsRead(id: string): Promise<void> {
    const list = this.getStoredQuotes();
    const target = list.find((q) => q.id === id);
    if (target && !target.isRead) {
      target.isRead = true;
      this.setStoredQuotes(list);
      this.notify(list);

      try {
        await updateDoc(doc(db, 'quoteRequests', id), { isRead: true });
      } catch {}
    }
  }

  /**
   * Delete a quote request
   */
  public static async deleteQuote(id: string): Promise<void> {
    const list = this.getStoredQuotes().filter((q) => q.id !== id);
    this.setStoredQuotes(list);
    this.notify(list);

    try {
      await deleteDoc(doc(db, 'quoteRequests', id));
      DataService.logAudit('quote_deleted', 'quote', id, `Suppression de la demande de devis ${id}`);
    } catch (e) {
      console.warn('Could not delete quote from firestore:', e);
    }
  }

  /**
   * Converts a quote request into an official Client in CORESI Partners
   */
  public static async convertToClient(quote: WebQuoteRequest): Promise<string> {
    const clientId = `cli-${Date.now()}`;
    const newClient: Client = {
      id: clientId,
      name: quote.company && quote.company !== 'Particulier / Non spécifié' ? quote.company : quote.name,
      contactPerson: quote.name,
      email: quote.email,
      phone: quote.phone || '',
      address: quote.location || 'Douala / Kribi',
      sector: quote.serviceLabel || 'Industrie & Énergie',
      type: 'client',
      projectsCount: 0,
      totalInvoiced: quote.quotedAmountFcfa || 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    await DataService.saveClient(newClient);

    // Link client in quote
    await this.updateQuoteStatus(quote.id, quote.status, {
      clientId,
    });

    DataService.logAudit('quote_converted_to_client', 'client', clientId, `Client créé depuis la demande de devis web ${quote.reference} (${newClient.name})`);
    return clientId;
  }

  /**
   * Converts an accepted quote request into an active Project/Chantier in CORESI Projects
   */
  public static async convertToProject(
    quote: WebQuoteRequest,
    projectCode: string,
    budgetFcfa: number,
    currentUser: UserProfile
  ): Promise<string> {
    const projectId = `prj-${Date.now()}`;
    const code = projectCode || `PRJ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newProject: Project = {
      id: projectId,
      code,
      name: `${quote.serviceLabel || quote.service} — ${quote.company || quote.name}`,
      clientName: quote.company || quote.name,
      location: quote.location || 'Douala',
      description: quote.message,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 3600000 * 24 * 90).toISOString().split('T')[0],
      status: 'in_progress',
      budget: budgetFcfa || quote.quotedAmountFcfa || 15000000,
      totalExpenses: 0,
      totalInvoiced: 0,
      completionPercentage: 0,
      managerId: currentUser.uid,
      managerName: currentUser.displayName,
      documentsCount: 0,
      expensesCount: 0,
      invoicesCount: 0,
      createdAt: new Date().toISOString(),
    };

    await DataService.saveProject(newProject);

    // Update quote status to 'converted'
    await this.updateQuoteStatus(quote.id, 'converted', {
      projectId,
      quotedAmountFcfa: newProject.budget,
    });

    DataService.logAudit(
      'quote_converted_to_project',
      'project',
      projectId,
      `Chantier créé depuis le devis web ${quote.reference} -> Projet ${newProject.code} (${newProject.name})`
    );

    return projectId;
  }
}
