import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const SidebarBottomLinks = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      text: "Log out of your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged out",
              text: "You have been successfully logged out.",
              timer: 1000,
              showConfirmButton: false,
            }).then(() => {
              navigate("/");
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: error.message || "Something went wrong during logout.",
            });
          });
      }
    });
  };

  return (
    <div className="mb-4 px-4 space-y-1 border-t border-gray-700 pt-2">
      <NavLink
        to="/dashboard/profile"
        end
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-md transition ${
            isActive
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`
        }
      >
        <FiUser /> My Profile
      </NavLink>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-md text-gray-400 hover:text-white hover:bg-red-600 transition duration-200"
      >
        <FiLogOut /> Logout
      </button>
    </div>
  );
};

export default SidebarBottomLinks;
