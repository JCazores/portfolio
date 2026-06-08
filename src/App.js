import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ── Animated counter ──────────────────────────────────────────────
function Counter({ value, suffix = '' }) {
  const [display, setDisplay] = useState('--');
  useEffect(() => {
    if (value === '--' || value === undefined) return;
    const n = parseInt(value);
    if (isNaN(n)) return;
    let start = 0;
    const step = Math.max(1, Math.floor(n / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= n) { setDisplay(n + suffix); clearInterval(timer); }
      else setDisplay(start + suffix);
    }, 30);
    return () => clearInterval(timer);
  }, [value, suffix]);
  return <span>{display}</span>;
}

// ── Contact form ───────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => { setStatus('sent'); setForm({ name: '', email: '', message: '' }); }, 1500);
  };
  if (status === 'sent') return (
    <div className="flex flex-col items-center justify-center h-56 gap-4">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">✓</div>
      <p className="text-emerald-400 font-mono text-sm tracking-wider">MESSAGE SENT</p>
      <button onClick={() => setStatus('idle')} className="text-xs text-slate-500 hover:text-sky-400 transition-colors font-mono">Send another →</button>
    </div>
  );
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {[
        { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
        { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@company.com' },
      ].map(f => (
        <div key={f.name}>
          <label className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1.5">{f.label}</label>
          <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} required
            className="w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/60 focus:bg-slate-900 transition-all" />
        </div>
      ))}
      <div>
        <label className="text-[10px] text-slate-500 font-mono tracking-widest uppercase block mb-1.5">Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." rows={4} required
          className="w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/60 focus:bg-slate-900 transition-all resize-none" />
      </div>
      <button type="submit" disabled={status === 'sending'}
        className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold rounded-lg transition-all disabled:opacity-50 text-sm tracking-wide">
        {status === 'sending' ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  );
}

