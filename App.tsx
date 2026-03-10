import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Introduction from './components/Introduction';
import TreatmentList from './components/TreatmentList';
import TreatmentPage from './components/TreatmentPage';
import Gallery from './components/Gallery';
import Specialization from './components/Specialization';
import LocationPage from './components/LocationPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import YoutubeSection from './components/YoutubeSection';
import BlogSection from './components/BlogSection';
import Popup from './components/Popup';
import AdminPage from './components/AdminPage';
import LineButton from './components/LineButton';

function App() {
  // /admin 경로면 어드민 페이지 표시
  if (window.location.pathname === '/admin') {
    return <AdminPage />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTreatmentId, setActiveTreatmentId] = useState<string | null>(null);
  const [showLocation, setShowLocation] = useState(false);

  const handleTreatmentSelect = (id: string) => {
    setActiveTreatmentId(id);
    window.scrollTo(0, 0);
  };

  const handleTreatmentBack = () => {
    setActiveTreatmentId(null);
    setShowLocation(false);
    window.scrollTo(0, 0);
  };

  const handleShowLocation = () => {
    setShowLocation(true);
    setActiveTreatmentId(null);
    window.scrollTo(0, 0);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col relative">
        <Navigation
          onOpenAdmin={() => window.location.href = '/admin'}
          onTreatmentSelect={handleTreatmentSelect}
          onNavigateHome={handleTreatmentBack}
          onNavigateLocation={handleShowLocation}
        />

        <main className="flex-grow">
          {activeTreatmentId ? (
            <TreatmentPage id={activeTreatmentId} onBack={handleTreatmentBack} />
          ) : showLocation ? (
            <LocationPage onBack={handleTreatmentBack} />
          ) : (
            <>
              <Hero />
              <Introduction />
              <Services />
              <TreatmentList onTreatmentSelect={handleTreatmentSelect} />
              <Gallery />
              <Specialization />
              <YoutubeSection />
              <BlogSection />
              <Contact />
            </>
          )}
        </main>

        {!activeTreatmentId && <Footer />}

        <Popup />
        <LineButton />

      </div>
    </LanguageProvider>
  );
}

export default App;
