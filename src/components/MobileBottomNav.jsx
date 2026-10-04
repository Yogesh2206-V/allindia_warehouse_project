import React, { useState, useEffect } from 'react';
import { Building2, Search, PlusCircle, User, MessageSquare, PhoneCall } from 'lucide-react';

export default function MobileBottomNav({ currentUser, onOpenAuth }) {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/properties');

  useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash || '#/properties');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (hash) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    if (window.location.hash !== '#/properties' && window.location.hash !== '') {
      window.location.hash = '#/properties';
    }
    setTimeout(() => {
      const searchBox = document.querySelector('.aiw-search-bar-root') || document.querySelector('select');
      if (searchBox) {
        searchBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAccountClick = () => {
    if (currentUser) {
      navigateTo('#/portal/owner');
    } else if (onOpenAuth) {
      onOpenAuth('login');
    }
  };

  const isListingActive = currentHash === '' || currentHash === '#/' || currentHash.startsWith('#/properties');
  const isPostActive = currentHash === '#/post-property';
  const isPortalActive = currentHash.startsWith('#/portal');

  return (
    <nav className="aiw-mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      {/* 1. Explore */}
      <button 
        type="button"
        className={`aiw-bottom-tab ${isListingActive ? 'active' : ''}`}
        onClick={() => navigateTo('#/properties')}
      >
        <Building2 size={20} className="aiw-bottom-icon" />
        <span className="aiw-bottom-label">Explore</span>
      </button>

      {/* 2. Quick Search & Filter */}
      <button 
        type="button"
        className="aiw-bottom-tab"
        onClick={handleSearchClick}
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

      {/* 4. Instant WhatsApp Support */}
      <a 
        href="https://wa.me/919884012341?text=Hi%20All%20India%20Warehouse%2C%20I%20am%20interested%20in%20warehouse%20and%20industrial%20properties"
        target="_blank"
        rel="noopener noreferrer"
        className="aiw-bottom-tab aiw-bottom-wa-btn"
      >
        <MessageSquare size={20} className="aiw-bottom-icon" />
        <span className="aiw-bottom-label">WhatsApp</span>
      </a>

      {/* 5. Account / Login */}
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
