import React from 'react';

interface PageHeroProps {
  title: React.ReactNode;
  description: string;
  className?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, description, className = "" }) => {
  return (
    <section className={`relative pt-40 pb-32 lg:pt-64 lg:pb-48 overflow-hidden transition-colors duration-500 ${className}`}>
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Micro-label - Recipe 2 Influence */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="px-6 py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-[0.4em] border border-primary-500/20 shadow-xl shadow-primary-500/5">
            Tekify Intelligence
          </span>
        </div>

        {/* Massive Display Title - Recipe 2 Influence */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 leading-[0.9] drop-shadow-2xl">
          <span className="text-gradient">{title}</span>
        </h1>

        {/* Refined Description */}
        <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 font-medium">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
