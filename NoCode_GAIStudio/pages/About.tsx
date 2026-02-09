
import React from 'react';
import { AppState } from '../types';
import { Target, Lightbulb, Users as UsersIcon, GraduationCap } from 'lucide-react';

const About: React.FC<{ state: AppState }> = ({ state }) => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Engineering the Future of <span className="gradient-text">Architectural AI</span></h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              S3RA is a research-driven collective focusing on high-impact technical problems. As 5th-semester CSE specialists, we focus on the intersection of Quantum Computing and machine learning to solve modern industrial constraints.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">98%</h4>
                <p className="text-gray-500 text-sm">Classification Accuracy</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">15+</h4>
                <p className="text-gray-500 text-sm">Research Prototypes</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">GATE</h4>
                <p className="text-gray-500 text-sm">2026 Focused Prep</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">IoT</h4>
                <p className="text-gray-500 text-sm">Industrial Deployments</p>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square glass rounded-3xl overflow-hidden">
                <img src="https://picsum.photos/seed/teamwork/800/800" className="w-full h-full object-cover opacity-40" alt="About" />
             </div>
             <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl border-cyan-500/20 max-w-[240px]">
                <p className="text-sm font-bold mb-2 flex items-center"><GraduationCap className="mr-2 text-cyan-400" size={18} /> CSE Department</p>
                <p className="text-gray-400 text-xs">Specialized in System Architecture & Theoretical Computer Science.</p>
             </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="p-8 glass rounded-2xl">
            <Target className="text-cyan-400 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4">Precision Engineering</h3>
            <p className="text-gray-400 text-sm">We don't just build; we optimize. Every algorithm is profiled for complexity and efficiency.</p>
          </div>
          <div className="p-8 glass rounded-2xl">
            <Lightbulb className="text-blue-400 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4">Research First</h3>
            <p className="text-gray-400 text-sm">Our solutions are backed by rigorous literature review and academic standards (LaTeX, IEEE).</p>
          </div>
          <div className="p-8 glass rounded-2xl">
            <UsersIcon className="text-indigo-400 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4">Collaboration</h3>
            <p className="text-gray-400 text-sm">Open source and academic partnership is at the core of our technical philosophy.</p>
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet the Engineers</h2>
          <p className="text-gray-400">The minds behind S3RA Quantum & AI Solutions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {state.team.map((member) => (
            <div key={member.id} className="glass p-6 rounded-2xl text-center group">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-transparent group-hover:border-cyan-500 transition-all">
                <img src={member.imageUrl} className="w-full h-full object-cover" alt={member.name} />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-cyan-400 text-sm mb-4 uppercase tracking-widest">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
