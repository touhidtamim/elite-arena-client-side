import React from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";

const bottomLinks = [
  { name: "My Profile", path: "/dashboard/profile", icon: <FiUser /> },
  { name: "Logout", path: "/logout", icon: <FiLogOut /> },
];

const SidebarBottomLinks = () => {
  return (
    <div className="mb-4 px-4 space-y-1">
      {bottomLinks.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          {item.icon} {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarBottomLinks;
