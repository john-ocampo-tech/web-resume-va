/* ==================== IMPORTS ==================== */
import { useState, useEffect, useRef, type ReactNode } from 'react';
import emailjs from '@emailjs/browser';
import { Navbar, type TabType } from './components/layout/Navbar';
import { ProfileCard } from './components/ui/ProfileCard';
import resumeData from './data/resume.json';
import type { Resume } from './types/resume';

/* ==================== ICONS ==================== */
const IconBolt = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>);
const IconBriefcase = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const IconLightbulb = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>);
const IconHeart = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>);

/* ==================== APP ==================== */
function App() {
  const resume = resumeData as Resume;
  const [activeTab, setActiveTab] = useState<TabType>('about');

  return (
    <div className="app-wrapper">
      <div className="layout-container">
        <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />
        <ProfileCard resume={resume} onContactClick={() => setActiveTab('contact')} />
        
        <main className="main-content" style={{ 
          flex: 1, 
          minWidth: 0, 
          backgroundColor: '#fcfbf8', 
          padding: '32px',
          overflowY: 'auto',
          color: '#1d211e',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* CINEMATIC ANIMATION WRAPPER */}
          <div className="tab-transition-wrapper" key={activeTab}>
            {activeTab === 'about' && <AboutView resume={resume} />}
            {activeTab === 'resume' && <ResumeView resume={resume} />}
            {activeTab === 'contact' && <ContactView resume={resume} />}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ==================== ABOUT VIEW (ORIGINAL) ==================== */
const AboutView = ({ resume }: { resume: Resume }) => (
  <>
    <div>
      <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#5b7c6f', textTransform: 'uppercase' }}>
        Get to know me
      </span>
      <h2 style={{ fontSize: '1.25rem', margin: '6px 0 12px 0', fontFamily: 'var(--font-display)', fontWeight: '500', color: '#1d211e', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
        About Me
      </h2>
      <p style={{ lineHeight: 1.65, color: '#6e746e', fontSize: '0.95rem', maxWidth: '800px' }}>
        {resume.summary}
      </p>

      {resume.skills && resume.skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
          {resume.skills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      )}
    </div>

    <div style={{ height: '1px', background: '#e4e1d7', width: '100%' }}></div>

    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <h3 style={{ fontSize: '0.75rem', marginBottom: '16px', color: '#6e746e', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        What I Do
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', flex: 1, minHeight: 0 }}>
         <ServiceBox icon={<IconBolt />} title="Technical Support" desc="Skilled in troubleshooting technical issues and providing timely solutions." />
         <ServiceBox icon={<IconBriefcase />} title="Case Management" desc="Experienced in organizing and resolving complex claims efficiently." />
         <ServiceBox icon={<IconLightbulb />} title="Problem Solving" desc="Root cause analysis and maintaining high-level customer satisfaction." />
         <ServiceBox icon={<IconHeart />} title="Customer Success" desc="Background in airline customer service and team collaboration." />
      </div>
    </div>
  </>
);

/* ==================== RESUME VIEW (ORIGINAL) ==================== */
const ResumeView = (_props: { resume?: Resume }) => {
  const [isPdfReady, setIsPdfReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPdfReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-display)', fontWeight: '500', color: '#1d211e', letterSpacing: '-0.02em' }}>
          Resume & Experience
        </h2>
        <a
          href="/resume.pdf"
          download="Resume.pdf"
          className="submit-btn"
          style={{
            fontSize: '0.75rem',
            color: '#5b7c6f',
            textDecoration: 'none',
            fontWeight: '600',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #5b7c6f',
            letterSpacing: '0.05em'
          }}
        >
          OPEN / DOWNLOAD PDF ↗
        </a>
      </div>

      <div style={{
        flex: 1,
        minHeight: '600px',
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #e4e1d7',
        backgroundColor: '#ffffff',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isPdfReady ? (
          <iframe
            src="/resume.pdf#view=FitH"
            title="Resume PDF"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          >
            <p style={{ padding: '20px', color: '#6e746e' }}>
              Your browser doesn't support viewing inline PDFs.{' '}
              <a href="/resume.pdf" download style={{ color: '#5b7c6f', fontWeight: 'bold' }}>
                Click here to download the PDF.
              </a>
            </p>
          </iframe>
        ) : (
          <div className="pdf-skeleton" />
        )}
      </div>
    </div>
  );
};

/* ==================== CONTACT VIEW ==================== */
const ContactView = ({ resume }: { resume: Resume }) => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // AUTHORIZE USING THE KEY FROM THE .ENV FILE
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus('sending');

    // USING THE HIDDEN KEYS FROM YOUR .ENV FILE
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID; 
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; 
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;    

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        form.current?.reset();
        setTimeout(() => setStatus('idle'), 4000);
      })
      .catch((err) => {
        console.error("Email Error Details:", err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      });
  };

  const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const IconPhone = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  const IconMap = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '12px' }}>
      <div>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#5b7c6f', textTransform: 'uppercase' }}>Let's talk</span>
        <h2 style={{ fontSize: '1.25rem', margin: '2px 0 6px 0', fontFamily: 'var(--font-display)', fontWeight: '500', color: '#1d211e' }}>Get In Touch</h2>
        <p style={{ color: '#6e746e', fontSize: '0.8rem', lineHeight: 1.5 }}>Feel free to reach out for inquiries or collaborations.</p>
      </div>

      <div className="contact-grid" style={{ marginBottom: '4px' }}>
        <ContactInfoCard icon={<IconMail />} label="Email" value={resume.contact?.email} />
        <ContactInfoCard icon={<IconPhone />} label="Phone" value={resume.contact?.phone} />
        <ContactInfoCard icon={<IconMap />} label="Location" value={resume.contact?.location} />
      </div>

      <div style={{ height: '1px', backgroundColor: '#e4e1d7', width: '100%' }}></div>

      <div style={{ flex: 1, backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e4e1d7', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
          <input type="hidden" name="time" value={new Date().toLocaleString()} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div className="input-group">
              <label style={{ fontSize: '0.55rem', fontWeight: '700', textTransform: 'uppercase', color: '#6e746e', marginBottom: '6px', display: 'block' }}>Name</label>
              <input name="name" type="text" required placeholder="Your name" className="contact-input" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e4e1d7', backgroundColor: '#fcfbf8', fontSize: '0.75rem', outline: 'none' }} />
            </div>
            <div className="input-group">
              <label style={{ fontSize: '0.55rem', fontWeight: '700', textTransform: 'uppercase', color: '#6e746e', marginBottom: '6px', display: 'block' }}>Email</label>
              <input name="reply_to" type="email" required placeholder="Your email" className="contact-input" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e4e1d7', backgroundColor: '#fcfbf8', fontSize: '0.75rem', outline: 'none' }} />
            </div>
          </div>
          <div className="input-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.55rem', fontWeight: '700', textTransform: 'uppercase', color: '#6e746e', marginBottom: '6px', display: 'block' }}>Message</label>
            <textarea name="message" required placeholder="Send me a message..." className="contact-input" style={{ width: '100%', flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #e4e1d7', backgroundColor: '#fcfbf8', fontSize: '0.75rem', outline: 'none', resize: 'none' }} />
          </div>
          <button type="submit" disabled={status !== 'idle'} className="submit-btn" style={{ alignSelf: 'flex-start', padding: 0, height: '42px', minWidth: '160px', borderRadius: '8px', border: 'none', backgroundColor: status === 'success' ? '#5b7c6f' : status === 'error' ? '#a35d5d' : '#1a1f1c', color: '#ffffff', fontWeight: '600', fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)', transform: status === 'idle' ? 'translateY(0)' : status === 'sending' ? 'translateY(-42px)' : 'translateY(-84px)' }}>
              <div style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span>SEND MESSAGE</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </div>
              <div style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="loading-text">SENDING...</span>
              </div>
              <div style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {status === 'success' ? (
                  <><span>MESSAGE SENT!</span><svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1.5 5L4.5 8L10.5 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                ) : ( <span>ERROR - RETRY?</span> )}
              </div>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};
/* ==================== CONTACT INFO CARD ==================== */
const ContactInfoCard = ({ icon, label, value }: { icon: any, label: string, value?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div onClick={handleCopy} className="contact-card" style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e4e1d7', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, cursor: 'pointer', position: 'relative', userSelect: 'none' }}>
      <div style={{ minWidth: '32px', width: '32px', height: '32px', borderRadius: '8px', backgroundColor: copied ? '#5b7c6f' : 'rgba(91, 124, 111, 0.08)', color: copied ? '#ffffff' : '#5b7c6f', overflow: 'hidden', transition: 'background-color 0.4s ease, color 0.4s ease' }}>
        <div style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)', transform: copied ? 'translateY(-32px)' : 'translateY(0px)' }}>
          <div style={{ height: '32px', width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
          <div style={{ height: '32px', width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1.5 5L4.5 8L10.5 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
      <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
        <div style={{ height: '14px', position: 'relative', marginBottom: '2px' }}>
          <span style={{ fontSize: '0.55rem', color: '#6e746e', textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: '700', display: 'block', position: 'absolute', top: 0, left: 0, transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s', transform: copied ? 'translateY(-14px)' : 'translateY(0)', opacity: copied ? 0 : 1 }}>{label}</span>
          <span style={{ fontSize: '0.55rem', color: '#5b7c6f', textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: '800', display: 'block', position: 'absolute', top: 0, left: 0, transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s', transform: copied ? 'translateY(0)' : 'translateY(14px)', opacity: copied ? 1 : 0 }}>Copied!</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#1d211e', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'opacity 0.4s ease', opacity: copied ? 0.3 : 1 }}>{value}</p>
      </div>
    </div>
  );
};

/* ==================== SERVICE BOX ==================== */
const ServiceBox = ({ icon, title, desc }: { icon: ReactNode, title: string, desc: string }) => (
  <div className="service-box" style={{ 
    padding: '20px', 
    borderRadius: '12px', 
    backgroundColor: '#fcfbf8', 
    border: '1px solid #e4e1d7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    boxSizing: 'border-box'
  }}>
    <div className="icon-wrapper" style={{ 
      color: '#5b7c6f', 
      marginBottom: '16px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '40px', 
      height: '40px', 
      borderRadius: '10px', 
      backgroundColor: 'rgba(91, 124, 111, 0.05)',
      border: '1px solid transparent',
      flexShrink: 0
    }}>{icon}</div>
    <h4 style={{ margin: '0 0 6px 0', fontSize: '0.9rem', color: '#1d211e', fontWeight: '600', letterSpacing: '-0.01em' }}>{title}</h4>
    <p style={{ margin: 0, fontSize: '0.825rem', color: '#6e746e', lineHeight: 1.5 }}>{desc}</p>
  </div>
);

export default App;