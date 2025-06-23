import React from 'react';
import { Home, BarChart3, Users, MessageSquare, TrendingUp, User, Settings, Grid as Grid3X3 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'visitors', icon: Users, label: 'Visitors' },
    { id: 'reports', icon: MessageSquare, label: 'Reports' },
    { id: 'trends', icon: TrendingUp, label: 'Trends' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-16 md:w-20 bg-dark-200 h-screen flex flex-col items-center py-4 md:py-6 border-r border-dark-300 fixed md:relative z-50">
      {/* Logo */}
      <div className="mb-6 md:mb-8">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer">
          <Grid3X3 className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col space-y-3 md:space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 group relative ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-400 hover:text-white hover:bg-dark-300'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2 py-1 bg-dark-300 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden md:block">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;