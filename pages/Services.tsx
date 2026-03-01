import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShoppingCart, Code2, Briefcase, Loader2 } from 'lucide-react';
import { ENGAGEMENT_MODELS, TECH_STACK } from '../constants';
import { supabase } from '../services/supabaseClient';
import { ServicePlan } from '../types';
import PageHero from '../components/PageHero';

const Services: React.FC = () => {
  const [services, setServices] = useState<ServicePlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from('tekify_services')
        .select('*')
        .order('category', { ascending: true });
      setServices(data || []);
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Our Expertise"
        description="Comprehensive digital solutions tailored to elevate your business operations and customer engagement."
      />

      <div className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services Grid - Modern Immersive Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 mb-48">
            {services.map((service, idx) => (
              <div 
                key={service.id} 
                className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-12">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-inner">
                      <span className="text-3xl font-black">{service.name.charAt(0)}</span>
                    </div>
                    <span className="inline-block px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                      ₦{Number(service.price).toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-medium text-lg">
                    {service.category}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-12">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        <div className="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Check className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100 dark:border-white/5">
                    <Link 
                      to="/booking" 
                      state={{ serviceId: service.id }}
                      className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
                    >
                      Book Now
                      <ShoppingCart className="w-5 h-5 ml-3" />
                    </Link>
                    <Link 
                      to="/contact"
                      state={{ subject: `Quote for ${service.name}` }} 
                      className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Engagement Models - Split Layout Influence */}
        <div className="mb-48">
            <div className="text-center mb-24">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-6">Partnership</h2>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-8">Engagement Models</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">Flexible pricing structures designed to fit your business needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {ENGAGEMENT_MODELS.map((model, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 border border-slate-200 dark:border-white/5 flex flex-col hover:border-accent-purple transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 group">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-10 text-slate-900 dark:text-white group-hover:bg-accent-purple group-hover:text-white transition-all duration-500 shadow-inner">
                            <Briefcase className="w-7 h-7" />
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 group-hover:text-accent-purple transition-colors">{model.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-medium mb-10 leading-relaxed">{model.description}</p>
                        
                        <div className="mb-10 p-6 bg-accent-purple/5 rounded-3xl border border-accent-purple/10">
                            <span className="text-[10px] font-black text-accent-purple uppercase tracking-[0.2em]">Ideal For</span>
                            <p className="text-slate-900 dark:text-white font-black mt-2 text-lg">{model.idealFor}</p>
                        </div>

                        <ul className="space-y-4 mb-12 flex-1">
                            {model.features.map((feat, i) => (
                                <li key={i} className="flex items-start text-sm font-bold text-slate-500 dark:text-slate-400">
                                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mr-3 mt-0.5">
                                      <Check className="w-3 h-3 text-green-500" />
                                    </div>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                         <Link 
                            to="/contact" 
                            state={{ subject: `Inquiry about ${model.title} Model` }}
                            className="w-full py-5 rounded-2xl border border-slate-200 dark:border-white/10 text-center font-black uppercase tracking-widest text-slate-900 dark:text-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all duration-500"
                        >
                            Choose Model
                        </Link>
                    </div>
                ))}
            </div>
        </div>

        {/* Consultation Process - Recipe 9 Influence */}
        <div className="mb-48">
            <div className="flex flex-col lg:flex-row gap-24 items-center">
                <div className="lg:w-1/2">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-8">Consultation Method</h2>
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-10">Strategic <br />Evolution</h3>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-medium">
                        Our consultation process is designed to uncover hidden opportunities and mitigate risks before they impact your bottom line.
                    </p>
                    <div className="space-y-12">
                        {[
                            { step: "01", title: "Business Audit", desc: "We analyze your current operations, tech stack, and market position." },
                            { step: "02", title: "Strategy Design", desc: "We craft a bespoke roadmap for growth and digital transformation." },
                            { step: "03", title: "Execution Support", desc: "We provide ongoing guidance as you implement the new strategy." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-8 group">
                                <div className="text-6xl font-black text-slate-200 dark:text-slate-100 group-hover:text-primary-600 transition-colors duration-500 leading-none">{item.step}</div>
                                <div>
                                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{item.title}</h4>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/2 relative">
                    <div className="rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 aspect-[4/5]">
                        <img 
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop" 
                            alt="Strategy session" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                    <div className="absolute -bottom-10 -left-10 p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl border border-white/10">
                        <p className="text-5xl font-black tracking-tighter mb-2">100%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-400">Data Driven</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Tech Stack Detail - Technical Grid Style */}
        <div className="bg-slate-900 dark:bg-white rounded-[4rem] p-12 md:p-24 transition-colors duration-500 shadow-2xl">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-400 dark:text-primary-600 mb-6">Our Stack</h2>
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white dark:text-slate-900 leading-[0.9] mb-8">Technology Ecosystem</h3>
                    <p className="text-lg text-slate-400 dark:text-slate-600 font-medium">We use the latest tools and frameworks to ensure your digital product is future-proof.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                    {TECH_STACK.map((stack, idx) => (
                        <div key={idx} className="group">
                            <h3 className="text-2xl font-black tracking-tighter text-white dark:text-slate-900 mb-10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 dark:bg-slate-100 flex items-center justify-center text-primary-400 dark:text-primary-600 group-hover:scale-110 transition-transform duration-500">
                                  <Code2 className="w-6 h-6" />
                                </div>
                                {stack.category}
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {stack.technologies.map((tech, i) => (
                                    <span key={i} className="px-6 py-3 rounded-xl bg-white/5 dark:bg-slate-50 border border-white/10 dark:border-slate-200 text-sm font-black uppercase tracking-widest text-slate-300 dark:text-slate-600 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-300 cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Custom Solution CTA - Immersive Split */}
        <div className="mt-32 relative rounded-[4rem] overflow-hidden bg-slate-900 dark:bg-slate-900 p-16 md:p-24 text-center text-white shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-accent-purple/20 to-accent-cyan/20 opacity-50 group-hover:scale-110 transition-transform duration-[3s]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">Need a custom <br />enterprise solution?</h3>
              <p className="mb-12 text-xl text-slate-300 font-medium leading-relaxed">
                We specialize in complex implementations for large-scale organizations. Let's discuss your requirements.
              </p>
              <Link to="/contact" className="inline-flex items-center px-12 py-6 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
                Contact Sales Team <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

      </div>
    </div>
  );
};

export default Services;
