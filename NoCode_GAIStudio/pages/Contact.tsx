
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { Lead } from '../types';

const ContactPage: React.FC<{ addLead: (lead: Lead) => void; state: any }> = ({ addLead, state }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      id: Date.now().toString(),
      ...form,
      date: new Date().toISOString()
    });
    setSubmitted(true);
    setForm({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Let's <span className="gradient-text">Collaborate</span></h1>
            <p className="text-gray-400 text-lg mb-12">
              Inquire about project timelines, technical stacks, or research opportunities. Our team will respond within 24-48 business hours.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="p-4 glass rounded-xl text-cyan-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Project Inquiries</h4>
                  <p className="text-gray-400">contact@s3ra-quantum.io</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 glass rounded-xl text-blue-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Innovation Center</h4>
                  <p className="text-gray-400">CSE Department, CSE Research Wing</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 glass rounded-xl text-indigo-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Call/Telegram</h4>
                  <p className="text-gray-400">+91 (555) 0123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-3xl relative">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Message Transmitted</h3>
                <p className="text-gray-400">Your brief has been recorded. Our technical lead will reach out shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-cyan-400 font-bold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full glass border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full glass border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Company/Institution (Optional)</label>
                  <input 
                    type="text" 
                    value={form.company}
                    onChange={(e) => setForm({...form, company: e.target.value})}
                    className="w-full glass border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                    placeholder="Tech Corp / University Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Project Brief</label>
                  <textarea 
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full glass border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                    placeholder="Describe your technical requirements..."
                  />
                </div>
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2">
                  <Send size={18} />
                  <span>Send Project Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
