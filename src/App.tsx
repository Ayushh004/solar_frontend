import React, { useState } from 'react';
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

  const updateCityZone = (city: string, zone: string) => {
    setAppState({ city, zone });
  };

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
      <main className="main-content">
        {renderContent()}
      </main>
      <StatusBar />
    </div>
  );
}

export default App;