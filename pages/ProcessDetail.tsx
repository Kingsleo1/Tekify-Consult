import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PROCESS_STEPS } from '../constants';
import { ArrowLeft, Package } from 'lucide-react';
import PageHero from '../components/PageHero';

const ProcessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const step = PROCESS_STEPS.find(s => s.id === id);

  if (!step) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pb-32 transition-colors duration-500">
      <PageHero 
        title={`Step ${step.step}: ${step.title}`}
        description={step.shortDesc}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary-600 mb-12 transition-colors group relative z-10">
            <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="relative z-10">
            <div className="absolute -top-12 -left-12 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
              <span className="text-[20rem] font-black leading-none">{step.step}</span>
            </div>

            <div className="w-20 h-20 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-slate-900 font-black text-3xl mb-12 shadow-2xl relative z-10">
                {step.step}
            </div>

            <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-8">Detailed Overview</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-16 font-medium">
              {step.longDesc}
            </p>

            <div className="bg-slate-50 dark:bg-black/20 rounded-[3rem] p-10 md:p-16 border border-slate-100 dark:border-white/5 shadow-inner">
                <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white mb-10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent-cyan/10 rounded-xl flex items-center justify-center text-accent-cyan">
                      <Package className="w-5 h-5" />
                    </div>
                    Key Deliverables
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {step.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm group hover:border-accent-cyan/50 transition-all duration-500">
                            <div className="w-3 h-3 rounded-full bg-accent-cyan mr-5 group-hover:scale-125 transition-transform"></div>
                            <span className="font-bold text-slate-700 dark:text-slate-300 text-lg leading-tight">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-20 flex flex-col sm:flex-row justify-between items-center gap-8 border-t border-slate-100 dark:border-white/5 pt-12">
               <span className="text-slate-400 font-black uppercase tracking-widest text-xs">Ready to move to this step?</span>
               <Link to="/booking" className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl group">
                 Schedule Consultation 
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProcessDetail;