import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Cpu, BarChart3, Layers, Code, Play, Star, ChevronDown, ChevronUp, Users, Clock, Award } from 'lucide-react';
import { SERVICES, PROJECTS, TESTIMONIALS, FAQS, TECH_STACK, WHY_TEKIFY_ITEMS, PROCESS_STEPS } from '../constants';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="flex flex-col gap-0 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">Accepting New Projects</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 leading-tight">
            Architecting <br />
            <span className="text-gradient">
              Digital Futures
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Tekify Consult transforms businesses with world-class IT consulting, AI integration, and cutting-edge software development.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link to="/booking" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform duration-200 shadow-xl shadow-primary-500/20">
              Start Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/10 backdrop-blur-md transition-all duration-200 shadow-sm">
              View Solutions
            </Link>
          </div>

          {/* Hero Dashboard Graphic Simulation */}
          <div className="mt-12 relative mx-auto max-w-5xl animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 to-accent-cyan/5 dark:from-primary-500/10 dark:to-accent-cyan/10"></div>
              {/* Fake UI Header */}
              <div className="h-10 border-b border-slate-200 dark:border-white/10 flex items-center px-4 gap-2 bg-white/50 dark:bg-slate-900/50">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" 
                    alt="Dashboard" 
                    className="w-full h-auto opacity-90 dark:opacity-80 mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              
              {/* Floating Element 1 */}
              <div className="absolute top-20 left-10 p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-white/20 shadow-2xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-500">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Revenue</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">+124%</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute bottom-20 right-10 p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-white/20 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                 <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-500">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">AI Status</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-2 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5 overflow-hidden">
        <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Powering Innovation With</p>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
            {[...TECH_STACK.flatMap(t => t.technologies), ...TECH_STACK.flatMap(t => t.technologies)].map((tech, i) => (
              <span key={i} className="text-2xl font-bold text-slate-400 dark:text-slate-600 select-none">
                {tech}
              </span>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 items-center">
            {[...TECH_STACK.flatMap(t => t.technologies), ...TECH_STACK.flatMap(t => t.technologies)].map((tech, i) => (
              <span key={i} className="text-2xl font-bold text-slate-400 dark:text-slate-600 select-none">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Why Tekify?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We don't just write code; we solve business problems. Here is what sets us apart from the competition.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {WHY_TEKIFY_ITEMS.map((item) => (
               <Link 
                 key={item.id} 
                 to={`/why-tekify/${item.id}`}
                 className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-primary-500/50 transition-all group block"
               >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <WhyIcon name={item.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{item.shortDesc}</p>
                  <span className="text-xs font-bold text-primary-500 flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight className="w-3 h-3" /></span>
               </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - How We Work */}
      <section className="py-10 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-10">
            <h2 className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">Our Process</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">From Idea to Launch</h3>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((item, idx) => (
              <Link 
                key={idx} 
                to={`/process/${item.id}`}
                className="relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group block"
              >
                <div className="text-5xl font-black text-slate-100 dark:text-white/5 absolute top-4 right-4">{item.step}</div>
                <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-500/20 flex items-center justify-center mb-6 text-primary-600 dark:text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{item.shortDesc}</p>
                <span className="text-xs font-bold text-primary-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Explore Step <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Services Section */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Built for scale</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our comprehensive suite of services is designed to handle everything from MVP launches to enterprise digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Card */}
          <Link to="/services/web-dev" className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 p-8 hover:border-primary-500/50 transition-colors duration-300 shadow-sm block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-primary-500/30">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">Enterprise Web Development</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">Scalable, high-performance web applications built with React, Next.js, and modern cloud architecture.</p>
              </div>
              <div className="mt-8">
                 <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" className="rounded-xl w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt="Web Dev" />
              </div>
            </div>
          </Link>

          {/* Tall Card */}
          <Link to="/services/ai-consulting" className="md:row-span-2 relative group overflow-hidden rounded-3xl bg-slate-900 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-8 hover:border-accent-purple/50 transition-colors duration-300 shadow-lg block">
             <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-accent-purple flex items-center justify-center text-white mb-6 shadow-lg shadow-accent-purple/30">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">AI & Automation</h3>
                <p className="text-slate-400 mb-8">Integrate Gemini, GPT-4, and custom ML models to automate your workflow.</p>
                
                <div className="flex-1 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/10 p-4 space-y-3">
                   {/* Chat UI Simulation */}
                   <div className="flex gap-2">
                     <div className="w-6 h-6 rounded-full bg-accent-purple/50"></div>
                     <div className="h-6 w-24 bg-white/10 rounded-md"></div>
                   </div>
                   <div className="flex gap-2 justify-end">
                     <div className="h-12 w-32 bg-primary-500/20 rounded-md"></div>
                     <div className="w-6 h-6 rounded-full bg-slate-500/50"></div>
                   </div>
                   <div className="flex gap-2">
                     <div className="w-6 h-6 rounded-full bg-accent-purple/50"></div>
                     <div className="h-16 w-full bg-white/10 rounded-md"></div>
                   </div>
                </div>
             </div>
          </Link>

          {/* Medium Card */}
          <Link to="/services/cloud-it" className="relative group overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 p-8 hover:border-accent-cyan/50 transition-colors duration-300 shadow-sm block">
             <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="relative z-10">
               <div className="w-12 h-12 rounded-xl bg-accent-cyan flex items-center justify-center text-white mb-6 shadow-lg shadow-accent-cyan/30">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-accent-cyan transition-colors">Cloud Infrastructure</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">AWS, Azure, and GCP solutions for maximum uptime and security.</p>
             </div>
          </Link>

           {/* Medium Card */}
          <Link to="/services/digital-marketing" className="relative group overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 p-8 hover:border-primary-500/50 transition-colors duration-300 shadow-sm block">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="relative z-10">
               <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-500/30">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-pink-500 transition-colors">Digital Marketing</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Data-driven SEO and PPC campaigns that convert.</p>
             </div>
          </Link>
        </div>
      </section>

      {/* Selected Works Preview */}
      <section className="py-10 bg-slate-100 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Selected Works</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                 We take pride in delivering excellence. Check out some of our recent success stories.
              </p>
            </div>
            <Link to="/portfolio" className="hidden md:flex items-center text-primary-600 dark:text-primary-400 font-bold hover:gap-4 transition-all gap-2">
              View all Projects <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.slice(0, 2).map((project) => (
              <div key={project.id} className="group relative rounded-3xl overflow-hidden aspect-video shadow-lg cursor-pointer">
                <img src={project.image} alt={project.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                   <span className="text-primary-400 text-sm font-bold uppercase tracking-wider mb-2">{project.category}</span>
                   <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                   <p className="text-slate-300 line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/portfolio" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-white/20 rounded-full text-slate-700 dark:text-white font-medium">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Client Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm relative">
                <div className="text-6xl text-primary-200 dark:text-primary-900 absolute top-4 left-6 font-serif">"</div>
                <p className="text-slate-600 dark:text-slate-400 italic mb-6 relative z-10 pt-4">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-purple"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400">Everything you need to know about working with us.</p>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{faq.question}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-primary-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="border-y border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10">
            <div className="px-4 py-4">
              <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">98%</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Client Retention</div>
            </div>
            <div className="px-4 py-4">
              <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">24/7</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">AI Support</div>
            </div>
            <div className="px-4 py-4">
              <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">50+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Enterprise Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 mt-12">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-primary-600 px-6 py-16 text-center shadow-2xl group">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20 dark:opacity-30 group-hover:scale-110 transition-transform duration-1000">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad1)" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:'rgb(99, 102, 241)', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'rgb(168, 85, 247)', stopOpacity:1}} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform?</h2>
            <p className="text-slate-300 dark:text-white/90 text-lg mb-10">
              Join the forward-thinking companies that trust Tekify Consult for their digital evolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-colors shadow-lg">
                Get a Quote
              </Link>
               <Link to="/contact" className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
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