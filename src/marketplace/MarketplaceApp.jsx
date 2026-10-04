import React, { useState, useEffect } from 'react';
import MarketplaceListingPage from './components/MarketplaceListingPage';
import MarketplacePropertyDetail from './components/MarketplacePropertyDetail';
import MarketplacePostPropertyWizard from './components/MarketplacePostPropertyWizard';
import MarketplaceRolePortals from './components/MarketplaceRolePortals';
import MarketplaceAdminPanel from './components/MarketplaceAdminPanel';
import MarketplaceLeadUnlockModal from './components/MarketplaceLeadUnlockModal';
import { marketplaceApi } from './services/marketplaceApi';
import './marketplace.css';

export default function MarketplaceApp({ initialView = 'listings' }) {
  const [currentView, setCurrentView] = useState(initialView); // 'listings' | 'detail' | 'post-property' | 'portal' | 'admin'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadProperty, setLeadProperty] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [portalRole, setPortalRole] = useState('buyer');

  const loadData = async () => {
    const data = await marketplaceApi.getProperties({});
    setAllProperties(data);
    setSavedIds(marketplaceApi.getSavedPropertyIds());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Hash change routing support (e.g. #/properties, #/property/101, #/post-property, #/portal/owner, #/admin)
  useEffect(() => {
    const handleHashChange = async () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/property/')) {
        const propId = hash.replace('#/property/', '');
        const found = await marketplaceApi.getPropertyById(propId);
        if (found) {
          setSelectedProperty(found);
          setCurrentView('detail');
        }
      } else if (hash === '#/post-property') {
        setCurrentView('post-property');
      } else if (hash.startsWith('#/portal')) {
        const role = hash.replace('#/portal/', '').replace('#/portal', '') || 'buyer';
        setPortalRole(role === 'owner' || role === 'dealer' ? role : 'buyer');
        setCurrentView('portal');
      } else if (hash === '#/admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('listings');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
      
      {/* 1. Main View Switcher */}
      {currentView === 'listings' && (
        <MarketplaceListingPage 
          onSelectProperty={handleSelectProperty}
          onUnlockContact={handleUnlockContact}
          onNavigatePostProperty={() => {
            setCurrentView('post-property');
            window.location.hash = '#/post-property';
          }}
        />
      )}

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

      {currentView === 'post-property' && (
        <MarketplacePostPropertyWizard 
          onComplete={handleBackToList}
          onCancel={handleBackToList}
        />
      )}

      {currentView === 'portal' && (
        <MarketplaceRolePortals 
          initialRole={portalRole}
          onNavigatePostProperty={() => {
            setCurrentView('post-property');
            window.location.hash = '#/post-property';
          }}
          onSelectProperty={handleSelectProperty}
          onBackToList={handleBackToList}
        />
      )}

      {currentView === 'admin' && (
        <MarketplaceAdminPanel 
          onBack={handleBackToList}
        />
      )}

      {/* 2. Lead Contact Unlock / Property Enquiry Modal */}
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
