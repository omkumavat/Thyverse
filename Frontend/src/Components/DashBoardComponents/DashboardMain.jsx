import React, { useState } from 'react';
import { Menu, X, Home, Pill, Ruler, Activity, LineChart, Settings } from 'lucide-react';
import Dashboard from './Dashboard';
import Medications from './Medications';
import Measurements from './Measurements';
import Vitals from './Vitals';
import SettingsPanel from './SettingsPanel';
import ThyroidPanel from "./ThyroidPanel"
const DashboardMain = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'medications', label: 'Medications', icon: <Pill size={20} /> },
    { id: 'measurements', label: 'Measurements', icon: <Ruler size={20} /> },
    { id: 'vitals', label: 'Vitals', icon: <Activity size={20} /> },
    { id: 'thyroid', label: 'Thyroid Panel', icon: <LineChart size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className="p-6"><Dashboard/></div>;
      case 'medications':
        return <div className="p-6"><Medications/></div>;
      case 'measurements':
        return <div className="p-6"><Measurements/></div>;
      case 'vitals':
        return <div className="p-6"><Vitals/></div>;
      case 'thyroid':
        return <div className="p-6"><ThyroidPanel/></div>;
      case 'settings':
        return <div className="p-6"><SettingsPanel/></div>;
      default:
        return <div className="p-6"><Dashboard/></div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile hamburger menu button */}
      <div className="md:hidden fixed top-0 left-0 p-4 z-20">
        <button 
          onClick={toggleSidebar}
          className="p-2 bg-white rounded-md shadow-md"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar navigation */}
      <div 
        className={`fixed md:relative w-64 h-full bg-white shadow-md z-10 transition-all duration-300 ${
          isSidebarOpen ? 'left-0' : '-left-64 md:left-0'
        }`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">Health Dashboard</h1>
        </div>

        <nav className="p-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto ml-0 md:ml-64 pt-16 md:pt-0">
        {renderTabContent()}
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardMain;