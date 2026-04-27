import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  // ✅ use navigate from context ONLY
  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();
  const { signout } = useAuth();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>

      <div className="flex items-center justify-between h-20 px-6 md:px-16 lg:px-24">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          <span className={isScrolled ? "text-gray-900" : "text-white"}>
            SukoonStay
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`text-sm transition ${
                isScrolled
                  ? "text-gray-700 hover:text-black"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {user && (
            <button
              onClick={() =>
                isOwner ? navigate("/owner") : setShowHotelReg(true)
              }
              className={`px-5 py-1.5 rounded-full border text-sm transition ${
                isScrolled
                  ? "border-gray-700 text-gray-700 hover:bg-black hover:text-white"
                  : "border-white/80 text-white hover:bg-white hover:text-black"
              }`}
            >
              {isOwner ? "Dashboard" : "List Your Hotel"}
            </button>
          )}
        </div>

        {/* Search + Auth */}
        <div className="hidden md:flex items-center gap-4">

          {/* Search */}
          <button
            onClick={() => navigate("/rooms")}
            className={`p-2 rounded-full transition ${
              isScrolled
                ? "text-gray-700 hover:text-black"
                : "text-white hover:text-white/80"
            }`}
          >
            🔍
          </button>

          {/* Logged Out */}
          {!user && (
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-2 rounded-full text-sm bg-black text-white hover:bg-black/90 transition"
            >
              Login
            </button>
          )}

          {/* Logged In */}
          {user && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/my-bookings")}
                className="text-sm px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition"
              >
                My Bookings
              </button>
              <button
                onClick={() => {
                  signout();
                  navigate("/");
                }}
                className="text-sm px-4 py-2 rounded-full bg-black text-white hover:bg-black/90 transition"
              >
                Logout
              </button>
            </div>
          )}

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <img
            src={assets.menuIcon}
            alt="menu"
            onClick={() => setIsMenuOpen(true)}
            className={`h-5 cursor-pointer ${!isScrolled && "invert"}`}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center gap-8 text-white z-50">

          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            &times;
          </button>

          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-semibold"
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/owner");
            }}
            className="px-8 py-2 rounded-full border border-white"
          >
            Dashboard
          </button>

          {!user && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/signin");
              }}
              className="px-8 py-2 rounded-full bg-white text-black"
            >
              Login
            </button>
          )}

          {user && (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/my-bookings");
                }}
                className="px-8 py-2 rounded-full border border-white"
              >
                My Bookings
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  signout();
                  navigate("/");
                }}
                className="px-8 py-2 rounded-full bg-white text-black"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;