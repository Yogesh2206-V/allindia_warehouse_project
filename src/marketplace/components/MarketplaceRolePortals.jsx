import React, { useState, useEffect } from 'react';
import { 
  User, 
  Building2, 
  Briefcase, 
  Heart, 
  MessageSquare, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { marketplaceApi } from '../services/marketplaceApi';

export default function MarketplaceRolePortals({ 
  initialRole = 'buyer', 
  onNavigatePostProperty, 
  onSelectProperty,
  onBackToList 
}) {
  const [activeTab, setActiveTab] = useState(initialRole); // 'buyer' | 'owner' | 'dealer'
  const [savedProperties, setSavedProperties] = useState([]);
  const [buyerEnquiries, setBuyerEnquiries] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [receivedEnquiries, setReceivedEnquiries] = useState([]);

  const loadData = async () => {
    try {
      const allProps = await marketplaceApi.getProperties({});
      const savedIds = marketplaceApi.getSavedPropertyIds();
      setSavedProperties(allProps.filter(p => savedIds.includes(p.id || p._id)));
      
      const bEnqs = marketplaceApi.getBuyerEnquiries();
      setBuyerEnquiries(bEnqs);

      const ownerProps = marketplaceApi.getMyListedProperties(activeTab === 'dealer' ? 'dealer' : 'owner');
      setMyListings(ownerProps.length > 0 ? ownerProps : allProps.slice(0, 3));

      const rEnqs = marketplaceApi.getReceivedInquiriesForRole(activeTab);
      setReceivedEnquiries(rEnqs);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleUpdateLeadStatus = (leadId, newStatus) => {
    const updated = receivedEnquiries.map(l => l.id === leadId ? { ...l, leadStatus: newStatus } : l);
    setReceivedEnquiries(updated);
  };

  return (
    <div className="marketplace-container" style={{ padding: '24px 16px 80px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <button 
            type="button" 
            onClick={onBackToList}
            className="btn btn-outline btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}
          >
            <ArrowLeft size={14} />
            <span>Back to Classifieds</span>
          </button>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f2744', margin: 0 }}>
            Role Portals & Management
          </h1>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
          {[
            { id: 'buyer', label: 'Buyer / Tenant', icon: User },
            { id: 'owner', label: 'Direct Owner', icon: Building2 },
            { id: 'dealer', label: 'Dealer CRM', icon: Briefcase }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  background: isActive ? '#004274' : 'transparent',
                  color: isActive ? '#ffffff' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. BUYER DASHBOARD */}
      {activeTab === 'buyer' && (
        <div>
          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
              <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Shortlisted Properties</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f2744', margin: '4px 0 0' }}>{savedProperties.length}</h3>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
              <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>My Sent Enquiries</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#004274', margin: '4px 0 0' }}>{buyerEnquiries.length}</h3>
            </div>
          </div>

          {/* Shortlisted Properties */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f2744', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={18} className="text-red" />
              Saved / Shortlisted Industrial Properties
            </h3>

            {savedProperties.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
                You have not shortlisted any properties yet. Click the heart icon on any classified to save it.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                {savedProperties.map(p => (
                  <div key={p.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px', cursor: 'pointer' }} onClick={() => onSelectProperty(p)}>
                    <img src={p.image || (p.images && p.images[0])} alt={p.title} style={{ width: 80, height: 60, borderRadius: '6px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f2744', margin: '0 0 4px', lineHeight: 1.2 }}>{p.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: '#004274', fontWeight: 800 }}>₹{p.price_or_rent_psf}/sq.ft</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Sent Enquiries */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f2744', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} className="text-red" />
              My Direct Enquiries & Lead Status
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {buyerEnquiries.map((enq, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f2744', margin: '0 0 2px' }}>{enq.property_title}</h4>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Submitted on {new Date(enq.created_at).toLocaleDateString()} • {enq.property_locality}, {enq.property_city}</span>
                  </div>
                  <span style={{ background: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                    ✓ Contact Dispatched
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. OWNER & DEALER DASHBOARD */}
      {(activeTab === 'owner' || activeTab === 'dealer') && (
        <div>
          {/* Header Action Strip */}
          <div style={{ background: '#004274', color: '#ffffff', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <span style={{ background: '#ffffff', color: '#004274', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                {activeTab === 'owner' ? 'Owner Portal' : 'Dealer CRM Dashboard'}
              </span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '6px 0 2px' }}>
                {activeTab === 'owner' ? 'Manage My Direct Properties' : 'Channel Partner & Dealer CRM Hub'}
              </h2>
              <p style={{ fontSize: '0.82rem', opacity: 0.9, margin: 0 }}>
                {activeTab === 'owner' ? 'Posting limit: 3 Active Properties • 0% Brokerage Direct Inquiries' : 'Posting limit: 10 Active Properties • Verified Badge Enabled'}
              </p>
            </div>

            <button
              type="button"
              className="btn btn-red"
              onClick={onNavigatePostProperty}
              style={{ padding: '10px 18px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <PlusCircle size={16} />
              <span>+ Post New Property</span>
            </button>
          </div>

          {/* CRM Leads Received */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f2744', marginBottom: '14px' }}>
              Buyer Inquiries Received (CRM Workflow)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {receivedEnquiries.map((lead, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '0.98rem', color: '#0f2744' }}>{lead.name}</strong>
                      <span style={{ fontSize: '0.82rem', color: '#64748b', marginLeft: '8px' }}>({lead.phone})</span>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                        Property: <strong>{lead.property_title}</strong> ({lead.property_locality})
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>CRM Status:</span>
                      <select
                        value={lead.leadStatus || 'New'}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.78rem', fontWeight: 700, background: '#ffffff', color: '#0f2744' }}
                      >
                        <option value="New">🟢 New Lead</option>
                        <option value="Contacted">🟡 Contacted</option>
                        <option value="Site Visit">🔵 Site Visit Scheduled</option>
                        <option value="Closed">🟣 Deal Closed</option>
                      </select>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: '0 0 8px', background: '#ffffff', padding: '8px', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
                    "{lead.notes || lead.message || 'Direct buyer enquiry logged.'}"
                  </p>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`tel:${lead.phone}`} className="btn btn-outline btn-sm" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                      Call Buyer ({lead.phone})
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
