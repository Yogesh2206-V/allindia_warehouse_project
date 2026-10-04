import React, { useState, useEffect } from 'react';
import { ArrowUpDown, RotateCcw, PlusCircle, Inbox } from 'lucide-react';
import MarketplaceSearchBar from './MarketplaceSearchBar';
import MarketplacePropertyCard from './MarketplacePropertyCard';
import { marketplaceApi } from '../services/marketplaceApi';

export default function MarketplaceListingPage({ 
  onSelectProperty, 
  onUnlockContact, 
  onNavigatePostProperty
}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState([]);

  // Filters State
  const [filters, setFilters] = useState({
    purpose: 'all',
    state: 'Tamil Nadu',
    city: 'Chennai',
    locality: '',
    type: 'All Types',
    sort: 'newest'
  });

  const [visibleCount, setVisibleCount] = useState(9);

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
    setVisibleCount(9);
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
      state: 'Tamil Nadu',
      city: 'Chennai',
      locality: '',
      type: 'All Types',
      sort: 'newest'
    });
    setVisibleCount(9);
  };

  const handleToggleSave = (id) => {
    const updated = marketplaceApi.toggleSaveProperty(id);
    setSavedIds(updated);
  };

  const displayedProperties = properties.slice(0, visibleCount);

  return (
    <div className="marketplace-container" style={{ padding: '24px 16px 60px' }}>
      
      {/* 1. Clean Top Search Bar */}
      <div style={{ marginBottom: '24px' }}>
        <MarketplaceSearchBar 
          onSearch={handleSearchFromBar}
          activeFilters={filters}
        />
      </div>

      {/* 2. Simple Results Count & Sort Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f2744', margin: 0 }}>
            {filters.locality ? `${filters.locality}, ${filters.city}` : filters.city !== 'All Cities' ? `${filters.city} Hubs` : 'All India'} Properties
          </h2>
          <span style={{ fontSize: '0.8rem', background: '#e2e8f0', color: '#334155', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
            {properties.length} Available
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Sort:</span>
          <select 
            value={filters.sort}
            onChange={handleSortChange}
            style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 600, background: '#ffffff', color: '#334155' }}
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="area_asc">Area: Small to Large</option>
            <option value="area_desc">Area: Large to Small</option>
          </select>
        </div>
      </div>

      {/* 3. Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
          <p>Loading properties...</p>
        </div>
      ) : properties.length === 0 ? (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '48px 24px', textAlign: 'center' }}>
          <Inbox size={32} style={{ margin: '0 auto 12px', color: '#94a3b8' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f2744', margin: '0 0 6px' }}>
            No properties found for this selection
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 auto 16px', maxWidth: '400px' }}>
            Try selecting "All Areas" or resetting filters to see available warehouses and industrial spaces.
          </p>
          <button 
            type="button" 
            className="btn btn-red btn-sm"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
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

          {/* Load More Button */}
          {visibleCount < properties.length && (
            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <button 
                type="button" 
                className="btn btn-outline"
                style={{ padding: '8px 24px', fontWeight: 700 }}
                onClick={() => setVisibleCount(prev => prev + 6)}
              >
                Show More Properties ({properties.length - visibleCount} more)
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
