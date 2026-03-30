import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/clerk-react";

const Navbar = () => {

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

          <button
            onClick={() => navigate("/owner")}
            className={`px-5 py-1.5 rounded-full border text-sm transition ${
              isScrolled
                ? "border-gray-700 text-gray-700 hover:bg-black hover:text-white"
                : "border-white/80 text-white hover:bg-white hover:text-black"
            }`}
          >
            Dashboard
          </button>
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
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-2 rounded-full text-sm bg-black text-white hover:bg-black/90 transition">
                Login
              </button>
            </SignInButton>
          </SignedOut>

<SignedIn>
  <UserButton afterSignOutUrl="/">
    <UserButton.MenuItems>
      <UserButton.Link
        label="My Bookings"
        labelIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        }
        href="/my-bookings"
      />
    </UserButton.MenuItems>
  </UserButton>
</SignedIn>

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

      {/* Mobile Menu (Add this) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center gap-8 text-white z-50">

          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            aria-label="Close menu"
          >
            &times;
          </button>

          {/* Links */}
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

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton mode="modal">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="px-8 py-2 rounded-full bg-white text-black"
              >
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
  <UserButton afterSignOutUrl="/">
    <UserButton.MenuItems>
      <UserButton.Link
        label="My Bookings"
        labelIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        }
        href="/my-bookings"
      />
    </UserButton.MenuItems>
  </UserButton>
</SignedIn>
        </div>
      )}

    </nav>
  );
};

export default Navbar;