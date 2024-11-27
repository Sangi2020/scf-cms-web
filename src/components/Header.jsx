import React from "react";
import { Bell, Menu, Moon, Sun, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { BsChevronDoubleLeft } from "react-icons/bs";

function Header({ onToggleSidebar, isCollapsed }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Navigate between routes

  // Generate breadcrumb from the current path
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <header className="fixed top-0 left-0 right-0 bg-base-200 shadow-lg z-30 border-b border-base-300">
      <div className="flex items-center justify-between h-16 px-6 md:px-8">
        {/* Sidebar Toggle and Title */}
        <div className="flex items-center space-x-4">
          <div
            onClick={onToggleSidebar}
            className="p-2 mr-6 hover:bg-gray-100 rounded-lg lg:hidden cursor-pointer transition-all duration-300 ease-in-out"
          >
            <Menu className="w-6 h-6 text-neutral-content" />
          </div>
          <h1
            className={`text-base md:text-xl font-semibold text-neutral-content ${
              isCollapsed ? "pl-16 opacity-100" : "transition-all duration-300 ease-in-out opacity-0"
            }`}
          >
            SCF Admin
          </h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)} // Go back to the previous route
            className="text-sm font-medium text-neutral-content hover:underline hover:text-primary"
          >
            &lt; Back
          </button>
          <div className="flex items-center text-sm font-medium text-neutral-content space-x-1">
            {pathSegments.map((segment, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <span className="mx-1">&gt;</span>}
                <span
                  className="capitalize hover:underline cursor-pointer hover:text-primary"
                  onClick={() =>
                    navigate("/" + pathSegments.slice(0, index + 1).join("/"))
                  }
                >
                  {segment}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <div
            className="p-2 bg-base-300 rounded-lg transition-all duration-300 ease-in-out group cursor-pointer"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="w-6 h-6 text-neutral-content group-hover:text-info" />
            ) : (
              <Sun className="w-6 h-6 text-neutral-content group-hover:text-warning" />
            )}
          </div>

          {/* Notification Icon */}
          <div className="p-2 bg-base-300 rounded-lg transition-all duration-300 ease-in-out group cursor-pointer">
            <Bell className="w-6 h-6 text-neutral-content group-hover:text-primary" />
          </div>

          {/* User Profile Icon */}
          <div className="p-2 bg-base-300 rounded-lg transition-all ease-in-out cursor-pointer">
            <User className="w-6 h-6 text-neutral-content hover:text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
