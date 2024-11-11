import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Users, Settings, BarChart2, FileText, Menu, Bell, User, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Sidebar Component
function Sidebar({ isOpen, onClose }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigation = [
    { name: 'Overview', path: '/dashboard', icon: Home },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Reports', path: '/dashboard/reports', icon: FileText },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white/90 backdrop-blur-md border-r border-gray-200 
          transition-all duration-300 ease-in-out shadow-sm
          ${isCollapsed ? 'w-16' : 'w-64'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          {!isCollapsed && (
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SCF Admin
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 ml-auto hover:bg-gray-100 rounded-full transition-colors lg:flex hidden"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button onClick={onClose} className="lg:hidden p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 mt-2 rounded-lg transition-all duration-200 group
                ${isCollapsed ? 'justify-center' : ''} 
                ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className={`w-5 h-5 ${!isCollapsed && 'mr-3'}`} />
              {!isCollapsed && (
                <span className="font-medium">{item.name}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

// Header Component
function Header({ onToggleSidebar, isCollapsed }) {
  return (
    <header className="fixed top-0 right-0 left-0 bg-white/90 backdrop-blur-md shadow-sm z-30">
      <div className={`flex items-center justify-between h-16 px-4 transition-all duration-300
        ${isCollapsed ? 'lg:pl-24' : 'lg:pl-72'}`}>
        <div className="flex items-center">
          <button 
            onClick={onToggleSidebar}
            className="p-1 mr-4 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold lg:hidden">SCF Admin</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

// Dashboard Layout Component
function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Close sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen  w-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main content area */}
        <Header 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isCollapsed={isCollapsed}
        />
        
      
        <main className={`pt-16 w-full transition-all duration-300
          ${isCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
          <div className="w-full p-4 md:p-6">
            <Outlet />
          </div>
        </main>
     
    </div>
  );
}

export default DashboardLayout;