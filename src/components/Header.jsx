import { Bell, Menu, Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";

function Header({ onToggleSidebar , isCollapsed}) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-base-200 shadow-lg z-30 border-b border-base-300">
      <div className="flex items-center justify-between h-16 px-6 md:px-8">
      <div className="flex items-center space-x-4">
          <div
            onClick={onToggleSidebar}
            className="p-2 mr-6 hover:bg-gray-100 rounded-lg lg:hidden cursor-pointer transition-all duration-300 ease-in-out"
          >
            <Menu className="w-6 h-6 text-neutral-content" />
          </div>

          {/* Title with conditional margin based on isCollapsed */}
          <h1 className={`text-base md:text-xl font-semibold text-neutral-content 
              ${isCollapsed ? 'pl-16' : 'transition-all duration-300 ease-in-out'}
              ${isCollapsed ? 'opacity-100' : 'opacity-0'}`}>
            SCF Admin
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <div className="p-2 bg-base-300 rounded-lg transition-all duration-300 ease-in-out group cursor-pointer">
            {/* Dark Theme Icon (Moon) */}
            {theme === 'light' && (
              <div
                onClick={() => handleThemeChange('dark')}
                className="swap-on fill-current text-neutral-content"
              >
                <Moon className="w-6 h-6  group-hover:text-info " />
              </div>
            )}
            {/* Light Theme Icon (Sun) */}
            {theme === 'dark' && (
              <div
                onClick={() => handleThemeChange('light')}
                className="swap-off fill-current text-neutral-content"
              >
                <Sun className="w-6 h-6 group-hover:text-warning " />
              </div>
            )}
          </div>

          {/* Notification Icon */}
          <div className="p-2  bg-base-300 rounded-lg transition-all duration-300 ease-in-out group cursor-pointer">
            <Bell className="w-6 h-6 text-neutral-content group-hover:text-primary " />
          </div>

          {/* User Profile Icon */}
          <div className="p-2  bg-base-300 rounded-lg transition-all  ease-in-out cursor-pointer">
            <User className="w-6 h-6 text-neutral-content hover:text-primary " />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;