import React from 'react';
import { Settings, Activity, BarChart3, AlertTriangle } from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'admin', label: 'Admin', icon: Settings },
    { id: 'live-status', label: 'Live Status', icon: Activity },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  ];

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h2>Plant Monitor</h2>
        <p>Control Dashboard</p>
      </div>
      <div className="nav-tabs">
        {tabs.map(tab => {
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