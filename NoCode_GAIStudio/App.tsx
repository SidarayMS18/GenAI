
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Cpu, Github, Linkedin, Mail, ArrowRight, CheckCircle, 
  Settings, LayoutDashboard, FileText, Briefcase, Users, MessageSquare, Plus, Trash2, Edit
} from 'lucide-react';
import { INITIAL_STATE } from './constants';
import { AppState, Project, BlogPost, TeamMember, Lead, SiteSettings } from './types';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ProjectsPage from './pages/Projects';
import BlogPage from './pages/Blog';
import ContactPage from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('s3ra_state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('s3ra_state', JSON.stringify(state));
  }, [state]);

  const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  }, []);

  const addLead = useCallback((lead: Lead) => {
    setState(prev => ({
      ...prev,
      leads: [lead, ...prev.leads]
    }));
  }, []);

  const addProject = useCallback((project: Project) => {
    setState(prev => ({
      ...prev,
      projects: [project, ...prev.projects]
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  }, []);

  const updateProject = useCallback((updated: Project) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === updated.id ? updated : p)
    }));
  }, []);

  // Similarly for Posts and Team
  const addPost = useCallback((post: BlogPost) => {
    setState(prev => ({ ...prev, posts: [post, ...prev.posts] }));
  }, []);
  const deletePost = useCallback((id: string) => {
    setState(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== id) }));
  }, []);
  const addTeamMember = useCallback((member: TeamMember) => {
    setState(prev => ({ ...prev, team: [member, ...prev.team] }));
  }, []);
  const deleteTeamMember = useCallback((id: string) => {
    setState(prev => ({ ...prev, team: prev.team.filter(t => t.id !== id) }));
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home state={state} addLead={addLead} />} />
            <Route path="/about" element={<About state={state} />} />
            <Route path="/projects" element={<ProjectsPage state={state} />} />
            <Route path="/blog" element={<BlogPage state={state} />} />
            <Route path="/contact" element={<ContactPage state={state} addLead={addLead} />} />
            <Route 
              path="/admin/*" 
              element={
                isAdmin ? (
                  <AdminDashboard 
                    state={state} 
                    updateSettings={updateSettings}
                    addProject={addProject}
                    deleteProject={deleteProject}
                    updateProject={updateProject}
                    addPost={addPost}
                    deletePost={deletePost}
                    addTeamMember={addTeamMember}
                    deleteTeamMember={deleteTeamMember}
                  />
                ) : (
                  <AdminLogin onLogin={() => setIsAdmin(true)} />
                )
              } 
            />
          </Routes>
        </main>

        <Footer settings={state.settings} />
      </div>
    </Router>
  );
};

const Navbar: React.FC<{ isAdmin: boolean; setIsAdmin: (val: boolean) => void }> = ({ isAdmin, setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 glass border-b border-white/5 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Cpu className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold tracking-tighter">
                S3RA<span className="text-cyan-400">.</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className={`${isActive('/') ? 'text-cyan-400' : 'text-gray-300 hover:text-white'} transition-colors px-3 py-2 text-sm font-medium`}>Home</Link>
              <Link to="/about" className={`${isActive('/about') ? 'text-cyan-400' : 'text-gray-300 hover:text-white'} transition-colors px-3 py-2 text-sm font-medium`}>About</Link>
              <Link to="/projects" className={`${isActive('/projects') ? 'text-cyan-400' : 'text-gray-300 hover:text-white'} transition-colors px-3 py-2 text-sm font-medium`}>Projects</Link>
              <Link to="/blog" className={`${isActive('/blog') ? 'text-cyan-400' : 'text-gray-300 hover:text-white'} transition-colors px-3 py-2 text-sm font-medium`}>Blog</Link>
              <Link to="/contact" className={`${isActive('/contact') ? 'text-cyan-400' : 'text-gray-300 hover:text-white'} transition-colors px-3 py-2 text-sm font-medium`}>Contact</Link>
              {isAdmin && (
                <Link to="/admin" className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-all flex items-center space-x-2">
                  <LayoutDashboard size={16} />
                  <span>Admin Panel</span>
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-b border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link onClick={() => setIsOpen(false)} to="/" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/about" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link onClick={() => setIsOpen(false)} to="/projects" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Projects</Link>
            <Link onClick={() => setIsOpen(false)} to="/blog" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Blog</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            {isAdmin && <Link onClick={() => setIsOpen(false)} to="/admin" className="text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">Admin Dashboard</Link>}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ settings: SiteSettings }> = ({ settings }) => (
  <footer className="border-t border-white/5 bg-[#050505] pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <Cpu className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold tracking-tighter">S3RA.</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Building the next generation of architectural solutions using Quantum Algorithms and Artificial Intelligence. Leading 5th-semester CSE specialization research.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">Quantum Algorithms</Link></li>
            <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">Deep Learning (GANs)</Link></li>
            <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">IoT Systems</Link></li>
            <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">Custom RAG Pipelines</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Insights</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Technical Deep-dives</Link></li>
            <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">GATE 2026 Roadmap</Link></li>
            <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Case Studies</Link></li>
            <li><Link to="/about" className="hover:text-cyan-400 transition-colors">Academic Portfolio</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="p-2 glass rounded-full hover:text-cyan-400 transition-all"><Github size={20} /></a>
            <a href="#" className="p-2 glass rounded-full hover:text-cyan-400 transition-all"><Linkedin size={20} /></a>
            <a href="#" className="p-2 glass rounded-full hover:text-cyan-400 transition-all"><Mail size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin') onLogin();
    else setError(true);
  };

  return (
    <div className="min-h-screen pt-32 flex justify-center items-start px-4">
      <div className="glass p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Passphrase</label>
            <input 
              type="password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-cyan-500 outline-none"
              placeholder="Hint: admin"
            />
          </div>
          {error && <p className="text-red-400 text-sm">Incorrect passphrase.</p>}
          <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-lg transition-all">Unlock Dashboard</button>
        </form>
      </div>
    </div>
  );
};

export default App;
