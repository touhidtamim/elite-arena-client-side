import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./DashboardParts/Sidebar";

const DashboardLayouts = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayouts;
