import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe, Cpu, BarChart3, Layers, Code, Play, Star, ChevronDown, Users, Clock, Award, Loader2 } from 'lucide-react';
import { PROJECTS, TESTIMONIALS, FAQS, TECH_STACK, WHY_TEKIFY_ITEMS, PROCESS_STEPS } from '../constants';
import { TEKIFY_SERVICES } from '../services/pricingService';
import { supabase } from '../services/supabaseClient';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const services = TEKIFY_SERVICES;
  const loadingServices = false;

  useEffect(() => {
    // Check cloud for connectivity with safety catch
    supabase.from('tekify_services').select('id').limit(1)
      .then(({ error, data }) => {
        if (!error && data && data.length > 0) {
          console.log("Cloud ready.");
        } else if (error) {
          console.warn("Cloud connection returned error:", error.message);
        }
      })
      .catch((err) => {
        console.warn("Cloud connection check failed (Failed to fetch). Using robust local fallback options instead.", err);
      });
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const WhyIcon = ({ name }: { name: string }) => {
     if (name === 'Users') return <Users className="w-6 h-6" />;
     if (name === 'Clock') return <Clock className="w-6 h-6" />;
     if (name === 'Shield') return <Shield className="w-6 h-6" />;
     if (name === 'Award') return <Award className="w-6 h-6" />;
     return <Users className="w-6 h-6" />;
  };

  return (
    <div className="flex flex-col gap-0 pb-12 transition-colors duration-500">
      
      {/* Hero Section - SaaS Split Layout Influence */}
      <section className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Immersive Background Atmosphere */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          {/* Dynamic Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent dark:from-primary-500/10"></div>
          
          {/* Atmospheric Blobs - Recipe 7 Influence */}
          <div className="absolute top-[-20%] left-[-10%] w-[60rem] h-[60rem] bg-accent-purple/10 dark:bg-accent-purple/5 rounded-full blur-[120px] animate-blob mix-blend-normal"></div>
          <div className="absolute top-[10%] right-[-20%] w-[50rem] h-[50rem] bg-accent-cyan/10 dark:bg-accent-cyan/5 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-normal"></div>
          <div className="absolute bottom-[-20%] left-[10%] w-[60rem] h-[60rem] bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-normal"></div>

          {/* Technical Grid - Recipe 1 Influence */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 dark:opacity-100"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">Next-Gen Digital Agency</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 sm:mb-8 animate-in fade-in slide-in-from-left-8 duration-700 delay-100 leading-[0.9]">
                Architecting <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan animate-gradient-x">
                  Digital Futures
                </span>
              </h1>
              
              <p className="max-w-xl text-base md:text-xl text-slate-600 dark:text-slate-400 mb-8 sm:mb-12 leading-relaxed animate-in fade-in slide-in-from-left-8 duration-700 delay-200 font-medium">
                Tekify Consult transforms businesses with world-class IT consulting, AI integration, and cutting-edge software development.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
                <Link to="/booking#booking-form" className="inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-primary-500/20">
                  Start Project
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
                <Link to="/services" className="inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300">
                  View Solutions
                </Link>
              </div>
            </div>

            {/* Hero Visual - Floating Bento Elements */}
            <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000 delay-500">
              <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900/50 backdrop-blur-3xl p-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 via-transparent to-accent-cyan/10"></div>
                
                <div className="grid grid-cols-2 gap-6 h-full">
                  <div className="space-y-6">
                    <div className="h-2/3 rounded-[3rem] bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-white/5 p-8 flex flex-col justify-between group overflow-hidden">
                      <div className="w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center text-white shadow-xl shadow-primary-500/30 group-hover:scale-110 transition-transform duration-500">
                        <Code className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-2">Engineering</p>
                        <p className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">Clean, Scalable <br />Codebases</p>
                      </div>
                    </div>
                    <div className="h-1/3 rounded-[3rem] bg-accent-cyan/10 border border-accent-cyan/20 p-8 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent-cyan flex items-center justify-center text-white">
                        <Zap className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-black uppercase tracking-widest text-accent-cyan">High Speed</p>
                    </div>
                  </div>
                  <div className="space-y-6 pt-12">
                    <div className="h-1/3 rounded-[3rem] bg-accent-purple/10 border border-accent-purple/20 p-8 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent-purple flex items-center justify-center text-white">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-black uppercase tracking-widest text-accent-purple">AI Ready</p>
                    </div>
                    <div className="h-2/3 rounded-[3rem] bg-slate-900 dark:bg-white shadow-2xl p-8 flex flex-col justify-between group overflow-hidden">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 shadow-xl group-hover:scale-110 transition-transform duration-500">
                        <Globe className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Global Reach</p>
                        <p className="text-2xl font-black tracking-tighter text-white dark:text-slate-900 leading-tight">Enterprise <br />Solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 p-6 rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-white/10 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <BarChart3 className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Growth</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">+124%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee - Brutalist Influence */}
      <section className="py-8 sm:py-12 bg-slate-900 dark:bg-white overflow-hidden transition-colors duration-500">
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-12 sm:gap-24 items-center">
            {[...TECH_STACK.flatMap(t => t.technologies), ...TECH_STACK.flatMap(t => t.technologies)].map((tech, i) => (
              <span key={i} className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white/20 dark:text-slate-900/10 select-none hover:text-primary-500 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 sm:gap-24 items-center">
            {[...TECH_STACK.flatMap(t => t.technologies), ...TECH_STACK.flatMap(t => t.technologies)].map((tech, i) => (
              <span key={i} className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white/20 dark:text-slate-900/10 select-none hover:text-primary-500 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Premium Minimal */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 sm:mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-4 sm:mb-6">Why Tekify?</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
                We don't just write code; <br className="hidden sm:block" />
                <span className="text-slate-400 dark:text-slate-600">we solve problems.</span>
              </h3>
            </div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-md font-medium">
              Our engineering philosophy blends world-class aesthetics with bank-grade security and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {WHY_TEKIFY_ITEMS.map((item) => (
               <Link 
                 key={item.id} 
                 to={`/why-tekify/${item.id}`}
                 className="p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-500 group block shadow-sm hover:shadow-2xl hover:-translate-y-2"
               >
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white flex items-center justify-center mb-8 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <WhyIcon name={item.icon} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 font-medium leading-relaxed">{item.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-primary-600 dark:text-primary-400">Read More</span>
                    <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all duration-500 text-primary-600">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
               </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Editorial Style */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 sm:mb-24 gap-8">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-4 sm:mb-6">Our Process</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">From Idea to Launch</h3>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center">
                 <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400 fill-current" />
               </div>
               <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">Watch Our Method</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((item, idx) => (
              <Link 
                key={idx} 
                to={`/process/${item.id}`}
                className="relative p-8 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 hover:z-10 group block overflow-hidden"
              >
                <div className="text-9xl font-black text-slate-100 dark:text-white/5 absolute -bottom-8 -right-8 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">{item.step}</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-3xl bg-primary-500/10 flex items-center justify-center mb-10 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                    <Layers className="w-7 h-7" />
                  </div>
                  <h4 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">{item.shortDesc}</p>
                  <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">Explore Step <ArrowRight className="w-3 h-3" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Services Section - Modern Utility */}
      <section className="py-16 sm:py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-24">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-4 sm:mb-6">Our Expertise</h2>
          <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-6 sm:mb-8">Built for scale</h3>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Our comprehensive suite of services is designed to handle everything from MVP launches to enterprise digital transformation.
          </p>
        </div>

        {loadingServices ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {services.length > 0 ? (
              <>
                {/* Large Card - First Service */}
                <Link to={`/services/${services[0].id}`} className="md:col-span-2 relative group overflow-hidden rounded-[2rem] sm:rounded-[4rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 sm:p-12 hover:border-primary-500 transition-all duration-500 shadow-sm block">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-primary-600 flex items-center justify-center text-white mb-6 sm:mb-10 shadow-2xl shadow-primary-600/30">
                        <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{services[0].name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 max-w-md font-medium text-base sm:text-lg leading-relaxed">{services[0].description}</p>
                    </div>
                    <div className="mt-8 sm:mt-12">
                       <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" className="rounded-[1.5rem] sm:rounded-[2.5rem] w-full h-48 sm:h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" alt="Web Dev" />
                    </div>
                  </div>
                </Link>

                {/* Tall Card - Second Service */}
                {services[1] && (
                  <Link to={`/services/${services[1].id}`} className="md:row-span-2 relative group overflow-hidden rounded-[2rem] sm:rounded-[4rem] bg-slate-900 dark:bg-white border border-white/5 dark:border-slate-200 p-8 sm:p-12 hover:border-accent-purple transition-all duration-500 shadow-2xl block">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 h-full flex flex-col">
                       <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-accent-purple flex items-center justify-center text-white mb-6 sm:mb-10 shadow-2xl shadow-accent-purple/30">
                         <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />
                       </div>
                       <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-white dark:text-slate-900 mb-4 group-hover:text-accent-purple transition-colors">{services[1].name}</h3>
                       <p className="text-slate-400 dark:text-slate-600 mb-8 sm:mb-12 font-medium text-base sm:text-lg leading-relaxed">{services[1].description}</p>
                       
                       <div className="flex-1 rounded-[1.5rem] sm:rounded-[3rem] bg-white/5 dark:bg-slate-50 backdrop-blur-sm border border-white/10 dark:border-slate-200 p-6 sm:p-8 space-y-6">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-accent-purple/50"></div>
                            <div className="h-10 w-32 bg-white/10 dark:bg-slate-200 rounded-xl"></div>
                          </div>
                          <div className="flex gap-4 justify-end">
                            <div className="h-20 w-48 bg-primary-500/20 dark:bg-primary-500/10 rounded-2xl"></div>
                            <div className="w-10 h-10 rounded-2xl bg-slate-500/50"></div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-accent-purple/50"></div>
                            <div className="h-24 w-full bg-white/10 dark:bg-slate-200 rounded-xl"></div>
                          </div>
                       </div>
                    </div>
                  </Link>
                )}

                {/* Medium Card - Third Service */}
                {services[2] && (
                  <Link to={`/services/${services[2].id}`} className="relative group overflow-hidden rounded-[2rem] sm:rounded-[4rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 sm:p-12 hover:border-accent-cyan transition-all duration-500 shadow-sm block">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-accent-cyan flex items-center justify-center text-white mb-6 sm:mb-10 shadow-2xl shadow-accent-cyan/30">
                         <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
                       </div>
                       <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 group-hover:text-accent-cyan transition-colors">{services[2].name}</h3>
                       <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm sm:text-base">{services[2].description}</p>
                    </div>
                  </Link>
                )}

                {/* Medium Card - Fourth Service */}
                {services[3] && (
                  <Link to={`/services/${services[3].id}`} className="relative group overflow-hidden rounded-[2rem] sm:rounded-[4rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 sm:p-12 hover:border-pink-500 transition-all duration-500 shadow-sm block">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-pink-500 flex items-center justify-center text-white mb-6 sm:mb-10 shadow-2xl shadow-pink-500/30">
                         <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
                       </div>
                       <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 group-hover:text-pink-500 transition-colors">{services[3].name}</h3>
                       <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm sm:text-base">{services[3].description}</p>
                    </div>
                  </Link>
                )}
              </>
            ) : (
              <div className="col-span-3 text-center py-20 text-slate-400 font-bold">No services found.</div>
            )}
          </div>
        )}
      </section>

      {/* Selected Works Preview - Immersive Cards */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-900 dark:bg-white transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-24 gap-8">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-400 dark:text-primary-600 mb-4 sm:mb-6">Selected Works</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white dark:text-slate-900 leading-[0.9]">Success Stories</h3>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-4 group">
              <span className="text-xs font-black uppercase tracking-widest text-primary-400 dark:text-primary-600">View All Projects</span>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/10 dark:border-slate-200 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all duration-500">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {PROJECTS.slice(0, 2).map((project) => (
              <div key={project.id} className="group relative rounded-[2rem] sm:rounded-[4rem] overflow-hidden aspect-[4/3] shadow-2xl cursor-pointer">
                <img src={project.image} alt={project.title} className="object-cover w-full h-full transform group-hover:scale-110 transition-all duration-[2s] grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-8 sm:p-12 flex flex-col justify-end">
                   <span className="text-black text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-2 sm:mb-4">{project.category}</span>
                   <h3 className="text-2xl sm:text-4xl font-black tracking-tighter text-white mb-2 sm:mb-4 leading-tight">{project.title}</h3>
                   <p className="text-slate-300 text-sm sm:text-lg font-medium line-clamp-2 max-w-md mb-6 sm:mb-8">{project.description}</p>
                   <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary-600 transition-all duration-500">
                     <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Clean Grid */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-24">
             <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-4 sm:mb-6">Client Stories</h2>
             <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">Trusted by Leaders</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm relative group hover:shadow-2xl transition-all duration-500">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-600 mb-6 sm:mb-10">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8 sm:mb-10">"{t.text}"</p>
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-600 to-accent-purple shadow-lg"></div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-base sm:text-lg">{t.name}</h4>
                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary-600 dark:text-primary-400">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Minimal Accordion */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-4 sm:mb-6">Support</h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-6 sm:mb-8">Common Questions</h3>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">Everything you need to know about working with us.</p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-500 shadow-sm">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-10 text-left focus:outline-none group"
                >
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{faq.question}</span>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all duration-500 ${openFaq === idx ? 'bg-primary-600 border-primary-600 text-white rotate-180' : 'text-slate-400'}`}>
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </button>
                <div 
                  className={`px-6 sm:px-10 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-96 pb-6 sm:pb-10 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust Section - Large Typographic */}
      <section className="py-16 sm:py-24 lg:py-32 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 text-center">
            <div className="group">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 sm:mb-4 group-hover:text-primary-600 transition-colors duration-500">98%</div>
              <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">Client Retention</div>
            </div>
            <div className="group">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 sm:mb-4 group-hover:text-accent-purple transition-colors duration-500">24/7</div>
              <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">AI Support</div>
            </div>
            <div className="group">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 sm:mb-4 group-hover:text-accent-cyan transition-colors duration-500">50+</div>
              <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">Enterprise Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Highlight - Recipe 3 Influence */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-900 dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-400 mb-6 sm:mb-8">Strategic Consultation</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-8 sm:mb-10">Scale your business <br className="hidden sm:block" />with expert advice.</h3>
              <p className="text-lg sm:text-xl text-slate-400 mb-8 sm:mb-12 leading-relaxed font-medium">
                Our consultation services go beyond technical implementation. We help you define your digital roadmap, optimize operations, and identify new growth opportunities.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
                {['Operational Audits', 'Market Entry', 'Growth Hacking', 'Tech Stack Audit'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/booking#booking-form" className="inline-flex items-center gap-4 group">
                <span className="text-xs font-black uppercase tracking-widest text-primary-400">Book a Strategy Session</span>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all duration-500">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[2rem] sm:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop" 
                  alt="Consultation" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] bg-white text-slate-900 shadow-2xl animate-float">
                <p className="text-2xl sm:text-4xl font-black tracking-tighter leading-none mb-1 sm:mb-2">ROI</p>
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-primary-600">Focused Strategy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Split Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24 lg:my-32">
        <div className="relative rounded-[2rem] sm:rounded-[4rem] overflow-hidden bg-slate-900 dark:bg-primary-600 px-8 py-16 sm:px-12 sm:py-24 md:py-32 text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group transition-colors duration-500">
          <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-[3s]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 sm:mb-10 leading-[0.9]">Ready to <br className="hidden sm:block" />transform?</h2>
            <p className="text-white/80 text-lg sm:text-xl mb-12 sm:mb-16 font-medium max-w-xl mx-auto">
              Join the forward-thinking companies that trust Tekify Consult for their digital evolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link to="/booking#booking-form" className="px-10 py-5 sm:px-12 sm:py-6 bg-white text-slate-900 font-black uppercase tracking-widest rounded-xl sm:rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
                Get a Quote
              </Link>
               <Link to="/contact" className="px-10 py-5 sm:px-12 sm:py-6 bg-transparent border border-white/30 text-white font-black uppercase tracking-widest rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
