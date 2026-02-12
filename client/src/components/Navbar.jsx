import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk } from "@clerk/clerk-react";


const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-20 px-6 md:px-16 lg:px-24">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          <span className={isScrolled ? "text-gray-900" : "text-white"}>
            SukoonStay
          </span>
        </Link>

        {/* Desktop Nav + Dashboard */}
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

          <button
            onClick={() => navigate("/owner")}
            className={`px-5 py-1.5 rounded-full border text-sm transition
            ${
              isScrolled
                ? "border-gray-700 text-gray-700 hover:bg-black hover:text-white"
                : "border-white/80 text-white hover:bg-white hover:text-black"
            }`}
          >
            Dashboard
          </button>
        </div>

        {/* Search + Login */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Search Icon */}
          <button
            className={`p-2 rounded-full transition ${
              isScrolled
                ? "text-gray-700 hover:text-black"
                : "text-white hover:text-white/80"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <button
            onClick={openSignIn}
            className="px-6 py-2 rounded-full text-sm bg-black text-white hover:bg-black/90 transition"
          >
            Login
          </button>
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
      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 transition-transform duration-500 md:hidden
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <img
          src={assets.closeIcon}
          alt="close"
          onClick={() => setIsMenuOpen(false)}
          className="h-6 absolute top-6 right-6 cursor-pointer"
        />

        {navLinks.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-lg"
          >
            {item.name}
          </Link>
        ))}

        <button
          onClick={() => navigate("/owner")}
          className="border px-6 py-2 rounded-full text-sm"
        >
          Dashboard
        </button>

        <button
          onClick={openSignIn}
          className="bg-black text-white px-8 py-2 rounded-full"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
