import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarNavLink from "./SidebarNavLink";
import SidebarBottomLinks from "./SidebarBottomLinks";
import { FiHome } from "react-icons/fi";
import Logo from "../../Components/Shared/Logo";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-72 bg-gray-900 text-white flex flex-col justify-between fixed h-full">
      {/* Top: Logo & Home */}
      <div>
        <div className="p-6 border-b border-gray-700">
          <Link to="/">
            <Logo />
          </Link>
          <button
            onClick={() => navigate("/")}
            className="mt-3 flex items-center text-sm text-gray-300 hover:text-white"
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
