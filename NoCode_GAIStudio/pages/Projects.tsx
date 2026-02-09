
import React, { useState } from 'react';
import { AppState } from '../types';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const ProjectsPage: React.FC<{ state: AppState }> = ({ state }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(state.projects.map(p => p.category))];

  const filteredProjects = filter === 'All' 
    ? state.projects 
    : state.projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Technical Portfolio</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            A comprehensive catalog of our architectural implementations in Quantum Computing, Deep Learning, and Embedded systems.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/20' 
                : 'glass text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group glass rounded-3xl overflow-hidden border-white/5 hover:border-cyan-500/20 transition-all flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto overflow-hidden">
                <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={project.title} />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                   <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-1 rounded">{project.category}</span>
                   <div className="flex space-x-3 text-gray-500">
                      <Github size={18} className="hover:text-white cursor-pointer" />
                      <ExternalLink size={18} className="hover:text-white cursor-pointer" />
                   </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Outcome</h4>
                    <p className="text-cyan-400 font-medium text-sm">{project.metrics}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((s, i) => (
                        <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
