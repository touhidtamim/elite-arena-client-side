import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../Shared/Logo"; // Your custom logo component

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courts", path: "/courts" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Membership", path: "/membership" },
    { name: "About Us", path: "/about" },
  ];

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo />

        {/* Middle: NavLinks for medium & up */}
        <div className="hidden lg:flex gap-5 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                  isActive ? "after:scale-x-100" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right: Auth buttons for logged-out state */}
        <div className="hidden md:flex items-center gap-4 py-3">
          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white font-semibold"
          >
            Join
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <button onClick={toggleDrawer} className="md:hidden text-xl">
          {drawerOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <Logo />
          <button onClick={toggleDrawer}>
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={toggleDrawer}
              className={({ isActive }) =>
                `py-2 border-b border-gray-700 ${
                  isActive ? "text-blue-400" : "hover:text-blue-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/login" onClick={toggleDrawer}>
            Login
          </Link>
          <Link to="/register" onClick={toggleDrawer}>
            Join
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
