import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Insights & News"
        description="Thoughts, trends, and tutorials from our team of tech experts."
      />

      <div className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
            {BLOG_POSTS.map((post) => (
                <Link to={`/blog/${post.id}`} key={post.id} className="flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                    <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-[2s] grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
                    </div>
                    <div className="p-10 flex-1 flex flex-col">
                        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 space-x-6">
                            <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-2 text-primary-600 dark:text-primary-400" />
                                {post.date}
                            </div>
                            <div className="flex items-center">
                                <User className="w-3 h-3 mr-2 text-primary-600 dark:text-primary-400" />
                                Tekify Team
                            </div>
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 flex-1">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 dark:text-primary-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                              Read Article
                          </span>
                          <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all duration-500">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;