export interface ServicePlan {
  id: string;
  name: string;
  price: number;
  category: string;
  bookable: boolean;
  pricingType: 'fixed' | 'custom';
  deliveryTime?: string;
  features: string[];
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  {
    id: 'seo-basic',
    name: 'Basic SEO Plan',
    price: 150000,
    category: 'SEO & Search',
    bookable: true,
    pricingType: 'fixed',
    features: [
      'Keyword research (up to 10 keywords)',
      'On-page SEO optimization',
      'Meta tags & descriptions',
      'Basic technical audit',
      'Google Search Console setup',
      'Monthly progress report'
    ]
  },
  {
    id: 'seo-standard',
    name: 'Standard SEO Plan',
    price: 300000,
    category: 'SEO & Search',
    bookable: true,
    pricingType: 'fixed',
    features: [
      'Advanced keyword research',
      'Comprehensive content audit',
      'Backlink building strategy',
      'Competitor analysis',
      'Technical SEO fixes',
      'Local SEO optimization',
      'Monthly detailed analytics'
    ]
  },
  {
    id: 'seo-multiplatform',
    name: 'Multi-platform SEO Plan',
    price: 450000,
    category: 'SEO & Search',
    bookable: true,
    pricingType: 'fixed',
    features: [
      'Cross-platform SEO strategy',
      'YouTube SEO & search optimization',
      'Social media search indexing',
      'App store optimization (if applicable)',
      'High-authority backlink building',
      'Bi-weekly strategy calls',
      'Full marketing funnel integration'
    ]
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
    ]
  }
];

export const getServiceById = (id: string) => TEKIFY_SERVICES.find(s => s.id === id);
export const getServicesByCategory = (category: string) => TEKIFY_SERVICES.filter(s => s.category === category);
