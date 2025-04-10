import React, { useState } from "react";
import logo from "../Images/logo.png";
import { X, Menu } from "lucide-react";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const NavBar = () => {
  const { logout, currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    logout();
  };

  return (
    <>
      <nav className="bg-[#1a237e] mx-6 my-3 shadow-lg fixed z-50 rounded-lg w-[97%]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src={logo}
                width={50}
                height={50}
                alt="ThyRight Logo"
                className="rounded-full shadow-md"
              />
              <h1 className="text-3xl font-bold text-white font-qenbay tracking-wider">
                ThyRight
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/"
                className="text-gray-200 font-poppins px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white hover:scale-105"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-gray-200 font-poppins px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white hover:scale-105"
              >
                About
              </a>
              <a
                href="#technology"
                className="text-gray-200 font-poppins px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white hover:scale-105"
              >
                Products
              </a>
              {currentUser && (
                <a
                  href="/thyverse/nutrition"
                  className="text-gray-200 font-poppins px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white hover:scale-105"
                >
                  Ndashboard
                </a>
              )}
              {currentUser && (
                <a
                  href="/thyverse/dashboard"
                  className="text-gray-200 font-poppins px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white hover:scale-105"
                >
                  Dashboard
                </a>
              )}
              {currentUser && (
                <button
                  onClick={logoutHandler}
                  className="bg-[#3949ab] text-white px-6 py-2 font-poppins rounded-full hover:bg-[#5c6bc0] transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  Logout
                </button>
              )}
              {!currentUser && (
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="bg-[#3949ab] text-white px-6 py-2 font-poppins rounded-full hover:bg-[#5c6bc0] transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 rounded-full hover:bg-[#303f9f] transition-all"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#303f9f]">
              <div className="flex flex-col gap-2">
                <a
                  href="/"
                  className="text-gray-200 px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-gray-200 px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#technology"
                  className="text-gray-200 px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </a>
                <a
                  href="#contact"
                  className="text-gray-200 px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                {currentUser && (
                  <a
                    href="/dashboard"
                    className="text-gray-200 px-4 py-2 rounded-md transition-all hover:bg-[#303f9f] hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </a>
                )}
                {currentUser && (
                  <button
                    onClick={logoutHandler}
                    className="bg-[#3949ab] text-white px-6 py-2 mt-2 font-poppins rounded-full hover:bg-[#5c6bc0] transition-all shadow-md"
                  >
                    Logout
                  </button>
                )}
                {!currentUser && (
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="bg-[#3949ab] text-white px-6 py-2 mt-2 font-poppins rounded-full hover:bg-[#5c6bc0] transition-all shadow-md"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
