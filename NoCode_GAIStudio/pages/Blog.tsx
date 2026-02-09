
import React from 'react';
import { AppState } from '../types';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const BlogPage: React.FC<{ state: AppState }> = ({ state }) => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Technical Insights</h1>
            <p className="text-gray-400 text-lg">Documentation, research notes, and GATE 2026 preparation logs.</p>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-0">
             <div className="glass px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                <Tag size={16} className="text-cyan-400" />
                <span>All Posts</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {state.posts.filter(p => p.publishStatus === 'published').map((post) => (
            <article key={post.id} className="group glass p-8 rounded-3xl hover:bg-white/[0.05] transition-all cursor-pointer">
               <div className="flex items-center space-x-4 text-xs text-gray-500 mb-6 font-medium">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <span className="text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded">{post.category}</span>
               </div>
               <h2 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{post.title}</h2>
               <p className="text-gray-400 mb-8 leading-relaxed line-clamp-3">
                 {post.content}
               </p>
               <div className="flex items-center text-cyan-400 font-bold group-hover:translate-x-2 transition-transform">
                  Read Full Document <ArrowRight size={18} className="ml-2" />
               </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
