
import React, { useState } from 'react';
import { 
  LayoutDashboard, Briefcase, FileText, Users, MessageSquare, 
  Settings as SettingsIcon, Plus, Trash2, Edit, Save, ToggleLeft, ToggleRight
} from 'lucide-react';
import { AppState, Project, BlogPost, TeamMember, SiteSettings } from '../types';

interface AdminDashboardProps {
  state: AppState;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  addProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (p: Project) => void;
  addPost: (p: BlogPost) => void;
  deletePost: (id: string) => void;
  addTeamMember: (m: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'blog' | 'team' | 'leads' | 'settings'>('overview');

  return (
    <div className="pt-24 min-h-screen bg-[#050505]">
      <div className="max-w-[1600px] mx-auto flex h-[calc(100vh-6rem)]">
        {/* Sidebar */}
        <aside className="w-64 glass border-r border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-bold flex items-center"><LayoutDashboard className="mr-2" size={20} /> Dashboard</h2>
          </div>
          <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
            <NavItem active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={18} />} label="Overview" />
            <NavItem active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={<Briefcase size={18} />} label="Projects CMS" />
            <NavItem active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} icon={<FileText size={18} />} label="Blog CMS" />
            <NavItem active={activeTab === 'team'} onClick={() => setActiveTab('team')} icon={<Users size={18} />} label="Team Manager" />
            <NavItem active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} icon={<MessageSquare size={18} />} label="Lead Management" />
            <NavItem active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<SettingsIcon size={18} />} label="Site Settings" />
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-grow overflow-y-auto p-8">
          {activeTab === 'overview' && <Overview state={props.state} />}
          {activeTab === 'projects' && <ProjectsCMS projects={props.state.projects} add={props.addProject} del={props.deleteProject} />}
          {activeTab === 'blog' && <BlogCMS posts={props.state.posts} add={props.addPost} del={props.deletePost} />}
          {activeTab === 'leads' && <LeadsManagement leads={props.state.leads} />}
          {activeTab === 'settings' && <SettingsPanel settings={props.state.settings} update={props.updateSettings} />}
          {activeTab === 'team' && <TeamCMS team={props.state.team} add={props.addTeamMember} del={props.deleteTeamMember} />}
        </main>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const Overview: React.FC<{ state: AppState }> = ({ state }) => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold">System Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard label="Total Projects" value={state.projects.length} />
      <StatCard label="Blog Posts" value={state.posts.length} />
      <StatCard label="Team Size" value={state.team.length} />
      <StatCard label="Total Leads" value={state.leads.length} color="text-green-400" />
    </div>
    <div className="glass p-8 rounded-2xl">
      <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
      <p className="text-gray-500 italic">Tracking module initialization complete. All systems nominal.</p>
    </div>
  </div>
);

const StatCard: React.FC<{ label: string; value: number | string; color?: string }> = ({ label, value, color = "text-cyan-400" }) => (
  <div className="glass p-6 rounded-2xl">
    <p className="text-gray-500 text-sm font-bold uppercase mb-2">{label}</p>
    <p className={`text-4xl font-bold ${color}`}>{value}</p>
  </div>
);

const ProjectsCMS: React.FC<{ projects: Project[]; add: any; del: any }> = ({ projects, add, del }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newP, setNewP] = useState<Partial<Project>>({ stack: [], publishStatus: 'published' });

  const handleAdd = () => {
    add({
      ...newP,
      id: Date.now().toString(),
      stack: (newP.stack as string[]).filter(s => s !== '')
    } as Project);
    setShowAdd(false);
    setNewP({ stack: [], publishStatus: 'published' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Project Catalog CMS</h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-cyan-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-cyan-500"
        >
          <Plus size={18} /> <span>New Project</span>
        </button>
      </div>

      {showAdd && (
        <div className="glass p-8 rounded-2xl border-cyan-500/20 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Title" className="bg-white/5 border border-white/10 p-2 rounded outline-none" onChange={e => setNewP({...newP, title: e.target.value})} />
            <input placeholder="Category" className="bg-white/5 border border-white/10 p-2 rounded outline-none" onChange={e => setNewP({...newP, category: e.target.value})} />
            <input placeholder="Image URL" className="bg-white/5 border border-white/10 p-2 rounded outline-none" onChange={e => setNewP({...newP, imageUrl: e.target.value})} />
            <input placeholder="Metrics" className="bg-white/5 border border-white/10 p-2 rounded outline-none" onChange={e => setNewP({...newP, metrics: e.target.value})} />
          </div>
          <textarea placeholder="Description" className="w-full bg-white/5 border border-white/10 p-2 rounded outline-none" rows={3} onChange={e => setNewP({...newP, description: e.target.value})} />
          <input placeholder="Stack (comma separated)" className="w-full bg-white/5 border border-white/10 p-2 rounded outline-none" onChange={e => setNewP({...newP, stack: e.target.value.split(',')})} />
          <button onClick={handleAdd} className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-500">Save Project</button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {projects.map(p => (
          <div key={p.id} className="glass p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={p.imageUrl} className="w-12 h-12 object-cover rounded-lg" alt="" />
              <div>
                <h4 className="font-bold">{p.title}</h4>
                <p className="text-xs text-gray-500">{p.category} • {p.stack.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-blue-400 hover:bg-white/5 rounded-lg"><Edit size={18} /></button>
              <button onClick={() => del(p.id)} className="p-2 text-red-400 hover:bg-white/5 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogCMS: React.FC<{ posts: BlogPost[]; add: any; del: any }> = ({ posts, add, del }) => (
  <div className="space-y-8">
     <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Content CMS</h2>
        <button className="bg-cyan-600 px-4 py-2 rounded-lg flex items-center space-x-2"><Plus size={18} /> <span>New Post</span></button>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="glass p-4 rounded-xl flex items-center justify-between">
             <div>
                <h4 className="font-bold">{post.title}</h4>
                <p className="text-xs text-gray-500">{post.date} • By {post.author}</p>
             </div>
             <button onClick={() => del(post.id)} className="text-red-400 p-2"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
  </div>
);

const TeamCMS: React.FC<{ team: TeamMember[]; add: any; del: any }> = ({ team, add, del }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold">Team Manager</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {team.map(m => (
        <div key={m.id} className="glass p-6 rounded-2xl flex items-start space-x-6">
          <img src={m.imageUrl} className="w-20 h-20 rounded-full" alt="" />
          <div className="flex-grow">
            <h4 className="font-bold text-lg">{m.name}</h4>
            <p className="text-cyan-400 text-sm mb-2">{m.role}</p>
            <p className="text-gray-500 text-xs line-clamp-2">{m.bio}</p>
          </div>
          <button onClick={() => del(m.id)} className="text-red-400"><Trash2 size={18} /></button>
        </div>
      ))}
    </div>
  </div>
);

const LeadsManagement: React.FC<{ leads: any[] }> = ({ leads }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold">Lead Management</h2>
    <div className="space-y-4">
      {leads.length === 0 ? (
        <p className="text-gray-500 italic">No submissions yet.</p>
      ) : (
        leads.map(lead => (
          <div key={lead.id} className="glass p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg">{lead.name}</h4>
                <p className="text-cyan-400 text-sm">{lead.email} • {lead.company || 'Private'}</p>
              </div>
              <span className="text-xs text-gray-500">{new Date(lead.date).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-300 text-sm bg-white/5 p-4 rounded-lg">{lead.message}</p>
          </div>
        ))
      )}
    </div>
  </div>
);

const SettingsPanel: React.FC<{ settings: SiteSettings; update: any }> = ({ settings, update }) => {
  const toggleSection = (key: keyof SiteSettings['sections']) => {
    update({
      sections: { ...settings.sections, [key]: !settings.sections[key] }
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Site Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl space-y-6">
          <h3 className="font-bold text-lg border-b border-white/5 pb-4">Brand & Design</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Site Name</label>
              <input value={settings.siteName} onChange={e => update({siteName: e.target.value})} className="w-full bg-white/5 border border-white/10 p-2 rounded outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm text-gray-400 mb-2">Primary Color</label>
                  <input type="color" value={settings.primaryColor} onChange={e => update({primaryColor: e.target.value})} className="w-full h-10 bg-white/5 border border-white/10 rounded outline-none" />
               </div>
               <div>
                  <label className="block text-sm text-gray-400 mb-2">Secondary Color</label>
                  <input type="color" value={settings.secondaryColor} onChange={e => update({secondaryColor: e.target.value})} className="w-full h-10 bg-white/5 border border-white/10 rounded outline-none" />
               </div>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-2xl space-y-6">
          <h3 className="font-bold text-lg border-b border-white/5 pb-4">Section Visibility</h3>
          <div className="space-y-4">
            {Object.entries(settings.sections).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="capitalize">{key} Section</span>
                <button onClick={() => toggleSection(key as any)}>
                  {val ? <ToggleRight className="text-cyan-500" size={32} /> : <ToggleLeft className="text-gray-600" size={32} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-2xl">
        <h3 className="font-bold text-lg border-b border-white/5 pb-4 mb-6">SEO Engine</h3>
        <div className="space-y-4">
           <div>
              <label className="block text-sm text-gray-400 mb-2">Global Meta Description</label>
              <textarea value={settings.metaDescription} onChange={e => update({metaDescription: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" rows={4} />
           </div>
           <p className="text-xs text-gray-500 italic">Changes apply instantly. URL Slugs are managed at the individual post/project level.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
