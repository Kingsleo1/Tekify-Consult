import React from 'react';
import { Linkedin, MessageCircle, ExternalLink } from 'lucide-react';
import { TEAM, BUSINESS_INFO } from '../constants';
import PageHero from '../components/PageHero';
import { motion } from 'motion/react';

const Team: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <PageHero 
        title="Our Expert Team"
        description="Meet the visionaries and engineers behind Tekify Consult's global success."
      />

      <section className="py-16 sm:py-24 lg:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {TEAM.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                {/* Card Container */}
                <div className="relative bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2">
                  
                  {/* Image Section */}
                  <div className="relative mb-6 sm:mb-8 aspect-square overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] bg-slate-200 dark:bg-slate-800">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${member.name}/600/600`;
                      }}
                    />
                    
                    {/* Social Overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.whatsapp && (
                        <a 
                          href={member.whatsapp} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mt-1">
                        {member.role}
                      </p>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                      {member.bio}
                    </p>

                    <div className="pt-4 flex items-center gap-4">
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-500 flex items-center gap-2 transition-colors"
                        >
                          LinkedIn <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {member.whatsapp && (
                        <a 
                          href={member.whatsapp} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-green-500 flex items-center gap-2 transition-colors"
                        >
                          WhatsApp <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-12 md:p-20 border border-slate-200 dark:border-white/5 shadow-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 sm:mb-8">
              Want to join our <span className="text-gradient">mission?</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 mb-8 sm:mb-12 font-medium max-w-2xl mx-auto">
              We're always looking for world-class talent to help us build the future of digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a 
                href={`mailto:${BUSINESS_INFO.email}`}
                className="w-full sm:w-auto px-10 py-5 sm:px-12 sm:py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px] sm:text-sm rounded-xl sm:rounded-2xl hover:scale-105 transition-all shadow-2xl"
              >
                View Openings
              </a>
              <a 
                href="/contact"
                className="w-full sm:w-auto px-10 py-5 sm:px-12 sm:py-6 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-black uppercase tracking-widest text-[10px] sm:text-sm rounded-xl sm:rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Team;
