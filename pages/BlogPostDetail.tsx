import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-primary-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title={post.title}
        description={post.excerpt}
      />

      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>

        <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-slate-200 dark:border-white/10">
          <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
        </div>

        <div className="flex items-center gap-6 mb-12 text-sm font-bold text-slate-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary-600" />
            {post.date}
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 text-primary-600" />
            Tekify Team
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary-600 hover:prose-a:text-primary-500 prose-img:rounded-2xl text-slate-600 dark:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-strong:text-slate-900 dark:prose-strong:text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content || "Content coming soon..."}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default BlogPostDetail;
