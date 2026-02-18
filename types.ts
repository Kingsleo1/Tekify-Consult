
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
