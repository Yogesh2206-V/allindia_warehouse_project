import React from 'react';
import { 
  Warehouse, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleCityClick = (cityName) => {
    window.location.hash = `#/search?city=${encodeURIComponent(cityName)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catType) => {
    window.location.hash = `#/search?type=${encodeURIComponent(catType)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (hash) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-root">
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Top 4-Col Grid */}
        <div className="footer-grid">
          
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-logo" onClick={() => handleNav('#/')}>
              <div className="logo-icon-box">
                <Warehouse size={20} />
              </div>
              <div>
                <h3 className="footer-brand-title">ALL INDIA <span className="text-red">WAREHOUSE</span></h3>
                <span className="footer-brand-sub">Zero Brokerage Industrial Classifieds</span>
              </div>
            </div>
            <p className="footer-about">
              India's premier marketplace for Grade-A logistics parks, PEB godowns, manufacturing plants, and industrial plots. Connect directly with certified landlords with 0% brokerage fees.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Browse Categories</h4>
            <ul className="footer-nav-list">
              <li><button type="button" onClick={() => handleCategoryClick('Warehouse')}>Grade-A Warehouses</button></li>
              <li><button type="button" onClick={() => handleCategoryClick('Warehouse')}>Cold Storage & Pharma Hubs</button></li>
              <li><button type="button" onClick={() => handleCategoryClick('Industrial Shed')}>Manufacturing Factory Sheds</button></li>
              <li><button type="button" onClick={() => handleCategoryClick('Land')}>Industrial Land & Acreages</button></li>
              <li><button type="button" onClick={() => handleCategoryClick('Office')}>Corporate & Logistics Offices</button></li>
              <li><button type="button" onClick={() => handleNav('#/services')}>Industrial Services & NOC</button></li>
            </ul>
          </div>

          {/* Col 3: Key Hubs */}
          <div className="footer-col">
            <h4 className="footer-col-title">Major City Hubs</h4>
            <ul className="footer-nav-list">
              <li><button type="button" onClick={() => handleCityClick('Bengaluru')}>Bengaluru (Hoskote / Nelamangala)</button></li>
              <li><button type="button" onClick={() => handleCityClick('Mumbai')}>Mumbai (Bhiwandi / Panvel / JNPT)</button></li>
              <li><button type="button" onClick={() => handleCityClick('Chennai')}>Chennai (Sriperumbudur / Porur)</button></li>
              <li><button type="button" onClick={() => handleCityClick('Pune')}>Pune (Chakan MIDC / Talegaon)</button></li>
              <li><button type="button" onClick={() => handleCityClick('Hyderabad')}>Hyderabad (Shamshabad / Medchal)</button></li>
              <li><button type="button" onClick={() => handleCityClick('Ahmedabad')}>Ahmedabad (Sanand / Changodar)</button></li>
              <li><button type="button" onClick={() => handleCityClick('Gurugram')}>Gurugram / NCR (Manesar / Bilaspur)</button></li>
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
                <a href="https://wa.me/919884012341?text=Hi%20All%20India%20Warehouse%2C%20I%20am%20looking%20for%20warehouse%20spaces" target="_blank" rel="noopener noreferrer">
                  WhatsApp Advisory (+91 98840 12341)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div className="footer-bottom-strip">
          <p>&copy; {currentYear} All India Warehouse (in association with Mactech Engineers Pvt Ltd). All Rights Reserved.</p>
          <div className="footer-tags">
            <span>Verified Property Titles</span>
            <span>•</span>
            <span>Zero Brokerage</span>
            <span>•</span>
            <span>Pan-India Logistics Network</span>
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

        .logo-icon-box {
          width: 36px;
          height: 36px;
          background: #004274;
          color: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-brand-title {
          color: #ffffff;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .text-red {
          color: #e11d48;
        }

        .text-emerald {
          color: #10b981;
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
          margin: 0;
        }

        .footer-col-title {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 16px;
          letter-spacing: 0.02em;
        }

        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-nav-list button {
          background: none;
          border: none;
          padding: 0;
          color: #94a3b8;
          font-size: 0.88rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease;
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
          text-decoration: none;
          transition: color 0.15s ease;
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
