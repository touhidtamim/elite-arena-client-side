import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarNavLink from "./SidebarNavLink";
import SidebarBottomLinks from "./SidebarBottomLinks";
import { FiHome } from "react-icons/fi";
import Logo from "../../Components/Shared/Logo";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-72 bg-gray-900 text-white flex flex-col fixed h-screen top-0 left-0 z-50">
      {/* Fixed Top Section */}
      <div className="flex-none">
        <div className="p-6 border-b border-gray-700">
          <Link to="/">
            <Logo />
          </Link>
          <button
            onClick={() => navigate("/")}
            className="mt-3 ml-1.5 flex items-center text-medium text-gray-300 hover:text-white"
          >
            <FiHome className="mr-1" /> Home
          </button>
        </div>
      </div>

      {/* Scrollable Middle Nav */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        <SidebarNavLink />
      </div>

      {/* Fixed Bottom Section */}
      <div className="flex-none border-t border-gray-700">
        <SidebarBottomLinks />
      </div>
    </aside>
  );
};

export default Sidebar;
