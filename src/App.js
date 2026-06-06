import React, { useState } from 'react';
import './App.css';

function ContactForm() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState('idle');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div>
      <h3 className="text-[#38BDF8] font-mono text-sm tracking-widest uppercase mb-6">Send a Message</h3>
      {status === 'sent' ? (
        <div className="flex flex-col items-center justify-center h-48 gap-4">
          <span className="text-4xl">✅</span>
          <p className="text-emerald-400 font-mono text-sm">Message sent successfully!</p>
          <button onClick={() => setStatus('idle')} className="text-xs text-[#94A3B8] hover:text-[#38BDF8] transition-colors font-mono">Send another</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-[#94A3B8] font-mono block mb-1">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
              className="w-full bg-[#090D16] border border-[#38BDF8]/20 rounded-lg px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#38BDF8]/60 transition-colors" />
          </div>
          <div>
            <label className="text-xs text-[#94A3B8] font-mono block mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
              className="w-full bg-[#090D16] border border-[#38BDF8]/20 rounded-lg px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#38BDF8]/60 transition-colors" />
          </div>
          <div>
            <label className="text-xs text-[#94A3B8] font-mono block mb-1">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5}
              className="w-full bg-[#090D16] border border-[#38BDF8]/20 rounded-lg px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#38BDF8]/60 transition-colors resize-none" />
          </div>
          <button onClick={handleSubmit} disabled={status === 'sending'}
            className="w-full py-3 bg-[#38BDF8] text-[#090D16] font-bold rounded-lg hover:bg-[#0EA5E9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [telemetry, setTelemetry] = useState({
    ddss: { count: '--', status: 'loading' },
    smartmed: { count: '--', status: 'loading' },
    rosaflora: { count: '--', status: 'loading' },
  });

  React.useEffect(() => {
    const fetchAll = async () => {
      try {
        const [d, s, r] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/telemetry/ddss').then(res => res.json()),
          fetch('http://127.0.0.1:8000/api/telemetry/smartmed').then(res => res.json()),
          fetch('http://127.0.0.1:8000/api/telemetry/rosaflora').then(res => res.json()),
        ]);
        setTelemetry({ ddss: d, smartmed: s, rosaflora: r });
      } catch (e) {
        setTelemetry({
          ddss: { count: '--', status: 'offline' },
          smartmed: { count: '--', status: 'offline' },
          rosaflora: { count: '--', status: 'offline' },
        });
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#090D16]/80 backdrop-blur-md border-b border-[#38BDF8]/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-[#38BDF8] font-mono text-lg font-bold tracking-widest">JCA.dev</span>
          <ul className="hidden md:flex gap-8 text-sm text-[#94A3B8]">
            <li><a href="#hero" className="hover:text-[#38BDF8] transition-colors">Home</a></li>
            <li><a href="#projects" className="hover:text-[#38BDF8] transition-colors">Projects</a></li>
            <li><a href="#skills" className="hover:text-[#38BDF8] transition-colors">Skills</a></li>
            <li><a href="#certifications" className="hover:text-[#38BDF8] transition-colors">Certifications</a></li>
            <li><a href="#contact" className="hover:text-[#38BDF8] transition-colors">Contact</a></li>
          </ul>
          <button className="md:hidden text-[#38BDF8] text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0F1624] border-t border-[#38BDF8]/10 px-6 py-4">
            <ul className="flex flex-col gap-4 text-sm text-[#94A3B8]">
              <li><a href="#hero" onClick={() => setMenuOpen(false)} className="hover:text-[#38BDF8] transition-colors">Home</a></li>
              <li><a href="#projects" onClick={() => setMenuOpen(false)} className="hover:text-[#38BDF8] transition-colors">Projects</a></li>
              <li><a href="#skills" onClick={() => setMenuOpen(false)} className="hover:text-[#38BDF8] transition-colors">Skills</a></li>
              <li><a href="#certifications" onClick={() => setMenuOpen(false)} className="hover:text-[#38BDF8] transition-colors">Certifications</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-[#38BDF8] transition-colors">Contact</a></li>
            </ul>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <p className="text-[#38BDF8] font-mono text-sm tracking-widest uppercase mb-4">Hi, I'm</p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                John Christian
                <span className="block text-[#38BDF8]">Azores</span>
              </h1>
              <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                I design full-stack software and manage secure systems architecture.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-10">
                {['Laravel', 'React', 'MySQL', 'Networking', 'AI'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-mono border border-[#38BDF8]/30 text-[#38BDF8] rounded-full bg-[#38BDF8]/5">{tag}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#projects" className="px-8 py-3 bg-[#38BDF8] text-[#090D16] font-bold rounded-lg hover:bg-[#0EA5E9] transition-colors text-center">View Projects</a>
                <a href="/my-resume.pdf" download className="px-8 py-3 border border-[#38BDF8]/40 text-[#38BDF8] font-bold rounded-lg hover:bg-[#38BDF8]/10 transition-colors text-center">Download CV</a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative w-56 h-56 md:w-72 md:h-72">
                <div className="absolute inset-0 rounded-full border-2 border-[#38BDF8]/40 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border border-[#38BDF8]/20"></div>
                <div className="absolute inset-4 rounded-full bg-[#0F1624] border border-[#38BDF8]/20 flex items-center justify-center overflow-hidden">
                  <img src="/2x2_AZORES.jpg" alt="John Christian Azores" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-20 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-[#94A3B8]">
              <span className="text-xs font-mono tracking-widest">SCROLL</span>
              <div className="w-px h-8 bg-[#38BDF8]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="min-h-screen py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="text-[#38BDF8] font-mono text-sm tracking-widest uppercase mb-3">What I've Built</p>
            <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* DDSS */}
            <div className="group relative bg-[#0F1624] border border-[#38BDF8]/10 rounded-2xl p-6 hover:border-[#38BDF8]/40 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-mono bg-[#38BDF8]/10 text-[#38BDF8] rounded-full border border-[#38BDF8]/20">Capstone</span>
                  <span className="text-[#38BDF8] text-xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Dropout Decision Support System</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">Data-driven approach for student dropout analysis using machine learning and predictive analytics.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Laravel', 'MySQL', 'ML', 'Python'].map((t) => (
                    <span key={t} className="px-2 py-1 text-xs font-mono bg-[#090D16] text-[#94A3B8] rounded border border-white/5">{t}</span>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8] font-mono">Live Telemetry</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${telemetry.ddss.status === 'online' ? 'bg-[#38BDF8]' : 'bg-gray-500'}`}></div>
                    <span className="text-[#38BDF8] font-mono text-sm font-bold">{telemetry.ddss.count} Profiles Evaluated</span>
                  </div>
                </div>
                <a href="https://github.com/JCazores/ddss" target="_blank" rel="noopener noreferrer"
                  className="w-full text-center py-2 text-xs font-mono border border-[#38BDF8]/20 text-[#94A3B8] rounded-lg hover:border-[#38BDF8]/60 hover:text-[#38BDF8] transition-colors">
                  View on GitHub →
                </a>
              </div>
            </div>

            {/* SmartMed */}
            <div className="group relative bg-[#0F1624] border border-[#38BDF8]/10 rounded-2xl p-6 hover:border-[#38BDF8]/40 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">Healthcare</span>
                  <span className="text-emerald-400 text-xl">🏥</span>
                </div>
                <h3 className="text-xl font-bold mb-2">SmartMed</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">Secure and accessible medical record system with role-based access control and data integrity monitoring.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Laravel', 'MySQL', 'PHP', 'Security'].map((t) => (
                    <span key={t} className="px-2 py-1 text-xs font-mono bg-[#090D16] text-[#94A3B8] rounded border border-white/5">{t}</span>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8] font-mono">System Status</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${telemetry.smartmed.status === 'online' ? 'bg-emerald-400' : 'bg-gray-500'}`}></div>
                    <span className="text-emerald-400 font-mono text-sm font-bold">{telemetry.smartmed.count} Patient Records</span>
                  </div>
                </div>
                <a href="https://github.com/JCazores/smartmed" target="_blank" rel="noopener noreferrer"
                  className="w-full text-center py-2 text-xs font-mono border border-emerald-500/20 text-[#94A3B8] rounded-lg hover:border-emerald-500/60 hover:text-emerald-400 transition-colors">
                  View on GitHub →
                </a>
              </div>
            </div>

            {/* RosaFlora */}
            <div className="group relative bg-[#0F1624] border border-[#38BDF8]/10 rounded-2xl p-6 hover:border-[#38BDF8]/40 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-mono bg-pink-500/10 text-pink-400 rounded-full border border-pink-500/20">Business</span>
                  <span className="text-pink-400 text-xl">🌸</span>
                </div>
                <h3 className="text-xl font-bold mb-2">RosaFlora Beauty Salon</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">Digital customer appointment and reservation management engine for beauty salon operations.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Laravel', 'MySQL', 'React', 'Booking'].map((t) => (
                    <span key={t} className="px-2 py-1 text-xs font-mono bg-[#090D16] text-[#94A3B8] rounded border border-white/5">{t}</span>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8] font-mono">Live Telemetry</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${telemetry.rosaflora.status === 'online' ? 'bg-pink-400' : 'bg-gray-500'}`}></div>
                    <span className="text-pink-400 font-mono text-sm font-bold">{telemetry.rosaflora.count} Active Reservations</span>
                  </div>
                </div>
                <a href="https://github.com/YOUR_USERNAME/rosaflora-repo" target="_blank" rel="noopener noreferrer"
                  className="w-full text-center py-2 text-xs font-mono border border-pink-500/20 text-[#94A3B8] rounded-lg hover:border-pink-500/60 hover:text-pink-400 transition-colors">
                  View on GitHub →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 bg-[#0A0F1A]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="text-[#38BDF8] font-mono text-sm tracking-widest uppercase mb-3">What I Know</p>
            <h2 className="text-3xl md:text-5xl font-bold">Skills</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0F1624] border border-[#38BDF8]/10 rounded-2xl p-6">
              <h3 className="text-[#38BDF8] font-mono text-sm tracking-widest uppercase mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Bootstrap'].map((s) => (
                  <span key={s} className="px-3 py-1 text-sm bg-[#38BDF8]/5 border border-[#38BDF8]/20 text-[#F8FAFC] rounded-full hover:bg-[#38BDF8]/10 transition-colors cursor-default">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-[#0F1624] border border-[#38BDF8]/10 rounded-2xl p-6">
              <h3 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {['Laravel', 'PHP', 'MySQL', 'REST API', 'Node.js', 'Python'].map((s) => (
                  <span key={s} className="px-3 py-1 text-sm bg-emerald-500/5 border border-emerald-500/20 text-[#F8FAFC] rounded-full hover:bg-emerald-500/10 transition-colors cursor-default">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-[#0F1624] border border-[#38BDF8]/10 rounded-2xl p-6">
              <h3 className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">Systems & Others</h3>
              <div className="flex flex-wrap gap-2">
                {['Networking', 'CCNA', 'Linux', 'Git', 'Cybersecurity', 'AI/ML'].map((s) => (
                  <span key={s} className="px-3 py-1 text-sm bg-purple-500/5 border border-purple-500/20 text-[#F8FAFC] rounded-full hover:bg-purple-500/10 transition-colors cursor-default">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="text-[#38BDF8] font-mono text-sm tracking-widest uppercase mb-3">My Credentials</p>
            <h2 className="text-3xl md:text-5xl font-bold">Certifications</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#38BDF8]/20"></div>
            {[
              { year: '2024', title: 'CCNA Routing & Switching', org: 'Cisco', category: 'Networking', color: 'text-[#38BDF8]', border: 'border-[#38BDF8]/30', bg: 'bg-[#38BDF8]/5' },
              { year: '2024', title: 'Cyber Threat Management', org: 'Cisco', category: 'Security', color: 'text-red-400', border: 'border-red-400/30', bg: 'bg-red-400/5' },
              { year: '2023', title: 'Modern AI Foundations', org: 'IBM', category: 'AI', color: 'text-purple-400', border: 'border-purple-400/30', bg: 'bg-purple-400/5' },
              { year: '2023', title: 'HTML & CSS Architecture', org: 'freeCodeCamp', category: 'Web', color: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/5' },
            ].map((cert, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row gap-4 mb-10 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#38BDF8] border-2 border-[#090D16] transform -translate-x-1/2 mt-1"></div>
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                  <div className={`inline-block bg-[#0F1624] border ${cert.border} rounded-xl p-5 ${cert.bg}`}>
                    <span className="text-xs font-mono text-[#94A3B8] mb-1 block">{cert.year}</span>
                    <h4 className={`font-bold text-lg mb-1 ${cert.color}`}>{cert.title}</h4>
                    <p className="text-[#94A3B8] text-sm">{cert.org}</p>
                    <span className={`mt-2 inline-block px-2 py-0.5 text-xs font-mono border ${cert.border} ${cert.color} rounded-full`}>{cert.category}</span>
                  </div>
                </div>
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-[#0A0F1A]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="text-[#38BDF8] font-mono text-sm tracking-widests uppercase mb-3">Get In Touch</p>
            <h2 className="text-3xl md:text-5xl font-bold">Contact Me</h2>
            <p className="text-[#94A3B8] mt-4 max-w-xl mx-auto">Have a project in mind or want to collaborate? Send me a message and I'll get back to you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <div className="bg-[#0F1624] border border-[#38BDF8]/10 rounded-2xl p-6">
                <h3 className="text-[#38BDF8] font-mono text-sm tracking-widest uppercase mb-4">Contact Info</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[#38BDF8] text-lg">✉</span>
                    <div>
                      <p className="text-xs text-[#94A3B8] font-mono">Email</p>
                      <p className="text-sm text-[#F8FAFC]">john.christian.azores2016@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#38BDF8] text-lg">📍</span>
                    <div>
                      <p className="text-xs text-[#94A3B8] font-mono">Location</p>
                      <p className="text-sm text-[#F8FAFC]">Philippines</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#38BDF8] text-lg">💼</span>
                    <div>
                      <p className="text-xs text-[#94A3B8] font-mono">Available For</p>
                      <p className="text-sm text-[#F8FAFC]">Freelance & Full-time roles</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#0F1624] border border-[#38BDF8]/10 rounded-2xl p-6">
                <h3 className="text-[#38BDF8] font-mono text-sm tracking-widest uppercase mb-4">Socials</h3>
                <div className="flex gap-3">
                  <a href="https://github.com/JCazores" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-mono border border-[#38BDF8]/20 text-[git --version#94A3B8] rounded-lg hover:border-[#38BDF8]/60 hover:text-[#38BDF8] transition-colors">GitHub</a>
                  <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-mono border border-[#38BDF8]/20 text-[#94A3B8] rounded-lg hover:border-[#38BDF8]/60 hover:text-[#38BDF8] transition-colors">LinkedIn</a>
                  <a href="https://facebook.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-mono border border-[#38BDF8]/20 text-[#94A3B8] rounded-lg hover:border-[#38BDF8]/60 hover:text-[#38BDF8] transition-colors">Facebook</a>
                </div>
              </div>
            </div>
            <div className="bg-[#0F1624] border border-[#38BDF8]/10 rounded-2xl p-6">
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="mt-24 border-t border-[#38BDF8]/10 pt-8 text-center">
          <p className="text-[#94A3B8] text-sm font-mono">
            © 2024 <span className="text-[#38BDF8]">John Christian Azores</span> — Built with React & Laravel
          </p>
        </div>
      </section>

    </div>
  );
}

export default App;