import type { Resume } from '../../types/resume';
import type { ReactNode } from 'react';
import profilePic from '../../assets/frontprofile.png';

interface ProfileCardProps {
  resume: Resume;
  onContactClick?: () => void;
}

export const ProfileCard = ({ resume, onContactClick }: ProfileCardProps) => {
  return (
    <div style={{
      backgroundColor: '#fcfbf8',
      width: '300px',
      flexShrink: 0,
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #e4e1d7'
    }}>
      <style>{`
        .card-action-btn {
          position: relative;
          flex: 1;
          padding: 12px;
          border: none;
          background-color: transparent;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          color: #445b51;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          outline: none;
          user-select: none;
          overflow: hidden;
          z-index: 1;
          transform: translateZ(0);
          will-change: color, transform;
          transition: 
            color 250ms cubic-bezier(0.25, 1, 0.5, 1),
            transform 150ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .card-action-btn::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background-color: #445b51;
          z-index: -1;
          transition: height 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-action-btn:hover {
          color: #ffffff !important;
        }

        .card-action-btn:hover::before {
          height: 100%;
        }

        .card-action-btn:active {
          transform: scale(0.95) translateZ(0) !important;
          transition-duration: 50ms !important;
        }
      `}</style>

      <div style={{ 
        flex: 1, 
        backgroundColor: '#f6f5f0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottom: '1px solid #e4e1d7',
        overflow: 'hidden'
      }}>
        <img 
          src={profilePic} 
          alt={resume.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      </div>

      <div style={{ 
        padding: '24px 16px 0', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        flexShrink: 0
      }}>
        <h1 style={{ 
          fontSize: '1.35rem', 
          fontFamily: 'var(--font-display)',
          margin: '0 0 4px 0', 
          color: '#1d211e', 
          fontWeight: '500',
          letterSpacing: '-0.02em'
        }}>
          {resume.name}
        </h1>
        <p style={{ 
          color: '#5b7c6f', 
          fontWeight: '500', 
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontSize: '0.7rem',
          marginBottom: '20px' 
        }}>
          {resume.title}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          <SocialButton><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/></svg></SocialButton> 
          <SocialButton><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></SocialButton> 
          <SocialButton><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></SocialButton>
        </div>
      </div>

      <div style={{ display: 'flex', borderTop: '1px solid #e4e1d7', flexShrink: 0, backgroundColor: '#dbe4de' }}>
        <a 
          href="/resume.pdf" 
          download={`${resume.name.replace(/\s+/g, '_')}_CV.pdf`}
          className="card-action-btn"
          style={{ borderRight: '1px solid #cbd7d0' }}
        >
          DOWNLOAD CV
        </a>

        <button 
          onClick={onContactClick}
          className="card-action-btn"
        >
          CONTACT ME
        </button>
      </div>
    </div>
  );
};

const SocialButton = ({ children }: { children: ReactNode }) => (
  <span style={{ 
    cursor: 'pointer', 
    color: '#6e746e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px', 
    backgroundColor: 'transparent',
    border: '1px solid #e4e1d7',
    transition: 'all 0.2s ease'
  }}>
    {children}
  </span>
);