import { jsPDF } from 'jspdf';
import { WebQuoteRequest } from '../../types/quotes';
import { AdminConfigService } from '../adminConfigService';

export class QuoteWhatsAppService {
  /**
   * Nettoie et formate le numéro de téléphone pour l'API WhatsApp (wa.me)
   */
  public static formatPhoneNumber(phone: string): {
    cleanNumber: string;
    isValid: boolean;
    displayFormatted: string;
  } {
    if (!phone) {
      return { cleanNumber: '', isValid: false, displayFormatted: 'Numéro absent' };
    }

    // Supprimer tous les espaces, tirets, parenthèses, points
    let digits = phone.replace(/[\s\-\(\)\.]/g, '');

    // Supprimer le '+' initial s'il existe
    if (digits.startsWith('+')) {
      digits = digits.substring(1);
    }

    // Supprimer le '00' international initial
    if (digits.startsWith('00')) {
      digits = digits.substring(2);
    }

    // Si numéro local camerounais à 9 chiffres commençant par 6 ou 2 (ex: 699123456)
    if (digits.length === 9 && (digits.startsWith('6') || digits.startsWith('2'))) {
      digits = `237${digits}`;
    }

    const isValid = digits.length >= 8 && digits.length <= 15 && /^\d+$/.test(digits);

    return {
      cleanNumber: digits,
      isValid,
      displayFormatted: `+${digits}`,
    };
  }

  /**
   * Génère le texte structuré et professionnel pour WhatsApp
   */
  public static generateQuoteMessage(
    quote: WebQuoteRequest,
    amountFcfa: number,
    customNotes?: string
  ): string {
    const formattedAmount = amountFcfa > 0
      ? `${amountFcfa.toLocaleString('fr-FR')} FCFA HT`
      : 'Offre sur-mesure (détail ci-joint)';

    const clientGreeting = quote.company && quote.company !== 'Particulier / Non spécifié'
      ? `Bonjour *${quote.name}* (${quote.company})`
      : `Bonjour *${quote.name}*`;

    const serviceName = quote.serviceLabel || quote.service;
    const location = quote.location || 'Douala / Kribi';
    const timeline = quote.timeline || '1 à 3 mois';

    let message = `🏗️ *CORESI INTERNATIONAL*
_Chaudronnerie, Tuyauterie Industrielle & Montage d'Usines_
📍 *Siège :* Douala (Bonanjo) & Base Logistique : Kribi Port
─────────────────────────────

${clientGreeting},

Faisant suite à votre demande sur notre plateforme officielle (Réf. *${quote.reference}*), notre Bureau d'Études & Chiffrage a le plaisir de vous transmettre notre proposition technique et financière :

📋 *Prestation :* ${serviceName}
📍 *Lieu des travaux :* ${location}
⏱️ *Délai estimé :* ${timeline}

💰 *Montant Chiffré Estimatif :*
👉 *${formattedAmount}*

🛠️ *Détails & Spécifications Retenues :*
${customNotes || quote.internalNotes || quote.message || 'Conforme aux normes internationales ASME Section IX, CODAP et contrôles CND.'}

─────────────────────────────
📄 _Le devis technique détaillé et les spécifications peuvent vous être transmis en PDF sur simple demande._

📞 *Direction Commerciale & Chiffrage :*
• Téléphone : +237 682 36 82 82 / +237 677 88 99 00
• E-mail : contact@coresi-group.com
• Site Web : https://www.coresi-group.com

Restant à votre entière disposition pour une visite conjointe sur site ou pour tout ajustement technique.

_Service Études & Devis — CORESI International_`;

    return message;
  }

  /**
   * Ouvre la conversation WhatsApp avec le message pré-rempli
   */
  public static openWhatsApp(phone: string, message: string): boolean {
    const { cleanNumber, isValid } = this.formatPhoneNumber(phone);
    if (!isValid) return false;

    const encodedText = encodeURIComponent(message);
    const url = `https://wa.me/${cleanNumber}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  }

  /**
   * Génère et télécharge une Fiche de Devis Technique Officielle en PDF
   */
  public static generateQuotePdf(quote: WebQuoteRequest, amountFcfa: number, notes?: string): void {
    const doc = new jsPDF();
    const comp = AdminConfigService.getCompanyInfo();

    // 1. En-tête industriel sombre CORESI
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 36, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('CORESI INTERNATIONAL', 14, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(203, 213, 225);
    doc.text('Chaudronnerie Lourde • Tuyauterie Industrielle • Montage d\'Usines • Bacs de Stockage', 14, 21);
    doc.text(`${comp.address || '124, Rue Deido Bonanjo, Douala'} — Cameroun | Tél: +237 682 36 82 82 | contact@coresi-group.com`, 14, 26);

    // Ligne verte CORESI
    doc.setFillColor(59, 122, 44); // #3B7A2C
    doc.rect(0, 34, 210, 2.5, 'F');

    // 2. Titre du document
    let y = 48;
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('PROPOSITION TECHNIQUE & CHIFFRAGE', 105, y, { align: 'center' });

    y += 7;
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    doc.text(`DOSSIER N° ${quote.reference}`, 105, y, { align: 'center' });

    y += 10;
    // 3. Cadre Donneur d'Ordre & Paramètres
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, y, 182, 46, 3, 3, 'FD');

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Client / Donneur d\'Ordre :', 20, y + 8);
    doc.text('Entreprise :', 20, y + 16);
    doc.text('Téléphone / WhatsApp :', 20, y + 24);
    doc.text('E-mail :', 20, y + 32);
    doc.text('Date de la demande :', 20, y + 40);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(quote.name, 68, y + 8);
    doc.text(quote.company || 'Particulier / Non spécifié', 68, y + 16);
    doc.text(quote.phone || 'Non renseigné', 68, y + 24);
    doc.text(quote.email || 'Non renseigné', 68, y + 32);
    doc.text(quote.createdDateIso ? new Date(quote.createdDateIso).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR'), 68, y + 40);

    // Colonne droite du cadre
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Localisation :', 120, y + 8);
    doc.text('Échéance :', 120, y + 16);
    doc.text('Statut :', 120, y + 24);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(quote.location || 'Douala', 145, y + 8);
    doc.text(quote.timeline || '1-3 mois', 145, y + 16);
    doc.text('OFFRE FORMULÉE', 145, y + 24);

    y += 54;

    // 4. Objet de la prestation
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('1. DÉSIGNATION DE L\'OUVRAGE / SERVICE', 14, y);

    y += 6;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, y, 182, 12, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(59, 122, 44);
    doc.text(quote.serviceLabel || quote.service, 20, y + 8);

    y += 18;

    // 5. Spécifications techniques transmises
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('2. SPÉCIFICATIONS TECHNIQUES & CAHIER DES CHARGES', 14, y);

    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitMsg = doc.splitTextToSize(quote.message || 'Aucune spécification textuelle complémentaire.', 180);
    doc.text(splitMsg, 14, y);

    y += (splitMsg.length * 4.5) + 8;

    // 6. Notes internes et dimensionnement
    if (notes || quote.internalNotes) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text('3. CONDITIONS TECHNIQUES D\'EXÉCUTION', 14, y);

      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const splitNotes = doc.splitTextToSize(notes || quote.internalNotes || '', 180);
      doc.text(splitNotes, 14, y);
      y += (splitNotes.length * 4.5) + 8;
    }

    // 7. Bloc Prix & Montant chiffré
    doc.setFillColor(236, 253, 245); // emerald-50
    doc.setDrawColor(16, 185, 129); // emerald-500
    doc.roundedRect(14, y, 182, 26, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 95, 70);
    doc.text('MONTANT TOTAL ESTIMÉ DE LA PROPOSITION (HORS TAXES) :', 22, y + 10);

    doc.setFontSize(15);
    doc.setTextColor(4, 120, 87);
    const amountStr = amountFcfa > 0
      ? `${amountFcfa.toLocaleString('fr-FR')} FCFA HT`
      : 'ÉTUDE EN COURS (CONSULTEZ NOTRE B.E.)';
    doc.text(amountStr, 22, y + 20);

    y += 34;

    // 8. Signatures & Validations
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Fait à Douala, le ' + new Date().toLocaleDateString('fr-FR'), 14, y);

    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Pour le Client / Donneur d\'Ordre', 24, y);
    doc.text('Pour CORESI International — Direction Technique', 115, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('(Signature précédée de "Bon pour accord")', 24, y + 5);
    doc.text('Dr. Joseph Ndoundo / Ing. Paul Kimbembe', 115, y + 5);

    // Pied de page
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 287, 210, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.text('CORESI International — RCCM: RC/DLA/2012/B/1589 • NIF: M021200042875T • www.coresi-group.com', 105, 293, { align: 'center' });

    doc.save(`CORESI_Devis_${quote.reference}.pdf`);
  }
}
