import React, { useState } from 'react';
import { Settings, Activity, BarChart3, AlertTriangle, Search } from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [query, setQuery] = useState('');

  // Tabs for side navigation
  const tabs = [
    { id: 'admin', label: 'Admin', icon: Settings },
    { id: 'live-status', label: 'Live Status', icon: Activity },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  ];

  // Mapping for Live Status System Parameters
  const parameterMap: Record<string, string> = {
    temperature: 'temperature',
    'solar panel voltage': 'solar-panel-voltage',
    'average current': 'average-current',
    'battery charge': 'battery-charge'
  };

  const handleSearch = () => {
    if (query.trim()) {
      const searchKey = query.toLowerCase().trim();

      // Check exact match
      let targetId = parameterMap[searchKey];

      // If exact not found, try partial match
      if (!targetId) {
        const foundKey = Object.keys(parameterMap).find(key =>
          key.includes(searchKey)
        );
        if (foundKey) {
          targetId = parameterMap[foundKey];
        }
      }

      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        alert('Parameter not found!');
      }
    }
  };

  return (
    <nav className="navigation">
      {/* Logo & Title */}
      <div className="nav-header">
        <h2>Solar Plant Monitor</h2>
        <p>Control Dashboard</p>
      </div>

      {/* Search Bar */}
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search parameter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>
          <Search size={16} />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <div
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <IconComponent size={20} />
              <span>{tab.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
