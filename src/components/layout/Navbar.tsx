export type TabType = 'about' | 'resume' | 'contact';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navbar = ({ activeTab, onSelectTab }: NavbarProps) => {
  const iconStyle = { 
    width: '18px', 
    height: '18px', 
    fill: 'none', 
    stroke: 'currentColor', 
    strokeWidth: 1.8, 
    strokeLinecap: 'round' as const, 
    strokeLinejoin: 'round' as const 
  };

  // Calculate the vertical offset index (0, 1, or 2)
  const activeIndex = activeTab === 'about' ? 0 : activeTab === 'resume' ? 1 : 2;

  return (
    <nav className="portfolio-navbar">
      <style>{`
        .portfolio-navbar {
          width: 76px;
          height: 100%;
          background-color: #ffffff;
          border-right: 1px solid #e4e1d7;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 10px;
          box-sizing: border-box;
          flex-shrink: 0;
        }

        .nav-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Sharper Dark Pill with Thin Cool Border */
        .active-pill {
          position: absolute;
          top: 0;
          left: 0;
          width: 54px;
          height: 54px;
          background-color: #1a1f1c;
          border-radius: 8px; /* Crisp, low-radius edge */
          
          /* Thin crisp border + glass highlight */
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 1px 1px rgba(255, 255, 255, 0.2);
          
          pointer-events: none;
          z-index: 0;
          box-sizing: border-box;

          /* Ultra-smooth elastic spring animation */
          transform: translateZ(0);
          will-change: transform;
          transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
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
          gap: 4px;
          border-radius: 8px;
          border: none;
          outline: none;
          cursor: pointer;
          background-color: transparent;
          color: #717772;
          
          /* GPU Acceleration & Smooth Motion Curve */
          transform: translateZ(0);
          will-change: color, transform;
          transition: color 200ms ease, transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Ghost Hover Background Pill */
        .nav-item::before {
          content: '';
          position: absolute;
          inset: 3px;
          background-color: #f1efe8;
          border-radius: 6px;
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 200ms ease, transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
          pointer-events: none;
        }

        /* Hover State for Inactive Items */
        .nav-item:hover:not(.active)::before {
          opacity: 1;
          transform: scale(1);
        }

        .nav-item:hover:not(.active) {
          color: #1a1f1c;
          transform: translateY(-2px) translateZ(0);
        }

        /* Retain crisp white color on selected tab */
        .nav-item.active {
          color: #ffffff;
        }

        /* Tactile Press Down Effect */
        .nav-item:active {
          transform: scale(0.92) translateZ(0) !important;
        }

        /* Proportioned Micro-Typography */
        .nav-label {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Plus Jakarta Sans", "Inter", "Segoe UI", sans-serif;
          font-size: 0.50rem; 
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1;
          text-transform: uppercase;
          pointer-events: none;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      <div className="nav-container">
        {/* The Dark Pill that Glides */}
        <div 
          className="active-pill" 
          style={{ transform: `translateY(${activeIndex * 66}px)` }} 
        />

        <button 
          className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => onSelectTab('about')}
          title="About"
        >
          <svg viewBox="0 0 24 24" style={iconStyle}>
            <circle cx="12" cy="7" r="4"/>
            <path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>
          </svg>
          <span className="nav-label">ABOUT</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => onSelectTab('resume')}
          title="Resume"
        >
          <svg viewBox="0 0 24 24" style={iconStyle}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span className="nav-label">RESUME</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => onSelectTab('contact')}
          title="Contact"
        >
          <svg viewBox="0 0 24 24" style={iconStyle}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span className="nav-label">CONTACT</span>
        </button>
      </div>
    </nav>
  );
};