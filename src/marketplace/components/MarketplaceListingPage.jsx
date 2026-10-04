import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  X, 
  Check, 
  RotateCcw, 
  Inbox, 
  Building2, 
  ArrowUpDown, 
  ChevronRight, 
  Filter,
  CheckCircle,
  ShieldCheck,
  Percent,
  PlusCircle,
  Truck
} from 'lucide-react';
import MarketplaceSearchBar from './MarketplaceSearchBar';
import MarketplacePropertyCard from './MarketplacePropertyCard';
import { marketplaceApi } from '../services/marketplaceApi';
import { 
  STATES_LIST, 
  CITIES_BY_STATE, 
  LOCALITIES_BY_CITY, 
  CATEGORIES_DATA,
  POPULAR_CITIES 
} from '../data/sampleMarketplaceProperties';
import { ALL_INDIAN_CITIES_AZ } from '../data/localitySearchHelper';

export default function MarketplaceListingPage({ 
  onSelectProperty, 
  onUnlockContact, 
  onNavigatePostProperty,
  initialFilters = {}
}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState([]);

  // Filters State
  const [filters, setFilters] = useState({
    purpose: initialFilters.purpose || initialFilters.dealType || 'all',
    state: initialFilters.state || 'All States',
    city: initialFilters.city || 'Chennai',
    locality: initialFilters.locality || '',
    type: initialFilters.type || 'All Types',
    minArea: initialFilters.minArea || '',
    maxArea: initialFilters.maxArea || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    postedBy: initialFilters.postedBy || 'all',
    sort: initialFilters.sort || 'newest'
  });

  const [visibleCount, setVisibleCount] = useState(12);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync initialFilters changes (e.g. from Hash / Home search)
  useEffect(() => {
    if (Object.keys(initialFilters).length > 0) {
      setFilters(prev => ({
        ...prev,
        ...initialFilters,
        purpose: initialFilters.purpose || initialFilters.dealType || prev.purpose,
        city: initialFilters.city || prev.city,
        state: initialFilters.state || prev.state,
        locality: initialFilters.locality !== undefined ? initialFilters.locality : prev.locality
      }));
    }
  }, [initialFilters]);

  const fetchFilteredProperties = async () => {
    setLoading(true);
    try {
      const data = await marketplaceApi.getProperties(filters);
      setProperties(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFilteredProperties();
  }, [filters]);

  useEffect(() => {
    setSavedIds(marketplaceApi.getSavedPropertyIds());
  }, []);

  const handleSearchFromBar = (searchParams) => {
    setFilters(prev => ({
      ...prev,
      ...searchParams
    }));
    setVisibleCount(12);
  };

  const handleCityChange = (cityName) => {
    let matchedState = 'All States';
    for (const [st, cities] of Object.entries(CITIES_BY_STATE)) {
      if (cities.includes(cityName)) {
        matchedState = st;
        break;
      }
    }
    setFilters(prev => ({
      ...prev,
      city: cityName,
      state: matchedState,
      locality: ''
    }));
    setVisibleCount(12);
  };

  const handleLocalityToggle = (loc) => {
    setFilters(prev => ({
      ...prev,
      locality: prev.locality === loc ? '' : loc
    }));
    setVisibleCount(12);
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({
      ...prev,
      sort: e.target.value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      purpose: 'all',
      state: 'All States',
      city: 'Chennai',
      locality: '',
      type: 'All Types',
      minArea: '',
      maxArea: '',
      minPrice: '',
      maxPrice: '',
      postedBy: 'all',
      sort: 'newest'
    });
    setVisibleCount(12);
  };

  const handleToggleSave = (id) => {
    const updated = marketplaceApi.toggleSaveProperty(id);
    setSavedIds(updated);
  };

  const displayedProperties = properties.slice(0, visibleCount);
  const currentCityLocalities = LOCALITIES_BY_CITY[filters.city] || [];

  const activeFilterCount = [
    filters.purpose !== 'all',
    filters.type !== 'All Types',
    Boolean(filters.locality),
    Boolean(filters.minArea || filters.maxArea),
    filters.postedBy !== 'all'
  ].filter(Boolean).length;

  const renderFilterFields = () => (
    <>
      {/* City Selector */}
      <div style={{ marginBottom: '18px' }}>
        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
          Change City (A to Z)
        </label>
        <select
          value={filters.city}
          onChange={(e) => handleCityChange(e.target.value)}
          style={{ width: '100%', height: '38px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.86rem', fontWeight: 700, background: '#f8fafc', color: '#004274' }}
        >
          {ALL_INDIAN_CITIES_AZ.map(c => (
            <option key={c.name} value={c.name}>{c.name} ({c.state})</option>
          ))}
        </select>
      </div>

      {/* Purpose / Deal Type */}
      <div style={{ marginBottom: '18px' }}>
        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
          Purpose
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'rent', label: 'Rent' },
            { id: 'sale', label: 'Buy' }
          ].map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, purpose: p.id }))}
              style={{
                padding: '6px 8px',
                borderRadius: '6px',
                border: filters.purpose === p.id ? '1.5px solid #004274' : '1px solid #e2e8f0',
                background: filters.purpose === p.id ? '#004274' : '#f8fafc',
                color: filters.purpose === p.id ? '#ffffff' : '#334155',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Category */}
      <div style={{ marginBottom: '18px' }}>
        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
          Property Category
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['All Types', 'Warehouse', 'Industrial Shed', 'Land', 'Office'].map(t => (
            <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="radio"
                name="propType"
                checked={filters.type === t}
                onChange={() => setFilters(prev => ({ ...prev, type: t }))}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Localities in Selected City */}
      {currentCityLocalities.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
            Localities in {filters.city}
          </label>
          <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
            {currentCityLocalities.map(loc => (
              <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600, color: filters.locality === loc ? '#004274' : '#475569', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={filters.locality === loc}
                  onChange={() => handleLocalityToggle(loc)}
                />
                <span>{loc}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Area Size (Sq.Ft) Range */}
      <div style={{ marginBottom: '18px' }}>
        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
          Covered Area (Sq.Ft)
        </label>
        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            type="number"
            placeholder="Min"
            value={filters.minArea}
            onChange={(e) => setFilters(prev => ({ ...prev, minArea: e.target.value }))}
            style={{ width: '50%', height: '34px', padding: '0 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.8rem', background: '#f8fafc' }}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxArea}
            onChange={(e) => setFilters(prev => ({ ...prev, maxArea: e.target.value }))}
            style={{ width: '50%', height: '34px', padding: '0 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.8rem', background: '#f8fafc' }}
          />
        </div>
      </div>

      {/* Posted By (Direct Owner 0% Brokerage vs Dealer) */}
      <div style={{ marginBottom: '14px' }}>
        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
          Posted By
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Listings' },
            { id: 'OWNER', label: '0% Brokerage (Owners Only)' },
            { id: 'DEALER', label: 'Verified Dealers & Agents' }
          ].map(pb => (
            <label key={pb.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="radio"
                name="postedBy"
                checked={filters.postedBy === pb.id}
                onChange={() => setFilters(prev => ({ ...prev, postedBy: pb.id }))}
              />
              <span>{pb.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px 16px 80px', width: '100%', boxSizing: 'border-box' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        
        {/* 1. BREADCRUMBS & TOP CONTROLS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#64748b' }}>
            <a href="#/" style={{ color: '#004274', textDecoration: 'none', fontWeight: 700 }}>Home</a>
            <span>›</span>
            <span>Warehouses in</span>
            <span style={{ color: '#0f2744', fontWeight: 800 }}>{filters.city || 'India'}</span>
            {filters.locality && (
              <>
                <span>›</span>
                <span style={{ color: '#e11d48', fontWeight: 800 }}>{filters.locality}</span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={onNavigatePostProperty}
              style={{
                padding: '6px 14px',
                background: '#e11d48',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <PlusCircle size={15} />
              <span>Post Free Ad</span>
            </button>
          </div>
        </div>

        {/* 2. TOP COMPACT SEARCH BAR */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <MarketplaceSearchBar 
            onSearch={handleSearchFromBar}
            activeFilters={filters}
          />
        </div>

        {/* Mobile Filter & Sort Bar (Visible only on screens <= 860px) */}
        <div className="nobroker-mobile-filter-bar">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="nobroker-mobile-filter-btn"
          >
            <Filter size={16} color="#e11d48" />
            <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 10px', height: '40px' }}>
            <ArrowUpDown size={14} color="#64748b" />
            <select
              value={filters.sort}
              onChange={handleSortChange}
              style={{ border: 'none', background: 'transparent', fontSize: '0.82rem', fontWeight: 700, color: '#0f2744', outline: 'none' }}
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="area_desc">Area: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Slide-In Drawer */}
        {mobileFilterOpen && (
          <div className="nobroker-mobile-filter-drawer-overlay" onClick={() => setMobileFilterOpen(false)}>
            <div className="nobroker-mobile-filter-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="nobroker-drawer-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '1rem', color: '#0f2744' }}>
                  <Filter size={18} color="#e11d48" />
                  <span>Filter Properties {activeFilterCount > 0 ? `(${activeFilterCount} Active)` : ''}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setMobileFilterOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="nobroker-drawer-body">
                {renderFilterFields()}
              </div>

              <div className="nobroker-drawer-footer">
                <button
                  type="button"
                  onClick={() => {
                    handleResetFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="nobroker-drawer-reset-btn"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="nobroker-drawer-apply-btn"
                >
                  Apply Filters ({properties.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. MAIN 2-COLUMN LAYOUT: SIDEBAR FILTERS + LISTINGS GRID */}
        <div className="nobroker-listings-layout">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="nobroker-sidebar-desktop" style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
            position: 'sticky',
            top: '80px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, color: '#0f2744', fontSize: '1rem' }}>
                <Filter size={18} color="#e11d48" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                style={{ background: 'none', border: 'none', color: '#e11d48', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Clear All
              </button>
            </div>

            {renderFilterFields()}
          </aside>

          {/* RIGHT MAIN LISTINGS COLUMN */}
          <main className="nobroker-listings-main">
            
            {/* Results Title & Sort Controls (Desktop Header) */}
            <div className="nobroker-results-header" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f2744', margin: '0 0 4px' }}>
                  {filters.locality ? `${filters.locality}, ` : ''}{filters.city} Warehouses & Industrial Spaces
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 800 }}>
                    {properties.length} Verified Properties Found
                  </span>
                  <span style={{ color: '#cbd5e1' }}>•</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    0% Brokerage Guarantee
                  </span>
                </div>
              </div>

              {/* Sort By Dropdown (Desktop) */}
              <div className="nobroker-desktop-sort" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>Sort By:</span>
                <select
                  value={filters.sort}
                  onChange={handleSortChange}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem', fontWeight: 700, background: '#f8fafc', color: '#0f2744', cursor: 'pointer' }}
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Rent/Price: Low to High</option>
                  <option value="price_desc">Rent/Price: High to Low</option>
                  <option value="area_desc">Area: High to Low</option>
                  <option value="area_asc">Area: Low to High</option>
                </select>
              </div>
            </div>

            {/* Active Filters Tag Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Active Filters:</span>
              
              <span style={{ background: '#e0f2fe', color: '#004274', padding: '3px 10px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                City: {filters.city}
              </span>

              {filters.purpose !== 'all' && (
                <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '3px 10px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {filters.purpose === 'rent' ? 'For Rent' : 'For Sale'}
                  <button type="button" onClick={() => setFilters(prev => ({ ...prev, purpose: 'all' }))} style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer', padding: 0, fontWeight: 900 }}>✕</button>
                </span>
              )}

              {filters.type !== 'All Types' && (
                <span style={{ background: '#f3e8ff', color: '#7e22ce', padding: '3px 10px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {filters.type}
                  <button type="button" onClick={() => setFilters(prev => ({ ...prev, type: 'All Types' }))} style={{ background: 'none', border: 'none', color: '#7e22ce', cursor: 'pointer', padding: 0, fontWeight: 900 }}>✕</button>
                </span>
              )}

              {filters.locality && (
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Locality: {filters.locality}
                  <button type="button" onClick={() => setFilters(prev => ({ ...prev, locality: '' }))} style={{ background: 'none', border: 'none', color: '#15803d', cursor: 'pointer', padding: 0, fontWeight: 900 }}>✕</button>
                </span>
              )}
            </div>

            {/* Listings Grid / Empty State */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
                <p style={{ fontSize: '1rem', fontWeight: 700 }}>Fetching verified warehouses in {filters.city}...</p>
              </div>
            ) : properties.length === 0 ? (
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '60px 24px', textAlign: 'center', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}>
                <Inbox size={40} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f2744', margin: '0 0 8px' }}>
                  No properties currently match in {filters.locality || filters.city}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 20px' }}>
                  Try resetting the locality or area filters, or explore warehouses across other prime industrial hubs.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn btn-navy"
                    onClick={handleResetFilters}
                    style={{ padding: '8px 20px', fontWeight: 800, fontSize: '0.86rem' }}
                  >
                    Reset All Filters
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => handleCityChange('Mumbai')}
                    style={{ padding: '8px 20px', fontWeight: 800, fontSize: '0.86rem' }}
                  >
                    View Mumbai Hubs
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="nobroker-cards-grid">
                  {displayedProperties.map((property) => (
                    <MarketplacePropertyCard 
                      key={property.id || property._id}
                      property={property}
                      onSelectProperty={onSelectProperty}
                      onUnlockContact={onUnlockContact}
                      isSaved={savedIds.includes(property.id || property._id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>

                {/* Show More Pagination */}
                {visibleCount < properties.length && (
                  <div style={{ textAlign: 'center', marginTop: '36px' }}>
                    <button 
                      type="button" 
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      style={{
                        padding: '12px 36px',
                        background: '#ffffff',
                        border: '2px solid #004274',
                        color: '#004274',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 66, 116, 0.08)'
                      }}
                    >
                      Show More Properties ({properties.length - visibleCount} Remaining)
                    </button>
                  </div>
                )}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
