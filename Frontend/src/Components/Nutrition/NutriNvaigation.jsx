import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Utensils,
  Calendar,
  LineChart,
  Menu,
  X,
} from "lucide-react";
import NavBar from "../NavBar";

const NutriNavigation = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Update activeTab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/thyverse/nutrition") {
      setActiveTab("dashboard");
    } else if (path.includes("/thyverse/nutrition/profile")) {
      setActiveTab("profile");
    } else if (path.includes("/thyverse/nutrition/foodlogger")) {
      setActiveTab("foodlogger");
    } else if (path.includes("/thyverse/nutrition/mealplanner")) {
      setActiveTab("mealplanner");
    } else if (path.includes("/thyverse/nutrition/progress")) {
      setActiveTab("progress");
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 z-30 bg-white shadow-md">
        <NavBar />
      </div>

      <div className="flex flex-1 pt-16 bg-gray-100">
        {/* Mobile hamburger menu button */}
        <div className="md:hidden fixed top-4 left-4 z-20">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white rounded-md shadow-md"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar navigation - increased width */}
        <div
          className={`fixed md:relative h-full bg-white shadow-md z-10 transition-all duration-300 w-80 ${
            isSidebarOpen ? "left-0" : "-left-80 md:left-0"
          }`}
        >
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">
              Nutrition Dashboard
            </h1>
          </div>

          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <NavLink
                  to="/thyverse/nutrition"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveTab("dashboard");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  end
                >
                  <span className="mr-3">
                    <Home size={20} />
                  </span>
                  Dashboard
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/thyverse/nutrition/profile"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "profile"
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveTab("profile");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">
                    <User size={20} />
                  </span>
                  Profile
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/thyverse/nutrition/foodlogger"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "foodlogger"
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveTab("foodlogger");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">
                    <Utensils size={20} />
                  </span>
                  Food Logger
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/thyverse/nutrition/mealplanner"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "mealplanner"
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveTab("mealplanner");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">
                    <Calendar size={20} />
                  </span>
                  Meal Planner
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/thyverse/nutrition/progress"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "progress"
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveTab("progress");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">
                    <LineChart size={20} />
                  </span>
                  Progress
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default NutriNavigation;