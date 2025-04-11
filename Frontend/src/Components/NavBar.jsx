import React, { useState } from "react";
import logo from "../Images/logo.png";
import { X, Menu } from "lucide-react";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { useTheme } from "../Context/ThemeContext";

const NavBar = () => {
  const { logout, currentUser } = useAuth();
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    logout();
  };

  return (
    <>
      <nav className="bg-primary mx-6 my-3 shadow-lg fixed z-50 rounded-lg w-[97%]">
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
              <h1 className="text-3xl font-bold text-primary-foreground font-qenbay tracking-wider">
                ThyRight
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/"
                className="text-primary-foreground/80 font-poppins px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground hover:scale-105"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-primary-foreground/80 font-poppins px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground hover:scale-105"
              >
                About
              </a>
              <a
                href="#technology"
                className="text-primary-foreground/80 font-poppins px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground hover:scale-105"
              >
                Products
              </a>
              {currentUser && (
                <a
                  href="/thyverse/nutrition"
                  className="text-primary-foreground/80 font-poppins px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground hover:scale-105"
                >
                  Ndashboard
                </a>
              )}
              {currentUser && (
                <a
                  href="/thyverse/dashboard"
                  className="text-primary-foreground/80 font-poppins px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground hover:scale-105"
                >
                  Dashboard
                </a>
              )}
              {currentUser && (
                <button
                  onClick={logoutHandler}
                  className="bg-primary-foreground text-primary px-6 py-2 font-poppins rounded-full hover:bg-primary-foreground/90 transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  Logout
                </button>
              )}
              {!currentUser && (
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="bg-primary-foreground text-primary px-6 py-2 font-poppins rounded-full hover:bg-primary-foreground/90 transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-primary-foreground p-2 rounded-full hover:bg-primary/80 transition-all"
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
            <div className="md:hidden py-4 border-t border-primary/20">
              <div className="flex flex-col gap-2">
                <a
                  href="/"
                  className="text-primary-foreground/80 px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-primary-foreground/80 px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#technology"
                  className="text-primary-foreground/80 px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </a>
                <a
                  href="#contact"
                  className="text-primary-foreground/80 px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                {currentUser && (
                  <a
                    href="/dashboard"
                    className="text-primary-foreground/80 px-4 py-2 rounded-md transition-all hover:bg-primary/80 hover:text-primary-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </a>
                )}
                {currentUser && (
                  <button
                    onClick={logoutHandler}
                    className="bg-primary-foreground text-primary px-6 py-2 mt-2 font-poppins rounded-full hover:bg-primary-foreground/90 transition-all shadow-md"
                  >
                    Logout
                  </button>
                )}
                {!currentUser && (
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="bg-primary-foreground text-primary px-6 py-2 mt-2 font-poppins rounded-full hover:bg-primary-foreground/90 transition-all shadow-md"
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
