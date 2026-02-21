import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Selected Works"
        description="A showcase of our recent projects, demonstrating our expertise in design, development, and digital strategy."
      />

      <div className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
            {PROJECTS.map((project, idx) => (
                <Link to={`/portfolio/${project.id}`} key={project.id} className="group relative rounded-[4rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-700 block">
                    <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-[2s] grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                              <ArrowUpRight className="w-8 h-8 text-slate-900" />
                          </div>
                        </div>
                    </div>
                    <div className="p-12 relative">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 bg-primary-500/10 px-4 py-2 rounded-full border border-primary-500/20">
                                {project.category}
                            </span>
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-lg mb-10">
                            {project.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-[2px] bg-slate-200 dark:bg-white/10 group-hover:w-20 group-hover:bg-primary-500 transition-all duration-500"></div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">View Case Study</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        {/* Portfolio CTA */}
        <div className="mt-48 text-center">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary-600 dark:text-primary-400 mb-8">Ready to be next?</h3>
          <h4 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-16">Let's build your <br />success story.</h4>
          <Link to="/booking" className="inline-flex items-center justify-center px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
            Start A Project
            <ArrowUpRight className="ml-3 w-6 h-6" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Portfolio;