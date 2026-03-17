import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, FolderKanban, MessageSquare, 
  CheckCircle2, Lock, Send, Paperclip, Bell, 
  Zap, ShieldCheck, LogOut, Sun, Moon, Sparkles,
  FileUp, History, Download, ExternalLink,
  Layers, ChevronRight, Clock
} from 'lucide-react';

/**
 * THEME DEFINITIONS
 * High-end color palettes for different user preferences.
 */
const themes = {
  midnight: {
    name: 'Midnight',
    bg: 'bg-[#07070A]',
    sidebar: 'bg-black/40',
    card: 'bg-white/[0.03]',
    text: 'text-zinc-100',
    accent: 'text-indigo-400',
    button: 'bg-indigo-600',
    border: 'border-white/5',
    gradient: 'from-indigo-500/10 via-transparent to-blue-500/10'
  },
  light: {
    name: 'Classic Light',
    bg: 'bg-[#F8FAFC]',
    sidebar: 'bg-white',
    card: 'bg-white',
    text: 'text-slate-900',
    accent: 'text-blue-600',
    button: 'bg-blue-600',
    border: 'border-slate-200',
    gradient: 'from-blue-500/5 via-transparent to-slate-500/5'
  },
  aurora: {
    name: 'Aurora',
    bg: 'bg-[#0F172A]',
    sidebar: 'bg-[#1E293B]/50',
    card: 'bg-white/[0.05]',
    text: 'text-cyan-50',
    accent: 'text-cyan-400',
    button: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    border: 'border-cyan-500/20',
    gradient: 'from-cyan-500/20 via-transparent to-purple-500/20'
  }
};

const api = {
  auth: {
    login: async () => ({ success: true, user: { id: 'u1', name: 'Sarah Jenkins', role: 'Project Owner' } })
  },
  project: {
    get: async () => ({
      name: 'Website Redesign',
      client: 'Acme Corp',
      progress: 68,
      status: 'In Progress',
      nextStep: 'Design Concept Approval'
    }),
    getSteps: async () => [
      { id: 1, title: 'Discovery & Strategy', status: 'completed', desc: 'Research and project mapping.' },
      { id: 2, title: 'Design Concept', status: 'action', desc: 'Visual direction and layout approval.' },
      { id: 3, title: 'Development', status: 'locked', desc: 'Turning designs into functional code.' }
    ],
    getActivity: async () => [
      { id: 1, user: 'Alex (Designer)', action: 'uploaded homepage_v2.pdf', time: '10 min ago' },
      { id: 2, user: 'System', action: 'moved project to Design Phase', time: '1 hour ago' },
      { id: 3, user: 'Sarah', action: 'approved Discovery Phase', time: 'Yesterday' }
    ]
  }
};

