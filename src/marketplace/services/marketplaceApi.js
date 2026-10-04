import { SAMPLE_MARKETPLACE_PROPERTIES } from '../data/sampleMarketplaceProperties';

const API_BASE = '/api/marketplace';
const LOCAL_STORAGE_KEY_PROPS = 'aiw_marketplace_properties_v2';
const LOCAL_STORAGE_KEY_LEADS = 'aiw_marketplace_leads_v2';
const LOCAL_STORAGE_KEY_SAVED = 'aiw_marketplace_saved_ids_v2';
const LOCAL_STORAGE_KEY_USER_ROLE = 'aiw_current_user_role';

// Helper to initialize local storage
function getLocalProperties() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY_PROPS);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROPS, JSON.stringify(SAMPLE_MARKETPLACE_PROPERTIES));
      return SAMPLE_MARKETPLACE_PROPERTIES;
    }
    return JSON.parse(data);
  } catch (e) {
    return SAMPLE_MARKETPLACE_PROPERTIES;
  }
}

function saveLocalProperties(props) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROPS, JSON.stringify(props));
  } catch (e) {
    console.error('Error saving local properties:', e);
  }
}

function getLocalLeads() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY_LEADS);
    if (!data) {
      const seedLeads = [
        {
          id: "enq-sample-01",
          name: "Ramesh Logistics Director",
          phone: "+91 98840 98765",
          email: "ramesh@southcargopack.in",
          company_name: "South Cargo Pack Solutions",
          space_required: "35,000 Sq.Ft",
          move_in_date: "Within 30 Days",
          budget_psf: "₹30/sq ft",
          property_id: "aiw-prop-porur-01",
          property_title: "Prime Grade-A Distribution Warehouse near Mount-Poonamallee Trunk Road",
          property_city: "Chennai",
          property_locality: "Porur",
          property_state: "Tamil Nadu",
          buyer_role: "buyer",
          notes: "Need 6 loading dock levellers and 100 kVA dedicated transformer for immediate FMCG dispatch hub.",
          created_at: "2026-10-02T14:30:00.000Z"
        },
        {
          id: "enq-sample-02",
          name: "Vikas Engineering Works",
          phone: "+91 98765 43210",
          email: "vikas@autocomponents.in",
          company_name: "Vikas Precision Auto",
          space_required: "20,000 Sq.Ft",
          move_in_date: "Immediate",
          budget_psf: "₹4,000/sq ft (Outright Purchase)",
          property_id: "aiw-prop-porur-02",
          property_title: "Heavy Industrial Manufacturing Shed with 10T Crane Provision",
          property_city: "Chennai",
          property_locality: "Porur",
          property_state: "Tamil Nadu",
          buyer_role: "buyer",
          notes: "Looking to purchase outright for auto ancillary stamping unit. Require 200 kVA power sanction.",
          created_at: "2026-10-03T09:00:00.000Z"
        }
      ];
      localStorage.setItem(LOCAL_STORAGE_KEY_LEADS, JSON.stringify(seedLeads));
      return seedLeads;
    }
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveLocalLead(lead) {
  try {
    const leads = getLocalLeads();
    leads.unshift(lead);
    localStorage.setItem(LOCAL_STORAGE_KEY_LEADS, JSON.stringify(leads));
  } catch (e) {
    console.error('Error saving lead:', e);
  }
}

