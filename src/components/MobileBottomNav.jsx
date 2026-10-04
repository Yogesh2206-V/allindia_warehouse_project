import React, { useState, useEffect } from 'react';
import { Home, Building2, Search, PlusCircle, User, Briefcase, FileText } from 'lucide-react';

export default function MobileBottomNav({ currentUser, onOpenAuth }) {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (hash) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccountClick = () => {
    if (currentUser) {
      navigateTo('#/portal/owner');
    } else if (onOpenAuth) {
      onOpenAuth('login');
    }
  };

  const isHomeActive = currentHash === '' || currentHash === '#/' || currentHash === '#/home';
  const isSearchActive = currentHash.startsWith('#/properties') || currentHash.startsWith('#/search');
  const isPostActive = currentHash === '#/post-property';
  const isServicesActive = currentHash === '#/services';
  const isPortalActive = currentHash.startsWith('#/portal');

  return (
    <nav className="aiw-mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      {/* 1. Home */}
      <button 
        type="button"
        className={`aiw-bottom-tab ${isHomeActive ? 'active' : ''}`}
        onClick={() => navigateTo('#/')}
      >
        <Home size={20} className="aiw-bottom-icon" />
        <span className="aiw-bottom-label">Home</span>
      </button>

      {/* 2. Search Warehouses */}
      <button 
        type="button"
        className={`aiw-bottom-tab ${isSearchActive ? 'active' : ''}`}
        onClick={() => navigateTo('#/properties')}
      >
        <Search size={20} className="aiw-bottom-icon" />
        <span className="aiw-bottom-label">Search</span>
      </button>

      {/* 3. HERO CENTER BUTTON: + POST PROPERTY */}
      <button 
        type="button"
        className="aiw-bottom-tab aiw-bottom-post-btn"
        onClick={() => navigateTo('#/post-property')}
      >
        <div className="aiw-post-icon-wrapper" style={{ background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)', boxShadow: '0 4px 12px rgba(225, 29, 72, 0.4)' }}>
          <PlusCircle size={22} color="#ffffff" />
        </div>
        <span className="aiw-bottom-label" style={{ color: '#e11d48', fontWeight: 800 }}>+ Post</span>
      </button>

      {/* 4. Services */}
      <button 
        type="button"
        className={`aiw-bottom-tab ${isServicesActive ? 'active' : ''}`}
        onClick={() => navigateTo('#/services')}
      >
        <FileText size={20} className="aiw-bottom-icon" />
        <span className="aiw-bottom-label">Services</span>
      </button>

      {/* 5. Account / Portal */}
      <button 
        type="button"
        className={`aiw-bottom-tab ${isPortalActive ? 'active' : ''}`}
        onClick={handleAccountClick}
      >
        <User size={20} className="aiw-bottom-icon" />
        <span className="aiw-bottom-label">{currentUser ? 'Portal' : 'Sign In'}</span>
      </button>
    </nav>
  );
}
