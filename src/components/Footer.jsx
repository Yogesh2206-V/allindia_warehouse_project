import React from 'react';
import { 
  Warehouse, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  MessageSquare
} from 'lucide-react';

export default function Footer({ onOpenRequirement, onNavigateSection }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (id) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-root">
      <div className="container">
        {/* Top 4-Col Grid */}
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-logo" onClick={() => handleNav('hero')}>
              <div className="logo-icon-box">
                <Warehouse size={20} />
              </div>
              <div>
                <h3 className="footer-brand-title">ALL INDIA <span className="text-red">WAREHOUSE</span></h3>
                <span className="footer-brand-sub">Direct Industrial Sourcing & Turnkey Warehousing</span>
              </div>
            </div>
            <p className="footer-about">
              India's direct portal for Grade-A industrial sheds, manufacturing plants, cold storage, and logistics parks. Zero middleman commission.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Browse Warehouses</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => handleNav('properties')}>Grade-A Warehouses</button></li>
              <li><button onClick={() => handleNav('properties')}>Cold Storage & Pharma Hubs</button></li>
              <li><button onClick={() => handleNav('properties')}>3PL & Logistics Parks</button></li>
              <li><button onClick={() => handleNav('properties')}>Manufacturing Factory Sheds</button></li>
              <li><button onClick={() => handleNav('calculator')}>Rent & Space Calculator</button></li>
            </ul>
          </div>

          {/* Col 3: Key Hubs */}
          <div className="footer-col">
            <h4 className="footer-col-title">Major Hubs</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => handleNav('locations')}>Chennai (Sriperumbudur / Oragadam)</button></li>
              <li><button onClick={() => handleNav('locations')}>Bangalore (Hoskote / Nelamangala)</button></li>
              <li><button onClick={() => handleNav('locations')}>Sri City SEZ / DTA</button></li>
              <li><button onClick={() => handleNav('locations')}>Pune (Chakan / Talegaon)</button></li>
              <li><button onClick={() => handleNav('locations')}>Mumbai (Bhiwandi / Panvel)</button></li>
              <li><button onClick={() => handleNav('locations')}>Hyderabad (Shamshabad / Medchal)</button></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Direct Support</h4>
            <div className="footer-contact-list">
              <div className="contact-item">
                <MapPin size={16} className="text-red flex-shrink-0" />
                <span>1/53 T, Sripuram Colony 1st St, St. Thomas Mount, Chennai - 600016</span>
              </div>
              <div className="contact-item">
                <Phone size={16} className="text-red flex-shrink-0" />
                <a href="tel:+919884012341">+91 98840 12341</a>
              </div>
              <div className="contact-item">
                <Mail size={16} className="text-red flex-shrink-0" />
                <a href="mailto:care@allindiawarehouse.in">care@allindiawarehouse.in</a>
              </div>
              <div className="contact-item">
                <MessageSquare size={16} className="text-emerald flex-shrink-0" />
                <a href="https://wa.me/919884012341" target="_blank" rel="noopener noreferrer">
                  WhatsApp: +91 98840 12341
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div className="footer-bottom-strip">
          <p>&copy; {currentYear} All India Warehouse (in association with Mactech Engineers Pvt Ltd). All Rights Reserved.</p>
          <div className="footer-tags">
            <span>Verified Clear Titles</span>
            <span>•</span>
            <span>Direct Owners</span>
            <span>•</span>
            <span>ISO 9001:2015 Certified Standards</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-root {
          background: #0f172a;
          color: #94a3b8;
          padding: 48px 0 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: auto;
          width: 100%;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.2fr 1.2fr;
          gap: 36px;
          margin-bottom: 48px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          margin-bottom: 14px;
        }

        .footer-brand-title {
          color: #ffffff;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .footer-brand-sub {
          font-size: 0.72rem;
          color: #64748b;
          display: block;
        }

        .footer-about {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #94a3b8;
        }

        .footer-col-title {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: 0.02em;
        }

        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-nav-list button {
          color: #94a3b8;
          font-size: 0.88rem;
          text-align: left;
          transition: var(--transition);
        }

        .footer-nav-list button:hover {
          color: #ffffff;
          transform: translateX(3px);
        }

        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: #94a3b8;
        }

        .contact-item a {
          color: #e2e8f0;
          transition: var(--transition);
        }

        .contact-item a:hover {
          color: #ffffff;
        }

        .footer-bottom-strip {
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          color: #64748b;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-tags {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-strip {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