// ── Project card ───────────────────────────────────────────────────
function ProjectCard({ badge, badgeColor, icon, title, desc, tags, statLabel, statValue, statColor, statStatus, url, borderHover }) {
  const dotColor = statStatus === 'online' ? statColor : 'bg-slate-600';
  return (
    <div className={`group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 backdrop-blur-sm`}>
      {/* Glow on hover */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${borderHover} pointer-events-none`} style={{background: 'transparent', boxShadow: 'inset 0 0 0 1px currentColor'}}></div>
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full border ${badgeColor}`}>{badge}</span>
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg font-bold mb-2 text-slate-100 leading-tight">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map(t => (
            <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700/50">{t}</span>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-800 pt-4 mt-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">{statLabel}</span>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor} ${statStatus === 'online' ? 'animate-pulse' : ''}`}></div>
            <span className={`font-mono text-xs font-semibold ${statColor.replace('bg-', 'text-').replace('animate-pulse','')}`}>
              {statStatus === 'online' ? <Counter value={statValue} /> : statValue}
              {statStatus === 'online' && statValue !== '--' && statValue !== 'Online' ? '' : ''}
              {' '}{statLabel === 'Live Platform' ? '' : statLabel === 'Live Telemetry' || statLabel === 'System Status' ? (statStatus === 'online' ? 'online' : 'offline') : ''}
            </span>
          </div>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="w-full text-center py-2.5 text-xs font-mono border border-slate-700 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-slate-200 hover:border-slate-600 transition-all">
          View Project →
        </a>
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [telemetry, setTelemetry] = useState({
    ddss: { count: '--', status: 'loading' },
    smartmed: { count: '--', status: 'loading' },
    rosaflora: { count: '--', status: 'loading' },
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [d, s, r] = await Promise.all([
          fetch('https://portfolio-backend-production-70ff.up.railway.app/api/telemetry/ddss').then(res => res.json()),
          fetch('https://portfolio-backend-production-70ff.up.railway.app/api/telemetry/smartmed').then(res => res.json()),
          fetch('https://portfolio-backend-production-70ff.up.railway.app/api/telemetry/rosaflora').then(res => res.json()),
        ]);
        setTelemetry({ ddss: d, smartmed: s, rosaflora: r });
      } catch {
        setTelemetry({
          ddss: { count: '--', status: 'offline' },
          smartmed: { count: '--', status: 'offline' },
          rosaflora: { count: '--', status: 'offline' },
        });
      }
    };
    fetchAll();
  }, []);

  const navLinks = ['Home', 'Projects', 'Skills', 'Certifications', 'Contact'];

  const projects = [
    {
      badge: 'OJT Project', badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      icon: '🛡️', title: 'SentinelFlow',
      desc: 'Integrated security monitoring & vulnerability assessment platform with automated web, network, and mobile penetration testing, uptime monitoring, and real-time remediation guidance.',
      tags: ['Security', 'Pentesting', 'Monitoring', 'Laravel', 'React'],
      statLabel: 'Live Platform', statValue: 'Online', statColor: 'text-violet-400',
      statStatus: 'online', url: 'https://165.245.180.57/', borderHover: 'border-violet-500/20',
    },
    {
      badge: 'Capstone', badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      icon: '📊', title: 'Dropout Decision Support System',
      desc: 'Data-driven ML platform for student dropout prediction and analysis using machine learning and predictive analytics to support academic intervention.',
      tags: ['Laravel', 'MySQL', 'Python', 'ML', 'Railway'],
      statLabel: 'Live Telemetry', statValue: telemetry.ddss.count, statColor: 'text-sky-400',
      statStatus: telemetry.ddss.status, url: 'https://ddss-production.up.railway.app', borderHover: 'border-sky-500/20',
    },
    {
      badge: 'Healthcare', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: '🏥', title: 'SmartMed',
      desc: 'Secure and accessible medical record system with role-based access control, audit logging, and data integrity monitoring for healthcare delivery.',
      tags: ['PHP', 'MySQL', 'Security', 'RBAC'],
      statLabel: 'System Status', statValue: telemetry.smartmed.count, statColor: 'text-emerald-400',
      statStatus: telemetry.smartmed.status, url: 'https://smartmed-production-5c92.up.railway.app', borderHover: 'border-emerald-500/20',
    },
    {
      badge: 'Business', badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      icon: '🌸', title: 'RosaFlora Beauty Salon',
      desc: 'Digital customer appointment and reservation management system for beauty salon operations with stylist scheduling, invoicing, and admin dashboard.',
      tags: ['PHP', 'MySQL', 'Booking', 'Dashboard'],
      statLabel: 'Live Telemetry', statValue: telemetry.rosaflora.count, statColor: 'text-pink-400',
      statStatus: telemetry.rosaflora.status, url: 'https://onlinebeautyparlor-production.up.railway.app/admin/index.php', borderHover: 'border-pink-500/20',
    },
  ];

  const certs = [
    { title: 'CCNA: Switching, Routing & Wireless Essentials', org: 'Cisco', year: '2025', color: 'sky' },
    { title: 'CCNA: Introduction to Networks', org: 'Cisco', year: '2025', color: 'sky' },
    { title: 'Cyber Threat Management', org: 'Cisco', year: '2025', color: 'red' },
    { title: 'Introduction to Modern AI', org: 'IBM', year: '2025', color: 'purple' },
    { title: 'Introduction to Cybersecurity', org: 'Cisco', year: '2025', color: 'red' },
    { title: 'IoT and Data Privacy', org: 'Cisco', year: '2025', color: 'amber' },
    { title: 'Best Practices for Clean HTML', org: 'freeCodeCamp', year: '2025', color: 'emerald' },
  ];

  const colorMap = {
    sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-400', dot: 'bg-sky-400' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', dot: 'bg-red-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', dot: 'bg-purple-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  };

  return (
    <div className="min-h-screen bg-[#060A12] text-slate-200 font-sans antialiased">

      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, transparent 70%)'
      }}></div>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#060A12]/90 backdrop-blur-xl border-b border-slate-800/60 shadow-xl shadow-black/20' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-slate-900 font-black text-sm">JC</div>
            <span className="text-slate-200 font-mono text-sm font-bold tracking-wider">JCA.dev</span>
          </div>
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-sky-400 hover:bg-sky-500/5 rounded-lg transition-all font-mono">
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <a href="/my-resume.pdf" download
            className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-mono border border-sky-500/40 text-sky-400 rounded-lg hover:bg-sky-500/10 transition-all">
            ↓ Resume
          </a>
          <button className="md:hidden text-slate-400 hover:text-sky-400 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`block h-px bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-px bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-px bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#060A12]/95 backdrop-blur-xl border-t border-slate-800 px-6 py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-slate-400 hover:text-sky-400 hover:bg-sky-500/5 rounded-lg transition-all font-mono">
                    {link}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-800 mt-2">
                <a href="/my-resume.pdf" download className="block px-4 py-3 text-sm text-sky-400 font-mono">↓ Download Resume</a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
            <div className="flex-1">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-emerald-400 text-xs font-mono tracking-wider">Available for opportunities</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-none mb-6 tracking-tight">
                <span className="block text-slate-400 text-2xl md:text-3xl font-mono font-normal tracking-widest mb-3">Hi, I'm</span>
                <span className="block text-slate-100">John Christian</span>
                <span className="block" style={{background: 'linear-gradient(135deg, #38BDF8, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Azores</span>
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                Full-stack developer specializing in Laravel, React, and secure systems architecture. I build production-grade applications and deploy them to the cloud.
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {['Laravel', 'React', 'MySQL', 'CCNA', 'Cybersecurity', 'AI/ML'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-mono border border-slate-700 text-slate-400 rounded-lg bg-slate-800/50 hover:border-sky-500/40 hover:text-sky-400 transition-colors cursor-default">{tag}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#projects"
                  className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold rounded-xl transition-all text-sm hover:shadow-lg hover:shadow-sky-500/25">
                  View Projects →
                </a>
                <a href="/my-resume.pdf" download
                  className="px-8 py-3.5 border border-slate-700 text-slate-300 font-medium rounded-xl hover:border-sky-500/40 hover:text-sky-400 transition-all text-sm">
                  ↓ Download CV
                </a>
              </div>

              {/* Stats row */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-slate-800">
                {[
                  { value: '4', label: 'Projects Deployed' },
                  { value: '3+', label: 'Years Learning' },
                  { value: '7+', label: 'Certifications' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-sky-400 font-mono">{s.value}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile */}
            <div className="flex-shrink-0 relative">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border border-sky-500/10 animate-spin" style={{animationDuration: '20s'}}></div>
                <div className="absolute inset-4 rounded-full border border-indigo-500/10 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                {/* Orbit dot */}
                <div className="absolute inset-0 rounded-full animate-spin" style={{animationDuration: '8s'}}>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-lg shadow-sky-400/50"></div>
                </div>
                {/* Photo */}
                <div className="absolute inset-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden shadow-2xl">
                  <img src="/2x2_AZORES.jpg" alt="John Christian Azores" className="w-full h-full object-cover rounded-full" />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs font-mono text-slate-300">Open to Work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-20">
            <a href="#projects" className="flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors group">
              <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
              <div className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent group-hover:from-sky-500 transition-colors"></div>
            </a>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-sky-400 font-mono text-xs tracking-widest uppercase mb-3">// What I've Built</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-100 mb-4">Projects</h2>
            <p className="text-slate-400 max-w-lg">Production-grade applications deployed to the cloud, each connected to live databases with real-time telemetry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-24 relative">
        <div className="absolute inset-0 bg-slate-900/20"></div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-16">
            <p className="text-sky-400 font-mono text-xs tracking-widest uppercase mb-3">// What I Know</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-100">Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Frontend', icon: '⚡', color: 'sky',
                skills: ['React', 'JavaScript', 'HTML5 / CSS3', 'Tailwind CSS', 'Bootstrap', 'Vite']
              },
              {
                title: 'Backend', icon: '⚙️', color: 'emerald',
                skills: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Node.js', 'Python']
              },
              {
                title: 'Systems & Security', icon: '🔒', color: 'purple',
                skills: ['CCNA Networking', 'Cybersecurity', 'Linux', 'Docker', 'Git / GitHub', 'AI / ML']
              },
            ].map(cat => {
              const c = { sky: 'sky', emerald: 'emerald', purple: 'purple' }[cat.color];
              return (
                <div key={cat.title} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xl">{cat.icon}</span>
                    <h3 className={`font-mono text-sm tracking-widest uppercase font-bold text-${c}-400`}>{cat.title}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {cat.skills.map(s => (
                      <div key={s} className="flex items-center gap-3 group">
                        <div className={`w-1 h-1 rounded-full bg-${c}-400/60 group-hover:bg-${c}-400 transition-colors`}></div>
                        <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-sky-400 font-mono text-xs tracking-widest uppercase mb-3">// My Credentials</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-100">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certs.map((cert, i) => {
              const c = colorMap[cert.color];
              return (
                <div key={i} className={`flex items-start gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 hover:-translate-y-0.5 transition-all backdrop-blur-sm group`}>
                  <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <div className={`w-2 h-2 rounded-full ${c.dot}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">{cert.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-mono ${c.text}`}>{cert.org}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-500 font-mono">{cert.year}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-slate-900/30"></div>
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="mb-16 text-center">
            <p className="text-sky-400 font-mono text-xs tracking-widest uppercase mb-3">// Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-100 mb-4">Contact Me</h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm">Open to internships, freelance projects, and full-time opportunities. Let's build something great together.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Info */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {[
                { icon: '✉', label: 'Email', value: 'john.christian.azores2016@gmail.com' },
                { icon: '📍', label: 'Location', value: 'Rodriguez, Rizal, Philippines' },
                { icon: '💼', label: 'Available For', value: 'Internship & Full-time Roles' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sm flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mb-0.5">{item.label}</p>
                    <p className="text-sm text-slate-300 leading-snug">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mb-3">Socials</p>
                <div className="flex gap-2">
                  {[
                    { label: 'GitHub', url: 'https://github.com/JCazores' },
                    { label: 'LinkedIn', url: 'https://linkedin.com/in/YOUR_USERNAME' },
                    { label: 'Facebook', url: 'https://facebook.com/YOUR_USERNAME' },
                  ].map(s => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-2 text-xs font-mono border border-slate-700 text-slate-400 rounded-lg hover:border-sky-500/40 hover:text-sky-400 transition-all">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-mono text-slate-300 tracking-wider mb-5">Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center text-slate-900 font-black text-xs">JC</div>
              <span className="text-slate-500 text-sm font-mono">JCA.dev</span>
            </div>
            <p className="text-slate-600 text-xs font-mono">
              © 2026 John Christian Azores — Built with React & Laravel, deployed on Vercel & Railway
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}