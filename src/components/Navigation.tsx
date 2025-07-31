import React, { useState } from 'react';
import { Settings, Activity, BarChart3, AlertTriangle, ChevronDown, Search } from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Tabs for navigation
  const tabs = [
    { id: 'admin', label: 'Admin', icon: Settings },
    { id: 'live-status', label: 'Live Status', icon: Activity },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  ];

  // Map tab IDs to labels for dropdown button text
  const tabLabels: Record<string, string> = {
    admin: 'Admin',
    'live-status': 'Live Status',
    reports: 'Reports',
    alerts: 'Alerts',
  };

  // Parameter map for search
  const parameterMap: Record<string, string> = {
    temperature: 'temperature',
    'solar panel voltage': 'solar-panel-voltage',
    'average current': 'average-current',
    'battery charge': 'battery-charge'
  };

  const handleSearch = () => {
    if (query.trim()) {
      const searchKey = query.toLowerCase().trim();

      // Exact match
      let targetId = parameterMap[searchKey];

      // Partial match
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
    <>
      {/* Sidebar for Desktop */}
      <nav className="navigation desktop-nav">
        <div className="nav-header">
          <h2>Solar Plant Monitor</h2>
          <p>Control Dashboard</p>
        </div>

        {/* Search Bar in Desktop */}
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

        {/* Tabs */}
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

      {/* Dropdown for Mobile */}
      <div className="mobile-dropdown">
        <button
          className="dropdown-btn"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {tabLabels[activeTab] || 'Admin'} <ChevronDown size={16} />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`dropdown-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  onTabChange(tab.id);
                  setDropdownOpen(false);
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
