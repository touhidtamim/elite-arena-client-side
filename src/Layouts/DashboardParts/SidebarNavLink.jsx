import React from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiSettings, FiUser, FiPlusSquare } from "react-icons/fi";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid />,
    exact: true, // use 'end' for this one
  },
  {
    name: "Add Court",
    path: "/dashboard/courts/add",
    icon: <FiPlusSquare />,
  },
  {
    name: "Manage Courts",
    path: "/dashboard/courts",
    icon: <FiSettings />,
  },
  {
    name: "Bookings",
    path: "/dashboard/bookings",
    icon: <FiGrid />,
  },
  {
    name: "Members",
    path: "/dashboard/members",
    icon: <FiUser />,
  },
];

const SidebarNavLink = () => {
  return (
    <nav className="mt-4 space-y-1 px-4">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          end={item.exact || false}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default SidebarNavLink;
