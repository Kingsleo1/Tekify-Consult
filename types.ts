
export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Detailed description for the single view
  price: string;
  icon: string;
  features: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface BookingDetails {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TechStackItem {
  category: string;
  technologies: string[];
}

export interface EngagementModel {
  title: string;
  description: string;
  idealFor: string;
  features: string[];
}

export interface WhyTekifyItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
  stat?: string;
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  deliverables: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  whatsapp?: string;
}

// --- NEW TYPES FOR BOOKING & INVOICING SYSTEM ---

export interface TekifyCustomer {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  address?: string;
  created_at?: string;
}

export interface TekifyBooking {
  id?: string;
  customer_id: string;
  service_id: string;
  status: 'pending' | 'approved' | 'cancelled' | 'invoiced';
  booking_date: string;
  notes?: string;
  created_at?: string;
  tekify_customers?: TekifyCustomer;
  tekify_services?: any;
}

export interface TekifyInvoice {
  id?: string;
  invoice_number: string;
  customer_id: string;
  booking_id?: string;
  status: 'unpaid' | 'paid' | 'overdue' | 'cancelled';
  total_amount: number;
  tax_amount?: number;
  due_date?: string;
  issued_at?: string;
  paid_at?: string;
  created_at?: string;
  additional_note?: string;
  tekify_customers?: TekifyCustomer;
  tekify_invoice_items?: TekifyInvoiceItem[];
}

export interface TekifyInvoiceItem {
  id?: string;
  invoice_id: string;
  service_id: string;
  service_name: string;
  unit_price: number;
  quantity: number;
  total: number;
}

export interface TekifyReceipt {
  id?: string;
  receipt_number: string;
  invoice_id: string;
  payment_method: string;
  amount_paid: number;
  issued_at?: string;
  additional_note?: string;
  tekify_invoices?: TekifyInvoice;
}
