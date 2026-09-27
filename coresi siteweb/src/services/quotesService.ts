import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface WebQuotePayload {
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
  language: 'fr' | 'en';
}

export interface QuoteSubmissionResult {
  success: boolean;
  reference?: string;
  id?: string;
  error?: string;
}

export async function submitQuoteToFirebase(payload: WebQuotePayload): Promise<QuoteSubmissionResult> {
  try {
    const year = new Date().getFullYear();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const reference = `DEV-${year}-${randomCode}`;

    const quoteData = {
      reference,
      name: payload.name.trim(),
      company: payload.company?.trim() || 'Particulier / Non spécifié',
      email: payload.email.trim(),
      phone: payload.phone?.trim() || '',
      service: payload.service,
      serviceLabel: payload.serviceLabel || payload.service,
      location: payload.location || 'Douala / Kribi',
      timeline: payload.timeline || 'Non spécifié',
      estimatedBudget: payload.estimatedBudget || '',
      message: payload.message.trim(),
      source: payload.source,
      language: payload.language,
      status: 'pending', // 'pending' | 'in_review' | 'quoted' | 'converted' | 'archived'
      isRead: false,
      priority: 'normal',
      internalNotes: '',
      quotedAmountFcfa: 0,
      assignedTo: '',
      createdAt: serverTimestamp(),
      createdDateIso: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'quoteRequests'), quoteData);

    return {
      success: true,
      reference,
      id: docRef.id,
    };
  } catch (error: any) {
    console.error('Erreur lors de la transmission du devis sur Firebase:', error);
    return {
      success: false,
      error: error?.message || 'Erreur de transmission',
    };
  }
}
