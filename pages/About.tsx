import React from 'react';
import { TEAM } from '../constants';
import { Target, Lightbulb, Users, Globe2, Heart, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Who We Are"
        description="A collective of innovators, engineers, and strategists dedicated to pushing the boundaries of digital possibility."
      />

      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mission / Vision */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
                    <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    To democratize access to enterprise-grade technology, empowering businesses of all sizes to compete in the digital economy.
                </p>
            </div>
            <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-accent-purple/10 dark:bg-accent-purple/20 rounded-2xl flex items-center justify-center text-accent-purple mb-6">
                    <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    To be the leading catalyst for digital transformation in Africa and beyond, known for innovation and integrity.
                </p>
            </div>
            <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-accent-cyan/10 dark:bg-accent-cyan/20 rounded-2xl flex items-center justify-center text-accent-cyan mb-6">
                    <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Values</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Excellence, Transparency, and User-Centricity. We believe that technology should serve people, not the other way around.
                </p>
            </div>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
                    alt="Team collaboration" 
                    className="relative rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10"
                />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Journey</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Founded in Abuja, Tekify Consult started with a simple idea: that local businesses deserve world-class digital infrastructure. 
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Over the years, we have grown from a small team of passionate coders into a full-service digital agency, partnering with startups, government bodies, and multinational corporations.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">5+</div>
                        <div className="text-sm text-slate-500">Years Experience</div>
                    </div>
                     <div>
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50+</div>
                        <div className="text-sm text-slate-500">Projects Delivered</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Philosophy */}
        <div className="mb-24">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Our Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8">
                 <div className="text-center p-6">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 dark:text-red-400">
                        <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Passion First</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">We only build what we believe in. Every line of code is written with care and intent.</p>
                 </div>
                 <div className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
                        <Globe2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Global Standards</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">We adhere to international coding standards and best practices, ensuring your software scales globally.</p>
                 </div>
                 <div className="text-center p-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Integrity</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">We are transparent about costs, timelines, and technical challenges. No hidden surprises.</p>
                 </div>
            </div>
        </div>

        {/* Global Reach */}
        <div className="bg-slate-900 dark:bg-white/5 rounded-3xl p-12 mb-24 relative overflow-hidden text-center">
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">Global Reach, Local Roots</h2>
                <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                    While we are proudly based in Nigeria, our digital solutions serve clients across the globe. From FinTech in Lagos to E-commerce in London, we bridge the gap.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">Nigeria</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">United Kingdom</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">United States</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">Ghana</span>
                </div>
            </div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        </div>

        {/* Team Grid */}
        <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Meet The Minds</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {TEAM.map((member, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all">
                        <div className="aspect-[4/5] overflow-hidden">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-primary-300 text-sm mb-2">{member.role}</p>
                            <p className="text-slate-300 text-xs line-clamp-2">{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;