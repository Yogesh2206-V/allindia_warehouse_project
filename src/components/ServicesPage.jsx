import React from 'react';
import { 
  FileText, 
  Truck, 
  ShieldCheck, 
  Percent, 
  PhoneCall, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Warehouse,
  Shield,
  Award
} from 'lucide-react';

export default function ServicesPage({ onNavigateHome }) {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px 80px' }}>
      <div className="container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
        
        {/* Header Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#64748b', marginBottom: '24px' }}>
          <a href="#/" style={{ color: '#004274', textDecoration: 'none', fontWeight: 700 }}>Home</a>
          <span>›</span>
          <span style={{ color: '#0f2744', fontWeight: 800 }}>Industrial Services</span>
        </div>

        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ background: '#e11d48', color: '#ffffff', fontSize: '0.72rem', fontWeight: 900, padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
            All India Warehouse Solutions
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f2744', margin: '12px 0 10px' }}>
            Value-Added Industrial Services
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.98rem', maxWidth: '640px', margin: '0 auto' }}>
            Complete enterprise support from legal drafting and machinery shifting to fire safety NOC approvals and lease rental discounting.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* Service 1 */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
            <div style={{ width: 54, height: 54, borderRadius: '12px', background: '#e0f2fe', color: '#004274', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <FileText size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f2744', margin: '0 0 10px' }}>
              Industrial Rental Agreements & E-Stamping
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>
              Legally vetted commercial lease contracts with customized lock-in periods, escalation clauses, security deposit covenants, and digital Aadhaar e-Sign.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['State-Specific Stamp Duty calculation', '100% legally compliant commercial terms', 'Home / Office Biometric Notarization available'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#334155', fontWeight: 600 }}>
                  <CheckCircle size={15} color="#059669" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="https://wa.me/919884012341?text=Hi%20All%20India%20Warehouse%2C%20I%20need%20assistance%20with%20Industrial%20Lease%20Agreement"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-navy"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 800, fontSize: '0.88rem' }}
            >
              <span>Get Agreement Assistance</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Service 2 */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
            <div style={{ width: 54, height: 54, borderRadius: '12px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <Truck size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f2744', margin: '0 0 10px' }}>
              Heavy Machinery & Inventory Shifting
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>
              Industrial packers and cargo transport fleet with hydraulic cranes, pallet jacks, and heavy container trailers for zero-damage intercity plant relocation.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Crane lifting for up to 50-Ton machinery', 'Comprehensive transit cargo insurance', 'Pallet racking dismantling & reassembly'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#334155', fontWeight: 600 }}>
                  <CheckCircle size={15} color="#059669" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="https://wa.me/919884012341?text=Hi%20All%20India%20Warehouse%2C%20I%20need%20a%20quote%20for%20Machinery%20and%20Inventory%20Shifting"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 800, fontSize: '0.88rem' }}
            >
              <span>Get Shifting Quote</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Service 3 */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
            <div style={{ width: 54, height: 54, borderRadius: '12px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f2744', margin: '0 0 10px' }}>
              Fire NOC & Industrial Due Diligence
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>
              End-to-end statutory clearance support including NBC fire safety auditing, industrial power sanction enhancement, and Pollution Control Board consent.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['State Fire Department NOC liaison', 'Structural Stability & FM2 Floor load testing', 'Title verification & encumbrance certificate (EC)'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#334155', fontWeight: 600 }}>
                  <CheckCircle size={15} color="#059669" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="https://wa.me/919884012341?text=Hi%20All%20India%20Warehouse%2C%20I%20need%20assistance%20with%20Fire%20NOC%20and%20Due%20Diligence"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-navy"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 800, fontSize: '0.88rem' }}
            >
              <span>Consult Compliance Desk</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Service 4 */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
            <div style={{ width: 54, height: 54, borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <Percent size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f2744', margin: '0 0 10px' }}>
              Warehouse Financing & Lease Discounting (LRD)
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>
              Unlock capital against your warehouse rental income or finance new industrial shed construction through partnerships with leading public & private banks.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Lease Rental Discounting (LRD) up to 15 years', 'Industrial plot purchase & construction loans', 'Competitive ROI starting at 8.25% p.a.'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#334155', fontWeight: 600 }}>
                  <CheckCircle size={15} color="#059669" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="tel:+919884012341"
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 800, fontSize: '0.88rem', border: '1.5px solid #004274', color: '#004274' }}
            >
              <PhoneCall size={16} />
              <span>Call Finance Advisor</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
