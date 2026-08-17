import { useMemo } from 'react';

// --- 1. Types ---
export type TabType = 'about' | 'resume' | 'contact';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

// --- 2. Main Component ---
export const Navbar = ({ activeTab, onSelectTab }: NavbarProps) => {
  const tabs = useMemo(() => [
    { id: 'about' as TabType, label: 'About', icon: <AboutIcon /> },
    { id: 'resume' as TabType, label: 'Resume', icon: <ResumeIcon /> },
    { id: 'contact' as TabType, label: 'Contact', icon: <ContactIcon /> },
  ], []);

  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    <nav className="nav-sidebar">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Playfair+Display:ital,wght@1,600&display=swap');

        .nav-sidebar {
          width: 72px;
          height: 100vh;
          background: #ffffff;
          border-right: 1px solid #e5e5e0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 0;
          box-sizing: border-box;
          position: sticky;
          top: 0;
        }

        .nav-stack {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-indicator {
          position: absolute;
          left: 0;
          width: 54px;
          height: 54px;
          background: #1a1f1c;
          border-radius: 12px;
          z-index: 0;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          transition: transform 0.5s cubic-bezier(0.2, 1, 0.2, 1);
        }

        .nav-item {
          position: relative;
          z-index: 1;
          width: 54px;
          height: 54px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          cursor: pointer;
          color: #8c8c87;
          outline: none;
          padding: 0;
          transition: color 0.3s ease;
        }

        .nav-item.active {
          color: #ffffff;
        }

        .nav-item:hover:not(.active) {
          color: #1a1a1a;
        }

        .nav-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 7.5px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 5px;
          -webkit-font-smoothing: antialiased;
        }

        .nav-brand {
          margin-top: auto;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          opacity: 0.15;
          transition: opacity 0.3s ease;
          cursor: default;
        }
        
        .nav-brand:hover {
          opacity: 0.8;
        }
      `}</style>

      <div className="nav-stack">
        <div 
          className="nav-indicator" 
          style={{ transform: `translateY(${activeIndex * (54 + 12)}px)` }} 
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.id)}
          >
            {tab.icon}
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="nav-brand">J</div>
    </nav>
  );
};

const ICON_SIZE = 18;
const STROKE_WIDTH = 1.6;

const AboutIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ResumeIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const ContactIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);