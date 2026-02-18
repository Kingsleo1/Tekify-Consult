import React from 'react';
import { BLOG_POSTS } from '../constants';
import { Calendar, User } from 'lucide-react';
import PageHero from '../components/PageHero';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Insights & News"
        description="Thoughts, trends, and tutorials from our team of tech experts."
      />

      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
                <div key={post.id} className="flex flex-col bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="aspect-[4/3] overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-slate-500 mb-4 space-x-4">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {post.date}
                            </div>
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                Tekify Team
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                            {post.excerpt}
                        </p>
                        <button className="text-primary-600 dark:text-primary-400 font-bold text-sm hover:underline self-start">
                            Read More
                        </button>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;