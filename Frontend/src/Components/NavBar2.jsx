import React, { useState } from "react";
import logo from "../Images/logo.png";
import { X, Menu } from "lucide-react";
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../Context/AuthProvider";

const NavBar2 = () => {
    const navigate = useNavigate()
    const { logout, currentUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch()
    const logoutHandler = () => {
        // dispatch(logout());
        logout();
        window.location.href='/';
    }

    return (
        <>
            <nav className="bg-white mx-8 my-3 shadow-md fixed z-50 rounded-md w-[96%]">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img src={logo} width={60} height={60} alt="ThyRight Logo" />
                            <h1 className="text-4xl mt-2 font-bold text-gray-800 font-qenbay">
                                ThyVerse
                            </h1>


                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-4">
                            <a
                                href="/thyverse"
                                className="text-gray-600 font-poppins px-4 py-2 rounded-md transition-colors hover:bg-blue-600 hover:text-white"
                            >
                                Home
                            </a>
                            <a
                                href="/thyverse/about"
                                className="text-gray-600 px-4 py-2 font-poppins rounded-md transition-colors hover:bg-blue-600 hover:text-white"
                            >
                                About
                            </a>
                            
                            <a
                                href="#contact"
                                className="text-gray-600 px-4 py-2 font-poppins rounded-md transition-colors hover:bg-blue-600 hover:text-white"
                            >
                                Contact
                            </a>
                            {
                                currentUser && (
                                    <a
                                        href="/thyverse/dashboard"
                                        className="text-gray-600 px-4 py-2 font-poppins rounded-md transition-colors hover:bg-blue-600 hover:text-white"
                                    >
                                        DashBoard
                                    </a>
                                )
                            }
                            {
                                currentUser && (
                                    <button
                                        onClick={logoutHandler}
                                        className="bg-blue-600 text-white px-6 py-2 font-poppins rounded-full hover:bg-blue-700 transition-colors"
                                    >
                                        LogOut
                                    </button>
                                )
                            }
                            {
                                !currentUser && (
                                    <button
                                        onClick={() => (window.location.href = "/login")}
                                        className="bg-blue-600 text-white px-6 py-2 font-poppins rounded-full hover:bg-blue-700 transition-colors"
                                    >
                                        LogIn
                                    </button>
                                )
                            }

                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t">
                            <div className="flex flex-col gap-2">
                                <a
                                    href="/"
                                    className="text-gray-600 px-4 py-2 rounded-md transition-colors hover:bg-blue-600 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </a>
                                <a
                                    href="/about"
                                    className="text-gray-600 px-4 py-2 rounded-md transition-colors hover:bg-blue-600 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </a>
                                <a
                                    href="#technology"
                                    className="text-gray-600 px-4 py-2 rounded-md transition-colors hover:bg-blue-600 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Technology
                                </a>
                                <a
                                    href="#contact"
                                    className="text-gray-600 px-4 py-2 rounded-md transition-colors hover:bg-blue-600 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </a>
                                {
                                    currentUser && (
                                        <button
                                            onClick={logoutHandler}
                                            className="bg-blue-600 text-white px-6 py-2 font-poppins rounded-full hover:bg-blue-700 transition-colors"
                                        >
                                            LogOut
                                        </button>
                                    )
                                }
                                {
                                    !currentUser && (
                                        <button
                                            onClick={() => (window.location.href = "/login")}
                                            className="bg-blue-600 text-white px-6 py-2 font-poppins rounded-full hover:bg-blue-700 transition-colors"
                                        >
                                            LogIn
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar2;
