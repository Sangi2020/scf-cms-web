import React, { useState, useEffect } from "react";
import { Bell, Menu, Moon, Sun, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

function Header({ onToggleSidebar, isCollapsed }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Local state for history stacks
  const [historyStack, setHistoryStack] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);

  // Track changes in location and update history stack
  useEffect(() => {
    setHistoryStack((prev) => {
      if (prev[prev.length - 1] !== location.pathname) {
        return [...prev, location.pathname];
      }
      return prev;
    });
  }, [location.pathname]);

  // Handle back navigation
  const handleBack = () => {
    if (historyStack.length > 1) {
      const newHistory = [...historyStack];
      const lastRoute = newHistory.pop();

      setHistoryStack(newHistory);
      setForwardStack((prev) => [lastRoute, ...prev]);
      navigate(newHistory[newHistory.length - 1]);
    }
  };

  // Handle forward navigation
  const handleForward = () => {
    if (forwardStack.length > 0) {
      const newForward = [...forwardStack];
      const nextRoute = newForward.shift();

      setForwardStack(newForward);
      setHistoryStack((prev) => [...prev, nextRoute]);
      navigate(nextRoute);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-base-200 shadow-lg z-30 ">
      <div className="flex items-center justify-between h-16 px-6 md:px-8">
        {/* Sidebar Toggle and Title */}
        <div className="flex items-center h-full space-x-4">
          <div
            onClick={onToggleSidebar}
            className="p-2 mr-6 hover:bg-gray-100 rounded-lg lg:hidden cursor-pointer transition-all duration-300 ease-in-out"
          >
            <Menu className="w-6 h-6 text-neutral-content" />
          </div>
          <div
            className={`text-base md:text-xl font-semibold text-neutral-content ${
              isCollapsed
                ? "pl-10 opacity-100"
                : "transition-all duration-300 ease-in-out opacity-0"
            }`}
          >
                                   <img src="https://www.scfstrategies.com/_next/image?url=%2Fimages%2Flogo.png&w=96&q=75" alt="" className="h-10 w-auto rounded-sm"/>

          </div>
        </div>

        {/* Breadcrumb and Navigation Buttons */}
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={historyStack.length <= 1}
            className="flex items-center p-2 bg-base-300 rounded-lg text-neutral-content hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BsChevronDoubleLeft className="w-5 h-5" />
            <span className="ml-1">Back</span>
          </button>

          {/* Current Route */}
          <div className="flex items-center text-sm font-medium text-neutral-content px-4">
            <span className="text-lg font-bold italic text-center capitalize">
              {location.pathname === "/"
                ? "Home"
                : location.pathname.split("/").slice(-1)[0]}
            </span>
          </div>

          {/* Forward Button */}
          <button
            onClick={handleForward}
            disabled={forwardStack.length === 0}
            className="flex items-center p-2 bg-base-300 rounded-lg text-neutral-content hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-1">Forward</span>
            <BsChevronDoubleRight className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
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

          <div className="p-2 bg-base-300 rounded-lg transition-all duration-300 ease-in-out group cursor-pointer">
            <Bell className="w-6 h-6 text-neutral-content group-hover:text-primary" />
          </div>

          <div className="p-2 bg-base-300 rounded-lg transition-all ease-in-out cursor-pointer">
            <User className="w-6 h-6 text-neutral-content hover:text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
