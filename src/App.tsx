import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import AdminPanel from './components/AdminPanel';
import LiveStatus from './components/LiveStatus';
import Reports from './components/Reports';
import Alerts from './components/Alerts';
import StatusBar from './components/StatusBar';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('admin');
  const [appState, setAppState] = useState({
    city: null,
    zone: null
  });

  // Dynamic bottom padding for content
  const [bottomPadding, setBottomPadding] = useState(100); // default value
  const statusBarRef = useRef<HTMLDivElement>(null);

  // Measure StatusBar height on mount & window resize
  useEffect(() => {
    const updatePadding = () => {
      if (statusBarRef.current) {
        const height = statusBarRef.current.offsetHeight;
        setBottomPadding(height + 30); // 30px extra spacing
      }
    };

    updatePadding(); // initial measure
    window.addEventListener('resize', updatePadding);

    return () => {
      window.removeEventListener('resize', updatePadding);
    };
  }, []);

  // Update city & zone from Admin Panel
  const updateCityZone = (city: string, zone: string) => {
    setAppState({ city, zone });
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'admin':
        return <AdminPanel onCityZoneUpdate={updateCityZone} />;
      case 'live-status':
        return <LiveStatus cityZone={appState} />;
      case 'reports':
        return <Reports />;
      case 'alerts':
        return <Alerts />;
      default:
        return <AdminPanel onCityZoneUpdate={updateCityZone} />;
    }
  };

  return (
    <div className="app-container">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main
        className="main-content"
        style={{ paddingBottom: `${bottomPadding}px` }}
      >
        {renderContent()}
      </main>
      <div ref={statusBarRef}>
        <StatusBar />
      </div>
    </div>
  );
}

export default App;
