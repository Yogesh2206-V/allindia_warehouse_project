import React, { useState } from 'react';
import { 
  MapPin, 
  ArrowLeft, 
  Heart, 
  Share2, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Send,
  User,
  Briefcase,
  ShieldCheck,
  Building2,
  Layers,
  Lock,
  Eye,
  Check
} from 'lucide-react';
import { marketplaceApi } from '../services/marketplaceApi';

export default function MarketplacePropertyDetail({ 
  property, 
  allProperties = [], 
  onBackToList, 
  onSelectProperty,
  isSaved,
  onToggleSave 
}) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [showPhoneUnlocked, setShowPhoneUnlocked] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpPhone, setOtpPhone] = useState('');

  // Section 9: Buyer Property Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    buyerType: 'BUYER', // BUYER | INVESTOR | DEALER
    space_required: property?.totalArea ? `${property.totalArea.toLocaleString('en-IN')} ${property.areaUnit || 'Sq.Ft'}` : '',
    budget: '',
    timeline: 'IMMEDIATE', // IMMEDIATE | ONE_MONTH | THREE_MONTHS | EXPLORING
    message: `Hi, I am interested in ${property?.title || 'this property'} (${property?.code || 'PROP'}). Please share full title documents and arrange a site inspection.`,
    consent: true
  });

  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  const [enquiryError, setEnquiryError] = useState('');

  if (!property) return null;

  const {
    id,
    code = 'PROP-100245',
    title,
    dealType = 'RENT',
    propertyType = 'WAREHOUSE',
    subType = 'Warehouse/Godown',
    city,
    locality,
    state,
    address,
    landmark,
    area_sqft,
    totalArea = 45000,
    areaUnit = 'SQFT',
    price_or_rent_psf = 32,
    monthlyRent,
    price,
    deposit,
    negotiable = true,
    ownership = 'FREEHOLD',
    status = 'LIVE',
    postedAs = 'OWNER',
    poster_name = 'K. R. Natarajan (Landlord)',
    poster_phone = '+91 98840 12341',
    maskedPhone = '+91 98840 •••••',
    images = [],
    description,
    specs = {},
    attributes = {},
    amenities = []
  } = property;

  const defaultImgs = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
  ];
  const gallery = images && images.length > 0 ? images : defaultImgs;

  const isSale = dealType === 'SALE' || property.purpose === 'sale';
  const formattedPrice = isSale 
    ? (price ? `₹${(price / 10000000).toFixed(2)} Cr` : `₹${price_or_rent_psf?.toLocaleString('en-IN')}/sq.ft`)
    : `₹${price_or_rent_psf}/sq.ft/month`;

  const totalMonthlyCalculated = !isSale && monthlyRent
    ? `₹${Number(monthlyRent).toLocaleString('en-IN')}/mo`
    : !isSale && totalArea && price_or_rent_psf
    ? `₹${(totalArea * price_or_rent_psf).toLocaleString('en-IN')}/mo`
    : null;

  const similar = allProperties
    .filter(p => p.id !== id && (p.city === city || p.locality === locality))
    .slice(0, 3);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!otpPhone || otpPhone.length < 10) {
      alert('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setShowPhoneUnlocked(true);
    setOtpModalOpen(false);
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryError('');

    if (!enquiryForm.name.trim() || !enquiryForm.phone.trim()) {
      setEnquiryError('Please enter your name and mobile number');
      return;
    }

    setIsSubmittingEnquiry(true);
    try {
      await marketplaceApi.submitBuyerEnquiry({
        ...enquiryForm,
        property_id: id,
        property_code: code,
        property_title: title,
        property_city: city,
        property_locality: locality,
        property_state: state
      });
      setIsSubmittingEnquiry(false);
      setEnquirySubmitted(true);
    } catch (err) {
      setIsSubmittingEnquiry(false);
      setEnquiryError('Failed to submit enquiry. Please call our desk directly.');
    }
  };

  return (
    <div className="marketplace-container" style={{ padding: '20px 16px 80px' }}>
      
      {/* Top Breadcrumb & Actions Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <button 
          type="button" 
          onClick={onBackToList}
          className="btn btn-outline btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
        >
          <ArrowLeft size={16} />
          <span>Back to Classifieds</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', background: '#e2e8f0', color: '#0f2744', padding: '3px 8px', borderRadius: '4px', fontWeight: 800 }}>
            {code}
          </span>
          <button 
            type="button"
            onClick={() => onToggleSave && onToggleSave(id)}
            className="btn btn-outline btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: isSaved ? '#e11d48' : '#64748b' }}
          >
            <Heart size={16} fill={isSaved ? '#e11d48' : 'none'} />
            <span>{isSaved ? 'Shortlisted' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 2 Columns (Content Left, Sticky Enquiry Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1.2fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Gallery, Facts, Description, Specs */}
        <div>
          
          {/* Main Hero Photo Gallery */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ height: '380px', width: '100%', position: 'relative', background: '#0f172a' }}>
              <img 
                src={gallery[selectedImgIdx]} 
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px' }}>
                <span style={{ background: isSale ? '#059669' : '#004274', color: '#ffffff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {isSale ? 'For Sale' : 'For Rent'}
                </span>
                <span style={{ background: '#ffffff', color: '#0f2744', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800 }}>
                  {subType || propertyType}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', background: '#f8fafc', overflowX: 'auto' }}>
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImgIdx(idx)}
                    style={{
                      width: '70px',
                      height: '50px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: selectedImgIdx === idx ? '2px solid #004274' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Key Pricing Header Card */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.86rem', fontWeight: 600, marginBottom: '6px' }}>
              <MapPin size={16} className="text-red" />
              <span>{locality}, {city}, {state}</span>
            </div>

            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f2744', lineHeight: 1.3, marginBottom: '14px' }}>
              {title}
            </h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px', padding: '14px 18px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
                  {isSale ? 'Outright Purchase Price' : 'Monthly Rent'}
                </span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#004274' }}>
                  {formattedPrice}
                </span>
                {totalMonthlyCalculated && (
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginLeft: '8px' }}>
                    ({totalMonthlyCalculated})
                  </span>
                )}
              </div>

              {negotiable && (
                <span style={{ background: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 800, border: '1px solid #a7f3d0' }}>
                  ✓ Price Negotiable
                </span>
              )}
            </div>
          </div>

          {/* Key Facts Strip (Section 7 Spec) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>Total Area</span>
              <strong style={{ fontSize: '1.05rem', color: '#0f2744' }}>{totalArea.toLocaleString('en-IN')} {areaUnit}</strong>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>Ceiling Height</span>
              <strong style={{ fontSize: '1.05rem', color: '#0f2744' }}>{attributes.ceilingHeightFt || 32} Ft</strong>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>Loading Docks</span>
              <strong style={{ fontSize: '1.05rem', color: '#0f2744' }}>{attributes.loadingDocks || 4} Bays</strong>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>Power Load</span>
              <strong style={{ fontSize: '1.05rem', color: '#0f2744' }}>{attributes.powerKva || 150} kVA</strong>
            </div>
          </div>

          {/* Full Specifications Table */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f2744', marginBottom: '16px' }}>
              Technical Specifications & Approvals
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Ownership Type:</span>
                <strong style={{ color: '#0f2744' }}>{ownership}</strong>
              </div>

              <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Possession:</span>
                <strong style={{ color: '#0f2744' }}>{attributes.possessionStatus || 'Ready to Move'}</strong>
              </div>

              <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Road Frontage Width:</span>
                <strong style={{ color: '#0f2744' }}>{attributes.roadWidthFt || 60} Ft Concrete Access</strong>
              </div>

              <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Truck Turning Apron:</span>
                <strong style={{ color: '#0f2744' }}>{attributes.truckAccess ? '40ft Multi-Axle Ready' : 'Standard HCV'}</strong>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f2744', marginBottom: '8px' }}>
                Property Overview
              </h4>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {description || 'Grade-A industrial facility designed to international warehousing benchmarks. Fully compliant with NBC fire safety regulations, ESFR sprinkler grid, heavy-load floor screeding, and 24x7 security provisions.'}
              </p>
            </div>
          </div>

          {/* Amenities & Features */}
          {amenities.length > 0 && (
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f2744', marginBottom: '14px' }}>
                Amenities & Infrastructure
              </h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {amenities.map((am, idx) => (
                  <span 
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: '#f1f5f9',
                      color: '#334155',
                      fontSize: '0.82rem',
                      fontWeight: 600
                    }}
                  >
                    <Check size={14} className="text-emerald" />
                    {am}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Posted-by Card & Buyer Property Enquiry Form */}
        <div>
          
          {/* Posted By Contact Card */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '20px', boxShadow: '0 4px 16px rgba(15,23,42,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>
                Listing Posted By
              </span>
              <span style={{ 
                background: postedAs === 'OWNER' ? '#ecfdf5' : '#eff6ff', 
                color: postedAs === 'OWNER' ? '#059669' : '#2563eb',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.74rem',
                fontWeight: 800,
                border: postedAs === 'OWNER' ? '1px solid #a7f3d0' : '1px solid #bfdbfe'
              }}>
                {postedAs === 'OWNER' ? '✓ Direct Owner (0% Brokerage)' : '✓ Verified Dealer Partner'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#0f2744', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {postedAs === 'OWNER' ? <User size={22} /> : <Briefcase size={22} />}
              </div>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f2744', margin: 0 }}>
                  {poster_name}
                </h4>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  {locality}, {city}
                </span>
              </div>
            </div>

            {/* Masked Phone / Show Number Button */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', textAlign: 'center', marginBottom: '12px' }}>
              {showPhoneUnlocked ? (
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Verified Phone Unlocked</span>
                  <a href={`tel:${poster_phone}`} style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f2744', textDecoration: 'none' }}>
                    {poster_phone}
                  </a>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                    {maskedPhone}
                  </span>
                  <button
                    type="button"
                    onClick={() => setOtpModalOpen(true)}
                    className="btn btn-navy btn-sm"
                    style={{ background: '#004274', color: '#ffffff', fontSize: '0.8rem', padding: '6px 14px' }}
                  >
                    <Eye size={14} />
                    <span>Show Number (Free OTP)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section 9: Buyer Property Enquiry Form */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '22px', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f2744', marginBottom: '4px' }}>
              Send Direct Property Enquiry
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '16px' }}>
              Enquiries are directly dispatched to the property owner and logged on our verified advisory desk.
            </p>

            {enquirySubmitted ? (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <CheckCircle2 size={32} style={{ color: '#059669', margin: '0 auto 8px' }} />
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#065f46', marginBottom: '4px' }}>Enquiry Submitted!</h4>
                <p style={{ fontSize: '0.82rem', color: '#047857', margin: 0 }}>
                  The owner will contact you on <strong>{enquiryForm.phone}</strong> within 1 hour.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit}>
                {enquiryError && (
                  <div style={{ background: '#fee2e2', color: '#991b1b', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '12px' }}>
                    {enquiryError}
                  </div>
                )}

                {/* Name */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                    style={{ width: '100%', height: '38px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                {/* Mobile */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98840 XXXXX"
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                    style={{ width: '100%', height: '38px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                {/* I am a (Buyer Type) */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    I am a *
                  </label>
                  <select
                    value={enquiryForm.buyerType}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, buyerType: e.target.value }))}
                    style={{ width: '100%', height: '38px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
                  >
                    <option value="BUYER">Buyer / Tenant</option>
                    <option value="INVESTOR">Industrial Investor</option>
                    <option value="DEALER">Channel Partner / Dealer</option>
                  </select>
                </div>

                {/* Move-in Timeline */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Requirement Timeline
                  </label>
                  <select
                    value={enquiryForm.timeline}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, timeline: e.target.value }))}
                    style={{ width: '100%', height: '38px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
                  >
                    <option value="IMMEDIATE">Immediate (Within 15 Days)</option>
                    <option value="ONE_MONTH">Within 1 Month</option>
                    <option value="THREE_MONTHS">Within 3 Months</option>
                    <option value="EXPLORING">Just Exploring Space Options</option>
                  </select>
                </div>

                {/* Message Template */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Message
                  </label>
                  <textarea
                    rows={2}
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', lineHeight: 1.4 }}
                  />
                </div>

                {/* Consent */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '16px' }}>
                  <input
                    type="checkbox"
                    id="consent"
                    checked={enquiryForm.consent}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, consent: e.target.checked }))}
                    style={{ marginTop: '3px' }}
                  />
                  <label htmlFor="consent" style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.3 }}>
                    I agree to share my details with the property owner & All India Warehouse advisory desk.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingEnquiry}
                  className="btn btn-red"
                  style={{ width: '100%', padding: '10px', fontWeight: 800, fontSize: '0.92rem' }}
                >
                  <Send size={15} />
                  <span>{isSubmittingEnquiry ? 'Sending Enquiry...' : 'Submit Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* OTP Unlock Modal */}
      {otpModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '420px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f2744', marginBottom: '6px' }}>
              Verify Mobile to Unlock Owner Contact
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.84rem', marginBottom: '16px' }}>
              Free direct owner access. No broker commission.
            </p>

            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Enter 10-Digit Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98840 XXXXX"
                    value={otpPhone}
                    onChange={(e) => setOtpPhone(e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
                <button type="submit" className="btn btn-navy" style={{ width: '100%', padding: '10px', fontWeight: 800, background: '#004274', color: '#ffffff' }}>
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Enter OTP sent to {otpPhone} (Demo: 1234)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1234"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', textAlign: 'center', letterSpacing: '4px', fontWeight: 800 }}
                  />
                </div>
                <button type="submit" className="btn btn-red" style={{ width: '100%', padding: '10px', fontWeight: 800 }}>
                  Verify & Unlock Number
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => setOtpModalOpen(false)}
              className="btn btn-outline"
              style={{ width: '100%', marginTop: '10px', fontSize: '0.82rem' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sticky Call / Enquire Bar (Section 7 Spec) */}
      <div className="mobile-only" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9995,
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '10px 14px',
        display: 'flex',
        gap: '10px',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.1)'
      }}>
        <a 
          href={`tel:${poster_phone}`}
          className="btn btn-outline"
          style={{ flex: 1, padding: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.88rem' }}
        >
          <Phone size={16} className="text-red" />
          <span>Call Contact</span>
        </a>

        <a 
          href={`https://wa.me/919884012341?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(title)}%20(${code})`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-red"
          style={{ flex: 1, padding: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.88rem' }}
        >
          <MessageSquare size={16} />
          <span>WhatsApp</span>
        </a>
      </div>

    </div>
  );
}
