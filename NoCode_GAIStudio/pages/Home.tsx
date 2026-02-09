
import React from 'react';
import { Link } from 'react-router-dom';
// Added CheckCircle to imports to fix errors on lines 125, 129, and 133
import { ArrowRight, Code, Zap, Shield, Microscope, Layers, Brain, Database, CheckCircle } from 'lucide-react';
import { AppState, Lead } from '../types';

interface HomeProps {
  state: AppState;
  addLead: (lead: Lead) => void;
}

const Home: React.FC<HomeProps> = ({ state, addLead }) => {
  const { settings, projects } = state;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      {settings.sections.hero && (
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <span className="inline-block py-1 px-3 glass rounded-full text-cyan-400 text-sm font-medium mb-6">
                Next-Gen CSE Specialization • 5th Semester Insights
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                Future-Proof Computing <br />
                <span className="gradient-text">Quantum + AI Architectures</span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12">
                Pioneering complex architectural solutions in Quantum Algorithms, GANs, and enterprise-grade IoT systems. Technical authority driven by research and execution.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/projects" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-cyan-900/20 flex items-center">
                  View Projects <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/contact" className="px-8 py-4 glass text-white rounded-xl font-semibold hover:bg-white/10 transition-all border border-white/10">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack Trust Indicators */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-xs uppercase tracking-[0.2em] mb-8 font-semibold">Our Technical Foundations</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center space-x-2 font-bold text-xl">PYTHON</div>
             <div className="flex items-center space-x-2 font-bold text-xl">QISKIT</div>
             <div className="flex items-center space-x-2 font-bold text-xl">AWS</div>
             <div className="flex items-center space-x-2 font-bold text-xl">TENSORFLOW</div>
             <div className="flex items-center space-x-2 font-bold text-xl">LATEX</div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      {settings.sections.services && (
        <section className="py-24 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Engineering Expertise</h2>
                <p className="text-gray-400">Bridging the gap between academic research and industry application through rigorous CSE principles.</p>
              </div>
              <Link to="/projects" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center mt-4 md:mt-0">
                Explore Full Catalog <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Microscope className="w-8 h-8 text-cyan-400" />,
                  title: 'Quantum Algorithms',
                  desc: 'Developing NISQ-era circuits and implementing Shors/Grover optimizations via Qiskit.'
                },
                {
                  icon: <Brain className="w-8 h-8 text-blue-400" />,
                  title: 'Deep Learning',
                  desc: 'Specializing in Generative Adversarial Networks (GANs) and real-time image classification systems.'
                },
                {
                  icon: <Database className="w-8 h-8 text-indigo-400" />,
                  title: 'Embedded Systems',
                  desc: 'Full-stack IoT implementation using ESP32, Raspberry Pi, and RTOS for real-time telemetry.'
                }
              ].map((service, idx) => (
                <div key={idx} className="glass p-8 rounded-2xl hover:border-cyan-500/30 transition-all group">
                  <div className="mb-6 bg-white/5 w-16 h-16 flex items-center justify-center rounded-xl group-hover:bg-cyan-500/10 transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Innovation Lab (Visual Storytelling) */}
      {settings.sections.innovation && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full">
            <div className="absolute left-0 w-64 h-64 bg-cyan-600/5 blur-[80px] rounded-full"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass p-8 md:p-16 rounded-3xl border-cyan-500/10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-4 block">Research Spotlight</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">The Innovation Lab</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Our dedicated space for high-risk, high-reward experimentation. We are currently focusing on **Custom RAG (Retrieval-Augmented Generation)** systems for architectural auditing and advanced **Deepfake Classification** benchmarks.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-cyan-400 w-5 h-5" />
                    <span className="text-gray-200">Scalable Vector Database Integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-cyan-400 w-5 h-5" />
                    <span className="text-gray-200">Hardware-accelerated Neural Training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-cyan-400 w-5 h-5" />
                    <span className="text-gray-200">Real-time IoT Telemetry Dashboards</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-video glass rounded-2xl overflow-hidden border border-white/10 group">
                   <img src="https://picsum.photos/seed/lab/800/450" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-700" alt="Lab" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                        <Zap className="text-white fill-white" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {settings.sections.portfolio && (
        <section className="py-24 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Case Studies & Portfolios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => p.publishStatus === 'published').slice(0, 3).map((project) => (
                <div key={project.id} className="group relative glass rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-all flex flex-col h-full">
                   <div className="aspect-[4/3] overflow-hidden">
                      <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={project.title} />
                   </div>
                   <div className="p-6 flex flex-col flex-grow">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">{project.category}</span>
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((s, i) => (
                          <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">{s}</span>
                        ))}
                      </div>
                      <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-auto">
                        <span className="text-xs text-gray-500 italic">{project.metrics}</span>
                        <Link to="/projects" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                           <ArrowRight size={20} />
                        </Link>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Strong CTA Block */}
      <section className="py-24 bg-gradient-to-b from-[#080808] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass p-12 md:p-24 rounded-3xl border-cyan-500/20 bg-cyan-900/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-cyan-500/10 -rotate-12 translate-x-12 -translate-y-12">
               <Layers size={320} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">Start a Project Briefing</h2>
            <p className="max-w-xl mx-auto text-gray-400 mb-12 relative z-10">
              Ready to implement cutting-edge technical architecture? Let's discuss your enterprise needs or research collaboration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
              <Link to="/contact" className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all">
                Schedule Consultation
              </Link>
              <Link to="/about" className="px-10 py-4 glass text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
