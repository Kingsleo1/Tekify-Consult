import React from 'react';
import { TEAM } from '../constants';
import { Target, Lightbulb, Users, Globe2, Heart, ShieldCheck, Linkedin, MessageCircle } from 'lucide-react';
import PageHero from '../components/PageHero';

const About: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Who We Are"
        description="A collective of innovators, engineers, and strategists dedicated to pushing the boundaries of digital possibility."
      />

      <div className="py-16 sm:py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mission / Vision - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-24 sm:mb-32 lg:mb-48">
            <div className="p-8 sm:p-12 bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 sm:mb-10 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 sm:mb-6 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base sm:text-lg">
                    To democratize access to enterprise-grade technology, empowering businesses of all sizes to compete in the digital economy.
                </p>
            </div>
            <div className="p-8 sm:p-12 bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-purple/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-accent-purple mb-6 sm:mb-10 group-hover:bg-accent-purple group-hover:text-white transition-all duration-500 shadow-inner">
                    <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 sm:mb-6 group-hover:text-accent-purple transition-colors">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base sm:text-lg">
                    To be the leading catalyst for digital transformation in Africa and beyond, known for innovation and integrity.
                </p>
            </div>
            <div className="p-8 sm:p-12 bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-cyan/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-accent-cyan mb-6 sm:mb-10 group-hover:bg-accent-cyan group-hover:text-white transition-all duration-500 shadow-inner">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 sm:mb-6 group-hover:text-accent-cyan transition-colors">Our Values</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base sm:text-lg">
                    Excellence, Transparency, and User-Centricity. We believe that technology should serve people, not the other way around.
                </p>
            </div>
        </div>

        {/* Story Section - Immersive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 sm:mb-32 lg:mb-48">
            <div className="relative group">
                <div className="absolute -top-12 -left-12 w-32 h-32 sm:w-48 sm:h-48 bg-primary-500/20 rounded-full blur-[80px] sm:blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 sm:w-48 sm:h-48 bg-accent-purple/20 rounded-full blur-[80px] sm:blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="relative rounded-[2rem] sm:rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 aspect-[4/5]">
                  <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
                      alt="Team collaboration" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-[2s] grayscale group-hover:grayscale-0"
                  />
                </div>
            </div>
            <div>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-6 sm:mb-8">Our Journey</h2>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-8 sm:mb-10">Engineering <br className="hidden sm:block" />Digital Success</h3>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 leading-relaxed font-medium">
                    Founded in Abuja, Tekify Consult started with a simple idea: that local businesses deserve world-class digital infrastructure. 
                </p>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 sm:mb-12 leading-relaxed font-medium">
                    Over the years, we have grown from a small team of passionate coders into a full-service digital agency, partnering with startups, government bodies, and multinational corporations.
                </p>
                <div className="grid grid-cols-2 gap-8 sm:gap-12">
                    <div className="group">
                        <div className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors duration-500">5+</div>
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">Years Experience</div>
                    </div>
                     <div className="group">
                        <div className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors duration-500">50+</div>
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">Projects Delivered</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Philosophy - Minimal Grid */}
        <div className="mb-24 sm:mb-32 lg:mb-48">
            <div className="text-center mb-16 sm:mb-24">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-4 sm:mb-6">Philosophy</h2>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">How We Think</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
                 <div className="text-center group">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-inner">
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4 group-hover:text-red-500 transition-colors">Passion First</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm sm:text-base">We only build what we believe in. Every line of code is written with care and intent.</p>
                 </div>
                 <div className="text-center group">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-inner">
                        <Globe2 className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4 group-hover:text-blue-500 transition-colors">Global Standards</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm sm:text-base">We adhere to international coding standards and best practices, ensuring your software scales globally.</p>
                 </div>
                 <div className="text-center group">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-500 shadow-inner">
                        <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4 group-hover:text-green-500 transition-colors">Integrity</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm sm:text-base">We are transparent about costs, timelines, and technical challenges. No hidden surprises.</p>
                 </div>
            </div>
        </div>

        {/* Global Reach - Immersive Banner */}
        <div className="bg-slate-900 dark:bg-white rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-16 md:p-32 mb-24 sm:mb-32 lg:mb-48 relative overflow-hidden text-center transition-colors duration-500 shadow-2xl">
            <div className="relative z-10">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-400 dark:text-primary-600 mb-6 sm:mb-10">Global Presence</h2>
                <h3 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white dark:text-slate-900 leading-[0.9] mb-8 sm:mb-12">Global Reach, <br className="hidden sm:block" />Local Roots</h3>
                <p className="text-lg sm:text-xl text-slate-400 dark:text-slate-600 max-w-2xl mx-auto mb-10 sm:mb-16 font-medium leading-relaxed">
                    While we are proudly based in Nigeria, our digital solutions serve clients across the globe. From FinTech in Lagos to E-commerce in London, we bridge the gap.
                </p>
                <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
                    {['Nigeria', 'United Kingdom', 'United States', 'Ghana'].map((country, i) => (
                      <span key={i} className="px-6 py-3 sm:px-8 sm:py-4 bg-white/5 dark:bg-slate-100 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black uppercase tracking-widest text-white dark:text-slate-900 border border-white/10 dark:border-slate-200 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-300 cursor-default">
                        {country}
                      </span>
                    ))}
                </div>
            </div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay grayscale"></div>
        </div>

        {/* Strategic Consultation Section */}
        <div className="mb-24 sm:mb-32 lg:mb-48 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-6 sm:mb-8">Strategic Consultation</h2>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-8 sm:mb-10">Beyond Just <br className="hidden sm:block" />Technology</h3>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                    We believe that technology is a tool, not a destination. Our consultation services focus on aligning your digital infrastructure with your business objectives.
                </p>
                <div className="space-y-6">
                    {[
                        { title: "Operational Audits", desc: "Identifying bottlenecks in your current digital workflows." },
                        { title: "Market Strategy", desc: "Data-driven insights to help you capture new market segments." },
                        { title: "Digital Transformation", desc: "A comprehensive roadmap for modernizing your business." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 sm:gap-6 group">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-1">{item.title}</h4>
                                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative rounded-[2rem] sm:rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 aspect-square">
                <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" 
                    alt="Strategic meeting" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
            </div>
        </div>

        {/* Team Grid - Pill Shaped Images */}
        <div className="mb-16 sm:mb-24 lg:mb-32">
            <div className="text-center mb-16 sm:mb-24">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-4 sm:mb-6">The Team</h2>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">Meet The Minds</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
                {TEAM.map((member, i) => (
                    <div key={i} className="group flex flex-col items-center text-center">
                        <div className="w-full aspect-[3/4] rounded-[4rem] sm:rounded-[6rem] overflow-hidden mb-6 sm:mb-10 shadow-2xl border-4 border-white dark:border-slate-900 group-hover:scale-105 transition-all duration-700 relative">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${member.name}/600/800`;
                              }}
                            />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">{member.name}</h3>
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-4 sm:mb-6">{member.role}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-xs mb-6">{member.bio}</p>
                        <div className="flex gap-4">
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-600 transition-colors">
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                          {member.whatsapp && (
                            <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-600 transition-colors">
                              <MessageCircle className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-12 sm:mt-20 text-center">
              <a href="/team" className="inline-flex items-center gap-3 px-10 py-5 sm:px-12 sm:py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-xl sm:rounded-2xl hover:scale-105 transition-all shadow-2xl">
                View Full Team <Users className="w-4 h-4" />
              </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;