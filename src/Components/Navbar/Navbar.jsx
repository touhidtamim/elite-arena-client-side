import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import Logo from "../Shared/Logo";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import api from "../../api/axiosInstance";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch latest user info from backend
  useEffect(() => {
    if (user?.email) {
      api
        .get(`/users/${user.email}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error("User fetch failed:", err));
    }
  }, [user]);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
    setDropdownOpen(false);
  };

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
              timer: 1200,
              showConfirmButton: false,
            });
            navigate("/");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: error.message,
            });
          });
      }
    });
  };

  const navLinksLoggedOut = [
    { name: "Home", path: "/" },
    { name: "Courts", path: "/courts" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Membership", path: "/membership" },
    { name: "About Us", path: "/about" },
  ];

  const navLinksLoggedIn = [
    { name: "Home", path: "/" },
    { name: "Courts", path: "/courts" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Membership", path: "/membership" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const navLinks = user ? navLinksLoggedIn : navLinksLoggedOut;

  const onNavLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300
        ${
          window.innerWidth < 1024
            ? "bg-gray-900"
            : isScrolled
            ? "bg-gray-900 shadow-md"
            : "bg-gray-900/50 backdrop-blur-md"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-15 lg:h-16">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          {/* Hamburger for tablet and mobile */}
          <button
            onClick={toggleDrawer}
            className="text-xl lg:hidden focus:outline-none bg-gray-800 rounded p-1.5"
            aria-label="Toggle Menu"
          >
            {drawerOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={() => setDrawerOpen(false)}>
              <Logo />
            </Link>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="hidden lg:flex gap-6 xl:gap-8 font-serif">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-1 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                  isActive ? "after:scale-x-100" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT SIDE */}
        {!user && (
          <>
            <div className="hidden lg:flex items-center gap-4 font-serif text-sm">
              <Link
                to="/login"
                className="px-4 py-1.5 rounded border border-white hover:border-yellow-400 hover:text-yellow-400 transition cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-1.5 text-white cursor-pointer transition"
              >
                Register
              </Link>
            </div>

            <div className="flex items-center gap-4 font-serif text-sm lg:hidden">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded cursor-pointer transition duration-300"
              >
                Login
              </Link>
            </div>
          </>
        )}

        {user && (
          <div className="flex items-center gap-4 sm:gap-5 relative">
            <button
              aria-label="Notifications"
              className="text-xl rounded-full hover:bg-white hover:text-black transition cursor-pointer p-1"
              onClick={() => navigate("/dashboard/announcements")}
            >
              <FiBell />
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-600 cursor-pointer"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <img
                  src={
                    userData?.image ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user.displayName || "User") +
                      "&background=3b82f6&color=fff&size=64"
                  }
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
                  <div className="px-4 py-2 border-b border-gray-700 text-sm text-gray-300 select-none">
                    {userData?.name || user.displayName || "User"}
                  </div>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-600 hover:text-white cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE & TABLET DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-50
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <Link to="/" onClick={onNavLinkClick}>
            <Logo />
          </Link>
          <button
            onClick={toggleDrawer}
            aria-label="Close Menu"
            className="p-1.5"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col gap-3 px-5 py-6 text-sm font-serif">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onNavLinkClick}
              className={({ isActive }) =>
                `py-2 px-3 border-b  transition-all duration-300 font-semibold ${
                  isActive
                    ? "bg-blue-600/30  border-gray-600"
                    : "text-gray-300 border-gray-600 hover:bg-blue-500 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {!user && (
            <Link
              to="/register"
              onClick={onNavLinkClick}
              className="mt-4 inline-block px-4 py-2.5 rounded border border-yellow-400 text-white bg-blue-800/10 hover:bg-blue-600/20 cursor-pointer text-center transition duration-300"
            >
              Register
            </Link>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
