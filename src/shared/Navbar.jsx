import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import useAuthRedirect from "../components/Auth/useAuthRedirect";

export default function Navbar() {
  const { goToLogin } = useAuthRedirect();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // ✅ Detect active route

  useEffect(() => {
    const token = localStorage.getItem("Usertoken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Usertoken");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMenuOpen(false); // Close menu when link is clicked
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Combo Products", path: "/combo-products" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <nav className="bg-white text-gray-900 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center px-5 md:px-20 py-4 relative">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Company Logo" className="h-10 w-auto" />
        </a>

        {/* Desktop Links */}
        <ul className="hidden font-SpaceGrotesk tracking-wider lg:flex gap-8 items-center font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                className={`px-3 py-2 rounded-md transition duration-200 ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "hover:text-primary"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Login / My Account */}
        <div className="hidden lg:block relative">
          {!isLoggedIn ? (
            <a
              onClick={goToLogin}
              className="border border-primary hover:bg-primary font-SpaceGrotesk tracking-widest text-primary hover:text-white cursor-pointer px-4 py-2 rounded transition"
            >
              Login
            </a>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-primary text-white px-4 py-2 rounded flex items-center gap-1 transition"
              >
                My Account ▾
              </button>

              <ul
                className={`absolute right-0 mt-2 w-44 bg-white border border-gray-200 text-gray-800 rounded shadow-lg transition-all duration-200 origin-top-right ${
                  dropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Profile</li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-900 text-3xl focus:outline-none relative w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiX />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiMenu />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white absolute min-h-screen top-full left-0 w-full shadow-lg transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-w-full opacity-100 py-4" : "max-w-0 opacity-0 py-0"
        }`}
      >
        <ul className="flex flex-col justify-between items-start h-full gap-10 tracking-widest px-6 text-gray-900 font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                onClick={handleLinkClick}
                className={`px-4 py-2 rounded-md transition duration-200`}
              >
                {item.name}
              </a>
            </li>
          ))}

          {!isLoggedIn ? (
            <li className="w-full">
              <button
                onClick={()=>{handleLinkClick(); goToLogin()}}
                className="bg-primary font-SpaceGrotesk tracking-widest cursor-pointer w-full text-white px-4 py-2 rounded block text-center"
              >
                Login
              </button>
            </li>
          ) : (
            <>
              <li>
                <a
                  href="/orders"
                  onClick={handleLinkClick}
                  className="hover:text-amber-500 block"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  onClick={handleLinkClick}
                  className="hover:text-amber-500 block"
                >
                  My Profile
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
