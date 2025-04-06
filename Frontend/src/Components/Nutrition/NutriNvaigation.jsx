import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  Utensils,
  Calendar,
  LineChart,
  Menu,
  X,
} from "lucide-react";
import FoodLogger from "./FoodLogger";
import MealPlanner from "./MealPlanner";
import Progress from "./Progress";
import UserProfile from "./UserProfile";
import NutritionDashboard from "./NutritionDashboard";
import NavBar from "../NavBar";

const NutriNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "foodlogger", label: "Food Logger", icon: Utensils },
    { id: "mealplanner", label: "Meal Planner", icon: Calendar },
    { id: "progress", label: "Progress", icon: LineChart },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <NutritionDashboard />;
      case "profile":
        return <UserProfile />;
      case "foodlogger":
        return <FoodLogger />;
      case "mealplanner":
        return <MealPlanner />;
      case "progress":
        return <Progress />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <NavBar />
      
      <div className="flex flex-1">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex flex-col mt-4 w-64 h-full bg-white dark:bg-gray-800 shadow-lg p-4 fixed top-16 left-0">
          <div className="text-2xl font-bold text-primary mb-6">ThyVerse</div>
          <nav className="space-y-2">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium space-x-2 transition-colors duration-200 w-full ${
                  activeTab === id
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar Toggle Button */}
        <div className="md:hidden fixed top-20 left-4 z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          >
            <aside className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg p-4 fixed top-16 left-0">
              <div className="text-2xl font-bold text-primary mb-6">ThyVerse</div>
              <nav className="space-y-2">
                {navItems.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium space-x-2 transition-colors duration-200 w-full ${
                      activeTab === id
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* Content area */}
        <div className="md:ml-64 w-full p-6 overflow-auto pt-16 mt-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default NutriNavigation;
