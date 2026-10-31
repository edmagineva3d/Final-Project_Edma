import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { loadCatalogThunk, loadSavedEstimatesThunk } from '../features/thunks';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { VenueRoomSelection } from '../features/rooms/VenueRoomSelection';
import { AddonsSelection } from '../features/addons/AddonsSelection';
import { MealsSelection } from '../features/meals/MealsSelection';
import { SummaryTotalsSection } from '../components/SummaryTotalsSection';
import { ShowDetailsModal } from '../components/ShowDetailsModal';
import { SavedQuotesDrawer } from '../components/SavedQuotesDrawer';
import { Footer } from '../components/Footer';

export const PlannerPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch live catalog from backend API on mount
    dispatch(loadCatalogThunk());
    // Fetch previously saved estimates from database on mount
    dispatch(loadSavedEstimatesThunk());
  }, [dispatch]);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-frame">
      <div className="canvas-wrapper">
        <Navbar onNavigateSection={handleScrollToSection} />

        <main>
          <HeroSection onGetStarted={() => handleScrollToSection('venue-rooms')} />
          <VenueRoomSelection />
          <AddonsSelection />
          <MealsSelection />
          <SummaryTotalsSection />
        </main>

        <Footer />

        {/* Global Modals & Drawers */}
        <ShowDetailsModal />
        <SavedQuotesDrawer />
      </div>
    </div>
  );
};

