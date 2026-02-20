import React from 'react';
import { TEAM } from '../constants';
import { Target, Lightbulb, Users, Globe2, Heart, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';

const About: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Who We Are"
        description="A collective of innovators, engineers, and strategists dedicated to pushing the boundaries of digital possibility."
      />

      <div className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mission / Vision - Modern Cards */}
        <div className="grid md:grid-cols-3 gap-12 mb-48">
            <div className="p-12 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-10 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <Target className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-lg">
                    To democratize access to enterprise-grade technology, empowering businesses of all sizes to compete in the digital economy.
                </p>
            </div>
            <div className="p-12 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-accent-purple/10 rounded-2xl flex items-center justify-center text-accent-purple mb-10 group-hover:bg-accent-purple group-hover:text-white transition-all duration-500 shadow-inner">
                    <Lightbulb className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 group-hover:text-accent-purple transition-colors">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-lg">
                    To be the leading catalyst for digital transformation in Africa and beyond, known for innovation and integrity.
                </p>
            </div>
            <div className="p-12 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-accent-cyan/10 rounded-2xl flex items-center justify-center text-accent-cyan mb-10 group-hover:bg-accent-cyan group-hover:text-white transition-all duration-500 shadow-inner">
                    <Users className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 group-hover:text-accent-cyan transition-colors">Our Values</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-lg">
                    Excellence, Transparency, and User-Centricity. We believe that technology should serve people, not the other way around.
                </p>
            </div>
        </div>

        {/* Story Section - Immersive Split */}
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-48">
            <div className="relative group">
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary-500/20 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent-purple/20 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 aspect-[4/5]">
                  <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
                      alt="Team collaboration" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-[2s] grayscale group-hover:grayscale-0"
                  />
                </div>
            </div>
            <div>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-8">Our Journey</h2>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-10">Engineering <br />Digital Success</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                    Founded in Abuja, Tekify Consult started with a simple idea: that local businesses deserve world-class digital infrastructure. 
                </p>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-medium">
                    Over the years, we have grown from a small team of passionate coders into a full-service digital agency, partnering with startups, government bodies, and multinational corporations.
                </p>
                <div className="grid grid-cols-2 gap-12">
                    <div className="group">
                        <div className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors duration-500">5+</div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">Years Experience</div>
                    </div>
                     <div className="group">
                        <div className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors duration-500">50+</div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">Projects Delivered</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Philosophy - Minimal Grid */}
        <div className="mb-48">
            <div className="text-center mb-24">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-6">Philosophy</h2>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">How We Think</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-16">
                 <div className="text-center group">
                    <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-inner">
                        <Heart className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4 group-hover:text-red-500 transition-colors">Passion First</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">We only build what we believe in. Every line of code is written with care and intent.</p>
                 </div>
                 <div className="text-center group">
                    <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-inner">
                        <Globe2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4 group-hover:text-blue-500 transition-colors">Global Standards</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">We adhere to international coding standards and best practices, ensuring your software scales globally.</p>
                 </div>
                 <div className="text-center group">
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-500 shadow-inner">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4 group-hover:text-green-500 transition-colors">Integrity</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">We are transparent about costs, timelines, and technical challenges. No hidden surprises.</p>
                 </div>
            </div>
        </div>

        {/* Global Reach - Immersive Banner */}
        <div className="bg-slate-900 dark:bg-white rounded-[4rem] p-16 md:p-32 mb-48 relative overflow-hidden text-center transition-colors duration-500 shadow-2xl">
            <div className="relative z-10">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-400 dark:text-primary-600 mb-10">Global Presence</h2>
                <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-white dark:text-slate-900 leading-[0.9] mb-12">Global Reach, <br />Local Roots</h3>
                <p className="text-xl text-slate-400 dark:text-slate-600 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                    While we are proudly based in Nigeria, our digital solutions serve clients across the globe. From FinTech in Lagos to E-commerce in London, we bridge the gap.
                </p>
                <div className="flex justify-center gap-6 flex-wrap">
                    {['Nigeria', 'United Kingdom', 'United States', 'Ghana'].map((country, i) => (
                      <span key={i} className="px-8 py-4 bg-white/5 dark:bg-slate-100 rounded-2xl text-sm font-black uppercase tracking-widest text-white dark:text-slate-900 border border-white/10 dark:border-slate-200 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-300 cursor-default">
                        {country}
                      </span>
                    ))}
                </div>
            </div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay grayscale"></div>
        </div>

        {/* Team Grid - Pill Shaped Images */}
        <div className="mb-32">
            <div className="text-center mb-24">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-6">The Team</h2>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">Meet The Minds</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-16">
                {TEAM.map((member, i) => (
                    <div key={i} className="group flex flex-col items-center text-center">
                        <div className="w-full aspect-[3/4] rounded-[6rem] overflow-hidden mb-10 shadow-2xl border-4 border-white dark:border-slate-900 group-hover:scale-105 transition-all duration-700">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">{member.name}</h3>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-6">{member.role}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-xs">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;