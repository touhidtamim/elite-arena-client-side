import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavLink from "./SidebarNavLink";
import SidebarBottomLinks from "./SidebarBottomLinks";
import { FiHome } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between fixed h-full">
      {/* Top: Logo & Home */}
      <div>
        <div className="p-6 border-b border-gray-700">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Elite Arena
          </h1>
          <button
            onClick={() => navigate("/")}
            className="mt-2 flex items-center text-sm text-gray-300 hover:text-white"
          >
            <FiHome className="mr-1" /> Home
          </button>
        </div>

        {/* Main Navigation */}
        <SidebarNavLink />
      </div>

      {/* Bottom Links */}
      <SidebarBottomLinks />
    </aside>
  );
};

export default Sidebar;
