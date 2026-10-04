import React, { useState, useEffect } from 'react';
import MarketplaceHomePage from './components/MarketplaceHomePage';
import MarketplaceListingPage from './components/MarketplaceListingPage';
import MarketplacePropertyDetail from './components/MarketplacePropertyDetail';
import MarketplacePostPropertyWizard from './components/MarketplacePostPropertyWizard';
import MarketplaceRolePortals from './components/MarketplaceRolePortals';
import MarketplaceAdminPanel from './components/MarketplaceAdminPanel';
import MarketplaceLeadUnlockModal from './components/MarketplaceLeadUnlockModal';
import ServicesPage from '../components/ServicesPage';
import { marketplaceApi } from './services/marketplaceApi';
import './marketplace.css';

export default function MarketplaceApp() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'listings' | 'detail' | 'post-property' | 'services' | 'portal' | 'admin'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadProperty, setLeadProperty] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [portalRole, setPortalRole] = useState('buyer');
  const [searchFilters, setSearchFilters] = useState({
    city: 'Chennai',
    state: 'Tamil Nadu',
    locality: '',
    purpose: 'all',
    type: 'All Types'
  });

  const loadData = async () => {
    const data = await marketplaceApi.getProperties({});
    setAllProperties(data);
    setSavedIds(marketplaceApi.getSavedPropertyIds());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Multi-Page Hash Router Parser
  useEffect(() => {
    const handleHashChange = async () => {
      const fullHash = window.location.hash || '#/';
      const [hashPath, hashQuery] = fullHash.split('?');

      // Parse query params if any
      const queryParams = new URLSearchParams(hashQuery || '');
      const paramCity = queryParams.get('city');
      const paramState = queryParams.get('state');
      const paramLocality = queryParams.get('locality');
      const paramPurpose = queryParams.get('purpose') || queryParams.get('dealType');
      const paramType = queryParams.get('type');
      const paramSort = queryParams.get('sort');

      if (paramCity || paramLocality || paramPurpose || paramType) {
        setSearchFilters(prev => ({
          ...prev,
          city: paramCity || prev.city,
          state: paramState || prev.state,
          locality: paramLocality !== null ? paramLocality : prev.locality,
          purpose: paramPurpose || prev.purpose,
          type: paramType || prev.type,
          sort: paramSort || prev.sort
        }));
      }

      // Check special city slug patterns like #/warehouses-in-bangalore
      if (hashPath.includes('warehouses-in-') || hashPath.includes('warehouses-for-rent-in-')) {
        const parts = hashPath.split('-');
        const cityName = parts[parts.length - 1];
        if (cityName) {
          const capitalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
          setSearchFilters(prev => ({
            ...prev,
            city: capitalizedCity,
            locality: ''
          }));
          setCurrentView('listings');
          return;
        }
      }

      if (hashPath.startsWith('#/property/')) {
        const propId = hashPath.replace('#/property/', '');
        const found = await marketplaceApi.getPropertyById(propId);
        if (found) {
          setSelectedProperty(found);
          setCurrentView('detail');
        } else {
          setCurrentView('listings');
        }
      } else if (hashPath === '#/post-property' || hashPath === '#/post-your-warehouse') {
        setCurrentView('post-property');
      } else if (hashPath === '#/services') {
        setCurrentView('services');
      } else if (hashPath.startsWith('#/portal')) {
        const role = hashPath.replace('#/portal/', '').replace('#/portal', '') || 'buyer';
        setPortalRole(role === 'owner' || role === 'dealer' ? role : 'buyer');
        setCurrentView('portal');
      } else if (hashPath === '#/admin') {
        setCurrentView('admin');
      } else if (hashPath === '#/properties' || hashPath === '#/search' || hashPath === '#/listings') {
        setCurrentView('listings');
      } else {
        // Default root view is Home Landing Page
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSearchNavigate = (filters) => {
    setSearchFilters(prev => ({
      ...prev,
      ...filters
    }));
    const query = new URLSearchParams();
    if (filters.city) query.set('city', filters.city);
    if (filters.state) query.set('state', filters.state);
    if (filters.locality) query.set('locality', filters.locality);
    if (filters.purpose) query.set('purpose', filters.purpose);
    if (filters.type && filters.type !== 'All Types') query.set('type', filters.type);

    window.location.hash = `#/search?${query.toString()}`;
    setCurrentView('listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setCurrentView('detail');
    window.location.hash = `#/property/${property.id || property._id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setCurrentView('listings');
    window.location.hash = '#/properties';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlockContact = (property) => {
    setLeadProperty(property);
    setLeadModalOpen(true);
  };

  const handleToggleSave = (id) => {
    const updated = marketplaceApi.toggleSaveProperty(id);
    setSavedIds(updated);
  };

  return (
    <div className="marketplace-app-root">
      
      {/* 1. HOME LANDING PAGE (NoBroker Style) */}
      {currentView === 'home' && (
        <MarketplaceHomePage 
          onSearchNavigate={handleSearchNavigate}
          onNavigatePostProperty={() => {
            window.location.hash = '#/post-property';
          }}
          onSelectProperty={handleSelectProperty}
          featuredProperties={allProperties.filter(p => p.featured)}
        />
      )}

      {/* 2. SEARCH & LISTINGS RESULTS PAGE */}
      {currentView === 'listings' && (
        <MarketplaceListingPage 
          initialFilters={searchFilters}
          onSelectProperty={handleSelectProperty}
          onUnlockContact={handleUnlockContact}
          onNavigatePostProperty={() => {
            window.location.hash = '#/post-property';
          }}
        />
      )}

      {/* 3. PROPERTY DETAIL PAGE */}
      {currentView === 'detail' && selectedProperty && (
        <MarketplacePropertyDetail 
          property={selectedProperty}
          allProperties={allProperties}
          onBackToList={handleBackToList}
          onUnlockContact={handleUnlockContact}
          onSelectProperty={handleSelectProperty}
          isSaved={savedIds.includes(selectedProperty.id || selectedProperty._id)}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* 4. POST PROPERTY WIZARD PAGE */}
      {currentView === 'post-property' && (
        <MarketplacePostPropertyWizard 
          onComplete={handleBackToList}
          onCancel={handleNavigateHome}
        />
      )}

      {/* 5. SERVICES PAGE */}
      {currentView === 'services' && (
        <ServicesPage onNavigateHome={handleNavigateHome} />
      )}

      {/* 6. ROLE PORTALS (Owner / Buyer) */}
      {currentView === 'portal' && (
        <MarketplaceRolePortals 
          initialRole={portalRole}
          onNavigatePostProperty={() => {
            window.location.hash = '#/post-property';
          }}
          onSelectProperty={handleSelectProperty}
          onBackToList={handleBackToList}
        />
      )}

      {/* 7. ADMIN MODERATION PANEL */}
      {currentView === 'admin' && (
        <MarketplaceAdminPanel 
          onBack={handleNavigateHome}
        />
      )}

      {/* 8. LEAD CONTACT UNLOCK MODAL */}
      {leadModalOpen && leadProperty && (
        <MarketplaceLeadUnlockModal 
          isOpen={leadModalOpen}
          property={leadProperty}
          onClose={() => setLeadModalOpen(false)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}
