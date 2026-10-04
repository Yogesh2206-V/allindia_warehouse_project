import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  PlusCircle, 
  Sparkles, 
  Truck, 
  FileText, 
  Percent, 
  Layers, 
  ThermometerSnowflake, 
  LandPlot, 
  PhoneCall, 
  Users, 
  ChevronRight,
  Star,
  Clock,
  Check,
  Award
} from 'lucide-react';
import { 
  POPULAR_CITIES, 
  CATEGORIES_DATA, 
  LOCALITIES_BY_CITY,
  STATES_LIST,
  CITIES_BY_STATE
} from '../data/sampleMarketplaceProperties';

import LocalityAutocompleteInput from './LocalityAutocompleteInput';
import { searchCitiesAZ, ALL_INDIAN_CITIES_AZ } from '../data/localitySearchHelper';

export default function MarketplaceHomePage({ 
  onSearchNavigate, 
  onNavigatePostProperty, 
  onSelectProperty,
  featuredProperties = [] 
}) {
  const [dealType, setDealType] = useState('rent'); // 'rent' | 'sale' | 'commercial'
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [activeLetterFilter, setActiveLetterFilter] = useState('ALL');

  const alphabetList = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // Available localities for currently selected city
  const availableLocalities = LOCALITIES_BY_CITY[selectedCity] || [
    "Porur", "Ambattur", "Sriperumbudur", "Oragadam", "Guindy", "Madhavaram"
  ];

  const handleCitySelect = (city, state) => {
    setSelectedCity(city);
    if (state) setSelectedState(state);
    setCityDropdownOpen(false);
    setSelectedLocalities([]);
    setCitySearchQuery('');
    setActiveLetterFilter('ALL');
  };

  const filteredCitiesAZ = ALL_INDIAN_CITIES_AZ.filter(c => {
    if (activeLetterFilter !== 'ALL' && !c.name.toUpperCase().startsWith(activeLetterFilter)) {
      return false;
    }
    if (citySearchQuery.trim() !== '') {
      const q = citySearchQuery.toLowerCase().trim();
      if (q.length === 1) {
        return c.name.toLowerCase().startsWith(q);
      }
      return c.name.toLowerCase().startsWith(q) || c.name.toLowerCase().includes(q) || c.state.toLowerCase().startsWith(q);
    }
    return true;
  });

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSearchNavigate) {
      const locString = Array.isArray(selectedLocalities) ? selectedLocalities.join(', ') : (selectedLocalities || '');
      onSearchNavigate({
        city: selectedCity,
        state: selectedState,
        locality: locString,
        purpose: dealType === 'commercial' ? 'all' : dealType,
        type: selectedPropertyType === 'all' ? 'All Types' : selectedPropertyType
      });
    }
  };

  const handleDirectCityClick = (city, state) => {
    if (onSearchNavigate) {
      onSearchNavigate({
        city: city,
        state: state || 'All States',
        purpose: 'all',
        type: 'All Types'
      });
    }
  };

  const handleCategoryClick = (catKey) => {
    if (onSearchNavigate) {
      onSearchNavigate({
        city: selectedCity,
        purpose: 'all',
        type: CATEGORIES_DATA[catKey]?.label || 'All Types'
      });
    }
  };

  return (
    <div className="nobroker-home-page" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* 1. HERO SEARCH SECTION (NoBroker Style) */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0b192c 0%, #1e3e62 50%, #000000 100%)',
        color: '#ffffff',
        padding: '60px 20px 80px',
        overflow: 'hidden'
      }}>
        {/* Decorative Grid and Glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(225, 29, 72, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 168, 204, 0.12) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Top Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px' }}>
            <span style={{ background: '#e11d48', color: '#ffffff', fontSize: '0.7rem', fontWeight: 900, padding: '2px 8px', borderRadius: '12px' }}>0% BROKERAGE</span>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#f1f5f9' }}>India's #1 Direct Owner Warehouse & Industrial Space Portal</span>
          </div>

          {/* Main Headline */}
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 16px', color: '#ffffff' }}>
            Find Warehouses & Industrial Sheds <br className="desktop-only" />
            <span style={{ background: 'linear-gradient(90deg, #ff4d6d, #ff758f, #ffb3c1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Directly From Owners With Zero Brokerage
            </span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', margin: '0 auto 36px', maxWidth: '680px', lineHeight: 1.5 }}>
            Verified Grade-A Logistics Parks, PEB Godowns, Cold Storages, and Heavy Manufacturing Plants across all major Indian industrial corridors.
          </p>

          {/* NOBROKER-STYLE SEARCH BOX CONTAINER */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            padding: '16px 20px 24px',
            textAlign: 'left',
            color: '#0f2744'
          }}>
            
            {/* 1. Deal Type Tabs (Rent / Buy / Commercial) */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
              {[
                { id: 'rent', label: 'Rent Warehouse' },
                { id: 'sale', label: 'Buy Property' },
                { id: 'commercial', label: 'All Industrial Spaces' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDealType(tab.id)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: dealType === tab.id ? '#004274' : '#f1f5f9',
                    color: dealType === tab.id ? '#ffffff' : '#475569',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 2. City Selector & Locality Input Row */}
            <form onSubmit={handleSearchSubmit} className="nobroker-hero-form">
              
              {/* City Dropdown Box */}
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Select City
                </label>
                <div 
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  style={{
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    background: '#f8fafc',
                    cursor: 'pointer',
                    fontWeight: 800,
                    fontSize: '0.96rem',
                    color: '#0f2744'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} color="#e11d48" />
                    <span>{selectedCity}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>▼</span>
                </div>

                {/* A-Z Cities Dropdown Menu */}
                {cityDropdownOpen && (
                  <div className="nobroker-city-dropdown-menu" style={{
                    position: 'absolute',
                    top: '105%',
                    left: 0,
                    width: '360px',
                    maxWidth: 'calc(100vw - 48px)',
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
                    border: '1px solid #e2e8f0',
                    padding: '12px',
                    zIndex: 200,
                    maxHeight: '380px',
                    overflowY: 'auto'
                  }}>
                    {/* Search Input for Cities */}
                    <div style={{ marginBottom: '10px' }}>
                      <input
                        type="text"
                        placeholder="Type any letter (A-Z) or city name..."
                        value={citySearchQuery}
                        onChange={(e) => setCitySearchQuery(e.target.value)}
                        autoFocus
                        style={{
                          width: '100%',
                          height: '36px',
                          padding: '0 10px',
                          borderRadius: '6px',
                          border: '1.5px solid #004274',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          background: '#f8fafc',
                          outline: 'none',
                          color: '#0f2744'
                        }}
                      />
                    </div>

                    {/* A-Z Letter Quick Filter Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                      {alphabetList.map(letter => (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => {
                            setActiveLetterFilter(letter);
                            setCitySearchQuery('');
                          }}
                          style={{
                            padding: '2px 5px',
                            minWidth: '22px',
                            height: '22px',
                            borderRadius: '4px',
                            border: activeLetterFilter === letter ? '1px solid #e11d48' : '1px solid #e2e8f0',
                            background: activeLetterFilter === letter ? '#e11d48' : '#f8fafc',
                            color: activeLetterFilter === letter ? '#ffffff' : '#334155',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>

                    {/* Filtered Cities List */}
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>
                      {activeLetterFilter !== 'ALL' ? `Cities Starting With '${activeLetterFilter}'` : 'All Major Indian Cities'} ({filteredCitiesAZ.length})
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', maxHeight: '220px', overflowY: 'auto' }}>
                      {filteredCitiesAZ.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', padding: '12px', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
                          No cities found matching "{citySearchQuery || activeLetterFilter}"
                        </div>
                      ) : (
                        filteredCitiesAZ.map(c => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => handleCitySelect(c.name, c.state)}
                            style={{
                              textAlign: 'left',
                              padding: '6px 8px',
                              borderRadius: '6px',
                              border: selectedCity === c.name ? '1.5px solid #004274' : '1px solid #f1f5f9',
                              background: selectedCity === c.name ? '#e0f2fe' : '#ffffff',
                              color: selectedCity === c.name ? '#004274' : '#1e293b',
                              fontWeight: selectedCity === c.name ? 800 : 600,
                              fontSize: '0.82rem',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1px'
                            }}
                          >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                            <span style={{ fontSize: '0.66rem', color: '#64748b' }}>{c.state}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* NoBroker / Google-Style Locality Autocomplete Search */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Search Locality / Landmark / Hub in {selectedCity}
                </label>
                <LocalityAutocompleteInput 
                  city={selectedCity}
                  selectedLocalities={selectedLocalities}
                  onChange={(val) => setSelectedLocalities(val)}
                  placeholder={`Search in ${selectedCity} (e.g. MGR, Porur, Sriperumbudur)...`}
                  isMulti={true}
                  inputHeight="50px"
                />
              </div>

              {/* Big Red "Search" CTA */}
              <div style={{ alignSelf: 'flex-end' }}>
                <button
                  type="submit"
                  style={{
                    height: '50px',
                    padding: '0 32px',
                    background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 900,
                    fontSize: '1rem',
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 20px rgba(225, 29, 72, 0.4)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Search size={18} />
                  <span>SEARCH</span>
                </button>
              </div>

            </form>

            {/* 3. Quick Locality Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>Top Hubs in {selectedCity}:</span>
              {availableLocalities.slice(0, 7).map((loc, idx) => {
                const isChipSelected = Array.isArray(selectedLocalities) && selectedLocalities.includes(loc);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (isChipSelected) {
                        setSelectedLocalities(prev => prev.filter(l => l !== loc));
                      } else {
                        setSelectedLocalities(prev => [...(Array.isArray(prev) ? prev : []), loc]);
                      }
                    }}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: isChipSelected ? '1px solid #004274' : '1px solid #e2e8f0',
                      background: isChipSelected ? '#e0f2fe' : '#f8fafc',
                      color: isChipSelected ? '#004274' : '#334155',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {isChipSelected ? `✓ ${loc}` : `+ ${loc}`}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Quick Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginTop: '36px', textAlign: 'center' }}>
            {[
              { label: 'Verified Listings', val: '2,400+' },
              { label: 'Zero Brokerage', val: '₹0 Fees' },
              { label: 'Active Direct Landlords', val: '1,850+' },
              { label: 'Industrial Cities', val: '25+ Hubs' }
            ].map((stat, i) => (
              <div key={i} style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '12px 16px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>{stat.val}</div>
                <div style={{ fontSize: '0.74rem', color: '#cbd5e1', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. POST FREE PROPERTY PROMOTIONAL BANNER (NoBroker Style) */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '24px 20px' }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: 52, height: 52, borderRadius: '12px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f2744', margin: '0 0 4px' }}>
                Are you a Warehouse Owner or Industrial Landlord?
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0 }}>
                Post your property in 3 minutes for <strong style={{ color: '#e11d48' }}>FREE</strong> and connect with verified enterprise tenants directly. Zero commissions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigatePostProperty}
            style={{
              padding: '12px 24px',
              background: '#004274',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0, 66, 116, 0.25)'
            }}
          >
            <PlusCircle size={17} />
            <span>Post Free Property Ad</span>
          </button>
        </div>
      </section>

      {/* 3. EXPLORE WAREHOUSES IN TOP CITIES (With Strict A-to-Z Alphabet Filter) */}
      <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Explore By Location (A to Z Directory)
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f2744', margin: '6px 0 10px' }}>
              Warehouses Across India's Prime Industrial Hubs
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto' }}>
              Click any letter from <strong>A to Z</strong> to view only cities starting with that letter, or select a city card to view available warehouses.
            </p>
          </div>

          {/* A-to-Z Alphabet Filter Strip */}
          <div className="nobroker-az-strip" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '6px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '10px 14px',
            marginBottom: '28px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)'
          }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b', marginRight: '6px', whiteSpace: 'nowrap' }}>Filter by Letter:</span>
            {alphabetList.map(letter => {
              const isActive = activeLetterFilter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setActiveLetterFilter(letter)}
                  className="nobroker-az-btn"
                  style={{
                    minWidth: '28px',
                    height: '28px',
                    padding: '0 6px',
                    borderRadius: '6px',
                    border: isActive ? '1.5px solid #e11d48' : '1px solid #cbd5e1',
                    background: isActive ? '#e11d48' : '#f8fafc',
                    color: isActive ? '#ffffff' : '#1e293b',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Status Header for Active Filter */}
          {activeLetterFilter !== 'ALL' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', padding: '0 4px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f2744' }}>
                Showing only cities starting with <span style={{ color: '#e11d48' }}>'{activeLetterFilter}'</span> ({POPULAR_CITIES.filter(c => c.name.toUpperCase().startsWith(activeLetterFilter)).length} hubs found)
              </div>
              <button
                type="button"
                onClick={() => setActiveLetterFilter('ALL')}
                style={{ background: 'none', border: 'none', color: '#e11d48', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Reset to Show All Cities ✕
              </button>
            </div>
          )}

          {/* City Cards Grid - Strictly Filtered By Selected Letter */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {POPULAR_CITIES.filter(city => {
              if (activeLetterFilter === 'ALL') return true;
              return city.name.toUpperCase().startsWith(activeLetterFilter);
            }).map((city) => (
              <div
                key={city.name}
                onClick={() => handleDirectCityClick(city.name, city.state)}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 23, 42, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.04)';
                }}
              >
                <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={city.image}
                    alt={city.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(15, 39, 68, 0.85)', backdropFilter: 'blur(4px)', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                    {city.count}+ Properties
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: '#e11d48', color: '#ffffff', fontSize: '0.68rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                    {city.tag}
                  </div>
                </div>

                <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f2744', margin: '0 0 2px' }}>
                      {city.name}
                    </h3>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                      {city.state}
                    </div>
                  </div>

                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#004274' }}>
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. EXPLORE BY INDUSTRIAL PROPERTY CATEGORY */}
      <section style={{ padding: '60px 20px', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Categories
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f2744', margin: '6px 0 10px' }}>
              Explore By Property Category
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto' }}>
              Specialized spaces tailored for FMCG distribution, automotive manufacturing, cold chain storage, and multi-acre industrial parks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              {
                key: 'WAREHOUSE',
                title: 'Logistics & Warehouses',
                sub: 'PEB Godowns, 3PL Distribution, Docks',
                icon: <Building2 size={24} color="#004274" />,
                bg: '#e0f2fe'
              },
              {
                key: 'INDUSTRIAL',
                title: 'Factories & Industrial Sheds',
                sub: 'Heavy Crane, HT Power Sanctioned',
                icon: <Truck size={24} color="#e11d48" />,
                bg: '#fff1f2'
              },
              {
                key: 'LAND',
                title: 'Industrial Land & Plots',
                sub: 'DTCP & SIPCOT Approved Acreages',
                icon: <LandPlot size={24} color="#059669" />,
                bg: '#ecfdf5'
              },
              {
                key: 'OFFICE',
                title: 'Corporate & Logistics Offices',
                sub: 'Plug & Play, Tech Parks, Showrooms',
                icon: <Layers size={24} color="#7c3aed" />,
                bg: '#f5f3ff'
              }
            ].map((cat) => (
              <div
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#004274';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 66, 116, 0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ width: 46, height: 46, borderRadius: '10px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f2744', margin: '0 0 6px' }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {cat.sub}
                </p>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#004274', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>Browse Classifieds</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. NOBROKER VALUE-ADDED SERVICES */}
      <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              All India Warehouse Services
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f2744', margin: '6px 0 10px' }}>
              End-To-End Industrial Real Estate Assistance
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto' }}>
              Simplify your lease agreements, plant setup, and warehouse operations with our expert ecosystem.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '18px' }}>
            {[
              {
                title: 'Industrial Lease Agreement',
                desc: 'Legally vetted commercial rental agreements with e-stamping and digital notary.',
                icon: <FileText size={22} color="#004274" />
              },
              {
                title: 'Cargo & Machinery Relocation',
                desc: 'Specialized industrial movers for factory machinery, pallet racks, and inventories.',
                icon: <Truck size={22} color="#e11d48" />
              },
              {
                title: 'Fire NOC & Compliance Audit',
                desc: 'NBC fire safety inspection, explosive/hazard NOCs, and PCB clearances.',
                icon: <ShieldCheck size={22} color="#059669" />
              },
              {
                title: 'Warehouse Expansion Loans',
                desc: 'Low-interest working capital and lease rental discounting (LRD) from top banks.',
                icon: <Percent size={22} color="#d97706" />
              }
            ].map((srv, idx) => (
              <div key={idx} style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '22px 18px', boxShadow: '0 2px 8px rgba(15,23,42,0.03)' }}>
                <div style={{ width: 42, height: 42, borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  {srv.icon}
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f2744', margin: '0 0 6px' }}>{srv.title}</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 14px', lineHeight: 1.45 }}>{srv.desc}</p>
                <a href="#/services" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#004274', textDecoration: 'none' }}>
                  Explore Service →
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. WHY ALL INDIA WAREHOUSE (Zero Brokerage Promise) */}
      <section style={{ padding: '60px 20px', background: '#0f2744', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', margin: '0 0 10px' }}>
              Why Companies Trust All India Warehouse
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto' }}>
              Say goodbye to middleman fees, inflated brokerage rates, and unresponsive brokers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              {
                title: 'Zero Brokerage Guarantee',
                desc: 'Connect directly with certified property owners and save hundreds of thousands on commercial brokerage fees.',
                badge: '100% Free for Tenants'
              },
              {
                title: 'Physically Verified Spaces',
                desc: 'Every listed godown, logistics hub, and factory shed undergoes physical verification for dimensions and clearances.',
                badge: 'Verified Titles'
              },
              {
                title: 'Direct Phone & Inspection',
                desc: 'Instant owner contact reveal and scheduled site visits without intermediary gatekeeping.',
                badge: 'Direct Connect'
              },
              {
                title: 'All India Footprint',
                desc: 'Extensive coverage across North, South, West, and Central India logistics clusters.',
                badge: 'Pan-India Reach'
              }
            ].map((feat, i) => (
              <div key={i} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '24px 20px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#e11d48', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  {feat.badge}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '12px 0 8px' }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (NoBroker Style FAQ) */}
      <section style={{ padding: '60px 20px', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f2744', margin: '0 0 10px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Got questions about leasing or listing warehouses on All India Warehouse?
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                q: "How does the Zero Brokerage model work for commercial warehouses?",
                a: "All India Warehouse allows landlords, developers, and asset owners to list their properties directly. Prospective tenants and buyers can view property technical specs, photos, and directly connect with the owner without paying any brokerage fees."
              },
              {
                q: "What technical specifications should I check before leasing a warehouse?",
                a: "Key specifications include clear ceiling height (28ft to 40ft for PEB), number of hydraulic dock levellers, floor load capacity (typically FM2 laser screed 5-8 ton/m²), power sanction (HT/LT kVA), truck apron turning radius (40ft multi-axle access), and fire safety compliance (ESFR sprinklers)."
              },
              {
                q: "How can I post my warehouse or factory for rent or sale?",
                a: "Simply click on the 'Post Free Property' button at the top, select your city and locality, enter the dimensions and rental pricing, upload photos, and publish your ad. Your listing goes live across our nationwide buyer and tenant network immediately."
              },
              {
                q: "Which cities are currently supported?",
                a: "We cover all major industrial hubs including Chennai, Bengaluru, Mumbai, Pune, Hyderabad, Ahmedabad, Gurugram, Delhi NCR, Kolkata, Coimbatore, Hosur, and surrounding MIDC/SIPCOT/GIDC corridors."
              }
            ].map((faq, idx) => (
              <details key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px 20px', cursor: 'pointer' }}>
                <summary style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0f2744', outline: 'none' }}>
                  {faq.q}
                </summary>
                <div style={{ marginTop: '10px', fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
