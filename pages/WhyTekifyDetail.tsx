import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { WHY_TEKIFY_ITEMS } from '../constants';
import { Users, Clock, Shield, Award, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';

const WhyTekifyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const item = WHY_TEKIFY_ITEMS.find(i => i.id === id);

  if (!item) {
    return <Navigate to="/" replace />;
  }

  const IconComponent = {
    "Users": Users,
    "Clock": Clock,
    "Shield": Shield,
    "Award": Award
  }[item.icon] || Users;

  return (
    <div className="min-h-screen pb-32 transition-colors duration-500">
      <PageHero 
        title={item.title}
        description={item.shortDesc}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-200 dark:border-white/5">
          
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary-600 mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row gap-16 items-start">
             <div className="w-32 h-32 bg-primary-500/10 rounded-[2.5rem] flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0 shadow-inner group">
                <IconComponent className="w-14 h-14 group-hover:scale-110 transition-transform duration-500" />
             </div>
             
             <div className="flex-1">
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-8">Why This Matters</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12 font-medium">
                  {item.longDesc}
                </p>

                {item.stat && (
                  <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-accent-purple/10 text-accent-purple border border-accent-purple/20 shadow-xl shadow-accent-purple/10">
                    <span className="text-3xl font-black mr-3 tracking-tighter">{item.stat.split(' ')[0]}</span>
                    <span className="font-black uppercase tracking-widest text-[10px]">{item.stat.split(' ').slice(1).join(' ')}</span>
                  </div>
                )}
             </div>
          </div>
          
          {/* CTA Section - Immersive Split */}
          <div className="mt-24 pt-16 border-t border-slate-100 dark:border-white/5 text-center">
            <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-8">Experience the Difference</h3>
            <div className="flex justify-center gap-6">
               <Link to="/booking" className="px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
                 Start a Project
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyTekifyDetail;