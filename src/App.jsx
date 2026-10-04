import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import PhoneRegistrationModal from './components/PhoneRegistrationModal';
import AuthModal from './components/AuthModal';
import MarketplaceApp from './marketplace/MarketplaceApp';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aiw_auth_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {}

    // Expose openAuthModal to global window for convenience
    window.openAuthModal = (mode = 'login') => {
      setAuthModalMode(mode);
      setAuthModalOpen(true);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('aiw_auth_user');
    setCurrentUser(null);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
  };

  return (
    <div className="app-root" style={{ background: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* 1. Header with Visible Sign In, Sign Up & Post Property */}
      <Navbar 
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={handleOpenAuth}
      />

      {/* 2. Main Classifieds Application */}
      <main style={{ flex: '1 0 auto', background: '#f8fafc', width: '100%' }}>
        <MarketplaceApp onOpenAuth={handleOpenAuth} />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Mobile Bottom Icon Navigation with Post & Sign In */}
      <MobileBottomNav 
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
      />

      {/* 5. 30-Second Timed Phone Number Registration Modal */}
      <PhoneRegistrationModal onRegistered={handleAuthSuccess} />

      {/* 6. Dedicated Sign Up / Log In / Google Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}


