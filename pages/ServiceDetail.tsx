import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Check, ArrowRight, Globe, Smartphone, Bot, TrendingUp, Cloud, PenTool, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const IconComponent = {
    "Globe": Globe,
    "Smartphone": Smartphone,
    "Bot": Bot,
    "TrendingUp": TrendingUp,
    "Cloud": Cloud,
    "PenTool": PenTool
  }[service.icon] || Globe;

  return (
    <div className="min-h-screen pb-20">
      <PageHero 
        title={service.title}
        description={service.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-white/5">
          
          <Link to="/services" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary-500 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-8">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Overview</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.longDescription || service.description}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                      <Check className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-50 dark:bg-black/20 rounded-2xl p-8 border border-slate-200 dark:border-white/5 sticky top-24">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Starting at</h3>
                <p className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 mb-8">{service.price}</p>
                
                <div className="space-y-4">
                  <Link 
                    to="/booking"
                    state={{ serviceId: service.id }}
                    className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    Book Now
                  </Link>
                  <Link 
                    to="/contact"
                    state={{ subject: `Inquiry about ${service.title}` }}
                    className="w-full py-4 bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-xl font-bold flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;