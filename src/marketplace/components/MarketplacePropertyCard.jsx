import React from 'react';
import { 
  MapPin, 
  Heart, 
  PhoneCall, 
  ShieldCheck, 
  User, 
  Briefcase 
} from 'lucide-react';

export default function MarketplacePropertyCard({ 
  property, 
  onSelectProperty, 
  onUnlockContact, 
  isSaved = false, 
  onToggleSave 
}) {
  const {
    id,
    code = 'PROP-100245',
    title,
    dealType = 'RENT',
    propertyType = 'WAREHOUSE',
    subType = 'Warehouse',
    type,
    city,
    locality,
    state,
    totalArea,
    area_sqft,
    areaUnit = 'SQFT',
    price_or_rent_psf,
    price,
    monthlyRent,
    negotiable = true,
    status = 'Ready',
    attributes = {},
    images = [],
    postedAs = 'OWNER',
    poster_role = 'owner',
    poster_name
  } = property;

  const defaultImg = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80";
  const thumbnail = images && images.length > 0 ? images[0] : defaultImg;

  const isSale = dealType === 'SALE' || property.purpose === 'sale';
  const priceDisplay = isSale 
    ? (price ? `₹${(price / 10000000).toFixed(2)} Cr` : `₹${price_or_rent_psf?.toLocaleString('en-IN')}/sq.ft`)
    : `₹${price_or_rent_psf}/sq.ft/mo`;

  const displayArea = totalArea || area_sqft || 25000;

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '10px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 10px rgba(15,23,42,0.04)',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
    }}>
      
      {/* Photo with clean badge */}
      <div 
        style={{ position: 'relative', height: '190px', cursor: 'pointer', overflow: 'hidden' }}
        onClick={() => onSelectProperty && onSelectProperty(property)}
      >
        <img 
          src={thumbnail} 
          alt={title} 
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Deal Type Badge */}
        <span style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: isSale ? '#059669' : '#004274',
          color: '#ffffff',
          fontSize: '0.72rem',
          fontWeight: 800,
          padding: '3px 8px',
          borderRadius: '4px',
          textTransform: 'uppercase'
        }}>
          {isSale ? 'For Sale' : 'For Rent'}
        </span>

        {/* Category Pill */}
        <span style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255,255,255,0.95)',
          color: '#0f2744',
          fontSize: '0.72rem',
          fontWeight: 800,
          padding: '3px 8px',
          borderRadius: '4px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          {subType || type || propertyType}
        </span>

        {/* Property Code Pill */}
        <span style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'rgba(15,23,42,0.85)',
          color: '#ffffff',
          fontSize: '0.68rem',
          fontWeight: 800,
          padding: '2px 6px',
          borderRadius: '4px'
        }}>
          {code}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Price Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#004274' }}>
              {priceDisplay}
            </div>
            {negotiable && (
              <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700, background: '#ecfdf5', padding: '1px 6px', borderRadius: '4px' }}>
                Negotiable
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty && onSelectProperty(property)}
            style={{ 
              fontSize: '0.94rem', 
              fontWeight: 800, 
              color: '#0f2744', 
              margin: '0 0 6px', 
              lineHeight: 1.35, 
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {title}
          </h3>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.8rem', marginBottom: '10px' }}>
            <MapPin size={13} className="text-red" style={{ flexShrink: 0 }} />
            <span><strong>{locality}</strong>, {city}, {state}</span>
          </div>

          {/* Key Specs Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.74rem', color: '#334155', background: '#f8fafc', padding: '6px 8px', borderRadius: '6px', marginBottom: '12px' }}>
            <span><strong>{displayArea.toLocaleString('en-IN')}</strong> {areaUnit}</span>
            {attributes.ceilingHeightFt && (
              <>
                <span>•</span>
                <span>{attributes.ceilingHeightFt} Ft Height</span>
              </>
            )}
            {attributes.loadingDocks > 0 && (
              <>
                <span>•</span>
                <span>{attributes.loadingDocks} Docks</span>
              </>
            )}
          </div>

          {/* Poster Tag */}
          <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
            {postedAs === 'DEALER' || poster_role === 'dealer' ? (
              <>
                <Briefcase size={12} style={{ color: '#2563eb' }} />
                <span>Verified Dealer Partner</span>
              </>
            ) : (
              <>
                <User size={12} className="text-red" />
                <span>Direct Owner (0% Brokerage)</span>
              </>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: '6px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave && onToggleSave(id);
            }}
            title={isSaved ? "Saved" : "Save"}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: isSaved ? '#fff1f2' : '#ffffff',
              color: isSaved ? '#e11d48' : '#64748b',
              cursor: 'pointer'
            }}
          >
            <Heart size={14} fill={isSaved ? "#e11d48" : "none"} />
          </button>

          <button 
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => onSelectProperty && onSelectProperty(property)}
            style={{ fontWeight: 700, padding: '6px', fontSize: '0.8rem' }}
          >
            View Details
          </button>

          <button 
            type="button"
            className="btn btn-navy btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onUnlockContact && onUnlockContact(property);
            }}
            style={{ fontWeight: 700, padding: '6px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: '#004274', color: '#ffffff' }}
          >
            <PhoneCall size={12} />
            <span>Enquire</span>
          </button>
        </div>

      </div>
    </div>
  );
}
