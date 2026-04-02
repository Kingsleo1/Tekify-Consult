import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PROJECTS } from '../constants';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';

const PortfolioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Project Not Found</h1>
        <Link to="/portfolio" className="text-primary-600 hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title={project.title}
        description={project.description}
      />

      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/portfolio" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>

        <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-slate-200 dark:border-white/10">
          <img src={project.image} alt={project.title} className="w-full h-96 object-cover" />
        </div>

        <div className="flex items-center justify-between mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 bg-primary-500/10 px-4 py-2 rounded-full border border-primary-500/20">
                {project.category}
            </span>
            <Link to="/booking#booking-form" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary-600 hover:text-primary-500 transition-colors">
                Start Similar Project <ArrowUpRight className="w-4 h-4" />
            </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary-600 hover:prose-a:text-primary-500 prose-img:rounded-2xl text-slate-600 dark:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-strong:text-slate-900 dark:prose-strong:text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.content || "Case study details coming soon..."}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default PortfolioDetail;
