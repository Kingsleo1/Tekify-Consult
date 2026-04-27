import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Check, Globe, ArrowLeft, Loader2 } from 'lucide-react';
import { fetchServicesAndMerge, ServicePlan } from '../services/pricingService';
import PageHero from '../components/PageHero';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServicePlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      try {
        const allServices = await fetchServicesAndMerge();
        const found = allServices.find(s => s.id === id);
        if (found) {
          setService(found);
        } else {
          setService(null);
        }
      } catch (e) {
        console.error("Error loading service detail:", e);
        setService(null);
      }
      setLoading(false);
    };
    loadService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const IconComponent = Globe;

  return (
    <div className="min-h-screen pb-32 transition-colors duration-500">
      <PageHero 
        title={service.name}
        description={service.category}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-200 dark:border-white/5">
          
          <Link to="/services" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary-600 mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-3 gap-20">
            
            <div className="lg:col-span-2 space-y-16">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-4xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white">Overview</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {service.description || "High-quality professional service tailored to your needs."}
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-10 text-slate-900 dark:text-white">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.features?.map((feature, i) => (
                    <div key={i} className="flex items-start p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group hover:border-primary-500/50 transition-all duration-500">
                      <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center mr-6 mt-0.5 flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-inner">
                        <Check className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-bold text-lg leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-900 dark:bg-white rounded-[3.5rem] p-12 shadow-2xl sticky top-32 group overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="relative">
                  <div className="w-20 h-20 bg-white/10 dark:bg-slate-900/5 rounded-2xl flex items-center justify-center text-white dark:text-slate-900 mb-10 shadow-xl">
                    <IconComponent className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 dark:text-slate-400 mb-2">Starting at</h3>
                  <p className="text-5xl font-black tracking-tighter text-white dark:text-slate-900 mb-12">
                    {service.pricingType === 'fixed' ? `₦${service.price?.toLocaleString()}` : 'Custom Price'}
                  </p>
                  
                  <div className="space-y-4">
                    <Link 
                      to="/booking#booking-form"
                      state={{ serviceId: service.id }}
                      className="w-full py-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl"
                    >
                      Book Now
                    </Link>
                    <Link 
                      to="/contact"
                      state={{ subject: `Inquiry about ${service.name}` }}
                      className="w-full py-6 bg-transparent border-2 border-white/20 dark:border-slate-900/20 text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center hover:bg-white/10 dark:hover:bg-slate-900/5 transition-all duration-300"
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
    </div>
  );
};

export default ServiceDetail;