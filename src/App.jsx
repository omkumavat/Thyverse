import React, { useState } from "react";
import {
  Thermometer,
  Microscope,
  Target,
  Shield,
  Activity,
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import logo from "./Images/logo.png";
import ServiceCard from "./Components/ServiceCard";
import Throat from "./Images/Throa.jpg";
import { motion } from "framer-motion";
import Contact from "./Images/contact.gif";
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white mx-8 my-3 shadow-md fixed z-50 rounded-md w-[96%]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={logo} width={60} height={60} />
              <h1 className="text-3xl font-bold text-gray-800 font-poppins">
                ThyVerse
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#home"
                className="text-gray-600 font-poppins px-4 py-2 rounded-md transition-colors hover:bg-blue-600 hover:text-white"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-600 px-4 py-2 font-poppins rounded-md transition-colors hover:bg-blue-600 hover:text-white"
              >
                About
              </a>
              <a
                href="#technology"
                className="text-gray-600 px-4 py-2 font-poppins rounded-md transition-colors hover:bg-blue-600 hover:text-white"
              >
                Technology
              </a>
              <a
                href="#contact"
                className="text-gray-600 px-4 py-2 font-poppins rounded-md transition-colors hover:bg-blue-600 hover:text-white"
              >
                Contact
              </a>
              <button className="bg-blue-600 text-white px-6 py-2 font-poppins rounded-full hover:bg-blue-700 transition-colors">
                Login
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
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
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-2">
                <a
                  href="#home"
                  className="text-gray-600 px-4 py-2 rounded-md transition-colors hover:bg-blue-600 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#about"
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
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors w-full">
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="relative font-poppins bg-[#000042] text-white animate-gradient before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/noise-pattern.png')] before:opacity-10 before:content-['']"
        id="home"
      >
        <div className="container mx-auto px-6 py-10">
          <div className="grid md:grid-cols-2 gap-16 items-center px-6 md:px-12 lg:px-20 py-16">
            {/* Left Content */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-col justify-center items-center gap-y-6 h-full"
            >
              {/* Content Box */}
              <div className="bg-white text-gray-900 p-6 md:p-8 rounded-lg shadow-lg flex flex-col gap-y-4 min-h-[400px] h-full">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-cyan-600">
                  Revolutionary Thyroid Diagnosis Through Thermal Technology
                </h1>
                <p className="text-lg md:text-xl text-gray-600 flex-grow">
                  Transforming thyroid care with non-invasive thermal scanning
                  for faster, more accurate diagnosis.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 w-fit text-white px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg self-start">
                  Learn More <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-col justify-center items-center gap-y-6 h-full"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
                alt="Medical Technology"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              {/* Optional Gradient Overlay for Better Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </header>
      {/* vision and mission */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-5xl font-bold font-poppins text-center mb-2">
              Our Vision & Mission
            </h2>
            <div className="h-2 bg-black w-[35%] mb-3"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="group bg-orange-400 p-8 hover:bg-orange-500 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-blue-800 group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <h3 className="text-3xl font-bold mb-4 font-poppins text-blue-800 group-hover:text-blue-700 transition-colors">
                Our Vision
              </h3>
              <p className="text-gray-800 group-hover:text-gray-900 text-2xl font-poppins transition-colors leading-relaxed">
                Effectively screen, diagnose and manage thyroid diseases across
                all adult age groups.
              </p>
              <div className="mt-6 h-1 w-20 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="group bg-orange-400 hover:bg-orange-500 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Microscope className="w-8 h-8 text-cyan-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl font-poppins font-bold mb-4 text-blue-600 group-hover:text-blue-700 transition-colors">
                Our Mission
              </h3>
              <p className="text-gray-800 group-hover:text-gray-900 text-2xl font-poppins transition-colors leading-relaxed">
                To build India’s only AI-based thyroid screening and management
                platform for thyroid-diseased patients.
              </p>
              <div className="mt-6 h-1 w-20 bg-cyan-600 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Servises */}
      <div className="relative mx-4 mt-4">
        <div className="bg-[#18184e] rounded-md py-12 px-6 relative z-10 rounded-tl-[10%] rounded-br-[10%]">
          <p className="text-white font-bold text-3xl font-poppins text-center">
            Our Survises
          </p>
          <ServiceCard />
        </div>
      </div>

      {/* Our Technology Section */}
      <section className="py-20" id="technology">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Text Section */}
            <div className="bg-orange-400 p-5 rounded-md hover:bg-orange-500 hover:scale-105 transition-all duration-100 h-full flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6 font-poppins text-blue-700">
                Revolutionary Thermal Scanning Technology
              </h2>
              <p className="text-gray-600 mb-6 text-2xl font-poppins">
                Our innovative approach uses advanced thermal imaging to detect
                thyroid abnormalities with high precision. This non-invasive
                method provides:
              </p>
              <ul className="space-y-4">
                {[
                  "Accurate temperature mapping of the throat area",
                  "Real-time analysis using AI algorithms",
                  "Immediate results with detailed reports",
                  "Comfortable and painless procedure",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 " />
                    <span className="font-poppins text-xl">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Image Section */}
            <div className="h-full flex items-center">
              <img
                src={Throat}
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-2" id="contact">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold text-center font-poppins mb-2">
              Get in Touch
            </h2>
            <div className="h-1 bg-black w-[20%]"></div>
          </motion.div>
          <div className="flex justify-center items-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className=""
            >
              <img src={Contact} className="max-w-full h-auto" alt="Contact" />
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="w-[40%] bg-gray-300 p-8 rounded-lg shadow-lg"
            >
              <form className="space-y-6 font-poppins">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-bold text-md text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold text-md text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block font-bold text-md text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-10 h-10" />
              <span className="font-bold font-poppins text-3xl">ThyVerse</span>
            </div>
            <div className="text-gray-400">
              © 2024 ThyroScan. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
