import React from "react"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Activity,
  UserPlus,
  Calendar
} from "lucide-react"

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Creative Left Side Curve */}
      <div
        className="absolute left-0 top-0 h-full w-[30%] bg-blue-100/50"
        style={{
          clipPath: "polygon(0 0, 100% 0, 70% 100%, 0% 100%)"
        }}
      ></div>
      <div
        className="absolute left-0 top-0 h-full w-[20%] bg-blue-200/30"
        style={{
          clipPath: "polygon(0 0, 100% 0, 40% 100%, 0% 100%)"
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-bold text-blue-800 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-blue-600" />
              ThyRight
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Providing compassionate care and innovative medical solutions for
              a healthier tomorrow. Your well-being is our priority.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white p-2 rounded-lg shadow-md text-blue-600 hover:text-blue-800 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white p-2 rounded-lg shadow-md text-blue-600 hover:text-blue-800 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white p-2 rounded-lg shadow-md text-blue-600 hover:text-blue-800 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white p-2 rounded-lg shadow-md text-blue-600 hover:text-blue-800 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="relative z-10">
            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Our Services
            </h4>
            <ul className="space-y-2">
              {[
                "Emergency Care",
                "Primary Care",
                "Specialized Treatment",
                "Mental Health",
                "Pediatric Care",
                "Senior Care"
              ].map(service => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-all flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="relative z-10">
            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start transform hover:-translate-x-1 transition-transform">
                <div className="bg-white p-2 rounded-lg shadow-md mr-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start transform hover:-translate-x-1 transition-transform">
                <div className="bg-white p-2 rounded-lg shadow-md mr-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600">contact@healthcare.com</span>
              </li>
              <li className="flex items-start transform hover:-translate-x-1 transition-transform">
                <div className="bg-white p-2 rounded-lg shadow-md mr-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600">
                  123 Medical Center Drive
                  <br />
                  Healthcare City, HC 12345
                </span>
              </li>
              <li className="flex items-start transform hover:-translate-x-1 transition-transform">
                <div className="bg-white p-2 rounded-lg shadow-md mr-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600">
                  Mon - Fri: 8:00 AM - 8:00 PM
                  <br />
                  Sat - Sun: 9:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="relative z-10">
            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Newsletter
            </h4>
            <p className="text-gray-600 mb-4">
              Stay updated with our latest health tips and news.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
            <p className="text-gray-600 text-sm">
              © 2025 ThyRight. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 text-sm hover:underline decoration-blue-400 underline-offset-4"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 text-sm hover:underline decoration-blue-400 underline-offset-4"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 text-sm hover:underline decoration-blue-400 underline-offset-4"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