export const marketplaceApi = {
  // User Role Management (buyer | owner | dealer)
  getCurrentRole() {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY_USER_ROLE) || 'buyer';
    } catch (e) {
      return 'buyer';
    }
  },

  setCurrentRole(role) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_ROLE, role);
      window.dispatchEvent(new CustomEvent('aiw_role_changed', { detail: { role } }));
    } catch (e) {}
  },

  // Get all active approved properties (with filters query)
  async getProperties(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.purpose) queryParams.append('purpose', filters.purpose);
      if (filters.state) queryParams.append('state', filters.state);
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.locality) queryParams.append('locality', filters.locality);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.minArea) queryParams.append('minArea', filters.minArea);
      if (filters.maxArea) queryParams.append('maxArea', filters.maxArea);
      if (filters.sort) queryParams.append('sort', filters.sort);

      const res = await fetch(`${API_BASE}/properties?${queryParams.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (e) {
      // Backend fallback
    }

    // Local filtering fallback
    let list = [...getLocalProperties()].filter(p => p.approved !== false);

    // Filter by Purpose (Buy / Rent / Lease / All)
    if (filters.purpose && filters.purpose !== 'all') {
      if (filters.purpose === 'buy' || filters.purpose === 'sale') {
        list = list.filter(p => p.purpose?.toLowerCase() === 'sale' || p.purpose?.toLowerCase() === 'buy');
      } else if (filters.purpose === 'rent') {
        list = list.filter(p => p.purpose?.toLowerCase() === 'rent' || p.purpose?.toLowerCase() === 'lease');
      } else {
        list = list.filter(p => p.purpose?.toLowerCase() === filters.purpose?.toLowerCase());
      }
    }

    // Filter by State (e.g. Tamil Nadu)
    if (filters.state && filters.state !== 'All States') {
      list = list.filter(p => p.state?.toLowerCase().includes(filters.state.toLowerCase()));
    }

    // Filter by City (e.g. Chennai)
    if (filters.city && filters.city !== 'All Cities') {
      list = list.filter(p => p.city?.toLowerCase().includes(filters.city.toLowerCase()));
    }

    // Filter by Locality / Area (e.g. Porur)
    if (filters.locality && filters.locality.trim() !== '' && filters.locality !== 'All Localities') {
      list = list.filter(p => 
        p.locality?.toLowerCase().includes(filters.locality.toLowerCase()) ||
        p.title?.toLowerCase().includes(filters.locality.toLowerCase()) ||
        p.description?.toLowerCase().includes(filters.locality.toLowerCase())
      );
    }

    // Filter by Property Category / Type (Warehouse, Industrial Shed, Land, Commercial Office)
    if (filters.type && filters.type !== 'All Types') {
      list = list.filter(p => p.type?.toLowerCase() === filters.type?.toLowerCase());
    }

    // Area range
    if (filters.minArea) {
      list = list.filter(p => Number(p.area_sqft) >= Number(filters.minArea));
    }
    if (filters.maxArea) {
      list = list.filter(p => Number(p.area_sqft) <= Number(filters.maxArea));
    }

    // Budget
    if (filters.maxBudget) {
      list = list.filter(p => Number(p.price_or_rent_psf) <= Number(filters.maxBudget));
    }

    // Features / Amenities
    if (filters.features && filters.features.length > 0) {
      list = list.filter(p => 
        filters.features.every(f => p.features?.some(pf => pf.toLowerCase().includes(f.toLowerCase())))
      );
    }

    // Status
    if (filters.status && filters.status !== 'all') {
      list = list.filter(p => p.status?.toLowerCase().includes(filters.status.toLowerCase()));
    }

    // Poster Role (owner vs dealer)
    if (filters.posterRole && filters.posterRole !== 'all') {
      list = list.filter(p => p.poster_role === filters.posterRole);
    }

    // Sorting
    if (filters.sort === 'price_asc') {
      list.sort((a, b) => (a.price_or_rent_psf || 0) - (b.price_or_rent_psf || 0));
    } else if (filters.sort === 'price_desc') {
      list.sort((a, b) => (b.price_or_rent_psf || 0) - (a.price_or_rent_psf || 0));
    } else if (filters.sort === 'area_asc') {
      list.sort((a, b) => (a.area_sqft || 0) - (b.area_sqft || 0));
    } else if (filters.sort === 'area_desc') {
      list.sort((a, b) => (b.area_sqft || 0) - (a.area_sqft || 0));
    } else {
      // Default: newest
      list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    return list;
  },

  // Get single property by ID
  async getPropertyById(id) {
    try {
      const res = await fetch(`${API_BASE}/properties/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {}
    const all = getLocalProperties();
    return all.find(p => p.id === id || p._id === id) || null;
  },

  // Post property by Owner or Dealer/Agent
  async postProperty(propertyData) {
    const isDealer = propertyData.poster_role === 'dealer';
    const newProp = {
      ...propertyData,
      id: `aiw-${isDealer ? 'dealer' : 'owner'}-${Date.now()}`,
      approved: true, // Immediate publish in demo mode with verified tag
      verified: true,
      featured: true,
      created_at: new Date().toISOString()
    };

    try {
      const res = await fetch(`${API_BASE}/post-property`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProp)
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {}

    const current = getLocalProperties();
    current.unshift(newProp);
    saveLocalProperties(current);
    return { 
      success: true, 
      message: `${isDealer ? 'Dealer / Agent' : 'Owner'} property listed live across All India Classifieds!`, 
      data: newProp 
    };
  },

  // Submit Buyer Property Enquiry Form
  async submitBuyerEnquiry(enquiryData) {
    const enquiryRecord = {
      id: `enq-${Date.now()}`,
      name: enquiryData.name || 'Industrial Buyer',
      phone: enquiryData.phone || '',
      email: enquiryData.email || '',
      company_name: enquiryData.company_name || 'Individual / Business',
      space_required: enquiryData.space_required || 'Standard Unit',
      move_in_date: enquiryData.move_in_date || 'Immediate',
      budget_psf: enquiryData.budget_psf || 'As Listed',
      property_id: enquiryData.property_id || 'general',
      property_title: enquiryData.property_title || 'General Space Requirement',
      property_city: enquiryData.property_city || 'Chennai',
      property_locality: enquiryData.property_locality || 'Porur',
      property_state: enquiryData.property_state || 'Tamil Nadu',
      notes: enquiryData.notes || enquiryData.message || 'Direct buyer inspection & callback requested.',
      buyer_role: 'buyer',
      created_at: new Date().toISOString()
    };

    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryRecord)
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {}

    saveLocalLead(enquiryRecord);
    return { 
      success: true, 
      message: 'Enquiry submitted successfully! The property owner / assigned industrial desk will call you within 60 minutes.',
      data: enquiryRecord 
    };
  },

  // Get Inquiries submitted by Current Buyer
  getBuyerEnquiries(buyerPhone = '') {
    const leads = getLocalLeads();
    if (!buyerPhone) return leads.slice(0, 5);
    return leads.filter(l => l.phone === buyerPhone || l.phone?.includes(buyerPhone));
  },

  // Get Properties listed by an Owner or Dealer
  getMyListedProperties(role = 'owner') {
    const all = getLocalProperties();
    return all.filter(p => (p.poster_role || 'owner') === role);
  },

  // Get Buyer Inquiries received on Owner's or Dealer's properties
  getReceivedInquiriesForRole(role = 'owner') {
    const leads = getLocalLeads();
    return leads;
  },

  // Saved / Bookmarked Properties
  getSavedPropertyIds() {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SAVED);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  },

  toggleSaveProperty(id) {
    try {
      const current = this.getSavedPropertyIds();
      let updated;
      if (current.includes(id)) {
        updated = current.filter(item => item !== id);
      } else {
        updated = [...current, id];
      }
      localStorage.setItem(LOCAL_STORAGE_KEY_SAVED, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  },

  // Admin APIs
  async getAdminData(passkey) {
    if (passkey !== 'admin123' && passkey !== 'aiw@2026') {
      throw new Error('Invalid Admin Passkey');
    }
    const properties = getLocalProperties();
    const leads = getLocalLeads();
    return { properties, leads };
  },

  async approveProperty(id) {
    const current = getLocalProperties();
    const updated = current.map(p => {
      if (p.id === id || p._id === id) {
        return { ...p, approved: true, verified: true };
      }
      return p;
    });
    saveLocalProperties(updated);
    return { success: true };
  },

  async deleteProperty(id) {
    const current = getLocalProperties();
    const updated = current.filter(p => p.id !== id && p._id !== id);
    saveLocalProperties(updated);
    return { success: true };
  }
};
