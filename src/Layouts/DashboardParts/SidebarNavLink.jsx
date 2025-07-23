import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiSettings,
  FiUser,
  FiPlusSquare,
  FiClock,
  FiTag,
  FiCheckSquare,
} from "react-icons/fi";
import { MdCampaign, MdOutlineManageAccounts } from "react-icons/md";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid />,
    exact: true,
  },
  {
    name: "Add Court",
    path: "/dashboard/courts/add",
    icon: <FiPlusSquare />,
  },
  {
    name: "Manage Courts",
    path: "/dashboard/courts/manage",
    icon: <FiSettings />,
  },
  {
    name: "Pending Bookings",
    path: "/dashboard/bookings/pending",
    icon: <FiClock />,
  },
  {
    name: "Bookings Approval",
    path: "/dashboard/bookings/approval",
    icon: <FiCheckSquare />,
  },
  {
    name: "Approve Bookings",
    path: "/dashboard/bookings/approve",
    icon: <FiCheckSquare />,
  },

  {
    name: "Confirm Bookings",
    path: "/dashboard/bookings/confirm",
    icon: <FiCheckSquare />,
  },
  {
    name: "Manage Bookings",
    path: "/dashboard/bookings/manage",
    icon: <FiSettings />,
  },

  {
    name: "Payment History",
    path: "/dashboard/payments/history",
    icon: <FiTag />,
  },

  {
    name: "Manage Members",
    path: "/dashboard/members",
    icon: <FiUser />,
  },
  {
    name: "All Users",
    path: "/dashboard/users",
    icon: <FiUser />,
  },
  {
    name: "Manage Coupons",
    path: "/dashboard/coupons/manage",
    icon: <FiTag />,
  },
  {
    name: "Announcement",
    path: "/dashboard/announcements",
    icon: <MdCampaign />,
  },
  {
    name: "Manage Announcement",
    path: "/dashboard/announcements/manage",
    icon: <MdOutlineManageAccounts />,
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
