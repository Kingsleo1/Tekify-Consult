import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Selected Works"
        description="A showcase of our recent projects, demonstrating our expertise in design, development, and digital strategy."
      />

      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10">
            {PROJECTS.map((project, idx) => (
                <div key={project.id} className="group rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-video overflow-hidden relative">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                            <ArrowUpRight className="w-6 h-6 text-slate-900" />
                        </button>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-3 py-1 rounded-full">
                                {project.category}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{project.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Portfolio;