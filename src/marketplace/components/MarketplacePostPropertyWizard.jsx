import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  IndianRupee, 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  UploadCloud, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  Check, 
  Phone, 
  Mail, 
  User, 
  Calculator, 
  Eye, 
  Truck, 
  Zap, 
  Flame, 
  Shield 
} from 'lucide-react';
import { 
  STATES_LIST, 
  CITIES_BY_STATE, 
  LOCALITIES_BY_CITY,
  CATEGORIES_DATA
} from '../data/sampleMarketplaceProperties';
import { marketplaceApi } from '../services/marketplaceApi';
import confetti from 'canvas-confetti';

export default function MarketplacePostPropertyWizard({ onComplete, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State with precise technical and commercial defaults
  const [formData, setFormData] = useState({
    // Step 1: Basics
    postedAs: 'OWNER', // OWNER | DEALER
    dealType: 'RENT', // SALE | RENT
    propertyType: 'WAREHOUSE', // INDUSTRIAL | WAREHOUSE | LAND | COLD_STORAGE
    subType: 'Grade-A Logistics Warehouse',
    title: '',

    // Step 2: Location
    state: 'Tamil Nadu',
    city: 'Chennai',
    locality: 'Porur',
    address: '',
    pincode: '600116',
    landmark: 'Near Mount-Poonamallee Trunk Road',

    // Step 3: Technical Specs & Dimensions
    totalArea: '35000',
    areaUnit: 'SQFT',
    mezzanineArea: '3000',
    ceilingHeightFt: '32',
    eavesHeightFt: '28',
    loadingDocks: '4',
    dockLevellers: '2',
    plinthHeightFt: '4.0',
    floorType: 'FM2 Laser Screed Flooring',
    floorLoadTon: '6',
    powerKva: '100',
    dgBackup: true,
    roadWidthFt: '60',
    truckAccess: true,
    fireSafety: 'Fire NOC & ESFR Sprinklers',
    possessionStatus: 'Ready to Move',
    availableFrom: 'Immediate',

    // Step 4: Commercials & Pricing
    ratePsf: '28', // Rent psf/mo or Sale psf
    depositMonths: '6',
    lockInMonths: '36',
    escalationPercent: '5',
    maintenancePsf: '2.5',
    negotiable: true,

    // Step 5: Media & Contact
    description: '',
    poster_name: '',
    poster_phone: '',
    poster_email: '',
    company: '',
    photos: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80'
    ]
  });

  // Pre-fill user profile if logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aiw_auth_user');
      if (stored) {
        const u = JSON.parse(stored);
        setFormData(prev => ({
          ...prev,
          poster_name: prev.poster_name || u.name || '',
          poster_email: prev.poster_email || u.email || '',
          poster_phone: prev.poster_phone || u.phone || '',
          company: prev.company || u.company || ''
        }));
      }
    } catch (e) {}
  }, []);

  // Cascading Location Helpers
  const availableCities = CITIES_BY_STATE[formData.state] || ["Chennai", "Coimbatore"];
  const availableLocalities = LOCALITIES_BY_CITY[formData.city] || ["Porur", "Sriperumbudur", "Ambattur"];
  const availableSubTypes = CATEGORIES_DATA[formData.propertyType]?.subTypes || [
    "Grade-A Logistics Warehouse",
    "Industrial Factory Shed",
    "Cold Storage Unit",
    "Industrial Open Plot"
  ];

  const handleStateChange = (st) => {
    const cities = CITIES_BY_STATE[st] || ["Chennai"];
    const city = cities[0] || '';
    const locs = LOCALITIES_BY_CITY[city] || ['Porur'];
    setFormData(prev => ({
      ...prev,
      state: st,
      city,
      locality: locs[0] || ''
    }));
  };

  const handleCityChange = (c) => {
    const locs = LOCALITIES_BY_CITY[c] || ['Porur'];
    setFormData(prev => ({
      ...prev,
      city: c,
      locality: locs[0] || ''
    }));
  };

  // Precise Commercial Calculations
  const areaNum = Number(formData.totalArea) || 0;
  const rateNum = Number(formData.ratePsf) || 0;
  
  // For Rent:
  const monthlyRent = formData.dealType === 'RENT' ? areaNum * rateNum : 0;
  const annualRent = monthlyRent * 12;
  const depositAmount = monthlyRent * (Number(formData.depositMonths) || 6);

  // For Sale:
  const outrightPrice = formData.dealType === 'SALE' ? areaNum * rateNum : 0;

  // Indian Currency Formatter (Lakhs & Crores)
  const formatIndianCurrency = (num) => {
    if (!num || num === 0) return '₹0';
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const codeGen = `AIW-PROP-${Math.floor(100000 + Math.random() * 900000)}`;
      const displayTitle = formData.title.trim() || 
        `${formData.totalArea} Sq.Ft ${formData.subType} in ${formData.locality}, ${formData.city}`;

      const payload = {
        ...formData,
        id: codeGen,
        code: codeGen,
        title: displayTitle,
        slug: `${displayTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${formData.locality.toLowerCase()}`,
        area_sqft: areaNum,
        totalArea: areaNum,
        price_or_rent_psf: rateNum,
        monthlyRent: monthlyRent,
        price: outrightPrice,
        status: 'VERIFIED',
        approved: true,
        verified: true,
        attributes: {
          ceilingHeightFt: Number(formData.ceilingHeightFt) || 32,
          loadingDocks: Number(formData.loadingDocks) || 4,
          dockLevellers: Number(formData.dockLevellers) || 2,
          truckAccess: formData.truckAccess,
          powerKva: Number(formData.powerKva) || 100,
          roadWidthFt: Number(formData.roadWidthFt) || 60,
          floorLoadTon: Number(formData.floorLoadTon) || 6,
          fireSafety: formData.fireSafety
        },
        image: formData.photos[0],
        images: formData.photos,
        created_at: new Date().toISOString()
      };

      await marketplaceApi.postProperty(payload);
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Basics', icon: Building2 },
    { num: 2, label: 'Location', icon: MapPin },
    { num: 3, label: 'Technical Specs', icon: Layers },
    { num: 4, label: 'Commercials', icon: IndianRupee },
    { num: 5, label: 'Submit & Review', icon: Camera }
  ];

  if (isSuccess) {
    return (
      <div className="marketplace-container" style={{ padding: '40px 16px', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #bbf7d0', padding: '36px 24px', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', boxShadow: '0 4px 14px rgba(5,150,105,0.2)' }}>
            <CheckCircle2 size={40} />
          </div>
          <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#166534', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>
            ✓ INSTANT VERIFIED CLASSIFIEDS LISTING
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f2744', marginBottom: '8px' }}>
            Warehouse Property Listed Successfully!
          </h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
            Your listing has been published to India's premier industrial network. Occupiers and logistics leaders can now discover your property.
          </p>
          
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', marginBottom: '24px', textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f2744' }}>
              {formData.title || `${formData.totalArea} Sq.Ft Warehouse in ${formData.locality}, ${formData.city}`}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
              📍 {formData.locality}, {formData.city}, {formData.state} • {formData.dealType === 'RENT' ? `₹${formData.ratePsf}/sq ft/mo` : `₹${formData.ratePsf}/sq ft`}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-navy"
              onClick={onComplete}
              style={{ padding: '11px 24px', fontWeight: 800, background: '#004274', color: '#ffffff', borderRadius: '8px', cursor: 'pointer' }}
            >
              Browse All Warehouses
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
              }}
              style={{ padding: '11px 20px', fontWeight: 700, background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', borderRadius: '8px', cursor: 'pointer' }}
            >
              Post Another Property
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace-container" style={{ padding: '20px 14px 60px', maxWidth: '820px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{ marginBottom: '18px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 12px', background: '#ffe4e6', color: '#e11d48', borderRadius: '20px', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
          <Sparkles size={13} />
          <span>100% Free Industrial Property Classifieds</span>
        </div>
        <h1 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#0f2744', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Post Warehouse & Industrial Property
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.86rem', margin: 0, lineHeight: 1.45 }}>
          List with precise specs and connect with verified 3PL, FMCG, E-Commerce, and corporate tenants across India.
        </p>
      </div>

      {/* Modern Stepper Indicator */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        
        {/* Desktop Breadcrumbs (>= 640px) */}
        <div className="desktop-only" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = currentStep === s.num;
            const isDone = currentStep > s.num;
            return (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isActive || isDone ? 1 : 0.45 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: isActive ? '#e11d48' : isDone ? '#059669' : '#e2e8f0',
                  color: isActive || isDone ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  boxShadow: isActive ? '0 2px 8px rgba(225,29,72,0.3)' : 'none'
                }}>
                  {isDone ? '✓' : s.num}
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: isActive ? 800 : 600, color: isActive ? '#0f2744' : '#64748b', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
                {idx < steps.length - 1 && (
                  <div style={{ width: '20px', height: '1.5px', background: isDone ? '#059669' : '#e2e8f0', margin: '0 4px' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Bar (< 640px) */}
        <div style={{ display: 'block' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f2744' }}>
              Step {currentStep} of 5: {steps[currentStep - 1].label}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e11d48' }}>
              {Math.round((currentStep / 5) * 100)}% Complete
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${(currentStep / 5) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #0f2744 0%, #e11d48 100%)', transition: 'width 0.3s ease' }} />
          </div>
        </div>

      </div>

      {/* Main Form Container */}
      <div className="aiw-wizard-card">
        
        {/* ========================================================
            STEP 1: BASICS & CATEGORY
            ======================================================== */}
        {currentStep === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#fee2e2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={18} />
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#0f2744', margin: 0 }}>
                Step 1: Property Basics & Listing Type
              </h3>
            </div>

            {/* Poster Role & Deal Type */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  I am Posting As <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'OWNER', label: 'Direct Owner', sub: '0% Brokerage' },
                    { id: 'DEALER', label: 'Dealer / Broker', sub: 'Authorized' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, postedAs: r.id }))}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '8px',
                        border: formData.postedAs === r.id ? '2px solid #0f2744' : '1px solid #cbd5e1',
                        background: formData.postedAs === r.id ? '#f0f9ff' : '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        color: formData.postedAs === r.id ? '#0f2744' : '#475569',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div>{r.label}</div>
                      <div style={{ fontSize: '0.68rem', color: formData.postedAs === r.id ? '#0284c7' : '#94a3b8' }}>{r.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Deal / Transaction Type <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'RENT', label: 'For Rent / Lease', sub: 'Monthly Lease' },
                    { id: 'SALE', label: 'For Sale', sub: 'Outright Sale' }
                  ].map(d => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, dealType: d.id }))}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '8px',
                        border: formData.dealType === d.id ? '2px solid #e11d48' : '1px solid #cbd5e1',
                        background: formData.dealType === d.id ? '#fff1f2' : '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        color: formData.dealType === d.id ? '#e11d48' : '#475569',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div>{d.label}</div>
                      <div style={{ fontSize: '0.68rem', color: formData.dealType === d.id ? '#e11d48' : '#94a3b8' }}>{d.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category & Subtype */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Primary Category <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => {
                    const cat = e.target.value;
                    const subs = CATEGORIES_DATA[cat]?.subTypes || [];
                    setFormData(prev => ({
                      ...prev,
                      propertyType: cat,
                      subType: subs[0] || ''
                    }));
                  }}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#f8fafc', fontWeight: 600, color: '#0f172a' }}
                >
                  {Object.keys(CATEGORIES_DATA).map(k => (
                    <option key={k} value={k}>{CATEGORIES_DATA[k].label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Industrial Sub-Type <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <select
                  value={formData.subType}
                  onChange={(e) => setFormData(prev => ({ ...prev, subType: e.target.value }))}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#f8fafc', fontWeight: 600, color: '#0f172a' }}
                >
                  {availableSubTypes.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Listing Title */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Listing Headline Title (Optional - auto-generated if blank)
              </label>
              <input
                type="text"
                placeholder="e.g. 45,000 Sq.Ft Grade-A Distribution Warehouse near Porur Trunk Road"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#ffffff', color: '#0f172a', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: LOCATION & MICRO-MARKET
            ======================================================== */}
        {currentStep === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#fee2e2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={18} />
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#0f2744', margin: 0 }}>
                Step 2: 3-Tier Location & Corridor Details
              </h3>
            </div>

            {/* State, City, Locality Cascaded Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  State <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#f8fafc', fontWeight: 600, color: '#0f172a' }}
                >
                  {STATES_LIST.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  City / District <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#f8fafc', fontWeight: 600, color: '#0f172a' }}
                >
                  {availableCities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Industrial Locality / Hub <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <select
                  value={formData.locality}
                  onChange={(e) => setFormData(prev => ({ ...prev, locality: e.target.value }))}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#f8fafc', fontWeight: 600, color: '#0f172a' }}
                >
                  {availableLocalities.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address & Pincode */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Address / Industrial Park Name <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Survey No. 142/2B, SIPCOT Industrial Park"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#ffffff', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Pincode <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="e.g. 600116"
                  value={formData.pincode}
                  onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#ffffff', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Proximity Landmark */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Key Highway / Port / Metro Proximity
              </label>
              <input
                type="text"
                placeholder="e.g. 2.5 km from NH-48 Express Highway & 18 km from Chennai Port"
                value={formData.landmark}
                onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#ffffff', color: '#0f172a', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: PRECISE TECHNICAL SPECIFICATIONS
            ======================================================== */}
        {currentStep === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#fee2e2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={18} />
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#0f2744', margin: 0 }}>
                Step 3: Precise Technical Specifications
              </h3>
            </div>

            {/* Area Dimensions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Total Covered Area (Sq.Ft) <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #0f2744', borderRadius: '8px', padding: '0 12px', background: '#ffffff' }}>
                  <input
                    type="number"
                    placeholder="e.g. 35000"
                    value={formData.totalArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalArea: e.target.value }))}
                    style={{ border: 'none', outline: 'none', width: '100%', height: '42px', fontSize: '0.94rem', fontWeight: 800, color: '#0f172a' }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>Sq.Ft</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Ceiling Center Height (Ft)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '0 12px', background: '#ffffff' }}>
                  <input
                    type="number"
                    placeholder="e.g. 32"
                    value={formData.ceilingHeightFt}
                    onChange={(e) => setFormData(prev => ({ ...prev, ceilingHeightFt: e.target.value }))}
                    style={{ border: 'none', outline: 'none', width: '100%', height: '42px', fontSize: '0.9rem', color: '#0f172a' }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Ft</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Floor Load Capacity
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '0 12px', background: '#ffffff' }}>
                  <input
                    type="number"
                    placeholder="e.g. 6"
                    value={formData.floorLoadTon}
                    onChange={(e) => setFormData(prev => ({ ...prev, floorLoadTon: e.target.value }))}
                    style={{ border: 'none', outline: 'none', width: '100%', height: '42px', fontSize: '0.9rem', color: '#0f172a' }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Ton/sq.m</span>
                </div>
              </div>
            </div>

            {/* Docks & Power */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Loading Docks Count
                </label>
                <input
                  type="number"
                  placeholder="e.g. 4"
                  value={formData.loadingDocks}
                  onChange={(e) => setFormData(prev => ({ ...prev, loadingDocks: e.target.value }))}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#ffffff', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Power Sanctioned (kVA)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={formData.powerKva}
                  onChange={(e) => setFormData(prev => ({ ...prev, powerKva: e.target.value }))}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#ffffff', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Road Access Width (Ft)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 60"
                  value={formData.roadWidthFt}
                  onChange={(e) => setFormData(prev => ({ ...prev, roadWidthFt: e.target.value }))}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#ffffff', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Feature Badges Selection */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f2744', marginBottom: '8px' }}>
                Warehouse Compliance & Infrastructure Highlights:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', color: '#065f46', padding: '4px 10px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                  <Check size={13} /> Fire NOC & Hydrants
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', color: '#065f46', padding: '4px 10px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                  <Check size={13} /> 40-Ft Container Turning Radius
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', color: '#065f46', padding: '4px 10px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                  <Check size={13} /> FM2 Laser Screed Floor
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', color: '#065f46', padding: '4px 10px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                  <Check size={13} /> 100% DG Power Backup
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: COMMERCIAL TERMS & AUTO-CALCULATOR
            ======================================================== */}
        {currentStep === 4 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#fee2e2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IndianRupee size={18} />
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#0f2744', margin: 0 }}>
                Step 4: Commercial Pricing & Yield Calculations
              </h3>
            </div>

            {/* Rate Input */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  {formData.dealType === 'RENT' ? 'Expected Rent (₹ / Sq.Ft / Month)' : 'Expected Outright Rate (₹ / Sq.Ft)'} <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #0f2744', borderRadius: '8px', padding: '0 12px', background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontWeight: 800, color: '#0f2744', marginRight: '6px' }}>₹</span>
                  <input
                    type="number"
                    placeholder={formData.dealType === 'RENT' ? 'e.g. 28' : 'e.g. 3500'}
                    value={formData.ratePsf}
                    onChange={(e) => setFormData(prev => ({ ...prev, ratePsf: e.target.value }))}
                    style={{ border: 'none', outline: 'none', width: '100%', height: '44px', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>
                    {formData.dealType === 'RENT' ? '/sq ft/mo' : '/sq ft'}
                  </span>
                </div>
              </div>

              {formData.dealType === 'RENT' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Security Deposit (Months of Rent)
                  </label>
                  <select
                    value={formData.depositMonths}
                    onChange={(e) => setFormData(prev => ({ ...prev, depositMonths: e.target.value }))}
                    style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#f8fafc', fontWeight: 600, color: '#0f172a' }}
                  >
                    {[3, 4, 6, 9, 12].map(m => (
                      <option key={m} value={m}>{m} Months Security Deposit</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* LIVE AUTOMATED CALCULATOR SUMMARY BOX */}
            <div style={{ background: 'linear-gradient(135deg, #0f2744 0%, #1e3a5f 100%)', color: '#ffffff', borderRadius: '12px', padding: '16px 20px', marginBottom: '18px', boxShadow: '0 6px 20px rgba(15,39,68,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#93c5fd', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
                <Calculator size={15} />
                <span>Live Automated Commercial Valuation</span>
              </div>

              {formData.dealType === 'RENT' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Calculated Monthly Rent</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#38bdf8' }}>
                      {formatIndianCurrency(monthlyRent)}
                      <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>/mo</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Annual Lease Value</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                      {formatIndianCurrency(annualRent)}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Required Deposit ({formData.depositMonths} mo)</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fbbf24' }}>
                      {formatIndianCurrency(depositAmount)}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Total Outright Property Valuation</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8' }}>
                    {formatIndianCurrency(outrightPrice)}
                  </div>
                </div>
              )}
            </div>

            {/* Lease Terms */}
            {formData.dealType === 'RENT' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Lock-In Period (Months)
                  </label>
                  <input
                    type="number"
                    placeholder="36"
                    value={formData.lockInMonths}
                    onChange={(e) => setFormData(prev => ({ ...prev, lockInMonths: e.target.value }))}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#ffffff', color: '#0f172a', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Annual Escalation (%)
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    value={formData.escalationPercent}
                    onChange={(e) => setFormData(prev => ({ ...prev, escalationPercent: e.target.value }))}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', background: '#ffffff', color: '#0f172a', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            STEP 5: MEDIA, VERIFIED CONTACT & SUBMIT
            ======================================================== */}
        {currentStep === 5 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#fee2e2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Camera size={18} />
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#0f2744', margin: 0 }}>
                Step 5: Verified Contact Details & Final Review
              </h3>
            </div>

            {/* Contact Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Contact Name / Company <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '0 10px', background: '#ffffff' }}>
                  <User size={15} color="#94a3b8" style={{ marginRight: '6px', flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Logix Properties"
                    value={formData.poster_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, poster_name: e.target.value }))}
                    style={{ border: 'none', outline: 'none', width: '100%', height: '42px', fontSize: '0.88rem', color: '#0f172a' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Direct Mobile Phone <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '0 10px', background: '#ffffff' }}>
                  <Phone size={15} color="#94a3b8" style={{ marginRight: '6px', flexShrink: 0 }} />
                  <input
                    type="tel"
                    placeholder="+91 98840 12341"
                    value={formData.poster_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, poster_phone: e.target.value }))}
                    style={{ border: 'none', outline: 'none', width: '100%', height: '42px', fontSize: '0.88rem', color: '#0f172a' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Official Email Address
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '0 10px', background: '#ffffff' }}>
                  <Mail size={15} color="#94a3b8" style={{ marginRight: '6px', flexShrink: 0 }} />
                  <input
                    type="email"
                    placeholder="owner@warehouse.in"
                    value={formData.poster_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, poster_email: e.target.value }))}
                    style={{ border: 'none', outline: 'none', width: '100%', height: '42px', fontSize: '0.88rem', color: '#0f172a' }}
                  />
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW SUMMARY CARD */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: '#0f2744', textTransform: 'uppercase', marginBottom: '8px' }}>
                <Eye size={15} color="#e11d48" />
                <span>Live Listing Preview Summary:</span>
              </div>

              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                {formData.title || `${formData.totalArea} Sq.Ft ${formData.subType} in ${formData.locality}, ${formData.city}`}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', fontSize: '0.8rem', color: '#475569' }}>
                <span>📍 {formData.locality}, {formData.city}</span>
                <span>•</span>
                <span>📐 {Number(formData.totalArea).toLocaleString('en-IN')} Sq.Ft</span>
                <span>•</span>
                <span style={{ fontWeight: 800, color: '#e11d48' }}>
                  {formData.dealType === 'RENT' ? `₹${formData.ratePsf}/sq ft/mo (${formatIndianCurrency(monthlyRent)}/mo)` : formatIndianCurrency(outrightPrice)}
                </span>
                <span>•</span>
                <span>🏗️ {formData.ceilingHeightFt} Ft Height • {formData.loadingDocks} Docks</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#059669', fontWeight: 700, marginBottom: '8px' }}>
              <ShieldCheck size={16} />
              <span>Direct Verification: 100% Free Listing with verified buyer match dispatch.</span>
            </div>
          </div>
        )}

        {/* Navigation & Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              style={{
                padding: '10px 18px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                color: '#334155',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={16} />
              <span>Previous Step</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 18px',
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                fontWeight: 600,
                fontSize: '0.86rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              background: currentStep === 5 ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: currentStep === 5 ? '0 4px 14px rgba(5,150,105,0.35)' : '0 4px 14px rgba(225,29,72,0.35)',
              transition: 'all 0.15s ease'
            }}
          >
            {isSubmitting ? (
              <span>Publishing Listing...</span>
            ) : currentStep === 5 ? (
              <>
                <span>Publish Listing (FREE)</span>
                <Check size={18} />
              </>
            ) : (
              <>
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
