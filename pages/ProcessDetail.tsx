import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PROCESS_STEPS } from '../constants';
import { Play, ArrowLeft, Package } from 'lucide-react';
import PageHero from '../components/PageHero';

const ProcessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const step = PROCESS_STEPS.find(s => s.id === id);

  if (!step) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pb-20">
      <PageHero 
        title={`Step ${step.step}: ${step.title}`}
        description={step.shortDesc}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-16 shadow-xl border border-slate-200 dark:border-white/5 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>

          <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary-500 mb-8 transition-colors relative z-10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-black text-2xl mb-8 shadow-lg shadow-primary-500/30">
                {step.step}
            </div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Detailed Overview</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
              {step.longDesc}
            </p>

            <div className="bg-slate-50 dark:bg-black/20 rounded-2xl p-8 border border-slate-100 dark:border-white/5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary-500" />
                    Key Deliverables
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {step.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5">
                            <div className="w-2 h-2 rounded-full bg-accent-cyan mr-3"></div>
                            <span className="font-medium text-slate-700 dark:text-slate-300">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-12 flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-8">
               <span className="text-slate-500 text-sm">Ready to move to this step?</span>
               <Link to="/booking" className="inline-flex items-center font-bold text-primary-600 hover:text-primary-700">
                 Schedule Consultation <Play className="w-4 h-4 ml-2 fill-current" />
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProcessDetail;