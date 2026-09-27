export type QuoteStatus = 'pending' | 'in_review' | 'quoted' | 'converted' | 'archived';
export type QuotePriority = 'low' | 'normal' | 'high' | 'urgent';

export interface WebQuoteRequest {
  id: string;
  reference: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  serviceLabel?: string;
  location?: string;
  timeline?: string;
  estimatedBudget?: string;
  message: string;
  source: 'modal_devis' | 'contact_form';
  language?: 'fr' | 'en';
  status: QuoteStatus;
  isRead?: boolean;
  priority?: QuotePriority;
  internalNotes?: string;
  quotedAmountFcfa?: number;
  assignedTo?: string;
  assignedToName?: string;
  projectId?: string;
  clientId?: string;
  createdAt?: any;
  createdDateIso?: string;
}
