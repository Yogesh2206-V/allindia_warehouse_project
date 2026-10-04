import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, SlidersHorizontal, X, Check, Filter } from 'lucide-react';
import { 
  STATES_LIST, 
  CITIES_BY_STATE, 
  LOCALITIES_BY_CITY,
  CATEGORIES_DATA
} from '../data/sampleMarketplaceProperties';

export default function MarketplaceSearchBar({ onSearch, activeFilters = {} }) {
  const [dealType, setDealType] = useState(activeFilters.dealType || activeFilters.purpose || 'all');
  const [category, setCategory] = useState(activeFilters.category || 'all');
  const [subType, setSubType] = useState(activeFilters.subType || 'all');
  const [selectedState, setSelectedState] = useState(activeFilters.state || 'Tamil Nadu');
  const [selectedCity, setSelectedCity] = useState(activeFilters.city || 'Chennai');
  const [selectedArea, setSelectedArea] = useState(activeFilters.locality || '');
  const [minPrice, setMinPrice] = useState(activeFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(activeFilters.maxPrice || '');
  const [minArea, setMinArea] = useState(activeFilters.minArea || '');
  const [maxArea, setMaxArea] = useState(activeFilters.maxArea || '');
  const [postedBy, setPostedBy] = useState(activeFilters.postedBy || 'all');
  const [extraFilterDocks, setExtraFilterDocks] = useState(false);
  const [extraFilterHeight, setExtraFilterHeight] = useState(false);
  const [extraFilterTruck, setExtraFilterTruck] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const availableCities = CITIES_BY_STATE[selectedState] || ["Chennai", "Coimbatore", "Hosur"];
  const availableLocalities = LOCALITIES_BY_CITY[selectedCity] || [
    "Porur", "Ambattur", "Sriperumbudur", "Oragadam", "Guindy", "Madhavaram", "Redhills", "Poonamallee"
  ];

  const availableSubTypes = category !== 'all' && CATEGORIES_DATA[category] ? CATEGORIES_DATA[category].subTypes : [];

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    const cities = CITIES_BY_STATE[newState] || ["All Cities"];
    setSelectedCity(cities[0] || 'All Cities');
    setSelectedArea('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea('');
  };

  const triggerSearch = (override = {}) => {
    const params = {
      dealType: override.dealType !== undefined ? override.dealType : dealType,
      purpose: override.dealType !== undefined ? override.dealType : dealType,
      category: override.category !== undefined ? override.category : category,
      subType: override.subType !== undefined ? override.subType : subType,
      state: override.state !== undefined ? override.state : selectedState,
      city: override.city !== undefined ? override.city : selectedCity,
      locality: override.locality !== undefined ? override.locality : selectedArea,
      minPrice: override.minPrice !== undefined ? override.minPrice : minPrice,
      maxPrice: override.maxPrice !== undefined ? override.maxPrice : maxPrice,
      minArea: override.minArea !== undefined ? override.minArea : minArea,
      maxArea: override.maxArea !== undefined ? override.maxArea : maxArea,
      postedBy: override.postedBy !== undefined ? override.postedBy : postedBy,
      extraDocks: override.extraDocks !== undefined ? override.extraDocks : extraFilterDocks,
      extraHeight: override.extraHeight !== undefined ? override.extraHeight : extraFilterHeight,
      extraTruck: override.extraTruck !== undefined ? override.extraTruck : extraFilterTruck
    };
    if (onSearch) onSearch(params);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    triggerSearch();
  };

  const handleQuickLocality = (area) => {
    setSelectedArea(area);
    triggerSearch({ locality: area });
  };

  return (
    <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px 20px', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
      
      {/* 1. Deal Type Tabs (Buy / Rent / All) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Classifieds' },
            { id: 'rent', label: 'Rent' },
            { id: 'sale', label: 'Buy (For Sale)' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setDealType(tab.id);
                triggerSearch({ dealType: tab.id });
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: dealType === tab.id ? '2px solid #004274' : '1px solid #cbd5e1',
                background: dealType === tab.id ? '#004274' : '#ffffff',
                color: dealType === tab.id ? '#ffffff' : '#334155',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => { setCategory('all'); setSubType('all'); triggerSearch({ category: 'all', subType: 'all' }); }}
            style={{
              padding: '4px 10px',
              borderRadius: '20px',
              border: category === 'all' ? '1px solid #e11d48' : '1px solid #e2e8f0',
              background: category === 'all' ? '#fff1f2' : '#f8fafc',
              color: category === 'all' ? '#e11d48' : '#64748b',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            All Types
          </button>
          {Object.keys(CATEGORIES_DATA).map(catKey => (
            <button
              key={catKey}
              type="button"
              onClick={() => {
                setCategory(catKey);
                setSubType('all');
                triggerSearch({ category: catKey, subType: 'all' });
              }}
              style={{
                padding: '4px 10px',
                borderRadius: '20px',
                border: category === catKey ? '1px solid #e11d48' : '1px solid #e2e8f0',
                background: category === catKey ? '#fff1f2' : '#f8fafc',
                color: category === catKey ? '#e11d48' : '#64748b',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {CATEGORIES_DATA[catKey].label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Primary 3-Tier Location Search Bar */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr)) auto', gap: '10px', alignItems: 'flex-end' }}>
        
        {/* Category & Subtype */}
        {category !== 'all' && availableSubTypes.length > 0 && (
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Sub-Type
            </label>
            <select
              value={subType}
              onChange={(e) => {
                setSubType(e.target.value);
                triggerSearch({ subType: e.target.value });
              }}
              style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem', fontWeight: 600, background: '#f8fafc', color: '#0f2744' }}
            >
              <option value="all">All {CATEGORIES_DATA[category].label} Sub-Types</option>
              {availableSubTypes.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        )}

        {/* State */}
        <div>
          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
            State
          </label>
          <select 
            value={selectedState}
            onChange={handleStateChange}
            style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem', fontWeight: 600, background: '#f8fafc', color: '#0f2744' }}
          >
            <option value="All States">All States</option>
            {STATES_LIST.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
            City
          </label>
          <select 
            value={selectedCity}
            onChange={handleCityChange}
            style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem', fontWeight: 600, background: '#f8fafc', color: '#0f2744' }}
          >
            <option value="All Cities">All Cities</option>
            {availableCities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Area / Locality (e.g. Porur) */}
        <div>
          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
            Area / Locality
          </label>
          <select 
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem', fontWeight: selectedArea ? 800 : 600, background: '#f8fafc', color: selectedArea ? '#004274' : '#0f2744' }}
          >
            <option value="">All Areas in {selectedCity}</option>
            {availableLocalities.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            type="submit" 
            className="btn btn-navy"
            style={{ height: '40px', padding: '0 18px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '6px', background: '#004274', color: '#ffffff' }}
          >
            <Search size={15} />
            <span>Search</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn btn-outline"
            title="More Filters"
            style={{ height: '40px', padding: '0 12px', border: '1px solid #cbd5e1' }}
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>

      </form>

      {/* 3. Advanced Filters Strip */}
      {showAdvanced && (
        <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {/* Posted By */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Posted By
            </label>
            <select
              value={postedBy}
              onChange={(e) => {
                setPostedBy(e.target.value);
                triggerSearch({ postedBy: e.target.value });
              }}
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', background: '#f8fafc' }}
            >
              <option value="all">All (Owners & Dealers)</option>
              <option value="OWNER">Direct Owners Only (0% Brokerage)</option>
              <option value="DEALER">Verified Dealers / Agents</option>
            </select>
          </div>

          {/* Area Range */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Min Area (Sq.Ft)
            </label>
            <input
              type="number"
              placeholder="e.g. 20000"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
              onBlur={() => triggerSearch()}
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', background: '#f8fafc' }}
            />
          </div>

          {/* Warehouse Extras Checkboxes */}
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '4px' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={extraFilterDocks}
                onChange={(e) => {
                  setExtraFilterDocks(e.target.checked);
                  triggerSearch({ extraDocks: e.target.checked });
                }}
              />
              <span>Loading Docks Ready</span>
            </label>

            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={extraFilterHeight}
                onChange={(e) => {
                  setExtraFilterHeight(e.target.checked);
                  triggerSearch({ extraHeight: e.target.checked });
                }}
              />
              <span>High Ceiling (30+ Ft)</span>
            </label>

            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={extraFilterTruck}
                onChange={(e) => {
                  setExtraFilterTruck(e.target.checked);
                  triggerSearch({ extraTruck: e.target.checked });
                }}
              />
              <span>40ft Multi-Axle Container Access</span>
            </label>
          </div>
        </div>
      )}

      {/* 4. Quick Locality Chips for Chennai / Selected City */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Areas in {selectedCity}:</span>
        {availableLocalities.slice(0, 6).map((area, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickLocality(area)}
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              border: selectedArea === area ? '1px solid #004274' : '1px solid #e2e8f0',
              background: selectedArea === area ? '#e0f2fe' : '#f8fafc',
              color: selectedArea === area ? '#004274' : '#334155',
              fontSize: '0.74rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {area}
          </button>
        ))}
      </div>

    </div>
  );
}
