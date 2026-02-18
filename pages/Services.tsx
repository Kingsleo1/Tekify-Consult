import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShoppingCart, Code2, Briefcase } from 'lucide-react';
import { SERVICES, ENGAGEMENT_MODELS, TECH_STACK } from '../constants';
import PageHero from '../components/PageHero';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Our Expertise"
        description="Comprehensive digital solutions tailored to elevate your business operations and customer engagement."
      />

      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-32">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id} 
              className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-slate-200 dark:border-white/5 hover:border-primary-500/50 dark:hover:border-primary-500/50 shadow-sm hover:shadow-xl transition-all duration-300 group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 bg-primary-50 dark:bg-white/10 rounded-2xl flex items-center justify-center text-primary-600 dark:text-white group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                  <span className="text-2xl font-bold">{service.title.charAt(0)}</span>
                </div>
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                  {service.price}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed h-20 overflow-hidden">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Check className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <Link 
                  to="/booking" 
                  state={{ serviceId: service.id }}
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Book Now
                  <ShoppingCart className="w-4 h-4 ml-2" />
                </Link>
                <Link 
                  to="/contact"
                  state={{ subject: `Quote for ${service.title}` }} 
                  className="inline-flex items-center justify-center px-4 py-3 border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement Models (Pricing) */}
        <div className="mb-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Engagement Models</h2>
                <p className="text-slate-600 dark:text-slate-400">Flexible pricing structures designed to fit your business needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {ENGAGEMENT_MODELS.map((model, idx) => (
                    <div key={idx} className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-slate-200 dark:border-white/5 flex flex-col hover:border-accent-purple/50 transition-all">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center mb-6 text-slate-900 dark:text-white">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{model.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{model.description}</p>
                        <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
                            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Ideal For</span>
                            <p className="text-slate-900 dark:text-white font-medium mt-1">{model.idealFor}</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            {model.features.map((feat, i) => (
                                <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                         <Link 
                            to="/contact" 
                            state={{ subject: `Inquiry about ${model.title} Model` }}
                            className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/20 text-center font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                        >
                            Choose Model
                        </Link>
                    </div>
                ))}
            </div>
        </div>

        {/* Tech Stack Detail */}
        <div className="bg-slate-50 dark:bg-white/5 rounded-[40px] p-12 md:p-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Technology Stack</h2>
                    <p className="text-slate-600 dark:text-slate-400">We use the latest tools and frameworks to ensure your digital product is future-proof.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                    {TECH_STACK.map((stack, idx) => (
                        <div key={idx}>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-primary-500" />
                                {stack.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {stack.technologies.map((tech, i) => (
                                    <span key={i} className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Custom Solution CTA */}
        <div className="mt-20 bg-gradient-to-r from-primary-600 to-accent-purple rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Need a custom enterprise solution?</h3>
              <p className="mb-8 max-w-2xl mx-auto text-white/90">
                We specialize in complex implementations for large-scale organizations. Let's discuss your requirements.
              </p>
              <Link to="/contact" className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-full font-bold hover:bg-slate-50 transition-colors">
                Contact Sales Team <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

      </div>
    </div>
  );
};

export default Services;