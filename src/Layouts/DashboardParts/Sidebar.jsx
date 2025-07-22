import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarNavLink from "./SidebarNavLink";
import SidebarBottomLinks from "./SidebarBottomLinks";
import { FiHome } from "react-icons/fi";
import Logo from "../../Components/Shared/Logo";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-72 bg-gray-900 text-white flex flex-col fixed h-full">
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

      {/* Scrollable Navigation Links */}
      <div className="flex-1 overflow-y-auto py-2">
        <SidebarNavLink />
      </div>

      {/* Fixed Bottom Section */}
      <div className="flex-none">
        <SidebarBottomLinks />
      </div>
    </aside>
  );
};

export default Sidebar;
