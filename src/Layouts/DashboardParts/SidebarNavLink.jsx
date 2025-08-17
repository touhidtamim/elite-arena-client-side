import React, { useContext } from "react";
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
import { AuthContext } from "../../Provider/AuthProvider";
import useUserRole from "../../hooks/useUserRole";

const allNavItems = [
  {
    name: "Overview",
    path: "/dashboard/overview",
    icon: <FiGrid />,
    roles: ["admin", "member", "user"],
  },
  {
    name: "Add Court",
    path: "/dashboard/courts/add",
    icon: <FiPlusSquare />,
    roles: ["admin"],
  },
  {
    name: "Manage Courts",
    path: "/dashboard/courts/manage",
    icon: <FiSettings />,
    roles: ["admin"],
  },
  {
    name: "Pending Bookings",
    path: "/dashboard/bookings/pending",
    icon: <FiClock />,
    roles: ["user", "member"],
  },
  {
    name: "Bookings Approval",
    path: "/dashboard/bookings/approval",
    icon: <FiCheckSquare />,
    roles: ["admin"],
  },
  {
    name: "Approve Bookings",
    path: "/dashboard/bookings/approve",
    icon: <FiCheckSquare />,
    roles: ["member"],
  },
  {
    name: "Confirm Bookings",
    path: "/dashboard/bookings/confirm",
    icon: <FiCheckSquare />,
    roles: ["member"],
  },
  {
    name: "Manage Bookings",
    path: "/dashboard/bookings/manage",
    icon: <FiSettings />,
    roles: ["admin"],
  },
  {
    name: "Payment History",
    path: "/dashboard/payments/history",
    icon: <FiTag />,
    roles: ["member"],
  },
  {
    name: "Manage Members",
    path: "/dashboard/members",
    icon: <FiUser />,
    roles: ["admin"],
  },
  {
    name: "All Users",
    path: "/dashboard/users",
    icon: <FiUser />,
    roles: ["admin"],
  },
  {
    name: "Manage Coupons",
    path: "/dashboard/coupons/manage",
    icon: <FiTag />,
    roles: ["admin"],
  },
  {
    name: "Announcement",
    path: "/dashboard/announcements",
    icon: <MdCampaign />,
    roles: ["member", "user"],
  },
  {
    name: "Manage Announcement",
    path: "/dashboard/announcements/manage",
    icon: <MdOutlineManageAccounts />,
    roles: ["admin"],
  },
];

const SidebarNavLink = () => {
  const { user } = useContext(AuthContext);
  const { role, isLoading } = useUserRole(user?.email);

  if (isLoading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  const filteredNavItems = allNavItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <nav className="mt-4 space-y-1 px-4">
      {filteredNavItems.map((item) => (
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
