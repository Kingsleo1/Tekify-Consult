import { supabase } from './supabaseClient';

export interface ServicePlan {
  id: string;
  name: string;
  price: number;
  category: string;
  bookable: boolean;
  pricingType: 'fixed' | 'custom';
  deliveryTime?: string;
  features: string[];
  description?: string;
}

export const TEKIFY_SERVICES: ServicePlan[] = [
  // DIGITAL MARKETING
  {
    id: 'dm-foundation',
    name: 'Foundation Visibility Plan',
    price: 150000,
    category: 'Digital Marketing',
    bookable: true,
    pricingType: 'fixed',
    features: [
      'Instagram & Facebook management',
      '12 posts monthly (3 weekly)',
      'Static & carousel designs',
      'Caption writing + hashtags',
      'Basic brand positioning',
      'Community management (work hours)',
      'Monthly performance report'
    ],
    description: "Custom, scalable, and high-performance visibility tailored to your brand identity."
  },
  {
    id: 'dm-growth',
    name: 'Brand Growth Plan',
    price: 220000,
    category: 'Digital Marketing',
    bookable: true,
    pricingType: 'fixed',
    features: [
      'Instagram, Facebook & LinkedIn',
      '16 posts monthly (4 weekly)',
      'Static + carousel + light motion graphics',
      'Strategic content pillars',
      'Advanced storytelling captions',
      'Community management',
      'Monthly analytics report'
    ],
    description: "Data-driven strategies to increase your visibility and convert leads."
  },
  {
    id: 'dm-leadgen',
    name: 'Lead Generation Plan',
    price: 280000,
    category: 'Digital Marketing',
    bookable: true,
    pricingType: 'fixed',
    features: [
      'Instagram, Facebook & LinkedIn',
      '20 posts monthly (5 weekly)',
      'Short-form video (Reels)',
      'Content calendar',
      'Lead-focused strategy',
      'Meta Ads management (ad spend excluded)',
      'WhatsApp & DM conversion support',
      'Monthly lead report'
    ],
    description: "Focus on ROI and conversion rates through strategic lead generation."
  },
  {
    id: 'dm-dominance',
    name: 'Market Dominance Plan',
    price: 350000,
    category: 'Digital Marketing',
    bookable: true,
    pricingType: 'fixed',
    features: [
      'Full social media management',
      '24 premium posts monthly',
      'High-quality Reels',
      'Authority positioning',
      'Paid ads optimization',
      'Lead funnel setup',
      'Priority community management',
      'Detailed ROI report'
    ],
    description: "Dominate your niche with our most comprehensive marketing strategy."
  },
  // WEB & APP DEVELOPMENT
  {
    id: 'web-starter',
    name: 'Starter Website',
    price: 250000,
    category: 'Web Development',
    bookable: true,
    pricingType: 'fixed',
    deliveryTime: '2–3 weeks',
    features: [
      'Up to 5 pages',
      'Mobile responsive',
      'Basic SEO setup',
      'Contact form',
      '2 revision rounds'
    ],
    description: "Professional multi-page website to kickstart your online presence."
  },
  {
    id: 'web-business',
    name: 'Business Website',
    price: 450000,
    category: 'Web Development',
    bookable: true,
    pricingType: 'fixed',
    deliveryTime: '3–5 weeks',
    features: [
      'Up to 10 pages',
      'CMS integration',
      'Blog setup',
      'Speed optimization',
      'Advanced SEO basics',
      '3 revisions'
    ],
    description: "Robust business platform with content management and optimization."
  },
  {
    id: 'web-pro-app',
    name: 'Professional Web App',
    price: 700000,
    category: 'Web/App Development',
    bookable: true,
    pricingType: 'fixed',
    deliveryTime: '5–8 weeks',
    features: [
      'Custom dashboard',
      'User authentication',
      'Database integration',
      'API integrations',
      'Admin panel',
      'Advanced UI/UX'
    ],
    description: "Complex web applications with dynamic functionality and integrations."
  },
  {
    id: 'web-enterprise',
    name: 'Enterprise Solution',
    price: 1000000,
    category: 'Enterprise Development',
    bookable: true,
    pricingType: 'custom',
    features: [
      'Full custom architecture',
      'Advanced security',
      'Scalable backend',
      'Payment integrations',
      'Multi-role system',
      'Priority support',
      'Custom timeline'
    ],
    description: "Custom software built to scale with your enterprise requirements."
  },
  // ADDITIONAL SERVICES
  {
    id: 'design-monthly',
    name: 'Graphic Design Monthly',
    price: 80000,
    category: 'Design',
    bookable: true,
    pricingType: 'fixed',
    features: [
      '10–15 designs monthly',
      'Social media creatives',
      'Marketing flyers',
      'Basic revisions'
    ],
    description: "Consistent high-quality design assets for your ongoing marketing needs."
  },
  {
    id: 'logo-package',
    name: 'Logo Design Package',
    price: 50000,
    category: 'Branding',
    bookable: true,
    pricingType: 'fixed',
    features: [
      '3 logo concepts',
      'Unlimited revisions',
      'PNG + SVG + PDF',
      'Brand color guide'
    ],
    description: "Craft a memorable identity with our professional logo design package."
  },
  {
    id: 'seo-opt',
    name: 'SEO Optimization',
    price: 120000,
    category: 'Digital Marketing',
    bookable: true,
    pricingType: 'fixed',
    features: [
      'On-page SEO',
      'Technical audit',
      'Keyword research',
      'Basic backlink setup'
    ],
    description: "Improve your search engine rankings and drive organic traffic."
  },
  {
    id: 'ads-mgmt',
    name: 'Paid Ads Management',
    price: 100000,
    category: 'Advertising',
    bookable: true,
    pricingType: 'fixed',
    features: [
      'Meta ads setup',
      'Campaign monitoring',
      'Weekly optimization',
      'Performance report'
    ],
    description: "Expert management of your paid advertising campaigns for maximum ROI."
  }
];

export const getServiceById = (id: string, currentServices: ServicePlan[] = TEKIFY_SERVICES) => 
  currentServices.find(s => s.id === id) || TEKIFY_SERVICES.find(s => s.id === id);

export const getServicesByCategory = (category: string, currentServices: ServicePlan[] = TEKIFY_SERVICES) => 
  currentServices.filter(s => s.category === category);

/**
 * Fetches services from Supabase and merges/falls back to hardcoded TEKIFY_SERVICES.
 * Ensures the service catalogue is always available even if DB fails.
 */
export const fetchServicesAndMerge = async (): Promise<ServicePlan[]> => {
  try {
    const { data, error } = await supabase
      .from('tekify_services')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.warn("Supabase fetch error, using hardcoded services:", error);
      return TEKIFY_SERVICES;
    }

    if (!data || data.length === 0) {
      console.info("Supabase returned no services, using hardcoded services.");
      return TEKIFY_SERVICES;
    }

    // Merge logic: Start with hardcoded, overwrite with DB if ID matches, or add new from DB
    const merged = [...TEKIFY_SERVICES];
    data.forEach((dbService: any) => {
      const index = merged.findIndex(s => s.id === dbService.id);
      if (index !== -1) {
        merged[index] = { ...merged[index], ...dbService };
      } else {
        merged.push(dbService as ServicePlan);
      }
    });

    return merged;
  } catch (err) {
    console.error("Critical error fetching services, falling back to hardcoded:", err);
    return TEKIFY_SERVICES;
  }
};
