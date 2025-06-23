import React, { useState } from 'react';
import { Search, Bell, User, Settings, BarChart3, Users, FileText, TrendingUp, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigationItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', active: true },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'visitors', icon: Users, label: 'Visitors' },
    { id: 'reports', icon: FileText, label: 'Reports' },
  ];

  const notifications = [
    { id: 1, message: 'New visitor RZ1730B entered', time: '2 min ago', type: 'info' },
    { id: 2, message: 'Weekly report is ready', time: '1 hour ago', type: 'success' },
    { id: 3, message: 'Camera offline at Gate B', time: '3 hours ago', type: 'warning' },
  ];

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Smart Campus</h1>
                <p className="text-xs text-gray-300">Security Dashboard</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    item.active
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden sm:block">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                  isSearchFocused ? 'text-blue-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-64 bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50">
                  <div className="p-4 border-b border-white/20">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
                        <p className="text-white text-sm">{notification.message}</p>
                        <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-3 hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">AJ</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-white font-medium text-sm">Aditya Jaiswal</p>
                  <p className="text-gray-400 text-xs">Administrator</p>
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50">
                  <div className="p-4 border-b border-white/20">
                    <p className="text-white font-medium">Aditya Jaiswal</p>
                    <p className="text-gray-400 text-sm">Administrator</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <hr className="border-white/20 my-2" />
                    <button className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-white/20 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      item.active
                        ? 'bg-white/20 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        ></div>
      )}
    </header>
  );
};

export default Header;