const App = () => {
  const [view, setView] = useState('login');
  const [themeKey, setThemeKey] = useState('midnight');
  const [project, setProject] = useState(null);
  const [steps, setSteps] = useState([]);
  const [activity, setActivity] = useState([]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alex', text: 'Hey Sarah, I just uploaded the new design concept for your review.', isSelf: false },
    { id: 2, sender: 'You', text: 'Thanks! Checking it now.', isSelf: true }
  ]);
  const [input, setInput] = useState('');

  const theme = themes[themeKey];

  useEffect(() => {
    if (view === 'dashboard') {
      const load = async () => {
        const [p, s, a] = await Promise.all([
          api.project.get(),
          api.project.getSteps(),
          api.project.getActivity()
        ]);
        setProject(p);
        setSteps(s);
        setActivity(a);
      };
      load();
    }
  }, [view]);

  if (view === 'login') {
    return (
      <div className={`h-screen ${theme.bg} flex items-center justify-center font-['Lexend'] relative overflow-hidden transition-colors duration-700`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)]" />
        <div className="relative z-10 w-full max-w-sm p-10 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
              <Zap className="text-white" size={28} />
            </div>
          </div>
          <h1 className="text-white text-2xl font-semibold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-zinc-500 text-sm mb-10">Access your project portal</p>
          
          <div className="space-y-3">
            <input placeholder="Email" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-indigo-500 outline-none transition-all" />
            <input type="password" placeholder="Password" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-indigo-500 outline-none transition-all" />
            <button onClick={() => setView('dashboard')} className="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all mt-4">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${theme.bg} ${theme.text} font-['Lexend'] transition-colors duration-700 relative overflow-hidden`}>
      {/* ANIMATED GRADIENT BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 blur-[120px] rounded-full animate-swirl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/20 blur-[120px] rounded-full animate-swirl-reverse" />
      </div>

      {/* SIDEBAR */}
      <aside className={`w-72 ${theme.sidebar} backdrop-blur-3xl border-r ${theme.border} flex flex-col p-8 z-20`}>
        <div className="flex items-center gap-3 mb-16">
          <Zap size={28} className="text-indigo-500" />
          <span className="font-bold text-2xl tracking-tight">ProjectOS</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { label: 'Overview', icon: LayoutDashboard, active: true },
            { label: 'My Projects', icon: FolderKanban },
            { label: 'Messages', icon: MessageSquare },
            { label: 'File Vault', icon: ShieldCheck }
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${item.active ? 'bg-white/10 shadow-sm border border-white/5' : 'hover:bg-white/5 text-zinc-500 hover:text-white'}`}>
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <div className={`p-5 rounded-2xl ${theme.card} border ${theme.border}`}>
            <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 mb-3 font-semibold">Appearance</p>
            <div className="flex justify-between items-center bg-black/20 p-1.5 rounded-xl">
              <button onClick={() => setThemeKey('midnight')} className={`p-2.5 rounded-lg flex-1 flex justify-center transition-all ${themeKey === 'midnight' ? 'bg-zinc-800 shadow-lg text-white' : 'text-zinc-500'}`}><Moon size={16} /></button>
              <button onClick={() => setThemeKey('light')} className={`p-2.5 rounded-lg flex-1 flex justify-center transition-all ${themeKey === 'light' ? 'bg-white shadow-lg text-black' : 'text-zinc-500'}`}><Sun size={16} /></button>
              <button onClick={() => setThemeKey('aurora')} className={`p-2.5 rounded-lg flex-1 flex justify-center transition-all ${themeKey === 'aurora' ? 'bg-cyan-900 shadow-lg text-white' : 'text-zinc-500'}`}><Sparkles size={16} /></button>
            </div>
          </div>
          <button onClick={() => setView('login')} className="flex items-center gap-3 text-zinc-500 hover:text-red-400 text-sm px-5 transition-colors">
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        <header className={`h-24 border-b ${theme.border} px-12 flex items-center justify-between bg-black/5 backdrop-blur-md`}>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{project?.name}</h1>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
              <Clock size={12} />
              <span>Next: {project?.nextStep}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-4 ${themeKey === 'light' ? 'border-white' : 'border-[#07070A]'} bg-zinc-800 flex items-center justify-center text-[10px] font-bold`}>U{i}</div>
              ))}
            </div>
            <button className={`p-3 rounded-2xl ${theme.card} border ${theme.border} hover:scale-110 transition-transform`}><Bell size={20} /></button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-12 space-y-12">
            
            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`${theme.card} p-8 rounded-[2.5rem] border ${theme.border} relative group overflow-hidden`}>
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-indigo-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
                <p className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-widest">Total Progress</p>
                <h2 className="text-4xl font-bold">{project?.progress}%</h2>
                <div className="h-2 w-full bg-black/20 rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{width: `${project?.progress}%`}} />
                </div>
              </div>
              <div className={`${theme.card} p-8 rounded-[2.5rem] border ${theme.border}`}>
                <p className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-widest">Deliverables</p>
                <h2 className="text-4xl font-bold">12</h2>
                <p className="text-xs text-green-400 mt-3 font-medium flex items-center gap-1"><CheckCircle2 size={12}/> 3 Ready for review</p>
              </div>
              <div className={`${theme.card} p-8 rounded-[2.5rem] border ${theme.border}`}>
                <p className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-widest">Target Date</p>
                <h2 className="text-4xl font-bold">Oct 24</h2>
                <p className="text-xs text-zinc-500 mt-3">Final Launch Phase</p>
              </div>
            </div>

            {/* PROJECT STEPS */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-3">
                  <Layers size={20} className="text-indigo-500" /> Project Milestones
                </h3>
              </div>
              <div className="space-y-4">
                {steps.map(step => (
                  <div key={step.id} className={`${theme.card} p-8 rounded-3xl border ${theme.border} flex items-center justify-between group transition-all duration-300 hover:translate-x-1`}>
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.status === 'completed' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-black/20 text-zinc-700'}`}>
                        {step.status === 'completed' ? <CheckCircle2 size={24} /> : <Lock size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-base mb-1">{step.title}</h4>
                        <p className="text-sm text-zinc-500 font-light">{step.desc}</p>
                      </div>
                    </div>
                    {step.status === 'action' && (
                      <button className="bg-white text-black text-xs font-bold px-8 py-4 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95">
                        Approve This Step
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ACTIVITY TIMELINE */}
            <section className="space-y-6 pb-12">
              <h3 className="text-sm font-bold text-zinc-500 flex items-center gap-2 uppercase tracking-widest">
                <History size={16} /> Activity History
              </h3>
              <div className="space-y-6 pl-2">
                {activity.map((act, idx) => (
                  <div key={act.id} className="flex gap-6 items-start relative">
                    {idx !== activity.length - 1 && <div className="absolute left-[7px] top-6 bottom-[-24px] w-[2px] bg-white/5" />}
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-500 bg-[#07070A] z-10 mt-1" />
                    <div className="space-y-1">
                      <p className="text-sm"><span className="font-bold text-white">{act.user}</span> <span className="text-zinc-400">{act.action}</span></p>
                      <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* COMMUNICATION PANEL */}
          <aside className={`w-96 ${theme.sidebar} border-l ${theme.border} flex flex-col z-20`}>
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold text-sm">Project Communication</h3>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {messages.map(m => (
                <div key={m.id} className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[90%] p-4 rounded-3xl text-sm leading-relaxed ${m.isSelf ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/5 text-zinc-300 rounded-tl-none border border-white/5'}`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] font-bold text-zinc-600 mt-3 uppercase tracking-widest">{m.sender} • 12:40 PM</span>
                </div>
              ))}
            </div>
            <div className="p-8 border-t border-white/5">
              <div className="relative flex items-center">
                <input 
                  value={input} onChange={e => setInput(e.target.value)}
                  placeholder="Send a message..." 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500 transition-all pr-14"
                />
                <button className="absolute right-4 text-indigo-400 hover:text-white transition-colors">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap');
        
        @keyframes swirl {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes swirl-reverse {
          0% { transform: rotate(360deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(1); }
          100% { transform: rotate(0deg) scale(1.1); }
        }
        .animate-swirl { animation: swirl 25s linear infinite; }
        .animate-swirl-reverse { animation: swirl-reverse 30s linear infinite; }

        body { font-family: 'Lexend', sans-serif; overflow: hidden; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;


