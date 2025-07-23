import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "./DashboardParts/Sidebar";

const DashboardLayouts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth >= 1024) return;

      const sidebar = document.querySelector(".sidebar");
      const menuButton = document.querySelector(".menu-button");

      if (
        isSidebarOpen &&
        sidebar &&
        menuButton &&
        !sidebar.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-800">
      {/* Sidebar - fixed on all screen sizes */}
      <div
        className={`sidebar fixed inset-y-0 left-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform duration-300 ease-in-out w-72 bg-gray-900`}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 min-w-0 min-h-screen overflow-y-auto lg:ml-72 lg:pt-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 bg-gray-900 p-4 flex items-center justify-between">
          <h1 className="text-white font-serif font-semibold">
            Elite <span className="text-yellow-400">Arena</span> Dashboard
          </h1>
          <button
            className="menu-button text-white p-1"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar menu"
          >
            {isSidebarOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayouts;
