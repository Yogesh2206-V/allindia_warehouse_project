import React, { useState } from 'react';
import { 
  Warehouse, 
  Search, 
  PlusCircle, 
  User, 
  Building2, 
  Briefcase, 
  Phone, 
  Menu, 
  X, 
  LogOut, 
  LogIn, 
  UserPlus, 
  ChevronDown, 
  ShieldCheck 
} from 'lucide-react';

export default function Navbar({ currentUser, onLogout, onOpenAuth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (hash) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const handleAuthClick = (mode) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    if (onOpenAuth) onOpenAuth(mode);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
      
      {/* Top Announcement Strip */}
      <div style={{ background: '#0f2744', color: '#cbd5e1', fontSize: '0.78rem', padding: '6px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <span style={{ background: '#e11d48', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800 }}>
              CLASSIFIEDS
            </span>
            <span style={{ fontSize: '0.74rem' }}>India's Premier Buy • Sell • Rent Industrial Real Estate Classifieds Portal</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <a href="tel:+919884012341" style={{ color: '#f8fafc', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.75rem' }}>
              <Phone size={12} className="text-red" />
              <span>+91 98840 12341</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', gap: '12px' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('#/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{ width: 38, height: 38, background: '#0f2744', color: '#ffffff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(15,39,68,0.2)' }}>
            <Warehouse size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.18rem', color: '#0f2744', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              ALL INDIA <span style={{ color: '#e11d48' }}>WAREHOUSE</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Zero Brokerage Classifieds
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            type="button"
            onClick={() => handleNavClick('#/')}
            style={{ background: 'none', border: 'none', color: '#334155', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseOver={(e) => e.target.style.color = '#e11d48'}
            onMouseOut={(e) => e.target.style.color = '#334155'}
          >
            Home
          </button>

          <button 
            type="button"
            onClick={() => handleNavClick('#/properties')}
            style={{ background: 'none', border: 'none', color: '#334155', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseOver={(e) => e.target.style.color = '#e11d48'}
            onMouseOut={(e) => e.target.style.color = '#334155'}
          >
            Find Warehouses
          </button>
          
          <button 
            type="button"
            onClick={() => handleNavClick('#/services')}
            style={{ background: 'none', border: 'none', color: '#334155', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseOver={(e) => e.target.style.color = '#e11d48'}
            onMouseOut={(e) => e.target.style.color = '#334155'}
          >
            Services
          </button>

          <button 
            type="button"
            onClick={() => handleNavClick('#/portal/owner')}
            style={{ background: 'none', border: 'none', color: '#334155', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseOver={(e) => e.target.style.color = '#e11d48'}
            onMouseOut={(e) => e.target.style.color = '#334155'}
          >
            Owner & Dealer Portal
          </button>
        </div>

        {/* Right Actions: Post Property, Login/Signup OR User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          {/* USER-FRIENDLY POST PROPERTY BUTTON (Prominent Desktop & Tablet) */}
          <button
            type="button"
            className="aiw-nav-post-btn"
            onClick={() => handleNavClick('#/post-property')}
          >
            <PlusCircle size={16} />
            <span>Post Property</span>
            <span style={{ background: '#ffffff', color: '#e11d48', fontSize: '0.65rem', padding: '1px 5px', borderRadius: '4px', fontWeight: 900, textTransform: 'uppercase' }}>
              FREE
            </span>
          </button>

          {/* AUTH BUTTON (If NOT Logged in: Single Clean Sign In button) */}
          {!currentUser ? (
            <div className="desktop-only">
              <button
                type="button"
                onClick={() => handleAuthClick('login')}
                style={{
                  padding: '9px 18px',
                  background: '#0f2744',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  boxShadow: '0 2px 8px rgba(15, 39, 68, 0.25)',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#1e3a5f'}
                onMouseOut={(e) => e.currentTarget.style.background = '#0f2744'}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
            </div>
          ) : (
            /* USER AVATAR & DROPDOWN (If Logged in) */
            <div className="desktop-only" style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#f8fafc',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '30px',
                  padding: '4px 12px 4px 6px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#0f2744', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.82rem' }}>
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f2744', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.name || 'My Account'}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase' }}>
                    Verified
                  </div>
                </div>
                <ChevronDown size={14} color="#64748b" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    width: '230px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                    padding: '8px',
                    zIndex: 1001,
                    animation: 'aiwFadeIn 0.15s ease'
                  }}
                >
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f2744' }}>
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {currentUser.email || currentUser.phone}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavClick('#/post-property')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', background: 'none', border: 'none', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#0f2744', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    onMouseOver={(e) => e.target.style.background = '#f8fafc'}
                    onMouseOut={(e) => e.target.style.background = 'none'}
                  >
                    <PlusCircle size={15} color="#e11d48" />
                    <span>Post New Property</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('#/portal/owner')}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', background: 'none', border: 'none', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#0f2744', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    onMouseOver={(e) => e.target.style.background = '#f8fafc'}
                    onMouseOut={(e) => e.target.style.background = 'none'}
                  >
                    <Briefcase size={15} color="#004274" />
                    <span>My Portal & Listings</span>
                  </button>

                  <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />

                  <button
                    type="button"
                    onClick={() => { setUserDropdownOpen(false); onLogout(); }}
                    style={{ width: '100%', textAlign: 'left', padding: '9px 12px', background: 'none', border: 'none', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    onMouseOver={(e) => e.target.style.background = '#fef2f2'}
                    onMouseOut={(e) => e.target.style.background = 'none'}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="aiw-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="aiw-mobile-drawer"
          style={{
            background: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
          }}
        >
          {/* User Status / Login Button for Mobile */}
          {!currentUser ? (
            <button
              type="button"
              onClick={() => handleAuthClick('login')}
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f2744',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.9rem',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(15, 39, 68, 0.2)'
              }}
            >
              <LogIn size={18} />
              <span>Sign In / Register</span>
            </button>
          ) : (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f2744' }}>{currentUser.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{currentUser.email || currentUser.phone}</div>
              </div>
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                style={{ background: '#fee2e2', border: 'none', color: '#dc2626', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Quick Post Property Mobile Banner */}
          <button
            type="button"
            onClick={() => handleNavClick('#/post-property')}
            style={{
              padding: '12px',
              background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(225,29,72,0.3)'
            }}
          >
            <PlusCircle size={18} />
            <span>+ Post Property (FREE Listing)</span>
          </button>

          {/* Mobile Nav Links */}
          <button 
            type="button"
            onClick={() => handleNavClick('#/properties')}
            style={{ textAlign: 'left', padding: '10px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontWeight: 700, color: '#0f2744', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Search size={16} className="text-red" />
            <span>All Classifieds</span>
          </button>

          <button 
            type="button"
            onClick={() => handleNavClick('#/portal/owner')}
            style={{ textAlign: 'left', padding: '10px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontWeight: 700, color: '#0f2744', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Briefcase size={16} color="#004274" />
            <span>Owner & Dealer Portal</span>
          </button>

          <a 
            href="https://wa.me/919884012341?text=Hi%20All%20India%20Warehouse%2C%20I%20am%20interested%20in%20warehouse%20and%20industrial%20properties"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textAlign: 'left', padding: '10px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', fontWeight: 700, color: '#15803d', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <span>💬 WhatsApp Advisor (+91 98840 12341)</span>
          </a>

          <a 
            href="tel:+919884012341"
            style={{ textAlign: 'left', padding: '10px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontWeight: 700, color: '#0f2744', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <Phone size={16} className="text-red" />
            <span>Call Support (+91 98840 12341)</span>
          </a>
        </div>
      )}

    </header>
  );
}
