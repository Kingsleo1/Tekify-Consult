import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { WHY_TEKIFY_ITEMS } from '../constants';
import { Users, Clock, Shield, Award, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen pb-20">
      <PageHero 
        title={item.title}
        description={item.shortDesc}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-16 shadow-xl border border-slate-200 dark:border-white/5">
          
          <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary-500 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-start">
             <div className="w-24 h-24 bg-primary-50 dark:bg-primary-500/10 rounded-3xl flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                <IconComponent className="w-12 h-12" />
             </div>
             
             <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why This Matters</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                  {item.longDesc}
                </p>

                {item.stat && (
                  <div className="inline-flex items-center px-6 py-3 rounded-xl bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                    <span className="text-2xl font-bold mr-2">{item.stat.split(' ')[0]}</span>
                    <span className="font-medium">{item.stat.split(' ').slice(1).join(' ')}</span>
                  </div>
                )}
             </div>
          </div>
          
          {/* Simulated CTA specific to the benefit */}
          <div className="mt-16 pt-10 border-t border-slate-100 dark:border-white/5 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Experience the Difference</h3>
            <div className="flex justify-center gap-4">
               <Link to="/booking" className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform">
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