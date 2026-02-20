import { Service, FaqItem, TechStackItem, EngagementModel, WhyTekifyItem, ProcessStep } from './types';

export const BUSINESS_INFO = {
  name: "Tekify Consult",
  website: "tekifyconsult.com.ng",
  email: "info@tekifyconsult.com.ng",
  phone: "07040586869, 08031157789",
  whatsapp: "2348031175589", // International format
  address: "4th Floor Los Angeles Mall, Kado Abuja",
  mapUrl: "https://maps.google.com/?q=Los+Angeles+Mall,+Kado,+Abuja",
  logo: "https://photos.google.com/photo/AF1QipPI5prEG-SVA3y2rzKFbF8QQZ9dNxN4J1fiA4th",
  socials: {
    facebook: "https://web.facebook.com/Mynaijakoncept",
    instagram: "https://www.instagram.com/tekifyconsult/",
    linkedin: "https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A103209812&keywords=tekify%20consult&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&sid=8sg",
    twitter: "https://www.instagram.com/tekifyconsult/"
  }
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'AI Tools', path: '/ai-tools' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: "Enterprise Web Development",
    description: "Custom, scalable, and high-performance websites tailored to your brand identity.",
    longDescription: "We build more than just websites; we architect digital experiences that drive business growth. Our enterprise web development service focuses on scalability, security, and performance. Using modern frameworks like React, Next.js, and TypeScript, we ensure your platform is SEO-optimized, accessible, and ready to handle high traffic loads. Whether you need a complex corporate portal, a SaaS dashboard, or a Progressive Web App (PWA), our engineering team delivers pixel-perfect code.",
    price: "From ₦250,000",
    icon: "Globe",
    features: ["Responsive Design", "SEO Optimization", "CMS Integration", "E-commerce Functionality", "Performance Optimization", "Secure Hosting Setup"]
  },
  {
    id: 'mobile-app',
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    longDescription: "Reach your customers wherever they are with our top-tier mobile application development services. We specialize in both native (Swift, Kotlin) and cross-platform (React Native, Flutter) solutions, allowing you to launch on both the App Store and Google Play efficiently. Our apps are known for their buttery-smooth animations, intuitive navigation, and robust offline capabilities. We handle everything from the initial UI/UX prototyping to the final submission and store optimization.",
    price: "From ₦450,000",
    icon: "Smartphone",
    features: ["iOS & Android Development", "React Native / Flutter", "UI/UX Design", "App Store Deployment", "Push Notifications", "Real-time Updates"]
  },
  {
    id: 'ai-consulting',
    title: "AI & Automation Solutions",
    description: "Integrate Artificial Intelligence to automate workflows and enhance customer experience.",
    longDescription: "Stay ahead of the curve by leveraging the power of Artificial Intelligence. Our AI & Automation services are designed to reduce operational costs and unlock new insights. We integrate advanced LLMs like Gemini and GPT-4 into your existing workflows to create smart chatbots, automated content generators, and predictive analytics dashboards. From fine-tuning models on your proprietary data to building autonomous agents, we help you harness the true potential of AI.",
    price: "Consultation",
    icon: "Bot",
    features: ["Chatbot Integration", "Process Automation", "Data Analysis", "Custom AI Models", "LLM Integration (GPT/Gemini)", "Voice Agents"]
  },
  {
    id: 'digital-marketing',
    title: "Digital Marketing & SEO",
    description: "Data-driven strategies to increase your visibility and convert leads.",
    longDescription: "A great product needs great visibility. Our Digital Marketing & SEO services are purely data-driven, focusing on ROI and conversion rates. We conduct deep keyword research, technical SEO audits, and competitor analysis to position your brand at the top of search results. Our paid advertising campaigns (PPC) are optimized daily to ensure low CPC and high click-through rates. We don't just bring traffic; we bring qualified leads that turn into paying customers.",
    price: "From ₦150,000/mo",
    icon: "TrendingUp",
    features: ["Social Media Management", "PPC Advertising", "Content Strategy", "Email Marketing", "Analytics & Reporting", "Conversion Rate Optimization"]
  },
  {
    id: 'cloud-it',
    title: "Cloud & IT Infrastructure",
    description: "Secure and scalable cloud solutions (AWS, Azure, GCP) for growing businesses.",
    longDescription: "Modernize your IT infrastructure with our comprehensive Cloud services. We help businesses migrate from on-premise servers to the cloud (AWS, Azure, GCP), ensuring 99.99% uptime and reduced maintenance costs. Our DevOps engineers set up CI/CD pipelines for faster deployment and implement rigorous security protocols to protect your sensitive data. We provide 24/7 monitoring and support to ensure your business never stops running.",
    price: "Consultation",
    icon: "Cloud",
    features: ["Cloud Migration", "Server Management", "Cybersecurity Audits", "24/7 Support", "DevOps Pipelines", "Disaster Recovery"]
  },
  {
    id: 'branding',
    title: "Brand Identity & Design",
    description: "World-class visual identity design to make your business stand out.",
    longDescription: "Your brand is your promise to your customers. Our creative team crafts compelling visual identities that resonate with your target audience. We go beyond just logo design; we create comprehensive brand guidelines, typography systems, and color palettes that ensure consistency across all touchpoints. Our UI/UX designers work hand-in-hand with developers to ensure that your digital products are not only functional but also visually stunning and emotionally engaging.",
    price: "From ₦100,000",
    icon: "PenTool",
    features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "UI/UX Prototyping", "Animation & Motion", "Print Design"]
  }
];

export const WHY_TEKIFY_ITEMS: WhyTekifyItem[] = [
  {
    id: 'expert-team',
    icon: 'Users',
    title: "Expert Team",
    shortDesc: "Top 1% of talent recruited from global tech hubs.",
    longDesc: "At Tekify Consult, we believe that great software is built by great people. Our recruitment process is rigorous, selecting only the top 1% of applicants. Our team consists of ex-FAANG engineers, PhD researchers in AI, and award-winning designers who bring world-class expertise to your project. We invest heavily in continuous learning to ensure our skills stay sharp in a rapidly evolving tech landscape.",
    stat: "10+ Years Avg Exp"
  },
  {
    id: 'on-time-delivery',
    icon: 'Clock',
    title: "On-Time Delivery",
    shortDesc: "We respect your timelines with strict project management.",
    longDesc: "Time is money. We utilize Agile methodologies and advanced project management tools like Jira and Linear to track every sprint and milestone. Our transparent reporting system means you are never left guessing about the status of your project. We have a 98% on-time delivery rate, ensuring your go-to-market strategy remains on track.",
    stat: "98% On-Time"
  },
  {
    id: 'enterprise-security',
    icon: 'Shield',
    title: "Enterprise Security",
    shortDesc: "Bank-grade security standards for all our applications.",
    longDesc: "Security is baked into our development process, not an afterthought. We implement OWASP best practices, end-to-end encryption, and regular penetration testing for all applications. Whether you are handling sensitive financial data or personal user information, our infrastructure is compliant with GDPR, NDPR, and ISO standards.",
    stat: "ISO Compliant"
  },
  {
    id: 'award-winning',
    icon: 'Award',
    title: "Award Winning",
    shortDesc: "Recognized for excellence in UI/UX and Code Quality.",
    longDesc: "Our commitment to excellence has not gone unnoticed. Tekify Consult has been recognized by industry bodies for our innovative approach to UI/UX design and our clean, maintainable codebases. We don't just meet standards; we set them. Choosing us means choosing a partner with a proven track record of excellence.",
    stat: "15+ Awards"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    step: "01",
    title: "Discovery",
    shortDesc: "We analyze your business goals and technical requirements.",
    longDesc: "The discovery phase is the foundation of our partnership. We dive deep into your business model, understand your pain points, and identify opportunities for digital transformation. We conduct stakeholder interviews, market research, and technical feasibility studies to ensure we are solving the right problems.",
    deliverables: ["Project Roadmap", "Technical Architecture", "User Personas", "SRS Document"]
  },
  {
    id: 'design',
    step: "02",
    title: "Design",
    shortDesc: "Creating intuitive and beautiful interfaces that users love.",
    longDesc: "In the design phase, we turn ideas into visual reality. Our designers create low-fidelity wireframes to map out the user journey, followed by high-fidelity interactive prototypes. We focus on human-centered design principles to ensure the final product is intuitive, accessible, and visually captivating.",
    deliverables: ["UI/UX Designs (Figma)", "Interactive Prototypes", "Design System", "Brand Assets"]
  },
  {
    id: 'develop',
    step: "03",
    title: "Develop",
    shortDesc: "Writing clean, scalable code using modern technologies.",
    longDesc: "This is where the magic happens. Our engineering team writes clean, modular, and scalable code. We use a component-driven development approach, allowing for rapid iteration and easy maintenance. We implement rigorous testing protocols, including unit tests and integration tests, to minimize bugs.",
    deliverables: ["Source Code", "API Documentation", "Staging Environment", "Test Reports"]
  },
  {
    id: 'deploy',
    step: "04",
    title: "Deploy",
    shortDesc: "Launching your product and providing ongoing support.",
    longDesc: "Launch day is just the beginning. We handle the deployment to production servers, ensuring a smooth transition with zero downtime. Post-launch, we provide comprehensive training for your team and offer maintenance packages to keep your software secure and up-to-date.",
    deliverables: ["Live Production App", "Admin Training", "User Manuals", "Maintenance Plan"]
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: "FinTech Dashboard Overhaul",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    description: "A complete redesign of a banking dashboard focusing on user experience and real-time data visualization. Resulted in a 40% increase in user engagement."
  },
  {
    id: 2,
    title: "AI Customer Support Bot",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2000&auto=format&fit=crop",
    description: "Implemented a Gemini-powered support agent for a major e-commerce retailer, reducing ticket load by 60% and providing instant 24/7 responses."
  },
  {
    id: 3,
    title: "EcoEnergy Mobile App",
    category: "Mobile Development",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    description: "Cross-platform app for tracking solar energy usage and grid contribution in real-time. Features IoT integration and predictive usage analytics."
  },
  {
    id: 4,
    title: "Cloud Migration Strategy",
    category: "Cloud Infrastructure",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    description: "Seamless migration of legacy on-premise servers to AWS for a logistics company, improving uptime to 99.99% and reducing operational costs."
  }
];

export const TEAM = [
  {
    name: "Emmanuel N.",
    role: "Lead Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    bio: "Ex-Google architect with 10+ years in scalable systems."
  },
  {
    name: "Sarah J.",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    bio: "Award-winning UX/UI designer focused on human-centered design."
  },
  {
    name: "David O.",
    role: "AI Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    bio: "PhD in Machine Learning with expertise in NLP and Computer Vision."
  }
];

export const TESTIMONIALS = [
  {
    name: "Chinedu Okafor",
    company: "Lagos Tech Hub",
    text: "Tekify Consult transformed our digital presence. Their AI integration saved us countless hours of manual work. Highly recommended!"
  },
  {
    name: "Amina Yusuf",
    company: "BlueSky Logistics",
    text: "The mobile app they developed is flawless. The design is intuitive and the performance is top-notch. A world-class team."
  },
  {
    name: "John Smith",
    company: "Global Ventures",
    text: "Professional, timely, and incredibly skilled. They migrated our entire infrastructure to the cloud without a single minute of downtime."
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of AI in Business Automation",
    date: "Oct 12, 2023",
    excerpt: "How Generative AI is reshaping the landscape of corporate efficiency and decision making.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Why Your Business Needs a Cloud Strategy",
    date: "Sep 28, 2023",
    excerpt: "Moving to the cloud isn't just about storage; it's about scalability, security, and speed.",
    image: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "UI/UX Trends to Watch in 2024",
    date: "Nov 05, 2023",
    excerpt: "From glassmorphism to bento grids, here are the design styles dominating the tech industry.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "What is your typical project timeline?",
    answer: "Timelines vary by project scope. A standard website typically takes 2-4 weeks, while complex mobile apps or custom software may take 8-12 weeks. We provide a detailed Gantt chart during the discovery phase."
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Absolutely. We offer 3 months of free maintenance with every major project. After that, we have flexible support retainers to ensure your systems remain secure and up-to-date."
  },
  {
    question: "How do you handle data security?",
    answer: "Security is our top priority. We implement SSL encryption, secure database architectures, regular penetration testing, and compliance with GDPR/NDPR regulations for all client projects."
  },
  {
    question: "Can you work with our existing team?",
    answer: "Yes, we often work in a 'Staff Augmentation' capacity. Our developers can integrate seamlessly into your existing workflows using tools like Jira, Slack, and GitHub."
  },
  {
    question: "What are your payment terms?",
    answer: "Typically, we require a 40% deposit to commence work, 30% at the mid-point milestone, and the final 30% upon project launch and sign-off. We are open to discussing milestone-based payments for larger projects."
  }
];

export const TECH_STACK: TechStackItem[] = [
  { category: "Frontend", technologies: ["React.js", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript"] },
  { category: "Backend", technologies: ["Node.js", "Python (Django/FastAPI)", "Go", "GraphQL"] },
  { category: "Mobile", technologies: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { category: "Cloud & DevOps", technologies: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD"] },
  { category: "AI & Data", technologies: ["TensorFlow", "PyTorch", "Gemini API", "OpenAI API", "Pinecone"] }
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: "Fixed Price",
    description: "Perfect for well-defined projects with clear requirements and timelines.",
    idealFor: "MVPs, Landing Pages, Small Apps",
    features: ["Defined budget", "Clear timeline", "Milestone-based payment", "No hidden costs"]
  },
  {
    title: "Time & Material",
    description: "Flexible engagement for evolving projects where requirements might change.",
    idealFor: "Large platforms, Feature updates, Consulting",
    features: ["Pay for hours worked", "High flexibility", "Regular reporting", "Scale team up/down"]
  },
  {
    title: "Dedicated Team",
    description: "Your own full-time remote engineering team managed by us.",
    idealFor: "Long-term development, Enterprise maintenance",
    features: ["Full control", "Direct communication", "Seamless integration", "Long-term partnership"]
  }
];